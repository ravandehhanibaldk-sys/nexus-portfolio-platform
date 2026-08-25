"use client";

import { ClimateInterface } from "@/components/project/climate-interface";
import { EnvironmentalDiagrams } from "@/components/project/environmental-diagrams";
import type { Project } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Villa Red Sun only. Content decision: the Site Analysis narrative
 * (heading + image grid) is intentionally not rendered for this project —
 * see villa-red-sun-production-page.tsx. This component now renders only
 * the Environmental Diagrams + Climate Interface that share the `#site`
 * anchor; the underlying `beats.site.assets` data and PNG files are left
 * untouched (not deleted), simply unused by this render path. The Climate
 * Interface below is rendered via the exact same import and props as
 * always — its component file, state, and behavior are untouched.
 *
 * Villa Efe's own site-analysis-editorial.tsx (which still renders the
 * full image grid) is a separate file and is not affected by this change.
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
  return (
    <>
      {project.climateInstrument ? (
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <EnvironmentalDiagrams data={project.climateInstrument} locale={locale} dict={dict} />
        </section>
      ) : null}
      {project.climateInstrument ? (
        <ClimateInterface data={project.climateInstrument} projectId={project.id} locale={locale} dict={dict} />
      ) : null}
    </>
  );
}
