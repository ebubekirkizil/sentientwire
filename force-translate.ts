import { createClient } from '@libsql/client';
import { translateArticleText } from './src/lib/ai';

const db = createClient({ 
  url: process.env.DATABASE_URL || '', 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

async function run() {
  console.log("Checking for missing TR translations...");
  const missing = await db.execute({
    sql: `SELECT a.id, a.title, a.summary, a.content 
          FROM Article a 
          LEFT JOIN ArticleTranslation t ON a.id = t.articleId AND t.locale = 'tr' 
          WHERE t.articleId IS NULL`,
    args: []
  });

  console.log(`Found ${missing.rows.length} articles missing TR translation.`);

  for (const article of missing.rows) {
    console.log(`Translating: ${article.title}`);
    try {
      const translated = await translateArticleText(
        article.title as string,
        article.summary as string,
        article.content as string,
        'tr'
      );

      if (translated) {
        await db.execute({
          sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) 
                VALUES (?, 'tr', ?, ?, ?)`,
          args: [article.id, translated.title, translated.summary, translated.content]
        });
        console.log(`✅ Success: ${article.title}`);
      }
      
      // Wait 3 seconds to avoid Gemini 15 RPM limit (15 requests / 60 sec = 1 request per 4 sec)
      await new Promise(r => setTimeout(r, 4000));
    } catch (e: any) {
      console.error(`❌ Failed: ${article.title}`, e.message);
      await new Promise(r => setTimeout(r, 10000)); // wait longer on failure
    }
  }
  console.log("Finished forced translations.");
}

run();
