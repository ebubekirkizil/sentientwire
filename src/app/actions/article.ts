"use server";

import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";
import { translateArticleText } from "@/lib/ai";

// In-memory cache to store translated fields: key is `${articleId}_${targetLocale}`
const translationCache = new Map<string, { title: string, summary: string, content: string }>();


// Initialize libSQL directly for robustness
const db = createClient({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const categoryColor = formData.get("categoryColor") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const locale = formData.get("locale") as string || "en";

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const finalSlug = `${slug}-${Date.now()}`;
  const id = crypto.randomUUID();

  try {
    await db.execute({
      sql: `INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, title, finalSlug, summary, content, category, categoryColor, imageUrl, locale]
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/category/${category.toLowerCase()}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to create article:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const result = await db.execute({
      sql: `SELECT * FROM Article WHERE slug = ? OR id = ?`,
      args: [slug, slug]
    });
    
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}

export async function getArticlesByLocale(locale: string) {
  try {
    const result = await db.execute({
      sql: `SELECT * FROM Article WHERE locale = ? ORDER BY createdAt DESC`,
      args: [locale]
    });
    
    const articles = [...result.rows] as any[];
    
    // Fallback logic to ensure the page is never empty!
    // If the selected locale has less than 6 articles, we backfill with default articles from 'tr' or 'en'
    if (articles.length < 6) {
      const fallbackLocale = locale.startsWith('en') ? 'tr' : 'en';
      const fallbackResult = await db.execute({
        sql: `SELECT * FROM Article WHERE locale = ? ORDER BY createdAt DESC LIMIT ?`,
        args: [fallbackLocale, 10 - articles.length]
      });
      
      const existingIds = new Set(articles.map(r => r.id));
      for (const row of fallbackResult.rows) {
        if (!existingIds.has(row.id)) {
          articles.push(row);
        }
      }
    }

    // Translate any articles whose locale doesn't match the target language
    const targetLang = locale.substring(0, 2).toLowerCase();
    const translatedArticles = await Promise.all(
      articles.map(async (art) => {
        const artLocale = String(art.locale || 'en').substring(0, 2).toLowerCase();
        if (artLocale === targetLang) {
          return art;
        }

        const cacheKey = `${art.id}_${targetLang}`;
        if (translationCache.has(cacheKey)) {
          const cached = translationCache.get(cacheKey)!;
          return { ...art, title: cached.title, summary: cached.summary, content: cached.content };
        }

        const translated = await translateArticleText(
          String(art.title || ''),
          String(art.summary || ''),
          String(art.content || ''),
          targetLang
        );
        if (translated) {
          translationCache.set(cacheKey, translated);
          return { ...art, title: translated.title, summary: translated.summary, content: translated.content };
        }

        return art;
      })
    );
    
    return translatedArticles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export async function deleteArticle(id: string) {
  try {
    // First fetch the article to know which paths to revalidate
    const getResult = await db.execute({
      sql: `SELECT locale, category FROM Article WHERE id = ?`,
      args: [id]
    });
    
    if (getResult.rows.length === 0) return { success: false, error: "Article not found" };
    
    const article = getResult.rows[0];

    await db.execute({
      sql: `DELETE FROM Article WHERE id = ?`,
      args: [id]
    });
    
    revalidatePath(`/${article.locale}`);
    revalidatePath(`/${article.locale}/category/${String(article.category).toLowerCase()}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete article:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getLocalizedArticle(slugOrId: string, locale: string) {
  const article = await getArticleBySlug(slugOrId);
  if (!article) return null;

  const targetLang = locale.substring(0, 2).toLowerCase();
  const artLocale = String(article.locale || 'en').substring(0, 2).toLowerCase();
  if (artLocale === targetLang) {
    return article;
  }

  const cacheKey = `${article.id}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey)!;
    return { ...article, title: cached.title, summary: cached.summary, content: cached.content };
  }

  const translated = await translateArticleText(
    String(article.title || ''),
    String(article.summary || ''),
    String(article.content || ''),
    targetLang
  );
  if (translated) {
    translationCache.set(cacheKey, translated);
    return { ...article, title: translated.title, summary: translated.summary, content: translated.content };
  }

  return article;
}

