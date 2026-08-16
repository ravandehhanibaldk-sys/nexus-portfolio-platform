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
 * IMPORTANT — see PROGRESS.md: the Reflection beat text below is a
 * placeholder, same policy as Villa Red Sun. Per Spec Section 12,
 * Reflection must be written by Hanibal in his own voice, not generated.
 *
 * No Hero video exists for this project yet — `heroVideo` is intentionally
 * omitted; Hero (19.1) falls back to the static exterior image.
 */
const villaEfe: ProjectInput = {
  id: "villa-efe",
  name: "Villa Efe",
  typology: "Residential — Luxury Coastal Villa, New Construction",
  location: "Northern Cyprus",
  year: "2026",
  status: "Completed Design",
  scale: undefined,

  thesisSentence:
    "Villa Efe is a ground-up luxury villa on a steep Mediterranean waterfront site in Northern Cyprus, organizing four privacy-graded levels — from a below-grade service basement to a rooftop leisure deck — around uninterrupted sea views, engineered coastal excavation, and a continuous indoor-outdoor living sequence.",

  differentiator:
    "The platform's only ground-up new-construction project — a large-scale luxury coastal villa on a steep waterfront site with a full below-grade basement and engineered soil retention, organized as a four-level privacy hierarchy — as opposed to Villa Red Sun's budget-driven renovation of two existing buildings.",

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
   */
  climateInstrument: {
    eyebrow: "B / 03 — SITE CLIMATE INSTRUMENT",
    title: "VILLA EFE",
    locationLabel: "GIRNE / KYRENIA",
    accentColor: "#e0ae58",
    heroObjectPosition: "39% 27%",
    images: {
      winter: "winter.png",
      spring: "spring.png",
      summer: "summer.png",
      autumn: "autumn.png",
    },
    months: [
      { month: "JAN", season: "winter", temperature: { value: 12.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 54.5°F." }, rainfall: { value: 117, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S" }, humidity: { value: 69, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 31.2, time: "11:45", source: "derived" } },
      { month: "FEB", season: "winter", temperature: { value: 13.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 55.4°F." }, rainfall: { value: 79, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S" }, humidity: { value: 64, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 40.6, time: "11:58", source: "derived" } },
      { month: "MAR", season: "spring", temperature: { value: 14.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 58.1°F." }, rainfall: { value: 60, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 55, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 50.0, time: "12:10", source: "derived" } },
      { month: "APR", season: "spring", temperature: { value: 17.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 62.6°F." }, rainfall: { value: 20, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 47, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 59.3, time: "12:23", source: "derived" } },
      { month: "MAY", season: "spring", temperature: { value: 21.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 69.8°F." }, rainfall: { value: 13, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 42, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 68.7, time: "12:35", source: "derived" } },
      { month: "JUN", season: "summer", temperature: { value: 25.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 77.0°F." }, rainfall: { value: 2, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 41, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 78.1, time: "12:48", source: "solar-calculation-table" } },
      { month: "JUL", season: "summer", temperature: { value: 27.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 81.5°F." }, rainfall: { value: 0, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 37, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 78.1, time: "12:48", source: "derived" } },
      { month: "AUG", season: "summer", temperature: { value: 28.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 82.4°F." }, rainfall: { value: 0, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 39, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 68.7, time: "12:35", source: "derived" } },
      { month: "SEP", season: "autumn", temperature: { value: 26.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 78.8°F." }, rainfall: { value: 5, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 42, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 59.3, time: "12:23", source: "derived" } },
      { month: "OCT", season: "autumn", temperature: { value: 22.0, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 71.6°F." }, rainfall: { value: 37, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 46, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 50.0, time: "12:10", source: "derived" } },
      { month: "NOV", season: "autumn", temperature: { value: 18.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 65.3°F." }, rainfall: { value: 68, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W → E", speedLabel: "3.0 M/S" }, humidity: { value: 54, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 40.6, time: "11:58", source: "derived" } },
      { month: "DEC", season: "winter", temperature: { value: 14.5, unit: "C", source: "regional-climatology — converted from source-reported °F to °C for portfolio-wide unit consistency. Original source value: 58.1°F." }, rainfall: { value: 133, unit: "mm", source: "regional-climatology" }, wind: { directionLabel: "W / NW → E / SE", speedLabel: "3.0 M/S" }, humidity: { value: 66, unit: "%", source: "regional-reference-athalassa" }, solar: { altitudeDeg: 31.2, time: "11:45", source: "solar-calculation-table" } },
    ],
  },

  beats: {
    clientChallenge: {
      question: "What did the client need, and why did it require starting from scratch?",
      text: "An outdated existing residence occupied the site, but the client's spatial requirements exceeded what that building could accommodate, making renovation impractical. The brief called for a contemporary luxury villa maximizing the site's sea views while providing complete privacy, generous family spaces, premium leisure facilities, and long-term functionality — with a clear split between public and private areas, independent staff accommodation, large parking capacity, and an indoor-outdoor living experience throughout.",
      assets: [],
    },
    site: {
      question: "What was the physical starting condition?",
      text: "The site is a rare waterfront plot directly at sea level with uninterrupted panoramic Mediterranean views, on land with a very steep natural slope that creates multiple access levels. Standing inside the villa facing the sea means facing true north; the opposite side of the site opens onto mountain and forest views. The same site also brought real constraints: extreme proximity to the sea, a high groundwater level, and significant level differences across the plot.",
      assets: [
        {
          src: "B-47-site-spotting-villa-efe_result.png",
          alt: "Location plan showing the villa's position on its waterfront site.",
          category: "site-analysis",
          caption: "Location plan — waterfront site.",
        },
        {
          src: "B-15-plan-top-site-villa-efe_result.png",
          alt: "Site plan, top view.",
          category: "site-analysis",
          caption: "Site plan — top view.",
        },
        {
          src: "B-34-airflow-plan-top-site-villa-efe_result.png",
          alt: "Site airflow diagram.",
          category: "airflow-diagram",
          caption: "Airflow diagram — site.",
        },
        {
          src: "B-43-privacy-gradient-plan-top-site-villa-efe_result.png",
          alt: "Site privacy gradient diagram.",
          category: "privacy-diagram",
          caption: "Privacy gradient diagram — site.",
        },
        {
          src: "B-44-solar-path-diagram-project-coordinates-villa-efe_result.png",
          alt: "Solar path diagram for the Villa Efe site, showing sun-angle geometry across the year.",
          category: "solar-path-diagram",
          caption: "Solar path analysis — site coordinates.",
        },
      ],
    },
    constraints: {
      question: "What limits shaped every decision from here on?",
      text: "Basement excavation this close to the sea required specialized engineering — soil retention systems and structural concrete techniques suited to coastal construction were built into the design from the earliest stage. Beyond the engineering, every level had to maximize sea views from its major living spaces while still preserving privacy, and the steep, groundwater-affected site had to absorb a full below-grade basement without compromising spatial clarity above it.",
      assets: [],
    },
    designThinking: {
      question: "How was the problem approached?",
      text: "Rather than a collection of isolated rooms, the villa was conceived as a sequence of interconnected living environments, with interior and exterior spaces continuously interacting through large openings, terraces, water features, and framed views. The building is organized vertically by privacy level — service and staff space in the basement, public family life on the ground floor, private bedrooms on the first floor, and leisure space on the roof — connected by a central stair and elevator, and lit throughout by a multi-story interior terrarium that carries daylight from the ground floor to the roof.",
      assets: [],
    },
    designAlternatives: {
      question: "How is the villa organized across its four levels?",
      text: "Each level answers a different part of the brief: the basement handles arrival, service, and staff life below grade; the ground floor carries the public and social program around the central terrarium; the first floor is reserved entirely for private bedrooms; and the roof functions as a fifth living level built for leisure. Circulation, daylight, and privacy were resolved independently on each floor, then tied together by the same vertical core.",
      assets: [],
      alternatives: [
        {
          id: "basement",
          label: "Basement",
          tier: "Service, entertainment & staff accommodation",
          isFinal: false,
          assets: [
            { src: "B-11-plan-top-bs-villa-efe_result.png", alt: "Basement floor plan.", category: "plan", caption: "Floor plan — Basement." },
            { src: "B-30-airflow-plan-top-bs-villa-efe_result.png", alt: "Basement airflow diagram.", category: "airflow-diagram", caption: "Airflow diagram — Basement." },
            { src: "B-35-circulation-plan-top-bs-villa-efe_result.png", alt: "Basement circulation diagram.", category: "circulation-diagram", caption: "Circulation diagram — Basement." },
            { src: "B-39-privacy-gradient-plan-top-bs-villa-efe_result.png", alt: "Basement privacy gradient diagram.", category: "privacy-diagram", caption: "Privacy gradient diagram — Basement." },
          ],
        },
        {
          id: "ground-floor",
          label: "Ground Floor",
          tier: "Public family & social spaces",
          isFinal: false,
          assets: [
            { src: "B-12-plan-top-gf-villa-efe_result.png", alt: "Ground floor plan.", category: "plan", caption: "Floor plan — Ground Floor." },
            { src: "B-31-airflow-plan-top-gf-villa-efe_result.png", alt: "Ground floor airflow diagram.", category: "airflow-diagram", caption: "Airflow diagram — Ground Floor." },
            { src: "B-40-privacy-gradient-plan-top-gf-villa-efe_result.png", alt: "Ground floor privacy gradient diagram.", category: "privacy-diagram", caption: "Privacy gradient diagram — Ground Floor." },
          ],
        },
        {
          id: "first-floor",
          label: "First Floor",
          tier: "Private bedrooms",
          isFinal: false,
          assets: [
            { src: "B-13-plan-top-f1-villa-efe_result.png", alt: "First floor plan.", category: "plan", caption: "Floor plan — First Floor." },
            { src: "B-32-airflow-plan-top-f1-villa-efe_result.png", alt: "First floor airflow diagram.", category: "airflow-diagram", caption: "Airflow diagram — First Floor." },
            { src: "B-37-circulation-plan-top-f1-villa-efe_result.png", alt: "First floor circulation diagram.", category: "circulation-diagram", caption: "Circulation diagram — First Floor." },
            { src: "B-41-privacy-gradient-plan-top-f1-villa-efe_result.png", alt: "First floor privacy gradient diagram.", category: "privacy-diagram", caption: "Privacy gradient diagram — First Floor." },
          ],
        },
        {
          id: "roof",
          label: "Roof Terrace",
          tier: "Leisure & panoramic outdoor living",
          isFinal: false,
          assets: [
            { src: "B-14-plan-top-groof-villa-efe_result.png", alt: "Roof terrace plan.", category: "plan", caption: "Floor plan — Roof Terrace." },
            { src: "B-33-airflow-plan-top-groof-villa-efe_result.png", alt: "Roof terrace airflow diagram.", category: "airflow-diagram", caption: "Airflow diagram — Roof Terrace." },
            { src: "B-38-circulation-plan-top-groof-villa-efe_result.png", alt: "Roof terrace circulation diagram.", category: "circulation-diagram", caption: "Circulation diagram — Roof Terrace." },
            { src: "B-42-privacy-gradient-plan-top-groof-villa-efe_result.png", alt: "Roof terrace privacy gradient diagram.", category: "privacy-diagram", caption: "Privacy gradient diagram — Roof Terrace." },
          ],
        },
      ],
    },
    finalDecision: {
      question: "How did the final design come together?",
      text: "The design evolved over roughly eight months through continuous collaboration between the design team and the homeowners, with regular meetings to evaluate every important decision before approval. The owners actively participated in space planning, interior layouts, room relationships, materials, color palettes, furniture concepts, and overall atmosphere, with multiple alternatives presented throughout the process before each final selection was made.",
      assets: [],
    },
    finalArchitecture: {
      question: "What was actually built — inside and out?",
      text: "The completed villa, shown through its exterior presence on the coastline and its finished interior spaces — including the poolside terrace, dining room, living room, and master suite — carrying through the same sequence of interconnected, view-framed living environments described in the design strategy.",
      sectionLocator: {
        levels: [
          { id: "bs", label: "Basement", plan: { src: "B-20-illustration-section-plan-top-bs-villa-efe_result.png", alt: "Illustrated Basement plan with section cut-lines.", category: "plan", caption: "Basement plan with section cut-lines." } },
          { id: "gf", label: "Ground Floor", plan: { src: "B-21-illustration-section-plan-top-gf-villa-efe_result.png", alt: "Illustrated Ground Floor plan with section cut-lines.", category: "plan", caption: "Ground Floor plan with section cut-lines." } },
          { id: "f1", label: "First Floor", plan: { src: "B-22-illustration-section-plan-top-f1-villa-efe_result.png", alt: "Illustrated First Floor plan with section cut-lines.", category: "plan", caption: "First Floor plan with section cut-lines." } },
          { id: "roof", label: "Roof Terrace", plan: { src: "B-23-illustration-section-plan-top-groof-villa-efe_result.png", alt: "Illustrated Roof Terrace plan with section cut-lines.", category: "plan", caption: "Roof Terrace plan with section cut-lines." } },
          { id: "site", label: "Site", plan: { src: "B-24-illustration-section-plan-top-site-villa-efe_result.png", alt: "Illustrated site plan with section cut-lines.", category: "plan", caption: "Site plan with section cut-lines." } },
        ],
        sectionA: { src: "B-18-illustration-section-a-a-villa-efe_result.png", alt: "Illustrated building section A-A.", category: "section", caption: "Section A-A — illustrated." },
        sectionB: { src: "B-19-illustration-section-b-b-villa-efe_result.png", alt: "Illustrated building section B-B.", category: "section", caption: "Section B-B — illustrated." },
      },
      assets: [
        { src: "B-01-villa-efe-exterior-view-01_result.png", alt: "Exterior view 01, final design.", category: "exterior", caption: "Exterior — View 01" },
        { src: "B-02-villa-efe-exterior-view-02_result.png", alt: "Exterior view 02, final design.", category: "exterior", caption: "Exterior — View 02" },
        { src: "B-03-villa-efe-exterior-view-03_result.png", alt: "Exterior view 03, final design.", category: "exterior", caption: "Exterior — View 03" },
        { src: "B-04-villa-efe-exterior-view-04_result.png", alt: "Exterior view 04, final design.", category: "exterior", caption: "Exterior — View 04" },
        { src: "B-05-villa-efe-interior-pool-side_result.png", alt: "Poolside interior, final design.", category: "interior", caption: "Interior — Poolside" },
        { src: "B-06-villa-efe-interior-dining-room_result.png", alt: "Dining room interior, final design.", category: "interior", caption: "Interior — Dining Room" },
        { src: "B-07-villa-efe-interior-living-room_result.png", alt: "Living room interior, final design.", category: "interior", caption: "Interior — Living Room" },
        { src: "B-08-villa-efe-interior-kitchen_result.png", alt: "Kitchen interior, final design.", category: "interior", caption: "Interior — Kitchen" },
        { src: "B-09-villa-efe-interior-master-bedroom_result.png", alt: "Master bedroom interior, final design.", category: "interior", caption: "Interior — Master Bedroom" },
        { src: "B-10-villa-efe-interior-master-bedroom-bathroom_result.png", alt: "Master bedroom bathroom interior, final design.", category: "interior", caption: "Interior — Master Bathroom" },
      ],
    },
    reflection: {
      question: "What did this project prove, and what would change next time?",
      text: "[PENDING — to be written by Hanibal in his own voice, per Spec Section 12. Placeholder, not for publication.]",
      assets: [],
    },
  },

  credits: {
    role: "Architectural Design, Visualization, Interior & Landscape Coordination",
    tools: ["3ds Max", "V-Ray / Corona Renderer", "AutoCAD", "Revit"],
  },
};

// Runtime validation — Section 21 (Project Template) is enforced at build time.
export default projectSchema.parse(villaEfe);
