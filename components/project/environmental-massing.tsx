/**
 * Shared, reusable schematic-massing renderer for the Environmental
 * Diagrams system (Solar + Wind both import this).
 *
 * MASTER-EXECUTION-TASK-FINAL.md, "MASSING CONFIGURATION" (critical
 * exception to "copy the reference"): the ten approved references govern
 * illustration STYLE only — isometric/axonometric linework, three-face
 * shading, how a volume sits in the diagram. They do NOT govern massing
 * CONFIGURATION. The specific example shapes shown in the references
 * (e.g. Reference 08's L-shaped courtyard building) are illustration-only
 * and are never traced or copied. Configuration remains driven only by
 * each project's own already-verified fact:
 * - "twin": Villa Red Sun merges two separate existing buildings on one
 *   plot (content/projects/villa-red-sun.ts, constraints text) — two
 *   simple volumes, not a specific real arrangement/size ratio (neither
 *   is on record).
 * - "single": every other project (Villa Efe has no equivalent fact).
 *
 * MASSING HONESTY RULE (unchanged, still binding): schematic only, axis-
 * aligned to true north with no invented rotation, no facade/dimension
 * claims beyond a plain compass letter.
 *
 * Rendering style reference: 01-solar_path_variant_D_production.svg and
 * 10-environmental_diagram_system_variant_D.html's building illustrations
 * — light paper-toned top face, mid-toned side face, darker side face,
 * thin dark outline. Colors here use this project's own existing
 * env-* design tokens (stone/timber/shadow), not the references' literal
 * hex values, keeping the palette consistent with the rest of the site.
 */

export type MassingFootprint = "twin" | "single";

export function massingFootprintForTitle(title: string): MassingFootprint {
  return title.toUpperCase().includes("RED SUN") ? "twin" : "single";
}

function Volume({
  x,
  y,
  w,
  h,
  liftX,
  liftY,
  outline,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  liftX: number;
  liftY: number;
  outline: string;
}) {
  const bx0 = x, by0 = y, bx1 = x + w, by1 = y + h;
  const tx0 = bx0 + liftX, ty0 = by0 + liftY;
  const tx1 = bx1 + liftX, ty1 = by1 + liftY;

  return (
    <g stroke={outline} strokeWidth="1.2" strokeLinejoin="round">
      {/* right (darker) face */}
      <polygon points={`${bx1},${by0} ${bx1},${by1} ${tx1},${ty1} ${tx1},${ty0}`} fill="var(--color-env-timber)" fillOpacity="0.55" />
      {/* front (mid-tone) face */}
      <polygon points={`${bx0},${by1} ${bx1},${by1} ${tx1},${ty1} ${tx0},${ty1}`} fill="var(--color-env-stone)" />
      {/* top / roof (lightest) face */}
      <polygon points={`${tx0},${ty0} ${tx1},${ty0} ${tx1},${ty1} ${tx0},${ty1}`} fill="#fffdf8" />
      {/* ground outline */}
      <rect x={bx0} y={by0} width={w} height={h} fill="none" strokeOpacity="0.45" />
    </g>
  );
}

export function EnvironmentalMassing({
  cx,
  cy,
  footprint,
  size = 52,
  outline = "var(--color-ink)",
}: {
  cx: number;
  cy: number;
  footprint: MassingFootprint;
  size?: number;
  outline?: string;
}) {
  const liftX = size * 0.24;
  const liftY = -size * 0.4;

  // Soft ground shadow beneath the volume(s) — echoes the ring system's
  // own concentric geometry, anchoring the massing as the diagram's center.
  const groundMark = (
    <ellipse cx={cx} cy={cy + size * 0.05} rx={size * 1.65} ry={size * 0.62} fill="var(--color-ink)" opacity="0.06" />
  );

  if (footprint === "twin") {
    const gap = size * 0.26;
    const w = size * 0.82;
    const h = size * 1.0;
    const leftX = cx - gap / 2 - w;
    const rightX = cx + gap / 2;
    const y = cy - h / 2;
    return (
      <g>
        {groundMark}
        <Volume x={leftX} y={y} w={w} h={h} liftX={liftX} liftY={liftY} outline={outline} />
        <Volume x={rightX} y={y} w={w} h={h} liftX={liftX} liftY={liftY} outline={outline} />
      </g>
    );
  }

  const w = size * 1.5;
  const h = size * 1.0;
  return (
    <g>
      {groundMark}
      <Volume x={cx - w / 2} y={cy - h / 2} w={w} h={h} liftX={liftX} liftY={liftY} outline={outline} />
    </g>
  );
}
