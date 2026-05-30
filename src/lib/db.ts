import { createClient } from "@libsql/client";

const url = (process.env.DATABASE_URL || "file:dev.db").trim();
const authToken = (process.env.DATABASE_AUTH_TOKEN || "").trim();

export const db = createClient({
  url,
  authToken: authToken || undefined,
});
