import { createClient } from '@libsql/client';
import translate from 'google-translate-api-x';

const locales = ['tr', 'es', 'fr', 'de', 'it', 'ru', 'zh-CN', 'ar', 'ja']; 

const db = createClient({ 
  url: process.env.DATABASE_URL || '', 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

async function run() {
  const allArticles = await db.execute('SELECT id, locale as sourceLocale, title, summary, content FROM Article');
  
  for (const article of allArticles.rows) {
    for (const locale of locales) {
      if (article.sourceLocale === locale || (locale === 'zh-CN' && article.sourceLocale === 'zh')) continue;
      
      const transResult = await db.execute({
        sql: `SELECT * FROM ArticleTranslation WHERE articleId = ? AND locale = ?`,
        args: [article.id, locale === 'zh-CN' ? 'zh' : locale]
      });

      if (transResult.rows.length === 0) {
        console.log(`Translating article ${article.id} to ${locale}...`);
        try {
          const tTitle = await translate(article.title as string, { to: locale, forceBatch: false });
          const tSummary = await translate(article.summary as string, { to: locale, forceBatch: false });
          
          let tContent = article.content as string;
          if (article.content && (article.content as string).length > 0) {
            // chunk the content to prevent breaking gt-api
            const res = await translate(article.content as string, { to: locale, forceBatch: false });
            tContent = res.text;
          }

          await db.execute({
            sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)`,
            args: [article.id, locale === 'zh-CN' ? 'zh' : locale, tTitle.text, tSummary.text, tContent]
          });
          console.log(`Successfully translated to ${locale}`);
        } catch (e) {
          console.error(`Failed for ${locale}:`, (e as any).message);
        }
        
        // Wait 500ms to avoid Google Rate Limits
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
  console.log("Translation sweep complete!");
}

run();
