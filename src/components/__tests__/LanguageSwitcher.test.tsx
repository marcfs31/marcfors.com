import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LOCALE_KEY } from "@/lib/locale";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

beforeEach(() => {
  push.mockClear();
  window.localStorage.clear();
});

afterEach(() => vi.restoreAllMocks());

describe("LanguageSwitcher", () => {
  it("links every locale and marks the current one", () => {
    render(<LanguageSwitcher locale="de" pathname="/de/work/iterm-studio" />);
    const de = screen.getByRole("link", { name: "Deutsch" });
    expect(de).toHaveAttribute("aria-current", "page");
    expect(de).toHaveAttribute("hreflang", "de");

    const es = screen.getByRole("link", { name: "Español" });
    expect(es).toHaveAttribute("href", "/es/work/iterm-studio");
    expect(es).not.toHaveAttribute("aria-current");
  });

  it("navigates and remembers the locale when the select changes", async () => {
    render(<LanguageSwitcher locale="en" pathname="/print" />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "ca");

    expect(window.localStorage.getItem(LOCALE_KEY)).toBe("ca");
    expect(push).toHaveBeenCalledWith("/ca/print");
  });
});
