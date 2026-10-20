import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  computeReadingTimeFromText,
  extractReadableTextFromModuleSource,
} from "@/site/guides/utils";

/**
 * Temps de lecture d'un article de calculateur à partir des fichiers sources
 * du contenu rédactionnel (même rythme que les guides : ~200 mots/min).
 */
export function computeCalculatorEditorialReadingTime(
  relativePaths: readonly string[],
): number {
  const text = relativePaths
    .map((relativePath) => {
      const source = readFileSync(join(process.cwd(), relativePath), "utf8");
      return extractReadableTextFromModuleSource(source);
    })
    .join(" ");
  return computeReadingTimeFromText(text);
}

/** Date de dernière mise à jour éditoriale des calculateurs (revue du 20 octobre 2026). */
export const CALCULATOR_EDITORIAL_UPDATED_AT = "2026-10-20";
