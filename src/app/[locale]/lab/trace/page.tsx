import Link from "next/link";
import { notFound } from "next/navigation";
import { TraceTheater } from "@/components/TraceTheater";
import { copy } from "@/data/copy";
import { isLocale, withLocale } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: `Trace Theater — ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default async function TracePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  return (
    <div className="wrap">
      <header className="top">
        <Link className="brand" href={withLocale(locale, "/")}>
          {SITE_NAME}
        </Link>
        <Link href={withLocale(locale, "/")}>{t.homeCta}</Link>
      </header>
      <main id="main">
        <TraceTheater
          strings={{
            traceTitle: t.traceTitle,
            traceLede: t.traceLede,
            tracePaste: t.tracePaste,
            traceSample: t.traceSample,
            traceClear: t.traceClear,
            traceInvalid: t.traceInvalid,
            traceEmpty: t.traceEmpty,
            traceSpans: t.traceSpans,
            traceDuration: t.traceDuration,
          }}
        />
      </main>
    </div>
  );
}
