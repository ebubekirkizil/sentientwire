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

    const unpublished = await db.execute("SELECT COUNT(*) as count FROM Article WHERE isPublished = 0");
    console.log("Unpublished count:", unpublished.rows[0].count);

    const published = await db.execute("SELECT COUNT(*) as count FROM Article WHERE isPublished = 1");
    console.log("Published count:", published.rows[0].count);
  } catch (error: any) {
    console.error("Turso Error:", error);
  }
}

checkLocal();
