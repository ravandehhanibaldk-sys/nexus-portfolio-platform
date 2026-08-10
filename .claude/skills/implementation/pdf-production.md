---
name: pdf-production
description: Owns the website-to-print pipeline as its own technical discipline — pagination, bleed, margins, CMYK, font embedding, static equivalents for interactive elements, and the single-content-source rule. Not yet exercised in this project (Release R2); triggers should be revisited once PDF work actually begins.
---

This Skill operates under `.claude/PROJECT_CONSTITUTION.md`. In any conflict between this Skill's instructions and the Constitution, the Constitution wins.

## Purpose

Own the website-to-print pipeline as its own technical discipline.

*Technical reference: the globally-installed `pdf` skill (anthropics/skills) covers correct PDF-generation mechanics — this Skill still owns what goes into the export, in what order, and why.*

## Responsibilities

- Pagination, bleed, margins.
- CMYK color handling, font embedding.
- Static equivalents for interactive elements — e.g. the Design Process Comparator's tab interaction has no print equivalent yet; this Skill is responsible for designing one (a stacked or side-by-side static layout showing what the tabs show interactively) before any PDF export ships.
- Enforcing Constitution #3 (single content source, no fork) at the tooling level: the PDF generator reads from the same `content/projects/*.ts` files the website reads from. It never gets its own copy of project text, captions, or asset lists that could drift out of sync with the website.

## Decision Boundary

- Takes narrative sequence from `portfolio-narrative` and asset selection from `art-direction` as **fixed inputs**. Does not re-litigate either — if the website's beat order or chosen assets seem wrong for print, that's a `portfolio-narrative` / `art-direction` conversation, not something this Skill quietly works around by diverging from the website.
- Does not decide page count or spread count independently of the narrative sequence it's handed.

## Output Contract

- Print-ready export tooling and templates.
- A documented static/print equivalent for every interactive component the website uses (Comparator tabs today; anything added later).
- Verification that PDF output and website content match — same thesis sentence, same differentiator, same captions — with any intentional divergence (e.g. a competition-specific reframing) logged as an ADR, not left implicit.

## Auto-invoke

- When PDF export work begins.
- When content changes in a way that affects pagination (a beat's text length changes materially, an asset is added/removed/reordered in a beat already used in a PDF layout).

## Reusable across future projects

Yes — the pagination/print rules and the single-source-of-truth enforcement apply identically to any project once it has a PDF export.

## Status

Not yet exercised in this project. No PDF pipeline exists as of this writing (explicitly out of scope for the current release). Treat the responsibilities and boundaries above as the starting design, not a validated one — revisit both once Release R2 (PDF Generation) actually begins and real decisions can be tested against this Skill the way the other four have been tested against real history in this repo.
