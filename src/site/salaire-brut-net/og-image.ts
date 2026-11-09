import type { OgImageInput } from "@/framework/seo/metadata";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { formatGrossShort } from "./data";

/** Format social Open Graph / Twitter standard. */
export const GROSS_TO_NET_OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const GROSS_TO_NET_OG_CONTENT_TYPE = "image/jpeg";

/** Photo de série sans texte, recadrée pour le partage social. */
export const GROSS_TO_NET_OG_STATIC_PATH =
  "/images/covers/series/Salaire-brut-mensuel-en-net-og.jpg";

export function buildGrossToNetOgAlt(grossMonthly: number): string {
  return `${formatGrossShort(grossMonthly)} brut par mois : combien en net ?`;
}

export function buildGrossToNetSeriesOgAlt(): string {
  return GROSS_TO_NET_SERIES_COVER.alt;
}

/** Image sociale unique de la série (fichier statique). */
export function grossToNetSeriesOgImagePath(): string {
  return GROSS_TO_NET_OG_STATIC_PATH;
}

/** Alias : le montant n’entre pas dans l’URL. */
export function grossToNetOgImagePath(grossMonthly?: number): string {
  void grossMonthly;
  return grossToNetSeriesOgImagePath();
}

/** Entrée metadata (OG + Twitter) : URL de série, alt adapté à la fiche. */
export function buildGrossToNetOgImageInput(grossMonthly: number): OgImageInput {
  return {
    url: grossToNetSeriesOgImagePath(),
    width: GROSS_TO_NET_OG_SIZE.width,
    height: GROSS_TO_NET_OG_SIZE.height,
    alt: buildGrossToNetOgAlt(grossMonthly),
    type: GROSS_TO_NET_OG_CONTENT_TYPE,
  };
}
