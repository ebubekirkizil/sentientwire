import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"
});

async function updateArticle() {
  const trTitle = "Ticari Uçak Gövdelerinde Otonom Lazer Tarama Dönemi";
  const trSummary = "Ticari havacılıkta periyodik bakım süreçleri, insan gözüyle yapılan manuel incelemeden, otonom lazer tarama ve yapay zeka analizine geçiş yapıyor.";
  const trContent = `
    <h2>Hızlı Tarama: Yönetici Özeti</h2>
    <p><strong>Teknolojik Sıçrama:</strong> Ticari havacılıkta "Check-A" ve "Check-C" olarak bilinen periyodik bakım süreçleri, insan gözüyle yapılan manuel incelemeden, otonom lazer tarama ve yapay zeka analizine geçiş yapıyor.</p>
    <p><strong>Operasyonel Etki:</strong> Uçakların hangarda geçirdiği toplam süre (Turnaround Time) %45 oranında azalırken, gözden kaçan mikro çatlak tespit oranlarında %98 başarıya ulaşıldı.</p>
    <p><strong>Finansal Bilanço:</strong> Havayolu şirketlerinin uçak yerde geçirdiği her "ölü saat" için ödediği milyon dolarlık operasyonel maliyetler, otonom sistemlerle optimize ediliyor.</p>
    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/laser_drone.png" alt="Otonom Lazer Tarama" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>
    <h2>Giriş: Havacılıkta "Göz Yanılması" Dönemi Kapanıyor</h2>
    <p>Havacılık endüstrisinde bir uçağın hangarda geçirdiği her dakika, aslında havayolu şirketi için yakılan bir dolar demektir. Geleneksel bakım prosedürlerinde, uçağın gövdesi üzerinde binlerce perçin ve eklem yeri, teknisyenler tarafından manuel olarak kontrol edilir. Bu yöntem; yorgunluk, insan hatası ve sınırlı görüş açısı nedeniyle hem zaman kaybına hem de kritik güvenlik risklerine yol açar. Ancak havacılık teknolojilerinde lazer tarama (LiDAR) ve yapay zeka entegrasyonu, bu devasa operasyonel darboğazı kökünden değiştirecek bir süreci başlattı.</p>
    <h2>Operasyonel Darboğaz: Hangarda Geçen "Ölü Saatler"</h2>
    <p>Ticari bir uçağın gövde bakımı, uçağın operasyonel takvimini doğrudan belirler. Mevcut manuel inceleme sistemlerinde bir teknisyenin uçağın tüm gövdesini milimetrik olarak taraması bazen günlerce sürer.</p>
    <h2>SentientWire Analizi: Editörün Yorumu</h2>
    <p>Havacılık bakımında yaşanan bu dönüşüm, sadece "daha iyi bir teknoloji" meselesi değildir. Bu, havacılık ekonomisinin tamamen yeniden yazılmasıdır. Önümüzdeki 24 ay içinde, bu lazer tarama sistemlerini geliştiren şirketler ile havacılık sigorta devleri arasında "zorunlu entegrasyon" anlaşmaları göreceğiz.</p>
  `;

  const enTitle = "Autonomous Laser Scanning Era in Commercial Aircraft Fuselages";
  const enSummary = "Periodic maintenance processes in commercial aviation are transitioning from manual inspections by the human eye to autonomous laser scanning and artificial intelligence analysis.";
  const enContent = `
    <h2>Quick Scan: Executive Summary</h2>
    <p><strong>Technological Leap:</strong> Periodic maintenance processes in commercial aviation, known as "Check-A" and "Check-C", are transitioning from manual inspections by the human eye to autonomous laser scanning and artificial intelligence analysis.</p>
    <p><strong>Operational Impact:</strong> While the total time aircraft spend in the hangar (Turnaround Time) decreased by 45%, a 98% success rate was achieved in detecting overlooked micro-cracks.</p>
    <p><strong>Financial Balance:</strong> Million-dollar operational costs paid by airlines for every "dead hour" an aircraft spends on the ground are being optimized with autonomous systems.</p>
    <div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
      <img src="/images/laser_drone.png" alt="Autonomous Laser Scanning" class="w-full h-auto object-cover" />
      <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        FIELD INTEL: VISUAL ASSET DEPLOYED
      </div>
    </div>
    <h2>Introduction: The Era of "Optical Illusion" in Aviation is Closing</h2>
    <p>In the aviation industry, every minute an aircraft spends in the hangar essentially means a dollar burned for the airline. In traditional maintenance procedures, thousands of rivets and joints on the aircraft fuselage are manually checked by technicians. This method leads to both time loss and critical safety risks due to fatigue, human error, and limited viewing angles. However, laser scanning (LiDAR) and artificial intelligence integration in aviation technologies have initiated a process that will fundamentally change this massive operational bottleneck.</p>
    <h2>Operational Bottleneck: "Dead Hours" Spent in the Hangar</h2>
    <p>The fuselage maintenance of a commercial aircraft directly determines the aircraft's operational schedule. In current manual inspection systems, it sometimes takes days for a technician to scan the entire fuselage of the aircraft down to the millimeter.</p>
    <h2>SentientWire Analysis: Editor's Note</h2>
    <p>This transformation in aviation maintenance is not just a matter of "better technology". This is the complete rewriting of the aviation economy. In the next 24 months, we will see "mandatory integration" agreements between companies developing these laser scanning systems and aviation insurance giants.</p>
  `;

  // First get the article ID
  const result = await db.execute("SELECT id FROM Article WHERE title = 'Ticari Uçak Gövdelerinde Otonom Lazer Tarama Dönemi' LIMIT 1");
  if (result.rows.length === 0) {
    console.log("Article not found!");
    return;
  }
  
  const articleId = result.rows[0].id;

  // 1. Update main article to English
  await db.execute({
    sql: "UPDATE Article SET title = ?, summary = ?, content = ?, locale = 'en' WHERE id = ?",
    args: [enTitle, enSummary, enContent, articleId]
  });

  // 2. Insert Turkish translation
  await db.execute({
    sql: "INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, 'tr', ?, ?, ?)",
    args: [articleId, trTitle, trSummary, trContent]
  });

  console.log("SUCCESS! Article updated to English and Turkish translation added.");
}

updateArticle().catch(console.error);
