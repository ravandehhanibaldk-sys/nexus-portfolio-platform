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

**FACT — Website.** Rewritten 2026-08-25 after a long autonomous session
closed out nearly every open item from the previous version of this
document. Current state:
- Villa Red Sun and Villa Efe pages both live, both locales (en/da)
  fully working, including reflection closing text (see below).
- Environmental Diagrams component: the row-2 height mismatch (former
  M1) is resolved — two independent flex columns, `EnvironmentalDisclosure`
  moved to the Solar column to rebalance — verified live on both projects.
- Components 08 (`Solar Architectural Reading`) and 09 (`Wind Envelope
  Reading`) **no longer ship broken placeholder content.** A machine-wide
  read-only search found a genuinely richer original source
  (`Desktop/.../All Final File/Environmental-Diagrams-Final/`); both SVGs
  now carry real illustrated building/sun-path/wind-flow artwork.
  Fabricated-looking specific claims from that source (exact facade/
  exposure values) were deliberately not carried over — see
  `PORTFOLIO_OPEN_ISSUES.md` M2 for the full reasoning. Chips remain
  force-hidden in production, unchanged from before.
- Villa Efe's 8-panel "design evolution" composite image — confirmed
  present and correctly displayed (re-verified this session by reading
  the raw file directly).
- **Reflection (Component 19.9)**: both English and Danish
  `reflection.text` are now real, finished, first-person content for
  both projects — no placeholder remains in either locale. English was
  already complete; Danish was authorized and translated by Hanibal this
  session.
- **About page**: the process-cycle (IDEA → SITE → ... → REFLECTION) was
  redesigned from a flat single-line label into a typographic sequence —
  input words smaller/neutral, resolution words larger/full-ink, quiet
  arrow separators — on both the website and the PDF About sheet. Same
  eight words, same order, nothing else on the page changed.

**FACT — PDF.**
- Plans & Sections sheet layout — done, confirmed with screenshots.
- Environmental Analysis print sheet redesign — done, confirmed with
  screenshots. Note: this sheet uses a separate, pre-produced static PNG
  per project — it does not render 08/09 live, and never has.
- **Reflection is now integrated as the closing sheet per project**
  (`components/print-landscape/reflection-sheet-landscape.tsx`), same
  dark bookend treatment as the website. 18 sheets total (was 15/16).
  Verified via real rendered PDF pixels, not just DOM.
- About page cycle redesign applied to the PDF About sheet too, verified
  via real rendered PDF page.
- Print typography scale (N4) — resolved, see `PORTFOLIO_OPEN_ISSUES.md`.
- Site Analysis graphics redraw (N3) — investigated in depth, confirmed
  not producible in an AI coding session (the existing illustrated
  plates are full painterly 3D renders from Hanibal's own 3ds Max/V-Ray/
  Corona pipeline, with no reproducible script anywhere in this repo).
  Full production brief prepared: `SITE-ANALYSIS-ILLUSTRATION-BRIEF.md`
  (repo root) — exact geometric references, style spec, and integration
  instructions for Hanibal's own workflow. Current photographic version
  stays in place, confirmed accurate, until that's produced.

## 5. Git State

**FACT.** All work through this session is committed locally, in atomic,
logically-grouped commits — see `git log --oneline` for the full
sequence (i18n infrastructure, Environmental Diagrams, editorial
redesign, About page, PDF pipeline, graphify refresh, handoff docs,
Danish reflection text, PDF Reflection sheet, launch.json fix, About
typography redesign, diagram 08/09 replacement, and any commits from
this session's remaining work). Nothing has been pushed to
`origin/master`, per standing instruction — local commits only until
Hanibal reviews and decides.

## 6. Current Next Priority

**FACT, as of this rewrite.** B1, M1, M2, M3, M4, and N4 are all
resolved. The portfolio (website + PDF) is in a fully finalized,
ready-for-Hanibal's-review state on everything an AI coding session can
responsibly close out. The one remaining item, N3 (PDF Site Analysis
illustration), is not a next priority for further AI work — it's
handed off to Hanibal's own 3D visualization workflow, per
`SITE-ANALYSIS-ILLUSTRATION-BRIEF.md`. Current photographic Site
Analysis assets stay in place and remain accurate until that's
produced.
