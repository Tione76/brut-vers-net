import { formatCurrency, formatWithholdingRatePercent } from "@/site/salary-calculator";
import type { FaqItem } from "@/framework/types";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { calculatePasWithholding } from "./engine";
import type { PasCalculatorInput } from "./types";

export const PAS_EDITORIAL_UPDATED_AT = "2026-07-16";

export const PAS_CASE_HINT =
  "Testez directement ce scénario dans le calculateur situé en haut de cette page.";

function simulate(overrides: Partial<PasCalculatorInput> = {}) {
  return calculatePasWithholding({
    taxableAnnualRaw: "",
    referenceField: "grossMonthly",
    currentSalaryValue: "2500",
    profile: "nonExecutive",
    withholdingRateMode: "auto",
    manualWithholdingRate: 0,
    ...overrides,
  });
}

export interface PasPracticalCase {
  title: string;
  situation: string;
  input: string;
  estimate: string;
  verify: string;
  calculatorHint: string;
}

function euro(value: number | null | undefined): string {
  return formatCurrency(value ?? 0);
}

export function buildPasPracticalCases(): PasPracticalCase[] {
  const ex2500Auto = simulate({ currentSalaryValue: "2500" });
  const ex2500At6 = simulate({
    currentSalaryValue: "2500",
    withholdingRateMode: "manual",
    manualWithholdingRate: 6,
  });
  const ex3000 = simulate({ currentSalaryValue: "3000" });
  const ex4000 = simulate({ currentSalaryValue: "4000" });
  const exPublic = simulate({ currentSalaryValue: "2500", profile: "publicService" });
  const exExec = simulate({ currentSalaryValue: "2500", profile: "executive" });

  return [
    {
      title: "Salaire brut de 2 500 € avec un taux de 6 %",
      situation: "Non-cadre, temps plein, 12 mois.",
      input: "2 500 € brut mensuels, taux personnalisé 6 %.",
      estimate: ex2500At6
        ? `Montant prélevé : environ ${euro(ex2500At6.withholdingMonthly)} / mois. Salaire après prélèvement : environ ${euro(ex2500At6.netAfterTaxMonthly)} / mois.`
        : "Saisissez 2 500 € et réglez le taux à 6 %.",
      verify: "Votre taux réel sur impots.gouv.fr peut différer du taux neutre.",
      calculatorHint: PAS_CASE_HINT,
    },
    {
      title: "Salaire brut de 2 500 € (taux estimé)",
      situation: "Non-cadre, taux neutre automatique.",
      input: "2 500 € brut, mode automatique.",
      estimate: ex2500Auto
        ? `Taux estimé : ${formatWithholdingRatePercent(ex2500Auto.withholdingRate)}. Prélèvement : environ ${euro(ex2500Auto.withholdingMonthly)} / mois.`
        : "Laissez le mode automatique après avoir saisi votre salaire.",
      verify: "Le taux neutre dépend du net imposable estimé, pas du seul brut.",
      calculatorHint: PAS_CASE_HINT,
    },
    {
      title: "Salaire brut de 3 000 €",
      situation: "Non-cadre, 12 mois, taux automatique.",
      input: "3 000 € brut mensuels.",
      estimate: ex3000
        ? `Avant prélèvement : ${euro(ex3000.netMonthly)} / mois. Après : ${euro(ex3000.netAfterTaxMonthly)} / mois (taux ${formatWithholdingRatePercent(ex3000.withholdingRate)}).`
        : "Testez 3 000 € dans le simulateur.",
      verify: "Une hausse de brut peut faire monter le taux neutre.",
      calculatorHint: PAS_CASE_HINT,
    },
    {
      title: "Salaire brut de 4 000 €",
      situation: "Non-cadre, 12 mois, taux automatique.",
      input: "4 000 € brut mensuels.",
      estimate: ex4000
        ? `Prélèvement mensuel estimé : ${euro(ex4000.withholdingMonthly)}. Annuel : ${euro(ex4000.withholdingAnnual)}.`
        : "Testez 4 000 € dans le simulateur.",
      verify: "Comparez avec le taux affiché sur votre dernière fiche de paie.",
      calculatorHint: PAS_CASE_HINT,
    },
    {
      title: "Fonction publique (2 500 € brut)",
      situation: "Profil fonction publique, taux automatique.",
      input: "2 500 € brut, statut fonction publique.",
      estimate: exPublic
        ? `Net avant prélèvement : ${euro(exPublic.netMonthly)} / mois. Prélèvement : environ ${euro(exPublic.withholdingMonthly)} / mois.`
        : "Sélectionnez le profil fonction publique.",
      verify: "Les cotisations du public diffèrent du privé, le net avant impôt aussi.",
      calculatorHint: PAS_CASE_HINT,
    },
    {
      title: "Salarié cadre (2 500 € brut)",
      situation: "Profil cadre, taux automatique.",
      input: "2 500 € brut, statut cadre.",
      estimate: exExec
        ? `Net avant prélèvement : ${euro(exExec.netMonthly)} / mois. Après prélèvement : ${euro(exExec.netAfterTaxMonthly)} / mois.`
        : "Sélectionnez le profil cadre.",
      verify: "À brut égal, le net cadre peut différer du net non-cadre.",
      calculatorHint: PAS_CASE_HINT,
    },
  ];
}

export interface PasQuickReferenceRow {
  gross: string;
  netBefore: string;
  rate: string;
  withholding: string;
  netAfter: string;
}

export function buildPasQuickReferenceRows(): PasQuickReferenceRow[] {
  const amounts = ["2000", "2500", "3000", "3500", "4000"];
  return amounts.map((gross) => {
    const result = simulate({ currentSalaryValue: gross });
    if (!result) {
      return {
        gross: `${gross} €`,
        netBefore: "-",
        rate: "-",
        withholding: "-",
        netAfter: "-",
      };
    }
    return {
      gross: euro(result.grossMonthly),
      netBefore: euro(result.netMonthly),
      rate: formatWithholdingRatePercent(result.withholdingRate),
      withholding: euro(result.withholdingMonthly),
      netAfter: euro(result.netAfterTaxMonthly),
    };
  });
}

export function exampleProfile(profile: EmploymentProfile, gross = "2500") {
  return simulate({ currentSalaryValue: gross, profile });
}

export const pasFaq: FaqItem[] = [
  {
    question: "Comment connaître mon taux de prélèvement à la source ?",
    answer:
      "Votre taux figure sur votre fiche de paie et dans votre espace personnel sur impots.gouv.fr. Vous pouvez aussi le retrouver sur votre avis d'impôt. Le simulateur propose un taux neutre estimé, utile si vous n'avez pas encore votre taux personnalisé.",
  },
  {
    question: "Pourquoi mon taux de prélèvement change-t-il ?",
    answer:
      "Le taux évolue lorsque vos revenus, votre situation familiale ou votre déclaration fiscale changent. Une augmentation, un mariage, un PACS, une naissance ou une baisse d'activité peuvent entraîner une actualisation. L'administration fiscale peut aussi ajuster le taux en cours d'année.",
  },
  {
    question: "Puis-je modifier mon taux de prélèvement ?",
    answer:
      "Oui. Vous pouvez demander une modulation à la hausse ou à la baisse sur impots.gouv.fr, sous conditions. Dans ce simulateur, le mode personnalisé permet d'appliquer le taux de votre choix pour visualiser l'impact sur votre net versé.",
  },
  {
    question: "Le prélèvement à la source est-il obligatoire ?",
    answer:
      "Oui pour la plupart des revenus salariaux. L'employeur (ou l'organisme payeur) collecte l'impôt chaque mois et le reverse à l'État. Ce n'est ni une cotisation sociale ni une option facultative pour le salarié.",
  },
  {
    question: "Pourquoi mon salaire net diminue-t-il après prélèvement ?",
    answer:
      "Parce que le prélèvement à la source est un acompte d'impôt prélevé sur votre net imposable. Il s'ajoute aux cotisations salariales déjà déduites du brut. Le montant qui arrive sur votre compte est donc le net après prélèvement.",
  },
  {
    question: "Comment est calculé le taux de prélèvement ?",
    answer:
      "Le taux personnalisé repose sur vos revenus et votre situation fiscale déclarés. À défaut, un taux neutre (barème) peut s'appliquer selon le montant du revenu. Ce calculateur estime un taux neutre à partir d'un net imposable simplifié, puis applique le pourcentage au revenu taxable.",
  },
  {
    question: "Que se passe-t-il après une augmentation de salaire ?",
    answer:
      "Une hausse de rémunération augmente en général le net imposable, donc le montant prélevé chaque mois, même si votre taux reste inchangé. Si vos revenus progressent fortement, votre taux peut aussi être actualisé. Utilisez le simulateur d'augmentation pour visualiser le gain net après prélèvement.",
  },
  {
    question: "Le taux est-il le même pour tout le monde ?",
    answer:
      "Non. Deux collègues au même brut peuvent avoir des taux différents selon leur foyer fiscal, leurs autres revenus ou leur choix de taux individualisé. Le taux neutre, lui, dépend surtout du niveau de revenu du mois.",
  },
  {
    question: "Quelle différence entre taux personnalisé et taux individualisé ?",
    answer:
      "Le taux personnalisé du foyer s'applique en principe à tous les membres. Le taux individualisé répartit l'impôt entre conjoints ou partenaires selon leurs revenus respectifs. Le taux neutre, distinct, sert surtout en l'absence de taux personnel connu de l'employeur.",
  },
  {
    question: "Puis-je simuler mon prélèvement à la source ?",
    answer:
      "Oui. Indiquez votre salaire, votre statut et votre nombre de mois, puis laissez le taux automatique ou saisissez votre taux réel. Vous obtenez une estimation du montant prélevé et du salaire après impôt. Ce n'est pas un avis d'imposition.",
  },
  {
    question: "Le prélèvement à la source remplace-t-il ma déclaration d'impôt ?",
    answer:
      "Non. Vous devez toujours déclarer vos revenus. Le prélèvement à la source anticipe l'impôt, mais la déclaration annuelle permet de régulariser, de déclarer d'autres revenus et d'appliquer crédits ou réductions d'impôt.",
  },
  {
    question: "Ce calculateur remplace-t-il ma fiche de paie ?",
    answer:
      "Non. Il fournit un ordre de grandeur utile pour comprendre le montant prélevé. Votre bulletin et votre espace fiscal restent les références. Primes, mutuelle, crédits d'impôt ou revenus complémentaires ne sont pas reproduits ligne par ligne.",
  },
];
