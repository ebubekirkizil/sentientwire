"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const pathname = usePathname();

  if (pathname?.includes("/admin")) {
    return null;
  }

  const sections = [
    {
      title: t('categories'),
      links: [
        { label: t('cybersecurity'), href: `/${locale}/category/cybersecurity` },
        { label: t('ai'), href: `/${locale}/category/ai` },
        { label: t('quantum'), href: `/${locale}/category/quantum` },
        { label: t('hardware'), href: `/${locale}/category/hardware` },
        { label: t('defense'), href: `/${locale}/category/defense` },
      ]
    },
    {
      title: t('corporate'),
      links: [
        { label: t('about'), href: `/${locale}/about` },
        { label: t('careers'), href: `/${locale}` },
        { label: t('contact'), href: `/${locale}` },
      ]
    },
    {
      title: t('legal'),
      links: [
        { label: t('privacy'), href: `/${locale}/legal/privacy` },
        { label: t('terms'), href: `/${locale}/legal/terms` },
        { label: t('cookies'), href: `/${locale}/legal/cookies` },
      ]
    }
  ];

  return (
    <footer
      style={{
        background: "var(--bg-footer)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "48px 24px 28px",
        transition: "background-color 0.3s ease",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div translate="no" className="notranslate" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text-primary)", marginBottom: 12 }}>
              SENTIENT<span style={{ color: "#06b6d4" }}>WIRE</span>
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 280 }}>
              {t('description')}
            </p>
          </div>
          {sections.map((sec) => (
            <div key={sec.title}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 14, textTransform: "uppercase" }}>
                {sec.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#22d3ee"}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} <span translate="no" className="notranslate">Sentient Wire</span>. {t('allRightsReserved')}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", animation: "pulse 1.8s infinite" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>{t('systemActive')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
