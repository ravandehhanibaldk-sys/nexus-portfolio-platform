import { printImagePath } from "@/lib/utils";
import { Sheet } from "./sheet";

const CONTACT = "Hanibal Ravandeh · Rødovre, Denmark · ravandeh.hanibal.dk@gmail.com · +45 52 70 95 99 · linkedin.com/in/hanibal-ravandeh";

/**
 * Restrained cover — first exterior render of the opening project (Villa
 * Red Sun) as the sole hero image, same dark-gradient/white-text treatment
 * Hero.tsx already uses on the live site (Section 18 visual language), not
 * a new identity invented for print. No video, no climate/weather visual.
 */
export function CoverSheet({ index }: { index: number }) {
  return (
    <Sheet index={index} orientation="portrait">
      <div className="relative w-full h-full">
        <img
          src={printImagePath("villa-red-sun", "A-01-villa-red-sun-exterior-view-01_result.png")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-between p-[18mm]">
          <p className="text-meta font-body text-white/70 tracking-[0.2em] uppercase">
            Architectural Portfolio
          </p>
          <div>
            <h1 className="font-display text-display leading-[1.02] text-white mb-3">
              Hanibal Ravandeh
            </h1>
            <p className="font-body text-h2 text-white/90 mb-8">
              Senior Architectural Visualizer &amp; BIM Specialist
            </p>
            <p className="text-caption font-body text-white/75 tracking-[0.02em]">
              {CONTACT}
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
