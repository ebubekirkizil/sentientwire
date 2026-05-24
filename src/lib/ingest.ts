import Parser from 'rss-parser';
import { createClient } from "@libsql/client";
import { rewriteArticle } from './ai';

const parser = new Parser();

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

// RSS Feeds for Global Tech & AI
const FEEDS = [
  'https://news.ycombinator.com/rss', // Hacker News
  'https://techcrunch.com/feed/', // TechCrunch
  // can add more specialized deep tech feeds here
];

export async function runIngestion() {
  console.log("Starting Data Ingestion Cycle...");
  
  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      
      // Get the latest 3 items to process
      const latestItems = feed.items.slice(0, 3);
      
      for (const item of latestItems) {
        const title = item.title || '';
        const link = item.link || '';
        const contentSnippet = item.contentSnippet || item.content || '';

        // Check if we already processed this URL
        const existsResult = await db.execute({
          sql: "SELECT id FROM Article WHERE originalUrl = ?",
          args: [link]
        });

        if (existsResult.rows.length > 0) {
          console.log(`Skipping already processed: ${title}`);
          continue;
        }

        console.log(`Processing New Article: ${title}`);

        const rawText = `Title: ${title}\nContent: ${contentSnippet}\nLink: ${link}`;

        // We generate it in English as the base language for global reach
        const aiResult = await rewriteArticle(rawText, 'en');

        // Fetch a relevant image from Unsplash based on title keywords
        const fetchImage = async (query: string) => {
          try {
            // Use Unsplash Source API (no API key required) – it redirects to a random image for the query
            const response = await fetch(`https://source.unsplash.com/featured/800x600?${encodeURIComponent(query)}`);
            // The final URL after redirect is the image URL
            return response.url;
          } catch (e) {
            console.error('Image fetch failed', e);
            return null;
          }
        };
        const imageUrl = await fetchImage(title);

        if (aiResult && aiResult.title && aiResult.slug && aiResult.content) {
          await db.execute({
            sql: `INSERT INTO Article (id, title, slug, summary, content, locale, originalUrl, imageUrl) 
                  VALUES (hex(randomblob(16)), ?, ?, ?, ?, 'en', ?, ?)`,
            args: [
              aiResult.title,
              aiResult.slug,
              aiResult.summary || '',
              aiResult.content,
              link,
              imageUrl
            ]
          });
          console.log(`Successfully ingested and translated: ${aiResult.title}`);
        }
      }
    } catch (e) {
      console.error(`Failed to ingest from ${feedUrl}`, e);
    }
  }

  return { success: true };
}
