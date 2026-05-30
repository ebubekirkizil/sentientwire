import Parser from 'rss-parser';
import { db } from "@/lib/db";
import { rewriteArticle, translateArticleText } from './ai';
import { searchUnsplashImages } from '../app/actions/unsplash';

const parser = new Parser();

// Default RSS Feeds
const FEEDS = [
  'https://news.ycombinator.com/rss', // Hacker News
  'https://techcrunch.com/feed/', // TechCrunch
];

async function getImageUrl(title: string, category: string): Promise<string> {
  try {
    let query = category.toLowerCase();
    const keywords = ['cybersecurity', 'hacker', 'quantum', 'ai', 'robot', 'drone', 'wafer', 'chip', 'network', 'satellite'];
    const matched = keywords.find(k => title.toLowerCase().includes(k));
    if (matched) {
      query = matched;
    }
    
    console.log(`[INGEST-IMAGE] Searching Unsplash for: ${query}`);
    const images = await searchUnsplashImages(query);
    
    if (images && images.length > 0) {
      // Pick a random image from the first 5 results to avoid repeats
      const idx = Math.floor(Math.random() * Math.min(5, images.length));
      return images[idx].url;
    }
  } catch (error) {
    console.error("Unsplash Automated Search Error:", error);
  }
  
  // Fallback high-quality general tech photo
  const randomId = Math.floor(Math.random() * 1000);
  return `https://images.unsplash.com/photo-1510915361894-faa8b2d88c4b?auto=format&fit=crop&q=80&w=800&h=600&sig=${randomId}`;
}

export async function runIngestion() {
  console.log("Starting Data Ingestion Cycle...");
  
  // 1. Load feeds from database settings
  let feedUrls = FEEDS;
  try {
    const rssSettings = await db.execute({
      sql: "SELECT value FROM SiteSettings WHERE key = 'rss_feeds'",
      args: []
    });
    if (rssSettings.rows.length > 0 && typeof rssSettings.rows[0].value === 'string') {
      const customFeeds = rssSettings.rows[0].value
        .split(',')
        .map(f => f.trim())
        .filter(Boolean);
      if (customFeeds.length > 0) {
        feedUrls = customFeeds;
        console.log(`[INGEST] Loaded custom RSS feeds:`, feedUrls);
      }
    }
  } catch (settingsErr) {
    console.warn("Failed to load custom RSS feeds from SiteSettings, using defaults:", settingsErr);
  }

  const tasks: Promise<void>[] = [];

  // 2. Queue concurrent tasks for each feed
  for (const feedUrl of feedUrls) {
    tasks.push((async () => {
      try {
        const feed = await parser.parseURL(feedUrl);
        
        // Take latest 2 items from each feed to prevent overloading and rate limits
        const latestItems = feed.items.slice(0, 2);
        
        // Process items in parallel
        await Promise.all(latestItems.map(async (item) => {
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
            return;
          }

          console.log(`Processing New Article: ${title}`);
          const rawText = `Title: ${title}\nContent: ${contentSnippet}\nLink: ${link}`;

          // Rewrite article in English
          const aiResult = await rewriteArticle(rawText, 'en');

          if (aiResult && aiResult.title && aiResult.slug && aiResult.content) {
            const id = Math.random().toString(36).substring(2, 15);
            
            // Extract dynamically generated category
            const categoryStr = String(aiResult.category || 'GLOBAL INTEL').toUpperCase();
            const categoryColorStr = String(aiResult.categoryColor || '#06b6d4');

            // Dynamic Unsplash image selection
            const imageUrl = await getImageUrl(aiResult.title, aiResult.category || '');
            
            await db.execute({
              sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, originalUrl, locale, isPublished) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'en', 1)`,
              args: [id, aiResult.title, aiResult.slug, aiResult.summary || '', aiResult.content, aiResult.category, aiResult.categoryColor, imageUrl, link]
            });

            // Pre-translate to 'tr' (Turkish) and store in DB immediately to eliminate homepage latency
            console.log(`[INGEST-TRANSLATE] Waiting 5 seconds to avoid API quota before translating...`);
            await new Promise(r => setTimeout(r, 5000));
            console.log(`[INGEST-TRANSLATE] Pre-translating ${aiResult.title} to Turkish (tr)...`);
            try {
              const translated = await translateArticleText(
                aiResult.title,
                aiResult.summary || '',
                aiResult.content,
                'tr'
              );
              if (translated) {
                await db.execute({
                  sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content)
                        VALUES (?, 'tr', ?, ?, ?)`,
                  args: [id, translated.title, translated.summary, translated.content]
                });
                console.log(`[INGEST-TRANSLATE] Saved Turkish translation for ${aiResult.title}.`);
              }
            } catch (transErr) {
              console.error(`[INGEST-TRANSLATE] Failed to pre-translate article ${id} to Turkish:`, transErr);
            }
          }
        }));
      } catch (e) {
        console.error(`Failed to ingest from ${feedUrl}`, e);
      }
    })());
  }

  // 3. Wait for all feeds to finish processing
  await Promise.all(tasks);
  console.log("Ingestion cycle finished successfully.");
  return { success: true };
}
