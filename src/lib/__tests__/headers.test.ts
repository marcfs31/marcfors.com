import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";

async function headerRules() {
  const rules = await nextConfig.headers!();
  return rules;
}

describe("next.config headers()", () => {
  it("applies the security headers to every path", async () => {
    const rules = await headerRules();
    const all = rules.find((r) => r.source === "/:path*");
    expect(all?.headers.map((h) => h.key)).toContain("Content-Security-Policy");
    expect(all?.headers.map((h) => h.key)).toContain("Strict-Transport-Security");
  });

  it("adds X-Robots-Tag noindex to /print and /lab, bare and locale-prefixed", async () => {
    const rules = await headerRules();
    const noindex = rules.filter((r) =>
      r.headers.some((h) => h.key === "X-Robots-Tag" && /noindex/.test(h.value)),
    );
    const sources = noindex.map((r) => r.source);
    expect(sources).toEqual(
      expect.arrayContaining(["/print", "/:locale/print", "/lab/:path*", "/:locale/lab/:path*"]),
    );
    // the site root is never tagged noindex
    expect(sources).not.toContain("/:path*");
  });
});
