import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      }
    ],
    sitemap: [
      'https://sentientwire.com/sitemap.xml',
      'https://sentientwire.com/news-sitemap.xml',
    ],
  };
}
