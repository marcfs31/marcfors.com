import { clientIp, createRateLimiter } from "@/lib/rateLimit";
import { isVitalPayload } from "@/lib/vitals";

export const dynamic = "force-dynamic";

const limited = createRateLimiter({ max: 40 });

export async function POST(request: Request) {
  if (limited(clientIp(request))) {
    return Response.json({ error: "rate limited" }, { status: 429 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 2048) {
    return Response.json({ error: "payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  if (!isVitalPayload(body)) {
    return Response.json({ error: "invalid vital" }, { status: 400 });
  }

  console.info(
    JSON.stringify({
      type: "web-vital",
      name: body.name,
      value: Math.round(body.value * 1000) / 1000,
      rating: body.rating ?? null,
      id: body.id,
    }),
  );

  return Response.json({ ok: true });
}
