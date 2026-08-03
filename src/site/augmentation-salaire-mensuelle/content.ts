import {
  isMonthlyIncreaseAmount,
  MONTHLY_INCREASE_AMOUNTS,
  monthlyIncreasePath,
  type MonthlyIncreaseAmount,
} from "./config";
import type { MonthlyIncreaseEstimate } from "./data";
import { formatIncreaseShort } from "./data";

type ProfileEstimates = {
  nonExecutive: MonthlyIncreaseEstimate;
  executive: MonthlyIncreaseEstimate;
  publicService: MonthlyIncreaseEstimate;
};

/**
 * Textes de la fiche pilote 50 € (série augmentations mensuelles).
 * Seuls le montant cible et les chiffres calculés sont adaptés lors de la généralisation.
 */
export function buildMonthlyIncreaseEditorial(
  grossMonthlyIncrease: number,
  estimates: ProfileEstimates,
) {
  const grossLabel = formatIncreaseShort(grossMonthlyIncrease);
  const nonCadreNet = formatIncreaseShort(Math.round(estimates.nonExecutive.netMonthlyGain));
  const cadreNet = formatIncreaseShort(Math.round(estimates.executive.netMonthlyGain));
  const publicNet = formatIncreaseShort(Math.round(estimates.publicService.netMonthlyGain));

  return [
    {
      id: "non-cadre",
      title: `Que rapporte une augmentation mensuelle de ${grossLabel} brut pour un salarié non-cadre ?`,
      paragraphs: [
        `Pour un salarié non-cadre, notre simulateur applique un écart moyen d'environ 22 % entre le brut et le net. Une hausse de ${grossLabel} bruts se traduit donc par un gain net estimé d'environ ${nonCadreNet} par mois, avant prélèvement à la source.`,
        `Ce coefficient simplifié sert à cadrer une négociation ou une offre. Il ne reproduit pas chaque ligne de cotisations de votre bulletin.`,
        `Primes, temps partiel ou convention collective peuvent faire varier le résultat. Affinez avec le calculateur dès que vous connaissez votre salaire actuel.`,
      ],
    },
    {
      id: "cadre",
      title: `Que rapporte une augmentation mensuelle de ${grossLabel} brut pour un salarié cadre ?`,
      paragraphs: [
        `Chez un salarié cadre, l'écart moyen retenu par l'outil est d'environ 25 %. À hausse brute égale, le gain net est donc un peu plus faible : comptez près de ${cadreNet} nets pour ${grossLabel} bruts mensuels.`,
        `Retraite complémentaire et accords d'entreprise influencent ce ratio. Traitez ce montant comme un ordre de grandeur, pas comme une promesse de fiche de paie.`,
        `Pour comparer plusieurs scénarios (euros ou pourcentage), utilisez le calculateur d'augmentation avec votre brut actuel.`,
      ],
    },
    {
      id: "fonction-publique",
      title: `Que rapporte une augmentation mensuelle de ${grossLabel} brut dans la fonction publique ?`,
      paragraphs: [
        `Pour la fonction publique, l'estimation repose sur un écart moyen simplifié d'environ 19 %. Une hausse de ${grossLabel} bruts correspond ainsi à environ ${publicNet} nets par mois avant prélèvement à la source.`,
        `Indemnités, versant (État, territorial, hospitalier) et régimes particuliers peuvent modifier nettement le résultat.`,
        `Dès que vous disposez de votre traitement indiciaire, affinez la simulation dans le calculateur dédié.`,
      ],
    },
  ] as const;
}

export function buildMonthlyIncreaseFaqItems(
  grossMonthlyIncrease: number,
  estimates: ProfileEstimates,
) {
  const grossLabel = formatIncreaseShort(grossMonthlyIncrease);
  const nonCadre = formatIncreaseShort(Math.round(estimates.nonExecutive.netMonthlyGain));
  const cadre = formatIncreaseShort(Math.round(estimates.executive.netMonthlyGain));
  const publicService = formatIncreaseShort(Math.round(estimates.publicService.netMonthlyGain));

  return [
    {
      question: `Quel est le gain net d'une augmentation de ${grossLabel} brut ?`,
      answer: `Selon le profil, comptez environ ${nonCadre} nets pour un salarié non-cadre, ${cadre} pour un cadre et ${publicService} pour un agent de la fonction publique. Ces gains correspondent à ${grossLabel} bruts mensuels, avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi le gain net diffère-t-il selon le statut ?",
      answer:
        "Les cotisations salariales ne sont pas les mêmes pour un non-cadre, un cadre ou un agent de la fonction publique. Nous utilisons des coefficients moyens alignés sur le simulateur, utiles pour un ordre de grandeur, pas pour reproduire une fiche de paie.",
    },
    {
      question: "Comment obtenir un calcul personnalisé de mon augmentation ?",
      answer:
        "Pour un calcul personnalisé, utilisez notre calculateur d'augmentation de salaire : indiquez votre salaire actuel, le montant de la hausse et votre profil. Le bulletin de salaire reste la référence officielle.",
    },
  ];
}

export function buildMonthlyIncreaseSeoMeta(grossMonthlyIncrease: number) {
  const grossLabel = formatIncreaseShort(grossMonthlyIncrease);

  return {
    title: `Augmentation mensuelle de ${grossLabel} brut : combien en net ?`,
    description: `Combien rapporte une augmentation mensuelle de ${grossLabel} brut en net ? Découvrez immédiatement le gain selon votre statut (non-cadre, cadre ou fonction publique) et estimez gratuitement votre augmentation.`,
    h1: `Une augmentation mensuelle de ${grossLabel} brut : combien en net ?`,
    answerH2: `Combien rapporte une augmentation mensuelle de ${grossLabel} brut en net ?`,
  };
}

export function monthlyIncreaseBreadcrumbLabel(grossMonthlyIncrease: number): string {
  return `Augmentation mensuelle de ${formatIncreaseShort(grossMonthlyIncrease)} brut`;
}

/**
 * Ordre de priorité des montants proches (préparé pour la future série).
 * La page courante est exclue ; seuls les montants publiés sont liés.
 */
const NEARBY_PREFERRED = [
  100, 150, 200, 250, 300, 350, 400, 450, 500, 75, 25,
] as const;

export function getNearbyMonthlyIncreaseAmounts(
  grossMonthlyIncrease: number,
): MonthlyIncreaseAmount[] {
  const ordered: number[] = [];
  for (const amount of NEARBY_PREFERRED) {
    if (
      amount !== grossMonthlyIncrease &&
      isMonthlyIncreaseAmount(amount) &&
      !ordered.includes(amount)
    ) {
      ordered.push(amount);
    }
  }
  for (const amount of MONTHLY_INCREASE_AMOUNTS) {
    if (amount !== grossMonthlyIncrease && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  return ordered.slice(0, 7) as MonthlyIncreaseAmount[];
}

export function getNearbyMonthlyIncreaseLinks(grossMonthlyIncrease: number) {
  return getNearbyMonthlyIncreaseAmounts(grossMonthlyIncrease).map((amount) => ({
    href: monthlyIncreasePath(amount),
    label: `Augmentation mensuelle de ${formatIncreaseShort(amount)} brut`,
  }));
}
