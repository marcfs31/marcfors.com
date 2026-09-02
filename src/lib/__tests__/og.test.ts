import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { openGraphImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { LOCALES } from "@/lib/locale";

const srcRoot = path.resolve(__dirname, "../..");
const read = (rel: string) => readFileSync(path.join(srcRoot, rel), "utf8");

describe("open graph images", () => {
  it("renders a PNG response for every shipped locale", () => {
    expect(OG_TYPE).toBe("image/png");
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    for (const locale of LOCALES) {
      const res = openGraphImage(locale);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toContain("image/png");
    }
  });

  it("wires the root and per-locale image routes to the shared renderer", () => {
    expect(read("app/opengraph-image.tsx")).toContain("DEFAULT_LOCALE");
    expect(read("app/[locale]/opengraph-image.tsx")).toContain("generateStaticParams");
    expect(read("app/[locale]/opengraph-image.tsx")).toContain("LOCALES");
    expect(read("app/[locale]/twitter-image.tsx")).toContain("openGraphImage");
  });
});
