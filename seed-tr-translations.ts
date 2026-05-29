import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const translations = [
  {
    articleId: "sw-001",
    locale: "tr",
    title: "Operasyon Safran: Uluslararası Kolluk Kuvvetleri Fidye Yazılımcıların Gözde VPN'ini Çökertti",
    summary: "Europol ve FBI koordinasyonuyla yürütülen ortak operasyonda, dünya genelinde fidye yazılımı gruplarının altyapısını gizleyen VPN ağı çökertildi; 11 ülkede eş zamanlı baskın gerçekleştirildi ve kilit altyapı operatörleri tutuklandı.",
    content: `<p>Uluslararası kolluk kuvvetlerinin koordineli çabasıyla gerçekleştirilen operasyonda, fidye yazılımı ve siber suç operasyonlarını destekleyen en büyük anonymizer VPN ağlarından biri etkisiz hale getirildi.</p>

<p><strong>"Operasyon Safran"</strong> adıyla anılan bu operasyon, Europol, FBI ve Interpol'ün birlikte yürüttüğü bir çalışmanın ürünüdür. Soruşturma kapsamında 11 farklı ülkede eş zamanlı baskın gerçekleştirilmiş ve çoklu ülke yetki alanlarında çalışan sunucular ele geçirilmiştir.</p>

<h2>VPN Ağı Nasıl Çalışıyordu?</h2>
<p>Söz konusu VPN ağı, kullanıcılarına birden fazla ülkede sunucu konumları sunarak fidye yazılımı grupları, kara para aklayıcılar ve kimlik avı operatörleri dahil çeşitli siber suç aktörleri tarafından aktif biçimde kullanılıyordu. Ağın öne çıkan özellikleri arasında bulunabilirlik analizi ile içerik analizi saldırılarına karşı sertleştirilmiş altyapı ve crypto ödeme sistemleri yer alıyordu.</p>

<p>Siber güvenlik araştırmacıları, bu ağın fidye yazılımı müzakerelerinde, fidye ödemesi altyapısında ve saldırıları koordine etmek için kullanılan komuta-kontrol sunucularında kritik bir rol üstlendiğini belirledi.</p>

<h2>Fidye Yazılımı Ekosistemi Üzerindeki Etkisi</h2>
<p>Bu operasyon, fidye yazılımı ekosistemi üzerinde ciddi bir sismik etki yaratacaktır. Söz konusu VPN ağı, yalnızca anonimlik sağlamakla kalmıyor; aynı zamanda birden fazla fidye yazılımı grubunu ortak bir altyapı üzerinde barındırıyordu. Uzmanlara göre bu durum, gruplar arasında olası bağlantılara ya da paylaşılan araç ve taktiklere işaret edebilir.</p>

<p>Yetkililere göre ele geçirilen adli deliller, halihazırda aktif fidye yazılımı saldırılarında yer alan birçok şüpheliyi tespit etmeye yardımcı olmakta ve muhtemelen siber suç alanındaki önemli yargılamalara zemin hazırlamaktadır.</p>

<h2>Editör Yorumu: Bu Operasyonun Önemi</h2>
<p>Bu çökertme, yalnızca bir VPN ağının kapatılmasından çok daha fazlasını ifade ediyor. Bu operasyon, fidye yazılımı ekosisteminin süregelen merkezileşmesini gözler önüne seriyor; gruplar artık saldırı araçlarını, altyapıyı ve para akışı kanallarını birbirleriyle paylaşıyor. Ağ toplu olarak ele geçirildiğinde, bir domino etkisi tetiklenerek koordineli operasyonlara katılan çok sayıda grubun ifşa edilmesi mümkün olabilir.</p>

<p>Ancak fidye yazılımı çeteleri, kolluk kuvvetleri baskılarına son derece dayanıklı olduğunu defalarca kanıtlamıştır. Anahtar aktörler tutuklanmadıkça ya da bu grupların kripto varlık aklama kanalları kalıcı biçimde kesintiye uğratılmadıkça, bu gruplar muhtemelen yeni altyapıyla yeniden örgütlenecektir.</p>

<h2>Öngörülen Sonuçlar</h2>
<ul>
<li>Fidye yazılımı operasyonlarında kısa vadeli aksama ve yeniden yapılanma süreci</li>
<li>Bu ağı kullanan gruplara yönelik olası birden fazla takip soruşturması</li>
<li>Darkweb hizmetleri arasında dağıtık altyapı arayışının ivme kazanması</li>
<li>Siber suçluların anonim barındırma hizmetleri için kriptoyla ödemeli çözümlere yönelmesi</li>
</ul>`
  },
  {
    articleId: "sw-002",
    locale: "tr",
    title: "Trump Son Dakikada Yapay Zeka Güvenlik Yönergesini İptal Etti — Musk ve Zuckerberg'in Etkisi Gösterildi",
    summary: "Biden döneminin yapay zeka güvenlik yönergeleri geri alındı; AI şirketleri üzerindeki federal güvenlik değerlendirme gereklilikleri kaldırıldı. Silicon Valley'den tepkiler ikiye bölündü; şeffaflık savunucuları sonuçlar konusunda uyarıda bulunuyor.",
    content: `<p>ABD Başkanı Trump, yapay zeka sistemleri için temel güvenlik testlerini zorunlu kılan yönergeleri kapsamlı bir imzayla yürürlükten kaldırdı. Bu adım, kararlı ancak öngörülemeyen yeni yönetimin yapay zeka konusundaki tutumunu açıkça ortaya koyuyor.</p>

<p>İptal edilen düzenlemeler arasında, büyük ölçekli yapay zeka modellerini piyasaya sürmeden önce federal makamlara güvenlik değerlendirme sonuçlarını bildirme zorunluluğu ve sektör genelinde paylaşılacak kırmızı takım (red team) güvenlik testleri yer alıyordu.</p>

<h2>Tepkiler: İkiye Bölünmüş Bir Sektör</h2>
<p>Yapay zeka sektörü bu hamleye ikiye bölünmüş tepkiler verdi. Meta ve X liderliğinin açıkça desteklediği bir kanat, yönergeleri yapay zeka geliştirmeyi sekteye uğratan bürokratik yükler olarak nitelendirirken; diğer kanat ise öz düzenlemedeki boşlukların doldurulmaması halinde ölçümlenmesi güç risklerin ortaya çıkabileceğini vurguluyor.</p>

<p>Bazı yapay zeka güvenlik araştırmacıları, uyum maliyetlerinin ortadan kalkmasının Çin yapay zeka şirketleri karşısında kısa vadede rekabet avantajı sağlayabileceğine dikkat çekerken, Anthropic ve OpenAI'nin güvenlik ekiplerinden bazı üyeler, bu kararın kalıcı olmasını kaygıyla karşıladıklarını belirtti.</p>

<h2>Jeopolitik Boyut</h2>
<p>Bu kararın zamanlaması son derece dikkat çekici; zira Çin'in yapay zeka çalışmaları artan bir ivmeyle ilerlemeye devam etmektedir. Düzenleyicilerin müdahale edemeyeceği bir alanda bu denli hızlı gerçekleşen teknolojik değişimin ne gibi sonuçlar doğurabileceği, yakın vadede yanıt arayacağımız en kritik sorular arasında yer alıyor.</p>

<h2>Editör Yorumu: Bu Hamlenin Riskleri</h2>
<p>Yapay zeka güvenliği alanında yaşanan bu düzenleyici geri adım, stratejik açıdan riskli bir yöne doğru yöneliyor. Gerçek şu ki: yapay zekanın ölçümlenmesi henüz çözüme kavuşturulamamış bir sorun. Orta ölçekli bir modelde ortaya çıkan beklenmedik bir davranış, kritik altyapı için felaket sonuçlar doğurabilir. Bu tür güvenlik değerlendirmelerini siyasi bir yük olarak çerçevelemek, teknik bağlamı görmezden gelmek demektir.</p>

<h2>Öngörülen Sonuçlar</h2>
<ul>
<li>Yapay zeka geliştirme döngülerinde kısa vadeli hızlanma, ancak birikmiş güvenlik borcu riski</li>
<li>Avrupa'nın AB Yapay Zeka Kanunu uygulaması üzerindeki artan baskı</li>
<li>Yapay zeka güvenlik araştırması için özel sektör finansmanına yöneliş</li>
<li>ABD ve AB arasındaki yapay zeka standartlarında uzun vadeli parçalanma riski</li>
</ul>`
  },
  {
    articleId: "sw-003",
    locale: "tr",
    title: "GPU Fiyatları %20 Arttı: Küresel Yapay Zeka Hesaplama Kapasitesinde Kritik Kıtlık",
    summary: "Küresel yapay zeka hesaplama kıtlığı derinleştikçe NVIDIA, AMD ve Intel GPU fiyatları keskin biçimde yükseliyor. Veri merkezi operatörleri bant genişliği kısıtlamalarını bildirirken, girişimciler yüksek hesaplama maliyetleri nedeniyle ürün lansman takvimlerini yeniden değerlendiriyor.",
    content: `<p>Yapay zekaya yönelik küresel talebin hızla artması GPU kıtlığını derinleştirirken, bu çipler yalnızca oyun pazarını değil büyük dil modellerini, görüntü oluşturma sistemlerini ve gerçek zamanlı çıkarım altyapısını da besliyor.</p>

<p>Son çeyreğe ait temin analitikleri, yapay zeka veri merkezi operatörlerinin %73'ünün hesaplama kısıtlamalarıyla karşılaştığını ortaya koyuyor; bu oran bir yıl öncesine göre %41 artış anlamına geliyor.</p>

<h2>Piyasa Dinamikleri</h2>
<p>NVIDIA H100 ve H200'ün spot piyasa fiyatları çeyreklik bazda %18-22 yükseldi. Toptancı fiyatlarındaki bu artış, büyük bulut altyapısı sözleşmelerinden ziyade daha küçük girişimleri ve araştırma kurumlarını etkiliyor. Bu çipler kurumsal kanallar aracılığıyla belirli şirketlere tahsis edildiğinden, spot piyasalar yapay zeka hesaplama kıtlığının en belirgin şekilde hissedildiği yer haline geliyor.</p>

<p>Bu durumun dikkat çekici bir boyutu da büyük bulut sağlayıcılar ile küçük ölçekli kullanıcılar arasındaki dengenin bozulmasıdır. AWS, Azure ve GCP, uzun vadeli temin anlaşmaları sayesinde görece sabit fiyatları korurken, daha küçük oyuncular bu oynaklığa doğrudan maruz kalıyor.</p>

<h2>Tedarik Zinciri Baskıları</h2>
<p>TSMC, Samsung ve Intel'in ileri teknoloji üretim hatları halihazırda tam kapasitenin üzerinde çalışıyor. TSMC'nin 2nm süreci henüz olgunlaşmadığından ve 3nm kapasitesi Apple, Qualcomm ve NVIDIA arasında kıt kaynak olarak paylaşıldığından, kısa vadeli arz artışı son derece sınırlı kalacak.</p>

<h2>Editör Yorumu: Bu Fiyat Baskılarının Anlamı</h2>
<p>Bu GPU kıtlığı, yapay zekanın yarattığı talep ve fiziksel üretim kapasitesi arasındaki köklü bir uyumsuzluğu gözler önüne seriyor. Yapay zeka firmaları, talep arttıkça yapay zeka üretme yeteneklerini ölçeklendirebileceklerini varsayarak iş modelleri geliştiriyor; oysa GPU kıtlığı bu öncülü zayıflatıyor.</p>

<p>Asıl uzun vadeli risk şu: Kıtlık yetersiz hizmet alınan segmentlerde yapay zeka benimsenmesini yavaşlatırsa, sektör zaten güç olan bir eşitsizlik sorunuyla yüzleşmek zorunda kalacak.</p>

<h2>Öngörülen Sonuçlar</h2>
<ul>
<li>Özellikle sermaye kısıtlı pazarlarda yapay zeka girişimlerinin büyümesinde yavaşlama</li>
<li>Yapay zeka hesaplama alanında yüksek bağımsızlık hedefiyle yeni RISC-V ve özel çip girişimlerine yönelik artan ilgi</li>
<li>Bulut sağlayıcıları arasında GPU kiralama fiyatlarındaki uzun vadeli artış trendi</li>
<li>GPU yapay zekasının getirdiği fiziksel kısıtlamalardan kaçınmak için nöromorifik hesaplama araştırmalarına yönelik yenilenen ilgi</li>
</ul>`
  }
];

async function seedTranslations() {
  console.log("Seeding Turkish translations for English articles...");
  
  for (const t of translations) {
    try {
      await db.execute({
        sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content)
              VALUES (?, ?, ?, ?, ?)
              ON CONFLICT(articleId, locale) DO UPDATE SET
                title = excluded.title,
                summary = excluded.summary,
                content = excluded.content,
                updatedAt = datetime('now')`,
        args: [t.articleId, t.locale, t.title, t.summary, t.content]
      });
      console.log(`✓ Seeded translation: ${t.articleId} (${t.locale})`);
    } catch (err) {
      console.error(`✗ Failed to seed ${t.articleId}:`, err);
    }
  }
  
  console.log("\nDone! Verifying...");
  const result = await db.execute({
    sql: `SELECT articleId, locale, SUBSTR(title, 1, 60) as titlePreview FROM ArticleTranslation ORDER BY articleId`,
    args: []
  });
  result.rows.forEach(row => {
    console.log(`  [${row.locale}] ${row.articleId}: ${row.titlePreview}...`);
  });
}

seedTranslations().catch(console.error).finally(() => process.exit(0));
