/**
 * Contenu publié du hub « Tous les salaires bruts mensuels convertis en net ».
 * Intention : navigation / accès aux fiches (pas de tableau de comparaison).
 */

import { getCanonicalUrl } from "@/framework/seo/metadata";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { siteConfig } from "@/site/site.config";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  GROSS_TO_NET_UPDATED_AT,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
} from "./config";
import { formatGrossShort } from "./data";

function formatCoefficientFr(coefficient: number): string {
  return coefficient.toFixed(2).replace(".", ",");
}

function retentionPercentFromCoefficient(coefficient: number): number {
  return Math.round((1 - coefficient) * 100);
}

export interface GrossToNetHubFicheLink {
  amount: number;
  href: string;
  label: string;
}

/** Identifiant DOM d'une fiche dans le catalogue Hub. */
export function grossToNetHubFicheDomId(amount: number): string {
  return `hub-fiche-${amount}`;
}

export interface GrossToNetHubRange {
  id: string;
  from: number;
  to: number;
  title: string;
  links: GrossToNetHubFicheLink[];
}

/**
 * Regroupe le catalogue publié par tranches de 500 €
 * (ex. 1 000→1 500, 1 550→2 000, puis 3 550→4 000 si publié plus tard).
 */
export function buildGrossToNetHubRanges(
  catalog: readonly number[] = PUBLISHED_GROSS_TO_NET_AMOUNTS,
): GrossToNetHubRange[] {
  const sorted = [...new Set(catalog)].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return [];
  }

  const ranges: GrossToNetHubRange[] = [];
  let index = 0;
  let rangeEnd =
    sorted[0]! % 500 === 0 ? sorted[0]! + 500 : Math.ceil(sorted[0]! / 500) * 500;

  while (index < sorted.length) {
    const links: GrossToNetHubFicheLink[] = [];
    while (index < sorted.length && sorted[index]! <= rangeEnd) {
      const amount = sorted[index]!;
      links.push({
        amount,
        href: grossToNetPath(amount),
        label: `${formatGrossShort(amount)} brut en net`,
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
        title: `De ${formatGrossShort(from)} à ${formatGrossShort(to)} brut`,
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

export function buildGrossToNetHubSeo() {
  return {
    title: "Salaire brut mensuel en net : toutes les fiches",
    description:
      "Accédez à toutes les fiches de conversion salaire brut mensuel en net, au calculateur personnalisé et au tableau comparatif selon votre profil.",
    h1: "Tous les salaires bruts mensuels convertis en net",
    subtitle:
      "Accédez à toutes nos fiches de conversion brut-net et trouvez directement le montant de salaire qui vous intéresse.",
  };
}

export function buildGrossToNetHubFaq() {
  return [
    {
      question: "Quelle fiche choisir pour convertir mon salaire brut en net ?",
      answer:
        "Sélectionnez le montant brut mensuel correspondant, ou le montant publié le plus proche. Chaque fiche détaille l'estimation selon votre profil. Pour un montant exact hors liste, utilisez le calculateur principal.",
    },
    {
      question: "Les fiches brut-net utilisent-elles le même calcul que le simulateur ?",
      answer:
        "Oui. Les fiches s'appuient sur les mêmes coefficients moyens que le simulateur Brut vers Net. Ce sont des estimations avant prélèvement à la source, utiles pour un ordre de grandeur.",
    },
    {
      question: "Que faire si mon salaire brut n'apparaît pas dans la liste ?",
      answer:
        "Ouvrez le calculateur principal, saisissez votre salaire brut exact et votre profil. Vous obtenez une estimation personnalisée, même si aucune fiche n'existe encore pour ce montant.",
    },
    {
      question: "Le salaire net affiché tient-il compte du prélèvement à la source ?",
      answer:
        "Non. Les estimations des fiches sont avant prélèvement à la source. Le net réellement versé dépend ensuite notamment de votre taux personnalisé ou neutre, calculable dans le simulateur.",
    },
  ] as const;
}

/** @deprecated Le Hub n'affiche plus ces blocs introductifs. */
export function buildGrossToNetHubEditorial() {
  return [] as const;
}

export function buildGrossToNetHubMethodology() {
  const nonExecutive = getProfileCoefficient("nonExecutive");
  const executive = getProfileCoefficient("executive");
  const publicService = getProfileCoefficient("publicService");

  return {
    id: "methode",
    title: "Comment sont calculées les estimations brut-net ?",
    paragraphs: [
      "Les fiches utilisent les mêmes coefficients moyens que le simulateur Brut vers Net. Elles estiment le net avant prélèvement à la source pour trois profils.",
      `Salarié non-cadre : environ ${retentionPercentFromCoefficient(nonExecutive)} % de retenues (coefficient × ${formatCoefficientFr(nonExecutive)}). Salarié cadre : environ ${retentionPercentFromCoefficient(executive)} % (× ${formatCoefficientFr(executive)}). Fonction publique : environ ${retentionPercentFromCoefficient(publicService)} % (× ${formatCoefficientFr(publicService)}).`,
      "Ce sont des ordres de grandeur. Contrat, primes, temps partiel ou régime particulier peuvent modifier le résultat. Le bulletin de paie reste la référence pour le montant réellement versé.",
    ],
    guideLink: {
      href: "/guides/comment-calculer-son-salaire-net",
      label: "Comment calculer son salaire net ?",
    },
  } as const;
}

export function buildGrossToNetHubPayload() {
  const path = GROSS_TO_NET_HUB_PATH;
  const canonical = getCanonicalUrl(siteConfig.url, path);
  const seo = buildGrossToNetHubSeo();
  const faq = buildGrossToNetHubFaq();
  const methodology = buildGrossToNetHubMethodology();
  const ranges = buildGrossToNetHubRanges();
  const ficheLinks = ranges.flatMap((range) => range.links);
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
    faq: [...faq],
    withAuthor: true,
    dateModified: GROSS_TO_NET_UPDATED_AT,
    datePublished: GROSS_TO_NET_UPDATED_AT,
  });

  return {
    path,
    canonical,
    updatedAt: GROSS_TO_NET_UPDATED_AT,
    indexPath: GROSS_TO_NET_INDEX_PATH,
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
      title: "Trouvez votre salaire brut",
      intro:
        "Sélectionnez votre salaire brut mensuel pour accéder directement à sa fiche détaillée et découvrir son équivalent net estimé selon votre profil.",
    },
    paths: [
      {
        id: "calculator",
        title: "Calculer votre salaire net",
        text: "Indiquez votre salaire brut et votre profil pour obtenir une estimation personnalisée.",
        cta: "Calculer mon salaire brut en net",
        href: "/",
      },
      {
        id: "index",
        title: "Comparer plusieurs salaires",
        text: "Consultez le tableau complet pour comparer les estimations non-cadre, cadre et fonction publique.",
        cta: "Voir le tableau brut → net",
        href: GROSS_TO_NET_INDEX_PATH,
      },
    ] as const,
    catalog: {
      title: "Tous les salaires bruts mensuels",
      intro:
        "Les fiches sont disponibles par pas de 50 €. Choisissez votre montant brut mensuel pour consulter son estimation détaillée.",
      ranges,
    },
    methodology,
    furtherLinks: [
      {
        href: "/",
        label: "Calculateur salaire brut vers net",
      },
      {
        href: GROSS_TO_NET_INDEX_PATH,
        label: "Tableau salaire brut en net",
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
