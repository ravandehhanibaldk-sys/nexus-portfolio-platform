# IA_DECISION_RESOLUTION_BRIEF.md
### EXECUTION PHASE 1 — Part 2 | IA Decision Resolution Pass
**Date:** 2026-08-10 · **Status:** Documentation only. No implementation, no content edits, no asset changes performed.

> **PHASE 1 DOCUMENTATION: ACCEPTED** (per Project Manager determination)
> **EXECUTION PHASE 2: HOLD / NOT AUTHORIZED**
> This document resolves, where evidence allows, the seven open Information Architecture items from `PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.1–§8.7. It does not implement anything. Every item below ends in one of: evidence-supported recommendation awaiting sign-off, or an explicit "awaiting Project Manager election" where evidence is insufficient to choose. Nothing here is self-authorizing.

**Evidence sources actually inspected for this pass** (all under the canonical evidence boundary — current authoritative libraries and existing canonical documentation only):
- `All Final File/A-villa-red-sun-Final/` — full directory listing, plus direct reads of `A-project_villa-red-sun.txt` and `A-31-wind-analysis-report-villa-red-sun.txt`.
- `All Final File/B-villa-efe-Final/` — full directory listing, plus direct reads of `B-project_villa-efe.txt` and `B-45-wind-analysis-report-villa-efe.txt`.
- Byte-size and MD5 comparison of `B-33-circulation-plan-top-groof-villa-efe_result.png` vs. `B-38-circulation-plan-top-groof-villa-efe_result.png` (new evidence generated this pass, by direct file inspection — not an assumption).
- `PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.1–§8.7 (existing canonical IA document — source of the exact unresolved questions).
- `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §6.4, §7.1–§7.5, §8 (existing canonical prior audit — contains the only recorded direct visual inspection of the wind and circulation diagrams' actual contents).
- `All Prompts/2 - Air Flow/`, `All Prompts/3 - Day Light/` — directory listings only (confirmed no additional written spec exists beyond what the Briefing Report already quotes).

**What was NOT done:** no image was newly opened and visually inspected pixel-by-pixel by me in this pass (this session's image-viewing tooling has an established reliability problem, documented in `PROGRESS.md`). Where a claim rests on visual diagram content, it is sourced from the existing canonical Briefing Report's own recorded direct inspection, not re-verified here — this is flagged explicitly in every item where it applies, per the evidence-discipline rule that an indirect/secondhand source must never be silently upgraded to direct.

---

## Item §8.1 — Villa Red Sun Wind Analysis (Site Beat)

### 5.1 Exact Unresolved Question
"A-31/32/33 disagree on summer prevailing wind direction (S–SW / SE–SSE / W–SW). No IA decision can pick the Site beat's wind content until this is resolved." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.1)

### 5.2 Verified Evidence
- **E1 (document text, read directly this pass):** `A-31-wind-analysis-report-villa-red-sun.txt` states, sourced to DMI Danish wind climatology and a 2025 DCE/Aarhus University WRF analysis: Summer prevailing direction **W (≈260°–290°)**, secondary SW/NW; Annual prevailing **W (≈260°–290°)**, secondary SW, with "W ≈22%; SW ≈19% in 2023 WRF reference." The report is explicitly titled "Final diagram" and links to a file named `final_wind_analysis_diagram.png`.
- **E2 (canonical prior documentation, not re-verified by me this pass):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §7.1 records, from a direct visual inspection performed in that prior session: diagram v1 (A-31) visually reads **S–SW**, v2 (A-32) reads **SE–SSE**, v3 (A-33) reads **W–SW**, for summer prevailing direction.
- **E3 (existing canonical IA document):** `PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.1 independently restates the same three-way disagreement, confirming E2 is not a one-off claim.
- **E4 (filename convention):** the report file (`A-31-...txt`) shares its number with diagram v1 (`A-31-wind-analysis-diagram-v1...png`), which would naively suggest v1 is the diagram the report describes.

### 5.3 Evidence Classification
**INDIRECT.** E1 is DIRECT for the underlying numeric data. E2/E3 are DIRECT statements *within canonical documentation*, but the fact they describe (what each diagram image visually shows) was established by a visual inspection this pass did not repeat — so the chain from "report data" to "which diagram matches it" is INDIRECT, not independently re-confirmed today. E4 (number-pairing) is present but is contradicted by E2, so it cannot be treated as confirming evidence on its own (see 5.5).

### 5.4 Available Options
**Option A — Use A-31 (v1)** by number-pairing convention with the report.
**Option B — Use A-33 (v3)** by data-content correspondence with the report.
**Option C — Use A-32 (v2)**.
**Option D — Do not display a per-tier wind diagram at all**; rely on the Solar Path diagram (A-29) alone for the Site beat's environmental-conditions content.

### 5.5 Consequences of Each Option

**Option A (v1 by number-pairing):**
- *Architectural/IA:* Simplest to justify by filename alone; zero risk of picking a mismatched file if E2 is somehow wrong.
- *Narrative/Content:* Directly contradicts the report's own numeric data (S–SW vs. the report's W ≈260–290°) per E2 — if E2 is accurate, this option would display a wind diagram whose caption/data disagrees with the diagram people would associate with it by numbering.
- *Asset:* No new asset needed either way.

**Option B (v3 by data correspondence) — evidence-preferred, see 5.6:**
- *Architectural/IA:* Requires overriding the naive number-pairing assumption in favor of content-matching — a reasonable but non-default judgment call.
- *Narrative/Content:* The Site beat's diagram would agree with the sourced DMI/WRF data if the diagram is displayed alongside or referencing that data.
- *Asset:* No new asset needed.

**Option C (v2):**
- No evidence supports this option specifically; included only for completeness since it is one of the three existing files. Not recommended.

**Option D (Solar Path only, drop per-tier wind diagram):**
- *Architectural/IA:* Removes the disagreement entirely by not exposing it. Consistent with the §8.7 Daylight-diagram precedent (favoring the diagram type that is internally consistent, i.e. Solar Path, over one with unresolved contradictions).
- *Narrative/Content:* Site beat becomes thinner (loses the wind-rose visual), though the Solar Path diagram (A-29) is confirmed data-driven and functional.
- *Asset:* No new asset; simply excludes A-31/32/33 from the mapping.

### 5.6 Recommendation
**RECOMMENDATION: SUPPORTED — Option B (A-33 / v3)**, on the following explicit basis: the report's own sourced numeric data (E1, DIRECT) matches the visual content recorded for v3, not v1, in the canonical Briefing Report (E2). The naive number-pairing assumption (E4) is explicitly contradicted by E2 and should not be relied on. **Caveat the Project Manager must weigh:** this recommendation depends on E2's accuracy, which this pass did not independently re-verify by re-opening the three images. If greater certainty is wanted before finalizing, the images should be re-opened and visually cross-checked against the E1 data table directly — this brief flags that as an available step, not a required one.

If the Project Manager does not want to rely on E2 without independent re-verification, the correct status is **STATUS: AWAITING PROJECT MANAGER ELECTION**, with Option D (Solar Path only) as the lowest-risk fallback that sidesteps the disagreement entirely.

---

## Item §8.2 — Villa Efe Wind Analysis (Site Beat)

### 5.1 Exact Unresolved Question
"Two versions (B-45/46) exist; a spot check found no direct contradiction but they were not exhaustively cross-verified. Needs a final 'use this one' confirmation before content mapping." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.2)

### 5.2 Verified Evidence
- **E1 (document text, read directly this pass):** `B-45-wind-analysis-report-villa-efe.txt` states, sourced to a regional climatological series for "the nearest comparable inland climatology": Summer prevailing **W (≈250°–290°)**, secondary NW/WNW; Annual prevailing **W (≈250°–290°)**, "W dominant most of year." Titled "Final diagram," links to `final_wind_analysis_35_20_39N_33_14_34E.png`.
- **E2 (same document, self-flagged caveat, DIRECT):** the report explicitly states: *"the coordinate is inland rather than directly coastal"* and that it used "the nearest comparable inland climatology," referencing Nicosia, Cyprus weather data.
- **E3 (canonical project brief, read directly this pass):** `B-project_villa-efe.txt` — Site Characteristics: *"a rare waterfront plot located directly at sea level with uninterrupted panoramic views over the Mediterranean Sea"*; Site Constraints include *"Extremely close proximity to the sea."*
- **E4 (existing canonical documentation):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §7.2 independently records the same brief-vs-coordinates conflict as an open, unresolved item — this is not a new finding, it is corroboration of E2/E3 already being on record.
- **E5 (existing canonical IA document):** `PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.2 records a prior "spot check" that found no direct contradiction *between B-45 and B-46 specifically*, but explicitly states this was not exhaustive.
- No visual-inspection record (equivalent to §8.1's E2) exists anywhere in canonical documentation comparing what B-45 and B-46 each visually depict. **NO DIRECT EVIDENCE FOUND** distinguishing the two diagrams' content from each other.

### 5.3 Evidence Classification
**AMBIGUOUS.** E1 gives usable numeric data for B-45 specifically. But E2 directly contradicts E3 — the report's own coordinate basis is self-described as inland, while the canonical project brief describes a waterfront/sea-level site. This is a genuine, source-confirmed conflict, not a matter of interpretation. Because the wind data's geographic grounding is itself in question, no diagram choice made from this data can be rated better than AMBIGUOUS confidence, independent of which file is picked.

### 5.4 Available Options
**Option A — Use B-45 (v1)**, paired with its report by number, same convention as §8.1's Option A.
**Option B — Use B-46 (v2)**.
**Option C — Do not display a per-tier/site wind diagram**; rely on the Solar Path diagram (B-44) alone, same reasoning as §8.1 Option D.
**Option D — Hold the wind diagram decision entirely pending clarification of the coastal-vs-inland coordinate discrepancy**, since that discrepancy affects the credibility of both B-45 and B-46 equally.

### 5.5 Consequences of Each Option

**Option A/B (either diagram):**
- *Architectural/IA:* Whichever is chosen slots into the same Site-beat position; no structural difference between A and B.
- *Narrative/Content:* Both carry the same underlying credibility problem (E2/E3 conflict) — choosing one over the other does not resolve it, it only picks which specific numbers get shown. §8.1's lesson (number-pairing is not reliable proof) applies here too: B-45's pairing with its own report is not, by itself, evidence that B-45 is the *better* diagram — only that it is the one with an attached data table.
- *Asset:* No new asset needed.

**Option C (Solar Path only):**
- *Architectural/IA:* Sidesteps a data-credibility problem this pass cannot resolve. Consistent with the same fallback offered for §8.1.
- *Narrative/Content:* Villa Efe's Site beat loses the wind-rose visual but keeps a confirmed-functional, data-grounded diagram (Solar Path, B-44).
- *Asset:* No new asset.

**Option D (hold pending clarification):**
- *Architectural/IA:* Most conservative; defers Site-beat finalization for Villa Efe's environmental cluster specifically until the location question is answered by the Project Manager (who may know whether "inland coordinates" was a placeholder input or a genuine data-sourcing choice made deliberately to protect the client's exact address per the brief's own privacy note).
- *Narrative/Content:* No content risk taken either way; simply slower.
- *Asset:* No new asset.

### 5.6 Recommendation
**RECOMMENDATION: NOT SUFFICIENTLY SUPPORTED** to pick between B-45 and B-46 on data grounds — no evidence distinguishes their content (5.2, last bullet).

**STATUS: AWAITING PROJECT MANAGER ELECTION**, with an added note this pass is obligated to surface: the brief's own "Location Note" states *"the exact location has intentionally been omitted to respect the client's privacy"* — it is plausible (not established — flagged per the No Invention Rule as **UNKNOWN / NOT ESTABLISHED BY CURRENT EVIDENCE**) that the coordinates used to generate the wind/solar analyses were a deliberately-substituted stand-in location rather than the real site, precisely because of that stated privacy constraint. This would explain, without contradiction, why the analysis reads as "inland Nicosia" while the brief describes a waterfront property — but this brief does not assert that explanation as fact. If accurate, it would mean the wind diagrams are not "wrong," they are analyzing a deliberately different reference point, which reframes (but does not resolve) the choice between B-45/B-46 and whether either should be shown as if describing the real site's conditions. This distinction can only be confirmed by the Project Manager.

---

## Item §8.3 — Section Variant: Raw Photorealistic vs. Illustrated (Both Projects)

### 5.1 Exact Unresolved Question
"Both exist for both projects. Illustrated matches the established editorial register more closely; raw is more technically literal (shows the excavation/soil condition explicitly). Genuine curatorial choice, not decided here." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.3)

### 5.2 Verified Evidence
- **E1 (directory listing, confirmed this pass):** Villa Red Sun has both `A-12/13` (raw, "section-a-a"/"section-b-b") and `A-14/15` (illustrated, same section pair). Villa Efe has both `B-16/17` (raw) and `B-18/19` (illustrated). Both pairs genuinely exist for both projects — the premise of the question is confirmed accurate.
- **E2 (project briefs, read directly this pass):** neither `A-project_villa-red-sun.txt` nor `B-project_villa-efe.txt` mentions a preferred rendering/illustration style anywhere in their text.
- **NO DIRECT EVIDENCE FOUND** favoring raw over illustrated or vice versa, in any canonical document.

### 5.3 Evidence Classification
**ABSENT.**

### 5.4 Available Options
**Option A — Illustrated** (A-14/15, B-18/19) for both projects.
**Option B — Raw photorealistic** (A-12/13, B-16/17) for both projects.
**Option C — Mixed**, chosen per-project or per-section individually.

### 5.5 Consequences of Each Option

**Option A (Illustrated):**
- *Architectural/IA:* No structural change — same slot in Final Architecture either way.
- *Narrative/Content:* Matches the editorial register already established by A-16/B-20–24 (which are themselves illustrated). Creates visual consistency across all "illustrated" assets in Final Architecture.
- *Asset:* No new asset needed; simply which existing pair is selected.

**Option B (Raw):**
- *Architectural/IA:* No structural change.
- *Narrative/Content:* Shows soil/excavation condition explicitly (relevant for both projects' engineering-challenge narrative — Villa Efe's brief specifically discusses coastal excavation and soil-retention engineering; a raw section would visually support that text in a way the illustrated version may not).
- *Asset:* No new asset.

**Option C (Mixed):**
- *Architectural/IA:* Introduces an inconsistency between the two projects' Final Architecture sections unless a clear rule justifies it (e.g., "raw where soil condition is a stated engineering challenge").
- *Narrative/Content:* Could be deliberately justified for Villa Efe specifically, given its brief's explicit emphasis on "Engineering Challenges" / soil retention — but this brief does not assert that justification as evidence-backed; it is offered only as a materially plausible option, not a recommendation.
- *Asset:* No new asset.

### 5.6 Recommendation
**RECOMMENDATION: NOT SUFFICIENTLY SUPPORTED** — no source material establishes a preference in either direction.
**STATUS: AWAITING PROJECT MANAGER ELECTION.** Pure curatorial choice, as the existing IA document already correctly identified.

---

## Item §8.4 — Villa Efe Ground Floor Circulation (Missing)

### 5.1 Exact Unresolved Question
"No circulation diagram exists for GF in the current library (confirmed in Phase 0, re-confirmed here). Site-level also has no circulation diagram, but that may simply not apply at site scale rather than being a gap — flagged as a distinct, lower-confidence observation, not asserted as fact." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.4)

### 5.2 Verified Evidence
- **E1 (directory listing, confirmed this pass):** the circulation-category files present are `B-33-circulation-plan-top-groof`, `B-35-circulation-plan-top-bs`, `B-37-circulation-plan-top-f1`, `B-38-circulation-plan-top-groof`. No file exists for Ground Floor (`gf`) or Site under the circulation category, under any number.
- **E2 (numbering-sequence observation, this pass):** the other four 5-part analysis categories (plans B-11–15, daylight B-25–29, airflow B-30–34, privacy-gradient B-39–43) each use exactly 5 consecutive numbers, one per level+site (bs/gf/f1/groof/site). Circulation is the only category that does not: it has 3 "in-sequence" files (B-35, B-37, B-38, i.e., missing B-36 and no site-circulation number at all before B-39 is claimed by privacy-gradient), plus one out-of-sequence file (`B-33`, which duplicates the airflow category's own number). This numbering gap is consistent with, and independently corroborates, the absence already stated in E1.
- **E3 (existing canonical documentation):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §7.5 states plainly: *"No circulation diagram exists for Ground Floor at all — confirmed gap, not a mislabel."*

### 5.3 Evidence Classification
**DIRECT** — the absence itself is directly confirmed by E1 (a completed directory listing, not an inference), and independently corroborated by E2 (INDIRECT, numbering pattern) and E3 (DIRECT, prior canonical audit).

### 5.4 Available Options
This item is not "which file to use" — it is "how to handle a real gap." Two genuinely different options exist for how the Ground Floor Comparator tab should present its five diagram slots (Plan/Airflow/Daylight/Circulation/Privacy-Gradient) given Circulation has no asset:
**Option A — Show four diagrams for Ground Floor** (Plan, Airflow, Daylight, Privacy-Gradient), simply omitting the Circulation slot for that one tab.
**Option B — Omit the Circulation diagram type entirely, for all four Comparator tabs**, so every tab shows the same four diagram types consistently, rather than three tabs showing five and one showing four.

### 5.5 Consequences of Each Option

**Option A (omit for GF only):**
- *Architectural/IA:* Minor visual asymmetry — three tabs show 5 diagrams, one shows 4. The Comparator component does not require a fixed count per tab (confirmed in `PHASE1_ARCHITECTURE_DECISION_DOCUMENT.md` §4.5 — grids are asset-count-driven, not asset-identity-driven), so this is technically trivial either way.
- *Narrative/Content:* Preserves the most information (three fully-populated tabs). Constitution's no-invention rule is respected — nothing is fabricated to fill the gap.
- *Asset:* No new asset; no relabeling of an unrelated diagram to stand in for circulation.

**Option B (omit for all four tabs):**
- *Architectural/IA:* Fully consistent grid shape across all four tabs — arguably cleaner from a pure layout-symmetry standpoint.
- *Narrative/Content:* Discards three real, existing, correctly-labeled Circulation diagrams (bs/f1/groof) purely for visual symmetry — a real content cost for a presentation-only gain.
- *Asset:* No new asset; simply excludes three otherwise-usable assets from the mapping.

### 5.6 Recommendation
**RECOMMENDATION: SUPPORTED — Option A** (show Circulation for the three levels that have it; omit only for Ground Floor), on the basis that `PHASE1_ARCHITECTURE_DECISION_DOCUMENT.md` §4.5 already establishes the Comparator's grid is asset-count-driven with no fixed-count requirement, making Option B's symmetry argument a stylistic preference rather than a technical necessity, while Option A avoids discarding three real, verified assets. This recommendation concerns *presentation-consistency judgment*, not a fact question, so it is offered as a recommendation for Project Manager sign-off, not asserted as self-evidently correct.

---

## Item §8.5 — Villa Efe Roof Circulation: B-33 vs. B-38

### 5.1 Exact Unresolved Question
"Both genuinely different images (confirmed by direct visual inspection in Phase 0), B-38 visibly more complete. Which one represents the intended final Roof circulation asset is not decided here." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.5)

### 5.2 Verified Evidence
- **E1 (file inspection, performed this pass):** direct byte-size and MD5 comparison confirms `B-33-circulation-plan-top-groof-villa-efe_result.png` (3,291,788 bytes, MD5 `fb6d40d5...`) and `B-38-circulation-plan-top-groof-villa-efe_result.png` (3,176,055 bytes, MD5 `325a4127...`) are two genuinely distinct files — not a duplicate/rename accident. This directly confirms, by independent means, what the existing IA document already stated.
- **E2 (existing canonical documentation):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §7.5 records, from direct visual inspection performed in that prior session: *"B-38 is visibly more complete (denser path network, more nodes)."* Not re-verified visually by me this pass (same caveat as §8.1/E2).
- **E3 (numbering-sequence observation, this pass, INFERENCE not fact):** per the same analysis in §8.4/E2, the circulation category's in-sequence numbers are 35 (bs), 37 (f1), 38 (groof) — B-38 fits the expected sequential position for "groof" within the category's own numbering pattern. B-33 duplicates the *airflow* category's roof number instead, which is consistent with B-33-circulation being an earlier or out-of-sequence file that was never renumbered into the 35–39 circulation block.

### 5.3 Evidence Classification
**DIRECT** for the fact that the two files differ (E1, independently reproduced this pass). **INDIRECT** for which one is "the intended final asset" (E2, secondhand visual read; E3, numbering inference) — these two indirect strands point the same direction and corroborate each other, but neither alone would justify a DIRECT rating.

### 5.4 Available Options
**Option A — Use B-38** as the Roof Circulation asset.
**Option B — Use B-33** as the Roof Circulation asset.
**Option C — Omit Roof Circulation entirely**, treating the duplicate-numbering anomaly as disqualifying for both.

### 5.5 Consequences of Each Option

**Option A (B-38):**
- *Architectural/IA:* Fills the Roof tab's Circulation slot consistently with Basement and First Floor, leaving only Ground Floor genuinely empty (§8.4).
- *Narrative/Content:* Per E2, shows the more complete/legible circulation pattern.
- *Asset:* No new asset; simply which of two existing files is selected. B-33 would then go unused in the live mapping (not deleted, just not referenced — consistent with how other superseded-but-present files are already handled).

**Option B (B-33):**
- *Architectural/IA:* Same slot-filling outcome as Option A structurally.
- *Narrative/Content:* Per E2, shows the less complete diagram — no evidence favors this choice over B-38.
- *Asset:* No new asset.

**Option C (omit):**
- *Architectural/IA:* Roof tab would then also lack Circulation, joining Ground Floor — two of four tabs missing the same diagram type, which weakens the case for Option A of §8.4 (showing Circulation "for the levels that have it" becomes less compelling if half the levels don't have it).
- *Narrative/Content:* Discards a real, working asset out of caution the evidence does not actually require — E1 confirms the files are simply different, not that either is defective or mislabeled.
- *Asset:* No new asset.

### 5.6 Recommendation
**RECOMMENDATION: SUPPORTED — Option A (B-38)**, on the basis of E2 (canonical documented visual-completeness finding) corroborated by E3 (independent numbering-sequence inference, clearly labeled as inference). Same caveat as §8.1: E2 was not independently re-verified by opening the image in this pass; if the Project Manager wants certainty beyond the two corroborating indirect signals, re-opening both files for a fresh visual comparison is the available next step.

---

## Item §8.6 — Villa Efe Orientation Plans (B-20–24): Placement

### 5.1 Exact Unresolved Question
"Villa Red Sun has exactly one such asset (A-16, for the final proposal D), living in Final Architecture. Villa Efe has five — one per level... Two defensible placements: (a) all five in Final Architecture as a complete 'how the sections relate to each level' orientation set... or (b) four distributed alongside their respective Comparator tabs and the fifth alongside the Site beat's plan. This document does not pick one." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.6)

### 5.2 Verified Evidence
- **E1 (directory listing, confirmed this pass):** `B-20-illustration-section-plan-top-bs`, `B-21-...-gf`, `B-22-...-f1`, `B-23-...-groof`, `B-24-...-site` — five files, each suffixed to match exactly one of the four Comparator levels (bs/gf/f1/groof) or the Site beat (site). This is the identical suffix vocabulary (`bs`/`gf`/`f1`/`groof`/`site`) used consistently across every other per-level asset category in the library (plans B-11–15, daylight B-25–29, airflow B-30–34, privacy-gradient B-39–43).
- **E2 (comparative structure, confirmed this pass):** Villa Red Sun's single equivalent asset is `A-16-illustration-section-plan-idea-d-top` — suffixed `idea-d`, i.e., tied to the single selected proposal, not to a "final architecture as a whole" concept. A-16 lives in Final Architecture only because, for Villa Red Sun, "the selected proposal" and "the final architecture" are the same referent — there is only one D.
- **E3 (existing canonical documentation):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` line 76 independently describes B-20–24 as *"Same feature as A-16, one per level"* — confirming the one-per-level structure as already-recognized, not a new reading.

### 5.3 Evidence Classification
**DIRECT** — the naming convention is an objective, machine-checkable fact (E1), and its parallel to every other per-level category in the same library (E1, E3) is likewise directly observable, not inferred from silence.

### 5.4 Available Options
**Option A — Bundle all five in Final Architecture**, as one complete orientation-plan set.
**Option B — Distribute per level**: bs/gf/f1/groof alongside their respective Comparator tabs, site alongside the Site beat's plan (B-15).

### 5.5 Consequences of Each Option

**Option A (bundle in Final Architecture):**
- *Architectural/IA:* Mirrors A-16's *location* (Final Architecture) but not its *referent* — A-16 is tied to one proposal; a bundled set of five would represent five different levels, which is a materially different kind of collection than what A-16 represents for Villa Red Sun. Groups previously-page-6 content into the section, which per the existing document (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §7) is described as "sections → orientation plan(s) → exterior renders → interior renders" — this option treats the plural "(s)" as license to place multiple.
- *Narrative/Content:* Readers reach Final Architecture without yet having seen the per-level breakdown these plans describe, since Final Architecture appears after the Comparator in the current beat order.
- *Asset:* No new asset; simply a placement choice.

**Option B (distribute per level) — evidence-preferred, see 5.6:**
- *Architectural/IA:* Directly mirrors the naming convention (E1/E3) — each orientation plan becomes a companion asset to its own tab/beat, exactly as A-16 is a companion asset to its own (single) proposal. This is the *same underlying pattern*, applied to five slots instead of one, rather than a different pattern.
- *Narrative/Content:* Each Comparator tab (and the Site beat) gains its own "how the sections cut through this level" reference exactly where the reader is already looking at that level's plan/diagrams — arguably stronger comprehension support than a bundled set seen only once, later.
- *Asset:* No new asset; simply a placement choice, one file per existing slot.

### 5.6 Recommendation
**RECOMMENDATION: SUPPORTED — Option B (distribute per level)**, on the basis of E1/E2/E3: the naming convention is direct, consistent, library-wide evidence that these five files were produced as five separate per-level companion assets, not as a single bundled set. Option A remains architecturally valid and is not being ruled out — it is a legitimate alternative reading of "orientation plan(s)" in the existing sequencing note — but it is not the option the file-naming evidence points to.

---

## Item §8.7 — Daylight Diagrams: Inclusion Pending Fix Decision

### 5.1 Exact Unresolved Question
"A-17–19 and (very likely, per the established production-pipeline pattern) B-25–29 are non-functional — no visible overlay, confirmed by direct inspection... their actual inclusion should wait on the still-open decision... of whether to regenerate them from data, drop them in favor of the Solar Path diagrams already carrying that narrative role, or use them as-is pending consultation." (`PORTFOLIO_INFORMATION_ARCHITECTURE.md` §8.7)

### 5.2 Verified Evidence
- **E1 (existing canonical documentation, DIRECT):** `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` §6.4 quotes the production-pipeline specification for these diagrams: a guide-driven overlay system (red wall-boundary mask, yellow directional arrows, specific `#FFD98A` warm-gold / cool pale-blue color grading) that the delivered files do not exhibit. §7.3 confirms this was directly visually inspected in that prior session and found non-functional — "no such overlay," reading as visually identical to a plain plan render.
- **E2 (existing canonical documentation):** the same source notes the Solar Path diagrams (A-29, B-44) are, by contrast, confirmed *functional* — real, data-driven, working deliverables (each backed by a `.txt` report, `.csv` calculation table, and `.pdf`, confirmed present in this pass's directory listing for both projects).
- **E3 (this pass, directory check):** `All Prompts/2 - Air Flow/` contains a written final spec (`Air Flow - Final.txt`); `All Prompts/3 - Day Light/` contains no equivalent written spec file, only a guide image and draft/test subfolders — consistent with E1's account of a guide-driven (image-based, not text-spec-based) pipeline for this category, and consistent with no additional written evidence existing beyond what E1 already quotes.
- **NO DIRECT EVIDENCE FOUND** indicating the underlying defect has since been fixed, or indicating a Project-Manager-level decision has already been made among the three named paths (regenerate / drop / use-as-is).

### 5.3 Evidence Classification
**DIRECT** for the defect itself and its likely technical cause (E1). **ABSENT** for which remediation path to take — no source states a decision.

### 5.4 Available Options
**Option A — Regenerate** the Daylight diagrams from the guide-driven pipeline, correcting whatever caused the overlay to fail. *(Production work — outside this pass's scope and outside Claude's available tooling in this session regardless of which option is chosen; noted for completeness, not actionable here.)*
**Option B — Drop the Daylight diagram type entirely**, letting the confirmed-functional Solar Path diagram carry the environmental/lighting narrative role for the Site beat.
**Option C — Use the existing non-functional files as-is**, accepting they will read as plain plan renders with an unexplained "Daylight" label.

### 5.5 Consequences of Each Option

**Option A (regenerate):**
- *Architectural/IA:* No structural change to the mapping — same slots, corrected assets.
- *Narrative/Content:* Best outcome if achievable — restores the intended diagram type.
- *Asset:* Requires new production work (not a documentation-pass action, not performed here, not authorized by this pass regardless of PM preference — this is EXECUTION PHASE 5/6-adjacent work at earliest, and gated behind Phase 2 authorization like everything else implementation-shaped).

**Option B (drop, Solar Path carries the role):**
- *Architectural/IA:* Comparator tabs would show four diagram types (Plan, Airflow, Circulation, Privacy-Gradient) instead of five for every tier/level, consistently — this actually resolves cleanly alongside §8.4's Option A logic (Ground Floor already has an asymmetric diagram count; dropping Daylight everywhere restores symmetry a different way).
- *Narrative/Content:* No mislabeled/non-functional asset is shown; Solar Path (already planned for the Site beat per the existing IA mapping) continues to carry the sun/light narrative for both projects.
- *Asset:* No new asset; simply excludes A-17–19/B-25–29 from the mapping.

**Option C (use as-is):**
- *Architectural/IA:* No structural change.
- *Narrative/Content:* Risk of a visibly broken/confusing deliverable reaching the live site — a labeled "Daylight" diagram that shows no daylight information contradicts the site's own editorial standard of only showing functional, correctly-labeled work.
- *Asset:* No new asset, but perpetuates a known defect.

### 5.6 Recommendation
**RECOMMENDATION: NOT SUFFICIENTLY SUPPORTED** to choose between Option A and Option B — both are legitimate, and the choice depends on factors this pass cannot evidence (whether regeneration is feasible/worth the effort is a production-resourcing question, not an architecture question). **Option C, however, is the one option the evidence actively argues against** (E1's confirmed-defect finding, weighed against the site's established quality bar elsewhere in the canonical documentation).

**STATUS: AWAITING PROJECT MANAGER ELECTION**, narrowed to a choice between Option A (regenerate, if resourced) and Option B (drop, defer to Solar Path) — Option C is not recommended.

---

## 10. Decision Matrix

| Item | Question (short) | Evidence Status | Recommended Option | PM Decision Required? | Current Status |
|------|----------|-----------------|--------------------|-----------------------|----------------|
| §8.1 | Villa Red Sun wind — which diagram | INDIRECT | B — A-33 (v3) | YES | Recommended, unresolved |
| §8.2 | Villa Efe wind — which diagram | AMBIGUOUS | None — insufficient evidence | YES | Unresolved |
| §8.3 | Section variant, both projects | ABSENT | None — pure curatorial choice | YES | Unresolved |
| §8.4 | Villa Efe GF circulation gap — how to handle | DIRECT (gap) / judgment (handling) | A — omit for GF only | YES | Recommended, unresolved |
| §8.5 | Villa Efe Roof circulation — B-33 vs B-38 | INDIRECT (corroborated) | A — B-38 | YES | Recommended, unresolved |
| §8.6 | Villa Efe orientation-plan placement | DIRECT | B — distribute per level | YES | Recommended, unresolved |
| §8.7 | Daylight diagrams — inclusion path | DIRECT (defect) / ABSENT (fix path) | Narrowed to A or B (not C) | YES | Unresolved |

No item is marked "resolved" in this matrix. Recommendations are offered for §8.1, §8.4, §8.5, §8.6; §8.2, §8.3, and §8.7 remain without a recommendable single option. **All seven require explicit Project Manager election before Content Mapping (EXECUTION PHASE 4) can proceed with full confidence.**

---

## 7-ITEM PROJECT MANAGER DECISION SHEET

## §8.1 — Villa Red Sun Wind Diagram

**Question:**
A-31/32/33 disagree on summer prevailing wind direction (S–SW / SE–SSE / W–SW). Which diagram should represent the Site beat's wind content?

**Evidence Status:** INDIRECT (data-text correspondence + secondhand visual-inspection record, not independently re-verified this pass)

**Claude Recommendation:** A-33 (v3) — matches the report's sourced numeric data (W ≈260–290° prevailing)

**Available Decision:**
- [ ] APPROVE OPTION A — Use A-31 (v1), by number-pairing with the report
- [ ] APPROVE OPTION B — Use A-33 (v3), by data-content match (recommended)
- [ ] APPROVE OPTION C — Use A-32 (v2)
- [ ] APPROVE OPTION D — Drop wind diagram, Solar Path (A-29) only
- [ ] DEFER / REQUEST MORE EVIDENCE (e.g., re-open all three images for a fresh visual cross-check)

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.2 — Villa Efe Wind Diagram

**Question:**
Two versions (B-45/46) exist with no confirmed content difference; additionally, the wind report's own coordinates are self-described as "inland," conflicting with the project brief's waterfront/sea-level description. Which diagram, if any, should be used, and how should the location conflict be treated?

**Evidence Status:** AMBIGUOUS

**Claude Recommendation:** AWAITING PROJECT MANAGER ELECTION — no evidence distinguishes B-45 from B-46; the location conflict needs a Project-Manager-level answer (real data-sourcing issue vs. deliberate privacy stand-in coordinates) before either is used with confidence

**Available Decision:**
- [ ] APPROVE OPTION A — Use B-45 (v1)
- [ ] APPROVE OPTION B — Use B-46 (v2)
- [ ] APPROVE OPTION C — Drop wind diagram, Solar Path (B-44) only
- [ ] APPROVE OPTION D — Hold pending clarification of the coastal-vs-inland coordinate conflict
- [ ] DEFER / REQUEST MORE EVIDENCE

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.3 — Section Variant (Raw vs. Illustrated)

**Question:**
Both projects have both a raw photorealistic and an illustrated version of every section. Which should be used in Final Architecture?

**Evidence Status:** ABSENT

**Claude Recommendation:** AWAITING PROJECT MANAGER ELECTION — genuine curatorial choice, no source material favors either

**Available Decision:**
- [ ] APPROVE OPTION A — Illustrated, both projects
- [ ] APPROVE OPTION B — Raw photorealistic, both projects
- [ ] APPROVE OPTION C — Mixed (specify per-project/per-section rule in Notes)
- [ ] DEFER / REQUEST MORE EVIDENCE

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.4 — Villa Efe Ground Floor Circulation (Missing Asset)

**Question:**
No Circulation diagram exists for Ground Floor. Should the Comparator show Circulation for the three levels that have it (asymmetric), or omit Circulation for all four levels (symmetric)?

**Evidence Status:** DIRECT (the gap itself); judgment call (how to present it)

**Claude Recommendation:** Option A — show Circulation for the three levels that have it, omit only for Ground Floor

**Available Decision:**
- [ ] APPROVE OPTION A — Show Circulation for BS/F1/Roof, omit for GF (recommended)
- [ ] APPROVE OPTION B — Omit Circulation entirely, all four tabs
- [ ] DEFER / REQUEST MORE EVIDENCE

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.5 — Villa Efe Roof Circulation (B-33 vs. B-38)

**Question:**
Two genuinely different files exist, both labeled Roof/"groof" Circulation. Which is the intended final asset?

**Evidence Status:** INDIRECT (corroborated: canonical documented visual-completeness finding + independent numbering-sequence inference), byte-difference DIRECT-confirmed this pass

**Claude Recommendation:** B-38 — recorded as more complete/legible, and fits the category's own numbering sequence

**Available Decision:**
- [ ] APPROVE OPTION A — Use B-38 (recommended)
- [ ] APPROVE OPTION B — Use B-33
- [ ] APPROVE OPTION C — Omit Roof Circulation entirely
- [ ] DEFER / REQUEST MORE EVIDENCE (re-open both files for a fresh visual comparison)

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.6 — Villa Efe Orientation Plans (B-20–24) Placement

**Question:**
Villa Efe has five orientation-plan assets (one per level + site), unlike Villa Red Sun's single one (A-16). Should all five live together in Final Architecture, or be distributed one per Comparator tab / Site beat?

**Evidence Status:** DIRECT (naming-convention correspondence)

**Claude Recommendation:** Distribute per level — matches the library-wide per-level naming convention and mirrors A-16's role as a per-slot companion asset

**Available Decision:**
- [ ] APPROVE OPTION A — Bundle all five in Final Architecture
- [ ] APPROVE OPTION B — Distribute per level/beat (recommended)
- [ ] DEFER / REQUEST MORE EVIDENCE

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## §8.7 — Daylight Diagrams (Non-Functional)

**Question:**
Daylight diagrams (A-17–19, B-25–29) are confirmed non-functional (no visible overlay). Should they be regenerated, dropped in favor of Solar Path, or used as-is?

**Evidence Status:** DIRECT (defect confirmed) / ABSENT (which remediation path)

**Claude Recommendation:** Narrowed to Option A or B — Option C (use as-is) is not recommended given the confirmed defect

**Available Decision:**
- [ ] APPROVE OPTION A — Regenerate from the guide-driven pipeline (production work, not performed in this pass)
- [ ] APPROVE OPTION B — Drop; Solar Path (A-29/B-44) carries the environmental-lighting narrative role
- [ ] APPROVE OPTION C — Use existing files as-is (not recommended)
- [ ] DEFER / REQUEST MORE EVIDENCE

**Project Manager Decision:**
`____________________________`

**Notes:**
`____________________________`

---

## CURRENT PHASE STATUS

**Phase 1 Documentation:** ACCEPTED

**IA Resolution Pass:** COMPLETE (all seven items analyzed to the limit of available evidence; recommendations offered where evidence supports one, explicitly withheld where it does not)

**Unresolved IA Decisions:** 7 (all seven remain formally unresolved pending explicit Project Manager election, even where a recommendation is offered — a recommendation is not a decision)

**Phase 2 Authorization:** NOT AUTHORIZED

> **PHASE 2 — HOLD.**

---

## Completion Report

### Files Created
- `IA_DECISION_RESOLUTION_BRIEF.md` (this document)

### Files Modified
- None.

### Files Inspected
- `All Final File/A-villa-red-sun-Final/` (full directory listing) and its `A-project_villa-red-sun.txt`, `A-31-wind-analysis-report-villa-red-sun.txt`
- `All Final File/B-villa-efe-Final/` (full directory listing) and its `B-project_villa-efe.txt`, `B-45-wind-analysis-report-villa-efe.txt`
- `B-33-circulation-plan-top-groof-villa-efe_result.png` and `B-38-circulation-plan-top-groof-villa-efe_result.png` (byte-size + MD5 comparison only, files not opened as images)
- `All Prompts/2 - Air Flow/`, `All Prompts/3 - Day Light/` (directory listings only)
- `PORTFOLIO_INFORMATION_ARCHITECTURE.md`, `PHASE1_ARCHITECTURE_DECISION_DOCUMENT.md`, `MD Files - Knowledge/2026-08-10_Claude_Briefing_Report.md` (existing canonical documents, read for cross-reference)

### Source / Code Changes
**NO SOURCE/CODE CHANGES MADE.**

### Asset Changes
**NO ASSET MAPPINGS OR ASSET FILES MODIFIED.**

### Phase 2
**PHASE 2 REMAINS ON HOLD — NO IMPLEMENTATION AUTHORIZED.**

---

**STOP. Awaiting explicit Project Manager review and election on all seven items before EXECUTION PHASE 2 or Content Mapping can proceed.**
