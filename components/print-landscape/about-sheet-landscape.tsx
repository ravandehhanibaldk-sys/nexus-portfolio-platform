import aboutContent from "@/content/about";
import { Sheet, SheetPad, SheetFooter } from "@/components/print/sheet";

export function AboutSheetLandscape({ index }: { index: number }) {
  const intro = aboutContent.sections[0]!;
  const ideaSite = aboutContent.sections[1]!;
  const cycle = aboutContent.sections[2]!;
  const howIWork = aboutContent.sections[4]!;

  return (
    <Sheet index={index} orientation="landscape">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-4">
          About
        </p>
        <div className="flex-1 grid grid-cols-2 gap-[14mm]">
          <div>
            {intro.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-[12.5px] leading-snug text-ink/85 mb-2">
                {p.en}
              </p>
            ))}
            {ideaSite.heading ? (
              <h2 className="font-display text-[19px] text-ink mt-4 mb-2">{ideaSite.heading.en}</h2>
            ) : null}
            {ideaSite.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-[12.5px] leading-snug text-ink/85 mb-1.5">
                {p.en}
              </p>
            ))}
            {ideaSite.pullQuote ? (
              <p className="font-display text-[17px] text-ink leading-snug my-3 pl-4 border-l-2 border-accent">
                {ideaSite.pullQuote.en}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col">
            {howIWork.heading ? (
              <h2 className="font-display text-[19px] text-ink mb-3">{howIWork.heading.en}</h2>
            ) : null}
            {howIWork.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-[12.5px] leading-relaxed text-ink/85 mb-3">
                {p.en}
              </p>
            ))}
            <div className="mt-auto pt-4 border-t border-divider">
              <p className="text-meta font-body text-neutral tracking-[0.08em] mb-2.5">
                {cycle.paragraphs[0]!.en}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
                {cycle.cycle!.en.split(" → ").flatMap((word, wi, words) => {
                  const isInput = wi < 4;
                  const nodes = [
                    <span
                      key={`w-${wi}`}
                      className={
                        isInput
                          ? "text-[10.5px] font-body text-neutral tracking-[0.08em] uppercase"
                          : "text-[12.5px] font-body text-ink tracking-[0.08em] uppercase"
                      }
                    >
                      {word}
                    </span>,
                  ];
                  if (wi < words.length - 1) {
                    nodes.push(
                      <span key={`a-${wi}`} className="text-[10.5px] font-body text-neutral/40">
                        →
                      </span>
                    );
                  }
                  return nodes;
                })}
              </div>
            </div>
          </div>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right="About" />
      </SheetPad>
    </Sheet>
  );
}
