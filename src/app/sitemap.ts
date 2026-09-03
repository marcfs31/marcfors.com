import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LOCALES, localeUrl } from "@/lib/locale";
import { RELEASE_DATE, SITE_URL } from "@/lib/site";

// A fixed release date keeps `lastModified` stable between builds. `new Date()` here
// told crawlers every URL changed on every fetch, which dilutes the crawl signal.
const lastModified = new Date(`${RELEASE_DATE}T00:00:00.000Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...CASE_STUDIES.map((study) => `/work/${study.slug}`)];
  return LOCALES.flatMap((locale) =>
    pages.map((path) => ({
      url: localeUrl(locale, path, SITE_URL),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}
