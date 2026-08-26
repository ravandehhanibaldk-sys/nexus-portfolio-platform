# Motion redesign experiment

Branch: `experiment/motion-redesign`. **Not merged into `master`, not part of the live/production site.**

Hanibal asked to explore a darker, more animated visual direction (inspired by motionsites.ai — a paid/proprietary template site, not copied here) using [Magic UI](https://magicui.design), a free, MIT-licensed component library built on React + Tailwind + Framer Motion.

## What this is

A single, contained test on the home page's intro block only (`app/[locale]/page.tsx`): the plain eyebrow + `<h1>` "Selected Work" heading now sits inside a full-bleed dark section with an animated particle background and a staggered word-reveal on the heading. Everything else — the project cards, their text, the About link, routing, content data — is byte-for-byte unchanged.

## Components used, and why

- **[Particles](https://magicui.design/docs/components/particles)** — a lightweight canvas particle field, used as the hero section's background. Chosen over heavier options (animated grid patterns, warp backgrounds) because it's subtle and works well behind text without competing with it.
- **[TextAnimate](https://magicui.design/docs/components/text-animate)** — a configurable on-mount text reveal (word/character/line, several animation presets). Used here with `animation="blurInUp"` and `by="word"` for a soft, editorial-appropriate reveal on the `<h1>` — not a gimmicky effect.

Both were vendored directly (not installed via the shadcn CLI, since this project doesn't use shadcn/ui and adding that scaffolding wasn't warranted for a two-component test) into this folder, adapted only where needed:
- `particles.tsx` — unmodified logic; only wired to this project's existing `cn()` from `lib/utils.ts`.
- `text-animate.tsx` — same, plus its import updated from Magic UI's `motion/react` to this project's `framer-motion` (the same library pre-rename; the API used here is identical).

## Design choices

- Colors: the hero reuses this project's **existing** `--color-paper-dark` / `--color-ink-dark` tokens (`app/globals.css`) — the same pair `components/project/hero.tsx` already uses for its own full-bleed dark treatment, per that stylesheet's own comment marking them for "full-bleed hero moments only." No new colors were introduced.
- `prefers-reduced-motion` is respected: the particle field is skipped entirely, and the heading renders as a plain static `<h1>` instead of the staggered reveal — matching the guard pattern already used everywhere else in this codebase (`Hero.tsx`, `ClimateInterface`, `ProjectCardMedia`).

## Candidates considered but not implemented here

Identified as worth exploring in a future pass, not built in this test (per the "1-2 components, one contained area" scope):
- **Magic Card** (spotlight/border glow following the cursor) — for the Villa Red Sun / Villa Efe project cards' hover state, as a more dynamic alternative to the current `scale-[1.02]` hover.
- **Border Beam** — an animated light tracing a card's border on hover, same use case.

## To view

This branch is deployed as a Vercel preview only (see the PR/branch deployment, not the production domain). To run locally: `git checkout experiment/motion-redesign && pnpm dev`, then visit `/en` or `/da`.
