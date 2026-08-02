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

  heroVideo: "Hero-villa-red-sun-exterior-view-01-ORG_erasio.mp4",

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
          src: "Spotting-On-TheSite-A-villa-red-sun_result.png",
          alt: "Spotting diagram locating key site conditions.",
          category: "site-analysis",
          caption: "Spotting the site's key conditions.",
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
            { src: "Plan-Idea-B-2-Top_result.png", alt: "Floor plan, proposal B-2.", category: "plan", caption: "Floor plan — Proposal B-2." },
            { src: "Plan-Idea-B-2-Top-AirFlow_result.png", alt: "Airflow diagram, proposal B-2.", category: "airflow-diagram", caption: "Airflow diagram — Proposal B-2." },
            { src: "DayLight-Plan-Idea-B-2-Top_result.png", alt: "Daylight diagram, proposal B-2.", category: "daylight-diagram", caption: "Daylight diagram — Proposal B-2." },
            { src: "Circulation-Plan-Idea-B-2-Top_result.png", alt: "Circulation diagram, proposal B-2.", category: "circulation-diagram", caption: "Circulation diagram — Proposal B-2." },
            { src: "PrivacyGradient-Plan-Idea-B-2-Top_result.png", alt: "Privacy gradient diagram, proposal B-2.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal B-2." },
          ],
        },
        {
          id: "C-1",
          label: "Proposal C-1",
          tier: "High quality, higher intervention",
          isFinal: false,
          assets: [
            { src: "MasterPlan-Idea-C-1-Top_result.png", alt: "Master plan, proposal C-1.", category: "master-plan", caption: "Master plan — Proposal C-1." },
            { src: "Plan-Idea-C-1-Top_result.png", alt: "Floor plan, proposal C-1.", category: "plan", caption: "Floor plan — Proposal C-1." },
            { src: "Plan-Idea-C-1-Top-AirFlow_result.png", alt: "Airflow diagram, proposal C-1.", category: "airflow-diagram", caption: "Airflow diagram — Proposal C-1." },
            { src: "DayLight-Plan-Idea-C-1-Top_result.png", alt: "Daylight diagram, proposal C-1.", category: "daylight-diagram", caption: "Daylight diagram — Proposal C-1." },
            { src: "Circulation-Plan-Idea-C-1-Top_result.png", alt: "Circulation diagram, proposal C-1.", category: "circulation-diagram", caption: "Circulation diagram — Proposal C-1." },
            { src: "PrivacyGradient-Plan-Idea-C-1-Top_result.png", alt: "Privacy gradient diagram, proposal C-1.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal C-1." },
          ],
        },
        {
          id: "D",
          label: "Proposal D — Final",
          tier: "Highest quality, highest cost — complete architectural revision",
          isFinal: true,
          assets: [
            { src: "MasterPlan-Idea-D-Top_result.png", alt: "Master plan, final proposal D.", category: "master-plan", caption: "Master plan — Proposal D, final." },
            { src: "Plan-Idea-D-Top_result.png", alt: "Floor plan, final proposal D.", category: "plan", caption: "Floor plan — Proposal D, final." },
            { src: "Plan-Idea-D-Top-AirFlow_result.png", alt: "Airflow diagram, final proposal D.", category: "airflow-diagram", caption: "Airflow diagram — Proposal D, final." },
            { src: "DayLight-Plan-Idea-D-Top_result.png", alt: "Daylight diagram, final proposal D.", category: "daylight-diagram", caption: "Daylight diagram — Proposal D, final." },
            { src: "Circulation-Plan-Idea-D-Top_result.png", alt: "Circulation diagram, final proposal D.", category: "circulation-diagram", caption: "Circulation diagram — Proposal D, final." },
            { src: "PrivacyGradient-Plan-Idea-D-Top_result.png", alt: "Privacy gradient diagram, final proposal D.", category: "privacy-diagram", caption: "Privacy gradient diagram — Proposal D, final." },
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
      assets: [
        { src: "Section-A-Illustration_result.png", alt: "Building section A, final proposal.", category: "section", caption: "Section A — final proposal." },
        { src: "Section-B-Illustration_result.png", alt: "Building section B, final proposal.", category: "section", caption: "Section B — final proposal." },
        { src: "Plan-Idea-D-Top-Illustration_result.png", alt: "Illustrated plan, final proposal D.", category: "plan", caption: "Illustrated floor plan — final proposal." },
        { src: "A-01-villa-red-sun-exterior-view-01_result.png", alt: "Exterior view 01, final proposal.", category: "exterior" },
        { src: "A-02-villa-red-sun-exterior-view-02_result.png", alt: "Exterior view 02, final proposal.", category: "exterior" },
        { src: "A-03-villa-red-sun-exterior-view-03_result.png", alt: "Exterior view 03, final proposal.", category: "exterior" },
        { src: "A-04-villa-red-sun-exterior-view-04_result.png", alt: "Exterior view 04, final proposal.", category: "exterior" },
        { src: "A-05-villa-red-sun-interior-living-room-01_result.png", alt: "Living room interior, final proposal.", category: "interior" },
        { src: "A-06-villa-red-sun-interior-dinning-room-01_result.png", alt: "Dining room interior, final proposal.", category: "interior" },
        { src: "A-07-villa-red-sun-interior-kitchen-01_result.png", alt: "Kitchen interior, final proposal.", category: "interior" },
        { src: "A-08-villa-red-sun-interior-master-bedroom-01_result.png", alt: "Master bedroom interior, final proposal.", category: "interior" },
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
