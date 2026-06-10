import { db } from "../src/lib/db";

async function main() {
  const ids = [
    "758ba81f-168c-49b5-8902-13bae922a892",
    "d28c479b-1f28-4ac2-9df1-7646888b96e4"
  ];
  
  for (const id of ids) {
    const result = await db.execute({
      sql: "UPDATE Article SET xPosted = 0 WHERE id = ?",
      args: [id]
    });
    console.log(`Reset xPosted to 0 for article ID ${id}:`, result.rowsAffected);
  }
}

main().catch(console.error);
