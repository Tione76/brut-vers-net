/**
 * Utilitaire legacy : conversion d'images déposées dans public/images/og/_incoming/
 * Les illustrations de production vivent désormais dans public/images/covers/.
 *
 * Usage : npm run convert:og-images
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INCOMING = path.join(ROOT, "public", "images", "og", "_incoming");
const OUT_DIR = path.join(ROOT, "public", "images", "og");
const GUIDES_OUT_DIR = path.join(OUT_DIR, "guides");

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

function stem(filename) {
  return filename.replace(IMAGE_EXT, "");
}

async function main() {
  const entries = await readdir(INCOMING);
  const sources = entries.filter((name) => IMAGE_EXT.test(name));

  if (sources.length === 0) {
    console.error(`Aucune image (.jpg, .png) dans : ${INCOMING}`);
    process.exit(1);
  }

  let converted = 0;

  for (const file of sources) {
    const base = stem(file);
    const outputName = `${base}.webp`;
    const useGuidesDir = process.argv.includes("--guides");
    const outputDir = useGuidesDir ? GUIDES_OUT_DIR : OUT_DIR;
    const outputPath = path.join(outputDir, outputName);

    await mkdir(outputDir, { recursive: true });

    await sharp(path.join(INCOMING, file))
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✓ ${file} → ${path.relative(ROOT, outputPath)}`);
    converted++;
  }

  console.log(`\n${converted} image(s) convertie(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
