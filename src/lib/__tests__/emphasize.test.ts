import { describe, expect, it } from "vitest";
import { careerBreak, copy } from "@/data/copy";
import { splitEmphasis } from "@/lib/emphasize";
import { LOCALES } from "@/lib/locale";

describe("recruiter emphasis", () => {
  it("wraps the longest matching phrase first", () => {
    const pieces = splitEmphasis("Strong in React and TypeScript, and React.", [
      "React",
      "React and TypeScript",
    ]);
    expect(pieces.filter((piece) => piece.hit).map((piece) => piece.text)).toEqual([
      "React and TypeScript",
      "React",
    ]);
  });

  it("keeps every locale’s recruiter hits inside shipped copy", () => {
    for (const locale of LOCALES) {
      const t = copy[locale];
      const blob = [
        t.lede,
        t.contactLede,
        t.hirePathLede,
        t.headline,
        t.kicker,
        careerBreak[locale].body,
      ].join("\n");
      expect(t.hits.length).toBeGreaterThan(3);
      expect(t.hits.every((hit) => blob.includes(hit))).toBe(true);
    }
  });
});
