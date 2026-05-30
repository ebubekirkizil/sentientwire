import { createClient } from '@libsql/client';

const db = createClient({ 
  url: process.env.DATABASE_URL || '', 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

const translations = {
  "Google Gemini 'Intelligence Layer' Transforms Android and Chrome": {
    tr_title: "Google Gemini 'Zeka Katmanı' Android ve Chrome'u Dönüştürüyor",
    tr_summary: "Google, Gemini'yi bağımsız bir sohbet botundan Android, Chrome ve Workspace'e entegre edilmiş evrensel bir 'zeka katmanına' resmi olarak geçirdiğini ve işletim sistemi deneyimini yeniden şekillendirdiğini duyurdu.",
  },
  "Quantum Breaking: Q-Labs Demonstrates 2048-bit RSA Vulnerability": {
    tr_title: "Kuantum Kırılması: Q-Labs 2048-bit RSA Zafiyetini Gösterdi",
    tr_summary: "Q-Labs'taki araştırmacılar koalisyonu, melez bir kuantum-klasik algoritma kullanarak 2048-bit bir RSA anahtarını 12 saatin altında başarıyla çarpanlarına ayırdı ve post-kuantum çağının başladığının sinyalini verdi."
  },
  "Autonomous Drone Swarms Deployed in Urban Security Test": {
    tr_title: "Otonom Drone Sürüleri Kentsel Güvenlik Testinde Görevlendirildi",
    tr_summary: "Sızdırılan görüntüler, yapay zeka destekli bir drone filosunun karmaşık bir kentsel ortamda GPS olmadan, yalnızca görsel işleme ve sürü zekasına güvenerek başarılı bir şekilde gezindiğini ortaya koyuyor."
  },
  "Pacific Subsea Cables Suspected of Being Tapped": {
    tr_title: "Pasifik Denizaltı Kablolarının Dinlendiğinden Şüpheleniliyor",
    tr_summary: "Telekom analizleri, kritik Pasifik denizaltı fiber optik rotaları boyunca açıklanamayan sinyal bozulmaları ve gecikme artışları tespit etti; istihbarat kurumları olası fiziksel müdahaleleri araştırıyor."
  },
  "New LLM Vulnerability: 'Data Poisoning 2.0'": {
    tr_title: "Yeni LLM Zafiyeti: 'Veri Zehirlenmesi 2.0'",
    tr_summary: "Siber güvenlik araştırmacıları, saldırganların yapay zeka modellerinin eğitim verilerine fark edilemeyen tetikleyiciler enjekte ederek çıktılarında manipülasyon yapmalarına olanak tanıyan yeni bir teknik keşfetti."
  },
  "Next-Gen RISC-V Chips Break 8GHz Barrier": {
    tr_title: "Yeni Nesil RISC-V Çipleri 8GHz Sınırını Aştı",
    tr_summary: "Silikon Vadisi girişimi 'Silicomp', minimum termal daraltma ile 8GHz saat hızlarını sürdürebilen devrim niteliğinde bir grafen-silikon hibrit RISC-V işlemcisini tanıttı."
  },
  "Biometric Database Breach Exposes 40 Million Identities": {
    tr_title: "Biyometrik Veritabanı İhlali 40 Milyon Kimliği Ortaya Çıkardı",
    tr_summary: "Merkezi olmayan bir kimlik sağlayıcısı, 40 milyondan fazla biyometrik profilin çalınmasına ve karanlık web'de satılmasına yol açan felaket boyutunda bir veri ihlali yaşadı."
  }
};

async function run() {
  const allArticles = await db.execute('SELECT id, title, content FROM Article');
  
  for (const article of allArticles.rows) {
    const title = article.title as string;
    if (translations[title as keyof typeof translations]) {
      const trans = translations[title as keyof typeof translations];
      try {
        await db.execute({
          sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, 'tr', ?, ?, ?)`,
          args: [article.id, trans.tr_title, trans.tr_summary, article.content]
        });
        console.log(`Translated: ${title}`);
      } catch (e) {
        console.log(`Skipped (already exists or error): ${title}`);
      }
    }
  }
  console.log("Done inserting hardcoded translations!");
}

run();
