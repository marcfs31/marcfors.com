import type { Locale } from "@/lib/locale";

export type CaseStudy = {
  slug: string;
  project: string;
  stack: string[];
  live?: string;
  repo?: string;
  problem: Record<Locale, string>;
  approach: Record<Locale, string>;
  result: Record<Locale, string>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "iterm-studio",
    project: "iTerm Studio",
    stack: ["Python", "iTerm2", "Powerlevel10k"],
    live: "https://marcfs31.github.io/iterm-studio/",
    repo: "https://github.com/marcfs31/iterm-studio",
    problem: {
      en: "A complete iTerm2 look is four separate knobs — colours, font, blur, and the Powerlevel10k prompt — so people copy screenshots and never get the same terminal twice.",
      es: "Un look completo de iTerm2 son cuatro mandos distintos — color, fuente, desenfoque y el prompt Powerlevel10k — así que la gente copia capturas y nunca obtiene el mismo terminal dos veces.",
      ca: "Un look complet d'iTerm2 són quatre comandaments — color, font, desenfocament i el prompt Powerlevel10k — i la gent copia captures i no obté mai el mateix terminal.",
      it: "Un look iTerm2 completo sono quattro manopole — colori, font, blur e il prompt Powerlevel10k — così si copiano screenshot e il terminale non è mai lo stesso due volte.",
      pt: "Um look completo de iTerm2 são quatro controlos — cor, tipo, desfoque e o prompt Powerlevel10k — por isso as pessoas copiam capturas e nunca repetem o mesmo terminal.",
      de: "Ein vollständiger iTerm2-Look sind vier getrennte Regler — Farbe, Schrift, Unschärfe und Powerlevel10k-Prompt — also kopiert man Screenshots und bekommt nie zweimal denselben Terminal.",
    },
    approach: {
      en: "A public gallery of 121 presets. Each one is a full look. A local server applies it to the real iTerm2 profile, not a fake preview.",
      es: "Una galería pública de 121 presets. Cada uno es un look completo. Un servidor local lo aplica al perfil real de iTerm2, no a una vista previa falsa.",
      ca: "Una galeria pública de 121 presets. Cadascun és un look complet. Un servidor local l'aplica al perfil real d'iTerm2, no a una vista prèvia falsa.",
      it: "Una galleria pubblica di 121 preset. Ognuno è un look completo. Un server locale lo applica al profilo iTerm2 vero, non a un'anteprima finta.",
      pt: "Uma galeria pública de 121 presets. Cada um é um look completo. Um servidor local aplica-o ao perfil real do iTerm2, não a uma pré-visualização falsa.",
      de: "Eine öffentliche Galerie mit 121 Presets. Jedes ist ein vollständiger Look. Ein lokaler Server wendet ihn auf das echte iTerm2-Profil an, nicht auf eine Attrappe.",
    },
    result: {
      en: "One click to a consistent terminal. Source is public; the hosted gallery is the proof.",
      es: "Un clic para un terminal coherente. El código es público; la galería alojada es la prueba.",
      ca: "Un clic per a un terminal coherent. El codi és públic; la galeria allotjada n'és la prova.",
      it: "Un clic per un terminale coerente. Il codice è pubblico; la galleria hosted è la prova.",
      pt: "Um clique para um terminal coerente. O código é público; a galeria alojada é a prova.",
      de: "Ein Klick zum stimmigen Terminal. Quellcode öffentlich; die gehostete Galerie ist der Beweis.",
    },
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
