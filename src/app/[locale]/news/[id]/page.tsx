import React from 'react';
import { getLocalizedArticle } from '@/app/actions/article';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getLocalizedArticle(resolvedParams.id, resolvedParams.locale);
  
  if (!article) {
    return {
      title: "Article Not Found — SentientWire",
    };
  }

  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/${resolvedParams.locale}/news/${article.slug || article.id}`;

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

  const baseUrl = getBaseUrl();
  
  // JSON-LD NewsArticle structured data for Google News, Highlights, and Discover compatibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary || "",
    "image": article.imageUrl ? [article.imageUrl] : ["https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=1200&h=900"],
    "datePublished": article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
    "dateModified": article.updatedAt ? new Date(article.updatedAt).toISOString() : (article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString()),
    "author": [
      {
        "@type": "Organization",
        "name": "Sentient Wire",
        "url": baseUrl
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Sentient Wire",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": `${baseUrl}/${resolvedParams.locale}/news/${article.slug || article.id}`
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

