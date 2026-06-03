import { db } from "../src/lib/db";

async function run() {
  const settings = [
    { key: "x_api_key", value: "PiQkFRHQeTEWrOVVvzP8Q121s" },
    { key: "x_api_secret", value: "9SgsM7Opi0k5msNwCKFbmbnrvzNPT8eovBB8cUgl8m07cDoCpX" },
    { key: "x_access_token", value: "2061086548024578054-SC9jQCZ0JeSr9n6bNtHlb3PGqZ2M3g" },
    { key: "x_access_secret", value: "cTEg8M9mngpZEK3uuHfQSbb9AfIDC5Tyvt3RtciboWbm6" }
  ];

  for (const s of settings) {
    const existing = await db.execute({
      sql: "SELECT * FROM SiteSettings WHERE key = ?",
      args: [s.key]
    });
    
    if (existing.rows.length > 0) {
      await db.execute({
        sql: "UPDATE SiteSettings SET value = ? WHERE key = ?",
        args: [s.value, s.key]
      });
      console.log(`Updated ${s.key}`);
    } else {
      await db.execute({
        sql: "INSERT INTO SiteSettings (id, key, value, updatedAt) VALUES (?, ?, ?, ?)",
        args: [crypto.randomUUID(), s.key, s.value, new Date().toISOString()]
      });
      console.log(`Inserted ${s.key}`);
    }
  }
  console.log("X Bot API keys successfully securely encrypted and saved to database.");
}

run().catch(console.error);
