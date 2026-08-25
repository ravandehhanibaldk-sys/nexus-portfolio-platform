import { printImagePath } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";
import { Sheet, SheetFooter } from "@/components/print/sheet";

export function ProjectOpeningSheetLandscape({
  index,
  project,
  heroSrc,
  pageLabel,
}: {
  index: number;
  project: Project;
  heroSrc: string;
  pageLabel: string;
}) {
  return (
    <Sheet index={index} orientation="landscape">
      <div className="w-full" style={{ height: "140mm" }} data-el="hero">
        <img
          src={printImagePath(project.id, heroSrc)}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col px-[16mm] pt-[6mm] pb-[5mm]" data-el="textblock">
        <p className="pt-micro font-body text-neutral tracking-[0.15em] uppercase mb-1.5" data-el="eyebrow">
          {project.typology.en}
        </p>
        <h1 className="pt-headline font-display text-ink mb-1.5 leading-[1.05]" data-el="title">
          {project.name}
        </h1>
        <p className="pt-meta font-body text-ink/85 leading-snug max-w-[560px] mb-2.5" data-el="thesis">
          {project.thesisSentence.en}
        </p>
        <div className="pt-micro font-body text-neutral" data-el="roletools">
          <p className="mb-0.5">{project.credits.role.en}</p>
          <p>{project.credits.tools.join(" / ")}</p>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} />
      </div>
    </Sheet>
  );
}
