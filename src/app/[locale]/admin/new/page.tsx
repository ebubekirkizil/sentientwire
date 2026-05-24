"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createArticle } from "@/app/actions/article";

export default function NewArticle() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("locale", locale);
    
    const res = await createArticle(formData);
    
    setLoading(false);
    if (res.success) {
      router.push(`/${locale}/admin`);
    } else {
      alert("Failed to create intelligence report. Check logs.");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-2">
        <Link href={`/${locale}/admin`} className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan-bright)] hover:border-[var(--cyan-dim)] transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-[var(--text-primary)]">Log New Intelligence</h2>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1">Encrypt and publish a new report to the global feed.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">CLASSIFICATION (Sector)</label>
              <div className="flex gap-4">
                <select name="category" className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors">
                  <option value="CYBERSECURITY">CYBERSECURITY</option>
                  <option value="ARTIFICIAL INTELLIGENCE">ARTIFICIAL INTELLIGENCE</option>
                  <option value="QUANTUM">QUANTUM</option>
                  <option value="HARDWARE">HARDWARE</option>
                  <option value="DEFENSE">DEFENSE</option>
                </select>
                <input type="color" name="categoryColor" defaultValue="#06b6d4" className="w-12 h-[46px] p-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg cursor-pointer" title="Category Accent Color" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Hero Image URL</label>
              <input name="imageUrl" type="url" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors" placeholder="https://images.unsplash.com/photo-..." />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Headline</label>
            <input required name="title" type="text" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors" placeholder="e.g. Operation Aurora 2.0 Detected" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Brief Summary</label>
            <textarea required name="summary" rows={2} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] resize-y transition-colors" placeholder="Short description for the home page cards..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase flex items-center justify-between">
              <span>Full Decrypted Content</span>
              <span className="text-[var(--cyan-dim)]">Markdown Supported</span>
            </label>
            <textarea required name="content" rows={12} className="bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-4 text-[var(--cyan-bright)] outline-none focus:border-[var(--cyan-dim)] resize-y font-mono text-sm shadow-inner transition-colors" placeholder="Write the full intelligence report here..." />
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[var(--cyan-bright)] text-[#020408] font-bold font-mono px-8 py-3 rounded-lg tracking-widest hover:bg-[var(--cyan)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#020408]/20 border-t-[#020408] animate-spin" />
                  ENCRYPTING...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  PUBLISH REPORT
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
