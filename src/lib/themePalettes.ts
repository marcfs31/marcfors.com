export type ThemePalette = {
  bg: string;
  bg2: string;
  surface: string;
  line: string;
  fg: string;
  fgDim: string;
  muted: string;
  accent: string;
  accentFg: string;
  signal: string;
  danger: string;
  dangerFg: string;
  spot: string;
  glow: string;
};

export const THEME_PALETTES: Record<"light" | "dark" | "green" | "blue" | "red", ThemePalette> = {
  dark: {
    bg: "#10141c",
    bg2: "#141924",
    surface: "rgba(23, 29, 40, 0.78)",
    line: "rgba(232, 220, 196, 0.14)",
    fg: "#efe6d2",
    fgDim: "#c9bba0",
    muted: "#8e8574",
    accent: "#d4b07a",
    accentFg: "#10141c",
    signal: "#7dcf9a",
    danger: "#e07048",
    dangerFg: "#1a0c08",
    spot: "rgba(212, 176, 122, 0.12)",
    glow: "rgba(212, 176, 122, 0.09)",
  },
  light: {
    bg: "#f4efe4",
    bg2: "#ebe4d4",
    surface: "rgba(255, 252, 246, 0.88)",
    line: "rgba(28, 24, 18, 0.12)",
    fg: "#1c1812",
    fgDim: "#4a4338",
    muted: "#6f675b",
    accent: "#8a5a1a",
    accentFg: "#fff8ec",
    signal: "#176b43",
    danger: "#c2410c",
    dangerFg: "#fff7ed",
    spot: "rgba(138, 90, 26, 0.10)",
    glow: "rgba(138, 90, 26, 0.08)",
  },
  green: {
    bg: "#07140f",
    bg2: "#0b1c15",
    surface: "rgba(10, 32, 24, 0.78)",
    line: "rgba(110, 231, 183, 0.16)",
    fg: "#d7f5e8",
    fgDim: "#9dccb5",
    muted: "#6f9a86",
    accent: "#34d399",
    accentFg: "#062018",
    signal: "#6ee7b7",
    danger: "#fb7185",
    dangerFg: "#2a0b12",
    spot: "rgba(52, 211, 153, 0.12)",
    glow: "rgba(16, 185, 129, 0.10)",
  },
  blue: {
    bg: "#0b1220",
    bg2: "#101a30",
    surface: "rgba(16, 28, 52, 0.78)",
    line: "rgba(147, 197, 253, 0.16)",
    fg: "#dbe7ff",
    fgDim: "#9bb0d4",
    muted: "#6d7fa3",
    accent: "#60a5fa",
    accentFg: "#07111f",
    signal: "#7dd3fc",
    danger: "#fb7185",
    dangerFg: "#2a0b12",
    spot: "rgba(96, 165, 250, 0.12)",
    glow: "rgba(59, 130, 246, 0.10)",
  },
  red: {
    bg: "#16090c",
    bg2: "#1f0e13",
    surface: "rgba(42, 16, 22, 0.78)",
    line: "rgba(251, 113, 133, 0.16)",
    fg: "#fde8ea",
    fgDim: "#e3b4bb",
    muted: "#a0727a",
    accent: "#e11d48",
    accentFg: "#fff5f6",
    signal: "#fda4af",
    danger: "#f97316",
    dangerFg: "#1c1008",
    spot: "rgba(225, 29, 72, 0.12)",
    glow: "rgba(225, 29, 72, 0.10)",
  },
};
