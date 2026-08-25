"use client";

import { useEffect, useRef } from "react";
import { parseWindLabel } from "@/lib/wind";
import { useInlineSvgLoader, wireText, wireHidden, wireTransform, wireWrappedText, fillMassingPlaceholder } from "@/lib/svg-wiring";
import type { ClimateInstrument } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";
import en from "@/dictionaries/en";

/**
 * ENVIRONMENTAL-DIAGRAMS-FINAL-WIRING-PASS-V2.md, Components 02/03/06/07/09
 * — mechanical data binding onto the approved production SVGs. The old
 * hand-built polar/sector-bar chart is fully replaced (Section 2).
 *
 * Directional rotation calibration (Section 14): baseline bearings below
 * are computed directly from each asset's own delivered path/wedge
 * coordinates (tail→head vectors, or wedge-apex→edge vectors), not
 * estimated — see the inline derivation comment at each constant. A group
 * is rotated by (real bearing − artwork baseline bearing) around a fixed
 * pivot so it points at the real compass direction while keeping its
 * drawn shape untouched, per the explicit "rotate via transform, do not
 * redraw" rule.
 *
 * Semantic judgment call, disclosed per Section 14's safety valve: the
 * delivered arrows/wedges don't document whether their tail→head vector
 * represents "wind blowing FROM" or "wind blowing TOWARD" the labeled
 * compass point. This wiring treats the primary/secondary compass token as
 * the bearing the shape should point TOWARD — the simpler, more directly
 * defensible reading of the two, applied consistently to both direction
 * groups and both projects. See the final report for how this rendered.
 *
 * ENVIRONMENTAL-DIAGRAMS-STRUCTURAL-LAYOUT-FIX.md, Section 4 — split from
 * the previous single stacked-column WindDiagram into one component per
 * row-slot (WindFlow / WindExposure / PrevailingSector /
 * EnvironmentalDisclosure / WindEnvelopeReading) so the parent grid can
 * place each into its own explicit named-area row. Each component
 * independently recomputes the cheap, pure label-parsing/derived values
 * (parseWindLabel, hasPrimary/hasSecondary, speedIsModeled) rather than
 * prop-drilling from a shared parent — no new logic, same lib/wind.ts
 * call, same results.
 */
function bearing(dx: number, dy: number): number {
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

// Wind Exposure (03) — primary-direction path "M100 350 C250 350 330 380 455 420",
// secondary-direction path "M980 235 C870 260 805 300 735 345" (identical in
// both twin/single variants). Baseline = tail→head bearing of each.
const EXPOSURE_PRIMARY_BASELINE = bearing(455 - 100, 420 - 350); // ≈101.1°
const EXPOSURE_PRIMARY_PIVOT: [number, number] = [455, 420];
const EXPOSURE_SECONDARY_BASELINE = ((bearing(735 - 980, 345 - 235) % 360) + 360) % 360; // ≈245.8°
const EXPOSURE_SECONDARY_PIVOT: [number, number] = [735, 345];

// Prevailing Sector Panel (06) — primary-sector wedge edges (60,-145)/(130,-85)
// from apex (0,0); secondary-sector wedge edges (145,-20)/(150,25). Baseline
// = midpoint bearing between each wedge's two edges.
const SECTOR_PRIMARY_BASELINE = (bearing(60, -145) + bearing(130, -85)) / 2; // ≈39.6°
const SECTOR_SECONDARY_BASELINE = (bearing(145, -20) + bearing(150, 25)) / 2; // ≈90.8°

const COMPASS_BEARING: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5, W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
};

function firstToken(segment: string | undefined): string | undefined {
  return segment?.split("/")[0]?.trim().toUpperCase();
}

type WindProps = {
  data: ClimateInstrument;
  selectedIndex: number;
  locale?: Locale;
  dict?: Dictionary;
};

function useWindDerived(data: ClimateInstrument, selectedIndex: number, dict: Dictionary) {
  const month = data.months[selectedIndex];
  const isTwin = data.title.toUpperCase().includes("RED SUN");
  const variant = isTwin ? "twin" : "single";
  const label = month?.wind.directionLabel ?? "";
  const emphasis = parseWindLabel(label);
  const [beforeRaw, afterRaw] = label.split("→").map((s) => s.trim());
  const primaryText = emphasis.isVariable ? dict.wind.variable : beforeRaw ?? "";
  const secondaryText = afterRaw ?? "";
  const speedIsModeled = /model/i.test(month?.wind.speedLabel ?? "");
  const hasPrimary = !emphasis.isVariable && Boolean(beforeRaw);
  const hasSecondary = Boolean(afterRaw);
  return { month, variant, beforeRaw, afterRaw, primaryText, secondaryText, speedIsModeled, hasPrimary, hasSecondary };
}

export function WindFlow({ data, selectedIndex, dict = en }: WindProps) {
  const { month, variant, hasPrimary, hasSecondary } = useWindDerived(data, selectedIndex, dict);
  const flowRef = useRef<HTMLDivElement>(null);
  const flowLoaded = useInlineSvgLoader(flowRef, `/diagrams/02-wind-flow-${variant}.svg`);

  // Do not edit wind-flow-1..7's own `d` (delivered qualitative artwork,
  // per Section 13). Only emphasis-toggle the primary/secondary groups;
  // de-emphasize primary specifically for a "VARIABLE" month (Villa Red
  // Sun's APR), where the real data has no dominant primary direction —
  // never invent one to keep it "confident." Both projects' real primary
  // direction is already broadly westerly, matching the artwork's own
  // baked-in left-to-right flow — no rotation transform was needed or
  // applied (Section 14 safety valve, applied as "no change needed"
  // rather than forcing one).
  useEffect(() => {
    if (!flowLoaded) return;
    const c = flowRef.current;
    const primaryGroup = c?.querySelector<SVGElement>("#wind-streamlines-primary");
    if (primaryGroup) primaryGroup.style.opacity = hasPrimary ? "1" : "0.35";
    const secondaryGroup = c?.querySelector<SVGElement>("#wind-streamlines-secondary");
    if (secondaryGroup) secondaryGroup.style.opacity = hasSecondary ? "1" : "0.15";
  }, [flowLoaded, hasPrimary, hasSecondary]);

  if (!month) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={flowRef} className={`${svgBox} pt-1`} role="img" aria-label={dict.wind.panelLabel} />;
}

export function WindExposure({ data, selectedIndex, dict = en }: WindProps) {
  const { month, variant, beforeRaw, afterRaw, hasPrimary, hasSecondary } = useWindDerived(data, selectedIndex, dict);
  const exposureRef = useRef<HTMLDivElement>(null);
  const exposureLoaded = useInlineSvgLoader(exposureRef, `/diagrams/03-wind-exposure-${variant}.svg`);

  // Rotate primary-direction/secondary-direction groups to the real
  // compass bearing (arrows themselves untouched, only transform set);
  // hide secondary-direction entirely if the real data has no secondary
  // component (never applies to the current two projects' real data, but
  // implemented per the documented rule regardless).
  useEffect(() => {
    if (!exposureLoaded) return;
    const c = exposureRef.current;
    const primaryToken = hasPrimary ? firstToken(beforeRaw) : undefined;
    const primaryBearing = primaryToken ? COMPASS_BEARING[primaryToken] : undefined;
    if (primaryBearing !== undefined) {
      const delta = primaryBearing - EXPOSURE_PRIMARY_BASELINE;
      wireTransform(c, "primary-direction", `rotate(${delta.toFixed(1)} ${EXPOSURE_PRIMARY_PIVOT[0]} ${EXPOSURE_PRIMARY_PIVOT[1]})`);
    }
    wireHidden(c, "secondary-direction", !hasSecondary);
    if (hasSecondary) {
      const secondaryToken = firstToken(afterRaw);
      const secondaryBearing = secondaryToken ? COMPASS_BEARING[secondaryToken] : undefined;
      if (secondaryBearing !== undefined) {
        const delta = secondaryBearing - EXPOSURE_SECONDARY_BASELINE;
        wireTransform(c, "secondary-direction", `rotate(${delta.toFixed(1)} ${EXPOSURE_SECONDARY_PIVOT[0]} ${EXPOSURE_SECONDARY_PIVOT[1]})`);
      }
    }
  }, [exposureLoaded, hasPrimary, hasSecondary, beforeRaw, afterRaw]);

  if (!month) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={exposureRef} className={svgBox} />;
}

export function PrevailingSector({ data, selectedIndex, dict = en }: WindProps) {
  const { month, beforeRaw, afterRaw, primaryText, secondaryText, hasPrimary, hasSecondary, speedIsModeled } = useWindDerived(data, selectedIndex, dict);
  const sectorRef = useRef<HTMLDivElement>(null);
  const sectorLoaded = useInlineSvgLoader(sectorRef, "/diagrams/06-prevailing-sector-panel.svg");

  useEffect(() => {
    if (!sectorLoaded || !month) return;
    const c = sectorRef.current;
    wireText(c, "primary-direction-value", primaryText);
    wireText(c, "secondary-direction-value", hasSecondary ? secondaryText : "—");
    wireText(c, "season-state-value", month.season.toUpperCase());
    wireText(c, "frequency-status-value", "NOT ESTABLISHED");
    const speedMatch = month.wind.speedLabel.match(/^[^·]+/);
    wireText(c, "wind-speed-value", (speedMatch?.[0] ?? month.wind.speedLabel).trim());
    wireText(c, "wind-speed-qualifier", speedIsModeled ? "· MODEL" : "");

    const primaryToken = hasPrimary ? firstToken(beforeRaw) : undefined;
    const primaryBearing = primaryToken ? COMPASS_BEARING[primaryToken] : undefined;
    if (primaryBearing !== undefined) {
      wireTransform(c, "primary-sector", `rotate(${(primaryBearing - SECTOR_PRIMARY_BASELINE).toFixed(1)})`);
    }
    wireHidden(c, "secondary-sector", !hasSecondary);
    if (hasSecondary) {
      const secondaryToken = firstToken(afterRaw);
      const secondaryBearing = secondaryToken ? COMPASS_BEARING[secondaryToken] : undefined;
      if (secondaryBearing !== undefined) {
        wireTransform(c, "secondary-sector", `rotate(${(secondaryBearing - SECTOR_SECONDARY_BASELINE).toFixed(1)})`);
      }
    }
  }, [sectorLoaded, month, primaryText, secondaryText, hasSecondary, hasPrimary, beforeRaw, afterRaw, speedIsModeled]);

  if (!month) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={sectorRef} className={svgBox} />;
}

export function EnvironmentalDisclosure({ data, selectedIndex, dict = en }: WindProps) {
  const { month, speedIsModeled } = useWindDerived(data, selectedIndex, dict);
  const disclosureRef = useRef<HTMLDivElement>(null);
  const disclosureLoaded = useInlineSvgLoader(disclosureRef, "/diagrams/07-environmental-data-disclosure.svg");

  // The limitation note is a genuinely long, real sentence
  // (dict.wind.honestyNote) — the delivered slot is a single-line,
  // non-wrapping SVG <text>, so a plain textContent replacement overflows
  // the card and gets clipped at the right edge (confirmed by direct
  // measurement: a 6px-tall bounding box for ~200 characters).
  // Word-wrapped the same way 08/09's paragraphs already are.
  useEffect(() => {
    if (!disclosureLoaded) return;
    const c = disclosureRef.current;
    wireText(c, "frequency-disclosure-value", dict.wind.frequencyNotEstablished);
    wireText(c, "wind-speed-disclosure-value", speedIsModeled ? "Modeled wind speed" : (month?.wind.speedLabel ?? ""));
    wireText(c, "direction-disclosure-value", "Qualitative directional interpretation");
    wireText(c, "source-data-disclosure-value", "Seasonal, not monthly");
    wireWrappedText(c, "disclosure-limitation-note", dict.wind.honestyNote, 90, 16);
  }, [disclosureLoaded, dict, speedIsModeled, month]);

  if (!month) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  return <div ref={disclosureRef} className={svgBox} />;
}

export function WindEnvelopeReading({ data, selectedIndex, dict = en }: WindProps) {
  const { month, variant } = useWindDerived(data, selectedIndex, dict);
  // 09's massing placeholder is reused from 02's already-approved
  // building-mass — this component fetches its own headless copy of 02
  // purely to source that group, so WindEnvelopeReading stays
  // self-contained and doesn't depend on WindFlow having mounted.
  const sourceRef = useRef<HTMLDivElement>(null);
  const sourceLoaded = useInlineSvgLoader(sourceRef, `/diagrams/02-wind-flow-${variant}.svg`);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const envelopeLoaded = useInlineSvgLoader(envelopeRef, "/diagrams/09-wind-envelope-reading.svg");

  // Paragraph from the same real, already-approved reported-speed text;
  // both chip groups and the exposed-face overlay hidden because no
  // verified facade-specific exposure claim exists for either project
  // (never the reference's fabricated "SW and W façades receive the
  // greatest exposure").
  useEffect(() => {
    if (!envelopeLoaded || !month) return;
    const c = envelopeRef.current;
    wireWrappedText(c, "wind-envelope-paragraph", `${dict.wind.reportedSpeed} ${month.wind.speedLabel}.`);
    wireHidden(c, "wind-chip-1", true);
    wireHidden(c, "wind-chip-2", true);
    wireHidden(c, "wind-chip-3", true);
    wireHidden(c, "exposed-face-overlay", true);
  }, [envelopeLoaded, month, dict]);

  // Priority 1 (Case D, same defect as 08): fills 09's broken
  // `{massing(...)}` placeholder with a verbatim clone of the
  // already-approved `building-mass` sourced from the headless copy of
  // 02 — reused artwork, nothing redrawn.
  useEffect(() => {
    if (!sourceLoaded || !envelopeLoaded) return;
    fillMassingPlaceholder(sourceRef.current, envelopeRef.current, "wind-envelope-illustration", 570, 455, 0.5);
  }, [sourceLoaded, envelopeLoaded]);

  if (!month) return null;
  const svgBox = "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[92%] [&_svg]:mx-auto";
  // Kept off-screen rather than display:none — fillMassingPlaceholder calls
  // getBBox() on this source SVG's #building-mass, which returns a
  // zero-size box (or throws) on a display:none subtree in most browsers.
  return (
    <>
      <div ref={sourceRef} className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden" aria-hidden="true" />
      <div ref={envelopeRef} className={svgBox} />
    </>
  );
}
