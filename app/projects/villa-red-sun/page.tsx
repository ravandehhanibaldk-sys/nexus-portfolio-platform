import type { Metadata } from "next";
import villaRedSun from "@/content/projects/villa-red-sun";
import { ProjectPage } from "@/components/project/project-page";

export const metadata: Metadata = {
  title: `${villaRedSun.name} — Hanibal Ravandeh`,
  description: villaRedSun.thesisSentence,
};

export default function VillaRedSunPage() {
  return (
    <>
      <ProjectPage project={villaRedSun} />
    </>
  );
}
