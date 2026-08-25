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
      await sharp(srcPath).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(outPath);
      const after = statSync(outPath).size;
      console.log(`  ${file}: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(2)}MB`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
