import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DEFAULT_LOCALE, OG_LOCALES } from "@/lib/locale";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const title = `${SITE_NAME} — Frontend software engineer`;
const description =
  "Frontend software engineer in Barcelona. React, TypeScript, Angular. Previously Dynatrace Dashboards and Notebooks, CREALOGIX banking, T-Systems Justice.";

// Static, request-independent defaults. Per-locale canonical/hreflang/OpenGraph
// live in `app/[locale]/layout.tsx`. Nothing here reads a per-request value —
// doing so would opt the whole route tree into dynamic rendering.
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: ["Marc Fors", "frontend software engineer", "React", "TypeScript", "Angular", "Barcelona"],
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description:
      "Seven-plus years in observability, fintech, banking and government. Based in Barcelona. Open to frontend software engineer roles.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: OG_LOCALES[DEFAULT_LOCALE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// The `<html>` / `<body>` shell lives in `app/[locale]/layout.tsx` so the `lang`
// attribute can follow the URL locale without reading a per-request value here.
// Routes outside `[locale]` (`not-found`, `global-error`) render their own shell.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
