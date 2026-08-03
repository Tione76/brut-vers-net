/**
 * Hub brouillon de la série « salaire brut mensuel → net ».
 * Données uniquement : aucune route App Router, aucun sitemap.
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_UPDATED_AT,
  grossToNetPath,
} from "@/site/salaire-brut-net/config";
import { formatGrossShort } from "@/site/salaire-brut-net/data";
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  buildFuturePublishedCatalog,
} from "./amounts";
import { buildDraftGrossToNetIndexRows } from "./index-table";

/** URL publique prévue (non publiée tant que le hub reste en brouillon). */
export const DRAFT_GROSS_TO_NET_HUB_PATH = "/salaire-brut-mensuel-en-net";

export const DRAFT_GROSS_TO_NET_HUB_STATUS = "draft" as const;

export function buildDraftGrossToNetHubSeo() {
  return {
    title: "Tous les salaires bruts mensuels convertis en net",
    description:
      "Consultez tous les salaires bruts mensuels convertis en net selon votre statut. Parcourez la série d'estimations, puis affinez avec le calculateur gratuit.",
    h1: "Tous les salaires bruts mensuels convertis en net",
    subtitle:
      "Repères immédiats pour convertir un salaire brut mensuel en net, avant prélèvement à la source.",
  };
}

export function buildDraftGrossToNetHubFaq() {
  return [
    {
      question: "Comment lire les estimations brut vers net de cette série ?",
      answer:
        "Chaque fiche part d'un salaire brut mensuel connu et estime le net selon trois profils : salarié non-cadre, salarié cadre et fonction publique. Les montants sont calculés avec les coefficients du simulateur, avant prélèvement à la source.",
    },
    {
      question: "Pourquoi le net change-t-il selon le statut ?",
      answer:
        "Les cotisations salariales ne sont pas identiques pour un non-cadre, un cadre ou un agent de la fonction publique. Nous appliquons des écarts moyens alignés sur le simulateur, utiles pour un ordre de grandeur.",
    },
    {
      question: "Comment obtenir un calcul personnalisé ?",
      answer:
        "Pour un calcul personnalisé, utilisez notre calculateur de salaire brut et net : indiquez votre brut ou votre net, choisissez votre profil et ajustez le temps de travail ou le prélèvement à la source. Le bulletin de salaire reste la référence officielle.",
    },
  ];
}

export function buildDraftGrossToNetHubEditorial() {
  return [
    {
      id: "comment-lire",
      title: "Comment utiliser cette série de fiches ?",
      paragraphs: [
        "Chaque page répond à une question simple : quel salaire net correspond à un montant brut mensuel donné ? Les cartes affichent d'abord le net estimé pour les trois profils les plus demandés.",
        "Le tableau des bruts proches et le mini-calculateur permettent ensuite de comparer d'autres montants ou d'ouvrir le simulateur principal avec vos propres chiffres.",
      ],
    },
    {
      id: "methode",
      title: "Quelle méthode de calcul est utilisée ?",
      paragraphs: [
        "Les estimations reposent sur les coefficients moyens du simulateur Brut vers Net. Elles donnent un ordre de grandeur avant prélèvement à la source, pas une reconstitution ligne à ligne du bulletin.",
        "Contrat, primes, temps partiel ou régime particulier peuvent écarter le résultat. Affinez toujours avec le calculateur dès que vous connaissez votre situation exacte.",
      ],
    },
    {
      id: "parcourir",
      title: "Parcourir tous les montants de la série",
      paragraphs: [
        "La série progresse par pas de 50 €, de 1 000 € à 6 000 € brut mensuels. Utilisez le tableau ci-dessous ou les liens vers chaque fiche pour trouver rapidement le montant recherché.",
      ],
    },
  ] as const;
}

/**
 * Prépare le hub complet (SEO, édito, FAQ, tableau, liens, JSON-LD).
 * Aucun rendu public.
 */
export function prepareDraftGrossToNetHub() {
  const path = DRAFT_GROSS_TO_NET_HUB_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildDraftGrossToNetHubSeo();
  const faq = buildDraftGrossToNetHubFaq();
  const editorial = buildDraftGrossToNetHubEditorial();
  const indexRows = buildDraftGrossToNetIndexRows();
  const catalog = buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS);
  const ficheLinks = catalog.map((amount) => ({
    amount,
    href: grossToNetPath(amount),
    label: `${formatGrossShort(amount)} brut en net`,
  }));
  const ogImage = coverToOgInput(HOME_COVER);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: "Tous les salaires bruts mensuels convertis en net", path },
    ],
    cover: HOME_COVER,
    faq,
    withAuthor: true,
    dateModified: GROSS_TO_NET_UPDATED_AT,
    datePublished: GROSS_TO_NET_UPDATED_AT,
  });

  return {
    status: DRAFT_GROSS_TO_NET_HUB_STATUS,
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
      breadcrumbLabel: "Tous les salaires bruts mensuels convertis en net",
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
    editorial,
    faq,
    indexRows,
    ficheLinks,
    miniCalculator: {
      title: "Calculer un autre salaire brut",
      href: "/",
      note: "Ouvre le calculateur principal Brut vers Net.",
    },
    catalogCount: catalog.length,
    draftCount: DRAFT_GROSS_TO_NET_AMOUNTS.length,
    jsonLd,
  };
}

export type PreparedDraftGrossToNetHub = ReturnType<typeof prepareDraftGrossToNetHub>;
