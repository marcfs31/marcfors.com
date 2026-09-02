import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { PIN_QUIET_MS, useFoldScroll } from "@/lib/useFoldScroll";

const IDS = ["intro", "work", "projects", "more"];

function placeFolds(topById: Record<string, number>) {
  for (const id of IDS) {
    const el = document.createElement("section");
    el.id = id;
    const top = topById[id] ?? 999;
    el.getBoundingClientRect = () =>
      ({ top, bottom: top + 50, height: 50, left: 0, right: 0, width: 0, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;
    document.body.appendChild(el);
  }
}

beforeEach(() => {
  document.body.innerHTML = "";
  window.location.hash = "";
  vi.spyOn(window, "scrollBy").mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

describe("useFoldScroll", () => {
  it("opens the first fold by default and follows open()", () => {
    const { result } = renderHook(() => useFoldScroll(IDS));
    expect(result.current.openId).toBe("intro");
    act(() => result.current.open("projects"));
    expect(result.current.openId).toBe("projects");
  });

  it("moves with j / k and the arrow keys, clamped at both ends", () => {
    const { result } = renderHook(() => useFoldScroll(IDS));
    const press = (key: string) => act(() => void window.dispatchEvent(new KeyboardEvent("keydown", { key })));

    press("j");
    expect(result.current.openId).toBe("work");
    press("ArrowDown");
    expect(result.current.openId).toBe("projects");
    press("k");
    expect(result.current.openId).toBe("work");
    press("ArrowUp");
    press("ArrowUp");
    expect(result.current.openId).toBe("intro");
    press("j");
    press("j");
    press("j");
    press("j");
    expect(result.current.openId).toBe("more");
  });

  it("ignores keystrokes while typing in a field and with modifier keys", () => {
    const { result } = renderHook(() => useFoldScroll(IDS));
    const input = document.createElement("input");
    document.body.appendChild(input);

    act(() => input.dispatchEvent(new KeyboardEvent("keydown", { key: "j", bubbles: true })));
    expect(result.current.openId).toBe("intro");

    act(() => void window.dispatchEvent(new KeyboardEvent("keydown", { key: "j", metaKey: true })));
    expect(result.current.openId).toBe("intro");
  });

  it("jumps to the fold named in the URL hash", () => {
    const { result } = renderHook(() => useFoldScroll(IDS));
    window.location.hash = "#projects";
    act(() => void window.dispatchEvent(new HashChangeEvent("hashchange")));
    expect(result.current.openId).toBe("projects");
  });

  it("suppresses scroll-sync for PIN_QUIET_MS after a programmatic pin", async () => {
    // intro sits above the read line, so an unguarded scroll-sync would pick "intro".
    placeFolds({ intro: -200, work: 400, projects: 800, more: 1200 });
    let clock = 1_000;
    vi.spyOn(performance, "now").mockImplementation(() => clock);
    const flushRaf = () => act(() => new Promise((r) => setTimeout(r, 20)));

    const { result } = renderHook(() => useFoldScroll(IDS));
    act(() => result.current.open("more"));

    act(() => void window.dispatchEvent(new Event("scroll")));
    await flushRaf();
    expect(result.current.openId).toBe("more"); // still inside the quiet window

    clock += PIN_QUIET_MS + 1;
    act(() => void window.dispatchEvent(new Event("scroll")));
    await flushRaf();
    expect(result.current.openId).toBe("intro"); // quiet window elapsed
  });
});
