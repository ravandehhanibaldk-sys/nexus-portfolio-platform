# Website QA Report

Generated 2026-08-26 against HEAD `26d87f0c8508c4b32abffbce522ef4c6d568eb6e`, server on port 3001 (`nexus-portfolio-dev`), fresh production build (`rm -rf .next && pnpm build`).

Methodology: `scripts/qa-website-capture.mjs` drove a real Playwright/Chromium session through all 8 routes at both viewport widths (16 total page loads), recording HTTP status, console messages, page errors, failed network requests, broken-image detection (`img.complete && naturalWidth === 0`), horizontal-overflow detection (`scrollWidth > clientWidth`), and full visible text — before taking the full-page screenshot. Raw data: `reports/_website-capture-raw.json`.

## Route matrix (desktop, 1440px)

| Route | HTTP | Title | Console | Page errors | Failed requests | Broken images | H-overflow |
|---|---|---|---|---|---|---|---|
| `/en` | 200 | Hanibal Ravandeh — Architectural Portfolio | 0 | 0 | 3 (see note 1) | 0 | No |
| `/da` | 200 | Hanibal Ravandeh — Architectural Portfolio | 0 | 0 | 3 (note 1) | 0 | No |
| `/en/about` | 200 | About — Hanibal Ravandeh | 0 | 0 | 0 | 0 | No |
| `/da/about` | 200 | Om — Hanibal Ravandeh | 0 | 0 | 0 | 0 | No |
| `/en/projects/villa-red-sun` | 200 | Villa Red Sun — Hanibal Ravandeh | 1 (note 2) | 0 | 1 (note 1) | 0 | No |
| `/da/projects/villa-red-sun` | 200 | Villa Red Sun — Hanibal Ravandeh | 1 (note 2) | 0 | 1 (note 1) | 0 | No |
| `/en/projects/villa-efe` | 200 | Villa Efe — Hanibal Ravandeh | 1 (note 3) | 0 | 1 (note 1) | 0 | No |
| `/da/projects/villa-efe` | 200 | Villa Efe — Hanibal Ravandeh | 1 (note 3) | 0 | 1 (note 1) | 0 | No |

## Route matrix (mobile, 375px)

| Route | HTTP | Console | Page errors | Failed requests | Broken images | H-overflow |
|---|---|---|---|---|---|---|
| `/en` | 200 | 0 | 0 | 3 (note 1) | 0 | No |
| `/da` | 200 | 0 | 0 | 4 (note 1) | 0 | No |
| `/en/about` | 200 | 0 | 0 | 0 | 0 | No |
| `/da/about` | 200 | 0 | 0 | 0 | 0 | No |
| `/en/projects/villa-red-sun` | 200 | 0 | 0 | 1 (note 1) | 0 | No |
| `/da/projects/villa-red-sun` | 200 | 0 | 0 | 1 (note 1) | 0 | No |
| `/en/projects/villa-efe` | 200 | 0 | 0 | 1 (note 1) | 0 | No |
| `/da/projects/villa-efe` | 200 | 0 | 0 | 1 (note 1) | 0 | No |

**All 16 page loads: HTTP 200, 0 page errors, 0 broken images, 0 horizontal overflow.**

## Notes on non-zero counts (investigated, not treated as pass/fail without verification)

1. **Hero video `net::ERR_ABORTED` failed-request entries.** Every route with an autoplaying hero `<video>` shows 1-4 of these. Directly verified in a live browser: both hero videos report `readyState: 4` (HAVE_ENOUGH_DATA), `paused: false`, valid `duration` (10.008s) and `videoWidth/videoHeight` (1920x1080), `error: null` — i.e. genuinely loaded and playing. The aborted requests are Chromium's own media pipeline cancelling/reissuing partial byte-range requests during adaptive buffering, a well-known benign artifact of `<video autoPlay>` — not a real playback failure. **False positive, confirmed by direct verification, not just assumed.**
2. **Villa Red Sun desktop-only console warning** (both locales): a Next.js `Image` LCP performance advisory ("add `loading=\"eager\"`... " for an interior photo) — a dev-mode performance hint, not an error, not user-visible.
3. **Villa Efe desktop-only console warning** (both locales): a Next.js `Image` `sizes` prop performance advisory for the design-evolution composite — same category, not an error.

## Visual QA — Environmental Analysis special check (both projects, live-browser, both locales)

- Obsolete-system text search (`Solar Path Diagram`, `Wind Exposure`, `Month / Season Selector`, `Environmental Diagrams`, `Wind Envelope Reading`, `Prevailing Sector`, `Environmental Data Disclosure`) against full rendered `document.body.innerText`: **0 matches on any of the 4 project-page loads.**
- Exactly 1 `<img src*="environmental">` per project page (both locales): confirmed via DOM query.
- Image `alt` text present and descriptive on both: "Environmental analysis — solar path, daylight metrics, and prevailing wind, January."
- No location-identifying text found anywhere in the rendered page originating from this image (the image itself was inspected pixel-by-pixel before adoption — see the source-image verification in the task's own record; the alt text is also free of location terms).
- **See FINDING F-1 in FINAL-ISSUES.md** — a genuine numeric inconsistency was found between this static image and the adjacent Climate Interface widget (not a leftover-obsolete-system issue, a data-consistency issue).

## Climate Interface (`components/project/climate-interface.tsx`)

Confirmed rendering correctly on both projects, both locales: seasonal hero photo, solar altitude, prevailing wind, temperature, rainfall (+ humidity/regional-reference on Villa Efe, which has that data), and the month-scrubber (JAN-DEC, both directions, autoplay control). Not modified in the Environmental Diagrams removal — file has zero diff against the pre-removal commit.

## Localization QA

See `_localization-audit-raw.json` and the summary in `FINAL-ISSUES.md` (findings F-2, F-3, F-4). Full-page text-node diff, EN vs DA, all 4 pages, after two rounds of allowlist refinement to eliminate genuine Danish/English cognate false positives (documented in the script's own comments: "for"/"have"/"diagram"/"plan" are valid standalone Danish words, not leaks). Final result: **3 real findings, isolated to Villa Efe's coded Site/Location SVG diagram's `<title>`/`<desc>` accessible-name text, plus one pre-existing dictionary key** (`climate.regionalReference`) that has never been translated, unrelated to any work in this session.

## Static audit (source code)

Grepped `content/`, `components/`, `lib/`, `app/`, `dictionaries/` for `TODO`, `FIXME`, `XXX`, `PLACEHOLDER`, `lorem ipsum`, `DEBUG` (case-insensitive) and `LEGEND`, `HOVER`, `SELECTED`, `DEFAULT` (word-boundary, case-sensitive matching the old system's literal SVG text). See `FINAL-ISSUES.md` for the full breakdown of real findings vs. false positives (doc-comment mentions of "placeholder" describing its *absence*, not its presence).

## Accessibility (informal pass, not a full audit)

- `html[lang]` attribute correctly set per route (`en`/`da`) — confirmed via `document.documentElement.lang` in the capture script's raw data.
- Alt text present on the new Environmental Analysis images (see above).
- Villa Efe's Location Plan SVG diagram's own accessible name (`<title>`/`<desc>`) is English-only regardless of locale — see finding F-2.
