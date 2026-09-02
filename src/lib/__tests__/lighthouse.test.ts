import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("lighthouse budget", () => {
  it("fails CI when CLS is above the good ceiling", () => {
    const config = readFileSync(path.resolve(__dirname, "../../../lighthouserc.cjs"), "utf8");
    expect(config).toContain("cumulative-layout-shift");
    expect(config).toContain("0.1");
    expect(config).toContain("https://marcfors.com/");
  });
});
