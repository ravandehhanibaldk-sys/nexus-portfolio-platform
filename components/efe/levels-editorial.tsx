"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Frame } from "@/components/project/frame";
import { t, type Project, type ProjectAsset } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Villa Efe production modernization pass — Phase 1. Parallel to
 * AlternativesComparator (components/project/alternatives-comparator.tsx),
 * which is a tab-switcher and a Protected Production Area still used
 * unmodified by Villa Red Sun's original page (n/a here — Red Sun now has
 * its own AlternativesEditorial too, but this file does not import it).
 *
 * Structurally different from Red Sun's AlternativesEditorial by design:
 * Villa Efe's four `alternatives` entries (basement / ground-floor /
 * first-floor / roof) are four EQUAL vertical levels of one built design —
 * none is `isFinal`, there is no "selected proposal" to give asymmetric
 * visual weight to. All four therefore get identical editorial treatment:
 * label, tier (real text, read live from
 * `project.beats.designAlternatives.alternatives`), and that level's real
 * diagram images — never invented, never reordered by importance.
 */
function DiagramStrip({
  projectId,
  assets,
  gallery,
  locale,
  dict,
}: {
  projectId: string;
  assets: ProjectAsset[];
  gallery: ProjectAsset[];
  locale: Locale;
  dict?: Dictionary;
}) {
  if (assets.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      {assets.map((asset) => (
        <Frame
          key={asset.src}
          projectId={projectId}
          asset={asset}
          sizes="(min-width: 768px) 220px, 45vw"
          gallery={gallery}
          index={gallery.findIndex((a) => a.src === asset.src)}
          locale={locale}
          dict={dict}
        />
      ))}
    </div>
  );
}

export function LevelsEditorial({
  project,
  locale = "en",
  dict,
}: {
  project: Project;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const { alternatives, question, text } = project.beats.designAlternatives;
  const reduced = useReducedMotion();

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-start-2 md:col-span-9 lg:col-start-3 lg:col-span-8">
          <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-5">
            {dict?.sections.designProcess ?? "05 — Design Process"}
          </p>
          <h2 className="font-display text-h1 text-ink mb-8 leading-tight">{t(question, locale)}</h2>
          <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed">{t(text, locale)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-start-1 md:col-span-11 lg:col-span-10">
          {alternatives.map((level, i) => (
            <motion.div
              key={level.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10 border-t border-divider first:border-t-0"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.05 }}
            >
              <div className="col-span-1">
                <span className="text-meta font-body text-neutral tracking-[0.15em] uppercase">{t(level.label, locale)}</span>
              </div>
              <div className="col-span-1 md:col-span-3">
                <h4 className="font-display text-h2 text-ink mb-1">{t(level.tier, locale)}</h4>
                <DiagramStrip projectId={project.id} assets={level.assets} gallery={level.assets} locale={locale} dict={dict} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
