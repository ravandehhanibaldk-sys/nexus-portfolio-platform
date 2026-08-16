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
 * IMPORTANT — see PROGRESS.md: the Reflection beat text below is a
 * placeholder. Per Spec Section 12, Reflection must be written in
 * Hanibal's own voice, not generated — this is flagged as an open
 * action item, not silently authored.
 */
const villaRedSun: ProjectInput = {
  id: "villa-red-sun",
  name: "Villa Red Sun",
  typology: "Residential — Villa Renovation (merging two existing buildings)",
  location: "Undisclosed",
  year: "2026",
  status: "Completed Design",
  scale: undefined,

  thesisSentence:
    "Villa Red Sun merges two separate existing buildings into one coherent home, resolving a real conflict between cost-driven and quality-driven client priorities through seven tested design proposals.",

  differentiator:
    "The only project in the platform built around a fully documented, multi-option client-decision process — seven cost/quality-tiered proposals compared side by side before selection — demonstrating negotiation and systematic decision-making, not only design output.",

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
   */
  climateInstrument: {
    eyebrow: "A / 03 — SITE CLIMATE INSTRUMENT",
    title: "VILLA RED SUN",
    locationLabel: "SOLRØD / DENMARK",
    accentColor: "#e2734e",
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
      question: "What did the client actually need, and why was it hard?",
      text: "The client owned two separate residential buildings on the same property and wanted a single, functional home. Two family members held opposing priorities: the mother wanted to minimize demolition, construction work, and overall cost; the father wanted the best possible architecture, without financial limitations.",
      assets: [],
    },
    site: {
      question: "What was the physical starting condition?",
      text: "Two independent structures shared a single plot, each with its own orientation, daylight condition, and relationship to the site. Any merging strategy first had to be tested against how each building already related to light, privacy, and access.",
      assets: [
        {
          src: "SiteAnalysis-A-villa-red-sun_result.png",
          alt: "Site analysis mapping the two existing buildings and their relationship to the plot.",
          category: "site-analysis",
          caption: "Site analysis — two buildings, one plot.",
        },
        {
          src: "SiteAnalysis-A-villa-red-sun-Illustration_result.png",
          alt: "Illustrated site analysis diagram.",
          category: "site-analysis",
          caption: "Site analysis, illustrated.",
        },
        {
          src: "A-34-site-spotting-villa-red-sun_result.png",
          alt: "Spotting diagram locating key site conditions.",
          category: "site-analysis",
          caption: "Spotting the site's key conditions.",
        },
        {
          src: "A-29-solar-path-diagram-project-coordinates-villa-red-sun_result.png",
          alt: "Solar path diagram for the Villa Red Sun site, showing sun-angle geometry across the year.",
          category: "solar-path-diagram",
          caption: "Solar path analysis — site coordinates.",
        },
        {
          src: "A-33-wind-analysis-diagram-v3-villa-red-sun_result.png",
          alt: "Wind analysis diagram for the Villa Red Sun site, showing prevailing wind direction.",
          category: "wind-diagram",
          caption: "Wind analysis — prevailing direction.",
        },
      ],
    },
    constraints: {
      question: "What limits shaped every decision from here on?",
      text: "Budget and ambition pulled in opposite directions from within the same household. Connecting two buildings into one circulation system, without knowing in advance which financial scenario the client would ultimately accept, meant the design had to remain legible across multiple cost tiers rather than committing early to one.",
      assets: [],
    },
    designThinking: {
      question: "How was the problem approached?",
      text: "Rather than proposing a single solution, seven design proposals were developed across three cost/quality tiers — A (low cost, minimum demolition), B (medium cost), and C (high quality, higher intervention) — before a final, complete architectural revision (D) was developed as the highest-quality synthesis.",
      assets: [],
    },
    designAlternatives: {
      question: "What did the strongest alternatives actually look like?",
      text: "Of the seven proposals, three were carried through to full 3D visualization and diagram sets: B-2 (medium cost), C-1 (high quality, higher intervention), and D (the final, complete revision). Each was tested against the same criteria — circulation, daylight, and privacy.",
      assets: [],
      alternatives: [
        {
          id: "B-2",
          label: "Proposal B-2",
          tier: "Medium cost",
          isFinal: false,
          assets: [
            { src: "MasterPlan-Idea-B-2-Top_result.png", alt: "Master plan, proposal B-2.", category: "master-plan", caption: "Master plan — Proposal B-2." },
            { src: "A-09-plan-idea-b2-top-villa-red-sun_result.png", alt: "Floor plan, proposal B-2.", category: "plan", caption: "Floor plan — Proposal B-2." },
            { src: "A-20-airflow-plan-idea-b2-top-villa-red-sun_result.png", alt: "Airflow diagram, proposal B-2.", category: "airflow-diagram", caption: "Airflow diagram — Proposal B-2." },
            { src: "A-23-circulation-plan-idea-b2-top-villa-red-sun_result.png", alt: "Circulation diagram, proposal B-2.", category: "circulation-diagram", caption: "Circulation diagram — Proposal B-2." },
            { src: "A-26-privacy-gradient-plan-idea-b2-top-villa-red-sun_result.png", alt: "Privacy gradient diagram, proposal B-2.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal B-2." },
          ],
        },
        {
          id: "C-1",
          label: "Proposal C-1",
          tier: "High quality, higher intervention",
          isFinal: false,
          assets: [
            { src: "MasterPlan-Idea-C-1-Top_result.png", alt: "Master plan, proposal C-1.", category: "master-plan", caption: "Master plan — Proposal C-1." },
            { src: "A-10-plan-idea-c1-top-villa-red-sun_result.png", alt: "Floor plan, proposal C-1.", category: "plan", caption: "Floor plan — Proposal C-1." },
            { src: "A-21-airflow-plan-idea-c1-top-villa-red-sun_result.png", alt: "Airflow diagram, proposal C-1.", category: "airflow-diagram", caption: "Airflow diagram — Proposal C-1." },
            { src: "A-24-circulation-plan-idea-c1-top-villa-red-sun_result.png", alt: "Circulation diagram, proposal C-1.", category: "circulation-diagram", caption: "Circulation diagram — Proposal C-1." },
            { src: "A-27-privacy-gradient-plan-idea-c1-top-villa-red-sun_result.png", alt: "Privacy gradient diagram, proposal C-1.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal C-1." },
          ],
        },
        {
          id: "D",
          label: "Proposal D — Final",
          tier: "Highest quality, highest cost — complete architectural revision",
          isFinal: true,
          assets: [
            { src: "MasterPlan-Idea-D-Top_result.png", alt: "Master plan, final proposal D.", category: "master-plan", caption: "Master plan — Proposal D, final." },
            { src: "A-11-plan-idea-d-top-villa-red-sun_result.png", alt: "Floor plan, final proposal D.", category: "plan", caption: "Floor plan — Proposal D, final." },
            { src: "A-22-airflow-plan-idea-d-top-villa-red-sun_result.png", alt: "Airflow diagram, final proposal D.", category: "airflow-diagram", caption: "Airflow diagram — Proposal D, final." },
            { src: "A-25-circulation-plan-idea-d-top-villa-red-sun_result.png", alt: "Circulation diagram, final proposal D.", category: "circulation-diagram", caption: "Circulation diagram — Proposal D, final." },
            { src: "A-28-privacy-gradient-plan-idea-d-top-villa-red-sun_result.png", alt: "Privacy gradient diagram, final proposal D.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal D, final." },
          ],
        },
      ],
    },
    finalDecision: {
      question: "Why did this proposal win?",
      text: "Proposal D was selected. It fully integrated both buildings into a single, cohesive residence. It required the highest investment, but delivered the greatest improvement in functionality, spatial quality, and architectural identity — the criteria that mattered most once both family members saw the alternatives side by side.",
      assets: [],
    },
    finalArchitecture: {
      question: "What was actually built — in plan, section, and space?",
      text: "The final architecture, shown through its two defining sections, the illustrated final plan, and the completed interior and exterior spaces.",
      sectionLocator: {
        levels: [
          {
            id: "d",
            label: "Proposal D — Final",
            plan: { src: "A-16-illustration-section-plan-idea-d-top-villa-red-sun_result.png", alt: "Illustrated plan, final proposal D, with section cut-lines.", category: "plan", caption: "Illustrated floor plan — final proposal." },
          },
        ],
        sectionA: { src: "A-14-illustration-section-a-a-plan-idea-d-villa-red-sun_result.png", alt: "Illustrated building section A-A, final proposal.", category: "section", caption: "Section A-A — final proposal, illustrated." },
        sectionB: { src: "A-15-illustration-section-b-b-plan-idea-d-villa-red-sun_result.png", alt: "Illustrated building section B-B, final proposal.", category: "section", caption: "Section B-B — final proposal, illustrated." },
      },
      assets: [
        { src: "A-01-villa-red-sun-exterior-view-01_result.png", alt: "Exterior view 01, final proposal.", category: "exterior", caption: "Exterior — View 01" },
        { src: "A-02-villa-red-sun-exterior-view-02_result.png", alt: "Exterior view 02, final proposal.", category: "exterior", caption: "Exterior — View 02" },
        { src: "A-03-villa-red-sun-exterior-view-03_result.png", alt: "Exterior view 03, final proposal.", category: "exterior", caption: "Exterior — View 03" },
        { src: "A-04-villa-red-sun-exterior-view-04_result.png", alt: "Exterior view 04, final proposal.", category: "exterior", caption: "Exterior — View 04" },
        { src: "A-05-villa-red-sun-interior-living-room-01_result.png", alt: "Living room interior, final proposal.", category: "interior", caption: "Interior — Living Room" },
        { src: "A-06-villa-red-sun-interior-dining-room-01_result.png", alt: "Dining room interior, final proposal.", category: "interior", caption: "Interior — Dining Room" },
        { src: "A-07-villa-red-sun-interior-kitchen-01_result.png", alt: "Kitchen interior, final proposal.", category: "interior", caption: "Interior — Kitchen" },
        { src: "A-08-villa-red-sun-interior-master-bedroom-01_result.png", alt: "Master bedroom interior, final proposal.", category: "interior", caption: "Interior — Master Bedroom" },
      ],
    },
    reflection: {
      question: "What did this project prove, and what would change next time?",
      text: "[PENDING — to be written by Hanibal in his own voice, per Spec Section 12. Placeholder, not for publication: this project demonstrated the ability to manage a real, conflicting-priority client negotiation through a systematic, comparative design process rather than a single top-down proposal.]",
      assets: [],
    },
  },

  credits: {
    role: "Architectural Design, Visualization & BIM Documentation",
    tools: ["3ds Max", "V-Ray / Corona Renderer", "AutoCAD", "Revit"],
  },
};

// Runtime validation — Section 21 (Project Template) is enforced at build time.
export default projectSchema.parse(villaRedSun);
