import { MetadataRoute } from 'next';
import { db } from "@/lib/db";

const locales = ['en', 'tr', 'de', 'es', 'fr', 'it', 'ru', 'zh', 'ar', 'ja'];
const categories = ['ai', 'cybersecurity', 'defense', 'quantum', 'hardware', 'space'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sentientwire.com';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages (Home) for each locale
  locales.forEach(locale => {
    const alternates: Record<string, string> = {};
    locales.forEach(l => { alternates[l] = `${baseUrl}/${l}`; });

    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
      alternates: {
        languages: alternates
      }
    });
  });

  // 2. Category Pages for each locale
  locales.forEach(locale => {
    categories.forEach(cat => {
      const alternates: Record<string, string> = {};
      locales.forEach(l => { alternates[l] = `${baseUrl}/${l}/category/${cat}`; });

      sitemapEntries.push({
        url: `${baseUrl}/${locale}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: alternates
        }
      });
    });
  });

  // 3. Dynamic News Articles (Skip during build phase to avoid auth errors)
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    try {
      const result = await db.execute("SELECT slug, locale, updatedAt FROM Article WHERE isPublished = 1");
      
      // Group articles by slug to create alternates
      const articleMap = new Map<string, { locales: string[], updatedAt: Date }>();
      
      result.rows.forEach((row) => {
        const locale = String(row.locale || 'en');
        const slug = String(row.slug);
        const updatedAt = row.updatedAt ? new Date(String(row.updatedAt)) : new Date();

        if (!articleMap.has(slug)) {
          articleMap.set(slug, { locales: [], updatedAt });
        }
        articleMap.get(slug)!.locales.push(locale);
        // keep the latest updatedAt
        if (updatedAt > articleMap.get(slug)!.updatedAt) {
          articleMap.get(slug)!.updatedAt = updatedAt;
        }
      });

      articleMap.forEach((data, slug) => {
        const alternates: Record<string, string> = {};
        // Only include languages where the article actually exists
        data.locales.forEach(l => { alternates[l] = `${baseUrl}/${l}/news/${slug}`; });

        data.locales.forEach(locale => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/news/${slug}`,
            lastModified: data.updatedAt,
            changeFrequency: 'daily',
            priority: 0.9,
            alternates: {
              languages: alternates
            }
          });
        });
      });
    } catch (error) {
      console.error("Sitemap dynamic generation skipped or failed:", error);
    }
  } else {
    console.log("[SITEMAP] Skipping dynamic article fetch during build phase.");
  }

  return sitemapEntries;
}
