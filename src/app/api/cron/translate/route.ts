import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { translateArticleText } from "@/lib/ai";
import { routing } from "@/i18n/routing";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    // Allow cron secret or organic trigger from frontend (we allow no auth for organic trigger to process the queue)
    
    // Supported locales minus the original language 'en'
    const targetLocales = routing.locales.filter(l => l !== 'en');
    
    // Find an article that is missing translations
    const articlesRes = await db.execute({
      sql: `SELECT id, title, summary, content, locale FROM Article WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT 10`,
      args: []
    });

    for (const article of articlesRes.rows) {
      // Get existing translations for this article
      const transRes = await db.execute({
        sql: `SELECT locale FROM ArticleTranslation WHERE articleId = ?`,
        args: [article.id]
      });
      const existingLocales = transRes.rows.map(r => r.locale);
      
      // Find the first missing locale
      const missingLocale = targetLocales.find(l => !existingLocales.includes(String(l)));
      
      if (missingLocale) {
        console.log(`[CRON-TRANSLATE] Found missing translation: Article ${article.id} missing ${missingLocale}. Translating...`);
        
        const translated = await translateArticleText(
          String(article.title),
          String(article.summary || ''),
          String(article.content),
          missingLocale
        );
        
        if (translated) {
          await db.execute({
            sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)`,
            args: [article.id, missingLocale, translated.title, translated.summary, translated.content]
          });
          console.log(`[CRON-TRANSLATE] Successfully translated ${article.id} to ${missingLocale}`);
          return NextResponse.json({ success: true, articleId: article.id, translatedTo: missingLocale });
        } else {
          return NextResponse.json({ success: false, error: "Quota exceeded or API returned null" }, { status: 429 });
        }
      }
    }
    
    return NextResponse.json({ success: true, message: "Queue empty, all articles translated." });
  } catch (error: any) {
    console.error("Cron Translate Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
