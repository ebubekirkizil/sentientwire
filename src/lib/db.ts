import { createClient } from "@libsql/client";

// DEFINITIVE FIX: Environment detection
const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

// Use Dashboard Env Vars if available, otherwise use hardcoded fallbacks for Turso
const TURSO_URL = "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg";

let url = (process.env.DATABASE_URL || TURSO_URL).trim();
let authToken = (process.env.DATABASE_AUTH_TOKEN || TURSO_TOKEN).trim();

// On local development, force file:dev.db for speed and to save quota
if (!isVercel) {
  url = "file:dev.db";
  authToken = "";
}

export const db = createClient({
  url,
  authToken: authToken || undefined,
});
