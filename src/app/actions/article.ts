"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { translateArticleText } from "@/lib/ai";

// In-memory cache to store translated fields: key is `${articleId}_${targetLocale}`
const translationCache = new Map<string, { title: string, summary: string, content: string }>();

function toPlainArticle(row: any) {
  if (!row) return null;
  return {
    id: String(row.id || ''),
    title: String(row.title || 'Untitled'),
    slug: String(row.slug || ''),
    summary: String(row.summary || row.excerpt || ''),
    content: String(row.content || ''),
    category: String(row.category || 'GENERAL'),
    categoryColor: String(row.categoryColor || '#06b6d4'),
    imageUrl: row.imageUrl ? String(row.imageUrl) : null,
    originalUrl: row.originalUrl ? String(row.originalUrl) : null,
    locale: String(row.locale || 'en'),
    createdAt: row.createdAt ? String(row.createdAt) : new Date().toISOString(),
    updatedAt: row.updatedAt ? String(row.updatedAt) : new Date().toISOString(),
    xPosted: Number(row.xPosted || 0),
    isPublished: Number(row.isPublished ?? 1)
  };
}


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

    // Auto-translate to TR if the article is created in EN
    if (locale === 'en') {
      try {
        console.log(`[CREATE-TRANSLATE] Translating new article ${id} to TR...`);
        const translated = await translateArticleText(title, summary, content, 'tr');
        if (translated) {
          await db.execute({
            sql: `INSERT INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)`,
            args: [id, 'tr', translated.title, translated.summary, translated.content]
          });
          console.log(`[CREATE-TRANSLATE] Successfully saved TR translation for ${id}`);
        }
      } catch (transErr) {
        console.error(`[CREATE-TRANSLATE] Failed to translate ${id} to TR:`, transErr);
      }
    }

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
  // Normalize locale: zh-CN -> zh, tr -> tr, en-US -> en, etc.
  const targetLang = locale === 'zh-CN' ? 'zh' : locale.substring(0, 2).toLowerCase();
  
  try {
    const result = await db.execute({
      sql: `SELECT * FROM Article ORDER BY createdAt DESC`,
      args: []
    });
    
    if (!result.rows || result.rows.length === 0) return [];

    const articles = result.rows;
    const ids = articles.map(a => String(a.id));
    
    // ALWAYS look up ArticleTranslation for every locale.
    // This is critical: even if article.locale === targetLang,
    // the TranslationTable may have a better-quality translation.
    let transMap = new Map();
    try {
      const transResult = await db.execute({
        sql: `SELECT * FROM ArticleTranslation WHERE locale = ? AND articleId IN (${ids.map(() => "?").join(",")})`,
        args: [targetLang, ...ids]
      });
      transResult.rows.forEach(r => transMap.set(String(r.articleId), r));
    } catch (transError) {
      console.error('[getArticlesByLocale] Translation lookup failed:', transError);
    }

    return articles.map((art) => {
      const trans = transMap.get(String(art.id));
      if (trans) {
        return toPlainArticle({ ...art, title: trans.title, summary: trans.summary, content: trans.content });
      }
      // Fallback to original article
      return toPlainArticle(art);
    });

  } catch (error) {
    console.error("Database Error:", error);
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

  // Normalize locale: zh-CN -> zh, en-US -> en, etc.
  const targetLang = locale === 'zh-CN' ? 'zh' : locale.substring(0, 2).toLowerCase();
  
  // ALWAYS check ArticleTranslation first, regardless of article.locale.
  // Reason: articles may be stored with any locale value (e.g. 'tr') but
  // still have better translations in ArticleTranslation for every language.
  let finalArt = article;
  try {
    const transResult = await db.execute({
      sql: `SELECT * FROM ArticleTranslation WHERE articleId = ? AND locale = ?`,
      args: [String(article.id), targetLang]
    });

    if (transResult.rows.length > 0) {
      const trans = transResult.rows[0];
      finalArt = {
        ...article,
        title: String(trans.title || article.title || ''),
        summary: String(trans.summary || article.summary || ''),
        content: String(trans.content || article.content || '')
      };
    }
    // If no translation found, fall back to original article language
  } catch (err) {
    console.error('[getLocalizedArticle] Translation lookup failed:', err);
  }

  return toPlainArticle(finalArt);
}
