import { buildWebPageJsonLd, schemaIds } from "@/site/schema";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { monthlyToAnnual } from "@/site/salary-calculator/conversions";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import { NET_TO_GROSS_DEFAULT_PROFILE, NET_TO_GROSS_SALARY_MONTHS, netToGrossPath } from "./config";
import type { ComparisonRow, NetToGrossEstimate } from "./data";
import { estimateGrossMonthlyFromNet, formatNetShort } from "./data";
import { buildCalculatorNetPrefillHref } from "./prefill";

/** Page prototype : n'appliquer ces règles qu'à 1 650 € net. */
export const PAGE_1650_NET = 1650 as const;

/**
 * Couverture euro par euro pour N = 1650 (N−5 à N+4).
 * Règle prévue à terme pour tout N multiple de 10 : ne pas généraliser.
 */
export const PAGE_1650_INTERMEDIATE_NETS = [
  1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654,
] as const;

export const PAGE_1650_SEO = {
  title: "1 650 € net en brut : calcul et conversion",
  description:
    "1 650 € net en brut : découvrez le salaire brut estimé pour un non-cadre, un cadre ou la fonction publique. Tableau et calculateur gratuits.",
} as const;

export const PAGE_1650_H1 = "1 650 € net en brut : combien ça fait ?";

/** Première publication de la fiche (inchangée). */
export const PAGE_1650_DATE_PUBLISHED = "2026-07-15";

/** Date réelle de mise en ligne de la refonte. */
export const PAGE_1650_DATE_MODIFIED = "2026-10-09";

export const PAGE_1650_ANSWER_H2 = "1 650 € net : combien en brut selon votre statut ?";

export const PAGE_1650_TABLE_H2 = "De 1 645 à 1 654 € net : équivalents en brut";

export const PAGE_1650_TABLE_INTRO =
  "Vous recherchez un salaire légèrement différent de 1 650 € net ? Retrouvez le brut mensuel estimé pour chaque montant de 1 645 € à 1 654 €, selon votre statut professionnel.";

export const PAGE_1650_ROUNDING_NOTE =
  "Montants estimatifs arrondis à l'euro. Le simulateur affiche le détail au centime.";

export const PAGE_1650_CALCULATOR_HEADING = "Calculez votre salaire brut";

export const PAGE_1650_CALCULATOR_INTRO =
  "Indiquez votre salaire net mensuel et votre statut pour estimer le brut correspondant.";

export const PAGE_1650_CALCULATOR_BUTTON = "Calculer mon salaire brut";

export const PAGE_1650_NEARBY_H2 = "Comparez les salaires nets proches de 1 650 €";

export const PAGE_1650_NEARBY_INTRO =
  "Consultez les conversions net en brut des montants voisins pour comparer les estimations selon votre statut.";

export const PAGE_1650_END_CTA_H2 = "Vous souhaitez convertir un autre montant ?";

export const PAGE_1650_END_CTA_TEXT =
  "Utilisez notre calculateur gratuit pour convertir votre salaire net en brut selon votre statut.";

export const PAGE_1650_END_CTA_LINK_LABEL = "Calculer mon salaire net en brut";

export const PAGE_1650_END_CTA_HREF = buildCalculatorNetPrefillHref(
  PAGE_1650_NET,
  NET_TO_GROSS_DEFAULT_PROFILE,
);

/** Sidebar curatée 1 650 € : 3 outils + 3 guides, hors SMIC / arrêt maladie / licenciement. */
export const PAGE_1650_SIDEBAR_TOOL_IDS = [
  "brut-vers-net",
  "augmentation-salaire",
  "salaire-heures-supplementaires",
] as const;

export const PAGE_1650_SIDEBAR_GUIDE_ENTRIES = [
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
  {
    slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
    title: "Prélèvement à la source",
  },
  {
    slug: "comment-est-calcule-le-salaire-net",
    title: "Différence entre salaire brut et net",
  },
] as const;

export const PAGE_1650_HOW_TO_H2 =
  "Comment calculer le salaire brut correspondant à 1 650 € net ?";

export const PAGE_1650_ANNUAL_H2 =
  "1 650 € net par mois : combien cela représente-t-il par an ?";

export const PAGE_1650_TAX_H2 = "1 650 € net : avant ou après prélèvement à la source ?";

export const PAGE_1650_TAX_SECTION_ID = "avant-ou-apres-impot";

export const PAGE_1650_HOW_TO_SECTION_ID = "comment-calculer-1650-net-en-brut";

export const PAGE_1650_ANNUAL_SECTION_ID = "1650-net-par-an";

export const COTISATIONS_GUIDE_HREF =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";

/** Libellé du lien vers le calculateur d'accueil, partagé FAQ visible / JSON-LD. */
export const PAGE_1650_FAQ_HOME_CALCULATOR_LABEL = "simulateur principal brut vers net";

export function split1650FaqHomeCalculatorAnswer(answer: string): {
  before: string;
  after: string;
} | null {
  const index = answer.indexOf(PAGE_1650_FAQ_HOME_CALCULATOR_LABEL);
  if (index === -1) return null;
  return {
    before: answer.slice(0, index),
    after: answer.slice(index + PAGE_1650_FAQ_HOME_CALCULATOR_LABEL.length),
  };
}

export function netToGrossOpenGraphType(netMonthly: number): "article" | "website" {
  return isNetToGross1650Prototype(netMonthly) ? "website" : "article";
}

type ProfileEstimates = {
  nonExecutive: NetToGrossEstimate;
  executive: NetToGrossEstimate;
  publicService: NetToGrossEstimate;
};

export function isNetToGross1650Prototype(netMonthly: number): boolean {
  return netMonthly === PAGE_1650_NET;
}

export function format1650Coefficient(coefficient: number): string {
  return coefficient.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function build1650IntermediateRows(): ComparisonRow[] {
  return PAGE_1650_INTERMEDIATE_NETS.map((net) => ({
    netMonthly: net,
    nonExecutive: estimateGrossMonthlyFromNet(net, "nonExecutive"),
    executive: estimateGrossMonthlyFromNet(net, "executive"),
    publicService: estimateGrossMonthlyFromNet(net, "publicService"),
    isCurrent: net === PAGE_1650_NET,
  }));
}

export function assert1650IntermediateHasNoDedicatedUrls(): string[] {
  return PAGE_1650_INTERMEDIATE_NETS.filter((net) => net !== PAGE_1650_NET).map(
    (net) => netToGrossPath(net),
  );
}

export function build1650ConversionExample() {
  const coefficient = getProfileCoefficient("nonExecutive");
  const exactGrossMonthly = estimateGrossMonthlyFromNet(PAGE_1650_NET, "nonExecutive");
  return {
    netMonthly: PAGE_1650_NET,
    coefficient,
    coefficientLabel: format1650Coefficient(coefficient),
    exactGrossMonthly,
    exactGrossLabel: formatCurrency(exactGrossMonthly),
    roundedGrossMonthly: Math.round(exactGrossMonthly),
    roundedGrossLabel: formatNetShort(Math.round(exactGrossMonthly)),
    nonExecutiveCoefficientLabel: format1650Coefficient(getProfileCoefficient("nonExecutive")),
    executiveCoefficientLabel: format1650Coefficient(getProfileCoefficient("executive")),
    publicCoefficientLabel: format1650Coefficient(getProfileCoefficient("publicService")),
  };
}

export function build1650AnnualFigures(estimates: ProfileEstimates) {
  const netAnnual = monthlyToAnnual(PAGE_1650_NET, NET_TO_GROSS_SALARY_MONTHS);
  return {
    salaryMonths: NET_TO_GROSS_SALARY_MONTHS,
    netMonthly: PAGE_1650_NET,
    netAnnual,
    netAnnualLabel: formatNetShort(netAnnual),
    grossAnnual: estimates.nonExecutive.grossAnnual,
    grossAnnualRounded: Math.round(estimates.nonExecutive.grossAnnual),
    grossAnnualLabel: formatNetShort(Math.round(estimates.nonExecutive.grossAnnual)),
  };
}

export function build1650Editorial(estimates: ProfileEstimates) {
  const netLabel = formatNetShort(PAGE_1650_NET);
  const nonCadreGross = formatNetShort(Math.round(estimates.nonExecutive.grossMonthly));
  const cadreGross = formatNetShort(Math.round(estimates.executive.grossMonthly));
  const publicGross = formatNetShort(Math.round(estimates.publicService.grossMonthly));
  const nonCadreCoef = format1650Coefficient(getProfileCoefficient("nonExecutive"));
  const cadreCoef = format1650Coefficient(getProfileCoefficient("executive"));
  const publicCoef = format1650Coefficient(getProfileCoefficient("publicService"));

  return [
    {
      id: "non-cadre",
      title: `Quel brut pour toucher ${netLabel} net en tant que salarié non-cadre ?`,
      paragraphs: [
        `Le simulateur estime le brut d'un salarié non-cadre en divisant le net par un coefficient de ${nonCadreCoef}. C'est une hypothèse de calcul du site, pas un taux légal de cotisations. Pour ${netLabel} net, le brut mensuel se situe autour de ${nonCadreGross}.`,
        `Le résultat réel dépend du contrat, de la mutuelle, des primes, du temps de travail et de la convention collective. Cette conversion donne un ordre de grandeur, pas une fiche de paie.`,
      ],
    },
    {
      id: "cadre",
      title: `Quel brut pour toucher ${netLabel} net en tant que salarié cadre ?`,
      paragraphs: [
        `Pour le statut cadre, le simulateur applique un coefficient de ${cadreCoef}. À ${netLabel} net, le brut estimé est d'environ ${cadreGross} par mois. Ce n'est pas une lecture des cotisations de chaque contrat : l'écart avec le non-cadre ne doit pas être lu comme un écart systématique de trois points.`,
        `Les retenues varient selon la retraite complémentaire, les accords d'entreprise, les primes et le temps de travail. Tous les cadres n'ont pas des cotisations plus élevées que tous les non-cadres. Conservez ce montant comme un repère.`,
      ],
    },
    {
      id: "fonction-publique",
      title: `Quel brut pour toucher ${netLabel} net dans la fonction publique ?`,
      paragraphs: [
        `Pour la fonction publique, le site utilise un coefficient simplifié de ${publicCoef}, soit environ ${publicGross} brut pour ${netLabel} net. Ce n'est pas un traitement unique : les versants État, territorial et hospitalier n'ont pas les mêmes règles, et les primes ou indemnités pèsent souvent autant que le traitement indiciaire.`,
        `Les régimes particuliers et le temps partiel peuvent écarter nettement le résultat. Affinez l'estimation avec le simulateur dès que vous connaissez votre situation.`,
      ],
    },
  ] as const;
}

export function build1650FaqItems() {
  const netLabel = formatNetShort(PAGE_1650_NET);
  const example = build1650ConversionExample();

  return [
    {
      question: "Pourquoi le salaire brut estimé diffère-t-il selon le statut ?",
      answer: `Le simulateur applique un coefficient différent selon le statut : ${example.nonExecutiveCoefficientLabel} pour un non-cadre, ${example.executiveCoefficientLabel} pour un cadre et ${example.publicCoefficientLabel} pour la fonction publique. Ce sont des hypothèses de calcul du site, pas des taux légaux. Les cotisations réelles varient d'un contrat à l'autre, ce qui explique l'écart entre les trois estimations.`,
    },
    {
      question: "Pourquoi le salaire brut affiché est-il une estimation ?",
      answer:
        "Le brut affiché ne reproduit pas une fiche de paie. Contrat, cotisations, mutuelle, primes, convention collective et statut font varier le montant réellement prélevé. Les cartes donnent un ordre de grandeur aligné sur le simulateur.",
    },
    {
      question: `Les ${netLabel} net indiqués sont-ils avant ou après impôt ?`,
      answer: `Les ${netLabel} net correspondent à un salaire net avant prélèvement à la source. Le montant versé sur le compte peut être inférieur une fois l'impôt retenu.`,
    },
    {
      question: `Comment calculer précisément mon salaire brut à partir de ${netLabel} net ?`,
      answer: `Pour un calcul plus proche de votre situation, ouvrez le ${PAGE_1650_FAQ_HOME_CALCULATOR_LABEL} : indiquez votre net, choisissez votre statut, puis ajustez le temps de travail et, si besoin, le prélèvement à la source. Le bulletin de salaire reste la référence.`,
    },
  ];
}

function isJsonLdNode(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Ajuste le graphe WebPage de la fiche 1 650 € sans modifier `buildWebPageJsonLd`.
 * FAQ en hasPart, publisher Organization, pas de about ni de mainEntity FAQ.
 */
export function build1650PageJsonLd(
  input: Parameters<typeof buildWebPageJsonLd>[0],
): Record<string, unknown> {
  const document = buildWebPageJsonLd(input);
  const graph = document["@graph"];
  if (!Array.isArray(graph)) return document;

  const faqId = schemaIds.faq(netToGrossPath(PAGE_1650_NET));

  return {
    ...document,
    "@graph": graph.map((node) => {
      if (!isJsonLdNode(node) || node["@type"] !== "WebPage") return node;

      const page = { ...node };
      delete page.about;
      delete page.mainEntity;
      page.publisher = { "@id": schemaIds.organization() };
      page.hasPart = [{ "@id": faqId }];
      return page;
    }),
  };
}
