# Graph Report - All Final For Claude Code  (2026-08-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 191 nodes · 263 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `032c7707`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `imagePath()` - 9 edges
3. `Project` - 8 edges
4. `Frame()` - 7 edges
5. `include` - 6 edges
6. `scripts` - 6 edges
7. `cn()` - 5 edges
8. `ProjectAsset` - 4 edges
9. `Hero()` - 4 edges
10. `measureScene()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `EnvironmentalResponse()` --calls--> `cn()`  [EXTRACTED]
  components/project/environmental-response.tsx → lib/utils.ts
- `Home()` --calls--> `imagePath()`  [EXTRACTED]
  app/page.tsx → lib/utils.ts
- `LightboxModal()` --calls--> `imagePath()`  [EXTRACTED]
  components/project/lightbox.tsx → lib/utils.ts
- `Frame()` --calls--> `imagePath()`  [EXTRACTED]
  components/project/frame.tsx → lib/utils.ts
- `AlternativesComparator()` --calls--> `cn()`  [EXTRACTED]
  components/project/alternatives-comparator.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (22): dom, dom.iterable, esnext, compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (21): clsx, framer-motion, lucide-react, next, dependencies, clsx, framer-motion, lucide-react (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, tailwindcss, @tailwindcss/postcss (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (10): metadata, AlternativesComparator(), BackToPortfolio(), NarrativeTextBlock(), BEATS, ProgressNav(), ProjectPage(), Reflection() (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (14): villaEfe, villaRedSun, alternativeSchema, assetSchema, beatSchema, environmentalSchema, ProjectAlternative, ProjectInput (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.23
Nodes (10): Home(), projects, Hero(), LightboxContext, LightboxContextValue, LightboxModal(), LightboxProvider(), LightboxState (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.21
Nodes (7): metadata, FbxModel(), GlbModel(), Measurement, measureScene(), ModelExportTest(), summarizeMaterial()

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (9): EASE, FinalArchitecture(), Frame(), useLightbox(), EASE, SectionLocator(), SiteAnalysis(), ProjectAsset (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (9): EASE, EnvironmentalResponse(), interpolate(), lerp(), shadowLength(), SolarPoint, SolarScene(), sunPosition() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (11): description, name, packageManager, private, scripts, build, dev, format (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (7): @gltf-transform/cli, description, devDependencies, @gltf-transform/cli, name, private, version

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (3): fraunces, inter, metadata

## Knowledge Gaps
- **91 isolated node(s):** `ProjectAlternative`, `LightboxContextValue`, `LightboxState`, `Measurement`, `SolarPoint` (+86 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 1` to `Community 9`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 2` to `Community 9`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `Community 0` to `Community 10`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `ProjectAlternative`, `LightboxContextValue`, `LightboxState` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._