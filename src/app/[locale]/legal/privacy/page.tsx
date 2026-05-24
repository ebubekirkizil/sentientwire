import React from "react";
import { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations('Privacy');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-10"
          style={{ background: "radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)" }} 
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {t('title').split(' ')[0]} <span className="text-[var(--cyan-bright)]">{t('title').split(' ')[1]}</span>
          </h1>
          <div className="h-1 w-16 bg-[var(--cyan-bright)] rounded mb-4"></div>
          <p className="text-sm text-[var(--text-muted)] font-mono">{t('lastUpdate')}: {new Date().toLocaleDateString(locale)}</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{t('s1Title')}</h2>
            <p>
              {t('s1P1')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{t('s2Title')}</h2>
            <p>
              {t('s2P1')}
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>{t('s2Item1')}</li>
              <li>{t('s2Item2')}</li>
              <li>{t('s2Item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{t('s3Title')}</h2>
            <p>
              {t('s3P1')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

