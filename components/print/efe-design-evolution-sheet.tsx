import { printImagePath } from "@/lib/utils";
import villaEfe from "@/content/projects/villa-efe";
import { Sheet, SheetFooter } from "./sheet";

/**
 * villa-efe-architectural-design-evolution_result.png — the one 8-panel
 * composite (early massing/wireframe through final detailing), kept as a
 * single image with its existing content/projects/villa-efe.ts caption,
 * exactly as already wired into the live site's Design Thinking beat.
 */
export function EfeDesignEvolutionSheet({ index }: { index: number }) {
  const asset = villaEfe.beats.designThinking.assets[0]!;

  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-5">
          Design Thinking — Design Development
        </p>
        {/* Item 16 (1st round) then item 4 (2nd round) — the 8-panel
            composite's own background was pure white; sitting directly
            on the sheet's cream page left a visible mismatched edge. The
            1st-round fix (a white card with a border) stopped the color
            clash but was itself then visibly a box/frame around the
            image — the 2nd round's exact objection. Real fix: the print
            JPEG's own background is recolored to the page's exact cream
            (scripts/prepare-print-assets.mjs's BACKGROUND_RECOLOR_FILES
            special case — the illustration's background is uniform
            near-white, safely swappable without touching any real
            content), so the image now sits directly on the page with no
            card, no border, no visible edge at all. */}
        <div className="flex-1 flex items-center">
          <img
            src={printImagePath("villa-efe", asset.src)}
            alt={asset.alt.en}
            className="w-full aspect-[16/9] object-contain"
          />
        </div>
        <p className="text-caption font-body text-neutral mt-3">{asset.caption?.en}</p>
        <SheetFooter left="Villa Efe" right="Design Thinking" index={index} />
      </div>
    </Sheet>
  );
}
