export const VITAL_NAMES = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;
export type VitalName = (typeof VITAL_NAMES)[number];

/** Core Web Vitals “good” ceilings. Displayed signals must stay at or under these. */
export const VITAL_GOOD: Record<VitalName, number> = {
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 800,
};

export const VITAL_POOR: Record<VitalName, number> = {
  LCP: 4000,
  INP: 500,
  CLS: 0.25,
  FCP: 3000,
  TTFB: 1800,
};

/** Reserved UI for the value column so pending → number never moves layout. */
export const METER_VALUE_MIN_CH = 9;
export const VITALS_CARD_MIN_PX = 292;
export const HEALTH_LINE_MIN_PX = 18;

export type VitalPayload = {
  name: VitalName;
  value: number;
  id: string;
  rating?: "good" | "needs-improvement" | "poor";
};

export function isVitalPayload(value: unknown): value is VitalPayload {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  if (!VITAL_NAMES.includes(row.name as VitalName)) return false;
  if (typeof row.value !== "number" || !Number.isFinite(row.value) || row.value < 0) return false;
  if (typeof row.id !== "string" || row.id.length === 0 || row.id.length > 64) return false;
  if (row.rating !== undefined && row.rating !== "good" && row.rating !== "needs-improvement" && row.rating !== "poor") {
    return false;
  }
  return true;
}

export function ratingFor(name: VitalName, value: number): VitalPayload["rating"] {
  if (value <= VITAL_GOOD[name]) return "good";
  if (value <= VITAL_POOR[name]) return "needs-improvement";
  return "poor";
}

export function formatVital(name: VitalName, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)} ms`;
}

export const VITAL_TITLES: Record<VitalName, string> = {
  LCP: "Largest Contentful Paint",
  INP: "Interaction to Next Paint",
  CLS: "Cumulative Layout Shift",
  FCP: "First Contentful Paint",
  TTFB: "Time to First Byte",
};

export function formatGoodCeiling(name: VitalName): string {
  switch (name) {
    case "CLS":
      return "0.1";
    case "LCP":
      return "2.5 s";
    case "FCP":
      return "1.8 s";
    case "INP":
      return "200 ms";
    case "TTFB":
      return "800 ms";
  }
}
