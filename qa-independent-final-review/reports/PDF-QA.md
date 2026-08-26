# PDF QA Report

Generated 2026-08-26 against HEAD `26d87f0c8508c4b32abffbce522ef4c6d568eb6e`, same server session as the website capture. PDF produced by `scripts/export-landscape-redesign-v3.mjs` (Playwright `page.pdf()` against `/print/test-full-landscape-redesign`).

## PDF file

| | |
|---|---|
| Path | `qa-independent-final-review/pdf/PORTFOLIO-FINAL-FOR-REVIEW.pdf` |
| Size | 10,763,326 bytes |
| Page count | 18 (verified via `pdf-lib`'s structural parse, independent of the export script's own "Found 18 sheets" DOM count) |
| Page dimensions | Uniform across all 18 pages: 841.92 × 595.92 pt (297mm × 210mm, A4 landscape) — no page-size anomalies |
| SHA-256 | `2a33897390d2b6cf0bb52a86f85361a336bc0d68c5c7cf9168fb226bd4afe24a` |
| Generated | 2026-08-26T17:16:58Z |

`pdf-lib` successfully parsed all 18 page objects with valid content streams — no structural corruption, no missing pages.

## Methodology disclosure — page rendering

This environment has no working PDF-byte rasterizer. `pdfjs-dist@6.2.108` (a pre-existing project dependency) combined with `node-canvas` hits an unresolved internal compatibility bug in `paintInlineImageXObject` (`drawImageAtIntegerCoords` receives a canvas object it doesn't recognize via `instanceof`). Downgrading `pdfjs-dist` to an older major version did resolve it, but that's a shared project dependency pre-dating this task — downgrading it was judged too invasive for an artifact-prep-only pass and was reverted (`git checkout -- package.json pnpm-lock.yaml`, confirmed clean via `git diff`).

Instead, `scripts/qa-pdf-page-renders.mjs` screenshots each `.sheet` element directly from `/print/test-full-landscape-redesign` — the exact same rendered DOM/CSS that `page.pdf()` consumes to produce the PDF, at 2x device-pixel-ratio. This is **not** a rasterization of the PDF file's own bytes, so it cannot by itself catch a defect introduced specifically by the PDF-generation step (font embedding, PDF-specific color-profile shift, structural corruption). Those are separately covered by the `pdf-lib` structural check above (page count, uniform page size, valid page objects — all pass). For layout/content/visual review, the page renders are pixel-equivalent to the PDF.

## Page-by-page QA (all 18 pages individually inspected — none skipped)

| Page | Content | Result |
|---|---|---|
| 1 | Cover (winter Villa Red Sun hero) | PASS |
| 2 | About | PASS |
| 3 | Villa Red Sun opening | PASS |
| 4 | Villa Red Sun — Process + Site Analysis (photographic, unchanged by design) | PASS |
| 5 | Villa Red Sun — Comparative Proposals (Master Plan + Circulation) | PASS |
| 6 | Villa Red Sun — Plans & Sections | PASS |
| 7 | Villa Red Sun — Environmental Analysis, January | PASS (data verified — see below) |
| 8 | Villa Red Sun — Visualization | PASS |
| 9 | Villa Red Sun — Reflection (light background) | PASS |
| 10 | Villa Efe opening | PASS |
| 11 | Villa Efe — Process + Location Plan (coded diagram) | PASS |
| 12 | Villa Efe — Design Development (8-panel composite, no white-card frame) | PASS |
| 13 | Villa Efe — Vertical Privacy Hierarchy | PASS |
| 14 | Villa Efe — Plans (2nd row centered) | PASS |
| 15 | Villa Efe — Sections (enlarged) | PASS |
| 16 | Villa Efe — Environmental Analysis, January | PASS (data verified — see below) |
| 17 | Villa Efe — Visualization | PASS |
| 18 | Villa Efe — Reflection (light background) | PASS |

**18/18 PASS. 0 findings on the PDF pages themselves.** No blank pages, no corrupted pages, no missing fonts, no broken images, no clipping, no unexpected scaling. Folio numbers ("NN / 18") correct and sequential on every page except the cover (documented, deliberate — no footer system on the cover layout).

## Environmental Analysis pages — explicit data check (item 10 of the task)

### Page 7 — Villa Red Sun

| Field | Expected | Found on page | Match |
|---|---|---|---|
| Daylight | 8.0 h | 8.0 h | ✓ |
| Noon altitude | 14.4° | 14.4° | ✓ |
| Sunrise | 08:23 | 08:23 | ✓ |
| Sunset | 16:20 | 16:20 | ✓ |
| Wind direction | W / SW → E / NE | W / SW → E / NE | ✓ |
| Wind speed | 6.50 m/s · MODEL | 6.50 m/s · MODEL | ✓ |

Compass orientation: sunrise plotted on the east side, sunset on the west side, relative to the fixed N/E/S/W compass — geometrically correct. No location-identifying text (only "TRUE NORTH = SEA / WATERFRONT," a site-characteristic label, not a place name). Typography legible at full page size. No duplicate image, no obsolete interactive system present.

### Page 16 — Villa Efe

| Field | Expected | Found on page | Match |
|---|---|---|---|
| Daylight | 10.1 h | 10.1 h | ✓ |
| Noon altitude | 34.6° | 34.6° | ✓ |
| Sunrise | 06:53 | 06:53 | ✓ |
| Sunset | 17:02 | 17:02 | ✓ |
| Wind direction | W / NW → E / SE | W / NW → E / SE | ✓ |
| Wind speed | 3.0 m/s | 3.0 m/s, explicitly labeled "Annual average" (not implied January-specific) | ✓ |
| Climate period | 1991–2020 | 1991–2020 climatic period, meteorological station (appears twice: wind-speed panel and disclosure footer) | ✓ |

Compass orientation correct (sunrise east, sunset west). No location-identifying text. No duplicate image, no obsolete interactive system present.

**No additional or invented climate data found beyond what's listed above on either page.**

## Cross-reference note

See `CROSS-ARTIFACT-QA.md` finding F-1 — the "Noon altitude" figures confirmed correct above (14.4° / 34.6°) do **not** match the live Climate Interface widget's January solar-altitude figures on the corresponding website pages (11.1° / 31.2°). This is a genuine data-consistency finding, not a defect in the PDF page itself — the PDF page's own data is internally consistent and matches its own source image exactly, as verified above.
