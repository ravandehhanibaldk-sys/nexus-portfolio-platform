# Graph Report - All Final For Claude Code  (2026-08-16)

## Corpus Check
- 54 files · ~14,094,310 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 347 nodes · 393 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17aad544`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `Nexus Portfolio Platform — Progress Log` - 10 edges
3. `imagePath()` - 9 edges
4. `5–10. Component-by-Component Reassessment` - 8 edges
5. `Project` - 8 edges
6. `scripts` - 6 edges
7. `Phase 3.6 — Real Photo + Live Climate Instrument (Villa Red Sun)` - 6 edges
8. `include` - 6 edges
9. `app/page.tsx` - 6 edges
10. `cn()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `EnvironmentalResponse()` --calls--> `cn()`  [EXTRACTED]
  components/project/environmental-response.tsx → lib/utils.ts
- `Home()` --calls--> `imagePath()`  [EXTRACTED]
  app/page.tsx → lib/utils.ts
- `LightboxModal()` --calls--> `imagePath()`  [EXTRACTED]
  components/project/lightbox.tsx → lib/utils.ts
- `AlternativesComparator()` --calls--> `cn()`  [EXTRACTED]
  components/project/alternatives-comparator.tsx → lib/utils.ts
- `Hero()` --calls--> `imagePath()`  [EXTRACTED]
  components/project/hero.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (20 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (30): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (38): 14. Solar Visualization Research, 15. Wind Visualization Research, 16. 2D vs 2.5D vs 3D vs Hybrid — Decision Framework, 17. Animation Technology Comparison, 18–21. glTF/GLB Optimization, Draco, Meshopt, KTX2, 1. Executive Summary, 22. LOD / Streaming, 23. Large Model Strategy (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, prettier, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (24): app/page.tsx, Home(), projects, villa-efe/page.tsx, metadata, AlternativesComparator(), BackToPortfolio(), Frame() (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (22): alternativeSchema, assetSchema, beatSchema, ClimateInstrument, climateInstrumentSchema, ClimateMonth, climateMonthSchema, ProjectAlternative (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (37): 01 — Executive Summary, 02 — What Changed Since Phase 0, 03 — What Changed Since Phase 1, 04 — Current Environmental System Audit, 05 — Rainfall Data Audit, 06 — Solar Data & Visual Audit, 07 — Wind Data & Visual Audit, 08 — Seasonal Data Availability (critical section) (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (26): 11. Large Architectural Model Strategy — Visual-Quality Lens, 12. Reflection Workflow — Reassessed, 13. MasterPlan / SiteAnalysis — Cleanest Schema Solution, 14. New Environmental Layer — Rainfall, 15. Portfolio-Wide Visual Art Direction Audit, 16. Danish / Nordic Art Direction — Compatibility Check, 17. "Go Extreme" — Unconstrained Creative Exercise, 18. Capability Matrix (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (20): 12-Month Interactive Architectural Climate System — Research, Data Audit & Isolated Prototyping, A. Complete Data Audit, B. Provenance Matrix (legend, as specified), C. Missing-Data Matrix, D. Monthly-Data Matrix (per instruction §32), E. Visual Concept Analysis, F. Interaction-Model Comparison (Prototype A), Final Question — Answered Honestly (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.27
Nodes (8): EASE, EnvironmentalResponse(), interpolate(), lerp(), shadowLength(), SolarPoint, SolarScene(), sunPosition()

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (22): dependencies, clsx, framer-motion, lucide-react, next, react, react-dom, @react-three/fiber (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (18): 10. REAL-3D ENVIRONMENTAL VISUALIZATION FEASIBILITY, 11. MASTERPLAN / SITEANALYSIS CLEANUP, 12. REFLECTION PROMPT SET — Villa Red Sun, 13. FUTURE 3D EXPORT STANDARD — derived from this test's actual evidence, 14. ISSUES FOUND, 15. ACTIONS CLASSIFIED A–E, 16. FINAL RECOMMENDED WORKFLOW, 1. EXECUTIVE SUMMARY (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (14): ✅ 2026-08-10 — EXECUTION PHASE 2 Status: IMPLEMENTED AND VERIFIED (locally), ✅ 2026-08-10 — EXECUTION PHASE 3 Status: Content & Asset Remapping (local, uncommitted at time of writing), ⚠️ 2026-08-10 Status Note — Asset Library Superseded, Known Gaps / Honest Limitations, Next Actions (in order), Nexus Portfolio Platform — Progress Log, Orphaned Assets — documented, NOT deleted (delete later, per instruction), Phase 08 — Design Review Findings (2026-08-01) (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (3): fraunces, inter, metadata

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (3): Measurement, ModelExportTest(), metadata

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): Data source, How to run, Known limitations, Phase 3.6 — Real Photo + Live Climate Instrument (Villa Red Sun), Solar calculation method, Validation against the source report, What this is

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (6): description, devDependencies, @gltf-transform/cli, name, private, version

## Knowledge Gaps
- **245 isolated node(s):** `Villa Red Sun — GLB + FBX Comparative Forensic Test`, `Phase 3D — Authoritative 3D Export Forensic Audit (Final Diagnostic Pass)`, `1. EXECUTIVE SUMMARY`, `2. AUTHORITATIVE SOURCE VERIFICATION`, `3. SOURCE UNIT / SCALE VERIFICATION` (+240 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 2` to `Community 9`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `Villa Red Sun — GLB + FBX Comparative Forensic Test`, `Phase 3D — Authoritative 3D Export Forensic Audit (Final Diagnostic Pass)`, `1. EXECUTIVE SUMMARY` to the rest of the system?**
  _245 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1092436974789916 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08817204301075268 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._