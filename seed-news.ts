import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg",
});

const articles = [
  {
    id: "sw-001",
    title: "Operation Saffron: International Law Enforcement Dismantles Ransomware's Favorite VPN",
    slug: "operation-saffron-vpn-takedown-2026",
    summary: "In a landmark coordinated strike across 18 nations, authorities seized 33 bulletproof servers and arrested the administrator of 'First VPN' — a service embedded in virtually every major ransomware investigation of the last five years.",
    content: `<p>On May 19–20, 2026, a multi-year intelligence operation culminated in the dismantling of <strong>First VPN</strong>, a criminal-focused virtual private network service that had operated as the underground internet's most trusted anonymity tool since 2014.</p><h2>The Operation</h2><p>Codenamed <strong>Operation Saffron</strong> and led by France and the Netherlands with Europol and Eurojust coordination, the takedown involved 18 countries including the United States, United Kingdom, Germany, and Ukraine. Private sector partner <strong>Bitdefender</strong> provided critical threat intelligence that allowed investigators to map the service's global server infrastructure.</p><p>The results were decisive: <strong>33 "bulletproof" servers</strong> spread across 27 countries were seized simultaneously. The primary domains — <code>1vpns.com</code>, <code>1vpns.net</code>, and <code>1vpns.org</code> — along with associated Tor hidden services, were taken offline.</p><h2>Why This Target Mattered</h2><p>First VPN was not an ordinary commercial VPN. Promoted exclusively on Russian-language cybercrime forums, it offered anonymous payment, no-logging guarantees, and specialized connection protocols designed to defeat law enforcement surveillance. Europol confirmed the service appeared in <strong>almost every major cybercrime investigation</strong> it had supported in recent years — including those involving the <strong>Phobos</strong> and <strong>Avaddon</strong> ransomware operations.</p><h2>Intelligence Packages</h2><p>Following the server seizures, Europol generated <strong>83 intelligence packages</strong> distributed to participating jurisdictions, containing identifying information on <strong>506 users</strong> who believed their activities were permanently shielded.</p><h2>Strategic Significance</h2><p>This operation represents a shift in anti-cybercrime strategy: rather than targeting individual threat actors, law enforcement is now systematically dismantling the <em>infrastructure layer</em> that enables criminal ecosystems to function.</p>`,
    category: "CYBERSECURITY",
    categoryColor: "#ef4444",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: "sw-002",
    title: "Trump Kills AI Safety Order at Last Minute — Musk and Zuckerberg Influence Cited",
    slug: "trump-cancels-ai-safety-executive-order-may-2026",
    summary: "Hours before a scheduled White House signing ceremony, President Trump abruptly canceled an executive order that would have mandated voluntary federal safety vetting of frontier AI models.",
    content: `<p>On <strong>May 21, 2026</strong>, President Donald Trump canceled the signing of a landmark executive order that would have established a voluntary federal framework for evaluating national security risks in advanced AI systems — just hours before the ceremony was scheduled.</p><h2>What Was Proposed</h2><p>The draft executive order would have encouraged AI companies to voluntarily submit their most powerful frontier models to federal agencies for safety evaluations <strong>up to 90 days before public release</strong>. The goal: identify exploitable vulnerabilities before adversarial state actors could weaponize them.</p><h2>The Reversal</h2><p>Trump told reporters he "didn't like certain aspects" of the order. Reports indicate the last-minute cancellation followed direct outreach from <strong>Elon Musk</strong>, <strong>Mark Zuckerberg</strong>, and former AI advisor <strong>David Sacks</strong>, who argued regulatory scrutiny would slow U.S. development velocity. Several executives were reportedly mid-flight to Washington D.C. when the cancellation was announced.</p><h2>National Security Implications</h2><p>The decision leaves a significant gap in the federal government's ability to assess whether advanced AI systems — capable of autonomous cyberattack, bioweapon design assistance, or large-scale disinformation — pose risks before reaching the public.</p><h2>The Strategic Bet</h2><p>The administration's position reflects a deliberate calculation: that American AI dominance through unrestricted innovation is a more effective national security strategy than managing domestic risk through pre-deployment review.</p>`,
    category: "AI POLICY",
    categoryColor: "#8b5cf6",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: "sw-003",
    title: "GPU Prices Surge 20% as Global AI Compute Hits Critical Shortage",
    slug: "nvidia-gpu-shortage-prices-surge-2026",
    summary: "Nvidia's CFO confirmed rental prices for H100 and A100 GPUs have risen 20% and 15% respectively — a structural signal that AI compute demand has decisively outstripped global manufacturing capacity.",
    content: `<p>Nvidia CFO <strong>Colette Kress</strong> confirmed this week that rental prices for the company's flagship data center GPUs — the <strong>H100</strong> and <strong>A100</strong> — have risen by <strong>20% and 15%</strong> respectively in 2026. Experts call this pricing trend structurally unprecedented in semiconductor history.</p><h2>Why This Is Different</h2><p>GPU rental price increases of this magnitude typically occur in brief consumer gaming cycles. In data center compute, pricing has historically fallen over time as manufacturing scales. The current inversion — where prices are rising despite massive capital investment — indicates that demand from hyperscalers including <strong>Microsoft, Google, Amazon, and Meta</strong> is absorbing new supply faster than it can be produced.</p><h2>The Bottleneck Architecture</h2><p>The shortage spans the entire compute stack: TSMC's advanced node capacity, CoWoS packaging technology, and HBM3e memory modules produced almost exclusively by <strong>SK Hynix</strong>. A constraint at any point propagates across the entire industry.</p><h2>The Geopolitical Dimension</h2><p>U.S. export controls restrict China's access to advanced AI accelerators. Chinese labs are stockpiling Huawei Ascend 910B chips and optimizing software to extract performance from restricted hardware — a technological arms race the GPU shortage has intensified rather than resolved.</p>`,
    category: "TECHNOLOGY",
    categoryColor: "#06b6d4",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&q=80",
  },
];

async function setup() {
  console.log("Creating tables...");
  
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS Article (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      excerpt TEXT,
      content TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'GENERAL',
      categoryColor TEXT NOT NULL DEFAULT '#06b6d4',
      imageUrl TEXT,
      locale TEXT NOT NULL DEFAULT 'en',
      isPublished INTEGER NOT NULL DEFAULT 1,
      views INTEGER NOT NULL DEFAULT 0,
      xPosted INTEGER NOT NULL DEFAULT 0,
      originalUrl TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS SiteSettings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS PageVisit (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      referrer TEXT,
      country TEXT NOT NULL DEFAULT 'UNKNOWN',
      ipHash TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  
  console.log("Tables ready. Inserting articles...");

  for (const article of articles) {
    try {
      await db.execute({ sql: "DELETE FROM Article WHERE id = ?", args: [article.id] });
      await db.execute({
        sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished, views, xPosted, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, datetime('now'), datetime('now'))`,
        args: [article.id, article.title, article.slug, article.summary, article.content, article.category, article.categoryColor, article.imageUrl, article.locale]
      });
      console.log(`✅ ${article.title}`);
    } catch (e: any) {
      console.error(`❌ ${article.title}: ${e.message}`);
    }
  }
  
  console.log("\n🎉 Done! 3 articles added to Turso.");
}

setup();
