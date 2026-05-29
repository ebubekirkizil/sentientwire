"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import HeroGlobe from "@/components/HeroGlobe";
import { useTranslations } from "next-intl";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  imageUrl: string;
  source: string;
  ago: string;
  icon?: string;
  createdAt?: string | Date;
};

// Mock fallbacks removed to ensure full integration with real database articles

function Hero() {
  const t = useTranslations('Index');
  const [globeSize, setGlobeSize] = useState(460);

  useEffect(() => {
    const handleResize = () => {
      setGlobeSize(Math.min(500, Math.round(window.innerWidth * 0.38)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @media (max-width: 991px) {
          .hero-inner-container {
            flex-direction: column-reverse !important;
            padding: 100px 24px 40px !important;
            text-align: center;
            min-height: auto !important;
          }
          .hero-globe-wrapper {
            width: 100% !important;
            max-width: 320px !important;
            margin-bottom: 20px;
          }
          .hero-text-wrapper {
            padding-left: 0 !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-stats-wrapper {
            justify-content: center !important;
          }
        }
      `}</style>
      {/* Background layers */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 80% 90% at 30% 50%, rgba(6,182,212,0.07) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 50% at 75% 50%, rgba(129,140,248,0.04) 0%, transparent 60%)",
        ].join(","),
      }}/>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
        backgroundSize: "65px 65px",
      }}/>

      <div className="hero-inner-container" style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        maxWidth: 1280,
        width: "100%",
        margin: "0 auto",
        padding: "90px 48px 60px",
        gap: 0,
        position: "relative",
        zIndex: 5,
        minHeight: "100vh",
      }}>

        {/* LEFT: Globe */}
        <div className="hero-globe-wrapper" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
          width: "clamp(320px, 42vw, 520px)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            width: "80%", height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}/>
          <HeroGlobe size={globeSize} />
        </div>

        {/* RIGHT: Text */}
        <div className="hero-text-wrapper" style={{ flex: 1, paddingLeft: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 26,
            padding: "5px 14px",
            border: "1px solid rgba(6,182,212,0.28)",
            borderRadius: 6,
            background: "rgba(6,182,212,0.05)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#ef4444", boxShadow: "0 0 8px #ef4444",
              animation: "pulse 1.8s ease-in-out infinite",
            }}/>
            <span style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10, letterSpacing: "0.2em",
              color: "#22d3ee", fontWeight: 600, textTransform: "uppercase",
            }}>{t('category')}</span>
          </div>

          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(2.2rem, 3.5vw, 4rem)",
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)", margin: "0 0 16px",
          }}>
            {t('title1')}<br/>
            <span style={{
              background: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 55%, #818cf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{t('title2')}</span>
          </h1>

          <p style={{
            color: "var(--text-secondary)", fontSize: 15.5, lineHeight: 1.7,
            maxWidth: 400, margin: "0 0 32px",
            fontFamily: "Space Grotesk, sans-serif",
          }}>
            {t('subtitle')}
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 44 }}>
            <button
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "12px 26px", background: "#06b6d4", color: "#ffffff",
                border: "none", borderRadius: 8,
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14,
                cursor: "pointer", boxShadow: "0 0 24px rgba(6,182,212,0.42)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.background="#22d3ee";
                (e.currentTarget as HTMLElement).style.boxShadow="0 0 40px rgba(6,182,212,0.6)";
                (e.currentTarget as HTMLElement).style.transform="translateY(-1px)";
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.background="#06b6d4";
                (e.currentTarget as HTMLElement).style.boxShadow="0 0 24px rgba(6,182,212,0.42)";
                (e.currentTarget as HTMLElement).style.transform="translateY(0)";
              }}
            >{t('ctaLatest')}</button>
            <button
              style={{
                padding: "12px 26px", background: "transparent", color: "var(--text-secondary)",
                border: "1px solid var(--border-glow)", borderRadius: 8,
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 14,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.borderColor="rgba(6,182,212,0.42)";
                (e.currentTarget as HTMLElement).style.color="#f0f9ff";
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.color="#94a3b8";
              }}
            >{t('ctaExplore')}</button>
          </div>

          <div className="hero-stats-wrapper" style={{
            display: "flex", gap: 32,
            paddingTop: 24, borderTop: "1px solid rgba(6,182,212,0.1)",
          }}>
            {[["340+",t('statReports')],["94",t('statNations')],["12K+",t('statSubscribers')]].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:22, fontWeight:700, color:"#22d3ee", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:9, color:"#334155", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        opacity:0.25, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
        zIndex: 20
      }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#22d3ee", marginBottom: 4, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll for Intel</div>
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" style={{ animation: "bounce 2s infinite" }}>
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="#06b6d4" strokeWidth="1.5"/>
          <circle cx="9" cy="8" r="2" fill="#06b6d4"/>
        </svg>
      </div>
    </section>
  );
}

function CatBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        color,
        background: color + "18",
        border: `1px solid ${color}45`,
        borderRadius: 4,
        padding: "3px 8px",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
      <h2
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "0.05em",
          color: "var(--text-primary)",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, rgba(6,182,212,0.6) 0%, rgba(6,182,212,0.05) 100%)", borderRadius: 1 }} />
    </div>
  );
}

function FeaturedSection({ locale, mainArticle, gridArticles }: { locale: string; mainArticle: any; gridArticles: any[] }) {
  const t = useTranslations('Index');

  if (!mainArticle) return null;

  return (
    <section
      id="featured"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "60px 24px 40px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <SectionTitle>{t('secFeatured')}</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BIG LEFT CARD */}
        <Link
          href={`/${locale}/news/${mainArticle.slug || mainArticle.id}`}
          style={{
            position: "relative",
            display: "block",
            textDecoration: "none",
            color: "inherit",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(6,182,212,0.18)",
            cursor: "pointer",
            transition: "border-color 0.3s",
            background: "var(--bg-card)",
            minHeight: 480,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.5)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(6,182,212,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.18)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div
            style={{
              width: "100%",
              height: 300,
              backgroundImage: `url(${mainArticle.imageUrl || 'https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900'})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(8,15,28,0.85) 100%)" }} />
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <CatBadge text={mainArticle.category || "GENERAL"} color={mainArticle.categoryColor || "#06b6d4"} />
            </div>
          </div>
          <div style={{ padding: "20px 22px 22px" }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 24, lineHeight: 1.2, color: "var(--text-primary)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              {mainArticle.title}
            </h3>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
              {mainArticle.summary || mainArticle.excerpt || ""}{" "}
              <span style={{ color: "#06b6d4", cursor: "pointer" }}>[{t('readMore')}]</span>
            </p>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#334155", display: "flex", gap: 6 }}>
              <span>{mainArticle.source || "SENTIENT WIRE"}</span>
              <span>·</span>
              <span>{mainArticle.createdAt ? new Date(mainArticle.createdAt).toLocaleDateString() : mainArticle.ago}</span>
            </div>
          </div>
        </Link>

        {/* Right side: Grid of 4 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gridArticles.map((article: any) => (
            <Link
              key={article.id}
              href={`/${locale}/news/${article.slug || article.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(6,182,212,0.15)",
                background: "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(6,182,212,0.45)";
                el.style.boxShadow = "0 0 24px rgba(6,182,212,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(6,182,212,0.15)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  height: 120,
                  backgroundImage: `url(${article.imageUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300&h=200'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(8,15,28,0.7) 100%)" }} />
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  <CatBadge text={article.category || "GENERAL"} color={article.categoryColor || "#06b6d4"} />
                </div>
              </div>
              <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", lineHeight: 1.3, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                    {article.title}
                  </h4>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {(article.excerpt || article.summary || "").slice(0, 90)}…{" "}
                    <span style={{ color: "#06b6d4", cursor: "pointer", fontSize: 11 }}>[{t('readMore')}]</span>
                  </p>
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#334155", marginTop: 10, display: "flex", gap: 4 }}>
                  <span>{article.source || "SENTIENT WIRE"}</span>
                  <span>·</span>
                  <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : article.ago}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestSection({ locale, latestArticles }: { locale: string; latestArticles: any[] }) {
  const t = useTranslations('Index');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDown(true);
    hasDragged.current = false;
    container.style.scrollBehavior = "auto";
    container.style.cursor = "grabbing";
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.style.scrollBehavior = "smooth";
      container.style.cursor = "grab";
    }
    setIsDown(false);
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    if (container) {
      container.style.scrollBehavior = "smooth";
      container.style.cursor = "grab";
    }
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    container.scrollLeft = scrollLeft - walk;
  };

  const getCategoryIcon = (category: string) => {
    const cat = category?.toUpperCase() || "";
    if (cat.includes("AI") || cat.includes("YAPAY")) return "🤖";
    if (cat.includes("CYBER") || cat.includes("GÜVENLİK")) return "🔒";
    if (cat.includes("QUANTUM") || cat.includes("KUANTUM")) return "⚡";
    if (cat.includes("HARDWARE") || cat.includes("DONANIM")) return "🔲";
    if (cat.includes("DEFENSE") || cat.includes("SAVUNMA")) return "🛰️";
    return "📰";
  };

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1280, margin: "0 auto", position: "relative" }}>
      <style>{`
        .latest-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .latest-scroll-container::-webkit-scrollbar-track {
          background: rgba(6, 182, 212, 0.02);
          border-radius: 4px;
        }
        .latest-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.25);
          border-radius: 4px;
        }
        .latest-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 24, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 12, margin: 0 }}>
          <div style={{ width: 8, height: 24, background: "var(--cyan)", borderRadius: 4 }} />
          {t('secLatest')}
        </h2>
        <Link href={`/${locale}`} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#06b6d4", textDecoration: "none", letterSpacing: "0.05em" }}>
          {t('viewArchive')} &rarr;
        </Link>
      </div>

      <div 
        ref={containerRef}
        className="latest-scroll-container"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ 
          display: "flex", 
          gap: 20, 
          overflowX: "auto", 
          scrollSnapType: isDown ? "none" : "x mandatory",
          paddingBottom: 20,
          scrollBehavior: "smooth",
          cursor: "grab",
          userSelect: "none"
        }}
      >
        {latestArticles.map((article: any) => (
          <Link
            key={article.id}
            href={`/${locale}/news/${article.slug || article.id}`}
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => {
              if (hasDragged.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={{
              flex: "0 0 310px",
              scrollSnapAlign: "start",
              textDecoration: "none",
              color: "inherit",
              borderRadius: 12,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-card)",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-glow)";
              el.style.boxShadow = "0 0 24px rgba(6,182,212,0.1)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-subtle)";
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {article.icon || getCategoryIcon(article.category)}
                </div>
                <CatBadge text={article.category || "GENERAL"} color={article.categoryColor || "#06b6d4"} />
              </div>
              <div
                style={{
                  width: 90,
                  height: 70,
                  borderRadius: 8,
                  backgroundImage: `url(${article.imageUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300&h=200'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(6,182,212,0.15)",
                }}
              />
            </div>

            <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 17, color: "var(--text-primary)", lineHeight: 1.3, margin: 0, letterSpacing: "-0.01em" }}>
              {article.title}
            </h4>

            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
              {article.summary || article.excerpt || ""}{" "}
              <span style={{ color: "#06b6d4", cursor: "pointer", fontSize: 12 }}>[{t('readMore')}]</span>
            </p>

            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--text-muted)", display: "flex", gap: 4, paddingTop: 8, stroke: "1px solid var(--border-subtle)", marginTop: "auto" }}>
              <span>{article.source || "SENTIENT WIRE"}</span>
              <span>·</span>
              <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : article.ago}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomeClient({ dbArticles, locale }: { dbArticles: any[]; locale: string }) {
  console.log("[HomeClient] Articles received:", dbArticles.length);
  // 1. Featured Section: 1 main large card + 4 grid cards (needs exactly 5 articles)
  const featuredList = [...dbArticles.slice(0, 5)];
  const mainArticle = featuredList[0] || null;
  const gridArticles = featuredList.slice(1, 5);

  // 2. Latest Section: only real DB articles published in the last 3 days, padded by other available DB articles
  const dbLatestRaw = dbArticles.slice(5);
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
  const nowTime = new Date().getTime();

  const dbLatestFiltered = dbLatestRaw.filter(art => {
    if (!art.createdAt) return true;
    const artTime = new Date(art.createdAt).getTime();
    return (nowTime - artTime) < THREE_DAYS_MS;
  });

  const latestArticles = [...dbLatestFiltered];
  const remainingDbArticles = dbLatestRaw.filter(art => !dbLatestFiltered.some(f => f.id === art.id));
  
  for (const art of remainingDbArticles) {
    if (latestArticles.length >= 8) break;
    latestArticles.push(art);
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)", overflowX: "hidden", transition: "background-color 0.3s ease" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
      `}</style>
      <Hero />
      
      {dbArticles.length === 0 ? (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "40px", border: "1px dashed var(--border-subtle)", borderRadius: 12 }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>📡</div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, color: "var(--text-primary)", marginBottom: 12 }}>DATABASE SCAN COMPLETE: 0 RESULTS</h2>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--text-muted)", maxWidth: 400, margin: "0 auto" }}>
              Our sensors are currently scanning for new intelligence. Please check back in a few moments or log into the admin terminal to verify status.
            </p>
          </div>
        </div>
      ) : (
        <>
          <FeaturedSection 
            locale={locale} 
            mainArticle={mainArticle} 
            gridArticles={gridArticles} 
          />
          <LatestSection 
            locale={locale} 
            latestArticles={latestArticles} 
          />
        </>
      )}
    </main>
  );
}
