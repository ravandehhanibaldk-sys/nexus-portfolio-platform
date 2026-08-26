import type { Dictionary } from "./en";

/**
 * Danish dictionary — Workstream 3 Phase C, reviewed and corrected for
 * natural Danish phrasing/grammar in a later pass (see
 * ARCHITECTURE_DECISIONS.md).
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
    environmentalAnalysis: "Miljøanalyse",
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
    siteClimateInstrumentLabel: "KLIMAINSTRUMENT FOR GRUNDEN",
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
  siteLocation: {
    heading: "Lokaliseringsplan",
    coastRoad: "Kystvej",
    secondaryAccessRoad: "Sekundær adgangsvej",
    adjacentBuildings: "Tilstødende bygninger",
    adjacentPropertyLimits: "Tilstødende grundgrænser",
    projectSite: "Projektgrund",
    siteConditionLabel: "Grundforhold",
    siteConditionValue: "Vandkant",
    accessLabel: "Adgang",
    accessValue: "2 veje",
  },
  seasonsLower: { winter: "vinter", spring: "forår", summer: "sommer", autumn: "efterår" },
};

export default da;
