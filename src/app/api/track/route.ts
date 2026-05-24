import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import crypto from "crypto";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, referrer } = body;

    // Get IP address for hashing (for unique visitor counting)
    // On Vercel, this comes from the x-forwarded-for header
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    // Attempt to get country from Vercel/Cloudflare headers, otherwise fallback
    const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "UNKNOWN";

    // Hash the IP with the current date to track daily unique visitors privately
    const dateSalt = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const ipHash = crypto.createHash("sha256").update(`${ip}-${dateSalt}`).digest("hex");

    await db.execute({
      sql: `INSERT INTO PageVisit (id, url, referrer, country, ipHash, createdAt) 
            VALUES (hex(randomblob(16)), ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [url || "/", referrer || null, country, ipHash]
    });

    // If it's a news article, increment the views counter
    if (url && url.includes("/news/")) {
      const slugMatch = url.match(/\/news\/([^\/]+)/);
      if (slugMatch && slugMatch[1]) {
        const slug = slugMatch[1];
        // We do a fire-and-forget update to the article's view count
        db.execute({
          sql: `UPDATE Article SET views = views + 1 WHERE slug = ?`,
          args: [slug]
        }).catch(() => { /* ignore if article not found */ });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
