"use client";

import { useEffect, useRef } from "react";
import { useInlineSvgLoader, wireHeading, wireText } from "@/lib/svg-wiring";
import en from "@/dictionaries/en";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Coded Site/Location diagram (item 9) — matches solar-diagram.tsx /
 * wind-diagram.tsx's instrument-panel visual language (flat colors,
 * thin strokes, labeled callouts) instead of the previous photographic-
 * aerial-with-overlay treatment. Unlike solar/wind, site geometry isn't
 * month-dependent data — the SVG is static artwork (public/diagrams/
 * 10-site-location-efe.svg), loaded the same inline way so it stays
 * crisp and DOM-addressable rather than a raster photo.
 *
 * Villa Efe only for now — Villa Red Sun's only available site reference
 * is a dense, unlabeled aerial photo with no distinct adjacent-building
 * outlines and an ambiguous "two buildings vs. already-merged" read, so
 * a confident coded redraw isn't available yet (see
 * docs/handoff/PORTFOLIO_OPEN_ISSUES.md). Its current photographic Site
 * Analysis image is untouched.
 *
 * `fit` — "auto" (default) is the website's own usage: the diagram sits
 * in a dedicated section with no competing height budget, so width drives
 * height naturally. "contain" is for the PDF narrative sheet (item 9),
 * which must fit the diagram into whatever vertical space is left below
 * two text beats — there, both width AND height are fixed by the flex
 * layout, and the injected `<svg>` needs `h-full` (not `h-auto`) so its
 * own viewBox + default `preserveAspectRatio="xMidYMid meet"` scales it
 * to fit within that box, letterboxed, the same shrink-to-fit behavior
 * `object-fit: contain` gives a raster `<img>`. This deliberately avoids
 * `<img src="*.svg">` + `object-fit: contain` for that PDF case — direct
 * testing showed Chromium does not apply object-fit's scale-down to an
 * SVG-sourced `<img>` here (the artwork rendered at native size and was
 * clipped by the box instead of being scaled into it); inline injection
 * with native SVG viewBox scaling does not have that failure mode.
 */
export function SiteDiagram({
  label,
  fit = "auto",
  dict = en,
}: {
  label: string;
  fit?: "auto" | "contain";
  dict?: Dictionary;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useInlineSvgLoader(ref, "/diagrams/10-site-location-efe.svg");

  // Item 1 (2nd review round) — this diagram shipped in the previous
  // round with zero wiring at all: every visible string was hardcoded
  // English, regardless of locale. Every slot below has a stable id in
  // the source SVG (added when this file was authored — it's not one of
  // the protected 01-09 asset-package files, so ids were free to add
  // directly rather than needing wireNth's positional-targeting
  // workaround). Values are uppercased at the call site to match this
  // file's own all-caps convention on every text class (unlike 01-09,
  // where only `.label` is caps).
  useEffect(() => {
    if (!loaded) return;
    const c = ref.current;
    wireHeading(c, dict.siteLocation.heading);
    wireText(c, "coast-road-label", dict.siteLocation.coastRoad.toUpperCase());
    wireText(c, "secondary-road-label", dict.siteLocation.secondaryAccessRoad.toUpperCase());
    wireText(c, "adjacent-buildings-label", dict.siteLocation.adjacentBuildings.toUpperCase());
    wireText(c, "adjacent-property-limits-label", dict.siteLocation.adjacentPropertyLimits.toUpperCase());
    wireText(c, "project-site-label", dict.siteLocation.projectSite.toUpperCase());
    wireText(c, "site-chip-1-label", dict.siteLocation.siteConditionLabel.toUpperCase());
    wireText(c, "site-chip-1-value", dict.siteLocation.siteConditionValue.toUpperCase());
    wireText(c, "site-chip-2-label", dict.siteLocation.accessLabel.toUpperCase());
    wireText(c, "site-chip-2-value", dict.siteLocation.accessValue.toUpperCase());
  }, [loaded, dict]);

  const svgBox =
    fit === "contain"
      ? "h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-full"
      : "[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-full";
  return <div ref={ref} className={svgBox} role="img" aria-label={label} />;
}
