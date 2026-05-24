import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theintelligence.com';

  // We will dynamically fetch news articles here in the future
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // We can add categories or specific news endpoints here later
  ];
}
