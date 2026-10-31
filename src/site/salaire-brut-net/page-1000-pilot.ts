import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { monthlyToAnnual } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_DEFAULT_PROFILE,
  GROSS_TO_NET_SALARY_MONTHS,
  GROSS_TO_NET_UPDATED_AT,
} from "./config";
import {
  buildAllProfileNetEstimates,
  estimateNetMonthlyFromGross,
  type GrossToNetEstimate,
} from "./data";
import { buildCalculatorGrossPrefillHref } from "./prefill";
import {
  GROSS_TO_NET_TAX_H2,
  GROSS_TO_NET_TAX_SECTION_ID,
  buildGrossToNetAnnualH2,
  grossToNetAnnualSectionId,
} from "./content";

/** Montant historique du pilote. Le même modèle sert désormais à toute la série. */
export const PAGE_1000_GROSS = 1000;

export function isGrossToNet1000Pilot(grossMonthly: number): boolean {
  return grossMonthly === PAGE_1000_GROSS;
}

function formatGroupedFr(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPilotEuro(value: number): string {
  return `${formatGroupedFr(value)} €`;
}

export const PAGE_1000_LABEL = formatPilotEuro(PAGE_1000_GROSS);

export const PAGE_1000_DATE_PUBLISHED = GROSS_TO_NET_UPDATED_AT;

/** Date de la refonte du modèle 1 000 €, étendue à toute la série. */
export const GROSS_TO_NET_REDESIGN_DATE_MODIFIED = "2026-10-31";

export const PAGE_1000_DATE_MODIFIED = GROSS_TO_NET_REDESIGN_DATE_MODIFIED;

function formatEurosWords(value: number): string {
  return `${formatGroupedFr(value)} euros`;
}

export function buildGrossToNetRedesignSeoMeta(grossMonthly: number) {
  const label = formatPilotEuro(grossMonthly);
  return {
    title: `${label} brut en net : combien ça fait ?`,
    description: `Combien font ${formatEurosWords(grossMonthly)} brut en net ? Comparez les estimations selon votre statut et utilisez notre calculateur gratuit pour adapter le résultat à votre situation.`,
    h1: `${label} brut en net : combien ça fait ?`,
    subtitle: `Estimez le montant net correspondant à ${label} brut selon votre statut, avant prélèvement à la source.`,
    answerH2: `${label} brut : combien en net selon votre statut ?`,
  };
}

export function resolveGrossToNetSeoMeta(grossMonthly: number) {
  return buildGrossToNetRedesignSeoMeta(grossMonthly);
}

export const PAGE_1000_SEO = buildGrossToNetRedesignSeoMeta(PAGE_1000_GROSS);

export const PAGE_1000_TITLE = PAGE_1000_SEO.title;

export const PAGE_1000_H1 = PAGE_1000_SEO.h1;

export const PAGE_1000_DESCRIPTION = PAGE_1000_SEO.description;

export const PAGE_1000_SUBTITLE = PAGE_1000_SEO.subtitle;

export const PAGE_1000_ANSWER_H2 = PAGE_1000_SEO.answerH2;

export const PAGE_1000_RESULT_NOTE =
  "Estimations simplifiées selon votre statut, avant prélèvement à la source. Le montant réel dépend de votre situation et des retenues appliquées.";

export const PAGE_1000_RESULT_CAPTION = "Net estimé avant impôt";

export const PAGE_1000_CALCULATOR_HEADING = "Calculez votre salaire net";

export const PAGE_1000_CALCULATOR_INTRO =
  "Indiquez votre salaire brut mensuel et votre statut pour estimer le net correspondant.";

export const PAGE_1000_CALCULATOR_BUTTON = "Calculer mon salaire net";

export function buildGrossToNetHowToH2(grossMonthly: number): string {
  return `Comment convertir ${formatPilotEuro(grossMonthly)} brut en net ?`;
}

export const PAGE_1000_HOW_TO_H2 = buildGrossToNetHowToH2(PAGE_1000_GROSS);

export const PAGE_1000_HOW_TO_CALCULATOR =
  "Le calculateur de cette page est prévu pour un salaire brut mensuel. Une prime ou un versement ponctuel peut donner un résultat différent selon les retenues applicables.";

export const PAGE_1000_TAX_H2 = GROSS_TO_NET_TAX_H2;

export const PAGE_1000_ANNUAL_H2 = buildGrossToNetAnnualH2(PAGE_1000_GROSS);

export function buildGrossToNetTableH2(grossMonthly: number): string {
  return `Montants voisins de ${formatPilotEuro(grossMonthly)} brut : net estimé selon le statut`;
}

export function buildGrossToNetTableIntro(grossMonthly: number): string {
  return `Estimations du net pour des montants bruts proches de ${formatPilotEuro(grossMonthly)}`;
}

export const PAGE_1000_TABLE_H2 = buildGrossToNetTableH2(PAGE_1000_GROSS);

export const PAGE_1000_TABLE_INTRO = buildGrossToNetTableIntro(PAGE_1000_GROSS);

export function buildGrossToNetNearbyH2(grossMonthly: number): string {
  return `Comparez les montants bruts proches de ${formatPilotEuro(grossMonthly)}`;
}

export const PAGE_1000_NEARBY_H2 = buildGrossToNetNearbyH2(PAGE_1000_GROSS);

export const PAGE_1000_NEARBY_INTRO =
  "Consultez les conversions brut en net des montants voisins déjà publiés pour comparer les estimations selon votre statut.";

export const PAGE_1000_END_CTA_H2 = "Vous souhaitez convertir un autre montant ?";

export const PAGE_1000_END_CTA_TEXT =
  "Utilisez notre calculateur gratuit pour convertir votre salaire brut en net selon votre statut.";

export const PAGE_1000_END_CTA_LINK_LABEL = "Calculer mon salaire brut en net";

export const PAGE_1000_TAX_SECTION_ID = GROSS_TO_NET_TAX_SECTION_ID;

export function grossToNetHowToSectionId(grossMonthly: number): string {
  return `comment-convertir-${grossMonthly}-brut-en-net`;
}

export const PAGE_1000_HOW_TO_SECTION_ID = grossToNetHowToSectionId(PAGE_1000_GROSS);

export const PAGE_1000_ANNUAL_SECTION_ID = grossToNetAnnualSectionId(PAGE_1000_GROSS);

export const PAGE_1000_SITUATION_H2 =
  "Pourquoi le résultat peut-il varier selon votre situation ?";

export const PAGE_1000_SITUATION_SECTION_ID = "pourquoi-le-resultat-peut-varier";

export const PAGE_1000_CHECKLIST_H2 =
  "Quels éléments vérifier pour affiner cette estimation ?";

export const PAGE_1000_CHECKLIST_SECTION_ID = "elements-a-verifier";

export function buildGrossToNetChecklistText(grossMonthly: number): string {
  return `Pour comparer cette estimation à votre bulletin, vérifiez que les ${formatPilotEuro(grossMonthly)} correspondent au salaire brut total de la période, et non au seul salaire de base. Repérez ensuite la ligne « net à payer avant impôt ». La mutuelle, les avantages en nature, les remboursements de frais et les autres éléments du bulletin peuvent expliquer un écart avec le résultat présenté.`;
}

export const PAGE_1000_CHECKLIST_TEXT = buildGrossToNetChecklistText(PAGE_1000_GROSS);

export const COTISATIONS_GUIDE_HREF =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";

export const PAGE_1000_FAQ_HOME_CALCULATOR_LABEL = "calculateur principal brut vers net";

export const PAGE_1000_SIDEBAR_TOOL_IDS = [
  "brut-vers-net",
  "salaire-heures-supplementaires",
] as const;

export const PAGE_1000_SIDEBAR_GUIDE_ENTRIES = [
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
  {
    slug: "comment-est-calcule-le-salaire-net",
    title: "Différence entre salaire brut et net",
  },
] as const;

type ProfileEstimates = {
  nonExecutive: GrossToNetEstimate;
  executive: GrossToNetEstimate;
  publicService: GrossToNetEstimate;
};

export function formatPilotCoefficient(coefficient: number): string {
  return coefficient.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildPage1000EndCtaHref(grossMonthly: number = PAGE_1000_GROSS) {
  return buildCalculatorGrossPrefillHref(grossMonthly, GROSS_TO_NET_DEFAULT_PROFILE);
}

export function splitPage1000FaqHomeCalculatorAnswer(answer: string): {
  before: string;
  after: string;
} | null {
  const index = answer.indexOf(PAGE_1000_FAQ_HOME_CALCULATOR_LABEL);
  if (index === -1) return null;
  return {
    before: answer.slice(0, index),
    after: answer.slice(index + PAGE_1000_FAQ_HOME_CALCULATOR_LABEL.length),
  };
}

export function buildPage1000ConversionExample(grossMonthly: number = PAGE_1000_GROSS) {
  const coefficient = getProfileCoefficient("nonExecutive");
  const netMonthly = estimateNetMonthlyFromGross(grossMonthly, "nonExecutive");
  return {
    grossMonthly,
    coefficient,
    coefficientLabel: formatPilotCoefficient(coefficient),
    netMonthly,
    netLabel: formatPilotEuro(Math.round(netMonthly)),
    nonExecutiveCoefficientLabel: formatPilotCoefficient(getProfileCoefficient("nonExecutive")),
    executiveCoefficientLabel: formatPilotCoefficient(getProfileCoefficient("executive")),
    publicCoefficientLabel: formatPilotCoefficient(getProfileCoefficient("publicService")),
  };
}

export function buildPage1000HowToCoefficients(grossMonthly: number = PAGE_1000_GROSS) {
  const example = buildPage1000ConversionExample(grossMonthly);
  return `Pour cette estimation, le site multiplie le montant brut par un coefficient selon le statut : ${example.nonExecutiveCoefficientLabel} pour un salarié non-cadre, ${example.executiveCoefficientLabel} pour un cadre et ${example.publicCoefficientLabel} pour la fonction publique. Ces coefficients sont des hypothèses simplifiées du site, pas des taux légaux de cotisations.`;
}

export function buildPage1000AnnualFigures(
  estimates: ProfileEstimates,
  grossMonthly: number = PAGE_1000_GROSS,
) {
  const grossAnnual = monthlyToAnnual(grossMonthly, GROSS_TO_NET_SALARY_MONTHS);
  return {
    salaryMonths: GROSS_TO_NET_SALARY_MONTHS,
    grossMonthly,
    grossAnnual,
    grossAnnualLabel: formatPilotEuro(grossAnnual),
    netAnnual: estimates.nonExecutive.netAnnual,
    netAnnualLabel: formatPilotEuro(Math.round(estimates.nonExecutive.netAnnual)),
  };
}

export function buildPage1000Editorial(grossMonthly: number = PAGE_1000_GROSS) {
  return [
    {
      id: PAGE_1000_SITUATION_SECTION_ID,
      title: PAGE_1000_SITUATION_H2,
      paragraphs: [
        "À montant brut identique, les retenues peuvent varier selon le contrat, le régime de cotisations, la mutuelle et les éléments de rémunération.",
        "Salarié non-cadre : le contrat, la mutuelle et les éventuelles primes peuvent modifier le net réellement perçu.",
        "Salarié cadre : le coefficient retenu sert à l'estimation. Il ne signifie pas que tous les cadres supportent systématiquement trois points de retenues supplémentaires par rapport aux non-cadres.",
        "Fonction publique : le résultat dépend notamment du statut de titulaire ou de contractuel, des cotisations et des primes ou indemnités.",
      ],
    },
    {
      id: PAGE_1000_CHECKLIST_SECTION_ID,
      title: PAGE_1000_CHECKLIST_H2,
      paragraphs: [buildGrossToNetChecklistText(grossMonthly)],
    },
  ] as const;
}

export function buildPage1000FaqItems(grossMonthly: number = PAGE_1000_GROSS) {
  const estimates = buildAllProfileNetEstimates(grossMonthly);
  const label = formatPilotEuro(grossMonthly);
  const nonCadre = formatPilotEuro(Math.round(estimates.nonExecutive.netMonthly));
  const cadre = formatPilotEuro(Math.round(estimates.executive.netMonthly));
  const publicService = formatPilotEuro(Math.round(estimates.publicService.netMonthly));
  return [
    {
      question: `Combien font ${label} brut en net ?`,
      answer: `Pour ${label} brut, le site estime ${nonCadre} net pour un non-cadre, ${cadre} pour un cadre et ${publicService} pour la fonction publique, avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi le résultat varie-t-il selon le statut ?",
      answer:
        "Le site applique une hypothèse différente selon le statut. Les retenues réellement prélevées varient selon le contrat et la situation professionnelle.",
    },
    {
      question: "Le montant net affiché est-il avant ou après impôt ?",
      answer: "Le montant affiché est une estimation du net avant prélèvement à la source.",
    },
    {
      question: `Peut-on utiliser cette estimation pour une prime de ${label} ?`,
      answer:
        "Le résultat constitue seulement un repère. L'outil de cette page est prévu pour un salaire brut mensuel, pas pour reproduire les retenues d'une prime.",
    },
    {
      question: "Comment adapter le calcul à ma situation ?",
      answer: `Utilisez le calculateur de cette page ou le ${PAGE_1000_FAQ_HOME_CALCULATOR_LABEL} pour adapter le brut, le statut et, si besoin, le prélèvement à la source.`,
    },
  ];
}
