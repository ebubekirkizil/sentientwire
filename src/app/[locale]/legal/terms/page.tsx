import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Sentient Wire",
  description: "Sentient Wire Terms of Service and Conditions.",
  robots: {
    index: false,
    follow: false,
  }
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsOfUsePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";

  const isTr = locale === "tr";

  const content = {
    titlePrefix: isTr ? "Kullanım" : "Terms",
    titleSuffix: isTr ? "Koşulları" : "of Service",
    update: isTr ? `SON GÜNCELLEME: ${new Date().toLocaleDateString('tr-TR')}` : `LAST UPDATED: ${new Date().toLocaleDateString('en-US')}`,
    sections: [
      {
        title: isTr ? "1. Kabul ve Onay" : "1. Acceptance of Terms",
        body: isTr 
          ? "Bu web sitesine erişerek ve platformu kullanarak, aşağıda belirtilen Kullanım Koşullarını eksiksiz olarak okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Koşulları kabul etmiyorsanız platformu kullanmayı derhal bırakmalısınız."
          : "By accessing and using this website and platform, you declare that you have fully read, understood, and accepted the Terms of Service stated below. If you do not accept the conditions, you must immediately stop using the platform."
      },
      {
        title: isTr ? "2. İçerik ve Telif Hakları" : "2. Content and Copyrights",
        body: isTr
          ? "Sentient Wire üzerinde yayınlanan tüm özel haberler, analizler, grafikler, \"Matrix Yağmuru\" efektleri dahil görsel tasarımlar ve makalelerin telif hakları Sentient Wire'a aittir. İçeriklerin izinsiz kopyalanması, otomatik botlar (web scraper) aracılığıyla çekilmesi ve farklı platformlarda kaynak gösterilmeden yayımlanması yasaktır."
          : "All exclusive news, analysis, graphics, visual designs including \"Matrix Rain\" effects, and articles published on Sentient Wire are copyrighted by Sentient Wire. Unauthorized copying, extracting via automated bots (web scrapers), and publishing on different platforms without citation are strictly prohibited."
      },
      {
        title: isTr ? "3. Sisteme Yönelik Müdahaleler" : "3. System Interferences",
        body: isTr
          ? "Platformumuzun güvenliğini test etmek, idari arka kapılara (Admin panel) yetkisiz erişim sağlamaya çalışmak veya sistem trafiğini manipüle edecek DDoS (Distributed Denial of Service) türü saldırılar gerçekleştirmek, ilgili uluslararası siber suçlar kanunları kapsamında suç teşkil eder. Sistemimiz tüm anomali aktivitelerini saniyesinde loglayıp engelleme yetisine sahiptir."
          : "Testing the security of our platform, attempting unauthorized access to administrative backdoors (Admin panel), or conducting DDoS (Distributed Denial of Service) attacks to manipulate system traffic constitutes a crime under relevant international cybercrime laws. Our system is capable of logging and blocking all anomalous activities in seconds."
      }
    ]
  };

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
            {content.titlePrefix} <span className="text-[var(--cyan-bright)]">{content.titleSuffix}</span>
          </h1>
          <div className="h-1 w-16 bg-[var(--cyan-bright)] rounded mb-4"></div>
          <p className="text-sm text-[var(--text-muted)] font-mono">{content.update}</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[var(--text-secondary)]">
          {content.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
