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

        // Improved image selection based on keywords
        const getImageUrl = (query: string) => {
          const techKeywords = ['cyber', 'ai', 'robot', 'chip', 'data', 'server', 'hacker', 'satellite', 'quantum'];
          const matched = techKeywords.find(k => query.toLowerCase().includes(k)) || 'tech';
          // Using a reliable random image service or a curated list of Unsplash IDs
          const randomId = Math.floor(Math.random() * 1000);
          return `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600&sig=${randomId}`;
        };
        const imageUrl = getImageUrl(title);

        if (aiResult && aiResult.title && aiResult.slug && aiResult.content) {
          const id = Math.random().toString(36).substring(2, 15);
          await db.execute({
            sql: `INSERT INTO Article (id, title, slug, summary, content, locale, originalUrl, imageUrl, category, categoryColor) 
                  VALUES (?, ?, ?, ?, ?, 'en', ?, ?, ?, ?)`,
            args: [
              id,
              aiResult.title,
              aiResult.slug,
              aiResult.summary || '',
              aiResult.content,
              link,
              imageUrl,
              'GLOBAL INTEL',
              '#06b6d4'
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
