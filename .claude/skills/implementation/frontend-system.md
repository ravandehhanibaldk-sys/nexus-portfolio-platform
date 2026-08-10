---
name: frontend-system
description: Correctly implements the decisions made by the judgment layer (portfolio-narrative, art-direction). Owns component architecture, App Router structure, TypeScript/Tailwind consistency, design tokens, responsive behavior, and preventing pattern drift as new projects are added.
---

This Skill operates under `.claude/PROJECT_CONSTITUTION.md`. In any conflict between this Skill's instructions and the Constitution, the Constitution wins.

## Purpose

Correctly implement the decisions made by the judgment layer (`portfolio-narrative`, `art-direction`).

## Responsibilities

- Component architecture and App Router structure (`app/`, `components/`).
- TypeScript / Tailwind consistency across the codebase.
- Design tokens — type scale, spacing, color, grid, motion — kept as the single machine-readable source (`app/globals.css`), never a one-off value introduced anywhere else.
- Responsive behavior across desktop / tablet / mobile.
- Preventing pattern drift when new projects are added — reuse existing components (Constitution #4) rather than building project-specific variants. When a new project's content doesn't cleanly fit an existing component (e.g. a project organized by floor level instead of cost tier), first check whether the existing component can serve the new content with different data, per `portfolio-narrative`'s beat decision, before proposing a new one.

## Decision Boundary

- Makes **no** aesthetic or narrative judgments. Implements the verdicts of `portfolio-narrative` and `art-direction` — never originates them.

Concrete example: changing `grid-cols-*`, an image's aspect ratio, or spacing in a way that changes the page's visual balance is not a routine layout fix — it's a compositional judgment. Flag it to `art-direction` even if it surfaces mid-implementation, the same way the Site Analysis and Final Architecture grid fixes should have been flagged the first time.

- **Explicit carve-out (Constitution #12 applied to this domain):** compositional or balance consequences — grid column counts, how an image gallery resolves an odd item count, image aspect-ratio handling, whether a layout "feels settled" — get flagged to `art-direction`, not decided silently, per Constitution #12's general rule. Fixing a broken build, a type error, or a non-functional interaction (e.g. a tab switcher that doesn't switch) needs no escalation — the distinction is whether the fix has a visual/compositional effect a reader would notice, not whether it's convenient to decide alone mid-edit.
- Cannot override a narrative or art-direction verdict once given — implements it, does not re-litigate it.

## Output Contract

- Code changes, components.
- An up-to-date design-token reference (`app/globals.css` stays the single source; document any deviation as an ADR per Constitution #5, e.g. a token value that's intentionally not overridden).
- Every dependency added, removed, or deviated from the preferred stack gets an ADR entry (`ARCHITECTURE_DECISIONS.md`) before or immediately after the change — this is not optional bookkeeping, it's how the project stays auditable two years from now.

## Auto-invoke

- Continuously, as ambient discipline, whenever a file under `app/` or `components/` is touched — this does not mean re-running a full audit on every keystroke; it means the standards in this file (token discipline, no arbitrary values, component reuse) apply to every edit, the same way a linter applies continuously rather than being "invoked."
- As a discrete, focused pass: when a new project is added (implementing the route + wiring content into existing components); when `art-direction` flags a design-system inconsistency; when a functional defect is found (broken interaction, failed build, type error).

## Reusable across future projects

Partially — the discipline (token consistency, component reuse, no pattern drift) travels to any project built with this stack; the component library itself (Hero, NarrativeTextBlock, AlternativesComparator, FinalArchitecture, etc.) is specific to this codebase, though built to be data-driven enough that most new projects need zero new components, only new content (validated in practice: Villa Efe shipped with the existing component set, no new components required).
