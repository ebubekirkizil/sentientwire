import { createClient } from "@libsql/client";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocalizedArticle } from "@/app/actions/article";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations('News');

  const article = await getLocalizedArticle(slug, locale);

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
            <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString(locale) : ''}</span>
            <span>•</span>
            <a href={article.originalUrl || "#"} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              Source Intel
            </a>
            {article.locale !== locale.substring(0, 2) && (
              <span className="ml-auto bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded text-[10px] font-mono animate-pulse">
                AI LIVE TRANSLATED
              </span>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:font-light max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
