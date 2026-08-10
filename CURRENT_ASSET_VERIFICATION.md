# CURRENT_ASSET_VERIFICATION.md
### Phase 0 — Current Asset Verification
**Date:** 2026-08-10 · **Scope:** Confirm the live codebase against the current authoritative asset library; detect any stale/old-asset references before Phase 1 begins.

---

## 1. Executive Summary

The current numbered asset folders (`A-villa-red-sun-Final/`, 38 files; `B-villa-efe-Final/`, 52 files) are confirmed stable and unchanged since the prior audit — same counts, same filenames, all 90 images still exactly 1920×1080 PNG. That part needed no rework.

What's new in this pass: a direct, file-by-file comparison of what the **live codebase currently references** against what **actually exists in the new library**. Result — **the live site is entirely wired to the old asset set.** Of 32 image references in `villa-red-sun.ts`, only 7 filenames coincide with the new library at all, and all 7 are confirmed — by byte size, not assumption — to be different files despite sharing a name. Of 31 image references in `villa-efe.ts`, only 4 coincide, and all 4 are likewise confirmed different. Nothing has been changed as part of this verification; this is a report only.

---

## 2. What Was Inspected

- Full recursive re-listing of `A-villa-red-sun-Final/` and `B-villa-efe-Final/` (current authoritative folders).
- Every `src:` value in the live `content/projects/villa-red-sun.ts` and `content/projects/villa-efe.ts`.
- Every `src:` value cross-referenced against the new folders' actual filenames (exact string match, case-sensitive).
- File size comparison (bytes) for every filename that coincides between the live site's `public/images/` and the new authoritative folders.
- Full codebase grep (`app/`, `components/`, `lib/`) for any hardcoded `.png`/`.mp4`/`.jpg` reference outside the two content files.
- Current `public/images/villa-red-sun/`, `public/images/villa-efe/`, `public/videos/` — what's actually deployed right now.
- `heroVideo` field in both content files.

---

## 3. What Was Confirmed

- **New library is stable, unchanged, and fully verified:** `A-villa-red-sun-Final/` = 38 files (33 PNG + 5 supporting: project brief `.txt`, solar-path `.txt`/`.pdf`/`.csv`, wind-report `.txt`). `B-villa-efe-Final/` = 52 files (47 PNG + 5 supporting, same pattern). Counts match the prior audit exactly — no drift.
- **All 90 PNGs are exactly 1920×1080**, confirmed in the prior audit and unchanged (folders untouched since).
- **No stale asset paths exist anywhere in the component code.** The codebase grep found zero hardcoded image/video references outside `content/projects/*.ts` — the only place old filenames live is the two content files themselves. This is a clean, single-source-of-truth architecture; fixing it is a two-file content change, not a component rewrite.
- **Villa Efe hero video does not exist in the current authoritative library** (`B-villa-efe-Final/` contains zero video files) — this was already established in the prior audit and is reconfirmed here. The file with that name exists only inside superseded `All Final File - OLD 01/` folders.
- **Villa Red Sun's live `heroVideo` field also points to an asset absent from the current authoritative library.** `A-villa-red-sun-Final/` contains zero video files. The video currently playing on the deployed site (`public/videos/villa-red-sun/Hero-villa-red-sun-exterior-view-01-ORG_erasio.mp4`) was copied in during a prior phase, from what is now a superseded old folder. Per the constitution's Hero rule (animation only from the current authoritative library, static fallback otherwise), **this is now the same situation as Villa Efe**, not an exception — flagged as a decision, not resolved here (§9).

---

## 4. What Was Changed

**Nothing.** This phase is verification only, per the mandatory stop-before-Phase-1 rule. No file was renamed, moved, deleted, or overwritten.

---

## 5. What Was NOT Changed (and why)

- `content/projects/villa-red-sun.ts` / `villa-efe.ts` — still reference the old asset filenames. Left untouched pending Phase 1/4 approval, since remapping content is an Information-Architecture and Content-Mapping decision, not a verification-phase action.
- `public/images/villa-red-sun/` (32 files) and `public/images/villa-efe/` (36 files) — still hold the old, superseded image copies. Left in place; nothing deleted.
- `public/videos/villa-red-sun/` — still holds the old hero video. Left in place.

---

## 6. Current Assets Confirmed Available for Production Use

All 90 files in `A-villa-red-sun-Final/` (33 images) and `B-villa-efe-Final/` (47 images) are confirmed present, correctly dimensioned, and available. Exact inventory by category is unchanged from the prior audit (see `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §4–5 for the full per-file breakdown — not repeated here to avoid duplication, per the instruction that historical discovery need not be redone if already verified).

**No hero video exists in either current authoritative folder** — confirmed absent for both projects, not just Villa Efe.

---

## 7. Observed Problems

| # | Problem | Evidence |
|---|---|---|
| 1 | **Live site is 100% wired to old assets.** 25/32 Villa Red Sun references and 27/31 Villa Efe references don't even coincide by filename with the new library — they use the old naming convention entirely (e.g. `MasterPlan-Idea-B-2-Top_result.png` vs. new `A-09-plan-idea-b2-top-villa-red-sun_result.png`). | Direct `comm` diff, both directions, see §2. |
| 2 | **The 7 + 4 filenames that DO coincide are silently different images.** Every one of the 11 confirmed by byte-size comparison to differ between old (live) and new (authoritative). None can be assumed equivalent by name. | Byte-for-byte size table, §8. |
| 3 | **Villa Red Sun's live Hero video reference now has the same problem as Villa Efe's** — it points to an asset not present in the current authoritative library. This wasn't flagged as a problem in the prior audit because at the time the video genuinely was the authoritative asset; the asset-library reset changes that. | `A-villa-red-sun-Final/` contains 0 video files. |
| 4 | A-06 (Villa Red Sun dining room) is a renamed-**and**-different file (old: `...interior-dinning-room...` [sic], new: `...interior-dining-room...`) — not just a typo fix, a different render. | Filename diff + not in the "coincide" set at all. |

---

## 8. File-Level Evidence (byte-size comparison, filename-coincident files only)

| File | Live (public/images) | New (authoritative) | Verdict |
|---|---:|---:|---|
| A-01-...exterior-view-01_result.png | 3,866,636 B | 3,585,636 B | Different file |
| A-02-...exterior-view-02_result.png | 3,532,203 B | 3,484,959 B | Different file |
| A-03-...exterior-view-03_result.png | 3,618,380 B | 3,312,233 B | Different file |
| A-04-...exterior-view-04_result.png | 3,182,735 B | 3,126,602 B | Different file |
| A-05-...interior-living-room-01_result.png | 2,440,265 B | 2,472,787 B | Different file |
| A-07-...interior-kitchen-01_result.png | 2,506,124 B | 2,763,257 B | Different file |
| A-08-...interior-master-bedroom-01_result.png | 2,563,549 B | 2,684,100 B | Different file |
| B-01-...exterior-view-01_result.png | 3,217,406 B | 3,423,268 B | Different file |
| B-02-...exterior-view-02_result.png | 2,701,570 B | 2,697,844 B | Different file |
| B-03-...exterior-view-03_result.png | 3,028,807 B | 3,091,586 B | Different file |
| B-04-...exterior-view-04_result.png | 3,182,123 B | 3,091,586 B | Different file |

**11 of 11 differ.** Zero exceptions. This empirically confirms the owner's statement that even filename-coincident assets carry real visual upgrades — nothing currently live can be assumed current by name alone.

---

## 9. Risks

- **Silent staleness risk was real, not hypothetical.** Had implementation begun without this verification, the 11 filename-coincident files above would very likely have been left untouched under the false assumption "same name, already correct" — exactly the failure mode Absolute Rule #1 exists to prevent.
- **Villa Red Sun Hero video status is now ambiguous, not settled.** The prior audit treated this as resolved (static fallback for B only); this pass shows the same reasoning now applies to A. Needs an explicit decision (§10), not a silent carry-forward of the old conclusion.
- Two open content conflicts from the prior audit remain **unresolved and unaffected by this verification pass**: the Villa Red Sun wind-diagram three-way contradiction (A-31/32/33), and the Villa Efe coastal-brief-vs-inland-coordinates conflict. Both still block confident Content Mapping (Phase 4) once reached.

---

## 10. Decisions Required (do not proceed past these silently)

1. **Villa Red Sun Hero:** now that no video exists in the current authoritative library for *either* project, should A also drop to the static-fallback (A-01) for now, matching B — or is the existing live video considered still valid/exempt since it predates this specific reset? Recommend treating it the same as B (static fallback, animation slot preserved) for consistency with Constitution #14 and Absolute Rule #4, but this is presented as a recommendation, not decided here.
2. All items already open from the prior audit (wind-data conflict, location conflict, section-variant choice, B-33/B-38, missing GF circulation) remain open and are prerequisites for Phase 4, not Phase 0 — listed here only for continuity, not re-litigated.

---

## 11. Next Phase

Per the mandatory phased workflow: **STOP.** This report is Phase 0 only. Awaiting review/approval before Phase 1 (Information Architecture).
