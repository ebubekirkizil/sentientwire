import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { translateArticleText } from "@/lib/ai";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Max allowed for Vercel Hobby

export async function GET(request: Request) {
  try {
    console.log("[CRON TRANSLATE] Starting background translation check...");

    // Build the list of non-English locales to translate to (tr, es, de, fr, it, nl, ru, zh, pl)
    const locales = routing.locales.filter(l => l !== 'en' && !l.startsWith('en-'));
    
    // We will only try to translate ONE missing article per request to respect Gemini 15 RPM limit
    let translatedCount = 0;

    // --- PRIORITY: Fix articles stored in non-English locale that have no English translation ---
    // This handles articles inserted directly into the DB (e.g. locale='tr') via bypass scripts.
    const missingEnglish = await db.execute({
      sql: `SELECT a.id, a.title, a.summary, a.content, a.locale
            FROM Article a
            LEFT JOIN ArticleTranslation t ON a.id = t.articleId AND t.locale = 'en'
            WHERE a.locale != 'en' AND t.articleId IS NULL
            ORDER BY a.createdAt DESC
            LIMIT 1`
    });

    if (missingEnglish.rows.length > 0) {
      const article = missingEnglish.rows[0];
      console.log(`[CRON TRANSLATE] Found article with no English translation (locale=${article.locale}): ${article.title}`);
      try {
        const translated = await translateArticleText(
          article.title as string,
          article.summary as string,
          article.content as string,
          'en'
        );
        if (translated) {
          await db.execute({
            sql: `INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content)
                  VALUES (?, ?, ?, ?, ?)`,
            args: [article.id, 'en', translated.title, translated.summary, translated.content]
          });
          console.log(`[CRON TRANSLATE] ✅ English translation created for article ${article.id}`);
          translatedCount++;
          return NextResponse.json({ success: true, translatedCount, fixedEnglish: true });
        }
      } catch (err) {
        console.error(`[CRON TRANSLATE] Error creating English translation:`, err);
      }
    }

    // --- REGULAR: Find articles missing translations in any supported locale ---
    for (const locale of locales) {
      // Find one article that doesn't have a translation in this locale
      const missingTranslation = await db.execute({
        sql: `SELECT a.id, a.title, a.summary, a.content 
              FROM Article a 
              LEFT JOIN ArticleTranslation t ON a.id = t.articleId AND t.locale = ? 
              WHERE t.articleId IS NULL 
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
            console.log(`[CRON TRANSLATE] ✅ Success for ${locale}`);
            translatedCount++;
            
            // Only translate ONE article per request to ensure we don't hit Vercel timeout or Gemini rate limits.
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
