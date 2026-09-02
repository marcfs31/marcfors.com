"use client";

import { copy } from "@/data/copy";
import type { Locale } from "@/lib/locale";
import { useTheme, writeTheme } from "@/lib/prefs";
import { THEMES } from "@/lib/theme";

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  const theme = useTheme();
  const t = copy[locale];

  return (
    <div className="themes" role="group" aria-label={t.theme}>
      {THEMES.map((id) => (
        <button
          key={id}
          type="button"
          className={`theme-dot theme-dot-${id}`}
          aria-label={t.themeNames[id]}
          aria-pressed={theme === id}
          onClick={() => writeTheme(id)}
        />
      ))}
    </div>
  );
}
