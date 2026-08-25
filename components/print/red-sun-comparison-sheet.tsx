import { printImagePath } from "@/lib/utils";
import villaRedSun from "@/content/projects/villa-red-sun";
import { Sheet, SheetFooter } from "./sheet";

/**
 * Villa Red Sun's differentiator (Section 22.1): seven proposals across
 * three cost/quality tiers, three of them carried to full documentation.
 * Master plan + floor plan for each of the three (B-2, C-1, D) side by
 * side — the comparative-decision evidence the differentiator claims,
 * not an exhaustive dump of all five diagram types per proposal.
 */
export function RedSunComparisonSheet({ index }: { index: number }) {
  const alts = villaRedSun.beats.designAlternatives.alternatives;
  const cols = alts.map((a) => ({
    id: a.id,
    tier: a.tier.en,
    isFinal: a.isFinal,
    masterPlan: a.assets.find((x) => x.category === "master-plan")!,
    plan: a.assets.find((x) => x.category === "plan")!,
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
              <p className="text-meta font-body text-neutral mb-3">{c.tier}</p>
              <img
                src={printImagePath("villa-red-sun", c.masterPlan.src)}
                alt={c.masterPlan.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1.5"
              />
              <p className="text-meta font-body text-neutral mb-3">Master Plan</p>
              <img
                src={printImagePath("villa-red-sun", c.plan.src)}
                alt={c.plan.alt.en}
                className="w-full aspect-[16/9] object-cover mb-1.5"
              />
              <p className="text-meta font-body text-neutral">Floor Plan</p>
            </div>
          ))}
        </div>
        <SheetFooter left="Villa Red Sun" right="Design Process" />
      </div>
    </Sheet>
  );
}
