import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Sentient Wire",
  description: "Sentient Wire'ın hikayesi, vizyonu ve misyonu.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%] opacity-30" />
        <div 
          className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)" }} 
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <span translate="no" className="notranslate">Sentient <span className="text-[var(--cyan-bright)]">Wire</span></span>
          </h1>
          <div className="h-1 w-20 bg-[var(--cyan-bright)] rounded mb-8"></div>
        </div>

        <div className="space-y-12 text-lg leading-relaxed text-[var(--text-secondary)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          
          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">İsmimiz Nereden Geliyor?</h2>
            <p className="mb-4">
              19. yüzyılda kıtaları birbirine bağlayan ilk telgraf hatları çekildiğinde, insanlık o güne dek görülmemiş bir hızda iletişim kurmanın mucizesiyle sarsıldı. Dünyanın öbür ucundaki bir mesajın saniyeler içinde iletilebilmesi öylesine büyüleyiciydi ki, dönemin düşünürleri bu kıtalararası kablolara <strong>"The Sentient Wire" (Hissedebilen / Bilinçli Kablo)</strong> adını taktılar. Onlar için bu sadece bakır bir tel değil, adeta dünyanın canlanan yeni bir sinir sistemiydi.
            </p>
            <p>
              Bugün, yapay zeka, kuantum bilgisayarlar ve nesnelerin interneti ile sarılı olan dünyamızda, bu "bilinçli ağ" metaforu artık bir gerçekliğe dönüştü.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Misyonumuz</h2>
            <p className="mb-4">
              <span translate="no" className="notranslate">Sentient Wire</span> olarak biz, tıpkı 19. yüzyılda telgrafın insanlığı değiştirmesi gibi, bugün yapay zeka ve derin teknolojilerin dünyayı nasıl şekillendirdiğini anlamaya ve anlatmaya adanmış <strong>bağımsız bir gazetecilik ağıyız.</strong>
            </p>
            <p>
              Bizim görevimiz sadece yeni çıkan bir yazılımı veya telefonu tanıtmak değildir. Biz; silikon vadisindeki kapalı kapılar ardında konuşulanları, algoritmaların toplum üzerindeki gizli etkilerini, siber güvenliğin geleceğini ve dijital dünyanın kırılma noktalarını, onlar ana akım medyaya düşmeden önce keşfedip size sunuyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Gazetecilik Vizyonumuz</h2>
            <p className="mb-4">
              Komplo teorilerinden uzak, kanıta ve veriye dayalı, ancak bir o kadar da sınırları zorlayan bir gazetecilik anlayışı benimsiyoruz. <span translate="no" className="notranslate">Sentient Wire</span> ekibi olarak teknoloji sadece bir araç olarak değil, insanlığın bir sonraki evrimi olarak ele alıyoruz.
            </p>
            <div className="mt-8 p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-lg">
              <p className="text-[var(--cyan-bright)] font-mono text-sm uppercase tracking-widest mb-2">Manifesto</p>
              <p className="italic text-[var(--text-primary)]">
                "Gelecek, onu anlayanlar tarafından yazılır. Biz, dünyayı saran bu devasa ve bilinçli ağın içindeki gerçeği okuyanlarız."
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
