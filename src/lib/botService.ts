import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/db";

export async function generateTweet(title: string, summary: string, persona: string, apiKey: string) {
  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  
  if (!geminiKey || geminiKey === "REPLACE_WITH_YOUR_GEMINI_API_KEY") {
    // Simulation / Fallback
    console.log(`[BOT-SIMULATION] Using fallback tweet generation. Persona: ${persona}`);
    let prefix = "🚨 BREAKING: ";
    if (persona === "analytical") prefix = "📊 ANALYSIS: ";
    if (persona === "provocative") prefix = "🔥 DEBATE: ";
    
    return `${prefix}${title}\n\n${summary.substring(0, 100)}...\n\nWhat are your thoughts on this? Read more below👇`;
  }

  // Real implementation using Google Gemini
  try {
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    
    let systemPrompt = "You are a professional intelligence analyst for SentientWire. You MUST write all tweets in English ONLY. Write in a highly authoritative, direct, and factual OSINT briefing style. Start with a bracket like [REPORT] or [ANALYSIS].";
    if (persona === "provocative") systemPrompt = "You are a provocative tech and defense commentator for SentientWire. You MUST write all tweets in English ONLY. Present strategic global implications and start debates. Start with [PERSPECTIVE] or [DEBATE].";
    if (persona === "analytical") systemPrompt = "You are a neutral OSINT intelligence operative for SentientWire. You MUST write all tweets in English ONLY. Focus on data, technology, and strategic impact. Start with [INTEL] or [MONITOR].";
    if (persona === "urgent") systemPrompt = "You are an urgent breaking news desk reporter for SentientWire. You MUST write all tweets in English ONLY. Use a direct, fast-paced news agency tone. Start with [BREAKING] or [ALERT].";

    const prompt = `${systemPrompt}\n\nWrite a concise tweet (max 220 characters to allow link spacing) for this article in English ONLY. Avoid clickbait cliches; focus on factual impact. Do not repeat the title exactly.\nTitle: ${title}\nSummary: ${summary}\nYou can include up to 2 highly relevant hashtags at the end if appropriate (e.g. #Defense, #AI).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = response.text || (response as any).response?.text?.();
    return text ? text.trim() : `🚨 ${title}\n\n${summary.substring(0, 100)}...\n\nRead more below👇`;
  } catch (error) {
    console.error("Error generating tweet:", error);
    return `🚨 ${title}\n\n${summary.substring(0, 100)}...\n\nRead more below👇`;
  }
}

import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

async function getImageBuffer(imagePathOrUrl: string): Promise<Buffer | null> {
  try {
    if (imagePathOrUrl.startsWith('http')) {
      const res = await fetch(imagePathOrUrl);
      if (!res.ok) return null;
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } else {
      // Local path (like /images/fcas_cancelled_cover_new.png)
      // Normalize path (strip query parameters like ?v=...)
      const cleanPath = imagePathOrUrl.split('?')[0];
      // Resolve against the public directory
      const absolutePath = path.join(process.cwd(), 'public', cleanPath.replace(/^\//, ''));
      if (fs.existsSync(absolutePath)) {
        return fs.readFileSync(absolutePath);
      }
    }
  } catch (err) {
    console.error("Error reading image buffer:", err);
  }
  return null;
}

export async function postToX(
  tweetContent: string, 
  articleSlug: string, 
  apiKey: string, 
  apiSecret?: string, 
  accessToken?: string, 
  accessSecret?: string,
  imagePathOrUrl?: string
) {
  const finalTweet = `${tweetContent}\n\n👇 Click the link for full news details:\n🔗 https://sentientwire.com/en/news/${articleSlug}`;

  if (!apiKey) {
    // Simulation
    console.log("\n=========================================");
    console.log("[X-BOT SIMULATION] TWEET PUBLISHED:");
    console.log(finalTweet);
    if (imagePathOrUrl) {
      console.log(`[X-BOT SIMULATION] ATTACHED IMAGE: ${imagePathOrUrl}`);
    }
    console.log("=========================================\n");
    return true;
  }

  try {
    let client;
    
    // Check if we have OAuth 1.0a credentials (4 parts) or just a Bearer Token (1 part)
    if (apiKey && apiSecret && accessToken && accessSecret) {
      client = new TwitterApi({
        appKey: apiKey,
        appSecret: apiSecret,
        accessToken: accessToken,
        accessSecret: accessSecret,
      });
    } else {
      // Fallback to Bearer token
      client = new TwitterApi(apiKey);
    }

    let mediaId: string | undefined;
    if (imagePathOrUrl && apiKey && apiSecret && accessToken && accessSecret) {
      const buffer = await getImageBuffer(imagePathOrUrl);
      if (buffer) {
        console.log(`[X-BOT] Uploading media to X (size: ${buffer.length} bytes)...`);
        mediaId = await client.v1.uploadMedia(buffer, { mimeType: 'image/png' });
        console.log(`[X-BOT] Media uploaded successfully. ID: ${mediaId}`);
      }
    }

    const rwClient = client.readWrite;
    if (mediaId) {
      await rwClient.v2.tweet({
        text: finalTweet,
        media: { media_ids: [mediaId] }
      });
    } else {
      await rwClient.v2.tweet(finalTweet);
    }
    
    return true;
  } catch (error) {
    console.error("Error posting to X:", error);
    return false;
  }
}


export async function postToTelegram(title: string, summary: string, slug: string, botToken?: string, chatId?: string) {
  const message = `🚨 *${title}*\n\n${summary}\n\n🔗 [Read Intel Report](https://sentientwire.com/tr/news/${slug})`;
  
  if (!botToken || !chatId) {
    console.log("\n=========================================");
    console.log("[TELEGRAM-BOT SIMULATION] MESSAGE BROADCASTED:");
    console.log(message);
    console.log("=========================================\n");
    return true;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      console.error("Failed to post to Telegram:", await response.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error posting to Telegram:", err);
    return false;
  }
}

export async function getBotSettings() {
  try {
    const rs = await db.execute("SELECT * FROM SiteSettings");
    const config: Record<string, string> = {};
    rs.rows.forEach((row) => {
      if (row.key && typeof row.value === 'string') {
        config[row.key as string] = row.value;
      }
    });

    return {
      openaiKey: config.openai_api_key || "",
      xKey: config.x_api_key || "",
      xSecret: config.x_api_secret || "",
      xAccessToken: config.x_access_token || "",
      xAccessSecret: config.x_access_secret || "",
      persona: config.bot_persona || "analytical",
      frequencyHours: parseInt(config.bot_frequency_hours || "1", 10)
    };
  } catch (error) {
    console.error("Failed to fetch bot settings:", error);
    return {
      openaiKey: "",
      xKey: "",
      xSecret: "",
      xAccessToken: "",
      xAccessSecret: "",
      persona: "analytical",
      frequencyHours: 1
    };
  }
}
