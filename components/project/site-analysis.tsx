import { Frame } from "./frame";
import type { Project } from "@/lib/content-schema";

/**
 * Component 19.3 — Site Analysis. One or two images side-by-side on desktop,
 * stacking on mobile (Section 23.2).
 */
export function SiteAnalysis({ project }: { project: Project }) {
  const beat = project.beats.site;
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beat.assets.map((asset, i) => (
          <Frame
            key={asset.src}
            projectId={project.id}
            asset={asset}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            gallery={beat.assets}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
