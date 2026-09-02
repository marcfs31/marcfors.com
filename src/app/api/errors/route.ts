import { isErrorReport } from "@/lib/errors";

export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_HITS = 20;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const rows = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (rows.length >= MAX_HITS) {
    hits.set(ip, rows);
    return true;
  }
  rows.push(now);
  hits.set(ip, rows);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "local";
}

export async function POST(request: Request) {
  if (limited(clientIp(request))) {
    return Response.json({ error: "rate limited" }, { status: 429 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 4096) {
    return Response.json({ error: "payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  if (!isErrorReport(body)) {
    return Response.json({ error: "invalid report" }, { status: 400 });
  }

  console.error(
    JSON.stringify({
      type: "client-error",
      source: body.source,
      message: body.message,
      digest: body.digest ?? null,
      url: body.url ?? null,
    }),
  );

  return Response.json({ ok: true });
}
