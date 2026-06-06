import React from "react";
import { getArticlesByLocale } from "@/app/actions/article";
import HomeClient from "./HomeClient";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const indexMessages = (messages as any).Index || {};

  return {
    title: `${indexMessages.category || "Global Technology & AI Intelligence"} — SentientWire`,
    description: indexMessages.subtitle || "Beyond the mainstream media. Discover tomorrow's tech ecosystem.",
    alternates: {
      canonical: `https://sentientwire.com/${locale}`,
      languages: {
        'x-default': `https://sentientwire.com/en-US`,
        'en': `https://sentientwire.com/en`,
        'en-US': `https://sentientwire.com/en-US`,
        'en-GB': `https://sentientwire.com/en-GB`,
        'tr': `https://sentientwire.com/tr`,
        'de': `https://sentientwire.com/de`,
        'es': `https://sentientwire.com/es`,
        'fr': `https://sentientwire.com/fr`,
        'it': `https://sentientwire.com/it`,
        'ru': `https://sentientwire.com/ru`,
        'zh': `https://sentientwire.com/zh`,
        'pl': `https://sentientwire.com/pl`,
        'nl': `https://sentientwire.com/nl`,
      }
    },
    openGraph: {
      title: `${indexMessages.category || "Global Technology & AI Intelligence"} — SentientWire`,
      description: indexMessages.subtitle || "Beyond the mainstream media.",
    }
  };
}

export const dynamic = 'force-dynamic';

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "tr";
  const dbArticles = await getArticlesByLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `https://sentientwire.com/#website`,
        "url": `https://sentientwire.com/${locale}`,
        "name": "SentientWire",
        "description": "Global Technology & AI Intelligence",
        "publisher": {
          "@id": "https://sentientwire.com/#organization"
        },
        "inLanguage": locale
      },
      {
        "@type": "Organization",
        "@id": "https://sentientwire.com/#organization",
        "name": "SentientWire Intelligence",
        "url": "https://sentientwire.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sentientwire.com/icon.png"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient dbArticles={dbArticles} locale={locale} />
    </>
  );
}
