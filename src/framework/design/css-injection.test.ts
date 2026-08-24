/**
 * Garde-fou post-build : Next ne doit jamais injecter un .css via <script src>.
 * (Régression connue : CSS du design system importé uniquement depuis des "use client"
 *  → balise <script src="…css"> au lieu de <link rel="stylesheet">.)
 *
 * Si `.next` est absent, le test est ignoré (ex. `npm test` avant `npm run build`).
 * Après build : `npm run check:css-injection` ou relancer ce test.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SCRIPT_CSS_RE = /<script\b[^>]*\bsrc=["'][^"']+\.css(?:\?[^"']*)?["'][^>]*>/gi;
const appDir = join(process.cwd(), ".next", "server", "app");
const hasBuild = existsSync(appDir);

function collectHtmlFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) {
    return acc;
  }
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      collectHtmlFiles(full, acc);
    } else if (entry.endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

describe("injection CSS du build Next", () => {
  it.skipIf(!hasBuild)('n\'émet aucun <script src="*.css"> dans le HTML prerendu', () => {
    const htmlFiles = collectHtmlFiles(appDir);
    expect(htmlFiles.length).toBeGreaterThan(0);

    const offenders: string[] = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const matches = html.match(SCRIPT_CSS_RE);
      if (matches?.length) {
        offenders.push(`${file}: ${matches.join(" | ")}`);
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
