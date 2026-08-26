import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "@/components/print/sheet";

export function NarrativeSheetLandscape({
  index,
  project,
  pageLabel,
}: {
  index: number;
  project: Project;
  pageLabel: string;
}) {
  const { beats } = project;
  const left = [
    { n: "01", label: "Client Challenge", question: beats.clientChallenge.question.en, text: beats.clientChallenge.text.en },
    { n: "02", label: "Site", question: beats.site.question.en, text: beats.site.text.en },
    { n: "03", label: "Constraints", question: beats.constraints.question.en, text: beats.constraints.text.en },
  ];
  const right = [
    { n: "04", label: "Design Thinking", question: beats.designThinking.question.en, text: beats.designThinking.text.en },
    { n: "05", label: "Final Decision", question: beats.finalDecision.question.en, text: beats.finalDecision.text.en },
  ];

  const Beat = ({ n, label, question, text }: { n: string; label: string; question: string; text: string }) => (
    <div className="pt-2.5 pb-3.5 border-t border-divider first:border-t-0 first:pt-0" data-el={`beat-${n}`}>
      <p className="pt-micro font-body text-accent tracking-[0.1em] uppercase mb-1">
        {n} — {label}
      </p>
      <p className="pt-micro font-body text-neutral italic mb-1">{question}</p>
      <p className="pt-meta font-body text-ink/85 leading-snug">{text}</p>
    </div>
  );

  return (
    <Sheet index={index} orientation="landscape">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-4">
          Process
        </p>
        <div className="flex-1 grid grid-cols-2 gap-[16mm]">
          <div className="flex flex-col justify-between" data-el="col-left">
            {left.map((b) => (
              <Beat key={b.n} {...b} />
            ))}
            <div className="border-t border-divider" data-el="col-left-close" />
          </div>
          <div className="flex flex-col justify-between" data-el="col-right">
            {right.map((b) => (
              <Beat key={b.n} {...b} />
            ))}
            {/* Hanibal's final content decision: the site image/diagram that
                used to sit below these two beats (Red Sun's photographic
                "Site analysis — two buildings, one plot" / Efe's coded
                "Location plan — waterfront site" SVG) is removed outright,
                no replacement artwork. justify-between (mirroring col-left's
                own layout, which has always spread 3 beats + a closing
                divider across the full column height) keeps this shorter,
                2-beat column filling the same vertical space cleanly
                instead of leaving a gap under Final Decision. */}
            <div className="border-t border-divider" data-el="col-right-close" />
          </div>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} index={index} />
      </SheetPad>
    </Sheet>
  );
}
