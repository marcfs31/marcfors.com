import { describe, expect, it } from "vitest";
import { POST } from "./route";

function post(body: unknown, length?: number) {
  return POST(
    new Request("http://localhost/api/vitals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": String(length ?? JSON.stringify(body).length),
      },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/vitals", () => {
  it("accepts a valid vital and rejects junk", async () => {
    const ok = await post({ name: "INP", value: 120, id: "abc", rating: "good" });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: true });

    const bad = await post({ name: "INP", value: -4, id: "abc" });
    expect(bad.status).toBe(400);
  });

  it("rejects oversized payloads", async () => {
    const response = await post({ name: "LCP", value: 1, id: "x" }, 4096);
    expect(response.status).toBe(413);
  });
});
