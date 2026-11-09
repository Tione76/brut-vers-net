import type { OgImageInput } from "@/framework/seo/metadata";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { formatNetShort } from "./data";

export const NET_TO_GROSS_OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const NET_TO_GROSS_OG_CONTENT_TYPE = "image/jpeg";

/** Photo de série sans texte, recadrée pour le partage social. */
export const NET_TO_GROSS_OG_STATIC_PATH =
  "/images/covers/series/correspondance-salaire-brut-en-net-og.jpg";

export function buildNetToGrossOgAlt(netMonthly: number): string {
  return `${formatNetShort(netMonthly)} net par mois : combien en brut ?`;
}

export function buildNetToGrossSeriesOgAlt(): string {
  return NET_TO_GROSS_SERIES_COVER.alt;
}

/** Image sociale unique de la série (fichier statique). */
export function netToGrossOgImagePath(netMonthly?: number): string {
  void netMonthly;
  return NET_TO_GROSS_OG_STATIC_PATH;
}

export function buildNetToGrossOgImageInput(netMonthly: number): OgImageInput {
  return {
    url: netToGrossOgImagePath(),
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: buildNetToGrossOgAlt(netMonthly),
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}

export function buildNetToGrossHubOgImageInput(): OgImageInput {
  return {
    url: NET_TO_GROSS_OG_STATIC_PATH,
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: buildNetToGrossSeriesOgAlt(),
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}

export function buildNetToGrossIndexOgImageInput(): OgImageInput {
  return {
    url: NET_TO_GROSS_OG_STATIC_PATH,
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: buildNetToGrossSeriesOgAlt(),
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}
