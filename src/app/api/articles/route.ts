import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export async function GET() {
  try {
    const rs = await db.execute("SELECT * FROM Article ORDER BY createdAt DESC");
    return NextResponse.json(rs.rows);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
