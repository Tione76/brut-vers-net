/**
 * Page index brouillon (compat) : délègue à la page index publiée + catalogue futur.
 */

import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_INDEX_PATH,
} from "@/site/salaire-brut-net/config";
import { buildGrossToNetIndexRows } from "@/site/salaire-brut-net/index-table";
import {
  buildGrossToNetIndexPayload,
  buildGrossToNetIndexSeo,
} from "@/site/salaire-brut-net/series-index";
import { DRAFT_GROSS_TO_NET_AMOUNTS, buildFuturePublishedCatalog } from "./amounts";

/** @deprecated Utiliser GROSS_TO_NET_INDEX_PATH (publié). */
export const DRAFT_GROSS_TO_NET_INDEX_PATH = GROSS_TO_NET_INDEX_PATH;

export const DRAFT_GROSS_TO_NET_INDEX_STATUS = "draft" as const;

export { buildGrossToNetIndexSeo as buildDraftGrossToNetIndexSeo };

export function prepareDraftGrossToNetIndexPage() {
  const published = buildGrossToNetIndexPayload();
  const catalog = buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS);
  const rows = buildGrossToNetIndexRows(catalog);

  return {
    ...published,
    status: DRAFT_GROSS_TO_NET_INDEX_STATUS,
    table: {
      ...published.table,
      rows,
    },
    rowCount: rows.length,
  };
}

export type PreparedDraftGrossToNetIndexPage = ReturnType<
  typeof prepareDraftGrossToNetIndexPage
>;
