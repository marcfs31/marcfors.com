import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const srcRoot = path.resolve(__dirname, "../..");

describe("locale proxy", () => {
  it("lives in proxy.ts, not middleware.ts", () => {
    expect(existsSync(path.join(srcRoot, "proxy.ts"))).toBe(true);
    expect(existsSync(path.join(srcRoot, "middleware.ts"))).toBe(false);
    expect(existsSync(path.resolve(srcRoot, "../middleware.ts"))).toBe(false);
  });

  it("rewrites English, redirects remembered or Accept-Language locales, and skips crawlers", () => {
    const source = readFileSync(path.join(srcRoot, "proxy.ts"), "utf8");
    expect(source).toContain("export function proxy");
    expect(source).toContain("preferredLocale");
    expect(source).toContain("isCrawler");
    expect(source).toContain("LOCALE_KEY");
    expect(source).toContain("NextResponse.rewrite");
    expect(source).toContain("NextResponse.redirect");
  });
});
