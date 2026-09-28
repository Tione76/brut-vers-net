/**
 * Source de vérité éditoriale : /smic-hotelier
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année 2026.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  formatHcrEuro,
  formatHcrHours,
  getHcrGridRows,
  getHcrRow,
  HCR_BASE_MONTHLY_HOURS,
  HCR_MONTHLY_HOURS_AT_39,
  HCR_MONTHLY_OT_HOURS,
  MINIMUM_GARANTI,
} from "./engine";

export const SMIC_HOTELIER_PATH = "/smic-hotelier";
export const SMIC_HOTELIER_SLUG = "smic-hotelier";

export const SMIC_HOTELIER_EDITORIAL_YEAR = 2026;

export const SMIC_HOTELIER_PUBLISHED_AT = "2026-09-28";
export const SMIC_HOTELIER_UPDATED_AT = "2026-09-28";
export const SMIC_HOTELIER_UPDATED_AT_LABEL = "28 septembre 2026";

export const SMIC_HOTELIER_SOURCES_VERIFIED_AT = "2026-09-28";
export const SMIC_HOTELIER_SOURCES_VERIFIED_AT_LABEL = "28 septembre 2026";

export const SMIC_HOTELIER_SMIC_EFFECTIVE_FROM = SMIC_EFFECTIVE_FROM;
export const SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;

/** Grille étendue de l'avenant n° 33 : effet au 1er décembre 2024. */
export const HCR_GRID_EFFECTIVE_FROM = "2024-12-01";
export const HCR_GRID_EFFECTIVE_FROM_LABEL = "1er décembre 2024";

export const HCR_AVENANT_33_SIGNED_LABEL = "19 juin 2024";
export const HCR_AVENANT_33_EXTENSION_LABEL = "5 novembre 2024 (JO du 9 novembre 2024)";

export const HCR_AVENANT_36_SIGNED_LABEL = "4 juin 2026";
export const HCR_AVENANT_36_EXTENSION_NOTICE_LABEL = "9 septembre 2026";

export const SMIC_HOTELIER_H1 =
  "SMIC hôtelier 2026 : grille HCR et salaires à 35 h et 39 h";

export const SMIC_HOTELIER_SEO_TITLE =
  "SMIC hôtelier : grille HCR et salaire à 39 h (mis à jour)";

export const SMIC_HOTELIER_META_DESCRIPTION =
  "Consultez la grille HCR en vigueur, le salaire brut à 35 h et 39 h, les heures supplémentaires et les règles sur les repas.";

export const SMIC_HOTELIER_BREADCRUMB = "SMIC hôtelier";

export const SMIC_HOTELIER_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le SMIC hôtelier et la grille HCR en 2026";

export const HCR_GRID_ROWS = getHcrGridRows();
export const HCR_EXAMPLE_SMIC_FLOOR = getHcrRow(1, 1);
export const HCR_EXAMPLE_I_2 = getHcrRow(1, 2);
export const HCR_EXAMPLE_I_3 = getHcrRow(1, 3);
export const HCR_EXAMPLE_II_1 = getHcrRow(2, 1);
export const HCR_EXAMPLE_II_2 = getHcrRow(2, 2);
export const HCR_EXAMPLE_II_3 = getHcrRow(2, 3);
export const HCR_EXAMPLE_III_1 = getHcrRow(3, 1);

export const SMIC_HOTELIER_LABELS = {
  smicHourly: formatHcrEuro(SMIC_CURRENT.hourlyGross),
  smicMonthly35h: formatHcrEuro(SMIC_CURRENT.monthlyGross),
  smicMonthly39h: formatHcrEuro(HCR_EXAMPLE_SMIC_FLOOR.monthlyGross39h),
  smicOvertime39h: formatHcrEuro(HCR_EXAMPLE_SMIC_FLOOR.overtimeGross39h),
  minimumGaranti: formatHcrEuro(MINIMUM_GARANTI),
  baseHours: formatHcrHours(HCR_BASE_MONTHLY_HOURS),
  overtimeHoursExact: formatHcrHours(HCR_MONTHLY_OT_HOURS),
  hoursAt39: formatHcrHours(HCR_MONTHLY_HOURS_AT_39, 0),
  ii2Hourly: formatHcrEuro(HCR_EXAMPLE_II_2.applicableHourly),
  ii2Monthly35h: formatHcrEuro(HCR_EXAMPLE_II_2.monthlyGross35h),
  ii2Overtime39h: formatHcrEuro(HCR_EXAMPLE_II_2.overtimeGross39h),
  ii2Monthly39h: formatHcrEuro(HCR_EXAMPLE_II_2.monthlyGross39h),
  iii1Hourly: formatHcrEuro(HCR_EXAMPLE_III_1.applicableHourly),
  iii1Monthly35h: formatHcrEuro(HCR_EXAMPLE_III_1.monthlyGross35h),
  iii1Overtime39h: formatHcrEuro(HCR_EXAMPLE_III_1.overtimeGross39h),
  iii1Monthly39h: formatHcrEuro(HCR_EXAMPLE_III_1.monthlyGross39h),
  i1Conventional: formatHcrEuro(HCR_EXAMPLE_SMIC_FLOOR.conventionalHourly),
  i2Conventional: formatHcrEuro(HCR_EXAMPLE_I_2.conventionalHourly),
  i3Conventional: formatHcrEuro(HCR_EXAMPLE_I_3.conventionalHourly),
  ii1Conventional: formatHcrEuro(HCR_EXAMPLE_II_1.conventionalHourly),
  ii2Conventional: formatHcrEuro(HCR_EXAMPLE_II_2.conventionalHourly),
  ii3Hourly: formatHcrEuro(HCR_EXAMPLE_II_3.applicableHourly),
  ii3Monthly35h: formatHcrEuro(HCR_EXAMPLE_II_3.monthlyGross35h),
  ii3Monthly39h: formatHcrEuro(HCR_EXAMPLE_II_3.monthlyGross39h),
} as const;

export const SMIC_HOTELIER_FRESHNESS_LINE = `SMIC applicable depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}. Grille HCR de l'avenant n° 33 applicable depuis le ${HCR_GRID_EFFECTIVE_FROM_LABEL}. Vérifié le ${SMIC_HOTELIER_SOURCES_VERIFIED_AT_LABEL}.`;

export const SMIC_HOTELIER_SOURCES = {
  arreteSmicJuin2026: {
    label: "Arrêté du 22 mai 2026 relatif au relèvement du salaire minimum de croissance",
    org: "Légifrance (JO du 24 mai 2026)",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054126589",
  },
  servicePublicSmic: {
    label: "Smic (salaire minimum interprofessionnel de croissance)",
    org: "Service-Public.fr",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  avenant33Article2: {
    label: "Avenant n° 33 du 19 juin 2024, article 2 (minima HCR)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050394795",
  },
  ccnHcr: {
    label: "Convention collective nationale des hôtels, cafés restaurants (IDCC 1979)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635534/",
  },
  umihAvenant33: {
    label: "Texte signé de l'avenant n° 33 relatif aux salaires",
    org: "UMIH",
    href: "https://www.umih.fr/assets/files/site/ressources/convention-collective-nationale/Avenant_n__33_salaires_190624_signe.pdf",
  },
  codeTravailSmic: {
    label: "Code du travail : article L. 3231-2 (SMIC)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902778",
  },
  codeTravailDuree: {
    label: "Code du travail : article L. 3121-27 (durée légale de 35 heures)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020395",
  },
  codeTravailMajoration: {
    label: "Code du travail : article L. 3121-33 (plancher de majoration des heures supplémentaires)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020411",
  },
  codeTravailMinimumGaranti: {
    label: "Code du travail : article L. 3231-12 (minimum garanti)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902795",
  },
  umihRepas: {
    label: "Avantage nourriture : nouvelle valeur au 1er juin 2026",
    org: "UMIH",
    href: "https://www.umih.fr/medias/news/avantage-nourriture-nouvelle-valeur-au-1er-juin-2026.html",
  },
  urssafAvantages: {
    label: "Avantages en nature",
    org: "Bulletin officiel de la sécurité sociale (BOSS)",
    href: "https://boss.gouv.fr/portail/accueil/avantages-en-nature-et-frais-pro/avantages-en-nature.html",
  },
  tripalioAvenant36: {
    label: "Avenant n° 36 du 4 juin 2026 relatif aux salaires HCR (paru au BOCC, non étendu)",
    org: "Tripalio",
    href: "https://presse.tripalio.fr/les-salaires-evoluent-dans-la-ccn-des-hotels-cafes-restaurants-hcr/",
  },
} as const;
