---
name: dependabot-triage
description: >
  Verify and merge a Dependabot version bump for marcfors.com. Use when a
  Dependabot PR needs a decision — the auto-merge workflow only handles
  dev-dependency patch/minor, github-actions, and production patch bumps, so
  anything it labelled `needs-manual-review` (production minor/major, dev-dep
  major) lands here.
---

# Triage a Dependabot bump

The GitHub workflow `.github/workflows/dependabot-automerge.yml` already merges
the low-risk bumps once CI is green. You are here because a bump is **not** in
that set: a production-dependency minor or major, or a dev-dependency major.

## 1. Identify the bump

```bash
gh pr view <PR> --json title,body,headRefName
gh pr diff <PR> -- package.json           # the version delta
```

`package.json` production deps are `next`, `react`, `react-dom`, `web-vitals`.
Everything else is `devDependencies`.

## 2. Read what changed between the two versions

- **`next`** — a major is a real migration. Re-read `node_modules/next/dist/docs/`
  (the "This is NOT the Next.js you know" rule in `AGENTS.md`). Check
  `04-community` / upgrade guides for breaking changes. Look hard at: App Router
  APIs used in `src/app/**`, `proxy.ts` (middleware), `next.config.ts` header
  handling, `generateStaticParams` / static export (the site must stay
  prerendered — `x-nextjs-prerender: 1`), `next/font`, `next/image`.
- **`react` / `react-dom`** — check the React blog / changelog for the target
  major. Exercised heavily: `useSyncExternalStore` (`src/lib/prefs.ts`),
  `useEffect` cleanup in `WordAtlas.tsx`, `useId`, Suspense/stylesheet handling
  (relevant to `globals.css` ordering).
- **`web-vitals`** — a major usually renames metric callbacks or changes the
  payload shape. Check every `on*` import and the `Metric` type in
  `src/lib/vitals.ts` and `src/components/SignalBoard.tsx`, and the
  `isVitalPayload` validator + `/api/vitals` route.
- **`vitest` / `@vitest/coverage-v8`** — majors move config keys. Check
  `vitest.config.ts` (the `projects` split, coverage `thresholds`) and
  `src/test/setup.ts`. `vitest` and its coverage package must move together.
- **`eslint` / `eslint-config-next`** — a major is usually flat-config / rule
  changes. `eslint.config.mjs` is already flat config. `eslint-config-next`
  should track the installed `next` version.
- **`@types/node`** — keep it on the major that matches `engines.node`
  (currently `>=22`), i.e. `^22`. Reject bumps that jump ahead of the runtime.
- **`@testing-library/*`, `jsdom`, `playwright`, `vitest-axe`** — majors can
  change matchers or the DOM env. Let CI (component + e2e) be the judge.

## 3. Verify locally

```bash
git fetch origin && git checkout <dependabot-branch>
npm ci
npm run ci          # privacy + coverage + typecheck + lint + audit + build
npm run test:e2e    # Playwright — only if the bump touches runtime or test DOM
```

Then run the app and click through the risk area (`skill: run`), especially for
`next` / `react` bumps: home scan, locale + theme switch, `/work/wordkeep` atlas
interaction, `/print`.

## 4. Decide

- **CI green + no API surface touched + app verified** → merge.
  ```bash
  gh pr review --approve <PR>
  gh pr merge --squash --delete-branch <PR>
  ```
- **CI red, or a breaking change reaches our code** → do the migration in the
  same PR (push onto the Dependabot branch) if it is small; otherwise comment on
  the PR with the specific blocker and leave it open.
- Never merge a red bump to make the PR list shorter.

## 5. After merging

If several Dependabot PRs are open, merged one can leave the others behind
`main`. Comment `@dependabot rebase` on each remaining one so its CI re-runs
against the new base.
