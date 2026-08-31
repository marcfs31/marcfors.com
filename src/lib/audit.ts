import snapshot from "@/generated/audit.json";

export type AuditSnapshot = {
  generatedAt: string;
  critical: number;
  high: number;
  moderate: number;
  low: number;
  info: number;
  total: number;
  ok: boolean;
};

type NpmAuditJson = {
  metadata?: {
    vulnerabilities?: Partial<Record<"info" | "low" | "moderate" | "high" | "critical" | "total", number>>;
  };
};

export function parseNpmAudit(json: unknown, generatedAt = new Date().toISOString()): AuditSnapshot {
  const body = (json ?? {}) as NpmAuditJson;
  const vulns = body.metadata?.vulnerabilities ?? {};
  const critical = Number(vulns.critical ?? 0);
  const high = Number(vulns.high ?? 0);
  const moderate = Number(vulns.moderate ?? 0);
  const low = Number(vulns.low ?? 0);
  const info = Number(vulns.info ?? 0);
  const total = Number(vulns.total ?? critical + high + moderate + low + info);
  return {
    generatedAt,
    critical,
    high,
    moderate,
    low,
    info,
    total,
    ok: critical + high === 0,
  };
}

export function getAuditSnapshot(): AuditSnapshot {
  return snapshot;
}
