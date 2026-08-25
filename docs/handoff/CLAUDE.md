# Operational Rules — read before doing anything in this repo

1. **Work only in the BACKUP working copy.** Never write to
   `...\All Final For Claude Code` (no `- BACKUP -` suffix) — that's the
   locked original. Always use
   `...\All Final For Claude Code - BACKUP - 2026-08-18`.

2. **This is not the same project as `C:\Users\Server_Rav\Projects\architect-portfolio`.**
   That's a separate, unrelated, Framer-based portfolio for the same person.
   Don't apply its docs/visual system here.

3. **Never edit `public/diagrams/*.svg`.** They're an approved, external
   asset package. Fix rendering problems in the wiring code / CSS only. If
   a source file itself is genuinely broken or unfinished, report it —
   don't patch around it by redrawing.

4. **Never fabricate data.** If `content/projects/villa-red-sun.ts` or
   `villa-efe.ts` doesn't support a claim, value, or classification, hide
   that UI element — don't invent a plausible-looking value.

5. **Dev server: use port 3001** (`pnpm dev --port 3001`). Port 3000 may
   have a stuck, unkillable process in this environment — check before
   assuming it's free.

6. **Before calling anything done: `pnpm lint` and `pnpm build` must both
   pass clean.** Kill any stale dev server and `rm -rf .next` before a
   fresh verification run.

7. **Verify UI changes with a real browser (Playwright), not just source
   reading.** For `whileInView` Framer Motion animations, scroll gradually
   (`window.scrollTo` in steps) rather than `scrollIntoViewIfNeeded()` —
   the latter can leave elements at `opacity:0` and produce a false
   "broken" reading.

8. **Villa Red Sun and Villa Efe are separate component trees on purpose**
   (`components/red-sun/`, `components/efe/`). Don't cross-import between
   them, and don't change one project while working on the other unless
   asked.

9. **`README.md` and `PROGRESS.md` are stale.** Check
   `docs/handoff/PORTFOLIO_MASTER_STATE.md` first for real current status.

10. **63+ uncommitted git changes exist as of 2026-08-25.** Prefer
    committing logical chunks of work over piling more onto an uncommitted
    tree — ask the user before large new changes if this hasn't been
    addressed yet.

11. **Never write real content into `beats.reflection.text`.** It's an
    explicit placeholder ("not for publication") reserved for Hanibal's own
    voice — do not generate replacement text for it.

12. **Before any destructive git or filesystem operation, check
    `git status` and prefer a fresh backup over trusting git history alone**
    — this project's git history does not reflect current working-tree state
    (see rule 10).
