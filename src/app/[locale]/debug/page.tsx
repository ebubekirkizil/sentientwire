import React from "react";
import { getArticlesByLocale } from "@/app/actions/article";

export default async function DebugPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const articles = await getArticlesByLocale(locale);

  return (
    <div style={{ padding: "100px 50px", color: "white", background: "#000" }}>
      <h1>Debug: {locale}</h1>
      <p>Articles found: {articles.length}</p>
      <pre style={{ background: "#222", padding: "20px" }}>
        {JSON.stringify(articles, null, 2)}
      </pre>
    </div>
  );
}
