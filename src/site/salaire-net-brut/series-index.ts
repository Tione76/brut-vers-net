/**
 * Contenu publié de la page index (tableau net → brut).
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_INDEX_PATH,
  NET_TO_GROSS_UPDATED_AT,
} from "./config";
import { buildNetToGrossIndexRows } from "./index-table";
import { buildNetToGrossIndexOgImageInput } from "./og-image-meta";

function formatCoefficientFr(coefficient: number): string {
  return coefficient.toFixed(2).replace(".", ",");
}

function retentionPercentFromCoefficient(coefficient: number): number {
  return Math.round((1 - coefficient) * 100);
}

export function buildNetToGrossIndexSeo() {
  return {
    title: "Tableau net en brut : salaires mensuels",
    description:
      "Tableau de conversion du salaire net mensuel en brut pour non-cadre, cadre et fonction publique. Estimations avant prélèvement à la source.",
    h1: "Tableau salaire net en brut : conversion mensuelle",
    subtitle:
      "Convertissez rapidement un net mensuel en brut grâce à ce tableau de correspondance. Pour chaque montant, retrouvez une estimation pour un salarié non-cadre, un salarié cadre et un agent de la fonction publique, avant prélèvement à la source.",
  };
}

export function buildNetToGrossIndexFaq() {
  const nonExecutive = getProfileCoefficient("nonExecutive");
  const executive = getProfileCoefficient("executive");
  const publicService = getProfileCoefficient("publicService");

  return [
    {
      question: "Comment convertir un salaire net mensuel en brut ?",
      answer:
        "Repérez votre net dans la première colonne, puis lisez le brut estimé selon votre statut. Pour un calcul personnalisé (temps partiel, prélèvement à la source), utilisez le calculateur principal Brut vers Net.",
    },
    {
      question: "Quel coefficient appliquer pour passer du net au brut ?",
      answer: `Le site applique des coefficients moyens : environ ${retentionPercentFromCoefficient(nonExecutive)} % de retenues pour un non-cadre (× ${formatCoefficientFr(nonExecutive)}), ${retentionPercentFromCoefficient(executive)} % pour un cadre (× ${formatCoefficientFr(executive)}) et environ ${retentionPercentFromCoefficient(publicService)} % en fonction publique (× ${formatCoefficientFr(publicService)}). Ce sont des ordres de grandeur, pas un bulletin de paie.`,
    },
    {
      question: "Le salaire brut indiqué dans le tableau correspond-il exactement à ma fiche de paie ?",
      answer:
        "Non. Les montants sont des estimations calculées avec les coefficients moyens du simulateur. Le résultat réel peut varier selon le contrat, les primes, le temps de travail, la convention collective, certaines cotisations ou le régime applicable. Le montant réellement versé peut donc différer de celui affiché ici, selon votre situation et les cotisations portées sur votre bulletin de paie.",
    },
    {
      question: "Le tableau net-brut tient-il compte du prélèvement à la source ?",
      answer:
        "Non. Les montants affichés sont des estimations avant prélèvement à la source. Le net versé dépend ensuite de votre taux personnalisé ou neutre, calculable dans le simulateur principal.",
    },
  ] as const;
}

export function buildNetToGrossIndexEditorial() {
  return [
    {
      id: "lire-tableau",
      title: "Comment lire ce tableau net-brut ?",
      paragraphs: [
        "La première colonne liste les salaires nets mensuels déjà publiés dans la série. Cliquez un montant pour ouvrir la fiche détaillée correspondante.",
        "Les trois colonnes suivantes estiment le brut avant prélèvement à la source pour un salarié non-cadre, un salarié cadre et un agent de la fonction publique, avec les mêmes coefficients que le simulateur.",
        "Ces montants constituent des estimations. Le montant réellement versé peut varier selon votre situation et les cotisations appliquées sur votre bulletin de paie.",
      ],
    },
    {
      id: "ecarts-statut",
      title: "Pourquoi le salaire brut diffère-t-il selon le statut ?",
      paragraphs: [
        "À net égal, le brut varie parce que les cotisations salariales moyennes ne sont pas identiques selon le statut. Le simulateur applique donc trois coefficients distincts, cohérents avec le reste du site.",
        "Contrat, primes, temps partiel ou régime particulier peuvent encore écarter le résultat. Affinez toujours avec votre situation réelle.",
      ],
    },
    {
      id: "calcul-precis",
      title: "Comment calculer précisément son salaire net en brut ?",
      paragraphs: [
        "Ce tableau sert à consulter rapidement une correspondance net → brut pour les trois profils.",
      ],
    },
  ] as const;
}

export function buildNetToGrossIndexToc() {
  return [
    { id: "index-table", label: "Tableau net-brut" },
    { id: "index-lire-tableau", label: "Comment lire le tableau" },
    { id: "index-ecarts-statut", label: "Différences selon le statut" },
    { id: "index-calcul-precis", label: "Calcul précis" },
    { id: "index-faq", label: "FAQ" },
  ] as const;
}

export function buildNetToGrossIndexPayload() {
  const path = NET_TO_GROSS_INDEX_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildNetToGrossIndexSeo();
  const faq = buildNetToGrossIndexFaq();
  const editorial = buildNetToGrossIndexEditorial();
  const toc = buildNetToGrossIndexToc();
  const rows = buildNetToGrossIndexRows();
  const ogImage = buildNetToGrossIndexOgImageInput();

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
      { name: "Tableau", path },
    ],
    cover: NET_TO_GROSS_SERIES_COVER,
    faq: [...faq],
    withAuthor: true,
    dateModified: NET_TO_GROSS_UPDATED_AT,
    datePublished: NET_TO_GROSS_UPDATED_AT,
  });

  return {
    path,
    canonical,
    updatedAt: NET_TO_GROSS_UPDATED_AT,
    hubPath: NET_TO_GROSS_HUB_PATH,
    calculatorPath: "/",
    guideLinks: [
      {
        href: "/guides/comment-calculer-son-salaire-net",
        label: "Comment calculer son salaire net ?",
      },
      {
        href: "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
        label: "Pourquoi le brut est plus élevé que le net ?",
      },
    ] as const,
    toc,
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
    editorial,
    faq,
    table: {
      columns: [
        {
          id: "net",
          full: "Salaire net mensuel",
          short: "Net",
        },
        {
          id: "nonExecutive",
          full: "Brut non-cadre",
          short: "Non-cadre",
        },
        {
          id: "executive",
          full: "Brut cadre",
          short: "Cadre",
        },
        {
          id: "publicService",
          full: "Brut fonction publique",
          short: "Public",
        },
      ] as const,
      intro:
        "Estimations avant prélèvement à la source pour les trois profils du simulateur. Cliquez un net pour ouvrir la fiche détaillée.",
      rows,
      footnote:
        "Montants arrondis selon les coefficients du simulateur Brut vers Net. Ces montants constituent des estimations : le montant réellement versé peut varier selon votre situation et les cotisations appliquées sur votre bulletin de paie.",
    },
    rowCount: rows.length,
    jsonLd,
  };
}
