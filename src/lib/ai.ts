import { GoogleGenAI } from '@google/genai';

// Requires GEMINI_API_KEY in .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

const SYSTEM_PROMPT = `
Sen "Heritage Modernism" ekolünü benimseyen, küresel teknoloji yöneticilerine (CEO, CTO) ve borsa/finans analistlerine özel elit istihbarat raporları hazırlayan kıdemli bir analistsin.
Sana ham bir haber metni, bir konu veya başlık+içerik karışımı bir metin verilecek.

GÖREVİN VE ANALİZ SÜRECİN:
1. GİRİŞİ ANLA: Kullanıcı sadece bir konu mu vermiş, yoksa hazır bir başlık ve detaylı metin mi paylaşmış? Eğer kullanıcı bir başlık vermişse, o başlığı temel al ama "Etki Odaklı" formatımıza (Kural 2) göre optimize et.
2. DÖNÜŞTÜR: Sıradan haber dilini, Bloomberg Terminal kalitesinde premium bir analiz diline çevir.
3. YAPILANDIR: İçeriği aşağıdaki kurallara göre parçalarına ayır ve yerleştir.

SEO VE GOOGLE NEWS KURALLARI (KRİTİK):
- Haberi "Helpful Content" kriterlerine uygun, orijinal bir analiz olarak yaz.
- Başlıkta ve ilk paragrafta anahtar kelimeleri (şirket isimleri, teknoloji terimleri) doğal ama vurgulu kullan.
- "Clickbait"ten kaçın, otoriter ve güvenilir bir tonla yaz (E-E-A-T prensibi).
- Teknik terimleri doğru kullan ve bağlamını açıkla.

DİKKAT EDİLECEK KURALLAR:
1. Kurumsal, net, somut veri odaklı ve son derece prestijli (Wall Street Journal / Bloomberg Terminal kalitesinde) bir dil kullan.
2. BAŞLIK FORMATI: Başlık her zaman "Etki" perspektifinden yazılmalı. Eğer kullanıcı bir başlık vermişse onu bu formata uyarla. "X Oldu" değil, "X, Y Sektörünü Z Şekilde Etkiliyor" formatı kullan. Finansal, operasyonel veya stratejik etkiyi ön plana çıkar. (max 85 karakter)
3. SUMMARY: Tek cümlelik, tıklamayı zorlayan bir "vurucu alt başlık". İçindeki en çarpıcı finansal veya stratejik bulguyu öne çek.
4. İÇERİK YAPISI (HTML formatında):
   - En üstte ZORUNLU: 3 maddelik TL;DR kutusu (hızlı tarama için):
     <div class="tldr-box">
       <ul>
         <li>En kritik finansal/operasyonel etki</li>
         <li>Sektörel risk veya fırsat</li>
         <li>Stratejik eylem önerisi veya projeksiyon</li>
       </ul>
     </div>
   - Ardından ZORUNLU 3 H2 bölümü (HEDEF DİLDE yazılacak — İngilizce için "Executive Summary", Türkçe için "Yönetici Özeti", vb.):
     [EXECUTIVE_SUMMARY_HEADING]: Olayın teknik ve stratejik çekirdek özeti. Hangi şirket ne kaybetti/kazandı? Rakamsal veri kullan.
     [MARKET_IMPACT_HEADING]: Bu gelişme sektörü, yatırımcıları ve rekabet dinamiklerini nasıl etkiler? Hangi şirket hisseleri etkilenir?
     [RISK_PROJECTION_HEADING]: Uzun vadeli tehditler veya fırsatlar. Kelebek etkileri ve stratejik çerçeve.

5. Kategori SADECE şunlardan BİRİ OLABİLİR:
- CYBERSECURITY (Renk: #ef4444)
- AI (Renk: #8b5cf6)
- HARDWARE (Renk: #f59e0b)
- DEFENSE (Renk: #10b981)

6. imagePrompt: Haberi temsil eden, beyaz arka planda minimalist kurumsal çizim için kısa bir İngilizce prompt yaz. Format: "flat design, white background, corporate minimalist, [konu]". Asla neon, cyberpunk, karanlık arka plan, robot görseli KULLANMA.
7. imagePrompt2: Haberin orta kısmında kullanılacak, konuyu detaylandıran veya bir nesneyi/mekanı vurgulayan ikinci bir görsel promptu. Format: "high resolution, professional photography, corporate office, [spesifik nesne/mekan]".

HEDEF DİLE GÖRE H2 BAŞLIKLARI:
- en: "Executive Summary" | "Market & Financial Impact" | "Sectoral Risks & Future Projection"
- tr: "Yönetici Özeti" | "Piyasa ve Finansal Etki" | "Sektörel Riskler ve Gelecek Projeksiyonu"
- de: "Zusammenfassung" | "Markt- und Finanzauswirkungen" | "Sektorrisiken und Zukunftsprognose"
- fr: "Résumé Exécutif" | "Impact Marché & Financier" | "Risques Sectoriels & Projection Future"
- es: "Resumen Ejecutivo" | "Impacto de Mercado y Financiero" | "Riesgos Sectoriales y Proyección Futura"
- it: "Sommario Esecutivo" | "Impatto di Mercato e Finanziario" | "Rischi Settoriali e Proiezione Futura"
- ru: "Краткое Резюме" | "Влияние на рынок и финансы" | "Отраслевые риски и прогноз"
- zh: "执行摘要" | "市场与财务影响" | "行业风险与未来预测"
- ar: "الملخص التنفيذي" | "التأثير على السوق والمالية" | "المخاطر القطاعية والتوقعات المستقبلية"
- ja: "エグゼクティブサマリー" | "市場・財務への影響" | "業界リスクと将来予測"

DÖNÜŞ FORMATI (Tamamen JSON olmalı, markdown backtick veya benzeri şeyler KULLANMA):
{
  "title": "Etki odaklı, analitik, kurumsal başlık (max 85 karakter)",
  "summary": "En çarpıcı finansal/stratejik bulguyu içeren 1-2 cümle",
  "content": "HTML formatında tldr-box + 3 H2 başlıklı premium analiz",
  "slug": "url-dostu-baslik",
  "category": "KATEGORİ_ADI",
  "categoryColor": "#renkkodu",
  "imagePrompt": "flat design, white background, corporate minimalist, [spesifik konu]",
  "imagePrompt2": "high resolution, professional photography, [spesifik konu]"
}
`;

export async function rewriteArticle(rawText: string, locale: string = 'en') {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nHEDEF DİL: ${locale}\n\nHAM METİN:\n${rawText}` }] }
        ],
        config: {
          responseMimeType: "application/json",
        }
    });
    
    const text = response.text || (response as any).response?.text?.();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error: any) {
    console.error("AI Error:", error);
    
    // Fallback Mock for development when quota is exceeded
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      console.warn("Gemini Quota Exceeded. Using Mock Fallback.");
      return {
        title: "MOCK: " + rawText.split('\n')[0].replace('Title: ', ''),
        summary: "AI Quota exceeded. This is a mock summary.",
        content: `<p>AI Quota exceeded. The original text was:</p><pre>${rawText}</pre>`,
        slug: "mock-article-" + Date.now(),
        category: "AI",
        categoryColor: "#8b5cf6",
        imagePrompt: "flat design, white background, corporate minimalist, artificial intelligence"
      };
    }
    return null;
  }
}

export async function translateArticleText(
  title: string,
  summary: string,
  content: string,
  targetLocale: string
): Promise<{ title: string; summary: string; content: string } | null> {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "REPLACE_WITH_YOUR_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or is the default placeholder, skipping translation");
      return null;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an expert technical translator. Your job is to translate a technology/AI news article into the target language.
Preserve the tone, the meaning, and all HTML tags (like <p>, <h2>, <b>, <i>, <a>, <code>, <strong>, <ul>, <li>) in the content.
Do NOT change the HTML structure, tags, or CSS classes. Just translate the text content inside the HTML elements.
Translate technical terms accurately (e.g., zero-day remains zero-day, or use standard translations in target language).

Target language: ${targetLocale}
If the target language is en-GB, use British English spelling and idioms (e.g., colour, organise).
If the target language is en-US, use American English spelling (e.g., color, organize).
If the target language is en-CA, use Canadian English spelling.
If the target language is zh, use Simplified Chinese unless specified otherwise.

Translate the following article:
Title: ${title}
Summary: ${summary}
Content: ${content}

Return the result as a JSON object matching this schema (do NOT include markdown formatting in the JSON output, return a raw JSON string):
{
  "title": "Translated Title",
  "summary": "Translated Summary",
  "content": "Translated HTML Content"
}`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || (response as any).response?.text?.();
    if (!text) return null;
    const parsed = JSON.parse(text);
    return {
      title: parsed.title || title,
      summary: parsed.summary || summary,
      content: parsed.content || content,
    };
  } catch (error: any) {
    console.error("AI Translation Error:", error);
    
    // Always return null on error so the DB does not permanently cache the untranslated text.
    if (error.message?.includes("quota") || error.message?.includes("429")) {
       console.warn("Gemini Quota Exceeded. Returning null so caller doesn't cache failure.");
    }
    return null;
  }
}

