import { monthlyToAnnual } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_SALARY_MONTHS,
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

function formatEditorialEuro(value: number): string {
  return `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
}

function timesTwelveHint(
  monthlyDisplayed: number,
  annualDisplayed: number,
  suffix = "",
): string {
  const approximate = monthlyDisplayed * GROSS_TO_NET_SALARY_MONTHS !== annualDisplayed;
  return `${approximate ? "≈ " : ""}${formatEditorialEuro(monthlyDisplayed)} × ${GROSS_TO_NET_SALARY_MONTHS} mois${suffix}`;
}

export const GROSS_TO_NET_TAX_H2 = "Le salaire net estimé est-il avant ou après impôt ?";

export const GROSS_TO_NET_TAX_SECTION_ID = "avant-ou-apres-impot";

export const GROSS_TO_NET_TAX_CALCULATOR_LABEL = "calculateur de salaire brut en net";

export function buildGrossToNetTaxParagraphs() {
  return [
    "Les montants affichés sont estimés avant impôt. Les cotisations salariales sont déduites, mais pas le prélèvement à la source.",
    "Le montant versé sur votre compte peut donc être inférieur si un impôt est retenu. Sur votre bulletin, ce prélèvement est calculé à partir du net imposable, qui peut différer du net avant impôt.",
    `Vous souhaitez connaître votre salaire après impôt ? Utilisez notre ${GROSS_TO_NET_TAX_CALCULATOR_LABEL} et renseignez votre taux de prélèvement à la source pour estimer le montant versé sur votre compte.`,
  ] as const;
}

export function splitGrossToNetTaxCalculatorParagraph(paragraph: string): {
  before: string;
  after: string;
} | null {
  const index = paragraph.indexOf(GROSS_TO_NET_TAX_CALCULATOR_LABEL);
  if (index === -1) return null;
  return {
    before: paragraph.slice(0, index),
    after: paragraph.slice(index + GROSS_TO_NET_TAX_CALCULATOR_LABEL.length),
  };
}

export function grossToNetAnnualSectionId(grossMonthly: number): string {
  return `${grossMonthly}-brut-par-mois-par-an`;
}

export function buildGrossToNetAnnualH2(grossMonthly: number): string {
  return `${formatEditorialEuro(grossMonthly)} brut par mois : combien par an ?`;
}

export function buildGrossToNetAnnualCopy(
  grossMonthly: number,
  estimates: ProfileEstimates,
) {
  const grossAnnual = monthlyToAnnual(grossMonthly, GROSS_TO_NET_SALARY_MONTHS);
  const netMonthly = estimates.nonExecutive.netMonthly;
  const netAnnual = estimates.nonExecutive.netAnnual;
  const grossMonthlyDisplayed = Math.round(grossMonthly);
  const grossAnnualDisplayed = Math.round(grossAnnual);
  const netMonthlyDisplayed = Math.round(netMonthly);
  const netAnnualDisplayed = Math.round(netAnnual);
  const grossMonthlyLabel = formatEditorialEuro(grossMonthlyDisplayed);
  const grossAnnualLabel = formatEditorialEuro(grossAnnualDisplayed);
  const netMonthlyLabel = formatEditorialEuro(netMonthlyDisplayed);
  const netAnnualLabel = formatEditorialEuro(netAnnualDisplayed);

  return {
    h2: buildGrossToNetAnnualH2(grossMonthly),
    sectionId: grossToNetAnnualSectionId(grossMonthly),
    paragraphs: [
      `Un salaire de ${grossMonthlyLabel} brut par mois représente ${grossAnnualLabel} brut par an, sur la base de ${GROSS_TO_NET_SALARY_MONTHS} mensualités, sans prime ni treizième mois.`,
      `Pour un salarié non-cadre, cela correspond à environ ${netAnnualLabel} net par an avant impôt, soit ${netMonthlyLabel} net par mois selon les coefficients du simulateur.`,
    ],
    grossCard: {
      label: "Salaire brut annuel",
      value: grossAnnualLabel,
      hint: timesTwelveHint(grossMonthlyDisplayed, grossAnnualDisplayed),
    },
    netCard: {
      label: "Salaire net annuel estimé (non-cadre)",
      value: netAnnualLabel,
      hint: timesTwelveHint(
        netMonthlyDisplayed,
        netAnnualDisplayed,
        ", avant prélèvement à la source",
      ),
    },
    grossAnnual,
    netAnnual,
    netMonthly,
  };
}

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

/**
 * Montants proches : voisins les plus proches dans le catalogue publié (max 7, sans auto-lien).
 */
export function getNearbyGrossToNetAmounts(
  grossMonthly: number,
  catalog: readonly number[] = PUBLISHED_GROSS_TO_NET_AMOUNTS,
): number[] {
  return catalog
    .filter((amount) => amount !== grossMonthly)
    .slice()
    .sort((a, b) => {
      const distanceA = Math.abs(a - grossMonthly);
      const distanceB = Math.abs(b - grossMonthly);
      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }
      return a - b;
    })
    .slice(0, 7);
}

export function getNearbyGrossToNetLinks(grossMonthly: number) {
  return getNearbyGrossToNetAmounts(grossMonthly).map((amount) => ({
    href: grossToNetPath(amount),
    label: `${formatGrossShort(amount)} brut en net`,
  }));
}
