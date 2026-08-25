"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Villa Efe production modernization pass — Phase 1, mirroring the
 * approved Villa Red Sun pattern (components/red-sun/editorial-text.tsx).
 * Deliberately duplicated rather than imported from components/red-sun/ —
 * a genuinely separate, Efe-scoped component tree, not a cross-project
 * dependency, per the execution brief's explicit instruction.
 *
 * Same data contract as NarrativeTextBlock (index/question/text) and the
 * same design tokens (font-display/font-body, text-h1, color-ink/accent).
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
