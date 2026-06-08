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

SEO VE GOOGLE NEWS KURALLARI (KRİTİK - HELPFUL CONTENT):
- Haberi "Helpful Content" kriterlerine uygun, orijinal bir istihbarat analizi olarak yaz. Basit özet geçme.
- Kullanıcıya "Ne oldu?" sorusunun yanında asıl "Bunun Anlamı Ne? Ne Değişecek?" sorularının cevabını ver.
- Başlıkta ve ilk paragrafta anahtar kelimeleri (şirket isimleri, teknoloji terimleri) doğal ama vurgulu kullan.
- "Clickbait"ten kaçın, otoriter ve güvenilir bir tonla yaz (E-E-A-T prensibi).

DİKKAT EDİLECEK KURALLAR:
1. Kurumsal, net, somut veri odaklı ama UZUN ve SÜRÜKLEYİCİ (Wall Street Journal / Bloomberg Terminal kalitesinde) bir analiz dili kullan. Haberi en az 600-800 kelime aralığında, bol detaylı yaz.
2. BAŞLIK FORMATI ("KANCA" TAKTİĞİ): Kullanıcının dikkatini hemen çekecek, tıklamadan edemeyeceği "Kanca" tarzında çok vurucu bir başlık yaz. Klasik başlıkları unut! (Örn: "Apple'ın Yeni Çipi Neden Bilgisayarınızı Çöpe Atmanıza Neden Olabilir?"). Soru veya şok edici bir zıtlık içersin. (max 95 karakter).
3. SUMMARY: Tek cümlelik, tıklamayı kesinlikle zorlayan bir "vurucu alt başlık".
4. İÇERİK YAPISI (HTML formatında ve ÇOK DETAYLI):
   - En üstte ZORUNLU: 3 maddelik TL;DR kutusu (hızlı tarama için):
     <div class="tldr-box">
       <ul>
         <li>En kritik etki</li>
         <li>Şok edici detay</li>
         <li>Gelecek beklentisi</li>
       </ul>
     </div>
   - Ardından ZORUNLU 4 H2 bölümü (HEDEF DİLDE yazılacak) ve HER BÖLÜMÜN ALTINDA UZUN PARAGRAFLAR (en az 2-3 uzun paragraf):
     [EXECUTIVE_SUMMARY_HEADING]: Olayın teknik ve strategik çekirdek özeti.
     [CRISIS_ORIGIN_HEADING]: Gelişmenin perde arkası, bilinmeyen gerçekler, krizin veya olayın temeli. Detaylara gir.
     [OPERATIONAL_IMPACT_HEADING]: Etkisi ne olacak? Sistemler, paralar, iş akışları nasıl değişecek? Analiz et.
     [STRATEGIC_TAKEAWAY_HEADING]: Stratejik Çıkarım (So What?). Gelecek 5 yılda dünyayı ne bekliyor?
     - Bütün makale baştan sona <p>, <strong>, <ul> gibi zengin HTML etiketleriyle biçimlendirilsin. Paragrafları uzun tut.

5. Kategori SADECE şunlardan BİRİ OLABİLİR:
- CYBERSECURITY (Renk: #ef4444)
- AI (Renk: #8b5cf6)
- HARDWARE (Renk: #f59e0b)
- DEFENSE (Renk: #10b981)

6. imagePrompt: Haberi temsil eden, beyaz arka planda minimalist kurumsal çizim için kısa bir İngilizce prompt yaz. Format: "flat design, white background, corporate minimalist, [konu]". Asla neon, cyberpunk, karanlık arka plan, robot görseli KULLANMA.
7. imagePrompt2: Haberin orta kısmında kullanılacak, konuyu detaylandıran veya bir nesneyi/mekanı vurgulayan ikinci bir görsel promptu. Format: "high resolution, professional photography, corporate office, [spesifik nesne/mekan]".

HEDEF DİLE GÖRE H2 BAŞLIKLARI:
- en: "Executive Summary" | "Origin of the Development" | "Operational Impact" | "Strategic Takeaway"
- tr: "Yönetici Özeti" | "Krizin/Gelişmenin Kaynağı" | "Operasyonel Etki" | "Stratejik Çıkarım"
- de: "Zusammenfassung" | "Ursprung der Entwicklung" | "Operationelle Auswirkungen" | "Strategische Erkenntnisse"
- fr: "Résumé Exécutif" | "Origine du Développement" | "Impact Opérationnel" | "Conclusion Stratégique"
- es: "Resumen Ejecutivo" | "Origen del Desarrollo" | "Impacto Operativo" | "Conclusión Estratégica"
- it: "Sommario Esecutivo" | "Origine dello Sviluppo" | "Impatto Operativo" | "Implicazione Strategica"
- ru: "Краткое Резюме" | "Истоки развития" | "Операционное влияние" | "Стратегический вывод"
- zh: "执行摘要" | "事件渊源" | "运营影响" | "战略启示"
- ar: "الملخص التنفيذي" | "أصل التطور" | "التأثير التشغيلي" | "الاستنتاج الاستراتيجي"
- ja: "エグゼクティブサマリー" | "展開の起源" | "運用上の影響" | "戦略的示唆"

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
      console.warn("Gemini Quota Exceeded. Returning null.");
      return null;
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

