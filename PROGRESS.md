# Nexus Portfolio Platform — Progress Log

Tracks Phase status against `Nexus Portfolio Platform - Master Design Specification v3.0.md`, Section 26.2.

| Phase | Status | Notes |
|---|---|---|
| 00 — Research & Ecosystem Discovery | ✅ Done | Confirmed Next.js 16.2.6 / React 19.2 / shadcn v4 / Tailwind v4 as current stable stack. Logged in `ARCHITECTURE_DECISIONS.md` (ADR-001–004). |
| 01 — Project Analysis | ✅ Done | Read `project_villa-red-sun.txt` in full; cross-referenced against the 32-file asset manifest. Real finding: this is a **renovation merging two existing buildings**, driven by a genuine cost-vs-quality conflict between the two parents, with 7 total design proposals (only B-2, C-1, D fully visualized). This is more specific and more interesting than the generic "site-driven alternatives" framing assumed earlier in the spec's own examples — the content itself is stronger than expected. |
| 02–03 — Information Architecture + Narrative Mapping | ✅ Done | Real content mapped onto the eight-beat structure in `content/projects/villa-red-sun.ts`. Thesis sentence and Differentiator written per Section 1.2 / 22.1. |
| 04 — Design Tokens | ✅ Done | Locked in `app/globals.css` (color, spacing, radius, motion, type scale). Spacing intentionally uses Tailwind's default scale, not an override — see comment in that file. |
| 05 — Visual Language | ⚠️ Skipped formal mockup step | No static comps were produced separately; went directly to coded components since the token values and component briefs (Spec Section 19) were already this specific. Recommend a visual pass in the browser once `pnpm dev` is running, before treating layout as final. |
| 06 — Component Library | ✅ Done | 8 components built in `components/project/`: Hero, NarrativeTextBlock, SiteAnalysis, AlternativesComparator, FinalArchitecture (combines Section+RenderGallery), Reflection, ProgressNav, plus a shared Frame primitive. |
| 07 — Responsive Website | ✅ Done, visually verified | Verified live at `pnpm dev` on desktop/tablet/mobile (Section 23.2 breakpoints). Found and fixed a real mobile bug: Hero title/thesis had no responsive scale, ballooning to ~74% of viewport height on a 375px screen — see Phase 08 findings. |
| 08 — Design Review & Validation | ✅ Run 2026-08-01 | Full AI Review (27.2) against Sections 15–20 + ADR log, scored against Quality Framework (28), checked against Validation Checklist (29). See findings below. Internal/Architect Review (27.1/27.3) and full Validation sign-off (27.5) still need Hanibal in the loop. |
| 09 — PDF Generation | ❌ Not in scope (Release R2) | |
| 10 — Future Scalability | ❌ Not started | |

## What Exists Now

A complete Next.js source tree at the project root:

```
app/                        — pages, layout, design tokens (globals.css)
  page.tsx                  — Home, lists both projects
  projects/villa-red-sun/   — Project 01 route
  projects/villa-efe/       — Project 02 route
components/project/         — 11 components: Hero, NarrativeTextBlock, SiteAnalysis,
                               AlternativesComparator, FinalArchitecture, Reflection,
                               ProgressNav, Frame, BackToPortfolio, Lightbox, ProjectPage
content/projects/           — villa-red-sun.ts + villa-efe.ts, both Zod-validated (Section 21)
lib/                        — schema + utils (imagePath, videoPath)
public/images/villa-red-sun/ — real A-project assets (exact filenames, incl. "_result" suffix)
public/images/villa-efe/    — real B-project assets (exact filenames, incl. "_result" suffix)
public/videos/villa-red-sun/ — Hero video (Villa Efe has none yet)
package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs
README.md, ARCHITECTURE_DECISIONS.md, PROGRESS.md (this file)
```

`pnpm build` and `pnpm lint` both pass clean as of 2026-08-02.

## Phase 08 — Design Review Findings (2026-08-01)

Confirmed running via `pnpm dev` on `localhost:3000` (Hanibal's environment, not the original build sandbox). AI Review (27.2) performed against Sections 15–20 and the ADR log, verified live in-browser (DOM, computed styles, console, network, click-interaction testing) rather than by source reading alone. `pnpm build` and `pnpm lint` were also run for the first time ever on this project (Known Gap #1 from the previous entry) — both failed initially, both fixed, both now pass clean; see fixes #11–12.

**Bugs found and fixed (no approval needed — implementation defects, not design decisions):**
1. **Critical — Design Alternatives Comparator (19.4) didn't switch images.** Clicking the B-2/C-1/D tabs updated the tab UI (`aria-selected`) but `AnimatePresence mode="wait"` never mounted the new tier's images — reproduced on a clean reload, silently stuck, no console error. This is the platform's own "single most important component" (Section 1.3) and it was non-functional. Fixed in `components/project/alternatives-comparator.tsx` by dropping the `AnimatePresence`/`mode="wait"` wrapper in favor of a plain keyed `motion.div`. Re-verified: all three tiers now swap correctly.
2. **Hero image duplicated in Final Architecture.** `01-villa-red-sun-exterior-view-01.png` rendered both as the Hero and again in the Final Architecture render gallery — the same photo twice on one page, violating Section 13.3 ("the remaining three appear in Final Architecture") and Section 11.5 (No-Repetition). Fixed in `components/project/final-architecture.tsx` by excluding the Hero's asset from the render gallery.
3. **21 plan/section/diagram images had no caption** — all six diagrams each for B-2/C-1/D, plus Section A/B — failing Validation Checklist item on captions (19.7/20.2.5) outright. Added captions to every one in `content/projects/villa-red-sun.ts`, matching the existing caption style already used for the Site Analysis assets.
4. **Mobile Hero was oversized.** `text-display`/`text-h2` had no responsive step-down (unlike Home, which already did this correctly), so at 375px width the title+thesis text block consumed ~74% of the viewport height, crowding out the "full-bleed opening image" the Hero brief (19.1) calls for. Fixed in `components/project/hero.tsx`: `text-h1 md:text-display` / `text-body md:text-h2`, matching Home's existing pattern. Verified at 375px and 768px.
5. **On-page section numbering was inconsistent** — eyebrow numbers reused "04" for both Design Thinking and Design Process, then jumped straight to "06", skipping "05"/"07" in different places. Renumbered sequentially 01–08 across `page.tsx`, `alternatives-comparator.tsx`, `final-architecture.tsx`; `ProgressNav`'s 7 anchors renumbered 01–07 independently (it covers 7 scroll-stops for 8 narrative beats by design, since Design Thinking/Process share one anchor).
6. **Motion token violation** — the Home page cover-image hover used `duration-500` (500ms), which is both undocumented and outside Section 15's stated 150–250ms range. Changed to `duration-[var(--duration-base)]` (220ms), matching the pattern used everywhere else.
7. **`next/image` `sizes` was `100vw` everywhere**, including images displayed at 1/2 or 1/3 grid width — over-fetching larger derivatives than needed (Section 23.4, Performance). Added accurate `sizes` per grid context in `SiteAnalysis`, `AlternativesComparator`, `FinalArchitecture`.
8. **Site Analysis grid orphaned its third image** (3 images in a 2-column grid). Changed to `sm:grid-cols-2 lg:grid-cols-3` to match the 3-item count, consistent with the grid pattern already used in the Comparator.
9. **Four unused dependencies were installed with no ADR** (`react-hook-form`, `lucide-react`, `next-themes`, `class-variance-authority` — zero imports anywhere in `app/`, `components/`, `content/`, `lib/`), failing Validation Checklist item 14 and Non-Goal 4.1 ("smallest defensible dependency set"). Removed from `package.json`, ran `pnpm install` to prune — verified the app still compiles and renders clean afterward.
10. Stale doc comment in `app/projects/villa-red-sun/page.tsx` claimed the Final Decision beat was "folded into" surrounding text with no section of its own — the code has always rendered it as its own section. Corrected the comment to match actual behavior.
11. **`pnpm build` failed outright — a real, pre-existing type error, not caught until now because no one had run a production build before.** Every beat in `content/projects/villa-red-sun.ts` omits `notApplicable` (relies on the Zod schema's `.default(false)`), but the content was typed against `Project` (`z.infer`/output type, where defaulted fields are required), not the input type. Fixed at the root rather than patching all 8 beats: added `ProjectInput = z.input<typeof projectSchema>` to `lib/content-schema.ts` for content-authoring use, and retyped `villaRedSun` against it. `Project` (output) stays as the stricter type components consume post-parse. Scales cleanly to Project 02 without every future beat needing to restate `notApplicable: false`.
12. **`pnpm lint` failed outright — no `eslint.config.*` file existed at all**, despite `eslint-config-next` being installed. Added `eslint.config.mjs` importing `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` directly as flat-config arrays (the modern ESLint-9-native shape this version of `eslint-config-next` ships — a `FlatCompat`-based config, which is the more commonly documented pattern for older setups, actually crashes here with a circular-JSON error against this package version). Lint now runs clean, zero errors or warnings.

**Logged, not changed:** `Reflection` (19.9) uses the same dark background as Hero — Section 18 only names Hero as the documented exception. On inspection this reads as an intentional, well-justified bookend (open dark, close dark) rather than scope creep, so it was logged as `ARCHITECTURE_DECISIONS.md` ADR-006 instead of reverted.

**Verified, not a bug:** a dev-console warning suggested the Hero image needed `loading="eager"` — checked directly; Next.js already emits a `<link rel="preload" as="image">` for it via the `priority` prop, so the warning is a benign dev-mode false positive.

### Portfolio Quality Framework (Section 28) — scored post-fix

| Dimension | Score | Note |
|---|---|---|
| Clarity | 5/5 | Eyebrow → question → text pattern is consistent everywhere now that numbering is fixed. |
| Simplicity | 5/5 | No decorative-only elements found; duplicate hero image removed. |
| Readability | 5/5 | Type/spacing tokens confirmed rendering correctly; mobile Hero no longer overwhelms the layout. |
| Hierarchy | 5/5 | Three-tier pattern (eyebrow/question/body) holds across every beat. |
| Balance | 4/5 | Site Analysis and Comparator grids fixed; the Final Architecture render gallery still ends on an odd-numbered row (7 images in a 2-col grid) — minor, not blocking. |
| Architectural Value | 5/5 | Content is genuinely strong (real client conflict, 7 proposals, differentiator stated); now actually demonstrable since the Comparator works. |
| Information Density | 4/5 | Solid throughout; can't fully close this out until the real Reflection text replaces the placeholder. |

**Average: 4.71/5** — passes the ≥4/5 average gate, no dimension below the 3/5 floor.

### Validation Checklist (Section 29)

- [x] Three-Sentence Test (1.2) — strong material present (thesis, differentiator, full eight-beat arc); will only strengthen once Reflection is real.
- [x] Passed Design Review with Quality Framework ≥4/5 (28) — 4.71/5, see above.
- [x] Core design idea understandable within 5 minutes (6.2, 08) — full arc renders and the Comparator now actually works.
- [x] Every image answers a question the narrative just raised (11.3).
- [x] No image stretched or distorted anywhere (20.2.1) — `Frame` uses `object-cover` on identically-ratioed 16:9 sources by construction (Section 20.1 pipeline).
- [x] No plan/section/diagram missing its caption (19.7, 20.2.5) — 21 missing captions added, verified live.
- [x] Section sequence matches the eight-beat structure, no silent skips (12, 21.3) — numbering fixed.
- [x] All colors/spacing/type sizes traceable to a token, zero one-off values (15–18) — the one `duration-500` violation found and fixed; grep-verified clean otherwise.
- [x] Layout survives desktop → tablet → mobile without breaking narrative order (23.2) — verified at 1280/768/375px, no horizontal overflow, Hero mobile bug fixed.
- [ ] **Every layout redrawable as a fixed print page without scroll/hover (24.1)** — the Comparator's click-to-reveal tabs have no documented static/print equivalent yet. Not a Phase 1 blocker (PDF pipeline is explicitly Release R2, Section 5.2), but flagged now so it's not forgotten when Release R2 starts.
- [x] Would the system accept a second project without modification, component-for-component (21.2) — schema and components are already fully generic; only the route itself (`app/projects/villa-red-sun/page.tsx`) is per-project, which is expected until Phase 10.
- [x] Differentiator stated, no duplicate-thesis conflict (22.1–22.2) — trivially true with one project; re-check when Project 02 is added.
- [x] No purely decorative element anywhere (10.2.2).
- [x] Every dependency traceable to an ADR (14.3, 30) — 4 unused, unlogged dependencies found and removed (see fix #9 above); everything remaining in `package.json` now maps to ADR-001–006.

**13 of 14 pass; 1 explicitly deferred to Release R2 (documented above), none failing outright.**

## Post-Review Structural Refinement (2026-08-01)

Hanibal's explicit design-direction call: keep the photorealistic-plans-with-diagram-overlays visual language for Section 05 (Design Process) as-is — no illustrated drawings there. Moved the one exception (`Plan-Idea-D-Top-Illustration.png`, the illustrated final plan) out of Proposal D's tier in `content/projects/villa-red-sun.ts` and into `finalArchitecture.assets`, positioned right after Section A/B and before the exterior/interior renders — separating "comparing alternatives" (05) from "documenting what got built" (07). `components/project/final-architecture.tsx` was restructured to render Sections + Plan together as one "documentation drawings" grid (now 3 items, so `md:grid-cols-2` → `sm:grid-cols-2 lg:grid-cols-3` to avoid orphaning the third item — the one grid change required by the reorder), then exterior renders, then interior renders, then a `remaining` catch-all for any future asset category not covered by the above (currently empty, present for Section 21.2 reusability). Side effect: all three Comparator tiers (B-2, C-1, D) now show exactly 6 diagrams each — more visually parallel for direct comparison. Verified live: D's tab in the Comparator now shows 6 images, Final Architecture shows the plan in its new position, build still passes.

## UX & Presentation Refinement Phase (2026-08-02)

Explicit instruction from Hanibal: preserve typography/spacing/color/layout language exactly, only add the listed improvements. Everything below was implemented without redesigning anything.

**New components:**
- `components/project/back-to-portfolio.tsx` — fixed top-left pill, always above the Hero, `Back to Portfolio` + arrow icon, translucent `bg-paper/90` so it reads over both the dark Hero photo and the light body sections, keyboard-focusable real `<Link>`, hover nudges the arrow.
- `components/project/lightbox.tsx` — `LightboxProvider` (React Context) + modal. Every `Frame` (`components/project/frame.tsx`, now `"use client"`) is a button that opens the lightbox scoped to its own section's asset list (`gallery`/`index` props), so arrow navigation stays within the group the reader was already looking at — e.g. inside the Comparator it cycles the current tier's 5–6 diagrams; inside Final Architecture it cycles the whole beat's images in narrative order. Dark backdrop, ESC/backdrop-click/X to close, prev/next buttons + arrow keys + touch swipe (verified via simulated touch events), caption preserved, `next/image` with `object-contain` (no crop, "preserve image quality"), body scroll locked while open and restored on close, no layout shift (fixed overlay).
- `components/project/project-page.tsx` — the shared eight-beat page shell (Hero → beats → Reflection, wrapped in `LightboxProvider` + `BackToPortfolio`), extracted so both project routes render from one place instead of duplicating the tree (Section 21.2, Reusability Test) — this is what made adding Project 02 a data change, not a page rewrite.

**Hero video (19.1):** `Project.heroVideo` is a new optional schema field (`lib/content-schema.ts`). When set, `Hero` (now `"use client"`) renders an autoplay/muted/loop/playsInline/cover `<video>` with the static hero image as its `poster`; an `onError` handler flips a `videoFailed` state so it falls back to the same static image path used everywhere else if the video fails to load at runtime — not just when the field is absent. Villa Red Sun has a real hero video; Villa Efe doesn't (none exists yet) and correctly falls back to its static image.

**Final Architecture gallery restored to complete (Section 04 of this phase's brief):** explicit reversal of the Phase 08 hero-exclusion fix — Hanibal's call was that Hero and gallery may share the same source asset, and the gallery should never be incomplete because of it. `final-architecture.tsx` no longer excludes the Hero's asset; Villa Red Sun's render gallery is back to all 4 exterior + 4 interior = 8 (even), so the Balance-dimension nit from the Phase 08 review (an odd 7-image row) is also resolved as a side effect.

**Project A filenames corrected to the real source folder:** `public/images/villa-red-sun/` was wiped and re-copied from `A-villa-red-sun-Final-1920-1080` verbatim — every filename now carries its real `_result` suffix and the `A-`-prefixed exterior/interior names (the Phase 08 review had been built against differently-named placeholder copies). `content/projects/villa-red-sun.ts` updated to match every `src` exactly. Hero video copied to `public/videos/villa-red-sun/`.

**Illustrated plan move (Section 05 of this phase's brief):** same relocation done in the previous session, re-verified against the real filename — `Plan-Idea-D-Top-Illustration_result.png` sits in Final Architecture (after Section A/B, before the render galleries), not in the Comparator.

**Project 02 — Villa Efe added**, sourced only from `B-project_villa-efe.txt` and only real filenames from `B-villa-efe-Final-1920-1080` (`content/projects/villa-efe.ts`, assets in `public/images/villa-efe/`). Structural note: Villa Efe has no cost/quality tiered proposals like Villa Red Sun — it's a single new-construction design organized vertically by privacy level. The Design Process beat (05) reuses the same Comparator component with the four levels (Basement / Ground Floor / First Floor / Roof Terrace) as its tabs instead of competing proposals — same component, same Golden Rule (3.4) reuse, different content. The Site beat additionally carries the project's two location plans plus the site-level airflow/daylight/privacy diagrams (content genuinely describes the site separately from the building's internal floor organization, so the split isn't arbitrary). One real asset, `B-05-villa-efe-interior-_result.png`, was deliberately not referenced — it's a second, unlabeled copy of what `B-05-villa-efe-interior-poolside_result.png` already covers with a real label (Section 13.1, Selection Hierarchy: Clarity beats a nameless duplicate); it's still copied into `public/images/villa-efe/` in case Hanibal wants it identified and used later. No section drawings, no separate master plan, and no hero video exist for Villa Efe in the source folder — none were invented; Final Architecture there has no drawings grid (renders only), and the Hero falls back to the static image. `differentiator` and `thesisSentence` were written to satisfy Section 22.2 (No-Duplicate-Thesis): Villa Red Sun is a budget-driven renovation/negotiation story, Villa Efe is a ground-up luxury coastal new-build on a steep waterfront site — distinct typology, scale, and challenge category.

**Home (`app/page.tsx`)** changed from a single hardcoded project link to a loop over `[villaRedSun, villaEfe]`, reusing the exact same card markup per project (Section 22.3, Portfolio-Level Map) — adding Project 03 later is one array entry, not a layout change.

**`lucide-react` re-added** (`ARCHITECTURE_DECISIONS.md` ADR-007) — removed in Phase 08 for being unused, now has a real, justified multi-icon need (back arrow, lightbox close/prev/next).

**Verified:** `pnpm build` and `pnpm lint` both pass clean with zero warnings after all of the above (one real TypeScript error was caught and fixed along the way — a touch-event property that TypeScript correctly flagged as possibly `undefined`). Live-verified in-browser: Comparator tab-switching still works on both projects, lightbox open/close/arrow-keys/swipe/backdrop-click all confirmed, no image 404s across either project (including the space-containing Villa Efe filenames), no horizontal overflow at 1280/768/375px on Home or either project page.

## Known Gaps / Honest Limitations

1. **Reflection beat text is still a placeholder on both projects**, explicitly marked `[PENDING]`. Per Spec Section 12, this must be written by Hanibal, in his own voice — deliberately not fabricated for either project.
2. **Location field is "Undisclosed"** for Villa Red Sun (source text says "Unknown"). Villa Efe's location is filled in as "Northern Cyprus" because the source text states that explicitly (the exact site is withheld for client privacy, per the text itself — this is real, not invented).
3. **No shadcn/ui components were actually installed/copied yet** — the alternative-tier/level tabs are hand-built with proper `role="tablist"`/`role="tab"` ARIA instead (ADR-005). Logged for future re-evaluation if a form or dialog is needed.
4. **ProgressNav (19.10) is still fully hidden below the `lg` breakpoint** rather than the "compact jump-navigation" Section 23.2 describes for mobile — not addressed this phase either, same reasoning as before: several genuinely different UI patterns exist and picking one is a real design decision, not something to fix unilaterally.
5. **`B-05-villa-efe-interior-_result.png`** exists on disk but isn't referenced anywhere — see the Villa Efe note above.
6. **Villa Efe's Final Architecture render count is 9 (odd)** — 4 exterior + 5 interior, which is everything real and properly labeled that exists for it. Unlike the Villa Red Sun case, there's no extra real asset to restore here; fabricating a 10th image was not an option.

## Next Actions (in order)

1. Hanibal: write the real Reflection text for both projects (or confirm the placeholders should stay for now), and decide on the ProgressNav mobile pattern (Known Gap #4).
2. Claude: once Reflection text lands for a project, re-run its Three-Sentence Test / Information Density scoring.
3. Claude: when Release R2 (PDF Generation) starts, resolve the deferred Validation Checklist item from Phase 08 — a static/print equivalent for the Comparator's tab interaction (Section 24 rule 5) — for both projects' tab structures (proposals for A, levels for B).
