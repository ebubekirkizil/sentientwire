import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"
});

async function run() {
  const articles = await db.execute("SELECT id, title, locale FROM Article");
  console.log(`Total Articles: ${articles.rows.length}`);
  
  for (const art of articles.rows) {
    const trans = await db.execute({
      sql: "SELECT locale FROM ArticleTranslation WHERE articleId = ?",
      args: [art.id]
    });
    const locales = trans.rows.map(r => r.locale);
    console.log(`Article: [${art.id}] (Original: ${art.locale}) - Title: "${art.title}"`);
    console.log(`  Translations: ${locales.join(", ") || "NONE"}`);
  }
}

run();
