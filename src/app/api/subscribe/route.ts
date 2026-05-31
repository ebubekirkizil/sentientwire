import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, locale } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const id = uuidv4();
    const userLocale = locale || 'en-US';

    await db.execute({
      sql: `INSERT INTO Subscriber (id, email, locale) VALUES (?, ?, ?)`,
      args: [id, email.toLowerCase().trim(), userLocale]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // If it's a unique constraint error (they already subscribed), just return success anyway
    if (error.message && error.message.includes('UNIQUE')) {
      return NextResponse.json({ success: true });
    }
    console.error("Subscription error:", error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
