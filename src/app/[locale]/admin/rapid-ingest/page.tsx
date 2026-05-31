"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { processArticle } from "@/app/actions/article";

export default function RapidIngest() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const router = useRouter();

  const [rawText, setRawText] = useState("");
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) {
      alert("Please enter news text or a topic.");
      return;
    }

    setLoading(true);
    setStatus("AI is analyzing and researching assets...");
    
    try {
      const res = await processArticle(rawText, manualImageUrl || undefined);
      if (res.success) {
        setStatus("✅ SUCCESS: Article published and translated to 9 languages.");
        setTimeout(() => {
          router.push(`/${locale}/admin`);
        }, 2000);
      } else {
        setStatus("❌ ERROR: " + res.error);
        setLoading(false);
      }
    } catch (err) {
      setStatus("❌ CRITICAL ERROR: " + String(err));
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href={`/${locale}/admin`} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan-bright)] transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">AI Rapid Ingest</h1>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest">Automation Mode: Full Autonomous Rewriting & Visual Research</p>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--cyan-bright)"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
        </div>

        <form onSubmit={handleProcess} className="flex flex-col gap-8 relative z-10">
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[11px] text-[var(--cyan-bright)] tracking-[0.2em] uppercase font-bold">Raw Intelligence / Topic Source</label>
            <textarea
              required
              rows={12}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              disabled={loading}
              className="w-full bg-[#020408] border border-[var(--border-subtle)] rounded-xl p-5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-bright)] focus:ring-1 focus:ring-[var(--cyan-dim)] transition-all resize-none shadow-inner leading-relaxed"
              placeholder="Paste a news article link, a paragraph from a newsletter, or just a topic like 'Microsoft and OpenAI partnership on Stargate supercomputer'..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-mono text-[11px] text-[var(--text-muted)] tracking-[0.2em] uppercase">Manual Hero Image (Optional)</label>
            <input
              type="url"
              value={manualImageUrl}
              onChange={(e) => setManualImageUrl(e.target.value)}
              disabled={loading}
              className="w-full bg-[#020408] border border-[var(--border-subtle)] rounded-xl p-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-all"
              placeholder="https://images.unsplash.com/... (If empty, AI will research 2 high-quality photos)"
            />
          </div>

          <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan-bright)] text-[#020408] font-black font-mono py-5 rounded-xl tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-[#020408]/20 border-t-[#020408] animate-spin" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <svg className="group-hover:scale-110 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  EXECUTE AUTO-PILOT
                </>
              )}
            </button>

            {status && (
              <div className={`p-4 rounded-lg font-mono text-[11px] text-center border ${status.includes('✅') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--cyan-bright)] animate-pulse'}`}>
                {status}
              </div>
            )}
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#020408]/50 p-4 rounded-xl border border-[var(--border-subtle)]">
            <div className="text-[var(--cyan-bright)] mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h4 className="text-[10px] font-bold font-mono text-white tracking-widest uppercase mb-1">Deep Research</h4>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">AI analyzes the topic and performs visual research on Unsplash to find 2 thematic images.</p>
          </div>
          <div className="bg-[#020408]/50 p-4 rounded-xl border border-[var(--border-subtle)]">
            <div className="text-[var(--cyan-bright)] mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/></svg>
            </div>
            <h4 className="text-[10px] font-bold font-mono text-white tracking-widest uppercase mb-1">9-Locale Translation</h4>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">The final report is automatically translated into Turkish, Spanish, Chinese, Arabic, and more.</p>
          </div>
          <div className="bg-[#020408]/50 p-4 rounded-xl border border-[var(--border-subtle)]">
            <div className="text-[var(--cyan-bright)] mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            </div>
            <h4 className="text-[10px] font-bold font-mono text-white tracking-widest uppercase mb-1">Premium Assets</h4>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">Injects a hero image and a contextual middle-content image for maximum Google News retention.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
