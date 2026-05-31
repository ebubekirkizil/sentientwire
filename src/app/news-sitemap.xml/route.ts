import { db } from "@/lib/db";

export async function GET() {
  const baseUrl = 'https://sentientwire.com';
  
  try {
    const result = await db.execute({
      sql: "SELECT title, slug, locale, updatedAt FROM Article WHERE isPublished = 1 AND updatedAt >= datetime('now', '-2 days') ORDER BY updatedAt DESC",
      args: []
    });

    // Group articles by slug to create alternates
    const articleMap = new Map<string, any[]>();
    
    result.rows.forEach((row: any) => {
      const slug = String(row.slug);
      if (!articleMap.has(slug)) {
        articleMap.set(slug, []);
      }
      articleMap.get(slug)!.push(row);
    });

    const urls: string[] = [];

    articleMap.forEach((rows, slug) => {
      rows.forEach(row => {
        // Build alternate tags
        const alternates = rows.map(r => 
          `<xhtml:link rel="alternate" hreflang="${r.locale}" href="${baseUrl}/${r.locale}/news/${slug}" />`
        ).join('\n    ');

        urls.push(`
  <url>
    <loc>${baseUrl}/${row.locale}/news/${slug}</loc>
    ${alternates}
    <news:news>
      <news:publication>
        <news:name>SentientWire</news:name>
        <news:language>${row.locale}</news:language>
      </news:publication>
      <news:publication_date>${new Date(row.updatedAt).toISOString()}</news:publication_date>
      <news:title>${row.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</news:title>
    </news:news>
  </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join('')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      },
    });
  } catch (error) {
    console.error("News sitemap generation failed:", error);
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
