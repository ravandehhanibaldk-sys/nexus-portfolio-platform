import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.goto("http://localhost:3001/print/portfolio", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.emulateMedia({ media: "print" });
await page.waitForTimeout(300);

const result = await page.evaluate(() => {
  return Array.from(document.querySelectorAll(".sheet")).map((s) => {
    const pad = s.querySelector(".sheet-pad") || s;
    const h = s.getBoundingClientRect().height;
    return {
      idx: s.getAttribute("data-sheet-index"),
      orientation: s.getAttribute("data-orientation"),
      sheetH: Math.round(h),
      scrollH: pad.scrollHeight,
      overBy: pad.scrollHeight - h,
    };
  });
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
