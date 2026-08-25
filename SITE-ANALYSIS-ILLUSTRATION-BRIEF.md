# Site Analysis Illustration — Production Brief

**Written:** 2026-08-25. **Status:** Not producible in this session — needs
Hanibal's own 3D visualization pipeline. This document is the full handoff
package: what to produce, from what reference, in what style, and how to
get it back into the codebase once done.

---

## 1. Why this can't be done inside this session

**Investigated first** (per instruction): searched this repo's docs, ADRs,
and commit history for the process that produced the existing "illustrated"
Final Architecture plans/sections (`A-16-illustration-section-plan-idea-d-
top-villa-red-sun_result.png`, `B-20…24-illustration-section-plan-top-*-
villa-efe_result.png`). Found no script, prompt, or pipeline anywhere in
this repository — no such process is captured here. `PORTFOLIO_INFORMATION_
ARCHITECTURE.md` §8.3 and `IA_DECISION_RESOLUTION_BRIEF.md` confirm these
are part of the **original delivered asset library** (same batch as every
other `A-*`/`B-*` numbered image), not something built during any Claude
Code session — git history for this repo starts at a single "Initial
commit" that already contains them.

**Opened `A-16` and `B-20` directly to see the actual style** (not just the
filename): both are full painterly top-down 3D renders — real furniture,
people, material textures, soft directional lighting, a watercolor-style
edge treatment — not flat vector line-art. This is a 3ds Max / V-Ray /
Corona Renderer output (per the project's own credits: "Architectural
Design, Visualization & BIM Documentation... 3ds Max, V-Ray / Corona
Renderer, AutoCAD, Revit") post-processed in a specific artistic style,
requiring the actual 3D model of the building and Hanibal's own render/
compositing setup to reproduce.

**Why an AI image-generation tool isn't the answer here**, even though one
is available in this session: matching that exact painterly quality and
render style is one problem (no text-to-image or image-to-image model
available here reproduces that specific look reliably), but the harder
problem is geometric accuracy — a generative model does not preserve exact
real-world spatial data (property boundary shape, the precise footprint
and position of every neighboring building, road curvature) from a
reference photo. It reinterprets. For a Site Analysis plate whose entire
purpose is showing the *real* boundary/context accurately, that's not an
acceptable trade — it would risk inventing exactly the kind of geometry
claim CLAUDE.md rule 4 exists to prevent, just via a generative model
instead of a text fabrication. A careful manual SVG trace has the same
core problem in a different form: working from a raster aerial photo
without survey/CAD data, a hand trace cannot guarantee the same precision
this portfolio's other real-data diagrams hold themselves to.

**Conclusion: this needs Hanibal's own 3D visualization workflow** — the
one that already produced every other illustrated plate in this project —
not an approximation from this session.

---

## 2. Geometric ground truth — use these as the precise reference

Do not use imagined or generic site geometry. Trace/model directly from:

**Villa Red Sun:**
- `public/images/villa-red-sun/SiteAnalysis-A-villa-red-sun_result.png` —
  primary reference. Real site boundary, adjacent buildings, road, and
  compass orientation, confirmed accurate in earlier sessions.
- `public/images/villa-red-sun/A-34-site-spotting-villa-red-sun_result.png`
  — secondary reference, same site from a different framing.

**Villa Efe:**
- `public/images/villa-efe/B-47-site-spotting-villa-efe_result.png` —
  primary reference. Contains labeled real elements: coastline, green
  area boundary, adjacent buildings (purple outline), coast road,
  secondary access road, project site (yellow outline), adjacent property
  limits, and a compass rose (true north is toward the sea per
  `content/projects/villa-efe.ts`'s own site beat text — confirm this
  matches the compass mark in the image before finalizing).

**Preserve exactly:** site/property boundary shape, every adjacent
building's real footprint and relative position, road position and
curvature, the project site's own footprint, and true compass orientation.

**Do not add:** any adjacent building, road, or boundary feature not
visible in the reference photos. If a real element is ambiguous or
partially obscured in the photo, resolve it from the second reference
image or flag it rather than guessing.

---

## 3. Style to match — exactly, not approximately

Match `A-16-illustration-section-plan-idea-d-top-villa-red-sun_result.png`
and `B-20-illustration-section-plan-top-bs-villa-efe_result.png` (both in
`public/images/`) as the style reference:
- Soft, painterly top-down illustrated render (not flat vector/line-art)
- Muted, natural material palette — the same warm-neutral tones used
  throughout Final Architecture
- Illustrated vegetation texture for trees/green areas (matching the soft
  rendered-canopy look in those references, not photographic foliage)
- Thin, precise line annotations in a single accent color for
  boundary/callout marks (the existing site plates use blue on Red Sun's
  reference set and purple/yellow/green on Efe's — pick one consistent
  accent treatment and hold it across both projects' new plates)
- Labeled callouts matching the existing vocabulary: site boundary,
  adjacent buildings, green area, road(s), project site, compass/north —
  same words already used in the current photographic-overlay versions,
  just redrawn instead of overlaid on a photo

---

## 4. Deliverable spec

- One new image per project, same aspect ratio and resolution class as
  the existing `_result.png` assets in `public/images/<project>/`
  (1920×1080 / 16:9, matching every other asset in this library).
- Suggested filenames (matching this project's existing convention):
  - `SiteAnalysis-A-villa-red-sun-Line-Illustration_result.png`
  - `SiteAnalysis-B-villa-efe-Line-Illustration_result.png`
- PNG, same color/quality profile as the other `_result.png` assets.

## 5. Handoff back to Claude Code once produced

1. Drop the two finished files into `public/images/villa-red-sun/` and
   `public/images/villa-efe/` using the filenames above (or tell me what
   you actually named them).
2. Tell Claude Code the files exist and are ready to wire in. Integration
   points, confirmed this session:
   - **PDF**: `app/print/test-full-landscape-redesign/page.tsx` passes
     `siteImageSrc={rsSiteImg.src}` / `{efSiteImg.src}` to
     `NarrativeSheetLandscape` — currently reading `beats.site.assets[0]`
     from `content/projects/*.ts`. Swap that asset (or add the new one as
     the new `assets[0]`) once produced.
   - **Website**: Villa Efe's `components/efe/site-analysis-editorial.tsx`
     renders `beats.site.assets` directly (lead + grid) — same swap
     applies there. **Villa Red Sun's website does not currently show any
     Site Analysis image at all** — this was a separate, already-approved
     content decision (`components/red-sun/site-analysis-editorial.tsx`
     intentionally omits the image grid), not something this brief
     changes. Producing the new Red Sun plate only affects the PDF unless
     that earlier decision is revisited — flagging so this doesn't get
     assumed to also need a website change for Red Sun.
3. I'll run `pnpm lint`/`pnpm build`, verify both projects/both locales in
   a real browser, re-export and visually confirm the real PDF, and commit
   — the same verification discipline as every other change this session.

---

**Bottom line:** the current photographic-overlay Site Analysis assets
stay in place and remain accurate/usable until this is produced — per
`PDF-VISUAL-DIRECTION.md`'s own framing, this is a quality upgrade, not a
correctness fix, so there's no urgency pressure on when it happens.
