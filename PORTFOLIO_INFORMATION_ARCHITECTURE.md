# PORTFOLIO_INFORMATION_ARCHITECTURE.md
### Phase 1 — Information Architecture
**Date:** 2026-08-10 · **Status:** Decision document only — no implementation performed.

This document maps the current authoritative assets (`A-villa-red-sun-Final/`, `B-villa-efe-Final/`) onto the site's structure. It reuses the existing, already-working eight-beat narrative and component set (Constitution #4 — no duplicate components) rather than inventing a new structure; the change from what's live today is entirely which assets fill each slot, not the shape of the site.

---

## 1. Homepage

Unchanged from the current implementation: a single scroll listing project entries as full-width bordered rows (cover image + title + typology + thesis sentence), each linking to its project page. Two entries: Villa Red Sun, then Villa Efe.

**Project C:** suspended, per instruction. Not shown. No placeholder tile, no "coming soon" entry — an omitted third slot is more honest than a fabricated one (Constitution #8).

---

## 2. Hero (both projects)

Per the approved Hero Decision: **static image only, animation slot preserved.**

- The existing Hero component logic already selects its image by finding the first `category: "exterior"` asset inside the `finalArchitecture` beat — no new code logic is needed. As long as content mapping places **A-01** and **B-01** as the first exterior entries in each project's Final Architecture asset list (§5.4 below confirms this), the existing mechanism produces the correct result automatically.
- `heroVideo` is unset for both projects for now. The component's animation-vs-fallback branching stays exactly as built — this is a data change, not an architecture change.

---

## 3. Project Navigation

Unchanged: `BackToPortfolio` (fixed, top-left, both project pages), `ProgressNav` (secondary jump affordance, desktop-only per existing responsive rule), Comparator tabs for alternative/level navigation within the Design Process beat. No new navigation components required.

---

## 4. Project A — Villa Red Sun

Existing eight-beat structure, assets remapped to the current library:

| Beat | Content | Assets |
|---|---|---|
| 01 Client Challenge | Text only (from `A-project_villa-red-sun.txt`, unchanged) | — |
| 02 Site | Site-context + environmental conditions | A-34 (site-spotting), A-29 (Solar Path), A-3x (Wind Analysis — **which version, open, §8.1**) |
| 03 Constraints | Text only | — |
| 04 Design Thinking | Text only (intro to the B2/C1/D comparison) | — |
| 05 Design Process — Comparator (3 tabs: B2 / C1 / D) | Per tier: Plan, Airflow, Daylight, Circulation, Privacy-Gradient | B2: A-09, A-20, A-17, A-23, A-26 · C1: A-10, A-21, A-18, A-24, A-27 · D: A-11, A-22, A-19, A-25, A-28 |
| 06 Final Decision | Text only (why D was selected) | — |
| 07 Final Architecture | Sections (raw or illustrated — **open, §8.3**), orientation plan, renders | Sections: A-12/13 or A-14/15 · Orientation: A-16 · Exteriors: A-01–04 · Interiors: A-05–08 |
| 08 Reflection | Text only — still `[PENDING]`, not fabricated | — |

**Rationale for the Site-beat environmental grouping:** A-29 (Solar Path) and the Wind Analysis diagrams describe the site's inherent conditions (sun geometry, regional wind climate) — they don't vary by design proposal, unlike the per-tier Daylight/Airflow diagrams inside the Comparator, which show how *each specific proposal* responds to those conditions. This is the same distinction the existing Site beat question ("What was the physical starting condition?") already implies — not a new rule, just consistent application of it.

**Why the same asset (A-01) appears in both Hero and the Final Architecture render set:** this was already decided and is not being re-litigated — Hero and gallery may share a source asset so the gallery stays complete (prior session decision, still valid).

---

## 5. Project B — Villa Efe

Same eight-beat shape. The Design Process beat continues the established reinterpretation for this project: since Villa Efe has no competing cost/quality tiers (it's a single new-construction scheme), the Comparator's tabs represent the four privacy-graded **floor levels** instead — the same component, the same underlying judgment ("let the reader compare a small labeled set of plan+diagram groups"), different data. This is not a new decision; it's the same one made and validated in the prior implementation, now just re-pointed at new files.

| Beat | Content | Assets |
|---|---|---|
| 01 Client Challenge | Text only | — |
| 02 Site | Site-context + environmental conditions + site-level plan/diagrams | B-47 (site-spotting), B-44 (Solar Path), B-45/46 (Wind — **§8.2**), B-15 (site-level plan), B-29/34/43 (site-level daylight/airflow/privacy — no site-level circulation exists, see §8.4) |
| 03 Constraints | Text only | — |
| 04 Design Thinking | Text only (vertical privacy-hierarchy concept) | — |
| 05 Design Process — Comparator (4 tabs: Basement / Ground Floor / First Floor / Roof) | Per level: Plan, Airflow, Daylight, Circulation, Privacy-Gradient | Basement: B-11, B-30, B-25, B-35, B-39 · Ground Floor: B-12, B-31, B-26, **[circulation missing — §8.4]**, B-40 · First Floor: B-13, B-32, B-27, B-37, B-41 · Roof: B-14, B-33-airflow, B-28, B-33-or-B-38-circulation (**open, §8.5**), B-42 |
| 06 Final Decision | Text only (iterative collaborative process — real, sourced text, no fabricated "winner" since there's no tiered competition) | — |
| 07 Final Architecture | Sections (raw or illustrated — same open question as A), renders, orientation plans | Sections: B-16/17 or B-18/19 · Exteriors: B-01–04 · Interiors: B-05–10 (pool-side, dining, living, kitchen, master bedroom, master bathroom) · Orientation plans B-20–24 — **placement open, §8.6** |
| 08 Reflection | Text only — still `[PENDING]` | — |

**Villa Efe Site beat is richer than Villa Red Sun's** (six assets vs. three) because the current library genuinely contains more site-level material for B (a dedicated site-level plan with its own diagram set, in addition to the site-spotting/solar/wind cluster both projects share). This isn't a manufactured imbalance — it reflects what's actually in the two libraries.

---

## 6. Technical Analysis Structure (applies to both projects)

Two tiers, consistently applied:
1. **Project-wide / site-level analysis** (Solar Path, Wind, site-spotting, and for B the site-level plan diagrams) → lives in the **Site** beat.
2. **Proposal/level-specific analysis** (Plan, Airflow, Daylight, Circulation, Privacy-Gradient per tier or floor) → lives inside the **Design Process Comparator**, one tab per tier/level.

This split is the core organizing principle of this IA pass — everything else follows from it.

---

## 7. Image Sequencing, Text Relationship, Responsive Behavior

- **Within Final Architecture:** sections → orientation plan(s) → exterior renders → interior renders. Unchanged from the existing, already-validated order.
- **Text-to-image relationship:** unchanged — every beat opens with eyebrow/question/text (`NarrativeTextBlock`) before its images, so the question is established before the reader sees the answer. No change proposed.
- **Responsive behavior:** no redesign required. The existing grid components (`sm:grid-cols-2 lg:grid-cols-3` etc.) are asset-count-driven, not asset-identity-driven — swapping which files populate a grid doesn't change how many columns it has. The one place count actually changes structurally is Villa Efe's Site beat (3 assets before → 6 now), which will need the same grid-column reconsideration already applied elsewhere when a beat's asset count changed (precedent: Site Analysis grid fix, prior session) — flagged here as an implementation-phase detail, not an IA decision.

---

## 8. Conflicts & Open Decisions (do not resolve silently)

### 8.1 Villa Red Sun wind data — still a three-way contradiction
A-31/32/33 disagree on summer prevailing wind direction (S–SW / SE–SSE / W–SW). No IA decision can pick the Site beat's wind content until this is resolved.

### 8.2 Villa Efe wind data — lower severity, still unconfirmed
Two versions (B-45/46) exist; a spot check found no direct contradiction but they were not exhaustively cross-verified. Needs a final "use this one" confirmation before content mapping.

### 8.3 Section variant — raw photorealistic vs. illustrated (both projects)
Both exist for both projects. Illustrated matches the established editorial register more closely; raw is more technically literal (shows the excavation/soil condition explicitly). Genuine curatorial choice, not decided here.

### 8.4 Villa Efe Ground Floor circulation — confirmed genuinely absent
No circulation diagram exists for GF in the current library (confirmed in Phase 0, re-confirmed here). Site-level also has no circulation diagram, but that may simply not apply at site scale rather than being a gap — flagged as a distinct, lower-confidence observation, not asserted as fact.

### 8.5 Villa Efe Roof circulation — B-33 vs. B-38
Both genuinely different images (confirmed by direct visual inspection in Phase 0), B-38 visibly more complete. Which one represents the intended final Roof circulation asset is not decided here.

### 8.6 Villa Efe orientation plans (B-20–24) — placement
Villa Red Sun has exactly one such asset (A-16, for the final proposal D), living in Final Architecture. Villa Efe has five — one per level, because unlike A's B2/C1/D, all five of B's levels are part of the single final built proposal, not competing alternatives. Two defensible placements: **(a)** all five in Final Architecture as a complete "how the sections relate to each level" orientation set, mirroring A-16's role; or **(b)** four distributed alongside their respective Comparator tabs and the fifth alongside the Site beat's plan. This document does not pick one — it's a real structural judgment call, not a default.

### 8.7 Daylight diagrams — inclusion pending the fix decision from Phase 0
A-17–19 and (very likely, per the established production-pipeline pattern) B-25–29 are non-functional — no visible overlay, confirmed by direct inspection. This IA document places them in the Comparator table above for completeness of the asset-to-slot mapping, but their actual inclusion should wait on the still-open decision (raised in the prior audit, restated in `claude_instructions.md` Section 7's own instruction) of whether to regenerate them from data, drop them in favor of the Solar Path diagrams already carrying that narrative role, or use them as-is pending consultation.

---

## 9. Summary — Per the Requested Report Format

**1. Confirmed decisions:**
- Eight-beat structure and existing component set carry forward unchanged (no new components, no redesign).
- Hero: static-only for both projects, A-01/B-01, via the existing image-selection mechanism — no new code path needed.
- Two-tier technical-analysis split (site-wide vs. proposal/level-specific) as the organizing principle for where diagrams live.
- Project C: omitted entirely, no placeholder.
- Image sequencing within Final Architecture, text/image relationship, and responsive grid mechanics: all unchanged.

**2. Proposed decisions (recommended, not yet approved):**
- Group Solar Path + Wind + site-spotting (+ Villa Efe's site-level plan/diagrams) under the Site beat, per §6.

**3. Open decisions (require your input before Content Mapping/Phase 4):**
- §8.3 Section variant choice, both projects.
- §8.6 Villa Efe orientation-plan placement.
- §8.7 Whether/how to include the non-functional Daylight diagrams.

**4. Asset-dependent decisions (blocked on data/asset clarification, not a curatorial choice):**
- §8.1 Villa Red Sun wind diagram — which of three.
- §8.2 Villa Efe wind diagram — which of two.
- §8.5 Villa Efe Roof circulation — B-33 or B-38.

**5. Conflicts discovered this pass:** none new beyond what Phase 0 and the prior audit already surfaced — this pass organized those same open items into the structure rather than finding new ones, plus surfaced §8.6 (orientation-plan placement) as a newly-identified structural question specific to Villa Efe's asset shape.

**6. Recommended next step:** Resolve §8.1–8.2 (asset-dependent, factual, likely fastest to close) so Phase 4 Content Mapping isn't blocked later; §8.3/8.6/8.7 can be decided whenever convenient since they don't block anything else in this document. Otherwise, awaiting your review to proceed toward Phase 2 (Design System & Scale Audit) — not started, per instruction.

---

**STOP. Waiting for review.**
