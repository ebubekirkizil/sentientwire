import { NextResponse } from 'next/server';
import { runIngestion } from '@/lib/ingest';

export const maxDuration = 60; // Allow maximum execution time on Vercel Hobby

// This API route will be called by a cron job (e.g. Vercel Cron or GitHub Actions)
export async function GET(request: Request) {
  try {
    // Check for authorization header to prevent unauthorized triggers
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await runIngestion();

    return NextResponse.json({ message: "Ingestion completed successfully." });
  } catch (error) {
    console.error("Cron Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
