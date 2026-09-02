import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/locale";

const srcRoot = path.resolve(__dirname, "../..");

describe("open graph images", () => {
  it("renders a localized card from shared markup", () => {
    const og = readFileSync(path.join(srcRoot, "lib/og.tsx"), "utf8");
    expect(og).toContain("openGraphImage");
    expect(og).toContain("t.headline");
    expect(og).toContain("t.seeking");
    expect(readFileSync(path.join(srcRoot, "app/opengraph-image.tsx"), "utf8")).toContain("DEFAULT_LOCALE");
    expect(readFileSync(path.join(srcRoot, "app/[locale]/opengraph-image.tsx"), "utf8")).toContain(
      "generateStaticParams",
    );
    expect(readFileSync(path.join(srcRoot, "app/[locale]/twitter-image.tsx"), "utf8")).toContain(
      "openGraphImage",
    );
    expect(readFileSync(path.join(srcRoot, "app/[locale]/opengraph-image.tsx"), "utf8")).toContain("LOCALES");
    expect(LOCALES).toContain("de");
  });
});
