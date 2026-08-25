# Portfolio Open Issues

Written 2026-08-25. Severity: **BLOCKER** (stops publication/launch),
**MATERIAL** (real defect or risk, not launch-blocking on its own),
**MINOR** (cosmetic, documentation, or low-impact).

Each item is labeled FACT (directly observed) or INFERENCE (reasonable
conclusion, not independently re-verified this session).

---

## BLOCKER

### B1 — Reflection text is placeholder, not written by Hanibal
**FACT.** Both `content/projects/villa-red-sun.ts` and
`content/projects/villa-efe.ts` have their `reflection.text` field
literally set to `"[PENDING — to be written by Hanibal in his own voice,
per Spec Section 12. Placeholder, not for publication.]"` (English and
Danish). This is explicit, in-data, marked "not for publication" — the
site cannot go live/be shared publicly with this content as-is. This is
not an AI task — it requires Hanibal's own input.

---

## RESOLVED

### M1 — Row 2 height mismatch in Environmental Diagrams (Solar Metrics vs Wind Exposure)
**RESOLVED, confirmed 2026-08-25.** Fix (from the prior session): moved the
`EnvironmentalDisclosure` card from the Wind (right) column to the Solar
(left) column, as the closing/caveats item — see the "Column-balance fix
(M1)" comment in `components/project/environmental-diagrams.tsx`. This
re-balanced the two independent flex columns from a ~1320px height gap
(3 cards left / 5 right) to a documented ~298px gap (4 cards each side),
without touching source SVGs or fabricating content.
**Re-verified this session** by inspecting the current code (confirms the
card placement and rationale comment are in place) and by measuring live
rendered column heights in-browser on both projects at `localhost:3001`:
Villa Red Sun and Villa Efe both show 4 cards per column, left/right
heights of 1219px / 1426px (~207px gap, no dead-space hole), identical on
both projects. No console errors. `pnpm lint` / `pnpm build` were reported
clean for this fix in the prior session; not independently re-run this
pass (verification here was scoped to visual/structural confirmation
only).

---

## MATERIAL

### M2 — Components 08/09 are unfinished stubs in the source SVG package
**FACT, confirmed by direct inspection of the raw files** (not the wiring
code — verified by loading `public/diagrams/08-solar-architectural-reading.svg`
and `09-wind-envelope-reading.svg` standalone, with zero app code involved).
Both ship as thin placeholder line-art with three **identical,
undifferentiated** classification-chip boxes (literal text
`"CLASSIFICATION"` / `"OPTIONAL"`, no icons, no per-chip identity) —
compared to the project's own original reference concept images, which
show a fully-rendered building illustration and real, distinct classification
chips. The current site code (`solar-diagram.tsx`, `wind-diagram.tsx`) already
does the most honest thing possible with this input — reuses real approved
massing geometry, hides the meaningless chip stubs rather than inventing
labels for them. **Fixing the visual richness gap requires either (a) a
completed replacement asset from whoever produced the original SVG
package, or (b) a hand-built SVG replacement that respects the existing
element-ID/wiring contract** (`solar-chip-1`, `building-mass`, etc.) — an
AI image/vector generator alone cannot produce a drop-in replacement,
since none of them know this project's specific ID contract.
**INFERENCE — partial path forward exists:** a Recraft AI (Vector mode,
"Flat Illustration"/"Line Art" style — not yet confirmed which exact style
works, see M3) trial produced a genuinely closer-to-reference illustration
in an earlier exploration; this was left mid-investigation, not finished
or integrated.

### M3 — Recraft AI style exploration left unfinished
**FACT.** A live Recraft.ai session was used to test generating replacement
illustration art for M2. The first style tried (a photorealistic "isometric
miniature house model" preset) was visually wrong for this project's flat,
minimal, no-shadow line-art system. The correct next step (open the Style
panel in Vector mode, find a flat/line-art preset) was identified but not
completed before the session ended. No generated asset from this
exploration has been integrated into the site.

### M4 — 63 uncommitted git changes; only file backups protect this work
**FACT.** `git status --short` shows 63 changed/untracked paths, including
essentially all of the recent Environmental Diagrams, print/PDF pipeline,
and locale-routing work. The last real git commit is `16ebe72`. If the
working copy were lost or corrupted before a commit, only the file-level
backups (`Backup-Website-2026-08-24-Before-Handoff` and earlier ones)
would preserve this work — git history would not. **Recommend committing
in logical chunks before further large changes.**

---

## MINOR

### N1 — `README.md` and `PROGRESS.md` are stale
**FACT.** `PROGRESS.md`'s phase table still lists PDF Generation as
"Not in scope (Release R2)" and neither file mentions locale routing,
Villa Efe, or the print/PDF pipeline that now exists. Documentation debt,
not a functional defect — but don't trust either file for current status;
use `PORTFOLIO_MASTER_STATE.md` instead.

### N2 — Port 3000 has a stuck process in this environment
**FACT, as of 2026-08-19/20** (may no longer apply — re-check before relying
on it). A process on port 3000 could not be killed (access denied, likely
owned by a different session/user on the same machine). Workaround: run
`pnpm dev --port 3001`.

### N3 — PDF Site Analysis sheets still photographic, not illustrated
**FACT**, per `PDF-VISUAL-DIRECTION.md` (2026-08-22). Direction was written
(redraw as line-work matching the plan/section illustration style) but
explicitly held pending confirmation of the Plans & Sections / Environmental
sheet work (which is now done — see `PORTFOLIO_MASTER_STATE.md` Section 4).
May be ready to proceed; confirm with the user before starting, since it
was described as "a real asset-production task," not a quick layout change.

### N4 — PDF print typography scale not formalized
**FACT**, per `PDF-VISUAL-DIRECTION.md`. Print sheets currently size text
ad hoc (`text-[19px]`, `text-[12.5px]`, etc.) rather than against one
documented print-specific scale. Recommendation exists in that file; not
implemented.
