import { MetadataRoute } from 'next';
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

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

  // 3. Dynamic News Articles
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
    console.error("Sitemap generation error:", error);
  }

  return sitemapEntries;
}
