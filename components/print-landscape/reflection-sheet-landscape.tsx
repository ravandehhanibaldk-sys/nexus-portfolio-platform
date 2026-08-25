import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad } from "@/components/print/sheet";

/**
 * Closing sheet for each project — Component 19.9 (Reflection), the same
 * dark "bookend" treatment ADR-006 gives it on the website
 * (components/project/reflection.tsx: bg-paper-dark/text-ink-dark), kept
 * visually distinct from the light Process/Narrative sheets. Real project
 * text only, beats.reflection — no wording invented or added.
 *
 * Layout follows PDF-VISUAL-DIRECTION.md Section 4 ("Reflection —
 * editorial treatment"), written before this sheet existed: no question/
 * eyebrow Q&A scaffolding matching the beat pages — a single small
 * metadata line is enough framing, letting the text itself be the page.
 * One adaptation from that note's literal suggestion: it describes
 * "Short Reflection text... at pull-quote size" (16-17px, single
 * column), written before the real approved text existed. The actual
 * text Hanibal approved is ~3000 characters per project (four full
 * paragraphs) — genuinely too long for pull-quote-size single-column
 * type to fit one A4 landscape page without overflowing. Kept the
 * two-column pt-meta body size from the original build instead, which
 * measured with zero overflow (see commit history) — the direction's
 * core ask (no Q&A scaffolding, text-led page) is honored; only the
 * type-size specifics were adapted to the real content length.
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
      <SheetPad className="text-ink-dark justify-center">
        <p className="pt-micro font-body text-ink-dark/50 tracking-[0.15em] uppercase mb-8">
          {pageLabel} — Reflection
        </p>
        <div className="columns-2 gap-[14mm]">
          {paragraphs.map((p, i) => (
            <p key={i} className="pt-meta font-body leading-relaxed text-ink-dark/85 mb-3 break-inside-avoid-column">
              {p}
            </p>
          ))}
        </div>
      </SheetPad>
    </Sheet>
  );
}
