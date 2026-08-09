/**
 * Hub brouillon (compat) : délègue au hub publié, catalogue futur pour les tests restants.
 */

import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_HUB_PATH,
  grossToNetPath,
} from "@/site/salaire-brut-net/config";
import {
  buildGrossToNetHubEditorial,
  buildGrossToNetHubFaq,
  buildGrossToNetHubPayload,
  buildGrossToNetHubRanges,
  buildGrossToNetHubSeo,
} from "@/site/salaire-brut-net/hub";
import { formatGrossShort } from "@/site/salaire-brut-net/data";
import { DRAFT_GROSS_TO_NET_AMOUNTS, buildFuturePublishedCatalog } from "./amounts";

/** @deprecated Utiliser GROSS_TO_NET_HUB_PATH (publié). */
export const DRAFT_GROSS_TO_NET_HUB_PATH = GROSS_TO_NET_HUB_PATH;

export const DRAFT_GROSS_TO_NET_HUB_STATUS = "draft" as const;

export {
  buildGrossToNetHubEditorial as buildDraftGrossToNetHubEditorial,
  buildGrossToNetHubFaq as buildDraftGrossToNetHubFaq,
  buildGrossToNetHubSeo as buildDraftGrossToNetHubSeo,
};

/**
 * Prépare le hub (SEO, catalogue futur, FAQ, JSON-LD).
 * Après vague 1 : le rendu public utilise le catalogue publié ; ici on conserve
 * le catalogue futur pour la préparation des brouillons restants.
 */
export function prepareDraftGrossToNetHub() {
  const published = buildGrossToNetHubPayload();
  const catalog = buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS);
  const ranges = buildGrossToNetHubRanges(catalog);
  const ficheLinks = catalog.map((amount) => ({
    amount,
    href: grossToNetPath(amount),
    label: `${formatGrossShort(amount)} brut en net`,
  }));

  return {
    ...published,
    status: DRAFT_GROSS_TO_NET_HUB_STATUS,
    catalog: {
      ...published.catalog,
      ranges,
    },
    ficheLinks,
    catalogCount: catalog.length,
    draftCount: DRAFT_GROSS_TO_NET_AMOUNTS.length,
  };
}

export type PreparedDraftGrossToNetHub = ReturnType<typeof prepareDraftGrossToNetHub>;
