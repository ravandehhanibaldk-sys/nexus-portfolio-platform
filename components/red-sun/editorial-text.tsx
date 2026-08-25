"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Production modernization pass — Villa Red Sun only (see
 * villa-red-sun-production-page.tsx for why this exists as a parallel
 * component rather than an edit to the shared NarrativeTextBlock, which
 * Villa Efe also uses).
 *
 * Same data contract as NarrativeTextBlock (index/question/text) and the
 * same design tokens (font-display/font-body, text-h1, color-ink/accent) —
 * only the composition changes: an asymmetric offset column instead of a
 * centered block, more generous vertical rhythm, and a scroll reveal.
 * `emphasis` gives Final Decision a slightly heavier visual weight without
 * inventing a new token — it reuses text-display at a smaller viewport
 * share, not a new font size.
 */
export function EditorialText({
  index,
  question,
  text,
  emphasis = false,
}: {
  index: string;
  question: string;
  text: string;
  emphasis?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div
          className="md:col-start-2 md:col-span-9 lg:col-start-3 lg:col-span-8"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-5">
            {index}
          </p>
          <h2
            className={
              emphasis
                ? "font-display text-h1 md:text-display text-ink mb-8 leading-[1.05]"
                : "font-display text-h1 text-ink mb-8 leading-tight"
            }
          >
            {question}
          </h2>
          <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
