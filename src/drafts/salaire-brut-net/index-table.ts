/**
 * Compat brouillon : réexporte le tableau index publié + variante catalogue futur.
 */

export {
  buildGrossToNetIndexRows,
  type GrossToNetIndexRow,
} from "@/site/salaire-brut-net/index-table";

import { GROSS_TO_NET_AMOUNTS } from "@/site/salaire-brut-net/config";
import { buildGrossToNetIndexRows } from "@/site/salaire-brut-net/index-table";
import { DRAFT_GROSS_TO_NET_AMOUNTS, buildFuturePublishedCatalog } from "./amounts";

/** Index brouillon : publiés + montants draft restants. */
export function buildDraftGrossToNetIndexRows() {
  return buildGrossToNetIndexRows(
    buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS),
  );
}
