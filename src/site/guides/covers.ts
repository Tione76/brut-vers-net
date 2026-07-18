/**
 * Registre central des illustrations du site (source unique de vérité).
 * Chemins, alt SEO et crédits photographes : ne jamais les dupliquer dans les pages.
 */

import type { Guide } from "./types";

export const COVER_IMAGE_TYPE = "image/webp";

/** Dimensions Open Graph historiques (référence) */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = COVER_IMAGE_TYPE;

export type CoverCreditSource = "Pexels" | "Unsplash";

export type CoverCredit = {
  photographer: string;
  source: CoverCreditSource;
};

export interface GuideCoverImage {
  /** Chemin public vers l'image de couverture */
  src: string;
  /** Texte alt SEO / accessibilité (sujet de la page, jamais le crédit) */
  alt: string;
  width: number;
  height: number;
  credit: CoverCredit;
}

const COVERS_ROOT = "/images/covers";

function cover(
  relativePath: string,
  alt: string,
  credit: CoverCredit,
  width: number,
  height: number,
): GuideCoverImage {
  return {
    src: `${COVERS_ROOT}/${relativePath}`,
    alt,
    width,
    height,
    credit,
  };
}

/** Libellé affiché dans la bande crédit (overlay). */
export function formatCoverCredit(credit: CoverCredit): string {
  return `Photo de ${credit.photographer} via ${credit.source}`;
}

/** Image de couverture : page d'accueil / calculateur Brut vers Net */
export const HOME_COVER: GuideCoverImage = cover(
  "calculateurs/Calculateur-brut-vers-net.webp",
  "Personne consultant un calculateur de salaire brut vers net sur un ordinateur",
  { photographer: "Kindel Media", source: "Pexels" },
  1200,
  900,
);

/** Hub /guides */
export const GUIDES_HUB_COVER: GuideCoverImage = cover(
  "hubs/Guides-salaire-imôts.webp",
  "Guides pour comprendre le salaire, la fiche de paie et la rémunération",
  { photographer: "Pixabay", source: "Pexels" },
  1200,
  900,
);

/** Hub /nos-outils */
export const TOOLS_HUB_COVER: GuideCoverImage = cover(
  "hubs/Calculateurs-salaire.webp",
  "Outils et simulateurs gratuits pour estimer un salaire et une rémunération",
  { photographer: "Kindel Media", source: "Pexels" },
  1200,
  676,
);

/** Page /faq */
export const FAQ_COVER: GuideCoverImage = cover(
  "hubs/Questions-sur-le-salaire.webp",
  "Questions fréquentes sur le salaire brut, le salaire net et la rémunération",
  { photographer: "www.kaboompics.com", source: "Pexels" },
  6720,
  4480,
);

/** Couvertures par identifiant de calculateur */
export const CALCULATOR_COVERS: Record<string, GuideCoverImage> = {
  "brut-vers-net": HOME_COVER,
  "augmentation-salaire": cover(
    "calculateurs/Calculateur-augmentation-salaire.webp",
    "Simulation d'une augmentation de salaire et de son impact sur le net",
    { photographer: "MART PRODUCTION", source: "Pexels" },
    1200,
    800,
  ),
  "salaire-heures-supplementaires": cover(
    "calculateurs/Calculateur-salaire-avec-heures-supplémentaires.webp",
    "Calcul du salaire avec heures supplémentaires en brut et en net",
    { photographer: "Surja Raj", source: "Pexels" },
    1200,
    800,
  ),
  "indemnite-licenciement": cover(
    "calculateurs/Simulateur-indemnité-licenciement.webp",
    "Estimation d'une indemnité de licenciement à partir du salaire de référence",
    { photographer: "Tima Miroshnichenko", source: "Pexels" },
    1200,
    800,
  ),
};

/** Couvertures par slug de guide */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "comment-est-calcule-le-salaire-net": cover(
    "guides/Comment-calculer-salaire-net.webp",
    "Explication de la différence entre salaire brut et salaire net",
    { photographer: "Bia Limova", source: "Pexels" },
    1200,
    800,
  ),
  "comment-calculer-son-salaire-net": cover(
    "guides/Comment-calculer-son-salaire-net.webp",
    "Méthode pas à pas pour calculer son salaire net à partir du brut",
    { photographer: "Polina Tankilevitch", source: "Pexels" },
    1200,
    800,
  ),
  "comment-lire-une-fiche-de-paie": cover(
    "guides/Comment-lire-fiche-de-paie.webp",
    "Lecture d'une fiche de paie : brut, cotisations, net et prélèvement à la source",
    { photographer: "Kampus Production", source: "Pexels" },
    1200,
    800,
  ),
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net": cover(
    "guides/Comprendre-cotisations-salariales.webp",
    "Comprendre les cotisations salariales et l'écart entre salaire brut et net",
    { photographer: "RDNE Stock project", source: "Pexels" },
    1200,
    800,
  ),
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne": cover(
    "guides/Prélèvement-à-la-source.webp",
    "Fonctionnement du prélèvement à la source sur le salaire",
    { photographer: "Polina Tankilevitch", source: "Pexels" },
    1200,
    800,
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

export function resolveGuideCover(
  guide: Pick<Guide, "slug" | "coverImage">,
): GuideCoverImage | undefined {
  return guide.coverImage ?? getGuideCover(guide.slug);
}

/** Attache la couverture au guide (source unique pour tout le site) */
export function attachGuideCover<T extends Guide>(guide: T): T {
  const coverImage = getGuideCover(guide.slug);
  return coverImage ? { ...guide, coverImage } : guide;
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
    type: COVER_IMAGE_TYPE,
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
