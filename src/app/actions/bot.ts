"use server";

import { db } from "@/lib/db";
import { getBotSettings, generateTweet } from "@/lib/botService";
import { revalidatePath } from "next/cache";

export async function triggerTweetManual(articleId: string) {
  try {
    // 1. Get article
    const rs = await db.execute({
      sql: "SELECT * FROM Article WHERE id = ?",
      args: [articleId]
    });

    if (rs.rows.length === 0) {
      return { success: false, error: "Article not found" };
    }

    const article = rs.rows[0];

    // 2. Get settings
    const settings = await getBotSettings();

    // 3. Generate Tweet
    const tweetText = await generateTweet(
      article.title as string,
      (article.summary || article.excerpt) as string,
      settings.persona,
      settings.openaiKey
    );

    // Always use 'en' locale for the canonical news URL in tweets
    // (page redirects non-admins to X anyway, bots read the metadata)
    const finalTweet = `${tweetText}\n\n👇 Click the link for full news details:\n🔗 https://sentientwire.com/en/news/${article.id}`;


    // Update DB
    await db.execute({
      sql: "UPDATE Article SET xPosted = 1 WHERE id = ?",
      args: [articleId]
    });

    try {
      revalidatePath(`/${article.locale}/admin`);
    } catch (e) {
      console.warn("revalidatePath warning ignored inside server action:", e);
    }
    return { success: true, tweet: finalTweet };
  } catch (error: any) {
    console.error("Manual Tweet Error:", error);
    return { success: false, error: error.message };
  }
}
