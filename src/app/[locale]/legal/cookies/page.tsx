import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası | Sentient Wire",
  description: "Sentient Wire Çerez Kullanımı ve Takip Politikası.",
};

export default function CookiesPolicyPage() {
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
            Çerez <span className="text-[var(--cyan-bright)]">Politikası</span>
          </h1>
          <div className="h-1 w-16 bg-[var(--cyan-bright)] rounded mb-4"></div>
          <p className="text-sm text-[var(--text-muted)] font-mono">SON GÜNCELLEME: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Çerez (Cookie) Nedir?</h2>
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza depolanan küçük veri dosyalarıdır. Bu dosyalar, sitenin sizi hatırlamasına, tercihlerinizi kaydetmesine ve size daha akıcı bir deneyim sunmasına yardımcı olur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Hangi Çerezleri Kullanıyoruz?</h2>
            <p>
              <span translate="no" className="notranslate">Sentient Wire</span> olarak izinsiz veri toplama felsefesine karşıyız. Sitemizde yalnızca <strong>Zorunlu ve Fonksiyonel Çerezler</strong> kullanılmaktadır:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Tema ve Tasarım Çerezleri:</strong> Karanlık mod (Dark Mode) gibi arayüz tercihlerinizi hafızada tutar.</li>
              <li><strong>Oturum Çerezleri:</strong> (Yalnızca yetkili personel için) Yönetim paneline giriş yapıldığında oturumu güvende tutmak için şifrelenmiş tokenler barındırır.</li>
              <li><strong>Dil Seçimi:</strong> Hangi dilde okuma yaptığınızı hatırlar, böylece her sayfada tekrar dil seçmek zorunda kalmazsınız.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Reklam ve Takip Çerezleri YOKTUR</h2>
            <p>
              Okuyucularımızın verileriyle beslenen bir reklam modelimiz yoktur. Google Analytics, Facebook Pixel veya benzeri üçüncü taraf hedefleme (targeting) ve takip (tracking) çerezlerini kasıtlı olarak kullanmıyoruz. Gelişmiş "Do Not Track" (Beni İzleme) taleplerine saygı duyuyoruz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
