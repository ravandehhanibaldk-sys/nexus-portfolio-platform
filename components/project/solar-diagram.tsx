"use client";

import { useEffect, useRef } from "react";
import { getSolarGeometry, formatClock } from "@/lib/solar";
import { insightTextForMonth } from "@/lib/environmental-reading";
import { useInlineSvgLoader, wireText, wireHidden, wireWrappedText, wireHeading, wireNth, fillMassingPlaceholder } from "@/lib/svg-wiring";
import type { ClimateInstrument } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";
import en from "@/dictionaries/en";

const MONTH_INDEX: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

/** cot(altitude) — real shadow-length relationship (shorter at high sun
 * angle, longer at low). Used only to scale the indicative-shadow `d`
 * attribute below; never presented as a measured facade/room shadow. */
function cot(deg: number): number {
  const rad = (deg * Math.PI) / 180;
  return Math.cos(rad) / Math.sin(rad);
}

/**
 * ENVIRONMENTAL-DIAGRAMS-FINAL-WIRING-PASS-V2.md, Component 01 — mechanical
 * data binding onto the approved production SVG (public/diagrams/01-solar-
 * path-{twin,single}.svg), replacing the previous hand-built polar chart
 * entirely (Section 2: "the new assets replace the old artwork").
 *
 * Coordinate mapping for `path-selected`/`noon-marker`: the delivered
 * artwork uses an elevation-arc convention (x ≈ time-of-day progression
 * left→right between the fixed sunrise/sunset endpoints at x=120/x=1080,
 * y ≈ altitude, with y=515 at the horizon matching the artwork's own fixed
 * reference-arc endpoints). This maps lib/solar.ts's real per-month path
 * array into that same coordinate space — the calculation itself is
 * untouched; only its presentation is translated into the asset's already-
 * established scale, exactly as Section 30 requires ("real data → existing
 * calculation layer → React state → SVG data slots → approved
 * illustration").
 */
const HORIZON_Y = 515;
const ZENITH_Y = 100;
const ARC_X0 = 120;
const ARC_X1 = 1080;

function altitudeToY(altitudeDeg: number): number {
  return HORIZON_Y - (Math.max(0, altitudeDeg) / 90) * (HORIZON_Y - ZENITH_Y);
}

function pathAttr(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  return `M${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)} ` + points.slice(1).map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

type SolarProps = {
  data: ClimateInstrument;
  selectedIndex: number;
  locale?: Locale;
  dict?: Dictionary;
};

/**
 * ENVIRONMENTAL-DIAGRAMS-STRUCTURAL-LAYOUT-FIX.md, Section 4 — split from
 * the previous single stacked-column SolarDiagram into one component per
 * row-slot (SolarPath / SolarMetrics / SolarReading) so the parent grid can
 * pair each with its Wind counterpart in an explicit named-area row,
 * instead of two independently-stacked columns. Each component
 * independently recomputes `getSolarGeometry()` (a cheap, pure, per-month
 * calculation, already reused this way across effects in the pre-split
 * version) rather than prop-drilling it from a shared parent — no new
 * calculation logic, same lib/solar.ts call, same result.
 */
export function SolarPath({ data, selectedIndex, locale = "en", dict = en }: SolarProps) {
  void locale;
  const month = data.months[selectedIndex];
  const coords = data.coordinates;
  const isTwin = data.title.toUpperCase().includes("RED SUN");
  const pathRef = useRef<HTMLDivElement>(null);
  const pathLoaded = useInlineSvgLoader(pathRef, `/diagrams/01-solar-path-${isTwin ? "twin" : "single"}.svg`);
  const geo = month && coords ? getSolarGeometry(coords.lat, coords.lon, MONTH_INDEX[month.month] ?? selectedIndex, coords.utcOffsetStandard, coords.utcOffsetDST) : null;

  // path-selected, noon-marker, building-shadow only; path-summer-solstice/
  // equinox/winter-solstice, north-indicator, azimuth-reference-ticks,
  // cardinal-labels, legend, solar-reference-dome, and building-mass are
  // all left exactly as delivered (fixed reference layer / correct massing
  // config already selected via file choice).
  useEffect(() => {
    if (!pathLoaded || !geo) return;
    const c = pathRef.current;

    const points = geo.path.map((pt, i) => ({
      x: ARC_X0 + (i / Math.max(1, geo.path.length - 1)) * (ARC_X1 - ARC_X0),
      y: altitudeToY(pt.altitudeDeg),
    }));
    const dAttr = pathAttr(points);
    const pathSelected = c?.querySelector<SVGPathElement>("#path-selected");
    if (pathSelected) pathSelected.setAttribute("d", dAttr);

    // Noon marker: x from the path's own highest-altitude sample (real
    // solar-noon position in the array), y from the precise calculated
    // noon altitude — never reinterpreted as a "current sun" position.
    let peakIdx = 0;
    let peakAlt = -Infinity;
    geo.path.forEach((pt, i) => {
      if (pt.altitudeDeg > peakAlt) {
        peakAlt = pt.altitudeDeg;
        peakIdx = i;
      }
    });
    const noonX = points[peakIdx]?.x ?? (ARC_X0 + ARC_X1) / 2;
    const noonY = altitudeToY(geo.noonAltitudeDeg);
    const noonMarker = c?.querySelector("#noon-marker");
    noonMarker?.querySelectorAll("circle").forEach((circle) => {
      circle.setAttribute("cx", noonX.toFixed(1));
      circle.setAttribute("cy", noonY.toFixed(1));
    });

    // Indicative shadow: real length (cot of this month's real noon
    // altitude), fixed schematic north-facing direction (both projects are
    // Northern Hemisphere — sun broadly south at solar noon, shadow
    // broadly north) — same honesty rule already approved, translated to
    // this asset's own building-mass position (~x 430-800, y 500-700).
    const shadowLen = Math.min(220, 55 * cot(geo.noonAltitudeDeg));
    const baseY = 660;
    const tipY = baseY - shadowLen;
    const shadowD = `M470 ${baseY} L760 ${baseY + 20} L760 ${tipY + 20} L470 ${tipY} Z`;
    const shadow = c?.querySelector<SVGPathElement>("#building-shadow");
    if (shadow) shadow.setAttribute("d", shadowD);
  }, [pathLoaded, geo]);

  // Heading translation (item 5) — see wireHeading's doc comment. Kept in
  // its own effect, independent of the geo-driven one above, so it fires
  // as soon as the SVG loads rather than waiting on solar geometry.
  useEffect(() => {
    if (!pathLoaded) return;
    wireHeading(pathRef.current, dict.solar.pathDiagramHeading);
    // Item 5 — the delivered subtitle text differs by massing variant
    // ("SINGLE"/"TWIN"), not just by locale, so the twin/single branch
    // already computed above (`isTwin`) picks the matching dict string.
    wireNth(pathRef.current, "text.label", 0, (isTwin ? dict.solar.subtitleTwin : dict.solar.subtitleSingle).toUpperCase());
    // Item 3 (2nd review round) — the file's own "LEGEND" heading
    // (inside its #legend group) is a SECOND `text.heading`-class
    // element, never reached by wireHeading's single querySelector
    // (first-match-only) call above. `#cardinal-labels`'s N/E/S/W group
    // also carries class="heading" but on the <g>, not on its child
    // <text> nodes, so it's not part of this same text.heading count —
    // confirmed by direct grep of both variants: exactly two text.heading
    // matches exist (title, then LEGEND), same order in single and twin.
    wireNth(pathRef.current, "text.heading", 1, dict.solar.legendHeading);
    // Item 3 (2nd review round) — the legend's own 5 field labels,
    // `text.label` indices 1-5 (index 0 is the subtitle wired above).
    wireNth(pathRef.current, "text.label", 1, dict.solar.legendReferencePath.toUpperCase());
    wireNth(pathRef.current, "text.label", 2, dict.solar.legendSelectedPath.toUpperCase());
    wireNth(pathRef.current, "text.label", 3, dict.solar.legendNoonMarker.toUpperCase());
    wireNth(pathRef.current, "text.label", 4, dict.solar.legendBuilding.toUpperCase());
    wireNth(pathRef.current, "text.label", 5, dict.solar.legendShadowIndicative.toUpperCase());
  }, [pathLoaded, dict, isTwin]);

  if (!month || !coords) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={pathRef} className={`${svgBox} pt-1`} role="img" aria-label={dict.solar.panelLabel} />;
}

export function SolarMetrics({ data, selectedIndex, dict = en }: SolarProps) {
  const month = data.months[selectedIndex];
  const coords = data.coordinates;
  const metricRef = useRef<HTMLDivElement>(null);
  const metricLoaded = useInlineSvgLoader(metricRef, "/diagrams/05-solar-metric-strip.svg");
  const geo = month && coords ? getSolarGeometry(coords.lat, coords.lon, MONTH_INDEX[month.month] ?? selectedIndex, coords.utcOffsetStandard, coords.utcOffsetDST) : null;

  // The four documented value slots.
  useEffect(() => {
    if (!metricLoaded || !geo) return;
    const c = metricRef.current;
    wireText(c, "daylight-value", `${geo.daylightHours.toFixed(1)} h`);
    wireText(c, "noon-altitude-value", `${geo.noonAltitudeDeg.toFixed(1)}°`);
    wireText(c, "sunrise-value", formatClock(geo.sunriseMinutes));
    wireText(c, "sunset-value", formatClock(geo.sunsetMinutes));
  }, [metricLoaded, geo]);

  // Item 5 — the four field labels ("DAYLIGHT"/"NOON ALTITUDE"/"SUNRISE"/
  // "SUNSET") are static chrome with no id, scoped one per named group.
  // dict.solar.daylight/noonAltitude/sunrise/sunset already existed
  // (unused until now) for exactly this slot.
  useEffect(() => {
    if (!metricLoaded) return;
    const c = metricRef.current;
    wireNth(c, "#daylight-metric text.label", 0, dict.solar.daylight.toUpperCase());
    wireNth(c, "#noon-altitude-metric text.label", 0, dict.solar.noonAltitude.toUpperCase());
    wireNth(c, "#sunrise-metric text.label", 0, dict.solar.sunrise.toUpperCase());
    wireNth(c, "#sunset-metric text.label", 0, dict.solar.sunset.toUpperCase());
  }, [metricLoaded, dict]);

  if (!month || !coords) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={metricRef} className={svgBox} />;
}

export function SolarReading({ data, selectedIndex, dict = en }: SolarProps) {
  const month = data.months[selectedIndex];
  const coords = data.coordinates;
  const isTwin = data.title.toUpperCase().includes("RED SUN");
  // 08's massing placeholder is reused from 01's already-approved
  // building-mass — this component fetches its own copy of 01 (headless,
  // never rendered) purely to source that group, so SolarReading stays
  // self-contained and doesn't depend on SolarPath having mounted.
  const sourceRef = useRef<HTMLDivElement>(null);
  const sourceLoaded = useInlineSvgLoader(sourceRef, `/diagrams/01-solar-path-${isTwin ? "twin" : "single"}.svg`);
  const readingRef = useRef<HTMLDivElement>(null);
  const readingLoaded = useInlineSvgLoader(readingRef, "/diagrams/08-solar-architectural-reading.svg");
  const geo = month && coords ? getSolarGeometry(coords.lat, coords.lon, MONTH_INDEX[month.month] ?? selectedIndex, coords.utcOffsetStandard, coords.utcOffsetDST) : null;

  // interpretive-paragraph from the same real, already-approved
  // insightText()-style logic; all three classification chips hidden
  // because no supported classification data exists for either project
  // (per Section 25: "if no supported classification exists, hide the
  // entire chip group").
  useEffect(() => {
    if (!readingLoaded || !geo || !month) return;
    const c = readingRef.current;
    wireWrappedText(c, "interpretive-paragraph", insightTextForMonth(dict, month.season, geo.noonAltitudeDeg));
    wireHidden(c, "solar-chip-1", true);
    wireHidden(c, "solar-chip-2", true);
    wireHidden(c, "solar-chip-3", true);
    wireHeading(c, dict.solar.architecturalReadingHeading);
    // Item 5 — "INTERPRETIVE READING" caption and the SUNRISE/SOLAR NOON/
    // SUNSET timeline labels are static chrome with no id.
    wireNth(c, "text.label", 0, dict.solar.interpretiveReadingLabel.toUpperCase());
    wireNth(c, "text.sun-time-label", 0, dict.solar.sunrise.toUpperCase());
    wireNth(c, "text.sun-time-label", 1, dict.solar.solarNoonLabel.toUpperCase());
    wireNth(c, "text.sun-time-label", 2, dict.solar.sunset.toUpperCase());
  }, [readingLoaded, geo, month, dict]);

  // ENVIRONMENTAL-DIAGRAMS-RENDERING-COMPLETION-V1.md, Priority 1 (Case D):
  // 08's own `solar-reading-illustration` group ships a broken, un-expanded
  // template placeholder instead of real massing content. Fills it with a
  // verbatim clone of the already-approved `building-mass` sourced from a
  // headless copy of 01 — reusing existing artwork, not drawing anything
  // new.
  useEffect(() => {
    if (!sourceLoaded || !readingLoaded) return;
    fillMassingPlaceholder(sourceRef.current, readingRef.current, "solar-reading-illustration", 545, 470, 0.55);
  }, [sourceLoaded, readingLoaded]);

  if (!month || !coords) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  // Kept off-screen rather than display:none — fillMassingPlaceholder calls
  // getBBox() on this source SVG's #building-mass, which returns a
  // zero-size box (or throws) on a display:none subtree in most browsers.
  return (
    <>
      <div ref={sourceRef} className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden" aria-hidden="true" />
      <div ref={readingRef} className={svgBox} />
    </>
  );
}
