import type { Locale } from "@/lib/locale";
import type { Job, UiCopy } from "@/data/copy/types";
import * as en from "@/data/copy/en";
import * as es from "@/data/copy/es";
import * as ca from "@/data/copy/ca";
import * as it from "@/data/copy/it";
import * as pt from "@/data/copy/pt";
import * as de from "@/data/copy/de";

export type { Locale };
export type { Job, UiCopy };
export { skills, contact } from "@/data/copy/shared";

export const copy: Record<Locale, UiCopy> = {
  en: en.ui,
  es: es.ui,
  ca: ca.ui,
  it: it.ui,
  pt: pt.ui,
  de: de.ui,
};

export const experience: Record<Locale, readonly Job[]> = {
  en: en.experience,
  es: es.experience,
  ca: ca.experience,
  it: it.experience,
  pt: pt.experience,
  de: de.experience,
};

export const careerBreak: Record<Locale, { when: string; body: string }> = {
  en: en.careerBreak,
  es: es.careerBreak,
  ca: ca.careerBreak,
  it: it.careerBreak,
  pt: pt.careerBreak,
  de: de.careerBreak,
};

export const education: Record<Locale, readonly string[]> = {
  en: en.education,
  es: es.education,
  ca: ca.education,
  it: it.education,
  pt: pt.education,
  de: de.education,
};

export const languages: Record<Locale, string> = {
  en: en.languages,
  es: es.languages,
  ca: ca.languages,
  it: it.languages,
  pt: pt.languages,
  de: de.languages,
};
