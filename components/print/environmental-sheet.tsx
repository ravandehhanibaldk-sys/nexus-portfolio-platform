import { printImagePath } from "@/lib/utils";
import { Sheet, SheetFooter } from "./sheet";

/**
 * ENVIRONMENTAL-ANALYSIS-APPROVED-GRAPHICS — replaces the previous
 * component-built analytical plate (Solar Path + Wind Flow diagrams,
 * assembled from live `getSolarGeometry()`/`parseWindLabel()` data via
 * `solar-diagram.tsx`/`wind-diagram.tsx`) with a single finished graphic
 * per project, produced and approved externally:
 * `villa-red-sun-environmental_result.png` / `villa-efe-environmental_
 * result.png` (public/images/<project>/, print JPEG in public/images-
 * print/<project>/ per the existing prepare-print-assets.mjs convention).
 * Both source PNGs are already the same 1920x1080 (16:9) as every other
 * asset in the project. No diagram is assembled here anymore — the image
 * already contains its own real data (the same January figures the
 * previous version rendered) baked in by whoever produced it, including
 * its own "MODEL"/honesty-note disclosures — nothing is added, invented,
 * or interpreted on top of it. `object-contain` guarantees the full
 * graphic is always visible, never cropped, regardless of exact page
 * height available on a given sheet.
 */
export function EnvironmentalSheet({
  index,
  pageLabel,
  projectId,
  imageSrc,
}: {
  index: number;
  pageLabel: string;
  projectId: string;
  imageSrc: string;
}) {
  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-4">
          Environmental Analysis — January
        </p>
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <img
            src={printImagePath(projectId, imageSrc)}
            alt={`Environmental analysis, ${pageLabel}, January.`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <SheetFooter left={pageLabel} right="Environmental Analysis — January" />
      </div>
    </Sheet>
  );
}
