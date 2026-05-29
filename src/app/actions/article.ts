"use server";

import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";
import { translateArticleText } from "@/lib/ai";

// In-memory cache to store translated fields: key is `${articleId}_${targetLocale}`
const translationCache = new Map<string, { title: string, summary: string, content: string }>();

// In-memory cache to skip repeated requests for failed translations
const failedTranslations = new Set<string>();

function toPlainArticle(row: any) {
  if (!row) return null;
  return {
    id: row.id ? String(row.id) : '',
    title: row.title ? String(row.title) : '',
    slug: row.slug ? String(row.slug) : '',
    summary: row.summary ? String(row.summary) : '',
    content: row.content ? String(row.content) : '',
    category: row.category ? String(row.category) : 'GENERAL',
    categoryColor: row.categoryColor ? String(row.categoryColor) : '#06b6d4',
    imageUrl: row.imageUrl ? String(row.imageUrl) : null,
    originalUrl: row.originalUrl ? String(row.originalUrl) : null,
    locale: row.locale ? String(row.locale) : 'en',
    createdAt: row.createdAt ? String(row.createdAt) : null,
    updatedAt: row.updatedAt ? String(row.updatedAt) : null,
  };
}

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
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
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
  // Fetch all articles regardless of locale - ALWAYS return articles, never empty on error
  let articles: any[] = [];
  
  try {
    const result = await db.execute({
      sql: `SELECT * FROM Article ORDER BY createdAt DESC`,
      args: []
    });
    articles = [...result.rows] as any[];
  } catch (error) {
    console.error("Failed to fetch articles from DB:", error);
    return []; // Only return empty if DB itself fails
  }
  
  if (articles.length === 0) return [];

  const targetLang = locale.substring(0, 2).toLowerCase();

  // 1. Identify which articles need translation
  const articlesNeedingTranslation = articles.filter((art) => {
    const artLocale = String(art.locale || 'en').substring(0, 2).toLowerCase();
    return artLocale !== targetLang;
  });

  const translationsMap = new Map<string, { title: string; summary: string; content: string }>();

  if (articlesNeedingTranslation.length > 0) {
    try {
      // 2. Fetch existing translations from DB in ONE batch query to avoid N+1 queries
      const ids = articlesNeedingTranslation.map(art => String(art.id));
      const placeholders = ids.map(() => "?").join(",");
      
      const transResult = await db.execute({
        sql: `SELECT * FROM ArticleTranslation WHERE locale = ? AND articleId IN (${placeholders})`,
        args: [targetLang, ...ids]
      });

      // Populate translationsMap with database records
      transResult.rows.forEach((row) => {
        translationsMap.set(String(row.articleId), {
          title: String(row.title || ''),
          summary: String(row.summary || ''),
          content: String(row.content || '')
        });
      });

      // 3. For any missing translation, fetch from Gemini and insert into DB
      for (const art of articlesNeedingTranslation) {
        const artId = String(art.id);
        const cacheKey = `${artId}_${targetLang}`;

        if (!translationsMap.has(artId) && !failedTranslations.has(cacheKey)) {
          console.log(`[TRANSLATE] Translating article ${artId} to ${targetLang} via Gemini...`);
          try {
            const translated = await translateArticleText(
              String(art.title || ''),
              String(art.summary || ''),
              String(art.content || ''),
              targetLang
            );
            if (translated) {
              // Save to DB so we never translate it again
              try {
                await db.execute({
                  sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content)
                        VALUES (?, ?, ?, ?, ?)
                        ON CONFLICT(articleId, locale) DO UPDATE SET
                          title = excluded.title,
                          summary = excluded.summary,
                          content = excluded.content,
                          updatedAt = datetime('now')`,
                  args: [artId, targetLang, translated.title, translated.summary, translated.content]
                });
                translationsMap.set(artId, translated);
                console.log(`[TRANSLATE] Saved translation for ${artId} (${targetLang}) to database.`);
              } catch (dbErr) {
                console.error(`Failed to save translation for ${artId} (${targetLang}):`, dbErr);
                // Still use in-memory translation even if DB save fails
                translationsMap.set(artId, translated);
              }
            } else {
              console.warn(`[TRANSLATE] Translation failed for ${artId} to ${targetLang}. Will use original content.`);
              failedTranslations.add(cacheKey);
            }
          } catch (translateErr) {
            console.warn(`[TRANSLATE] Gemini error for ${artId}, using original content:`, translateErr);
            failedTranslations.add(cacheKey);
            // Continue - article will render in its original language
          }
        }
      }
    } catch (transErr) {
      console.warn("[TRANSLATE] Translation batch failed, serving articles in original language:", transErr);
      // Continue - all articles will render in original language
    }
  }

  // 4. Map translations to original articles and format - ALWAYS return articles
  const translatedArticles = articles.map((art) => {
    const artLocale = String(art.locale || 'en').substring(0, 2).toLowerCase();
    let finalArt = art;
    if (artLocale !== targetLang) {
      const trans = translationsMap.get(String(art.id));
      if (trans) {
        finalArt = {
          ...art,
          title: trans.title,
          summary: trans.summary,
          content: trans.content
        };
      }
      // If no translation available, article renders in its original language
    }
    return toPlainArticle(finalArt);
  });

  return translatedArticles;
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

    // Clean translations first
    await db.execute({
      sql: `DELETE FROM ArticleTranslation WHERE articleId = ?`,
      args: [id]
    });

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
  
  let finalArt = article;
  if (artLocale !== targetLang) {
    const cacheKey = `${article.id}_${targetLang}`;
    // Check DB first
    const transResult = await db.execute({
      sql: `SELECT * FROM ArticleTranslation WHERE articleId = ? AND locale = ?`,
      args: [String(article.id), targetLang]
    });

    if (transResult.rows.length > 0) {
      const trans = transResult.rows[0];
      finalArt = {
        ...article,
        title: String(trans.title || ''),
        summary: String(trans.summary || ''),
        content: String(trans.content || '')
      };
    } else if (!failedTranslations.has(cacheKey)) {
      // Not found, call Gemini and save
      console.log(`[TRANSLATE] Single translation: ${article.id} to ${targetLang} via Gemini...`);
      const translated = await translateArticleText(
        String(article.title || ''),
        String(article.summary || ''),
        String(article.content || ''),
        targetLang
      );
      if (translated) {
        try {
          await db.execute({
            sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content)
                  VALUES (?, ?, ?, ?, ?)
                  ON CONFLICT(articleId, locale) DO UPDATE SET
                    title = excluded.title,
                    summary = excluded.summary,
                    content = excluded.content,
                    updatedAt = datetime('now')`,
            args: [String(article.id), targetLang, translated.title, translated.summary, translated.content]
          });
          console.log(`[TRANSLATE] Saved single translation for ${article.id} (${targetLang}) to database.`);
        } catch (dbErr) {
          console.error(`Failed to save single translation for ${article.id} (${targetLang}):`, dbErr);
        }
        finalArt = {
          ...article,
          title: translated.title,
          summary: translated.summary,
          content: translated.content
        };
      } else {
        console.warn(`[TRANSLATE] Single translation failed for ${article.id} to ${targetLang}. Caching failure.`);
        failedTranslations.add(cacheKey);
      }
    }
  }

  return toPlainArticle(finalArt);
}
