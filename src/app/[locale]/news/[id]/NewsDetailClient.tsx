'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function NewsDetailClient({ article, locale, relatedArticles = [] }: { article: any, locale: string, relatedArticles?: any[] }) {
  const t = useTranslations('News');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Pre-render content on server/initial load for SEO hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] font-sans pb-20 relative overflow-hidden text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
          <div className="flex items-center mb-8 gap-4 flex-wrap">
            <span className="bg-red-500/10 text-[var(--accent-red)] border border-red-500/20 px-3 py-1 rounded text-xs font-mono font-bold tracking-widest uppercase">
              {article.category || "GENERAL"}
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              {article.createdAt ? new Date(article.createdAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {article.title}
          </h1>
          <div className="w-full h-80 md:h-[450px] rounded-xl overflow-hidden relative border border-[var(--cyan-glow)] mb-12">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${article.imageUrl || "https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900"}')` }} />
          </div>
          <div className="text-lg leading-relaxed text-[var(--text-secondary)]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <p className="text-xl text-[var(--text-primary)] font-medium mb-8 leading-relaxed border-l-2 border-[var(--cyan-bright)] pl-5">
              {article.summary}
            </p>
            <article 
              className="mb-10 whitespace-pre-wrap text-[var(--text-secondary)] font-normal prose-custom" 
              style={{ "--tldr-title": `"${t('executiveSummary')}"` } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans pb-20 relative overflow-hidden text-[var(--text-primary)] transition-colors duration-300">
      
      {/* Cyberpunk Matrix Rain Background */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <MatrixRainCanvas theme={article?.categoryColor || '#06b6d4'} />
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%] pointer-events-none z-10" />
        <div 
          className="absolute inset-0 h-[150px] bg-gradient-to-b from-transparent via-[var(--cyan-glow)] to-transparent opacity-10 pointer-events-none z-20"
          style={{ animation: 'scanline 8s linear infinite' }}
        />
        {/* Pulsing Glow Center */}
        <div 
          className="absolute top-0 left-[20%] w-[60%] h-[100%] rounded-full blur-[120px] pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse, ${article?.categoryColor || 'var(--cyan-glow)'}40 0%, transparent 60%)`,
            animation: "pulseGlow 6s ease-in-out infinite",
          }} 
        />
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 pt-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Metadata */}
        <motion.div variants={itemVariants} className="flex items-center mb-8 gap-4 flex-wrap">
           <span className="bg-red-500/10 text-[var(--accent-red)] border border-red-500/20 px-3 py-1 rounded text-xs font-mono font-bold tracking-widest uppercase">
             {article.category || "GENERAL"} (ID: {article.slug ? article.slug.substring(0,8) : article.id.substring(0,8)})
           </span>
           <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
             {t('decrypted')}: {article.createdAt ? new Date(article.createdAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
           </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-8 leading-tight tracking-tight" 
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {article.title}
        </motion.h1>

        {/* Hero Image / Banner */}
        <motion.div variants={itemVariants} className="w-full h-80 md:h-[450px] rounded-xl overflow-hidden relative border border-[var(--cyan-glow)] mb-12 shadow-[0_0_30px_var(--cyan-dim)]">
           <motion.div 
             className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: `url('${article.imageUrl || 'https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900'}')` }}
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
           <div className="absolute bottom-4 right-6 font-mono text-xs text-[var(--cyan-bright)] tracking-widest opacity-80">
             {t('satelliteImagery')}
           </div>
        </motion.div>

        {/* Article Body */}
        <motion.div variants={itemVariants} className="text-lg leading-relaxed text-[var(--text-secondary)]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
           <p className="text-xl text-[var(--text-primary)] font-medium mb-8 leading-relaxed border-l-2 border-[var(--cyan-bright)] pl-5">
             {article.summary}
           </p>
           
           <article 
             className="mb-10 whitespace-pre-wrap text-[var(--text-secondary)] font-normal prose-custom" 
             style={{ "--tldr-title": `"${t('executiveSummary')}"` } as React.CSSProperties}
             dangerouslySetInnerHTML={{ __html: article.content }} 
           />

             <div className="pt-8 mt-12 border-t border-[var(--border-subtle)] flex items-center justify-between">
               <div className="font-mono text-xs text-[var(--text-muted)]">
                 {t('reportId')}: {(article.slug || article.id).substring(0,8).toUpperCase()}-X99-2026
               </div>
               <button 
                 onClick={() => {
                   document.dispatchEvent(new CustomEvent('openNewsletterModal'));
                   // Quick hack to open modal if they want to share/subscribe
                 }}
                 className="px-6 py-2 bg-[var(--cyan-dim)] border border-[var(--cyan-glow)] text-[var(--cyan-bright)] rounded text-sm font-bold tracking-widest hover:bg-[var(--cyan-bright)] hover:text-[#020408] transition-colors shadow-[0_0_15px_var(--cyan-dim)]"
               >
                 {t('shareIntel') || 'SUBSCRIBE FOR ALERTS'}
               </button>
             </div>
          </motion.div>

        {/* Related Reports */}
        {relatedArticles && relatedArticles.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-[var(--cyan-dim)]">
            <h2 className="text-2xl font-bold font-mono text-[var(--cyan-bright)] mb-6 uppercase tracking-wider">
              {locale === 'tr' ? 'İlgili İstihbarat Raporları' : 'Related Intelligence Reports'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel: any) => (
                <Link key={rel.id} href={`/${locale}/news/${rel.slug || rel.id}`} className="group block h-full">
                  <div className="h-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--cyan-glow)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--cyan-dim)] flex flex-col">
                    <div className="h-40 w-full relative overflow-hidden bg-black">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        style={{ backgroundImage: `url('${rel.imageUrl || 'https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=600&h=400'}')` }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="font-mono text-[10px] tracking-widest text-[var(--accent-red)] mb-3">
                        {rel.category || 'GENERAL'} // {(rel.slug || rel.id).substring(0,8).toUpperCase()}
                      </div>
                      <h3 className="text-md font-bold text-[var(--text-primary)] mb-3 leading-snug group-hover:text-[var(--cyan-bright)] transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-3 mt-auto">
                        {rel.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function MatrixRainCanvas({ theme = "#06b6d4" }: { theme?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=~[]{}|;:,.<>?/ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charsArray = characters.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    let animationFrameId: number;
    let lastDrawTime = 0;
    const FPS = 30;
    const frameInterval = 1000 / FPS;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastDrawTime < frameInterval) return;
      lastDrawTime = currentTime;

      ctx.fillStyle = "rgba(4, 8, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];

        if (Math.random() > 0.9) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = theme;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-25"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}
