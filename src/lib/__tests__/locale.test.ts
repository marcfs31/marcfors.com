import { describe, expect, it } from "vitest";
import {
  isCrawler,
  isLocale,
  localeCookie,
  LOCALES,
  LOCALE_KEY,
  LOCALE_LABELS,
  OG_LOCALES,
  preferredLocale,
  stripLocale,
  withLocale,
} from "@/lib/locale";

describe("locales", () => {
  it("covers the six shipped languages with native labels", () => {
    expect(LOCALES).toEqual(["en", "es", "ca", "it", "pt", "de"]);
    expect(LOCALE_LABELS.de).toBe("Deutsch");
    expect(LOCALE_LABELS.ca).toBe("Català");
    expect(LOCALE_LABELS.pt).toBe("Português");
    expect(OG_LOCALES.it).toBe("it_IT");
    expect(isLocale("de")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("puts non-English locales in the path and keeps English at root", () => {
    expect(withLocale("en", "/")).toBe("/");
    expect(withLocale("es", "/")).toBe("/es");
    expect(withLocale("de", "/work/iterm-studio")).toBe("/de/work/iterm-studio");
    expect(withLocale("en", "/print")).toBe("/print");
    expect(stripLocale("/es/print")).toBe("/print");
    expect(stripLocale("/de")).toBe("/");
    expect(stripLocale("/work/iterm-studio")).toBe("/work/iterm-studio");
  });

  it("sets Secure on the locale cookie only when asked", () => {
    expect(localeCookie("ca")).toBe(`${LOCALE_KEY}=ca; Path=/; Max-Age=31536000; SameSite=Lax`);
    expect(localeCookie("ca", true)).toContain("; Secure");
  });

  it("picks the first supported language from Accept-Language", () => {
    expect(preferredLocale(null)).toBe("en");
    expect(preferredLocale("es-ES,es;q=0.9,en;q=0.8")).toBe("es");
    expect(preferredLocale("ca-ES,es;q=0.8")).toBe("ca");
    expect(preferredLocale("de-DE,en;q=0.8")).toBe("de");
    expect(preferredLocale("fr-FR,en;q=0.9")).toBe("en");
    expect(preferredLocale("pt-PT,pt;q=0.9")).toBe("pt");
  });

  it("treats search crawlers as English so indexed URLs stay stable", () => {
    expect(isCrawler("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isCrawler("bingbot/2.0")).toBe(true);
    expect(isCrawler("Mozilla/5.0 (Macintosh) AppleWebKit/537.36")).toBe(false);
  });
});
