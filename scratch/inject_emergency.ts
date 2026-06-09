import { db } from '../src/lib/db';
import crypto from 'crypto';

async function main() {
  const id = crypto.randomUUID();
  const slug = "avrupa-savunma-sanayi-sarsildi-fcas-iptal-" + Date.now();
  
  // High quality Unsplash images or local copies
  // We will copy our generated image into the public/images or use the local system.
  // Wait, let's use the local file relative path if the frontend supports it, 
  // or we can use generic high quality military aviation URLs. Let's provide Unsplash URLs that are high-quality,
  // but also reference our newly generated images. Let's write them to /images/fcas_cancelled_cover.png
  
  const coverImage = "/images/fcas_cancelled_cover.png";
  const midImage = "/images/fcas_cancelled_split.png";

  const titleEN = "FCAS Collapse: France and Germany Cancel Next-Gen Sixth-Generation Fighter Jet Program";
  const summaryEN = "Europe's most ambitious defense project, the €100B FCAS program, has officially collapsed due to unsolvable industrial deadlocks.";
  
  const titleTR = "Savaş Teknolojisinde Deprem: Fransa ve Almanya 100 Milyar Euro'luk 6. Nesil Savaş Uçağı Projesini İptal Etti!";
  const summaryTR = "Avrupa'nın en büyük savunma projesi FCAS resmen çöktü. Fransa ve Almanya sanayi ortaklarının anlaşamaması üzerine ortak jet projesini durdurdu.";

  const contentEN = `
<div class="tldr-box">
  <ul>
    <li>France and Germany officially terminated the crewed fighter jet pillar of the €100 billion FCAS program.</li>
    <li>Industrial deadlock between Dassault Aviation and Airbus over leadership and technology access is cited as the core reason.</li>
    <li>Diverging national requirements, including carrier capability and nuclear strike capacity, proved irreconcilable.</li>
  </ul>
</div>
<h2>A Monumental Rupture in European Defense</h2>
<p>The geopolitical landscape of European military sovereignty has experienced a seismic shift. French President Emmanuel Macron and German Chancellor Friedrich Merz have officially announced the termination of their joint next-generation fighter jet program under the Future Combat Air System (FCAS). This landmark decision pulls the plug on the most ambitious and expensive European military project in modern history.</p>
<p>Originally conceived as a unified response to the rising technological dominance of the US and China, the FCAS program was slated to replace French Rafales and German Eurofighters with a sixth-generation stealth fighter by 2040. Instead, years of political posturing, corporate greed, and irreconcilable strategic demands have sent the €100 billion initiative into a tailspin from which it could not recover.</p>

<h2>Inside the Airbus-Dassault Industrial War</h2>
<p>While political leaders put a diplomatic spin on the collapse, defense insiders confirm that the root cause was a bitter, unsolvable dispute between prime contractors: France’s Dassault Aviation and European aerospace giant Airbus (representing Germany and Spain).</p>
<p>Dassault, possessing decades of independent fighter jet design heritage from the Mirage and Rafale programs, demanded absolute veto power over core flight control systems, stealth technology, and intellectual property. Airbus, backed by German funds, refused to accept a subordinate role, demanding full technology sharing and work package equity. This deadlock stalled phase 1B development for years, blowing past deadlines and ballooning budgets.</p>
<figure class="article-inline-image" style="margin: 40px 0;"><img src="${midImage}" alt="France and Germany split over jet technology" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.2);" /></figure>

<h2>Nuclear Weapons and Carrier Landing: A Bridge Too Far</h2>
<p>Beyond the corporate boardrooms, France and Germany operated under completely different military requirements. The French Air and Space Force demanded a fighter capable of launching from carrier decks (specifically the next-generation French PANG carrier) and carrying ASMP-A nuclear missiles. Germany, whose defense strategy does not include aircraft carriers or independent nuclear command, saw no reason to fund the complex engineering required for navalized stealth airframes.</p>
<p>Attempts to develop two distinct versions of the fighter defeated the entire economic rationale of a shared platform, leading experts to realize that an independent, domestic route for both nations would be less complicated.</p>

<h2>What Remains of the 'Combat Cloud'?</h2>
<p>Although the crewed fighter jet pillar is dead, both countries intend to salvage the auxiliary components of the FCAS project. This includes the "System of Systems" framework—particularly the "Combat Cloud." This advanced, secure data-sharing network is designed to link existing aircraft, unmanned aerial vehicles (UAVs), and command infrastructure using real-time AI coordination.</p>
<p>However, analysts warn that without a flagship aircraft to center the combat cloud around, the network's development will lack cohesion. Both nations are now expected to seek alternative alliances, with Germany potentially looking towards the UK-Italy-Japan Global Combat Air Programme (GCAP), and France contemplating a solo venture to develop a Rafale successor.</p>
`;

  const contentTR = `
<div class="tldr-box">
  <ul>
    <li>Fransa ve Almanya, 100 milyar Euro'luk FCAS programının ana omurgası olan insanlı savaş uçağı projesini resmi olarak sonlandırdı.</li>
    <li>Dassault Aviation ile Airbus arasındaki liderlik ve fikri mülkiyet hakları kavgası projenin çöküşüne neden oldu.</li>
    <li>Fransa'nın nükleer kapasite ve uçak gemisi iniş kalkış talepleri, Almanya'nın ulusal savunma stratejisiyle uyuşmadı.</li>
  </ul>
</div>
<h2>Avrupa Savunma Sanayisinde Tarihi Kırılma</h2>
<p>Avrupa'nın askeri egemenlik ve teknolojik bağımsızlık hayalleri bugün en büyük darbesini aldı. Fransa Cumhurbaşkanı Emmanuel Macron ve Almanya Başbakanı Friedrich Merz, "Geleceğin Muharebe Hava Sistemi" (FCAS) kapsamındaki 6. nesil ortak savaş uçağı projesinin tamamen iptal edildiğini duyurdu. Bu karar, modern tarihin en yüksek bütçeli Avrupa savunma girişimini resmen tarihe gömdü.</p>
<p>ABD'nin F-35 hegemonyasına ve Çin'in yükselen askeri teknolojisine karşı ortak bir Avrupa yanıtı olarak tasarlanan FCAS projesinin, 2040 yılına kadar Rafale ve Eurofighter uçaklarının yerini alması hedefleniyordu. Ancak şirketler arası çıkar çatışmaları, teknolojik mülkiyet kavgaları ve taban tabana zıt askeri gereksinimler, 100 milyar Euro'luk bu devasa bütçeyi çıkmaza soktu.</p>

<h2>Airbus ve Dassault Arasındaki Endüstriyel Savaş</h2>
<p>Liderler diplomatik açıklamalarla durumu yumuşatmaya çalışsa da, savunma sanayii kaynakları projenin çöküşünün arkasında Dassault Aviation (Fransa) ile Airbus (Almanya ve İspanya'yı temsil ediyor) arasındaki sarsıcı liderlik kavgası olduğunu doğruluyor.</p>
<p>Mirage ve Rafale gibi efsanevi jetlerin mimarı olan Fransız Dassault, uçağın uçuş kontrol sistemleri, hayalet (stealth) teknolojisi ve temel yazılımları üzerinde mutlak kontrol hakkı talep ediyordu. Almanya'nın bütçe gücünü arkasına alan Airbus ise teknoloji transferi ve eşit iş paylaşımı konusunda geri adım atmayı reddetti. Bu kriz, yıllarca süren gecikmelere ve bütçe aşımına yol açtı.</p>
<figure class="article-inline-image" style="margin: 40px 0;"><img src="${midImage}" alt="Fransa ve Almanya uçak teknolojisi ayrılığı" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.2);" /></figure>

<h2>Uçak Gemisi ve Nükleer Silah Çelişkisi</h2>
<p>Şirketlerin anlaşmazlığının ötesinde, iki ülkenin askeri ihtiyaçları da birbirine tamamen zıttı. Fransa, geliştirilecek uçağın uçak gemilerine (özellikle Fransa'nın yeni PANG gemisine) inip kalkabilmesini ve nükleer füzeler (ASMP-A) fırlatabilmesini şart koşuyordu. Kendi askeri doktrininde uçak gemisi ve bağımsız nükleer güç bulunmayan Almanya ise bu karmaşık ve aşırı pahalı denizcilik modifikasyonlarını finanse etmek istemedi.</p>
<p>Tek bir gövdede iki farklı versiyon üretme fikri ise projenin tüm ekonomik mantığını yok etti. Sonunda her iki devlet de kendi bağımsız yollarına gitmenin daha az maliyetli olacağına kanaat getirdi.</p>

<h2>Bundan Sonra Ne Olacak?</h2>
<p>İnsanlı jet projesi ölmüş olsa da, Fransa ve Almanya projenin yan bileşenlerini kurtarmaya çalışıyor. "Muharebe Bulutu" (Combat Cloud) adı verilen ve uçakları, insansız hava araçlarını (İHA) ve savunma sistemlerini yapay zeka entegrasyonuyla birbirine bağlayacak olan güvenli veri ağı projesi devam edecek.</p>
<p>Ancak askeri analistler, bu ağın merkezinde duracak bir "ana jet" olmadan projenin bütünlüğünü korumasının çok zor olduğunu belirtiyor. Şimdi gözler Almanya'nın İngiltere-İtalya-Japonya ortaklığındaki GCAP projesine katılıp katılmayacağına ve Fransa'nın tek başına yeni bir jet geliştirip geliştiremeyeceğine çevrildi.</p>
`;

  try {
    // Insert base EN article
    await db.execute({
      sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, originalUrl, locale, isPublished, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'en', 1, CURRENT_TIMESTAMP)`,
      args: [id, titleEN, slug, summaryEN, contentEN, 'DEFENSE', '#ef4444', coverImage, 'https://sentientwire.com/fcas-cancelled-breaking']
    });

    // Insert TR translation
    await db.execute({
      sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)`,
      args: [id, 'tr', titleTR, summaryTR, contentTR]
    });

    console.log("SUCCESS: Breaking Defense Article Injected to Cloud DB!");
    console.log("Article ID:", id);
    console.log("Slug:", slug);
  } catch (e) {
    console.error("Failed to inject:", e);
  }
}

main();
