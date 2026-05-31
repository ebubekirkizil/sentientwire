import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await db.execute("SELECT * FROM Article WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT 20;");
  const articles = result.rows;

  const siteUrl = 'https://sentientwire.com';
  
  const rssItems = articles.map((article: any) => {
    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/tr/news/${article.slug || article.id}</link>
      <guid isPermaLink="true">${siteUrl}/tr/news/${article.slug || article.id}</guid>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${article.summary || article.excerpt || ''}]]></description>
      ${article.imageUrl ? `<enclosure url="${article.imageUrl}" type="image/jpeg" length="1024" />` : ''}
      <category><![CDATA[${article.category}]]></category>
      <source url="${siteUrl}/feed.xml">SentientWire</source>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>SentientWire - Global Intelligence Feed</title>
    <link>${siteUrl}</link>
    <description>Uncovering the technologies, defense contracts, and corporate strategies that shape the future before they reach the mainstream.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>SentientWire - Global Intelligence Feed</title>
      <link>${siteUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
    },
  });
}
