// Localization audit: compares EN vs DA rendered text for each of the 4
// pages (Home, About, Villa Red Sun, Villa Efe), full text nodes (not just
// SVG diagrams this time — that system is gone). Flags any visible text
// block identical on both locale pages, minus an allowlist of legitimately
// shared content (proper nouns, software names, numbers/units, compass
// notation). Also does a word-level scan for a curated list of English
// function/UI words inside the DA page specifically, to catch a partially-
// translated sentence with one leftover English word.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3001";
const PAGES = [
  { name: "home", en: "/en", da: "/da" },
  { name: "about", en: "/en/about", da: "/da/about" },
  { name: "villa-red-sun", en: "/en/projects/villa-red-sun", da: "/da/projects/villa-red-sun" },
  { name: "villa-efe", en: "/en/projects/villa-efe", da: "/da/projects/villa-efe" },
];

const ALLOWLIST = new Set([
  "HANIBAL RAVANDEH", "VILLA RED SUN", "VILLA EFE",
  "3DS MAX", "V-RAY", "CORONA RENDERER", "AUTOCAD", "REVIT", "UNREAL ENGINE 5", "UNREAL ENGINE",
  "SOLRØD / DENMARK", "GIRNE / KYRENIA", "A / 03", "B / 03",
  "N", "E", "S", "W", "MODEL", "M/S", "MM", "%", "KL.",
  "JAN", "FEB", "MAR", "APR", "JUN", "JUL", "AUG", "SEP", "NOV", "DEC",
  "B-2", "C-1", "D",
  "RAVANDEH.HANIBAL.DK@GMAIL.COM", "LINKEDIN.COM/IN/HANIBAL-RAVANDEH",
  "+45 52 70 95 99", "RØDOVRE, DENMARK",
  // Danish/English cognates — identical spelling in both languages, not leaks.
  "ITERATION",
]);

function isAllowlisted(s) {
  const up = s.trim().toUpperCase();
  if (!up) return true;
  if (ALLOWLIST.has(up)) return true;
  if (/^[\d\s.,:%°\-–—·\/]+$/.test(up)) return true; // pure numeric/symbol
  if (/^[\d.]+\s*(H|M\/S|MM|KM|%|°|°C)$/i.test(up)) return true;
  // Compass notation values, including dual-segment ("W / SW -> E / NE")
  // — real content data (content/projects/*.ts's wind.directionLabel),
  // not dictionary-driven UI text. Danish compass letters differ
  // (N/S/O/V, not N/S/E/W), so this is a content-data decision out of
  // scope for translation — documented in a prior review round.
  if (/^[NSEW]{1,3}(\s*\/\s*[NSEW]{1,3})?(\s*(→|->)\s*[NSEW]{1,3}(\s*\/\s*[NSEW]{1,3})?)?$/.test(up)) return true;
  if (up.length <= 2) return true; // single letters/short symbols
  return false;
}

// Curated, corpus-specific words — not a generic English dictionary
// (avoids false-positiving on real Danish/English cognates). "for",
// "have", "diagram", and "plan" were dropped after the first run: all
// four are also standalone, correctly-spelled Danish words (for/have as
// prepositions/verbs, "diagram"/"plan" as identical-spelling loanwords),
// and were flagging genuine Danish sentences as false positives.
const SUSPECT_WORDS = [
  "the", "and", "with", "from", "this", "that", "which", "were",
  "has", "was", "are", "not", "but", "its", "their",
  "hover", "legend", "select", "selected", "default", "environmental",
  "diagrams", "instrument", "waterfront", "access", "road",
  "building", "buildings", "adjacent", "coast", "project", "site",
  "condition", "state", "season", "climate", "wind", "solar", "path",
  "reading", "flow", "exposure", "disclosure", "sunrise", "sunset",
  "daylight", "altitude", "month", "placeholder", "lorem", "debug", "todo",
  "fixme", "sample",
];

function findSuspectWords(daString) {
  const tokens = daString.toLowerCase().match(/[a-zæøå]+/g) ?? [];
  const hits = new Set();
  for (const t of tokens) {
    if (SUSPECT_WORDS.includes(t)) hits.add(t);
  }
  return [...hits];
}

async function extractTextBlocks(page) {
  return page.evaluate(() => {
    // Collect leaf-ish text-bearing elements' own direct text (not nested
    // duplicated by parents), trimmed, non-empty. Explicitly excludes
    // <style>/<script> descendant text nodes (their text content is CSS/
    // JS source, never rendered or read by assistive tech — an earlier
    // version of this script didn't exclude them and picked up raw CSS
    // from an inline-injected SVG's own <style> block as a false
    // "identical text" finding).
    const out = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.trim();
      if (!t) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest("style, script")) continue;
      const style = getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden") continue;
      out.add(t);
    }
    // SVG accessible-name content (<title>/<desc>) is real text exposed to
    // assistive tech (via aria-labelledby) but isn't walked by SHOW_TEXT
    // the same way — collect it explicitly so it's covered by this audit.
    document.querySelectorAll("svg title, svg desc").forEach((el) => {
      const t = el.textContent.trim();
      if (t) out.add(t);
    });
    return [...out];
  });
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
const page = await context.newPage();

const findings = [];
const summary = [];

for (const p of PAGES) {
  console.log(`\n--- ${p.name} ---`);
  await page.goto(BASE + p.en, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(1000);
  const enBlocks = await extractTextBlocks(page);

  await page.goto(BASE + p.da, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(1000);
  const daBlocks = await extractTextBlocks(page);

  const enSet = new Set(enBlocks);
  const daSet = new Set(daBlocks);

  const identical = [...enSet].filter((s) => daSet.has(s) && !isAllowlisted(s));
  const wordHits = [];
  for (const s of daSet) {
    const hits = findSuspectWords(s);
    if (hits.length) wordHits.push({ text: s, words: hits });
  }

  console.log(`EN blocks: ${enSet.size}, DA blocks: ${daSet.size}`);
  console.log(`Identical (non-allowlisted): ${identical.length}`);
  identical.forEach((s) => console.log(`  IDENTICAL: "${s}"`));
  console.log(`Suspect-word hits: ${wordHits.length}`);
  wordHits.forEach(({ text, words }) => console.log(`  [${words.join(",")}] "${text}"`));

  identical.forEach((s) => findings.push({ page: p.name, type: "identical-en-da", text: s }));
  wordHits.forEach(({ text, words }) => findings.push({ page: p.name, type: "suspect-word", text, words }));

  summary.push({ page: p.name, enBlocks: enSet.size, daBlocks: daSet.size, identicalCount: identical.length, suspectWordCount: wordHits.length });
}

await browser.close();

const report = { summary, findings };
writeFileSync(
  path.join(process.cwd(), "qa-independent-final-review", "reports", "_localization-audit-raw.json"),
  JSON.stringify(report, null, 1)
);
console.log(`\nTOTAL FINDINGS: ${findings.length}`);
console.log("Saved to reports/_localization-audit-raw.json");
