import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg",
});

const articles = [
  {
    id: "sw-004",
    title: "Google Gemini 'Intelligence Layer' Transforms Android and Chrome",
    slug: "google-gemini-intelligence-layer-2026",
    summary: "Google has officially transitioned Gemini from a standalone chatbot to a universal 'intelligence layer' integrated across Android, Chrome, and Workspace, reshaping the OS experience.",
    content: "<p>In a major shift announced at Google I/O this week, the tech giant revealed that its Gemini AI model will no longer function primarily as a discrete chatbot app. Instead, it has been deeply embedded into the architecture of Android, Chrome, and Google Workspace as a universal <strong>'intelligence layer'</strong>.</p><h2>The Ambient Assistant</h2><p>This integration means Gemini can now act autonomously on the user's behalf across different applications. On Android, it can read your screen contextually, pull information from an email in Gmail, cross-reference it with your calendar, and draft a response in Messages — all without opening a separate AI interface.</p><h2>Enterprise Implications</h2><p>For Workspace users, the intelligence layer actively monitors document creation and communication, offering real-time data retrieval and analysis from company databases. Security experts note this raises significant data privacy concerns, though Google insists all enterprise processing remains isolated.</p><h2>The Race to OS-Level AI</h2><p>This move places Google in direct competition with Apple's recent system-wide intelligence features and Microsoft's Copilot integration in Windows, marking the definitive end of the 'chatbot era' and the beginning of ambient, OS-level artificial intelligence.</p>",
    category: "AI",
    categoryColor: "#06b6d4",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    id: "sw-005",
    title: "Quantum Breaking: Q-Labs Demonstrates 2048-bit RSA Vulnerability",
    slug: "quantum-breaking-rsa-2048-2026",
    summary: "A coalition of researchers at Q-Labs has successfully used a hybrid quantum-classical algorithm to factor a 2048-bit RSA key in under 12 hours, signaling the dawn of the post-quantum era.",
    content: "<p>In a watershed moment for global cybersecurity, researchers at the independent quantum research facility <strong>Q-Labs</strong> have demonstrated the ability to factor a 2048-bit RSA key in just under 12 hours. The feat was accomplished using a novel hybrid algorithm that combines classical high-performance computing with a 1,024-qubit quantum processor.</p><h2>The Threat is Now</h2><p>For decades, 2048-bit RSA encryption has been the backbone of internet security, protecting everything from banking transactions to secure communications. While a 12-hour decryption time is not yet real-time, it effectively renders current encryption standards vulnerable to 'Store Now, Decrypt Later' (SNDL) attacks by nation-states.</p><h2>The Industry Response</h2><p>Following the publication of the research, major financial institutions and government agencies have accelerated their transition to Post-Quantum Cryptography (PQC) standards recently finalized by NIST. The cybersecurity industry is now racing to implement lattice-based cryptography before malicious actors can replicate Q-Labs' hybrid approach.</p>",
    category: "QUANTUM",
    categoryColor: "#818cf8",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  },
  {
    id: "sw-006",
    title: "Autonomous Drone Swarms Deployed in Urban Security Test",
    slug: "autonomous-drone-swarms-urban-test-2026",
    summary: "Leaked footage reveals that a fleet of AI-driven drones successfully navigated a complex urban environment without GPS, relying solely on visual processing and swarm intelligence.",
    content: "<p>Defense contractor AeroTek has drawn public scrutiny after leaked video footage showed a swarm of 50 autonomous drones navigating the dense urban canyon of a mock city training ground. Crucially, the drones operated entirely without GPS or centralized human control.</p><h2>Swarm Intelligence</h2><p>The drones utilized a decentralized mesh network, sharing spatial data and visual cues in real-time. If one drone encountered an obstacle or lost line-of-sight, the swarm dynamically reconfigured its formation to maintain coverage. This capability allows the swarm to operate in highly contested environments where GPS signals are jammed or unavailable.</p><h2>Civilian Concerns</h2><p>While AeroTek claims the technology is intended for search-and-rescue operations and perimeter defense, privacy advocates have raised alarms. The ability of a machine swarm to autonomously track multiple targets through a city raises the specter of unprecedented surveillance capabilities. Lawmakers are now calling for emergency hearings on the regulation of autonomous aerial systems in domestic airspace.</p>",
    category: "DEFENSE",
    categoryColor: "#f59e0b",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
  },
  {
    id: "sw-007",
    title: "Pacific Subsea Cables Suspected of Being Tapped",
    slug: "pacific-subsea-cables-tapped-2026",
    summary: "Unexplained signal degradation in major trans-Pacific fiber optic cables has sparked fears of physical tampering and data interception by state-sponsored actors.",
    content: "<p>Telecom operators managing the critical subsea fiber optic cables connecting North America to Asia have reported anomalous signal degradation over the past 48 hours. Initial diagnostics rule out natural seismic activity or equipment failure, leading security analysts to suspect physical tampering.</p><h2>The Vulnerable Depths</h2><p>Subsea cables carry over 95% of international data traffic. While data is encrypted in transit, the sheer volume of intercepted traffic could be stored for future decryption (SNDL attacks) or analyzed for metadata patterns. Specially equipped submarines can splice into these cables using inductive coupling, reading the data without severing the connection.</p><h2>Geopolitical Tensions</h2><p>The location of the suspected taps—in international waters near key naval chokepoints—has heightened geopolitical tensions. The US Navy has reportedly deployed autonomous underwater vehicles (AUVs) to inspect the cables, while international cyber agencies are monitoring for signs of massive data exfiltration.</p>",
    category: "INFRASTRUCTURE",
    categoryColor: "#10b981",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  },
  {
    id: "sw-008",
    title: "New LLM Vulnerability: 'Data Poisoning 2.0'",
    slug: "llm-data-poisoning-vulnerability-2026",
    summary: "Cybersecurity researchers have discovered a new technique that allows attackers to subtly manipulate the outputs of leading AI models by injecting imperceptible triggers into their training data.",
    content: "<p>A severe vulnerability has been identified in how leading Large Language Models (LLMs) process training data. Dubbed 'Data Poisoning 2.0,' the technique allows malicious actors to insert sleeper triggers into open-source datasets. When a model trains on this data, the trigger remains dormant until activated by a specific user prompt.</p><h2>Silent Manipulation</h2><p>Unlike traditional hacking, this attack does not exploit code flaws but rather the statistical learning process of the AI itself. Once activated, the poisoned model will confidently output false information, malicious code, or biased reasoning, making it incredibly difficult to detect.</p><h2>Industry Scramble</h2><p>Major AI labs, including OpenAI and Anthropic, are currently scrambling to develop robust data sanitization pipelines to detect these microscopic statistical anomalies. The discovery highlights the fragility of relying on massive, uncurated web scraping for foundational model training.</p>",
    category: "AI SECURITY",
    categoryColor: "#ef4444",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
  {
    id: "sw-009",
    title: "Next-Gen RISC-V Chips Break 8GHz Barrier",
    slug: "riscv-chips-break-8ghz-2026",
    summary: "Silicon Valley startup 'Silicomp' has unveiled a revolutionary graphene-silicon hybrid RISC-V processor capable of sustaining 8GHz clock speeds with minimal thermal throttling.",
    content: "<p>The open-standard RISC-V architecture has achieved a historic milestone. Startup Silicomp announced the successful prototyping of a hybrid processor utilizing a graphene-silicon composite material, allowing the chip to reach sustained clock speeds of 8GHz.</p><h2>Thermal Breakthrough</h2><p>Traditional silicon chips face severe thermal constraints at high frequencies. Silicomp's innovation lies in using a microscopic graphene layer for rapid heat dissipation, effectively eliminating the thermal bottleneck that has stifled clock speed improvements for the last decade.</p><h2>Market Impact</h2><p>The achievement not only validates the RISC-V ecosystem as a high-performance alternative to ARM and x86 but also promises significant performance leaps for edge AI devices and data center servers. Major hyperscalers are reportedly in talks to license the fabrication technology.</p>",
    category: "HARDWARE",
    categoryColor: "#f59e0b",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: "sw-010",
    title: "Biometric Database Breach Exposes 40 Million Identities",
    slug: "biometric-database-breach-2026",
    summary: "A decentralized identity provider has suffered a catastrophic data breach, resulting in the theft and dark web sale of over 40 million biometric profiles, including fingerprint and iris scan data.",
    content: "<p>In one of the most severe identity theft incidents of the decade, a leading decentralized identity verification provider has been compromised. Hackers successfully exfiltrated a database containing the biometric profiles—specifically high-resolution fingerprint hashes and iris scans—of approximately 40 million individuals.</p><h2>The Permanence of Biometrics</h2><p>Unlike passwords, which can be changed, biometric data is immutable. Once compromised, the victim faces a lifetime of potential identity fraud. Security analysts have already spotted packages of the stolen biometric data being sold on dark web marketplaces, primarily to actors seeking to bypass multi-factor authentication systems at financial institutions.</p><h2>Regulatory Backlash</h2><p>The breach has prompted an immediate outcry from privacy regulators in the EU and the US. It has reignited the debate over the safety of centralized biometric storage, with experts calling for mandatory on-device processing (like Apple's Secure Enclave) rather than cloud-based verification systems.</p>",
    category: "CYBERSECURITY",
    categoryColor: "#ef4444",
    locale: "tr",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  }
];

async function seed() {
  for (const article of articles) {
    try {
      await db.execute({ sql: "DELETE FROM Article WHERE id = ?", args: [article.id] });
      await db.execute({
        sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished, views, xPosted, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, datetime('now', '-' || (abs(random()) % 6 + 1) || ' days'), datetime('now'))`,
        args: [article.id, article.title, article.slug, article.summary, article.content, article.category, article.categoryColor, article.imageUrl, article.locale]
      });
      console.log(`✅ ${article.title}`);
    } catch (e: any) {
      console.error(`❌ ${article.title}: ${e.message}`);
    }
  }
  console.log("Done seeding more articles!");
}

seed();
