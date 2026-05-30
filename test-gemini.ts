import { GoogleGenAI } from '@google/genai';

async function testGemini() {
  const apiKey = "AIzaSyDcoyhYxeir0dpgiJGRUCo2xudyy3-AA88";
  const ai = new GoogleGenAI({ apiKey });
  
  console.log("Testing Gemini API...");
  
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello, respond with "OK" if you work.' }] }]
    });
    console.log("Gemini Response:", result.text);
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    if (error.message.includes("quota") || error.message.includes("429")) {
      console.error("CONFIRMED: Gemini API quota exceeded.");
    }
  }
}

testGemini();
