import { createClient } from "@libsql/client";

// Forced to local dev.db to bypass Turso quota issues
const url = "file:dev.db";
const authToken = "";

console.log(`[DB-INIT] FORCED LOCAL: ${url}`);

export const db = createClient({
  url,
  authToken: undefined,
});
