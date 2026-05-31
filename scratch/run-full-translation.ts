import { createClient } from '@libsql/client';
import translate from 'google-translate-api-x';

const db = createClient({ 
  url: process.env.DATABASE_URL || 'libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io', 
  authToken: process.env.DATABASE_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg'
});

// All 10 supported languages
const allLocales = ['en', 'tr', 'es', 'fr', 'de', 'it', 'ru', 'zh', 'ar', 'ja'];

async function run() {
  const allArticles = await db.execute('SELECT id, locale as sourceLocale, title, summary, content FROM Article');
  
  for (const article of allArticles.rows) {
    const artId = String(article.id);
    const srcLocale = String(article.sourceLocale || 'en');
    
    for (const locale of allLocales) {
      // If the article's original language is the target language, we don't need a translation entry
      if (srcLocale === locale) continue;
      
      // Check if translation already exists
      const transResult = await db.execute({
        sql: `SELECT * FROM ArticleTranslation WHERE articleId = ? AND locale = ?`,
        args: [artId, locale]
      });

      if (transResult.rows.length === 0) {
        console.log(`Translating article [${artId}] ("${article.title}") from [${srcLocale}] to [${locale}]...`);
        try {
          const translateLocale = locale === 'zh' ? 'zh-CN' : locale;
          const tTitle = await translate(article.title as string, { to: translateLocale, forceBatch: false });
          const tSummary = await translate(article.summary as string, { to: translateLocale, forceBatch: false });
          
          let tContent = article.content as string;
          if (article.content && (article.content as string).length > 0) {
            const res = await translate(article.content as string, { to: translateLocale, forceBatch: false });
            tContent = res.text;
          }

          await db.execute({
            sql: `INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)`,
            args: [artId, locale, tTitle.text, tSummary.text, tContent]
          });
          console.log(`Successfully translated article [${artId}] to [${locale}]`);
        } catch (e: any) {
          console.error(`Failed translating article [${artId}] to [${locale}]:`, e.message);
        }
        
        // Wait 300ms to avoid Google Rate Limits
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }
  console.log("Full translation run completed!");
}

run().catch(console.error);
