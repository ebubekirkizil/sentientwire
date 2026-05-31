import { db } from '../src/lib/db';

async function main() {
  const result = await db.execute("SELECT title, slug FROM Article ORDER BY createdAt DESC LIMIT 1;");
  console.log(result.rows);
}

main().catch(console.error);
