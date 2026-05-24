process.env.DATABASE_URL = "file:./dev.db";
import { prisma } from '../src/lib/prisma'

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
    slug: "f1",
    title: "Operation Aurora 2.0: Küresel Enerji Ağına Yönelik Büyük Siber Saldırı",
    summary: "Avrupa'daki güç merkezlerinde eşgüdümlü bir sıfır-gün açığı zinciri tespit edildi. Sentient Wire kaynakları, büyük çaplı bir elektrik kesintisi hazırlığı olduğunu doğruluyor.",
    content: MOCK_CONTENT,
    category: "ÖZEL HABER",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900",
    locale: "tr",
    views: 15420,
    originalUrl: "SENTIENT WIRE ÖZEL"
  },
  {
    slug: "f2",
    title: "Kuantum Şifre Kırmada Kritik Eşik Aşıldı",
    summary: "Araştırmacılar, yeni nesil hibrit kuantum algoritmaları kullanarak 2048-bit RSA şifrelemeyi kırmayı başardı.",
    content: MOCK_CONTENT,
    category: "KUANTUM",
    categoryColor: "#818cf8",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 12050,
    originalUrl: "Q-LABS RAPORU"
  },
  {
    slug: "f3",
    title: "Otonom Drone Sürüleri Şehir Hatlarına İniyor",
    summary: "GPS olmadan tamamen yapay zeka ile yönünü bulan droneların test görüntüleri basına sızdı.",
    content: MOCK_CONTENT,
    category: "SAVUNMA",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 9800,
    originalUrl: "AERO TEK"
  },
  {
    slug: "f4",
    title: "Büyük Dil Modellerinde Yeni Güvenlik Açığı",
    summary: "Sektör lideri yapay zeka modellerinin, veriye gizlenmiş yeni bir manipülasyon tekniğine karşı savunmasız olduğu ortaya çıktı.",
    content: MOCK_CONTENT,
    category: "YAPAY ZEKA",
    categoryColor: "#06b6d4",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 8400,
    originalUrl: "AI GÜNDEM"
  },
  {
    slug: "f5",
    title: "Pasifik Denizaltı Kablolarında Fiziksel Müdahale",
    summary: "Büyük veri akışının sağlandığı ana okyanus kablolarında tespit edilen sinyal düşüklüğü, fiziksel dinleme cihazı şüphesi uyandırdı.",
    content: MOCK_CONTENT,
    category: "ALTYAPI",
    categoryColor: "#10b981",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=350",
    locale: "tr",
    views: 7200,
    originalUrl: "GLOBAL AĞ"
  },
  {
    slug: "l1",
    title: "Yeni Nesil RISC-V Çipleri Silikon Sınırlarını Zorluyor",
    summary: "Grafen-silikon hibrit mimarisi kullanılarak üretilen yeni işlemciler 8GHz hız barajını aştı.",
    content: MOCK_CONTENT,
    category: "DONANIM",
    categoryColor: "#f59e0b",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 4000,
    originalUrl: "SİLİKON VADİSİ"
  },
  {
    slug: "l2",
    title: "Biyometrik Veritabanı İhlali 40 Milyon Kişiyi Etkiledi",
    summary: "Merkeziyetsiz kimlik sağlayıcısı büyük bir sızıntı yaşadı, parmak izi verileri karanlık ağda satışa çıktı.",
    content: MOCK_CONTENT,
    category: "SİBER GÜVENLİK",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 15000,
    originalUrl: "DARK WEB İZLEME"
  },
  {
    slug: "l3",
    title: "Uydular Yer İstasyonu Üzerinden Hacklendi",
    summary: "Alçak dünya yörüngesi uyduları, güvenlik zafiyeti bulunan yer istasyonları kullanılarak geçici olarak ele geçirildi.",
    content: MOCK_CONTENT,
    category: "UZAY TEK",
    categoryColor: "#8b5cf6",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 11000,
    originalUrl: "UZAY AJANSI"
  },
  {
    slug: "l4",
    title: "Yeni Fidye Yazılımı Nesnelerin İnternetini (IoT) Hedef Alıyor",
    summary: "Endüstriyel sensörleri hedef alan yeni nesil fidye yazılımı, üretim tesislerinde durmalara yol açıyor.",
    content: MOCK_CONTENT,
    category: "GÜNDEM",
    categoryColor: "#ef4444",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=300&h=200",
    locale: "tr",
    views: 5200,
    originalUrl: "GÜVENLİK BÜLTENİ"
  }
];

async function main() {
  console.log('Seeding database with mock articles...');
  
  // Clear existing articles to avoid slug collisions if re-run
  await prisma.article.deleteMany({});
  
  for (const article of ARTICLES) {
    await prisma.article.create({
      data: article
    });
    console.log(`Created article: ${article.slug}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
