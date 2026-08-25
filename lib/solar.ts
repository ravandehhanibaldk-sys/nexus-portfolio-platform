/**
 * Deterministic solar-position calculation — ported verbatim (same
 * declination/equation-of-time/hour-angle formulas) from the approved
 * Climate Atlas prototypes (project_climate_atlas_v2.html for Villa Red
 * Sun, project_climate_atlas_project_B.html for Villa Efe), which both
 * already validated against the production precedent noon-altitude
 * values baked into each project's `climateInstrument.months` (Red Sun
 * ~57.9°/~11.1°, Efe 78.1°/31.2°). A representative day (the 21st) is
 * used per month, matching the prototypes.
 */

export type SolarPathPoint = { azimuthDeg: number; altitudeDeg: number };

export type SolarGeometry = {
  noonAltitudeDeg: number;
  daylightHours: number;
  sunriseMinutes: number;
  sunsetMinutes: number;
  path: SolarPathPoint[];
};

function dayOfYear(monthIndex: number): number {
  const date = Date.UTC(2026, monthIndex, 21);
  const yearStart = Date.UTC(2026, 0, 0);
  return Math.floor((date - yearStart) / 86400000);
}

function declinationRad(monthIndex: number): number {
  const n = dayOfYear(monthIndex);
  const g = ((2 * Math.PI) / 365) * (n - 1);
  return (
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g)
  );
}

function equationOfTimeMinutes(monthIndex: number): number {
  const n = dayOfYear(monthIndex);
  const g = ((2 * Math.PI) / 365) * (n - 1);
  return (
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(g) -
      0.032077 * Math.sin(g) -
      0.014615 * Math.cos(2 * g) -
      0.040849 * Math.sin(2 * g))
  );
}

/**
 * @param utcOffsetStandard Standard-time UTC offset in hours (e.g. 1 for CET, 2 for EET).
 * @param utcOffsetDST Daylight-saving UTC offset in hours (e.g. 2 for CEST, 3 for EEST).
 *   EU-wide DST (last Sunday March – last Sunday October) is approximated,
 *   matching the prototypes, as calendar months March(2)–October(9).
 */
export function getSolarGeometry(
  lat: number,
  lon: number,
  monthIndex: number,
  utcOffsetStandard: number,
  utcOffsetDST: number
): SolarGeometry {
  const dec = declinationRad(monthIndex);
  const eq = equationOfTimeMinutes(monthIndex);
  const phi = (lat * Math.PI) / 180;
  const zenith = (90.833 * Math.PI) / 180;

  let cosH = (Math.cos(zenith) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
  cosH = Math.max(-1, Math.min(1, cosH));
  const H = (Math.acos(cosH) * 180) / Math.PI;

  const tz = monthIndex >= 2 && monthIndex <= 9 ? utcOffsetDST : utcOffsetStandard;
  const noonMinutes = 720 - 4 * lon - eq + tz * 60;

  const noonAltitudeDeg = 90 - Math.abs(lat - (dec * 180) / Math.PI);

  const path: SolarPathPoint[] = [];
  for (let h = 0; h <= 24; h += 0.25) {
    const hourAngle = ((h - 12) * 15 * Math.PI) / 180;
    const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(hourAngle));
    if (alt > -0.015) {
      const az =
        ((Math.atan2(Math.sin(hourAngle), Math.cos(hourAngle) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)) * 180) /
          Math.PI +
          180 +
          360) %
        360;
      path.push({ azimuthDeg: az, altitudeDeg: (alt * 180) / Math.PI });
    }
  }

  return {
    noonAltitudeDeg,
    daylightHours: (2 * H) / 15,
    sunriseMinutes: noonMinutes - 4 * H,
    sunsetMinutes: noonMinutes + 4 * H,
    path,
  };
}

export function formatClock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const hh = Math.floor(m / 60);
  const mm = Math.round(m % 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
