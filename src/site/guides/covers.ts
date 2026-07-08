import type { Guide } from "./types";

/** Dimensions standard Open Graph */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/webp";

export interface GuideCoverImage {
  /** Chemin public vers le fichier .webp (nom de fichier d'origine conservé) */
  src: string;
  alt: string;
  width: number;
  height: number;
}

function ogPath(...parts: string[]): string {
  return `/images/og/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
}

/** Image de couverture : page d'accueil / calculateur */
export const HOME_COVER: GuideCoverImage = {
  src: ogPath("Calcul-HT-vers-TTC.webp"),
  alt: "Conversion d'un montant HT en prix TTC",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Image de couverture officielle : calculateur de marge HT / TTC */
export const MARGIN_CALCULATOR_COVER: GuideCoverImage = {
  src: ogPath("Calcul-marge-HT-TTC.webp"),
  alt: "Calcul de la marge HT et TTC",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Open Graph : hub /guides */
export const GUIDES_HUB_COVER: GuideCoverImage = {
  src: ogPath("Guides-TVA.webp"),
  alt: "Guides TVA",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Open Graph : hub /nos-outils */
export const TOOLS_HUB_COVER: GuideCoverImage = {
  src: ogPath("Outils-calcul-tva.webp"),
  alt: "Outils de calcul TVA",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Couvertures par slug de guide : une seule source pour OG, sidebar et futures listes */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "quels-sont-les-taux-de-tva-en-france": {
    src: ogPath("guides", "Les taux de TVA en France.webp"),
    alt: "Les taux de TVA en France",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "franchise-en-base-de-tva": {
    src: ogPath("guides", "Franchise en base de TVA.webp"),
    alt: "Franchise en base de TVA",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "comment-faire-une-facture-conforme": {
    src: ogPath("guides", "Rédiger une facture conforme.webp"),
    alt: "Rédiger une facture conforme",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "tva-et-auto-entrepreneur": {
    src: ogPath("guides", "TVA et auto-entrepreneur.webp"),
    alt: "TVA et auto-entrepreneur",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "tva-deductible-et-tva-collectee": {
    src: ogPath("guides", "TVA déductible et TVA collectée.webp"),
    alt: "TVA déductible et TVA collectée",
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
