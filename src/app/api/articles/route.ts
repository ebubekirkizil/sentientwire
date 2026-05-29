import { NextResponse } from "next/server";
import { getArticlesByLocale } from "@/app/actions/article";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    
    const articles = await getArticlesByLocale(locale);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
