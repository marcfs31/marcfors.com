import type { Locale } from "@/lib/locale";

export type Project = {
  name: string;
  blurb: Record<Locale, string>;
  stack: string[];
  repo?: string;
  live?: string;
  href?: string;
  caseStudy?: string;
  private?: boolean;
  spotlight?: boolean;
};

export const featured: Project[] = [
  {
    name: "marcfors.com",
    blurb: {
      en: "This desk. Observatory portfolio with first-party vitals, a supply-chain audit on every build, and six locales. Public source.",
      es: "Este escritorio. Portfolio observatorio con vitals propios, auditoría de dependencias en cada build y seis idiomas. Código público.",
      ca: "Aquest escriptori. Portfoli observatori amb vitals propis, auditoria de dependències a cada build i sis llengües. Codi públic.",
      it: "Questa scrivania. Portfolio osservatorio con vitals di prima parte, audit della supply chain a ogni build e sei lingue. Codice pubblico.",
      pt: "Esta secretária. Portefólio observatório com vitals próprios, auditoria de dependências em cada build e seis línguas. Código público.",
      de: "Dieser Schreibtisch. Observatoriums-Portfolio mit eigenen Vitals, Supply-Chain-Audit bei jedem Build und sechs Sprachen. Öffentlicher Quellcode.",
    },
    stack: ["Next.js 16", "React 19", "TypeScript"],
    repo: "https://github.com/marcfs31/marcfors.com",
    live: "https://marcfors.com",
    spotlight: true,
  },
  {
    name: "Habit Breaker",
    blurb: {
      en: "Weekly habit and schedule planner. Day templates, busy intervals, push reminders, Spanish/English, a public marketplace of routines.",
      es: "Planificador semanal de hábitos. Plantillas de día, huecos ocupados, recordatorios push, castellano/inglés, marketplace de rutinas.",
      ca: "Planificador setmanal d'hàbits. Plantilles de dia, forats ocupats, recordatoris push, català/castellà/anglès, marketplace de rutines.",
      it: "Planner settimanale di abitudini. Template di giornata, impegni fissi, reminder push, spagnolo/inglese, marketplace di routine.",
      pt: "Planeador semanal de hábitos. Modelos de dia, intervalos ocupados, lembretes push, castelhano/inglês, marketplace de rotinas.",
      de: "Wöchentlicher Habit- und Terminplaner. Tagesvorlagen, belegte Intervalle, Push-Erinnerungen, Spanisch/Englisch, öffentlicher Marktplatz für Routinen.",
    },
    stack: ["Next.js 16", "Clerk", "Neon", "Drizzle"],
    live: "https://habit-breaker-blush.vercel.app",
    private: true,
    spotlight: true,
  },
  {
    name: "Agent Switchboard",
    blurb: {
      en: "Local ops desk for Claude, Codex, Cursor and Grok sessions: last prompt, git dirt, Vercel health, encrypted env vault, a macOS menu extra.",
      es: "Mesa de operaciones local para sesiones de Claude, Codex, Cursor y Grok: último prompt, git sucio, salud de Vercel, bóveda de env, extra de menú en macOS.",
      ca: "Taula d'operacions local per a sessions de Claude, Codex, Cursor i Grok: darrer prompt, git brut, salut de Vercel, volta d'env, extra de menú a macOS.",
      it: "Desk ops locale per sessioni Claude, Codex, Cursor e Grok: ultimo prompt, git sporco, salute Vercel, vault env cifrato, extra di menu macOS.",
      pt: "Mesa de operações local para sessões Claude, Codex, Cursor e Grok: último prompt, git sujo, saúde Vercel, cofre de env, extra de menu no macOS.",
      de: "Lokales Ops-Desk für Claude-, Codex-, Cursor- und Grok-Sessions: letzter Prompt, schmutziges Git, Vercel-Health, verschlüsselter Env-Tresor, macOS-Menüleiste.",
    },
    stack: ["React", "Express", "Swift"],
    private: true,
    spotlight: true,
  },
  {
    name: "fileshelf",
    blurb: {
      en: "Smart file organizer with a polished terminal UI. Public source.",
      es: "Organizador de ficheros con una TUI cuidada. Código público.",
      ca: "Organitzador de fitxers amb una TUI cuidada. Codi públic.",
      it: "Organizzatore di file con una TUI curata. Codice pubblico.",
      pt: "Organizador de ficheiros com uma TUI cuidada. Código público.",
      de: "Schlauer Dateiorganizer mit einer gepflegten Terminal-UI. Öffentlicher Quellcode.",
    },
    stack: ["Python"],
    repo: "https://github.com/marcfs31/fileshelf",
    spotlight: true,
  },
  {
    name: "iTerm Studio",
    blurb: {
      en: "One-click iTerm2 looks: 121 presets covering colour, font, blur, and a matching Powerlevel10k prompt. Public gallery; local server applies for real.",
      es: "Looks de iTerm2 a un clic: 121 presets de color, fuente, desenfoque y un prompt Powerlevel10k a juego. Galería pública; el servidor local aplica de verdad.",
      ca: "Looks d'iTerm2 d'un clic: 121 presets de color, font, desenfocament i un prompt Powerlevel10k a joc. Galeria pública; el servidor local aplica de debò.",
      it: "Look iTerm2 in un clic: 121 preset di colore, font, blur e un prompt Powerlevel10k abbinato. Galleria pubblica; il server locale applica sul serio.",
      pt: "Looks de iTerm2 num clique: 121 presets de cor, tipo, desfoque e um prompt Powerlevel10k a condizer. Galeria pública; o servidor local aplica a sério.",
      de: "iTerm2-Looks per Klick: 121 Presets für Farbe, Schrift, Unschärfe und passenden Powerlevel10k-Prompt. Öffentliche Galerie; der lokale Server wendet sie wirklich an.",
    },
    stack: ["Python"],
    repo: "https://github.com/marcfs31/iterm-studio",
    live: "https://marcfs31.github.io/iterm-studio/",
    caseStudy: "iterm-studio",
    spotlight: true,
  },
  {
    name: "Media Downloader",
    blurb: {
      en: "Browser extension plus native host. Downloads media you can already view, via yt-dlp. No DRM circumvention.",
      es: "Extensión de navegador y host nativo. Descarga el media que ya puedes ver, con yt-dlp. Sin saltarse DRM.",
      ca: "Extensió de navegador i host natiu. Descarrega el mèdia que ja pots veure, amb yt-dlp. Sense saltar-se el DRM.",
      it: "Estensione browser più host nativo. Scarica i media che puoi già vedere, via yt-dlp. Nessuna elusione DRM.",
      pt: "Extensão de browser e host nativo. Descarrega o media que já podes ver, via yt-dlp. Sem contornar DRM.",
      de: "Browser-Erweiterung plus nativer Host. Lädt Medien herunter, die du schon ansehen kannst, via yt-dlp. Keine DRM-Umgehung.",
    },
    stack: ["Python", "TypeScript"],
    repo: "https://github.com/marcfs31/media-downloader",
  },
  {
    name: "Finance Dashboard",
    blurb: {
      en: "Single-user metals, crypto and portfolio tracker with cost basis, alerts, and optional Revolut X import.",
      es: "Panel de metales, crypto y cartera: coste, alertas e importación opcional de Revolut X.",
      ca: "Panell de metalls, cripto i cartera: cost, alertes i importació opcional de Revolut X.",
      it: "Dashboard metalli, crypto e portafoglio: costo, alert e import opzionale da Revolut X.",
      pt: "Painel de metais, cripto e carteira: custo, alertas e importação opcional do Revolut X.",
      de: "Einzelnutzer-Tracker für Metalle, Krypto und Portfolio mit Einstandskosten, Alerts und optionalem Revolut-X-Import.",
    },
    stack: ["Next.js", "Prisma", "SQLite"],
    private: true,
    spotlight: true,
  },
  {
    name: "SpotiApp",
    blurb: {
      en: "Angular app on the Spotify API. Early public front-end work.",
      es: "App Angular sobre la API de Spotify. Front-end público de una etapa anterior.",
      ca: "App Angular sobre l'API de Spotify. Front-end públic d'una etapa anterior.",
      it: "App Angular sull'API di Spotify. Front-end pubblico di una fase precedente.",
      pt: "App Angular sobre a API do Spotify. Front-end público de uma etapa anterior.",
      de: "Angular-App auf der Spotify-API. Frühe öffentliche Frontend-Arbeit.",
    },
    stack: ["Angular", "TypeScript"],
    repo: "https://github.com/marcfs31/SpotiApp",
  },
];

export const lab: Project[] = [
  {
    name: "Trace Theater",
    href: "/lab/trace",
    blurb: {
      en: "Replay a web request as a tiny stage: spans enter from the wings, errors as red footlights. Observability you can watch.",
      es: "Reproducir una petición web como un escenario: los spans salen entre bambalinas, los errores como candilejas rojas.",
      ca: "Reprodueix una petició web com un escenari: els spans surten entre bambolines, els errors com a candeles vermelles.",
      it: "Rigioca una richiesta web come un palco: gli span entrano dalle quinte, gli errori come luci rosse.",
      pt: "Repete um pedido web como um palco: os spans entram pelas coxias, os erros como luzes vermelhas.",
      de: "Eine Webanfrage als kleine Bühne: Spans kommen aus den Kulissen, Fehler im roten Fußlicht.",
    },
    stack: ["Next.js", "OpenTelemetry JSON"],
  },
  {
    name: "Eixample OS",
    blurb: {
      en: "The Cerdà grid as a desktop. Each block is a window. Barcelona as a window manager.",
      es: "La trama Cerdà como escritorio. Cada manzana es una ventana. Barcelona como window manager.",
      ca: "La trama Cerdà com a escriptori. Cada illa és una finestra. Barcelona com a window manager.",
      it: "La griglia Cerdà come desktop. Ogni isolato è una finestra. Barcellona come window manager.",
      pt: "A malha Cerdà como ambiente de trabalho. Cada quarteirão é uma janela. Barcelona como window manager.",
      de: "Das Cerdà-Raster als Desktop. Jeder Block ist ein Fenster. Barcelona als Window-Manager.",
    },
    stack: ["Idea"],
  },
  {
    name: "Night Bus",
    blurb: {
      en: "TMB night buses as a brass departure board. Live arrivals, analog type, no map sludge.",
      es: "Los NitBus de TMB como un panel de salidas de latón. Llegadas en vivo, tipografía analógica.",
      ca: "Els NitBus de TMB com un panell de sortides de llautó. Arribades en directe, tipografia analògica.",
      it: "I NitBus TMB come tabellone partenze in ottone. Arrivi live, tipo analogico.",
      pt: "Os NitBus da TMB como um painel de partidas de latão. Chegadas ao vivo, tipo analógico.",
      de: "TMB-Nachtbusse als Messing-Abfahrtstafel. Live-Ankünfte, analoge Schrift, keine Kartenschmiere.",
    },
    stack: ["Idea"],
  },
  {
    name: "Climbing Planetarium",
    blurb: {
      en: "A season of escalada as a star chart. Grades are magnitudes. Rest days are dark sky.",
      es: "Una temporada de escalada como carta estelar. Los grados son magnitudes. El descanso, cielo oscuro.",
      ca: "Una temporada d'escalada com a carta estel·lar. Els graus són magnituds. El descans, cel fosc.",
      it: "Una stagione di arrampicata come carta stellare. I gradi sono magnitudini. Il riposo, cielo scuro.",
      pt: "Uma temporada de escalada como carta estelar. Os graus são magnitudes. O descanso, céu escuro.",
      de: "Eine Klettersaison als Sternkarte. Grade sind Helligkeiten. Ruhetage sind dunkler Himmel.",
    },
    stack: ["Idea"],
  },
  {
    name: "Crate Radar",
    blurb: {
      en: "Sweep the music library like ATC. Duplicates ping. BPM as altitude.",
      es: "Barrido de la biblioteca musical como un control aéreo. Los duplicados pitan. El BPM es altitud.",
      ca: "Escombrat de la biblioteca musical com un control aeri. Els duplicats piten. El BPM és altitud.",
      it: "Scansione della libreria musicale come un controllo del traffico aereo. I duplicati bipano. Il BPM è quota.",
      pt: "Varrimento da biblioteca musical como um controlo aéreo. Os duplicados apitam. O BPM é altitude.",
      de: "Musikbibliothek wie Flugüberwachung abtasten. Duplikate piepen. BPM als Flughöhe.",
    },
    stack: ["Idea"],
  },
  {
    name: "Room Frequency",
    blurb: {
      en: "Barcelona listings as a shortwave radio. Tune the rent, hear the barrio.",
      es: "Anuncios de pisos en Barcelona como una radio de onda corta. Sintoniza el alquiler, oye el barrio.",
      ca: "Anuncis de pisos a Barcelona com una ràdio d'ona curta. Sintonitza el lloguer, sent el barri.",
      it: "Annunci di case a Barcellona come una radio a onde corte. Sintonizza l'affitto, ascolta il barrio.",
      pt: "Anúncios de casas em Barcelona como uma rádio de onda curta. Sintoniza a renda, ouve o bairro.",
      de: "Barcelonas Wohnungsanzeigen als Kurzwellenradio. Miete einstellen, das Viertel hören.",
    },
    stack: ["Idea"],
  },
];

export const skipRepos = new Set([
  "marcfs31",
  "SmartGarden",
  "my-portfolio",
  "angular-basics",
  "pipes",
  "apuntes-jsp",
  "ExamplesImageView",
  "BasicAnimation",
  "RA2",
  "RecuUF1",
  "AccesBD",
  "ecplise-workspace",
  "GIT_DITEC",
  "Programacion-Java",
  "M6-Acceso_a_datos",
  "M9-Programacion_de_servicios_y_procesos",
  "ts-playground",
  "challenge",
  "learning-spring",
  "TicketApp",
  "MusicPlayer",
  "FireBase",
  "AppDeApuntes",
  "joandaustria",
  "ProyectoWeb",
  "Juego",
  "AutomationWithPython",
]);
