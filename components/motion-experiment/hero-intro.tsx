"use client";

import { useReducedMotion } from "framer-motion";
import { Particles } from "./particles";
import { TextAnimate } from "./text-animate";

/**
 * experiment/motion-redesign branch only. Replaces the home page's plain
 * eyebrow + <h1> block with a full-bleed dark hero using two Magic UI
 * components (Particles, TextAnimate) — see components/motion-experiment/
 * README.md for what this is and isn't. Uses the project's own existing
 * dark-hero tokens (--color-paper-dark / --color-ink-dark, the same pair
 * components/project/hero.tsx already uses) rather than inventing new
 * colors, so the treatment reads as an extension of the current visual
 * language, not a foreign one.
 *
 * Content is untouched — `eyebrow` and `title` are the exact same
 * dict-sourced strings the plain version rendered; only the visual
 * treatment around them changed.
 */
export function HeroIntro({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const prefersReducedMotion = useReducedMotion() === true;

  return (
    <section className="relative overflow-hidden bg-paper-dark px-6 py-24 md:py-32">
      {prefersReducedMotion ? null : (
        <Particles
          className="absolute inset-0"
          quantity={90}
          staticity={40}
          ease={60}
          size={0.5}
          color="#f4f2ee"
        />
      )}
      <div className="relative max-w-5xl mx-auto">
        <p className="text-meta font-body text-ink-dark/60 tracking-[0.15em] uppercase mb-3">
          {eyebrow}
        </p>
        {prefersReducedMotion ? (
          <h1 className="font-display text-h1 md:text-display text-ink-dark leading-[1.05] max-w-3xl">
            {title}
          </h1>
        ) : (
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            duration={0.7}
            once
            className="font-display text-h1 md:text-display text-ink-dark leading-[1.05] max-w-3xl"
          >
            {title}
          </TextAnimate>
        )}
      </div>
    </section>
  );
}
