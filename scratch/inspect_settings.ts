import { db } from "../src/lib/db";

async function main() {
  const result = await db.execute("SELECT * FROM SiteSettings");
  console.log("SiteSettings entries:");
  console.log(JSON.stringify(result.rows, null, 2));
}

main().catch(console.error);
