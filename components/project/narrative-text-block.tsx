import { t, type LocalizedString } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";

/**
 * Component 19.2 — Narrative Text Block.
 * Used for Client Challenge, Constraints, Design Thinking, Final Decision beats.
 * Section 17 — fixed max line-length (prose-narrative, ~68ch).
 * Section 11.2 — the heading IS the one question this page answers.
 *
 * Unused by any current route (both projects use their own parallel page
 * shells) — kept compiling against the Workstream 3 localized-string schema
 * rather than removed, since deletion wasn't part of this pass's scope.
 */
export function NarrativeTextBlock({
  index,
  question,
  text,
  locale = "en",
}: {
  index: string;
  question: LocalizedString;
  text: LocalizedString;
  locale?: Locale;
}) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
        {index}
      </p>
      <h2 className="font-display text-h1 text-ink mb-8 leading-tight">
        {t(question, locale)}
      </h2>
      <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed">
        {t(text, locale)}
      </p>
    </section>
  );
}
