"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const pathname = usePathname();

  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <footer
      style={{
        background: "var(--bg-footer)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "48px 24px 28px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div translate="no" className="notranslate" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text-primary)", marginBottom: 12 }}>
              SENTIENT<span style={{ color: "#06b6d4" }}>WIRE</span>
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 280 }}>
              Yapay zeka devrimini, gelecek teknolojilerini ve dijital dünyadaki kırılma noktalarını herkesten önce keşfedin.
            </p>
          </div>
          {[
            ["Kategoriler", ["Siber Güvenlik", "Yapay Zeka", "Kuantum", "Donanım", "Savunma"]],
            ["Kurumsal", ["Hakkımızda", "Kariyer", "İletişim"]],
            ["Yasal", ["Gizlilik Politikası", "Kullanım Koşulları", "Çerez Politikası"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 14, textTransform: "uppercase" }}>
                {title as string}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {(links as string[]).map((link) => {
                  let href = `/${locale}`;
                  if (link === "Hakkımızda") href = `/${locale}/about`;
                  else if (link === "Gizlilik Politikası") href = `/${locale}/legal/privacy`;
                  else if (link === "Kullanım Koşulları") href = `/${locale}/legal/terms`;
                  else if (link === "Çerez Politikası") href = `/${locale}/legal/cookies`;
                  
                  return (
                    <li key={link}>
                      <Link href={href} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#22d3ee"}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
                      >{link}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} <span translate="no" className="notranslate">Sentient Wire</span>. Tüm hakları saklıdır.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", animation: "pulse 1.8s infinite" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>SİSTEM AKTİF</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
