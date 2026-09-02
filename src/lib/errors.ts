export type ErrorReport = {
  message: string;
  source: "client-boundary" | "global-error";
  digest?: string;
  url?: string;
};

const MAX_MESSAGE = 500;

export function isErrorReport(value: unknown): value is ErrorReport {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  if (typeof row.message !== "string" || row.message.length === 0 || row.message.length > MAX_MESSAGE) {
    return false;
  }
  if (row.source !== "client-boundary" && row.source !== "global-error") return false;
  if (row.digest !== undefined && (typeof row.digest !== "string" || row.digest.length > 128)) return false;
  if (row.url !== undefined && (typeof row.url !== "string" || row.url.length > 2048)) return false;
  return true;
}

/**
 * Fire-and-forget beacon from a client error boundary to the first-party
 * `/api/errors` endpoint. Never throws; does nothing during SSR.
 */
export function reportClientError(
  error: (Error & { digest?: string }) | undefined,
  source: ErrorReport["source"],
): void {
  if (typeof window === "undefined") return;
  const body: ErrorReport = {
    message: (error?.message || "unknown error").slice(0, MAX_MESSAGE),
    source,
    digest: error?.digest,
    url: window.location?.pathname,
  };
  try {
    void fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    /* offline or blocked — the server-side onRequestError still captures SSR failures */
  }
}
