import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  formatVital,
  HEALTH_LINE_MIN_PX,
  METER_VALUE_MIN_CH,
  ratingFor,
  VITAL_GOOD,
  VITAL_NAMES,
  VITALS_CARD_MIN_PX,
} from "@/lib/vitals";

const srcRoot = path.resolve(__dirname, "../..");

function source(rel: string): string {
  return readFileSync(path.join(srcRoot, rel), "utf8");
}

describe("displayed signals keep a stable layout", () => {
  it("renders a reserved meter for every vital, including pending", () => {
    const board = source("components/SignalBoard.tsx");
    expect(board).toContain("VITAL_NAMES.map");
    expect(board).toContain("meter-value");
    expect(board).toContain("vitals-card");
    expect(board).toContain("health-line");
    expect(board).not.toMatch(/vitals\.filter/);
    expect(board).not.toMatch(/\{row &&/);
    expect(VITAL_NAMES).toHaveLength(5);
  });

  it("CSS reserves width and height so pending values cannot shift the desk", () => {
    const css = source("app/globals.css");
    expect(css).toContain("font-variant-numeric: tabular-nums");
    expect(css).toContain(`min-width: ${METER_VALUE_MIN_CH}ch`);
    expect(css).toContain(`min-height: ${VITALS_CARD_MIN_PX}px`);
    expect(css).toContain(`min-height: ${HEALTH_LINE_MIN_PX}px`);
    expect(css).toMatch(/\.hero \{[\s\S]*contain: layout/);
    expect(css).toMatch(/\.card \{[\s\S]*contain: layout/);
    expect(css).toContain("scrollbar-gutter: stable");
    expect(css).toMatch(/\.tip \{[\s\S]*position: absolute/);
    expect(css).toContain("white-space: nowrap");
  });

  it("explains each web vital without shifting layout", () => {
    const board = source("components/SignalBoard.tsx");
    expect(board).toContain("vital-tip");
    expect(board).toContain("VITAL_TITLES");
    expect(board).toContain("formatGoodCeiling");
    expect(board).toContain('role="tooltip"');
  });

  it("does not restore locale in an effect after first paint", () => {
    const desk = source("components/Desk.tsx");
    expect(desk).not.toMatch(/\buseEffect\b/);
    expect(desk).toContain("initialLocale");
    expect(desk).toContain("--spot-x");
    expect(desk).not.toMatch(/setSpot/);
    expect(source("app/layout.tsx")).toContain('display: "swap"');
    expect(source("app/page.tsx")).toContain("initialLocale");
    expect(desk).toContain("<h1>{SITE_NAME}</h1>");
    expect(desk).toContain('className="role"');
    expect(desk).toContain("SITE_REPO");
    expect(desk).toContain("useFoldScroll");
    expect(desk).toContain("ThemeSwitcher");
    expect(source("components/ThemeSwitcher.tsx")).toContain("writeTheme");
    expect(source("lib/theme.ts")).toContain("prefers-color-scheme");
    expect(desk).toContain("openId === \"intro\"");
    expect(source("components/Fold.tsx")).toContain("aria-expanded");
    expect(source("app/globals.css")).toContain(".fold:not(.open) .fold-panel");
    expect(source("app/globals.css")).toContain("display: none");
  });

  it("keeps every displayed vital’s good ceiling at the Core Web Vitals bar", () => {
    for (const name of VITAL_NAMES) {
      expect(ratingFor(name, VITAL_GOOD[name])).toBe("good");
      expect(ratingFor(name, VITAL_GOOD[name] + VITAL_GOOD[name] * 0.05)).not.toBe("good");
    }
    expect(VITAL_GOOD.CLS).toBe(0.1);
    expect(formatVital("CLS", 0.012)).toBe("0.012");
    expect(formatVital("LCP", 1200.4)).toBe("1200 ms");
  });
});
