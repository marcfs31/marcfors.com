/**
 * Best-effort in-memory sliding-window limiter. State lives on the serverless
 * instance, so it resets on a cold start and is not shared across regions — fine
 * for the low-stakes beacon endpoints it guards, not a security control.
 */
export function createRateLimiter({ windowMs = 60_000, max }: { windowMs?: number; max: number }) {
  const hits = new Map<string, number[]>();
  return function limited(key: string): boolean {
    const now = Date.now();
    const rows = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
    if (rows.length >= max) {
      hits.set(key, rows);
      return true;
    }
    rows.push(now);
    hits.set(key, rows);
    return false;
  };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "local";
}
