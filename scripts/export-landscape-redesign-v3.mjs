import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "pdf-export");
mkdirSync(OUT_DIR, { recursive: true });
const URL = "http://localhost:3001/print/test-full-landscape-redesign";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

console.log(`Navigating to ${URL}`);
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const sheetCount = await page.evaluate(() => document.querySelectorAll(".sheet").length);
console.log(`Found ${sheetCount} sheets`);

const outPath = join(OUT_DIR, "qa-full-landscape-redesign-v3.pdf");
await page.pdf({
  path: outPath,
  width: "297mm",
  height: "210mm",
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});

await browser.close();
console.log(`Done: ${outPath}`);
