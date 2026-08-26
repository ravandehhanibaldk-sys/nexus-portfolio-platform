import { printImagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { Sheet, SheetFooter } from "./sheet";

/**
 * PLANS-SECTIONS-SPLIT — Villa Efe dedicated SECTIONS page. Section A-A
 * and B-B get the full page, side by side.
 *
 * SECTIONS-PAGE-CLEANUP — the small site-plan locator (top-right corner)
 * has been removed entirely per direction; this page shows only the two
 * section drawings. Both sections are real 16:9 assets and are already
 * at their maximum possible size for a 2-up side-by-side layout at full
 * page width (`w-full aspect-[16/9] object-contain` — width-driven, so
 * there's no risk of the height-driven overflow bug from earlier passes;
 * with only one row of content here, that risk doesn't apply). The
 * removed locator's header row freed real vertical space, which — before
 * this change — showed up as a large, lopsided empty gap between the
 * title and the images (the flex-1 box centered each image within itself,
 * but nothing filled the space the locator row used to occupy). Fixed by
 * centering the whole two-section block in the space between the title
 * and the footer, so the leftover room reads as deliberate top+bottom
 * margin around a centered pair of drawings, not an accidental gap above
 * them.
 */
export function SectionsOnlySheet({
  index,
  projectId,
  pageLabel,
  sectionA,
  sectionB,
}: {
  index: number;
  projectId: string;
  pageLabel: string;
  sectionA: ProjectAsset;
  sectionB: ProjectAsset;
}) {
  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase">
          Final Architecture — Sections
        </p>
        {/* item 13 — moved up (justify-start + a deliberate fixed gap
            below the title, instead of vertically centered with a large
            top gap) and enlarged in place: the image row bleeds out to
            the sheet's full 297mm page width via a negative margin that
            exactly cancels sheet-pad's own 16mm horizontal padding, so
            both sections render ~12% larger while staying strictly
            within the physical page (never exceeding it) and still
            side-by-side, not stacked. */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-start pt-[10mm]">
          <div className="grid grid-cols-2 gap-[10mm]" style={{ width: "calc(100% + 32mm)", marginLeft: "-16mm", marginRight: "-16mm" }}>
            <div>
              <img
                src={printImagePath(projectId, sectionA.src)}
                alt={sectionA.alt.en}
                className="w-full aspect-[16/9] object-contain"
              />
              <p className="text-meta font-body text-neutral mt-2">{sectionA.caption?.en}</p>
            </div>
            <div>
              <img
                src={printImagePath(projectId, sectionB.src)}
                alt={sectionB.alt.en}
                className="w-full aspect-[16/9] object-contain"
              />
              <p className="text-meta font-body text-neutral mt-2">{sectionB.caption?.en}</p>
            </div>
          </div>
        </div>
        <SheetFooter left={pageLabel} right="Final Architecture" index={index} />
      </div>
    </Sheet>
  );
}
