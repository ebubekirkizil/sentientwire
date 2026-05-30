import { createClient } from "@libsql/client";

async function pushToCloud() {
  const local = createClient({ url: "file:dev.db" });
  const cloud = createClient({
    url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg",
  });

  console.log("Pushing LOCAL data to CLOUD Turso...");

  try {
    const localArticles = await local.execute("SELECT * FROM Article");
    console.log(`Local articles: ${localArticles.rows.length}`);

    for (const row of localArticles.rows) {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = columns.map(() => "?").join(",");
      
      try {
        await cloud.execute({
          sql: `INSERT OR REPLACE INTO Article (${columns.join(",")}) VALUES (${placeholders})`,
          args: values
        });
        console.log(`Pushed: ${row.title}`);
      } catch (e: any) {
        console.error(`Failed to push ${row.id}:`, e.message);
      }
    }

    const localTrans = await local.execute("SELECT * FROM ArticleTranslation");
    console.log(`Local translations: ${localTrans.rows.length}`);

    for (const row of localTrans.rows) {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = columns.map(() => "?").join(",");
      
      try {
        await cloud.execute({
          sql: `INSERT OR REPLACE INTO ArticleTranslation (${columns.join(",")}) VALUES (${placeholders})`,
          args: values
        });
      } catch (e: any) {
        console.error(`Failed to push translation for ${row.articleId}:`, e.message);
      }
    }

    console.log("✅ Cloud Sync Complete!");
  } catch (error: any) {
    console.error("Fatal Push Error:", error.message);
  }
}

pushToCloud();
