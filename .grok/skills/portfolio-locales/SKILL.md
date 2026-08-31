---
name: portfolio-locales
description: Add or edit marcfors.com locales (EN/ES/CA/IT/PT/DE). Use when adding a language, translating copy, project blurbs, locale switcher, html lang, or OG locale. Slash command: /portfolio-locales.
---

# Locales

Source of truth for the locale list is `LOCALES` in `src/lib/locale.ts`. Adding a language means all of:

1. Append the code to `LOCALES`, `LOCALE_CODES`, `LOCALE_LABELS` (native name), `OG_LOCALES`.
2. Add a matching `copy`, `experience`, `careerBreak`, `education`, `languages` entry in `src/data/copy.ts`.
3. Add a blurb for that locale on every `featured` and `lab` project.
4. Keep `latin-ext` on the Google fonts in `layout.tsx`.
5. Extend `ANTI_FLASH_SCRIPT` locales in `src/lib/theme.ts` if it inlines the list.

`src/lib/__tests__/copy.test.ts` fails if keys drift. Native names stay in `LOCALE_LABELS`, not in copy.

Locale is a client toggle (cookie + localStorage). Do not invent URL prefixes unless the routing is rebuilt.
