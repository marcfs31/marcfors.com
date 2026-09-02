"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { copy } from "@/data/copy";
import type { Locale } from "@/lib/locale";
import { isLocale, LOCALE_CODES, LOCALE_LABELS, LOCALES, stripLocale, withLocale } from "@/lib/locale";
import { writeLocale } from "@/lib/prefs";

export function LanguageSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const router = useRouter();
  const t = copy[locale];
  const rest = stripLocale(pathname);

  return (
    <>
      <div className="langs" role="group" aria-label={t.lang}>
        {LOCALES.map((code) => (
          <Link
            key={code}
            href={withLocale(code, rest)}
            lang={code}
            hrefLang={code}
            aria-label={LOCALE_LABELS[code]}
            aria-current={locale === code ? "page" : undefined}
            onClick={() => writeLocale(code)}
          >
            {LOCALE_CODES[code]}
          </Link>
        ))}
      </div>
      <label className="lang-select-wrap">
        <span className="vh">{t.lang}</span>
        <select
          className="lang-select"
          aria-label={t.lang}
          value={locale}
          onChange={(event) => {
            const next = event.target.value;
            if (!isLocale(next)) return;
            writeLocale(next);
            router.push(withLocale(next, rest));
          }}
        >
          {LOCALES.map((code) => (
            <option key={code} value={code} lang={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
