import "../print.css";
import villaRedSun from "@/content/projects/villa-red-sun";
import villaEfe from "@/content/projects/villa-efe";
import { CoverSheet } from "@/components/print/cover-sheet";
import { AboutSheet } from "@/components/print/about-sheet";
import { ProjectOpeningSheet } from "@/components/print/project-opening-sheet";
import { NarrativeSheet } from "@/components/print/narrative-sheet";
import { RedSunComparisonSheet } from "@/components/print/red-sun-comparison-sheet";
import { EfeLevelsSheet } from "@/components/print/efe-levels-sheet";
import { EfeDesignEvolutionSheet } from "@/components/print/efe-design-evolution-sheet";
import { PlansSectionsSheet } from "@/components/print/plans-sections-sheet";
import { EnvironmentalSheet } from "@/components/print/environmental-sheet";
import { VisualizationSheet } from "@/components/print/visualization-sheet";

/**
 * First professional PDF draft — internal review version (TASK: Build
 * First Professional Portfolio PDF Draft, 2026-08-20). Standalone route,
 * never linked from the live site, English-only. Captured by
 * scripts/export-pdf.mjs, not meant to be browsed directly by visitors.
 */
export default function PrintPortfolioPage() {
  const rsAssets = villaRedSun.beats.finalArchitecture.assets;
  const rsPlan = villaRedSun.beats.finalArchitecture.sectionLocator!.levels[0]!.plan;
  const rsSiteImg = villaRedSun.beats.site.assets[0]!;

  const efAssets = villaEfe.beats.finalArchitecture.assets;
  const efSiteLevel = villaEfe.beats.finalArchitecture.sectionLocator!.levels.find((l) => l.id === "site")!;

  const find = (assets: typeof rsAssets, src: string) => assets.find((a) => a.src === src)!;

  return (
    <div className="print-root">
      <CoverSheet index={0} />
      <AboutSheet index={1} />

      <ProjectOpeningSheet
        index={2}
        project={villaRedSun}
        heroSrc="A-01-villa-red-sun-exterior-view-01_result.png"
        pageLabel="Villa Red Sun"
      />
      <NarrativeSheet
        index={3}
        project={villaRedSun}
        pageLabel="Villa Red Sun"
        siteImageSrc={rsSiteImg.src}
        siteImageAlt={rsSiteImg.alt.en}
        siteImageCaption={rsSiteImg.caption?.en}
      />
      <RedSunComparisonSheet index={4} />
      <PlansSectionsSheet
        index={5}
        projectId="villa-red-sun"
        pageLabel="Villa Red Sun"
        plan={rsPlan}
        sectionA={villaRedSun.beats.finalArchitecture.sectionLocator!.sectionA}
        sectionB={villaRedSun.beats.finalArchitecture.sectionLocator!.sectionB}
      />
      <EnvironmentalSheet
        index={6}
        pageLabel="Villa Red Sun"
        projectId="villa-red-sun"
        imageSrc="villa-red-sun-environmental_result.png"
      />
      <VisualizationSheet
        index={7}
        projectId="villa-red-sun"
        pageLabel="Villa Red Sun"
        lead={find(rsAssets, "A-03-villa-red-sun-exterior-view-03_result.png")}
        supporting={[
          find(rsAssets, "A-02-villa-red-sun-exterior-view-02_result.png"),
          find(rsAssets, "A-06-villa-red-sun-interior-dining-room-01_result.png"),
          find(rsAssets, "A-07-villa-red-sun-interior-kitchen-01_result.png"),
          find(rsAssets, "A-08-villa-red-sun-interior-master-bedroom-01_result.png"),
        ]}
      />

      <ProjectOpeningSheet
        index={8}
        project={villaEfe}
        heroSrc="B-01-villa-efe-exterior-view-01_result.png"
        pageLabel="Villa Efe"
      />
      <NarrativeSheet
        index={9}
        project={villaEfe}
        pageLabel="Villa Efe"
      />
      <EfeDesignEvolutionSheet index={10} />
      <EfeLevelsSheet index={11} />
      <PlansSectionsSheet
        index={12}
        projectId="villa-efe"
        pageLabel="Villa Efe"
        plan={efSiteLevel.plan}
        sectionA={villaEfe.beats.finalArchitecture.sectionLocator!.sectionA}
        sectionB={villaEfe.beats.finalArchitecture.sectionLocator!.sectionB}
      />
      <EnvironmentalSheet
        index={13}
        pageLabel="Villa Efe"
        projectId="villa-efe"
        imageSrc="villa-efe-environmental_result.png"
      />
      <VisualizationSheet
        index={14}
        projectId="villa-efe"
        pageLabel="Villa Efe"
        lead={find(efAssets, "B-03-villa-efe-exterior-view-03_result.png")}
        supporting={[
          find(efAssets, "B-02-villa-efe-exterior-view-02_result.png"),
          find(efAssets, "B-05-villa-efe-interior-pool-side_result.png"),
          find(efAssets, "B-07-villa-efe-interior-living-room_result.png"),
          find(efAssets, "B-09-villa-efe-interior-master-bedroom_result.png"),
        ]}
      />
    </div>
  );
}
