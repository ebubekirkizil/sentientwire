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

  return <HomeClient dbArticles={dbArticles} locale={locale} />;
}
