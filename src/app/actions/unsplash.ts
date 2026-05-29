"use server";

export interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  description: string;
  author: string;
}

export async function searchUnsplashImages(query: string): Promise<UnsplashImage[]> {
  if (!query || query.trim() === "") return [];

  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=9`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
      },
      next: { revalidate: 3600 } // Cache results for 1 hour
    });

    if (!response.ok) {
      console.error(`Unsplash NAPI returned status ${response.status}`);
      return [];
    }

    const data = await response.json();
    const results = data.results || [];

    return results.map((item: any) => ({
      id: String(item.id),
      url: String(item.urls?.regular || item.urls?.small || ""),
      thumb: String(item.urls?.thumb || item.urls?.small || ""),
      description: String(item.alt_description || item.description || "Tech News Image"),
      author: String(item.user?.name || "Unsplash Photographer")
    }));
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return [];
  }
}
