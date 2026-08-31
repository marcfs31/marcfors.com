import { describe, expect, it } from "vitest";
import { AA_NORMAL, contrastRatio } from "@/lib/contrast";

describe("palette contrast", () => {
  it("keeps paper, brass, signal and muted above AA on ink", () => {
    const ink = "#10141c";
    expect(contrastRatio("#efe6d2", ink)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio("#d4b07a", ink)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio("#7dcf9a", ink)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio("#8e8574", ink)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrastRatio("#10141c", "#d4b07a")).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});
