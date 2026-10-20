/**
 * Sources officielles du calculateur d'indemnité de licenciement
 * (même présentation que les autres calculateurs, vérifiées le 20 octobre 2026).
 */

export const DISMISSAL_SOURCES_VERIFIED_AT = "2026-10-20";

export const DISMISSAL_SOURCES_VERIFIED_AT_LABEL = new Date(
  DISMISSAL_SOURCES_VERIFIED_AT,
).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export interface DismissalOfficialSource {
  org: string;
  title: string;
  href: string;
  note: string;
}

export const DISMISSAL_OFFICIAL_SOURCES: readonly DismissalOfficialSource[] = [
  {
    org: "Service-Public",
    title: "Indemnité de licenciement du salarié en CDI (F987)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F987",
    note: "Conditions d'attribution, ancienneté minimale, salaire de référence, barèmes légaux, majorations liées à l'ancienneté et situations particulières (page vérifiée le 20 octobre 2026).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L1234-9",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644154",
    note: "Droit à l'indemnité légale après 8 mois d'ancienneté ininterrompue, calculée à partir de la rémunération brute (version en vigueur depuis le 24 septembre 2017).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article R1234-2",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644692",
    note: "Montants minimaux : un quart de mois de salaire par année jusqu'à 10 ans, puis un tiers de mois par année à partir de 10 ans (version en vigueur depuis le 27 septembre 2017).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article R1234-1",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644687",
    note: "Prise en compte des années et des mois complets d'ancienneté, avec proratisation en cas d'année incomplète (version en vigueur depuis le 27 septembre 2017).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article R1234-4",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644695",
    note: "Salaire de référence : moyenne des 12 derniers mois (ou de tous les mois si moins d'un an) ou tiers des 3 derniers mois, selon la formule la plus favorable, avec primes au prorata (version en vigueur depuis le 27 septembre 2017).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article R1234-5",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018537562",
    note: "Non-cumul de l'indemnité de licenciement avec une autre indemnité de même nature (version en vigueur depuis le 1er mai 2008).",
  },
  {
    org: "Service-Public",
    title:
      "Le salarié perçoit-il des indemnités en cas de licenciement pour inaptitude physique ? (F31225)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31225",
    note: "Distinction inaptitude professionnelle / non professionnelle, indemnité spéciale (double de l'indemnité légale sans condition d'ancienneté) et indemnité compensatrice de préavis (page vérifiée le 20 octobre 2026).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L1226-14",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900981",
    note: "Indemnité spéciale de licenciement égale au double de l'indemnité prévue à l'article L. 1234-9, et indemnité compensatrice de préavis, en cas d'inaptitude d'origine professionnelle (version en vigueur depuis le 1er mai 2008).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L1226-16",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900983",
    note: "Salaire de référence applicable à l'indemnité spéciale : moyenne des trois derniers mois qui auraient été perçus au poste occupé avant la suspension du contrat (version en vigueur depuis le 1er mai 2008).",
  },
  {
    org: "Service-Public",
    title: "Calculer le montant de l'indemnité de licenciement (R57308)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/R57308",
    note: "Simulateur officiel utile pour comparer plusieurs scénarios. Il ne constitue pas une validation de l'outil Brut vers Net (page vérifiée le 20 octobre 2026).",
  },
] as const;
