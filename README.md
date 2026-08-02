# Nexus Portfolio Platform — Release R1 (Website)

This codebase is governed by **`Nexus Portfolio Platform - Master Design Specification v3.0.md`**
in this same folder. Read it before making any design or code decision. Technical
decisions are logged in **`ARCHITECTURE_DECISIONS.md`**. Progress notes live in
**`PROGRESS.md`**.

## Run locally

This project was scaffolded on a Linux sandbox and has **not** had `node_modules`
installed here — install on your own machine (Windows) so native binaries
(Next.js/Turbopack, etc.) match your platform:

```
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Structure

- `app/` — Next.js App Router pages (`/` index, `/projects/villa-red-sun` project page).
- `components/project/` — the Component Library, Spec Section 19 (Hero, NarrativeTextBlock,
  SiteAnalysis, AlternativesComparator, FinalArchitecture, Reflection, ProgressNav).
- `content/projects/` — Project Template data, Spec Section 21. One file per project,
  validated at build time by `lib/content-schema.ts` (Zod, Spec Section 21).
- `public/images/<project-id>/` — pre-processed, non-distorted 1920×1080 imagery
  (Spec Section 20.1). Copied from `A-villa-red-sun-Final-1920-1080/`, filenames
  cleaned of the `_result` suffix.
- `app/globals.css` — Design Tokens, Spec Section 15 (the SSOT, Spec Section 3.2).

## Adding Project 02

1. Add a new file in `content/projects/<id>.ts` matching the schema in `lib/content-schema.ts`.
2. Copy its pre-processed 1920×1080 imagery into `public/images/<id>/`.
3. Add a route at `app/projects/<id>/page.tsx`, following the exact structure of
   `app/projects/villa-red-sun/page.tsx` — no new components should be required
   (Spec Section 21.2, Reusability Test).
4. Update `app/page.tsx` to list both projects once a second one exists (Spec Section 22.3).
