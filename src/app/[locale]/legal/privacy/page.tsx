import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Sentient Wire",
  description: "Sentient Wire Gizlilik Politikası ve Veri Güvenliği Standartları.",
};

export default function PrivacyPolicyPage() {
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
            Gizlilik <span className="text-[var(--cyan-bright)]">Politikası</span>
          </h1>
          <div className="h-1 w-16 bg-[var(--cyan-bright)] rounded mb-4"></div>
          <p className="text-sm text-[var(--text-muted)] font-mono">SON GÜNCELLEME: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Veri Toplama ve İşleme</h2>
            <p>
              <span translate="no" className="notranslate">Sentient Wire</span> olarak, kullanıcılarımızın gizliliğine en üst düzeyde önem veriyoruz. Gazetecilik faaliyetlerimizi yürütürken okurlarımızın anonimliğini ve dijital güvenliğini korumak temel prensibimizdir. Yalnızca platformumuzun temel işleyişi için zorunlu olan minimum düzeydeki verileri (sunucu logları, IP adresi ve temel tarayıcı bilgileri) topluyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Verilerin Kullanım Amacı</h2>
            <p>
              Toplanan veriler yalnızca şu amaçlar için kullanılır:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Siber saldırıları, bot trafiğini ve olağandışı hareketleri tespit etmek.</li>
              <li>Platformun performansını ve okuma deneyimini optimize etmek.</li>
              <li>Yasal zorunluluklar kapsamında (mahkeme kararları hariç üçüncü şahıslarla paylaşılmaksızın) verileri güvenli şekilde muhafaza etmek.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Üçüncü Taraflarla Paylaşım</h2>
            <p>
              Kullanıcı verilerinizi ASLA reklam ağlarına, veri simsarlarına veya üçüncü taraf analiz şirketlerine satmıyoruz ve paylaşmıyoruz. Sistemimiz tamamen kapalı devre bir altyapı üzerinde çalışmakta olup, okur gizliliğini ihlal edebilecek hiçbir harici izleme aracı (tracker) barındırmamaktadır.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
