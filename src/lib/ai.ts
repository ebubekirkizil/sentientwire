import { GoogleGenAI } from '@google/genai';

// Requires GEMINI_API_KEY in .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

const SYSTEM_PROMPT = `
Sen David Ogilvy ve Joe Sugarman ekolünden gelen, "Curiosity Gap" ve "Slippery Slide" tekniklerini kullanan elit bir teknoloji editörüsün.
Sana ham bir teknoloji/yapay zeka gelişmesi verilecek.
Görevin bu haberi LÜKS, PROFESYONEL ve İLGİ ÇEKİCİ bir İngilizce makaleye dönüştürmek.
Başlıklar okuyucuyu tıklamaya mecbur hissettirmeli.
Metin ritmik olmalı.

Ayrıca haberin içeriğine göre şu kategorilerden en uygun olanını seçmelisin:
- CYBERSECURITY (Renk: #ef4444)
- ARTIFICIAL INTELLIGENCE (Renk: #8b5cf6)
- QUANTUM (Renk: #818cf8)
- HARDWARE (Renk: #f59e0b)
- DEFENSE (Renk: #10b981)

DÖNÜŞ FORMATI (Tamamen JSON olmalı, markdown kullanma):
{
  "title": "Başlık",
  "summary": "1-2 cümlelik vurucu alt başlık",
  "content": "HTML formatında ana metin (<b>, <i>, <p>, <h2> etiketleri kullan, çok şık olsun)",
  "slug": "url-dostu-baslik",
  "category": "Kategori İsmi (Tamamı büyük harflerle)",
  "categoryColor": "Kategori Renk Kodu"
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

