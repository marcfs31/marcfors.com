import { describe, expect, it } from "vitest";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LOCALES } from "@/lib/locale";

describe("case studies", () => {
  it("covers every locale on problem, approach and result", () => {
    expect(CASE_STUDIES.length).toBeGreaterThan(0);
    for (const study of CASE_STUDIES) {
      expect(Object.keys(study.problem).sort()).toEqual([...LOCALES].sort());
      expect(Object.keys(study.approach).sort()).toEqual([...LOCALES].sort());
      expect(Object.keys(study.result).sort()).toEqual([...LOCALES].sort());
    }
  });
});
