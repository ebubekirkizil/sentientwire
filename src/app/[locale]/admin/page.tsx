"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteArticle } from "@/app/actions/article";
import { triggerTweetManual } from "@/app/actions/bot";
import { useParams } from "next/navigation";

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tweetingId, setTweetingId] = useState<string | null>(null);
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this intelligence report?")) {
      await deleteArticle(id);
      fetchArticles();
    }
  };

  const handleTweet = async (id: string) => {
    setTweetingId(id);
    const res = await triggerTweetManual(id);
    setTweetingId(null);
    
    if (res.success) {
      alert("SUCCESSFULLY POSTED TO X\n\nTweet: " + res.tweet);
      fetchArticles();
    } else {
      alert("FAILED TO POST TO X: " + res.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-[var(--text-primary)]">Intelligence Databank</h2>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1">Manage decrypted reports and leaked files.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
                <th className="px-6 py-4 font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Classification</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Report Title</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">Date / Time</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center font-mono text-[var(--cyan-bright)] animate-pulse">
                    SCANNING DATABANK...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)] border-dashed">
                    NO RECORDS FOUND IN DATABANK.
                  </td>
                </tr>
              ) : (
                articles.map(article => (
                  <tr key={article.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-card)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: article.categoryColor || "var(--cyan-bright)" }} />
                        <span className="font-mono text-[10px] text-[var(--text-secondary)]">{article.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="font-sans text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--cyan-bright)] transition-colors line-clamp-1">
                          {article.title}
                        </div>
                        {article.xPosted && (
                          <span title="Posted to X (Twitter)" className="bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/30 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            POSTED
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1">ID: {article.slug.substring(0,8)}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[var(--text-muted)]">
                      {new Date(article.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!article.xPosted && (
                          <button 
                            onClick={() => handleTweet(article.id)} 
                            disabled={tweetingId === article.id}
                            className="font-mono text-[10px] text-blue-400 hover:text-white transition-colors border border-blue-500/20 hover:bg-blue-500/20 px-2 py-1 rounded disabled:opacity-50"
                          >
                            {tweetingId === article.id ? "POSTING..." : "TWEET"}
                          </button>
                        )}
                        <Link href={`/${locale}/news/${article.slug}`} target="_blank" className="font-mono text-[10px] text-[var(--cyan-bright)] hover:text-white transition-colors border border-[var(--cyan-dim)] px-2 py-1 rounded">
                          VIEW
                        </Link>
                        <button onClick={() => handleDelete(article.id)} className="font-mono text-[10px] text-red-400 hover:text-white transition-colors border border-red-500/20 hover:bg-red-500/20 px-2 py-1 rounded">
                          PURGE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
