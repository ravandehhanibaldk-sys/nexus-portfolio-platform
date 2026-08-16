"use client";

import { motion } from "framer-motion";
import { Frame } from "./frame";
import type { ProjectAsset, SectionLocator as SectionLocatorData } from "@/lib/content-schema";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Phase 3C — Section Locator. All plans are shown at once, followed by the
 * two building sections — this is the complete architectural documentation
 * set (five plans + two sections for Villa Efe; one plan + two sections for
 * Villa Red Sun, since D is its only final proposal), not a tab-hidden
 * single-plan viewer. No overlay is drawn on the source images themselves;
 * the plan and section images are shown exactly as delivered by the
 * authoritative asset library.
 */
export function SectionLocator({
  projectId,
  data,
}: {
  projectId: string;
  data: SectionLocatorData;
}) {
  const { levels, sectionA, sectionB } = data;
  const gallery: ProjectAsset[] = [...levels.map((l) => l.plan), sectionA, sectionB];
  const indexOf = (src: string) => gallery.findIndex((a) => a.src === src);

  return (
    <div className="mb-16">
      <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
        Plans &amp; Sections
      </p>

      <div
        className={
          levels.length > 1
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            : "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-xl"
        }
      >
        {levels.map((level, i) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
          >
            <Frame
              projectId={projectId}
              asset={level.plan}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(level.plan.src)}
            />
            <p className="text-meta font-body text-neutral mt-2">{level.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-divider pt-8">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
          Sections
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Frame
              projectId={projectId}
              asset={sectionA}
              sizes="(min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(sectionA.src)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
          >
            <Frame
              projectId={projectId}
              asset={sectionB}
              sizes="(min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(sectionB.src)}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
