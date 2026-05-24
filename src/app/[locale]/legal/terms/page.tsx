import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Sentient Wire",
  description: "Sentient Wire Kullanım Koşulları ve Hizmet Şartları.",
};

export default function TermsOfUsePage() {
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
            Kullanım <span className="text-[var(--cyan-bright)]">Koşulları</span>
          </h1>
          <div className="h-1 w-16 bg-[var(--cyan-bright)] rounded mb-4"></div>
          <p className="text-sm text-[var(--text-muted)] font-mono">SON GÜNCELLEME: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Kabul ve Onay</h2>
            <p>
              Bu web sitesine erişerek ve platformu kullanarak, aşağıda belirtilen Kullanım Koşullarını eksiksiz olarak okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Koşulları kabul etmiyorsanız platformu kullanmayı derhal bırakmalısınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. İçerik ve Telif Hakları</h2>
            <p>
              <span translate="no" className="notranslate">Sentient Wire</span> üzerinde yayınlanan tüm özel haberler, analizler, grafikler, "Matrix Yağmuru" efektleri dahil görsel tasarımlar ve makalelerin telif hakları <span translate="no" className="notranslate">Sentient Wire</span>'a aittir. İçeriklerin izinsiz kopyalanması, otomatik botlar (web scraper) aracılığıyla çekilmesi ve farklı platformlarda kaynak gösterilmeden yayımlanması yasaktır. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Sisteme Yönelik Müdahaleler</h2>
            <p>
              Platformumuzun güvenliğini test etmek, idari arka kapılara (Admin panel) yetkisiz erişim sağlamaya çalışmak veya sistem trafiğini manipüle edecek DDoS (Distributed Denial of Service) türü saldırılar gerçekleştirmek, ilgili uluslararası siber suçlar kanunları kapsamında suç teşkil eder. Sistemimiz tüm anomali aktivitelerini saniyesinde loglayıp engelleme yetisine sahiptir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
