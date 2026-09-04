"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/locale";
import {
  ATLAS_COPY,
  ATLAS_STATS,
  WORD_ATLAS,
  WORDKEEP_GRAPH_URL,
  WORDKEEP_URL,
  type AtlasRelation,
} from "@/data/wordAtlas";

const RELATIONS: AtlasRelation[] = ["syn", "ant", "tr", "rel"];
const LANGS: Array<{ code: string; count: number }> = [
  { code: "EN", count: 30 },
  { code: "ES", count: 9 },
  { code: "FR", count: 9 },
  { code: "DE", count: 8 },
];

/**
 * A frozen snapshot of the Wordkeep Atlas, drawn to a canvas with a tiny
 * self-contained force layout — no graph library. Themed from the desk's CSS
 * variables; links out to the live 3D version.
 */
export function WordAtlas({ locale }: { locale: Locale }) {
  const t = ATLAS_COPY[locale];
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapNode = wrapRef.current;
    const canvasNode = canvasRef.current;
    if (!wrapNode || !canvasNode) return;
    const context = canvasNode.getContext("2d");
    if (!context) return; // no 2d context (e.g. jsdom) — the legend + links still stand alone

    // Re-bind with explicit non-null types: the nested draw/step/resize
    // functions below are closures, and TS does not carry the narrowing from
    // the guards above into function declarations that run later.
    const wrap: HTMLDivElement = wrapNode;
    const canvas: HTMLCanvasElement = canvasNode;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = WORD_ATLAS.nodes.length;
    const edges = WORD_ATLAS.edges;

    const adj: number[][] = WORD_ATLAS.nodes.map(() => []);
    edges.forEach(([a, b]) => {
      adj[a].push(b);
      adj[b].push(a);
    });

    type P = { x: number; y: number; vx: number; vy: number };
    const pts: P[] = WORD_ATLAS.nodes.map((_, i) => {
      const a = (i / N) * Math.PI * 2;
      return { x: 0.5 + Math.cos(a) * 0.36, y: 0.5 + Math.sin(a) * 0.36, vx: 0, vy: 0 };
    });

    let W = 1;
    let H = 1;
    let raf = 0;
    let focus = -1;

    const readColors = () => {
      const c = getComputedStyle(document.documentElement);
      const g = (n: string) => c.getPropertyValue(n).trim() || "#888";
      return {
        node: g("--paper-dim"),
        focus: g("--paper"),
        syn: g("--signal"),
        ant: g("--danger"),
        tr: g("--brass"),
        rel: g("--muted"),
        label: g("--paper"),
        serif: c.getPropertyValue("--serif").trim() || "Georgia, serif",
      };
    };
    let COL = readColors();
    const relColor = (r: AtlasRelation) =>
      r === "syn" ? COL.syn : r === "ant" ? COL.ant : r === "tr" ? COL.tr : COL.rel;
    const relDash = (r: AtlasRelation) => (r === "ant" ? [5, 4] : r === "rel" ? [1.5, 4] : []);

    const px = (p: P) => p.x * W;
    const py = (p: P) => p.y * H;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const near = new Set<number>();
      if (focus >= 0) {
        near.add(focus);
        adj[focus].forEach((n) => near.add(n));
      }

      ctx.lineCap = "round";
      edges.forEach(([a, b, r]) => {
        const lit = focus >= 0 && (a === focus || b === focus);
        const faded = focus >= 0 && !lit;
        ctx.globalAlpha = faded ? 0.06 : 0.55;
        ctx.strokeStyle = relColor(r);
        ctx.lineWidth = lit ? 1.8 : 1;
        ctx.setLineDash(relDash(r));
        ctx.beginPath();
        ctx.moveTo(px(pts[a]), py(pts[a]));
        ctx.lineTo(px(pts[b]), py(pts[b]));
        ctx.stroke();
      });
      ctx.setLineDash([]);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      pts.forEach((p, i) => {
        const isFocus = i === focus;
        const faded = focus >= 0 && !near.has(i);
        const r = isFocus ? 5.5 : 3.2;
        ctx.globalAlpha = faded ? 0.18 : 1;
        ctx.beginPath();
        ctx.arc(px(p), py(p), r, 0, Math.PI * 2);
        ctx.fillStyle = isFocus ? COL.focus : COL.node;
        ctx.fill();
        if (near.has(i) || focus < 0) {
          ctx.globalAlpha = faded ? 0.2 : isFocus ? 1 : 0.75;
          ctx.fillStyle = isFocus ? COL.label : COL.node;
          ctx.font = `${isFocus ? "600 13px" : "500 11px"} ${COL.serif}`;
          ctx.fillText(WORD_ATLAS.nodes[i].label, px(p), py(p) - r - 8);
        }
      });
      ctx.globalAlpha = 1;
    }

    function step() {
      let moved = 0;
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy || 0.0001;
          const rep = 0.0012 / d2;
          fx += dx * rep;
          fy += dy * rep;
        }
        fx += (0.5 - a.x) * 0.02;
        fy += (0.5 - a.y) * 0.02;
        a.vx = (a.vx + fx) * 0.82;
        a.vy = (a.vy + fy) * 0.82;
      }
      edges.forEach(([ai, bi, r]) => {
        const a = pts[ai];
        const b = pts[bi];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        const rest = r === "tr" ? 0.26 : r === "syn" ? 0.12 : r === "rel" ? 0.2 : 0.17;
        const k = ((d - rest) / d) * (r === "syn" ? 0.06 : 0.035);
        a.vx += dx * k;
        a.vy += dy * k;
        b.vx -= dx * k;
        b.vy -= dy * k;
      });
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        // Extra headroom at the top: labels draw above their node, so a node
        // clamped too close to y=0 gets its own label clipped by the canvas edge.
        a.x = Math.min(0.97, Math.max(0.04, a.x + a.vx));
        a.y = Math.min(0.94, Math.max(0.13, a.y + a.vy));
        moved += Math.abs(a.vx) + Math.abs(a.vy);
      }
      return moved;
    }

    function loop() {
      const moved = step();
      draw();
      if (moved > 0.002) raf = requestAnimationFrame(loop);
      else raf = 0;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    resize();
    if (reduce) {
      for (let i = 0; i < 260; i++) step();
      draw();
    } else {
      loop();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onThemeChange = () => {
      COL = readColors();
      draw();
    };
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onThemeChange);

    const hit = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;
      let best = -1;
      let bd = 16 * 16;
      for (let i = 0; i < N; i++) {
        const dx = px(pts[i]) - mx;
        const dy = py(pts[i]) - my;
        const d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      if (best !== focus) {
        focus = best;
        canvas.style.cursor = best >= 0 ? "pointer" : "default";
        if (!raf) draw();
      }
    };
    const clear = () => {
      if (focus !== -1) {
        focus = -1;
        if (!raf) draw();
      }
    };
    canvas.addEventListener("pointermove", hit);
    canvas.addEventListener("pointerleave", clear);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onThemeChange);
      canvas.removeEventListener("pointermove", hit);
      canvas.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <figure className="atlas">
      <div className="atlas-stage" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="atlas-canvas"
          role="img"
          aria-label={`Wordkeep Atlas — ${ATLAS_STATS.words} words in ${ATLAS_STATS.languages} languages, ${ATLAS_STATS.links} links`}
        />
      </div>
      <figcaption className="atlas-legend">
        <span className="atlas-count">{t.hint}</span>
        <span className="atlas-keys">
          {RELATIONS.map((r) => (
            <span className="atlas-key" key={r} data-rel={r}>
              <i aria-hidden="true" />
              {t.rel[r]}
            </span>
          ))}
          {LANGS.map((l) => (
            <span className="atlas-key atlas-lang" key={l.code}>
              {l.code}
              <em>{l.count}</em>
            </span>
          ))}
        </span>
      </figcaption>
      <div className="links atlas-links">
        <a href={WORDKEEP_GRAPH_URL} target="_blank" rel="noopener noreferrer">
          {t.open}
        </a>
        <a href={WORDKEEP_URL} target="_blank" rel="noopener noreferrer">
          {t.visit}
        </a>
      </div>
    </figure>
  );
}
