import { printImagePath } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";
import { Sheet, SheetFooter } from "./sheet";

/**
 * Per-project opening — first exterior render as hero (Section 9), title,
 * typology, thesis sentence, and the project's own real `credits.role` /
 * `credits.tools` (never an invented title). Reused for both projects.
 */
export function ProjectOpeningSheet({
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
    <Sheet index={index} orientation="portrait">
      <div className="w-full" style={{ height: "62%" }}>
        <img
          src={printImagePath(project.id, heroSrc)}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col px-[16mm] pt-[10mm] pb-[10mm]">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-3">
          {project.typology.en}
        </p>
        <h1 className="font-display text-h1 text-ink mb-4 leading-[1.05]">
          {project.name}
        </h1>
        <p className="prose-narrative font-body text-body text-ink/85 leading-relaxed mb-6">
          {project.thesisSentence.en}
        </p>
        <div className="mt-auto text-caption font-body text-neutral">
          <p className="mb-1">{project.credits.role.en}</p>
          <p>{project.credits.tools.join(" / ")}</p>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} />
      </div>
    </Sheet>
  );
}
