import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// `/print` and `/lab/*` are already `robots: { index: false }` in their metadata,
// but disallowing them here stops crawlers spending budget fetching them at all.
// Patterns cover the bare and locale-prefixed forms (`/print`, `/de/print`, …).
export const DISALLOWED = ["/print", "/*/print", "/lab", "/*/lab"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: DISALLOWED },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
