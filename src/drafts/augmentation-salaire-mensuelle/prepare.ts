import { getCanonicalUrl } from "@/framework/seo/metadata";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import {
  isMonthlyIncreaseAmount,
  MONTHLY_INCREASE_DEFAULT_PROFILE,
  MONTHLY_INCREASE_INTERNAL_BASE_PATH,
  MONTHLY_INCREASE_UPDATED_AT,
  monthlyIncreasePath,
  type MonthlyIncreaseAmount,
} from "@/site/augmentation-salaire-mensuelle/config";
import {
  buildAllProfileIncreaseEstimates,
  buildIncreaseComparisonRows,
  formatIncreaseShort,
} from "@/site/augmentation-salaire-mensuelle/data";
import {
  buildMonthlyIncreaseEditorial,
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  getNearbyMonthlyIncreaseAmounts,
  getNearbyMonthlyIncreaseLinks,
  monthlyIncreaseBreadcrumbLabel,
} from "@/site/augmentation-salaire-mensuelle/content";
import { buildIncreaseCalculatorPrefillHref } from "@/site/augmentation-salaire-mensuelle/prefill";
import { DRAFT_MONTHLY_INCREASE_AMOUNTS } from "./amounts";

const MINI_CALCULATOR_TITLE = "Vous souhaitez estimer une autre augmentation ?";
const SHARE_LABEL = "Partager cette fiche";
const SUBTITLE = "Réponse immédiate selon votre statut, avant prélèvement à la source.";

/**
 * Instantané de données d'une fiche publiée (modèle page 50 €).
 * Utile pour les tests de non-régression après publication des brouillons.
 */
export function prepareDraftMonthlyIncreaseFiche(grossMonthlyIncrease: MonthlyIncreaseAmount) {
  if (!isMonthlyIncreaseAmount(grossMonthlyIncrease)) {
    throw new Error(`Montant hors série augmentation mensuelle publiée : ${grossMonthlyIncrease}`);
  }

  const path = monthlyIncreasePath(grossMonthlyIncrease);
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildMonthlyIncreaseSeoMeta(grossMonthlyIncrease);
  const estimates = buildAllProfileIncreaseEstimates(grossMonthlyIncrease);
  const editorial = buildMonthlyIncreaseEditorial(grossMonthlyIncrease, estimates);
  const faq = buildMonthlyIncreaseFaqItems(grossMonthlyIncrease, estimates);
  const comparisonRows = buildIncreaseComparisonRows(grossMonthlyIncrease);
  const nearbyAmounts = getNearbyMonthlyIncreaseAmounts(grossMonthlyIncrease);
  const nearbyLinks = getNearbyMonthlyIncreaseLinks(grossMonthlyIncrease);
  const cover = getCalculatorCover("augmentation-salaire");
  const ogImage = coverToOgInput(cover);
  const breadcrumbLabel = monthlyIncreaseBreadcrumbLabel(grossMonthlyIncrease);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: breadcrumbLabel, path },
    ],
    cover,
    faq,
    withAuthor: true,
    dateModified: MONTHLY_INCREASE_UPDATED_AT,
    datePublished: MONTHLY_INCREASE_UPDATED_AT,
  });

  return {
    status: "published" as const,
    grossMonthlyIncrease,
    grossLabel: formatIncreaseShort(grossMonthlyIncrease),
    path,
    internalPath: `${MONTHLY_INCREASE_INTERNAL_BASE_PATH}/${grossMonthlyIncrease}`,
    canonical,
    updatedAt: MONTHLY_INCREASE_UPDATED_AT,
    openGraphType: "article" as const,
    seo: {
      title: seo.title,
      description: seo.description,
      h1: seo.h1,
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
        updatedAt: MONTHLY_INCREASE_UPDATED_AT,
      },
    },
    estimates: {
      nonExecutive: {
        netMonthlyGain: estimates.nonExecutive.netMonthlyGain,
        netAnnualGain: estimates.nonExecutive.netAnnualGain,
      },
      executive: {
        netMonthlyGain: estimates.executive.netMonthlyGain,
        netAnnualGain: estimates.executive.netAnnualGain,
      },
      publicService: {
        netMonthlyGain: estimates.publicService.netMonthlyGain,
        netAnnualGain: estimates.publicService.netAnnualGain,
      },
    },
    editorial,
    comparisonRows,
    faq,
    nearbyAmounts,
    nearbyLinks,
    miniCalculator: {
      title: MINI_CALCULATOR_TITLE,
      defaultProfile: MONTHLY_INCREASE_DEFAULT_PROFILE,
      defaultGrossMonthlyIncrease: grossMonthlyIncrease,
      increaseFieldLabel: "Augmentation brute mensuelle",
      submitLabel: "Calculer mon augmentation",
      redirectExample: buildIncreaseCalculatorPrefillHref(
        grossMonthlyIncrease,
        MONTHLY_INCREASE_DEFAULT_PROFILE,
      ),
      buildRedirectHref: buildIncreaseCalculatorPrefillHref,
    },
    jsonLd,
  };
}

export type PreparedDraftMonthlyIncreaseFiche = ReturnType<
  typeof prepareDraftMonthlyIncreaseFiche
>;

/** Plus de brouillons : retourne une liste vide. */
export function prepareAllDraftMonthlyIncreaseFiches() {
  return DRAFT_MONTHLY_INCREASE_AMOUNTS.map((amount) =>
    prepareDraftMonthlyIncreaseFiche(amount),
  );
}
