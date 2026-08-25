import { formatDict } from "@/lib/i18n-format";
import type { Dictionary } from "@/dictionaries/en";

/** Same real, already-approved season/altitude-derived interpretation
 * logic used since Phase 1 — moved to its own module so both the Solar
 * Architectural Reading (08) and any other wired component can reuse it
 * without duplicating the rule. Never the fabricated "Moderate/High/Low/
 * Optimal" classifications from the reference/asset package. */
export function insightTextForMonth(dict: Dictionary, season: string, noonAltitudeDeg: number): string {
  if (noonAltitudeDeg >= 55) return dict.solar.insightHigh;
  if (noonAltitudeDeg <= 20) return dict.solar.insightLow;
  const seasonWord = dict.seasonsLower[season as keyof Dictionary["seasonsLower"]] ?? season;
  return formatDict(dict.solar.insightTransition, { season: seasonWord });
}
