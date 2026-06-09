import React from 'react';
import { getLocalizedArticle, getArticlesByLocale } from '@/app/actions/article';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Force fresh data on every request — no CDN caching of article HTML
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

const PRODUCTION_DOMAIN = 'https://sentientwire.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getLocalizedArticle(resolvedParams.id, resolvedParams.locale);
  
  if (!article) {
    return {
      title: "Article Not Found — SentientWire",
    };
  }

  const articleUrl = `${PRODUCTION_DOMAIN}/${resolvedParams.locale}/news/${article.slug || article.id}`;

  return {
    title: `${article.title} — SentientWire`,
    description: article.summary || "",
    robots: "index, follow",
    alternates: {
      canonical: articleUrl,
      languages: {
        'x-default': `${PRODUCTION_DOMAIN}/en-US/news/${article.slug || article.id}`,
        'en': `${PRODUCTION_DOMAIN}/en/news/${article.slug || article.id}`,
        'en-US': `${PRODUCTION_DOMAIN}/en-US/news/${article.slug || article.id}`,
        'en-GB': `${PRODUCTION_DOMAIN}/en-GB/news/${article.slug || article.id}`,
        'tr': `${PRODUCTION_DOMAIN}/tr/news/${article.slug || article.id}`,
        'de': `${PRODUCTION_DOMAIN}/de/news/${article.slug || article.id}`,
        'es': `${PRODUCTION_DOMAIN}/es/news/${article.slug || article.id}`,
        'fr': `${PRODUCTION_DOMAIN}/fr/news/${article.slug || article.id}`,
        'it': `${PRODUCTION_DOMAIN}/it/news/${article.slug || article.id}`,
        'ru': `${PRODUCTION_DOMAIN}/ru/news/${article.slug || article.id}`,
        'zh': `${PRODUCTION_DOMAIN}/zh/news/${article.slug || article.id}`,
        'pl': `${PRODUCTION_DOMAIN}/pl/news/${article.slug || article.id}`,
        'nl': `${PRODUCTION_DOMAIN}/nl/news/${article.slug || article.id}`,
      }
    },
    openGraph: {
      title: article.title,
      description: article.summary || "",
      url: articleUrl,
      type: "article",
      images: article.imageUrl 
        ? [{ url: article.imageUrl.startsWith('http') ? article.imageUrl : `${PRODUCTION_DOMAIN}${article.imageUrl}`, alt: article.title }] 
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary || "",
      images: article.imageUrl 
        ? [article.imageUrl.startsWith('http') ? article.imageUrl : `${PRODUCTION_DOMAIN}${article.imageUrl}`] 
        : [],
    }
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getLocalizedArticle(resolvedParams.id, resolvedParams.locale);

  if (!article) {
    notFound();
  }
  
  // Fetch related articles (latest 3 excluding current)
  const allArticles = await getArticlesByLocale(resolvedParams.locale);
  const relatedArticles = allArticles.filter(a => a && a.id !== article.id).slice(0, 3);

  // JSON-LD NewsArticle structured data for Google News, Highlights, and Discover compatibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary || "",
    "image": article.imageUrl ? [article.imageUrl] : [`${PRODUCTION_DOMAIN}/fallback-news.jpg`],
    "datePublished": article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
    "dateModified": article.updatedAt ? new Date(article.updatedAt).toISOString() : (article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString()),
    "author": [
      {
        "@type": "Organization",
        "name": "Sentient Wire",
        "url": PRODUCTION_DOMAIN
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Sentient Wire",
      "logo": {
        "@type": "ImageObject",
        "url": `${PRODUCTION_DOMAIN}/logo.png`
      }
    },
    "mainEntityOfPage": `${PRODUCTION_DOMAIN}/${resolvedParams.locale}/news/${article.slug || article.id}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsDetailClient article={article} locale={resolvedParams.locale} relatedArticles={relatedArticles} />
    </>
  );
}

