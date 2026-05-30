import { createClient } from "@libsql/client";

async function test() {
  const db = createClient({ url: "file:dev.db" });
  console.log("Testing getArticles on local dev.db...");
  
  try {
    const result = await db.execute("SELECT * FROM Article WHERE isPublished = 1");
    console.log("Success! Found articles:", result.rows.length);
    
    const trans = await db.execute("SELECT * FROM ArticleTranslation");
    console.log("Translations found:", trans.rows.length);
  } catch (e) {
    console.error("Test failed:", e);
  }
}

test();
