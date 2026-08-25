"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Frame } from "@/components/project/frame";
import { t, type Project, type ProjectAsset } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Production modernization pass — Villa Red Sun only. Parallel to
 * AlternativesComparator (components/project/alternatives-comparator.tsx),
 * which is a tab-switcher and is a Protected Production Area (VISUAL-DNA.md
 * §26) still used unmodified by Villa Efe.
 *
 * Same underlying data — `project.beats.designAlternatives.alternatives`,
 * read live, nothing hardcoded — presented as one continuous asymmetric
 * sequence instead of tabs: B-2 and C-1 as compact evidence rows, D as a
 * visually heavier resolution moment. This mirrors the evidence asymmetry
 * already implemented for /about, restyled to the production Fraunces/
 * Inter tokens instead of that page's EB Garamond/Metrophobic.
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
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
      {assets.map((asset) => (
        <Frame
          key={asset.src}
          projectId={projectId}
          asset={asset}
          sizes="(min-width: 768px) 140px, 30vw"
          gallery={gallery}
          index={gallery.findIndex((a) => a.src === asset.src)}
          locale={locale}
          dict={dict}
        />
      ))}
    </div>
  );
}

export function AlternativesEditorial({
  project,
  locale = "en",
  dict,
}: {
  project: Project;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const { alternatives } = project.beats.designAlternatives;
  const b2 = alternatives.find((a) => a.id === "B-2");
  const c1 = alternatives.find((a) => a.id === "C-1");
  const d = alternatives.find((a) => a.id === "D");
  const reduced = useReducedMotion();

  const row = (alt: NonNullable<typeof b2>, index: number) => (
    <motion.div
      key={alt.id}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10 border-t border-divider first:border-t-0"
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
    >
      <div className="col-span-1">
        <span className="text-meta font-body text-neutral tracking-[0.15em] uppercase">{alt.id}</span>
      </div>
      <div className="col-span-1 md:col-span-3">
        <h4 className="font-display text-h2 text-ink mb-1">{t(alt.tier, locale)}</h4>
        <DiagramStrip projectId={project.id} assets={alt.assets} gallery={alt.assets} locale={locale} dict={dict} />
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-start-2 md:col-span-9 lg:col-start-3 lg:col-span-8">
          <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-5">
            {dict?.sections.designProcess ?? "05 — Design Process"}
          </p>
          <h2 className="font-display text-h1 text-ink mb-8 leading-tight">
            {t(project.beats.designAlternatives.question, locale)}
          </h2>
          <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed">
            {t(project.beats.designAlternatives.text, locale)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-start-1 md:col-span-11 lg:col-span-10">
          {b2 ? row(b2, 0) : null}
          {c1 ? row(c1, 1) : null}
        </div>
      </div>

      {d ? (
        <motion.div
          className="mt-6 border border-divider bg-paper p-8 md:p-12"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/*
            The full rationale lives in its own dedicated "06 — Final
            Decision" section immediately after this one (see
            villa-red-sun-production-page.tsx) — not repeated here, to
            avoid showing the same paragraph twice in a row. This box's
            job is the evidence (the tier line + images), matching how
            the B-2/C-1 rows above present their own tier + images.
          */}
          <span className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-3 block">
            {dict?.sections.selectedProposal ?? "Selected Proposal —"} {d.id}
          </span>
          <h3 className="font-display text-h1 text-ink mb-2 leading-tight">{t(d.label, locale)}</h3>
          <p className="font-body text-body text-ink/85 mb-10">{t(d.tier, locale)}</p>
          {d.assets[0] ? (
            <Frame
              projectId={project.id}
              asset={d.assets[0]}
              sizes="(min-width: 768px) 900px, 100vw"
              gallery={d.assets}
              index={0}
              locale={locale}
              dict={dict}
            />
          ) : null}
          <DiagramStrip projectId={project.id} assets={d.assets.slice(1)} gallery={d.assets} locale={locale} dict={dict} />
        </motion.div>
      ) : null}
    </section>
  );
}
