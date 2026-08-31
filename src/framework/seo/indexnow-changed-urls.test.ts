import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { DRAFT_NET_TO_GROSS_AMOUNTS } from "@/drafts/net-vers-brut-mensuel/amounts";
import {
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_INDEX_PATH,
  NET_TO_GROSS_PATH_PREFIX,
  NET_TO_GROSS_PATH_SUFFIX,
  netToGrossPath,
} from "@/site/salaire-net-brut/config";

import {
  NET_TO_GROSS_HUB_PATH as DETECT_HUB_PATH,
  NET_TO_GROSS_INDEX_PATH as DETECT_INDEX_PATH,
  NET_TO_GROSS_PATH_PREFIX as DETECT_PATH_PREFIX,
  NET_TO_GROSS_PATH_SUFFIX as DETECT_PATH_SUFFIX,
  buildChangedNetToGrossPaths,
  detectChangedNetToGrossPathsFromConfigSources,
  diffAddedAmounts,
  extractPublishedNetToGrossAmountsFromConfigSource,
  netToGrossFichePath,
  shouldSkipBulkCatalogBootstrap,
  tenEuroBatch,
} from "../../../scripts/lib/indexnow-changed-urls.mjs";

const CONFIG_PATH = path.join(process.cwd(), "src/site/salaire-net-brut/config.ts");

function configWithBatches(batches: Array<[number, number]>): string {
  const calls = batches.map(([from, to]) => `  ...tenEuroBatch(${from}, ${to}),`).join("\n");
  return `
const NET_TO_GROSS_PUBLISHED_TEN_EURO_BATCHES: readonly number[] = [
${calls}
];
export const NET_TO_GROSS_AMOUNTS = [...NET_TO_GROSS_PUBLISHED_TEN_EURO_BATCHES];
`;
}

describe("indexnow-changed-urls (streaming Net→Brut)", () => {
  it("reste aligné avec les constantes publiques du catalogue", () => {
    expect(DETECT_HUB_PATH).toBe(NET_TO_GROSS_HUB_PATH);
    expect(DETECT_INDEX_PATH).toBe(NET_TO_GROSS_INDEX_PATH);
    expect(DETECT_PATH_PREFIX).toBe(NET_TO_GROSS_PATH_PREFIX);
    expect(DETECT_PATH_SUFFIX).toBe(NET_TO_GROSS_PATH_SUFFIX);
    expect(netToGrossFichePath(2510)).toBe(netToGrossPath(2510));
  });

  it("extrait le catalogue publié réel depuis config.ts", () => {
    const source = readFileSync(CONFIG_PATH, "utf8");
    const amounts = extractPublishedNetToGrossAmountsFromConfigSource(source);
    expect(amounts.length).toBeGreaterThan(200);
    expect(amounts[0]).toBe(1500);
    expect(amounts[amounts.length - 1]).toBe(6000);
    expect(amounts).toContain(1510);
    expect(amounts).toContain(4490);
    expect(amounts).not.toContain(4510);
  });

  it("ne détecte aucune nouvelle fiche sans publication", () => {
    const source = configWithBatches([
      [1510, 1990],
      [2010, 2490],
    ]);
    const result = detectChangedNetToGrossPathsFromConfigSources(source, source);
    expect(result.addedAmounts).toEqual([]);
    expect(result.paths).toEqual([]);
  });

  it("détecte exactement 45 nouvelles fiches pour une vague 2510→2990 hors centaines", () => {
    const before = configWithBatches([
      [1510, 1990],
      [2010, 2490],
    ]);
    const after = configWithBatches([
      [1510, 1990],
      [2010, 2490],
      [2510, 2990],
    ]);

    const expectedAmounts = tenEuroBatch(2510, 2990);
    expect(expectedAmounts).toHaveLength(45);
    expect(expectedAmounts[0]).toBe(2510);
    expect(expectedAmounts[expectedAmounts.length - 1]).toBe(2990);
    expect(expectedAmounts).not.toContain(2500);
    expect(expectedAmounts).not.toContain(2600);

    const result = detectChangedNetToGrossPathsFromConfigSources(before, after);
    expect(result.addedAmounts).toEqual(expectedAmounts);
    expect(result.addedAmounts).toHaveLength(45);

    const fichePaths = result.paths.filter((pathValue) =>
      pathValue.startsWith(NET_TO_GROSS_PATH_PREFIX),
    );
    expect(fichePaths).toHaveLength(45);
    expect(fichePaths[0]).toBe(`${NET_TO_GROSS_PATH_PREFIX}2510${NET_TO_GROSS_PATH_SUFFIX}`);
    expect(fichePaths[fichePaths.length - 1]).toBe(
      `${NET_TO_GROSS_PATH_PREFIX}2990${NET_TO_GROSS_PATH_SUFFIX}`,
    );
    expect(result.paths).toContain(NET_TO_GROSS_HUB_PATH);
    expect(result.paths).toContain(NET_TO_GROSS_INDEX_PATH);
    expect(result.paths).toHaveLength(47);
  });

  it("n'inclut pas les centaines déjà publiées ni les anciennes fiches", () => {
    const before = configWithBatches([[1510, 1990]]);
    const after = configWithBatches([
      [1510, 1990],
      [2510, 2990],
    ]);
    const result = detectChangedNetToGrossPathsFromConfigSources(before, after);

    expect(result.addedAmounts).not.toContain(1500);
    expect(result.addedAmounts).not.toContain(1510);
    expect(result.addedAmounts).not.toContain(1990);
    expect(result.paths.some((pathValue) => pathValue.includes("-1510-"))).toBe(false);
    expect(result.paths.some((pathValue) => pathValue.includes("-1990-"))).toBe(false);
  });

  it("n'émet jamais de montant encore en draft", () => {
    const before = configWithBatches([[4010, 4490]]);
    const after = configWithBatches([[4010, 4490]]);
    const result = detectChangedNetToGrossPathsFromConfigSources(before, after);

    for (const draftAmount of DRAFT_NET_TO_GROSS_AMOUNTS.slice(0, 20)) {
      expect(result.addedAmounts).not.toContain(draftAmount);
      expect(result.paths.some((pathValue) => pathValue.includes(`-${draftAmount}-`))).toBe(
        false,
      );
    }
  });

  it("déduplique les chemins et ajoute Hub + Index uniquement s'il y a des nouveautés", () => {
    const paths = buildChangedNetToGrossPaths([2510, 2510, 2520]);
    expect(paths).toEqual([
      `${NET_TO_GROSS_PATH_PREFIX}2510${NET_TO_GROSS_PATH_SUFFIX}`,
      `${NET_TO_GROSS_PATH_PREFIX}2520${NET_TO_GROSS_PATH_SUFFIX}`,
      NET_TO_GROSS_HUB_PATH,
      NET_TO_GROSS_INDEX_PATH,
    ]);
    expect(new Set(paths).size).toBe(paths.length);

    expect(buildChangedNetToGrossPaths([])).toEqual([]);
    expect(buildChangedNetToGrossPaths([2510], { includeHubAndIndex: false })).toEqual([
      `${NET_TO_GROSS_PATH_PREFIX}2510${NET_TO_GROSS_PATH_SUFFIX}`,
    ]);
  });

  it("produit des chemins relatifs sans www, sans OG et sans domaine", () => {
    const paths = buildChangedNetToGrossPaths([2510, 2990]);
    for (const pathValue of paths) {
      expect(pathValue.startsWith("/")).toBe(true);
      expect(pathValue.includes("www.")).toBe(false);
      expect(pathValue.includes("opengraph")).toBe(false);
      expect(pathValue.includes("http")).toBe(false);
      expect(pathValue.includes("/api/")).toBe(false);
    }
  });

  it("active le garde-fou de bootstrap massif", () => {
    expect(shouldSkipBulkCatalogBootstrap(0, 316)).toBe(true);
    expect(shouldSkipBulkCatalogBootstrap(0, 45)).toBe(false);
    expect(shouldSkipBulkCatalogBootstrap(271, 45)).toBe(false);
  });

  it("diffAddedAmounts ignore les montants déjà présents", () => {
    expect(diffAddedAmounts([1500, 1510], [1500, 1510, 1520, 1530])).toEqual([1520, 1530]);
  });
});
