"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, isLocale, localeCookie, LOCALE_KEY, type Locale } from "./locale";
import { DEFAULT_THEME, isTheme, THEME_KEY, type Theme } from "./theme";

const PREFS_EVENT = "marcfors-prefs";

export function subscribePrefs(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PREFS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PREFS_EVENT, onStoreChange);
  };
}

function emit() {
  window.dispatchEvent(new Event(PREFS_EVENT));
}

export function readLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeLocale(next: Locale) {
  try {
    window.localStorage.setItem(LOCALE_KEY, next);
  } catch {
    /* private mode */
  }
  document.cookie = localeCookie(next, window.location.protocol === "https:");
  document.documentElement.lang = next;
  emit();
}

export function writeTheme(next: Theme) {
  try {
    window.localStorage.setItem(THEME_KEY, next);
  } catch {
    /* private mode */
  }
  document.documentElement.setAttribute("data-theme", next);
  emit();
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribePrefs, readLocale, () => DEFAULT_LOCALE);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribePrefs, readTheme, () => DEFAULT_THEME);
}
