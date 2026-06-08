import Parser from 'rss-parser';
import { db } from "@/lib/db";
import { rewriteArticle, translateArticleText } from './ai';
import { searchUnsplashImages } from '../app/actions/unsplash';

const parser = new Parser();

// Premium B2B & Tech Intelligence Sources
const FEEDS = [
  'https://news.ycombinator.com/rss',           // Hacker News
  'https://techcrunch.com/feed/',               // TechCrunch
  'https://www.wired.com/feed/rss',             // Wired
  'https://arstechnica.com/feed/',              // Ars Technica
  'https://www.theverge.com/rss/index.xml',     // The Verge
  'https://feeds.feedburner.com/TheHackersNews', // The Hacker News (Security)
  'https://venturebeat.com/feed/',              // VentureBeat (AI/Business)
  'https://www.technologyreview.com/feed/',     // MIT Technology Review
];

// All supported locales for pre-translation
const ALL_LOCALES = ['tr', 'es', 'fr', 'de', 'it', 'ru', 'zh', 'ar', 'ja', 'pl'];

async function getImageUrl(title: string, category: string, imagePrompt?: string): Promise<string> {
  try {
    // Use AI-generated corporate minimalist prompt when available
    const baseStyle = 'corporate minimalist flat design white background';
    const query = imagePrompt 
      ? imagePrompt.replace('flat design, white background, corporate minimalist, ', '')
      : `${category.toLowerCase()} ${baseStyle}`;
    
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
  return `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=628&sig=${randomId}`;
}

export async function runIngestion() {
  console.log("Starting Data Ingestion Cycle...");
  
  // 1. Load feeds from database settings (custom feeds override defaults)
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
        
        // Take latest 5 items to find at least one new article we haven't published yet
        const latestItems = feed.items.slice(0, 5);
        
        let processedForThisFeed = false;

        for (const item of latestItems) {
          if (processedForThisFeed) break; // Only process 1 new article per feed per run

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
          processedForThisFeed = true;
          const rawText = `Title: ${title}\nContent: ${contentSnippet}\nLink: ${link}`;

          // Rewrite article in English (primary language)
          const aiResult = await rewriteArticle(rawText, 'en');

          if (aiResult && aiResult.title && aiResult.slug && aiResult.content) {
            const id = Math.random().toString(36).substring(2, 15);
            
            const categoryStr = String(aiResult.category || 'AI').toUpperCase();
            const categoryColorStr = String(aiResult.categoryColor || '#8b5cf6');

            // Use AI-generated imagePrompt for corporate minimalist visuals
            const imageUrl = await getImageUrl(aiResult.title, categoryStr, aiResult.imagePrompt);
            const imageUrl2 = await getImageUrl(aiResult.title, categoryStr, aiResult.imagePrompt2 || aiResult.imagePrompt + " secondary");
            
            let finalContent = aiResult.content;
            // Inject second image after the second H2 tag (usually halfway through the article)
            if (finalContent.includes('</h2>')) {
                const parts = finalContent.split('</h2>');
                if (parts.length > 2) {
                    parts[1] = parts[1] + `</h2><figure class="article-inline-image" style="margin: 40px 0;"><img src="${imageUrl2}" alt="Article secondary illustration" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.2);" /></figure>`;
                    finalContent = parts.join('</h2>');
                } else {
                    finalContent += `<figure class="article-inline-image" style="margin: 40px 0;"><img src="${imageUrl2}" alt="Article secondary illustration" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.2);" /></figure>`;
                }
            }

            await db.execute({
              sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, originalUrl, locale, isPublished) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'en', 1)`,
              args: [id, aiResult.title, aiResult.slug, aiResult.summary || '', finalContent, categoryStr, categoryColorStr, imageUrl, link]
            });

            console.log(`[INGEST] Saved article: ${aiResult.title}`);

            // Pre-translate to ALL supported locales to prevent English fallback
            for (const locale of ALL_LOCALES) {
              console.log(`[INGEST-TRANSLATE] Translating to ${locale}...`);
              await new Promise(r => setTimeout(r, 3000)); // Space out API calls
              try {
                const translated = await translateArticleText(
                  aiResult.title,
                  aiResult.summary || '',
                  aiResult.content,
                  locale
                );
                if (translated) {
                  await db.execute({
                    sql: `INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content)
                          VALUES (?, ?, ?, ?, ?)`,
                    args: [id, locale, translated.title, translated.summary, translated.content]
                  });
                  console.log(`[INGEST-TRANSLATE] ✅ Saved ${locale} translation.`);
                }
              } catch (transErr) {
                console.error(`[INGEST-TRANSLATE] ❌ Failed for ${locale}:`, transErr);
              }
            }
            
            console.log(`[INGEST] ✅ Article fully processed in all languages: ${aiResult.title}`);
          }
        }
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

