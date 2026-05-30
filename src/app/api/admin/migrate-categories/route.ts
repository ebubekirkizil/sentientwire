import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await db.execute({ sql: "UPDATE Article SET category = 'HARDWARE' WHERE category = 'QUANTUM'", args: [] });
    await db.execute({ sql: "UPDATE Article SET category = 'DEFENSE' WHERE category = 'SPACE'", args: [] });
    
    return NextResponse.json({ success: true, message: "Categories migrated successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
