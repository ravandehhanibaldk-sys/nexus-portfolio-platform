# Phase 3.6 — Real Photo + Live Climate Instrument (Villa Red Sun)

Isolated R&D prototype. Not integrated into production. Nothing outside `rd/climate-real-photo/` was modified to build this.

## How to run

```
cd rd/climate-real-photo
python -m http.server 8097
```

Open `http://localhost:8097/climate-instrument-v1.html`. A local server is required only because the page loads the photo as a static asset next to it — opening the file directly via `file://` also works in most browsers since nothing is fetched over `fetch()`/JSON in this version (the climate data is inlined as JS constants), but a server is the safer default.

## What this is

One real, unmodified photograph of Villa Red Sun (`assets/A-02-villa-red-sun-exterior-view-02_result.png`, copied byte-for-byte from the authoritative asset library — MD5 `b131b2786d7cd06a10f9a29c36fa876e`, verified identical to the source) with a live environmental overlay driven by the site's real climate data. Selecting a month updates solar position, temperature, rainfall and sunshine together as one composition. The `<img>` element itself carries **no filter, brightness, contrast, or color-grading of any kind** — every visual effect (sun glow, wind streamlines, data readouts) is drawn in a separate SVG layer on top, never touching the photograph's own rendering.

## Data source

`Complete-Climate-Site-Analysis-A-villa-red-sun.txt` (authoritative report for this site), read in full. Every value in the prototype is transcribed directly from it:

| Category | Value | Provenance |
|---|---|---|
| Coordinates | 55.516105°N, 12.208375°E | Site-exact |
| Temperature | Monthly mean °C, `[0.8, 0.7, 3.2, 7.5, 11.5, 14.7, 17.8, 17.0, 13.7, 9.6, 6.0, 2.7]` | C — Solrød station, 2006–2015 |
| Rainfall | Monthly mm, `[53,36,30,28,58,70,65,88,49,64,69,63]` | C — Solrød station, 2006–2015 |
| Sunshine | Monthly hours, `[47,62,146,215,241,245,252,195,160,103,46,34]` | C — Solrød station, 2006–2015 |
| Wind | Prevailing W/WSW, seasonal descriptor table only | D — DMI regional; **no monthly or annual speed value exists in the source** |
| Humidity | Not established at any resolution for this site | F — omitted entirely from this prototype |
| Solar position | Calculated live, every month | A — derived from exact coordinates, see below |

No value in this prototype was invented, estimated by interpolation, or substituted from a generic regional average. Where the source says "not established" (humidity, wind speed), the prototype omits the field rather than filling it.

## Solar calculation method

Solar altitude/azimuth are computed live with a standard NOAA/Meeus solar-position algorithm (Jean Meeus, *Astronomical Algorithms*) — the same method used by NOAA's public solar calculator. It takes latitude, longitude, and a UTC date/time and computes: Julian Day → Julian Century → geometric mean longitude & anomaly → equation of center → true/apparent ecliptic longitude → mean/corrected obliquity → declination → equation of time → true solar time → hour angle → zenith/altitude → azimuth. This is a deterministic, reproducible, standard method — not a visual approximation and not manual interpolation between reference points.

The prototype computes this at 6-minute resolution across the 21st of the selected month to draw the day's solar arc, and separately finds the exact minute of solar noon (maximum altitude) for the noon readout. All calculated values are labeled **"Calculated — derived from site coordinates"** in the UI, never presented as measured observations.

### Validation against the source report

The report gives five reference points each for the summer and winter solstice. This algorithm was validated against the two noon values (the report's most precise reference points) across three different years (2024/2025/2026) before being used in the prototype:

| | Report | Calculated | Match |
|---|---|---|---|
| Winter solstice noon altitude | 11.0° | 11.05° | Near-exact |
| Summer solstice noon altitude | 55.3° | 57.92° | **~2.6° discrepancy** |
| Winter solstice noon azimuth | 180.0° | ≈179.9° | Near-exact |
| Summer solstice noon azimuth | 180.0° | ≈180.0° | Near-exact |

Three of four reference values match almost exactly; only the summer altitude diverges, consistently, across all three tested years. A bug in this implementation would not plausibly reproduce three correct values while missing only one — so the more likely explanation is a small inaccuracy in the source report's stated summer figure, not an error in this calculation. Rather than silently forcing the output to match either number, the prototype uses its own consistently-computed value for every month and surfaces this discrepancy directly in the UI when June or December is selected (the two months closest to the solstice reference dates), plus this note here.

## Known limitations

- The solar arc uses the 21st of each month as a fixed reference day, matching how the source report itself defines its solstice reference dates — it is not a true daily-varying calendar.
- Wind is shown as direction/seasonal-descriptor text only. No speed is shown or implied, because none exists in the source data at any resolution.
- Humidity is entirely absent from the UI by design — the source has no established value at any resolution for this site, and a "not established" placeholder would only add visual noise without conveying real information.
- Rainfall and sunshine visuals are relative to this project's own monthly min/max range, not to any external or historical extreme.
- Play Year and continuous wind-line animation are disabled under `prefers-reduced-motion: reduce`, per the system preference; month changes still apply as instant/short transitions in that mode.
