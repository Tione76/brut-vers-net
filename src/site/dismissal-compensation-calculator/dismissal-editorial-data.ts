import { formatCurrency } from "@/site/salary-calculator";
import { calculateDismissalCompensation, calculateLegalBaseAmount } from "./engine";
import type { DismissalCompensationInput } from "./types";

/**
 * Date de dernière vérification éditoriale du contenu de la page.
 * À mettre à jour manuellement après contrôle du texte et des règles affichées.
 * Ne pas dériver automatiquement du build ni de la date du jour.
 */
export const DISMISSAL_CONTENT_REVIEW_DATE = "2026-07-16";

/** Alias partagé par le contenu visible et le JSON-LD. */
export const DISMISSAL_EDITORIAL_UPDATED_AT = DISMISSAL_CONTENT_REVIEW_DATE;

export interface DismissalFaqItem {
  question: string;
  answer: string;
}

function exampleInput(
  overrides: Partial<DismissalCompensationInput> = {},
): DismissalCompensationInput {
  return {
    situation: "standard",
    seniorityYears: "4",
    seniorityMonths: "0",
    average12Months: "2000",
    average3Months: "",
    professionalUnfitnessAverage3Months: "",
    hasBonus: false,
    bonusAmount: "",
    bonusKind: "annual",
    specialSituations: [],
    ...overrides,
  };
}

export function exampleFourYears2000() {
  return calculateDismissalCompensation(exampleInput());
}

export function exampleTwelveYearsNineMonths2500() {
  return calculateDismissalCompensation(
    exampleInput({
      seniorityYears: "12",
      seniorityMonths: "9",
      average12Months: "2500",
      average3Months: "2500",
    }),
  );
}

const ex4 = exampleFourYears2000();
const ex129 = exampleTwelveYearsNineMonths2500();

export const example4YearsAmount = ex4 ? formatCurrency(ex4.retainedAmount) : "2 000,00 €";
export const example129Amount = ex129 ? formatCurrency(ex129.retainedAmount) : "8 541,67 €";
export const example129FirstBracketAmount = ex129
  ? formatCurrency(ex129.firstBracketAmount)
  : "6 250,00 €";
export const example129SecondBracketAmount = ex129
  ? formatCurrency(ex129.secondBracketAmount)
  : "2 291,67 €";

export const dismissalFaq: DismissalFaqItem[] = [
  {
    question: "Comment calculer son indemnité de licenciement ?",
    answer:
      "L'indemnité légale se calcule à partir du salaire mensuel de référence le plus favorable et de l'ancienneté. Jusqu'à 10 ans, on applique un quart de mois de salaire par année. Au-delà, on ajoute un tiers de mois de salaire par année supplémentaire, en tenant compte des mois complets.",
  },
  {
    question: "Quel salaire brut est retenu ?",
    answer:
      "Dans le cas général, le salaire de référence correspond à la formule la plus avantageuse pour le salarié : la moyenne mensuelle brute des 12 derniers mois ou le tiers de la rémunération brute des 3 derniers mois. Certaines primes peuvent être prises en compte au prorata.",
  },
  {
    question: "Faut-il utiliser les 3 ou les 12 derniers mois ?",
    answer:
      "Les deux moyennes sont utiles. Le simulateur compare automatiquement les deux et conserve la plus élevée dans le cas standard. Si seule une moyenne est connue, saisissez au moins celle-ci.",
  },
  {
    question: "Les primes sont-elles prises en compte ?",
    answer:
      "Oui, lorsqu'elles entrent dans le salaire de référence. Une prime annuelle est en général proratisée (montant annuel divisé par 12) pour la moyenne des trois mois. Une prime exceptionnelle versée sur la période peut être répartie sur trois mois.",
  },
  {
    question: "Comment les mois supplémentaires d'ancienneté sont-ils pris en compte ?",
    answer:
      "Les années complètes et les mois complets supplémentaires sont pris en compte. Les mois supplémentaires sont calculés proportionnellement. En revanche, de simples jours isolés ne doivent pas être assimilés automatiquement à un mois complet.",
  },
  {
    question: "Ai-je droit à une indemnité avec moins de 8 mois d'ancienneté ?",
    answer:
      "Dans le cas général, l'indemnité légale de licenciement est ouverte à partir de 8 mois d'ancienneté ininterrompue chez le même employeur. Une convention collective ou une situation particulière peut toutefois prévoir une règle plus favorable.",
  },
  {
    question: "Quelle indemnité après 10 ans d'ancienneté ?",
    answer: `Après 10 ans, le calcul se fait en deux tranches : 1/4 de mois de salaire par année jusqu'à 10 ans, puis 1/3 de mois de salaire pour chaque année (et mois complets) au-delà. Par exemple, avec 2 500 € de référence et 12 ans et 9 mois, l'estimation légale est d'environ ${example129Amount}.`,
  },
  {
    question: "La convention collective peut-elle être plus favorable ?",
    answer:
      "Oui. Votre convention collective, votre contrat de travail ou un usage dans l'entreprise peut prévoir une indemnité plus favorable que le minimum légal. Le calculateur présenté sur cette page estime uniquement l'indemnité légale minimale. Vérifiez donc les dispositions applicables à votre situation.",
  },
  {
    question: "L'indemnité de préavis est-elle incluse ?",
    answer:
      "Non. L'indemnité compensatrice de préavis est distincte de l'indemnité de licenciement. Ce simulateur estime uniquement l'indemnité légale minimale (ou spéciale en cas d'inaptitude professionnelle).",
  },
  {
    question: "Les congés payés restants sont-ils inclus ?",
    answer:
      "Non. L'indemnité compensatrice de congés payés n'est pas incluse dans cette estimation. Elle figure généralement séparément sur le solde de tout compte.",
  },
  {
    question: "Une faute grave ouvre-t-elle droit à une indemnité ?",
    answer:
      "Dans le cas général, la faute grave ou la faute lourde prive le salarié de l'indemnité légale de licenciement. Des dispositions conventionnelles plus favorables peuvent toutefois exister.",
  },
  {
    question: "Que se passe-t-il en cas d'inaptitude professionnelle ?",
    answer:
      "Lorsque l'inaptitude a une origine professionnelle (accident du travail ou maladie professionnelle), une indemnité spéciale minimale correspondant au double de l'indemnité légale peut être due, sauf disposition plus favorable. Le salaire de référence obéit alors à une règle particulière. Une indemnité compensatrice de préavis peut s'y ajouter ; elle n'est pas incluse dans le montant principal du calculateur.",
  },
  {
    question: "Le calculateur fonctionne-t-il pour un CDD ?",
    answer:
      "Non. Cette version concerne principalement les salariés en CDI du secteur privé. Les règles d'indemnité de fin de CDD sont différentes.",
  },
  {
    question: "Le calculateur remplace-t-il un conseil juridique ?",
    answer:
      "Non. Il s'agit d'une estimation indicative du minimum légal. Votre situation peut dépendre de votre convention collective, de votre contrat, d'absences ou d'un contentieux. En cas de doute, consultez un professionnel.",
  },
  {
    question: "Comment calculer l'indemnité si j'ai travaillé à temps plein et à temps partiel ?",
    answer:
      "Le calcul doit généralement être effectué proportionnellement à la durée de chaque période travaillée à temps plein et à temps partiel. Le calculateur simplifié ne reconstitue pas automatiquement cette répartition et signale donc que le résultat doit être vérifié.",
  },
  {
    question: "Un arrêt maladie ou un congé parental peut-il modifier le calcul ?",
    answer:
      "Oui, selon la nature et la date de la période concernée, l'ancienneté retenue ou le salaire de référence peut nécessiter une adaptation. Si votre parcours comporte ce type de situation, le résultat du calculateur reste indicatif.",
  },
];

export function editorialBracketExample() {
  return calculateLegalBaseAmount(2000, 4);
}
