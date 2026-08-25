import { printImagePath } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "@/components/print/sheet";

export function NarrativeSheetLandscape({
  index,
  project,
  pageLabel,
  siteImageSrc,
  siteImageAlt,
  siteImageCaption,
}: {
  index: number;
  project: Project;
  pageLabel: string;
  siteImageSrc?: string;
  siteImageAlt?: string;
  siteImageCaption?: string;
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
          <div className="flex flex-col" data-el="col-right">
            {right.map((b) => (
              <Beat key={b.n} {...b} />
            ))}
            {siteImageSrc ? (
              <div className="mt-2.5 pt-3 pb-[3mm] border-t border-divider flex-1 min-h-0 flex flex-col" data-el="site-image-block">
                <img
                  src={printImagePath(project.id, siteImageSrc)}
                  alt={siteImageAlt ?? ""}
                  className="w-full flex-1 basis-0 min-h-0 object-cover mb-1.5"
                  data-el="site-image"
                />
                {siteImageCaption ? (
                  <p className="text-meta font-body text-neutral shrink-0" data-el="site-image-caption">{siteImageCaption}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} />
      </SheetPad>
    </Sheet>
  );
}
