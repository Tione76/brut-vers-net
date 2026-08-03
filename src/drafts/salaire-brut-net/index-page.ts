/**
 * Page index brouillon de la série (tableau automatique brut → net).
 * Données uniquement : aucune route App Router, aucun sitemap.
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import { GROSS_TO_NET_UPDATED_AT } from "@/site/salaire-brut-net/config";
import { buildDraftGrossToNetIndexRows } from "./index-table";

/** URL publique prévue pour le tableau index. */
export const DRAFT_GROSS_TO_NET_INDEX_PATH = "/tableau-salaire-brut-mensuel-en-net";

export const DRAFT_GROSS_TO_NET_INDEX_STATUS = "draft" as const;

export function buildDraftGrossToNetIndexSeo() {
  return {
    title: "Tableau salaire brut mensuel en net",
    description:
      "Tableau des salaires bruts mensuels convertis en net (non-cadre). Parcourez tous les montants de la série, de 1 000 € à 6 000 €, puis ouvrez la fiche détaillée.",
    h1: "Tableau : salaire brut mensuel en net",
    subtitle:
      "Estimations automatiques pour un salarié non-cadre, avant prélèvement à la source.",
  };
}

/**
 * Prépare la page index (tableau généré + SEO + JSON-LD).
 * Aucun rendu public.
 */
export function prepareDraftGrossToNetIndexPage() {
  const path = DRAFT_GROSS_TO_NET_INDEX_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildDraftGrossToNetIndexSeo();
  const rows = buildDraftGrossToNetIndexRows();
  const ogImage = coverToOgInput(HOME_COVER);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: "Tous les salaires bruts mensuels convertis en net", path: "/salaire-brut-mensuel-en-net" },
      { name: "Tableau", path },
    ],
    cover: HOME_COVER,
    withAuthor: true,
    dateModified: GROSS_TO_NET_UPDATED_AT,
    datePublished: GROSS_TO_NET_UPDATED_AT,
  });

  return {
    status: DRAFT_GROSS_TO_NET_INDEX_STATUS,
    path,
    canonical,
    updatedAt: GROSS_TO_NET_UPDATED_AT,
    openGraphType: "article" as const,
    seo: {
      ...seo,
      openGraph: {
        type: "article" as const,
        title: seo.title,
        description: seo.description,
        url: canonical,
        siteName: siteConfig.name,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: seo.title,
        description: seo.description,
        images: [ogImage],
      },
    },
    page: {
      title: seo.h1,
      subtitle: seo.subtitle,
      share: {
        label: "Partager cette page",
        url: canonical,
        title: seo.title,
        description: seo.description,
      },
      author: {
        displayName: "Antoine",
        withReadingTime: false,
        updatedAt: GROSS_TO_NET_UPDATED_AT,
      },
    },
    table: {
      columns: ["Salaire brut mensuel", "Salaire net estimé (non-cadre)"] as const,
      rows,
      footnote:
        "Estimations mensuelles avant prélèvement à la source, calculées selon les coefficients du simulateur.",
    },
    rowCount: rows.length,
    jsonLd,
  };
}

export type PreparedDraftGrossToNetIndexPage = ReturnType<
  typeof prepareDraftGrossToNetIndexPage
>;
