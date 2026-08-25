import { printImagePath } from "@/lib/utils";
import { Sheet } from "@/components/print/sheet";

const CONTACT = "Hanibal Ravandeh · Rødovre, Denmark · ravandeh.hanibal.dk@gmail.com · +45 52 70 95 99 · linkedin.com/in/hanibal-ravandeh";

export function CoverSheetLandscape({ index }: { index: number }) {
  return (
    <Sheet index={index} orientation="landscape">
      <div className="relative w-full h-full">
        <img
          src={printImagePath("villa-red-sun", "A-01-villa-red-sun-exterior-view-01_result.png")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />
        <div className="absolute inset-0 flex flex-col justify-between p-[16mm]">
          <p className="text-[10.5px] font-body text-white/70 tracking-[0.22em] uppercase">
            Architectural Portfolio
          </p>
          <div>
            <h1 className="font-display text-[40px] leading-[1.05] text-white mb-2.5">
              Hanibal Ravandeh
            </h1>
            <p className="font-body text-[18px] text-white/90 mb-5">
              Senior Architectural Visualizer &amp; BIM Specialist
            </p>
            <p className="text-[11.5px] font-body text-white/75 tracking-[0.02em]">
              {CONTACT}
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
