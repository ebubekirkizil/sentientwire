import { createClient } from "@libsql/client";

const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

let url = (process.env.DATABASE_URL || "file:dev.db").trim();
let authToken = (process.env.DATABASE_AUTH_TOKEN || "").trim();

// On local development, always fallback to file:dev.db unless we explicitly want Turso
if (!isVercel) {
  url = "file:dev.db";
  authToken = "";
  console.log(`[DB-INIT] Local Development: Using ${url}`);
} else {
  console.log(`[DB-INIT] Production/Vercel: Using Cloud Database`);
}

export const db = createClient({
  url,
  authToken: authToken || undefined,
});
