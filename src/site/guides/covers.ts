import type { Guide } from "./types";
import { siteConfig } from "../site.config";

/** Dimensions standard Open Graph */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/webp";

export interface GuideCoverImage {
  /** Chemin public vers l'image de couverture */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Image de couverture : page d'accueil / calculateur */
export const HOME_COVER: GuideCoverImage = {
  src: siteConfig.ogImage,
  alt: "Brut vers Net",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Open Graph : hub /guides */
export const GUIDES_HUB_COVER: GuideCoverImage = {
  src: siteConfig.ogImage,
  alt: "Brut vers Net",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Open Graph : hub /nos-outils */
export const TOOLS_HUB_COVER: GuideCoverImage = {
  src: siteConfig.ogImage,
  alt: "Brut vers Net",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Couvertures par slug de guide */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "comment-est-calcule-le-salaire-net": {
    src: siteConfig.ogImage,
    alt: "Calcul salaire net : différence entre brut et net, guide Brut vers Net",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "comment-lire-une-fiche-de-paie": {
    src: siteConfig.ogImage,
    alt: "Comment lire une fiche de paie ? Guide Brut vers Net",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "comment-calculer-son-salaire-net": {
    src: siteConfig.ogImage,
    alt: "Comment calculer son salaire net ? Guide Brut vers Net",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net": {
    src: siteConfig.ogImage,
    alt: "Cotisations salariales : pourquoi le salaire brut est plus élevé que le net, guide Brut vers Net",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne": {
    src: siteConfig.ogImage,
    alt: "Prélèvement à la source : qu'est-ce que c'est et comment ça fonctionne, guide Brut vers Net",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
};

export function getGuideCover(slug: string): GuideCoverImage | undefined {
  return GUIDE_COVERS[slug];
}

export function getGuideCoverByHref(href: string): GuideCoverImage | undefined {
  const match = href.match(/^\/guides\/([^/]+)\/?$/);
  if (!match) return undefined;
  return getGuideCover(match[1]);
}

export function resolveGuideCover(guide: Pick<Guide, "slug" | "coverImage">): GuideCoverImage | undefined {
  return guide.coverImage ?? getGuideCover(guide.slug);
}

/** Attache la couverture au guide (source unique pour tout le site) */
export function attachGuideCover<T extends Guide>(guide: T): T {
  const cover = getGuideCover(guide.slug);
  return cover ? { ...guide, coverImage: cover } : guide;
}

export function coverToOgInput(cover: GuideCoverImage) {
  return {
    url: cover.src,
    width: cover.width,
    height: cover.height,
    alt: cover.alt,
    type: OG_IMAGE_TYPE,
  };
}

export function coverToSchemaImage(cover: GuideCoverImage) {
  return {
    url: cover.src,
    width: cover.width,
    height: cover.height,
    caption: cover.alt,
  };
}
