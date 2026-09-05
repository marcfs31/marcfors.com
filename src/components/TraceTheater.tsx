"use client";

import { useMemo, useState } from "react";

export type TraceStrings = {
  traceTitle: string;
  traceLede: string;
  tracePaste: string;
  traceSample: string;
  traceClear: string;
  traceInvalid: string;
  traceEmpty: string;
  traceSpans: string;
  traceDuration: string;
};

const SAMPLE = `{
  "spans": [
    { "name": "GET /", "duration": 42, "status": "ok" },
    { "name": "rsc.render", "duration": 18, "status": "ok" },
    { "name": "github.repos", "duration": 90, "status": "ok" },
    { "name": "vitals.report", "duration": 4, "status": "error" }
  ]
}`;

type Span = { name: string; duration: number; status?: string };

function parseSpans(raw: string): Span[] | null {
  try {
    const body = JSON.parse(raw) as { spans?: unknown };
    if (!Array.isArray(body.spans)) return null;
    const rows: Span[] = [];
    for (const item of body.spans) {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      if (typeof row.name !== "string" || typeof row.duration !== "number") return null;
      rows.push({
        name: row.name.slice(0, 80),
        duration: row.duration,
        status: typeof row.status === "string" ? row.status : "ok",
      });
    }
    return rows;
  } catch {
    return null;
  }
}

export function TraceTheater({ strings: t }: { strings: TraceStrings }) {
  const [raw, setRaw] = useState("");
  const spans = useMemo(() => (raw.trim() ? parseSpans(raw) : []), [raw]);
  const total = spans?.reduce((sum, row) => sum + row.duration, 0) ?? 0;

  return (
    <section className="stage">
      <h1>{t.traceTitle}</h1>
      <p className="lede">{t.traceLede}</p>
      <label className="muted" htmlFor="trace-json">
        {t.tracePaste}
      </label>
      <textarea
        id="trace-json"
        className="stage-input"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        spellCheck={false}
      />
      <div className="stage-actions">
        <button type="button" className="cta" onClick={() => setRaw(SAMPLE)}>
          {t.traceSample}
        </button>
        <button type="button" className="cta ghost" onClick={() => setRaw("")}>
          {t.traceClear}
        </button>
      </div>
      {raw.trim() && spans === null ? <p className="badge private">{t.traceInvalid}</p> : null}
      {spans && spans.length === 0 ? <p className="muted">{t.traceEmpty}</p> : null}
      {spans && spans.length > 0 ? (
        <div>
          <p className="meta-row">
            <span>
              {t.traceSpans}: {spans.length}
            </span>
            <span>
              {t.traceDuration}: {total} ms
            </span>
          </p>
          {spans.map((span, index) => (
            <div className={span.status === "error" ? "span-row error" : "span-row"} key={`${span.name}-${index}`}>
              <strong>{span.name}</strong>
              <span>{span.status}</span>
              <span>{span.duration} ms</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
