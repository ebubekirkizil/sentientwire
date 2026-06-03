import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"
});

async function insert() {
  const id = randomUUID();
  const slug = "otonom-lazer-tarama-" + Date.now();
  const title = "Ticari Uçak Gövdelerinde Otonom Lazer Tarama Dönemi";
  const summary = "Ticari havacılıkta periyodik bakım süreçleri, insan gözüyle yapılan manuel incelemeden, otonom lazer tarama ve yapay zeka analizine geçiş yapıyor.";
  
  const content = `
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

  await db.execute({
    sql: "INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, title, slug, summary, content, "HAVACILIK", "#0ea5e9", "/images/laser_drone.png", "tr", 1, new Date().toISOString(), new Date().toISOString()]
  });

  console.log("SUCCESS! Article inserted to LIVE TURSO DB!");
}

insert().catch(console.error);
