import type { Project } from "@/lib/content-schema";

/**
 * Component 19.9 — Reflection. Visually distinct from Narrative Text Block
 * (19.2) so the reader feels the project has concluded. Governs the 5-minute
 * psychology checkpoint (Section 08).
 */
export function Reflection({ project }: { project: Project }) {
  const beat = project.beats.reflection;
  return (
    <section className="bg-paper-dark text-ink-dark">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
          08 — Reflection
        </p>
        <h2 className="font-display text-h1 mb-8 leading-tight">
          {beat.question}
        </h2>
        <p className="prose-narrative text-body font-body text-ink-dark/85 leading-relaxed">
          {beat.text}
        </p>
      </div>
    </section>
  );
}
