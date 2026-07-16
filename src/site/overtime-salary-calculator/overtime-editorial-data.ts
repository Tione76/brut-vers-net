import {
  WORK_TIME_PERCENT,
  calculateSalary,
  formatCurrency,
  roundCent,
} from "@/site/salary-calculator";
import { calculateOvertimeSalary } from "./engine";
import { OVERTIME_CONFIG_2026 } from "./overtime/2026/config";
import type { OvertimeSalaryInput } from "./types";

export const OVERTIME_EDITORIAL_UPDATED_AT = OVERTIME_CONFIG_2026.lastReviewedAt;

export interface OvertimeFaqItem {
  question: string;
  answer: string;
}

export interface OvertimePracticalExample {
  title: string;
  situation: string;
  input: string;
  estimate: string;
  verify: string;
}

function exampleInput(overrides: Partial<OvertimeSalaryInput> = {}): OvertimeSalaryInput {
  return {
    referenceField: "grossMonthly",
    salaryValue: "2500",
    profile: "nonExecutive",
    group1Hours: "8",
    group2Hours: "2",
    majorationMode: "legal",
    majorationGroup1Percent: "25",
    majorationGroup2Percent: "50",
    projectionMode: "thisMonth",
    projectionMonths: 1,
    ...overrides,
  };
}

export function exampleTenHoursNonExecutive() {
  return calculateOvertimeSalary(
    exampleInput({
      group1Hours: "10",
      group2Hours: "0",
    }),
  );
}

export function exampleEightPlusTwo() {
  return calculateOvertimeSalary(exampleInput());
}

export function formatEditorialEuro(value: number): string {
  return formatCurrency(value);
}

/** Exemple pédagogique : 2 500 € brut, 1 heure à 25 %. */
export function exampleOneHourAt25() {
  const hourly = roundCent(2500 / 151.67);
  const grossHour = roundCent(hourly * 1.25);
  return { hourly, grossHour };
}

function buildCaseCard(
  title: string,
  grossMonthly: number,
  group1Hours: string,
  group2Hours: string,
): OvertimePracticalExample | null {
  const result = calculateOvertimeSalary(
    exampleInput({
      salaryValue: String(grossMonthly),
      group1Hours,
      group2Hours,
    }),
  );
  if (!result) {
    return null;
  }

  const hoursLabel =
    Number(group2Hours) > 0
      ? `${group1Hours} h à 25 % et ${group2Hours} h à 50 %`
      : `${group1Hours} h à 25 %`;

  return {
    title,
    situation: `Salarié non-cadre à ${formatEditorialEuro(grossMonthly)} brut mensuel, hors heures supplémentaires.`,
    input: `Saisir ${hoursLabel} sur le mois, avec les taux légaux.`,
    estimate: `Environ ${formatEditorialEuro(result.overtimeGrossTotal)} brut et ${formatEditorialEuro(result.overtimeNetGain)} net avant prélèvement à la source. Nouveau salaire net estimé : ${formatEditorialEuro(result.newNetMonthly)} / mois.`,
    verify:
      "Comparer avec votre bulletin : la répartition 25 % / 50 % dépend du décompte semaine par semaine.",
  };
}

export function buildOvertimePracticalCases(): OvertimePracticalExample[] {
  return [
    buildCaseCard("Salarié à 2 000 € brut", 2000, "8", "0"),
    buildCaseCard("Salarié à 2 500 € brut", 2500, "8", "2"),
    buildCaseCard("Salarié à 3 000 € brut", 3000, "10", "0"),
  ].filter((item): item is OvertimePracticalExample => item !== null);
}

const tenHours = exampleTenHoursNonExecutive();
const eightPlusTwo = exampleEightPlusTwo();

export const tenHoursNet = tenHours
  ? formatEditorialEuro(tenHours.overtimeNetGain)
  : "environ 160 €";
export const tenHoursGross = tenHours
  ? formatEditorialEuro(tenHours.overtimeGrossTotal)
  : "environ 206 €";
export const eightPlusTwoNet = eightPlusTwo
  ? formatEditorialEuro(eightPlusTwo.overtimeNetGain)
  : "environ 180 €";
export const eightPlusTwoGross = eightPlusTwo
  ? formatEditorialEuro(eightPlusTwo.overtimeGrossTotal)
  : "environ 230 €";

export const overtimeFaq: OvertimeFaqItem[] = [
  {
    question: "Comment calculer les heures supplémentaires sur un salaire mensuel ?",
    answer:
      "Divisez d'abord votre salaire brut mensuel de base (hors heures supplémentaires) par 151,67 pour obtenir le taux horaire brut. Multipliez ensuite chaque heure par ce taux, majoré de 25 % ou 50 % selon le cas, puis additionnez les montants. Ce calculateur d'heures supplémentaires estime aussi le passage au net, avec la réduction de cotisations salariales propre aux heures supplémentaires.",
  },
  {
    question: "Les heures supplémentaires sont-elles payées à 25 % ou 50 % ?",
    answer:
      "En l'absence d'accord différent, les huit premières heures supplémentaires de la semaine sont généralement majorées de 25 %, puis les suivantes de 50 %. Une convention collective ou un accord d'entreprise peut prévoir d'autres taux, sans descendre normalement sous 10 %. Sur votre fiche de paie, les quantités à 25 % et à 50 % sont déjà réparties semaine par semaine.",
  },
  {
    question: "Comment calculer une heure supplémentaire à 25 % ?",
    answer:
      "Prenez votre taux horaire brut de base, puis multipliez-le par 1,25. Par exemple, avec un taux de 16,48 €, une heure à 25 % vaut environ 20,60 € brut. Ce montant brut n'est pas intégralement versé en net : des cotisations restent dues, avec une réduction salariale spécifique.",
  },
  {
    question: "Comment calculer une heure supplémentaire à 50 % ?",
    answer:
      "Multipliez votre taux horaire brut de base par 1,50. Avec un taux de 16,48 €, une heure à 50 % vaut environ 24,72 € brut. Dans le régime légal, ce taux s'applique généralement aux heures accomplies au-delà de la 43e heure de la semaine.",
  },
  {
    question: "Les heures supplémentaires sont-elles calculées par semaine ou par mois ?",
    answer:
      "Elles sont normalement décomptées par semaine, et non en additionnant simplement toutes les heures du mois. C'est pourquoi ce calculateur vous demande séparément le total d'heures à 25 % et celui à 50 % figurant sur votre relevé ou votre bulletin du mois.",
  },
  {
    question: "Quel salaire sert de base au calcul ?",
    answer:
      "Le salaire de base hors heures supplémentaires. Indiquez votre brut mensuel habituel, ou votre net avant prélèvement à la source si vous ne connaissez que celui-ci. Le simulateur reconstitue alors le brut de référence avec le moteur Brut vers Net.",
  },
  {
    question: "Les heures supplémentaires sont-elles imposables ?",
    answer: `Elles peuvent être exonérées d'impôt sur le revenu dans la limite d'un plafond annuel de rémunération nette imposable (documentation consultée : ${formatCurrency(OVERTIME_CONFIG_2026.incomeTaxExemptionAnnualCeiling)} pour les revenus concernés). Au-delà du plafond, ou selon votre situation, une fraction peut rester imposable. Vérifiez votre bulletin de paie et votre avis d'imposition.`,
  },
  {
    question: "Les heures supplémentaires sont-elles soumises aux cotisations ?",
    answer:
      "Oui, mais elles bénéficient d'une réduction de cotisations salariales. L'Urssaf indique notamment un taux maximal de réduction de 11,31 % dans son exemple 2026 lorsque les taux de droit commun s'appliquent. Ce n'est pas une exonération totale de cotisations.",
  },
  {
    question: "Une convention collective peut-elle prévoir un autre taux ?",
    answer:
      "Oui. Un accord d'entreprise ou une convention collective peut prévoir des taux de majoration différents. Le taux ne peut normalement pas être inférieur à 10 %. Vérifiez votre contrat, votre convention ou votre fiche de paie.",
  },
  {
    question: "Les heures supplémentaires augmentent-elles le prélèvement à la source ?",
    answer:
      "Le gain affiché par ce calculateur est estimé avant prélèvement à la source. Selon votre situation fiscale et le cumul annuel déjà exonéré, une partie des heures supplémentaires peut rester non imposée. Le traitement exact figure sur votre bulletin de paie.",
  },
  {
    question: "Puis-je utiliser ce calculateur si je travaille à temps partiel ?",
    answer:
      "Non pour cette première version. Le simulateur concerne les salariés à temps plein du secteur privé sur une base de 35 heures. Les heures complémentaires du temps partiel suivent des règles différentes.",
  },
  {
    question: "Le résultat remplace-t-il la fiche de paie ?",
    answer:
      "Non. Il s'agit d'une estimation et d'une simulation indicative. Votre fiche de paie reste la référence : primes, accords d'entreprise, organisation du temps de travail et plafonds peuvent faire varier le montant réellement versé.",
  },
  {
    question: "Les heures supplémentaires de nuit sont-elles majorées ?",
    answer:
      "Oui, le travail de nuit peut donner droit à des majorations ou contreparties spécifiques, distinctes de la majoration classique des heures supplémentaires. Ces règles dépendent du code du travail, de votre convention collective et de votre entreprise. Ce calculateur ne simule pas encore le travail de nuit.",
  },
  {
    question: "Les heures supplémentaires du dimanche sont-elles mieux payées ?",
    answer:
      "Le travail du dimanche peut être majoré ou compensé selon votre secteur et votre convention collective. Cette majoration s'ajoute parfois à celle des heures supplémentaires. Vérifiez votre bulletin ou votre accord d'entreprise : le simulateur actuel ne couvre pas ce cas particulier.",
  },
  {
    question: "Les heures supplémentaires comptent-elles pour la retraite ?",
    answer:
      "Oui, en règle générale, la rémunération des heures supplémentaires entre dans l'assiette de cotisations retraite, sous réserve des règles applicables. La réduction de cotisations salariales spécifique aux heures supplémentaires ne signifie pas qu'elles sont exclues de la carrière. Votre fiche de paie et vos relevés de carrière restent la référence.",
  },
  {
    question: "Les heures supplémentaires sont-elles obligatoires ?",
    answer:
      "L'employeur peut demander des heures supplémentaires dans le respect des limites légales et conventionnelles. Le salarié peut refuser dans certains cas, notamment si la demande est abusive ou incompatible avec des obligations importantes. En cas de doute, consultez votre convention collective ou un conseil compétent.",
  },
];

/** Vérifie que le moteur Brut vers Net reste cohérent pour l'éditorial. */
export function baseNetForEditorialGross(
  grossMonthly: number,
  profile: "nonExecutive" | "executive",
) {
  return (
    calculateSalary({
      activeInput: "grossMonthly",
      activeValue: String(grossMonthly).replace(".", ","),
      profile,
      workTimePercent: WORK_TIME_PERCENT.default,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    })?.netMonthly ?? null
  );
}
