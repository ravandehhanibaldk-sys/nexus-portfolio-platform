// Renders every PDF page to a high-resolution PNG for visual QA.
//
// METHODOLOGY DISCLOSURE: this environment has no working PDF-byte
// rasterizer (pdfjs-dist@6 + node-canvas hits an unresolved internal
// compatibility bug in paintInlineImageXObject; downgrading pdfjs-dist —
// a pre-existing shared project dependency — to work around it was judged
// too invasive for an artifact-prep-only task and was reverted). Instead,
// this screenshots each `.sheet` element directly from the exact same
// source route (/print/test-full-landscape-redesign) that
// scripts/export-landscape-redesign-v3.mjs feeds into Playwright's
// page.pdf() to produce the PDF — i.e. the identical rendered DOM/CSS the
// PDF is generated from, at high device-pixel-ratio. This is NOT a
// rasterization of the PDF file's own bytes, so it cannot catch a defect
// introduced specifically by the PDF-generation step itself (font
// embedding, PDF-specific color-profile shifts, structural corruption) —
// those are separately checked via pdf-lib's structural parse (page
// count, page sizes, valid page objects) in the main QA report. For
// layout/content/visual review, this is pixel-equivalent to the PDF.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "qa-independent-final-review", "pdf", "pages");
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3001/print/test-full-landscape-redesign", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const count = await page.locator(".sheet").count();
console.log(`Found ${count} sheets`);

for (let i = 0; i < count; i++) {
  const sheet = page.locator(`.sheet[data-sheet-index="${i}"]`);
  await sheet.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const outPath = path.join(OUT_DIR, `page-${String(i + 1).padStart(2, "0")}.png`);
  await sheet.screenshot({ path: outPath });
  console.log(`Saved page ${i + 1}/${count} -> ${outPath}`);
}

await browser.close();
console.log("Done.");
