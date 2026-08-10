# Nexus Portfolio Platform — Architecture Decision Records (ADR)

Maintained per NPP Master Design Specification v3.0, Section 30. One entry per accepted, rejected, or superseded technical decision. Newest entries at the top.

---

## ADR-008 — Asset Library Reset: New Numbered Libraries Adopted as Sole Authority

- **Date:** 2026-08-10
- **Status:** Accepted
- **Purpose:** Establish `A-villa-red-sun-Final/` (38 files) and `B-villa-efe-Final/` (52 files) — freshly rebuilt and renamed by Hanibal — as the sole authoritative asset source for both projects, superseding the `-1920-1080` folders the live site currently references.
- **Why selected:** Hanibal explicitly rebuilt and renamed every asset (Constitution #13). A Phase 0 verification pass confirmed this is not a cosmetic rename: of the 11 filenames that happen to coincide between the old (live) and new (authoritative) libraries, all 11 differ in byte size — direct proof that filename coincidence cannot be used as an asset-identity check for this project going forward. The other 47 live-code asset references don't coincide by filename at all (old diagram-naming convention vs. the new numbered convention).
- **Alternatives considered:** Treating the new library as a partial update, merging in only clearly-renamed files and leaving filename-coincident ones alone — rejected, since the byte-comparison evidence shows this would have silently kept 11 stale images live under the false assumption that a matching name meant matching content.
- **Consequences / tradeoffs:** `content/projects/villa-red-sun.ts` and `content/projects/villa-efe.ts` currently reference the old library end-to-end and must be fully remapped (Phase 4/5 work, not yet done — tracked in `PHASE1_ARCHITECTURE_DECISION_DOCUMENT.md` §4.4). No component code changes are required — the codebase grep in Phase 0 confirmed all asset references live exclusively in the two content files, so this is a content-layer remap, not a refactor.
- **Potential future risks:** If Hanibal rebuilds the asset library again in the future, this same verification discipline (recursive enumeration + byte comparison for any filename-coincident files, never trust-by-name) should be repeated before remapping, per the precedent set here.

## ADR-007 — `lucide-react` Re-Added: Now Has a Real, Multi-Icon Need

- **Date:** 2026-08-02
- **Status:** Accepted (supersedes the Phase 08 removal, not a reversal of that decision's reasoning)
- **Purpose:** Icons for the new Back-to-Portfolio nav (arrow) and the new Lightbox (close, previous, next).
- **Why selected:** `lucide-react` was removed in Phase 08 because it was installed but had zero real usage (Section 4.1, smallest defensible dependency set). That reasoning stands — the removal was correct at the time. This phase adds four genuine icon needs across two new components, which clears Section 14.3's bar for a dependency the hand-built-SVG precedent (ADR-005) doesn't: multiple distinct icons reused across components, not one bespoke interaction. `lucide-react` is also already named in the platform's preferred stack (Section 14.2), so re-adding it under real usage is the default path, not a new evaluation.
- **Alternatives considered:** Hand-drawn inline SVGs per icon (4 of them) — more code to maintain for no benefit over a maintained, tree-shakeable icon set already on the preferred stack.
- **Potential future risks:** None identified. Re-audit for unused icon imports whenever a component using `lucide-react` is removed.

## ADR-006 — Dark Background Extended to Reflection as a Deliberate Bookend

- **Date:** 2026-08-01
- **Status:** Accepted (clarifies Section 18's exception wording)
- **Purpose:** `components/project/reflection.tsx` uses `bg-paper-dark`/`text-ink-dark`, the same dark tokens as the Hero (Component 19.1).
- **Why selected:** Spec Section 18 names Hero (19.1) as the documented dark-background exception; it does not explicitly name Reflection. Found during Phase 08 AI Review (Section 27.2). On inspection this is not scope creep: Component 19.9's own brief says Reflection must be "visually distinct from Narrative Text Block... so the reader feels the project has concluded" — a dark bookend that echoes the Hero the reader saw at the very start is a direct, intentional implementation of that brief, and reads as a considered structural device (open dark, close dark, everything in between on paper) rather than an arbitrary deviation.
- **Alternatives considered:** Reverting Reflection to the paper/ink light tokens used by Narrative Text Block — would satisfy Section 18's literal wording but weakens the "project has concluded" signal the component is specifically supposed to give.
- **Potential future risks:** If a third component ever wants a dark background, that would need its own justification — this ADR does not open dark backgrounds up generally, only confirms this specific Hero/Reflection bookend pair.

## ADR-005 — Alternatives Tab Control: Hand-Built, shadcn/ui Tabs Deferred

- **Date:** 2026-08-01
- **Status:** Accepted (deviation from default preferred-stack listing)
- **Purpose:** The B-2 / C-1 / D tier switcher inside the Design Alternatives Comparator (Component 19.4, the platform's most important component per Spec Section 1.3).
- **Why selected:** The interaction is a simple single-select tab group. It was hand-built with `role="tablist"` / `role="tab"` / `aria-selected` directly in `components/project/alternatives-comparator.tsx`, styled with existing tokens, animated with Framer Motion (already accepted, ADR-003). Per Spec Section 14.3, a dependency is only introduced when the existing stack cannot reasonably solve the need — a three-item tab switcher does not clear that bar.
- **Alternatives considered:** shadcn/ui `Tabs` (Radix-based) — genuinely the right choice once a more complex interactive component is needed (e.g., a filterable multi-project index in Release R3, or a form in a future contact/download flow).
- **Potential future risks:** None for v1. Re-evaluate the moment a second interactive pattern is needed — installing shadcn's Tabs primitive at that point may make more sense than maintaining two hand-built patterns.

## ADR-004 — Content Storage: Typed TS Data + Zod, MDX Deferred

- **Date:** 2026-08-01
- **Status:** Accepted (deviation from default preferred-stack listing)
- **Purpose:** Store the Project Template (Spec Section 21) content for Villa Red Sun.
- **Why selected:** The eight narrative beats (Spec Section 12) are short, declarative, structured fields (thesis sentence, differentiator, per-beat text, ordered asset references) — not long-form prose. A single Zod-validated TypeScript data object (`content/projects/villa-red-sun.ts`) satisfies the Project Template schema directly, gives compile-time + runtime validation, and requires zero extra dependency. Per Spec Section 14.3 ("analyze whether it can be built using the existing platform stack... only introduce a new dependency when it provides clear architectural value"), this need does not clear that bar yet.
- **Alternatives considered:** MDX + Contentlayer2 (community fork of the unmaintained Contentlayer), `next-mdx-remote`, Velite. All three add real value once Reflection-style long-form prose or rich inline embeds are needed, but are unjustified overhead for eight short text fields per project.
- **Potential future risks:** If future projects need rich formatted prose (embedded quotes, inline captioned figures inside a paragraph), this decision should be revisited. Re-evaluation trigger: Project 02 content review (Spec Section 22).
- **Revisit condition:** Logged for Phase 10 (Future Scalability, Spec Section 26.2) reassessment.

## ADR-003 — Animation: Framer Motion Included, Lenis Excluded by Default

- **Date:** 2026-08-01
- **Status:** Accepted
- **Purpose:** Section-transition and reveal motion (Spec Section 15, Motion token; Section 23.3).
- **Why selected:** Framer Motion is already on the preferred stack (Spec Section 14.2) and directly implements the "short, quiet, purpose-driven only" motion rule. Lenis (smooth scrolling) is explicitly conditional in the spec ("only if smooth scrolling genuinely improves UX") — native scroll behavior is used for v1 since the eight-beat linear narrative (Section 12) does not depend on scroll-feel to communicate correctly.
- **Alternatives considered:** GSAP (heavier, more capability than needed), CSS-only transitions (insufficient for the Design Alternatives Comparator's state changes).
- **Potential future risks:** None identified for v1. Lenis may be reconsidered in Release R3 (Interactive Portfolio, Spec Section 32) if multi-project browsing benefits from inertial scroll.

## ADR-002 — UI Layer: shadcn/ui v4 + Radix UI + Tailwind CSS v4

- **Date:** 2026-08-01
- **Status:** Accepted
- **Purpose:** Base component primitives and styling.
- **Why selected:** Confirmed via Phase 00 research (web search, 2026-08-01) as the current standard pairing with Next.js 16 / React 19 — copy-owned components (not an installed black-box library) fit the platform's "own the design system" philosophy (Spec Section 14.1) better than a closed component library. Tailwind v4's token-driven config maps directly onto the Design Tokens system (Spec Section 15).
- **Alternatives considered:** Chakra UI, Mantine (both are pre-built component libraries with less design-token-level control), plain CSS Modules (would require rebuilding accessibility primitives Radix already solves).
- **Potential future risks:** shadcn/ui components are copied into the repo, not installed as a versioned package — upstream fixes must be manually re-pulled. Acceptable trade-off for design-system ownership.

## ADR-001 — Core Framework: Next.js 16 (App Router) + React 19 + TypeScript

- **Date:** 2026-08-01
- **Status:** Accepted
- **Purpose:** Application framework for the responsive website (Release R1, Spec Section 32).
- **Why selected:** Confirmed via Phase 00 research (web search, 2026-08-01): Next.js 16.2.6 is current stable, App Router has been the stable default since v13.4, ships with React 19.2 and Turbopack by default. Matches the preferred stack (Spec Section 14.2) exactly; App Router's server-component model fits an image-heavy, content-driven site (lower client JS for static narrative/image pages) and gives a direct migration path to the PDF Generator (Release R2) and Interactive Portfolio (Release R3) without a framework change.
- **Alternatives considered:** Astro (excellent for content sites, but weaker fit once Release R3's interactive multi-project browsing and Release R5's generator logic are considered), Remix (comparable capability, smaller ecosystem overlap with shadcn/ui).
- **Potential future risks:** Next.js major-version upgrades occasionally require config migration (e.g., Turbopack becoming default). Mitigated by pinning the version in `package.json` and reviewing release notes before upgrading.

---

*Every future dependency addition, rejection, or deviation from the Master Design Specification's preferred stack (Section 14.2) must be logged here before or immediately after the change is made, per Spec Section 30.4.*
