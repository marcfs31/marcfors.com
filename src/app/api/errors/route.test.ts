import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function post(body: unknown, length?: number) {
  return POST(
    new Request("http://localhost/api/errors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": String(length ?? JSON.stringify(body).length),
        "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 250) + 1}`,
      },
      body: JSON.stringify(body),
    }),
  );
}

afterEach(() => vi.restoreAllMocks());

describe("POST /api/errors", () => {
  it("accepts a valid report and logs it as structured client-error", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await post({ message: "render failed", source: "global-error", url: "/de" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(err).toHaveBeenCalledWith(expect.stringContaining('"type":"client-error"'));
  });

  it("rejects an invalid report", async () => {
    const res = await post({ message: "", source: "global-error" });
    expect(res.status).toBe(400);
  });

  it("rejects an oversized payload", async () => {
    const res = await post({ message: "x", source: "global-error" }, 8192);
    expect(res.status).toBe(413);
  });
});
