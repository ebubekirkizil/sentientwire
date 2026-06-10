import { db } from "../src/lib/db";

async function main() {
  const result = await db.execute("PRAGMA table_info(Article)");
  console.log("Article table schema:");
  console.log(JSON.stringify(result.rows, null, 2));
}

main().catch(console.error);
