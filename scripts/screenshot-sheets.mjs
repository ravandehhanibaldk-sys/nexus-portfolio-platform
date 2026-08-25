import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "pdf-export", "qa-screenshots");
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1.3 });
await page.goto("http://localhost:3001/print/portfolio", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const sheets = page.locator(".sheet");
const count = await sheets.count();
for (let i = 0; i < count; i++) {
  const el = sheets.nth(i);
  const idx = await el.getAttribute("data-sheet-index");
  const path = join(OUT_DIR, `sheet-${String(idx).padStart(2, "0")}.png`);
  await el.screenshot({ path });
  console.log(`Saved ${path}`);
}
await browser.close();
