# Portfolio Open Issues

Rewritten 2026-08-25 (originally written 2026-08-25, superseded same-day
after a long autonomous session closed out most open items). Severity:
**BLOCKER** (stops publication/launch), **MATERIAL** (real defect or
risk, not launch-blocking on its own), **MINOR** (cosmetic,
documentation, or low-impact).

Each item is labeled FACT (directly observed) or INFERENCE (reasonable
conclusion, not independently re-verified this session).

---

## BLOCKER

None open. B1 (below) was the only blocker and is resolved.

---

## RESOLVED

### B1 — Reflection text
**RESOLVED.** English `reflection.text` was found, on investigation, to
already be fully written (finished, first-person, specific) for both
projects — the earlier "still a placeholder in both locales" framing was
inaccurate; only Danish was ever actually pending. Danish translation was
then authorized directly by Hanibal (he doesn't speak Danish and asked
for it to be translated from his approved English text) and inserted
verbatim into `content/projects/villa-red-sun.ts` and `villa-efe.ts`.
Verified live on `/da/projects/villa-red-sun` and `/da/projects/
villa-efe`: real text renders, zero `AFVENTER` placeholder residue, zero
console errors. Also integrated as a new closing PDF sheet
(`components/print-landscape/reflection-sheet-landscape.tsx`), same dark
"bookend" treatment as the website (ADR-006), verified via real PDF
render (`pdf-export/qa-v3-reflection-check/`).

### M1 — Row 2 height mismatch in Environmental Diagrams
**RESOLVED**, confirmed 2026-08-25. See prior entry — `Environmental
Disclosure` card moved from the Wind column to the Solar column,
re-balancing the two independent flex columns. Verified via live-rendered
column heights on both projects, both locales.

### M2 — Components 08/09 unfinished stub SVGs
**RESOLVED**, this session. A machine-wide read-only search (per
Hanibal's direction) found a genuinely richer original at `Desktop/
Nexus-DK - Portfolio - Claude - Gemini - 2026/All Final File/
Environmental-Diagrams-Final/` — confirmed real by opening it directly,
not just checking file size. `public/diagrams/08-solar-architectural-
reading.svg` and `09-wind-envelope-reading.svg` no longer ship the
literal broken `{massing(...)}` template placeholder; both now carry
real illustrated building/sun-path/wind-flow vector artwork, grafted
into each file's existing (already wiring-compatible) scaffold.

Judgment calls made and documented in-file (`public/diagrams/08-*.svg`,
`09-*.svg` header comments): the source reference's specific chip claims
("Moderate", "SW and W façades receive the greatest exposure") were
**not** carried over — they're unverified, project-unrelated claims,
exactly what `solar-diagram.tsx`/`wind-diagram.tsx`'s own code already
flags as fabricated and refuses to show. Chip groups keep real category
labels with "NOT ESTABLISHED" values (matching the honesty convention
already used elsewhere in this package) and remain force-hidden in
production exactly as before — this was already true pre-fix and is
unchanged. 08's 4-vs-3 chip mismatch resolved by merging "Western
Exposure" + "Orientation Optimal" into one "Orientation" slot. 09's
fixed "SW"/"NE" directional labels were dropped (this component has
never been wired to a real per-month compass bearing, unlike 03/06, so
a fixed direction label would itself be an unverified claim).

Verified live, both projects, both locales, zero console errors,
`#building-mass` renders exactly once (the pre-existing
`fillMassingPlaceholder` JS runtime fallback correctly no-ops now that
real content ships in the file). **Diagrams 08/09 are website-only** —
confirmed by reading `environmental-sheet.tsx` directly: the PDF's
Environmental Analysis sheet uses a separate, pre-produced static PNG
per project and was never wired to show these components. PDF
re-exported regardless to confirm no regression (18 clean pages).

### M3 — Recraft AI style exploration
**RESOLVED / SUPERSEDED.** A real, complete original source was found
instead (see M2) — the Recraft AI exploration is no longer the path
forward and can be considered closed without finishing it.

### M4 — Uncommitted git changes
**RESOLVED.** All work across this engagement is now committed to git
in atomic, logically-grouped commits (i18n infrastructure, Environmental
Diagrams, editorial redesign, About page, PDF pipeline, graphify
refresh, handoff docs, Danish reflection text, PDF Reflection sheet
integration, launch.json fix, About page typography redesign, diagram
08/09 replacement — see `git log --oneline` for the full sequence).
Local commits only, nothing pushed to `origin/master`, per instruction.

---

## MATERIAL

### N3 — PDF Site Analysis sheets still photographic
**ASSESSED, not implemented — genuine scope limit, not an oversight.**
Direction in `PDF-VISUAL-DIRECTION.md` asks for hand-drawn line-art
matching the plan/section illustration family, replacing the current
photographic-aerial-plus-overlay treatment. Checked for an existing
produced asset first (same approach that resolved M2) —
`SiteAnalysis-A-villa-red-sun-Illustration_result.jpg` exists and was
opened directly, but it's a richer *overlay* on the same photographic
aerial base (sun-path arc, wind/noise annotations), not hand-drawn line
work — it doesn't satisfy the direction's actual ask. No line-art
version exists anywhere searched.

This is real architectural illustration production — accurately
drawing real site boundary geometry, real adjacent-building footprints,
real road/coast position in line-art form — not something to
approximate or invent without real survey/site data, per CLAUDE.md rule
4's spirit applied to spatial claims. Left as-is rather than faked.
`PDF-VISUAL-DIRECTION.md` itself already confirms the current
photographic version is "accurate and usable... not a correctness fix,"
so this remains a real but non-blocking gap. **Needs Hanibal's own
input** (commissioning new artwork, or providing source geometry) to
move forward — not a decision an AI session should make unilaterally.

---

## RESOLVED (continued)

### N4 — PDF print typography scale
**RESOLVED.** 13 ad hoc `text-[Npx]` values across the landscape print
sheets consolidated into one documented 6-step scale (`.pt-micro`
through `.pt-display`) in `app/print/print-landscape-redesign.css`.
Verified zero content overflow across all 18 sheets (measured, not
assumed) and via real PDF re-export/visual confirmation on multiple
pages.

---

## MINOR

### N1 — `README.md` and `PROGRESS.md` are stale
**FACT.** Unchanged. Still not fixed — out of scope unless requested;
`docs/handoff/PORTFOLIO_MASTER_STATE.md` remains the authoritative
status document.

### N2 — Port 3000 has a stuck process in this environment
**FACT, as of 2026-08-19/20**, not re-tested since. `.claude/launch.json`
is now correctly configured for port 3001 (was misconfigured for 3000 at
one point this session — fixed).
