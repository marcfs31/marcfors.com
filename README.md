# marcfors.com

Personal site for Marc Fors. Observatory desk. Locales: `/` English, `/es`, `/ca`, `/it`, `/pt`, `/de`. Print CV at `/print`. Case study: `/work/iterm-studio`.

Source: [github.com/marcfs31/marcfors.com](https://github.com/marcfs31/marcfors.com). Live: [marcfors.com](https://marcfors.com).

The CV is the source of truth for employment, education, skills and languages. GitHub supplies the live public-repo list. Public repositories get a source link; private work is listed without exposing the repo.

Recruiters and custom-app inquiries: [developer@marcfors.com](mailto:developer@marcfors.com).

## Run

```bash
npm install
npm run dev
```

```bash
npm test
npm run ci
```

## Domain (`marcfors.com`)

GitHub Actions CI runs on every push. Production deploys through `.github/workflows/production.yml` once these GitHub secrets exist:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You still have to do the parts that sit on your accounts:

1. In Vercel → Project → Domains, add `marcfors.com` and `www.marcfors.com`.
2. At the domain registrar:

   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`

TLS certificates are issued by Vercel after DNS answers correctly. No extra env vars are required for the site itself.

## Agents

Grok reads `AGENTS.md` and `.grok/rules/`. Project skills: `signal-desk`, `portfolio-locales`, `portfolio-launch`. `GROK.md` and `CLAUDE.md` point at the same contract.
