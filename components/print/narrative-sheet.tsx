import { printImagePath } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "./sheet";

/**
 * Client Challenge → Site → Constraints → Design Thinking → Final Decision,
 * in the project's own real beat text (Section 12 Storytelling Framework),
 * lightly restructured for print (eyebrow + question + prose instead of the
 * on-site Q&A block layout) — no wording invented or added. One optional
 * supporting site image, real project data only.
 */
export function NarrativeSheet({
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
  const rows: Array<{ n: string; label: string; question: string; text: string }> = [
    { n: "01", label: "Client Challenge", question: beats.clientChallenge.question.en, text: beats.clientChallenge.text.en },
    { n: "02", label: "Site", question: beats.site.question.en, text: beats.site.text.en },
    { n: "03", label: "Constraints", question: beats.constraints.question.en, text: beats.constraints.text.en },
    { n: "04", label: "Design Thinking", question: beats.designThinking.question.en, text: beats.designThinking.text.en },
    { n: "05", label: "Final Decision", question: beats.finalDecision.question.en, text: beats.finalDecision.text.en },
  ];

  return (
    <Sheet index={index} orientation="portrait">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
          Process
        </p>
        <div className="flex-1 flex gap-[10mm]">
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            {rows.map((r) => (
              <div key={r.n} className="mb-2.5">
                <p className="text-meta font-body text-accent tracking-[0.1em] uppercase mb-0.5">
                  {r.n} — {r.label}
                </p>
                <p className="font-body text-caption text-neutral italic mb-1">{r.question}</p>
                <p className="font-body text-caption text-ink/85 leading-snug">{r.text}</p>
              </div>
            ))}
          </div>
          {siteImageSrc ? (
            <div className="w-[62mm] shrink-0">
              <img
                src={printImagePath(project.id, siteImageSrc)}
                alt={siteImageAlt ?? ""}
                className="w-full aspect-[16/9] object-cover"
              />
              {siteImageCaption ? (
                <p className="text-meta font-body text-neutral mt-2">{siteImageCaption}</p>
              ) : null}
            </div>
          ) : null}
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} />
      </SheetPad>
    </Sheet>
  );
}
