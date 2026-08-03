import {
  GROSS_PRIME_AMOUNTS,
  grossPrimePath,
  isGrossPrimeAmount,
  type GrossPrimeAmount,
} from "./config";
import type { GrossPrimeEstimate } from "./data";
import { formatPrimeNet, formatPrimeShort } from "./data";

type ProfileEstimates = {
  nonExecutive: GrossPrimeEstimate;
  executive: GrossPrimeEstimate;
  publicService: GrossPrimeEstimate;
};

/**
 * Textes du modèle pilote 10 € (prime brute → net).
 * Seuls le montant cible et les chiffres calculés changent lors de la généralisation.
 */
export function buildGrossPrimeEditorial(grossPrime: number, estimates: ProfileEstimates) {
  const grossLabel = formatPrimeShort(grossPrime);
  const nonCadreNet = formatPrimeNet(estimates.nonExecutive.netPrime);
  const cadreNet = formatPrimeNet(estimates.executive.netPrime);
  const publicNet = formatPrimeNet(estimates.publicService.netPrime);

  return [
    {
      id: "non-cadre",
      title: `Quelle prime nette pour ${grossLabel} bruts chez un salarié non-cadre ?`,
      paragraphs: [
        `Pour un salarié non-cadre, notre estimation applique un écart moyen d'environ 22 % entre le brut et le net. Une prime de ${grossLabel} bruts correspond donc à environ ${nonCadreNet} nets, avant prélèvement à la source.`,
        `Ce repère sert surtout à cadrer une gratification ou un bonus ponctuel. Il ne détaille pas chaque ligne de cotisations du bulletin.`,
        `Le type de prime, la convention collective ou un temps partiel peuvent faire varier le résultat. Le bulletin de salaire reste la référence.`,
      ],
    },
    {
      id: "cadre",
      title: `Quelle prime nette pour ${grossLabel} bruts chez un salarié cadre ?`,
      paragraphs: [
        `Chez un salarié cadre, l'écart moyen retenu par l'outil est d'environ 25 %. À prime brute égale, le net est donc un peu plus bas : comptez près de ${cadreNet} pour ${grossLabel} bruts.`,
        `Retraite complémentaire et accords d'entreprise influencent ce ratio. Traitez ce montant comme un ordre de grandeur, pas comme une promesse de fiche de paie.`,
        `Pour comparer plusieurs montants de prime, utilisez le mini-calculateur ou le simulateur dédié.`,
      ],
    },
    {
      id: "fonction-publique",
      title: `Quelle prime nette pour ${grossLabel} bruts dans la fonction publique ?`,
      paragraphs: [
        `Dans la fonction publique, l'estimation repose sur un écart moyen simplifié d'environ 19 %. Pour ${grossLabel} bruts, le net tourne autour de ${publicNet} avant prélèvement à la source.`,
        `Indemnités, versant (État, territorial, hospitalier) et régimes particuliers peuvent modifier nettement le résultat.`,
        `Dès que vous disposez de votre grille ou de votre traitement, affinez le calcul dans le simulateur.`,
      ],
    },
  ] as const;
}

export function buildGrossPrimeFaqItems(grossPrime: number, estimates: ProfileEstimates) {
  const grossLabel = formatPrimeShort(grossPrime);
  const nonCadre = formatPrimeNet(estimates.nonExecutive.netPrime);
  const cadre = formatPrimeNet(estimates.executive.netPrime);
  const publicService = formatPrimeNet(estimates.publicService.netPrime);

  return [
    {
      question: `Quelle prime nette pour une prime brute de ${grossLabel} ?`,
      answer: `Selon le profil, comptez environ ${nonCadre} nets pour un salarié non-cadre, ${cadre} pour un cadre et ${publicService} pour un agent de la fonction publique. Ces montants correspondent à une prime de ${grossLabel} bruts, avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi le montant net d'une prime varie-t-il selon le statut ?",
      answer:
        "Les cotisations salariales ne sont pas les mêmes pour un non-cadre, un cadre ou un agent de la fonction publique. Nous utilisons des coefficients moyens alignés sur le simulateur, utiles pour un ordre de grandeur, pas pour reproduire une fiche de paie.",
    },
    {
      question: "Comment calculer précisément une autre prime brute en net ?",
      answer:
        "Pour un calcul personnalisé, utilisez notre calculateur de prime brute en net situé plus haut sur cette page. Indiquez simplement le montant de votre prime brute et choisissez votre statut (non-cadre, cadre ou fonction publique). Le résultat est calculé immédiatement.",
    },
  ];
}

/** Phrase d'autorité en bas de fiche (réutilisable sur toute la série). */
export const GROSS_PRIME_AUTHORITY_NOTE =
  "Les estimations présentées sur cette page sont calculées à partir des coefficients utilisés par notre simulateur. Seul un bulletin de salaire permet de connaître le montant net exact d'une prime.";

export function buildGrossPrimeSeoMeta(grossPrime: number) {
  const grossLabel = formatPrimeShort(grossPrime);

  return {
    title: `Prime brute de ${grossLabel} : combien en net ?`,
    description: `À combien correspondent ${grossLabel} de prime brute en net ? Consultez l'estimation de la prime nette selon votre statut, puis calculez avec notre simulateur.`,
    h1: `Prime brute de ${grossLabel} : combien touche-t-on en net ?`,
    subtitle: `Découvrez immédiatement combien représente une prime brute de ${grossLabel} en net selon votre statut (non-cadre, cadre ou fonction publique).`,
    answerH2: `À combien correspondent ${grossLabel} de prime brute en net ?`,
    cardsIntro: "Estimation de votre prime nette selon votre statut.",
  };
}

export function grossPrimeBreadcrumbLabel(grossPrime: number): string {
  return `Prime brute de ${formatPrimeShort(grossPrime)} en net`;
}

const NEARBY_PREFERRED = [20, 30, 40, 50, 100, 150, 200, 250, 300] as const;

export function getNearbyGrossPrimeAmounts(grossPrime: number): GrossPrimeAmount[] {
  const ordered: number[] = [];
  for (const amount of NEARBY_PREFERRED) {
    if (amount !== grossPrime && isGrossPrimeAmount(amount) && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  for (const amount of GROSS_PRIME_AMOUNTS) {
    if (amount !== grossPrime && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  return ordered.slice(0, 7) as GrossPrimeAmount[];
}

export function getNearbyGrossPrimeLinks(grossPrime: number) {
  return getNearbyGrossPrimeAmounts(grossPrime).map((amount) => ({
    href: grossPrimePath(amount),
    label: `Prime brute de ${formatPrimeShort(amount)} en net`,
  }));
}
