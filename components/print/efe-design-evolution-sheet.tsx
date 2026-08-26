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
        {/* item 16 — the 8-panel composite's own background is pure
            white; sitting directly on the sheet's cream page background
            left a visible mismatched edge. Wrapped in an explicit white
            card (matching padding on all sides) so the image's white
            blends seamlessly into the card instead of clashing with
            cream — reads as a deliberate framed plate, not a color
            mismatch. */}
        <div className="flex-1 flex items-center">
          <div className="w-full bg-white border border-divider p-[6mm]">
            <img
              src={printImagePath("villa-efe", asset.src)}
              alt={asset.alt.en}
              className="w-full aspect-[16/9] object-contain"
            />
          </div>
        </div>
        <p className="text-caption font-body text-neutral mt-3">{asset.caption?.en}</p>
        <SheetFooter left="Villa Efe" right="Design Thinking" index={index} />
      </div>
    </Sheet>
  );
}
