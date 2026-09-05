import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { copy } from "@/data/copy";
import { THEME_KEY } from "@/lib/theme";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-choice");
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
});

afterEach(() => vi.restoreAllMocks());

describe("ThemeSwitcher", () => {
  it("offers system, light and dark plus the extra palettes", () => {
    render(<ThemeSwitcher label={copy.en.theme} names={copy.en.themeNames} />);
    const names = copy.en.themeNames;
    for (const id of ["system", "light", "dark", "green", "blue", "red"] as const) {
      expect(screen.getByRole("button", { name: names[id] })).toBeInTheDocument();
    }
  });

  it("marks the active choice with aria-pressed and persists a pick", async () => {
    render(<ThemeSwitcher label={copy.en.theme} names={copy.en.themeNames} />);
    const system = screen.getByRole("button", { name: copy.en.themeNames.system });
    expect(system).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(screen.getByRole("button", { name: copy.en.themeNames.blue }));
    expect(window.localStorage.getItem(THEME_KEY)).toBe("blue");
    expect(document.documentElement.getAttribute("data-theme")).toBe("blue");
    expect(screen.getByRole("button", { name: copy.en.themeNames.blue })).toHaveAttribute("aria-pressed", "true");
    expect(system).toHaveAttribute("aria-pressed", "false");
  });
});
