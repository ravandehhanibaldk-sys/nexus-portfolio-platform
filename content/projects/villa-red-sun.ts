import { projectSchema, type ProjectInput } from "@/lib/content-schema";

/**
 * Villa Red Sun — Project 01 of N.
 * Source: A-villa-red-sun-Final-1920-1080/A-project_villa-red-sun.txt (read in full, Phase 01).
 * Asset filenames verified 2026-08-01 against the real source folder
 * (A-villa-red-sun-Final-1920-1080) — every `src` below is copied verbatim
 * from that directory listing, including the `_result` suffix and the
 * `A-`-prefixed exterior/interior filenames. Do not rename on either side.
 * Narrative mapping performed per NPP Master Design Specification v3.0,
 * Section 12 (Storytelling Framework) and Section 11 (Narrative Rules).
 *
 * IMPORTANT — see PROGRESS.md: the Reflection beat `text.en` below is
 * now final, written by Hanibal in his own voice (Spec Section 12),
 * inserted verbatim, unedited. `text.da` is still the placeholder —
 * a Danish translation of the final Reflection has not been produced.
 *
 * Workstream 3 (bilingual/i18n): every user-visible string field below is
 * `{en, da}`. English wording is unchanged from the pre-i18n version
 * (Phase B: prove the architecture doesn't alter content). Danish is an
 * AI-drafted translation — [DANISH COPY REVIEW PENDING], see Workstream 3
 * final report; not yet native-reviewed. `id`, `name` (anonymized project
 * code-name), asset `src`/`category`, and all `climateInstrument` data
 * (protected Climate Interface content) are intentionally NOT localized.
 *
 * `heroVideo` (MASTER-TASK-ENVIRONMENTAL-AND-HERO-FINAL.md, Part B):
 * finalized cinematic loop, copied byte-for-byte (md5-verified) from
 * All Final File/A-villa-red-sun-Final/ into public/videos/villa-red-sun/,
 * filename unchanged. Hero (19.1) still falls back to the static exterior
 * image if this fails to load or is ever removed.
 */
const villaRedSun: ProjectInput = {
  id: "villa-red-sun",
  name: "Villa Red Sun",
  typology: {
    en: "Residential — Villa Renovation (merging two existing buildings)",
    da: "Bolig — villarenovering (sammenlægning af to eksisterende bygninger)",
  },
  location: "Undisclosed",
  year: "2026",
  status: "Completed Design",
  scale: undefined,
  heroVideo: "Hero_villa-red-sun-exterior-view-02-03-Autumn_realistic_cinematic.mp4",

  thesisSentence: {
    en: "Villa Red Sun merges two separate existing buildings into one coherent home, resolving a real conflict between cost-driven and quality-driven client priorities through seven tested design proposals.",
    da: "Villa Red Sun sammenlægger to separate eksisterende bygninger til ét sammenhængende hjem og løser en reel konflikt mellem kundens omkostningsdrevne og kvalitetsdrevne prioriteter gennem syv afprøvede designforslag.",
  },

  differentiator: {
    en: "The only project in the platform built around a fully documented, multi-option client-decision process — seven cost/quality-tiered proposals compared side by side before selection — demonstrating negotiation and systematic decision-making, not only design output.",
    da: "Det eneste projekt på platformen, der er bygget op omkring en fuldt dokumenteret kundebeslutningsproces med flere muligheder — syv omkostnings-/kvalitetsinddelte forslag sammenlignet side om side før valget — og som dermed demonstrerer forhandling og systematisk beslutningstagning, ikke kun designresultatet.",
  },

  /**
   * Climate Interface — ported verbatim from an externally built, user-approved
   * standalone HTML/CSS/JS deliverable (villa-red-sun-climate-interface/).
   * Source data: Complete-Climate-Site-Analysis-A-villa-red-sun.txt (DMI Solrød
   * 2006–2015 for temperature/rainfall; regional WRF model for wind speed, per
   * A-31-wind-analysis-report — wind DIRECTION is high-confidence, wind SPEED is
   * explicitly a regional model estimate, not a site measurement, hence "· MODEL").
   * Solar altitude/time is real only at JUN/DEC (solar-calculation-table, from the
   * exact site coordinates); every other month is the approved deliverable's own
   * two-point interpolation, computed once and baked in here — not re-derived at
   * render time — so these numbers can never drift from what was reviewed.
   * Humidity has no established value for this site and is intentionally absent
   * from every month below (never filled with a placeholder).
   *
   * Workstream 3: this entire block is protected production data (Climate
   * Interface) and is intentionally NOT localized — only the component's own
   * static UI chrome (labels like "TEMPERATURE") is translated, via the
   * dictionary, in components/project/climate-interface.tsx.
   */
  climateInstrument: {
    eyebrow: "A / 03 — SITE CLIMATE INSTRUMENT",
    title: "VILLA RED SUN",
    locationLabel: "SOLRØD / DENMARK",
    accentColor: "#e2734e",
    coordinates: { lat: 55.516105, lon: 12.208375, utcOffsetStandard: 1, utcOffsetDST: 2 },
    heroObjectPosition: "52% 48%",
    images: {
      winter: "winter.png",
      spring: "spring.png",
      summer: "summer.png",
      autumn: "autumn.png",
    },
    months: [
      { month: "JAN", season: "winter", temperature: { value: 0.8, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 53, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "6.50 M/S · MODEL" }, solar: { altitudeDeg: 11.1, time: "12:09", source: "derived" } },
      { month: "FEB", season: "winter", temperature: { value: 0.7, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 36, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "6.50 M/S · MODEL" }, solar: { altitudeDeg: 20.4, time: "12:22", source: "derived" } },
      { month: "MAR", season: "spring", temperature: { value: 3.2, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 30, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 29.8, time: "12:34", source: "derived" } },
      { month: "APR", season: "spring", temperature: { value: 7.5, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 28, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "VARIABLE → E", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 39.2, time: "12:47", source: "derived" } },
      { month: "MAY", season: "spring", temperature: { value: 11.5, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 58, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 48.6, time: "12:59", source: "derived" } },
      { month: "JUN", season: "summer", temperature: { value: 14.7, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 70, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "4.87 M/S · MODEL" }, solar: { altitudeDeg: 57.9, time: "13:12", source: "solar-calculation-table" } },
      { month: "JUL", season: "summer", temperature: { value: 17.8, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 65, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "4.87 M/S · MODEL" }, solar: { altitudeDeg: 57.9, time: "13:12", source: "derived" } },
      { month: "AUG", season: "summer", temperature: { value: 17.0, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 88, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "4.87 M/S · MODEL" }, solar: { altitudeDeg: 48.6, time: "12:59", source: "derived" } },
      { month: "SEP", season: "autumn", temperature: { value: 13.7, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 49, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 39.2, time: "12:47", source: "derived" } },
      { month: "OCT", season: "autumn", temperature: { value: 9.6, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 64, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 29.8, time: "12:34", source: "derived" } },
      { month: "NOV", season: "autumn", temperature: { value: 6.0, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 69, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "5.66 M/S · MODEL" }, solar: { altitudeDeg: 20.4, time: "12:22", source: "derived" } },
      { month: "DEC", season: "winter", temperature: { value: 2.7, unit: "C", source: "dmi-solrod-2006-2015" }, rainfall: { value: 63, unit: "mm", source: "dmi-solrod-2006-2015" }, wind: { directionLabel: "W / SW → E / NE", speedLabel: "6.50 M/S · MODEL" }, solar: { altitudeDeg: 11.1, time: "12:09", source: "solar-calculation-table" } },
    ],
  },

  beats: {
    clientChallenge: {
      question: {
        en: "What did the client actually need, and why was it hard?",
        da: "Hvad havde kunden reelt brug for, og hvorfor var det svært?",
      },
      text: {
        en: "The client owned two separate residential buildings on the same property and wanted a single, functional home. Two family members held opposing priorities: the mother wanted to minimize demolition, construction work, and overall cost; the father wanted the best possible architecture, without financial limitations.",
        da: "Kunden ejede to separate boligbygninger på samme grund og ønskede ét samlet, funktionelt hjem. To familiemedlemmer havde modstridende prioriteter: moren ønskede at minimere nedrivning, byggearbejde og samlede omkostninger, mens faren ønskede den bedst mulige arkitektur uden økonomiske begrænsninger.",
      },
      assets: [],
    },
    site: {
      question: {
        en: "What was the physical starting condition?",
        da: "Hvad var den fysiske udgangssituation?",
      },
      text: {
        en: "Two independent structures shared a single plot, each with its own orientation, daylight condition, and relationship to the site. Any merging strategy first had to be tested against how each building already related to light, privacy, and access.",
        da: "To uafhængige bygninger delte én grund, hver med sin egen orientering, dagslysforhold og relation til grunden. Enhver sammenlægningsstrategi skulle først afprøves mod, hvordan hver bygning allerede forholdt sig til lys, privatliv og adgang.",
      },
      // Workstream 2: the static A-29 solar-path and A-33 wind-analysis PNGs
      // are replaced in the rendered grid by the digital Solar/Wind diagrams
      // (EnvironmentalDiagrams, rendered by SiteAnalysisEditorial). The PNG
      // files themselves are intentionally left in public/images — not
      // deleted this pass.
      // Workstream 2 visual-polish pass: SiteAnalysis-A-villa-red-sun-Illustration_result.png
      // was confirmed (by direct visual comparison) to be the same site-analysis
      // composition as the lead image below, re-rendered in a second illustrated
      // style — redundant next to it. Reference removed from the grid; the file
      // itself is intentionally left in public/images, not deleted.
      // Workstream 3: this beat's question/text and image grid are no longer
      // rendered for Villa Red Sun at all (see components/red-sun/
      // villa-red-sun-production-page.tsx and site-analysis-editorial.tsx) —
      // a separate, explicitly authorized content decision. The data below is
      // preserved, unused by the current render path, and therefore was not
      // translated further (not user-visible).
      assets: [
        {
          src: "SiteAnalysis-A-villa-red-sun_result.png",
          alt: { en: "Site analysis mapping the two existing buildings and their relationship to the plot.", da: "Site analysis mapping the two existing buildings and their relationship to the plot." },
          category: "site-analysis",
          caption: { en: "Site analysis — two buildings, one plot.", da: "Site analysis — two buildings, one plot." },
        },
        {
          src: "A-34-site-spotting-villa-red-sun_result.png",
          alt: { en: "Spotting diagram locating key site conditions.", da: "Spotting diagram locating key site conditions." },
          category: "site-analysis",
          caption: { en: "Spotting the site's key conditions.", da: "Spotting the site's key conditions." },
        },
      ],
    },
    constraints: {
      question: {
        en: "What limits shaped every decision from here on?",
        da: "Hvilke begrænsninger formede alle efterfølgende beslutninger?",
      },
      text: {
        en: "Budget and ambition pulled in opposite directions from within the same household. Connecting two buildings into one circulation system, without knowing in advance which financial scenario the client would ultimately accept, meant the design had to remain legible across multiple cost tiers rather than committing early to one.",
        da: "Budget og ambition trak i hver sin retning inden for samme husstand. At forbinde to bygninger i ét sammenhængende færdselssystem, uden på forhånd at vide hvilket økonomisk scenarie kunden i sidste ende ville acceptere, betød at designet skulle forblive læsbart på tværs af flere omkostningsniveauer i stedet for tidligt at binde sig til ét.",
      },
      assets: [],
    },
    designThinking: {
      question: {
        en: "How was the problem approached?",
        da: "Hvordan blev opgaven grebet an?",
      },
      text: {
        en: "Rather than proposing a single solution, seven design proposals were developed across three cost/quality tiers — A (low cost, minimum demolition), B (medium cost), and C (high quality, higher intervention) — before a final, complete architectural revision (D) was developed as the highest-quality synthesis.",
        da: "I stedet for at foreslå én løsning blev der udviklet syv designforslag fordelt på tre omkostnings-/kvalitetsniveauer — A (lav omkostning, minimal nedrivning), B (mellem omkostning) og C (høj kvalitet, større indgreb) — hvorefter en endelig, komplet arkitektonisk revision (D) blev udviklet som den bedste samlede løsning.",
      },
      assets: [],
    },
    designAlternatives: {
      question: {
        en: "What did the strongest alternatives actually look like?",
        da: "Hvordan så de stærkeste alternativer reelt ud?",
      },
      text: {
        en: "Of the seven proposals, three were carried through to full 3D visualization and diagram sets: B-2 (medium cost), C-1 (high quality, higher intervention), and D (the final, complete revision). Each was tested against the same criteria — circulation, daylight, and privacy.",
        da: "Af de syv forslag blev tre ført videre til fuld 3D-visualisering og diagramsæt: B-2 (mellem omkostning), C-1 (høj kvalitet, større indgreb) og D (den endelige, komplette revision). Hvert forslag blev testet mod de samme kriterier — færdsel, dagslys og privatliv.",
      },
      assets: [],
      alternatives: [
        {
          id: "B-2",
          label: { en: "Proposal B-2", da: "Forslag B-2" },
          tier: { en: "Medium cost", da: "Mellem omkostning" },
          isFinal: false,
          assets: [
            { src: "MasterPlan-Idea-B-2-Top_result.png", alt: { en: "Master plan, proposal B-2.", da: "Masterplan, forslag B-2." }, category: "master-plan", caption: { en: "Master plan — Proposal B-2.", da: "Masterplan — forslag B-2." } },
            { src: "A-09-plan-idea-b2-top-villa-red-sun_result.png", alt: { en: "Floor plan, proposal B-2.", da: "Plantegning, forslag B-2." }, category: "plan", caption: { en: "Floor plan — Proposal B-2.", da: "Plantegning — forslag B-2." } },
            { src: "A-20-airflow-plan-idea-b2-top-villa-red-sun_result.png", alt: { en: "Airflow diagram, proposal B-2.", da: "Luftstrømsdiagram, forslag B-2." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Proposal B-2.", da: "Luftstrømsdiagram — forslag B-2." } },
            { src: "A-23-circulation-plan-idea-b2-top-villa-red-sun_result.png", alt: { en: "Circulation diagram, proposal B-2.", da: "Færdselsdiagram, forslag B-2." }, category: "circulation-diagram", caption: { en: "Circulation diagram — Proposal B-2.", da: "Færdselsdiagram — forslag B-2." } },
            { src: "A-26-privacy-gradient-plan-idea-b2-top-villa-red-sun_result.png", alt: { en: "Privacy gradient diagram, proposal B-2.", da: "Privatlivsgradient-diagram, forslag B-2." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Proposal B-2.", da: "Privatlivsgradient-diagram — forslag B-2." } },
          ],
        },
        {
          id: "C-1",
          label: { en: "Proposal C-1", da: "Forslag C-1" },
          tier: { en: "High quality, higher intervention", da: "Høj kvalitet, større indgreb" },
          isFinal: false,
          assets: [
            { src: "MasterPlan-Idea-C-1-Top_result.png", alt: { en: "Master plan, proposal C-1.", da: "Masterplan, forslag C-1." }, category: "master-plan", caption: { en: "Master plan — Proposal C-1.", da: "Masterplan — forslag C-1." } },
            { src: "A-10-plan-idea-c1-top-villa-red-sun_result.png", alt: { en: "Floor plan, proposal C-1.", da: "Plantegning, forslag C-1." }, category: "plan", caption: { en: "Floor plan — Proposal C-1.", da: "Plantegning — forslag C-1." } },
            { src: "A-21-airflow-plan-idea-c1-top-villa-red-sun_result.png", alt: { en: "Airflow diagram, proposal C-1.", da: "Luftstrømsdiagram, forslag C-1." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Proposal C-1.", da: "Luftstrømsdiagram — forslag C-1." } },
            { src: "A-24-circulation-plan-idea-c1-top-villa-red-sun_result.png", alt: { en: "Circulation diagram, proposal C-1.", da: "Færdselsdiagram, forslag C-1." }, category: "circulation-diagram", caption: { en: "Circulation diagram — Proposal C-1.", da: "Færdselsdiagram — forslag C-1." } },
            { src: "A-27-privacy-gradient-plan-idea-c1-top-villa-red-sun_result.png", alt: { en: "Privacy gradient diagram, proposal C-1.", da: "Privatlivsgradient-diagram, forslag C-1." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Proposal C-1.", da: "Privatlivsgradient-diagram — forslag C-1." } },
          ],
        },
        {
          id: "D",
          label: { en: "Proposal D — Final", da: "Forslag D — Endelig" },
          tier: { en: "Highest quality, highest cost — complete architectural revision", da: "Højeste kvalitet, højeste omkostning — komplet arkitektonisk revision" },
          isFinal: true,
          assets: [
            { src: "MasterPlan-Idea-D-Top_result.png", alt: { en: "Master plan, final proposal D.", da: "Masterplan, endeligt forslag D." }, category: "master-plan", caption: { en: "Master plan — Proposal D, final.", da: "Masterplan — forslag D, endelig." } },
            { src: "A-11-plan-idea-d-top-villa-red-sun_result.png", alt: { en: "Floor plan, final proposal D.", da: "Plantegning, endeligt forslag D." }, category: "plan", caption: { en: "Floor plan — Proposal D, final.", da: "Plantegning — forslag D, endelig." } },
            { src: "A-22-airflow-plan-idea-d-top-villa-red-sun_result.png", alt: { en: "Airflow diagram, final proposal D.", da: "Luftstrømsdiagram, endeligt forslag D." }, category: "airflow-diagram", caption: { en: "Airflow diagram — Proposal D, final.", da: "Luftstrømsdiagram — forslag D, endelig." } },
            { src: "A-25-circulation-plan-idea-d-top-villa-red-sun_result.png", alt: { en: "Circulation diagram, final proposal D.", da: "Færdselsdiagram, endeligt forslag D." }, category: "circulation-diagram", caption: { en: "Circulation diagram — Proposal D, final.", da: "Færdselsdiagram — forslag D, endelig." } },
            { src: "A-28-privacy-gradient-plan-idea-d-top-villa-red-sun_result.png", alt: { en: "Privacy gradient diagram, final proposal D.", da: "Privatlivsgradient-diagram, endeligt forslag D." }, category: "privacy-diagram", caption: { en: "Privacy gradient diagram — Proposal D, final.", da: "Privatlivsgradient-diagram — forslag D, endelig." } },
          ],
        },
      ],
    },
    finalDecision: {
      question: {
        en: "Why did this proposal win?",
        da: "Hvorfor vandt dette forslag?",
      },
      text: {
        en: "Proposal D was selected. It fully integrated both buildings into a single, cohesive residence. It required the highest investment, but delivered the greatest improvement in functionality, spatial quality, and architectural identity — the criteria that mattered most once both family members saw the alternatives side by side.",
        da: "Forslag D blev valgt. Det integrerede fuldt ud begge bygninger i én sammenhængende bolig. Det krævede den højeste investering, men gav den største forbedring i funktionalitet, rumlig kvalitet og arkitektonisk identitet — de kriterier, der betød mest, da begge familiemedlemmer så alternativerne side om side.",
      },
      assets: [],
    },
    finalArchitecture: {
      question: {
        en: "What was actually built — in plan, section, and space?",
        da: "Hvad blev der reelt bygget — i plan, snit og rum?",
      },
      text: {
        en: "The final architecture, shown through its two defining sections, the illustrated final plan, and the completed interior and exterior spaces.",
        da: "Den endelige arkitektur, vist gennem dens to definerende snit, den illustrerede endelige plantegning samt de færdige inde- og uderum.",
      },
      sectionLocator: {
        levels: [
          {
            id: "d",
            label: { en: "Proposal D — Final", da: "Forslag D — Endelig" },
            plan: { src: "A-16-illustration-section-plan-idea-d-top-villa-red-sun_result.png", alt: { en: "Illustrated plan, final proposal D, with section cut-lines.", da: "Illustreret plantegning, endeligt forslag D, med snitlinjer." }, category: "plan", caption: { en: "Illustrated floor plan — final proposal.", da: "Illustreret plantegning — endeligt forslag." } },
          },
        ],
        sectionA: { src: "A-14-illustration-section-a-a-plan-idea-d-villa-red-sun_result.png", alt: { en: "Illustrated building section A-A, final proposal.", da: "Illustreret bygningssnit A-A, endeligt forslag." }, category: "section", caption: { en: "Section A-A — final proposal, illustrated.", da: "Snit A-A — endeligt forslag, illustreret." } },
        sectionB: { src: "A-15-illustration-section-b-b-plan-idea-d-villa-red-sun_result.png", alt: { en: "Illustrated building section B-B, final proposal.", da: "Illustreret bygningssnit B-B, endeligt forslag." }, category: "section", caption: { en: "Section B-B — final proposal, illustrated.", da: "Snit B-B — endeligt forslag, illustreret." } },
      },
      assets: [
        { src: "A-01-villa-red-sun-exterior-view-01_result.png", alt: { en: "Exterior view 01, final proposal.", da: "Eksteriørvisning 01, endeligt forslag." }, category: "exterior", caption: { en: "Exterior — View 01", da: "Eksteriør — Visning 01" } },
        { src: "A-02-villa-red-sun-exterior-view-02_result.png", alt: { en: "Exterior view 02, final proposal.", da: "Eksteriørvisning 02, endeligt forslag." }, category: "exterior", caption: { en: "Exterior — View 02", da: "Eksteriør — Visning 02" } },
        { src: "A-03-villa-red-sun-exterior-view-03_result.png", alt: { en: "Exterior view 03, final proposal.", da: "Eksteriørvisning 03, endeligt forslag." }, category: "exterior", caption: { en: "Exterior — View 03", da: "Eksteriør — Visning 03" } },
        { src: "A-04-villa-red-sun-exterior-view-04_result.png", alt: { en: "Exterior view 04, final proposal.", da: "Eksteriørvisning 04, endeligt forslag." }, category: "exterior", caption: { en: "Exterior — View 04", da: "Eksteriør — Visning 04" } },
        { src: "A-05-villa-red-sun-interior-living-room-01_result.png", alt: { en: "Living room interior, final proposal.", da: "Interiør, stue, endeligt forslag." }, category: "interior", caption: { en: "Interior — Living Room", da: "Interiør — Stue" } },
        { src: "A-06-villa-red-sun-interior-dining-room-01_result.png", alt: { en: "Dining room interior, final proposal.", da: "Interiør, spisestue, endeligt forslag." }, category: "interior", caption: { en: "Interior — Dining Room", da: "Interiør — Spisestue" } },
        { src: "A-07-villa-red-sun-interior-kitchen-01_result.png", alt: { en: "Kitchen interior, final proposal.", da: "Interiør, køkken, endeligt forslag." }, category: "interior", caption: { en: "Interior — Kitchen", da: "Interiør — Køkken" } },
        { src: "A-08-villa-red-sun-interior-master-bedroom-01_result.png", alt: { en: "Master bedroom interior, final proposal.", da: "Interiør, hovedsoveværelse, endeligt forslag." }, category: "interior", caption: { en: "Interior — Master Bedroom", da: "Interiør — Hovedsoveværelse" } },
      ],
    },
    reflection: {
      question: {
        en: "What did this project prove, and what would change next time?",
        da: "Hvad beviste dette projekt, og hvad ville blive gjort anderledes næste gang?",
      },
      text: {
        en: `Villa Red Sun began as the conversion of two previously separate residential units into a single coherent house. From the outset the real difficulty was not the physical act of joining the buildings, but the fact that the two people I was designing for wanted fundamentally different things. The wife wanted the renovation kept as low-cost and logical as possible. The husband wanted a complete, ideal solution so that the technical problems they currently lived with would never return. One small but telling detail made the history of the house visible early on: one of the left-side units had already been partially renovated at a different time, and its parquet floor sat half a centimetre higher than the other — a physical trace of two homes that had never truly been one.

Both owners were concerned that relocating the bathrooms and kitchen would push the overall cost significantly higher because of the plumbing work involved. In the early schemes (groups A to C) the strategy was therefore to leave the two recently renovated bathrooms in the central core of the house as untouched as possible. After examining the construction documents I was able to show them that the foundation was of a special type with a void underneath, which meant the pipes could be relocated without the high cost everyone assumed. I promised that in the new design the bathrooms would remain as close as possible to the main sewer line so that costs would stay controlled. The roof was a separate fixed constraint — removing or altering it was considered prohibitively expensive — so we kept it in place. To connect the two units underneath without creating a cramped, tunnel-like corridor, I designed a series of bridges and steel columns that could carry the roof load while opening a much wider, uninterrupted span at the connection point.

Beyond the cost-versus-quality tension between the two owners, a practical problem came from the units’ separate renovation histories. Doors and windows throughout the house were in different states, different sizes and different materials, each renovated independently on different budgets at different times. A limited intervention that simply removed one wall would have produced a larger space and satisfied some of the cost concerns, but the result would have been an awkward, tunnel-like unit — a real liability at resale. Weighed against the legal complexity of merging two separate deeds into one, only a proper and complete renovation — Proposal D — actually resolved what both units had accumulated over the years rather than compromising around it.

Looking back, I would not change how I ran the comparison process. I spent a great deal of time on it and brought the clients real documentation, especially the foundation evidence, rather than asking them to simply trust a costlier option. I still believe the principle: “I trust the first idea enough to fight for it — but not enough to stop testing it.” Of the two houses in this portfolio, it is Villa Red Sun where that sentence applies most clearly. The idea survived because it was tested against real client resistance and real evidence, not because it went unquestioned.`,
        da: "[AFVENTER — skal skrives af Hanibal i hans egen stemme, jf. Spec afsnit 12. Midlertidig tekst, ikke til offentliggørelse: dette projekt demonstrerede evnen til at håndtere en reel kundeforhandling med modstridende prioriteter gennem en systematisk, sammenlignende designproces frem for ét enkelt ovenfra-og-ned-forslag.]",
      },
      assets: [],
    },
  },

  credits: {
    role: { en: "Architectural Design, Visualization & BIM Documentation", da: "Arkitektonisk design, visualisering & BIM-dokumentation" },
    tools: ["3ds Max", "V-Ray / Corona Renderer", "AutoCAD", "Revit"],
  },
};

// Runtime validation — Section 21 (Project Template) is enforced at build time.
export default projectSchema.parse(villaRedSun);
