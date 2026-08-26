"use client";

import { ClimateInterface } from "@/components/project/climate-interface";
import { Frame } from "@/components/project/frame";
import type { Project } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Villa Red Sun only. Content decision: the Site Analysis narrative
 * (heading + image grid) is intentionally not rendered for this project —
 * see villa-red-sun-production-page.tsx. This component renders the
 * Environmental Analysis image + Climate Interface that share the `#site`
 * anchor; the underlying `beats.site.assets` data and PNG files are left
 * untouched (not deleted), simply unused by this render path. The Climate
 * Interface below is rendered via the exact same import and props as
 * always — its component file, state, and behavior are untouched.
 *
 * The previous interactive Month/Season Selector + 9-card instrument-
 * panel system (EnvironmentalDiagrams, solar-diagram.tsx, wind-diagram.tsx
 * — all removed from the codebase) is replaced with a single static
 * Environmental Analysis image (project.climateInstrument.
 * environmentalAnalysis), per Hanibal's repeated request. Same asset
 * already used by the PDF's EnvironmentalSheet. Image is locale-agnostic
 * (verified to carry no location-identifying text before adoption), so
 * the same file renders on both /en and /da — only its `alt` text and
 * this section's own eyebrow label are localized.
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
          <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-3">
            {dict?.sections.environmentalAnalysis ?? "Environmental Analysis"}
          </p>
          <Frame
            projectId={project.id}
            asset={project.climateInstrument.environmentalAnalysis}
            gallery={[project.climateInstrument.environmentalAnalysis]}
            locale={locale}
            dict={dict}
          />
        </section>
      ) : null}
      {project.climateInstrument ? (
        <ClimateInterface data={project.climateInstrument} projectId={project.id} locale={locale} dict={dict} />
      ) : null}
    </>
  );
}
