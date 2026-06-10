import { db } from "../src/lib/db";

async function main() {
  const result = await db.execute("SELECT id, title, locale, slug, xPosted, isPublished FROM Article ORDER BY createdAt DESC LIMIT 10");
  console.log("Recent articles state:");
  console.log(JSON.stringify(result.rows, null, 2));
}

main().catch(console.error);
