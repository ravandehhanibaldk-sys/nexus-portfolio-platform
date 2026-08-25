"use client";

import type { Dictionary } from "@/dictionaries/en";

/**
 * Component 19.10 — Navigation / Progress.
 * Minimal, persistent indicator of position within the eight-beat structure
 * (Section 12). Secondary affordance for the Recruiter persona (Section 6.1,
 * 7.1) who wants to jump ahead — never replaces the linear narrative.
 * Mobile: collapses to a compact menu (Section 23.2).
 */
const BEAT_IDS = [
  "client-challenge",
  "site",
  "constraints",
  "design-alternatives",
  "final-decision",
  "final-architecture",
  "reflection",
] as const;

const FALLBACK_LABELS: Record<(typeof BEAT_IDS)[number], string> = {
  "client-challenge": "01 Challenge",
  site: "02 Site",
  constraints: "03 Constraints",
  "design-alternatives": "04 Process",
  "final-decision": "05 Decision",
  "final-architecture": "06 Architecture",
  reflection: "07 Reflection",
};

const DICT_KEYS: Record<(typeof BEAT_IDS)[number], keyof Dictionary["nav"]["beats"]> = {
  "client-challenge": "clientChallenge",
  site: "site",
  constraints: "constraints",
  "design-alternatives": "designAlternatives",
  "final-decision": "finalDecision",
  "final-architecture": "finalArchitecture",
  reflection: "reflection",
};

export function ProgressNav({ dict }: { dict?: Dictionary } = {}) {
  return (
    <nav
      aria-label={dict?.nav.projectSections ?? "Project sections"}
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
    >
      {BEAT_IDS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center justify-end gap-2"
        >
          <span className="text-meta font-body text-neutral opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-base)] whitespace-nowrap">
            {dict?.nav.beats[DICT_KEYS[id]] ?? FALLBACK_LABELS[id]}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral/40 group-hover:bg-accent transition-colors duration-[var(--duration-base)]" />
        </a>
      ))}
    </nav>
  );
}
