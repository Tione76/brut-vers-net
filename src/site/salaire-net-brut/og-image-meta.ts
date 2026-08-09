import type { OgImageInput } from "@/framework/seo/metadata";
import {
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_INDEX_PATH,
  NET_TO_GROSS_INTERNAL_BASE_PATH,
} from "./config";
import { formatNetShort } from "./data";

export const NET_TO_GROSS_OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const NET_TO_GROSS_OG_CONTENT_TYPE = "image/png";

/** Ex. « 1 500 € NET / MOIS » */
export function formatNetToGrossOgHeadline(netMonthly: number): string {
  return `${formatNetShort(netMonthly)} NET / MOIS`;
}

export function buildNetToGrossOgAlt(netMonthly: number): string {
  return `${formatNetShort(netMonthly)} net par mois : combien en brut ?`;
}

export function netToGrossOgImagePath(netMonthly: number): string {
  return `${NET_TO_GROSS_INTERNAL_BASE_PATH}/${netMonthly}/opengraph-image`;
}

export function buildNetToGrossOgImageInput(netMonthly: number): OgImageInput {
  return {
    url: netToGrossOgImagePath(netMonthly),
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: buildNetToGrossOgAlt(netMonthly),
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}

export function netToGrossHubOgImagePath(): string {
  return `${NET_TO_GROSS_HUB_PATH}/opengraph-image`;
}

export function netToGrossIndexOgImagePath(): string {
  return `${NET_TO_GROSS_INDEX_PATH}/opengraph-image`;
}

export function buildNetToGrossHubOgImageInput(): OgImageInput {
  return {
    url: netToGrossHubOgImagePath(),
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: "Salaires nets mensuels convertis en brut",
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}

export function buildNetToGrossIndexOgImageInput(): OgImageInput {
  return {
    url: netToGrossIndexOgImagePath(),
    width: NET_TO_GROSS_OG_SIZE.width,
    height: NET_TO_GROSS_OG_SIZE.height,
    alt: "Tableau de conversion salaire net mensuel en brut",
    type: NET_TO_GROSS_OG_CONTENT_TYPE,
  };
}
