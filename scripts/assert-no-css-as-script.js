/**
 * Contrôle post-build autonome (sans Vitest) :
 * échoue si un HTML prerendu contient <script src="…css">.
 */
const { existsSync, readdirSync, readFileSync, statSync } = require("node:fs");
const { join } = require("node:path");

const SCRIPT_CSS_RE = /<script\b[^>]*\bsrc=["'][^"']+\.css(?:\?[^"']*)?["'][^>]*>/gi;

function collectHtmlFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const appDir = join(process.cwd(), ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("Aucun build trouvé (.next/server/app). Lancez `npm run build` d'abord.");
  process.exit(1);
}

const htmlFiles = collectHtmlFiles(appDir);
const offenders = [];
for (const file of htmlFiles) {
  const matches = readFileSync(file, "utf8").match(SCRIPT_CSS_RE);
  if (matches?.length) offenders.push(`${file}\n  ${matches.join("\n  ")}`);
}

if (offenders.length) {
  console.error("CSS chargé via <script> détecté :\n\n" + offenders.join("\n\n"));
  process.exit(1);
}

console.log(`OK : aucun <script src="*.css"> dans ${htmlFiles.length} fichiers HTML.`);
