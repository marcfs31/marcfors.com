export const LOCALES = ["en", "es", "ca", "it", "pt", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_CODES: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ca: "CA",
  it: "IT",
  pt: "PT",
  de: "DE",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
  it: "Italiano",
  pt: "Português",
  de: "Deutsch",
};

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  ca: "ca_ES",
  it: "it_IT",
  pt: "pt_PT",
  de: "de_DE",
};

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_KEY = "marcfors-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeCookie(value: Locale, secure = false): string {
  const extra = secure ? "; Secure" : "";
  return `${LOCALE_KEY}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${extra}`;
}
