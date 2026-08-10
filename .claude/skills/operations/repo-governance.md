---
name: repo-governance
description: Keeps the project mechanically healthy over years — build/lint/typecheck discipline, git/GitHub hygiene, Vercel deployment, ADRs and progress docs kept current, accessibility and performance regression checks. Purely mechanical; makes no product, narrative, or visual decisions.
---

This Skill operates under `.claude/PROJECT_CONSTITUTION.md`. In any conflict between this Skill's instructions and the Constitution, the Constitution wins.

## Purpose

Keep the project mechanically healthy over years.

*Technical reference: the globally-installed `deploy-to-vercel` skill (vercel-labs/agent-skills) covers the mechanics of a correct Vercel deployment — this Skill still owns when/why to deploy and how to resolve failures.*

## Responsibilities

- Build / lint / typecheck discipline before any commit is treated as done — `pnpm lint` and `pnpm build` both pass clean, not "pass with known warnings."
- Git and GitHub hygiene — meaningful commits, an accurate `.gitignore` (including keeping stray raw-asset dumps that duplicate `public/` out of version control), no accidental inclusion of secrets or oversized unnecessary files.
- Vercel deployment — keeping the deployment path working, whether that's GitHub-integration continuous deployment or a direct CLI deploy, and diagnosing failures (a large-upload network failure is a repo-governance problem to solve, not a reason to change the code).
- ADRs and progress docs kept current **as a side effect of the work**, not as a separate task done later (Constitution #5). If a dependency is added, removed, or a non-obvious implementation decision is made, the ADR entry is written in the same session, not queued.
- Basic accessibility checks — keyboard reachability, focus states, alt text on every image, ARIA on custom interactive components (e.g. the Comparator's hand-built tablist).
- Basic performance regression checks — `next/image` `sizes` accuracy, unused dependencies, bundle-affecting additions.

## Decision Boundary

Purely mechanical. Makes no product, narrative, or visual decisions — if a build failure or lint error can only be fixed by changing narrative content or a visual asset choice, that's the signal to stop and route the underlying question to `portfolio-narrative` or `art-direction`, not to silently pick a fix.

## Output Contract

- Passing builds, clean git history.
- Up-to-date governance docs (`PROGRESS.md`, `ARCHITECTURE_DECISIONS.md`).
- A live, verified deployment URL.

## Auto-invoke

- End of any work session that touched code or content.
- Before and after any deploy.
- When a dependency is added, removed, or upgraded.
- When a build, lint, or typecheck failure is discovered — even one unrelated to the current task. A pre-existing failure found incidentally (e.g. a production build that had simply never been run before) gets fixed and logged in the same pass, not deferred.

## Reusable across future projects

Yes, almost entirely — the discipline (clean builds, honest docs, working deploys) is project-agnostic. Only the specific tool versions and deployment target are tied to this codebase.
