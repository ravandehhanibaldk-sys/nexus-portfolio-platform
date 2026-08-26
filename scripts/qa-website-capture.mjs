// Comprehensive website screenshot + QA capture for the independent final
// review package. Captures 16 screenshots (8 routes x desktop/mobile) and
// records, per page: HTTP status, title, console errors, failed network
// requests, broken images, horizontal/vertical overflow, and full visible
// text (for the localization audit).
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3001";
const OUT_ROOT = path.join(process.cwd(), "qa-independent-final-review", "website");
mkdirSync(path.join(OUT_ROOT, "desktop"), { recursive: true });
mkdirSync(path.join(OUT_ROOT, "mobile"), { recursive: true });

const ROUTES = [
  { name: "01-home-en", path: "/en" },
  { name: "01-home-da", path: "/da" },
  { name: "02-about-en", path: "/en/about" },
  { name: "02-about-da", path: "/da/about" },
  { name: "03-villa-red-sun-en", path: "/en/projects/villa-red-sun" },
  { name: "03-villa-red-sun-da", path: "/da/projects/villa-red-sun" },
  { name: "04-villa-efe-en", path: "/en/projects/villa-efe" },
  { name: "04-villa-efe-da", path: "/da/projects/villa-efe" },
];

const VIEWPORTS = [
  { key: "desktop", width: 1440, height: 1200 },
  { key: "mobile", width: 375, height: 812 },
];

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    const step = 500;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
}

const browser = await chromium.launch();
const results = [];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    const consoleMessages = [];
    const failedRequests = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleMessages.push({ type: msg.type(), text: msg.text().slice(0, 500) });
      }
    });
    page.on("pageerror", (err) => {
      pageErrors.push(String(err).slice(0, 500));
    });
    page.on("requestfailed", (req) => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText ?? "unknown" });
    });

    const url = BASE + route.path;
    let httpStatus = null;
    let title = null;
    let navError = null;
    try {
      const resp = await page.goto(url, { waitUntil: "load", timeout: 45000 });
      httpStatus = resp ? resp.status() : null;
      title = await page.title();
    } catch (e) {
      navError = String(e.message ?? e).slice(0, 500);
    }

    await page.waitForTimeout(800);
    await scrollFullPage(page);
    await page.waitForTimeout(800);

    // Broken-image + overflow + text-content checks, in-page.
    const pageChecks = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      const brokenImages = imgs
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.src);
      const notYetLoaded = imgs
        .filter((img) => !img.complete)
        .map((img) => img.src);
      const docEl = document.documentElement;
      const horizontalOverflow = docEl.scrollWidth > docEl.clientWidth + 2;
      const overflowAmountPx = docEl.scrollWidth - docEl.clientWidth;
      return {
        totalImages: imgs.length,
        brokenImages,
        notYetLoadedCount: notYetLoaded.length,
        horizontalOverflow,
        overflowAmountPx,
        bodyInnerText: document.body.innerText,
        htmlLang: document.documentElement.lang,
      };
    });

    const outPath = path.join(OUT_ROOT, vp.key, `${route.name}-${vp.key}.png`);
    let screenshotError = null;
    try {
      await page.screenshot({ path: outPath, fullPage: true });
    } catch (e) {
      screenshotError = String(e.message ?? e).slice(0, 500);
    }

    results.push({
      route: route.path,
      name: route.name,
      viewport: vp.key,
      viewportSize: `${vp.width}x${vp.height}`,
      httpStatus,
      title,
      navError,
      screenshotPath: outPath,
      screenshotError,
      consoleMessages,
      pageErrors,
      failedRequests,
      ...pageChecks,
    });

    console.log(`[${vp.key}] ${route.path} -> status=${httpStatus} title="${title}" console=${consoleMessages.length} pageErrors=${pageErrors.length} failedReq=${failedRequests.length} brokenImg=${pageChecks.brokenImages.length} hOverflow=${pageChecks.horizontalOverflow}`);

    await context.close();
  }
}

await browser.close();

writeFileSync(
  path.join(process.cwd(), "qa-independent-final-review", "reports", "_website-capture-raw.json"),
  JSON.stringify(results, null, 1)
);
console.log("\nDone. Raw data saved to reports/_website-capture-raw.json");
