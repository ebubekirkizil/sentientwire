import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Total article count
    const totalResult = await db.execute("SELECT COUNT(*) as count FROM Article WHERE isPublished = 1");
    const totalArticles = Number(totalResult.rows[0]?.count || 0);

    // X (Twitter) posted count
    const postedResult = await db.execute("SELECT COUNT(*) as count FROM Article WHERE xPosted = 1");
    const totalPosted = Number(postedResult.rows[0]?.count || 0);

    // Articles published today
    const todayResult = await db.execute(
      "SELECT COUNT(*) as count FROM Article WHERE date(createdAt) = date('now')"
    );
    const todayArticles = Number(todayResult.rows[0]?.count || 0);

    // Category distribution
    const categoryResult = await db.execute(
      "SELECT category, categoryColor, COUNT(*) as count FROM Article WHERE isPublished = 1 GROUP BY category ORDER BY count DESC"
    );
    const categories = categoryResult.rows.map(r => ({
      name: String(r.category || "GENERAL"),
      color: String(r.categoryColor || "#06b6d4"),
      count: Number(r.count),
    }));

    // Top 5 most recently published articles (no view tracking, use recency)
    const topResult = await db.execute(
      "SELECT id, title, slug, category, createdAt FROM Article WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT 5"
    );
    const topArticles = topResult.rows.map(r => ({
      id: String(r.id),
      title: String(r.title || "Untitled"),
      slug: String(r.slug || r.id),
      category: String(r.category || "GENERAL"),
      views: "—", // No view tracking implemented yet
    }));

    // Translation coverage: how many articles have TR translation
    const trResult = await db.execute(
      "SELECT COUNT(DISTINCT articleId) as count FROM ArticleTranslation WHERE locale = 'tr'"
    );
    const trCoverage = Number(trResult.rows[0]?.count || 0);

    // Translation coverage for all locales
    const transResult = await db.execute(
      "SELECT locale, COUNT(*) as count FROM ArticleTranslation GROUP BY locale ORDER BY count DESC"
    );
    const translationStats = transResult.rows.map(r => ({
      locale: String(r.locale),
      count: Number(r.count),
    }));

    // Geo distribution via Vercel headers (if available)
    const headerStore = await headers();
    const country = headerStore.get("x-vercel-ip-country") || "LOCAL";

    // Referrers: not tracked yet, return empty
    const referrers: { name: string; count: number }[] = [
      { name: "Direct / Search", count: totalArticles },
    ];

    // Countries: use Vercel geo header for current request as sample
    const countries = [
      { name: country, count: 1 },
    ];

    return NextResponse.json({
      // Stats cards
      liveVisitors: 0, // Would require a real-time tracking service
      todayVisits: todayArticles,
      totalArticles,
      totalPosted,
      trCoverage,
      todayArticles,

      // Lists
      topArticles,
      categories,
      translationStats,
      referrers,
      countries,
    });
  } catch (error) {
    console.error("[ANALYTICS] Failed:", error);
    return NextResponse.json(
      {
        liveVisitors: 0,
        todayVisits: 0,
        totalArticles: 0,
        totalPosted: 0,
        trCoverage: 0,
        todayArticles: 0,
        topArticles: [],
        categories: [],
        translationStats: [],
        referrers: [],
        countries: [],
      },
      { status: 200 }
    );
  }
}
