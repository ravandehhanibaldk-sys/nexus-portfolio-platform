import http from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { extname, join } from "node:path";

const PORT = 4173;
const ROOT = process.cwd();
const PDF_NAME = process.argv[2] || "hanibal-ravandeh-portfolio-draft-02.pdf";
const OUT_SUBDIR = process.argv[3] || "qa-draft02-view";
const PAGES = process.argv[4] ? process.argv[4].split(",").map(Number) : Array.from({ length: 15 }, (_, i) => i + 1);

const MIME = { ".html": "text/html", ".mjs": "text/javascript", ".pdf": "application/pdf" };

const server = http.createServer(async (req, res) => {
  const url = req.url.split("?")[0];
  try {
    let filePath;
    if (url === "/") filePath = join(ROOT, "scripts/qa-pdf-viewer.html");
    else if (url.startsWith("/pdfjs/")) filePath = join(ROOT, "node_modules/pdfjs-dist/build", url.replace("/pdfjs/", ""));
    else if (url === "/file.pdf") filePath = join(ROOT, "pdf-export", PDF_NAME);
    else { res.writeHead(404); res.end(); return; }
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, r));
console.log(`QA server on :${PORT}, serving pdf-export/${PDF_NAME}`);

const outDir = join(ROOT, "pdf-export", OUT_SUBDIR);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1800, height: 1300 } });

for (const p of PAGES) {
  await page.goto(`http://localhost:${PORT}/?page=${p}`, { waitUntil: "load" });
  await page.waitForSelector('body[data-rendered="true"]', { timeout: 15000 });
  const canvas = page.locator("#c");
  await canvas.screenshot({ path: `${outDir}/pdf-page-${String(p).padStart(2, "0")}.png` });
  console.log(`Captured page ${p}`);
}

await browser.close();
server.close();
