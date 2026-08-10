---
name: art-direction
description: The single visual-quality and experience gate for the entire portfolio — the most important Skill in this library. Invoke when a new visual asset is added or replaced, when an asset's role or placement changes, before a project's first external-facing deployment, or when explicitly requested. Expensive — invoke deliberately, not on routine commits.
---

This Skill operates under `.claude/PROJECT_CONSTITUTION.md`. In any conflict between this Skill's instructions and the Constitution, the Constitution wins.

## Purpose

The single visual-quality and experience gate for the entire portfolio — the most important Skill in this library.

## Responsibilities

- **Per-render critique.** Lighting, material, color grading, white balance, exposure, composition, camera position, realism vs. AI-artifact detection, fit against Scandinavian taste.
- **Per-plan critique.** Legibility, line weight, hierarchy, print-readiness.
- **Per-diagram critique.** Three-second comprehension, color use, clutter, benchmarked against BIG / Henning Larsen / C.F. Møller diagram conventions.
- **Portfolio Psychology.** What a recruiter perceives at 10 seconds, at 30 seconds, at 2 minutes — and whether each asset earns its place at that checkpoint.
- **Visual Consistency.** Do all Hero moments hold the same bar; does a later project look weaker than an earlier one; is a deliberate visual device (e.g. a dark bookend between Hero and Reflection) applied consistently once adopted, not as a one-off.
- **Image Production Strategy.** How many new renders a project actually needs, and specifically which ones — resisting the urge to render more just because more is possible (Constitution #7).
- **Asset selection.** Given a beat from `portfolio-narrative`, select which specific asset fills it, or flag that nothing available clears the bar. This includes cross-beat reuse decisions — e.g. whether an asset already used as Hero should *also* appear in a later render gallery, or be cut from one location to avoid repetition. That call belongs here even when it surfaces mid-implementation, not to `frontend-system`.
- **Layout/composition consequences.** Grid column counts, image balance within a gallery, and any other layout choice with a visible compositional effect (an orphaned single image in the last row of a grid, an uneven rhythm between sections) are art-direction calls. `frontend-system` implements the resulting layout; it does not decide it silently.
- **Final scored evaluation.** Architecture / presentation / graphic / narrative / UX / employability quality, scored out of 10, with a prioritized fix list.

## Decision Boundary

- Does **not** decide whether a narrative beat should exist, or where a project sits in portfolio order. That's `portfolio-narrative`'s call — this Skill works within beats it's handed, not on the sequence itself.
- Does **not** write code. Verdicts are handed to `frontend-system` for implementation.
- Is **final** within its own domain (image selection, visual quality, composition) — does not need to escalate a routine asset-quality call to the user. Document the reasoning (Constitution #5); don't ask permission for calls squarely inside this boundary. If Hanibal gives a direct instruction that conflicts with a visual-quality call this Skill would otherwise make final, see Constitution #11 — warn, then follow his call.

## Output Contract

- A structured per-asset verdict table: keep / reshoot / cut / promote to hero / print-only / web-only, per asset.
- A portfolio-level scored review (score /10 per dimension, prioritized fix list).
- Any verdict that changes an asset's role (e.g. promote to hero) must state explicitly whether the asset also remains in its original location, and why — this is exactly the kind of call that was previously left ambiguous and had to be corrected after the fact.

## Auto-invoke

- When a new visual asset is added or replaced.
- When an existing asset's role or placement changes — promoted to Hero, moved between beats, reused across sections. This trigger did not exist in the first draft of this Skill and should have caught the Hero/Final-Architecture duplication call the first time it happened; it's here now specifically because of that.
- Before the **first** external-facing deployment of a project whose visual assets have changed since the last art-direction pass. Not before every deployment unconditionally — re-running a full visual critique against unchanged assets on every routine redeploy is wasteful (this Skill is explicitly expensive) and produces no new signal.
- When explicitly requested by Hanibal.
- **Never** on routine content or code commits that don't touch visual assets.

## Reusable across future projects

Yes, fully. The critique criteria (lighting, composition, legibility, psychology checkpoints, consistency) apply to any project's asset set.
