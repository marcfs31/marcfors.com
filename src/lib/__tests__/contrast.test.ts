import { describe, expect, it } from "vitest";
import { AA_NORMAL, contrastRatio } from "@/lib/contrast";
import { THEME_PALETTES } from "@/lib/themePalettes";

describe("palette contrast", () => {
  it("keeps paper, brass, signal and muted above AA on ink (dark palette)", () => {
    const { bg, fg, accent, signal, muted } = THEME_PALETTES.dark;
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio(accent, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio(signal, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio(muted, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio(bg, accent)).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});
