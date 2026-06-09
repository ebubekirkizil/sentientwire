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
    
    let systemPrompt = "You are a professional social media manager named SentientWire. You MUST write all tweets in English ONLY, regardless of the input language.";
    if (persona === "provocative") systemPrompt = "You are a provocative, debate-starting tech commentator named SentientWire. You MUST write all tweets in English ONLY, regardless of the input language.";
    if (persona === "analytical") systemPrompt = "You are a highly analytical, neutral intelligence operative named SentientWire. You MUST write all tweets in English ONLY, regardless of the input language.";
    if (persona === "urgent") systemPrompt = "You are an urgent, alarmist breaking news reporter named SentientWire. You MUST write all tweets in English ONLY, regardless of the input language.";

    const prompt = `${systemPrompt}\n\nWrite a short (max 250 chars) tweet for this article in ENGLISH ONLY.\nTitle: ${title}\nSummary: ${summary}\nInclude a hook at the end to encourage clicks. DO NOT use hashtags.`;

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
  const finalTweet = `${tweetContent}\n\n🔗 https://sentientwire.com/en/news/${articleSlug}`;

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
