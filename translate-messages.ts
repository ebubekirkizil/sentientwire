import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const enPath = path.join(process.cwd(), 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const locales = ['ru', 'zh', 'en-GB', 'en-US', 'en-CA', 'fr', 'es', 'de', 'it', 'nl', 'pl'];

async function run() {
  for (const locale of locales) {
    if (locale.startsWith('en-')) continue; // English dialects can just copy en.json
    
    console.log(`Translating UI for ${locale}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          { role: 'user', parts: [{ text: `Translate the following JSON UI strings to ${locale}. Keep the exact same JSON structure and keys, only translate the values. Do not use markdown backticks, return raw JSON string.\n\n${JSON.stringify(enData, null, 2)}` }] }
        ],
        config: {
          responseMimeType: "application/json",
        }
      });
      const text = response.text || (response as any).response?.text?.();
      if (text) {
        fs.writeFileSync(path.join(process.cwd(), 'messages', `${locale}.json`), text, 'utf8');
        console.log(`✅ Saved ${locale}.json`);
      }
    } catch (e) {
      console.error(`Failed ${locale}:`, e);
    }
  }
}

run();
