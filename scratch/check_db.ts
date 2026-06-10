import { db } from "../src/lib/db";

async function checkDB() {
  try {
    const rs = await db.execute("SELECT id, title, createdAt FROM Article ORDER BY createdAt DESC LIMIT 5");
    console.log("=== LATEST 5 ARTICLES IN DB ===");
    rs.rows.forEach(r => console.log(`[${r.createdAt}] ${r.title}`));
  } catch (e) {
    console.error("DB Error:", e);
  }
}

checkDB();
