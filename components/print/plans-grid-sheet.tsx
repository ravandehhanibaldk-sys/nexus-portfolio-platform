import { printImagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { Sheet, SheetFooter } from "./sheet";

/**
 * PLANS-SECTIONS-SPLIT — Villa Efe dedicated PLANS page. The previous
 * single Plans & Sections page could only show one level's plan (Site)
 * even though the project has five (Basement/Ground Floor/First Floor/
 * Roof Terrace/Site) — incomplete given the level-indicator strip listed
 * all five. This shows all five, each fully visible (`object-contain`,
 * same no-crop discipline as the Plans & Sections fix), in a 3-over-2
 * grid sized so every cell is the same size regardless of row (the
 * second row's third grid cell is left empty rather than stretching its
 * two real images larger than row one's three — consistent cell size
 * across the page reads as one coherent set, not two different scales).
 * Villa Red Sun is untouched — it has only one sectionLocator level and
 * keeps using `plans-sections-sheet.tsx` exactly as before.
 */
export function PlansGridSheet({
  index,
  projectId,
  pageLabel,
  levels,
}: {
  index: number;
  projectId: string;
  pageLabel: string;
  levels: { id: string; label: { en: string }; plan: ProjectAsset }[];
}) {
  const firstRow = levels.slice(0, 3);
  const secondRow = levels.slice(3);

  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-4">
          Final Architecture — Plans
        </p>
        <div className="flex-1 min-h-0 flex flex-col gap-[8mm]">
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-[6mm]">
            {firstRow.map((level) => (
              <PlanCell key={level.id} projectId={projectId} level={level} />
            ))}
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-[6mm]">
            {secondRow.map((level) => (
              <PlanCell key={level.id} projectId={projectId} level={level} />
            ))}
          </div>
        </div>
        <SheetFooter left={pageLabel} right="Final Architecture" />
      </div>
    </Sheet>
  );
}

function PlanCell({
  projectId,
  level,
}: {
  projectId: string;
  level: { id: string; label: { en: string }; plan: ProjectAsset };
}) {
  return (
    <div className="min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        <img
          src={printImagePath(projectId, level.plan.src)}
          alt={level.plan.alt.en}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="pt-micro shrink-0 font-body text-accent tracking-[0.08em] uppercase mt-1.5">
        {level.label.en}
      </p>
      <p className="pt-micro shrink-0 font-body text-neutral mt-0.5">{level.plan.caption?.en}</p>
    </div>
  );
}
