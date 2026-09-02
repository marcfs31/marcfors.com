import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  applyTheme,
  readLocale,
  readTheme,
  useTheme,
  writeLocale,
  writeTheme,
} from "@/lib/prefs";
import { LOCALE_KEY } from "@/lib/locale";
import { THEME_KEY } from "@/lib/theme";

function matchLight(matches: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("light") ? matches : false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-choice");
  document.cookie = `${LOCALE_KEY}=; Max-Age=0; Path=/`;
});

afterEach(() => vi.restoreAllMocks());

describe("theme prefs", () => {
  it("defaults to system and round-trips a stored palette", () => {
    expect(readTheme()).toBe("system");
    window.localStorage.setItem(THEME_KEY, "green");
    expect(readTheme()).toBe("green");
    window.localStorage.setItem(THEME_KEY, "chartreuse");
    expect(readTheme()).toBe("system");
  });

  it("resolves system against prefers-color-scheme when applied", () => {
    matchLight(true);
    applyTheme("system");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.getAttribute("data-theme-choice")).toBe("system");

    matchLight(false);
    applyTheme("system");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("writeTheme stores the choice and drives the html attributes", () => {
    matchLight(false);
    writeTheme("blue");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("blue");
    expect(document.documentElement.getAttribute("data-theme")).toBe("blue");
    expect(document.documentElement.getAttribute("data-theme-choice")).toBe("blue");
  });

  it("still applies the theme when localStorage is unavailable (private mode)", () => {
    matchLight(false);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => writeTheme("red")).not.toThrow();
    expect(document.documentElement.getAttribute("data-theme")).toBe("red");
  });

  it("useTheme reflects a later writeTheme", () => {
    matchLight(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe("system");
    act(() => writeTheme("green"));
    expect(result.current).toBe("green");
  });
});

describe("locale prefs", () => {
  it("defaults to en and round-trips a stored locale", () => {
    expect(readLocale()).toBe("en");
    window.localStorage.setItem(LOCALE_KEY, "pt");
    expect(readLocale()).toBe("pt");
  });

  it("writeLocale stores it, writes the cookie and updates <html lang>", () => {
    writeLocale("de");
    expect(window.localStorage.getItem(LOCALE_KEY)).toBe("de");
    expect(document.documentElement.lang).toBe("de");
    expect(document.cookie).toContain(`${LOCALE_KEY}=de`);
  });
});
