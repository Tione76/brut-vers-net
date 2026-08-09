import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { OgImageInput } from "@/framework/seo/metadata";
import { siteConfig } from "@/site/site.config";
import { GROSS_TO_NET_INTERNAL_BASE_PATH } from "./config";
import { formatGrossShort } from "./data";

/** Format social Open Graph / Twitter standard. */
export const GROSS_TO_NET_OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const GROSS_TO_NET_OG_CONTENT_TYPE = "image/png";

const SERIES_COVER_PUBLIC_PATH =
  "images/covers/series/Salaire-brut-mensuel-en-net.webp";

const BRAND_ORANGE = siteConfig.colors.primary;

let cachedBackgroundDataUrl: string | null = null;
let cachedFontRegular: ArrayBuffer | null = null;
let cachedFontBold: ArrayBuffer | null = null;

/** Ex. « 1 550 € BRUT / MOIS » */
export function formatGrossToNetOgHeadline(grossMonthly: number): string {
  return `${formatGrossShort(grossMonthly)} BRUT / MOIS`;
}

export function buildGrossToNetOgAlt(grossMonthly: number): string {
  return `${formatGrossShort(grossMonthly)} brut par mois : combien en net ?`;
}

/** Chemin relatif de l’image générée par opengraph-image.tsx */
export function grossToNetOgImagePath(grossMonthly: number): string {
  return `${GROSS_TO_NET_INTERNAL_BASE_PATH}/${grossMonthly}/opengraph-image`;
}

/** Entrée metadata (OG + Twitter) pour une fiche de la série. */
export function buildGrossToNetOgImageInput(grossMonthly: number): OgImageInput {
  return {
    url: grossToNetOgImagePath(grossMonthly),
    width: GROSS_TO_NET_OG_SIZE.width,
    height: GROSS_TO_NET_OG_SIZE.height,
    alt: buildGrossToNetOgAlt(grossMonthly),
    type: GROSS_TO_NET_OG_CONTENT_TYPE,
  };
}

async function loadSourceSans(weight: 600 | 700): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: {
      // Google sert une URL TTF/woff2 selon le User-Agent.
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Impossible de charger la CSS Source Sans 3 (${weight})`);
    }
    return res.text();
  });

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?(?:truetype|opentype|woff2)['"]?\)/);
  if (!match?.[1]) {
    throw new Error(`URL de police Source Sans 3 introuvable (weight ${weight})`);
  }

  const fontUrl = match[1].replace(/['"]/g, "");
  const fontRes = await fetch(fontUrl);
  if (!fontRes.ok) {
    throw new Error(`Téléchargement police Source Sans 3 échoué (${weight})`);
  }
  return fontRes.arrayBuffer();
}

export async function getGrossToNetOgFonts(): Promise<{
  regular: ArrayBuffer;
  bold: ArrayBuffer;
}> {
  if (!cachedFontRegular) {
    cachedFontRegular = await loadSourceSans(600);
  }
  if (!cachedFontBold) {
    cachedFontBold = await loadSourceSans(700);
  }
  return { regular: cachedFontRegular, bold: cachedFontBold };
}

/**
 * Photographie de série recadrée en 1200×630 (data URL PNG).
 * Mise en cache module : une seule conversion sharp pour toute la série.
 */
export async function getGrossToNetOgBackgroundDataUrl(): Promise<string> {
  if (cachedBackgroundDataUrl) {
    return cachedBackgroundDataUrl;
  }

  const sourcePath = join(process.cwd(), "public", SERIES_COVER_PUBLIC_PATH);
  const webp = await readFile(sourcePath);
  // Import dynamique : évite le bundling webpack de sharp (ERR_DLOPEN_FAILED sous Windows).
  const sharp = (await import("sharp")).default;
  const png = await sharp(webp)
    .resize(GROSS_TO_NET_OG_SIZE.width, GROSS_TO_NET_OG_SIZE.height, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();

  cachedBackgroundDataUrl = `data:image/png;base64,${png.toString("base64")}`;
  return cachedBackgroundDataUrl;
}

export type GrossToNetOgRenderModel = {
  headline: string;
  question: string;
  brand: string;
  credit: string;
  backgroundDataUrl: string;
  orange: string;
};

export async function buildGrossToNetOgRenderModel(
  grossMonthly: number,
): Promise<GrossToNetOgRenderModel> {
  const backgroundDataUrl = await getGrossToNetOgBackgroundDataUrl();
  return {
    headline: formatGrossToNetOgHeadline(grossMonthly),
    question: "Combien en net ?",
    brand: siteConfig.domain,
    credit: "Photo Mikhail Nilov / Pexels",
    backgroundDataUrl,
    orange: BRAND_ORANGE,
  };
}
