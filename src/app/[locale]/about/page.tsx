import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%] opacity-30" />
        <div 
          className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)" }} 
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <span translate="no" className="notranslate">{t('name').split(' ')[0]} <span className="text-[var(--cyan-bright)]">{t('name').split(' ')[1]}</span></span>
          </h1>
          <div className="h-1 w-20 bg-[var(--cyan-bright)] rounded mb-8"></div>
        </div>

        <div className="space-y-12 text-lg leading-relaxed text-[var(--text-secondary)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          
          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">{t('subtitle')}</h2>
            <p className="mb-4">
              {t('history1')}
            </p>
            <p>
              {t('history2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">{t('missionTitle')}</h2>
            <p className="mb-4">
              <span translate="no" className="notranslate">{t('name')}</span> {t('missionP1')}
            </p>
            <p>
              {t('missionP2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">{t('visionTitle')}</h2>
            <p className="mb-4">
              {t('visionP1')}
            </p>
            <div className="mt-8 p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-lg">
              <p className="text-[var(--cyan-bright)] font-mono text-sm uppercase tracking-widest mb-2">Manifesto</p>
              <p className="italic text-[var(--text-primary)]">
                "{t('manifesto')}"
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

