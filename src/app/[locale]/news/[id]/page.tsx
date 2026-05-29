import React from 'react';
import { getLocalizedArticle } from '@/app/actions/article';
import NewsDetailClient from './NewsDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getLocalizedArticle(resolvedParams.id, resolvedParams.locale);
  
  if (!article) {
    return {
      title: "Intel Not Found — SentientWire",
    };
  }

  return {
    title: `${article.title} — SentientWire`,
    description: article.summary || "",
    openGraph: {
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

  return <NewsDetailClient article={article} locale={resolvedParams.locale} />;
}
