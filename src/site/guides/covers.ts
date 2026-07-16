import type { Guide } from "./types";

/** Dimensions standard Open Graph (versions .webp générées) */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/webp";

const OG_DIR = "/images/og";

export interface GuideCoverImage {
  /** Chemin public vers l'image de couverture */
  src: string;
  alt: string;
  width: number;
  height: number;
}

function ogCover(filename: string, alt: string): GuideCoverImage {
  return {
    src: `${OG_DIR}/${filename}`,
    alt,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };
}

/** Image de couverture : page d'accueil / calculateur Brut vers Net */
export const HOME_COVER: GuideCoverImage = ogCover(
  "Calculer-salaire-brut-vers-net.webp",
  "Calculateur de salaire brut vers net",
);

/** Open Graph + hub /guides */
export const GUIDES_HUB_COVER: GuideCoverImage = ogCover(
  "Guides.webp",
  "Guides sur le salaire brut et le salaire net",
);

/** Open Graph + hub /nos-outils */
export const TOOLS_HUB_COVER: GuideCoverImage = ogCover(
  "Nos outils.webp",
  "Outils gratuits de calcul de salaire",
);

/** Open Graph + page /faq */
export const FAQ_COVER: GuideCoverImage = ogCover(
  "FAQ.webp",
  "Questions fréquentes sur le salaire",
);

/** Couvertures par identifiant de calculateur (hors page d'accueil) */
export const CALCULATOR_COVERS: Record<string, GuideCoverImage> = {
  "brut-vers-net": HOME_COVER,
  "augmentation-salaire": ogCover(
    "calcul-augmentation-de-salaire.webp",
    "Calculateur d'augmentation de salaire",
  ),
  "salaire-heures-supplementaires": ogCover(
    "Calcul-de-salaire-heures-supplémentaires.webp",
    "Calcul des heures supplémentaires",
  ),
  "indemnite-licenciement": ogCover(
    "Calcul-indemnité-de-licenciement.webp",
    "Calculateur d'indemnité de licenciement",
  ),
};

/** Couvertures par slug de guide */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "comment-est-calcule-le-salaire-net": ogCover(
    "Différence-entre-salaire-brut-et-net.webp",
    "Différence entre salaire brut et salaire net",
  ),
  "comment-lire-une-fiche-de-paie": ogCover(
    "comment-lire-une-fiche-de-paie.webp",
    "Comment lire une fiche de paie",
  ),
  "comment-calculer-son-salaire-net": ogCover(
    "comment-calculer-son-salaire-net.webp",
    "Comment calculer son salaire net",
  ),
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net": ogCover(
    "Les-cotisations-salariales.webp",
    "Les cotisations salariales",
  ),
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne": ogCover(
    "Le-prélèvement-à-la-source.webp",
    "Le prélèvement à la source",
  ),
};

export function getCalculatorCover(id: string): GuideCoverImage {
  return CALCULATOR_COVERS[id] ?? HOME_COVER;
}

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

/** URL absolue production-safe (encodage accents / espaces, jamais localhost) */
export function toAbsoluteAssetUrl(siteUrl: string, assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const pathname = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const encodedPath = pathname
    .split("/")
    .map((segment) => (segment === "" ? "" : encodeURIComponent(segment)))
    .join("/");
  return `${siteUrl.replace(/\/$/, "")}${encodedPath}`;
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
