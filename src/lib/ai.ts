import { GoogleGenAI } from '@google/genai';

// Requires GEMINI_API_KEY in .env
const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `
Sen David Ogilvy ve Joe Sugarman ekolünden gelen, "Curiosity Gap" ve "Slippery Slide" tekniklerini kullanan elit bir teknoloji editörüsün.
Sana ham bir teknoloji/yapay zeka gelişmesi verilecek.
Görevin bu haberi LÜKS, PROFESYONEL ve İLGİ ÇEKİCİ bir İngilizce makaleye dönüştürmek.
Başlıklar okuyucuyu tıklamaya mecbur hissettirmeli.
Metin ritmik olmalı.

DÖNÜŞ FORMATI (Tamamen JSON olmalı, markdown kullanma):
{
  "title": "Başlık",
  "summary": "1-2 cümlelik vurucu alt başlık",
  "content": "HTML formatında ana metin (<b>, <i>, <p>, <h2> etiketleri kullan, çok şık olsun)",
  "slug": "url-dostu-baslik"
}
`;

export async function rewriteArticle(rawText: string, locale: string = 'en') {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${SYSTEM_PROMPT}\n\nHEDEF DİL: ${locale}\n\nHAM METİN:\n${rawText}`,
        config: {
          responseMimeType: "application/json",
        }
    });
    
    if (!response.text) return null;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
}
