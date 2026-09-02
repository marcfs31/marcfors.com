import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

const SKIP =
  /^\/(?:api|_next|icon|apple-icon|opengraph-image|robots\.txt|sitemap\.xml|manifest\.webmanifest|\.well-known)(?:\/|$|\.)/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (SKIP.test(pathname) || pathname.includes(".")) {
    return NextResponse.next();
  }

  const first = pathname.split("/").filter(Boolean)[0];

  if (first === DEFAULT_LOCALE) {
    const rest = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url);
  }

  const locale = isLocale(first) ? first : DEFAULT_LOCALE;
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);

  if (!isLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url, { request: { headers } });
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
