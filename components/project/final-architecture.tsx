"use client";

import { motion } from "framer-motion";
import { Frame } from "./frame";
import { SectionLocator } from "./section-locator";
import type { Project } from "@/lib/content-schema";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Combines Component 19.5/19.6 (Plan/Section) and 19.8 (Render Gallery).
 * Section 12 — Final Architecture appears only after the reasoning that
 * justifies it (Client Challenge → ... → Final Decision has already run).
 * The Hero (19.1) and this gallery may share the same source asset — the
 * gallery always stays complete and evenly balanced rather than dropping
 * whichever render the Hero happens to reuse.
 *
 * Narrative order (documentation before photography): the interactive
 * Section Locator (plan-with-cut-lines ↔ sections) → exterior renders →
 * interior renders → any other final-architecture asset not covered above.
 * Section/orientation-plan assets live in `beat.sectionLocator` (Phase 3B),
 * not in `beat.assets` — they belong here, documenting what was built, not
 * in the Comparator (Section 05), which is proposal/level analysis.
 */
export function FinalArchitecture({ project }: { project: Project }) {
  const beat = project.beats.finalArchitecture;
  const exteriors = beat.assets.filter((a) => a.category === "exterior");
  const interiors = beat.assets.filter((a) => a.category === "interior");
  const covered = new Set([...exteriors, ...interiors].map((a) => a.src));
  const remaining = beat.assets.filter((a) => !covered.has(a.src));
  // One continuous lightbox sequence spanning the whole beat, in narrative order.
  const gallery = [...exteriors, ...interiors, ...remaining];
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

      {beat.sectionLocator ? (
        <SectionLocator projectId={project.id} data={beat.sectionLocator} />
      ) : null}

      <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
        Exterior &amp; Interior Architecture
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...exteriors, ...interiors].map((asset, i) => (
          <motion.div
            key={asset.src}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
          >
            <Frame
              projectId={project.id}
              asset={asset}
              sizes="(min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(asset.src)}
            />
          </motion.div>
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
