# Website ↔ PDF Consistency Audit

Comparing the same HEAD's website screenshots against the same HEAD's PDF pages.

## Consistent (verified matching)

| Item | Website | PDF | Match |
|---|---|---|---|
| Project names | Villa Red Sun, Villa Efe | Villa Red Sun, Villa Efe | ✓ |
| Project order | Red Sun first, Efe second (Home page card order; PDF page order) | Same | ✓ |
| Typology headings | "Residential — Villa Renovation" / "Residential — Coastal Villa, New Construction" | Same | ✓ |
| Environmental Analysis image (both projects) | Identical file, same `src` asset used by both `<img>` (website) and `<EnvironmentalSheet imageSrc>` (PDF) | Same source file | ✓ (this is INTENTIONAL — the task explicitly designed the static image to be shared between both artifacts) |
| Environmental Analysis data shown *on the image itself* | 8.0h/14.4°/08:23/16:20/W-SW→E-NE/6.50 m/s MODEL (Red Sun); 10.1h/34.6°/06:53/17:02/W-NW→E-SE/3.0 m/s annual avg (Efe) | Identical (same image) | ✓ |
| Wind data elsewhere on the page (Climate Interface widget) | Red Sun: W/SW→E/NE, 6.50 M/S. Efe: W/NW→E/SE, 3.0 M/S | N/A (PDF has no Climate Interface equivalent) | ✓ consistent with the Environmental Analysis image's own wind figures |
| Terminology | "Environmental Analysis" eyebrow used identically in both (website: new dict key `sections.environmentalAnalysis`; PDF: `EnvironmentalSheet`'s own static heading) | Same wording | ✓ |
| Reflection text | Full reflection prose, both projects | Same prose, reflowed to 2-column PDF layout | ✓ (INTENTIONAL DIFFERENCE — layout only, content identical) |
| Villa Efe Location Plan diagram | Coded SVG diagram present on website Site section | Same coded diagram present on PDF page 11 | ✓ |
| Villa Red Sun Site Analysis | Photographic overlay (untouched, per standing instruction) | Same photographic overlay on PDF page 4 | ✓ INTENTIONAL — both artifacts deliberately left unchanged |

## Intentional differences (format/layout only, not findings)

- **Reflection text column layout**: single-column flow on the website vs. 2-column layout in the PDF. Content identical, only presentation differs — a print-layout necessity for the A4-landscape page. **INTENTIONAL DIFFERENCE.**
- **Plans & Sections presentation**: the website shows a scrollable image grid per beat section; the PDF splits this across 2 dedicated pages (Plans, Sections) for print pagination. **INTENTIONAL DIFFERENCE**, content is the same underlying asset set.
- **Folio numbers**: present in the PDF (footer "NN / 18"), absent on the website (no equivalent website UI element for this). **INTENTIONAL DIFFERENCE** — a print-specific convention.
- **Climate Interface widget**: present on the website (month-scrubbable temperature/rainfall/humidity/wind/solar carousel), absent from the PDF (the PDF's Environmental Analysis page is the static-image equivalent, a deliberate architectural split documented since ADR/spec history earlier in this project — the PDF was always meant to use one finished static graphic per project, not the interactive widget). **INTENTIONAL DIFFERENCE**, by design, not a bug.

## FINDING — real, unexplained discrepancy

### F-1 — Solar-altitude figures disagree between the static Environmental Analysis image and the live Climate Interface widget, both projects, same page

**Not an intentional difference** — both components claim to represent the same real-world quantity (project's solar altitude in January) on the *same page*, and give different numbers:

| Project | Static Environmental Analysis image ("Noon altitude") | Climate Interface widget, January ("Solar altitude") | Delta |
|---|---|---|---|
| Villa Red Sun | 14.4° | 11.1° (`content/projects/villa-red-sun.ts` line 90, `solar.altitudeDeg`) | +3.3° |
| Villa Efe | 34.6° | 31.2° (`content/projects/villa-efe.ts` line 96, `solar.altitudeDeg`) | +3.4° |

Both artifacts (website and PDF) show the SAME "Noon altitude" figure from the static image (since it's literally the same file) — so this is not strictly a website-vs-PDF discrepancy in the traditional sense. It's a **within-website, cross-component inconsistency** that happens to also appear identically in the PDF (since the PDF only has the static-image side of the comparison, not the Climate Interface side).

The two ~3.3-3.4° deltas are remarkably consistent in magnitude across both unrelated projects, which suggests a **systematic** difference (e.g. a different reference day within January, a different astronomical formula, or an intentional refinement made when the corrected images were produced) rather than two independent data-entry errors — but this is an observation, not a conclusion; determining which figure (or whether both) is correct requires Hanibal's input and is explicitly out of scope for this audit to resolve.

**Severity: HIGH** — directly visible to an attentive reviewer scanning the same page, two different numbers for "January solar altitude" a few hundred pixels apart.

## No other unexplained discrepancies found

Numerical data (temperature, rainfall, humidity, wind speed/direction), project descriptions, headings, and visual assets were cross-checked between the two artifacts for the sections both artifacts share (Environmental Analysis, project openings, Reflection) and no other mismatch was found.
