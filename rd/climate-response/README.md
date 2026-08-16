# rd/climate-response/ — ISOLATED R&D, Phase 3

Not part of the production app. No production dependency changes. Served locally via a plain static file server for testing only.

- `data/` — climate data JSON for both projects, transcribed verbatim from the two authoritative `Complete-Climate-Site-Analysis-*.txt` reports, with per-category provenance labels (A–F) matching the classification used in `PHASE_3_LIVE_CLIMATE_RESPONSE_SYSTEM.md`.
- `prototypes/` — three working HTML prototypes (A: Climate Timeline, B: Architectural Climate Field, C: Year in Motion), each loading the JSON data via `fetch()`. Open via a local static server (e.g. `python -m http.server`) from this directory, not via `file://`, since `fetch()` of local JSON requires HTTP.
- `research/` — reserved for any supplementary notes; primary findings live in the main phase report at the project root.
- `assets/` — reserved, currently empty.

See `PHASE_3_LIVE_CLIMATE_RESPONSE_SYSTEM.md` at the project root for the full data audit, provenance matrix, and prototype evaluation.
