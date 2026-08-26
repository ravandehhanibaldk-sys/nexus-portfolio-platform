import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "qa-final-review", "website-screenshots");
mkdirSync(OUT_DIR, { recursive: true });

const BASE = "http://localhost:3001";
const PAGES = [
  { name: "01-home", path: "" },
  { name: "02-about", path: "/about" },
  { name: "03-villa-red-sun", path: "/projects/villa-red-sun" },
  { name: "04-villa-efe", path: "/projects/villa-efe" },
];
const LOCALES = ["en", "da"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

for (const locale of LOCALES) {
  for (const p of PAGES) {
    const url = `${BASE}/${locale}${p.path}`;
    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(1000);

    // Trigger lazy-loaded images by scrolling through the full page before
    // capturing, then return to top.
    await page.evaluate(async () => {
      const step = 600;
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);

    const outPath = join(OUT_DIR, `${p.name}-${locale}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Captured ${outPath}`);
  }
}

await browser.close();
console.log(`Done. Output in ${OUT_DIR}`);
