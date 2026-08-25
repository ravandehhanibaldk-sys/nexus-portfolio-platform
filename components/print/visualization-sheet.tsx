import { printImagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "./sheet";

/**
 * Selected exterior/interior renders — one large lead image plus a small
 * supporting set, not every render in the project (Section 10: curate for
 * what communicates something different, not for completeness).
 */
export function VisualizationSheet({
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
    <Sheet index={index} orientation="portrait">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-4">
          Visualization
        </p>
        <img
          src={printImagePath(projectId, lead.src)}
          alt={lead.alt.en}
          className="w-full aspect-[16/9] object-cover mb-2"
        />
        <p className="text-meta font-body text-neutral mb-6">{lead.caption?.en}</p>
        <div className="grid grid-cols-2 gap-4">
          {supporting.map((a) => (
            <div key={a.src}>
              <img
                src={printImagePath(projectId, a.src)}
                alt={a.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1.5"
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
