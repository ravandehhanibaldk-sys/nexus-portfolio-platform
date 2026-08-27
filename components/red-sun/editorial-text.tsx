"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Production modernization pass — Villa Red Sun only (see
 * villa-red-sun-production-page.tsx for why this exists as a parallel
 * component rather than an edit to the shared NarrativeTextBlock, which
 * Villa Efe also uses — meaning this file's own GSAP integration has no
 * effect on Villa Efe's page at all).
 *
 * experiment/motion-v3-process-reveal: was a Framer Motion `whileInView`
 * fade+rise (see git history). Rebuilt on GSAP + ScrollTrigger per that
 * experiment's brief, which wanted GSAP specifically for scroll-timeline
 * work — precise trigger-point control and a coordinated multi-element
 * stagger (eyebrow → heading → body) that a single `motion.div`'s
 * `whileInView` can't express as cleanly. Framer Motion is untouched
 * everywhere else in this codebase; this is not a "replace Framer
 * Motion" change, just the right engine for this one job.
 *
 * Same data contract as NarrativeTextBlock (index/question/text) and the
 * same design tokens (font-display/font-body, text-h1, color-ink/accent) —
 * only the composition changes: an asymmetric offset column instead of a
 * centered block, more generous vertical rhythm, and the scroll reveal.
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
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (reduced) return; // full opacity/no transform already in the JSX below — nothing to animate, nothing to skip past.

    const els = [indexRef.current, headingRef.current, bodyRef.current].filter(
      (el) => el !== null
    ) as Element[];
    if (!sectionRef.current || els.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(els, { autoAlpha: 0, y: 12 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: sectionRef.current,
          // Fires once the section is genuinely in view (not the instant
          // its top edge appears at the very bottom of the viewport, not
          // so late it feels like it's chasing the scroll) and only once —
          // this is a one-time unveiling, not a repeating scroll gimmick.
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-start-2 md:col-span-9 lg:col-start-3 lg:col-span-8">
          <p
            ref={indexRef}
            className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-5"
          >
            {index}
          </p>
          <h2
            ref={headingRef}
            className={
              emphasis
                ? "font-display text-h1 md:text-display text-ink mb-8 leading-[1.05]"
                : "font-display text-h1 text-ink mb-8 leading-tight"
            }
          >
            {question}
          </h2>
          <p
            ref={bodyRef}
            className="prose-narrative text-body font-body text-ink/85 leading-relaxed"
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
