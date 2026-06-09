import { db } from '../src/lib/db';
import { getArticlesByLocale } from '../src/app/actions/article';

async function main() {
  console.log("\n=== DB: Latest 3 Articles ===");
  const raw = await db.execute("SELECT id, title, createdAt FROM Article ORDER BY createdAt DESC LIMIT 3");
  console.log(JSON.stringify(raw.rows, null, 2));
  
  console.log("\n=== getArticlesByLocale('tr') - First 3 results ===");
  const articles = await getArticlesByLocale('tr');
  articles.slice(0, 3).forEach((a: any) => {
    console.log(`- ${a.title} (${a.createdAt})`);
  });
}

main().catch(console.error);
