import { db } from '../src/lib/db';

async function main() {
  const result = await db.execute("DELETE FROM Article WHERE title LIKE 'MOCK:%'");
  console.log(`Deleted ${result.rowsAffected} mock articles.`);
}

main().catch(console.error);
