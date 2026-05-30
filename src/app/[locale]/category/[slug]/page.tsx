'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CategoryPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = use(params);
  const title = resolvedParams.slug.toUpperCase();
  const [dbArticles, setDbArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    fetch(`/api/articles?locale=${resolvedParams.locale}`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          const filtered = data.filter(a => {
            const cat = a.category.toLowerCase();
            const s = resolvedParams.slug.toLowerCase();
            return cat === s || cat.includes(s) || s.includes(cat);
          });
          setDbArticles(filtered);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [resolvedParams.locale, resolvedParams.slug]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 10%, var(--cyan-dim) 0%, transparent 60%)"
      }} />

      <div className="max-w-5xl mx-auto px-6 pt-40 relative z-10">

        {/* Category Header */}
        <div className="mb-14 border-b border-[var(--border-subtle)] pb-10">
           <div className="font-mono text-xs text-[var(--cyan-bright)] mb-2 tracking-[0.2em]">{t('News.intelArchive') || 'INTEL ARCHIVE DIRECTORY'}</div>
           <h1 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
             {t(`Header.nav.${resolvedParams.slug.toLowerCase()}`) || title}
           </h1>
           <p className="mt-4 text-[var(--text-secondary)] max-w-2xl text-lg">
             {t('News.categoryDesc') || `Latest threat intelligence, strategic developments, and decrypted reports pertaining to the ${title} sector.`}
           </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
             <div className="col-span-2 text-center py-20 font-mono text-[var(--cyan-bright)] animate-pulse">
               {t('News.scanning') || 'SCANNING DATABANK...'}
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
                   {t(`Header.nav.${article.category.toLowerCase()}`) || article.category}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--cyan-bright)] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                   {article.title}
                 </h2>
                 <p className="text-[var(--text-secondary)] mb-4 flex-1 text-sm leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                   {(article.excerpt || article.summary || "").slice(0, 120)}...
                 </p>
                 <div className="font-mono text-xs text-[var(--text-muted)] flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                   <span>{article.originalUrl || t('News.techIntel') || "TECHINTEL ANALYSIS"}</span>
                   <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </Link>
          )) : (
             <div className="col-span-2 text-center py-20 font-mono text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-xl">
               {t('News.noRecords') || 'NO RECORDS FOUND IN THIS SECTOR.'}
             </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
