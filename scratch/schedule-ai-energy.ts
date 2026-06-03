import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"
});

async function insertArticle() {
  const id = randomUUID();
  const slug = "us-ai-transparency-act-energy-bill-" + Date.now();
  
  const title = "US 'AI Transparency Act': The Energy Bill of Data Centers is No Longer a Secret!";
  const summary = "The US Congress is discussing a law that mandates reporting the 'operating cost' of AI models not only in dollars but also in terms of 'energy consumption'.";
  
  const content = `
    <h2>EXECUTIVE SUMMARY (TL;DR)</h2>
    <p><strong>Development:</strong> The US Congress is discussing a law that mandates reporting the "operating cost" of AI models not only in dollars but also in terms of "energy consumption".</p>
    <p><strong>Strategic Risk:</strong> Regulation will directly drive up the operational expenditures (OPEX) of data centers; initiating a new era where only the "efficient ones" will survive.</p>
    <p><strong>Market Expectation:</strong> For small and medium-sized AI startups, these "compliance costs" could build a serious wall against entering the market.</p>

    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/ai_energy_mid.png" alt="AI Megawatt Power Consumption Dashboard" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>

    <h2>The "Dark" Bill of Data Centers is Revealed</h2>
    <p>For years, the tech world has cared about how "smart" AI is; but we haven't talked much about how "hungry" the massive server farms feeding this intelligence are. Recent news from Washington seems to change the center of this debate now. A new bill introduced in the US Congress obliges companies developing AI models and operating data centers to report their energy consumption and carbon footprints in detail.</p>
    <p>So, why is this on the agenda now? Because AI is no longer a hobby, but an industrial power straining power grids. The fact that training a simple LLM (Large Language Model) can swallow the annual energy needs of a small town in seconds no longer escapes the attention of regulators.</p>

    <h2>An Operational Burden, or a Strategic Elimination?</h2>
    <p>The initial reaction to this bill in the corridors of tech companies is "cost" oriented. Training an AI model is already expensive enough, and adding an "energy audit" and "reporting obligation" on top of it will put a serious dent in companies' R&D budgets.</p>
    <p>However, we must look at the other side of the coin: This law is actually like a filter designed to clean up "garbage" projects in the sector. If a model you develop does not create sufficient economic value in proportion to its environmental impact and energy consumption, that project will be labeled "unsustainable" with this regulation. In short, this regulation in Washington makes "energy efficiency" a new competitive criterion in the AI world.</p>

    <h2>EDITOR'S NOTE: Is Regulation the New Shield for Giants?</h2>
    <p>Let's be honest: Regulations are usually enacted to "protect the consumer", but in practice, they often protect the giants of the market.</p>
    <p>This bill is evolving to a similar point. Giants like OpenAI, Google, or Microsoft already have millions of dollars of infrastructure and an army of lawyers regarding energy efficiency and auditing. For them, these reports are just "another administrative task". However, for a small, independent AI startup trying to create a revolution in its garage, these reporting processes can turn into a financial nightmare.</p>
    <p>My prediction is this: If this bill passes, it will become difficult for small players in the AI sector to enter the market. The market will consolidate even further. The winners will be the companies that build their own power plants or revolutionize cooling technologies (efficiency). Tomorrow's tech giants will not just be "those who write the smartest code", but among "those who run that code with the least energy". Investors will now look at AI models and ask, not just "how smart is it?", but "how many megawatts does it burn?".</p>
    <p>This is not the end of a game; it is just the beginning of a new phase where the rules are now much heavier.</p>
  `;

  const trTitle = "ABD'nin 'Yapay Zeka Şeffaflık Yasası': Veri Merkezlerinin Enerji Faturası Artık Sır Değil!";
  const trSummary = "ABD Kongresi, yapay zeka modellerinin çalışma maliyetini sadece dolar cinsinden değil, enerji tüketimi cinsinden raporlamayı zorunlu kılan bir yasayı tartışıyor.";
  
  const trContent = `
    <h2>YÖNETİCİ ÖZETİ (TL;DR)</h2>
    <p><strong>Gelişme:</strong> ABD Kongresi, yapay zeka modellerinin "çalışma maliyetini" sadece dolar cinsinden değil, "enerji tüketimi" cinsinden raporlamayı zorunlu kılan bir yasayı tartışıyor.</p>
    <p><strong>Stratejik Risk:</strong> Regülasyon, veri merkezlerinin operasyonel giderlerini (OPEX) doğrudan yukarı çekecek; "verimli olanın" ayakta kalacağı yeni bir dönemi başlatıyor.</p>
    <p><strong>Pazar Beklentisi:</strong> Küçük ve orta ölçekli AI girişimleri için bu "uyum maliyetleri", pazara girişte ciddi bir duvar örebilir.</p>

    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/ai_energy_mid.png" alt="AI Megawatt Power Consumption Dashboard" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>

    <h2>Veri Merkezlerinin "Karanlık" Faturası Ortaya Çıkıyor</h2>
    <p>Yıllardır teknoloji dünyası, yapay zekanın ne kadar "akıllı" olduğuyla ilgilendi; ancak bu zekayı besleyen devasa sunucu çiftliklerinin ne kadar "aç" olduğunu pek konuşmadık. Washington’dan gelen son haberler, artık bu tartışmanın merkezini değiştirecek gibi görünüyor. ABD Kongresi'nde gündeme gelen yeni yasa tasarısı, yapay zeka modelleri geliştiren ve veri merkezi işleten şirketlerin, enerji tüketimlerini ve karbon ayak izlerini detaylı bir şekilde raporlamasını zorunlu kılıyor.</p>
    <p>Peki, bu neden şimdi gündemde? Çünkü yapay zeka artık bir hobi değil, elektrik şebekelerini zorlayan endüstriyel bir güç. Basit bir LLM (Büyük Dil Modeli) eğitiminin, küçük bir kasabanın bir yıllık enerji ihtiyacını saniyeler içinde yutabildiği gerçeği, artık düzenleyicilerin gözünden kaçmıyor.</p>

    <h2>Operasyonel Bir Yük mü, Stratejik Bir Eleme mi?</h2>
    <p>Teknoloji şirketlerinin koridorlarında bu tasarıya yönelik ilk tepki "maliyet" odaklı. Bir yapay zeka modelini eğitmek zaten yeterince pahalıyken, üzerine bir de "enerji denetimi" ve "raporlama zorunluluğu" eklenmesi, şirketlerin Ar-Ge bütçelerinde ciddi bir gedik açacak.</p>
    <p>Ancak madalyonun diğer yüzüne bakmak lazım: Bu yasa, aslında sektördeki "çöp" projeleri temizlemek için tasarlanmış bir filtre gibi. Eğer geliştirdiğiniz bir model, çevresel etkisine ve enerji tüketimine oranla yeterli ekonomik değer yaratmıyorsa, bu düzenlemeyle birlikte o proje "sürdürülebilir değil" damgası yiyecek. Kısacası, Washington'daki bu regülasyon, AI dünyasında "enerji verimliliğini" yeni bir rekabet kriteri haline getiriyor.</p>

    <h2>EDİTÖRÜN YORUMU: Regülasyon, Devlerin Yeni Kalkanı mı?</h2>
    <p>Şunu dürüstçe konuşalım: Regülasyonlar genellikle "tüketiciyi korumak" için çıkarılır, ancak pratikte çoğu zaman pazarın devlerini korur.</p>
    <p>Bu yasa tasarısı da benzer bir noktaya evriliyor. OpenAI, Google veya Microsoft gibi devler, enerji verimliliği ve denetim konusunda zaten milyonlarca dolarlık altyapıya ve hukuk ordusuna sahipler. Onlar için bu raporlamalar sadece "bir başka idari iş". Ancak, garajında devrim yaratmaya çalışan küçük, bağımsız bir AI girişimi için bu raporlama süreçleri, finansal bir kabusa dönüşebilir.</p>
    <p>Öngörüm şudur: Bu yasa tasarısı geçerse, yapay zeka sektöründe küçük oyuncuların pazara girişi zorlaşacak. Pazar daha da konsolide olacak. Kazananlar ise, kendi enerji santrallerini kuran veya soğutma teknolojilerinde (verimlilikte) devrim yapan şirketler olacak. Yarının teknoloji devleri, sadece "en zeki kodu yazanlar" değil, "en az enerjiyle o kodu çalıştıranlar" arasından çıkacak. Yatırımcılar artık AI modellerine bakarken, sadece "ne kadar zeki?" diye değil, "kaç megavat yakıyor?" diye soracak.</p>
    <p>Bu bir oyunun sonu değil; sadece kuralların artık daha ağır olduğu yeni bir aşamanın başlangıcı.</p>
  `;

  await db.execute({
    sql: "INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, title, slug, summary, content, "CYBERSECURITY", "#8b5cf6", "/images/ai_energy_cover.png", "en", 1, new Date().toISOString(), new Date().toISOString()]
  });

  await db.execute({
    sql: "INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, 'tr', ?, ?, ?)",
    args: [id, trTitle, trSummary, trContent]
  });

  console.log("SUCCESS! AI Energy article scheduled 1 completed.");
}

insertArticle().catch(console.error);
