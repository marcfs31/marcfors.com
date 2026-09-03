import path from "node:path";
import { describe, expect, it } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require(path.resolve(__dirname, "../../../lighthouserc.cjs"));

describe("lighthouse budget", () => {
  it("runs against a local build, not production", () => {
    expect(config.ci.collect.startServerCommand).toContain("start");
    for (const url of config.ci.collect.url as string[]) {
      expect(url).toMatch(/^http:\/\/localhost:3000\b/);
    }
    expect(config.ci.collect.numberOfRuns).toBeGreaterThanOrEqual(3);
  });

  it("keeps CLS at the good ceiling and gates LCP, TBT and the perf score", () => {
    const a = config.ci.assert.assertions;
    expect(a["cumulative-layout-shift"]).toEqual(["error", { maxNumericValue: 0.1 }]);
    expect(a["largest-contentful-paint"][1].maxNumericValue).toBeLessThanOrEqual(2500);
    expect(a["total-blocking-time"][1].maxNumericValue).toBeLessThanOrEqual(300);
    expect(a["categories:performance"]).toEqual(["error", { minScore: 0.9 }]);
    expect(a["categories:accessibility"][1].minScore).toBeGreaterThanOrEqual(0.95);
  });
});
