/**
 * Exhaustive translation audit for the Environmental Diagrams / Site
 * Location instrument-panel system (public/diagrams/*.svg). Built for
 * the 2nd external-review round, after two rounds of manual/spot-check
 * verification both missed real leaks — this replaces spot-checking with
 * a scripted, repeatable check.
 *
 * Two passes:
 *
 * 1. STATIC — reads every diagram SVG directly and lists every <text>/
 *    <tspan> node's raw content, id, and class. This is the full
 *    inventory of what's baked into the source files, independent of any
 *    runtime wiring.
 *
 * 2. LIVE — drives a real browser to both projects' EN and DA pages,
 *    clicking through all 12 months (many diagram slots are month-
 *    dependent — a bug can be invisible on the default month and only
 *    show up on, say, a winter month), and collects every *visible*
 *    (non-`display:none`, non-zero-size) SVG text string on each page.
 *
 * The live pass's core check: any string that renders IDENTICALLY on
 * both the EN and DA page for the same diagram is either (a) something
 * that's supposed to be identical (a number, a compass letter, a proper
 * noun/brand name — see ALLOWLIST below) or (b) a genuine untranslated
 * leak. Everything in the intersection that isn't allowlisted is
 * flagged. A supplementary word-level scan also flags a small curated
 * list of English words specific to this corpus's own vocabulary
 * (legend, hover, site, etc.) if they appear as a whole word anywhere in
 * the DA page's visible diagram text, since a partially-translated
 * sentence (translated overall, one leftover English word inside it)
 * would NOT be caught by the identical-string check above.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3001";
const PROJECTS = ["villa-red-sun", "villa-efe"];
const MONTH_IDS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Strings allowed to be identical on both locale pages: proper nouns,
// brand/software names, units, numbers, compass letters (documented
// judgment call — carried over from the 1st review round), and values
// that are deliberately locale-invariant by design (MODEL/ANNUAL AVG
// qualifiers use the same short tokens in both languages per item 20).
const ALLOWLIST = new Set([
  "N", "E", "S", "W",
  "MODEL", "M/S", "MM", "KM", "H",
  "3DS MAX", "V-RAY", "CORONA RENDERER", "AUTOCAD", "REVIT", "UNREAL ENGINE 5", "UNREAL ENGINE",
  "VILLA RED SUN", "VILLA EFE", "HANIBAL RAVANDEH",
  "SOLRØD / DENMARK", "GIRNE / KYRENIA",
  "A / 03", "B / 03",
  // 9 of 12 Danish month abbreviations happen to be spelled identically
  // to English (dictionaries/da.ts's own monthAbbrev values) — only MAY
  // -> MAJ and OCT -> OKT actually differ. Identical here is correct,
  // not a leak.
  "JAN", "FEB", "MAR", "APR", "JUN", "JUL", "AUG", "SEP", "NOV", "DEC",
]);

// Curated, corpus-specific — not a general English dictionary (that would
// false-positive on real Danish/English cognates). These are the exact
// words involved in this diagram family's own vocabulary.
const SUSPECT_WORDS = [
  "hover", "legend", "instrument", "waterfront", "access", "road", "roads",
  "building", "buildings", "adjacent", "coast", "project", "site", "plan",
  "condition", "state", "season", "climate", "limits", "secondary",
  "primary", "direction", "speed", "frequency", "status", "reading",
  "envelope", "exposure", "disclosure", "flow", "path", "noon", "sunrise",
  "sunset", "daylight", "altitude", "selector", "month",
  "winter", "spring", "summer", "autumn", "default", "selected", "marker",
  "shadow", "indicative", "reference",
];

function isAllowlisted(s) {
  const up = s.trim().toUpperCase();
  if (ALLOWLIST.has(up)) return true;
  // Pure numeric/symbol/unit strings (dates, degrees, percentages, coordinates).
  if (/^[\d\s.,:%°\-–—·\/]+$/.test(up)) return true;
  // Numeric value + unit (e.g. "8.0 h", "6.50 M/S", "117 MM", "· MODEL",
  // "· ANNUAL AVG") — real project data or an item-20 qualifier, not UI
  // chrome, out of scope for dictionary translation.
  if (/^[\d.]+\s*(H|M\/S|MM|KM|%|°)$/i.test(up)) return true;
  if (/^·\s*(MODEL|ANNUAL AVG)$/i.test(up)) return true;
  // Compass notation values (e.g. "W / SW", "E / NE") — real content data
  // (month.wind.directionLabel in content/projects/*.ts), not dictionary-
  // driven UI text. Danish compass letters differ (N/S/Ø/V, not N/S/E/W),
  // so this is a content-data decision out of scope for this pass — see
  // the report.
  if (/^[NSEW]{1,3}(\s*\/\s*[NSEW]{1,3})?$/.test(up)) return true;
  return false;
}

function findSuspectWords(daString) {
  const tokens = daString.toLowerCase().match(/[a-zæøå]+/g) ?? [];
  const hits = new Set();
  for (const t of tokens) {
    if (SUSPECT_WORDS.includes(t)) hits.add(t);
  }
  return [...hits];
}

async function extractVisibleSvgText(page) {
  return page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("svg text, svg tspan"));
    const out = [];
    for (const el of nodes) {
      const text = (el.textContent ?? "").trim();
      if (!text) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      if (getComputedStyle(el).display === "none") continue;

      // Headless massing-source clones (solar-diagram.tsx's SolarReading /
      // wind-diagram.tsx's WindEnvelopeReading each load an off-screen,
      // unwired second copy of 01/02 purely to clone `#building-mass` —
      // see components/project/*-diagram.tsx) sit at `position:absolute;
      // left:-9999px; top:-9999px`. getBoundingClientRect() still reports
      // a real rect for them (they ARE rendered, just off-canvas).
      const offViewport = rect.right < 0 || rect.bottom < 0 || rect.left > window.innerWidth * 3;
      if (offViewport) continue;

      // The 04 month-selector's own dev-reference "month-state-guide"
      // legend (DEFAULT/HOVER/SELECTED swatches) sits below the injected
      // SVG's own cropped viewBox (environmental-diagrams.tsx sets
      // viewBox="0 0 1200 285" at runtime). getBoundingClientRect() on a
      // child still returns its geometric position even when an
      // ancestor's `overflow:hidden` (the SVG root's default UA style)
      // clips it from paint — a naive non-zero-rect check is fooled by
      // this exactly the same way it's fooled by the off-screen clones
      // above. The real test: is the element's rect actually contained
      // within its own nearest <svg> ancestor's rendered (already-
      // clipped) box? If not, nothing outside that box is actually
      // painted, regardless of what the child's own rect reports.
      const svg = el.closest("svg");
      if (svg) {
        const svgRect = svg.getBoundingClientRect();
        const containedInSvg =
          rect.top >= svgRect.top - 0.5 &&
          rect.bottom <= svgRect.bottom + 0.5 &&
          rect.left >= svgRect.left - 0.5 &&
          rect.right <= svgRect.right + 0.5;
        if (!containedInSvg) continue;
      }

      out.push(text);
    }
    return out;
  });
}

async function collectAllMonths(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1000);
  const all = new Set();
  for (const t of await extractVisibleSvgText(page)) all.add(t);

  for (let i = 0; i < MONTH_IDS.length; i++) {
    const id = MONTH_IDS[i];
    const count = await page.locator(`#month-${id}`).count();
    if (count === 0) continue;
    await page.locator(`#month-${id}`).click({ force: true }).catch(() => {});
    await page.waitForTimeout(250);
    for (const t of await extractVisibleSvgText(page)) all.add(t);
  }
  return all;
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
const page = await context.newPage();

console.log("=".repeat(70));
console.log("STATIC PASS — raw text inventory per SVG file");
console.log("=".repeat(70));

const fs = await import("node:fs");
const path = await import("node:path");
const diagramsDir = path.join(process.cwd(), "public", "diagrams");
const files = fs.readdirSync(diagramsDir).filter((f) => f.endsWith(".svg")).sort();
const staticInventory = {};
for (const file of files) {
  const src = fs.readFileSync(path.join(diagramsDir, file), "utf-8");
  const matches = [...src.matchAll(/<text\b([^>]*)>([^<]*)<\/text>|<tspan\b([^>]*)>([^<]*)<\/tspan>/g)];
  const entries = matches
    .map((m) => {
      const attrs = m[1] ?? m[3] ?? "";
      const text = (m[2] ?? m[4] ?? "").trim();
      const id = /id="([^"]*)"/.exec(attrs)?.[1] ?? null;
      const cls = /class="([^"]*)"/.exec(attrs)?.[1] ?? null;
      return { text, id, cls };
    })
    .filter((e) => e.text);
  staticInventory[file] = entries;
  console.log(`\n${file} (${entries.length} text nodes):`);
  entries.forEach((e) => console.log(`  ${e.id ? `#${e.id}` : e.cls ? `.${e.cls}` : "(no id/class)"} -> "${e.text}"`));
}

console.log("\n" + "=".repeat(70));
console.log("LIVE PASS — visible text on real Danish/English pages, all 12 months");
console.log("=".repeat(70));

const findings = [];

for (const project of PROJECTS) {
  console.log(`\n--- ${project} ---`);
  const enSet = await collectAllMonths(page, `${BASE}/en/projects/${project}`);
  const daSet = await collectAllMonths(page, `${BASE}/da/projects/${project}`);

  console.log(`EN unique visible strings: ${enSet.size}`);
  console.log(`DA unique visible strings: ${daSet.size}`);

  // Check 1: identical strings on both pages.
  const identical = [...enSet].filter((s) => daSet.has(s) && !isAllowlisted(s));
  if (identical.length) {
    console.log(`\n[FLAG] Identical on EN and DA (${identical.length}):`);
    identical.forEach((s) => {
      console.log(`  "${s}"`);
      findings.push({ project, type: "identical-en-da", text: s });
    });
  } else {
    console.log("\n[OK] No un-allowlisted strings identical between EN and DA.");
  }

  // Check 2: suspect English words embedded in otherwise-Danish strings.
  const wordHits = [];
  for (const s of daSet) {
    const hits = findSuspectWords(s);
    if (hits.length) wordHits.push({ text: s, words: hits });
  }
  if (wordHits.length) {
    console.log(`\n[FLAG] Suspect English word(s) inside DA-page text (${wordHits.length}):`);
    wordHits.forEach(({ text, words }) => {
      console.log(`  [${words.join(", ")}] in "${text}"`);
      findings.push({ project, type: "suspect-word", text, words });
    });
  } else {
    console.log("[OK] No suspect English words found inside DA-page visible text.");
  }
}

await browser.close();

console.log("\n" + "=".repeat(70));
console.log(`TOTAL FINDINGS: ${findings.length}`);
console.log("=".repeat(70));
if (findings.length) {
  console.log(JSON.stringify(findings, null, 2));
  process.exitCode = 1;
} else {
  console.log("Clean — no findings.");
}
