"use client";

import { useEffect } from "react";
import { copy } from "@/data/copy";
import type { Locale } from "@/lib/locale";
import { applyTheme, readTheme, useTheme, writeTheme } from "@/lib/prefs";
import { PALETTE_THEMES, THEME_CHOICES } from "@/lib/theme";

const CORE = ["system", "light", "dark"] as const;

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  const theme = useTheme();
  const t = copy[locale];

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      if (readTheme() === "system") applyTheme("system");
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="themes" role="group" aria-label={t.theme}>
      {CORE.map((id) => (
        <button
          key={id}
          type="button"
          className={`theme-dot theme-dot-${id}`}
          aria-label={t.themeNames[id]}
          aria-pressed={theme === id}
          onClick={() => writeTheme(id)}
        />
      ))}
      <span className="theme-extras">
        {PALETTE_THEMES.filter((id) => id !== "light" && id !== "dark").map((id) => (
          <button
            key={id}
            type="button"
            className={`theme-dot theme-dot-${id}`}
            aria-label={t.themeNames[id]}
            aria-pressed={theme === id}
            onClick={() => writeTheme(id)}
          />
        ))}
      </span>
    </div>
  );
}

export const THEME_SWITCHER_CHOICES = THEME_CHOICES;
