import { prisma } from "./prisma";

// Mock implementation of OpenAI and Twitter APIs for when keys are missing.
// In a production app, you would use `openai` and `twitter-api-v2` npm packages.

export async function generateTweet(title: string, summary: string, persona: string, apiKey: string) {
  if (!apiKey) {
    // Simulation / Fallback
    console.log(`[BOT-SIMULATION] Using fallback tweet generation. Persona: ${persona}`);
    let prefix = "🚨 BREAKING: ";
    if (persona === "analytical") prefix = "📊 ANALYSIS: ";
    if (persona === "provocative") prefix = "🔥 DEBATE: ";
    
    return `${prefix}${title}\n\n${summary.substring(0, 100)}...\n\nWhat are your thoughts on this? Read more below👇`;
  }

  // Real implementation using fetch to OpenAI API
  try {
    let systemPrompt = "You are a professional social media manager.";
    if (persona === "provocative") systemPrompt = "You are a provocative, debate-starting tech commentator.";
    if (persona === "analytical") systemPrompt = "You are a highly analytical, neutral intelligence operative.";
    if (persona === "urgent") systemPrompt = "You are an urgent, alarmist breaking news reporter.";

    const prompt = `Write a short (max 250 chars) tweet for this article.\nTitle: ${title}\nSummary: ${summary}\nInclude a hook at the end to encourage clicks.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating tweet:", error);
    return `🚨 ${title}\n\n${summary.substring(0, 100)}...\n\nRead more below👇`;
  }
}

export async function postToX(tweetContent: string, articleSlug: string, apiKey: string) {
  const finalTweet = `${tweetContent}\n\n🔗 http://localhost:3000/en/news/${articleSlug}`;

  if (!apiKey) {
    // Simulation
    console.log("\n=========================================");
    console.log("[X-BOT SIMULATION] TWEET PUBLISHED:");
    console.log(finalTweet);
    console.log("=========================================\n");
    return true;
  }

  // Real X (Twitter) API v2 implementation
  try {
    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        text: finalTweet
      })
    });

    if (!response.ok) {
      console.error("Failed to post to X:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error posting to X:", error);
    return false;
  }
}

export async function getBotSettings() {
  const settings = await prisma.siteSettings.findMany();
  const config = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    openaiKey: config.openai_api_key || "",
    xKey: config.x_api_key || "",
    persona: config.bot_persona || "analytical",
    frequencyHours: parseInt(config.bot_frequency_hours || "1", 10)
  };
}
