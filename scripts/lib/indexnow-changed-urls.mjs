/**
 * Détection déterministe des URL IndexNow à soumettre après publication
 * de fiches Net → Brut (diff de catalogue, sans sitemap complet).
 *
 * Les constantes de chemins doivent rester alignées avec
 * `src/site/salaire-net-brut/config.ts` (vérifié par les tests).
 */

/** Préfixe URL publique des fiches Net → Brut. */
export const NET_TO_GROSS_PATH_PREFIX = "/combien-gagner-brut-mensuel-pour-";
export const NET_TO_GROSS_PATH_SUFFIX = "-net";
export const NET_TO_GROSS_HUB_PATH = "/salaire-net-mensuel-en-brut";
export const NET_TO_GROSS_INDEX_PATH = "/tableau-salaire-net-mensuel-en-brut";

/** Fichier catalogue publié (source de vérité du diff). */
export const NET_TO_GROSS_CONFIG_RELATIVE_PATH = "src/site/salaire-net-brut/config.ts";

/**
 * Reconstruit un lot d'intermédiaires (pas de 10 €, hors centaines),
 * identique à `tenEuroBatch` dans config.ts.
 */
export function tenEuroBatch(from, to) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from > to || from % 10 !== 0 || to % 10 !== 0) {
    throw new Error(`tenEuroBatch invalide : (${from}, ${to}).`);
  }
  return Array.from({ length: (to - from) / 10 + 1 }, (_, index) => from + index * 10).filter(
    (amount) => amount % 100 !== 0,
  );
}

/** Centaines 1 500 → 6 000 (toujours publiées). */
export function buildNetToGrossHundreds() {
  return Array.from({ length: 46 }, (_, index) => 1500 + index * 100);
}

/**
 * Extrait les montants publiés depuis le source de `config.ts`.
 * S'appuie sur les appels `tenEuroBatch(from, to)` + les centaines.
 */
export function extractPublishedNetToGrossAmountsFromConfigSource(source) {
  if (typeof source !== "string" || source.trim() === "") {
    return [];
  }

  const amounts = new Set(buildNetToGrossHundreds());
  const batchPattern = /tenEuroBatch\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  let match = batchPattern.exec(source);
  while (match) {
    const from = Number(match[1]);
    const to = Number(match[2]);
    for (const amount of tenEuroBatch(from, to)) {
      amounts.add(amount);
    }
    match = batchPattern.exec(source);
  }

  return [...amounts].sort((a, b) => a - b);
}

/** Montants présents dans `after` mais absents de `before`. */
export function diffAddedAmounts(beforeAmounts, afterAmounts) {
  const before = new Set(beforeAmounts);
  const added = [];
  for (const amount of afterAmounts) {
    if (!before.has(amount)) {
      added.push(amount);
    }
  }
  return added;
}

export function netToGrossFichePath(amount) {
  return `${NET_TO_GROSS_PATH_PREFIX}${amount}${NET_TO_GROSS_PATH_SUFFIX}`;
}

/**
 * Construit les chemins publics à notifier pour une vague Net → Brut.
 * N'inclut jamais de drafts (seuls les montants `added` fournis comptent).
 */
export function buildChangedNetToGrossPaths(addedAmounts, options = {}) {
  const includeHubAndIndex = options.includeHubAndIndex !== false;
  const uniqueAmounts = [...new Set(addedAmounts)].filter((amount) => Number.isInteger(amount)).sort(
    (a, b) => a - b,
  );

  const paths = uniqueAmounts.map((amount) => netToGrossFichePath(amount));

  if (includeHubAndIndex && uniqueAmounts.length > 0) {
    paths.push(NET_TO_GROSS_HUB_PATH, NET_TO_GROSS_INDEX_PATH);
  }

  return [...new Set(paths)];
}

/**
 * À partir de deux sources `config.ts`, calcule les chemins IndexNow.
 */
export function detectChangedNetToGrossPathsFromConfigSources(beforeSource, afterSource, options = {}) {
  const beforeAmounts = extractPublishedNetToGrossAmountsFromConfigSource(beforeSource);
  const afterAmounts = extractPublishedNetToGrossAmountsFromConfigSource(afterSource);
  const addedAmounts = diffAddedAmounts(beforeAmounts, afterAmounts);

  return {
    beforeCount: beforeAmounts.length,
    afterCount: afterAmounts.length,
    addedAmounts,
    paths: buildChangedNetToGrossPaths(addedAmounts, options),
  };
}

/**
 * Garde-fou : si le catalogue "avant" est vide et que "après" est un gros
 * catalogue, on évite de soumettre des centaines d'URL par erreur
 * (checkout sans parent, premier clone, etc.).
 */
export function shouldSkipBulkCatalogBootstrap(beforeCount, addedCount, threshold = 60) {
  return beforeCount === 0 && addedCount >= threshold;
}
