"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <Link
              key={i}
              href={`/${locale}/news/t1`}
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
              <span style={{ color: "#ef4444", fontWeight: 800, animation: "pulse 1.5s infinite" }}>SON DAKİKA_</span>
              {item.text}
            </Link>
          ))}
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
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(129,140,248,0.2))",
                border: "1.5px solid rgba(6,182,212,0.6)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(6,182,212,0.3)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
                <path d="M2 12h4l3-9 5 18 3-9h5" />
              </svg>
            </div>
            <div>
              <span translate="no" className="notranslate" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                SENTIENT<span style={{ color: "#06b6d4" }}>WIRE</span>
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "ANA SAYFA", href: `/${locale}` },
              { label: "SİBER GÜVENLİK", href: `/${locale}/category/cybersecurity` },
              { label: "YAPAY ZEKA", href: `/${locale}/category/ai` },
              { label: "DONANIM", href: `/${locale}/category/hardware` }
            ].map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
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
                Hesap Girişi
              </span>
            </button>
          </div>
        </div>
      </nav>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
