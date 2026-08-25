"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Frame } from "./frame";
import { groupIntoBalancedRows } from "@/lib/grid-layout";
import { t, type ProjectAsset, type SectionLocator as SectionLocatorData } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Plans Grid column cap per breakpoint (Workstream 2 visual-polish pass,
 * Issue 3). Defaults to the desktop cap for the SSR/first-paint render
 * (matching the client's own initial render exactly, so this is a normal
 * post-mount state update, not a hydration mismatch) and corrects to the
 * real viewport on mount + resize.
 */
function usePlansMaxColumns(): number {
  const [maxColumns, setMaxColumns] = useState(4);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 4;
    };
    const update = () => setMaxColumns(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return maxColumns;
}

/**
 * Phase 3C — Section Locator. All plans are shown at once, followed by the
 * two building sections — this is the complete architectural documentation
 * set (five plans + two sections for Villa Efe; one plan + two sections for
 * Villa Red Sun, since D is its only final proposal), not a tab-hidden
 * single-plan viewer. No overlay is drawn on the source images themselves;
 * the plan and section images are shown exactly as delivered by the
 * authoritative asset library.
 *
 * Plans Grid (Workstream 2 visual-polish pass, Issue 3): a single plan is
 * centered at the same width as a Section image below it (no left-anchored
 * empty second column). Multiple plans are grouped into balanced rows via
 * `groupIntoBalancedRows` (lib/grid-layout.ts) — a pure, count/column-driven
 * function with no per-project branching, so it behaves the same for any
 * project regardless of how many plan images it has.
 */
export function SectionLocator({
  projectId,
  data,
  locale = "en",
  dict,
}: {
  projectId: string;
  data: SectionLocatorData;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const { levels, sectionA, sectionB } = data;
  const gallery: ProjectAsset[] = [...levels.map((l) => l.plan), sectionA, sectionB];
  const indexOf = (src: string) => gallery.findIndex((a) => a.src === src);
  const maxColumns = usePlansMaxColumns();

  return (
    <div className="mb-16">
      <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
        {dict?.sections.plansAndSections ?? "Plans & Sections"}
      </p>

      {levels.length === 1 && levels[0] ? (
        <div className="flex justify-center mb-10">
          <motion.div
            className="w-full sm:w-[calc(50%-12px)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Frame
              projectId={projectId}
              asset={levels[0].plan}
              sizes="(min-width: 640px) 50vw, 100vw"
              gallery={gallery}
              index={indexOf(levels[0].plan.src)}
              locale={locale}
              dict={dict}
            />
            <p className="text-meta font-body text-neutral mt-2 text-center">{t(levels[0].label, locale)}</p>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-10">
          {groupIntoBalancedRows(levels, maxColumns).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
            >
              {row.map((level, i) => (
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    gallery={gallery}
                    index={indexOf(level.plan.src)}
                    locale={locale}
                    dict={dict}
                  />
                  <p className="text-meta font-body text-neutral mt-2">{t(level.label, locale)}</p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-divider pt-8">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
          {dict?.sections.sectionsLabel ?? "Sections"}
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
              locale={locale}
              dict={dict}
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
              locale={locale}
              dict={dict}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
