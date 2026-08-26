// Downsamples/re-encodes project PNGs into JPEGs for the PDF print route
// only (public/images-print/) — the original public/images/ source PNGs
// used by the live site are never touched. Source renders are 1920x1080
// PNGs (often 3-5MB each); nothing in the print layout displays an image
// wider than ~178mm (~2100px at 300dpi), so full-resolution lossless PNGs
// bloat the exported PDF (first attempt: 136MB for 15 pages) for no
// visible quality gain. 1600px-wide / quality-82 JPEGs are still sharp at
// any size used in the document and cut the PDF to a shareable size.
import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_DIRS = ["villa-red-sun", "villa-efe"];

// Item 4 (2nd external-review round) — PDF page 12 (Design Development)
// wraps this one image in a white card because its own background is a
// pure white composite/illustration plate, not a photograph — sitting
// directly on the sheet's cream page background left a visible
// mismatched edge. The white card technically fixed the color mismatch,
// but is itself now visibly a box/frame around the image — exactly what
// was originally objected to. Since the background is a uniform, near-
// pure-white illustration backdrop (not photographic content that
// happens to be light), it can be safely recolored to the page's exact
// cream (#faf9f6 / --color-paper) without touching any real artwork —
// verified visually against a full-resolution preview, zero content loss
// (see git history for this file). Only listed here, not applied
// globally: every other project image is a photograph, where this kind
// of background swap would be wrong (and, per CLAUDE.md rule 4, would
// risk altering real content).
const CREAM = [250, 249, 246]; // #faf9f6, matches app/globals.css's --color-paper exactly
const BACKGROUND_RECOLOR_FILES = new Set(["villa-efe-architectural-design-evolution_result.png"]);
const RECOLOR_THRESHOLD = 248; // pixel counts as "background" only if R,G,B are ALL >= this

async function recolorNearWhiteBackground(srcPath) {
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] >= RECOLOR_THRESHOLD && data[i + 1] >= RECOLOR_THRESHOLD && data[i + 2] >= RECOLOR_THRESHOLD) {
      data[i] = CREAM[0];
      data[i + 1] = CREAM[1];
      data[i + 2] = CREAM[2];
    }
  }
  return sharp(data, { raw: { width, height, channels } });
}

async function run() {
  for (const project of SRC_DIRS) {
    const srcDir = join(ROOT, "public", "images", project);
    const outDir = join(ROOT, "public", "images-print", project);
    mkdirSync(outDir, { recursive: true });

    const files = readdirSync(srcDir).filter((f) => extname(f).toLowerCase() === ".png");
    console.log(`${project}: ${files.length} PNGs`);
    for (const file of files) {
      const srcPath = join(srcDir, file);
      const outPath = join(outDir, basename(file, extname(file)) + ".jpg");
      const before = statSync(srcPath).size;
      const pipeline = BACKGROUND_RECOLOR_FILES.has(file) ? await recolorNearWhiteBackground(srcPath) : sharp(srcPath);
      await pipeline.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(outPath);
      const after = statSync(outPath).size;
      const tag = BACKGROUND_RECOLOR_FILES.has(file) ? " [background recolored to cream]" : "";
      console.log(`  ${file}: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(2)}MB${tag}`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
