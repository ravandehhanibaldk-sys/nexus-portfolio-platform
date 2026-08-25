# Portfolio Master State

Handoff document for a new Claude Code session. Written 2026-08-25, after the
previous session hit its usage limit. Every claim below is labeled:

- **FACT** — directly observed in this repo (file content, git history, live verification) this session.
- **INFERENCE** — a reasonable conclusion from FACTs, not independently confirmed.
- **UNKNOWN** — genuinely not established; do not guess, ask the user.

---

## 1. Project Identity

**FACT.** This is the **Nexus Portfolio Platform** — a Next.js 16.2.6 / React
19.2 / TypeScript / Tailwind CSS v4 website for **Hanibal Ravandeh**, a Senior
Architectural Visualizer & BIM Specialist based in Copenhagen/Rødovre,
Denmark. It showcases two real projects: **Villa Red Sun** (Solrød, Denmark —
a renovation merging two existing buildings, twin massing) and **Villa Efe**
(Kyrenia, Northern Cyprus — ground-up new construction, single massing,
four privacy-graded levels).

**INFERENCE — target audience.** Freelance-work positioning aimed at
architecture studios, likely Scandinavian/European. This framing comes from
a *different, related* project on the same machine
(`C:\Users\Server_Rav\Projects\architect-portfolio`, a separate Framer-based
portfolio concept for the same person) — it has not been independently
confirmed inside this repo's own docs. Treat as directionally correct, not
verbatim-sourced.

**FACT — do not confuse with the other project.** There are two separate,
unrelated portfolio codebases on this machine:
1. `C:\Users\Server_Rav\Projects\architect-portfolio` — older, Framer-based, different visual system. Not this project.
2. **This repo** — the real, active build. Everything below refers only to this one.

## 2. File Locations (critical — read before touching anything)

**FACT.**
- **Working copy — safe to edit:**
  `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final For Claude Code - BACKUP - 2026-08-18`
- **Locked original — NEVER write to this, under any circumstance:**
  `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final For Claude Code`
- **Most recent full backup** (today, pre-handoff):
  `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\Backup-Website-2026-08-24-Before-Handoff`
  (1.2 GB; excludes `node_modules/` and `.next/`, both regenerable via `pnpm install` / `pnpm build`; git history included.)

**FACT.** `README.md` and `PROGRESS.md` at the repo root are **stale** —
`PROGRESS.md`'s table still marks PDF Generation as "Not in scope (Release
R2)" and doesn't mention locale routing or Villa Efe's environmental work.
Do not treat either file as current status; this document supersedes them
for status purposes.

## 3. Current Structure — Two Tracks

**FACT.** The project has two parallel output tracks sharing the same
content source (`content/projects/villa-red-sun.ts`, `content/projects/villa-efe.ts`):

### Track A — Website
Live Next.js site, locale-routed (`app/[locale]/...`, confirmed `en` and `da`).
Run with:
```
cd "C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final For Claude Code - BACKUP - 2026-08-18"
pnpm dev --port 3001
```
**FACT — use port 3001, not 3000.** A stuck, unkillable process squats on
port 3000 in this environment (access denied to kill it; owned by a
different session/user). This was true as of 2026-08-19/20; re-check before
assuming it still applies.

### Track B — PDF
**FACT.** A print/export pipeline exists: `app/print/` (print-specific
routes), `components/print/` and `components/print-landscape/` (dedicated
print-styled sheet components — e.g. `plans-sections-sheet.tsx`,
`environmental-sheet.tsx`, `about-sheet-landscape.tsx`), and
`scripts/export-pdf.mjs`, `scripts/export-portfolio-landscape.mjs`,
`scripts/export-landscape-redesign-v3.mjs`, `scripts/prepare-print-assets.mjs`
(headless-browser print-to-PDF, invoked directly with `node`, not via a
pnpm script alias — no `pdf` entry exists in `package.json`'s `scripts`).
Output drafts and QA screenshots accumulate in `pdf-export/` (many dated
iterations already present: `hanibal-ravandeh-portfolio-draft-01/02.pdf`,
several `qa-*.pdf` rounds).

**INFERENCE.** This PDF pipeline was built as a direct result of an earlier
"extract a PDF from the live HTML site" request in this project's history —
it is a fresh derivation from the site's real design, not the same thing as
the separate, older, standalone PDF at `Desktop/.../Portfolio-PDF` (built
2026-07-13, custom layout, not derived from this codebase). Do not merge
the two efforts.

## 4. Current Approved State — Both Tracks

**FACT — Website.**
- Villa Red Sun and Villa Efe pages both live, both locales working.
- Environmental Diagrams component (`components/project/environmental-diagrams.tsx`
  + `.module.css`) went through a full structural rewrite this cycle: real
  ancestor-width investigation → viewport breakout → an explicit two-column
  flex layout (not the earlier row-locked CSS grid) so a Solar/Wind card
  height mismatch no longer forces a shared row to stretch and leave a dead
  gap. `pnpm lint` and `pnpm build` passed clean after this work (last
  verified 2026-08-20/21 in-session; re-verify before trusting it's still
  clean, since 63 files are uncommitted — see Section 5).
- Components 08 (`Solar Architectural Reading`) and 09 (`Wind Envelope
  Reading`) render correctly (real massing, real data, correct chip-hiding
  behavior) but with visibly less rich illustration/color than the
  project's own original reference concept images — **confirmed via direct
  inspection of the raw source SVGs** that this is because
  `public/diagrams/08-solar-architectural-reading.svg` and
  `09-wind-envelope-reading.svg` are themselves unfinished template stubs
  in the delivered "approved final" SVG package (literal placeholder text,
  generic undifferentiated chip boxes) — not a bug in the wiring code. See
  `PORTFOLIO_OPEN_ISSUES.md`.
- Villa Efe's page gained one new content asset this cycle: an 8-panel
  "design evolution" composite image, verified to depict Villa Efe (not
  Villa Red Sun, despite a stale reference in the task brief that named the
  wrong source folder), placed in the "04 — Design Thinking" section,
  captioned in English and Danish, verified on desktop/mobile/both locales,
  zero console errors, lint/build clean.

**FACT — PDF.** Per `PDF-VISUAL-DIRECTION.md` (dated 2026-08-22, the most
current PDF-track status document found):
- Plans & Sections sheet layout — **done, confirmed with screenshots.**
- Environmental Analysis print sheet redesign — **done, confirmed with
  screenshots.**
- Site Analysis graphics redraw (from photographic overlay to illustrated
  line-work matching the plan/section drawing style) — **direction written,
  not implemented.** Explicitly held pending confirmation of the items
  above.
- Print typography scale (formalizing ad hoc `text-[19px]`-style sizing
  into one consistent print-specific scale) — **recommendation only, not
  implemented.**

## 5. Uncommitted Work — Important Risk Fact

**FACT.** `git status --short` shows **63 changed/untracked paths** in the
working copy, including most of the recent work described above
(`environmental-diagrams.tsx`, the entire `app/print/`, `components/print/`,
`components/efe/`, `components/red-sun/`, `dictionaries/`, and more — none
of it committed to git). The last real commit is `16ebe72` ("Remove
ModelExportTest dev tool from production route"); everything since then
exists only in the working tree, backed up only by the file-level backup
folders, not by git history.

## 6. Current Next Priority — Website Environmental Layout

**FACT, per the task that opened this handoff request.** The next priority
is the **Website's Environmental Diagram layout** — continuing/finishing
the structural work described in Section 4. The known concrete remaining
item (see `PORTFOLIO_OPEN_ISSUES.md` for full severity list) is the row-2
height mismatch between the compact Solar Metrics strip and the taller Wind
Exposure illustration, which was explicitly reported as unresolved in the
last structural pass — no swap or reflow found that fixes it without either
violating the "don't touch source SVGs" rule or artificially stretching a
shorter card.
