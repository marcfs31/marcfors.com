import Link from "next/link";
import { cookies } from "next/headers";
import { TraceTheater } from "@/components/TraceTheater";
import { copy } from "@/data/copy";
import { DEFAULT_LOCALE, isLocale, LOCALE_KEY } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: `Trace Theater — ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default async function TracePage() {
  const stored = (await cookies()).get(LOCALE_KEY)?.value;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  const t = copy[locale];

  return (
    <div className="wrap">
      <header className="top">
        <Link className="brand" href="/">
          {SITE_NAME}
        </Link>
        <Link href="/">{t.homeCta}</Link>
      </header>
      <main id="main">
        <TraceTheater locale={locale} />
      </main>
    </div>
  );
}
