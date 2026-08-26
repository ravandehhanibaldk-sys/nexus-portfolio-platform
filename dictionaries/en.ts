/**
 * Canonical English dictionary — Workstream 3 Phase B/C. English wording
 * here is the pre-existing approved production copy, moved into the
 * translation architecture unchanged (Phase B: prove the architecture
 * doesn't alter content).
 */
const en = {
  common: {
    viewLarger: "View larger",
    close: "Close",
    previousImage: "Previous image",
    nextImage: "Next image",
    backToPortfolio: "Back to Portfolio",
    languageName: "English",
    switchLanguage: "Dansk",
  },
  nav: {
    projectSections: "Project sections",
    beats: {
      clientChallenge: "01 Challenge",
      site: "02 Site",
      constraints: "03 Constraints",
      designAlternatives: "04 Process",
      finalDecision: "05 Decision",
      finalArchitecture: "06 Architecture",
      reflection: "07 Reflection",
    },
  },
  home: {
    eyebrow: "Hanibal Ravandeh — Architectural Portfolio",
    title: "Selected Work",
    aboutLinkLabel: "About",
  },
  sections: {
    clientChallenge: "01 — Client Challenge",
    site: "02 — Site",
    constraints: "03 — Constraints",
    designThinking: "04 — Design Thinking",
    designProcess: "05 — Design Process",
    finalDecision: "06 — Final Decision",
    finalArchitecture: "07 — Final Architecture",
    reflection: "08 — Reflection",
    exteriorInteriorArchitecture: "Exterior & Interior Architecture",
    plansAndSections: "Plans & Sections",
    sectionsLabel: "Sections",
    /** Eyebrow label above the static Environmental Analysis image
     * (components/red-sun/site-analysis-editorial.tsx,
     * components/efe/site-analysis-editorial.tsx) — replaces the removed
     * interactive Environmental Diagrams system. */
    environmentalAnalysis: "Environmental Analysis",
    selectedProposal: "Selected Proposal —",
  },
  climate: {
    solarAltitude: "SOLAR ALTITUDE",
    at: "AT",
    prevailingWind: "PREVAILING WIND",
    temperature: "TEMPERATURE",
    monthlyMean: "MONTHLY MEAN",
    relativeHumidity: "RELATIVE HUMIDITY",
    regionalReference: "REGIONAL REFERENCE",
    rainfall: "RAINFALL",
    monthTotal: "MONTH TOTAL",
    profileSuffix: "PROFILE",
    /** Item 3 (2nd review round) — used to be baked into climateInstrument.eyebrow
     * content data (a plain, non-localized string), so it stayed English on the
     * Danish page. Composed with the project's own code (e.g. "A / 03") at
     * render time instead. */
    siteClimateInstrumentLabel: "SITE CLIMATE INSTRUMENT",
    seasons: { winter: "WINTER", spring: "SPRING", summer: "SUMMER", autumn: "AUTUMN" },
    monthAbbrev: {
      JAN: "JAN", FEB: "FEB", MAR: "MAR", APR: "APR", MAY: "MAY", JUN: "JUN",
      JUL: "JUL", AUG: "AUG", SEP: "SEP", OCT: "OCT", NOV: "NOV", DEC: "DEC",
    } as Record<string, string>,
    aria: {
      /** {title} placeholder — interpolated via lib/i18n-format.ts, not a closure (must stay serializable across the server/client boundary). */
      interfaceLabel: "{title} climate interface",
      seasonalImage: "{title} seasonal image",
      imageInSeason: "{title} in {season}",
      solarPosition: "Solar position",
      solarAltitudePath: "Solar altitude path",
      wind: "Wind",
      temperature: "Temperature",
      relativeHumidity: "Relative humidity",
      rainfall: "Rainfall",
      monthSelector: "Month selector",
      months: "Months",
      previousMonth: "Previous month",
      nextMonth: "Next month",
      playSequence: "Play monthly sequence",
      pauseSequence: "Pause monthly sequence",
    },
  },
  /** Item 1 (2nd review round) — public/diagrams/10-site-location-efe.svg,
   * the new coded Site/Location diagram built in the previous round. Never
   * covered by the earlier Environmental Diagrams sweep since it didn't
   * exist yet when that sweep ran. All strings below have an id in the
   * SVG (see components/project/site-diagram.tsx), wired via plain
   * wireText, uppercased at the call site to match the file's own
   * all-caps convention (this file, unlike 01-09, uses caps on every
   * text class, not just `.label`). */
  siteLocation: {
    heading: "Location Plan",
    coastRoad: "Coast Road",
    secondaryAccessRoad: "Secondary Access Road",
    adjacentBuildings: "Adjacent Buildings",
    adjacentPropertyLimits: "Adjacent Property Limits",
    projectSite: "Project Site",
    siteConditionLabel: "Site Condition",
    siteConditionValue: "Waterfront",
    accessLabel: "Access",
    accessValue: "2 Roads",
  },
  seasonsLower: { winter: "winter", spring: "spring", summer: "summer", autumn: "autumn" },
};

export type Dictionary = typeof en;
export default en;
