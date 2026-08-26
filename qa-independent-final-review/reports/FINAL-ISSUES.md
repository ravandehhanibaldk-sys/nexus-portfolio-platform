# Final Issues Log

Consolidated findings from the full Website + PDF QA pass, HEAD `26d87f0c8508c4b32abffbce522ef4c6d568eb6e`. Per the task's audit-only constraint, **none of these were fixed** — each is recorded with evidence and a recommended fix for Hanibal to action separately.

Severity scale: **Critical** (broken/incorrect for a visitor) · **High** (visible factual/data inconsistency) · **Medium** (accessibility/localization gap, not visible to a typical visitor) · **Low** (source hygiene, no user-facing effect) · **Cosmetic**.

---

## F-1 — Solar-altitude figure disagrees between the static Environmental Analysis image and the Climate Interface widget

- **Severity:** High
- **Location:** `/en/projects/villa-red-sun` and `/en/projects/villa-efe` (both locales) — Environmental Analysis section vs. Climate Interface widget, same page. Also present identically on PDF pages 7 and 16 (the PDF only carries the static-image side).
- **Exact problem:** Both components display "solar altitude for January, this project" as a headline number, and the two numbers disagree:
  - Villa Red Sun: static image "NOON ALTITUDE 14.4°" vs. Climate Interface "11.1° at 12:09" — a +3.3° gap.
  - Villa Efe: static image "NOON ALTITUDE 34.6°" vs. Climate Interface "31.2° at 11:45" — a +3.4° gap.
- **Evidence:**
  - Static image figures confirmed by direct pixel inspection of `content/projects/villa-red-sun.ts`'s `climateInstrument.environmentalAnalysis` asset and the equivalent Villa Efe asset, and independently re-confirmed against PDF page renders `pdf/pages/page-07.png` / `page-16.png`.
  - Climate Interface figures sourced directly from `content/projects/villa-red-sun.ts:90` (`{ month: "JAN", ..., solar: { altitudeDeg: 11.1, time: "12:09", source: "derived" } }`) and `content/projects/villa-efe.ts:96` (`{ month: "JAN", ..., solar: { altitudeDeg: 31.2, time: "11:45", source: "derived" } }`).
  - Wind data (direction + speed) IS consistent between the same two components on both projects — this rules out a wholesale data-desync and isolates the issue to the solar-altitude figure specifically.
  - The ~+3.3°/+3.4° offset is consistent in magnitude across both unrelated sites/dates, suggesting a systematic cause (different reference day, different formula/model, or a deliberate refinement made only in the newer static image) rather than two unrelated data-entry errors.
- **Recommended fix:** Reconcile the two data sources — either regenerate the `months[].solar.altitudeDeg` content values to match whatever produced the static image's "Noon altitude" figure, or regenerate the static image from the same source data as `content/projects/*.ts`. Requires Hanibal's decision on which figure is authoritative; out of scope for this audit to resolve unilaterally.

---

## F-2 — Villa Efe Location Plan SVG `<title>` is English-only regardless of page locale

- **Severity:** Medium
- **Location:** `public/diagrams/10-site-location-efe.svg`, rendered via `components/project/site-diagram.tsx` on `/da/projects/villa-efe` (and `/en`, where it's correct by default).
- **Exact problem:** The SVG's accessible name (`<title id="title">Location Plan — Waterfront Site</title>`) is hardcoded English and never wired to the dictionary. On the Danish page, a screen-reader user hears an English accessible name while the rest of the page is in Danish.
- **Evidence:** `site-diagram.tsx` wires the dictionary only into the diagram's visible `text.heading` element (`wireHeading`); the SVG's own `<title>`/`<desc>` elements are untouched, confirmed by direct file read and by the localization audit script (`scripts/qa-localization-audit.mjs`, which explicitly collects `svg title, svg desc` text since it's real assistive-tech-exposed content) flagging it as identical on both locale pages.
- **Recommended fix:** Either localize the SVG's `<title>`/`<desc>` via the same `wireHeading`-style DOM patch used for the visible heading, or set `aria-hidden="true"` on the SVG and provide the accessible name via an external, dictionary-driven `aria-label` on the wrapping element instead.

---

## F-3 — Villa Efe Location Plan SVG `<desc>` is English-only AND references the deleted Environmental Diagrams system

- **Severity:** Medium
- **Location:** Same file as F-2, `public/diagrams/10-site-location-efe.svg`.
- **Exact problem:** `<desc id="desc">Coded site-context diagram: ... matching the Environmental Diagrams instrument-panel visual language.</desc>` — untranslated (same issue as F-2), and its text explicitly references the "Environmental Diagrams instrument-panel" system that was fully removed from this codebase. The reference is invisible to sighted users but exposed to assistive tech.
- **Evidence:** Direct file read of `10-site-location-efe.svg`; confirmed zero other live references to "Environmental Diagrams" anywhere in rendered page text (0 matches across all 4 project pages, both locales, per the obsolete-system text search in `WEBSITE-QA.md`) — this `<desc>` is the sole surviving reference.
- **Recommended fix:** Rewrite the `<desc>` text to drop the "Environmental Diagrams instrument-panel" comparison (it no longer describes anything that exists), and localize it alongside the F-2 fix.

---

## F-4 — `climate.regionalReference` dictionary key is identical in English and Danish (pre-existing, not from this session)

- **Severity:** Low
- **Location:** `dictionaries/en.ts:60` and `dictionaries/da.ts:57`, both `regionalReference: "REGIONAL REFERENCE"`. Rendered on Villa Efe's Climate Interface widget (the only project with regional-reference data).
- **Exact problem:** The Danish dictionary carries the untranslated English label.
- **Evidence:** Direct grep of both dictionary files — identical string. Predates the Environmental Diagrams removal and this QA session entirely; flagged by the localization audit as one of only 3 real findings after removing cognate false positives.
- **Classification:** **Known pre-existing issue**, not introduced or touched by any work in this engagement.
- **Recommended fix:** Translate to the Danish equivalent (e.g. "REGIONAL REFERENCE" → "REGIONAL REFERENCE" may in fact be an intentional loan-term choice — Hanibal should confirm before assuming this needs a different Danish string).

---

## F-5 — Nine orphaned Environmental-Diagrams SVG assets remain in `public/diagrams/`, unreferenced by code but still publicly fetchable

- **Severity:** Low (informational — no code path renders them, but they are servable by URL since anything under `public/` is statically hosted)
- **Location:** `public/diagrams/01-solar-path-single.svg`, `01-solar-path-twin.svg`, `02-wind-flow-single.svg`, `02-wind-flow-twin.svg`, `03-wind-exposure-single.svg`, `03-wind-exposure-twin.svg`, `04-month-season-selector.svg`, `05-solar-metric-strip.svg`, `06-prevailing-sector-panel.svg`, `07-environmental-data-disclosure.svg`, `08-solar-architectural-reading.svg`, `09-wind-envelope-reading.svg`.
- **Exact problem:** These are the pre-authored artwork files for the deleted interactive Environmental Diagrams system. Zero `.ts`/`.tsx`/`.js`/`.mjs` files reference any of them (confirmed via repo-wide grep), yet they remain on disk and are directly reachable at e.g. `/diagrams/01-solar-path-single.svg` by anyone who knows or guesses the path — containing old English-only UI text such as "Hover," "Selected," "Default," month/season labels, etc., from the removed system.
- **Evidence:** `docs/handoff/ENVIRONMENTAL-DIAGRAM-SYSTEM-SPEC.md` (lines 10, 51, 392, 434) documents that this artwork was deliberately left on disk after the system's removal; repo-wide grep for `diagrams/01`–`diagrams/09` path references in source returns zero matches.
- **Recommended fix:** If the artwork has no future use, delete the 12 files from `public/diagrams/`. If it's being kept for potential reuse or archival, consider moving it outside `public/` (e.g. into a non-served `assets-archive/` or `docs/` location) so it isn't silently web-accessible.

---

## F-6 — Stale doc-comment in `content/projects/villa-efe.ts` describes a system that no longer exists

- **Severity:** Cosmetic (source-code documentation only, zero runtime/user-facing effect)
- **Location:** `content/projects/villa-efe.ts:140-144`.
- **Exact problem:** A comment reads: "the static B-44 solar-path PNG is replaced in the rendered grid by the digital Solar/Wind diagrams (EnvironmentalDiagrams, rendered by SiteAnalysisEditorial)" — both `EnvironmentalDiagrams` and `SiteAnalysisEditorial` were deleted in the prior engagement's system-removal pass.
- **Evidence:** Direct file read; confirmed via grep that neither `EnvironmentalDiagrams` nor `SiteAnalysisEditorial` exist anywhere else in the codebase.
- **Recommended fix:** Update or remove the comment to reflect current architecture (the static `villa-efe-environmental_result.png` asset, no digital diagram system).

---

## F-7 — Dead `"wind-diagram"` enum value in the content schema

- **Severity:** Cosmetic
- **Location:** `lib/content-schema.ts:44`, inside the asset `category` enum.
- **Exact problem:** `"wind-diagram"` (alongside `"privacy-diagram"`, `"airflow-diagram"`, `"solar-path-diagram"`) is a category value left over from the deleted diagram system. No content file assigns this category to any asset (confirmed via grep across `content/projects/`).
- **Evidence:** Direct file read of the enum; repo-wide grep for `category: "wind-diagram"` (or equivalent) returns zero matches in content files.
- **Recommended fix:** Remove the unused enum value, or leave it if the schema is intentionally kept permissive for future asset categories — a judgment call for Hanibal, not a defect requiring urgent action.

---

## Static audit — false positives explicitly ruled out (Section 7 requirement)

These matched the grep-style scan's keyword list but are **not** real issues:

| Match | File | Why it's a false positive |
|---|---|---|
| "placeholder" | Various doc/comment text | Used only in prose describing the *absence* of a placeholder/mock system (e.g. "no placeholder image is used"), never as literal placeholder content. |
| "Environmental Diagrams", "Solar Path", "Wind Exposure" (as literal strings) | `docs/handoff/*.md`, code comments | These are historical/handoff documentation and code comments correctly describing what was removed and why — intentional record-keeping, not live UI. Excluded from the live-page obsolete-term check (which scanned rendered `document.body.innerText` and found 0 matches). |
| `"wind-diagram"` category string appearing in `lib/content-schema.ts` | Schema file | Counted separately as F-7 (a real but cosmetic finding), not a false positive — listed here only to clarify it was not missed. |

## Intentional references (Section 7 requirement)

- `components/project/climate-interface.tsx` — intentionally still reads `solar.altitudeDeg` from content; this is the *separate, untouched* widget, not a remnant of the deleted Environmental Diagrams system. Its continued existence and continued read of this field is by design (see `CROSS-ARTIFACT-QA.md`).
- `content/projects/villa-red-sun.ts` — Site Analysis section intentionally still uses the pre-existing photographic overlay image (not the coded diagram used for Villa Efe) — a deliberate per-project difference, not an inconsistency.

---

## Summary by severity

| Severity | Count | IDs |
|---|---|---|
| Critical | 0 | — |
| High | 1 | F-1 |
| Medium | 2 | F-2, F-3 |
| Low | 2 | F-4 (pre-existing), F-5 |
| Cosmetic | 2 | F-6, F-7 |
| **Total** | **7** | |

**0 findings** relate to build/typecheck/lint, broken images, HTTP failures, horizontal overflow, or PDF page corruption — all of those checks passed cleanly across all 16 website page loads and all 18 PDF pages.
