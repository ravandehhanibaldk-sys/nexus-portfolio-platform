import aboutContent from "@/content/about";
import { Sheet, SheetPad, SheetFooter } from "./sheet";

/**
 * Curated subset of content/about.ts — opening paragraph, the Idea↔Site
 * method (with its pull quote), and How I Work (13+ years, the 15-month
 * Danish construction-site period, tools mentioned in prose, not a list).
 * "From Idea to Evidence" (cycle diagram) and "Beyond the Image" are
 * dropped here for length, not rewritten — every line kept is verbatim
 * from the source, per the data-honesty rule (no paraphrasing of claims).
 */
export function AboutSheet({ index }: { index: number }) {
  const intro = aboutContent.sections[0]!;
  const ideaSite = aboutContent.sections[1]!;
  const howIWork = aboutContent.sections[4]!;
  // Curated subset of ideaSite's paragraphs — drops two short standalone
  // connective lines ("The site can challenge the idea." / "The idea can
  // reveal something new about the site.") to fit one page; every line
  // kept is still verbatim, the pull quote already carries that idea.
  const ideaSiteParagraphs = ideaSite.paragraphs.filter(
    (p) => p.en !== "The site can challenge the idea." && p.en !== "The idea can reveal something new about the site."
  );

  return (
    <Sheet index={index} orientation="portrait">
      <SheetPad>
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-6">
          About
        </p>

        <div className="max-w-[68ch]">
          {intro.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-body text-ink/85 leading-snug mb-3">
              {p.en}
            </p>
          ))}

          {ideaSite.heading ? (
            <h2 className="font-display text-h2 text-ink mt-6 mb-3">{ideaSite.heading.en}</h2>
          ) : null}
          {ideaSiteParagraphs.map((p, i) => (
            <p key={i} className="font-body text-body text-ink/85 leading-snug mb-2">
              {p.en}
            </p>
          ))}
          {ideaSite.pullQuote ? (
            <p className="font-display text-h2 text-ink leading-snug my-5 pl-6 border-l-2 border-accent">
              {ideaSite.pullQuote.en}
            </p>
          ) : null}

          {howIWork.heading ? (
            <h2 className="font-display text-h2 text-ink mt-5 mb-3">{howIWork.heading.en}</h2>
          ) : null}
          {howIWork.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-body text-ink/85 leading-snug mb-2">
              {p.en}
            </p>
          ))}
        </div>

        <SheetFooter left="Hanibal Ravandeh" right="About" />
      </SheetPad>
    </Sheet>
  );
}
