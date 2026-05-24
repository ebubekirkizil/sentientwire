"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // We only track once per navigation
    if (!pathname) return;
    
    // Ignore admin routes from tracking to not pollute stats
    if (pathname.includes("/admin")) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const referrer = document.referrer;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, referrer }),
      // Keepalive ensures the request finishes even if the user navigates away quickly
      keepalive: true,
    }).catch(console.error);

  }, [pathname, searchParams]);

  return null;
}
