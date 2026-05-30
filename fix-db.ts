import { createClient } from "@libsql/client";

async function fixLocalDb() {
  const db = createClient({
    url: "file:dev.db",
  });

  console.log("Fixing local dev.db schema...");

  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ArticleTranslation (
        articleId TEXT NOT NULL,
        locale TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (articleId, locale),
        FOREIGN KEY (articleId) REFERENCES Article(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ ArticleTranslation table created or already exists.");

    // Also ensure Article table has all columns
    await db.execute(`
       CREATE TABLE IF NOT EXISTS Article (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        excerpt TEXT,
        content TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'GENERAL',
        categoryColor TEXT NOT NULL DEFAULT '#06b6d4',
        imageUrl TEXT,
        locale TEXT NOT NULL DEFAULT 'en',
        isPublished INTEGER NOT NULL DEFAULT 1,
        views INTEGER NOT NULL DEFAULT 0,
        xPosted INTEGER NOT NULL DEFAULT 0,
        originalUrl TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
    
    // If table already exists but excerpt column is missing, add it
    try {
      await db.execute("ALTER TABLE Article ADD COLUMN excerpt TEXT");
      console.log("✅ Added excerpt column to Article.");
    } catch (e) {
      // Ignore if column already exists
    }
    console.log("✅ Article table ensured.");

  } catch (error) {
    console.error("Failed to fix database:", error);
  }
}

fixLocalDb();
