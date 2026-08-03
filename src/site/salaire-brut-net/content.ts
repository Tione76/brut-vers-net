import {
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
} from "./config";
import type { GrossToNetEstimate } from "./data";
import { formatGrossShort } from "./data";

type ProfileEstimates = {
  nonExecutive: GrossToNetEstimate;
  executive: GrossToNetEstimate;
  publicService: GrossToNetEstimate;
};

/**
 * Textes du modèle pilote 1 000 € brut → net.
 * Seuls le montant cible et les chiffres calculés sont adaptés lors de la généralisation.
 */
export function buildGrossToNetEditorial(
  grossMonthly: number,
  estimates: ProfileEstimates,
) {
  const grossLabel = formatGrossShort(grossMonthly);
  const nonCadreNet = formatGrossShort(Math.round(estimates.nonExecutive.netMonthly));
  const cadreNet = formatGrossShort(Math.round(estimates.executive.netMonthly));
  const publicNet = formatGrossShort(Math.round(estimates.publicService.netMonthly));

  return [
    {
      id: "non-cadre",
      title: `À combien correspondent ${grossLabel} brut en net pour un salarié non-cadre ?`,
      paragraphs: [
        `Pour un salarié non-cadre, notre estimation applique un écart moyen d'environ 22 % entre le salaire brut et le salaire net. Avec ce repère, ${grossLabel} bruts correspondent à environ ${nonCadreNet} nets par mois.`,
        `Ce coefficient sert surtout à cadrer une offre ou un entretien : il ne détaille pas chaque ligne de cotisations du bulletin.`,
        `Contrat, primes, convention collective ou temps partiel peuvent écarter le résultat de cette moyenne. Le bulletin de salaire reste la référence.`,
      ],
    },
    {
      id: "cadre",
      title: `À combien correspondent ${grossLabel} brut en net pour un salarié cadre ?`,
      paragraphs: [
        `Chez un salarié cadre, l'écart moyen retenu par l'outil est d'environ 25 %. À brut égal, le net estimé est donc un peu plus bas : comptez près de ${cadreNet} pour ${grossLabel} bruts mensuels.`,
        `Retraite complémentaire, accords d'entreprise et primes font varier ce ratio. Gardez ce montant comme un ordre de grandeur, pas comme une promesse de fiche de paie.`,
        `Pour affiner, lancez le simulateur avec votre brut réel et le profil cadre.`,
      ],
    },
    {
      id: "fonction-publique",
      title: `À combien correspondent ${grossLabel} brut en net dans la fonction publique ?`,
      paragraphs: [
        `Dans la fonction publique, l'estimation repose sur un écart moyen simplifié d'environ 19 %. Pour ${grossLabel} bruts, le net tourne autour de ${publicNet} par mois avant prélèvement à la source.`,
        `Indemnités, versant (État, territorial, hospitalier) et régimes particuliers peuvent modifier nettement le résultat.`,
        `Dès que vous disposez de votre grille ou de votre traitement indiciaire, affinez le calcul dans le simulateur.`,
      ],
    },
  ] as const;
}

export function buildGrossToNetFaqItems(
  grossMonthly: number,
  estimates: ProfileEstimates,
) {
  const grossLabel = formatGrossShort(grossMonthly);
  const nonCadre = formatGrossShort(Math.round(estimates.nonExecutive.netMonthly));
  const cadre = formatGrossShort(Math.round(estimates.executive.netMonthly));
  const publicService = formatGrossShort(Math.round(estimates.publicService.netMonthly));

  return [
    {
      question: `Quel salaire net pour ${grossLabel} brut par mois ?`,
      answer: `Selon le profil, comptez environ ${nonCadre} nets pour un salarié non-cadre, ${cadre} pour un cadre et ${publicService} pour un agent de la fonction publique. Ces montants correspondent à ${grossLabel} bruts mensuels, avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi le salaire net diffère-t-il selon le statut ?",
      answer:
        "Les cotisations salariales ne sont pas les mêmes pour un non-cadre, un cadre ou un agent de la fonction publique. Nous utilisons des coefficients moyens alignés sur le simulateur, utiles pour un ordre de grandeur, pas pour reproduire une fiche de paie.",
    },
    {
      question: "Comment obtenir un calcul personnalisé de mon salaire brut en net ?",
      answer:
        "Pour un calcul personnalisé, utilisez notre calculateur de salaire brut et net : indiquez votre brut ou votre net, choisissez votre profil et ajustez le temps de travail ou le prélèvement à la source. Le bulletin de salaire reste la référence officielle.",
    },
  ];
}

/** Phrase d'autorité en bas de fiche (réutilisable sur toute la série). */
export const GROSS_TO_NET_AUTHORITY_NOTE =
  "Les estimations présentées sur cette page sont calculées à partir des coefficients utilisés par notre simulateur. Seul un bulletin de salaire permet de connaître le salaire net exact.";

export function buildGrossToNetSeoMeta(grossMonthly: number) {
  const grossLabel = formatGrossShort(grossMonthly);

  return {
    title: `${grossLabel} brut par mois : combien en net ?`,
    description: `À combien correspondent ${grossLabel} brut par mois en net ? Estimation selon votre statut (non-cadre, cadre ou fonction publique), puis calcul gratuit.`,
    h1: `Quel salaire net mensuel pour ${grossLabel} brut par mois ?`,
    subtitle: `Découvrez immédiatement le salaire net estimé correspondant à ${grossLabel} brut par mois selon votre statut.`,
    answerH2: `Quel salaire net pour ${grossLabel} brut par mois ?`,
  };
}

export function grossToNetBreadcrumbLabel(grossMonthly: number): string {
  return `${formatGrossShort(grossMonthly)} brut en net`;
}

function isPublishedGrossToNetAmount(value: number): boolean {
  return (PUBLISHED_GROSS_TO_NET_AMOUNTS as readonly number[]).includes(value);
}

/**
 * Ordre de priorité des montants proches (préparé pour la future série par pas de 50 €).
 * La page courante est exclue ; seuls les montants publiés sont liés.
 */
const NEARBY_PREFERRED = [
  1050, 1100, 1150, 1200, 1250, 1300, 1500, 2000, 2500, 3000,
] as const;

export function getNearbyGrossToNetAmounts(grossMonthly: number): number[] {
  const ordered: number[] = [];
  for (const amount of NEARBY_PREFERRED) {
    if (
      amount !== grossMonthly &&
      isPublishedGrossToNetAmount(amount) &&
      !ordered.includes(amount)
    ) {
      ordered.push(amount);
    }
  }
  for (const amount of PUBLISHED_GROSS_TO_NET_AMOUNTS) {
    if (amount !== grossMonthly && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  return ordered.slice(0, 7);
}

export function getNearbyGrossToNetLinks(grossMonthly: number) {
  return getNearbyGrossToNetAmounts(grossMonthly).map((amount) => ({
    href: grossToNetPath(amount),
    label: `${formatGrossShort(amount)} brut en net`,
  }));
}
