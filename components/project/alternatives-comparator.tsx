"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Frame } from "./frame";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";

/**
 * Component 19.4 — Design Alternatives Comparator.
 * The platform's single most important component for demonstrating judgement
 * (Section 01). Governs the 2-minute psychology checkpoint (Section 08):
 * "This person thinks in alternatives, not just pretty pictures."
 *
 * Section 23.2 — desktop: side-by-side capable via tab switching with all
 * diagrams visible per tier; tablet: stacks in pairs; mobile: single column.
 * Motion governed by Section 15 Motion tokens — short, quiet, purpose-driven.
 */
export function AlternativesComparator({ project }: { project: Project }) {
  const { alternatives, question, text } = project.beats.designAlternatives;
  const [activeId, setActiveId] = useState(alternatives[0]?.id ?? "");
  const active = alternatives.find((a) => a.id === activeId) ?? alternatives[0];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
        05 — Design Process
      </p>
      <h2 className="font-display text-h1 text-ink mb-6 leading-tight">
        {question}
      </h2>
      <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed mb-12">
        {text}
      </p>

      <div
        role="tablist"
        aria-label="Design alternatives"
        className="flex gap-2 border-b border-divider mb-10"
      >
        {alternatives.map((alt) => (
          <button
            key={alt.id}
            role="tab"
            aria-selected={alt.id === activeId}
            onClick={() => setActiveId(alt.id)}
            className={cn(
              "px-4 py-3 text-caption font-body transition-colors duration-[var(--duration-base)]",
              "border-b-2 -mb-px",
              alt.id === activeId
                ? "border-accent text-ink"
                : "border-transparent text-neutral hover:text-ink"
            )}
          >
            {alt.label}
            <span className="block text-meta text-neutral mt-0.5">
              {alt.tier}
              {alt.isFinal ? " · Selected" : ""}
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {active.assets.map((asset, i) => (
            <Frame
              key={asset.src}
              projectId={project.id}
              asset={asset}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              gallery={active.assets}
              index={i}
            />
          ))}
        </motion.div>
      ) : null}
    </section>
  );
}
