import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);

afterEach(() => {
  cleanup();
});

// jsdom does not implement matchMedia; components read it for reduced-motion and
// the light/dark theme. Default everything to "not matching" and let individual
// tests override with vi.spyOn(window, "matchMedia") when they need a hit.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
