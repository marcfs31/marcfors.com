import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { AA_NORMAL, contrastRatio } from "@/lib/contrast";
import { PALETTE_THEMES, resolveTheme, THEME_CHOICES } from "@/lib/theme";
import { cssVars, THEME_PALETTES } from "@/lib/themePalettes";

const css = readFileSync(path.resolve(__dirname, "../../app/globals.css"), "utf8");

describe("themes", () => {
  it("ships a CSS block for every palette token", () => {
    expect(PALETTE_THEMES).toEqual(["light", "dark", "green", "blue", "red"]);
    expect(THEME_CHOICES).toEqual(["system", ...PALETTE_THEMES]);
    for (const name of PALETTE_THEMES) {
      const vars = cssVars(THEME_PALETTES[name]);
      expect(css).toContain(`[data-theme="${name}"]`);
      expect(css).toContain(vars["--ink"]);
      expect(css).toContain(vars["--brass"]);
      expect(css).toContain(vars["--signal"]);
    }
    expect(css).toContain(".theme-dot-system");
  });

  it("resolves system to the OS light or dark palette", () => {
    expect(resolveTheme("system", true)).toBe("light");
    expect(resolveTheme("system", false)).toBe("dark");
    expect(resolveTheme("green", true)).toBe("green");
  });

  it("keeps body copy and CTAs above AA in every theme", () => {
    for (const name of PALETTE_THEMES) {
      const p = THEME_PALETTES[name];
      expect(contrastRatio(p.fg, p.bg), `${name} paper/ink`).toBeGreaterThanOrEqual(AA_NORMAL);
      expect(contrastRatio(p.accentFg, p.accent), `${name} cta`).toBeGreaterThanOrEqual(AA_NORMAL);
      expect(contrastRatio(p.signal, p.bg), `${name} signal`).toBeGreaterThanOrEqual(AA_NORMAL);
    }
  });
});
