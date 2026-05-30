import { GoogleGenAI } from '@google/genai';

// Requires GEMINI_API_KEY in .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

const SYSTEM_PROMPT = `
Sen "Heritage Modernism" ekolünü benimseyen, küresel teknoloji yöneticilerine (CEO, CTO) ve borsa/finans analistlerine özel elit istihbarat raporları hazırlayan kıdemli bir analistsin.
Sana ham bir teknoloji/yapay zeka haberi verilecek.
Görevin bu sıradan haberi basitçe "tekrarlamak" DEĞİL; bu gelişmenin iş dünyasına, hisselere ve sektöre etkisini anlatan "Premium bir İstihbarat Raporu"na dönüştürmektir.

DİKKAT EDİLECEK KURALLAR:
1. Kurumsal, net, somut veri odaklı ve son derece prestijli (Wall Street Journal / Bloomberg Terminal kalitesinde) bir dil kullan.
2. Metni HTML olarak oluştur ve ZORUNLU OLARAK şu 3 ana H2 başlığı etrafında kurgula:
   <h2>Executive Summary</h2>
   <p>Olayın teknik ve stratejik çekirdek özeti.</p>
   <h2>Market & Financial Impact</h2>
   <p>Bu gelişme sektörü, yatırımcıları ve rekabet dinamiklerini nasıl etkiler?</p>
   <h2>Sectoral Risks & Future Projection</h2>
   <p>Uzun vadeli tehditler veya fırsatlar neler? Stratejik kelebek etkileri neler olabilir?</p>

3. Kategori SADECE şunlardan BİRİ OLABİLİR:
- CYBERSECURITY (Renk: #ef4444)
- AI (Renk: #8b5cf6)
- HARDWARE (Renk: #f59e0b)
- DEFENSE (Renk: #10b981)

DÖNÜŞ FORMATI (Tamamen JSON olmalı, markdown backtick veya benzeri şeyler KULLANMA):
{
  "title": "Analitik, Kurumsal ve İlgi Uyandıran Bir İstihbarat Başlığı (max 75 karakter)",
  "summary": "Raporun ana fikrini veren 1-2 cümlelik vurucu alt başlık",
  "content": "HTML formatında yukarıdaki 3 H2 başlığını içeren premium analiz metni",
  "slug": "url-dostu-baslik",
  "category": "Kategori İsmi (Tamamı büyük harflerle)",
  "categoryColor": "Renk Kodu"
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
        category: "GENERAL",
        categoryColor: "#06b6d4"
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

