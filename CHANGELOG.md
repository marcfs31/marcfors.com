# Changelog

All notable changes to this project are versioned with [SemVer](https://semver.org/).

## 0.6.0 — 2026-09-02

### Rendering

- The whole localized site is statically prerendered again. The root layout no longer reads a per-request value, so `/`, `/<locale>`, `/work/<slug>`, `/print` and `/lab/trace` ship as static HTML instead of rendering on every request. The `<html>`/`<body>` shell, fonts, JSON-LD and anti-flash script moved into `app/[locale]/layout.tsx`.
- Added a `global-error` boundary with its own shell for failures in the root layout itself.
- Single self-contained 404 surface (`app/not-found.tsx`) with its own shell; it is English-only so it can stay static.

### Fixes

- Sitemap `lastModified` is pinned to the release date instead of `new Date()`, so it no longer tells crawlers every URL changed on every fetch.
- Fold navigation (`j`/`k`/arrows) no longer fights the scroll listener: a short quiet window after a programmatic pin stops `openId` bouncing back.
- Pointer spotlight writes are coalesced to one per animation frame.
- Proof line emphasises every curated token, including the Italian "Barcellona" the old English-only check missed.

### Testing & CI

- Vitest now runs a `node` project for pure logic and a `jsdom` project for components and hooks. New behaviour tests replace the source-string assertions in `proxy` and `signalLayout`, and cover the previously untested `useFoldScroll`, `foldScroll`, `prefs`, `spotlight`, `github`, `sitemap`, `og`, and every component (`Desk`, `SignalBoard`, `TraceTheater`, `Fold`, `Emphasize`, `ThemeSwitcher`, `LanguageSwitcher`, `PrintDesk`, error boundaries). 53 → 119 tests.
- `vitest-axe` fails the build on WCAG violations in the rendered desk.
- Coverage (v8) is collected and gated in `npm run ci`.
- Playwright smoke suite (`npm run test:e2e`) drives a local production build: home, locale switch, theme persistence, keyboard folds, print CV, `/api/health`, 404.
- Lighthouse CI runs against that local build instead of `https://marcfors.com/`, three runs, asserting performance / accessibility / SEO scores plus CLS, LCP and TBT — so a regression fails the PR, not the deploy.
- CI splits into `verify` and `e2e` jobs.

### Hardening

- Error observability, first-party only: `onRequestError` in `instrumentation.ts` logs structured server errors, and a `/api/errors` beacon (rate-limited, size-capped, validated) receives client-boundary reports from `error.tsx` and `global-error.tsx`. No third-party SDK, so the CSP stays intact.
- `github.ts` sends an optional `Authorization: Bearer $GITHUB_TOKEN` to lift the unauthenticated shared-IP rate limit, and logs when the repo fetch fails instead of silently returning an empty list.
- `@types/node` bumped to `^22` to match the Node version.

Deferred (follow-up): splitting `copy.ts` into per-locale files, `@layer`-ing `globals.css`, and a hash/nonce CSP. A nonce CSP needs per-request rendering, which would undo the static generation above; Next's own inline bootstrap scripts have build-varying hashes, so `script-src` keeps `'unsafe-inline'` for now.

## 0.5.0 — 2026-09-02

- System theme swatch follows the OS live; daylight/observatory stay explicit picks
- First visit redirects from `Accept-Language` (crawlers stay on English); language switcher writes the cookie so you can get back
- Compact mobile header: language select plus System/Dark/Light, extra palettes stay on wider screens
- Habit Breaker case study (live app only, no private repo)
- Hire line dates availability from Dec 2025; hero proof metric (~20% coverage)
- Per-locale Open Graph and Twitter images; JSON-LD `knowsAbout` / `seeks`
- Keyboard hint in the footer; Next.js 16 `proxy.ts` replaces `middleware.ts`

## 0.4.2 — 2026-09-02

- Revert the autocapitalize override from 0.4.1

## 0.4.0 — 2026-09-02

- Locale prefixes (`/es`, `/de`, …) with hreflang and sitemap entries
- Hire line under the role; sticky fold titles; j/k and arrow keys move folds
- iTerm Studio case study; print/PDF CV from the same copy
- Lab and extra repos tucked under More; Lighthouse CLS budget 0.1 in CI

## 0.3.0 — 2026-09-02

- Theme switcher: daylight paper, observatory, signal green, night blue, footlights. Follows `prefers-color-scheme` until you pick one.

## 0.2.2 — 2026-09-02

- Folds actually show their content (the 0fr grid row was collapsing open panels to zero height)

## 0.2.1 — 2026-09-02

- Sections fold: intro open by default, others collapsed; scrolling opens the current fold and closes the previous
- Recruiter highlights on years, stack, location, hire path, and key skills

## 0.2.0 — 2026-08-31

- Public source at `github.com/marcfs31/marcfors.com`, linked from the desk, selected work, and footer
- Hero title is Marc Fors; role stays the recruiter line under it
- Signal-lamp icon, web-vital hover plaques, six locales (EN/ES/CA/IT/PT/DE)
- Layout-shift fixes so CLS can stay in the good band (no full-desk re-render on pointer move, reserved hero, font fallback)
- Production GitHub workflows (CI, CodeQL, Vercel deploy), security.txt languages, 404/error, Trace Theater route

## 0.1.1 — 2026-08-31

- Selected work: iTerm Studio in (public repo + hosted gallery), SmartGarden out of the desk and the public-repo listing

## 0.1.0 — 2026-08-31

First public release of the observatory portfolio for [marcfors.com](https://marcfors.com).

- CV-accurate employment: career break from Dec 2025, Dynatrace through Nov 2025, then CREALOGIX and T-Systems
- Bilingual EN/ES desk, live GitHub public-repo list, source links only when the repo is public
- Recruiter and custom-app contact through `developer@marcfors.com`
- Security headers (HSTS, CSP, COOP), `security.txt`, first-party web vitals, `/api/health`, npm audit snapshot
- Vitest suite and GitHub Actions CI (privacy scan, test, typecheck, lint, audit, build)
