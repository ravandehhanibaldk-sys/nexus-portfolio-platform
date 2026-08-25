import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.goto("http://localhost:3001/print/portfolio", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const MM_PER_PX = 25.4 / 96;

const result = await page.evaluate((mmPerPx) => {
  const out = {};
  const sheets = Array.from(document.querySelectorAll(".sheet"));

  function imgsInSheet(idx) {
    const sheet = sheets.find((s) => s.getAttribute("data-sheet-index") === String(idx));
    if (!sheet) return null;
    const imgs = Array.from(sheet.querySelectorAll("img"));
    return imgs.map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.src.split("/").pop(),
        wPx: Math.round(r.width),
        hPx: Math.round(r.height),
        wMm: +(r.width * mmPerPx).toFixed(1),
        hMm: +(r.height * mmPerPx).toFixed(1),
        areaMm2: +(r.width * mmPerPx * r.height * mmPerPx).toFixed(0),
      };
    });
  }

  // pages 5 (idx4), 6 (idx5), 12 (idx11), 13 (idx12) — consolidation candidates
  for (const idx of [4, 5, 11, 12]) {
    out[`sheet_${idx}`] = imgsInSheet(idx);
  }

  // environmental diagram sub-cards on sheet 6 (page 7)
  const envSheet = sheets.find((s) => s.getAttribute("data-sheet-index") === "6");
  if (envSheet) {
    const cards = Array.from(envSheet.querySelectorAll(".sheet-pad > div > div"));
    out.env_cards = cards.map((c) => {
      const svg = c.querySelector("svg");
      const r = c.getBoundingClientRect();
      const svgR = svg ? svg.getBoundingClientRect() : null;
      const viewBox = svg ? svg.getAttribute("viewBox") : null;
      return {
        cardWmm: +(r.width * mmPerPx).toFixed(1),
        cardHmm: +(r.height * mmPerPx).toFixed(1),
        svgRenderedWmm: svgR ? +(svgR.width * mmPerPx).toFixed(1) : null,
        svgRenderedHmm: svgR ? +(svgR.height * mmPerPx).toFixed(1) : null,
        svgViewBox: viewBox,
      };
    });
  }

  return out;
}, MM_PER_PX);

console.log(JSON.stringify(result, null, 2));
await browser.close();
