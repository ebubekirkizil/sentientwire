import { createClient } from "@libsql/client";
import * as fs from "fs";

const db = createClient({
  url: "file:dev.db",
});

const MOCK_CONTENT = `Bu, yüksek gizlilik dereceli bir istihbarat özetidir. Aşağıda detaylandırılan olaylar, güvenli ağlar üzerinden ele geçirilen çoklu iletişim verilerinden derlenmiştir.

Son anomali tespit algoritmaları, kritik altyapı düğümlerini hedefleyen benzeri görülmemiş bir yetkisiz erişim dalgası tespit etmiştir. Kullanılan metodoloji, geleneksel hava boşluklu (air-gapped) güvenlik protokollerini atlatabilen yeni nesil bir sıfır-gün (zero-day) açığı kullanan, devlet destekli bir aktörün koordineli çabalarına işaret etmektedir.

Küresel teknoloji uzmanları, açıkları kapatmak ve saldırının kaynağını tespit etmek için özel sektörle birlikte çalışmaktadır.

GÜVENLİK ÖNERİSİ:
- Tüm SCADA sistemlerini derhal dış ağlardan izole edin.
- Kriptografik anahtarların acil rotasyonunu başlatın.
- Şifreli dış veri çıkışlarında olağandışı hareketleri izleyin.

(RAPOR SONU)`;

const ARTICLES = [
  {
    id: "f1",
    slug: "f1",
    title: "Operation Aurora 2.0: Küresel Enerji Ağına Yönelik Büyük Siber Saldırı",
    summary: "Avrupa'daki güç merkezlerinde eşgüdümlü bir sıfır-gün açığı zinciri tespit edildi. Sentient Wire kaynakları, büyük çaplı bir elektrik kesintisi hazırlığı olduğunu doğruluyor.",
    content: MOCK_CONTENT,
    category: "ÖZEL HABER",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900",
    locale: "tr",
    views: 15420,
    originalUrl: "SENTIENT WIRE ÖZEL",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "f2",
    slug: "f2",
    title: "Kuantum Şifre Kırmada Kritik Eşik Aşıldı",
    summary: "Araştırmacılar, yeni nesil hibrit kuantum algoritmaları kullanarak 2048-bit RSA şifrelemeyi kırmayı başardı.",
    content: MOCK_CONTENT,
    category: "KUANTUM",
    categoryColor: "#818cf8",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 12050,
    originalUrl: "Q-LABS RAPORU",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "f3",
    slug: "f3",
    title: "Otonom Drone Sürüleri Şehir Hatlarına İniyor",
    summary: "GPS olmadan tamamen yapay zeka ile yönünü bulan droneların test görüntüleri basına sızdı.",
    content: MOCK_CONTENT,
    category: "SAVUNMA",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 9800,
    originalUrl: "AERO TEK",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "f4",
    slug: "f4",
    title: "Büyük Dil Modellerinde Yeni Güvenlik Açığı",
    summary: "Sektör lideri yapay zeka modellerinin, veriye gizlenmiş yeni bir manipülasyon tekniğine karşı savunmasız olduğu ortaya çıktı.",
    content: MOCK_CONTENT,
    category: "YAPAY ZEKA",
    categoryColor: "#06b6d4",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 8400,
    originalUrl: "AI GÜNDEM",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "f5",
    slug: "f5",
    title: "Pasifik Denizaltı Kablolarında Fiziksel Müdahale",
    summary: "Büyük veri akışının sağlandığı ana okyanus kablolarında tespit edilen sinyal düşüklüğü, fiziksel dinleme cihazı şüphesi uyandırdı.",
    content: MOCK_CONTENT,
    category: "ALTYAPI",
    categoryColor: "#10b981",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 7200,
    originalUrl: "GLOBAL AĞ",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "l1",
    slug: "l1",
    title: "Yeni Nesil RISC-V Çipleri Silikon Sınırlarını Zorluyor",
    summary: "Grafen-silikon hibrit mimarisi kullanılarak üretilen yeni işlemciler 8GHz hız barajını aştı.",
    content: MOCK_CONTENT,
    category: "DONANIM",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 4000,
    originalUrl: "SİLİKON VADİSİ",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "l2",
    slug: "l2",
    title: "Biyometrik Veritabanı İhlali 40 Milyon Kişiyi Etkiledi",
    summary: "Merkeziyetsiz kimlik sağlayıcısı büyük bir sızıntı yaşadı, parmak izi verileri karanlık ağda satışa çıktı.",
    content: MOCK_CONTENT,
    category: "SİBER GÜVENLİK",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 15000,
    originalUrl: "DARK WEB İZLEME",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "l3",
    slug: "l3",
    title: "Uydular Yer İstasyonu Üzerinden Hacklendi",
    summary: "Alçak dünya yörüngesi uyduları, güvenlik zafiyeti bulunan yer istasyonları kullanılarak geçici olarak ele geçirildi.",
    content: MOCK_CONTENT,
    category: "UZAY TEK",
    categoryColor: "#8b5cf6",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 11000,
    originalUrl: "UZAY AJANSI",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "l4",
    slug: "l4",
    title: "Yeni Fidye Yazılımı Nesnelerin İnternetini (IoT) Hedef Alıyor",
    summary: "Endüstriyel sensörleri hedef alan yeni nesil fidye yazılımı, üretim tesislerinde durmalara yol açıyor.",
    content: MOCK_CONTENT,
    category: "GÜNDEM",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 5200,
    originalUrl: "GÜVENLİK BÜLTENİ",
    isPublished: 1,
    xPosted: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function main() {
  console.log("Creating tables if they do not exist...");
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS Article (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'UNCLASSIFIED',
      categoryColor TEXT DEFAULT '#06b6d4',
      imageUrl TEXT,
      locale TEXT NOT NULL,
      originalUrl TEXT,
      isPublished INTEGER DEFAULT 1,
      xPosted INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Clearing existing articles...");
  await db.execute(`DELETE FROM Article;`);

  console.log("Inserting mock articles...");
  for (const art of ARTICLES) {
    await db.execute({
      sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, originalUrl, isPublished, xPosted, views, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [art.id, art.title, art.slug, art.summary, art.content, art.category, art.categoryColor, art.imageUrl, art.locale, art.originalUrl, art.isPublished, art.xPosted, art.views, art.createdAt, art.updatedAt]
    });
    console.log(`Created article: \${art.slug}`);
  }

  console.log("Seeding finished.");
}

main().catch(console.error);
