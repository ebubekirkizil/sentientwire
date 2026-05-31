import { NextResponse } from 'next/server';
import { processArticle } from '@/app/actions/article';

export async function POST(request: Request) {
  try {
    const { text, apiKey, manualImageUrl } = await request.json();

    // Basic security check using the CRON_SECRET or a dedicated API_KEY from .env
    if (!apiKey || apiKey !== process.env.CRON_SECRET) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized: Invalid API Key' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!text || text.trim().length < 10) {
      return new NextResponse(JSON.stringify({ error: 'Payload too short' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`[EXTERNAL-API] Processing new request: ${text.substring(0, 50)}...`);
    
    const result = await processArticle(text, manualImageUrl);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Article published successfully across all languages.',
        articleId: result.id
      });
    } else {
      return new NextResponse(JSON.stringify({ error: result.error }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("External API Error:", error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
