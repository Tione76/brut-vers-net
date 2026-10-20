/**
 * Sources officielles du calculateur d'heures supplémentaires
 * (même présentation que la page d'accueil et l'augmentation de salaire,
 * vérifiées le 20 octobre 2026).
 */

export const OVERTIME_SOURCES_VERIFIED_AT = "2026-10-20";

export const OVERTIME_SOURCES_VERIFIED_AT_LABEL = new Date(
  OVERTIME_SOURCES_VERIFIED_AT,
).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export interface OvertimeOfficialSource {
  org: string;
  title: string;
  href: string;
  note: string;
}

export const OVERTIME_OFFICIAL_SOURCES: readonly OvertimeOfficialSource[] = [
  {
    org: "Service-Public",
    title: "Heures supplémentaires d'un salarié du secteur privé (F2391)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2391",
    note: "Décompte hebdomadaire, majorations légales 25 % / 50 %, plancher conventionnel de 10 % et contreparties en repos.",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L3121-28",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020373",
    note: "Fondement de la majoration salariale ou du repos compensateur équivalent (version en vigueur depuis le 10 août 2016).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L3121-33",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038610166",
    note: "Possibilité de fixer conventionnellement les taux de majoration, avec un minimum de 10 % (version en vigueur depuis le 1er janvier 2020).",
  },
  {
    org: "Légifrance - Code du travail",
    title: "Article L3121-36",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020341",
    note: "Majorations supplétives de 25 % pour les huit premières heures, puis 50 % (version en vigueur depuis le 10 août 2016).",
  },
  {
    org: "Service-Public",
    title: "Impôt sur le revenu : les heures supplémentaires sont-elles imposées ? (F2617)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2617",
    note: "Exonération d'impôt dans la limite de 7 500 € de rémunération nette imposable par an (revenus 2026, page vérifiée le 15 avril 2026).",
  },
  {
    org: "URSSAF",
    title: "Réduction de cotisations salariales sur les heures supplémentaires",
    href: "https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/exonerations-heures/reduction-cotisations-salariales.html",
    note: "Réduction limitée aux cotisations vieillesse et retraite complémentaire, au taux maximal de 11,31 % lorsque les taux de droit commun s'appliquent (page mise à jour le 13 mars 2026).",
  },
  {
    org: "Service-Public",
    title: "Durée du travail d'un salarié du secteur privé à temps plein (F1911)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1911",
    note: "Durée légale de 35 heures hebdomadaires et référence de 151,67 heures mensuelles.",
  },
  {
    org: "Légifrance - Convention collective HCR",
    title: "Avenant n° 2 du 5 février 2007, article 4 (IDCC 1979)",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005826386?idConteneur=KALICONT000005635534",
    note: "Majorations HCR : 10 % de la 36e à la 39e heure, 20 % de la 40e à la 43e, 50 % à partir de la 44e (en vigueur étendu).",
  },
] as const;
