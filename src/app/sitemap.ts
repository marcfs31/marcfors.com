import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LOCALES, localeUrl } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...CASE_STUDIES.map((study) => `/work/${study.slug}`)];
  return LOCALES.flatMap((locale) =>
    pages.map((path) => ({
      url: localeUrl(locale, path, SITE_URL),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}
