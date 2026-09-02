import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlobalError from "@/app/global-error";
import ErrorView from "@/app/[locale]/error";

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("global-error boundary", () => {
  it("logs, beacons /api/errors, and offers a recovery action", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const reset = vi.fn();
    render(<GlobalError error={Object.assign(new Error("boom"), { digest: "d1" })} reset={reset} />);

    expect(consoleError).toHaveBeenCalledWith("global-error", { message: "boom", digest: "d1" });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/errors", expect.objectContaining({ method: "POST" })));
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).toMatchObject({ message: "boom", source: "global-error", digest: "d1" });

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledOnce();
  });
});

describe("locale error boundary", () => {
  it("renders localized copy, beacons, and retries", async () => {
    document.documentElement.lang = "de";
    const reset = vi.fn();
    render(<ErrorView error={new Error("x")} reset={reset} />);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/errors", expect.objectContaining({ method: "POST" })),
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).source).toBe("client-boundary");

    await userEvent.click(screen.getByRole("button"));
    expect(reset).toHaveBeenCalledOnce();
  });
});
