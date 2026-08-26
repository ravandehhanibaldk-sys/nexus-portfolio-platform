# Environmental Diagram System — Reference Spec (SUPERSEDED)

**Status update, 2026-08-26:** the live system this document describes —
`components/project/environmental-diagrams.tsx`, `solar-diagram.tsx`,
`wind-diagram.tsx`, `environmental-massing.tsx`, and their `lib/solar.ts`
/ `lib/wind.ts` / `lib/environmental-reading.ts` calculation helpers —
has been **removed from the codebase**. Per Hanibal's repeated request,
both project pages now show a single static Environmental Analysis image
instead of the interactive Month/Season Selector + 9-card instrument
panel this spec describes. `public/diagrams/01-09*.svg` remain on disk,
unused, in case this approach is revived. `public/diagrams/
10-site-location-efe.svg` and `components/project/site-diagram.tsx`
(Villa Efe's Location Plan) are unaffected and still live — they reuse
the same wiring pattern (`lib/svg-wiring.ts`) this spec documents.

Kept below **as historical reference only** — for the wiring pattern,
compass-rotation math, and inline-SVG technique, in case a similar coded
diagram is ever built again (as `site-diagram.tsx` already was once,
using this same approach). It no longer describes anything live on the
website.

---

Written 2026-08-25 (Priority 3, item 15 of the external-review pass) as the
reference Hanibal asked for: a complete, precise account of how the Solar
and Wind "instrument panel" diagrams are built — components, data flow,
styling — so `public/diagrams/*.svg` can eventually be replaced by a fully
coded version the same way `public/diagrams/10-site-location-efe.svg` (the
new Villa Efe Site/Location diagram, item 9) already was.

This document describes the system **as it exists today**. It is not a
proposal for a rewrite — it's the map you'd need to attempt one.

---

## 1. What this system is (and isn't)

"Environmental Diagrams" is the block of 9 instrument-panel cards rendered
under `Site` on each project page — Solar Path, Solar Metrics, Solar
Reading, Wind Flow, Wind Exposure, Wind Envelope Reading, Prevailing
Sector, and Environmental Data Disclosure, plus the Month/Season selector
strip above them. It sits next to (but is architecturally independent
from) the **Climate Interface** (`components/project/climate-interface.tsx`)
— the separate temperature/rainfall/humidity/seasonal-photo carousel. Both
read the same `project.climateInstrument` data object and the same month
index conceptually, but they are two unrelated component trees with no
shared state — this spec covers only the Solar/Wind instrument panels.

The system is **not** a from-scratch rendering engine. It is a real-data
wiring layer on top of nine pre-built, hand-authored SVG illustrations
(`public/diagrams/01–09*.svg`, plus the month selector `04`). At runtime,
React fetches each SVG's raw markup, injects it into the DOM, and then
mutates specific documented elements inside it (by `id`, or by the
`.heading` class for titles) with real per-project, per-month values. The
SVG's line art, layout, and illustration style are never touched — only
text content, a handful of `transform`/`d`/`display` attributes, and
show/hide toggles.

This split matters for any future "replace with coded version" work: the
**data layer** (`lib/solar.ts`, `lib/wind.ts`, `lib/environmental-reading.ts`)
is fully real, fully reusable, and has nothing to do with SVG files — it
could drive a hand-coded diagram (React-rendered `<svg>`, Canvas, whatever)
exactly as-is. The **wiring layer** (`lib/svg-wiring.ts` and the
`useEffect` blocks in the two diagram component files) is the part that is
specific to "mutate someone else's pre-drawn SVG" and is the part a coded
replacement would delete entirely, replacing it with normal JSX/SVG
rendering driven directly by the same data-layer functions.

---

## 2. Data flow, end to end

```
content/projects/{villa-red-sun,villa-efe}.ts
  └─ climateInstrument: ClimateInstrument   (Zod-validated, lib/content-schema.ts)
       ├─ coordinates (lat/lon/UTC offsets)  — internal only, never rendered
       ├─ accentColor, eyebrow, title, locationLabel, images{}
       └─ months[12]: { month, season, temperature, rainfall, wind, humidity?, solar }
              │
              ▼
components/{red-sun,efe}/site-analysis-editorial.tsx
  <EnvironmentalDiagrams data={project.climateInstrument} locale dict />
              │
              ▼
components/project/environmental-diagrams.tsx   (parent: month-selector state)
  selected: number (0–11)  ──────────────┐
              │                           │
      ┌───────┴────────┐                  │
      ▼                ▼                  │
lib/solar.ts      lib/wind.ts             │
getSolarGeometry()  parseWindLabel()      │
      │                │                  │
      ▼                ▼                  │
components/project/solar-diagram.tsx  components/project/wind-diagram.tsx
  SolarPath / SolarMetrics / SolarReading   WindFlow / WindExposure /
                                             PrevailingSector /
                                             EnvironmentalDisclosure /
                                             WindEnvelopeReading
      │                                      │
      ▼                                      ▼
lib/svg-wiring.ts  (useInlineSvgLoader, wireText, wireTransform, wireHidden,
                     wireWrappedText, wireHeading, fillMassingPlaceholder)
      │
      ▼
public/diagrams/{01..09}*.svg  →  fetched, injected into a ref'd <div>,
                                    then mutated in place via useEffect
```

Every solar number on screen is computed live, client-side, from real
astronomy — `getSolarGeometry()` is called on every month change, not
precomputed. Every wind value on screen is either a literal field from
`content/projects/*.ts` (`directionLabel`, `speedLabel`) or a
dictionary-resolved phrase keyed off that data (`speedQualifier` → the
correct localized provenance sentence). Nothing in either diagram
fabricates a number that isn't traceable to `climateInstrument.months[i]`
or a pure deterministic function of `coordinates`.

---

## 3. The data layer (project-agnostic, no SVG knowledge)

### `lib/solar.ts` — `getSolarGeometry(lat, lon, monthIndex, utcOffsetStandard, utcOffsetDST)`

Deterministic solar-position math, ported verbatim from the two approved
Climate Atlas HTML prototypes (`project_climate_atlas_v2.html` for Villa
Red Sun, `project_climate_atlas_project_B.html` for Villa Efe) — same
declination / equation-of-time / hour-angle formulas, validated against
those prototypes' own baked-in noon-altitude precedent values (Red Sun
~57.9°/~11.1° at the solstices, Efe 78.1°/31.2°). Computes, for the 21st
of the given month (representative-day convention, matching the
prototypes):

- `noonAltitudeDeg` — solar altitude at solar noon
- `daylightHours`, `sunriseMinutes`, `sunsetMinutes`
- `path: SolarPathPoint[]` — altitude/azimuth samples every 15 minutes
  across the whole day, filtered to daylight only (`altitude > -0.015 rad`)

DST is approximated as calendar months March–October, matching the source
prototypes (not a real EU last-Sunday-of-month rule — documented as an
approximation, not a bug).

`formatClock(minutes)` — minutes-since-midnight → `"HH:MM"`, used for
sunrise/sunset display.

### `lib/wind.ts` — `parseWindLabel(directionLabel)`

Parses the already-approved, pre-formatted `directionLabel` string (e.g.
`"W / SW → E / NE"`, `"VARIABLE → E"`, `"W / NW"`) into a primary/secondary
compass-degree structure for the diagrams' rotation math. This is a
**display-emphasis parser**, not a measurement — neither project has
verified monthly directional-frequency data, so nothing here invents a
percentage or a frequency; it only decides which compass sector(s) the
label names as primary vs. secondary.

### `lib/environmental-reading.ts` — `insightTextForMonth(dict, season, noonAltitudeDeg)`

The one piece of interpretive text in the whole system. Three fixed real
sentences (`dict.solar.insightHigh` / `insightLow` / `insightTransition`),
selected purely by a noon-altitude threshold (`≥55°` high, `≤20°` low,
between = the season-transition sentence with `{season}` interpolated).
This deliberately replaces the source asset package's own fabricated
"Moderate/High/Low/Optimal" classification labels, which had no defined
thresholds or data behind them.

None of these three modules import React, SVG types, or anything from
`lib/svg-wiring.ts` — they are pure calculation/lookup functions, callable
from any future rendering approach unchanged.

---

## 4. The wiring layer (`lib/svg-wiring.ts`)

Six small exported helpers, all operating on a scoped container
(`container.querySelector`, **never** `document.getElementById` — several
delivered SVGs reuse the same internal ids like `building-mass` across
files and across twin/single variants, and multiple instances render on
one page at once, so a page-global lookup would collide):

| Helper | Does |
|---|---|
| `useInlineSvgLoader(ref, url)` | `fetch(url)` → `.text()` → `container.innerHTML = markup`. Returns a `loaded` boolean the caller effects gate on. One network fetch per mounted instance (not cached/deduped across instances — see §7). |
| `wireText(container, id, value)` | `el.textContent = value` on `#id`. |
| `wireHeading(container, value)` | Targets `text.heading` by **class**, not id — none of the delivered SVGs put an id on their title text (they were authored as a fixed English reference layer). Documented as reliably the first `.heading`-class element in document order in every delivered file. |
| `wireHidden(container, id, hidden)` | `el.style.display = hidden ? "none" : ""` — used whenever real data doesn't support a slot (e.g. the three classification chip groups on 08/09, always hidden — no supported classification data exists for either project). |
| `wireAttr` / `wireTransform` | Generic attribute set / `transform` attribute set — used for the compass-bearing rotations (§6) and the interpolated `d` path on Solar Path. |
| `wireWrappedText(container, id, text, maxChars, lineHeight)` | Manually word-wraps into `<tspan>` lines. Needed because the delivered `<text>` slots are single-line/non-wrapping and the real, data-derived sentences (interpretive paragraph, honesty note) are long enough to overflow and clip at the card edge if set via plain `textContent`. |
| `fillMassingPlaceholder(sourceContainer, targetContainer, targetGroupId, anchorX, anchorY, scale)` | The one non-mechanical helper — see §5. |

**Rule that governs every helper above:** wire, never redraw. No helper
ever adds new geometry, changes a `d` path's shape (only Solar Path's own
interpolated line, which the SVG's slot exists specifically to receive),
or invents visual content beyond what the delivered artwork already
defines a slot for.

### The one exception: `fillMassingPlaceholder`

`08-solar-architectural-reading.svg` and `09-wind-envelope-reading.svg`
both shipped with a literal, unexpanded template placeholder — the raw
text string `{massing("building-mass", "twin", x=…, y=…)}` — sitting where
their own building-massing illustration should be (confirmed by direct DOM
inspection, not a CSS/viewBox issue). This isn't fixable by simple
attribute wiring, because the content doesn't exist yet to bind to.

The fix: both `solar-diagram.tsx`'s `SolarReading` and `wind-diagram.tsx`'s
`WindEnvelopeReading` load a **second, headless, off-screen copy** of the
sibling SVG that does have a real `#building-mass` group (01 for Solar
Reading, 02 for Wind Envelope Reading — same "reusable twin-volume massing
group" the package's own README describes as shared across 01/02/03),
clone that group verbatim, and append the clone into the target's broken
placeholder group at a fixed anchor point/scale. The source container is
rendered `position:absolute; left:-9999px` rather than `display:none`,
because `fillMassingPlaceholder` calls `getBBox()` on the source element,
which returns a zero-size (or throwing) box on a `display:none` subtree in
most browsers.

This is the only place in the system that moves artwork between files —
everything else only mutates a slot within the file it belongs to.

---

## 5. Component layer

### `components/project/solar-diagram.tsx` — 3 exported components

All three independently call `getSolarGeometry()` for the current month
(cheap, pure, no memoization needed) rather than receiving it as a prop —
a deliberate choice from the structural-layout-fix pass so each card can
render standalone in either grid column without prop-drilling from a
shared parent.

- **`SolarPath`** — loads `01-solar-path-{twin|single}.svg` (twin variant
  selected by checking whether `data.title` contains `"RED SUN"" — Villa
  Red Sun's two-volume massing needs the twin artwork, Villa Efe uses
  single). Computes the day's altitude/azimuth samples, maps them into the
  artwork's own fixed coordinate space (`ARC_X0=120` to `ARC_X1=1080` for
  time-of-day, `altitudeToY()` mapping 0–90° onto `y=515` (horizon) to
  `y=100` (zenith)), and sets `#path-selected`'s `d` attribute to that
  polyline. Also positions `#noon-marker`'s circles at the path's real
  highest-altitude sample, and computes an "indicative shadow" `d` for
  `#building-shadow` using `cot(noonAltitude)` for length (schematic
  north-facing direction only — both projects are Northern Hemisphere, sun
  broadly south at solar noon — never presented as a measured facade
  shadow). Everything else in the file (solstice reference arcs, north
  indicator, azimuth ticks, cardinal labels, legend, the reference dome,
  the building mass itself) is left exactly as delivered.
- **`SolarMetrics`** — loads `05-solar-metric-strip.svg`, wires 4 plain
  text values: `daylight-value`, `noon-altitude-value`, `sunrise-value`,
  `sunset-value`.
- **`SolarReading`** — loads `08-solar-architectural-reading.svg` (plus a
  headless copy of `01-solar-path-{variant}.svg` for the massing clone),
  wires the interpretive paragraph via `insightTextForMonth()` +
  `wireWrappedText`, hides all 3 classification chips, and runs
  `fillMassingPlaceholder` once both SVGs have loaded.

### `components/project/wind-diagram.tsx` — 5 exported components + `useWindDerived`

A shared internal hook, `useWindDerived(data, selectedIndex, dict)`,
computes the values every Wind component needs once: `parseWindLabel()`
output, primary/secondary text (with `dict.wind.variable` substituted for
a `VARIABLE` month), and — per item 20 — the wind-speed provenance
qualifier. `month.wind.speedQualifier` (`"model"` | `"annual-average"` |
undefined) resolves through the dictionary at render time into
`speedQualifierText` (short chip form, e.g. `"MODEL"`), `speedLabelWithQualifier`
(e.g. `"6.50 M/S · MODEL"`), and `speedProvenanceText` (a full phrase, e.g.
`"Modeled wind speed"`) — deliberately three different resolved forms for
three different UI slots that each needed a different level of verbosity,
all sourced from the same one `speedQualifier` field rather than three
separate content fields.

- **`WindFlow`** — loads `02-wind-flow-{variant}.svg`. Only toggles
  `#wind-streamlines-primary`/`-secondary` opacity (full / 0.35 / 0.15)
  depending on whether the month has a primary and/or secondary component
  — never redraws the flow-line paths. No rotation is applied here: both
  projects' real primary direction is already broadly westerly, matching
  the artwork's own baked-in left-to-right flow, so the "rotate if needed"
  rule (§6) was applied as "no change needed," not skipped.
- **`WindExposure`** — loads `03-wind-exposure-{variant}.svg`. Rotates
  `#primary-direction`/`#secondary-direction` groups to the real compass
  bearing (§6), hides `#secondary-direction` entirely if the month has no
  secondary component.
- **`PrevailingSector`** — loads `06-prevailing-sector-panel.svg`. Wires 6
  text values (primary/secondary direction, season, frequency status —
  always `dict.wind.frequencyNotEstablished`, wind speed + qualifier chip)
  and rotates `#primary-sector`/`#secondary-sector` wedges (§6).
- **`EnvironmentalDisclosure`** — loads
  `07-environmental-data-disclosure.svg`. Wires 4 short disclosure values
  plus the long `disclosure-limitation-note` honesty sentence via
  `wireWrappedText` (a plain `textContent` set clipped it — confirmed by
  measuring a 6px-tall bounding box for ~200 characters of un-wrapped
  text).
- **`WindEnvelopeReading`** — loads `09-wind-envelope-reading.svg` (plus a
  headless copy of `02-wind-flow-{variant}.svg` for the massing clone).
  Wires the envelope paragraph (`"Reported speed: {speedLabelWithQualifier}."`),
  hides all 3 chips and the `exposed-face-overlay` (no verified
  facade-specific exposure claim exists for either project — deliberately
  never the source package's own fabricated "SW and W façades receive the
  greatest exposure" claim), and runs `fillMassingPlaceholder`.

### `components/project/environmental-diagrams.tsx` — the orchestrator

Owns the one piece of shared state, `selected: number` (0–11, the active
month), and renders:

1. The month/season selector strip — loads `04-month-season-selector.svg`,
   wires a full roving-tabindex ARIA tablist onto the delivered
   `#month-{jan..dec}` groups (click, ArrowLeft/Right, Home, End, Enter/
   Space), toggles each month's `#month-{id}-selected` ring opacity and
   `#month-{id}-node` fill color on selection change, and crops the live
   injected SVG's `viewBox` from its authored size down to `0 0 1200 285`
   to exclude a dev-reference "month-state-guide" legend that ships in the
   file but was never meant for production (this is a runtime viewBox
   override on the injected DOM node — the source file itself is
   untouched, per the "never edit `public/diagrams/*.svg` directly" rule).
2. Two independent flex columns (`environmental-diagrams.module.css`) —
   Solar's 3 cards on the left, Wind's 5 cards on the right, each column
   sized only to its own content (no shared grid row, which is what
   caused the earlier "Solar column has a dead gap" bug — see the file's
   own inline comments for the full history). Mobile stacks both columns
   in the same document order (all Solar, then all Wind).

Card order — left: Solar Path → Solar Metrics → Solar Reading →
Environmental Disclosure. Right: Wind Flow → Wind Exposure → Wind Envelope
Reading → Prevailing Sector. (Environmental Disclosure lives in the Solar
column for column-height balance, not because it's solar-specific — it's
a closing/caveats card, chosen for the move because it doesn't carry its
own analytical illustration the way Prevailing Sector's compass does.)

---

## 6. The compass-rotation system

Three pairs of elements need to point at a real compass bearing without
their drawn shape changing: `03`'s primary/secondary direction arrows and
`06`'s primary/secondary sector wedges. Since none of the delivered
artwork exposes a "this shape currently points at N°" attribute, the
baseline bearing each shape was originally drawn at had to be derived from
its own path/wedge coordinates directly (not estimated):

- **Exposure arrows (03)** — tail→head vector of each path's own `d`
  attribute (identical coordinates in both twin/single variants):
  primary `M100 350 C250 350 330 380 455 420` → baseline ≈101.1°,
  secondary `M980 235 C870 260 805 300 735 345` → baseline ≈245.8°.
- **Sector wedges (06)** — midpoint bearing between each wedge's two edge
  vectors from its apex: primary edges `(60,-145)`/`(130,-85)` → baseline
  ≈39.6°, secondary edges `(145,-20)`/`(150,25)` → baseline ≈90.8°.

At render time, `wireTransform(container, id, "rotate(${realBearing - baseline} ${pivotX} ${pivotY})")`
rotates the group by exactly the delta needed to point at the real
`COMPASS_BEARING[token]` value (16-point compass, `N=0° … NNW=337.5°`),
around a fixed pivot (the arrow's own head / the wedge's own apex) — the
shape itself, and everything else in the file, is untouched.

**Documented semantic judgment call** (disclosed rather than silently
assumed): the delivered arrows/wedges don't document whether their
tail→head vector means "wind blowing FROM" or "wind blowing TOWARD" the
labeled compass point. The wiring treats the compass token as the bearing
the shape should point **TOWARD** — the simpler, more directly defensible
of the two readings, applied consistently to both direction groups and
both projects.

---

## 7. Styling conventions

- Every diagram container div is wrapped `[&_svg]:w-full [&_svg]:h-auto`
  (Tailwind arbitrary-variant targeting the injected `<svg>` child directly
  — the SVG itself has no Tailwind classes, it's raw injected markup), most
  also `[&_svg]:max-w-[92%] [&_svg]:mx-auto` for a small inset margin
  inside the card.
- Cards are plain `border border-divider bg-paper` wrappers
  (`environmental-diagrams.tsx`'s `CARD` constant) — no diagram-specific
  card styling; the same token-driven card look used elsewhere on the
  platform.
- All illustration color/line-weight/typography is baked into the SVG
  files themselves at authoring time — nothing in the component layer sets
  fill/stroke/font on the injected artwork except the 2 documented runtime
  color swaps (`#month-{id}-node` fill toggling between `#4f89c7`
  selected / `#b9bdc0` unselected) and the opacity toggles in `WindFlow`.
  A coded replacement would need to either bake the same palette into new
  JSX/CSS, or read it from the SVGs' own `<style>`/attribute values before
  they're retired.
- `wireHeading` targets a CSS class (`.heading`), not an id, specifically
  because the delivered files don't carry one — documented in
  `svg-wiring.ts`'s own comment as a deliberate exception to "target by
  id," made instead of editing the source SVGs (which CLAUDE.md's rule 3
  forbids).

---

## 8. What a coded replacement would need to reproduce

If `public/diagrams/01–09*.svg` are ever fully replaced by a coded
diagram system (the way `10-site-location-efe.svg` replaced a photographic
Site/Location image), the new system needs to independently reproduce, per
diagram:

| Diagram | Real data it must render | Non-data elements it must still draw |
|---|---|---|
| 01 Solar Path | `getSolarGeometry().path` (altitude/azimuth polyline), noon marker, indicative shadow | Solstice reference arcs, north indicator, azimuth ticks, cardinal labels, legend, reference dome, building massing |
| 05 Solar Metrics | daylight hours, noon altitude, sunrise/sunset | — (pure value strip) |
| 08 Solar Reading | `insightTextForMonth()` paragraph | Building massing illustration (currently borrowed from 01) |
| 02 Wind Flow | primary/secondary emphasis (opacity only) | Flow-line artwork itself, qualitative not data-driven |
| 03 Wind Exposure | primary/secondary compass bearing (rotation) | Arrow shapes, compass ring |
| 06 Prevailing Sector | primary/secondary direction, season, wind speed + qualifier, sector wedge bearings | Wedge shapes, compass ring, panel chrome |
| 07 Environmental Disclosure | 4 short disclosure strings + honesty note | Panel chrome only |
| 09 Wind Envelope Reading | reported-speed paragraph | Building massing (borrowed from 02), exposed-face overlay (currently always hidden) |
| 04 Month Selector | selected-month state, season boundaries | Track/node artwork, season markers |

The data-layer functions in §3 need no changes to serve a coded
replacement — only the wiring layer (§4) and the component-layer render
bodies (§5) would be rewritten, from "mutate injected SVG DOM" to "render
real JSX/SVG driven by the same function calls." The compass-rotation math
in §6 (baseline derivation, `COMPASS_BEARING` lookup) is directly reusable
as-is, since it already operates purely in bearing-degree space independent
of any particular SVG file's coordinates.

---

## 9. File index

| File | Role |
|---|---|
| `lib/content-schema.ts` | `climateInstrumentSchema` / `climateMonthSchema` — the Zod source of truth for all real data this system consumes |
| `lib/solar.ts` | Solar position math |
| `lib/wind.ts` | Wind-label parsing |
| `lib/environmental-reading.ts` | Solar interpretive-text selection |
| `lib/svg-wiring.ts` | Generic inject-and-mutate helpers |
| `components/project/solar-diagram.tsx` | `SolarPath`, `SolarMetrics`, `SolarReading` |
| `components/project/wind-diagram.tsx` | `WindFlow`, `WindExposure`, `PrevailingSector`, `EnvironmentalDisclosure`, `WindEnvelopeReading`, `useWindDerived` |
| `components/project/environmental-diagrams.tsx` | Month-selector state, layout, card assembly |
| `components/project/environmental-diagrams.module.css` | Two-column layout rules |
| `components/{red-sun,efe}/site-analysis-editorial.tsx` | Mount point — renders `<EnvironmentalDiagrams>` inside the Site beat |
| `dictionaries/{en,da}.ts` | `climate.*`, `solar.*`, `wind.*` namespaces — every user-facing string in this system, both locales |
| `public/diagrams/01–09*.svg`, `04-month-season-selector.svg` | The pre-authored artwork this system wires values into |
