import Link from "next/link";
import { cookies } from "next/headers";
import { copy } from "@/data/copy";
import { DEFAULT_LOCALE, isLocale, LOCALE_KEY } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export default async function NotFound() {
  const stored = (await cookies()).get(LOCALE_KEY)?.value;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  const t = copy[locale];

  return (
    <div className="wrap">
      <p className="kicker">{SITE_NAME}</p>
      <h1>{t.notFoundTitle}</h1>
      <p className="lede">{t.notFoundBody}</p>
      <Link className="cta" href="/">
        {t.homeCta}
      </Link>
    </div>
  );
}
