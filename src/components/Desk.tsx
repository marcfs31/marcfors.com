"use client";

import { useMemo, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Emphasize } from "@/components/Emphasize";
import { Fold } from "@/components/Fold";
import { careerBreak, contact, copy, education, experience, languages, skills } from "@/data/copy";
import type { Locale } from "@/lib/locale";
import { LOCALE_CODES, LOCALE_LABELS, LOCALES } from "@/lib/locale";
import { featured, lab, type Project } from "@/data/projects";
import type { AuditSnapshot } from "@/lib/audit";
import { RECRUITER_SKILLS, RECRUITER_TOKENS } from "@/lib/emphasize";
import type { GhRepo } from "@/lib/github";
import { mailTo } from "@/lib/mail";
import { writeLocale } from "@/lib/prefs";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { SITE_NAME, SITE_REPO } from "@/lib/site";
import { useFoldScroll } from "@/lib/useFoldScroll";
import { SignalBoard } from "@/components/SignalBoard";

function projectLinks(project: Project, locale: Locale) {
  const t = copy[locale];
  return (
    <div className="links">
      {project.live ? (
        <a href={project.live} target="_blank" rel="noopener noreferrer">
          {t.live}
        </a>
      ) : null}
      {project.href ? (
        <a href={project.href}>{t.live}</a>
      ) : null}
      {project.repo && !project.private ? (
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          {t.source}
        </a>
      ) : project.private ? (
        <span className="badge private">{t.private}</span>
      ) : null}
    </div>
  );
}

function ProofLine({ text }: { text: string }) {
  return (
    <p className="proof-line">
      {text.split(" · ").map((token, index) => (
        <span key={token}>
          {index > 0 ? " · " : null}
          {RECRUITER_SKILLS.has(token) || token === "Barcelona" || token === "Dynatrace Dashboards" ? (
            <strong className="hit">{token}</strong>
          ) : (
            token
          )}
        </span>
      ))}
    </p>
  );
}

export function Desk({
  repos,
  audit,
  initialLocale,
}: {
  repos: GhRepo[];
  audit: AuditSnapshot;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = copy[locale];
  const hits = t.hits;
  const tokens = [...hits, ...RECRUITER_TOKENS];
  const spotlight = featured.filter((item) => item.spotlight);
  const restWork = featured.filter((item) => !item.spotlight);

  function setLang(next: Locale) {
    setLocale(next);
    writeLocale(next);
  }

  const extraRepos = useMemo(() => {
    const featuredNames = new Set(featured.map((item) => item.name.toLowerCase().replace(/\s+/g, "-")));
    const featuredUrls = new Set(featured.map((item) => item.repo).filter(Boolean));
    return repos.filter((repo) => {
      const slug = repo.name.toLowerCase();
      if (featuredNames.has(slug)) return false;
      if (featuredUrls.has(repo.html_url)) return false;
      return true;
    });
  }, [repos]);

  const foldIds = useMemo(() => {
    const ids = ["intro", "work", "projects", "contact", "skills", "signal", "lab"];
    if (extraRepos.length > 0) ids.push("more");
    ids.push("edu");
    return ids;
  }, [extraRepos.length]);

  const { openId, open } = useFoldScroll(foldIds);

  return (
    <div
      className="desk"
      onPointerMove={(event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY}px`);
      }}
    >
      <div className="grid" />
      <div className="spot" />
      <a className="skip" href="#main">
        {t.skipToContent}
      </a>
      <div className="wrap">
        <header className="top">
          <a className="brand" href="#intro">
            <BrandMark />
            {SITE_NAME}
          </a>
          <nav className="nav" aria-label={t.navLabel}>
            <a href="#work" onClick={() => open("work")}>
              {t.workTitle}
            </a>
            <a href="#projects" onClick={() => open("projects")}>
              {t.projectsTitle}
            </a>
            <a href="#contact" onClick={() => open("contact")}>
              {t.contactTitle}
            </a>
            <a href={SITE_REPO} target="_blank" rel="noopener noreferrer">
              {t.source}
            </a>
            <a className="nav-hire" href={mailTo(t.hireSubject)}>
              {t.hireCta}
            </a>
            <div className="langs" role="group" aria-label={t.lang}>
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  lang={code}
                  aria-label={LOCALE_LABELS[code]}
                  aria-pressed={locale === code}
                  onClick={() => setLang(code)}
                >
                  {LOCALE_CODES[code]}
                </button>
              ))}
            </div>
            <ThemeSwitcher locale={locale} />
          </nav>
        </header>

        <main id="main" className="folds">
          <Fold
            id="intro"
            title={t.kicker}
            open={openId === "intro"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            accent
            onOpen={open}
          >
            <div className="hero">
              <h1>{SITE_NAME}</h1>
              <p className="role">{t.headline}</p>
              <p className="tagline">{t.tagline}</p>
              <div className="meta-row">
                <span className="hit">{t.place}</span>
                <span className="hit">{t.now}</span>
              </div>
              <p className="lede">
                <Emphasize text={t.lede} phrases={hits} />
              </p>
              <ProofLine text={t.proofLine} />
              <div className="cta-row">
                <a className="cta" href={mailTo(t.hireSubject)}>
                  {t.hireCta}
                </a>
                <a className="cta ghost" href={mailTo(t.buildSubject)}>
                  {t.buildCta}
                </a>
              </div>
              <a className="hero-email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </Fold>

          <Fold
            id="work"
            title={t.workTitle}
            open={openId === "work"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <div className="trace">
              <article className="job job-now">
                <div>
                  <div className="org">{t.breakTitle}</div>
                  <div className="when">{careerBreak[locale].when}</div>
                </div>
                <p>
                  <Emphasize text={careerBreak[locale].body} phrases={tokens} />
                </p>
              </article>
              {experience[locale].map((job) => (
                <article className="job" key={job.org + job.when}>
                  <div>
                    <div className="org">{job.org}</div>
                    <div className="title">{job.title}</div>
                    <div className="when">{job.when}</div>
                  </div>
                  <div>
                    <p>
                      <Emphasize text={job.body} phrases={tokens} />
                    </p>
                    <ul className="job-points">
                      {job.points.map((point) => (
                        <li key={point}>
                          <Emphasize text={point} phrases={tokens} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Fold>

          <Fold
            id="projects"
            title={t.projectsTitle}
            open={openId === "projects"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <div className="grid-cards">
              {spotlight.map((project) => (
                <article className="card" key={project.name}>
                  <div className={project.private ? "badge private" : "badge"}>
                    {project.live ? t.live : project.private ? t.private : t.public}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.blurb[locale]}</p>
                  <div className="chips">
                    {project.stack.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  {projectLinks(project, locale)}
                </article>
              ))}
            </div>
            {restWork.length > 0 ? (
              <div className="rest-work">
                {restWork.map((project) => (
                  <div className="repo-row" key={project.name}>
                    <div>
                      <strong>{project.name}</strong>
                      <div className="muted">{project.blurb[locale]}</div>
                    </div>
                    {projectLinks(project, locale)}
                  </div>
                ))}
              </div>
            ) : null}
          </Fold>

          <Fold
            id="contact"
            title={t.contactTitle}
            open={openId === "contact"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <p className="lede">
              <Emphasize text={t.contactLede} phrases={hits} />
            </p>
            <div className="path-grid">
              <article className="card path-card">
                <div className="kicker">{t.hirePath}</div>
                <h3>{t.hireCta}</h3>
                <p>
                  <Emphasize text={t.hirePathLede} phrases={hits} />
                </p>
                <a className="cta" href={mailTo(t.hireSubject)}>
                  {t.hireCta}
                </a>
              </article>
              <article className="card path-card">
                <div className="kicker">{t.buildPath}</div>
                <h3>{t.buildCta}</h3>
                <p>{t.buildPathLede}</p>
                <a className="cta ghost" href={mailTo(t.buildSubject)}>
                  {t.buildCta}
                </a>
              </article>
            </div>
            <div className="contact-panel">
              <div className="kicker">{t.writeCta}</div>
              <a className="contact-email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <div className="contact">
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </Fold>

          <Fold
            id="skills"
            title={t.skillsTitle}
            open={openId === "skills"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <div className="skill-groups">
              {(Object.keys(skills) as Array<keyof typeof skills>).map((group) => (
                <div key={group}>
                  <div className="skill-label">{t.skillGroups[group]}</div>
                  <div className="chips">
                    {skills[group].map((item) => (
                      <span className={RECRUITER_SKILLS.has(item) ? "chip hit" : "chip"} key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Fold>

          <Fold
            id="signal"
            title={t.signalTitle}
            open={openId === "signal"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <SignalBoard audit={audit} locale={locale} showHeading={false} />
          </Fold>

          <Fold
            id="lab"
            title={t.labTitle}
            open={openId === "lab"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            <p className="lede">{t.labLede}</p>
            <ul className="lab-list">
              {lab.map((idea) => (
                <li key={idea.name}>
                  {idea.href ? <a href={idea.href}>{idea.name}</a> : <strong>{idea.name}</strong>}
                  <span className="muted"> — {idea.blurb[locale]}</span>
                </li>
              ))}
            </ul>
          </Fold>

          {extraRepos.length > 0 ? (
            <Fold
              id="more"
              title={t.moreTitle}
              open={openId === "more"}
              expandLabel={t.expand}
              collapseLabel={t.collapse}
              onOpen={open}
            >
              {extraRepos.slice(0, 8).map((repo) => (
                <div className="repo-row" key={repo.html_url}>
                  <div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                    <div className="muted">{repo.description ?? repo.language}</div>
                  </div>
                  <span className="muted">{repo.language}</span>
                </div>
              ))}
            </Fold>
          ) : null}

          <Fold
            id="edu"
            title={t.eduTitle}
            open={openId === "edu"}
            expandLabel={t.expand}
            collapseLabel={t.collapse}
            onOpen={open}
          >
            {education[locale].map((item) => (
              <p className="edu-line" key={item}>
                {item}
              </p>
            ))}
            <h3 className="subhead">{t.langsTitle}</h3>
            <p>{languages[locale]}</p>
          </Fold>
        </main>

        <footer>
          <span>{t.footer}</span>
          {" · "}
          <a href={SITE_REPO} target="_blank" rel="noopener noreferrer">
            {t.source}
          </a>
        </footer>
      </div>
    </div>
  );
}
