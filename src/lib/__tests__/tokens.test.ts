import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PALETTE_THEMES } from "@/lib/theme";
import { tokensCssFile } from "@/lib/themePalettes";

const tokensPath = path.resolve(__dirname, "../../app/styles/tokens.css");
const onDisk = readFileSync(tokensPath, "utf8");

describe("generated tokens.css", () => {
  it("matches what scripts/gen-tokens.mjs would write from themePalettes.ts", () => {
    // If this fails: run `node scripts/gen-tokens.mjs` and commit the result.
    expect(onDisk).toBe(tokensCssFile());
  });

  it("is a single @layer tokens block covering every palette", () => {
    expect(onDisk).toMatch(/^\/\* GENERATED/);
    expect(onDisk).toContain("@layer tokens {");
    for (const name of PALETTE_THEMES) {
      expect(onDisk).toContain(`[data-theme="${name}"]`);
    }
    expect(onDisk).toContain(":root,");
  });

  it("carries no radius / spacing scale — those are hand-written in scales.css", () => {
    expect(onDisk).not.toContain("--r-");
    expect(onDisk).not.toContain("--s-");
  });
});
