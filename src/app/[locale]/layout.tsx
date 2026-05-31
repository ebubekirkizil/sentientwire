import type { Metadata } from "next";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';
import { NewsletterModal } from '@/components/NewsletterModal';

import { GoogleAnalytics } from '@next/third-parties/google';

const GA_ID = "G-1PSG6Q7S8L";

export const metadata: Metadata = {
  title: "SentientWire — Global Intelligence Feed",
  description: "Uncovering the technologies, defense contracts, and corporate strategies that shape the future before they reach the mainstream.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="//unpkg.com/three-globe/example/img/earth-dark.jpg" as="image" />
        <link rel="preload" href="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" as="image" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextIntlClientProvider messages={messages}>
            <SiteHeader />
            <main className="flex-1 w-full">
              {children}
            </main>
            <NewsletterModal locale={locale} />
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
