import { afterEach, describe, expect, it, vi } from "vitest";
import { isErrorReport, reportClientError } from "@/lib/errors";

afterEach(() => vi.unstubAllGlobals());

describe("isErrorReport", () => {
  it("accepts a well-formed report", () => {
    expect(isErrorReport({ message: "kaboom", source: "global-error" })).toBe(true);
    expect(isErrorReport({ message: "x", source: "client-boundary", digest: "abc", url: "/de" })).toBe(true);
  });

  it("rejects junk", () => {
    expect(isErrorReport(null)).toBe(false);
    expect(isErrorReport({ message: "", source: "global-error" })).toBe(false);
    expect(isErrorReport({ message: "x", source: "nope" })).toBe(false);
    expect(isErrorReport({ message: "x".repeat(600), source: "global-error" })).toBe(false);
    expect(isErrorReport({ message: "x", source: "global-error", digest: 5 })).toBe(false);
  });
});

describe("reportClientError", () => {
  it("posts a bounded payload to /api/errors and never throws", () => {
    const fetchMock = vi.fn().mockResolvedValue({});
    vi.stubGlobal("fetch", fetchMock);
    reportClientError(Object.assign(new Error("boom"), { digest: "d9" }), "global-error");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/errors");
    expect(init.keepalive).toBe(true);
    expect(JSON.parse(init.body)).toMatchObject({ message: "boom", source: "global-error", digest: "d9" });
  });

  it("swallows a fetch that throws", () => {
    vi.stubGlobal("fetch", () => {
      throw new Error("blocked");
    });
    expect(() => reportClientError(new Error("x"), "client-boundary")).not.toThrow();
  });
});
