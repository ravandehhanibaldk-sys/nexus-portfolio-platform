# Generated/Produced Image Discrepancies

Compiled 2026-08-26 per the external-review task's standing rule: a
separate list of any issue found where a *generated or produced image
itself* is wrong — not a label, wiring, code, or translation bug (those
are all covered in the main consolidated report and were fixed in-session)
— because those need Hanibal's own 3D/rendering pipeline to regenerate,
not something fixable in this codebase.

This list covers the entire project, not only the item that originally
raised the rule (Priority 1, item 3). It reflects what surfaced during
this pass's testing (the item 3 investigation, the item 9 Red Sun/Efe
comparison, and a full visual review of all 18 PDF pages and 8 website
screenshots) — it is not an exhaustive pixel-level audit of every asset in
the image library.

## 1. Villa Red Sun's Site Analysis image — building state can't be confirmed

- **File:** `public/images/villa-red-sun/SiteAnalysis-A-villa-red-sun_result.png` (and its print-JPEG counterpart), used on both the website's Site beat and PDF page 4.
- **What's wrong:** The image is a dense, photorealistic aerial with no distinct, labeled building outlines. The project's own narrative for this beat is explicitly "two buildings, one plot" — the *pre-merger* condition, before the renovation joined them into one home. Looking at the image alone, it's not possible to confirm whether it actually depicts that pre-merger two-building state, or the already-merged post-renovation result. If it's the latter, the image doesn't match what the caption and surrounding text describe.
- **Why this couldn't be fixed in-session:** This is exactly why item 9 (build a coded Site/Location diagram matching the Solar/Wind instrument-panel style, replacing the photo) could be done for Villa Efe but not Red Sun — Efe's reference photo (`B-47-site-spotting-villa-efe_result.png`) has explicit labeled geometry (property boundary, adjacent-building outlines, roads, compass) confirming exactly what it shows; Red Sun's does not, so a confident redraw isn't possible without guessing.
- **What Hanibal needs to do:** Confirm which building state this image actually shows. If it's pre-merger, no image change is needed (only worth a caption double-check). If it's post-merger, either source/produce a genuine pre-merger aerial, or provide labeled reference geometry (property boundary, both original building outlines) so a coded Site/Location diagram can be built for Red Sun the same way it now exists for Efe — see `docs/handoff/ENVIRONMENTAL-DIAGRAM-SYSTEM-SPEC.md` for how that system works.

## Not on this list (found, but not a generated-image defect)

For clarity, two things surfaced during this pass that might look related but aren't genuine "wrong image" issues, so they're intentionally excluded:

- **Priority 1, item 3** (Villa Efe's Location Plan reportedly showing an empty/gray box): directly tested — the image itself loaded correctly (200 OK, valid 1440×810 PNG, confirmed rendering via a dedicated Playwright check) and could not be reproduced. This is now moot regardless, since that section has been replaced entirely by the new coded Site/Location diagram (item 9) — there's no photographic image left in that slot to be broken.
- **The new `public/diagrams/10-site-location-efe.svg` rendering cropped in the PDF on first build**: this was a real rendering bug, but it was a *code* defect (an `<img src="*.svg">` + `object-fit: contain` combination that Chromium doesn't scale down correctly for this SVG), not a defect in the image content itself. Root-caused and fixed in-session by switching to the same inline-SVG-injection approach already used on the website — no action needed from Hanibal.
