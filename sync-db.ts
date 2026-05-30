import { createClient } from "@libsql/client";

async function syncTursoToLocal() {
  const turso = createClient({
    url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg",
  });

  const local = createClient({
    url: "file:dev.db",
  });

  console.log("Syncing Turso to local dev.db...");

  try {
    // Get all articles from Turso
    const tursoArticles = await turso.execute("SELECT * FROM Article");
    console.log(`Found ${tursoArticles.rows.length} articles on Turso.`);

    // Get all translations from Turso
    const tursoTranslations = await turso.execute("SELECT * FROM ArticleTranslation");
    console.log(`Found ${tursoTranslations.rows.length} translations on Turso.`);

    // Insert into local
    for (const row of tursoArticles.rows) {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = columns.map(() => "?").join(",");
      
      try {
        await local.execute({
          sql: `INSERT OR REPLACE INTO Article (${columns.join(",")}) VALUES (${placeholders})`,
          args: values
        });
      } catch (e) {
        console.error(`Failed to sync article ${row.id}:`, e);
      }
    }

    for (const row of tursoTranslations.rows) {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = columns.map(() => "?").join(",");
      
      try {
        await local.execute({
          sql: `INSERT OR REPLACE INTO ArticleTranslation (${columns.join(",")}) VALUES (${placeholders})`,
          args: values
        });
      } catch (e) {
        console.error(`Failed to sync translation for ${row.articleId}:`, e);
      }
    }

    console.log("✅ Sync complete!");
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

syncTursoToLocal();
