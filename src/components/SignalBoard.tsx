"use client";

import { useEffect, useState } from "react";
import type { AuditSnapshot } from "@/lib/audit";
import { SECURITY_CONTROL_IDS } from "@/lib/securityHeaders";
import {
  formatGoodCeiling,
  formatVital,
  ratingFor,
  VITAL_NAMES,
  VITAL_TITLES,
  type VitalName,
  type VitalPayload,
} from "@/lib/vitals";
import type { Locale } from "@/lib/locale";
import { copy } from "@/data/copy";

type Health = {
  ok: boolean;
  version: string;
  commit: string;
  region: string;
  audit: AuditSnapshot;
};

export function SignalBoard({
  audit,
  locale,
  showHeading = true,
}: {
  audit: AuditSnapshot;
  locale: Locale;
  showHeading?: boolean;
}) {
  const t = copy[locale];
  const [health, setHealth] = useState<Health | null>(null);
  const [vitals, setVitals] = useState<Partial<Record<VitalName, VitalPayload>>>({});

  useEffect(() => {
    const started = performance.now();
    fetch("/api/health")
      .then((res) => res.json())
      .then((body: Health) => {
        setHealth({ ...body, region: `${body.region} · ${Math.round(performance.now() - started)}ms` });
      })
      .catch(() => {
        /* keep the build-time audit snapshot */
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void import("web-vitals").then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      const report = (metric: { name: string; value: number; id: string }) => {
        if (cancelled) return;
        const name = metric.name as VitalName;
        const payload: VitalPayload = {
          name,
          value: metric.value,
          id: metric.id.slice(0, 64),
          rating: ratingFor(name, metric.value),
        };
        setVitals((current) => ({ ...current, [name]: payload }));
        void fetch("/api/vitals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      };
      onLCP(report);
      onINP(report);
      onCLS(report);
      onFCP(report);
      onTTFB(report);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = health?.audit ?? audit;
  const commit = health?.commit?.slice(0, 7) ?? "local";

  return (
    <div className="signal-board">
      {showHeading ? <h2>{t.signalTitle}</h2> : null}
      <p className="lede">{t.signalLede}</p>
      <div className="signal-grid">
        <article className="card">
          <div className={shown.ok ? "badge" : "badge private"}>{shown.ok ? t.auditClean : t.auditHot}</div>
          <h3>{t.auditTitle}</h3>
          <p>
            {t.auditBody} {shown.generatedAt ? shown.generatedAt.slice(0, 10) : "—"}.
          </p>
          <div className="chips">
            <span className="chip">critical {shown.critical}</span>
            <span className="chip">high {shown.high}</span>
            <span className="chip">moderate {shown.moderate}</span>
            <span className="chip">low {shown.low}</span>
          </div>
        </article>
        <article className="card vitals-card">
          <div className="badge">{t.obsTitle}</div>
          <h3>{t.vitalsTitle}</h3>
          <div className="meters">
            {VITAL_NAMES.map((name) => {
              const row = vitals[name];
              const tip = `${VITAL_TITLES[name]}. ${t.vitalDefs[name]} ${t.vitalGood}: ${formatGoodCeiling(name)}.`;
              return (
                <div className="meter" key={name}>
                  <button type="button" className="vital-tip" aria-label={`${name}: ${tip}`}>
                    <span>{name}</span>
                    <span className="tip" role="tooltip">
                      <strong>{name}</strong>
                      <span className="tip-title">{VITAL_TITLES[name]}</span>
                      <span>{t.vitalDefs[name]}</span>
                      <span className="tip-good">
                        {t.vitalGood}: {formatGoodCeiling(name)}
                      </span>
                    </span>
                  </button>
                  <span className={`meter-value ${row?.rating ?? "pending"}`}>
                    {row ? formatVital(name, row.value) : "—"}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="health-line muted">
            <span>{t.healthLine}</span>
            <span className="health-meta">
              {health ? `${health.version} · ${commit} · ${health.region}` : t.healthWaiting}
            </span>
          </p>
        </article>
      </div>
      <ul className="control-list">
        {SECURITY_CONTROL_IDS.map((id) => (
          <li key={id}>{t.controls[id]}</li>
        ))}
      </ul>
      <p className="muted">
        <a href="/.well-known/security.txt">security.txt</a>
        {" · "}
        <a href="/api/health">/api/health</a>
      </p>
    </div>
  );
}


