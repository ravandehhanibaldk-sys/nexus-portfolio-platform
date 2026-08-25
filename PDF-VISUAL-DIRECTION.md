# PDF Track — Visual Direction Note

**Date:** 2026-08-22
**Scope:** Presentation layer only. Page structure, project order, and page count are unchanged. Nothing in this note proposes new content, new claims, or new data — every example below reuses real, already-approved text/data already in `content/projects/*.ts`.

---

## Status of items 1–2 (context, not new work)

1. **Plans & Sections layout fix** — done, confirmed with screenshots (`components/print/plans-sections-sheet.tsx`). Height-driven flex layout, `object-contain`, Efe level-indicator strip.
2. **Environmental Analysis redesign** — done, confirmed with screenshots (`components/print/environmental-sheet.tsx`). One dominant diagram (Solar), one quiet secondary (Wind), all card data preserved as typographic annotations, disclosure footnote kept.

This note covers **3 (Site Analysis) and 4 (Typography/Editorial)** as direction only — no implementation, per your instruction to hold until Plans & Sections is confirmed on your side.

---

## 1. The process cycle (IDEA → SITE → TENSION → ITERATION → EVIDENCE → DECISION → REALIZATION → REFLECTION)

**Current state** (`about-sheet-landscape.tsx`): one line of accent-colored text, uniform weight, tucked under a divider at the bottom of the "How I Work" column. It reads as a caption, not as the structural idea it actually is — this cycle is the thesis of the whole portfolio (it's what "IDEA ↔ SITE" and the pull-quote above it are both talking about), so it currently carries less visual weight than a footnote.

**Direction:** treat it as a typographic diagram, not a sentence.
- Each of the 8 words gets its own position, not run-on in one line — a single horizontal (or two-row, landscape-friendly) sequence with visible air between words, connected by thin arrow rules rather than the `→` glyph inline in a text run.
- Differentiate weight/opacity by role rather than coloring every word the accent orange (accent stays reserved for genuine emphasis, per the design token's own rule — "never decorative"): the four *inputs* (IDEA, SITE, TENSION, ITERATION) sit in `text-neutral`, the four words that describe *resolution* (EVIDENCE, DECISION, REALIZATION, REFLECTION) step up to `text-ink` at a slightly larger size. This gives the cycle a visible direction of travel without adding color.
- One word may carry the accent — whichever the specific project's own Reflection identifies as where that project actually sat longest (Red Sun's reflection points at DECISION being tested hardest; that's a legitimate, data-backed reason to weight one word, not decoration for its own sake).
- Keep it off the About page's bottom-of-column position only if a full-width treatment doesn't fit; otherwise it deserves more room than the current 2-column layout gives it.

## 2. Site Analysis graphics

**Current state:** real aerial site photography with vector overlays drawn on top per the project's own documented legend (yellow site boundary, purple adjacent buildings, green vegetation, cyan traffic/view arrows, red north arrow) — technically evidence-based already, but it reads as a GIS export / map-tool screenshot, not as a hand-considered architectural diagram, because the base layer is a photo and the overlay is literal (icons, arrow glyphs, label boxes) rather than drawn.

**Direction — do not change what the diagram claims, change how it's drawn:**
- The portfolio already has a proven visual language for this exact problem: the illustrated plans and sections (`A-16`, `A-14/A-15`, `B-20…24`, `B-18/B-19` — the watercolor/line-illustration treatment used throughout Final Architecture). Site Analysis should be brought into that same family rather than staying photographic. A drawn site plan — massing, boundary, adjacent buildings, road, coastline/context — in the same restrained line+wash style as the section drawings, with the same legend vocabulary (site boundary, adjacent buildings, green area, coast road, project site) redrawn as line work instead of laid over a photo.
- This is a real asset-production task (new illustrated site plates, one per project), not a CSS/layout change — flagging that distinction now so it's scoped correctly whenever it's greenlit. It should follow the same "extract reality first" discipline already governing every other diagram in this project: real boundary geometry, real adjacent-building footprints, real road/coast position — redrawn, not reinterpreted.
- Until new plates exist, the current annotated photographs are accurate and usable — this is a quality upgrade, not a correctness fix, so there's no urgency pressure to rush the new artwork.

## 3. Typography levels (print sheets specifically)

The print sheets currently pick sizes ad hoc per component (`text-[19px]`, `text-[12.5px]`, `text-[10px]`, alongside the web's `text-meta`/`text-caption` tokens) — functional, but there's no single scale governing "this is a section title, this is body, this is metadata" across all 15 pages, so hierarchy varies slightly sheet to sheet. Recommend formalizing one small print-specific scale (distinct from the web's rem-based tokens, since print sheets are already sized in mm/px directly) and using it everywhere:

| Level | Size | Weight/family | Use |
|---|---|---|---|
| **Section title** | 19–20px | `font-display` (Fraunces), ink | "How I Work", "Final Architecture," beat headings |
| **Body** | 12–12.5px | `font-body` (Inter), ink/85, leading-snug | Narrative paragraphs, beat answers |
| **Emphasis / pull quote** | 16–17px | `font-display`, ink, left border in accent | Thesis sentences, the one already-working pattern in `about-sheet-landscape.tsx` (`ideaSite.pullQuote`) — extend this exact treatment rather than inventing a new one |
| **Metadata / eyebrow** | 9–10px | `font-body`, neutral, tracking-wide, uppercase | Labels, captions, footer, disclosure footnotes |

This is almost exactly what's already in use — the recommendation is consolidation into one named scale so every sheet pulls from the same four levels instead of picking a nearby px value each time.

## 4. Reflection — editorial treatment, if/when space allows

Flagging the current real constraint again since it governs what's possible here: **no Reflection sheet exists yet anywhere in the print deck** (confirmed when the Short versions were approved — the print pipeline has no reserved slot for it; adding one means a 16th page, which is a structural change beyond a presentation-layer pass). This note describes treatment only, not a page-count decision.

**Direction, when it's added:** treat it the same way the About page already treats `ideaSite.pullQuote` — not a boxed card, not a labeled "Reflection" panel matching the beat pages' Q&A format, but closer to a closing editorial page: the Short Reflection text set in `font-display` at pull-quote size, generous line-height, no question/eyebrow scaffolding above it (the beat pages already established "01 — Client Challenge" style question+answer; Reflection should read as the one place that pattern breaks, since it's the project's own voice closing the sequence, not another beat being answered). A single small metadata line (project name) is enough framing — the text should be the whole page, not share space with another diagram.

---

**Next steps:** none from this note alone — it's direction only. Site Analysis needs new artwork commissioned/produced before any layout work is meaningful; Typography consolidation is a real but small refactor across the existing sheets whenever you want it scheduled; Reflection placement needs a page-count decision first (separate from this note, same category as the earlier Portrait-vs-Landscape call).
