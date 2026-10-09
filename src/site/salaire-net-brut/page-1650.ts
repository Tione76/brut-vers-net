import { buildWebPageJsonLd, schemaIds } from "@/site/schema";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { monthlyToAnnual } from "@/site/salary-calculator/conversions";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import { NET_TO_GROSS_DEFAULT_PROFILE, NET_TO_GROSS_SALARY_MONTHS, netToGrossPath } from "./config";
import type { ComparisonRow, NetToGrossEstimate } from "./data";
import { estimateGrossMonthlyFromNet, formatNetShort } from "./data";
import { buildCalculatorNetPrefillHref } from "./prefill";
import {
  REDESIGN_DATE_PUBLISHED,
  REDESIGN_WAVE1_DATE_MODIFIED,
  REDESIGN_WAVE1_EXCEPTION_NET,
  isNetToGrossRedesign,
} from "./redesign-wave";

/** Page prototype historique : 1 650 € net. */
export const PAGE_1650_NET = REDESIGN_WAVE1_EXCEPTION_NET;

export function isNetToGross1650Prototype(netMonthly: number): boolean {
  return netMonthly === PAGE_1650_NET;
}

/** Espaces ordinaires, identiques aux libellés validés de la fiche 1 650 €. */
function formatGroupedFr(netMonthly: number): string {
  return String(netMonthly).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatRedesignEuro(netMonthly: number): string {
  return `${formatGroupedFr(netMonthly)} €`;
}

/** N−5 à N+4 : dix lignes, sans chevauchement entre fiches au pas de 20 €. */
export function buildRedesignIntermediateNets(netMonthly: number): number[] {
  return Array.from({ length: 10 }, (_, index) => netMonthly - 5 + index);
}

export function buildRedesignSeoMeta(netMonthly: number) {
  const netLabel = formatRedesignEuro(netMonthly);
  return {
    title: `${netLabel} net en brut : calcul et conversion`,
    description: `${netLabel} net en brut : découvrez le salaire brut estimé pour un non-cadre, un cadre ou la fonction publique. Tableau et calculateur gratuits.`,
    h1: `${netLabel} net en brut : combien ça fait ?`,
    answerH2: `${netLabel} net : combien en brut selon votre statut ?`,
  };
}

export function buildRedesignTableCopy(netMonthly: number) {
  const fromPlain = formatGroupedFr(netMonthly - 5);
  const fromLabel = formatRedesignEuro(netMonthly - 5);
  const toLabel = formatRedesignEuro(netMonthly + 4);
  const netLabel = formatRedesignEuro(netMonthly);
  return {
    h2: `De ${fromPlain} à ${toLabel} net : équivalents en brut`,
    intro: `Vous recherchez un salaire légèrement différent de ${netLabel} net ? Retrouvez le brut mensuel estimé pour chaque montant de ${fromLabel} à ${toLabel}, selon votre statut professionnel.`,
  };
}

export function buildRedesignNearbyCopy(netMonthly: number) {
  return {
    h2: `Comparez les salaires nets proches de ${formatRedesignEuro(netMonthly)}`,
    intro:
      "Consultez les conversions net en brut des montants voisins pour comparer les estimations selon votre statut.",
  };
}

export function buildRedesignHowToH2(netMonthly: number) {
  return `Comment calculer le salaire brut correspondant à ${formatRedesignEuro(netMonthly)} net ?`;
}

export function buildRedesignAnnualH2(netMonthly: number) {
  return `${formatRedesignEuro(netMonthly)} net par mois : combien cela représente-t-il par an ?`;
}

export function buildRedesignTaxH2(netMonthly: number) {
  return `${formatRedesignEuro(netMonthly)} net : avant ou après prélèvement à la source ?`;
}

export function redesignHowToSectionId(netMonthly: number) {
  return `comment-calculer-${netMonthly}-net-en-brut`;
}

export function redesignAnnualSectionId(netMonthly: number) {
  return `${netMonthly}-net-par-an`;
}

export const PAGE_1650_INTERMEDIATE_NETS = buildRedesignIntermediateNets(PAGE_1650_NET);

export const PAGE_1650_SEO = {
  title: buildRedesignSeoMeta(PAGE_1650_NET).title,
  description: buildRedesignSeoMeta(PAGE_1650_NET).description,
} as const;

export const PAGE_1650_H1 = buildRedesignSeoMeta(PAGE_1650_NET).h1;

export const PAGE_1650_DATE_PUBLISHED = REDESIGN_DATE_PUBLISHED;

export const PAGE_1650_DATE_MODIFIED = REDESIGN_WAVE1_DATE_MODIFIED;

export const PAGE_1650_ANSWER_H2 = buildRedesignSeoMeta(PAGE_1650_NET).answerH2;

export const PAGE_1650_TABLE_H2 = buildRedesignTableCopy(PAGE_1650_NET).h2;

export const PAGE_1650_TABLE_INTRO = buildRedesignTableCopy(PAGE_1650_NET).intro;

export const PAGE_1650_ROUNDING_NOTE =
  "Montants estimatifs arrondis à l'euro. Le simulateur affiche le détail au centime.";

export const PAGE_1650_CALCULATOR_HEADING = "Calculez votre salaire brut";

export const PAGE_1650_CALCULATOR_INTRO =
  "Indiquez votre salaire net mensuel et votre statut pour estimer le brut correspondant.";

export const PAGE_1650_CALCULATOR_BUTTON = "Calculer mon salaire brut";

export const PAGE_1650_NEARBY_H2 = buildRedesignNearbyCopy(PAGE_1650_NET).h2;

export const PAGE_1650_NEARBY_INTRO = buildRedesignNearbyCopy(PAGE_1650_NET).intro;

export const PAGE_1650_END_CTA_H2 = "Vous souhaitez convertir un autre montant ?";

export const PAGE_1650_END_CTA_TEXT =
  "Utilisez notre calculateur gratuit pour convertir votre salaire net en brut selon votre statut.";

export const PAGE_1650_END_CTA_LINK_LABEL = "Calculer mon salaire net en brut";

export function buildRedesignEndCtaHref(netMonthly: number) {
  return buildCalculatorNetPrefillHref(netMonthly, NET_TO_GROSS_DEFAULT_PROFILE);
}

export const PAGE_1650_END_CTA_HREF = buildRedesignEndCtaHref(PAGE_1650_NET);

/** Sidebar curatée : 3 outils + 3 guides, hors SMIC / arrêt maladie / licenciement. */
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

export const PAGE_1650_HOW_TO_H2 = buildRedesignHowToH2(PAGE_1650_NET);

export const PAGE_1650_ANNUAL_H2 = buildRedesignAnnualH2(PAGE_1650_NET);

export const PAGE_1650_TAX_H2 = buildRedesignTaxH2(PAGE_1650_NET);

export const PAGE_1650_TAX_SECTION_ID = "avant-ou-apres-impot";

export const PAGE_1650_HOW_TO_SECTION_ID = redesignHowToSectionId(PAGE_1650_NET);

export const PAGE_1650_ANNUAL_SECTION_ID = redesignAnnualSectionId(PAGE_1650_NET);

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
  return isNetToGrossRedesign(netMonthly) ? "website" : "article";
}

type ProfileEstimates = {
  nonExecutive: NetToGrossEstimate;
  executive: NetToGrossEstimate;
  publicService: NetToGrossEstimate;
};

export function format1650Coefficient(coefficient: number): string {
  return coefficient.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildRedesignIntermediateRows(netMonthly: number): ComparisonRow[] {
  return buildRedesignIntermediateNets(netMonthly).map((net) => ({
    netMonthly: net,
    nonExecutive: estimateGrossMonthlyFromNet(net, "nonExecutive"),
    executive: estimateGrossMonthlyFromNet(net, "executive"),
    publicService: estimateGrossMonthlyFromNet(net, "publicService"),
    isCurrent: net === netMonthly,
  }));
}

export function build1650IntermediateRows(): ComparisonRow[] {
  return buildRedesignIntermediateRows(PAGE_1650_NET);
}

export function assertRedesignIntermediateHasNoDedicatedUrls(netMonthly: number): string[] {
  return buildRedesignIntermediateNets(netMonthly)
    .filter((net) => net !== netMonthly)
    .map((net) => netToGrossPath(net));
}

export function assert1650IntermediateHasNoDedicatedUrls(): string[] {
  return assertRedesignIntermediateHasNoDedicatedUrls(PAGE_1650_NET);
}

export function buildRedesignConversionExample(netMonthly: number) {
  const coefficient = getProfileCoefficient("nonExecutive");
  const exactGrossMonthly = estimateGrossMonthlyFromNet(netMonthly, "nonExecutive");
  return {
    netMonthly,
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

export function build1650ConversionExample() {
  return buildRedesignConversionExample(PAGE_1650_NET);
}

export function buildRedesignAnnualFigures(netMonthly: number, estimates: ProfileEstimates) {
  const netAnnual = monthlyToAnnual(netMonthly, NET_TO_GROSS_SALARY_MONTHS);
  return {
    salaryMonths: NET_TO_GROSS_SALARY_MONTHS,
    netMonthly,
    netAnnual,
    netAnnualLabel: formatNetShort(netAnnual),
    grossAnnual: estimates.nonExecutive.grossAnnual,
    grossAnnualRounded: Math.round(estimates.nonExecutive.grossAnnual),
    grossAnnualLabel: formatNetShort(Math.round(estimates.nonExecutive.grossAnnual)),
  };
}

export function build1650AnnualFigures(estimates: ProfileEstimates) {
  return buildRedesignAnnualFigures(PAGE_1650_NET, estimates);
}

export function buildRedesignEditorial(netMonthly: number, estimates: ProfileEstimates) {
  const netLabel = formatRedesignEuro(netMonthly);
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

export function build1650Editorial(estimates: ProfileEstimates) {
  return buildRedesignEditorial(PAGE_1650_NET, estimates);
}

export function buildRedesignFaqItems(netMonthly: number) {
  const netLabel = formatRedesignEuro(netMonthly);
  const example = buildRedesignConversionExample(netMonthly);

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

export function build1650FaqItems() {
  return buildRedesignFaqItems(PAGE_1650_NET);
}

function isJsonLdNode(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Ajuste le graphe WebPage du modèle refondu sans modifier `buildWebPageJsonLd`.
 * FAQ en hasPart, publisher Organization, pas de about ni de mainEntity FAQ.
 */
export function buildRedesignPageJsonLd(
  input: Parameters<typeof buildWebPageJsonLd>[0],
): Record<string, unknown> {
  const document = buildWebPageJsonLd(input);
  const graph = document["@graph"];
  if (!Array.isArray(graph)) return document;

  const faqId = schemaIds.faq(input.path);

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

export function build1650PageJsonLd(
  input: Parameters<typeof buildWebPageJsonLd>[0],
): Record<string, unknown> {
  return buildRedesignPageJsonLd(input);
}
