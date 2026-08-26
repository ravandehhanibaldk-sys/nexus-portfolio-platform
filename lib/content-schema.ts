import { z } from "zod";
import type { Locale } from "@/lib/locale";

/**
 * Project Template Specification — NPP Master Design Specification v3.0, Section 21.
 * This schema is the platform's Single Source of Truth for what a "project" is.
 * Every project added to the platform (Section 22, Project Comparison Framework)
 * must validate against this schema. The schema's shape must not need to change
 * to accommodate a structurally different project (Section 21.2, Reusability Test) —
 * only its values change.
 */

/**
 * Workstream 3 — user-visible narrative/copy fields carry both locales
 * side by side on the SAME field (not a duplicated parallel content file —
 * "no duplicated project data" per the execution pack), resolved at render
 * time via `t()`. Fields that are data/identifiers/proper nouns (ids,
 * filenames, project `name`, climateInstrument's own data) are NOT
 * localized — see Workstream 3 report for the exact field-by-field scope.
 */
const localizedStringSchema = z.object({ en: z.string(), da: z.string() });
export type LocalizedString = z.infer<typeof localizedStringSchema>;

/** Resolves a localized-string field for the given locale. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

const assetSchema = z.object({
  /** Filename inside /public/images/<project-id>/ */
  src: z.string(),
  /** Section 11.3 — every image must have a stated reason for inclusion. */
  alt: localizedStringSchema,
  /** Section 19 — which component this asset renders through. */
  category: z.enum([
    "exterior",
    "interior",
    "site-analysis",
    "circulation-diagram",
    "daylight-diagram",
    "privacy-diagram",
    "airflow-diagram",
    "solar-path-diagram",
    "wind-diagram",
    "master-plan",
    "plan",
    "section",
  ]),
  /** Optional caption — Section 19.7: a diagram without a caption is decoration, not information. */
  caption: localizedStringSchema.optional(),
});

const alternativeSchema = z.object({
  /** e.g. "B-2", "C-1", "D" */
  id: z.string(),
  label: localizedStringSchema,
  /** Section 12 — cost/quality tier this proposal belongs to. */
  tier: localizedStringSchema,
  isFinal: z.boolean().default(false),
  assets: z.array(assetSchema),
});

/**
 * Phase 3B — Section Locator. One authoritative "plan with section cut-lines"
 * asset per level/proposal, plus the two building sections they all relate to.
 * Lives under finalArchitecture (Section 12: documenting what was built), not
 * the Comparator (which is proposal/level analysis, not orientation).
 */
const sectionLocatorLevelSchema = z.object({
  id: z.string(),
  label: localizedStringSchema,
  plan: assetSchema,
});

const sectionLocatorSchema = z.object({
  levels: z.array(sectionLocatorLevelSchema).min(1),
  sectionA: assetSchema,
  sectionB: assetSchema,
});

/**
 * Climate Interface (Site beat) — supersedes the earlier Phase 3B
 * "Environmental Response" schematic (two-solstice SVG diagram). Ported
 * faithfully from a standalone HTML/CSS/JS build (external, user-approved)
 * per project — a real seasonal photograph plus a 12-month instrument panel
 * covering solar altitude, wind, temperature and rainfall together.
 *
 * Every value below is a literal port of the approved HTML's own numbers,
 * including its already-disclosed derivation method: solar altitude/time is
 * measured only at the two solstice months (`solar.source` distinguishes
 * `"solar-calculation-table"` from `"derived"`); every other month is a
 * simple two-point interpolation computed once at authoring time — not
 * re-derived at render time, so the shipped numbers can never drift from
 * what was reviewed. `humidity` is per-month and optional at the schema
 * level because it is genuinely absent for Villa Red Sun (not established
 * in the source report) — omit the field entirely for a project rather
 * than inventing a placeholder.
 */
const climateMonthSchema = z.object({
  /** "JAN".."DEC" */
  month: z.string(),
  season: z.enum(["winter", "spring", "summer", "autumn"]),
  temperature: z.object({
    value: z.number(),
    unit: z.enum(["C", "F"]),
    source: z.string(),
  }),
  rainfall: z.object({
    value: z.number(),
    unit: z.string(),
    source: z.string(),
  }),
  wind: z.object({
    /** Pre-formatted display string, e.g. "W / SW → E / NE". */
    directionLabel: z.string(),
    /** Pre-formatted display string, value + unit only, e.g. "6.50 M/S" —
     * no embedded provenance qualifier text (see speedQualifier below):
     * that's resolved through the dictionary at render time so it
     * localizes correctly instead of being baked into a shared,
     * non-localized string (item 20 / mixed-language fix). */
    speedLabel: z.string(),
    /** Item 20 — this value's provenance, rendered via
     * dict.wind.qualifierModel / qualifierAnnualAverage wherever
     * speedLabel is shown. "model": derived/estimated (no exact-site
     * measurement available). "annual-average": a real official
     * annual-mean statistic reused as a flat monthly value (not modeled —
     * genuinely different provenance from "model", and must say so
     * explicitly rather than showing no qualifier at all, which read as
     * an unexplained inconsistency next to a project that does show one). */
    speedQualifier: z.enum(["model", "annual-average"]).optional(),
  }),
  humidity: z
    .object({
      value: z.number(),
      unit: z.string(),
      source: z.string(),
    })
    .optional(),
  solar: z.object({
    altitudeDeg: z.number(),
    /** Local clock time at this altitude, e.g. "13:12". */
    time: z.string(),
    source: z.enum(["solar-calculation-table", "derived"]),
  }),
});

const climateInstrumentSchema = z.object({
  /** e.g. "A / 03 — SITE CLIMATE INSTRUMENT" */
  eyebrow: z.string(),
  /** e.g. "VILLA RED SUN" */
  title: z.string(),
  /** e.g. "SOLRØD / DENMARK" — prefixed to "· {SEASON} PROFILE" at render time. */
  locationLabel: z.string(),
  /** Hex accent color for this project's instrument panel. */
  accentColor: z.string(),
  /**
   * Internal-use-only site coordinates + UTC offsets, for the deterministic
   * solar calculation (lib/solar.ts) that drives the Solar Diagram. Never
   * rendered in the public UI (Workstream 2 location-privacy rule) — used
   * only for computation.
   */
  coordinates: z
    .object({
      lat: z.number(),
      lon: z.number(),
      /** Standard-time UTC offset in hours, e.g. 1 for CET, 2 for EET. */
      utcOffsetStandard: z.number(),
      /** Daylight-saving UTC offset in hours, e.g. 2 for CEST, 3 for EEST. */
      utcOffsetDST: z.number(),
    })
    .optional(),
  /** CSS object-position for the hero photo, e.g. "52% 48%". */
  heroObjectPosition: z.string(),
  /** Filenames inside /public/images/<project-id>/climate/ */
  images: z.object({
    winter: z.string(),
    spring: z.string(),
    summer: z.string(),
    autumn: z.string(),
  }),
  /** Exactly 12 entries, JAN through DEC in order. */
  months: z.array(climateMonthSchema).length(12),
});

/** Section 12 — the eight-beat Storytelling Framework. */
const beatSchema = z.object({
  /** Section 11.2 — the one question this beat/page answers. */
  question: localizedStringSchema,
  text: localizedStringSchema,
  assets: z.array(assetSchema).default([]),
  /** Section 21.3 — Not-Applicable Handling. */
  notApplicable: z.boolean().default(false),
});

export const projectSchema = z.object({
  id: z.string(),
  /** Proper noun / anonymized project code-name — not localized. */
  name: z.string(),
  typology: localizedStringSchema,
  location: z.string(),
  year: z.string(),
  status: z.string(),
  scale: z.string().optional(),

  /** Section 1.2 / 11.1 — required, exactly one sentence. */
  thesisSentence: localizedStringSchema,

  /** Section 22.1 — required, what this project proves that no other project proves. */
  differentiator: localizedStringSchema,

  /**
   * Filename inside /public/videos/<project-id>/. Optional — Hero (19.1)
   * falls back to the static hero image (the finalArchitecture beat's
   * first "exterior" asset) when a project has no hero video yet.
   */
  heroVideo: z.string().optional(),

  /** Real seasonal photo + 12-month solar/wind/temperature/rainfall instrument, Site beat. */
  climateInstrument: climateInstrumentSchema.optional(),

  beats: z.object({
    clientChallenge: beatSchema,
    site: beatSchema,
    constraints: beatSchema,
    designThinking: beatSchema,
    designAlternatives: beatSchema.extend({
      alternatives: z.array(alternativeSchema),
    }),
    finalDecision: beatSchema,
    finalArchitecture: beatSchema.extend({
      sectionLocator: sectionLocatorSchema.optional(),
    }),
    reflection: beatSchema,
  }),

  credits: z.object({
    role: localizedStringSchema,
    /** Software names — proper nouns, not localized. */
    tools: z.array(z.string()),
  }),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectAsset = z.infer<typeof assetSchema>;
export type ProjectAlternative = z.infer<typeof alternativeSchema>;
export type SectionLocator = z.infer<typeof sectionLocatorSchema>;
export type ClimateInstrument = z.infer<typeof climateInstrumentSchema>;
export type ClimateMonth = z.infer<typeof climateMonthSchema>;

/**
 * Authoring-time type for a project's source data (e.g. villa-red-sun.ts),
 * as opposed to `Project`, the fully-defaulted type produced by
 * `projectSchema.parse(...)` and consumed by components. Fields with a
 * Zod `.default()` (like `notApplicable`) are optional here and only
 * become guaranteed-present after parsing — this is what lets content
 * authors omit them per beat instead of restating `notApplicable: false`
 * everywhere (Section 21.2, Reusability Test).
 */
export type ProjectInput = z.input<typeof projectSchema>;
