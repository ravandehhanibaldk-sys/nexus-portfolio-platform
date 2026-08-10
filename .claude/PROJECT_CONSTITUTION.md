# Project Constitution — Nexus Portfolio Platform

Every Skill in this project must read and obey these principles.
If a Skill's own instructions ever conflict with a principle here, the principle wins.

1. **Architecture before software.** Software and rendering tools are never named inside a project narrative. They belong only in a Skills/CV context.

2. **Story before beauty.** A visually excellent asset does not earn its place if it doesn't serve the narrative. Never open a project with a rendering before the reader understands the design problem.

3. **One source of truth.** Website content is the master source. The PDF is a second presentation of the same content — never an independently maintained fork. Project facts live in one place, not duplicated across files that can drift out of sync.

4. **No duplicate components.** If an existing component or pattern already solves a problem, reuse it. A new project does not get to invent its own version of something that already exists.

5. **Every decision must be documented.** Architecture Decision Records and progress notes are a side effect of doing the work, not an afterthought done later.

6. **Every project must strengthen the portfolio, not merely increase its size.** Adding a project is not automatically good — it's good only if it makes the whole portfolio a stronger case for the candidate.

7. **Quality always wins over quantity.** One strong image beats three adequate ones. One well-developed project beats four thin ones.

8. **Do not generate content merely to fill space.** An empty or placeholder section is more honest than a fabricated one.

9. **Every image must justify its existence.** If an image doesn't communicate a specific architectural idea, it doesn't belong in the sequence.

10. **The portfolio is judged as a whole, not as independent projects.** Consistency across projects (quality bar, rhythm, visual language) matters as much as any single project's quality.

11. **Skills do not block direct user instructions, but they must warn first if the instruction conflicts with a Constitution principle.** State the conflict plainly, then proceed as instructed. Never silently comply and never silently refuse — surface the tension, then follow the user's call.

12. **If you notice mid-implementation that you are making a visual or narrative judgment — not just executing one already made — stop and route it to the Skill that owns that judgment before continuing.** This is the general form of two real mistakes already made and fixed in this project: the Hero/gallery duplication call and the Grid/composition balance fixes both leaked into implementation before this principle existed. Do not wait to be corrected a third time.

13. **The current numbered asset folder for a project is the sole authoritative visual source — never mapped to, merged with, or evaluated against an older or previous-session asset library.** When Hanibal supplies a rebuilt asset set, treat it as standing entirely on its own authority, even where a new file looks visually similar to something from an earlier version. Do not reuse old files, reference old filenames, map new assets to old ones by similarity, or restore anything from a prior asset library, unless Hanibal explicitly says otherwise. (Established 2026-08-10, when the numbered `A-*-Final`/`B-*-Final` libraries superseded the earlier asset set used in prior sessions.)

14. **The Hero component always supports both a future animation/video and a static image fallback — never hard-coded to one permanently, and never faked.** When a project's motion asset isn't ready yet, its first exterior image serves as the temporary Hero. Supplying the finished animation later must be a drop-in replacement, not a restructuring of the page or the narrative. Never invent, approximate, or fabricate placeholder motion to fill the gap — Constitution #8 applies here specifically.
