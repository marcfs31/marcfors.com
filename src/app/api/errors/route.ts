import { isErrorReport } from "@/lib/errors";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const limited = createRateLimiter({ max: 20 });

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
