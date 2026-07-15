import { formatCurrency } from "@/site/salary-calculator";
import type { FaqItem } from "@/framework/types";
import type { EmploymentProfile, SalaryMonths } from "@/site/salary-calculator/types";
import { calculateSalaryIncrease } from "./engine";
import type { IncreaseType, SalaryIncreaseInput } from "./types";

export const SALARY_INCREASE_EDITORIAL_UPDATED_AT = "2026-07-15";

export const INCREASE_CASE_CALCULATOR_HINT =
  "Testez ce scénario directement dans le calculateur situé en haut de cette page.";

const BASE_SALARY = "2500";

function simulateIncrease(
  increaseType: IncreaseType,
  increaseValue: string,
  options: {
    profile?: EmploymentProfile;
    salaryMonths?: SalaryMonths;
  } = {},
) {
  const input: SalaryIncreaseInput = {
    referenceField: "grossMonthly",
    currentSalaryValue: BASE_SALARY,
    profile: options.profile ?? "nonExecutive",
    salaryMonths: options.salaryMonths ?? 12,
    increaseType,
    increaseReferenceField: increaseType === "euros" ? "grossMonthlyIncrease" : null,
    increaseValue,
    withholdingRateMode: "auto",
    manualWithholdingRate: 0,
  };

  return calculateSalaryIncrease(input);
}

export function formatEditorialEuro(value: number): string {
  return formatCurrency(value);
}

export interface IncreasePracticalCase {
  title: string;
  situation: string;
  input: string;
  estimate: string;
  verify: string;
  calculatorHint: string;
}

export function buildIncreasePracticalCases(): IncreasePracticalCase[] {
  const ex100 = simulateIncrease("euros", "100");
  const ex200 = simulateIncrease("euros", "200");
  const ex5 = simulateIncrease("percent", "5");
  const ex10 = simulateIncrease("percent", "10");
  const ex200On13 = simulateIncrease("euros", "200", { salaryMonths: 13 });
  const ex200Executive = simulateIncrease("euros", "200", { profile: "executive" });

  return [
    {
      title: "Que représente une augmentation de 100 € brut ?",
      situation: `Sur ${formatEditorialEuro(Number(BASE_SALARY))} brut mensuels (non-cadre, 12 mois).`,
      input: "Augmentation de 100 € brut par mois.",
      estimate: ex100
        ? `Gain net avant prélèvement : environ ${formatEditorialEuro(ex100.gain.netMonthly)} / mois. Net après prélèvement : environ ${formatEditorialEuro(ex100.gain.netAfterTaxMonthly)} / mois.`
        : "Utilisez le simulateur avec votre salaire actuel.",
      verify: "Profil professionnel et taux de prélèvement à la source.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
    {
      title: "Que représente une augmentation de 200 € brut ?",
      situation: `Même base : ${formatEditorialEuro(Number(BASE_SALARY))} brut mensuels.`,
      input: "Augmentation de 200 € brut par mois.",
      estimate: ex200
        ? `Environ ${formatEditorialEuro(ex200.gain.netMonthly)} net avant prélèvement / mois, soit ${formatEditorialEuro(ex200.gain.netAnnual)} sur 12 mois.`
        : "Saisissez vos chiffres dans le calculateur.",
      verify: "Primes, avantages et convention collective.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
    {
      title: "Une augmentation de 5 %",
      situation: `5 % appliqués à ${formatEditorialEuro(Number(BASE_SALARY))} brut mensuels.`,
      input: "Type « En pourcentage », valeur 5.",
      estimate: ex5
        ? `Environ ${formatEditorialEuro(ex5.gain.grossMonthly)} brut / mois, soit ${formatEditorialEuro(ex5.gain.netMonthly)} net avant prélèvement / mois.`
        : "Testez le pourcentage dans le simulateur.",
      verify: "Un même pourcentage produit un montant brut différent selon votre salaire.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
    {
      title: "Une augmentation de 10 %",
      situation: `10 % sur ${formatEditorialEuro(Number(BASE_SALARY))} brut mensuels (non-cadre).`,
      input: "Augmentation en pourcentage : 10.",
      estimate: ex10
        ? `Gain brut d'environ ${formatEditorialEuro(ex10.gain.grossMonthly)} / mois, gain net avant prélèvement d'environ ${formatEditorialEuro(ex10.gain.netMonthly)} / mois.`
        : "Adaptez le pourcentage à votre situation.",
      verify: "Plafonds de cotisations et statut cadre ou non-cadre.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
    {
      title: "Une augmentation sur 13 mois",
      situation: `+200 € brut / mois, rémunération sur 13 mois.`,
      input: "200 € brut mensuels, nombre de mois : 13.",
      estimate: ex200On13
        ? `Gain net annuel avant prélèvement : environ ${formatEditorialEuro(ex200On13.gain.netAnnual)} (13 mois).`
        : "Indiquez votre nombre de mois dans le formulaire.",
      verify: "Prime annuelle, treizième mois ou lissage employeur.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
    {
      title: "Augmentation en euros ou en pourcentage ?",
      situation: "200 € fixes ou 5 % : deux logiques différentes.",
      input: "Comparez les deux modes dans le simulateur.",
      estimate: ex200Executive && ex200
        ? `200 € brut : environ ${formatEditorialEuro(ex200.gain.netMonthly)} net / mois (non-cadre) et ${formatEditorialEuro(ex200Executive.gain.netMonthly)} (cadre). Le pourcentage suit votre salaire actuel.`
        : "Le mode euros convient à une promesse chiffrée ; le pourcentage à une revalorisation proportionnelle.",
      verify: "Négociation en net, impact annuel et coût employeur.",
      calculatorHint: INCREASE_CASE_CALCULATOR_HINT,
    },
  ];
}

export function example200NonExecutive() {
  return simulateIncrease("euros", "200");
}

export function example200Executive() {
  return simulateIncrease("euros", "200", { profile: "executive" });
}

export function example5PercentNonExecutive() {
  return simulateIncrease("percent", "5");
}

export interface QuickReferenceRow {
  grossLabel: string;
  netEstimate: string;
}

function formatApproxNetMonthly(value: number | undefined): string {
  if (value === undefined) return "—";
  return `≈ ${formatEditorialEuro(value)} / mois`;
}

/** Repères rapides pour le tableau récapitulatif (base 2 500 €, non-cadre, 12 mois) */
export function buildQuickReferenceRows(): QuickReferenceRow[] {
  const ex100 = simulateIncrease("euros", "100");
  const ex200 = simulateIncrease("euros", "200");
  const ex300 = simulateIncrease("euros", "300");
  const ex5 = simulateIncrease("percent", "5");

  return [
    { grossLabel: "+100 €", netEstimate: formatApproxNetMonthly(ex100?.gain.netMonthly) },
    { grossLabel: "+200 €", netEstimate: formatApproxNetMonthly(ex200?.gain.netMonthly) },
    { grossLabel: "+300 €", netEstimate: formatApproxNetMonthly(ex300?.gain.netMonthly) },
    {
      grossLabel: `+5 % (sur ${formatEditorialEuro(Number(BASE_SALARY))})`,
      netEstimate: formatApproxNetMonthly(ex5?.gain.netMonthly),
    },
  ];
}

/** Fourchette indicative du gain net pour +200 € brut (base 2 500 €) */
export function format200EuroNetRange(): string {
  const nonExec = example200NonExecutive();
  const exec = example200Executive();
  if (!nonExec || !exec) return "entre 140 € et 160 € nets avant prélèvement";
  const low = Math.min(nonExec.gain.netMonthly, exec.gain.netMonthly);
  const high = Math.max(nonExec.gain.netMonthly, exec.gain.netMonthly);
  return `entre ${formatEditorialEuro(low)} et ${formatEditorialEuro(high)} nets avant prélèvement`;
}

export const salaryIncreaseFaq: FaqItem[] = [
  {
    question: "Comment calculer une augmentation de salaire ?",
    answer:
      "Partez de votre salaire actuel (brut ou net), indiquez l'augmentation en euros ou en pourcentage, choisissez votre profil et le nombre de mois. Le simulateur compare la situation avant et après, puis affiche le gain net mensuel et annuel. C'est une estimation indicative, pas une fiche de paie.",
  },
  {
    question: "200 € brut de plus, combien en net ?",
    answer:
      "Le gain net est inférieur à 200 €, car les cotisations salariales s'appliquent aussi sur la part augmentée. Sur 2 500 € brut mensuels (non-cadre), comptez environ 156 € net avant prélèvement et un peu moins net après prélèvement à la source. Saisissez vos propres montants pour un résultat personnalisé.",
  },
  {
    question: "Une augmentation de 5 % représente combien ?",
    answer:
      "5 % s'appliquent d'abord à votre brut mensuel. Sur 2 500 € brut, cela représente 125 € brut de plus par mois, puis un gain net estimé d'environ 98 € avant prélèvement (non-cadre). Le simulateur calcule automatiquement l'équivalent en euros lorsque vous choisissez le mode pourcentage.",
  },
  {
    question: "L'augmentation se calcule sur le brut ou le net ?",
    answer:
      "En entreprise, l'augmentation est presque toujours annoncée en brut (montant fixe ou pourcentage du brut). Le calculateur applique donc la hausse sur le brut, même si vous avez saisi votre salaire net actuel pour démarrer.",
  },
  {
    question: "Pourquoi mon gain net est-il inférieur à l'augmentation brute ?",
    answer:
      "Les cotisations salariales (sécurité sociale, retraite, chômage, etc.) sont prélevées sur la rémunération brute, y compris la part nouvelle. Seule une fraction du supplément brut devient net avant impôt. C'est normal et identique pour une augmentation de 100 €, 200 € ou 300 €.",
  },
  {
    question: "Le prélèvement à la source diminue-t-il mon augmentation ?",
    answer:
      "Oui. Le prélèvement à la source porte sur le net imposable. Une hausse de salaire peut augmenter le montant prélevé chaque mois, même si votre taux personnel reste identique. Le simulateur affiche le gain net avant et après prélèvement pour isoler cet effet.",
  },
  {
    question: "Comment calculer une augmentation annuelle ?",
    answer:
      "Multipliez le gain net mensuel par le nombre de mois de rémunération (12 à 16). Si vous touchez 13 mois, le gain annuel inclut la part liée au mois supplémentaire. Vous pouvez aussi saisir une augmentation annuelle en euros : le mensuel est recalculé automatiquement.",
  },
  {
    question: "Une augmentation sur 13 mois change-t-elle le résultat ?",
    answer:
      "Le gain mensuel reste le même si l'augmentation est exprimée en euros par mois. En revanche, le gain annuel augmente, car la hausse s'applique à chaque mois payé, y compris le treizième. Pensez à sélectionner le bon nombre de mois dans le formulaire.",
  },
  {
    question: "Puis-je partir de mon salaire net ?",
    answer:
      "Oui. Le simulateur reconstitue un brut estimé à partir de votre net, applique l'augmentation, puis recalcule le nouveau net avec les mêmes règles que le calculateur Brut vers Net. Pratique si vous connaissez surtout votre salaire net actuel.",
  },
  {
    question: "Quelle différence entre une augmentation fixe et un pourcentage ?",
    answer:
      "Un montant fixe (ex. +200 € brut) ajoute la même somme chaque mois, quel que soit votre salaire. Un pourcentage (ex. +5 %) augmente proportionnellement : plus votre brut est élevé, plus le gain brut est important. Les deux modes sont disponibles dans le simulateur.",
  },
  {
    question: "Comment savoir si mon augmentation est intéressante ?",
    answer:
      "Regardez le gain net après prélèvement (ce qui arrive sur votre compte), le gain annuel sur vos mois réellement payés, et comparez avec votre budget. Raisonner uniquement en brut peut surestimer le gain réel. Le simulateur aide à traduire la promesse en euros nets.",
  },
  {
    question: "Ce calcul remplace-t-il une fiche de paie ?",
    answer:
      "Non. Il s'agit d'une simulation simplifiée, utile pour préparer un entretien ou vérifier un ordre de grandeur. Votre bulletin reste la référence : primes, régimes particuliers, tickets restaurant ou ajustements fiscaux ne sont pas reproduits ligne par ligne.",
  },
];
