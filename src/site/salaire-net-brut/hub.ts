/**
 * Contenu publié du hub « Tous les salaires nets mensuels convertis en brut ».
 * Intention : navigation / accès aux fiches (pas de tableau de comparaison).
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { siteConfig } from "@/site/site.config";
import {
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_INDEX_PATH,
  NET_TO_GROSS_UPDATED_AT,
  PUBLISHED_NET_TO_GROSS_AMOUNTS,
  netToGrossPath,
} from "./config";
import { formatNetShort } from "./data";
import { buildNetToGrossHubOgImageInput } from "./og-image-meta";

function formatCoefficientFr(coefficient: number): string {
  return coefficient.toFixed(2).replace(".", ",");
}

function retentionPercentFromCoefficient(coefficient: number): number {
  return Math.round((1 - coefficient) * 100);
}

export interface NetToGrossHubFicheLink {
  amount: number;
  href: string;
  label: string;
}

export function netToGrossHubFicheDomId(amount: number): string {
  return `hub-fiche-${amount}`;
}

export interface NetToGrossHubRange {
  id: string;
  from: number;
  to: number;
  title: string;
  links: NetToGrossHubFicheLink[];
}

/**
 * Regroupe le catalogue publié par tranches de 500 €
 * (ex. 1 500→2 000, 2 100→2 500, …).
 */
export function buildNetToGrossHubRanges(
  catalog: readonly number[] = PUBLISHED_NET_TO_GROSS_AMOUNTS,
): NetToGrossHubRange[] {
  const sorted = [...new Set(catalog)].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return [];
  }

  const ranges: NetToGrossHubRange[] = [];
  let index = 0;
  let rangeEnd =
    sorted[0]! % 500 === 0 ? sorted[0]! + 500 : Math.ceil(sorted[0]! / 500) * 500;

  while (index < sorted.length) {
    const links: NetToGrossHubFicheLink[] = [];
    while (index < sorted.length && sorted[index]! <= rangeEnd) {
      const amount = sorted[index]!;
      links.push({
        amount,
        href: netToGrossPath(amount),
        label: `${formatNetShort(amount)} net en brut`,
      });
      index += 1;
    }

    if (links.length > 0) {
      const from = links[0]!.amount;
      const to = links[links.length - 1]!.amount;
      ranges.push({
        id: `hub-range-${from}-${to}`,
        from,
        to,
        title: `De ${formatNetShort(from)} à ${formatNetShort(to)} net`,
        links,
      });
    }

    rangeEnd += 500;
    if (index < sorted.length && sorted[index]! > rangeEnd) {
      const next = sorted[index]!;
      rangeEnd = next % 500 === 0 ? next : Math.ceil(next / 500) * 500;
    }
  }

  return ranges;
}

export function buildNetToGrossHubSeo() {
  return {
    title: "Salaire net en brut : tous les montants mensuels",
    description:
      "Accédez à toutes les fiches de conversion salaire net mensuel en brut, au calculateur personnalisé et au tableau comparatif selon votre profil.",
    h1: "Tous les salaires nets mensuels convertis en brut",
    subtitle:
      "Accédez à toutes nos fiches de conversion net-brut et trouvez directement le montant de salaire qui vous intéresse.",
  };
}

export function buildNetToGrossHubFaq() {
  return [
    {
      question: "Quelle fiche choisir pour convertir mon salaire net en brut ?",
      answer:
        "Sélectionnez le montant net mensuel correspondant, ou le montant publié le plus proche. Chaque fiche détaille l'estimation selon votre profil. Pour un montant exact hors liste, utilisez le calculateur principal.",
    },
    {
      question: "Les fiches net-brut utilisent-elles le même calcul que le simulateur ?",
      answer:
        "Oui. Les fiches s'appuient sur les mêmes coefficients moyens que le simulateur Brut vers Net. Ce sont des estimations avant prélèvement à la source, utiles pour un ordre de grandeur.",
    },
    {
      question: "Que faire si mon salaire net n'apparaît pas dans la liste ?",
      answer:
        "Ouvrez le calculateur principal, saisissez votre salaire net exact et votre profil. Vous obtenez une estimation personnalisée, même si aucune fiche n'existe encore pour ce montant.",
    },
    {
      question: "Le salaire brut affiché tient-il compte du prélèvement à la source ?",
      answer:
        "Non. Les estimations des fiches sont avant prélèvement à la source. Le net réellement versé dépend ensuite notamment de votre taux personnalisé ou neutre, calculable dans le simulateur.",
    },
  ] as const;
}

export function buildNetToGrossHubMethodology() {
  const nonExecutive = getProfileCoefficient("nonExecutive");
  const executive = getProfileCoefficient("executive");
  const publicService = getProfileCoefficient("publicService");

  return {
    id: "methode",
    title: "Comment sont calculées les estimations net-brut ?",
    paragraphs: [
      "Les fiches utilisent les mêmes coefficients moyens que le simulateur Brut vers Net. Elles estiment le brut avant prélèvement à la source pour trois profils, à partir d'un salaire net cible.",
      `Salarié non-cadre : environ ${retentionPercentFromCoefficient(nonExecutive)} % de retenues (coefficient × ${formatCoefficientFr(nonExecutive)}). Salarié cadre : environ ${retentionPercentFromCoefficient(executive)} % (× ${formatCoefficientFr(executive)}). Fonction publique : environ ${retentionPercentFromCoefficient(publicService)} % (× ${formatCoefficientFr(publicService)}).`,
      "Ce sont des ordres de grandeur. Contrat, primes, temps partiel ou régime particulier peuvent modifier le résultat. Le bulletin de paie reste la référence pour le montant réellement versé.",
    ],
    guideLink: {
      href: "/guides/comment-calculer-son-salaire-net",
      label: "Comment calculer son salaire net ?",
    },
  } as const;
}

export function buildNetToGrossHubPayload() {
  const path = NET_TO_GROSS_HUB_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildNetToGrossHubSeo();
  const faq = buildNetToGrossHubFaq();
  const methodology = buildNetToGrossHubMethodology();
  const ranges = buildNetToGrossHubRanges();
  const ficheLinks = ranges.flatMap((range) => range.links);
  const ogImage = buildNetToGrossHubOgImageInput();

  const jsonLd = buildWebPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL, path },
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
    indexPath: NET_TO_GROSS_INDEX_PATH,
    calculatorPath: "/",
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
    findSection: {
      title: "Trouvez votre salaire net",
      intro:
        "Sélectionnez votre salaire net mensuel pour accéder directement à sa fiche détaillée et découvrir son équivalent brut estimé selon votre profil.",
    },
    paths: [
      {
        id: "calculator",
        title: "Calculer votre salaire brut",
        text: "Indiquez votre salaire net et votre profil pour obtenir une estimation personnalisée.",
        cta: "Calculer mon salaire net en brut",
        href: "/",
      },
      {
        id: "index",
        title: "Comparer plusieurs salaires",
        text: "Consultez le tableau complet pour comparer les estimations non-cadre, cadre et fonction publique.",
        cta: "Voir le tableau net → brut",
        href: NET_TO_GROSS_INDEX_PATH,
      },
    ] as const,
    catalog: {
      title: "Tous les salaires nets mensuels",
      intro:
        "Les fiches sont disponibles par pas de 100 €. Choisissez votre montant net mensuel pour consulter son estimation détaillée.",
      ranges,
    },
    methodology,
    furtherLinks: [
      {
        href: "/",
        label: "Calculateur salaire brut vers net",
      },
      {
        href: NET_TO_GROSS_INDEX_PATH,
        label: "Tableau salaire net en brut",
      },
      {
        href: "/guides/comment-calculer-son-salaire-net",
        label: "Comment calculer son salaire net ?",
      },
      {
        href: "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
        label: "Pourquoi le salaire brut est-il plus élevé que le salaire net ?",
      },
    ] as const,
    faq,
    ficheLinks,
    catalogCount: ficheLinks.length,
    jsonLd,
  };
}
