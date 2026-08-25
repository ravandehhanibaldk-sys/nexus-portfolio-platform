# VILLA PORTFOLIO — NEXT-STAGE EXECUTION PACK
## Controlled execution after Villa Red Sun Phase 1 /about closure

Status: READY FOR DIRECT EXECUTION IN CLAUDE CODE
Language architecture: English default + Danish
Projects: Villa Red Sun + Villa Efe

---

## 0. EXECUTION RULE

Do not ask the user whether to perform any item explicitly authorized by this pack.
Do not restart planning.
Do not ask unnecessary architectural, IA, content, URL, or design questions.

Execute the workstreams in the exact order below.

If a task encounters genuine ambiguity or missing implementation evidence:
- preserve existing behavior/data/assets;
- do not guess;
- report the ambiguity;
- stop only that workstream;
- do not expand scope.

Each workstream has its own verification checkpoint.

GLOBAL PROTECTED AREAS:
- Climate Interface implementation and behavior
- approved Villa Red Sun production implementation
- approved Villa Efe production implementation except the exact scoped task
- existing project data/content
- approved project assets
- Fraunces + Inter typography tokens
- VISUAL-DNA.md protected areas
- Villa Efe / Red Sun climate values unless the source itself contains an explicitly reported inconsistency

GLOBAL DATA RULE:
No environmental number may be invented, interpolated, backfilled from another project, or silently substituted from a generic source.

Stitch is an exploration tool, not a data source and not the production source of truth.

---

# WORKSTREAM 1
# FINAL ARCHITECTURE — FLOOR PLAN VISUAL BALANCE

Source brief:
FINAL-ARCHITECTURE-SIZING-BRIEF.md

OBJECTIVE:
Increase the visual footprint of the "Proposal D — Final" illustrated floor plan in "07 — FINAL ARCHITECTURE" so its perceived visual weight is comparable to the two section drawings beneath it.

CONSTRAINTS:
- preserve original aspect ratio;
- do not crop architectural information merely to enlarge it;
- do not replace the image;
- do not modify underlying project data;
- solve with layout allocation, width, grid span, max-width, or alignment;
- do not perform unrelated cleanup.

REQUIRED PROCESS:
1. Inspect both Villa Red Sun and Villa Efe.
2. Confirm whether FinalArchitecture is shared and unmodified before editing.
3. If both projects show the same imbalance and one generic sizing change is safe for both, modify the shared component.
4. If only one project is affected, use a project-scoped override rather than changing the shared component.
5. Verify rendered aspect ratio against the original.
6. Verify desktop and mobile for both projects.
7. Verify no horizontal overflow and no broken images.
8. Run lint and build.
9. Confirm Climate Interface and all unrelated sections were untouched.
10. Check git diff/status.

FINAL REPORT:
- affected project(s)
- shared-component status
- shared fix vs project override and why
- exact files changed/created
- aspect-ratio confirmation
- desktop/mobile verification
- lint/build
- Climate Interface untouched
- unresolved issue, if any

STOP.

---

# WORKSTREAM 2
# DIGITAL ENVIRONMENTAL DIAGRAMS

Canonical source files:
- Complete-Climate-Site-Analysis-A-villa-red-sun.txt
- Complete-Climate-Site-Analysis-B-villa-efe.txt

The user has supplied these source files directly. Treat them as canonical source material unless the repository contains the exact same files; if repository copies exist, verify they match before implementation.

TARGET:
Replace the two static site-analysis PNGs:
1. Solar Path
2. Wind Analysis

IMPORTANT:
This is NOT the Climate Interface.

Do not modify the Climate Interface component, state, controls, month selection, data, calculations, seasonal images, layout, or interaction.

## VERIFIED DATA MODEL

### Villa Red Sun — Solrød, Denmark
Coordinates:
55.516105°N, 12.208375°E

Monthly precipitation:
Jan 53, Feb 36, Mar 30, Apr 28, May 58, Jun 70,
Jul 65, Aug 88, Sep 49, Oct 64, Nov 69, Dec 63 mm.
Source annual total: 674 mm.

Monthly mean temperature:
Jan 0.8, Feb 0.7, Mar 3.2, Apr 7.5, May 11.5, Jun 14.7,
Jul 17.8, Aug 17.0, Sep 13.7, Oct 9.6, Nov 6.0, Dec 2.7 °C.

Monthly sunshine:
Jan 47, Feb 62, Mar 146, Apr 215, May 241, Jun 245,
Jul 252, Aug 195, Sep 160, Oct 103, Nov 46, Dec 34 h.
Source annual total: 1,747 h.

Humidity:
NOT ESTABLISHED. Do not display as precise monthly data.

Wind:
W / WSW regional regime. Exact-site annual/seasonal mean speed is not established.
Do not synthesize monthly wind speeds.

### Villa Efe — Girne/Kyrenia, Northern Cyprus
Coordinates:
35.3442167°N, 33.2428083°E

Monthly precipitation:
Jan 117, Feb 79, Mar 60, Apr 20, May 13, Jun 2,
Jul 0, Aug 0, Sep 5, Oct 37, Nov 68, Dec 133 mm.
These sum exactly to 534 mm.

Monthly temperature:
Jan 16/9/12.5, Feb 17/9/13.0, Mar 19/10/14.5,
Apr 22/12/17.0, May 26/16/21.0, Jun 30/20/25.0,
Jul 33/22/27.5, Aug 33/23/28.0, Sep 31/21/26.0,
Oct 27/17/22.0, Nov 23/14/18.5, Dec 18/11/14.5 °C
(high / low / approximate mean).

Wind:
West. Official annual mean 3.0 m/s for 1991–2020.
37.8 m/s is a recorded historical extreme, not a typical/design value.
Do not create monthly wind-speed numbers.

Humidity:
Only qualitative seasonal information exists. Do not display precise monthly RH.

Sunshine:
The source contains an annual solar-energy value of 546.4 cal/cm² and also a regional monthly sunshine-hours table elsewhere in the report. Do NOT silently convert one physical quantity into the other. If the new diagram uses sunshine, preserve the real unit/source context.

## CRITICAL SOURCE INCONSISTENCIES FOUND DURING AUDIT

1. Villa Efe annual precipitation:
- one section reports 506.44 mm/year;
- another long-term regional series reports 534 mm/year;
- the monthly precipitation table sums exactly to 534 mm.
Do not silently erase this discrepancy.
For the interactive monthly visualization, use the monthly values as listed and treat 534 mm as the corresponding annual total of that table; report 506.44 mm as a separate source/reference-period value.

2. Villa Red Sun monthly precipitation:
the listed rounded monthly values sum to 673 mm, while the source annual total is 674 mm.
Treat this as a one-millimetre rounding/source-table discrepancy.
Do not rewrite the source values.

3. Villa Red Sun monthly sunshine:
the listed monthly values sum to 1,746 h, while the source annual total is 1,747 h.
Treat this as a rounding/source-table discrepancy.
Do not rewrite the source values.

4. Villa Red Sun June solar-noon altitude:
the source reports 55.3° at solar noon on 21 June, while a standard solar-position calculation using the supplied coordinates and the same astronomical methodology gives approximately 57.9° at solar noon. The source's 10:00 and 14:00 values are consistent with the calculation, and the winter noon value (~11.0°) is also consistent.
Do NOT silently choose one.
Before implementation, flag this internal source inconsistency in the report.
For the new calculated solar path, use the verified deterministic astronomical method and document the discrepancy rather than presenting 55.3° as if independently validated.

## SOLAR CALCULATION RULE

For monthly solar paths, use deterministic astronomical solar-position calculations from:
- exact project coordinates;
- a defined representative date for each month;
- local civil time / timezone appropriate to the project;
- the same standard solar-position methodology already used in the source.

The representative date should be the 21st day of each month unless the existing implementation/data model establishes a more appropriate convention.

Cross-check known source values before trusting the implementation:
- Villa Efe 21 June noon ≈ 78.1°
- Villa Efe 21 December noon ≈ 31.2°
- Villa Red Sun 21 December noon ≈ 11.0°

If the source and deterministic calculation disagree, report the disagreement rather than silently rewriting project data.

## WIND VISUALIZATION

Do NOT fake monthly wind data.

Choose the most honest visual treatment:
A. annual/seasonal directional regime only, clearly labeled as qualitative/regime data;
OR
B. static annual wind summary beside the interactive solar/precipitation/temperature elements.

Do not make wind appear to have the same numerical precision as monthly measured data.

## MONTH SELECTOR

JAN → DEC must drive:
- solar path / altitude / azimuth;
- monthly temperature;
- monthly precipitation.

Wind remains annual/seasonal or static.
Humidity remains omitted or qualitative.
Missing data remains missing.

## VISUAL LANGUAGE

Target:
- thin architectural diagram lines;
- restrained/translucent solar-path band;
- muted project/environmental accents;
- small flat sun markers;
- dashed horizon/azimuth ring;
- cardinal labels;
- minimal architectural drawing character;
- no neon;
- no glow;
- no fake-scientific dashboard aesthetic.

Use Fraunces + Inter only.

Interactive controls must have:
- keyboard access;
- touch/mobile equivalent;
- non-hover-only information;
- reduced-motion behavior;
- accessible labels.

## ASSET MIGRATION SAFETY

Keep the existing PNGs until:
- digital version is implemented;
- values are verified;
- desktop and mobile are verified;
- no broken states exist.

Do not delete the old PNGs in the first implementation pass.

## VERIFICATION

Before claiming completion:
- inspect git status;
- establish baseline;
- implement only scoped diagram work;
- run lint;
- run build;
- kill/restart pnpm dev;
- clear .next cache;
- verify in a fresh browser tab;
- verify both projects;
- verify desktop;
- verify mobile;
- verify all 12 month states;
- verify source-derived values;
- verify solar calculations;
- verify no horizontal overflow;
- verify no broken images;
- verify Climate Interface unchanged;
- verify Fraunces + Inter only;
- verify dev issue indicator is clean;
- check git diff/status.

FINAL REPORT:
1. source files found and matched
2. wind treatment chosen and why
3. humidity handling
4. all source discrepancies and how they were handled
5. solar cross-check results
6. exact files created
7. exact files modified
8. confirmation old PNGs remain
9. Climate Interface untouched
10. typography unchanged
11. desktop verification
12. mobile verification
13. lint/build
14. dev issue indicator
15. unresolved issues

STOP.

---

# WORKSTREAM 3
# BILINGUAL SITE — ENGLISH DEFAULT + DANISH

This is a dedicated architecture task.
Do not combine it with visual redesign or diagram implementation.

LANGUAGES:
- English — default
- Danish — secondary

PREFERRED ROUTING:
- /en/...
- /da/...
- root / resolves to English by default.

Do not silently change existing project URLs without preserving existing navigation behavior and establishing a clean migration/redirect strategy.

## PHASE A — I18N ARCHITECTURE ONLY

Do not translate all project content yet.

Implement and verify:
- locale-aware App Router architecture;
- centralized UI translations;
- English default;
- Danish route;
- locale switch preserving current page where possible;
- no duplicated project data;
- no scattered locale conditionals throughout components.

Verify:
- /
- /en/
- /da/
- /en/projects/villa-red-sun
- /da/projects/villa-red-sun
- /en/projects/villa-efe
- /da/projects/villa-efe

Run lint/build.
Verify desktop/mobile.
Verify existing project functionality.
Do not alter Climate Interface behavior.

STOP.

## PHASE B — CONTENT MIGRATION

Move existing English UI/content strings into the translation architecture without changing the approved English wording.

No Danish translation rewriting in this pass.
The purpose is to prove the architecture does not alter content.

STOP after verification.

## PHASE C — DANISH TRANSLATION

Every user-visible English string must have a Danish equivalent before the bilingual release is considered complete.

Translation requirements:
- grammatically correct;
- idiomatic Danish;
- natural contemporary professional language;
- correct architectural terminology;
- consistent terminology across projects;
- no literal translation when a natural Danish construction is required;
- no invented project facts;
- no alteration of numbers, units, locations, names, or technical claims.

Maintain a terminology/glossary registry for repeated architectural/site/climate terms.

AI may prepare a draft.
Final Danish text must receive a native-speaker or professional linguistic review before being treated as production-approved.

This is a quality requirement, not a reason to omit Danish coverage.

## PHASE D — FINAL BILINGUAL QA

Verify:
- every visible string has both locales;
- no missing translation keys;
- no English leakage into Danish UI except intentional proper names/technical terms;
- English remains default;
- locale switching works;
- URLs remain stable and shareable;
- metadata/title/description are localized where applicable;
- accessibility labels are localized;
- captions and diagram labels are localized;
- mobile and desktop both work;
- Climate Interface behavior/data unchanged;
- no horizontal overflow;
- no broken images;
- lint/build clean;
- dev issue indicator clean.

STOP.

---

# GLOBAL STOP RULE

Do not start another exploration cycle after completing a workstream.

Do not refactor unrelated code.
Do not redesign protected components.
Do not delete assets merely to simplify implementation.
Do not invent environmental data.
Do not introduce a new font family.
Do not ask the user whether to perform the next explicitly authorized workstream.

Proceed workstream-by-workstream and report exactly what changed.
