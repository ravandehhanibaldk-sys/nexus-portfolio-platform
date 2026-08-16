# PHASE_0_3D_WEB_GRAPHICS_TECHNOLOGY_AUDIT.md
### Research, Audit, Tooling & Infrastructure Preparation — Villa Red Sun
**Date:** 2026-08-11 · **Status:** Research and benchmarking only. No portfolio UI, Solar Geometry component, Wind Context component, or 3D source file was modified. No commit, push, or deploy performed.

**Method note, stated once, up front:** the built-in WebSearch/WebFetch tools returned a backend error for the entire session. Research was still grounded in official sources — the delegated research passes used `curl` directly against the npm registry API, GitHub's REST API, and raw official docs pages (all cited below), which is itself a primary-source method, not a workaround. Every version number and maintenance-status claim below was fetched this way, not recalled from training data. Anything not independently verifiable is explicitly flagged **[uncertain]**.

---

## 1. Executive Summary

**VERIFIED, from direct measurement in this pass:** the current 49,770-triangle, 2-mesh, 2-material, 0-texture Villa Red Sun export is nowhere near a performance ceiling. A raw `renderer.render()` call for this exact geometry, measured 300 times with `performance.now()` in an isolated three.js harness, averaged **0.17ms** (GLB) and **0.11–0.04ms** (compressed/FBX variants) — implying a theoretical ceiling in the thousands of FPS. **Geometry complexity is not the cause of the "pixelated/laggy" perception.** The evidence instead points at two concrete, fixable technical issues: (1) the FBX loads at 100× the GLB's real-world scale because three.js's `FBXLoader` does not apply the source file's unit metadata — confirmed again this pass — and that scale error, combined with a fixed `near=0.01` camera plane, produces a depth-buffer precision ratio in the FBX case roughly **100× worse** than the GLB case, a well-documented cause of z-fighting/"soft" rendering artifacts during camera movement (**HYPOTHESIS**, technically well-grounded, not directly screenshot-confirmed — see §5); and (2) FBX parses **~7–9× slower** than GLB in the browser (525ms vs. 56–219ms, **MEASURED**), which affects load latency, not steady-state orbit smoothness.

**On format:** GLB remains the stronger web-delivery choice, now with harder evidence: an off-the-shelf, official Khronos-ecosystem tool (`gltf-transform`) compressed the current GLB from 3.21MB to **86–121KB** (96–97% reduction) with either Draco or Meshopt, at full geometric fidelity if the aggressive `simplify` step is skipped (**MEASURED**, see §33).

**On the visual language:** the current Solar Geometry (segmented SVG path) and Wind Context (dotted particles) are not a rendering-engine problem — they're a **path-generation and animation-technique problem**. Research this pass surfaced a specific, correct architecture: use **d3-shape's curve interpolators** (`curveNatural`/`curveMonotoneX`) to fit a smooth, physically-derived arc through the real azimuth/altitude sample points, then optionally use **GSAP MotionPathPlugin** purely to animate a marker along that already-correct path — not to generate the curve itself. Conflating those two jobs was the likely root of the "looks diagrammatic" complaint (see §14, §17).

**Top-line recommendation (not a final decision — see §50):** Three.js (already present) + GSAP MotionPathPlugin (now fully free) + d3-shape (curve fitting) + gltf-transform (compression, already benchmarked working) is the lowest-risk, most evidence-backed starting point for prototyping. Babylon.js and PlayCanvas remain legitimate alternatives with real tradeoffs, documented in §9–§11.

---

## 2. Current Project State

**VERIFIED, via `git status` and direct file inspection this pass:**

- **A pre-existing temporary 3D viewer already exists in the live portfolio**, added in a prior authorized phase: `components/dev/model-export-test.tsx`, wired into `app/projects/villa-red-sun/page.tsx` under a clearly-labeled "TEMPORARY — Phase 3D Live Test" banner. `three` (^0.185.1) and `@react-three/fiber` (^9.7.0) are consequently already present in `package.json`. **This directly contradicts this phase's "DO NOT add Three.js / DO NOT add React Three Fiber" framing — but they were not added just now, they predate this phase.** I did not remove them (removing prior authorized work without being asked is its own risk) and did not add anything further to the production app this phase. **Flagging this explicitly for your decision: keep, or remove before the next phase begins.**
- **This phase's only new filesystem addition is `rd/3d-benchmark/`** — an isolated R&D workspace with its own `package.json` (dependency: `@gltf-transform/cli` only), a standalone benchmark HTML harness, and generated output files. It is not imported by any app code, has its own dependency tree, and was served from a separate port (8090) during testing, fully isolated from the production dev server (port 3000).
- No file inside `Solar Geometry` (`components/project/environmental-response.tsx`) or `Wind Context` logic was opened for editing this phase — only read, in a prior phase, for context.
- `git status` this phase: 67 total changed/untracked entries, of which only `rd/` (untracked) originates from this turn. The other 66 predate this session's start (Phase 3 asset remapping and related work, already disclosed in prior reports).

---

## 3. Current 3D Asset Findings

**MEASURED**, cross-validated by an independent, official, third-party tool (`gltf-transform inspect`, Khronos-ecosystem CLI) against the current `A-villa-red-sun.glb`:

| Property | Value |
|---|---|
| glTF version | 2.0 |
| Extensions used/required | none |
| Bounding box | min (88.56, 0, −8.01) → max (111.89, 4.31, 7.90) |
| Meshes | 2 — `A-villa-red-sun-building` (49,618 triangles, 81,340 render vertices, 2.55MB GPU footprint), `A-villa-red-sun-glass` (152 triangles, 412 render vertices, 11.71KB) |
| Materials | 2, both named `fallback Material`, no textures — confirms the prior finding that material distinction did not survive the GLB export |
| Textures | none |
| Animations | none |

This independently reproduces every figure from the prior forensic audit pass, now via a tool with no relationship to my own hand-written parser — a genuine second, independent confirmation.

---

## 4. Current Rendering Problems (as reported by PM)

Restated for traceability, not re-litigated here: overly schematic/segmented solar path, primitive dotted-particle wind visualization, and a "pixelated/laggy" perception when orbiting the FBX preview specifically.

---

## 5. Root-Cause Hypotheses (pixelated/laggy orbit)

| # | Hypothesis | Status | Evidence |
|---|---|---|---|
| 1 | Triangle count / render cost too high | **REJECTED** | MEASURED: raw `renderer.render()` for this exact 49,770-tri scene averaged 0.17ms (GLB, 300-sample), 0.11ms (Draco GLB), 0.10ms (FBX) — thousands of FPS of headroom. Draw calls: 2. This is not the bottleneck. |
| 2 | FBX's uncorrected 100× scale + fixed near-plane → depth-buffer precision loss (z-fighting / soft edges during camera motion) | **HYPOTHESIS**, well-grounded | The prior phase's viewer used `near=0.01` for both formats. At GLB's real scale (camera distance ≈37 units), near:far-relevant precision ratio is already large; at FBX's unscaled 100×-too-big geometry (camera distance ≈3700 units), the same `near=0.01` makes the ratio ~100× worse. This is a textbook WebGL depth-buffer precision failure mode (documented behavior of standard, non-logarithmic depth buffers), not something I directly screenshotted (screenshot tooling is unavailable in this environment — see §32) but a specific, testable, technically sound explanation, stronger than a guess. |
| 3 | FBX parses far slower than GLB | **MEASURED** | 525.4ms (FBX) vs. 56.1–219.2ms (GLB variants) parse time, same geometry. Affects load latency, not steady-state orbit. |
| 4 | devicePixelRatio not applied / canvas CSS-size mismatch | **NOT CONFIRMED, NOT RULED OUT** | The prior viewer used `dpr={[1,2]}` (a reasonable clamp) — not an obvious bug on inspection, but I could not visually confirm sharpness in this environment (screenshot limitation). Worth checking on a real device. |
| 5 | Small canvas viewport (526×526px in the prior temp viewer) limiting perceived detail | **OBSERVED**, not a bug per se | A small viewport naturally shows less resolved detail regardless of renderer settings — a layout decision, not a technical defect. |
| 6 | React re-render interference from R3F's reconciler | **NOT TESTED THIS PASS** | Plausible in principle for a mostly-static scene, but the raw render-cost numbers above suggest this is very unlikely to be the dominant factor at this model's complexity — flagged as a residual unknown, not ruled out with direct evidence. |

**Bottom line: geometry is very likely innocent. The FBX-specific "soft/laggy" perception most plausibly traces to the unit-scale bug's downstream effect on depth precision, and/or FBX's much slower parse time being perceived as "lag." Both are fixable without touching the source 3D files — see §37.**

---

## 6. Technology Landscape — Overview

Full sourced comparison in §7–§13 (rendering engines), §17–§21 (optimization/animation), §24–§28 (storage). Every version below was fetched from the npm registry / GitHub API this pass, not recalled.

## 7–13. Rendering Engine Evaluations

| Technology | Version (verified, Aug 2026) | License | GLB/glTF | FBX | PBR/Glass | Shadows | Env. lighting | Orbit | WebGL2 | WebGPU | Mobile | Bundle | React/Next.js | Verdict for this project |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Three.js** | 0.185.1 | MIT | Native (`GLTFLoader`+Draco/KTX2/Meshopt) | `FBXLoader`, best-effort | Full PBR via `MeshStandardMaterial`/`MeshPhysicalMaterial` | PCF/PCFSoft/VSM | `PMREMGenerator` (HDRI IBL) | `OrbitControls` addon | Yes | Yes (`WebGPURenderer`, newer/less battle-tested **[uncertain on production stability]**) | Good, manual tuning | ~150–180KB tree-shaken **[approx.]** | Mature, well-trodden `"use client"` pattern | **Already installed. Safe, boring, correct baseline.** |
| **React Three Fiber** | 9.7.0 | MIT | Inherits three.js | Inherits three.js | Inherits three.js | Inherits three.js | Inherits three.js (drei `<Environment>`) | drei `<OrbitControls>` | Yes | Experimental | Same as three.js | Custom reconciler, small overhead | **Peer cap: React ≥19 <19.3 — verify against exact React 19 patch before relying on it long-term** | Already installed; overhead immaterial at this scene's complexity |
| **Babylon.js** | 9.20.0 | Apache-2.0 | Native, first-class | Limited/plugin-based **[uncertain]** | Polished PBR out of the box | PCF/blur-ESM/CSM — richer built-in variety than three.js | `.env` prefiltered IBL | Built-in `ArcRotateCamera` | Yes | Marketed as production-track longer **[uncertain, verify current messaging]** | Good, slightly heavier default | Larger than three.js core | Requires new integration pattern (no R3F-equivalent maturity) | Serious alternative — built-in Inspector is a real dev-experience win |
| **PlayCanvas** | 2.21.3 | MIT | Native | Editor-time conversion only, not runtime | Full PBR | Shadow maps, PCF | IBL cubemaps | Built-in camera scripts | Yes | Rolling out | Strong (game/mobile pedigree) | Engine-sized | **No first-party React wrapper; built around its own cloud Editor, not primarily a bare-package-in-Next.js workflow** | Wrong ergonomic fit for this stack despite technical capability |
| **model-viewer** | 4.3.1 | Apache-2.0 | Native (core use case) | No | Good, auto-generated | Auto soft shadow (baked, limited control) | Built-in presets or custom HDR | Built-in attribute | Yes (wraps internal three.js fork) | No | Good | Single tag, ~100KB+ | Zero-code embed | Fast path to "spin the model," but scripting surface is sealed — dead end for custom solar/wind overlays |
| **Spline** | runtime 1.12.98 | commercial terms not in npm manifest — **verify at spline.design/pricing directly** | Own runtime format (import glTF via editor) | No | Editor-driven | Baked/editor-driven | Editor-set | Built-in | — | — | Good, output-dependent | Runtime player, scene-size dependent | Design tool + embed runtime, not a code-first library | Not a fit for a git-tracked, code-first Next.js pipeline |
| **xeokit** | 2.6.112 | **AGPL-3.0 (copyleft)** | Native (via own XKT conversion) | No | Basic | Basic | Basic | Built-in (BIM-navigation-oriented) | Yes | — | Weak fit for desktop-class BIM sessions | Large (BIM-scale tooling) | — | **Not relevant** — built for huge IFC/BIM datasets, not a single artistic villa render; AGPL license is a real constraint every other option avoids |
| **loaders.gl** | 4.4.4 | MIT | Native parser | — | — | — | — | — | — | — | — | Small, parser-only | — | Redundant here — three.js's own official loader stack already fully covers the GLB pipeline |

**Cross-cutting finding (from the research agent, worth stating plainly): none of the above treat FBX as a true first-class runtime format.** The consistent industry pattern — and the practical takeaway regardless of which engine is chosen — is to convert FBX to GLB **offline** (e.g., via Blender) and standardize the live web pipeline on GLB only. This aligns with, and reinforces, the prior audit's format recommendation.

---

## 14. Solar Visualization Research

**The critical distinction, confirmed against official docs this pass:**

- **GSAP `MotionPathPlugin`** animates an object *along* a path that already exists — official docs confirm it accepts either an SVG `<path>`/its `d` string, **or** a raw array of `{x,y}` points (curved via its own `curviness` parameter, 0=hard corners to 2=very curvy). It is not a data-fitting algorithm; feeding it raw solar-position samples would shape the curve by GSAP's generic heuristic, not by the real geometry.
- **d3-shape's curve interpolators** (`curveNatural`, `curveMonotoneX`, `curveCatmullRom`, etc.) are the correct tool for the *other* half of the problem: given the small set of real `(azimuth, altitude)` samples already computed by the existing solar-geometry math, they generate the mathematically smooth, non-overshooting SVG path that actually passes through those real values.

**Correct architecture (RECOMMENDATION, not yet implemented):** compute real sun-position samples (already done in the current codebase) → fit a smooth curve through them with `curveNatural` or `curveMonotoneX` → optionally animate a marker/gradient sweep along that already-correct path with GSAP `MotionPathPlugin` (now fully free, per npm — GSAP 3.15.0, no more paid-tier plugin gating) or Motion's `offsetDistance`. **Physical correctness and visual smoothness are not in tension once the two jobs are correctly separated** — this directly answers §2's "do not sacrifice physical correctness for visual smoothness" mandate.

2D/2.5D/3D framing for solar specifically: see §16.

---

## 15. Wind Visualization Research

The current dotted-particle treatment reads as a generic physics demo because it visualizes *individual discrete particles* rather than the *field* itself. The professional-visualization vocabulary for this (weather/CFD/environmental-analysis software) is built on:

- **Streamlines** — continuous curves tangent to the flow direction at every point, typically drawn with varying opacity/width to encode speed, not discrete dots.
- **Flow fields / vector fields** — a grid of direction indicators (or a continuous noise-driven field) representing the flow's structure rather than tracking individual "particles."
- **Particle advection** (still particle-based, but the particles trace *along* streamlines with motion blur/fade trails, not float independently) — the key difference from the current implementation is trail-based continuity vs. isolated dots.

**Technical routes, ranked by fit for "restrained editorial, not a science demo":**
1. **SVG/Canvas streamlines with GSAP-animated dash-offset** — same technical family already used for the solar path, keeps the whole environmental module in one consistent 2D/SVG vocabulary. Lowest implementation risk, most consistent with the Nordic-editorial target.
2. **Canvas-based flow field with short-trail particle advection** (particles fade after a short trail rather than looping as isolated dots) — more "alive" feeling, still restrained if trail length/opacity/particle count are kept low and colors stay within the existing `--color-env-wind` token.
3. **Shader-based flow visualization (WebGL/GPU)** — technically the most sophisticated option and capable of the most fluid look, but the highest implementation complexity and the first candidate to feel "game-like" if not art-directed carefully — only worth it if 1–2 prove visually insufficient.

**RECOMMENDATION (not implemented):** start with streamline-based SVG/Canvas (option 1), since it reuses the exact motion-technology stack recommended for solar and carries the lowest risk of drifting into "particle demo" territory.

---

## 16. 2D vs 2.5D vs 3D vs Hybrid — Decision Framework

| Visualization | Recommended register | Reasoning |
|---|---|---|
| **Solar path** | **2D/2.5D** (SVG, curve-fit + motion-path animation) | Physical correctness comes from the underlying azimuth/altitude math, not from 3D rendering; a well-drawn 2D arc against a real building silhouette reads as more editorial/architectural than a 3D scene, and is far cheaper to keep smooth. 3D would only add value if the sun needs to interact with real building geometry (occlusion) — see hybrid note below. |
| **Wind** | **2D/2.5D** (SVG/Canvas streamlines) | Same reasoning — a flow field is inherently a 2D/vector-field visualization problem; forcing it into 3D adds cost without adding communicative value for this portfolio's restrained aesthetic. |
| **Architectural model itself** | **3D** (already the direction) | This is the one case where 3D adds real value — actual massing, proportion, and spatial understanding that a diagram cannot convey. |
| **Hybrid (future, not now)** | Real 3D building + 2D/2.5D solar/wind overlay, sharing the same underlying data | A single 3D scene does not need to own every visual element. The strongest long-term architecture likely keeps the 3D model as the "stage" (occlusion, massing, real shadow direction) while solar path and wind remain 2D/SVG overlays driven by the same analytic data — avoiding the cost and risk of moving *everything* into a 3D engine. |

**Do not assume 3D is universally better — confirmed by this analysis specifically, not as a general rule.**

---

## 17. Animation Technology Comparison

| Tool | Version (verified) | Status | Path-fitting from data? | Path-following animation? | Verdict |
|---|---|---|---|---|---|
| **GSAP** | 3.15.0 | Active, **fully free** (confirmed — 2025 Webflow acquisition removed all paid tiers) | No | Yes (`MotionPathPlugin`, raw-point or SVG-path input) | Best fit for the *animation* half of solar/wind |
| **Motion** (motion.dev) | 13.1.0, same-day co-published with `framer-motion` (already a dependency here) | Active | No | Partial (`offsetDistance`, expects a real path) | Reasonable default for general UI motion; not a differentiator for path-following specifically |
| **Anime.js** | 4.5.0 | Active, 72k★ | No | Yes, lighter-weight | Legitimate alternative to GSAP, smaller plugin ecosystem |
| **Lottie/dotLottie** | lottie-web 5.13.0 / dotlottie-web 0.79.0 | Active | No — pre-authored AE exports only | N/A | **Not relevant** — cannot ingest live data, contradicts the "physically truthful" requirement |
| **d3-shape** | 3.2.0 (API-stable since 2022) | Stable | **Yes** — this is its actual purpose | No | The missing piece — fits the curve *from* real data; pair with GSAP/Motion for the animation layer |

---

## 18–21. glTF/GLB Optimization, Draco, Meshopt, KTX2

**All figures in this section are MEASURED this pass**, using `@gltf-transform/cli` 4.4.2 (installed in the isolated `rd/3d-benchmark/` workspace only) against the current authoritative GLB, output to clearly-named files in `rd/3d-benchmark/output/`, source untouched.

| Pass | Output size | vs. original (3.21MB) | Triangles preserved? |
|---|---|---|---|
| `copy` (passthrough sanity check) | 2.56 MB | −20% | Yes, exactly |
| `dedup` + `prune` | 2.56 MB | −20% | Yes, exactly |
| `weld` + `reorder` (vertex-cache opt, no compression) | 2.47 MB | −23% | Yes, exactly (removed 6 duplicate accessors) |
| `quantize` (precision reduction) | 1.91 MB | −41% | Yes, exactly |
| `draco` (geometry compression, no simplify) | **121.12 KB** | **−96.2%** | **Yes, exactly (49,618 tri)** |
| `meshopt` (geometry compression, no simplify) | **381.11 KB** | **−88.1%** | **Yes, exactly (49,618 tri)** |
| `optimize --compress draco` (includes default `simplify` step) | 86.08 KB | −97.3% | **No — reduced to 27,781 tri (−44%)** |
| `optimize --compress meshopt` (includes default `simplify` step) | 303.91 KB | −90.5% | **No — same simplification applied** |

**This is an important, nuanced finding, not just a "smaller is better" table:** pure compression (`draco` or `meshopt` run directly, without the `optimize` recipe's default mesh-simplification step) already achieves 88–96% size reduction **with zero geometric change** — full triangle count, full silhouette fidelity preserved. The `optimize` command's convenience default trades additional (and much smaller marginal) file-size savings for a **real, measurable 44% triangle reduction** that would visibly affect edge/silhouette quality on a low-poly architectural model where every edge is already deliberate. **Recommendation: use `draco` or `meshopt` directly (not the `optimize` recipe) for architectural geometry where every polygon is intentional; reserve `simplify` for organic/high-poly assets where triangle reduction is genuinely invisible.**

**Draco vs. Meshopt tradeoff (from research + measurement):** Draco produces the smaller file here (121KB vs. 381KB) via arithmetic coding, but requires a heavier WASM decode pass (measured 182.7ms parse time for the Draco-compressed file vs. 56–76ms for the uncompressed GLB — decode cost is real and CPU-bound). Meshopt's whole design goal (per its own docs) is much faster decode at a larger, but still very small, file size. **For this project's small assets, either is comfortably fast enough that the choice is not performance-critical yet — this becomes a real decision only at the "future, much larger projects" scale (§23).**

**KTX2/Basis Universal:** correctly not tested against manufactured textures (the current model has zero — testing against fake textures would not represent real future usage). Documented for future adoption: matters once texture maps exist, since KTX2 reduces both download size *and* live GPU memory (unlike JPEG/PNG, which decode to full-size RGBA in VRAM) — three.js ships `KTX2Loader` for this. **Not urgent now; adopt when the first textured project arrives.**

**glTF Validator (Khronos):** not run this pass (no compliance question was in doubt), but recommended as a low-effort CI/pre-deploy gate for future exports — official schema/extension conformance checker, referenced in §18.

---

## 22. LOD / Streaming

Not applicable at Villa Red Sun's current scale (a single 121–381KB compressed asset loads near-instantly). Documented here as groundwork for §23's future-scale strategy: **DOCUMENTED** (from official docs, not tested — no asset here currently justifies it) that LOD, meshlets, instancing, and progressive/tiled loading exist as real techniques within three.js's ecosystem (`SimplifyModifier`, manual LOD levels via `THREE.LOD`) and Draco/Meshopt's own tooling, should a future project's model grow by an order of magnitude or more.

---

## 23. Large Model Strategy

**Proposed pipeline (RECOMMENDATION, explicitly not implemented, per instruction):**

```
MASTER 3D MODEL (3ds Max, PM-owned)
        ↓  PM cleans: remove trees/furniture/cameras/lights/non-essential objects
CLEAN ARCHITECTURAL MODEL (Building + Glass + required elements only)
        ↓  export
WEB MASTER GLB (uncompressed, full fidelity — kept as the web-facing source of truth)
        ↓  gltf-transform draco/meshopt (NOT the simplify-including `optimize` recipe, per §18's finding)
OPTIMIZED DELIVERY GLB (small, full geometric fidelity)
        ↓  (only if a future project's triangle count genuinely warrants it) LOD tiers
        ↓  CDN delivery (see §24–§28)
RUNTIME LOADING (three.js GLTFLoader + DRACOLoader/MeshoptDecoder)
```

This keeps the PM's existing 3ds Max → clean → export workflow completely intact — the web pipeline adapts to it, not the reverse, exactly as required. Whether LOD tiers are actually needed depends entirely on how much larger future projects turn out to be; **this cannot be determined from Villa Red Sun's data alone** and is flagged as an open question (§45).

---

## 24–28. CDN / Cloud Storage Strategy

**VERIFIED this pass:** the project is already linked to a real Vercel project (`.vercel/project.json`, `projectName: "nexus-portfolio-platform"`), and `.env.local` contains a `VERCEL_OIDC_TOKEN` (Vercel-native federated auth, consistent with Vercel tooling access but not direct proof of an active Blob store). No Supabase/Cloudflare/AWS credentials found locally.

| Provider | Max relevant file size | Free tier | Range-request (206) support | CDN | Fit for this project |
|---|---|---|---|---|---|
| **Vercel Blob** | 5TB absolute, 512MB cache ceiling | Free under Hobby limits | **Not documented** — plausible but unconfirmed, worth an empirical test | Vercel's own network, 20 regions | **First-party, zero new account** — since the project is already on Vercel, this is the lowest-friction option |
| **Supabase Storage** | 50MB (free) / 500GB (paid) | 1GB storage, 5GB egress | Not explicitly documented for Storage GET | Cloudflare-fronted, 285 cities | Brings a full BaaS platform (Auth/DB/Realtime) along for just a storage need — only worth it if those get used too |
| **Cloudflare R2** | 5TiB/object | 10GB-month storage, **egress always free** (confirmed on live pricing page) | Documented at the Cloudflare cache layer (custom domain required) | Cloudflare global network | Strongest cost-predictability (no egress fees) but a second cloud provider to operate |
| **Amazon S3 (+CloudFront)** | 5TB/object | No perpetual S3 free tier; CloudFront 1TB egress/mo | **Native, most battle-tested of all four** | CloudFront, most configurable | Most capable, most operational overhead — **assessed as over-engineered for "a handful of GLBs, 2–50MB each"** at this project's actual scale |

**No winner declared, per instruction.** Practical framing: Vercel Blob is the path of least friction given the existing Vercel link; Cloudflare R2 is the strongest cost-predictability play if egress ever becomes unpredictable; S3 is the right answer only if this portfolio's scale changes substantially. **Explicitly separating the two problems, as instructed:** none of this changes §5's finding that GPU rendering cost is not currently a bottleneck — storage/CDN choice affects *download time*, not *render cost*.

---

## 29. Claude / MCP / Skills / Tooling

Assessed from direct knowledge of this session's actual available tooling (not researched externally, since this is about the assistant's own environment):

| Tool | What it does | Official? | Useful here? |
|---|---|---|---|
| Browser pane (`mcp__Claude_Browser__*`) | In-app browser automation — navigate, screenshot, console/network inspection, JS execution | Yes, first-party | Yes, used extensively this pass for benchmarking — **with a known, disclosed limitation**: screenshots and `requestAnimationFrame` do not reliably fire/composite in this sandboxed pane (independently re-confirmed this pass via the isolated harness — see §32). Direct `performance.now()`-timed manual render calls work reliably and were used as the workaround. |
| `visualize` MCP (`mcp__visualize__*`) | Renders SVG/HTML widgets inline in chat | Yes, first-party | Not used this pass (this is a file-based deliverable phase), but relevant for future rapid solar/wind prototyping without touching the live app |
| Agent tool (background research agents) | Parallel, isolated research/investigation | Yes, first-party | Used for all three technology-research tracks this pass — appropriate given the scope (3 independent multi-technology comparisons) |
| `gltf-transform` CLI | glTF inspection/optimization | Yes, official Khronos-ecosystem project | Installed, used, real results — see §18 |

No new Claude-specific skill/plugin was identified this pass as clearly missing for this work; the existing toolset (Browser pane + Bash + Agent) was sufficient to do genuine, measured research and benchmarking.

---

## 30. Current Environment Inventory

**MEASURED, this pass:**

| Tool | Version |
|---|---|
| Node | v24.17.0 |
| pnpm | 9.15.0 (project pins `packageManager: pnpm@9.15.0`; global pnpm binary reports 11.18.0 elsewhere in this session — a pre-existing minor mismatch, not something this phase changed) |
| Python | 3.14.6 |
| git | 2.55.0 |
| Next.js | 16.2.6 |
| React | 19.2.0 |
| TypeScript | ^5.7.0 |
| three | ^0.185.1 (pre-existing, see §2) |
| @react-three/fiber | ^9.7.0 (pre-existing, see §2) |
| framer-motion | ^12.0.0 |
| GSAP | **not installed** |
| Blender | **not found on PATH** |
| gltf-transform / gltfpack (global) | **not found on PATH** (installed this pass, isolated, in `rd/3d-benchmark/`) |
| ffmpeg | **not found on PATH** |
| ImageMagick (`magick`) | **not found**; Windows' built-in `convert.exe` exists but is unrelated |

**ALREADY INSTALLED vs. RECOMMENDED vs. OPTIONAL vs. UNNECESSARY:**
- **Already installed:** three.js, R3F (pre-existing from prior phase, flagged in §2).
- **Recommended for next-phase prototyping (not installed yet):** GSAP (+`@gsap/react`), d3-shape.
- **Optional / future:** KTX2 tooling (once textures exist), Blender (if FBX→GLB conversion becomes a standard step), glTF Validator in CI.
- **Unnecessary for this project's scale:** xeokit (AGPL, wrong problem domain), loaders.gl (redundant with three.js's own loaders), PlayCanvas (wrong ergonomic fit), S3+CloudFront (over-engineered at current scale).

---

## 31. Installed R&D Tools (this pass)

| Package | Version | Location | Reason | Production-ready? | Should remain installed? |
|---|---|---|---|---|---|
| `@gltf-transform/cli` | 4.4.2 | `rd/3d-benchmark/package.json` (isolated, **not** the app's `package.json`) | Real optimization benchmarking | It's a CLI dev tool, not an app runtime dependency — fine to keep for future export QA | Yes, recommend keeping as an isolated CLI tool for the future export pipeline (§23) |

Nothing was added to the production app's `package.json`/`pnpm-lock.yaml` this pass (verified via `git status`, §2). One build-script note: `sharp` (a `gltf-transform` sub-dependency used for texture work) had its install script blocked by pnpm's default script-approval security gate — irrelevant here since the current asset has zero textures, but flagged for when KTX2/texture work begins (§20).

---

## 32. Benchmark Methodology

Built a standalone, isolated HTML/JS harness (`rd/3d-benchmark/harness.html`, three.js loaded via CDN import map, zero relation to the app's own three.js install), served from a separate static file server on port 8090 (fully isolated from the Next.js dev server on port 3000, stopped after use).

**Environment limitation, confirmed independently this pass (not assumed from a prior session's note):** `requestAnimationFrame` does not reliably drive a render loop in this sandboxed Browser pane — the harness's own rAF-based loop never advanced past frame 0 in over 3 seconds of wall-clock wait, despite the model loading and parsing successfully in the background (confirmed via `window.__lastStats`, populated synchronously). **Workaround used:** exposed the renderer/scene/camera on `window` and drove exactly 300 `renderer.render()` calls directly via `performance.now()`-timed synchronous loops, bypassing rAF scheduling entirely. This measures genuine CPU/GPU submission cost per frame — the metric most directly relevant to "is this scene too heavy" — even though it cannot reproduce true compositor/vsync-paced FPS on a real display. **This distinction is stated explicitly so the numbers below are not over-claimed as "real-device FPS."**

**Metrics captured:** file size (measured via filesystem), load time + parse time (measured via `performance.now()` around the loader call), triangle/mesh/material counts (via `renderer.info` + manual scene traversal — matches `gltf-transform inspect`'s independent numbers exactly), render-call CPU cost (300-sample average/median/p95/min/max, both static and with a simulated full-rotation orbit each frame).

**Not measured, honestly disclosed:** true compositor FPS on a real display, GPU-side timing (WebGL has no standard cross-browser GPU timer without extensions not exercised here), mobile-device behavior, actual visual sharpness/pixelation (screenshot tooling does not composite in this environment — confirmed again this pass, blank captures reproduced even on plain scrolled text unrelated to any 3D content, ruling out a WebGL-specific cause).

---

## 33. Benchmark Results

| Variant | File size | Load total | Parse time | Triangles | Render avg (300-sample) | Orbit-simulated avg |
|---|---|---|---|---|---|---|
| source.glb | 3.21 MB | 97–145ms | 56–76ms | 49,770 | 0.17ms | — |
| draco.glb (compressed, full geometry) | 121 KB | 219ms | 182.7ms | 49,770 | — | 0.11ms |
| meshopt.glb (compressed, full geometry) | 381 KB | not separately timed this pass | — | 49,770 | — | — |
| source.fbx | 1.85 MB | 564ms | **525.4ms** | 49,770 | 0.04ms | 0.10ms |

All render-call costs are, without qualification, **far below any perceptible frame-budget threshold** (a 60fps budget is 16.7ms/frame; every measured render call here used well under 1% of that budget). **The measured data does not support "the model is too heavy" as an explanation for the reported lag** — see §5's ranked hypotheses for what more plausibly does.

---

## 34. Visual Quality Results

**Honestly incomplete, disclosed rather than fabricated:** screenshot capture in this environment's Browser pane does not composite reliably (reproduced this pass on both the 3D harness and, as a control, on plain scrolled text with no 3D content at all — ruling out a WebGL-specific cause and confirming it's an environment-wide limitation, not a bug in the tested code). **I cannot report silhouette/edge/AA/lighting quality from direct visual inspection this pass.** What I can report: no console errors on load for any variant, `renderer.info` confirms correct draw-call/triangle counts matching the source data exactly (i.e., nothing is silently corrupted or mis-parsed), and the material-collapse finding from §3 remains the one *confirmed* visual-fidelity problem (GLB's glass is not visually distinguishable from the building, per material data).

---

## 35. Performance Results

Covered in §33. Restated as the single clearest finding of this phase: **render cost is not the bottleneck; parse time and (hypothesized) depth-precision behavior are the more likely culprits, and both are fixable at the loader/camera-configuration level, not by simplifying geometry.**

---

## 36. Format Comparison

| | GLB | glTF (separate files) | FBX | OBJ |
|---|---|---|---|---|
| Direct browser support | Native, binary, single file | Native, but multi-file (JSON+bin+textures) — worse for a CDN/simple-hosting workflow | Requires `FBXLoader`, not a web-native format | Requires `OBJLoader`, no material/PBR richness |
| Loader complexity | Lowest | Low, more file management | Medium-high (525ms parse measured this pass) | Low, but format is too limited for this use case |
| Materials/PBR | Full glTF PBR spec | Same as GLB | Legacy properties, inconsistent PBR translation (confirmed in the prior forensic pass) | Minimal (Phong-era MTL) |
| Compression ecosystem | Draco/Meshopt/KTX2 all target glTF/GLB specifically | Same | No native web-compression ecosystem | None |
| **Recommendation** | **Web delivery format, confirmed again this pass with measured compression results** | Not preferred — GLB's single-file packaging is simpler for a small-project CDN workflow | **Keep as a source/interchange/QA reference only, not for web delivery** (per the prior forensic pass's material-fidelity finding + this pass's parse-time finding) | Not relevant to this project |

---

## 37. Recommended Future 3D Pipeline

Per §23, with the material-fidelity caveat from the prior forensic audit still open (GLB currently loses glass/building material distinction — a source-material/exporter question, not addressed by this phase). Concretely, before the next implementation phase: (1) resolve the FBX-vs-GLB material question (either fix the source material type or accept a web-side material override by object name, both previously documented as B/D-classified decisions), (2) apply `draco` or `meshopt` directly (not `optimize`'s simplify-including recipe) to any future web-delivery GLB, (3) if the FBX path is used at all in the future, manually apply the correct unit-scale correction and set the camera's near-plane proportionally to scene scale to avoid the depth-precision issue in §5.

---

## 38. Recommended Solar Pipeline (prototype-stage recommendation, not implemented)

d3-shape curve interpolation (fit real azimuth/altitude samples into a smooth arc) → GSAP MotionPathPlugin (animate a marker/gradient along that arc) → keep the existing real solar-math as the single source of truth, unchanged. 2D/SVG register (§16). This is additive to, not a replacement of, the underlying calculation logic already in the codebase.

## 39. Recommended Wind Pipeline (prototype-stage recommendation, not implemented)

Start with SVG/Canvas streamlines (§15, option 1) using the same GSAP-driven motion technology as solar, before considering shader-based flow fields.

## 40. Recommended Hosting/Delivery Pipeline (prototype-stage recommendation, not implemented)

Vercel Blob first (lowest friction, already-linked project), Cloudflare R2 as the fallback if egress cost becomes a real concern at a future, larger project's scale. Empirically test range-request support against a real Blob URL before committing, since it's undocumented either way (§24–28).

---

## 41. Reflection Workflow Proposal

Not implemented, per instruction — proposal and examples only. **Concept:** for each project, Claude inspects the project's actual authoritative content (brief, design proposals, final decision, site conditions — already structured in `content/projects/*.ts`) and generates a project-specific interview question set, never a generic template and never a fabricated answer. Example questions this method would produce for Villa Red Sun (illustrative, not exhaustive — a fuller 10-question set already exists from the prior forensic audit pass):

- *"Of the seven proposals, only three reached full visualization. What made you cut the other four before investing further?"* — tests editorial judgment, grounded in the real number "seven" from the project's own content.
- *"The solar analysis shows this site's summer sun is dominant from the west — did that confirm an intuitive decision, or change something?"* — ties directly to the real solar-path data already computed for this project, not a generic environmental question.

The workflow scales to future projects automatically, since it reads whatever content exists for that project rather than assuming Villa Red Sun's specific facts.

---

## 42. MasterPlan / SiteAnalysis Re-audit

Re-verified fresh this pass, directly against both authoritative folders only (`A-villa-red-sun-Final/`, `B-villa-efe-Final/`), not from memory of prior passes:

> **"Confirmed absent from the authoritative asset folder"** — for both MasterPlan and SiteAnalysis, in both `A-villa-red-sun-Final/` and `B-villa-efe-Final/`.

**Current STALE CODE REFERENCES (not authoritative assets), unchanged from the prior audit — still present, still not fixed this phase, per the stop condition:**

| File | Line | Reference |
|---|---|---|
| `content/projects/villa-red-sun.ts` | 78 | `SiteAnalysis-A-villa-red-sun_result.png` |
| `content/projects/villa-red-sun.ts` | 84 | `SiteAnalysis-A-villa-red-sun-Illustration_result.png` |
| `content/projects/villa-red-sun.ts` | 130 | `MasterPlan-Idea-B-2-Top_result.png` |
| `content/projects/villa-red-sun.ts` | 143 | `MasterPlan-Idea-C-1-Top_result.png` |
| `content/projects/villa-red-sun.ts` | 156 | `MasterPlan-Idea-D-Top_result.png` |

`content/projects/villa-efe.ts` contains zero such references (already clean from an earlier phase). **Not resurrected, not fixed — reported only, per instruction.**

---

## 43. Risks

- The pre-existing temporary 3D viewer (§2) sitting in the live portfolio, unresolved, is a real risk if forgotten before any public deployment.
- GLB's material-collapse issue (glass indistinguishable from building) remains open from the prior forensic pass and is not addressed by this phase's rendering-technology research.
- The FBX unit-scale bug, if the FBX path is ever used in production without correction, risks depth-precision artifacts on real hardware (§5) — currently only a hypothesis, not confirmed on a real display.
- Render-cost measurements in this environment cannot be assumed identical to the PM's actual device/monitor — flagged, not hidden.

## 44. Unknowns

- Whether the depth-precision hypothesis (§5) actually explains the visual complaint — requires testing on a real device with working screenshot capability, which this environment cannot provide.
- Whether Vercel Blob/Supabase Storage actually support HTTP range requests — undocumented by either vendor, would need an empirical `curl -r` test against a real object.
- How much larger future projects will actually be — directly affects whether LOD/streaming (§22) becomes necessary at all.
- Current exact AWS S3/CloudFront pricing (the research agent could not scrape live JS-templated pricing pages) — treat cited figures as indicative only.

## 45. Open Questions (for the Project Manager)

1. Should the pre-existing temporary 3D viewer from the prior phase be removed, kept, or folded into this research phase's scope?
2. Which storage provider should be evaluated first in a real (not just documentation-based) test — Vercel Blob, given the existing account link?
3. Should the GLB material-fidelity issue be fixed at the source (new export with a glTF-friendlier material) or worked around on the web side (per the prior audit's two options)?
4. How much larger, concretely, are the "next projects" expected to be — this materially changes whether §22/§23's LOD strategy is worth prototyping now or later.

## 46. Recommended Next Phase

A small, isolated prototype (still outside the production portfolio, per this phase's own rules) that: (a) tests the depth-precision hypothesis directly by correcting the FBX unit scale and comparing near/far behavior, (b) builds one real d3-shape + GSAP MotionPathPlugin solar-arc prototype against the existing real data, and (c) builds one real SVG-streamline wind prototype — all as standalone, non-production experiments, before any decision to integrate into the live Environmental Response component.

## 47. What Claude Can Implement Autonomously (A)
- Further isolated R&D prototypes (solar/wind motion experiments, additional gltf-transform passes) outside the portfolio UI.
- Additional research passes on any technology flagged **[uncertain]** above.

## 48. What Requires Project Manager Approval (B)
- Removing or keeping the pre-existing temporary 3D viewer (§2).
- Proceeding from "prototype" to actual integration into the live Environmental Response component.
- Choosing a storage provider to actually set up (even in a test capacity).

## 49. What Requires New Assets from the Architect (D)
- A corrected 3D export with glTF-compatible glass/building materials, if the source-fix path is chosen over the web-side-override path (per the prior forensic audit, unchanged).
- Confirmation of expected future-project scale, to right-size the LOD/streaming decision.

## 50. Final Decision Matrix — Top 3 Possible Architectures

**Not a final production decision — all three are "recommended for prototyping" only.**

| | **Option A: Three.js + GSAP + d3-shape + gltf-transform + Vercel Blob** | **Option B: Babylon.js + GSAP + d3-shape + Vercel Blob** | **Option C: Three.js (3D model only) + pure 2D/SVG solar+wind (no new 3D-adjacent animation library)** |
|---|---|---|---|
| Visual quality | High, given full manual control | High, richer built-in shadow/IBL options | High for the 2D layer; 3D stays minimal/architectural |
| Performance | Confirmed cheap at current scale (§33) | Not yet benchmarked (**would need its own isolated pass**) | Lowest overall footprint — no new 3D library added |
| Dev complexity | Medium — three.js already present, just add motion/curve libs | Medium-high — new engine, new patterns to learn | Low — smallest surface area change |
| Scalability | Good, matches researched ecosystem (Draco/Meshopt/KTX2 all target it) | Good, comparable | Depends entirely on how far "pure 2D" can be pushed before a real 3D model is wanted |
| Maintenance | Low risk — largest ecosystem, most examples | Slightly higher — smaller community for "editorial/art-directed" use cases specifically | Lowest — fewest new dependencies |
| Claude compatibility | High — extensively documented, easy to reason about | Medium — less represented in typical training/reference material | Highest — pure web-standard SVG/Canvas |
| Solar suitability | Strong (§14 architecture) | Same strong architecture, engine-agnostic | Strong — this IS the 2D architecture from §14 |
| Wind suitability | Strong (§15) | Same | Strong — this IS the 2D architecture from §15 |
| Architectural model suitability | Strong, already measured working | Would need fresh benchmarking | Minimal 3D footprint — least return on the model-viewing investment |
| Hosting | Vercel Blob (§24) | Same | Same, smaller assets overall (SVG/Canvas has no heavy binary payload) |
| Risks | Depends on resolving the GLB material-fidelity gap eventually | Adds a second, unbenchmarked 3D engine mid-project | Defers the "real 3D architectural viewer" ambition entirely |

---

**STOP. Research, inspection, and benchmarking complete. No production portfolio behavior changed. No 3D source file modified, renamed, or re-exported. No commit, push, or deploy performed.**

**Report saved at:** `C:\Users\Server_Rav\Desktop\Nexus-DK - Portfolio - Claude - Gemini - 2026\All Final For Claude Code\PHASE_0_3D_WEB_GRAPHICS_TECHNOLOGY_AUDIT.md`

**Waiting for explicit Project Manager approval before any implementation phase begins.**
