import { t, type Project } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Component 19.9 — Reflection. Visually distinct from Narrative Text Block
 * (19.2) so the reader feels the project has concluded. Governs the 5-minute
 * psychology checkpoint (Section 08).
 *
 * ADR-010 supersedes ADR-006: moved from the bg-paper-dark/text-ink-dark
 * "Hero bookend" treatment to the standard light paper tokens, per explicit
 * direction (2026-08-25) — the dark block read as a jarring full-bleed
 * color change this late in the reading flow, closer to an error state than
 * a deliberate close. The "project has concluded" signal Component 19.9's
 * brief asks for is now carried by typography alone: an italic display
 * heading (the only italic heading anywhere in the beat sequence), wider
 * eyebrow letter-spacing, and a 2px accent top rule marking the section
 * boundary — no color-block required to read as distinct.
 */
export function Reflection({ project, locale = "en", dict }: { project: Project; locale?: Locale; dict?: Dictionary }) {
  const beat = project.beats.reflection;
  return (
    <section className="bg-paper text-ink border-t-2 border-accent">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <p className="text-meta font-body text-accent tracking-[0.2em] uppercase mb-4">
          {dict?.sections.reflection ?? "08 — Reflection"}
        </p>
        <h2 className="font-display italic text-h1 mb-8 leading-tight">
          {t(beat.question, locale)}
        </h2>
        <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed">
          {t(beat.text, locale)}
        </p>
      </div>
    </section>
  );
}
