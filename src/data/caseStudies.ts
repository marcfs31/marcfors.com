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
    slug: "wordkeep",
    project: "Wordkeep",
    stack: ["React", "Vite", "TypeScript"],
    live: "https://wordkeep-zeta.vercel.app",
    problem: {
      en: "A flashcard list tells you which words you saved, not how they relate. You learn 'hot' and 'cold' as two unconnected entries instead of one axis you already half-know in four languages.",
      es: "Una lista de tarjetas te dice qué palabras guardaste, no cómo se relacionan. Aprendes 'hot' y 'cold' como dos entradas sueltas en vez de un eje que ya intuyes en cuatro idiomas.",
      ca: "Una llista de targetes et diu quines paraules has desat, no com es relacionen. Aprens 'hot' i 'cold' com dues entrades soltes en lloc d'un eix que ja intueixes en quatre llengües.",
      it: "Una lista di flashcard ti dice quali parole hai salvato, non come si legano. Impari 'hot' e 'cold' come due voci scollegate invece di un asse che già intuisci in quattro lingue.",
      pt: "Uma lista de cartões diz-te que palavras guardaste, não como se relacionam. Aprendes 'hot' e 'cold' como duas entradas soltas em vez de um eixo que já intuis em quatro línguas.",
      de: "Eine Karteikartenliste sagt dir, welche Wörter du gespeichert hast, nicht wie sie zusammenhängen. Du lernst 'hot' und 'cold' als zwei lose Einträge statt als eine Achse, die du in vier Sprachen schon halb kennst.",
    },
    approach: {
      en: "Every saved word carries typed links — synonym, antonym, translation, related. A spaced queue schedules review; a 3D force graph, the Atlas, lays the whole lexicon out so those links become shape. Built with React, Vite and a small serverless API.",
      es: "Cada palabra guardada lleva enlaces tipados — sinónimo, antónimo, traducción, relacionada. Una cola espaciada programa el repaso; un grafo de fuerzas 3D, el Atlas, despliega todo el léxico para que esos enlaces tomen forma. React, Vite y una pequeña API serverless.",
      ca: "Cada paraula desada porta enllaços tipats — sinònim, antònim, traducció, relacionada. Una cua espaiada programa el repàs; un graf de forces 3D, l'Atles, desplega tot el lèxic perquè aquests enllaços prenguin forma. React, Vite i una petita API serverless.",
      it: "Ogni parola salvata porta legami tipizzati — sinonimo, contrario, traduzione, correlata. Una coda spaziata programma il ripasso; un grafo a forze 3D, l'Atlante, dispone l'intero lessico perché quei legami diventino forma. React, Vite e una piccola API serverless.",
      pt: "Cada palavra guardada leva ligações tipadas — sinónimo, antónimo, tradução, relacionada. Uma fila espaçada agenda a revisão; um grafo de forças 3D, o Atlas, dispõe todo o léxico para que essas ligações ganhem forma. React, Vite e uma pequena API serverless.",
      de: "Jedes gespeicherte Wort trägt typisierte Kanten — Synonym, Gegenteil, Übersetzung, verwandt. Eine Spaced-Queue plant die Wiederholung; ein 3D-Kräftegraph, der Atlas, legt das ganze Lexikon aus, damit diese Kanten Form bekommen. Gebaut mit React, Vite und einer kleinen Serverless-API.",
    },
    result: {
      en: "A vocabulary you can walk through, not just scroll. The Atlas on this page is a frozen slice of the live graph; the full 3D version is one click away.",
      es: "Un vocabulario por el que puedes pasear, no solo hacer scroll. El Atlas de esta página es un trozo congelado del grafo en vivo; la versión 3D completa está a un clic.",
      ca: "Un vocabulari pel qual pots passejar, no només fer scroll. L'Atles d'aquesta pàgina és un tall congelat del graf en viu; la versió 3D completa és a un clic.",
      it: "Un lessico in cui puoi camminare, non solo scorrere. L'Atlante di questa pagina è una fetta congelata del grafo live; la versione 3D completa è a un clic.",
      pt: "Um vocabulário pelo qual podes caminhar, não só fazer scroll. O Atlas desta página é uma fatia congelada do grafo ao vivo; a versão 3D completa está a um clique.",
      de: "Ein Wortschatz, durch den man gehen kann, nicht nur scrollen. Der Atlas auf dieser Seite ist ein eingefrorener Ausschnitt des Live-Graphen; die volle 3D-Version ist einen Klick entfernt.",
    },
  },
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
