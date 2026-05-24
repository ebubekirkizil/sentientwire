import { createClient } from "@libsql/client";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations('News');

  const result = await db.execute({
    sql: "SELECT * FROM Article WHERE slug = ?",
    args: [slug]
  });

  const article = result.rows[0] as any;

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 text-sm font-medium tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('returnToBase')}
        </Link>

        <header className="mb-16">
          <div className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            Intelligence Report
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-muted font-light leading-relaxed">
            {article.summary}
          </p>
          <div className="mt-8 text-sm text-muted/60 border-t border-muted/20 pt-4 flex items-center gap-4">
            <span>{new Date(article.createdAt).toLocaleDateString(locale)}</span>
            <span>•</span>
            <a href={article.originalUrl || "#"} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              Source Intel
            </a>
          </div>
        </header>

        {/* Article Body. 
            We use a typography class to style the HTML injected by the AI 
            (since AI returns rich HTML structure as requested in our prompt)
        */}
        <div
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:font-light max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
