"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
      
    // Refresh every 30 seconds for live feel
    const interval = setInterval(() => {
      fetch("/api/analytics")
        .then(res => res.json())
        .then(d => setData(d));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center font-mono text-[var(--cyan-bright)] animate-pulse py-20">INITIALIZING TELEMETRY...</div>;
  }

  if (!data) return <div className="text-red-500 font-mono text-center">SYSTEM FAILURE. NO TELEMETRY DATA.</div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Live Users Card */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="font-mono text-[10px] text-[var(--text-muted)]">LIVE</span>
          </div>
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-widest mb-2">ACTIVE SESSIONS (5 MIN)</h3>
          <div className="text-6xl font-sans font-extrabold text-[var(--cyan-bright)] drop-shadow-[0_0_15px_var(--cyan-dim)]">
            {data.liveVisitors || 0}
          </div>
          <p className="font-mono text-[10px] text-[var(--text-muted)] mt-4 border-t border-[var(--border-subtle)] pt-4 w-full text-center">
            TOTAL TODAY: {data.todayVisits || 0}
          </p>
        </div>

        {/* Top Articles Card */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-widest mb-4 border-b border-[var(--border-subtle)] pb-2">TOP ARTICLES (VIEWS)</h3>
          <div className="flex flex-col gap-3">
            {data.topArticles?.length === 0 && <div className="text-[var(--text-muted)] text-sm font-mono">NO DATA</div>}
            {data.topArticles?.map((article: any, idx: number) => (
              <div key={article.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="font-mono text-xs text-[var(--cyan-bright)] opacity-50">0{idx + 1}</span>
                  <Link href={`/${locale}/news/${article.slug}`} target="_blank" className="font-sans text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--cyan-bright)] truncate transition-colors">
                    {article.title}
                  </Link>
                </div>
                <div className="font-mono text-xs text-[var(--cyan-bright)] bg-[var(--cyan-dim)] px-2 py-1 rounded ml-4">
                  {article.views}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referrers */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-widest mb-4 border-b border-[var(--border-subtle)] pb-2">TRAFFIC SOURCES</h3>
          <div className="flex flex-col gap-3">
            {data.referrers?.length === 0 && <div className="text-[var(--text-muted)] text-sm font-mono">NO DATA</div>}
            {data.referrers?.map((ref: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-secondary)] truncate">{ref.name}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{ref.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-widest mb-4 border-b border-[var(--border-subtle)] pb-2">GEO DISTRIBUTION</h3>
          <div className="flex flex-col gap-3">
            {data.countries?.length === 0 && <div className="text-[var(--text-muted)] text-sm font-mono">NO DATA</div>}
            {data.countries?.map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-secondary)]">{c.name === "UNKNOWN" ? "LOCAL/UNKNOWN" : c.name}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
