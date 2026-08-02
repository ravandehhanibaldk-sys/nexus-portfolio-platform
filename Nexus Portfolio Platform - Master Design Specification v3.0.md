NEXUS PORTFOLIO PLATFORM (NPP)
Master Design Specification

Version: 3.0 — supersedes v2.0 and v1.0
Owner: Hanibal Ravandeh — Senior Architectural Visualizer & BIM Specialist, Copenhagen
Status: Approved for Phase 00 (Research & Ecosystem Discovery)
Document Type: Governance Framework for the Nexus Portfolio Platform (Architecture Portfolio Strategy + Product Engineering + Technical Governance)
First Dataset: Villa Red Sun (Project 01 of N)
Consuming Systems: Claude, Claude Code, Gemini, GPT, Cursor, Copilot, and any future AI collaborator working on this platform

---

## How to Use This Document

This is not a prompt. It is the constitution of a system.

Version 1.0 was a strong piece of product engineering that explained *how* to build the system. Version 2.0 added the architecture-portfolio-strategy layer that explains *why* a reader keeps looking past the first thirty seconds, and *what* the system is ultimately for. Version 3.0 is a different kind of change: it does not add another layer of content, it changes what this document *is*. From this version forward, this is no longer only a design specification — it is the governance framework for the entire Nexus Portfolio Platform: how technology is chosen, how AI collaborators are allowed to act, how decisions are permanently recorded, and how every future change enters the system.

Every AI system that touches this platform must read this document in full before proposing a single design or code decision. When a decision in a working session conflicts with this document, this document wins. When this document is silent on a question, the decision made must be recorded — as an Architecture Decision Record (Section 30) if it is a technical/implementation decision, or as a Change Log entry (Section 34) if it changes the specification itself — never improvised and forgotten.

Nothing in this version exists as an appendix, an addendum, or a bolted-on chapter. Every policy introduced in this revision has been merged directly into the section it structurally belongs to, so that reading this document top to bottom reads as one continuous, coherent governing text — not a specification followed by a pile of extra rules.

The single sentence that governs every other decision in this document remains:

> **The platform is not designed to present projects. It is designed to demonstrate architectural judgement.**

---

## 00. Research & Ecosystem Discovery

Before Phase 01 (Project Analysis, Section 26) begins, and before any technical decision is locked in, the engineering ecosystem itself must be researched, not assumed. This is a formal phase — Phase 00 in the Claude Code Development Workflow (Section 26.2) — because a governance framework that specifies *what* to build without specifying *how technical decisions are sourced and justified* is incomplete.

### 00.1 Mandate

Claude, or any AI system engineering this platform, is required to research the current technical ecosystem in depth before proposing or locking a technology decision, and to repeat this research, briefly and specifically, before introducing any dependency not already covered by the preferred stack (Section 14.2).

### 00.2 Research Sources

- GitHub — real-world usage, star history, issue activity, recency of maintenance.
- Reddit (e.g. r/nextjs, r/reactjs, r/webdev) — practitioner sentiment and common pitfalls.
- Awesome Lists — curated ecosystem overviews.
- npm registry — download trends, maintenance status, dependency graph.
- Vercel documentation — official Next.js and deployment guidance.
- Anthropic documentation and Claude Code documentation — guidance specific to AI-assisted development workflows.
- Next.js ecosystem and shadcn/ui ecosystem documentation.
- Cursor Rules and MCP servers — patterns from adjacent AI-native tooling.
- Design engineering blogs — practitioner write-ups on architecture/portfolio-adjacent builds.
- Official project documentation for any specific candidate library.

### 00.3 Evaluation Criteria

Every technology or dependency candidate — whether already on the preferred stack (Section 14.2) or proposed as a new addition — is evaluated against: long-term maintenance activity, community adoption, documentation quality, TypeScript support, accessibility, performance, compatibility with the Next.js App Router, bundle size, license, and future scalability (Section 31).

### 00.4 Output of This Phase

Phase 00 produces two things before Phase 01 begins: (1) a confirmed technical stack — by default the preferred ecosystem in Section 14.2, unless research surfaces a documented reason to deviate — and (2) an initial set of Architecture Decision Records (Section 30) capturing that confirmation or deviation. Phase 01 does not begin until this output exists.

---

## 01. Professional Identity & Core Thesis

### 1.1 What This Platform Is Actually For

A portfolio that only presents projects competes on production value — render quality, polish, quantity. Hanibal already has strong production value; that alone is not what separates a shortlisted candidate from a rejected one at offices like Henning Larsen, COBE, or C.F. Møller. What separates them is *visible judgement*: evidence that the person understands a site, weighs real constraints, tests alternatives, and can explain — briefly, precisely — why one decision beat another. This platform's entire job is to make that judgement visible, repeatedly, project after project.

### 1.2 The Three-Sentence Test

After finishing a project on this platform, a reader who has never met Hanibal should be able to describe him in three sentences, without needing to be prompted. This is the platform's ultimate acceptance criterion (Section 33), sitting above every other checklist item. As a working target:

1. He thinks like an architect first and renders second — every image on the page exists to support a decision, not to show off a tool.
2. He tests alternatives before committing, and can explain in plain language why the final proposal won.
3. He brings a rare combination of design judgement and production discipline — thirteen-plus years of BIM/CAD rigor behind every visual.

### 1.3 Identity Pillars

- **Judgement over rendering skill.** Sections 11 and 12 exist specifically to force judgement to the surface.
- **Process over polish.** The Design Alternatives Comparator (Section 19.4) is structurally the most important component in the library, not a secondary gallery.
- **Precision as a professional trait.** Thirteen-plus years of AutoCAD and active Revit 2026 certification are evidence of the same discipline that must be visible in the platform's own grid precision (Section 16) and token consistency (Section 15).
- **Range as evidence of adaptability.** Thirty-plus commercial projects up to 63,000 m² in North Cyprus, fifteen months of hands-on construction site experience in Denmark, and a fully documented 282 m² Danish residential renovation study together prove a range from large-scale commercial to hands-on residential — a platform-level asset made visible across projects via Section 22, not buried inside one case study.

---

## 02. Vision & Mission

### 2.1 Vision

Hanibal Ravandeh will have a single, coherent, professionally engineered system — the Nexus Portfolio Platform — that represents thirteen-plus years of architectural visualization, BIM, and design work at the level expected by the strongest architecture offices in Denmark and by international competition juries, and that demonstrates architectural judgement, not just production quality (Section 01).

### 2.2 Mission

Design, specify, and implement a reusable portfolio system — design philosophy, information architecture, editorial system, visual language, component library, and technical output pipeline — validated end-to-end on one real project (Villa Red Sun) before it is ever applied to a second one.

### 2.3 Why This Matters Now

Most architecture portfolios are built backwards: the practitioner finishes every project first, then panics about how to present them, and ends up with a folder of inconsistent slides bolted together the week before a deadline. This platform exists specifically to avoid that failure mode.

---

## 03. Project Philosophy

### 3.1 Not a Portfolio. A Platform.

A portfolio is a document. A platform is infrastructure. This distinction changes what gets built first.

### 3.2 Single Source of Truth (SSOT)

All outputs — the responsive website, the PDF portfolio, a future print publication, a future competition-specific export, and a future portfolio web-application — must be generated from the same underlying system of tokens, components, and content structure. If a decision exists only inside one output, it is a leak, and must be pulled back into the shared system.

### 3.3 The Platform Layers

```
Portfolio Platform
│
├── Research & Ecosystem Discovery         (Section 00)
├── Professional Identity & Strategy       (Sections 01, 07, 08, 22)
├── Design Philosophy
├── Design Language
├── Information Architecture
├── Editorial System
├── Narrative & Quality Rules              (Sections 11, 13, 28)
├── Grid System
├── Typography System
├── Color System
├── Spacing System
├── Component Library
├── Project Template
├── Technical Architecture & Dependencies  (Section 14.2–14.3)
├── Responsive Website
├── PDF Generator
├── Asset Manager
├── Governance (AI Collaboration, Review, ADR) (Sections 25, 27, 30)
├── Future Project Support
└── Competition Support
```

### 3.4 The Golden Rule

> Every decision must be reusable. If a design decision cannot be reused for future projects, it is considered a bad decision.

### 3.5 Design Direction, Not Just Code Generation

Before any implementation work begins, the acting AI system must behave like a Design Director inside an architecture office: research the ecosystem (Section 00), analyze the project, define the system, design the information architecture, define the UX, design the components, and only then implement (Section 26).

---

## 04. Long-Term Goals & Success Metrics

| Goal | How Success Is Measured |
|---|---|
| Demonstrates judgement, not just production value | Passes the Three-Sentence Test (Section 1.2) and the Portfolio Quality Framework (Section 28). |
| Competitive in the Danish job market | A hiring architect at a firm such as Henning Larsen, COBE, C.F. Møller, Arkitema, BIG, Dorte Mandrup, or Nordic Office of Architecture can understand Hanibal's design thinking within 5 minutes of viewing one project (Section 08). |
| Competition-ready | The same content and system can produce a submission-ready export for architecture competitions without a structural redesign (Section 24, Section 32). |
| Scalable | Adding Project 02 requires populating the Project Template (Section 21), not inventing new layout logic, and is checked against the Project Comparison Framework (Section 22). |
| Format-agnostic | Website and PDF share the same grid, type scale, spacing, and component logic. |
| Technically elegant, not technically crowded | Every dependency traces to a documented need (Section 14.3) and an ADR entry (Section 30). |
| Durable | The system remains coherent and legible two, five, and ten projects from now. |
| Editorial, not promotional | The finished output reads like an architectural publication (Divisare, Detail Magazine, El Croquis, Architectural Review), not a rendering showreel or a social media gallery. |

### 4.1 Non-Goals

- Not a general-purpose website builder.
- Not a CMS with an admin panel in Release R1 (Section 32).
- Not a rendering showreel — renderings support the argument, they are never the argument itself.
- Not a design experiment — visual restraint is a requirement.
- Not a dependency showcase — the smallest defensible dependency set wins over the trendiest one (Section 14.3).

---

## 05. Scope & Constraints

### 5.1 In Scope — Phase 1 (This Engagement)

- Phase 00 research and stack confirmation (Section 00).
- Full analysis of the Villa Red Sun dataset (32 images + project description) located at:
  `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final File\A-villa-red-sun-Final-1920-1080`
- Definition of the complete strategic and design system (Sections 01, 07–08, 11, 13, 14–20, 28).
- Definition of the Project Template data schema (Section 21).
- A fully responsive website implementation of Villa Red Sun, functioning as the platform's proof of concept (Release R1, Section 32).
- A full pass through the Design Review Workflow (Section 27) and the Validation Checklist (Section 29).
- A maintained Architecture Decision Record (Section 30).

### 5.2 Out of Scope — Phase 1

- PDF generation pipeline implementation (rules specified in Section 24; pipeline built in Release R2, Section 32).
- Project 02 content or layout.
- CMS/admin tooling, authentication, hosting/deployment automation (Release R3).
- Multi-language support — professional-facing output is English-first; internal progress reporting to Hanibal is Persian-first (Section 33.2).

### 5.3 Constraints

- All professional-facing text output must be in English.
- All source images are already finalized at 1920×1080, non-distorted (fit-and-pad pipeline, black canvas fill, centered) — Section 20.1.
- No image may be cropped in a way that removes architecturally meaningful content without explicit review (Section 20.2, Section 13).
- The system must run credibly on desktop, tablet, and mobile, in that priority order (Section 23).
- No dependency may be added outside the process defined in Section 14.3.

---

## 06. User Personas

### 6.1 The Danish Recruiter / HR Screener
Reviews dozens of portfolios per open role. Spends 30–90 seconds per portfolio on a first pass. Scans for red flags as much as for talent.

### 6.2 The Design Partner / Studio Lead
Spends 5–8 minutes on the strongest 1–2 projects, looking specifically for process: constraints, alternatives considered, and reasoning connecting site conditions to the final proposal.

### 6.3 The Competition Jury Member
Reviews under strict time pressure and a strict page/board limit, often printed or fixed-size — needs the PDF-safe, competition-export variant (Section 24, Release R4, Section 32).

*(A fourth, internal persona — Hanibal himself, as editor — is implicit throughout: the system must be simple enough to maintain without an AI session every time a caption changes.)*

---

## 07. Recruitment Strategy

### 7.1 What the Recruiter Must See First (0–30 seconds)
Hero image and thesis sentence (Sections 1.2, 19.1) — must read as "calm, confident, professional" alone; then a compact glimpse of the alternatives process; nothing else.

### 7.2 What the Partner Must See First (0–8 minutes)
Hero + thesis → Client Challenge / Site / Constraints → Design Alternatives Comparator in full → Final Decision rationale → Final Architecture → Reflection — the full eight-beat arc (Section 12) in order.

### 7.3 What the Jury Must See First
The competition-export variant (Section 24, Release R4) places thesis sentence, site/constraint summary, and winning-alternative rationale on the first board.

### 7.4 Order of Information Importance (Platform-Wide Default)
1. Thesis sentence (1.2 / 11.1)
2. Site & constraints
3. Process (design alternatives)
4. Decision rationale
5. Final architecture (plans, sections, renders)
6. Reflection
7. Credits / tools / metadata

---

## 08. Portfolio Psychology

| Checkpoint | Target Impression | Primary Component(s) Responsible |
|---|---|---|
| 5 seconds | "This looks calm, confident, and professional." | Hero (19.1), Typography (17), zero visual noise (10.2) |
| 30 seconds | "This person has a clear idea, and I want to know why." | Thesis sentence (1.2, 11.1), first process glimpse (7.1) |
| 2 minutes | "This person thinks in alternatives, not just pretty pictures." | Design Alternatives Comparator (19.4), Narrative Rules (11) |
| 5 minutes | "I understand the reasoning, I trust it, and I want to talk to this person." | Full eight-beat arc completed (12), Reflection (19.9) |

Every future component added to the library (Section 19) must be assigned to one of these checkpoints during design and checked against whether it helps or hurts that checkpoint's target impression.

---

## 09. Information Architecture

### 9.1 Top-Level Structure

```
Home / Index
 └── Project: Villa Red Sun
      ├── 01 — Introduction (Hero + thesis sentence)
      ├── 02 — Client & Challenge
      ├── 03 — Site & Constraints
      ├── 04 — Design Process (Alternatives B / C / D)
      ├── 05 — Final Decision & Rationale
      ├── 06 — Final Architecture (Plans, Sections, Renders)
      ├── 07 — Diagrams (Daylight, Airflow, Privacy, Circulation)
      └── 08 — Reflection
```

This is the per-project template the moment Project 02 exists (Section 21).

### 9.2 Navigation Principles
Linear-first (Section 12); jump-navigation is a secondary affordance for the Recruiter persona (6.1, 7.1); no web navigation pattern may exist without a fixed-sequence PDF equivalent (Section 24).

---

## 10. Editorial Strategy

### 10.1 Reference Points
Divisare, Detail Magazine, El Croquis, Architectural Review, Scandinavian editorial design — not Behance, not Instagram, not a student thesis board.

### 10.2 Editorial Rules
1. Architecture is always the subject.
2. No decorative effects.
3. Curate, don't dump — see Section 13.
4. Every image earns its place (Section 11.3).
5. Text is minimal and declarative.

---

## 11. Architectural Narrative Rules

### 11.1 The One-Sentence Rule
Every project must be summarizable in a single sentence before any page is designed — the thesis sentence, a required Project Template field (Section 21.1), rendered first on the Hero (19.1).

### 11.2 The One-Question-Per-Page Rule
Every page answers exactly one question. A page trying to answer two is split into two beats/components.

### 11.3 The Earned-Image Rule
Every image must have a stated reason for inclusion, traceable to its page's question (11.2).

### 11.4 The Decision-Result Rule
Every diagram must be the visible result of a decision, not decoration.

### 11.5 The No-Repetition Rule
No two consecutive beats may say the same thing in different visual form.

### 11.6 Rule Enforcement
Checked during Design Review (Section 27) and scored under "Architectural Value" in the Quality Framework (Section 28).

---

## 12. Storytelling Framework

```
Client Challenge → Site → Constraints → Design Thinking → Design Alternatives
   → Final Decision → Final Architecture → Reflection
```

For Villa Red Sun: Client Challenge/Site/Constraints draw on the project description text and `SiteAnalysis-A-villa-red-sun.png`, `SiteAnalysis-A-villa-red-sun-Illustration.png`, `Spotting-On-TheSite-A-villa-red-sun.png`. Design Thinking/Alternatives draw on Ideas B‑2, C‑1, D (Circulation, Daylight, Master Plan, Plan/Airflow, Privacy‑Gradient), curated per Section 13. Final Decision is where Section 11.4 is most tested. Final Architecture uses the four exterior, four interior renders, and two sections. Reflection closes in Hanibal's voice.

Every future project must be mappable onto this same eight-beat arc, any not-applicable beat explicitly marked (Section 21.3), never silently skipped.

---

## 13. Asset Selection Rules

### 13.1 The Selection Hierarchy
When multiple assets could fill the same slot, select in this order, stopping at the first clear winner: (1) Clarity, (2) Composition, (3) Non-redundancy (Section 11.5), (4) Emotional impact, (5) Technical polish (tiebreaker only).

### 13.2 The Rule of One
Default to a single image per beat; multiple images only when comparison is structurally the point (Section 19.4).

### 13.3 Application to Villa Red Sun
The strongest exterior view carries the Hero (19.1); the remaining three appear in Final Architecture only if each adds a genuinely different read of the building.

---

## 14. Portfolio Design System

### 14.1 Overview
"Design System" means a documented, versioned set of design tokens and reusable components guaranteeing visual and structural consistency across every surface and every project. Sections 15–20 define the visual/structural half of this system; this section (14.2–14.3) defines its technical half. Nothing in Sections 23–24 may introduce a value or a tool that isn't defined here first.

### 14.2 Technical Architecture & Preferred Stack

The platform is expected to be engineered using the best available ecosystem, but never at the expense of maintainability. The preferred stack, confirmed through Phase 00 research (Section 00) and adopted as the default starting point for implementation:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion — only for purposeful animation, consistent with the Motion token rule (Section 15), never spectacle
- Lenis — only if smooth scrolling genuinely improves UX; not adopted by default
- MDX — for project content, the natural implementation of the Project Template's content-as-data principle (Section 21)
- Zod — data validation, enforcing the Project Template schema (Section 21) at the code level
- React Hook Form
- Lucide Icons
- next-themes
- next/image
- Vercel — deployment
- pnpm — package management
- Biome or ESLint
- Prettier

This list is a default, not a ceiling, and not a mandate to use every item. A tool is only actually adopted in a given implementation once Section 14.3's policy has approved it against a specific, real need.

### 14.3 Dependency Discovery & Evaluation Policy

Before implementing any feature, analyze whether it can be built using the existing platform stack (Section 14.2). Only introduce a new dependency when it provides clear architectural value that cannot reasonably be achieved with the existing stack.

**Procedure:**
1. Identify the actual need.
2. Check whether the existing stack (Section 14.2) already solves it.
3. Only if it genuinely cannot, research candidates using Section 00's sources and criteria.
4. Document the technical reasoning, benefits, and drawbacks before installing anything.
5. Only adopt tools with active maintenance, adequate documentation, and confirmed compatibility with the Next.js App Router and TypeScript.

Never install a dependency simply because it is popular. Every dependency must have a documented architectural reason, recorded as an Architecture Decision Record (Section 30). If an external library introduces unnecessary complexity, prefer implementing the feature directly. The objective is a platform that is technically elegant, not technically crowded.

---

## 15. Design Tokens

| Token Category | Purpose | Rule |
|---|---|---|
| Color | Background, ink, accent, divider | A near-silent palette: one paper tone, one ink tone, one muted accent used only for interactive states. |
| Spacing | Margins, gutters, section breaks | An 8pt-based scale (8/16/24/32/48/64/96/128). |
| Typography | Type sizes, weights, line-heights | See Section 17. |
| Radius | Corner rounding | Zero, or near-zero, by default. |
| Line weight | Rules, dividers | A single hairline weight, distinct from architectural linework. |
| Motion | Transitions, reveals | Short, quiet, purpose-driven only (150–250ms). |
| Aspect Ratio | Image containers | 16:9 default, matching the standardized 1920×1080 asset pipeline (Section 20.1). |

Tokens are implemented as a single machine-readable source (e.g. `tokens.json`) imported by both the website build and the future PDF generator — the SSOT referenced in Section 3.2.

---

## 16. Grid System

A 12-column responsive grid at desktop, collapsing at tablet and mobile (Section 23); the same grid used for PDF page composition (Section 24); full-bleed images used deliberately, not by default; plans/sections sized to keep linework legible at minimum supported viewing size.

---

## 17. Typography System

One display/heading family, one (possibly shared) body/caption family — no more than two total; a defined modular scale (Display, H1, H2, Body, Caption/Label, Meta); body line-length constrained to ~60–75 characters; captions treated as first-class typography (Section 11.3).

---

## 18. Color & Material Language

Paper-white/near-white background, near-black ink, one muted neutral, one restrained interactive accent; renderings and diagrams supply the color, the interface never competes chromatically (10.2.1); dark backgrounds only as a documented per-component exception (19.1).

---

## 19. Component Library

**19.1 Hero** — full-bleed opening image, project title, thesis sentence (11.1); governs the 5-second checkpoint (Section 08).
**19.2 Narrative Text Block** — short declarative paragraphs for Client Challenge, Constraints, Final Decision, Reflection.
**19.3 Site Analysis** — site diagram/illustration + short annotation.
**19.4 Design Alternatives Comparator** — presents Ideas B‑2, C‑1, D as a legible progression, curated per Section 13; governs the 2-minute checkpoint (Section 08); the platform's single most important component for demonstrating judgement (Section 01).
**19.5 Plan** — grid-locked plan display with scale-preserving behavior (Section 20) and caption slot.
**19.6 Section** — same rules as 19.5, distinguished by aspect-ratio handling.
**19.7 Diagram** — lighter-weight single-idea diagram display, always paired with a caption stating the decision it results from (11.4).
**19.8 Render Gallery** — sequenced final renders, appearing only after the reasoning that justifies them (Section 12).
**19.9 Reflection** — closing text component, visually distinct from 19.2; governs the 5-minute checkpoint (Section 08).
**19.10 Navigation / Progress** — minimal, persistent position indicator (Section 12), supporting jump-navigation (9.2).

---

## 20. Image & Diagram Handling Rules

### 20.1 Why the Existing 1920×1080 Pipeline Matters
Every Villa Red Sun asset has already been processed through a documented, non-destructive pipeline (Resize: Fit mode, aspect-ratio preserved, no stretching; Canvas: 1920×1080, centered, black fill for residual space). Adopted as the platform standard for all future project imagery.

### 20.2 Rules
1. Never stretch, at any stage, on any output.
2. Never crop architecturally meaningful content out of a plan, section, or diagram without explicit sign-off.
3. Renders may be cropped for compositional/hero purposes; drawings may not.
4. All images placed at a resolution appropriate to their largest intended display size.
5. Every plan/section/diagram carries a caption (19.7, 11.3) — no orphaned images.

---

## 21. Project Template Specification

### 21.1 Required Fields per Project
Project identity (name, typology, location, year, status, scale); **thesis sentence** (11.1); **differentiator** (22.1); eight narrative beats (Section 12), each with text and ordered asset references; asset manifest tagged by category and target component (Section 19); credits/meta.

### 21.2 Reusability Test
Validated by hypothetically populating the template with a substantially different project type and confirming the schema's shape doesn't need to change — only its values.

### 21.3 Not-Applicable Handling
Any beat/field a future project cannot fill is explicitly markable not-applicable; both website and PDF renderer skip it gracefully.

---

## 22. Project Comparison Framework

### 22.1 The Differentiator Field
Every project states what it proves that no other project in the platform already proves — different typology, scale, role, or design-challenge category.

### 22.2 The No-Duplicate-Thesis Rule
No two projects may share the same thesis-sentence structure or lead with the same primary design challenge — checked at intake.

### 22.3 The Portfolio-Level Map
Once a second project exists, a cross-project map shows the spread of typology, scale, and role, supporting the range argument in Section 1.3.

---

## 23. Responsive Website Specification

### 23.1 Priority Order
Desktop first (Recruiter/Partner personas, 6.1–6.2), then tablet, then mobile.

### 23.2 Breakpoint Behavior
Desktop: full 12-column grid (16), side-by-side Comparator (19.4). Tablet: reduced columns, Comparator may stack in pairs. Mobile: single column, compact jump-navigation.

### 23.3 Interaction & Motion
Governed by Motion tokens (15) — short, quiet, purpose-driven only.

### 23.4 Performance
Lazy-loading below the fold; predictable derivative sizes given the standardized source set (20.1).

### 23.5 Explicit Reframing of the Build Task
> Design a scalable portfolio platform whose first implementation happens to be a website.

Not "build a responsive website." This framing requires platform-level decisions (Sections 14–21) before any code is written.

---

## 24. PDF-Safe Layout Rules & PDF Generation Strategy

*(Rules only in Release R1; pipeline built in Release R2, Section 32.)*

1. Every web layout must be expressible as a fixed-size page or spread — no scroll/hover/viewport-relative dependency with no print equivalent.
2. The grid (16) is the same grid used for PDF composition, derived from the same tokens (15).
3. Typography (17) must be legible at print resolution and fixed competition-board sizes.
4. Color (18) must be checked against print/CMYK-safe expectations before being locked.
5. Any interactive component (e.g. 19.10) must have a documented static/print equivalent, or be explicitly PDF-exempt.

---

## 25. AI Collaboration Rules

Any AI system contributing to this platform — Claude, Gemini, GPT, Cursor, Copilot, or tools not yet released — is governed equally by this section.

### 25.1 Mandatory Read-Before-Act
No AI system may propose a design or code decision without having read this document in full first.

### 25.2 No Unilateral New Rules
No AI may introduce a new token, component, dependency, or narrative rule without it being logged — as an ADR (Section 30) for implementation decisions, or a Change Log entry (Section 34) for specification changes — and checked against the Golden Rule (3.4).

### 25.3 Conflict Resolution
Conflicting outputs from two AI systems are resolved by checking both against this document — never by picking whichever "looks better" in isolation.

### 25.4 End-of-Session Check
Every AI working session ends by asking: did anything in this session change a rule defined in this document? If yes, has it been logged (Section 30 or 34)?

### 25.5 Autonomous Operation Mandate
The acting AI system is expected to complete as much of the project as possible without asking unnecessary questions. When sufficient information exists, it makes the decision and continues.

### 25.6 Interruption Triggers
Work is interrupted only when: a strategic architectural decision is required; multiple valid solutions exist that would significantly affect future development; project data is missing; or user confirmation is legally, technically, or architecturally required. Small implementation details never justify an interruption.

### 25.7 Interruption Protocol
Whenever work does stop for clarification: (1) explain the issue briefly, (2) explain why the decision matters, (3) recommend a preferred option, (4) wait for confirmation.

### 25.8 Operating Posture
Throughout Sections 00 and 26–27, the acting AI system operates as a senior architect and lead developer, not a passive assistant — proposing, deciding, and building, and reserving questions for the triggers in Section 25.6.

---

## 26. Claude Code Development Workflow

### 26.1 The Phase Gate Rule
> You are NOT allowed to write implementation code until the complete architecture has been designed and approved.

### 26.2 Phases

| Phase | Name | Gate to Pass Before Continuing |
|---|---|---|
| 00 | Research & Ecosystem Discovery | Section 00 research completed; technical stack confirmed (14.2) or deviations justified; initial ADR entries drafted (30). |
| 01 | Project Analysis | Every asset and the project description text read and categorized (Appendix A). |
| 02 | Information Architecture | Section 09 validated against the actual Villa Red Sun content. |
| 03 | Editorial & Narrative Structure | Section 12's eight-beat mapping completed, checked against Section 11. |
| 04 | Portfolio Design System | Sections 15–18 finalized with real, locked token values. |
| 05 | Visual Language | Static comps/mockups approved before any component is built in code. |
| 06 | Component Library | Section 19 components built as isolated, reusable units. |
| 07 | Responsive Website | Section 23 implementation, composed from Phase 06 components only. |
| 08 | Design Review & Content Validation | Section 27 workflow run, then Section 29 checklist run. |
| 09 | PDF Generation | Section 24 rules implemented as a real export pipeline (Release R2). |
| 10 | Future Scalability | Sections 21.2 and 22 tests performed for real. |

### 26.3 Rule for Every Phase
No phase may begin until the previous phase's gate has been explicitly confirmed as passed, by Hanibal, in the working session.

---

## 27. Design Review Workflow

```
Internal Review → AI Review → Architect Review → Revision → Validation
```

**27.1 Internal Review** — Hanibal's own first pass, checked against Section 11 and Section 12.
**27.2 AI Review** — an AI system checks the build against the full Design System (Sections 15–20) and the ADR log (Section 30) for compliance, and scores it against the Quality Framework (Section 28).
**27.3 Architect Review** — a second human, wherever possible, reviews for persona-realism (Section 06) and market fit.
**27.4 Revision** — findings are logged; content fixes update the Project Template (21); systemic gaps become Change Log entries (34) instead of one-off patches.
**27.5 Validation** — only after 27.1–27.4 pass does the build proceed to the Validation Checklist (Section 29).

---

## 28. Portfolio Quality Framework

Applied during AI Review (27.2) and Architect Review (27.3). Each dimension scored 1–5; a project may not proceed to Validation with an average below 4/5 or any single dimension below 3/5.

| Dimension | What It Measures |
|---|---|
| Clarity | Can the page's one question (11.2) be identified immediately? |
| Simplicity | Is anything present that isn't earning its place (11.3)? |
| Readability | Does typography (17) and spacing (15) make the content effortless to read? |
| Hierarchy | Is it obvious what to look at first, second, third? |
| Balance | Does the page feel visually settled? |
| Architectural Value | Does this page demonstrate judgement (01), not just show a picture? |
| Information Density | Too much on the page, or too little to answer its question? |

---

## 29. Validation Checklist

- [ ] Passes the Three-Sentence Test? (1.2)
- [ ] Passed Design Review (27) with Quality Framework average ≥4/5? (28)
- [ ] Core design idea understandable within 5 minutes? (6.2, 08)
- [ ] Every image answers a question the narrative just raised? (11.3)
- [ ] Any image stretched or distorted, anywhere? (20.2.1 — must be "no")
- [ ] Any plan/section/diagram missing its caption? (19.7, 20.2.5)
- [ ] Section sequence matches the eight-beat structure, no silent skips? (12, 21.3)
- [ ] All colors/spacing/type sizes traceable to a token (15–18), zero one-off values?
- [ ] Layout survives desktop → tablet → mobile without breaking narrative order? (23.2)
- [ ] Every layout redrawable as a fixed print page without scroll/hover? (24.1)
- [ ] Would the system accept a second project without modification, component-for-component? (21.2)
- [ ] Does the project have a stated Differentiator and avoid duplicating another project's thesis? (22.1–22.2)
- [ ] Any purely decorative element anywhere? (10.2.2 — must be "no")
- [ ] Is every dependency in the build traceable to an ADR entry? (14.3, 30)

---

## 30. Governance & Architecture Decision Records (ADR)

### 30.1 Purpose
In professional projects, an ADR log's value approaches that of the source code itself after a few months — it preserves the reasoning behind every choice and prevents important decisions from being forgotten or silently re-litigated.

### 30.2 The ADR Artifact
A dedicated file, `ARCHITECTURE_DECISIONS.md`, maintained alongside this Master Design Specification, at the same directory level. It is a first-class project artifact, not an optional log.

### 30.3 Required Fields per Entry
Name (tool/decision) · Purpose · Why it was selected · Alternatives considered · Potential future risks · Date · Status (Accepted / Rejected / Superseded).

### 30.4 What Must Be Logged
Every dependency accepted under Section 14.3; every dependency considered and rejected, and why; every deviation from the preferred stack (14.2); every significant architectural decision (e.g. adopting MDX for content, a component's internal structure, adopting or rejecting Lenis).

### 30.5 Relationship to Section 25
The ADR is the concrete mechanism behind Section 25.2 ("No Unilateral New Rules"): a new tool, token, or component introduced by an AI system is not considered valid until logged here (implementation-level decisions) or in the Change Log, Section 34 (specification-level decisions).

### 30.6 Continuous Maintenance
The ADR file is updated continuously, never treated as a one-time deliverable, and its completeness against the current codebase is checked during AI Review (27.2).

---

## 31. Future Scalability

- **Project N:** addable by populating the Project Template (21) and Comparison Framework fields (22), with assets pre-processed through Section 20.1's pipeline.
- **Competition Variant:** an alternate PDF Generation target (24), not a parallel design system (Release R4, Section 32).
- **Print Variant:** follows the same PDF-safe rules; paper stock and binding are production decisions layered on top of the existing grid and type system.
- **Future Application:** anticipated by keeping the Project Template (21) structured as data rather than hard-coded markup from day one (Release R3, Section 32).

---

## 32. Evolution Roadmap

Platform output milestones are tracked as **Releases**, independent of this document's own version number (Section 34).

```
R1 — Website                     (Villa Red Sun proof of concept — current)
      ↓
R2 — PDF Generator                (Section 24 rules become a real export pipeline)
      ↓
R3 — Interactive Portfolio        (multi-project browsing, filtering, Section 22 map made real)
      ↓
R4 — Competition Export           (jury board formats, Sections 6.3 / 7.3)
      ↓
R5 — Job Application Generator    (auto-tailored one-pagers per role, integrating with
                                     Hanibal's existing CV-intelligence and job-matcher tooling)
```

No Release may begin implementation before the previous Release's output has passed the Validation Checklist (Section 29) for at least one real project.

---

## 33. Acceptance Criteria & Definition of Done

### 33.1 Definition of Done (Phase 1)

Phase 1 (Section 5.1) is complete when:

1. The Villa Red Sun website is live/runnable, built entirely from the components and tokens defined in this document, using only dependencies logged in the ADR (Section 30).
2. The project has passed the full Design Review Workflow (Section 27), including a Quality Framework score (Section 28) meeting the required thresholds.
3. The Validation Checklist (Section 29) passes in full, including the Three-Sentence Test (1.2) and the No-Duplicate-Thesis check (22.2).
4. The Project Template (21) has passed its own Reusability Test (21.2), documented as an addendum once confirmed.
5. Hanibal has reviewed the live build against the personas (06) and the psychology checkpoints (08), and confirmed the target impressions are met.
6. This document and the ADR (30) have been updated to reflect any token values, schema decisions, technology choices, or rule refinements discovered during implementation.

### 33.2 Final Communication Requirement

After every major milestone, a complete progress report is provided in Persian (Farsi). The report explains: what has been completed; what decisions were made; what tools were selected and why (cross-referencing the relevant ADR entries, Section 30); what remains to be done; and whether any action is required from Hanibal.

Work continues autonomously whenever possible (Section 25.5); the workflow stops only when human input is genuinely required (Section 25.6). Hanibal is assumed available and willing to help, but his time is respected by minimizing unnecessary interruptions. All technical work — research, architecture, implementation, refactoring, and optimization — is performed automatically whenever feasible, governed by Sections 00, 14.3, 25, and 26.

Persian reports must be clear, concise, and written for a human reader, not for another AI system.

---

## 34. Versioning & Change Log

Document version numbers (v1.0, v2.0, v3.0, ...) track changes to this specification itself. Platform Releases (R1, R2, ...) track the platform's shipped outputs (Section 32). Architecture Decision Records (Section 30) track implementation-level technical decisions. The three numbering systems are intentionally independent.

A major document version bump reflects a philosophy, scope, or governance change. A minor bump reflects locked token values, schema refinements, or new components discovered necessary during implementation.

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-08-01 | Initial Master Design Specification — product engineering layer (philosophy, information architecture, design system, component library, project template, website/PDF rules, Claude Code workflow, validation checklist). |
| 2.0 | 2026-08-01 | Added the architecture-portfolio-strategy layer: Professional Identity, Recruitment Strategy, Portfolio Psychology, Architectural Narrative Rules, Asset Selection Rules, Project Comparison Framework, AI Collaboration Rules, Design Review Workflow, Portfolio Quality Framework, Evolution Roadmap. Established the governing thesis: "The platform is not designed to present projects. It is designed to demonstrate architectural judgement." |
| 3.0 | 2026-08-01 | Converted the document from a design specification into a full governance framework. Added Section 00 (Research & Ecosystem Discovery) as a formal pre-Phase-01 step. Merged the Technical Architecture & preferred stack and the Dependency Discovery & Evaluation Policy directly into the Portfolio Design System (Section 14.2–14.3), rather than as a standalone chapter. Merged the Autonomous Operation Mandate and Interruption Protocol directly into AI Collaboration Rules (Section 25.5–25.8). Added Section 30, Governance & Architecture Decision Records (ADR), formalizing `ARCHITECTURE_DECISIONS.md` as a first-class project artifact. Merged the Persian Final Communication Requirement into Acceptance Criteria (Section 33.2). Renumbered all sections (00–34) into a single continuous governing structure with no appended or bolted-on content. |

---

## Appendix A — Villa Red Sun Dataset Manifest (Phase 01 Input)

Source directory: `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final File\A-villa-red-sun-Final-1920-1080`
All files pre-processed to 1920×1080, non-distorted, per Section 20.1.

**Exterior Renders (4)** — `01-villa-red-sun-exterior-view-01.png`, `...-02.png`, `...-03.png`, `...-04.png`

**Interior Renders (4)** — `05-villa-red-sun-interior-living-room-01.png`, `06-villa-red-sun-interior-dinning-room-01.png`, `07-villa-red-sun-interior-kitchen-01.png`, `08-villa-red-sun-interior-master-bedroom-01.png`

**Site Analysis (3)** — `SiteAnalysis-A-villa-red-sun.png`, `SiteAnalysis-A-villa-red-sun-Illustration.png`, `Spotting-On-TheSite-A-villa-red-sun.png`

**Design Alternative — Idea B‑2 (6)** — `Circulation-Plan-Idea-B-2-Top.png`, `DayLight-Plan-Idea-B-2-Top.png`, `MasterPlan-Idea-B-2-Top.png`, `Plan-Idea-B-2-Top.png`, `Plan-Idea-B-2-Top-AirFlow.png`, `PrivacyGradient-Plan-Idea-B-2-Top.png`

**Design Alternative — Idea C‑1 (6)** — `Circulation-Plan-Idea-C-1-Top.png`, `DayLight-Plan-Idea-C-1-Top.png`, `MasterPlan-Idea-C-1-Top.png`, `Plan-Idea-C-1-Top.png`, `Plan-Idea-C-1-Top-AirFlow.png`, `PrivacyGradient-Plan-Idea-C-1-Top.png`

**Design Alternative — Idea D (7)** — `Circulation-Plan-Idea-D-Top.png`, `DayLight-Plan-Idea-D-Top.png`, `MasterPlan-Idea-D-Top.png`, `Plan-Idea-D-Top.png`, `Plan-Idea-D-Top-AirFlow.png`, `Plan-Idea-D-Top-Illustration.png`, `PrivacyGradient-Plan-Idea-D-Top.png`

**Sections (2)** — `Section-A-Illustration.png`, `Section-B-Illustration.png`

**Total: 32 files.** Direct input to Phase 01 / Section 09 and Section 12 mapping, the Component Library assignments in Section 19, and the Asset Selection Rules in Section 13.

*(The full project description exists as a separate text file in the same project folder and must be read in full during Phase 01. This specification intentionally does not reproduce that content here, so this document remains valid as the system definition even as project-specific text is edited.)*

---

## Appendix B — Glossary

- **Platform vs. Portfolio:** 3.1. **SSOT:** 3.2. **Golden Rule:** 3.4.
- **Thesis Sentence:** 1.2, 11.1. **Differentiator:** 22.1.
- **Design Token:** 15. **Component:** 19. **Beat:** 12. **Checkpoint (psychology):** 08.
- **PDF-safe:** 24. **Not-applicable (N/A):** 21.3. **Reusability Test:** 21.2.
- **Phase (Claude Code workflow):** 26.2 — distinct from **Release** (32), which tracks platform output milestones (R1–R5), and from **Document Version** (34).
- **Phase Gate:** 26.1, 26.3.
- **Quality Framework dimensions:** Clarity, Simplicity, Readability, Hierarchy, Balance, Architectural Value, Information Density — 28.
- **ADR (Architecture Decision Record):** 30 — the technical decision log, distinct from the Change Log (34), which tracks changes to this document itself.
- **Preferred Stack:** 14.2. **Dependency Discovery Policy:** 14.3.

---

*End of Nexus Portfolio Platform — Master Design Specification v3.0.*
*Governing thesis: "The platform is not designed to present projects. It is designed to demonstrate architectural judgement."*
*Next required action: Phase 00 — Research & Ecosystem Discovery, followed by Phase 01 — Project Analysis (read the full Villa Red Sun project description text file in the source directory, cross-reference against Appendix A, and produce the Phase 01 output before Phase 02 begins).*
