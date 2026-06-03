import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"
});

async function insertArticle() {
  const id = randomUUID();
  const slug = "meta-ads-andromeda-revolution-" + Date.now();
  const title = "'Andromeda' Revolution in Meta Ads Algorithm: Ad Visuals Now Do the Targeting";
  const summary = "As of 2026, Meta has transitioned to the Andromeda system, a 'Creative-First' delivery engine where targeting is determined by the ad visual itself.";
  
  const content = `
    <h2>Introduction: The Era of Defining Target Audiences is Over</h2>
    <p>For years, the biggest struggle of digital agencies was finding the "right audience". However, Meta's new structure based on Lattice and Andromeda has eliminated this "bouncers" logic. In the new system, you do not target the ad; the system analyzes the "semantic DNA" of the ad and finds the person who will be interested in that content. That means today, targeting on Meta is the ad visual itself.</p>

    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/meta_ads_mid.png" alt="Meta Ads Andromeda Interface" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>

    <h2>Operational Bottleneck: The End of Legacy "Manual" Campaigns</h2>
    <p>Successful "Lookalike" or multi-layered interest targeting strategies up until 2025 are now classified as "low-quality signals" in 2026.</p>
    <ul>
      <li><strong>Learning Phase Crisis:</strong> The Meta algorithm now demands at least 50 conversion data points per ad set per week. Businesses launching too many ad sets with small budgets lock all their sets in the "learning" phase, causing ads to never reach optimum levels.</li>
      <li><strong>Creative Fatigue:</strong> The algorithm no longer shows the ad to the same people constantly; it continuously tests until it yields the best creative performance. This shortens the creative lifespan. Ads that used to run for weeks are now "consumed" in 3-4 days.</li>
      <li><strong>Data Signal Quality:</strong> Accounts with improper Pixel and CAPI (Conversions API) setups and low "Event Match Quality" scores (below 7) become practically invisible in the Andromeda system.</li>
    </ul>

    <h2>New Strategy: "Broad Targeting" and Creative Diversity</h2>
    <p>To be the winning brand in the new era, agencies or business owners must use three main levers:</p>
    <ul>
      <li><strong>Multimodal AI Analysis:</strong> Meta now "watches" your ad video and "reads" the text on the visual. Therefore, the text on the ad visual must be semantically perfectly aligned with the interests of the targeted audience.</li>
      <li><strong>Advantage+ (ASC) Dominance:</strong> Meta's automated optimization tools for e-commerce and service-oriented campaigns offer a 17% lower cost per acquisition (CPA) than manual setups.</li>
      <li><strong>Creative Volume:</strong> The era of testing 3-5 visuals a month is over. Experimenting with at least 15-20 different "hooks" and formats (Reels, Carousel, Static) per month is now an operational necessity.</li>
    </ul>

    <h2>Financial Impact and Customer Acquisition Cost (CAC)</h2>
    <p>According to 2026 benchmark data; while customer acquisition cost (CPA) approaches the $180 mark in the service sector, this figure hovers around $30 in e-commerce. The new algorithm provides very low-cost conversions to those who apply the "right creative + broad audience" formula, while applying a "punishing CPM" (cost per mille) to those who insist on the old method.</p>

    <h2>SentientWire Analysis: Editor's Note</h2>
    <p>Meta's change in 2026 actually merges marketing with "content creation". The line between "Marketer" and "Creative" has completely blurred.</p>
    <p>Our prediction is this: "Creative is targeting." If you use the headline "AI efficiency" on an ad visual, the system automatically takes that visual to the business world or software developers. If you use "Minimalist luxury watch", the system takes it to the upper-income group. So you don't need to tell Meta who you are targeting; you just need to "tell" what you are selling through your visual.</p>
    <p>Our advice: If you are setting up this automation system, you should establish a prompt system for the AI producing the visuals and videos that defines the "emotional and financial benefit created by the product to be sold" rather than "target audience characteristics". In short; Andromeda works like your best sales representative, but you just need to feed it with a "quality story".</p>
    <p>This analysis serves as a critical guide to transforming your digital advertising budget from an expense into a data-driven investment tool.</p>
  `;

  const trTitle = "Meta Ads Algoritmasında 'Andromeda' Devrimi: Hedeflemeyi Artık Reklam Görselleri Yapıyor";
  const trSummary = "Meta, 2026 itibarıyla tamamen Yaratıcı Odaklı (Creative-First) bir teslimat motoru olan Andromeda sistemine geçti. Artık manuel hedef kitle tanımlamak yerini, reklamın kendi içeriğinin algoritma tarafından izlenip okunmasına bıraktı.";
  
  const trContent = `
    <h2>Giriş: Hedef Kitle Tanımlama Dönemi Kapandı</h2>
    <p>Yıllardır dijital ajansların en büyük uğraşı "doğru kitleyi" bulmaktı. Ancak Meta'nın Lattice ve Andromeda tabanlı yeni yapısı, bu "bouncers" (kapı görevlisi) mantığını ortadan kaldırdı. Yeni sistemde reklamı siz hedeflemiyorsunuz; sistem, reklamın "anlamsal DNA'sını" analiz ederek o içeriğe ilgi duyacak kişiyi buluyor. Yani bugün Meta'da hedefleme, reklam görselinin ta kendisidir.</p>

    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/meta_ads_mid.png" alt="Meta Ads Andromeda Interface" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>

    <h2>Operasyonel Darboğaz: Eski Nesil "Manual" Kampanyaların Sonu</h2>
    <p>2025 yılına kadar başarılı olan "Lookalike" (benzer kitleler) veya çok katmanlı ilgi alanı hedeflemeleri, 2026'da artık "düşük kaliteli sinyal" olarak sınıflandırılıyor.</p>
    <ul>
      <li><strong>Öğrenme Fazı Krizi:</strong> Meta algoritması artık set başına haftada en az 50 dönüşüm verisi talep ediyor. Küçük bütçelerle çok fazla reklam seti açan işletmeler, tüm setlerini "öğrenme" aşamasında kilitliyor ve reklamların asla optimum seviyeye çıkmamasına neden oluyor.</li>
      <li><strong>Yaratıcı Yorgunluğu (Creative Fatigue):</strong> Algoritma artık reklamı sürekli aynı kişilere göstermiyor; en iyi kreatif performansı verene kadar sürekli test ediyor. Bu da kreatif ömrünü kısaltıyor. Eskiden haftalarca giden reklamlar, şimdi 3-4 günde "tüketiliyor".</li>
      <li><strong>Veri Sinyali Kalitesi:</strong> Pixel ve CAPI (Conversations API) kurulumları düzgün olmayan, "Event Match Quality" skoru düşük (7'nin altı) hesaplar, Andromeda sisteminde adeta görünmez oluyor.</li>
    </ul>

    <h2>Yeni Strateji: "Geniş Hedefleme" ve Kreatif Çeşitliliği</h2>
    <p>Yeni dönemde kazanan marka olmak için ajansların veya işletme sahiplerinin (senin durumunda olduğu gibi) üç temel kaldıraç kullanması şart:</p>
    <ul>
      <li><strong>Multimodal AI Analizi:</strong> Meta artık reklam videonuzu "izliyor" ve görsel üzerindeki metinleri "okuyor". Bu yüzden reklam görselindeki metinlerin, hedeflenen kitlenin ilgi alanlarıyla anlamsal olarak tam uyumlu olması gerekiyor.</li>
      <li><strong>Advantage+ (ASC) Baskınlığı:</strong> E-ticaret ve hizmet odaklı kampanyalar için Meta'nın sunduğu otomatik optimizasyon araçları, manuel kurulumlardan %17 daha düşük müşteri edinme maliyeti (CPA) sunuyor.</li>
      <li><strong>Kreatif Hacmi:</strong> Ayda 3-5 görsel test etmek devri bitti. Ayda en az 15-20 farklı "hook" (dikkat çekici giriş) ve formatla (Reels, Carousel, Statik) deneme yapmak artık operasyonel bir zorunluluk.</li>
    </ul>

    <h2>Finansal Etki ve Müşteri Edinme Maliyeti (CAC)</h2>
    <p>2026 benchmark verilerine göre; hizmet sektöründe müşteri edinme maliyeti (CPA) 180 dolar seviyelerine yaklaşırken, e-ticarette bu rakam 30 dolar civarında seyrediyor. Yeni algoritma, "doğru kreatif + geniş kitle" formülünü uygulayanlara çok düşük maliyetli dönüşüm sağlarken, eski yöntemde ısrar edenlere "cezalandırıcı CPM" (bin gösterim başına maliyet) uyguluyor.</p>

    <h2>SentientWire Analizi: Editörün Yorumu</h2>
    <p>Meta'nın 2026'daki bu değişimi, aslında pazarlamayı "içerik üreticiliği" ile birleştiriyor. Artık "Pazarlamacı" ile "Yaratıcı" arasındaki çizgi tamamen silindi.</p>
    <p>Öngörümüz şudur: "Kreatif, hedeflemedir." Eğer bir reklam görselinde "Yapay zeka verimliliği" başlığı kullanıyorsan, sistem o görseli otomatik olarak iş dünyasına veya yazılımcılara götürüyor. Eğer "Minimalist lüks saat" kullanıyorsan, sistem onu üst gelir grubuna götürüyor. Yani Meta'ya kimi hedeflediğini söylemene gerek yok; sadece ne sattığını görselinle "anlatman" yeterli.</p>
    <p>Tavsiyemiz: Eğer bu otomasyon sistemini kuruyorsan, görselleri ve videoları üreten yapay zekana, "hedef kitle özelliklerini" değil, "satılacak ürünün yarattığı duygusal ve finansal faydayı" tanımlayan bir komut sistemi kurmalısın. Kısacası; Andromeda, senin yerine en iyi satış temsilcin gibi çalışıyor, ancak onu sadece "kaliteli bir hikaye" ile beslemen gerekiyor.</p>
    <p>Bu analiz, dijital reklam bütçeni bir giderden çok, veriye dayalı bir yatırım aracına dönüştürmen için kritik bir rehber niteliğindedir.</p>
  `;

  // 1. Insert main English article
  await db.execute({
    sql: "INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, title, slug, summary, content, "AI", "#8b5cf6", "/images/meta_ads_cover.png", "en", 1, new Date().toISOString(), new Date().toISOString()]
  });

  // 2. Insert Turkish translation
  await db.execute({
    sql: "INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, 'tr', ?, ?, ?)",
    args: [id, trTitle, trSummary, trContent]
  });

  console.log("SUCCESS! Meta Ads Andromeda article inserted into LIVE DB and translations updated.");
}

insertArticle().catch(console.error);
