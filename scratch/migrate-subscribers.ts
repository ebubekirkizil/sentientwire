import { createClient } from "@libsql/client";

// Connect directly to Turso so we don't accidentally create it only in local dev.db
// We need it in production!
const TURSO_URL = "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg";

const db = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

async function migrate() {
  console.log("Creating Subscriber table on Turso...");
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS Subscriber (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      locale TEXT DEFAULT 'en-US',
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log("Subscriber table created on Turso successfully!");

  // Also do it for local dev.db just in case
  const localDb = createClient({ url: "file:dev.db" });
  await localDb.execute(`
    CREATE TABLE IF NOT EXISTS Subscriber (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      locale TEXT DEFAULT 'en-US',
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Subscriber table created on local dev.db successfully!");
}

migrate().catch(console.error);
