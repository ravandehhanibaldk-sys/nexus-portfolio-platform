---
name: portfolio-narrative
description: Owns what the portfolio says and in what order, evaluated against Danish/Scandinavian hiring-panel expectations. Invoke when a project is added, reordered, or evaluated for inclusion; when project copy is drafted or revised; before any PDF export.
---

This Skill operates under `.claude/PROJECT_CONSTITUTION.md`. In any conflict between this Skill's instructions and the Constitution, the Constitution wins.

## Purpose

Own "what the portfolio says and in what order," evaluated against Danish/Scandinavian hiring-panel expectations (Henning Larsen, COBE, C.F. Møller, Arkitema, BIG, Dorte Mandrup, Nordic Office of Architecture, and comparable studios).

## Responsibilities

- **Portfolio-level project order.** Which project leads, which follows, and why that sequence makes the strongest case for the candidate as a whole (Constitution #10).
- **Whether a project should be added at all.** Not just where it sits once accepted — evaluate a candidate project against Constitution #6 ("strengthens the portfolio, not merely increases its size") before it's built out. A project that duplicates an existing project's thesis, scale, or challenge type does not automatically earn a slot.
- **Per-project narrative arc.** The eight-beat structure (Client Challenge → Site → Constraints → Design Thinking → Design Process → Final Decision → Final Architecture → Reflection) and how a specific project's real content maps onto it. Not every project fits the template the same way — Villa Red Sun's beats compare cost/quality tiers; Villa Efe's compare privacy-graded floor levels. Deciding which mapping is honest to the source material is this Skill's job.
- **Which narrative beats a project needs** — not which image fills each beat. If a beat has no real content to draw from, mark it not-applicable rather than inventing content for it (Constitution #8).
- **Copy register.** Architect-voice vs. visualizer-voice language; keeping the platform reading like an architectural publication (Divisare, Detail Magazine, El Croquis) rather than a rendering showreel.
- **Benchmarking against Danish office portfolios** — what those portfolios lead with, how much text they carry, what they never show.

## Decision Boundary

- Does **not** judge image quality, composition, lighting, or choose between two candidate assets for the same beat. That is `art-direction`'s job — this Skill defines that a beat exists and what question it answers; `art-direction` decides what fills it.
- Does **not** touch code, components, or design tokens. That is `frontend-system`'s job.
- Does **not** decide whether an individual asset should also be reused elsewhere (e.g. promoted to Hero while remaining in a render gallery) — that is an `art-direction` verdict, even though it looks narrative-adjacent. This boundary was tested for real in this project: the Hero/gallery duplication question was originally decided as an implementation-time call and had to be manually overridden later. It belongs to `art-direction`.

## Output Contract

- An ordered list of named narrative beats per project, and for the portfolio as a whole.
- Flagged gaps — beats with no real source material, marked not-applicable rather than filled.
- Copy-edit notes, not full copywriting. Narrative text stays human-authored per Constitution #8; this Skill flags what's missing, weak, or off-register, it does not silently write final copy in Hanibal's voice.
- A stated Differentiator per project (what this project proves that no other project already proves) and a check against every other project's Differentiator for duplication.

## Auto-invoke

- When a project is added, removed, or reordered in the portfolio.
- When project copy (thesis sentence, differentiator, beat text) is drafted or revised.
- Before any PDF export (Section 24 of the platform spec — narrative sequence must be locked before pagination starts).
- **Do not** auto-invoke on a newly-created project until its content files are actually populated. Running a narrative review against empty scaffolding produces noise, not signal — wait until real source text has been read and mapped.

## Reusable across future projects

Yes, fully. The eight-beat framework and the ordering/differentiation logic apply to any project added to the platform; only the values change, never the shape (Constitution #4, project template reusability).
