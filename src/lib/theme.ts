export const THEMES = ["light", "dark", "green", "blue", "red"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
export const THEME_KEY = "marcfors-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export const ANTI_FLASH_SCRIPT = `(function(){try{var themes=${JSON.stringify(THEMES)};var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(!t||themes.indexOf(t)===-1)t=(window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches)?"light":${JSON.stringify(DEFAULT_THEME)};document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
