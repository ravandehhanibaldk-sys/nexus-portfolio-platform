# Final Review Package — Manifest

Produced 2026-08-26. This round removed the interactive Environmental
Diagrams system (Month/Season Selector + 9 instrument-panel cards) from
both project pages entirely, replacing it with a single static
Environmental Analysis image per project — the same image already used
by the PDF's own Environmental Analysis pages (7 and 16), swapped to
corrected source files with fixed solar-arc geometry (sunrise/sunset
were reversed in the previous version) and no location-identifying text.
Lint, full production build, and a real-browser check (desktop and
mobile viewport) across both locales and both projects all passed clean
before this export.

## PDF

| File | Shows |
|---|---|
| `pdf-export/PORTFOLIO-FINAL-FOR-REVIEW.pdf` | The complete 18-page portfolio PDF. Pages 7 and 16 (Environmental Analysis, Villa Red Sun / Villa Efe) now use the corrected `-new_result` source images — solar arc geometry fixed, all data confirmed matching (Red Sun: 8.0h daylight, 14.4° noon altitude, 08:23/16:20 sunrise/sunset, wind W/SW→E/NE 6.50 m/s MODEL; Efe: 10.1h daylight, 34.6° noon altitude, 06:53/17:02 sunrise/sunset, wind W/NW→E/SE, 3.0 m/s explicitly labeled ANNUAL AVERAGE). No other PDF page changed — the PDF's Environmental Analysis pages were already static-image-based and had zero code dependency on the interactive website system, confirmed by direct search before this pass. |

## Website screenshots — `website-screenshots/`

Full-page (entire scrollable page, not just the visible viewport) desktop
captures at 1440px width, English and Danish, four pages each.

| File | Shows |
|---|---|
| `01-home-en.png` | Home / Selected Work index — English. |
| `01-home-da.png` | Home / Selected Work index — Danish. |
| `02-about-en.png` | About page — English. Unaffected by this round's change. |
| `02-about-da.png` | About page — Danish. Unaffected by this round's change. |
| `03-villa-red-sun-en.png` | Villa Red Sun — English. The interactive Environmental Diagrams block (Month/Season Selector, Solar Path/Metrics/Reading, Wind Flow/Exposure/Envelope Reading/Disclosure, Prevailing Sector) is gone entirely — replaced by one static "Environmental Analysis" image, same corrected source as the PDF. Climate Interface (the separate temperature/rainfall/humidity/seasonal-photo carousel) is untouched, still directly below it. |
| `03-villa-red-sun-da.png` | Villa Red Sun — Danish. Same swap; the new eyebrow label reads "MILJØANALYSE". |
| `04-villa-efe-en.png` | Villa Efe — English. Same swap as Red Sun. |
| `04-villa-efe-da.png` | Villa Efe — Danish. Same swap; "MILJØANALYSE" eyebrow. |

## Notes for whoever reviews this (including ChatGPT)

- The Environmental Analysis image (both website and PDF) is
  intentionally locale-agnostic — it carries no location-identifying
  text (verified directly against the source files before adoption: no
  city, country, region, coordinates, named sea, or meteorological-
  station name — compass letters and the generic term "meteorological
  station" are present and expected). The same file renders on both
  `/en` and `/da`; only the surrounding eyebrow label and image `alt`
  text are localized.
- Villa Red Sun's Site Analysis (PDF page 4) remains the photographic-
  overlay version, unchanged and untouched this round, per standing
  instruction — see `docs/handoff/GENERATED-IMAGE-DISCREPANCIES.md`.
- `components/project/environmental-diagrams.tsx`, `solar-diagram.tsx`,
  `wind-diagram.tsx`, `environmental-massing.tsx`, and `lib/solar.ts` /
  `lib/wind.ts` / `lib/environmental-reading.ts` have been deleted —
  confirmed via search to have no other importers before removal. The
  underlying `public/diagrams/01-09*.svg` reference artwork these files
  wired remains in place, unused, in case it's wanted again later.
- Nothing in this folder has been pushed anywhere or shared externally —
  it's a local packaging pass, ready for Hanibal to hand off however he
  chooses.
