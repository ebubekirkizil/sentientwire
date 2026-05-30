import { createClient } from "@libsql/client";

async function checkCloud() {
  const url = "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io";
  const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg";

  console.log("Checking CLOUD Turso Database...");

  const db = createClient({
    url,
    authToken,
  });

  try {
    const result = await db.execute("SELECT COUNT(*) as count FROM Article");
    console.log("Cloud Article Count:", result.rows[0].count);
    
    if (result.rows[0].count > 0) {
        const samples = await db.execute("SELECT id, title, locale FROM Article LIMIT 5");
        console.log("Sample Articles:", samples.rows);
    }

    const trans = await db.execute("SELECT COUNT(*) as count FROM ArticleTranslation");
    console.log("Cloud Translation Count:", trans.rows[0].count);

  } catch (error: any) {
    console.error("Cloud Turso Error:", error.message);
  }
}

checkCloud();
