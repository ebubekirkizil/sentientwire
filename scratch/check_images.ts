import { db } from '../src/lib/db';

async function main() {
  const r = await db.execute({
    sql: 'SELECT id, title, imageUrl, updatedAt FROM Article ORDER BY updatedAt DESC LIMIT 5',
    args: []
  });
  console.log(JSON.stringify(r.rows, null, 2));
}
main();
