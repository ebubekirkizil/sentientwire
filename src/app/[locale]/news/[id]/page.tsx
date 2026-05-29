import React from 'react';
import { getLocalizedArticle } from '@/app/actions/article';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
    },
    openGraph: {
      title: article.title,
      description: article.summary || "",
      url: articleUrl,
      type: "article",
      images: article.imageUrl ? [{ url: article.imageUrl, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary || "",
      images: article.imageUrl ? [article.imageUrl] : [],
    }
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getLocalizedArticle(resolvedParams.id, resolvedParams.locale);

  if (!article) {
    notFound();
  }
  
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
      <NewsDetailClient article={article} locale={resolvedParams.locale} />
    </>
  );
}

