import "../print-landscape-redesign.css";
import villaRedSun from "@/content/projects/villa-red-sun";
import villaEfe from "@/content/projects/villa-efe";
import { RedSunComparisonSheetLandscape } from "@/components/print-landscape/red-sun-comparison-sheet-landscape";
import { EfeLevelsSheet } from "@/components/print/efe-levels-sheet";
import { EfeDesignEvolutionSheet } from "@/components/print/efe-design-evolution-sheet";
import { PlansSectionsSheet } from "@/components/print/plans-sections-sheet";
import { PlansGridSheet } from "@/components/print/plans-grid-sheet";
import { SectionsOnlySheet } from "@/components/print/sections-only-sheet";
import { EnvironmentalSheet } from "@/components/print/environmental-sheet";
import { CoverSheetLandscape } from "@/components/print-landscape/cover-sheet-landscape";
import { AboutSheetLandscape } from "@/components/print-landscape/about-sheet-landscape";
import { ProjectOpeningSheetLandscape } from "@/components/print-landscape/project-opening-sheet-landscape";
import { NarrativeSheetLandscape } from "@/components/print-landscape/narrative-sheet-landscape";
import { VisualizationSheetLandscape } from "@/components/print-landscape/visualization-sheet-landscape";
import { ReflectionSheetLandscape } from "@/components/print-landscape/reflection-sheet-landscape";

export default function TestFullLandscapeRedesignPage() {
  const rsAssets = villaRedSun.beats.finalArchitecture.assets;
  const rsPlan = villaRedSun.beats.finalArchitecture.sectionLocator!.levels[0]!.plan;
  const rsSiteImg = villaRedSun.beats.site.assets[0]!;

  const efAssets = villaEfe.beats.finalArchitecture.assets;
  const efSiteImg = villaEfe.beats.site.assets[0]!;

  const find = (assets: typeof rsAssets, src: string) => assets.find((a) => a.src === src)!;

  return (
    <div className="print-root">
      <CoverSheetLandscape index={0} />
      <AboutSheetLandscape index={1} />

      <ProjectOpeningSheetLandscape
        index={2}
        project={villaRedSun}
        heroSrc="A-01-villa-red-sun-exterior-view-01_result.png"
        pageLabel="Villa Red Sun"
      />
      <NarrativeSheetLandscape
        index={3}
        project={villaRedSun}
        pageLabel="Villa Red Sun"
        siteImageSrc={rsSiteImg.src}
        siteImageAlt={rsSiteImg.alt.en}
        siteImageCaption={rsSiteImg.caption?.en}
      />
      <RedSunComparisonSheetLandscape index={4} />
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
      <VisualizationSheetLandscape
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
      <ReflectionSheetLandscape index={8} project={villaRedSun} pageLabel="Villa Red Sun" />

      <ProjectOpeningSheetLandscape
        index={9}
        project={villaEfe}
        heroSrc="B-01-villa-efe-exterior-view-01_result.png"
        pageLabel="Villa Efe"
      />
      <NarrativeSheetLandscape
        index={10}
        project={villaEfe}
        pageLabel="Villa Efe"
        siteImageSrc={efSiteImg.src}
        siteImageAlt={efSiteImg.alt.en}
        siteImageCaption={efSiteImg.caption?.en}
      />
      <EfeDesignEvolutionSheet index={11} />
      <EfeLevelsSheet index={12} />
      <PlansGridSheet
        index={13}
        projectId="villa-efe"
        pageLabel="Villa Efe"
        levels={villaEfe.beats.finalArchitecture.sectionLocator!.levels}
      />
      <SectionsOnlySheet
        index={14}
        projectId="villa-efe"
        pageLabel="Villa Efe"
        sectionA={villaEfe.beats.finalArchitecture.sectionLocator!.sectionA}
        sectionB={villaEfe.beats.finalArchitecture.sectionLocator!.sectionB}
      />
      <EnvironmentalSheet
        index={15}
        pageLabel="Villa Efe"
        projectId="villa-efe"
        imageSrc="villa-efe-environmental_result.png"
      />
      <VisualizationSheetLandscape
        index={16}
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
      <ReflectionSheetLandscape index={17} project={villaEfe} pageLabel="Villa Efe" />
    </div>
  );
}
