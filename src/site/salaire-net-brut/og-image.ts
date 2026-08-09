import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/site/site.config";
import {
  getGrossToNetOgFonts,
  type GrossToNetOgRenderModel,
} from "@/site/salaire-brut-net/og-image";
import {
  formatNetToGrossOgHeadline,
  NET_TO_GROSS_OG_SIZE,
} from "./og-image-meta";

export type NetToGrossOgRenderModel = GrossToNetOgRenderModel;

export {
  buildNetToGrossHubOgImageInput,
  buildNetToGrossIndexOgImageInput,
  buildNetToGrossOgAlt,
  buildNetToGrossOgImageInput,
  formatNetToGrossOgHeadline,
  netToGrossHubOgImagePath,
  netToGrossIndexOgImagePath,
  netToGrossOgImagePath,
  NET_TO_GROSS_OG_CONTENT_TYPE,
  NET_TO_GROSS_OG_SIZE,
} from "./og-image-meta";

export { getGrossToNetOgFonts as getNetToGrossOgFonts };

const SERIES_COVER_PUBLIC_PATH =
  "images/covers/series/correspondance-salaire-brut-en-net.webp";

const BRAND_ORANGE = siteConfig.colors.primary;

let cachedBackgroundDataUrl: string | null = null;

export async function getNetToGrossOgBackgroundDataUrl(): Promise<string> {
  if (cachedBackgroundDataUrl) {
    return cachedBackgroundDataUrl;
  }

  const sourcePath = join(process.cwd(), "public", SERIES_COVER_PUBLIC_PATH);
  const webp = await readFile(sourcePath);
  const sharp = (await import("sharp")).default;
  const png = await sharp(webp)
    .resize(NET_TO_GROSS_OG_SIZE.width, NET_TO_GROSS_OG_SIZE.height, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();

  cachedBackgroundDataUrl = `data:image/png;base64,${png.toString("base64")}`;
  return cachedBackgroundDataUrl;
}

export async function buildNetToGrossOgRenderModel(
  netMonthly: number,
): Promise<NetToGrossOgRenderModel> {
  const backgroundDataUrl = await getNetToGrossOgBackgroundDataUrl();
  return {
    headline: formatNetToGrossOgHeadline(netMonthly),
    question: "Combien en brut ?",
    brand: siteConfig.domain,
    credit: "Photo Mikhail Nilov / Pexels",
    backgroundDataUrl,
    orange: BRAND_ORANGE,
  };
}

export async function buildNetToGrossStaticOgRenderModel(input: {
  headline: string;
  question: string;
}): Promise<NetToGrossOgRenderModel> {
  const backgroundDataUrl = await getNetToGrossOgBackgroundDataUrl();
  return {
    headline: input.headline,
    question: input.question,
    brand: siteConfig.domain,
    credit: "Photo Mikhail Nilov / Pexels",
    backgroundDataUrl,
    orange: BRAND_ORANGE,
  };
}
