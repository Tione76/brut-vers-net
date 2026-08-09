import { getCanonicalUrl } from "@/framework/seo/metadata";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import {
  GROSS_TO_NET_DEFAULT_PROFILE,
  GROSS_TO_NET_INTERNAL_BASE_PATH,
  GROSS_TO_NET_UPDATED_AT,
  grossToNetPath,
} from "@/site/salaire-brut-net/config";
import {
  buildAllProfileNetEstimates,
  buildGrossToNetComparisonRows,
  formatGrossShort,
} from "@/site/salaire-brut-net/data";
import {
  GROSS_TO_NET_AUTHORITY_NOTE,
  buildGrossToNetEditorial,
  buildGrossToNetFaqItems,
  buildGrossToNetSeoMeta,
  grossToNetBreadcrumbLabel,
} from "@/site/salaire-brut-net/content";
import { buildGrossToNetOgImageInput } from "@/site/salaire-brut-net/og-image";
import { buildCalculatorGrossPrefillHref } from "@/site/salaire-brut-net/prefill";
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  DRAFT_GROSS_TO_NET_STATUS,
  isDraftGrossToNetAmount,
  type DraftGrossToNetStatus,
} from "./amounts";
import { getInverseNetToGrossLink } from "./cross-link";
import { getPreparedNearbyAmounts, getPreparedNearbyLinks } from "./nearby";

const MINI_CALCULATOR_INTRO =
  "Pour tester un autre salaire brut mensuel, utilisez le mini-calculateur.";
const MINI_CALCULATOR_TITLE = "Calculer un autre salaire brut";
const SHARE_LABEL = "Partager cette fiche";
const CARDS_INTRO =
  "Estimation du salaire net mensuel avant prélèvement à la source selon votre statut.";

/**
 * Prépare toutes les données d'une future fiche (modèle page 1 000 €).
 * Aucun rendu public : pure préparation de données.
 */
export function prepareDraftGrossToNetFiche(grossMonthly: number) {
  if (!isDraftGrossToNetAmount(grossMonthly)) {
    throw new Error(`Montant hors brouillons salaire brut → net : ${grossMonthly}`);
  }

  const path = grossToNetPath(grossMonthly);
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildGrossToNetSeoMeta(grossMonthly);
  const estimates = buildAllProfileNetEstimates(grossMonthly);
  const editorial = buildGrossToNetEditorial(grossMonthly, estimates);
  const faq = buildGrossToNetFaqItems(grossMonthly, estimates);
  const comparisonRows = buildGrossToNetComparisonRows(grossMonthly);
  const nearbyAmounts = getPreparedNearbyAmounts(grossMonthly);
  const nearbyLinks = getPreparedNearbyLinks(grossMonthly);
  const inverseLink = getInverseNetToGrossLink(grossMonthly);
  const ogImage = buildGrossToNetOgImageInput(grossMonthly);
  const breadcrumbLabel = grossToNetBreadcrumbLabel(grossMonthly);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: breadcrumbLabel, path },
    ],
    cover: GROSS_TO_NET_SERIES_COVER,
    faq,
    withAuthor: true,
    dateModified: GROSS_TO_NET_UPDATED_AT,
    datePublished: GROSS_TO_NET_UPDATED_AT,
  });

  return {
    status: DRAFT_GROSS_TO_NET_STATUS satisfies DraftGrossToNetStatus,
    grossMonthly,
    grossLabel: formatGrossShort(grossMonthly),
    path,
    internalPath: `${GROSS_TO_NET_INTERNAL_BASE_PATH}/${grossMonthly}`,
    canonical,
    updatedAt: GROSS_TO_NET_UPDATED_AT,
    openGraphType: "article" as const,
    seo: {
      title: seo.title,
      description: seo.description,
      h1: seo.h1,
      subtitle: seo.subtitle,
      answerH2: seo.answerH2,
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
      cardsIntro: CARDS_INTRO,
      breadcrumbLabel,
      authorityNote: GROSS_TO_NET_AUTHORITY_NOTE,
      share: {
        label: SHARE_LABEL,
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
    estimates: {
      nonExecutive: {
        netMonthly: estimates.nonExecutive.netMonthly,
        netAnnual: estimates.nonExecutive.netAnnual,
      },
      executive: {
        netMonthly: estimates.executive.netMonthly,
        netAnnual: estimates.executive.netAnnual,
      },
      publicService: {
        netMonthly: estimates.publicService.netMonthly,
        netAnnual: estimates.publicService.netAnnual,
      },
    },
    editorial,
    comparisonRows,
    faq,
    nearbyAmounts,
    nearbyLinks,
    /** null tant qu'aucune fiche net → brut assez proche n'existe. */
    inverseLink,
    miniCalculator: {
      intro: MINI_CALCULATOR_INTRO,
      title: MINI_CALCULATOR_TITLE,
      defaultProfile: GROSS_TO_NET_DEFAULT_PROFILE,
      defaultGrossMonthly: grossMonthly,
      grossFieldLabel: "Salaire brut mensuel",
      submitLabel: "Calculer en net",
      redirectExample: buildCalculatorGrossPrefillHref(
        grossMonthly,
        GROSS_TO_NET_DEFAULT_PROFILE,
      ),
      buildRedirectHref: buildCalculatorGrossPrefillHref,
    },
    jsonLd,
  };
}

export type PreparedDraftGrossToNetFiche = ReturnType<typeof prepareDraftGrossToNetFiche>;

export function prepareAllDraftGrossToNetFiches() {
  return DRAFT_GROSS_TO_NET_AMOUNTS.map((amount) => prepareDraftGrossToNetFiche(amount));
}

export function prepareDraftGrossToNetFichesHalf1() {
  // Vague 1 déjà publiée : plus aucun brouillon half-1.
  return [];
}

export function prepareDraftGrossToNetFichesHalf2() {
  return DRAFT_GROSS_TO_NET_AMOUNTS.map((amount) => prepareDraftGrossToNetFiche(amount));
}
