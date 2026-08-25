import { t, type Project } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Component 19.9 — Reflection. Visually distinct from Narrative Text Block
 * (19.2) so the reader feels the project has concluded. Governs the 5-minute
 * psychology checkpoint (Section 08).
 */
export function Reflection({ project, locale = "en", dict }: { project: Project; locale?: Locale; dict?: Dictionary }) {
  const beat = project.beats.reflection;
  return (
    <section className="bg-paper-dark text-ink-dark">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
          {dict?.sections.reflection ?? "08 — Reflection"}
        </p>
        <h2 className="font-display text-h1 mb-8 leading-tight">
          {t(beat.question, locale)}
        </h2>
        <p className="prose-narrative text-body font-body text-ink-dark/85 leading-relaxed">
          {t(beat.text, locale)}
        </p>
      </div>
    </section>
  );
}
