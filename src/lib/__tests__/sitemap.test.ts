import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LOCALES } from "@/lib/locale";
import { RELEASE_DATE, SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  it("stamps a stable lastModified from RELEASE_DATE, not the request time", () => {
    const first = sitemap();
    const second = sitemap();
    const stamps = new Set(first.map((entry) => (entry.lastModified as Date).toISOString()));
    expect(stamps).toEqual(new Set([new Date(`${RELEASE_DATE}T00:00:00.000Z`).toISOString()]));
    // Two calls a moment apart must be byte-identical.
    expect(second.map((e) => (e.lastModified as Date).toISOString())).toEqual(
      first.map((e) => (e.lastModified as Date).toISOString()),
    );
  });

  it("covers the home page and every case study in every locale", () => {
    const entries = sitemap();
    const pages = 1 + CASE_STUDIES.length;
    expect(entries).toHaveLength(LOCALES.length * pages);

    for (const locale of LOCALES) {
      const home = locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`;
      const homeEntry = entries.find((entry) => entry.url === home);
      expect(homeEntry, `home for ${locale}`).toBeDefined();
      expect(homeEntry?.priority).toBe(1);
      for (const study of CASE_STUDIES) {
        const path = locale === "en" ? `/work/${study.slug}` : `/${locale}/work/${study.slug}`;
        expect(entries.some((entry) => entry.url === `${SITE_URL}${path}`)).toBe(true);
      }
    }
  });

  it("carries the full hreflang alternate set on every entry", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === SITE_URL)!;
    const langs = home.alternates?.languages ?? {};
    expect(Object.keys(langs).sort()).toEqual([...LOCALES, "x-default"].sort());
    expect(langs["x-default"]).toBe(SITE_URL);
    expect(langs.de).toBe(`${SITE_URL}/de`);

    const study = entries.find((e) => e.url === `${SITE_URL}/de/work/${CASE_STUDIES[0].slug}`)!;
    expect(study.alternates?.languages?.es).toBe(`${SITE_URL}/es/work/${CASE_STUDIES[0].slug}`);
  });
});
