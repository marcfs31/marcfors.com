# Changelog

All notable changes to this project are versioned with [SemVer](https://semver.org/).

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
