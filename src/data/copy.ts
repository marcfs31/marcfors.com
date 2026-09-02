import { DEV_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_HOST } from "@/lib/site";
import type { Locale } from "@/lib/locale";

export type { Locale };

type UiCopy = {
  role: string;
  place: string;
  now: string;
  kicker: string;
  headline: string;
  tagline: string;
  lede: string;
  proofLine: string;
  aboutTitle: string;
  workTitle: string;
  breakTitle: string;
  projectsTitle: string;
  labTitle: string;
  labLede: string;
  moreTitle: string;
  signalTitle: string;
  signalLede: string;
  auditTitle: string;
  auditBody: string;
  auditClean: string;
  auditHot: string;
  obsTitle: string;
  vitalsTitle: string;
  healthLine: string;
  healthWaiting: string;
  contactTitle: string;
  contactLede: string;
  hireCta: string;
  buildCta: string;
  writeCta: string;
  hirePath: string;
  buildPath: string;
  hirePathLede: string;
  buildPathLede: string;
  hireSubject: string;
  buildSubject: string;
  source: string;
  live: string;
  private: string;
  public: string;
  lang: string;
  theme: string;
  idea: string;
  skipToContent: string;
  navLabel: string;
  expand: string;
  collapse: string;
  seeking: string;
  printCta: string;
  printTitle: string;
  printHint: string;
  caseStudy: string;
  problem: string;
  approach: string;
  result: string;
  atticTitle: string;
  hits: readonly string[];
  vitalGood: string;
  vitalDefs: {
    LCP: string;
    INP: string;
    CLS: string;
    FCP: string;
    TTFB: string;
  };
  eduTitle: string;
  skillsTitle: string;
  langsTitle: string;
  footer: string;
  notFoundTitle: string;
  notFoundBody: string;
  homeCta: string;
  errorTitle: string;
  errorBody: string;
  retryCta: string;
  traceTitle: string;
  traceLede: string;
  tracePaste: string;
  traceSample: string;
  traceClear: string;
  traceInvalid: string;
  traceSpans: string;
  traceDuration: string;
  traceEmpty: string;
  skillGroups: {
    frontend: string;
    testing: string;
    engineering: string;
    backend: string;
  };
  themeNames: {
    light: string;
    dark: string;
    green: string;
    blue: string;
    red: string;
  };
  controls: {
    tls: string;
    csp: string;
    frames: string;
    cookies: string;
    audit: string;
    obs: string;
  };
};

export const copy: Record<Locale, UiCopy> = {
  en: {
    role: "Frontend software engineer",
    place: "Barcelona · EU citizen",
    now: "React · TypeScript · Angular",
    kicker: "Open to work",
    headline: "Frontend software engineer",
    tagline: "I build interfaces that stay calm under load.",
    lede: "Seven-plus years in observability, fintech, banking and government. Strong in React and TypeScript, earlier full-stack in Java and Spring. I own features from technical design through production, raise test and CI quality, and mentor people onto the codebase.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcelona",
    aboutTitle: "Trace",
    workTitle: "Work",
    breakTitle: "Career break",
    projectsTitle: "Selected work",
    labTitle: "Lab",
    labLede: "Flashy pieces that would sit next to the tools I already ship. Each one maps to a skill I already practice — observability, maps, music, hardware, local-first software.",
    moreTitle: "Public repositories",
    signalTitle: "Signal",
    signalLede: "This desk watches itself. Transport encryption, a supply-chain audit on every build, first-party web vitals. No third-party tracker.",
    auditTitle: "npm audit",
    auditBody: "Production dependencies scanned",
    auditClean: "Clean",
    auditHot: "Findings",
    obsTitle: "Live",
    vitalsTitle: "Web vitals",
    healthLine: "Health",
    healthWaiting: "waiting for probe",
    contactTitle: "Contact",
    contactLede: "Two doors, one mailbox. Recruiters with a frontend role, or someone who needs a custom app. I read it.",
    hireCta: "Hire me",
    buildCta: "Commission work",
    writeCta: "Write to me",
    hirePath: "Recruiters",
    buildPath: "Custom work",
    hirePathLede: "Frontend software engineer roles. Barcelona or remote EU. React, TypeScript, Angular.",
    buildPathLede: "Need a product, dashboard or internal tool? I take it from technical design to production.",
    hireSubject: `Frontend role — ${SITE_HOST}`,
    buildSubject: `Custom app — ${SITE_HOST}`,
    source: "Source",
    live: "Live",
    private: "Private",
    public: "Public",
    lang: "Language",
    theme: "Theme",
    idea: "Idea",
    skipToContent: "Skip to content",
    navLabel: "Primary",
    expand: "Open",
    collapse: "Close",
    seeking: "Frontend · React · Barcelona or remote EU · available now",
    printCta: "Print CV",
    printTitle: "Curriculum",
    printHint: "Use the print dialog to save a PDF.",
    caseStudy: "Case study",
    problem: "Problem",
    approach: "Approach",
    result: "Result",
    atticTitle: "More",
    hits: [
      "Seven-plus years",
      "observability, fintech, banking and government",
      "React and TypeScript",
      "technical design through production",
      "frontend software engineer role",
      "Frontend software engineer roles",
      "Barcelona or remote EU",
      "React, TypeScript, Angular",
      "Recruiters with a frontend role",
    ],
    vitalGood: "Good",
    vitalDefs: {
      LCP: "Time until the largest heading or image in view is painted.",
      INP: "Delay from a click, tap or keypress until the next frame.",
      CLS: "How much visible content jumps after it appears. A high reading usually means a heading reflowed or a font swapped late.",
      FCP: "When the first text or image appears.",
      TTFB: "How long the server takes to start the response.",
    },
    eduTitle: "Education",
    skillsTitle: "Stack",
    langsTitle: "Languages",
    footer: `Barcelona · ${SITE_HOST} · source is public when the repo is`,
    notFoundTitle: "No signal on this frequency",
    notFoundBody: "That page is not on this desk. The home trace is still live.",
    homeCta: "Back to the desk",
    errorTitle: "The line dropped",
    errorBody: "Something failed while this desk was drawing itself. Retry, or write to me if it stays down.",
    retryCta: "Retry",
    traceTitle: "Trace Theater",
    traceLede: "Paste OpenTelemetry-ish JSON. Spans walk on from the wings. Errors take the red footlights. First-party only — no vendor SDK.",
    tracePaste: "Trace JSON",
    traceSample: "Load sample",
    traceClear: "Clear stage",
    traceInvalid: "That JSON is not a span tree I can stage.",
    traceSpans: "Spans",
    traceDuration: "Duration",
    traceEmpty: "Empty stage. Paste a trace or load the sample.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Engineering",
      backend: "Backend",
    },
    themeNames: {
      light: "Daylight paper",
      dark: "Observatory",
      green: "Signal green",
      blue: "Night blue",
      red: "Footlights",
    },
    controls: {
      tls: "TLS in production, HSTS preload",
      csp: "Content-Security-Policy, no third-party scripts",
      frames: "Clickjacking blocked (frame-ancestors none)",
      cookies: "No tracking cookies. Locale and theme stay in localStorage",
      audit: "npm audit on every CI run and at build",
      obs: "First-party web vitals + /api/health",
    },
  },
  es: {
    role: "Ingeniero frontend",
    place: "Barcelona · ciudadano UE",
    now: "React · TypeScript · Angular",
    kicker: "Disponible",
    headline: "Ingeniero frontend",
    tagline: "Construyo interfaces que se mantienen serenas bajo carga.",
    lede: "Más de siete años en observabilidad, fintech, banca y administración. Fuerte en React y TypeScript, backend previo en Java y Spring. Llevo features del diseño técnico a producción, subo tests y CI, y mentorizo a gente nueva en el código.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcelona",
    aboutTitle: "Traza",
    workTitle: "Experiencia",
    breakTitle: "Pausa profesional",
    projectsTitle: "Trabajo seleccionado",
    labTitle: "Laboratorio",
    labLede: "Piezas llamativas que encajarían junto a las herramientas que ya saco. Cada una usa un oficio que ya practico: observabilidad, mapas, música, hardware, software local-first.",
    moreTitle: "Repositorios públicos",
    signalTitle: "Señal",
    signalLede: "Este escritorio se observa a sí mismo. Cifrado en tránsito, auditoría de dependencias en cada build, web vitals propios. Sin tracker de terceros.",
    auditTitle: "npm audit",
    auditBody: "Dependencias de producción escaneadas",
    auditClean: "Limpio",
    auditHot: "Hallazgos",
    obsTitle: "En vivo",
    vitalsTitle: "Web vitals",
    healthLine: "Salud",
    healthWaiting: "esperando sonda",
    contactTitle: "Contacto",
    contactLede: "Dos puertas, un buzón. Reclutadores con un rol frontend, o quien necesite una app a medida. Lo leo.",
    hireCta: "Contrátame",
    buildCta: "Encargar trabajo",
    writeCta: "Escríbeme",
    hirePath: "Reclutadores",
    buildPath: "Trabajo a medida",
    hirePathLede: "Roles de ingeniero frontend. Barcelona o remoto UE. React, TypeScript, Angular.",
    buildPathLede: "¿Producto, dashboard o herramienta interna? Lo llevo del diseño técnico a producción.",
    hireSubject: `Rol frontend — ${SITE_HOST}`,
    buildSubject: `App a medida — ${SITE_HOST}`,
    source: "Código",
    live: "En vivo",
    private: "Privado",
    public: "Público",
    lang: "Idioma",
    theme: "Tema",
    idea: "Idea",
    skipToContent: "Saltar al contenido",
    navLabel: "Principal",
    expand: "Abrir",
    collapse: "Cerrar",
    seeking: "Frontend · React · Barcelona o remoto UE · disponible ahora",
    printCta: "Imprimir CV",
    printTitle: "Currículum",
    printHint: "Usa el diálogo de impresión para guardar un PDF.",
    caseStudy: "Caso de estudio",
    problem: "Problema",
    approach: "Enfoque",
    result: "Resultado",
    atticTitle: "Más",
    hits: [
      "Más de siete años",
      "observabilidad, fintech, banca y administración",
      "React y TypeScript",
      "diseño técnico a producción",
      "ingeniero frontend",
      "Roles de ingeniero frontend",
      "Barcelona o remoto UE",
      "React, TypeScript, Angular",
      "Reclutadores con un rol frontend",
    ],
    vitalGood: "Bien",
    vitalDefs: {
      LCP: "Tiempo hasta que se pinta el titular o la imagen más grande del viewport.",
      INP: "Retraso desde un clic, toque o tecla hasta el siguiente fotograma.",
      CLS: "Cuánto salta el contenido visible después de aparecer. Un valor alto suele ser un titular que reajusta o una fuente que llega tarde.",
      FCP: "Cuándo aparece el primer texto o imagen.",
      TTFB: "Cuánto tarda el servidor en empezar la respuesta.",
    },
    eduTitle: "Formación",
    skillsTitle: "Stack",
    langsTitle: "Idiomas",
    footer: `Barcelona · ${SITE_HOST} · el código es público cuando el repo lo es`,
    notFoundTitle: "No hay señal en esta frecuencia",
    notFoundBody: "Esa página no está en este escritorio. La traza de inicio sigue en vivo.",
    homeCta: "Volver al escritorio",
    errorTitle: "Se cortó la línea",
    errorBody: "Algo falló mientras este escritorio se dibujaba. Reintenta, o escríbeme si sigue caído.",
    retryCta: "Reintentar",
    traceTitle: "Trace Theater",
    traceLede: "Pega JSON al estilo OpenTelemetry. Los spans salen entre bambalinas. Los errores, candilejas rojas. Solo first-party — sin SDK de proveedor.",
    tracePaste: "JSON de traza",
    traceSample: "Cargar muestra",
    traceClear: "Vaciar escenario",
    traceInvalid: "Ese JSON no es un árbol de spans que pueda poner en escena.",
    traceSpans: "Spans",
    traceDuration: "Duración",
    traceEmpty: "Escenario vacío. Pega una traza o carga la muestra.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Ingeniería",
      backend: "Backend",
    },
    themeNames: {
      light: "Papel de día",
      dark: "Observatorio",
      green: "Verde señal",
      blue: "Azul noche",
      red: "Candilejas",
    },
    controls: {
      tls: "TLS en producción, HSTS preload",
      csp: "Content-Security-Policy, sin scripts de terceros",
      frames: "Clickjacking bloqueado (frame-ancestors none)",
      cookies: "Sin cookies de tracking. Idioma y tema quedan en localStorage",
      audit: "npm audit en cada CI y en el build",
      obs: "Web vitals propios + /api/health",
    },
  },
  ca: {
    role: "Enginyer frontend",
    place: "Barcelona · ciutadà UE",
    now: "React · TypeScript · Angular",
    kicker: "Disponible",
    headline: "Enginyer frontend",
    tagline: "Construo interfícies que es mantenen serenes sota càrrega.",
    lede: "Més de set anys en observabilitat, fintech, banca i administració. Fort en React i TypeScript, backend previ en Java i Spring. Porto les features del disseny tècnic a producció, pujo tests i CI, i faig mentoria a gent nova al codi.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcelona",
    aboutTitle: "Traça",
    workTitle: "Experiència",
    breakTitle: "Pausa professional",
    projectsTitle: "Treball seleccionat",
    labTitle: "Laboratori",
    labLede: "Peces vistoses que encaixarien al costat de les eines que ja publico. Cadascuna usa un ofici que ja practico: observabilitat, mapes, música, hardware, programari local-first.",
    moreTitle: "Repositoris públics",
    signalTitle: "Senyal",
    signalLede: "Aquest escriptori s'observa a si mateix. Xifratge en trànsit, auditoria de dependències a cada build, web vitals propis. Sense tracker de tercers.",
    auditTitle: "npm audit",
    auditBody: "Dependències de producció escanejades",
    auditClean: "Neteja",
    auditHot: "Troballes",
    obsTitle: "En directe",
    vitalsTitle: "Web vitals",
    healthLine: "Salut",
    healthWaiting: "esperant sonda",
    contactTitle: "Contacte",
    contactLede: "Dues portes, una bústia. Reclutadors amb un rol frontend, o qui necessiti una app a mida. Ho llegeixo.",
    hireCta: "Contracta'm",
    buildCta: "Encarregar feina",
    writeCta: "Escriu-me",
    hirePath: "Reclutadors",
    buildPath: "Feina a mida",
    hirePathLede: "Rols d'enginyer frontend. Barcelona o remot UE. React, TypeScript, Angular.",
    buildPathLede: "Producte, dashboard o eina interna? Ho porto del disseny tècnic a producció.",
    hireSubject: `Rol frontend — ${SITE_HOST}`,
    buildSubject: `App a mida — ${SITE_HOST}`,
    source: "Codi",
    live: "En directe",
    private: "Privat",
    public: "Públic",
    lang: "Llengua",
    theme: "Tema",
    idea: "Idea",
    skipToContent: "Salta al contingut",
    navLabel: "Principal",
    expand: "Obre",
    collapse: "Tanca",
    seeking: "Frontend · React · Barcelona o remot UE · disponible ara",
    printCta: "Imprimeix el CV",
    printTitle: "Currículum",
    printHint: "Fes servir el diàleg d'impressió per desar un PDF.",
    caseStudy: "Estudi de cas",
    problem: "Problema",
    approach: "Enfocament",
    result: "Resultat",
    atticTitle: "Més",
    hits: [
      "Més de set anys",
      "observabilitat, fintech, banca i administració",
      "React i TypeScript",
      "disseny tècnic a producció",
      "enginyer frontend",
      "Rols d'enginyer frontend",
      "Barcelona o remot UE",
      "React, TypeScript, Angular",
      "Reclutadors amb un rol frontend",
    ],
    vitalGood: "Bé",
    vitalDefs: {
      LCP: "Temps fins que es pinta el titular o la imatge més gran del viewport.",
      INP: "Retard des d'un clic, toc o tecla fins al fotograma següent.",
      CLS: "Quant salta el contingut visible després d'aparèixer. Un valor alt sol ser un titular que reajusta o una font que arriba tard.",
      FCP: "Quan apareix el primer text o imatge.",
      TTFB: "Quant triga el servidor a començar la resposta.",
    },
    eduTitle: "Formació",
    skillsTitle: "Stack",
    langsTitle: "Llengües",
    footer: `Barcelona · ${SITE_HOST} · el codi és públic quan el repo ho és`,
    notFoundTitle: "No hi ha senyal en aquesta freqüència",
    notFoundBody: "Aquesta pàgina no és en aquest escriptori. La traça d'inici continua en directe.",
    homeCta: "Torna a l'escriptori",
    errorTitle: "S'ha tallat la línia",
    errorBody: "Alguna cosa ha fallat mentre aquest escriptori es dibuixava. Torna-ho a provar, o escriu-me si continua caigut.",
    retryCta: "Reintenta",
    traceTitle: "Trace Theater",
    traceLede: "Enganxa JSON a l'estil OpenTelemetry. Els spans surten entre bambolines. Els errors, candeles vermelles. Només first-party — sense SDK de proveïdor.",
    tracePaste: "JSON de traça",
    traceSample: "Carrega mostra",
    traceClear: "Buida l'escenari",
    traceInvalid: "Aquest JSON no és un arbre de spans que pugui posar en escena.",
    traceSpans: "Spans",
    traceDuration: "Durada",
    traceEmpty: "Escenari buit. Enganxa una traça o carrega la mostra.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Enginyeria",
      backend: "Backend",
    },
    themeNames: {
      light: "Paper de dia",
      dark: "Observatori",
      green: "Verd senyal",
      blue: "Blau nit",
      red: "Candeles",
    },
    controls: {
      tls: "TLS en producció, HSTS preload",
      csp: "Content-Security-Policy, sense scripts de tercers",
      frames: "Clickjacking bloquejat (frame-ancestors none)",
      cookies: "Sense cookies de tracking. Llengua i tema queden a localStorage",
      audit: "npm audit a cada CI i al build",
      obs: "Web vitals propis + /api/health",
    },
  },
  it: {
    role: "Ingegnere frontend",
    place: "Barcellona · cittadino UE",
    now: "React · TypeScript · Angular",
    kicker: "Disponibile",
    headline: "Ingegnere frontend",
    tagline: "Costruisco interfacce che restano calme sotto carico.",
    lede: "Oltre sette anni in observability, fintech, banking e pubblica amministrazione. Forte in React e TypeScript, backend precedente in Java e Spring. Porto le feature dal design tecnico alla produzione, alzo test e CI, e faccio mentoring su chi entra nel codice.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcellona",
    aboutTitle: "Traccia",
    workTitle: "Esperienza",
    breakTitle: "Pausa professionale",
    projectsTitle: "Lavoro selezionato",
    labTitle: "Laboratorio",
    labLede: "Pezzi appariscenti che starebbero accanto agli strumenti che già pubblico. Ognuno usa un mestiere che già pratico: observability, mappe, musica, hardware, software local-first.",
    moreTitle: "Repository pubblici",
    signalTitle: "Segnale",
    signalLede: "Questa scrivania si osserva da sola. Cifratura in transito, audit delle dipendenze a ogni build, web vitals di prima parte. Nessun tracker di terzi.",
    auditTitle: "npm audit",
    auditBody: "Dipendenze di produzione analizzate",
    auditClean: "Pulito",
    auditHot: "Rilievi",
    obsTitle: "Live",
    vitalsTitle: "Web vitals",
    healthLine: "Salute",
    healthWaiting: "in attesa della sonda",
    contactTitle: "Contatto",
    contactLede: "Due porte, una casella. Recruiter con un ruolo frontend, o chi ha bisogno di un'app su misura. Lo leggo.",
    hireCta: "Assumimi",
    buildCta: "Commissiona un lavoro",
    writeCta: "Scrivimi",
    hirePath: "Recruiter",
    buildPath: "Lavoro su misura",
    hirePathLede: "Ruoli da ingegnere frontend. Barcellona o remoto UE. React, TypeScript, Angular.",
    buildPathLede: "Prodotto, dashboard o tool interno? Lo porto dal design tecnico alla produzione.",
    hireSubject: `Ruolo frontend — ${SITE_HOST}`,
    buildSubject: `App su misura — ${SITE_HOST}`,
    source: "Codice",
    live: "Live",
    private: "Privato",
    public: "Pubblico",
    lang: "Lingua",
    theme: "Tema",
    idea: "Idea",
    skipToContent: "Salta al contenuto",
    navLabel: "Principale",
    expand: "Apri",
    collapse: "Chiudi",
    seeking: "Frontend · React · Barcellona o remoto UE · disponibile ora",
    printCta: "Stampa CV",
    printTitle: "Curriculum",
    printHint: "Usa la finestra di stampa per salvare un PDF.",
    caseStudy: "Caso di studio",
    problem: "Problema",
    approach: "Approccio",
    result: "Risultato",
    atticTitle: "Altro",
    hits: [
      "Oltre sette anni",
      "observability, fintech, banking e pubblica amministrazione",
      "React e TypeScript",
      "design tecnico alla produzione",
      "ingegnere frontend",
      "Ruoli da ingegnere frontend",
      "Barcellona o remoto UE",
      "React, TypeScript, Angular",
      "Recruiter con un ruolo frontend",
    ],
    vitalGood: "Buono",
    vitalDefs: {
      LCP: "Tempo finché non viene dipinto il titolo o l'immagine più grande nel viewport.",
      INP: "Ritardo da un clic, tocco o tasto fino al frame successivo.",
      CLS: "Quanto salta il contenuto visibile dopo essere apparso. Un valore alto di solito è un titolo che va a capo o un font che arriva tardi.",
      FCP: "Quando compare il primo testo o immagine.",
      TTFB: "Quanto impiega il server ad avviare la risposta.",
    },
    eduTitle: "Formazione",
    skillsTitle: "Stack",
    langsTitle: "Lingue",
    footer: `Barcellona · ${SITE_HOST} · il codice è pubblico quando lo è il repo`,
    notFoundTitle: "Nessun segnale su questa frequenza",
    notFoundBody: "Questa pagina non è su questa scrivania. La traccia home è ancora live.",
    homeCta: "Torna alla scrivania",
    errorTitle: "La linea è caduta",
    errorBody: "Qualcosa è fallito mentre questa scrivania si disegnava. Riprova, o scrivimi se resta giù.",
    retryCta: "Riprova",
    traceTitle: "Trace Theater",
    traceLede: "Incolla JSON in stile OpenTelemetry. Gli span entrano dalle quinte. Gli errori, luci rosse. Solo first-party — nessun SDK di vendor.",
    tracePaste: "JSON della traccia",
    traceSample: "Carica campione",
    traceClear: "Svuota il palco",
    traceInvalid: "Quel JSON non è un albero di span che posso mettere in scena.",
    traceSpans: "Span",
    traceDuration: "Durata",
    traceEmpty: "Palco vuoto. Incolla una traccia o carica il campione.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Ingegneria",
      backend: "Backend",
    },
    themeNames: {
      light: "Carta diurna",
      dark: "Osservatorio",
      green: "Verde segnale",
      blue: "Blu notte",
      red: "Luci di scena",
    },
    controls: {
      tls: "TLS in produzione, HSTS preload",
      csp: "Content-Security-Policy, nessuno script di terzi",
      frames: "Clickjacking bloccato (frame-ancestors none)",
      cookies: "Niente cookie di tracking. Lingua e tema restano in localStorage",
      audit: "npm audit a ogni CI e in build",
      obs: "Web vitals di prima parte + /api/health",
    },
  },
  pt: {
    role: "Engenheiro frontend",
    place: "Barcelona · cidadão da UE",
    now: "React · TypeScript · Angular",
    kicker: "Disponível",
    headline: "Engenheiro frontend",
    tagline: "Construo interfaces que se mantêm calmas sob carga.",
    lede: "Mais de sete anos em observabilidade, fintech, banca e administração. Forte em React e TypeScript, backend anterior em Java e Spring. Levo features do desenho técnico à produção, subo testes e CI, e faço mentoria a quem entra no código.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcelona",
    aboutTitle: "Traço",
    workTitle: "Experiência",
    breakTitle: "Pausa profissional",
    projectsTitle: "Trabalho selecionado",
    labTitle: "Laboratório",
    labLede: "Peças vistosas que caberiam ao lado das ferramentas que já publico. Cada uma usa um ofício que já pratico: observabilidade, mapas, música, hardware, software local-first.",
    moreTitle: "Repositórios públicos",
    signalTitle: "Sinal",
    signalLede: "Esta secretária observa-se a si mesma. Cifragem em trânsito, auditoria de dependências em cada build, web vitals próprios. Sem tracker de terceiros.",
    auditTitle: "npm audit",
    auditBody: "Dependências de produção analisadas",
    auditClean: "Limpo",
    auditHot: "Achados",
    obsTitle: "Ao vivo",
    vitalsTitle: "Web vitals",
    healthLine: "Saúde",
    healthWaiting: "à espera da sonda",
    contactTitle: "Contacto",
    contactLede: "Duas portas, uma caixa. Recrutadores com um papel frontend, ou quem precisa de uma app à medida. Eu leio.",
    hireCta: "Contrata-me",
    buildCta: "Encomendar trabalho",
    writeCta: "Escreve-me",
    hirePath: "Recrutadores",
    buildPath: "Trabalho à medida",
    hirePathLede: "Papéis de engenheiro frontend. Barcelona ou remoto UE. React, TypeScript, Angular.",
    buildPathLede: "Produto, dashboard ou ferramenta interna? Levo do desenho técnico à produção.",
    hireSubject: `Papel frontend — ${SITE_HOST}`,
    buildSubject: `App à medida — ${SITE_HOST}`,
    source: "Código",
    live: "Ao vivo",
    private: "Privado",
    public: "Público",
    lang: "Língua",
    theme: "Tema",
    idea: "Ideia",
    skipToContent: "Saltar para o conteúdo",
    navLabel: "Principal",
    expand: "Abrir",
    collapse: "Fechar",
    seeking: "Frontend · React · Barcelona ou remoto UE · disponível agora",
    printCta: "Imprimir CV",
    printTitle: "Currículo",
    printHint: "Usa o diálogo de impressão para guardar um PDF.",
    caseStudy: "Estudo de caso",
    problem: "Problema",
    approach: "Abordagem",
    result: "Resultado",
    atticTitle: "Mais",
    hits: [
      "Mais de sete anos",
      "observabilidade, fintech, banca e administração",
      "React e TypeScript",
      "desenho técnico à produção",
      "engenheiro frontend",
      "Papéis de engenheiro frontend",
      "Barcelona ou remoto UE",
      "React, TypeScript, Angular",
      "Recrutadores com um papel frontend",
    ],
    vitalGood: "Bom",
    vitalDefs: {
      LCP: "Tempo até o maior título ou imagem no viewport ser pintado.",
      INP: "Atraso desde um clique, toque ou tecla até ao frame seguinte.",
      CLS: "Quanto o conteúdo visível salta depois de aparecer. Um valor alto costuma ser um título a refluir ou uma fonte a chegar tarde.",
      FCP: "Quando aparece o primeiro texto ou imagem.",
      TTFB: "Quanto o servidor demora a começar a resposta.",
    },
    eduTitle: "Formação",
    skillsTitle: "Stack",
    langsTitle: "Línguas",
    footer: `Barcelona · ${SITE_HOST} · o código é público quando o repo o é`,
    notFoundTitle: "Sem sinal nesta frequência",
    notFoundBody: "Essa página não está nesta secretária. O traço inicial continua ao vivo.",
    homeCta: "Voltar à secretária",
    errorTitle: "A linha caiu",
    errorBody: "Algo falhou enquanto esta secretária se desenhava. Tenta de novo, ou escreve-me se continuar em baixo.",
    retryCta: "Tentar de novo",
    traceTitle: "Trace Theater",
    traceLede: "Cola JSON ao estilo OpenTelemetry. Os spans entram pelas coxias. Os erros, luzes vermelhas. Só first-party — sem SDK de fornecedor.",
    tracePaste: "JSON do traço",
    traceSample: "Carregar amostra",
    traceClear: "Limpar palco",
    traceInvalid: "Esse JSON não é uma árvore de spans que eu consiga encenar.",
    traceSpans: "Spans",
    traceDuration: "Duração",
    traceEmpty: "Palco vazio. Cola um traço ou carrega a amostra.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Engenharia",
      backend: "Backend",
    },
    themeNames: {
      light: "Papel de dia",
      dark: "Observatório",
      green: "Verde sinal",
      blue: "Azul noite",
      red: "Luzes de palco",
    },
    controls: {
      tls: "TLS em produção, HSTS preload",
      csp: "Content-Security-Policy, sem scripts de terceiros",
      frames: "Clickjacking bloqueado (frame-ancestors none)",
      cookies: "Sem cookies de tracking. Língua e tema ficam no localStorage",
      audit: "npm audit em cada CI e no build",
      obs: "Web vitals próprios + /api/health",
    },
  },
  de: {
    role: "Frontend-Softwareingenieur",
    place: "Barcelona · EU-Bürger",
    now: "React · TypeScript · Angular",
    kicker: "Offen für Arbeit",
    headline: "Frontend-Softwareingenieur",
    tagline: "Ich baue Oberflächen, die unter Last ruhig bleiben.",
    lede: "Mehr als sieben Jahre in Observability, Fintech, Banking und Verwaltung. Stark in React und TypeScript, zuvor Full-Stack mit Java und Spring. Ich führe Features vom technischen Entwurf bis in Produktion, hebe Test- und CI-Qualität und arbeite neue Leute ein.",
    proofLine: "Dynatrace Dashboards · React · TypeScript · Angular · Barcelona",
    aboutTitle: "Spur",
    workTitle: "Beruf",
    breakTitle: "Berufspause",
    projectsTitle: "Ausgewählte Arbeit",
    labTitle: "Labor",
    labLede: "Auffällige Stücke, die neben den Werkzeugen stehen könnten, die ich schon ausliefere. Jedes nutzt ein Handwerk, das ich schon übe: Observability, Karten, Musik, Hardware, Local-First-Software.",
    moreTitle: "Öffentliche Repositories",
    signalTitle: "Signal",
    signalLede: "Dieser Schreibtisch beobachtet sich selbst. Transportverschlüsselung, Supply-Chain-Audit bei jedem Build, eigene Web Vitals. Kein Tracker Dritter.",
    auditTitle: "npm audit",
    auditBody: "Produktionsabhängigkeiten geprüft",
    auditClean: "Sauber",
    auditHot: "Fundstellen",
    obsTitle: "Live",
    vitalsTitle: "Web vitals",
    healthLine: "Gesundheit",
    healthWaiting: "warte auf Sonde",
    contactTitle: "Kontakt",
    contactLede: "Zwei Türen, ein Postfach. Recruiter mit einer Frontend-Rolle, oder jemand, der eine maßgeschneiderte App braucht. Ich lese mit.",
    hireCta: "Einstellen",
    buildCta: "Arbeit beauftragen",
    writeCta: "Schreib mir",
    hirePath: "Recruiter",
    buildPath: "Auftrag",
    hirePathLede: "Rollen als Frontend-Softwareingenieur. Barcelona oder remote EU. React, TypeScript, Angular.",
    buildPathLede: "Produkt, Dashboard oder internes Tool? Vom technischen Entwurf bis in Produktion.",
    hireSubject: `Frontend-Rolle — ${SITE_HOST}`,
    buildSubject: `Maßgeschneiderte App — ${SITE_HOST}`,
    source: "Quellcode",
    live: "Live",
    private: "Privat",
    public: "Öffentlich",
    lang: "Sprache",
    theme: "Thema",
    idea: "Idee",
    skipToContent: "Zum Inhalt springen",
    navLabel: "Primär",
    expand: "Öffnen",
    collapse: "Schließen",
    seeking: "Frontend · React · Barcelona oder remote EU · sofort verfügbar",
    printCta: "Lebenslauf drucken",
    printTitle: "Lebenslauf",
    printHint: "Im Druckdialog als PDF speichern.",
    caseStudy: "Fallstudie",
    problem: "Problem",
    approach: "Vorgehen",
    result: "Ergebnis",
    atticTitle: "Mehr",
    hits: [
      "Mehr als sieben Jahre",
      "Observability, Fintech, Banking und Verwaltung",
      "React und TypeScript",
      "technischen Entwurf bis in Produktion",
      "Frontend-Softwareingenieur",
      "Rollen als Frontend-Softwareingenieur",
      "Barcelona oder remote EU",
      "React, TypeScript, Angular",
      "Recruiter mit einer Frontend-Rolle",
    ],
    vitalGood: "Gut",
    vitalDefs: {
      LCP: "Zeit, bis die größte Überschrift oder das größte Bild im Viewport gemalt ist.",
      INP: "Verzögerung von Klick, Tipp oder Taste bis zum nächsten Frame.",
      CLS: "Wie stark sichtbarer Inhalt nach dem Erscheinen springt. Ein hoher Wert heißt meist: eine Überschrift ist umgebrochen oder eine Schrift kam spät.",
      FCP: "Wann der erste Text oder das erste Bild erscheint.",
      TTFB: "Wie lange der Server braucht, um die Antwort zu beginnen.",
    },
    eduTitle: "Ausbildung",
    skillsTitle: "Stack",
    langsTitle: "Sprachen",
    footer: `Barcelona · ${SITE_HOST} · Quellcode ist öffentlich, wenn das Repo es ist`,
    notFoundTitle: "Kein Signal auf dieser Frequenz",
    notFoundBody: "Diese Seite liegt nicht auf diesem Schreibtisch. Die Startspur läuft noch.",
    homeCta: "Zurück zum Schreibtisch",
    errorTitle: "Die Leitung ist weg",
    errorBody: "Etwas ist fehlgeschlagen, während dieser Schreibtisch sich zeichnete. Nochmal versuchen, oder schreib mir, wenn es bleibt.",
    retryCta: "Erneut versuchen",
    traceTitle: "Trace Theater",
    traceLede: "OpenTelemetry-artiges JSON einfügen. Spans kommen aus den Kulissen. Fehler stehen im roten Fußlicht. Nur first-party — kein Vendor-SDK.",
    tracePaste: "Trace-JSON",
    traceSample: "Beispiel laden",
    traceClear: "Bühne leeren",
    traceInvalid: "Dieses JSON ist kein Span-Baum, den ich inszenieren kann.",
    traceSpans: "Spans",
    traceDuration: "Dauer",
    traceEmpty: "Leere Bühne. Trace einfügen oder das Beispiel laden.",
    skillGroups: {
      frontend: "Frontend",
      testing: "Testing",
      engineering: "Engineering",
      backend: "Backend",
    },
    themeNames: {
      light: "Tageslichtpapier",
      dark: "Sternwarte",
      green: "Signalgrün",
      blue: "Nachtblau",
      red: "Fußlichter",
    },
    controls: {
      tls: "TLS in Produktion, HSTS preload",
      csp: "Content-Security-Policy, keine Drittanbieter-Skripte",
      frames: "Clickjacking blockiert (frame-ancestors none)",
      cookies: "Keine Tracking-Cookies. Sprache und Thema bleiben in localStorage",
      audit: "npm audit bei jedem CI-Lauf und beim Build",
      obs: "Eigene Web Vitals + /api/health",
    },
  },
};

type Job = { org: string; title: string; when: string; body: string; points: readonly string[] };

export const experience: Record<Locale, readonly Job[]> = {
  en: [
    {
      org: "Dynatrace",
      title: "Software Engineer",
      when: "May 2022 — Nov 2025",
      body: "Frontend for Dashboards and Notebooks — Angular, then React and TypeScript. Owned work from technical design through release.",
      points: [
        "Shared frontend library used across both products",
        "Raised automated test coverage ~20% in two weeks on a critical project",
        "Cut the integration-test suite so Jenkins ran faster",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Software Engineer",
      when: "May 2020 — May 2022",
      body: "Enterprise Angular for retail and private banking products in Saudi Aramco’s banking environment.",
      points: [
        "Reusable components in a large shared framework",
        "Desktop and mobile under demanding delivery timelines",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Software Developer",
      when: "Jun 2018 — Apr 2020",
      body: "Enterprise software for the Justice Department’s judicial case-management system.",
      points: [
        "Java 7/8 services with Spring, Struts and REST APIs",
        "Oracle and SQL Server in large government teams",
      ],
    },
  ],
  es: [
    {
      org: "Dynatrace",
      title: "Ingeniero de software",
      when: "Mayo 2022 — nov 2025",
      body: "Frontend para Dashboards y Notebooks: Angular, luego React y TypeScript. Del diseño técnico al release.",
      points: [
        "Biblioteca frontend compartida en ambos productos",
        "Cobertura de tests automáticos ~20% en dos semanas en un proyecto crítico",
        "Suite de integración recortada para acelerar Jenkins",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Ingeniero de software",
      when: "Mayo 2020 — mayo 2022",
      body: "Angular de empresa para banca retail y privada en el entorno de Saudi Aramco.",
      points: [
        "Componentes reutilizables en un framework compartido",
        "Escritorio y móvil con plazos exigentes",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Desarrollador de software",
      when: "Jun 2018 — abr 2020",
      body: "Software de empresa para el sistema de gestión judicial del Departamento de Justicia.",
      points: [
        "Servicios Java 7/8 con Spring, Struts y APIs REST",
        "Oracle y SQL Server en equipos grandes de la administración",
      ],
    },
  ],
  ca: [
    {
      org: "Dynatrace",
      title: "Enginyer de programari",
      when: "Maig 2022 — nov 2025",
      body: "Frontend per a Dashboards i Notebooks: Angular, després React i TypeScript. Del disseny tècnic al release.",
      points: [
        "Biblioteca frontend compartida en tots dos productes",
        "Cobertura de tests automàtics ~20% en dues setmanes en un projecte crític",
        "Suite d'integració retallada per accelerar Jenkins",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Enginyer de programari",
      when: "Maig 2020 — maig 2022",
      body: "Angular d'empresa per a banca retail i privada en l'entorn de Saudi Aramco.",
      points: [
        "Components reutilitzables en un framework compartit",
        "Escriptori i mòbil amb terminis exigents",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Desenvolupador de programari",
      when: "Jun 2018 — abr 2020",
      body: "Programari d'empresa per al sistema de gestió judicial del Departament de Justícia.",
      points: [
        "Serveis Java 7/8 amb Spring, Struts i APIs REST",
        "Oracle i SQL Server en equips grans de l'administració",
      ],
    },
  ],
  it: [
    {
      org: "Dynatrace",
      title: "Software Engineer",
      when: "Mag 2022 — nov 2025",
      body: "Frontend per Dashboards e Notebooks: Angular, poi React e TypeScript. Dal design tecnico al release.",
      points: [
        "Libreria frontend condivisa su entrambi i prodotti",
        "Coverage dei test automatici ~20% in due settimane su un progetto critico",
        "Suite di integrazione ridotta per accelerare Jenkins",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Software Engineer",
      when: "Mag 2020 — mag 2022",
      body: "Angular enterprise per retail e private banking nell'ambiente bancario di Saudi Aramco.",
      points: [
        "Componenti riusabili in un grande framework condiviso",
        "Desktop e mobile con scadenze strette",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Software Developer",
      when: "Giu 2018 — apr 2020",
      body: "Software enterprise per il case management del Dipartimento di Giustizia.",
      points: [
        "Servizi Java 7/8 con Spring, Struts e API REST",
        "Oracle e SQL Server in grandi team della pubblica amministrazione",
      ],
    },
  ],
  pt: [
    {
      org: "Dynatrace",
      title: "Software Engineer",
      when: "Mai 2022 — nov 2025",
      body: "Frontend para Dashboards e Notebooks: Angular, depois React e TypeScript. Do desenho técnico ao release.",
      points: [
        "Biblioteca frontend partilhada nos dois produtos",
        "Cobertura de testes automáticos ~20% em duas semanas num projeto crítico",
        "Suite de integração enxuta para acelerar o Jenkins",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Software Engineer",
      when: "Mai 2020 — mai 2022",
      body: "Angular empresarial para banca de retalho e privada no ambiente da Saudi Aramco.",
      points: [
        "Componentes reutilizáveis num grande framework partilhado",
        "Ambiente de trabalho e telemóvel com prazos exigentes",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Software Developer",
      when: "Jun 2018 — abr 2020",
      body: "Software empresarial para a gestão de processos do Departamento de Justiça.",
      points: [
        "Serviços Java 7/8 com Spring, Struts e APIs REST",
        "Oracle e SQL Server em grandes equipas da administração",
      ],
    },
  ],
  de: [
    {
      org: "Dynatrace",
      title: "Software Engineer",
      when: "Mai 2022 — Nov 2025",
      body: "Frontend für Dashboards und Notebooks: zuerst Angular, dann React und TypeScript. Vom technischen Entwurf bis zum Release.",
      points: [
        "Gemeinsame Frontend-Bibliothek für beide Produkte",
        "Automatisierte Testabdeckung ~20 % in zwei Wochen auf einem kritischen Projekt",
        "Integrationssuite gekürzt, damit Jenkins schneller lief",
      ],
    },
    {
      org: "CREALOGIX Group",
      title: "Software Engineer",
      when: "Mai 2020 — Mai 2022",
      body: "Enterprise-Angular für Retail- und Private-Banking in der Umgebung von Saudi Aramco.",
      points: [
        "Wiederverwendbare Komponenten in einem großen Shared Framework",
        "Desktop und Mobil unter engen Lieferfristen",
      ],
    },
    {
      org: "T-Systems Iberia",
      title: "Software Developer",
      when: "Jun 2018 — Apr 2020",
      body: "Enterprise-Software für das Fallmanagementsystem des Justizministeriums.",
      points: [
        "Java-7/8-Dienste mit Spring, Struts und REST-APIs",
        "Oracle und SQL Server in großen Verwaltungsteams",
      ],
    },
  ],
};

export const careerBreak: Record<Locale, { when: string; body: string }> = {
  en: {
    when: "Dec 2025 — present",
    body: "Personal matters. Staying current with React. Open to the next frontend software engineer role and to custom app work.",
  },
  es: {
    when: "Dic 2025 — presente",
    body: "Pausa profesional por asuntos personales, manteniendo el React al día y buscando el siguiente rol de ingeniero frontend.",
  },
  ca: {
    when: "Des 2025 — present",
    body: "Pausa professional per assumptes personals, mantenint React al dia i buscant el següent rol d'enginyer frontend.",
  },
  it: {
    when: "Dic 2025 — presente",
    body: "Pausa professionale per motivi personali, restando aggiornato sull'ecosistema React e cercando il prossimo ruolo da ingegnere frontend.",
  },
  pt: {
    when: "Dez 2025 — presente",
    body: "Pausa profissional por assuntos pessoais, mantendo o React em dia e à procura do próximo papel de engenheiro frontend.",
  },
  de: {
    when: "Dez 2025 — heute",
    body: "Berufspause aus persönlichen Gründen, bei laufender Arbeit am React-Ökosystem und auf der Suche nach der nächsten Rolle als Frontend-Softwareingenieur.",
  },
};

export const education: Record<Locale, readonly string[]> = {
  en: [
    "Computer Engineering coursework — Universitat Oberta de Catalunya, 2021–2022",
    "Higher Technician in Multi-Platform Applications (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Technician in Microcomputer Systems and Networks (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
  es: [
    "Cursos de Ingeniería Informática — Universitat Oberta de Catalunya, 2021–2022",
    "Técnico superior en Desarrollo de Aplicaciones Multiplataforma (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Técnico en Sistemas Microinformáticos y Redes (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
  ca: [
    "Cursos d'Enginyeria Informàtica — Universitat Oberta de Catalunya, 2021–2022",
    "Tècnic superior en Desenvolupament d'Aplicacions Multiplataforma (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Tècnic en Sistemes Microinformàtics i Xarxes (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
  it: [
    "Corsi di Ingegneria Informatica — Universitat Oberta de Catalunya, 2021–2022",
    "Tecnico superiore in applicazioni multi-piattaforma (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Tecnico in sistemi microcomputer e reti (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
  pt: [
    "Cadeiras de Engenharia Informática — Universitat Oberta de Catalunya, 2021–2022",
    "Técnico superior em Aplicações Multiplataforma (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Técnico em Sistemas Microinformáticos e Redes (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
  de: [
    "Informatik-Studiengang (Teilstudium) — Universitat Oberta de Catalunya, 2021–2022",
    "Höherer Techniker für Multiplattform-Anwendungen (CFGS — DAM) — Institut Joan d’Àustria, 2017–2019",
    "Techniker für Mikrocomputersysteme und Netzwerke (CFGM — SMX) — Institut Escola del Treball, 2015–2017",
  ],
};

export const languages: Record<Locale, string> = {
  en: "Spanish and Catalan native. English proficient. Italian — basic working proficiency. Portuguese basic. German beginner (currently learning).",
  es: "Castellano y catalán nativos. Inglés profesional. Italiano con competencia laboral básica. Portugués básico. Alemán principiante (aprendiendo).",
  ca: "Castellà i català natius. Anglès professional. Italià amb competència laboral bàsica. Portuguès bàsic. Alemany principiant (aprenent).",
  it: "Spagnolo e catalano madrelingua. Inglese professionale. Italiano con competenza lavorativa di base. Portoghese base. Tedesco principiante (in apprendimento).",
  pt: "Castelhano e catalão nativos. Inglês profissional. Italiano com proficiência laboral básica. Português básico. Alemão principiante (a aprender).",
  de: "Spanisch und Katalanisch Muttersprache. Englisch verhandlungssicher. Italienisch mit grundlegender Arbeitskompetenz. Portugiesisch grundlegend. Deutsch Anfänger (lerne gerade).",
};

export const skills = {
  frontend: [
    "React",
    "TypeScript",
    "JavaScript",
    "Angular",
    "HTML5",
    "CSS3",
    "RxJS",
    "Accessibility",
    "State management",
  ],
  testing: ["React Testing Library", "Jest", "Playwright", "Integration testing"],
  engineering: ["Git", "CI/CD", "Jenkins", "Agile", "Code reviews", "Mentoring"],
  backend: ["Java", "Spring", "Struts", "REST APIs", "Oracle", "SQL Server"],
};

export const contact = {
  email: DEV_EMAIL,
  linkedin: LINKEDIN_URL,
  github: GITHUB_URL,
};
