import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Bu modül, next-intl ile çevrilemeyen veya veritabanından gelen 
 * dinamik içerikleri (haber metni, yorumlar vb.) anlık olarak çevirmek için kullanılır.
 */
export async function translateContent(text: string, targetLocale: string) {
  if (!text || !targetLocale) return text;
  if (targetLocale === 'en') return text; // Varsayılan dil en ise

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { 
          role: 'user', 
          parts: [{ 
            text: `You are an expert translator for SentientWire, a deep-tech intelligence platform.
Translate the following text into ${targetLocale}.
Maintain the professional and analytical tone.
Keep any HTML tags exactly as they are.
Return ONLY the translated text.

TEXT:
${text}` 
          }] 
        }
      ]
    });
    
    const translatedText = response.text || (response as any).response?.text?.();
    return translatedText ? translatedText.trim() : text;
  } catch (error) {
    console.error("AI Translation Error:", error);
    return text; // Hata durumunda orijinal metni döndür
  }
}
