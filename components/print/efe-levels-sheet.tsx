import { printImagePath } from "@/lib/utils";
import villaEfe from "@/content/projects/villa-efe";
import { Sheet, SheetFooter } from "./sheet";

/**
 * Villa Efe's organizing idea (Section 12, Design Thinking beat): four
 * privacy-graded levels — basement, ground floor, first floor, roof
 * terrace — resolved independently then tied by one vertical core. Four
 * floor plans in sequence is the direct architectural evidence for that
 * claim; airflow/circulation/privacy diagrams per level exist in source
 * but are not repeated here to avoid diluting the single clear idea.
 *
 * Draft 02, Page 12 layout decision: 2x2 grid (locked). The original
 * single-row 4-across layout was structurally capped near ~63mm image
 * width regardless of available page height (4 columns sharing 265mm),
 * leaving ~92mm of unused vertical space below the row — measured and
 * screenshotted in the Draft 02 Page 12 layout test. 2x2 at a fixed
 * 118mm item width was verified (DOM + print-media emulation) to fill
 * the page's vertical budget with ~0.1mm margin, no overflow.
 */
export function EfeLevelsSheet({ index }: { index: number }) {
  const levels = villaEfe.beats.designAlternatives.alternatives;

  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-5">
          Design Thinking — Vertical Privacy Hierarchy
        </p>
        <div className="grid grid-cols-2 gap-x-[16mm] gap-y-[6mm] mt-[2mm]">
          {levels.map((lvl) => {
            const plan = lvl.assets.find((a) => a.category === "plan")!;
            return (
              <div key={lvl.id} className="flex flex-col mx-auto" style={{ width: "118mm" }}>
                <img
                  src={printImagePath("villa-efe", plan.src)}
                  alt={plan.alt.en}
                  className="w-full aspect-[16/9] object-cover mb-2"
                />
                <p className="font-display text-caption text-ink mb-0.5">{lvl.label.en}</p>
                <p className="text-meta font-body text-neutral">{lvl.tier.en}</p>
              </div>
            );
          })}
        </div>
        <SheetFooter left="Villa Efe" right="Design Thinking" />
      </div>
    </Sheet>
  );
}
