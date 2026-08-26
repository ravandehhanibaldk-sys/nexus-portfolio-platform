import type { Project } from "@/lib/content-schema";
import { Sheet, SheetPad, SheetFooter } from "@/components/print/sheet";

/**
 * Closing sheet for each project — Component 19.9 (Reflection). Real
 * project text only, beats.reflection — no wording invented or added.
 *
 * Layout follows PDF-VISUAL-DIRECTION.md Section 4 ("Reflection —
 * editorial treatment"): no question/eyebrow Q&A scaffolding matching the
 * beat pages — a single small metadata line is enough framing, letting the
 * text itself be the page. One adaptation from that note's literal
 * suggestion: it describes "Short Reflection text... at pull-quote size"
 * (16-17px, single column), written before the real approved text
 * existed. The actual text Hanibal approved is ~3000 characters per
 * project (four full paragraphs) — genuinely too long for pull-quote-size
 * single-column type to fit one A4 landscape page without overflowing.
 * Kept the two-column pt-meta body size from the original build instead,
 * which measured with zero overflow (see commit history) — the
 * direction's core ask (no Q&A scaffolding, text-led page) is honored;
 * only the type-size specifics were adapted to the real content length.
 *
 * ADR-010 supersedes ADR-006: moved off --color-paper-dark to the
 * standard light Sheet background (bg omitted = default), matching
 * components/project/reflection.tsx's parallel change on the website.
 * Distinction from Process/Narrative sheets is now typographic only —
 * italic metadata line, generous top whitespace before the text starts —
 * rather than a color-block. The light background also means
 * SheetFooter's border-divider/text-neutral tokens (tuned for light
 * paper) now apply cleanly, so this sheet gets the standard footer +
 * folio number (item 17) like every other sheet, instead of the
 * bespoke ink-dark footer the dark background used to require.
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
    <Sheet index={index} orientation="landscape">
      <SheetPad>
        <div className="flex-1 min-h-0 flex flex-col justify-center">
          <p className="pt-micro font-body text-neutral italic tracking-[0.15em] uppercase mb-8">
            {pageLabel} — Reflection
          </p>
          <div className="columns-2 gap-[14mm]">
            {paragraphs.map((p, i) => (
              <p key={i} className="pt-meta font-body leading-relaxed text-ink/85 mb-3 break-inside-avoid-column">
                {p}
              </p>
            ))}
          </div>
        </div>
        <SheetFooter left="Hanibal Ravandeh" right={pageLabel} index={index} />
      </SheetPad>
    </Sheet>
  );
}
