import { createClient } from "@libsql/client";

async function checkLocal() {
  const url = "file:dev.db";

  console.log("Checking Local dev.db...");

  const db = createClient({
    url,
  });

  try {
    const result = await db.execute("SELECT 1");
    console.log("Success! Connection is working.");
    
    const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log("Tables in database:", tables.rows.map(r => r.name));

    const all = await db.execute("SELECT isPublished, COUNT(*) as count FROM Article GROUP BY isPublished");
    console.log("isPublished distribution:", all.rows);
  } catch (error: any) {
    console.error("Turso Error:", error);
  }
}

checkLocal();
