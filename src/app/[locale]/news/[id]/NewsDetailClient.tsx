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

      {/* Main Content Container centered */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 pt-32 md:pt-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="w-full">
        
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

           {/* Share Buttons */}
           <div className="flex items-center gap-4 mt-8 py-6 border-y border-[var(--border-subtle)]">
             <span className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-wider">{t('shareIntel') || 'SHARE INTEL'}:</span>
             <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noreferrer" className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--cyan-bright)] hover:text-[var(--cyan-bright)] rounded-full transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             </a>
             <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer" className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--cyan-bright)] hover:text-[var(--cyan-bright)] rounded-full transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </a>
             <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noreferrer" className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--cyan-bright)] hover:text-[var(--cyan-bright)] rounded-full transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
             </a>
           </div>

         </div>
        </div>
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
