import { describe, expect, it } from "vitest";
import robots, { DISALLOWED } from "@/app/robots";
import { SITE_URL } from "@/lib/site";

describe("robots", () => {
  it("allows the site but disallows the noindex routes, bare and locale-prefixed", () => {
    const { rules, sitemap } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    expect(rule.allow).toBe("/");
    expect(rule.disallow).toEqual(DISALLOWED);
    expect(DISALLOWED).toContain("/print");
    expect(DISALLOWED).toContain("/*/print");
    expect(DISALLOWED).toContain("/lab");
    expect(DISALLOWED).toContain("/*/lab");
    expect(sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
