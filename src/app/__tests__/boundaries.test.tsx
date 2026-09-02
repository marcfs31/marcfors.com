import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlobalError from "@/app/global-error";
import ErrorView from "@/app/[locale]/error";

describe("global-error boundary", () => {
  it("shows a recovery action and reports the error once", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const reset = vi.fn();
    render(<GlobalError error={Object.assign(new Error("boom"), { digest: "d1" })} reset={reset} />);

    expect(consoleError).toHaveBeenCalledWith("global-error", { message: "boom", digest: "d1" });
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledOnce();
    consoleError.mockRestore();
  });
});

describe("locale error boundary", () => {
  it("renders localized copy and a retry button", async () => {
    document.documentElement.lang = "de";
    const reset = vi.fn();
    render(<ErrorView reset={reset} />);
    await userEvent.click(screen.getByRole("button"));
    expect(reset).toHaveBeenCalledOnce();
  });
});
