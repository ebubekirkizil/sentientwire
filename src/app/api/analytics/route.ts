import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return mock data so the dashboard UI can be viewed
    return NextResponse.json({
      liveVisitors: 42,
      topArticles: [
        { id: "1", title: "Operation Aurora 2.0: Nation-State Actors...", views: 15420, category: "THREAT INTEL", slug: "operation-aurora-2" },
        { id: "2", title: "Quantum Decryption Milestone", views: 12050, category: "QUANTUM", slug: "quantum-decryption" },
        { id: "3", title: "Autonomous Drone Swarm Deployed", views: 9800, category: "DEFENSE", slug: "drone-swarm" },
        { id: "4", title: "AI Protocol Poisoning Detected", views: 8400, category: "AI", slug: "ai-poisoning" },
        { id: "5", title: "Undersea Cable Tapped", views: 7200, category: "INFRASTRUCTURE", slug: "cable-tapped" }
      ],
      referrers: [
        { name: "Direct", count: 1205 },
        { name: "Google", count: 850 },
        { name: "Twitter", count: 420 },
        { name: "LinkedIn", count: 310 },
        { name: "HackerNews", count: 180 }
      ],
      countries: [
        { name: "United States", count: 850 },
        { name: "Germany", count: 420 },
        { name: "United Kingdom", count: 310 },
        { name: "Turkey", count: 250 },
        { name: "Japan", count: 150 }
      ],
      todayVisits: 3540
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
