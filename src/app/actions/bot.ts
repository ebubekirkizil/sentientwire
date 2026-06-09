"use server";

import { db } from "@/lib/db";
import { getBotSettings, generateTweet, postToX } from "@/lib/botService";
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

    // 4. Post to X
    const success = await postToX(
      tweetText,
      article.slug as string,
      settings.xKey,
      settings.xSecret,
      settings.xAccessToken,
      settings.xAccessSecret,
      article.imageUrl ? String(article.imageUrl) : undefined
    );

    if (success) {
      // 5. Update DB
      await db.execute({
        sql: "UPDATE Article SET xPosted = 1 WHERE id = ?",
        args: [articleId]
      });

      revalidatePath(`/${article.locale}/admin`);
      return { success: true, tweet: tweetText };
    } else {
      return { success: false, error: "Failed to post to X. Check logs." };
    }
  } catch (error: any) {
    console.error("Manual Tweet Error:", error);
    return { success: false, error: error.message };
  }
}
