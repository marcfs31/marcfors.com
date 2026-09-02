"use client";

import { copy } from "@/data/copy";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export default function ErrorView({ reset }: { reset: () => void }) {
  const stored = typeof document !== "undefined" ? document.documentElement.lang : DEFAULT_LOCALE;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  const t = copy[locale];

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
