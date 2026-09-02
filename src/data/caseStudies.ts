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
    slug: "habit-breaker",
    project: "Habit Breaker",
    stack: ["Next.js 16", "Clerk", "Neon", "Drizzle"],
    live: "https://habit-breaker-blush.vercel.app",
    problem: {
      en: "Weekly planning tools either ignore the hours you are already busy or dump every habit into a flat checklist. Neither survives a real week.",
      es: "Las herramientas de planificación semanal ignoran las horas ya ocupadas o tiran cada hábito a una lista plana. Ninguna sobrevive a una semana real.",
      ca: "Les eines de planificació setmanal ignoren les hores ja ocupades o llencen cada hàbit a una llista plana. Cap no sobreviu a una setmana real.",
      it: "I planner settimanali ignorano le ore già occupate o scaricano ogni abitudine in una checklist piatta. Nessuno sopravvive a una settimana vera.",
      pt: "Os planeadores semanais ignoram as horas já ocupadas ou deitam cada hábito numa lista plana. Nenhum sobrevive a uma semana real.",
      de: "Wochenplaner ignorieren schon belegte Stunden oder kippen jede Gewohnheit in eine flache Liste. Beides hält eine echte Woche nicht aus.",
    },
    approach: {
      en: "Day templates, busy intervals, and push reminders in Spanish and English, plus a public marketplace of routines. Built on Next.js, Clerk, Neon and Drizzle.",
      es: "Plantillas de día, huecos ocupados y recordatorios push en castellano e inglés, más un marketplace público de rutinas. Next.js, Clerk, Neon y Drizzle.",
      ca: "Plantilles de dia, forats ocupats i recordatoris push en català, castellà i anglès, i un marketplace públic de rutines. Next.js, Clerk, Neon i Drizzle.",
      it: "Template di giornata, impegni fissi e reminder push in spagnolo e inglese, più un marketplace pubblico di routine. Next.js, Clerk, Neon e Drizzle.",
      pt: "Modelos de dia, intervalos ocupados e lembretes push em castelhano e inglês, mais um marketplace público de rotinas. Next.js, Clerk, Neon e Drizzle.",
      de: "Tagesvorlagen, belegte Intervalle und Push-Erinnerungen auf Spanisch und Englisch, plus öffentlicher Marktplatz für Routinen. Next.js, Clerk, Neon und Drizzle.",
    },
    result: {
      en: "A live product a recruiter can click. Source stays private; the app is the proof.",
      es: "Un producto en vivo que un reclutador puede abrir. El código sigue privado; la app es la prueba.",
      ca: "Un producte en directe que un reclutador pot obrir. El codi resta privat; l'app n'és la prova.",
      it: "Un prodotto live che un recruiter può aprire. Il codice resta privato; l'app è la prova.",
      pt: "Um produto ao vivo que um recrutador pode abrir. O código continua privado; a app é a prova.",
      de: "Ein Live-Produkt, das ein Recruiter anklicken kann. Quellcode bleibt privat; die App ist der Beweis.",
    },
  },
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
