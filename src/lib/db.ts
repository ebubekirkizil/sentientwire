import { createClient } from "@libsql/client";

// Always connect to the production Turso cloud database
// This ensures local scripts and Vercel both read/write to the same place
const TURSO_URL = "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg";

const url = (process.env.DATABASE_URL || TURSO_URL).trim();
const authToken = (process.env.DATABASE_AUTH_TOKEN || TURSO_TOKEN).trim();

export const db = createClient({
  url,
  authToken: authToken || undefined,
});
