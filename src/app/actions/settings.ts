"use server";

import { prisma } from "@/lib/prisma";

export async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findMany();
    // Convert to simple key-value object
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
}

export async function updateSettings(formData: FormData) {
  try {
    const updates = Array.from(formData.entries());
    
    // We update each key individually. In a real app, you might use a transaction.
    for (const [key, value] of updates) {
      if (typeof value === "string") {
        await prisma.siteSettings.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
