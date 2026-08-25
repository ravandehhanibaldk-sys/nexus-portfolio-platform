"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Frame } from "@/components/project/frame";
import { ClimateInterface } from "@/components/project/climate-interface";
import { EnvironmentalDiagrams } from "@/components/project/environmental-diagrams";
import type { Project } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Villa Efe production modernization pass — Phase 1, mirroring the
 * approved Villa Red Sun pattern (components/red-sun/site-analysis-editorial.tsx).
 *
 * The Climate Interface below is rendered via the exact same import and
 * props as production always used — its file, state, and behavior are
 * untouched. No `priority` is set on these below-the-fold images (a real
 * bug caught and fixed in the Red Sun pass — priority is reserved for the
 * Hero's own above-the-fold image, not applied here).
 */
export function SiteAnalysisEditorial({
  project,
  locale = "en",
  dict,
}: {
  project: Project;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const beat = project.beats.site;
  const reduced = useReducedMotion();
  const [lead, ...rest] = beat.assets;

  return (
    <>
    <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
      {lead ? (
        <motion.div
          className="mb-6"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Frame
            projectId={project.id}
            asset={lead}
            sizes="100vw"
            gallery={beat.assets}
            index={0}
            locale={locale}
            dict={dict}
          />
        </motion.div>
      ) : null}
      {rest.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((asset, i) => (
            <motion.div
              key={asset.src}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <Frame
                projectId={project.id}
                asset={asset}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                gallery={beat.assets}
                index={i + 1}
                locale={locale}
                dict={dict}
              />
            </motion.div>
          ))}
        </div>
      ) : null}
      {project.climateInstrument ? (
        <div className="mt-16">
          <EnvironmentalDiagrams data={project.climateInstrument} locale={locale} dict={dict} />
        </div>
      ) : null}
    </section>
    {project.climateInstrument ? (
      <ClimateInterface data={project.climateInstrument} projectId={project.id} locale={locale} dict={dict} />
    ) : null}
    </>
  );
}
