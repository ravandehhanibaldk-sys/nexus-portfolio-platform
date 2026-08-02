import type { Metadata } from "next";
import villaEfe from "@/content/projects/villa-efe";
import { ProjectPage } from "@/components/project/project-page";

export const metadata: Metadata = {
  title: `${villaEfe.name} — Hanibal Ravandeh`,
  description: villaEfe.thesisSentence,
};

export default function VillaEfePage() {
  return <ProjectPage project={villaEfe} />;
}
