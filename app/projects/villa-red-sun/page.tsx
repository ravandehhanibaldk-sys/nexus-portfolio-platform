import type { Metadata } from "next";
import villaRedSun from "@/content/projects/villa-red-sun";
import { ProjectPage } from "@/components/project/project-page";
import { ModelExportTest } from "@/components/dev/model-export-test";

export const metadata: Metadata = {
  title: `${villaRedSun.name} — Hanibal Ravandeh`,
  description: villaRedSun.thesisSentence,
};

export default function VillaRedSunPage() {
  return (
    <>
      <ProjectPage project={villaRedSun} />
      {/* TEMPORARY — Phase 3D live 3D export test. Remove this line + the
          component file to fully revert; nothing else in the page changed. */}
      <ModelExportTest />
    </>
  );
}
