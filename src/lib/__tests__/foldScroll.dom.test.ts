import { afterEach, describe, expect, it, vi } from "vitest";
import { FOLD_LINE_PX, pickOpenFold, pinFold } from "@/lib/foldScroll";

function fold(id: string, top: number) {
  const el = document.createElement("section");
  el.id = id;
  el.getBoundingClientRect = () => ({ top, bottom: top + 100, height: 100, left: 0, right: 0, width: 0, x: 0, y: top, toJSON: () => ({}) });
  document.body.appendChild(el);
  return el;
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("pickOpenFold", () => {
  it("returns the last fold whose top has crossed the read line", () => {
    fold("intro", -400);
    fold("work", -50); // above the line + 8 slack
    fold("projects", 300); // still below
    expect(pickOpenFold(["intro", "work", "projects"])).toBe("work");
  });

  it("falls back to the first id when nothing has scrolled past", () => {
    fold("intro", 500);
    fold("work", 900);
    expect(pickOpenFold(["intro", "work"])).toBe("intro");
  });

  it("ignores ids with no element in the DOM", () => {
    fold("intro", -10);
    expect(pickOpenFold(["intro", "ghost"])).toBe("intro");
  });
});

describe("pinFold", () => {
  it("scrolls by the delta needed to seat the fold on the read line", () => {
    fold("work", FOLD_LINE_PX + 40);
    const scrollBy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    pinFold("work");
    expect(scrollBy).toHaveBeenCalledWith(0, 40);
  });

  it("does nothing when the fold is already within 2px of the line", () => {
    fold("work", FOLD_LINE_PX + 1);
    const scrollBy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    pinFold("work");
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it("does nothing for an unknown id", () => {
    const scrollBy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    pinFold("nope");
    expect(scrollBy).not.toHaveBeenCalled();
  });
});
