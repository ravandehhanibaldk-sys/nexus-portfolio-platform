import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad } from "@/components/print/sheet";

/**
 * Closing sheet for each project — Component 19.9 (Reflection), the same
 * dark "bookend" treatment ADR-006 gives it on the website
 * (components/project/reflection.tsx: bg-paper-dark/text-ink-dark), kept
 * visually distinct from the light Process/Narrative sheets. Real project
 * text only, beats.reflection — no wording invented or added.
 *
 * SheetFooter (components/print/sheet.tsx) isn't reused here: its
 * border-divider/text-neutral tokens are tuned for the light paper
 * background and would read as nearly invisible on --color-paper-dark.
 * This sheet's own footer uses ink-dark at reduced opacity instead.
 */
export function ReflectionSheetLandscape({
  index,
  project,
  pageLabel,
}: {
  index: number;
  project: Project;
  pageLabel: string;
}) {
  const beat = project.beats.reflection;
  const paragraphs = beat.text.en.split("\n\n");

  return (
    <Sheet index={index} orientation="landscape" bg="var(--color-paper-dark)">
      <SheetPad className="text-ink-dark">
        <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
          Reflection
        </p>
        <h2 className="pt-display-sm font-display leading-tight mb-6 max-w-[180mm]">
          {beat.question.en}
        </h2>
        <div className="columns-2 gap-[14mm] flex-1">
          {paragraphs.map((p, i) => (
            <p key={i} className="pt-meta font-body leading-relaxed text-ink-dark/85 mb-3 break-inside-avoid-column">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-ink-dark/15">
          <span className="text-meta font-body text-ink-dark/50 tracking-[0.1em] uppercase">{pageLabel}</span>
          <span className="text-meta font-body text-ink-dark/50 tracking-[0.1em] uppercase">Reflection</span>
        </div>
      </SheetPad>
    </Sheet>
  );
}
