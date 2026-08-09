/**
 * Contenu publié de la page index (tableau brut → net).
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { siteConfig } from "@/site/site.config";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  GROSS_TO_NET_UPDATED_AT,
} from "./config";
import { buildGrossToNetIndexRows } from "./index-table";

function formatCoefficientFr(coefficient: number): string {
  return coefficient.toFixed(2).replace(".", ",");
}

function retentionPercentFromCoefficient(coefficient: number): number {
  return Math.round((1 - coefficient) * 100);
}

export function buildGrossToNetIndexSeo() {
  return {
    title: "Tableau salaire brut mensuel en net",
    description:
      "Tableau de conversion du salaire brut mensuel en net pour non-cadre, cadre et fonction publique. Estimations avant prélèvement à la source.",
    h1: "Tableau salaire brut en net : conversion mensuelle",
    subtitle:
      "Convertissez rapidement un brut mensuel en net grâce à ce tableau de correspondance. Pour chaque montant, retrouvez une estimation pour un salarié non-cadre, un salarié cadre et un agent de la fonction publique, avant prélèvement à la source.",
  };
}

export function buildGrossToNetIndexFaq() {
  const nonExecutive = getProfileCoefficient("nonExecutive");
  const executive = getProfileCoefficient("executive");
  const publicService = getProfileCoefficient("publicService");

  return [
    {
      question: "Comment convertir un salaire brut mensuel en net ?",
      answer:
        "Repérez votre brut dans la première colonne, puis lisez le net estimé selon votre statut. Pour un calcul personnalisé (temps partiel, prélèvement à la source), utilisez le calculateur principal Brut vers Net.",
    },
    {
      question: "Quel pourcentage retirer du salaire brut pour obtenir le net ?",
      answer: `Le site applique des coefficients moyens : environ ${retentionPercentFromCoefficient(nonExecutive)} % de retenues pour un non-cadre (× ${formatCoefficientFr(nonExecutive)}), ${retentionPercentFromCoefficient(executive)} % pour un cadre (× ${formatCoefficientFr(executive)}) et environ ${retentionPercentFromCoefficient(publicService)} % en fonction publique (× ${formatCoefficientFr(publicService)}). Ce sont des ordres de grandeur, pas un bulletin de paie.`,
    },
    {
      question: "Le salaire net indiqué dans le tableau correspond-il exactement à ma fiche de paie ?",
      answer:
        "Non. Les montants sont des estimations calculées avec les coefficients moyens du simulateur. Le résultat réel peut varier selon le contrat, les primes, le temps de travail, la convention collective, certaines cotisations ou le régime applicable. Le montant réellement versé peut donc différer de celui affiché ici, selon votre situation et les cotisations portées sur votre bulletin de paie.",
    },
    {
      question: "Le tableau brut-net tient-il compte du prélèvement à la source ?",
      answer:
        "Non. Les montants affichés sont des estimations de net avant prélèvement à la source. Le net versé dépend ensuite de votre taux personnalisé ou neutre, calculable dans le simulateur principal.",
    },
  ] as const;
}

export function buildGrossToNetIndexEditorial() {
  return [
    {
      id: "lire-tableau",
      title: "Comment lire ce tableau brut-net ?",
      paragraphs: [
        "La première colonne liste les salaires bruts mensuels déjà publiés dans la série. Cliquez un montant pour ouvrir la fiche détaillée correspondante.",
        "Les trois colonnes suivantes estiment le net avant prélèvement à la source pour un salarié non-cadre, un salarié cadre et un agent de la fonction publique, avec les mêmes coefficients que le simulateur.",
        "Ces montants constituent des estimations. Le montant réellement versé peut varier selon votre situation et les cotisations appliquées sur votre bulletin de paie.",
      ],
    },
    {
      id: "ecarts-statut",
      title: "Pourquoi le salaire net diffère-t-il selon le statut ?",
      paragraphs: [
        "À brut égal, le net varie parce que les cotisations salariales moyennes ne sont pas identiques selon le statut. Le simulateur applique donc trois coefficients distincts, cohérents avec le reste du site.",
        "Contrat, primes, temps partiel ou régime particulier peuvent encore écarter le résultat. Affinez toujours avec votre situation réelle.",
      ],
    },
    {
      id: "calcul-precis",
      title: "Comment calculer précisément son salaire brut en net ?",
      paragraphs: [
        "Ce tableau sert à consulter rapidement une correspondance brut → net pour les trois profils.",
      ],
    },
  ] as const;
}

export function buildGrossToNetIndexToc() {
  return [
    { id: "index-table", label: "Tableau brut-net" },
    { id: "index-lire-tableau", label: "Comment lire le tableau" },
    { id: "index-ecarts-statut", label: "Différences selon le statut" },
    { id: "index-calcul-precis", label: "Calcul précis" },
    { id: "index-faq", label: "FAQ" },
  ] as const;
}

export function buildGrossToNetIndexPayload() {
  const path = GROSS_TO_NET_INDEX_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildGrossToNetIndexSeo();
  const faq = buildGrossToNetIndexFaq();
  const editorial = buildGrossToNetIndexEditorial();
  const toc = buildGrossToNetIndexToc();
  const rows = buildGrossToNetIndexRows();
  const ogImage = coverToOgInput(HOME_COVER);

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      {
        name: "Tous les salaires bruts mensuels convertis en net",
        path: GROSS_TO_NET_HUB_PATH,
      },
      { name: "Tableau", path },
    ],
    cover: HOME_COVER,
    faq: [...faq],
    withAuthor: true,
    dateModified: GROSS_TO_NET_UPDATED_AT,
    datePublished: GROSS_TO_NET_UPDATED_AT,
  });

  return {
    path,
    canonical,
    updatedAt: GROSS_TO_NET_UPDATED_AT,
    hubPath: GROSS_TO_NET_HUB_PATH,
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
          id: "gross",
          full: "Salaire brut mensuel",
          short: "Brut",
        },
        {
          id: "nonExecutive",
          full: "Net non-cadre",
          short: "Non-cadre",
        },
        {
          id: "executive",
          full: "Net cadre",
          short: "Cadre",
        },
        {
          id: "publicService",
          full: "Net fonction publique",
          short: "Public",
        },
      ] as const,
      intro:
        "Estimations avant prélèvement à la source pour les trois profils du simulateur. Cliquez un brut pour ouvrir la fiche détaillée.",
      rows,
      footnote:
        "Montants arrondis selon les coefficients du simulateur Brut vers Net. Ces montants constituent des estimations : le montant réellement versé peut varier selon votre situation et les cotisations appliquées sur votre bulletin de paie.",
    },
    rowCount: rows.length,
    jsonLd,
  };
}
