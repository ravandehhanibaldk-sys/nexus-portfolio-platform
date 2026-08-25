// PRODUCTION PDF export — landscape portfolio (replaces Draft 02, see
// ARCHITECTURE_DECISIONS.md ADR-009 for the decision record).
//
// Unlike scripts/export-landscape-redesign-v3.mjs (a test-only capture
// script), this does NOT pass `width`/`height` to page.pdf(). Those two
// values happened to equal the page's own `@page { size: 297mm 210mm }`
// rule (app/print/print-landscape-redesign.css) — the test script never
// actually relied on that CSS, it silently duplicated it in JS. If the
// two ever drifted (a page-size change made in one place and not the
// other), the export would keep "working" on the old, wrong dimensions
// with no error.
//
// This script instead sets `preferCSSPageSize: true`, so Chromium reads
// the page size from the document's own @page rule — the CSS is the
// single source of truth, and a real production export actually
// exercises it instead of coincidentally matching it.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "pdf-export");
mkdirSync(OUT_DIR, { recursive: true });
const URL = process.env.PRINT_URL ?? "http://localhost:3001/print/test-full-landscape-redesign";
const OUT_NAME = process.env.OUT_NAME ?? "hanibal-ravandeh-portfolio-landscape.pdf";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

console.log(`Navigating to ${URL}`);
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const sheetCount = await page.evaluate(() => document.querySelectorAll(".sheet").length);
console.log(`Found ${sheetCount} sheets`);

const outPath = join(OUT_DIR, OUT_NAME);
await page.pdf({
  path: outPath,
  preferCSSPageSize: true,
  printBackground: true,
});

await browser.close();
console.log(`Done: ${outPath}`);
