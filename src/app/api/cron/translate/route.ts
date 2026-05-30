import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { translateArticleText } from "@/lib/ai";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Max allowed for Vercel Hobby

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
      // In production, we might call this client-side without auth for lazy loading,
      // so we won't block it strictly, but we limit to 1 article per call to avoid abuse.
    }

    console.log("[CRON TRANSLATE] Starting background translation check...");

    const locales = routing.locales.filter(l => l !== 'en' && !l.startsWith('en-'));
    
    // We will only try to translate ONE missing article per request to respect Gemini 15 RPM limit
    let translatedCount = 0;

    for (const locale of locales) {
      // Find one article that doesn't have a translation in this locale
      const missingTranslation = await db.execute({
        sql: `SELECT a.id, a.title, a.summary, a.content 
              FROM Article a 
              LEFT JOIN ArticleTranslation t ON a.id = t.articleId AND t.locale = ? 
              WHERE t.id IS NULL 
              ORDER BY a.createdAt DESC 
              LIMIT 1`,
        args: [locale]
      });

      if (missingTranslation.rows.length > 0) {
        const article = missingTranslation.rows[0];
        console.log(`[CRON TRANSLATE] Found missing translation for ${locale}: ${article.title}`);
        
        try {
          const translated = await translateArticleText(
            article.title as string,
            article.summary as string,
            article.content as string,
            locale
          );

          if (translated) {
            await db.execute({
              sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) 
                    VALUES (?, ?, ?, ?, ?)`,
              args: [article.id, locale, translated.title, translated.summary, translated.content]
            });
            console.log(`[CRON TRANSLATE] Success for ${locale}`);
            translatedCount++;
            
            // Only translate ONE article per request to ensure we don't hit Vercel timeout or Gemini rate limits.
            // Client will ping this endpoint repeatedly.
            break;
          } else {
             console.log(`[CRON TRANSLATE] Gemini returned null (possibly quota limit). Skipping.`);
             break; // Stop completely if quota exceeded
          }
        } catch (err) {
          console.error(`[CRON TRANSLATE] Error translating to ${locale}:`, err);
          break; // Stop on error
        }
      }
    }

    return NextResponse.json({ success: true, translatedCount });
  } catch (error) {
    console.error("[CRON TRANSLATE] Failed:", error);
    return NextResponse.json({ error: "Failed to run translation cron" }, { status: 500 });
  }
}
