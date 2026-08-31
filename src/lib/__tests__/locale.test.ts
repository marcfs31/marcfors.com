import { describe, expect, it } from "vitest";
import {
  isLocale,
  localeCookie,
  LOCALES,
  LOCALE_KEY,
  LOCALE_LABELS,
  OG_LOCALES,
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

  it("sets Secure on the locale cookie only when asked", () => {
    expect(localeCookie("ca")).toBe(`${LOCALE_KEY}=ca; Path=/; Max-Age=31536000; SameSite=Lax`);
    expect(localeCookie("ca", true)).toContain("; Secure");
  });
});
