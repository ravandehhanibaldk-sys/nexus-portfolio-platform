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
        <div className="flex-1 flex items-center">
          <img
            src={printImagePath("villa-efe", asset.src)}
            alt={asset.alt.en}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
        <p className="text-caption font-body text-neutral mt-3">{asset.caption?.en}</p>
        <SheetFooter left="Villa Efe" right="Design Thinking" />
      </div>
    </Sheet>
  );
}
