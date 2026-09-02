import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, languageAlternates, LOCALES, localeUrl, OG_LOCALES, type Locale } from "@/lib/locale";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

const title = `${SITE_NAME} — Frontend software engineer`;
const description =
  "Frontend software engineer in Barcelona. React, TypeScript, Angular. Previously Dynatrace Dashboards and Notebooks, CREALOGIX banking, T-Systems Justice.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale, "/", SITE_URL),
      languages: languageAlternates("/", SITE_URL),
    },
    openGraph: {
      title,
      description:
        "Seven-plus years in observability, fintech, banking and government. Based in Barcelona. Open to frontend software engineer roles.",
      url: localeUrl(locale, "/", SITE_URL),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((item) => item !== locale).map((item) => OG_LOCALES[item]),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
