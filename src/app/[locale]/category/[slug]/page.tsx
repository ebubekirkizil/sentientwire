import React from 'react';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import CategoryClient from './CategoryClient';

const PRODUCTION_DOMAIN = 'https://sentientwire.com';

interface PageProps {
  params: Promise<{ slug: string, locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const messages = await getMessages();
  const categoryTitle = (messages as any).Header?.nav?.[resolvedParams.slug.toLowerCase()] || resolvedParams.slug.toUpperCase();

  return {
    title: `${categoryTitle} Intelligence — SentientWire`,
    alternates: {
      canonical: `${PRODUCTION_DOMAIN}/${resolvedParams.locale}/category/${resolvedParams.slug}`,
      languages: {
        'x-default': `${PRODUCTION_DOMAIN}/en-US/category/${resolvedParams.slug}`,
        'en': `${PRODUCTION_DOMAIN}/en/category/${resolvedParams.slug}`,
        'en-US': `${PRODUCTION_DOMAIN}/en-US/category/${resolvedParams.slug}`,
        'en-GB': `${PRODUCTION_DOMAIN}/en-GB/category/${resolvedParams.slug}`,
        'tr': `${PRODUCTION_DOMAIN}/tr/category/${resolvedParams.slug}`,
        'de': `${PRODUCTION_DOMAIN}/de/category/${resolvedParams.slug}`,
        'es': `${PRODUCTION_DOMAIN}/es/category/${resolvedParams.slug}`,
        'fr': `${PRODUCTION_DOMAIN}/fr/category/${resolvedParams.slug}`,
        'it': `${PRODUCTION_DOMAIN}/it/category/${resolvedParams.slug}`,
        'ru': `${PRODUCTION_DOMAIN}/ru/category/${resolvedParams.slug}`,
        'zh': `${PRODUCTION_DOMAIN}/zh/category/${resolvedParams.slug}`,
        'pl': `${PRODUCTION_DOMAIN}/pl/category/${resolvedParams.slug}`,
        'nl': `${PRODUCTION_DOMAIN}/nl/category/${resolvedParams.slug}`,
      }
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <CategoryClient slug={resolvedParams.slug} locale={resolvedParams.locale} />;
}
