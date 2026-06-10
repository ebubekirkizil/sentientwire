import { db } from './src/lib/db';

async function check() {
  const articles = await db.execute('SELECT id, title FROM Article ORDER BY createdAt DESC LIMIT 2');
  console.log("Articles:", articles.rows);

  for (const row of articles.rows) {
    const id = row.id;
    const trans = await db.execute({
      sql: 'SELECT locale FROM ArticleTranslation WHERE articleId = ?',
      args: [id as string]
    });
    console.log(`Translations for ${id}:`, trans.rows.map(r => r.locale));
  }
}

check().catch(console.error);
