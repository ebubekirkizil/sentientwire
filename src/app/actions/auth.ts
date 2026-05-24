"use server";

import { cookies } from "next/headers";

export async function login(password: string) {
  // In a real app, hash and check against db. We use the user's requested password here.
  if (password === "techintel2026") {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", "admin_granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "ACCESS DENIED" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}
