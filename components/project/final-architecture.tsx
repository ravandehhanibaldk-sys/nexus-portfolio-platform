import { Frame } from "./frame";
import type { Project } from "@/lib/content-schema";

/**
 * Combines Component 19.5/19.6 (Plan/Section) and 19.8 (Render Gallery).
 * Section 12 — Final Architecture appears only after the reasoning that
 * justifies it (Client Challenge → ... → Final Decision has already run).
 * The Hero (19.1) and this gallery may share the same source asset — the
 * gallery always stays complete and evenly balanced rather than dropping
 * whichever render the Hero happens to reuse.
 *
 * Narrative order (documentation before photography): Sections A/B → the
 * illustrated final plan → exterior renders → interior renders → any other
 * final-architecture asset not covered above. The illustrated plan lives
 * here rather than in the Comparator (Section 05) — Design Process is
 * about comparing alternatives; Final Architecture is about documenting
 * what was actually built.
 */
export function FinalArchitecture({ project }: { project: Project }) {
  const beat = project.beats.finalArchitecture;
  const drawings = beat.assets.filter(
    (a) => a.category === "section" || a.category === "plan"
  );
  const exteriors = beat.assets.filter((a) => a.category === "exterior");
  const interiors = beat.assets.filter((a) => a.category === "interior");
  const covered = new Set([...drawings, ...exteriors, ...interiors].map((a) => a.src));
  const remaining = beat.assets.filter((a) => !covered.has(a.src));
  // One continuous lightbox sequence spanning the whole beat, in narrative order.
  const gallery = [...drawings, ...exteriors, ...interiors, ...remaining];
  const indexOf = (src: string) => gallery.findIndex((a) => a.src === src);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
        07 — Final Architecture
      </p>
      <h2 className="font-display text-h1 text-ink mb-6 leading-tight">
        {beat.question}
      </h2>
      <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed mb-12">
        {beat.text}
      </p>

      {drawings.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {drawings.map((asset) => (
            <Frame
              key={asset.src}
              projectId={project.id}
              asset={asset}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(asset.src)}
            />
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...exteriors, ...interiors].map((asset) => (
          <Frame
            key={asset.src}
            projectId={project.id}
            asset={asset}
            sizes="(min-width: 640px) 50vw, 100vw"
            gallery={gallery}
            index={indexOf(asset.src)}
          />
        ))}
      </div>

      {remaining.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {remaining.map((asset) => (
            <Frame
              key={asset.src}
              projectId={project.id}
              asset={asset}
              sizes="(min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(asset.src)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
