import { formatCurrency } from "@/site/salary-calculator";
import { calculateDismissalCompensation, calculateLegalBaseAmount } from "./engine";
import { DISMISSAL_CONFIG } from "./config";
import type { DismissalCompensationInput } from "./types";

export const DISMISSAL_EDITORIAL_UPDATED_AT = DISMISSAL_CONFIG.lastReviewedAt;

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
    hasBonus: false,
    bonusAmount: "",
    bonusKind: "annual",
    conventionKnowledge: "unknown",
    conventionAmount: "",
    mixedWorkTime: false,
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

export const example4YearsAmount = ex4
  ? formatCurrency(ex4.retainedAmount)
  : "2 000,00 €";
export const example129Amount = ex129
  ? formatCurrency(ex129.retainedAmount)
  : "8 541,67 €";

export const dismissalFaq: DismissalFaqItem[] = [
  {
    question: "Comment calculer son indemnité de licenciement ?",
    answer:
      "L'indemnité légale se calcule à partir du salaire mensuel de référence le plus favorable et de l'ancienneté. Jusqu'à 10 ans, on applique un quart de mois de salaire par année. Au-delà, on ajoute un tiers de mois de salaire par année supplémentaire, en tenant compte des mois complets.",
  },
  {
    question: "Quel salaire brut est retenu ?",
    answer:
      "Le calcul compare la moyenne mensuelle brute des 12 derniers mois (ou de tous les mois travaillés si l'ancienneté est inférieure à 12 mois) et la moyenne des 3 derniers mois. La méthode la plus avantageuse pour le salarié est retenue.",
  },
  {
    question: "Faut-il utiliser les 3 ou les 12 derniers mois ?",
    answer:
      "Les deux moyennes sont utiles. Le simulateur compare automatiquement les deux et conserve la plus élevée. Si seule une moyenne est connue, saisissez au moins celle-ci.",
  },
  {
    question: "Les primes sont-elles prises en compte ?",
    answer:
      "Oui, lorsqu'elles entrent dans le salaire de référence. Une prime annuelle est en général proratisée (montant annuel divisé par 12) pour la moyenne des trois mois. Une prime exceptionnelle versée sur la période peut être répartie sur trois mois.",
  },
  {
    question: "Les mois incomplets d'ancienneté comptent-ils ?",
    answer:
      "Les mois complets au-delà des années pleines sont pris en compte proportionnellement. Par exemple, 6 mois valent 6/12 d'année. Les fractions de mois non complètes ne sont en principe pas retenues dans ce calcul simplifié.",
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
      "Oui. Votre convention collective, votre contrat ou un usage d'entreprise peut prévoir une indemnité plus élevée que le minimum légal. Le calculateur permet de comparer un montant conventionnel connu avec l'estimation légale.",
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
      "Lorsque l'inaptitude a une origine professionnelle (accident du travail ou maladie professionnelle), une indemnité spéciale minimale correspondant au double de l'indemnité légale peut être due. Une indemnité compensatrice de préavis peut s'y ajouter ; elle n'est pas incluse ici.",
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
];

export function editorialBracketExample() {
  return calculateLegalBaseAmount(2000, 4);
}
