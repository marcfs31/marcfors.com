import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import { DEFAULT_LOCALE, isLocale, languageAlternates, LOCALES, OG_LOCALES } from "@/lib/locale";
import { DEV_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { ANTI_FLASH_SCRIPT } from "@/lib/theme";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif-loaded",
  display: "swap",
  adjustFontFallback: true,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
  adjustFontFallback: true,
});

const title = `${SITE_NAME} — Frontend software engineer`;
const description =
  "Frontend software engineer in Barcelona. React, TypeScript, Angular. Previously Dynatrace Dashboards and Notebooks, CREALOGIX banking, T-Systems Justice.";

export async function generateMetadata(): Promise<Metadata> {
  const headerLocale = (await headers()).get("x-locale");
  const lang = isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: ["Marc Fors", "frontend software engineer", "React", "TypeScript", "Angular", "Barcelona"],
    alternates: {
      languages: languageAlternates("/", SITE_URL),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description:
        "Seven-plus years in observability, fintech, banking and government. Based in Barcelona. Open to frontend software engineer roles.",
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((item) => item !== lang).map((item) => OG_LOCALES[item]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  email: DEV_EMAIL,
  jobTitle: "Frontend software engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: ["React", "TypeScript", "Angular", "Next.js", "observability", "Playwright"],
  seeks: "Frontend software engineer roles in Barcelona or remote EU, open from December 2025",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerLocale = (await headers()).get("x-locale");
  const lang = isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    <html lang={lang} className={`${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body
        style={
          {
            "--serif": "var(--font-serif-loaded), Fraunces, Georgia, serif",
            "--mono": "var(--font-mono-loaded), ui-monospace, monospace",
          } as CSSProperties
        }
      >
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
