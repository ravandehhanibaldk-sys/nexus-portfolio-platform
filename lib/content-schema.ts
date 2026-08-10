import { z } from "zod";

/**
 * Project Template Specification — NPP Master Design Specification v3.0, Section 21.
 * This schema is the platform's Single Source of Truth for what a "project" is.
 * Every project added to the platform (Section 22, Project Comparison Framework)
 * must validate against this schema. The schema's shape must not need to change
 * to accommodate a structurally different project (Section 21.2, Reusability Test) —
 * only its values change.
 */

const assetSchema = z.object({
  /** Filename inside /public/images/<project-id>/ */
  src: z.string(),
  /** Section 11.3 — every image must have a stated reason for inclusion. */
  alt: z.string().min(1, "Every asset requires alt text (Section 11.3, Section 20.2.5)"),
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
  caption: z.string().optional(),
});

const alternativeSchema = z.object({
  /** e.g. "B-2", "C-1", "D" */
  id: z.string(),
  label: z.string(),
  /** Section 12 — cost/quality tier this proposal belongs to. */
  tier: z.string(),
  isFinal: z.boolean().default(false),
  assets: z.array(assetSchema),
});

/** Section 12 — the eight-beat Storytelling Framework. */
const beatSchema = z.object({
  /** Section 11.2 — the one question this beat/page answers. */
  question: z.string(),
  text: z.string(),
  assets: z.array(assetSchema).default([]),
  /** Section 21.3 — Not-Applicable Handling. */
  notApplicable: z.boolean().default(false),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  typology: z.string(),
  location: z.string(),
  year: z.string(),
  status: z.string(),
  scale: z.string().optional(),

  /** Section 1.2 / 11.1 — required, exactly one sentence. */
  thesisSentence: z.string().min(1),

  /** Section 22.1 — required, what this project proves that no other project proves. */
  differentiator: z.string().min(1),

  /**
   * Filename inside /public/videos/<project-id>/. Optional — Hero (19.1)
   * falls back to the static hero image (the finalArchitecture beat's
   * first "exterior" asset) when a project has no hero video yet.
   */
  heroVideo: z.string().optional(),

  beats: z.object({
    clientChallenge: beatSchema,
    site: beatSchema,
    constraints: beatSchema,
    designThinking: beatSchema,
    designAlternatives: beatSchema.extend({
      alternatives: z.array(alternativeSchema),
    }),
    finalDecision: beatSchema,
    finalArchitecture: beatSchema,
    reflection: beatSchema,
  }),

  credits: z.object({
    role: z.string(),
    tools: z.array(z.string()),
  }),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectAsset = z.infer<typeof assetSchema>;
export type ProjectAlternative = z.infer<typeof alternativeSchema>;

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
