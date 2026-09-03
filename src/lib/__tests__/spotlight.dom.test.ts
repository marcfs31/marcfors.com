import { afterEach, describe, expect, it, vi } from "vitest";
import { createSpotlightMove, SPOT_X, SPOT_Y } from "@/lib/spotlight";

function target() {
  const setProperty = vi.fn();
  return { setProperty, node: { style: { setProperty } } };
}

afterEach(() => vi.restoreAllMocks());

describe("createSpotlightMove", () => {
  it("does nothing while prefers-reduced-motion is set", () => {
    const raf = vi.spyOn(window, "requestAnimationFrame");
    const move = createSpotlightMove(() => true);
    const { node, setProperty } = target();
    move({ currentTarget: node, clientX: 10, clientY: 20 });
    expect(raf).not.toHaveBeenCalled();
    expect(setProperty).not.toHaveBeenCalled();
  });

  it("coalesces a burst of moves into a single frame with the latest position", async () => {
    let frameCb: FrameRequestCallback | null = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frameCb = cb;
      return 1;
    });
    const move = createSpotlightMove(() => false);
    const { node, setProperty } = target();

    move({ currentTarget: node, clientX: 1, clientY: 1 });
    move({ currentTarget: node, clientX: 2, clientY: 2 });
    move({ currentTarget: node, clientX: 3, clientY: 3 });
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);

    frameCb!(0);
    expect(setProperty).toHaveBeenCalledWith(SPOT_X, "3px");
    expect(setProperty).toHaveBeenCalledWith(SPOT_Y, "3px");
    expect(setProperty).toHaveBeenCalledTimes(2);

    // A later move schedules a fresh frame.
    move({ currentTarget: node, clientX: 9, clientY: 9 });
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
  });
});
