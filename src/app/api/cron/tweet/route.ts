import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBotSettings, generateTweet, postToX } from "@/lib/botService";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {

  try {
    // 1. Get settings
    const settings = await getBotSettings();
    
    // In a real application, you would check a secure cron secret here
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    // 2. Find the oldest published article that hasn't been posted to X yet
    const rs = await db.execute(`
      SELECT * FROM Article 
      WHERE isPublished = 1 AND xPosted = 0 
      ORDER BY createdAt ASC 
      LIMIT 1
    `);

    if (rs.rows.length === 0) {
      return NextResponse.json({ message: "No unposted articles found in the databank." });
    }

    const articleToPost = rs.rows[0];

    console.log(`[CRON] Found article to post: ${articleToPost.title}`);

    // 3. Generate Tweet via AI
    const tweetText = await generateTweet(
      articleToPost.title as string, 
      (articleToPost.summary || articleToPost.excerpt) as string, 
      settings.persona, 
      settings.openaiKey
    );

    // 4. Post to X
    const success = await postToX(tweetText, articleToPost.slug as string, settings.xKey);

    if (success) {
      // 5. Update Database
      await db.execute({
        sql: `UPDATE Article SET xPosted = 1 WHERE id = ?`,
        args: [articleToPost.id]
      });

      return NextResponse.json({ 
        success: true, 
        message: "Successfully posted to X.",
        article: articleToPost.title
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to post to X." 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[CRON ERROR]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
