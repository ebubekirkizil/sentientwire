"use server";

import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";

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
      sql: `SELECT * FROM Article WHERE slug = ?`,
      args: [slug]
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
    return result.rows;
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
