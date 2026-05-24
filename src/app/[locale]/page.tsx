"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import HeroGlobe from "@/components/HeroGlobe";
import { useTranslations } from "next-intl";
import { getArticlesByLocale } from "@/app/actions/article";

/* ─── Types ─────────────────────────────────────────── */
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

/* ─── Data ───────────────────────────────────────────── */
const FEATURED_MAIN: Article = {
  id: "f1",
  title: "Operation Aurora 2.0: Küresel Enerji Ağına Yönelik Büyük Siber Saldırı",
  excerpt: "Avrupa'daki güç merkezlerinde eşgüdümlü bir sıfır-gün açığı zinciri tespit edildi. Sentient Wire kaynakları, büyük çaplı bir elektrik kesintisi hazırlığı olduğunu doğruluyor.",
  category: "ÖZEL HABER",
  categoryColor: "#ef4444",
  imageUrl: "https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900",
  source: "SENTIENT WIRE ÖZEL",
  ago: "2 saat önce",
};

const FEATURED_GRID: Article[] = [
  {
    id: "f2",
    title: "Kuantum Şifre Kırmada Kritik Eşik Aşıldı",
    excerpt: "Araştırmacılar, yeni nesil hibrit kuantum algoritmaları kullanarak 2048-bit RSA şifrelemeyi kırmayı başardı.",
    category: "KUANTUM",
    categoryColor: "#818cf8",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600&h=350",
    source: "Q-LABS RAPORU",
    ago: "5 saat önce",
  },
  {
    id: "f3",
    title: "Otonom Drone Sürüleri Şehir Hatlarına İniyor",
    excerpt: "GPS olmadan tamamen yapay zeka ile yönünü bulan droneların test görüntüleri basına sızdı.",
    category: "SAVUNMA & TEKNOLOJİ",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600&h=350",
    source: "AERO TEK",
    ago: "8 saat önce",
  },
  {
    id: "f4",
    title: "Büyük Dil Modellerinde Yeni Güvenlik Açığı",
    excerpt: "Sektör lideri yapay zeka modellerinin, veriye gizlenmiş yeni bir manipülasyon tekniğine karşı savunmasız olduğu ortaya çıktı.",
    category: "YAPAY ZEKA",
    categoryColor: "#06b6d4",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=350",
    source: "AI GÜNDEM",
    ago: "11 saat önce",
  },
  {
    id: "f5",
    title: "Pasifik Denizaltı Kablolarında Fiziksel Müdahale",
    excerpt: "Büyük veri akışının sağlandığı ana okyanus kablolarında tespit edilen sinyal düşüklüğü, fiziksel dinleme cihazı şüphesi uyandırdı.",
    category: "ALTYAPI",
    categoryColor: "#10b981",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=350",
    source: "GLOBAL AĞ",
    ago: "14 saat önce",
  },
];

const LATEST: Article[] = [
  {
    id: "l1",
    title: "Yeni Nesil RISC-V Çipleri Silikon Sınırlarını Zorluyor",
    excerpt: "Grafen-silikon hibrit mimarisi kullanılarak üretilen yeni işlemciler 8GHz hız barajını aştı.",
    category: "DONANIM",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200",
    source: "SİLİKON VADİSİ",
    ago: "1 saat önce",
    icon: "🔲",
  },
  {
    id: "l2",
    title: "Biyometrik Veritabanı İhlali 40 Milyon Kişiyi Etkiledi",
    excerpt: "Merkeziyetsiz kimlik sağlayıcısı büyük bir sızıntı yaşadı, parmak izi verileri karanlık ağda satışa çıktı.",
    category: "SİBER GÜVENLİK",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=200",
    source: "DARK WEB İZLEME",
    ago: "3 saat önce",
    icon: "👁️",
  },
  {
    id: "l3",
    title: "Uydular Yer İstasyonu Üzerinden Hacklendi",
    excerpt: "Alçak dünya yörüngesi uyduları, güvenlik zafiyeti bulunan yer istasyonları kullanılarak geçici olarak ele geçirildi.",
    category: "UZAY TEK",
    categoryColor: "#8b5cf6",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300&h=200",
    source: "UZAY AJANSI",
    ago: "4 saat önce",
    icon: "🛰️",
  },
  {
    id: "l4",
    title: "Yeni Fidye Yazılımı Nesnelerin İnternetini (IoT) Hedef Alıyor",
    excerpt: "Endüstriyel sensörleri hedef alan yeni nesil fidye yazılımı, üretim tesislerinde durmalara yol açıyor.",
    category: "GÜNDEM",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=300&h=200",
    source: "GÜVENLİK BÜLTENİ",
    ago: "6 saat önce",
    icon: "🔒",
  },
];

/* ─── Hero ───────────────────────────────────────────── */
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

      {/* Main two-column row */}
      <div style={{
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

        {/* ── LEFT: Globe ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
          width: "clamp(320px, 42vw, 520px)",
          position: "relative",
        }}>
          {/* Glow ring behind globe */}
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

        {/* ── RIGHT: Text ── */}
        <div style={{ flex: 1, paddingLeft: 48 }}>
          {/* Live badge */}
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

          {/* Headline */}
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

          {/* Sub */}
          <p style={{
            color: "var(--text-secondary)", fontSize: 15.5, lineHeight: 1.7,
            maxWidth: 400, margin: "0 0 32px",
            fontFamily: "Space Grotesk, sans-serif",
          }}>
            {t('subtitle')}
          </p>

          {/* CTAs */}
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

          {/* Stats */}
          <div style={{
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

      {/* Scroll hint */}
      <div style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        opacity:0.25, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
      }}>
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="#475569" strokeWidth="1.5"/>
          <circle cx="9" cy="8" r="2" fill="#475569"/>
        </svg>
      </div>
    </section>
  );
}



/* ─── Category Badge ─────────────────────────────────── */

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

/* ─── Section header like in image: "FEATURED" with cyan underline ── */
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

/* ─── Featured News section (1 large + grid of 4) ──────── */
function FeaturedSection({ locale, dbArticles }: { locale: string; dbArticles: any[] }) {
  const t = useTranslations('Index');
  // Extract main featured and grid featured from DB, fallback to mock if empty
  const mainArticle = dbArticles.length > 0 ? dbArticles[0] : FEATURED_MAIN;
  const gridArticles = dbArticles.length > 1 ? dbArticles.slice(1, 5) : (dbArticles.length === 0 ? FEATURED_GRID : []);

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
          {/* Image fills top ~60% */}
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
            {/* Corner category badge */}
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <CatBadge text={mainArticle.category || "GENERAL"} color={mainArticle.categoryColor || "#06b6d4"} />
            </div>
          </div>
          {/* Text content */}
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 16,
        }}>
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
              {/* Card image */}
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
              {/* Card text */}
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

/* ─── Latest News section (3 horizontal cards with icon + image) ── */
function LatestSection({ locale, dbArticles }: { locale: string; dbArticles: any[] }) {
  const t = useTranslations('Index');
  const latestArticles = dbArticles.length > 5 ? dbArticles.slice(5) : (dbArticles.length > 0 ? [] : LATEST);

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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 24, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 12, margin: 0 }}>
          <div style={{ width: 8, height: 24, background: "var(--cyan)", borderRadius: 4 }} />
          {t('secLatest')}
        </h2>
        <Link href={`/${locale}`} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#06b6d4", textDecoration: "none", letterSpacing: "0.05em" }}>
          {t('viewArchive')} &rarr;
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {latestArticles.map((article: any) => (
          <Link
            key={article.id}
            href={`/${locale}/news/${article.slug || article.id}`}
            style={{
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
            {/* Top row: icon + category + image thumbnail */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {/* Icon box */}
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
              {/* Thumbnail */}
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

            {/* Title */}
            <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 17, color: "var(--text-primary)", lineHeight: 1.3, margin: 0, letterSpacing: "-0.01em" }}>
              {article.title}
            </h4>

            {/* Excerpt */}
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
              {article.summary || article.excerpt || ""}{" "}
              <span style={{ color: "#06b6d4", cursor: "pointer", fontSize: 12 }}>[{t('readMore')}]</span>
            </p>

            {/* Footer */}
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--text-muted)", display: "flex", gap: 4, paddingTop: 8, borderTop: "1px solid var(--border-subtle)", marginTop: "auto" }}>
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


/* ─── Main page ──────────────────────────────────────── */
export default function Home() {
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const [dbArticles, setDbArticles] = useState<any[]>([]);

  useEffect(() => {
    getArticlesByLocale(locale).then(data => {
      if (Array.isArray(data)) setDbArticles(data);
    }).catch(console.error);
  }, [locale]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)", overflowX: "hidden", transition: "background-color 0.3s ease" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
      `}</style>
      <Hero />
      <FeaturedSection locale={locale} dbArticles={dbArticles} />
      <LatestSection locale={locale} dbArticles={dbArticles} />
    </main>
  );
}
