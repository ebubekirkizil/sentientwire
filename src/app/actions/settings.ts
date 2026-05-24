"use server";

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export async function getSettings() {
  try {
    const rs = await db.execute("SELECT * FROM SiteSettings");
    const config: Record<string, string> = {};
    rs.rows.forEach((row) => {
      if (row.key && typeof row.value === 'string') {
        config[row.key as string] = row.value;
      }
    });
    return config;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
}

export async function updateSettings(formData: FormData) {
  try {
    const updates = Array.from(formData.entries());
    
    for (const [key, value] of updates) {
      if (typeof value === "string") {
        await db.execute({
          sql: `INSERT INTO SiteSettings (key, value, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = CURRENT_TIMESTAMP`,
          args: [key, value]
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
