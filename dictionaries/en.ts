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
    environmentalDiagrams: "Environmental Diagrams",
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
    monthSeasonSelectorHeading: "Month / Season Selector",
    /** Item 5 — 04's own static subtitle chrome (`text.label`, no id). */
    monthSeasonSelectorSubtitle: "Semantic visual states · Default / Hover / Selected",
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
  solar: {
    panelLabel: "Solar Path",
    panelTitle: "Altitude / Azimuth",
    pathDiagramHeading: "Solar Path Diagram",
    architecturalReadingHeading: "Solar Architectural Reading",
    /** Item 5 — 01's static subtitle chrome (`text.label`, no id), variant-
     * specific since the delivered artwork's own text differs by massing
     * ("SINGLE"/"TWIN"), not just by locale. */
    subtitleSingle: "Data-driven artwork · Single massing",
    subtitleTwin: "Data-driven artwork · Twin massing",
    /** Item 5 — 08's `text.sun-time-label` trio and `text.label` "INTERPRETIVE READING" caption (both no id). */
    solarNoonLabel: "Solar noon",
    interpretiveReadingLabel: "Interpretive reading",
    metaTrueNorth: "true north",
    metaCoordinateDerived: "coordinate-derived",
    daylight: "daylight",
    noonAltitude: "noon altitude",
    sunrise: "sunrise",
    sunset: "sunset",
    axisLabel: "AZIMUTH · TRUE NORTH",
    readingLabel: "Architectural reading.",
    insightHigh:
      "High midday solar altitude favors robust shading and controlled glazing over raw solar access — low-angle early/late sun deserves particular attention on west-facing openings.",
    insightLow:
      "Very low midday solar altitude makes unobstructed southern access valuable — nearby massing, planting, or site walls can meaningfully shade the building at this time of year.",
    /** {season} placeholder — interpolated via lib/i18n-format.ts. */
    insightTransition:
      "The {season} transition moves solar altitude quickly month to month; shading and glazing strategies benefit from flexibility rather than a single fixed assumption.",
  },
  wind: {
    panelLabel: "Wind Exposure",
    panelTitle: "Direction / Seasonal Emphasis",
    flowHeading: "Architectural Wind Flow",
    exposureHeading: "Wind Exposure",
    envelopeReadingHeading: "Wind Envelope Reading",
    prevailingSectorHeading: "PREVAILING SECTOR",
    environmentalDataDisclosureHeading: "ENVIRONMENTAL DATA DISCLOSURE",
    /** Item 5 — remaining static chrome across 02/03/06/07/09 (`text.label`/
     * `text.body`, no id — subtitles, legend words, and grouped field
     * labels). See lib/svg-wiring.ts's `wireNth` doc comment for how these
     * are targeted without editing the source SVGs. */
    subtitleSingle: "Qualitative streamline system · Single massing",
    subtitleTwin: "Qualitative streamline system · Twin massing",
    exposureSubtitleSingle: "Directional exposure · Single massing",
    exposureSubtitleTwin: "Directional exposure · Twin massing",
    contextLayerNote: "Context layer is removable / schematic",
    legendPrimary: "Primary",
    legendSecondary: "Secondary",
    prevailingSectorSubtitle: "Primary → Secondary",
    primaryDirectionLabel: "Primary direction",
    secondaryDirectionLabel: "Secondary direction",
    seasonStateLabel: "Season / State",
    frequencyStatusLabel: "Frequency status",
    windSpeedLabel: "Wind speed",
    disclosureSubtitle: "Important information about this data",
    frequencyFieldLabel: "Frequency",
    directionFieldLabel: "Direction",
    sourceDataFieldLabel: "Source data",
    interpretiveReadingLabel: "Interpretive reading",
    metaDirection: "16-direction",
    metaSource: "approved report labels",
    axisLabel: "SEASONAL DIRECTIONAL EMPHASIS · NOT MONTHLY FREQUENCY",
    prevailingSector: "prevailing sector",
    variable: "Variable",
    frequencyNotEstablished: "frequency not established",
    honestyNote:
      "The supplied report does not establish verified monthly directional frequency for this site. This diagram visualizes the approved seasonal exposure only — it does not imply precise measurement.",
    envelopeReading: "Envelope reading.",
    reportedSpeed: "Reported speed:",
    /** Wind-speed provenance qualifiers (item 20) — appended after the
     * numeric value, e.g. "6.50 M/S · MODEL". Never embedded directly in
     * content data as raw text, so both locales render correctly. */
    qualifierModel: "MODEL",
    qualifierAnnualAverage: "ANNUAL AVG",
    speedProvenanceModel: "Modeled wind speed",
    speedProvenanceAnnualAverage: "Official annual average",
    directionDisclosure: "Qualitative directional interpretation",
    sourceDataDisclosure: "Seasonal, not monthly",
  },
  seasonsLower: { winter: "winter", spring: "spring", summer: "summer", autumn: "autumn" },
};

export type Dictionary = typeof en;
export default en;
