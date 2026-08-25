// First-draft PDF export — TASK: Build First Professional Portfolio PDF Draft.
//
// /print/portfolio renders every page as a fixed-size A4 "sheet"
// (components/print/sheet.tsx), each tagged data-sheet-index (final
// document order) and data-orientation (portrait|landscape). Chromium's
// headless page.pdf() only produces one orientation per call, so mixed
// portrait/landscape in a single PDF isn't directly supported — this
// script captures two passes (all portrait sheets, then all landscape
// sheets, each pass hiding the other orientation via injected CSS so
// pagination isn't affected by the hidden sheets), then interleaves the
// resulting pages back into true document order with pdf-lib.
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "pdf-export");
const URL = process.env.PRINT_URL ?? "http://localhost:3001/print/portfolio";

mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  console.log(`Navigating to ${URL}`);
  await page.goto(URL, { waitUntil: "networkidle" });
  // Let async SVG fetch+wiring (useInlineSvgLoader) and Framer Motion's
  // mount transition settle before capturing.
  await page.waitForTimeout(2000);

  const sheets = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".sheet")).map((el) => ({
      index: Number(el.getAttribute("data-sheet-index")),
      orientation: el.getAttribute("data-orientation"),
    }));
  });
  sheets.sort((a, b) => a.index - b.index);
  console.log(`Found ${sheets.length} sheets:`, sheets.map((s) => `${s.index}:${s.orientation[0]}`).join(" "));

  const passFiles = {};
  for (const orientation of ["portrait", "landscape"]) {
    const styleTag = await page.addStyleTag({
      content: `.sheet[data-orientation="${orientation === "portrait" ? "landscape" : "portrait"}"] { display: none !important; }`,
    });
    const outPath = join(OUT_DIR, `_pass-${orientation}.pdf`);
    await page.pdf({
      path: outPath,
      format: "A4",
      landscape: orientation === "landscape",
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    passFiles[orientation] = outPath;
    await page.evaluate((tag) => tag.remove(), await styleTag);
  }

  await browser.close();

  // Merge: walk sheets in final document order, pulling the next page
  // from whichever pass PDF matches that sheet's orientation.
  const portraitBytes = readFileSync(passFiles.portrait);
  const landscapeBytes = readFileSync(passFiles.landscape);
  const portraitDoc = await PDFDocument.load(portraitBytes);
  const landscapeDoc = await PDFDocument.load(landscapeBytes);

  const expectedPortrait = sheets.filter((s) => s.orientation === "portrait").length;
  const expectedLandscape = sheets.filter((s) => s.orientation === "landscape").length;
  console.log(`Portrait pass: ${portraitDoc.getPageCount()} pages (expected ${expectedPortrait})`);
  console.log(`Landscape pass: ${landscapeDoc.getPageCount()} pages (expected ${expectedLandscape})`);
  if (portraitDoc.getPageCount() !== expectedPortrait || landscapeDoc.getPageCount() !== expectedLandscape) {
    console.warn(
      "WARNING: page count mismatch — a sheet likely overflowed to a second physical page. " +
      "Merge order below assumes 1 sheet = 1 page and WILL be wrong until this is fixed."
    );
  }

  const finalDoc = await PDFDocument.create();
  let pIdx = 0;
  let lIdx = 0;
  for (const sheet of sheets) {
    if (sheet.orientation === "portrait") {
      const [copied] = await finalDoc.copyPages(portraitDoc, [pIdx]);
      finalDoc.addPage(copied);
      pIdx++;
    } else {
      const [copied] = await finalDoc.copyPages(landscapeDoc, [lIdx]);
      finalDoc.addPage(copied);
      lIdx++;
    }
  }

  const finalPath = join(OUT_DIR, "hanibal-ravandeh-portfolio-draft-01.pdf");
  writeFileSync(finalPath, await finalDoc.save());
  rmSync(passFiles.portrait);
  rmSync(passFiles.landscape);

  console.log(`\nDone: ${finalPath}`);
  console.log(`Final page count: ${finalDoc.getPageCount()}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
