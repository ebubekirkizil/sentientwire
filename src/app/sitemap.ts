import { MetadataRoute } from 'next';
import { db } from "@/lib/db";

const locales = ['en', 'tr', 'de', 'es', 'fr', 'it', 'nl', 'pl'];
const categories = ['ai', 'cybersecurity', 'defense', 'quantum', 'hardware', 'space'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sentientwire.com';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages (Home) for each locale
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // 2. Category Pages for each locale
  locales.forEach(locale => {
    categories.forEach(cat => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 3. Dynamic News Articles (Skip during build phase to avoid auth errors)
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    try {
      const result = await db.execute("SELECT slug, locale, updatedAt FROM Article WHERE isPublished = 1");
      
      result.rows.forEach((row) => {
        const locale = String(row.locale || 'en');
        const slug = String(row.slug);
        const updatedAt = row.updatedAt ? new Date(String(row.updatedAt)) : new Date();

        sitemapEntries.push({
          url: `${baseUrl}/${locale}/news/${slug}`,
          lastModified: updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
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
