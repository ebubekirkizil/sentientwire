'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = use(params);
  const title = resolvedParams.slug.toUpperCase();
  const [dbArticles, setDbArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          const filtered = data.filter(a => a.category.toLowerCase() === title.toLowerCase());
          setDbArticles(filtered);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [title]);

  // Mock articles for the category (fallback)
  const articles = [
    {
      id: "c1",
      title: `${title} Framework Updated`,
      excerpt: `The new global standard for ${title.toLowerCase()} implementations has been published by the cyber intelligence alliance, enforcing strict zero-trust parameters.`,
      ago: "3 hours ago",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=600&h=350"
    },
    {
      id: "c2",
      title: `Critical Vulnerability in Core ${title} Nodes`,
      excerpt: `Analysts have detected widespread probing of infrastructure associated with legacy ${title.toLowerCase()} systems. Immediate patching recommended.`,
      ago: "7 hours ago",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600&h=350"
    },
    {
      id: "c3",
      title: `${title} Sector Investment Surges 400%`,
      excerpt: `Venture capital has flooded into early-stage startups focused on ${title.toLowerCase()} defense and monitoring tools this quarter.`,
      ago: "1 day ago",
      image: "https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=600&h=350"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 10%, var(--cyan-dim) 0%, transparent 60%)"
      }} />

      <div className="max-w-5xl mx-auto px-6 pt-40 relative z-10">

        {/* Category Header */}
        <div className="mb-14 border-b border-[var(--border-subtle)] pb-10">
           <div className="font-mono text-xs text-[var(--cyan-bright)] mb-2 tracking-[0.2em]">INTEL ARCHIVE DIRECTORY</div>
           <h1 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
             {title}
           </h1>
           <p className="mt-4 text-[var(--text-secondary)] max-w-2xl text-lg">
             Latest threat intelligence, strategic developments, and decrypted reports pertaining to the {title} sector.
           </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
             <div className="col-span-2 text-center py-20 font-mono text-[var(--cyan-bright)] animate-pulse">
               SCANNING DATABANK...
             </div>
          ) : dbArticles.length > 0 ? dbArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/${resolvedParams.locale}/news/${article.slug}`}
              className="group border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-xl overflow-hidden hover:border-[var(--cyan-glow)] hover:shadow-[0_0_30px_var(--cyan-dim)] transition-all flex flex-col"
              style={{ textDecoration: 'none' }}
            >
              <div className="h-48 relative overflow-hidden border-b border-[var(--border-subtle)]">
                 <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${article.imageUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=350'})` }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-80" />
                 <div className="absolute top-4 left-4 font-mono text-xs font-bold text-[#020408] border border-[var(--border-glow)] px-2 py-1 rounded backdrop-blur-sm" style={{ backgroundColor: article.categoryColor || "var(--cyan-bright)" }}>
                   {article.category}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--cyan-bright)] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                   {article.title}
                 </h2>
                 <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                   {article.summary}
                 </p>
                 <div className="font-mono text-xs text-[var(--text-muted)] flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                   <span>{article.originalUrl || "TECHINTEL ANALYSIS"}</span>
                   <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </Link>
          )) : (
             <div className="col-span-2 text-center py-20 font-mono text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-xl">
               NO RECORDS FOUND IN THIS SECTOR.
             </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
