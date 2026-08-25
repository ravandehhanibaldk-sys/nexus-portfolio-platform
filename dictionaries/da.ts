import type { Dictionary } from "./en";

/**
 * Danish dictionary — Workstream 3 Phase C. AI-drafted translation.
 *
 * [DANISH COPY REVIEW PENDING] — technically complete and wired into the
 * i18n architecture, but has NOT yet received the native-speaker /
 * professional linguistic review required by the Master Addendum's Danish
 * Language Quality Gate before it can be treated as production-approved.
 * Do not remove this notice without that review actually happening.
 */
const da: Dictionary = {
  common: {
    viewLarger: "Se større",
    close: "Luk",
    previousImage: "Forrige billede",
    nextImage: "Næste billede",
    backToPortfolio: "Tilbage til porteføljen",
    languageName: "Dansk",
    switchLanguage: "English",
  },
  nav: {
    projectSections: "Projektafsnit",
    beats: {
      clientChallenge: "01 Udfordring",
      site: "02 Grund",
      constraints: "03 Rammer",
      designAlternatives: "04 Proces",
      finalDecision: "05 Beslutning",
      finalArchitecture: "06 Arkitektur",
      reflection: "07 Refleksion",
    },
  },
  home: {
    eyebrow: "Hanibal Ravandeh — Arkitektonisk portefølje",
    title: "Udvalgte projekter",
    aboutLinkLabel: "Om",
  },
  sections: {
    clientChallenge: "01 — Kundens udfordring",
    site: "02 — Grunden",
    constraints: "03 — Rammer",
    designThinking: "04 — Designtankegang",
    designProcess: "05 — Designproces",
    finalDecision: "06 — Endelig beslutning",
    finalArchitecture: "07 — Endelig arkitektur",
    reflection: "08 — Refleksion",
    exteriorInteriorArchitecture: "Ude- og indearkitektur",
    plansAndSections: "Planer & Snit",
    sectionsLabel: "Snit",
    environmentalDiagrams: "Miljødiagrammer",
    selectedProposal: "Valgt forslag —",
  },
  climate: {
    solarAltitude: "SOLHØJDE",
    at: "KL.",
    prevailingWind: "FREMHERSKENDE VIND",
    temperature: "TEMPERATUR",
    monthlyMean: "MÅNEDLIGT GENNEMSNIT",
    relativeHumidity: "RELATIV LUFTFUGTIGHED",
    regionalReference: "REGIONAL REFERENCE",
    rainfall: "NEDBØR",
    monthTotal: "MÅNEDLIG TOTAL",
    profileSuffix: "PROFIL",
    seasons: { winter: "VINTER", spring: "FORÅR", summer: "SOMMER", autumn: "EFTERÅR" },
    monthAbbrev: {
      JAN: "JAN", FEB: "FEB", MAR: "MAR", APR: "APR", MAY: "MAJ", JUN: "JUN",
      JUL: "JUL", AUG: "AUG", SEP: "SEP", OCT: "OKT", NOV: "NOV", DEC: "DEC",
    },
    aria: {
      interfaceLabel: "Klimainstrument for {title}",
      seasonalImage: "{title} – sæsonbillede",
      imageInSeason: "{title} – {season}",
      solarPosition: "Solposition",
      solarAltitudePath: "Solhøjdebane",
      wind: "Vind",
      temperature: "Temperatur",
      relativeHumidity: "Relativ luftfugtighed",
      rainfall: "Nedbør",
      monthSelector: "Månedsvælger",
      months: "Måneder",
      previousMonth: "Forrige måned",
      nextMonth: "Næste måned",
      playSequence: "Afspil månedlig sekvens",
      pauseSequence: "Sæt månedlig sekvens på pause",
    },
  },
  solar: {
    panelLabel: "Solbane",
    panelTitle: "Højde / Azimut",
    metaTrueNorth: "sand nord",
    metaCoordinateDerived: "koordinatberegnet",
    daylight: "dagslys",
    noonAltitude: "middagshøjde",
    sunrise: "solopgang",
    sunset: "solnedgang",
    axisLabel: "AZIMUT · SAND NORD",
    readingLabel: "Arkitektonisk aflæsning.",
    insightHigh:
      "En høj sol ved middagstid taler for robust afskærmning og kontrolleret glasareal frem for maksimal soladgang — lavtstående sol morgen og aften kræver særlig opmærksomhed på vestvendte åbninger.",
    insightLow:
      "En meget lav sol ved middagstid gør uhindret sydvendt adgang værdifuld — nærliggende bygningsvolumener, beplantning eller hegn kan give markant skygge på bygningen på dette tidspunkt af året.",
    /** {season} placeholder is sentence-initial here — lib/i18n-format.ts capitalizes the formatted result. */
    insightTransition:
      "{season}sovergangen flytter solhøjden hurtigt måned for måned; afskærmnings- og glasstrategier har gavn af fleksibilitet frem for én fast antagelse.",
  },
  wind: {
    panelLabel: "Vindeksponering",
    panelTitle: "Retning / Sæsonbetonet vægtning",
    metaDirection: "16-retnings",
    metaSource: "godkendte rapportbetegnelser",
    axisLabel: "SÆSONBETONET RETNINGSVÆGTNING · IKKE MÅNEDLIG HYPPIGHED",
    prevailingSector: "fremherskende sektor",
    variable: "Variabel",
    frequencyNotEstablished: "hyppighed ikke fastlagt",
    honestyNote:
      "Den tilgængelige rapport fastlægger ikke en verificeret månedlig retningsfordeling for denne grund. Diagrammet illustrerer udelukkende den godkendte sæsonmæssige eksponering — det angiver ikke en præcis måling.",
    envelopeReading: "Klimaskærmens aflæsning.",
    reportedSpeed: "Registreret hastighed:",
  },
  seasonsLower: { winter: "vinter", spring: "forår", summer: "sommer", autumn: "efterår" },
};

export default da;
