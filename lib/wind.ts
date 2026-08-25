/**
 * Parses each project's already-approved `wind.directionLabel` strings
 * (e.g. "W / SW → E / NE", "VARIABLE → E", "W / NW") into emphasized
 * 16-point compass sectors for the Wind Diagram's polar rose. This is a
 * visual-emphasis construction, not a frequency measurement — neither
 * project has verified monthly directional-frequency data, so the rose
 * only ever encodes what the approved label already states (primary vs.
 * secondary regime), never invented percentages.
 */

const COMPASS_16 = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

const COMPASS_DEGREES: Record<string, number> = Object.fromEntries(COMPASS_16.map((d, i) => [d, i * 22.5]));

/** Same 16 points as {name, deg} pairs — avoids indexed-lookup `undefined` in strict TS when iterating for rendering. */
export const COMPASS_SECTORS: { name: string; deg: number }[] = COMPASS_16.map((name, i) => ({ name, deg: i * 22.5 }));

export type WindEmphasis = {
  primaryDegrees: number[];
  secondaryDegrees: number[];
  isVariable: boolean;
};

export function parseWindLabel(directionLabel: string): WindEmphasis {
  const isVariable = /variable/i.test(directionLabel);
  const [before, after] = directionLabel.split("→").map((s) => s.trim());

  const toDegrees = (segment: string | undefined): number[] => {
    if (!segment) return [];
    return segment
      .split("/")
      .map((token) => token.trim().toUpperCase())
      .filter((token) => token && token !== "VARIABLE")
      .map((token) => COMPASS_DEGREES[token])
      .filter((deg): deg is number => deg !== undefined);
  };

  return {
    primaryDegrees: toDegrees(before),
    secondaryDegrees: toDegrees(after),
    isVariable,
  };
}

export { COMPASS_16, COMPASS_DEGREES };
