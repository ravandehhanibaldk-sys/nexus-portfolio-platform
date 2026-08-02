"use client";

/**
 * Component 19.10 — Navigation / Progress.
 * Minimal, persistent indicator of position within the eight-beat structure
 * (Section 12). Secondary affordance for the Recruiter persona (Section 6.1,
 * 7.1) who wants to jump ahead — never replaces the linear narrative.
 * Mobile: collapses to a compact menu (Section 23.2).
 */
const BEATS = [
  { id: "client-challenge", label: "01 Challenge" },
  { id: "site", label: "02 Site" },
  { id: "constraints", label: "03 Constraints" },
  { id: "design-alternatives", label: "04 Process" },
  { id: "final-decision", label: "05 Decision" },
  { id: "final-architecture", label: "06 Architecture" },
  { id: "reflection", label: "07 Reflection" },
];

export function ProgressNav() {
  return (
    <nav
      aria-label="Project sections"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
    >
      {BEATS.map((beat) => (
        <a
          key={beat.id}
          href={`#${beat.id}`}
          className="group flex items-center justify-end gap-2"
        >
          <span className="text-meta font-body text-neutral opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-base)] whitespace-nowrap">
            {beat.label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral/40 group-hover:bg-accent transition-colors duration-[var(--duration-base)]" />
        </a>
      ))}
    </nav>
  );
}
