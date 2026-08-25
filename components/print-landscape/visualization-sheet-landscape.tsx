import { printImagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "@/components/print/sheet";

export function VisualizationSheetLandscape({
  index,
  projectId,
  pageLabel,
  lead,
  supporting,
}: {
  index: number;
  projectId: string;
  pageLabel: string;
  lead: ProjectAsset;
  supporting: ProjectAsset[];
}) {
  return (
    <Sheet index={index} orientation="landscape">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-3">
          Visualization
        </p>
        <div style={{ height: "110mm" }} className="w-full shrink-0">
          <img
            src={printImagePath(projectId, lead.src)}
            alt={lead.alt.en}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-meta font-body text-neutral mt-1.5 mb-3">{lead.caption?.en}</p>
        <div className="grid grid-cols-4 gap-[6mm]">
          {supporting.map((a) => (
            <div key={a.src}>
              <img
                src={printImagePath(projectId, a.src)}
                alt={a.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1"
              />
              <p className="text-meta font-body text-neutral">{a.caption?.en}</p>
            </div>
          ))}
        </div>
        <SheetFooter left={pageLabel} right="Visualization" />
      </SheetPad>
    </Sheet>
  );
}
