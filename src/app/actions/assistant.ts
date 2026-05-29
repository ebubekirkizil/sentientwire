"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key_for_build" });

export interface AssistantMessage {
  role: "user" | "model";
  text: string;
}

export interface AnalysisResult {
  seoScore: number;
  retentionScore: number;
  seoFeedback: string;
  retentionFeedback: string;
  suggestedKeywords: string[];
  suggestedTitles: string[];
  suggestedSummary: string;
}

const SYSTEM_PROMPT_ANALYZE = `
You are the "Sentient Wire Live AI Co-Editor", an elite technical editor, SEO/SEM expert, and user retention specialist.
Analyze the provided technology/AI intelligence report draft.

Return a raw JSON object conforming exactly to this schema (do NOT wrap it in markdown block like \`\`\`json):
{
  "seoScore": (number from 0 to 100),
  "retentionScore": (number from 0 to 100),
  "seoFeedback": "Detailed suggestions for improving Google search optimization (heading hierarchy, keyword density, metadata). Formatted as bulleted Markdown.",
  "retentionFeedback": "Detailed suggestions for keeping readers on the page longer (Curiosity Gap, Slippery Slide, bold text, introductory hook). Formatted as bulleted Markdown.",
  "suggestedKeywords": ["3-5 Unsplash search keywords matching the article content (e.g. 'cybersecurity server', 'quantum hardware', 'drones swarm')"],
  "suggestedTitles": ["3 click-worthy, premium alternative headlines using Curiosity Gap"],
  "suggestedSummary": "A highly engaging alternative summary for home page cards"
}
`;

export async function analyzeArticle(
  title: string,
  summary: string,
  content: string
): Promise<AnalysisResult | null> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "REPLACE_WITH_YOUR_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY not configured, skipping AI analysis");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `${SYSTEM_PROMPT_ANALYZE}\n\nARTICLE DRAFT:\nTitle: ${title}\nSummary: ${summary}\nContent: ${content}`
          }]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || (response as any).response?.text?.();
    if (!text) return null;
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}

const SYSTEM_PROMPT_CHAT = `
You are the "Sentient Wire Live AI Co-Editor", a living artificial intelligence helper embedded inside the editor's dashboard.
You help the editor write, refine, research, and format technology news articles.

Context of the article currently being edited:
{ARTICLE_CONTEXT}

Guide the editor, write high-quality technical paragraphs, suggest headers, refine headings, or suggest Unsplash search keywords.
Maintain a helpful, highly professional, technical, and dark-cyberpunk tone. Speak in Turkish (or matching user's language). Keep answers short and actionable.
`;

export async function chatWithAssistant(
  message: string,
  history: AssistantMessage[],
  articleContext?: { title: string; summary: string; content: string }
): Promise<AssistantMessage | null> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "REPLACE_WITH_YOUR_GEMINI_API_KEY") {
    return { role: "model", text: "GEMINI_API_KEY is not configured. Assistant cannot reply." };
  }

  try {
    const articleStr = articleContext 
      ? `Title: ${articleContext.title}\nSummary: ${articleContext.summary}\nContent: ${articleContext.content}`
      : "No article draft provided yet.";

    const systemInstruction = SYSTEM_PROMPT_CHAT.replace("{ARTICLE_CONTEXT}", articleStr);

    const contents = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents as any,
      config: {
        systemInstruction: systemInstruction
      }
    });

    const text = response.text || (response as any).response?.text?.();
    if (!text) return null;

    return {
      role: "model",
      text: text.trim()
    };
  } catch (error) {
    console.error("AI Assistant Chat Error:", error);
    return {
      role: "model",
      text: "Error communicating with AI assistant. Please try again."
    };
  }
}
