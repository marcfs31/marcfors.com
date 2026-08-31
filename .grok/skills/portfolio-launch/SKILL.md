---
name: portfolio-launch
description: Production launch for marcfors.com — GitHub Actions, Vercel, versioning, privacy scan, security.txt. Use when setting up CI, deploying, releasing, or publishing the GitHub repo. Slash command: /portfolio-launch.
---

# Launch

Facts that must not be restated here live in `AGENTS.md`.

## GitHub

- Public repo: `marcfs31/marcfors.com` (`SITE_REPO` in `src/lib/site.ts`).
- Default branch: `main`.
- CI: `.github/workflows/ci.yml` (privacy, test, typecheck, lint, audit, build).
- CodeQL: `.github/workflows/codeql.yml`.
- Production deploy: `.github/workflows/production.yml` needs `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Release

Bump `package.json` and `SITE_VERSION` together, add a `CHANGELOG.md` section, tag `vX.Y.Z`. Git author is `Marc Fors <developer@marcfors.com>`.

## Do not

- Add analytics, pixels, or third-party scripts (CSP and `npm run privacy` will fail).
- Commit `.env*`, `.vercel/`, or a Gmail address.
- Link private GitHub repos from `src/data/projects.ts`.
