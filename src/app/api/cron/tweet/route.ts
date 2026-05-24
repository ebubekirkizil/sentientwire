import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBotSettings, generateTweet, postToX } from "@/lib/botService";

// Prevent caching of this cron endpoint
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
    const articleToPost = await prisma.article.findFirst({
      where: {
        isPublished: true,
        xPosted: false,
      },
      orderBy: {
        createdAt: 'asc' // Post older articles first
      }
    });

    if (!articleToPost) {
      return NextResponse.json({ message: "No unposted articles found in the databank." });
    }

    console.log(`[CRON] Found article to post: ${articleToPost.title}`);

    // 3. Generate Tweet via AI
    const tweetText = await generateTweet(
      articleToPost.title, 
      articleToPost.summary, 
      settings.persona, 
      settings.openaiKey
    );

    // 4. Post to X
    const success = await postToX(tweetText, articleToPost.slug, settings.xKey);

    if (success) {
      // 5. Update Database
      await prisma.article.update({
        where: { id: articleToPost.id },
        data: { xPosted: true }
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
