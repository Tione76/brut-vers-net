import { formatCurrency } from "@/site/salary-calculator/parsing";
import {
  isNetToGrossAmount,
  NET_TO_GROSS_AMOUNTS,
  type NetToGrossAmount,
} from "./config";
import type { NetToGrossEstimate } from "./data";
import { formatNetShort } from "./data";

type ProfileEstimates = {
  nonExecutive: NetToGrossEstimate;
  executive: NetToGrossEstimate;
  publicService: NetToGrossEstimate;
};

/**
 * Textes du modèle validé (page 1 500 €).
 * Seuls le montant cible et les chiffres calculés sont adaptés.
 */
export function buildSeriesEditorial(netMonthly: number, estimates: ProfileEstimates) {
  const netLabel = formatNetShort(netMonthly);
  const nonCadreGross = formatCurrency(estimates.nonExecutive.grossMonthly);
  const cadreGross = formatCurrency(estimates.executive.grossMonthly);
  const publicGross = formatCurrency(estimates.publicService.grossMonthly);
  const cadreAnnual = formatCurrency(estimates.executive.grossAnnual);
  const publicAnnual = formatCurrency(estimates.publicService.grossAnnual);

  return [
    {
      id: "non-cadre",
      title: `Quel salaire brut pour toucher ${netLabel} net en tant que salarié non-cadre ?`,
      paragraphs: [
        `Notre estimation applique un écart moyen d'environ 22 % entre le salaire brut et le salaire net pour un salarié non-cadre. C'est le coefficient simplifié utilisé par notre outil, pas un taux de cotisations réellement prélevé sur chaque bulletin.`,
        `Avec ce repère, pour approcher ${netLabel} nets, le brut mensuel se situe autour de ${nonCadreGross}. Ce chiffre aide surtout à cadrer une offre ou un entretien.`,
        `Le contrat, les primes, la convention collective ou un temps partiel peuvent écarter le résultat de cette moyenne. Le bulletin de salaire reste la référence.`,
      ],
    },
    {
      id: "cadre",
      title: `Quel salaire brut pour toucher ${netLabel} net en tant que salarié cadre ?`,
      paragraphs: [
        `Pour un salarié cadre, notre outil applique un écart moyen d'environ 25 % entre brut et net. Là encore, il s'agit d'un coefficient moyen simplifié servant à l'estimation, pas d'une lecture ligne à ligne des cotisations.`,
        `À net égal, le brut estimé est donc plus élevé : comptez près de ${cadreGross} pour viser ${netLabel} nets, soit environ ${cadreAnnual} sur 12 mois.`,
        `Retraite complémentaire, accords d'entreprise et primes font varier ce ratio. Traitez ce montant comme un ordre de grandeur, pas comme une promesse de fiche de paie.`,
      ],
    },
    {
      id: "fonction-publique",
      title: `Quel salaire brut pour toucher ${netLabel} net dans la fonction publique ?`,
      paragraphs: [
        `Pour la fonction publique, notre estimation repose sur un écart moyen simplifié d'environ 19 % entre le salaire brut et le salaire net. Ce coefficient est celui du simulateur ; il ne reproduit pas chaque retenue d'un traitement indiciaire.`,
        `Pour environ ${netLabel} nets, le brut estimé tourne autour de ${publicGross}, soit près de ${publicAnnual} sur 12 mois.`,
        `Indemnités, versant (État, territorial, hospitalier) et régimes particuliers peuvent modifier nettement le résultat. Affinez avec le simulateur dès que vous disposez de votre grille.`,
      ],
    },
  ] as const;
}

export function buildSeriesFaqItems(netMonthly: number, estimates: ProfileEstimates) {
  const netLabel = formatNetShort(netMonthly);
  const nonCadre = formatCurrency(estimates.nonExecutive.grossMonthly);
  const cadre = formatCurrency(estimates.executive.grossMonthly);
  const publicService = formatCurrency(estimates.publicService.grossMonthly);

  return [
    {
      question: `Combien faut-il gagner en brut pour toucher ${netLabel} net ?`,
      answer: `Selon le profil, comptez environ ${nonCadre} bruts pour un salarié non-cadre, ${cadre} pour un cadre et ${publicService} pour un agent de la fonction publique. Ces montants visent ${netLabel} nets avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi ce montant est-il une estimation ?",
      answer:
        "Les cotisations réelles dépendent de votre contrat, de votre convention, des primes et parfois d'un régime particulier. Nous utilisons des coefficients moyens alignés sur le simulateur, utiles pour un ordre de grandeur, pas pour reproduire une fiche de paie.",
    },
    {
      question: "Comment obtenir un calcul parfaitement personnalisé ?",
      answer:
        "Pour un calcul parfaitement personnalisé, utilisez notre calculateur de salaire brut et net : indiquez votre brut ou votre net, choisissez votre profil et ajustez le temps de travail ou le prélèvement à la source. Le bulletin de salaire reste la référence officielle.",
    },
  ];
}

/**
 * Ordre de priorité des montants proches (modèle 1 500 € + jalons 3 100 → 6 000).
 * La page courante est exclue ; on complète ensuite avec le reste de la série.
 * Aligné sur `FUTURE_NEARBY_PREFERRED` (anciens brouillons, désormais publiés).
 */
const NEARBY_PREFERRED = [
  1600, 1700, 1800, 1900, 2000, 2500, 3000, 1500, 2100, 2200, 2300, 2400, 2600, 2700, 2800,
  2900, 3500, 4000, 4500, 5000, 5500, 6000, 3100, 3200, 3300, 3400, 3600, 3700, 3800, 3900,
  4100, 4200, 4300, 4400, 4600, 4700, 4800, 4900, 5100, 5200, 5300, 5400, 5600, 5700, 5800,
  5900,
] as const;

export function getSeriesNearbyAmounts(netMonthly: number): NetToGrossAmount[] {
  const ordered: number[] = [];
  for (const amount of NEARBY_PREFERRED) {
    if (amount !== netMonthly && isNetToGrossAmount(amount) && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  for (const amount of NET_TO_GROSS_AMOUNTS) {
    if (amount !== netMonthly && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  return ordered.slice(0, 7) as NetToGrossAmount[];
}

export function seriesBreadcrumbLabel(netMonthly: number): string {
  return `${formatNetShort(netMonthly)} net en brut`;
}

const TITLE_SUFFIX = " | Calcul gratuit";
/** Seuil indicatif d'affichage Google pour le title. */
const TITLE_MAX_VISIBLE_CHARS = 60;

export function buildSeriesSeoMeta(netMonthly: number) {
  const netLabel = formatNetShort(netMonthly);
  const titleBase = `Quel salaire brut mensuel pour toucher ${netLabel} net ?`;
  const titleWithSuffix = `${titleBase}${TITLE_SUFFIX}`;
  const title =
    [...titleWithSuffix].length <= TITLE_MAX_VISIBLE_CHARS ? titleWithSuffix : titleBase;

  return {
    title,
    description: `À combien correspond un salaire de ${netLabel} net par mois en salaire brut ? Consultez immédiatement l'estimation selon votre statut, puis calculez gratuitement votre salaire brut ou net avec notre simulateur.`,
    h1: `Combien faut-il gagner en brut par mois pour toucher ${netLabel} net ?`,
    answerH2: `Quel salaire brut mensuel correspond à ${netLabel} net ?`,
  };
}

/** Compatibilité avec l'API page modèle 1 500 €. */
export const buildPage1500Editorial = (estimates: ProfileEstimates) =>
  buildSeriesEditorial(1500, estimates);
export const buildPage1500FaqItems = (estimates: ProfileEstimates) =>
  buildSeriesFaqItems(1500, estimates);
export const buildPage1500SeoMeta = () => buildSeriesSeoMeta(1500);
export const page1500BreadcrumbLabel = () => seriesBreadcrumbLabel(1500);
export const PAGE_1500_NEARBY_AMOUNTS = getSeriesNearbyAmounts(1500);
