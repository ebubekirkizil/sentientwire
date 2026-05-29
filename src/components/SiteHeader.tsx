"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";
import { LoginModal } from "./LoginModal";

const TICKER_ITEMS = [
  { text: "YAPAY ZEKA DÜZENLEMELERİNDE YENİ DÖNEM BAŞLIYOR", url: "#" },
  { text: "KUANTUM ÇİP ÜRETİMİNDE BEKLENMEYEN ATILIM", url: "#" },
  { text: "GLOBAL TEKNOLOJİ DEVLERİNDEN ORTAK BİLDİRİ", url: "#" },
  { text: "YENİ NESİL OTONOM ARAÇLAR ŞEHİR TESTİNE ÇIKTI", url: "#" },
  { text: "SENTIENT WIRE ÖZEL RÖPORTAJ: GELECEĞİN MİMARLARI", url: "#" },
];

export function SiteHeader() {
  const t = useTranslations("Header");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [tickerArticles, setTickerArticles] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/articles?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTickerArticles(data.slice(0, 5));
        }
      })
      .catch(err => console.error("Ticker fetch error:", err));
  }, [locale]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── Breaking news ticker ───────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: 38,
          background: "var(--bg-primary)",
          borderBottom: "1.5px solid rgba(6,182,212,0.3)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            display: "inline-flex",
            animation: "ticker 35s linear infinite",
            willChange: "transform",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {tickerArticles.length > 0 ? (
            [...tickerArticles, ...tickerArticles].map((art, i) => (
              <Link
                key={i}
                href={`/${locale}/news/${art.slug || art.id}`}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--cyan-bright)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  paddingRight: 40,
                  letterSpacing: "0.05em",
                }}
              >
                <span style={{ color: "#ef4444", fontWeight: 800, animation: "pulse 1.5s infinite" }}>{t('breaking')}_</span>
                {art.title.toUpperCase()}
              </Link>
            ))
          ) : (
            [0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((itemIdx, i) => (
              <Link
                key={i}
                href={`/${locale}`}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--cyan-bright)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  paddingRight: 40,
                  letterSpacing: "0.05em",
                }}
              >
                <span style={{ color: "#ef4444", fontWeight: 800, animation: "pulse 1.5s infinite" }}>{t('breaking')}_</span>
                {t(`ticker.${itemIdx}`)}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* ─── Navbar ─────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 38, /* Ticker height offset */
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "var(--bg-glass)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
        }}
      >
        {/* Outer cyan border glow */}
        {scrolled && <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(6,182,212,0.12)", pointerEvents: "none" }} />}

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo.png" alt="SentientWire Logo" width={36} height={36} style={{ borderRadius: 8, border: "1.5px solid rgba(6,182,212,0.6)", boxShadow: "0 0 12px rgba(6,182,212,0.3)" }} />
            <div>
              <span translate="no" className="notranslate" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                SENTIENT<span style={{ color: "#06b6d4" }}>WIRE</span>
              </span>
            </div>
          </Link>

          {/* Nav links - visible on sm+ (tablets and desktops) */}
          <div className="hidden sm:flex items-center gap-5">
            {[
              { label: t('nav.home'), href: `/${locale}` },
              { label: t('nav.ai'), href: `/${locale}/category/ai` },
              { label: t('nav.cybersecurity'), href: `/${locale}/category/cybersecurity` },
              { label: t('nav.defense'), href: `/${locale}/category/defense` },
              { label: t('nav.quantum'), href: `/${locale}/category/quantum` },
              { label: t('nav.hardware'), href: `/${locale}/category/hardware` },
              { label: t('nav.space'), href: `/${locale}/category/space` },
            ].map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Search Icon */}
            <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#06b6d4"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            
            {/* Language Selector Dropdown */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <select
                value={locale}
                onChange={(e) => router.replace(pathname, { locale: e.target.value })}
                style={{
                  background: "rgba(6, 182, 212, 0.05)",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                  borderRadius: "6px",
                  color: "var(--text-primary)",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  cursor: "pointer",
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(6, 182, 212, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <option value="tr" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>TR</option>
                <option value="en" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>EN</option>
                <option value="de" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>DE</option>
                <option value="es" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>ES</option>
                <option value="fr" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>FR</option>
                <option value="it" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>IT</option>
                <option value="nl" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>NL</option>
                <option value="pl" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>PL</option>
              </select>
            </div>

            <ThemeToggle />
            
            {/* Profile / Login Button */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#06b6d4"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="hidden sm:inline" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 500 }}>
                {t('login')}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button - PHONES ONLY (< 640px) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                padding: 4,
                zIndex: 100,
              }}
              className="flex sm:hidden"
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16M4 6h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 102, /* 38px ticker + 64px navbar height */
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(8, 15, 28, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(6,182,212,0.2)",
            zIndex: 45,
            display: "flex",
            flexDirection: "column",
            padding: "24px 24px 40px",
            gap: 20,
            animation: "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {[
            { label: t('nav.home'), href: `/${locale}` },
            { label: t('nav.ai'), href: `/${locale}/category/ai` },
            { label: t('nav.cybersecurity'), href: `/${locale}/category/cybersecurity` },
            { label: t('nav.defense'), href: `/${locale}/category/defense` },
            { label: t('nav.quantum'), href: `/${locale}/category/quantum` },
            { label: t('nav.hardware'), href: `/${locale}/category/hardware` },
            { label: t('nav.space'), href: `/${locale}/category/space` },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.05em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              {link.label}
            </Link>
          ))}
          
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsLoginOpen(true);
            }}
            style={{
              marginTop: 20,
              padding: "14px",
              background: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              borderRadius: 8,
              color: "#06b6d4",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.05em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t('login')}
          </button>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
