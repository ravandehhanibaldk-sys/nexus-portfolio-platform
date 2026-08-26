import { printImagePath } from "@/lib/utils";
import villaRedSun from "@/content/projects/villa-red-sun";
import { Sheet, SheetFooter } from "@/components/print/sheet";

/**
 * v3 fix — deterministic header slot. The production baseline
 * (components/print/red-sun-comparison-sheet.tsx, untouched) stacks
 * each column independently: title, subtitle, Master Plan image,
 * caption, Floor Plan image, caption. Because D's subtitle ("Highest
 * quality, highest cost — complete architectural revision") wraps to
 * 2 lines while B-2/C-1's stay at 1, every element below D's subtitle
 * shifted down ~5.16mm relative to the other two columns — measured
 * directly before this fix (Master Plan image: 48.43mm vs 53.59mm;
 * Floor Plan image: 105.04mm vs 110.19mm; Floor Plan caption:
 * 153.31mm vs 158.47mm — all three deltas ~5.15-5.16mm, i.e. the
 * subtitle wrap, not three independent problems).
 *
 * Fix: the subtitle sits in a wrapper with a fixed min-height equal
 * to two text-meta lines (the tallest real subtitle in this data set
 * needs exactly 2), so the header block is always the same total
 * height regardless of whether a given column's subtitle actually
 * wraps. No text shortened, no typography changed, no column moved
 * manually — the grid's own header slot now guarantees the row
 * alignment structurally.
 */
export function RedSunComparisonSheetLandscape({ index }: { index: number }) {
  const alts = villaRedSun.beats.designAlternatives.alternatives;
  const cols = alts.map((a) => ({
    id: a.id,
    tier: a.tier.en,
    isFinal: a.isFinal,
    masterPlan: a.assets.find((x) => x.category === "master-plan")!,
    // item 14 — the Floor Plan row was too visually similar to Master
    // Plan (same drawing minus people/shadows) to add real comparative
    // value. Swapped for the Circulation diagram, already part of this
    // asset set (content/projects/villa-red-sun.ts, category
    // "circulation-diagram") — real, distinct content, not new data.
    circulation: a.assets.find((x) => x.category === "circulation-diagram")!,
  }));

  return (
    <Sheet index={index} orientation="landscape">
      <div className="sheet-pad">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-5">
          Design Process — Comparative Proposals
        </p>
        <div className="flex-1 grid grid-cols-3 gap-[8mm]">
          {cols.map((c) => (
            <div key={c.id} className="flex flex-col">
              <p className="font-display text-h2 text-ink mb-0.5">
                {c.id}
                {c.isFinal ? <span className="text-accent"> — Selected</span> : null}
              </p>
              <div className="mb-3" style={{ minHeight: "10.4mm" }}>
                <p className="text-meta font-body text-neutral">{c.tier}</p>
              </div>
              <img
                src={printImagePath("villa-red-sun", c.masterPlan.src)}
                alt={c.masterPlan.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1.5"
              />
              <p className="text-meta font-body text-neutral mb-3">Master Plan</p>
              <img
                src={printImagePath("villa-red-sun", c.circulation.src)}
                alt={c.circulation.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1.5"
              />
              <p className="text-meta font-body text-neutral">Circulation</p>
            </div>
          ))}
        </div>
        <SheetFooter left="Villa Red Sun" right="Design Process" index={index} />
      </div>
    </Sheet>
  );
}
