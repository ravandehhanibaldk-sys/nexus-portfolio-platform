import { printImagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { Sheet, SheetFooter } from "./sheet";

/**
 * PLANS-SECTIONS-LAYOUT-FIX — every plan/section asset in the authoritative
 * library is 1600x900 (16:9). The previous layout forced the plan into a
 * ~3.6:1 wide/short box via `object-cover`, which crops to fill — at that
 * ratio, roughly half the plan's height was being cut off (worse for Villa
 * Efe's site plan, which carries more information at the edges than Red
 * Sun's proposal plan). Sections were cropped too, less severely, since
 * their box ratio (~1.95:1) was closer to 16:9.
 *
 * Fix, v2 — a width-driven aspect-ratio box (first attempt) required
 * hand-computing how much vertical space the title/level-indicator/footer
 * leave, and adding the level indicator strip broke that math (the
 * sections row overflowed under the footer for Villa Efe). Replaced with a
 * height-driven flex layout instead: the two rows (plan, sections) get
 * `flex-grow` shares of whatever height `flex-1 min-h-0` actually leaves —
 * computed by the browser from the real title/footer/level-indicator
 * heights, not estimated here — and each image is `max-h-full max-w-full
 * object-contain`, so it scales down to fit its row's real box on both
 * axes at once. This can never crop (object-contain) and can never
 * overflow past the footer (every box is height-bounded by flex-grow
 * within a min-h-0 ancestor), regardless of how tall the header area is
 * on a given page.
 */
export function PlansSectionsSheet({
  index,
  projectId,
  pageLabel,
  plan,
  sectionA,
  sectionB,
  levels,
  currentLevelId,
}: {
  index: number;
  projectId: string;
  pageLabel: string;
  plan: ProjectAsset;
  sectionA: ProjectAsset;
  sectionB: ProjectAsset;
  /** Villa Efe only — the project's full level set, to show which one this page's plan belongs to. */
  levels?: { id: string; label: { en: string } }[];
  currentLevelId?: string;
}) {
  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-1">
          Final Architecture — Plans &amp; Sections
        </p>

        {levels && levels.length > 1 ? (
          <div className="flex items-center gap-[2mm] mt-[5mm] mb-1">
            {levels.map((lvl, i) => (
              <span key={lvl.id} className="flex items-center gap-[2mm]">
                {i > 0 ? <span className="text-meta text-neutral/40">·</span> : null}
                <span
                  className={
                    lvl.id === currentLevelId
                      ? "text-meta font-body text-accent tracking-[0.1em] uppercase border-b border-accent pb-[0.5mm]"
                      : "text-meta font-body text-neutral/50 tracking-[0.1em] uppercase"
                  }
                >
                  {lvl.label.en}
                </span>
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex-1 min-h-0 flex flex-col gap-[7mm]">
          <div className="flex-[1.15] min-h-0 flex flex-col items-center">
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
              <img
                src={printImagePath(projectId, plan.src)}
                alt={plan.alt.en}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="shrink-0 text-meta font-body text-neutral mt-1.5">{plan.caption?.en}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-[6mm]">
            <div className="min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                <img
                  src={printImagePath(projectId, sectionA.src)}
                  alt={sectionA.alt.en}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="shrink-0 text-meta font-body text-neutral mt-1.5">{sectionA.caption?.en}</p>
            </div>
            <div className="min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                <img
                  src={printImagePath(projectId, sectionB.src)}
                  alt={sectionB.alt.en}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="shrink-0 text-meta font-body text-neutral mt-1.5">{sectionB.caption?.en}</p>
            </div>
          </div>
        </div>
        <SheetFooter left={pageLabel} right="Final Architecture" />
      </div>
    </Sheet>
  );
}
