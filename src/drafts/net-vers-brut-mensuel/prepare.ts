import { getCanonicalUrl } from "@/framework/seo/metadata";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import {
  isNetToGrossAmount,
  NET_TO_GROSS_DEFAULT_PROFILE,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_UPDATED_AT,
  netToGrossPath,
} from "@/site/salaire-net-brut/config";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  formatNetShort,
} from "@/site/salaire-net-brut/data";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
  seriesBreadcrumbLabel,
} from "@/site/salaire-net-brut/page-1500-content";
import { buildNetToGrossOgImageInput } from "@/site/salaire-net-brut/og-image-meta";
import { buildCalculatorNetPrefillHref } from "@/site/salaire-net-brut/prefill";
import {
  DRAFT_NET_TO_GROSS_AMOUNTS,
  DRAFT_NET_TO_GROSS_STATUS,
  isDraftNetToGrossAmount,
} from "./amounts";
import { getPreparedNearbyAmounts, getPreparedNearbyLinks } from "./nearby";

const MINI_CALCULATOR_TITLE = "Calculer un autre salaire net";
const SHARE_LABEL = "Partager cette fiche";
const SUBTITLE = "Réponse immédiate selon votre statut, avant prélèvement à la source.";

/**
 * Prépare les données d'une fiche (modèle page 1 500 €).
 * - brouillon : status "draft", nearby sur catalogue futur
 * - publié : status "published", nearby public (non-régression)
 * Aucune route App Router : pure préparation de données.
 */
export function prepareDraftNetToGrossFiche(netMonthly: number) {
  const isDraft = isDraftNetToGrossAmount(netMonthly);
  const isPublished = isNetToGrossAmount(netMonthly);
  if (!isDraft && !isPublished) {
    throw new Error(`Montant hors série net→brut (publié ou brouillon) : ${netMonthly}`);
  }

  const path = netToGrossPath(netMonthly);
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildSeriesSeoMeta(netMonthly);
  const estimates = buildAllProfileEstimates(netMonthly);
  const editorial = buildSeriesEditorial(netMonthly, estimates);
  const faq = buildSeriesFaqItems(netMonthly, estimates);
  const comparisonRows = buildComparisonRows(netMonthly);
  const nearbyAmounts = isDraft
    ? getPreparedNearbyAmounts(netMonthly)
    : getSeriesNearbyAmounts(netMonthly);
  const nearbyLinks = isDraft
    ? getPreparedNearbyLinks(netMonthly)
    : nearbyAmounts.map((amount) => ({
        netMonthly: amount,
        href: netToGrossPath(amount),
      }));
  const ogImage = buildNetToGrossOgImageInput(netMonthly);
  const breadcrumbLabel = seriesBreadcrumbLabel(netMonthly);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      {
        name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
        path: NET_TO_GROSS_HUB_PATH,
      },
      { name: breadcrumbLabel, path },
    ],
    cover: NET_TO_GROSS_SERIES_COVER,
    faq,
    withAuthor: true,
    dateModified: NET_TO_GROSS_UPDATED_AT,
    datePublished: NET_TO_GROSS_UPDATED_AT,
  });

  return {
    status: isDraft ? DRAFT_NET_TO_GROSS_STATUS : ("published" as const),
    netMonthly,
    netLabel: formatNetShort(netMonthly),
    path,
    internalPath: `/net-vers-brut/${netMonthly}`,
    canonical,
    updatedAt: NET_TO_GROSS_UPDATED_AT,
    seo: {
      title: seo.title,
      description: seo.description,
      h1: seo.h1,
      answerH2: seo.answerH2,
      openGraph: {
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
      subtitle: SUBTITLE,
      breadcrumbLabel,
      share: {
        label: SHARE_LABEL,
        url: canonical,
        title: seo.title,
        description: seo.description,
      },
      author: {
        displayName: "Antoine",
        withReadingTime: false,
        updatedAt: NET_TO_GROSS_UPDATED_AT,
      },
    },
    estimates: {
      nonExecutive: {
        grossMonthly: estimates.nonExecutive.grossMonthly,
        grossAnnual: estimates.nonExecutive.grossAnnual,
      },
      executive: {
        grossMonthly: estimates.executive.grossMonthly,
        grossAnnual: estimates.executive.grossAnnual,
      },
      publicService: {
        grossMonthly: estimates.publicService.grossMonthly,
        grossAnnual: estimates.publicService.grossAnnual,
      },
    },
    editorial,
    comparisonRows,
    faq,
    nearbyAmounts,
    nearbyLinks,
    miniCalculator: {
      title: MINI_CALCULATOR_TITLE,
      defaultProfile: NET_TO_GROSS_DEFAULT_PROFILE,
      defaultNetMonthly: netMonthly,
      netFieldLabel: "Salaire net mensuel",
      submitLabel: "Calculer en brut",
      redirectExample: buildCalculatorNetPrefillHref(
        netMonthly,
        NET_TO_GROSS_DEFAULT_PROFILE,
      ),
      buildRedirectHref: buildCalculatorNetPrefillHref,
    },
    jsonLd,
  };
}

export type PreparedDraftNetToGrossFiche = ReturnType<typeof prepareDraftNetToGrossFiche>;

/** Prépare toutes les fiches encore en brouillon (pas de SSG). */
export function prepareAllDraftNetToGrossFiches() {
  return DRAFT_NET_TO_GROSS_AMOUNTS.map((amount) => prepareDraftNetToGrossFiche(amount));
}
