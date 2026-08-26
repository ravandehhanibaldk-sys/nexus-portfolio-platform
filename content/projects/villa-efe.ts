import { projectSchema, type ProjectInput } from "@/lib/content-schema";

/**
 * Villa Efe — Project 02 of N.
 * Source: B-villa-efe-Final-1920-1080/B-project_villa-efe.txt (read in full).
 * Asset filenames verified against the real source folder
 * (B-villa-efe-Final-1920-1080) — every `src` below is copied verbatim,
 * including the `_result` suffix. Do not rename on either side.
 *
 * Structural note (Section 21.2, Reusability Test): Villa Efe has no
 * multi-tier cost/quality proposals the way Villa Red Sun does — it's a
 * single new-construction design organized vertically by privacy level
 * (Basement / Ground Floor / First Floor / Roof Terrace). The Design
 * Process beat (05) reuses the same Alternatives Comparator component with
 * those four levels as its tabs instead of competing proposals — the
 * component's job (let the reader compare a small labeled set of plan+
 * diagram groups) is identical either way; only the content changes, per
 * the platform's Golden Rule (Section 3.4).
 *
 * The Reflection beat `text.en` below is final, written by Hanibal in his
 * own voice (Spec Section 12), inserted verbatim, unedited. `text.da` is
 * his own English text translated to Danish (authorized directly by
 * Hanibal — see docs/handoff/PORTFOLIO_OPEN_ISSUES.md B1).
 *
 * `heroVideo` (MASTER-TASK-ENVIRONMENTAL-AND-HERO-FINAL.md, Part B):
 * finalized cinematic loop, copied byte-for-byte (md5-verified) from
 * All Final File/B-villa-efe-Final/ into public/videos/villa-efe/,
 * filename unchanged. Hero (19.1) still falls back to the static exterior
 * image if this fails to load or is ever removed.
 *
 * Workstream 3 (bilingual/i18n): every user-visible string field below is
 * `{en, da}`. English wording is unchanged from the pre-i18n version.
 * Danish is an AI-drafted translation, reviewed and corrected for natural
 * Danish phrasing/grammar in a later pass (see ARCHITECTURE_DECISIONS.md).
 * `id`, `name`
 * (anonymized project code-name), asset `src`/`category`, and all
 * `climateInstrument` data (protected Climate Interface content) are
 * intentionally NOT localized.
 */
const villaEfe: ProjectInput = {
  id: "villa-efe",
  name: "Villa Efe",
  typology: {
    en: "Residential — Coastal Villa, New Construction",
    da: "Bolig — kystvilla, nybyggeri",
  },
  location: "Northern Cyprus",
  year: "2026",
  status: "Completed Design",
  scale: undefined,
  heroVideo: "Hero_villa-efe-exterior-view-01-04-Winter_realistic_cinematic.mp4",

  thesisSentence: {
    en: "Villa Efe is a ground-up luxury villa on a steep Mediterranean waterfront site in Northern Cyprus, organizing four privacy-graded levels — from a below-grade service basement to a rooftop leisure deck — around uninterrupted sea views, engineered coastal excavation, and a continuous indoor-outdoor living sequence.",
    da: "Villa Efe er en luksusvilla bygget fra bunden på en stejl middelhavsgrund direkte ved vandet i Nordcypern, der organiserer fire niveauer med gradueret privatliv — fra en underjordisk servicekælder til en tagterrasse til fritidsbrug — omkring uafbrudt havudsigt, teknisk krævende udgravning tæt på kysten og et gennemgående inde-/uderumsforløb.",
  },

  differentiator: {
    en: "The platform's only ground-up new-construction project — a large-scale coastal villa on a steep waterfront site with a full below-grade basement and engineered soil retention, organized as a four-level privacy hierarchy — as opposed to Villa Red Sun's budget-driven renovation of two existing buildings.",
    da: "Platformens eneste nybyggeriprojekt fra bunden — en stor kystvilla på en stejl grund ved vandet med en fuld underjordisk kælder og teknisk funderet jordstøtte, organiseret som et fireniveauers privatlivshierarki — i modsætning til Villa Red Suns budgetdrevne renovering af to eksisterende bygninger.",
  },

  /**
   * Climate Interface — ported verbatim from an externally built, user-approved
   * standalone HTML/CSS/JS deliverable (villa-efe-climate-interface/). Source
   * data: Complete-Climate-Site-Analysis-B-villa-efe.txt (Kyrenia/Girne regional
   * climatology for temperature/rainfall/wind; humidity from a separate Athalassa
   * regional reference, 2012–2021 — explicitly not exact-site, labeled
   * accordingly). Solar altitude/time is real only at JUN/DEC (the report's own
   * calculated solstice values); every other month is the approved deliverable's
   * own two-point interpolation, baked in here rather than re-derived at render
   * time. Wind speed is held at the single official annual mean (3.0 m/s) for
   * every month per the report's own explicit warning against treating any
   * third-party monthly wind breakdown as reliable — only direction varies
   * (winter vs. the rest of the year).
   *
   * Workstream 3: this entire block is protected production data (Climate
   * Interface) and is intentionally NOT localized — only the component's own
   * static UI chrome (labels like "TEMPERATURE") is translated, via the
   * dictionary, in components/project/climate-interface.tsx.
   */
  climateInstrument: {
    eyebrow: "B / 03",
    title: "VILLA EFE",
    locationLabel: "GIRNE / KYRENIA",
    accentColor: "#e0ae58",
    coordinates: { lat: 35.3442167, lon: 33.2428083, utcOffsetStandard: 2, utcOffsetDST: 3 },
    heroObjectPosition: "39% 27%",
    images: {
      winter: "winter.png",
      spring: "spring.png",
      summer: "summer.png",
      autumn: "autumn.png",
    },
    months: [
      { month: "JAN", season: "winter", temperature: { value: 12.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 54.5°F." }, rainfall: { value: 117, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 69, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 31.2, time: "11:45", source: "derived" } },
      { month: "FEB", season: "winter", temperature: { value: 13.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 55.4°F." }, rainfall: { value: 79, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 64, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 40.6, time: "11:58", source: "derived" } },
      { month: "MAR", season: "spring", temperature: { value: 14.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 58.1°F." }, rainfall: { value: 60, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 55, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 50.0, time: "12:10", source: "derived" } },
      { month: "APR", season: "spring", temperature: { value: 17.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 62.6°F." }, rainfall: { value: 20, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 47, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 59.3, time: "12:23", source: "derived" } },
      { month: "MAY", season: "spring", temperature: { value: 21.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 69.8°F." }, rainfall: { value: 13, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 42, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 68.7, time: "12:35", source: "derived" } },
      { month: "JUN", season: "summer", temperature: { value: 25.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 77.0°F." }, rainfall: { value: 2, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 41, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 78.1, time: "12:48", source: "solar-calculation-table" } },
      { month: "JUL", season: "summer", temperature: { value: 27.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 81.5°F." }, rainfall: { value: 0, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 37, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 78.1, time: "12:48", source: "derived" } },
      { month: "AUG", season: "summer", temperature: { value: 28.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 82.4°F." }, rainfall: { value: 0, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 39, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 68.7, time: "12:35", source: "derived" } },
      { month: "SEP", season: "autumn", temperature: { value: 26.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 78.8°F." }, rainfall: { value: 5, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 42, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 59.3, time: "12:23", source: "derived" } },
      { month: "OCT", season: "autumn", temperature: { value: 22.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 71.6°F." }, rainfall: { value: 37, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 46, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 50.0, time: "12:10", source: "derived" } },
      { month: "NOV", season: "autumn", temperature: { value: 18.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 65.3°F." }, rainfall: { value: 68, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 54, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 40.6, time: "11:58", source: "derived" } },
      { month: "DEC", season: "winter", temperature: { value: 14.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 58.1°F." }, rainfall: { value: 133, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S", speedQualifier: "annual-average" }, humidity: { value: 66, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 31.2, time: "11:45", source: "solar-calculation-table" } },
    ],
    environmentalAnalysis: {
      src: "villa-efe-environmental_result.png",
      alt: {
        en: "Environmental analysis — solar path, daylight metrics, and prevailing wind, January.",
        da: "Miljøanalyse — solbane, dagslysmålinger og fremherskende vind, januar.",
      },
      category: "site-analysis",
    },
  },

  beats: {
    clientChallenge: {
      question: {
        en: "What did the client need, and why did it require starting from scratch?",
        da: "Hvad havde kunden brug for, og hvorfor krævede det at starte helt forfra?",
      },
      text: {
        en: "An outdated existing residence occupied the site, but the client's spatial requirements exceeded what that building could accommodate, making renovation impractical. The brief called for a contemporary luxury villa maximizing the site's sea views while providing complete privacy, generous family spaces, premium leisure facilities, and long-term functionality — with a clear split between public and private areas, independent staff accommodation, large parking capacity, and an indoor-outdoor living experience throughout.",
        da: "En forældet eksisterende bolig lå på grunden, men kundens pladsbehov oversteg, hvad den bygning kunne rumme, hvilket gjorde renovering upraktisk. Opgaven krævede en nutidig luksusvilla, der maksimerede grundens havudsigt og samtidig gav fuldt privatliv, rummelige familiearealer, eksklusive fritidsfaciliteter og langsigtet funktionalitet — med en klar adskillelse mellem offentlige og private zoner, selvstændig personalebolig, stor parkeringskapacitet og en gennemgående inde-/udeoplevelse.",
      },
      assets: [],
    },
    site: {
      question: {
        en: "What was the physical starting condition?",
        da: "Hvad var den fysiske udgangssituation?",
      },
      text: {
        en: "The site is a rare waterfront plot directly at sea level with uninterrupted panoramic Mediterranean views, on land with a very steep natural slope that creates multiple access levels. Standing inside the villa facing the sea means facing true north; the opposite side of the site opens onto mountain and forest views. The same site also brought real constraints: extreme proximity to the sea, a high groundwater level, and significant level differences across the plot.",
        da: "Grunden er en sjælden vandkantsgrund direkte i havniveau med uafbrudt panoramaudsigt over Middelhavet, på et terræn med en meget stejl naturlig skråning, der skaber flere adgangsniveauer. Når man står inde i villaen og vender mod havet, vender man mod sand nord; den modsatte side af grunden åbner ud mod bjerg- og skovudsigt. Den samme grund medførte også reelle begrænsninger: ekstrem nærhed til havet, et højt grundvandsniveau og betydelige niveauforskelle på tværs af grunden.",
      },
      // Workstream 2: the static B-44 solar-path PNG is replaced in the
      // rendered grid by the digital Solar/Wind diagrams (EnvironmentalDiagrams,
      // rendered by SiteAnalysisEditorial). The PNG file itself is intentionally
      // left in public/images — not deleted this pass. Villa Efe never had a
      // wind-diagram PNG in this grid (see content/projects/villa-efe.ts history).
      assets: [
        {
          src: "B-47-site-spotting-villa-efe_result.png",
          alt: { en: "Location plan showing the villa's position on its waterfront site.", da: "Lokaliseringsplan, der viser villaens placering på grunden ved vandet." },
          category: "site-analysis",
          caption: { en: "Location plan — waterfront site.", da: "Lokaliseringsplan — grund ved vandet." },
        },
        {
          src: "B-15-plan-top-site-villa-efe_result.png",
          alt: { en: "Site plan, top view.", da: "Grundplan, set ovenfra." },
          category: "site-analysis",
          caption: { en: "Site plan — top view.", da: "Grundplan — set ovenfra." },
        },
        {
          src: "B-34-airflow-plan-top-site-villa-efe_result.png",
          alt: { en: "Site airflow diagram.", da: "Luftstrømsdiagram for grunden." },
          category: "airflow-diagram",
          caption: { en: "Airflow diagram — site.", da: "Luftstrømsdiagram — grund." },
        },
        {
          src: "B-43-privacy-gradient-plan-top-site-villa-efe_result.png",
          alt: { en: "Site privacy gradient diagram.", da: "Privatlivsgradient-diagram for grunden." },
          category: "privacy-diagram",
          caption: { en: "Privacy gradient diagram — site.", da: "Privatlivsgradient-diagram — grund." },
        },
      ],
    },
    constraints: {
      question: {
        en: "What limits shaped every decision from here on?",
        da: "Hvilke begrænsninger formede alle efterfølgende beslutninger?",
      },
      text: {
        en: "Basement excavation this close to the sea required specialized engineering — soil retention systems and structural concrete techniques suited to coastal construction were built into the design from the earliest stage. Beyond the engineering, every level had to maximize sea views from its major living spaces while still preserving privacy, and the steep, groundwater-affected site had to absorb a full below-grade basement without compromising spatial clarity above it.",
        da: "Kælderudgravning så tæt på havet krævede specialiseret ingeniørarbejde — jordstøttesystemer og konstruktive betonteknikker tilpasset kystbyggeri blev indarbejdet i designet fra det tidligste stadie. Ud over ingeniørarbejdet skulle hvert niveau maksimere havudsigten fra sine primære opholdsrum og samtidig bevare privatlivet, og den stejle, grundvandspåvirkede grund skulle rumme en fuld underjordisk kælder uden at gå på kompromis med den rumlige klarhed ovenover.",
      },
      assets: [],
    },
    designThinking: {
      question: {
        en: "How was the problem approached?",
        da: "Hvordan blev opgaven grebet an?",
      },
      text: {
        en: "Rather than a collection of isolated rooms, the villa was conceived as a sequence of interconnected living environments, with interior and exterior spaces continuously interacting through large openings, terraces, water features, and framed views. The building is organized vertically by privacy level — service and staff space in the basement, public family life on the ground floor, private bedrooms on the first floor, and leisure space on the roof — connected by a central stair and elevator, and lit throughout by a multi-story interior terrarium that carries daylight from the ground floor to the roof.",
        da: "I stedet for en samling af isolerede rum blev villaen udtænkt som en sekvens af sammenhængende boligmiljøer, hvor inde- og uderum løbende spiller sammen gennem store åbninger, terrasser, vandelementer og indrammede udsigter. Bygningen er organiseret lodret efter privatlivsniveau — service- og personalearealer i kælderen, offentligt familieliv på stueetagen, private soveværelser på første sal og fritidsarealer på taget — forbundet af en central trappe og elevator og gennemlyst af et flere etager højt indendørs terrarium, der fører dagslys fra stueetagen til taget.",
      },
      // VILLA-EFE-ADD-DESIGN-EVOLUTION-IMAGE.md — single 8-panel composite
      // (early massing/wireframe studies through to final rendered
      // detailing), treated as one asset, not sliced. Image is already
      // pre-processed to the site's standard 1920x1080 (16:9) canvas
      // (verified via PNG IHDR: 1920x1080), so Frame's object-cover
      // treatment is lossless here — no crop, no distortion.
      assets: [
        {
          src: "villa-efe-architectural-design-evolution_result.png",
          alt: {
            en: "Design evolution grid — eight stages from early massing and wireframe studies to final rendered exterior detailing.",
            da: "Designudviklingsoversigt — otte trin fra tidlige massestudier og wireframe-skitser til endelig detaljeret eksteriørgengivelse.",
          },
          category: "exterior",
          caption: {
            en: "Design development — from early massing studies to final detailing.",
            da: "Designudvikling — fra tidlige massestudier til endelig detaljering.",
          },
        },
      ],
    },
    designAlternatives: {
      question: {
        en: "How is the villa organized across its four levels?",
        da: "Hvordan er villaen organiseret på tværs af sine fire niveauer?",
      },
      text: {
        en: "Each level answers a different part of the brief: the basement handles arrival, service, and staff life below grade; the ground floor carries the public and social program around the central terrarium; the first floor is reserved entirely for private bedrooms; and the roof functions as the fourth living level, built for leisure. Circulation, daylight, and privacy were resolved independently on each floor, then tied together by the same vertical core.",
        da: "Hvert niveau besvarer en anden del af opgaven: kælderen håndterer ankomst, service og personaleliv under terræn; stueetagen rummer det offentlige og sociale program omkring det centrale terrarium; første sal er forbeholdt private soveværelser; og taget fungerer som det fjerde boligniveau, bygget til fritid. Færdsel, dagslys og privatliv blev løst uafhængigt på hver etage og herefter bundet sammen af den samme lodrette kerne.",
      },
      assets: [],
      alternatives: [
        {
          id: "basement",
          label: { en: "Basement", da: "Kælder" },
          tier: { en: "Service, entertainment & staff accommodation", da: "Service, underholdning & personalebolig" },
          isFinal: false,
          assets: [
            { src: "B-11-plan-top-bs-villa-efe_result.png", alt: { en: "Basement floor plan.", da: "Kælderplan." }, category: "plan", caption: { en: "Floor plan — Basement.", da: "Plantegning — Kælder." } },
            { src: "B-30-airflow-plan-top-bs-villa-efe_result.png", alt: { en: "Basement airflow diagram.", da: "Luftstrømsdiagram, kælder." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Basement.", da: "Luftstrømsdiagram — Kælder." } },
            { src: "B-35-circulation-plan-top-bs-villa-efe_result.png", alt: { en: "Basement circulation diagram.", da: "Færdselsdiagram, kælder." }, category: "circulation-diagram", caption: { en: "Circulation diagram — Basement.", da: "Færdselsdiagram — Kælder." } },
            { src: "B-39-privacy-gradient-plan-top-bs-villa-efe_result.png", alt: { en: "Basement privacy gradient diagram.", da: "Privatlivsgradient-diagram, kælder." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Basement.", da: "Privatlivsgradient-diagram — Kælder." } },
          ],
        },
        {
          id: "ground-floor",
          label: { en: "Ground Floor", da: "Stueetage" },
          tier: { en: "Public family & social spaces", da: "Offentlige familie- og socialarealer" },
          isFinal: false,
          assets: [
            { src: "B-12-plan-top-gf-villa-efe_result.png", alt: { en: "Ground floor plan.", da: "Plantegning, stueetage." }, category: "plan", caption: { en: "Floor plan — Ground Floor.", da: "Plantegning — Stueetage." } },
            { src: "B-31-airflow-plan-top-gf-villa-efe_result.png", alt: { en: "Ground floor airflow diagram.", da: "Luftstrømsdiagram, stueetage." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Ground Floor.", da: "Luftstrømsdiagram — Stueetage." } },
            { src: "B-40-privacy-gradient-plan-top-gf-villa-efe_result.png", alt: { en: "Ground floor privacy gradient diagram.", da: "Privatlivsgradient-diagram, stueetage." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Ground Floor.", da: "Privatlivsgradient-diagram — Stueetage." } },
          ],
        },
        {
          id: "first-floor",
          label: { en: "First Floor", da: "Første Sal" },
          tier: { en: "Private bedrooms", da: "Private soveværelser" },
          isFinal: false,
          assets: [
            { src: "B-13-plan-top-f1-villa-efe_result.png", alt: { en: "First floor plan.", da: "Plantegning, første sal." }, category: "plan", caption: { en: "Floor plan — First Floor.", da: "Plantegning — Første Sal." } },
            { src: "B-32-airflow-plan-top-f1-villa-efe_result.png", alt: { en: "First floor airflow diagram.", da: "Luftstrømsdiagram, første sal." }, category: "airflow-diagram", caption: { en: "Airflow diagram — First Floor.", da: "Luftstrømsdiagram — Første Sal." } },
            { src: "B-37-circulation-plan-top-f1-villa-efe_result.png", alt: { en: "First floor circulation diagram.", da: "Færdselsdiagram, første sal." }, category: "circulation-diagram", caption: { en: "Circulation diagram — First Floor.", da: "Færdselsdiagram — Første Sal." } },
            { src: "B-41-privacy-gradient-plan-top-f1-villa-efe_result.png", alt: { en: "First floor privacy gradient diagram.", da: "Privatlivsgradient-diagram, første sal." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — First Floor.", da: "Privatlivsgradient-diagram — Første Sal." } },
          ],
        },
        {
          id: "roof",
          label: { en: "Roof Terrace", da: "Tagterrasse" },
          tier: { en: "Leisure & panoramic outdoor living", da: "Fritid & panoramisk udeliv" },
          isFinal: false,
          assets: [
            { src: "B-14-plan-top-groof-villa-efe_result.png", alt: { en: "Roof terrace plan.", da: "Plantegning, tagterrasse." }, category: "plan", caption: { en: "Floor plan — Roof Terrace.", da: "Plantegning — Tagterrasse." } },
            { src: "B-33-airflow-plan-top-groof-villa-efe_result.png", alt: { en: "Roof terrace airflow diagram.", da: "Luftstrømsdiagram, tagterrasse." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Roof Terrace.", da: "Luftstrømsdiagram — Tagterrasse." } },
            { src: "B-38-circulation-plan-top-groof-villa-efe_result.png", alt: { en: "Roof terrace circulation diagram.", da: "Færdselsdiagram, tagterrasse." }, category: "circulation-diagram", caption: { en: "Circulation diagram — Roof Terrace.", da: "Færdselsdiagram — Tagterrasse." } },
            { src: "B-42-privacy-gradient-plan-top-groof-villa-efe_result.png", alt: { en: "Roof terrace privacy gradient diagram.", da: "Privatlivsgradient-diagram, tagterrasse." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Roof Terrace.", da: "Privatlivsgradient-diagram — Tagterrasse." } },
          ],
        },
      ],
    },
    finalDecision: {
      question: {
        en: "How did the final design come together?",
        da: "Hvordan blev det endelige design til?",
      },
      text: {
        en: "The design evolved over roughly eight months through continuous collaboration between the design team and the homeowners, with regular meetings to evaluate every important decision before approval. The owners actively participated in space planning, interior layouts, room relationships, materials, color palettes, furniture concepts, and overall atmosphere, with multiple alternatives presented throughout the process before each final selection was made.",
        da: "Designet udviklede sig over cirka otte måneder gennem løbende samarbejde mellem designteamet og boligejerne, med regelmæssige møder for at evaluere hver vigtig beslutning før godkendelse. Ejerne deltog aktivt i pladsplanlægning, interiørdisponering, rumsammenhænge, materialer, farvepaletter, møbelkoncepter og den samlede stemning, hvor flere alternativer blev præsenteret undervejs i processen, før hvert endeligt valg blev truffet.",
      },
      assets: [],
    },
    finalArchitecture: {
      question: {
        en: "What was actually built — inside and out?",
        da: "Hvad blev der reelt bygget — indvendigt og udvendigt?",
      },
      text: {
        en: "The completed villa, shown through its exterior presence on the coastline and its finished interior spaces — including the poolside terrace, dining room, living room, and master suite — carrying through the same sequence of interconnected, view-framed living environments described in the design strategy.",
        da: "Den færdige villa, vist gennem dens ydre fremtræden på kystlinjen og dens færdige indendørs rum — herunder poolterrassen, spisestuen, stuen og hovedsoveværelset — der fører den samme sekvens af sammenhængende, udsigtsindrammede boligmiljøer videre, som beskrevet i designstrategien.",
      },
      sectionLocator: {
        levels: [
          { id: "bs", label: { en: "Basement", da: "Kælder" }, plan: { src: "B-20-illustration-section-plan-top-bs-villa-efe_result.png", alt: { en: "Illustrated Basement plan with section cut-lines.", da: "Illustreret kælderplan med snitlinjer." }, category: "plan", caption: { en: "Basement plan with section cut-lines.", da: "Kælderplan med snitlinjer." } } },
          { id: "gf", label: { en: "Ground Floor", da: "Stueetage" }, plan: { src: "B-21-illustration-section-plan-top-gf-villa-efe_result.png", alt: { en: "Illustrated Ground Floor plan with section cut-lines.", da: "Illustreret stueetageplan med snitlinjer." }, category: "plan", caption: { en: "Ground Floor plan with section cut-lines.", da: "Stueetageplan med snitlinjer." } } },
          { id: "f1", label: { en: "First Floor", da: "Første Sal" }, plan: { src: "B-22-illustration-section-plan-top-f1-villa-efe_result.png", alt: { en: "Illustrated First Floor plan with section cut-lines.", da: "Illustreret plan for første sal med snitlinjer." }, category: "plan", caption: { en: "First Floor plan with section cut-lines.", da: "Plan for første sal med snitlinjer." } } },
          { id: "roof", label: { en: "Roof Terrace", da: "Tagterrasse" }, plan: { src: "B-23-illustration-section-plan-top-groof-villa-efe_result.png", alt: { en: "Illustrated Roof Terrace plan with section cut-lines.", da: "Illustreret tagterrasseplan med snitlinjer." }, category: "plan", caption: { en: "Roof Terrace plan with section cut-lines.", da: "Tagterrasseplan med snitlinjer." } } },
          { id: "site", label: { en: "Site", da: "Grund" }, plan: { src: "B-24-illustration-section-plan-top-site-villa-efe_result.png", alt: { en: "Illustrated site plan with section cut-lines.", da: "Illustreret grundplan med snitlinjer." }, category: "plan", caption: { en: "Site plan with section cut-lines.", da: "Grundplan med snitlinjer." } } },
        ],
        sectionA: { src: "B-18-illustration-section-a-a-villa-efe_result.png", alt: { en: "Illustrated building section A-A.", da: "Illustreret bygningssnit A-A." }, category: "section", caption: { en: "Section A-A — illustrated.", da: "Snit A-A — illustreret." } },
        sectionB: { src: "B-19-illustration-section-b-b-villa-efe_result.png", alt: { en: "Illustrated building section B-B.", da: "Illustreret bygningssnit B-B." }, category: "section", caption: { en: "Section B-B — illustrated.", da: "Snit B-B — illustreret." } },
      },
      assets: [
        { src: "B-01-villa-efe-exterior-view-01_result.png", alt: { en: "Exterior view 01, final design.", da: "Eksteriørvisning 01, endeligt design." }, category: "exterior", caption: { en: "Exterior — View 01", da: "Eksteriør — Visning 01" } },
        { src: "B-02-villa-efe-exterior-view-02_result.png", alt: { en: "Exterior view 02, final design.", da: "Eksteriørvisning 02, endeligt design." }, category: "exterior", caption: { en: "Exterior — View 02", da: "Eksteriør — Visning 02" } },
        { src: "B-03-villa-efe-exterior-view-03_result.png", alt: { en: "Exterior view 03, final design.", da: "Eksteriørvisning 03, endeligt design." }, category: "exterior", caption: { en: "Exterior — View 03", da: "Eksteriør — Visning 03" } },
        { src: "B-04-villa-efe-exterior-view-04_result.png", alt: { en: "Exterior view 04, final design.", da: "Eksteriørvisning 04, endeligt design." }, category: "exterior", caption: { en: "Exterior — View 04", da: "Eksteriør — Visning 04" } },
        { src: "B-05-villa-efe-interior-pool-side_result.png", alt: { en: "Poolside interior, final design.", da: "Interiør, poolområde, endeligt design." }, category: "interior", caption: { en: "Interior — Poolside", da: "Interiør — Poolområde" } },
        { src: "B-06-villa-efe-interior-dining-room_result.png", alt: { en: "Dining room interior, final design.", da: "Interiør, spisestue, endeligt design." }, category: "interior", caption: { en: "Interior — Dining Room", da: "Interiør — Spisestue" } },
        { src: "B-07-villa-efe-interior-living-room_result.png", alt: { en: "Living room interior, final design.", da: "Interiør, stue, endeligt design." }, category: "interior", caption: { en: "Interior — Living Room", da: "Interiør — Stue" } },
        { src: "B-08-villa-efe-interior-kitchen_result.png", alt: { en: "Kitchen interior, final design.", da: "Interiør, køkken, endeligt design." }, category: "interior", caption: { en: "Interior — Kitchen", da: "Interiør — Køkken" } },
        { src: "B-09-villa-efe-interior-master-bedroom_result.png", alt: { en: "Master bedroom interior, final design.", da: "Interiør, hovedsoveværelse, endeligt design." }, category: "interior", caption: { en: "Interior — Master Bedroom", da: "Interiør — Hovedsoveværelse" } },
        { src: "B-10-villa-efe-interior-master-bedroom-bathroom_result.png", alt: { en: "Master bedroom bathroom interior, final design.", da: "Interiør, badeværelse til hovedsoveværelse, endeligt design." }, category: "interior", caption: { en: "Interior — Master Bathroom", da: "Interiør — Hovedbadeværelse" } },
      ],
    },
    reflection: {
      question: {
        en: "What did this project prove, and what would change next time?",
        da: "Hvad beviste dette projekt, og hvad ville blive gjort anderledes næste gang?",
      },
      text: {
        en: `Villa Efe is a new-construction villa on a sloping seafront site, organised vertically across four levels — basement, ground floor, first floor and roof terrace. The slope itself was never a problem for me. I genuinely love working with level differences; they give me freedom in design rather than take it away. The real starting challenge was different: the floor areas were large, and the owner had a strong desire for light-filled spaces throughout the house, including spaces that a large footprint naturally pushes away from the perimeter.

To bring daylight deep into the plan I repeatedly had to reposition and enlarge a central light well. Under normal circumstances that alone would have lit every room properly. It became genuinely difficult when the owner also wanted the basement entertainment room to receive natural light. Directly above that room, on the ground floor, sat a terrarium-like green space that took its own light from the central entrance. I wanted to keep this terrarium as the green heart of the house rather than sacrifice it to solve the basement’s lighting. The solution was to design part of the living space in the middle of the terrarium in glass, so light could pass straight through it down to the basement. Getting that detail right meant designing and presenting the insulation and technical build-up myself, by hand, so the glazed floor would actually perform and not merely look correct in section.

The hardest part of the project came from the site’s position. The front façade faces the sea and the house sits at zero distance from the shore. The owner wanted to use every possible square metre that position offered, including a large infinity pool. The size of the pool left almost no circulation or seating space around it and the house. My response was a movable deck that could extend out over the pool water, creating usable outdoor space on demand without permanently giving up the pool itself. That tension — maximising water against maximising usable space at zero distance from the shore — shaped the design more than the slope ever did.

If I were to start Villa Efe again, I would likely focus earlier on coordinating the project’s different demands together, rather than solving each one separately. What this project made clear to me is that an architectural decision is rarely just a spatial one — it immediately affects structure, light, insulation, how the space is used, and even the exterior. What mattered most to me was realizing that solving a problem doesn’t have to mean giving up on a good architectural idea. That’s exactly what happened with the terrarium, the basement light, and the infinity pool: instead of dropping one of the requirements, I looked for a way to let all of them coexist, even if it meant working out more technical detail myself. The most important lesson I took from Villa Efe was this: sometimes the best solution isn’t a compromise — it’s finding a way you don’t have to compromise at all.`,
        da: `Villa Efe er en nybygget villa på en skrånende grund ved havet, organiseret vertikalt over fire niveauer — kælder, stueetage, første sal og tagterrasse. Selve skråningen har aldrig været et problem for mig. Jeg elsker virkelig at arbejde med niveauforskelle; de giver mig frihed i designet i stedet for at begrænse det. Den egentlige udfordring i starten var en anden: gulvarealerne var store, og ejeren havde et stærkt ønske om lysfyldte rum i hele huset, herunder rum, som et stort fodaftryk naturligt skubber væk fra husets omkreds.

For at bringe dagslys dybt ind i planløsningen måtte jeg gentagne gange flytte og forstørre en central lysskakt. Under normale omstændigheder ville det alene have oplyst alle rum korrekt. Det blev for alvor vanskeligt, da ejeren også ønskede, at kælderens underholdningsrum skulle modtage naturligt lys. Lige over det rum, i stueetagen, lå et terrariumlignende grønt område, der fik sit eget lys fra den centrale indgang. Jeg ønskede at bevare dette terrarium som husets grønne hjerte i stedet for at ofre det for at løse kælderens belysning. Løsningen var at designe en del af opholdsarealet midt i terrariet i glas, så lyset kunne trænge lige igennem ned til kælderen. At få den detalje til at fungere krævede, at jeg selv designede og udarbejdede isoleringen og den tekniske opbygning i hånden, så det glasbelagte gulv rent faktisk ville fungere og ikke blot se korrekt ud i snit.

Den sværeste del af projektet skyldtes grundens placering. Facaden vender mod havet, og huset ligger direkte ved kysten. Ejeren ønskede at udnytte hver eneste kvadratmeter, som placeringen tilbød, herunder en stor infinity-pool. Poolens størrelse efterlod stort set ingen plads til færdsel eller ophold omkring den og huset. Min løsning var et bevægeligt dæk, der kunne skyde ud over poolvandet og skabe brugbart udendørs areal efter behov, uden permanent at opgive selve poolen. Denne spænding — mellem at bevare en stor pool og at sikre brugbart opholdsareal omkring den, tæt på kysten — formede designet mere, end skråningen nogensinde gjorde.

Hvis jeg skulle starte Villa Efe forfra, ville jeg sandsynligvis tidligere have fokuseret på at koordinere projektets forskellige krav sammen i stedet for at løse dem hver for sig. Det, dette projekt gjorde tydeligt for mig, er, at en arkitektonisk beslutning sjældent kun er rumlig — den påvirker øjeblikkeligt konstruktion, lys, isolering, hvordan rummet bruges, og selv facaden. Det, der betød mest for mig, var at indse, at det at løse et problem ikke behøver at betyde at opgive en god arkitektonisk idé. Det var præcis, hvad der skete med terrariet, kælderens lys og infinity-poolen: i stedet for at droppe et af kravene ledte jeg efter en måde, hvorpå de alle kunne sameksistere, selv hvis det betød, at jeg selv skulle udarbejde flere tekniske detaljer. Den vigtigste lære, jeg tog med mig fra Villa Efe, var denne: nogle gange er den bedste løsning ikke et kompromis — det er at finde en måde, hvorpå man slet ikke behøver at gå på kompromis.`,
      },
      assets: [],
    },
  },

  credits: {
    role: { en: "Architectural Design, Visualization, Interior & Landscape Coordination", da: "Arkitektonisk design, visualisering, interiør- & landskabskoordinering" },
    tools: ["3ds Max", "V-Ray / Corona Renderer", "AutoCAD", "Revit"],
  },
};

// Runtime validation — Section 21 (Project Template) is enforced at build time.
export default projectSchema.parse(villaEfe);
