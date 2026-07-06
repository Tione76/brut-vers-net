import type { Guide } from "./types";

/** Dimensions standard Open Graph */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/webp";

export interface GuideCoverImage {
  /** Chemin public vers le fichier .webp (nom de fichier d'origine conservé) */
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

function ogPath(...parts: string[]): string {
  return `/images/og/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
}

/** Image de couverture — page d'accueil / calculateur */
export const HOME_COVER: GuideCoverImage = {
  src: ogPath("Calcul-HT-vers-TTC.webp"),
  alt: "Calculateur TVA HT vers TTC et TTC vers HT — conversion gratuite en ligne",
  title: "Calcul HT vers TTC",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Image de couverture — calculateur de marge (fallback : image principale jusqu'à image dédiée) */
export const MARGIN_CALCULATOR_COVER: GuideCoverImage = {
  src: HOME_COVER.src,
  alt: "Calculateur de marge HT / TTC — prix de vente, marge, taux de marque et TVA",
  title: "Calculateur de marge HT / TTC",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

/** Couvertures par slug de guide — une seule source pour OG, sidebar et futures listes */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "quels-sont-les-taux-de-tva-en-france": {
    src: ogPath("guides", "Les taux de TVA en France.webp"),
    alt: "Les taux de TVA en France — guide des taux 20 %, 10 %, 5,5 % et 2,1 %",
    title: "Les taux de TVA en France",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "franchise-en-base-de-tva": {
    src: ogPath("guides", "Franchise en base de TVA.webp"),
    alt: "Franchise en base de TVA — guide complet article 293 B du CGI",
    title: "Franchise en base de TVA",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "comment-faire-une-facture-conforme": {
    src: ogPath("guides", "Rédiger une facture conforme.webp"),
    alt: "Rédiger une facture conforme — mentions obligatoires et règles TVA",
    title: "Rédiger une facture conforme",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "tva-et-auto-entrepreneur": {
    src: ogPath("guides", "TVA et auto-entrepreneur.webp"),
    alt: "TVA et auto-entrepreneur — franchise en base, seuils et facturation",
    title: "TVA et auto-entrepreneur",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  },
  "tva-deductible-et-tva-collectee": {
    src: ogPath("guides", "TVA déductible et TVA collectée.webp"),
    alt: "TVA déductible et TVA collectée — comprendre la différence et la déclaration",
    title: "TVA déductible et TVA collectée",
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
