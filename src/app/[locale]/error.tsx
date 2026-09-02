"use client";

import { useEffect } from "react";
import { copy } from "@/data/copy";
import { reportClientError } from "@/lib/errors";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export default function ErrorView({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  const stored = typeof document !== "undefined" ? document.documentElement.lang : DEFAULT_LOCALE;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  const t = copy[locale];

  useEffect(() => {
    reportClientError(error, "client-boundary");
  }, [error]);

  return (
    <div className="wrap">
      <p className="kicker">{SITE_NAME}</p>
      <h1>{t.errorTitle}</h1>
      <p className="lede">{t.errorBody}</p>
      <button type="button" className="cta" onClick={reset}>
        {t.retryCta}
      </button>
    </div>
  );
}
