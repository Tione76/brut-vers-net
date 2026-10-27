/**
 * Source de vérité éditoriale : /salaire-minimum-allemagne
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Mise à jour 2027 (aucune bascule automatique à la date du jour) :
 * - passer DE_MIN_WAGE_CURRENT_* sur 14,60 € / 1er janv. 2027 ;
 * - définir le prochain taux (s'il est déjà fixé) ou retirer le « futur » ;
 * - recalculer exemples mensuels / Eurostat / écart France via les constantes ;
 * - vérifier plafond minijob, H1 (année), dates published/updated/verified ;
 * - aligner la fiche Allemagne de /smic-europe après vérification officielle.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  absoluteDiff,
  eurostatMonthlyFromHourly,
  formatDeEuro,
  formatDeHourly,
  formatDePercent,
  monthlyFromHourlyWeekly,
  percentDiffVsBase,
} from "./engine";

export const DE_MIN_WAGE_SLUG = "salaire-minimum-allemagne";
export const DE_MIN_WAGE_PATH = "/salaire-minimum-allemagne";

export const DE_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales (YYYY-MM-DD).
 * - PUBLISHED_AT : date de première mise en ligne réelle. À figer une fois publiée ;
 *   ne pas la modifier lors des mises à jour ultérieures.
 * - UPDATED_AT : à avancer seulement en cas de changement réel du contenu.
 * Le JSON-LD complète YYYY-MM-DD en T09:00:00+02:00 (convention site, pas une heure mesurée).
 * Si une heure réelle de publication est connue, on peut passer un ISO complet ici uniquement.
 */
export const DE_MIN_WAGE_PUBLISHED_AT = "2026-10-27";
export const DE_MIN_WAGE_UPDATED_AT = "2026-10-27";
export const DE_MIN_WAGE_UPDATED_AT_LABEL = "27 octobre 2026";

export const DE_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-27";
export const DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "27 octobre 2026";

export const DE_MIN_WAGE_H1 =
  "Salaire minimum en Allemagne en 2026 : montant et règles";

export const DE_MIN_WAGE_SEO_TITLE =
  "Salaire minimum en Allemagne : montant horaire et mensuel (mis à jour)";

export const DE_MIN_WAGE_META_DESCRIPTION =
  "Découvrez le salaire minimum en Allemagne : montant horaire, estimation mensuelle, différence avec la France et règles applicables aux salariés.";

export const DE_MIN_WAGE_BREADCRUMB = "Salaire minimum Allemagne";

export const DE_MIN_WAGE_SUBTITLE =
  "Mindestlohn horaire, estimations mensuelles, comparaison avec le SMIC français et règles pour les salariés.";

/** Taux horaire brut actuellement applicable. */
export const DE_MIN_WAGE_CURRENT_HOURLY = 13.9;
export const DE_MIN_WAGE_CURRENT_FROM = "2026-01-01";
export const DE_MIN_WAGE_CURRENT_FROM_LABEL = "1er janvier 2026";

/** Taux futur déjà fixé par règlement (pas encore applicable). */
export const DE_MIN_WAGE_NEXT_HOURLY = 14.6;
export const DE_MIN_WAGE_NEXT_FROM = "2027-01-01";
export const DE_MIN_WAGE_NEXT_FROM_LABEL = "1er janvier 2027";

/** Taux précédent. */
export const DE_MIN_WAGE_PREVIOUS_HOURLY = 12.82;
export const DE_MIN_WAGE_PREVIOUS_FROM = "2025-01-01";
export const DE_MIN_WAGE_PREVIOUS_FROM_LABEL = "1er janvier 2025";

/** Plafond minijob (Verdienstgrenze) en 2026 : rémunération régulière moyenne. */
export const DE_MINIJOB_MONTHLY_CAP = 603;
export const DE_MINIJOB_ANNUAL_CAP = 7236;
export const DE_MINIJOB_CAP_FROM_LABEL = "1er janvier 2026";
/** Repère théorique d'heures mensuelles au seul taux de 13,90 € (603 ÷ 13,90). */
export const DE_MINIJOB_THEORETICAL_HOURS_AT_MIN =
  Math.round((DE_MINIJOB_MONTHLY_CAP / DE_MIN_WAGE_CURRENT_HOURLY) * 100) / 100;

/** Durées hebdomadaires utilisées pour les exemples mensuels pédagogiques. */
export const DE_MIN_WAGE_EXAMPLE_WEEKLY_HOURS = [20, 35, 38, 39, 40] as const;

export type DeMinWageWeeklyHours = (typeof DE_MIN_WAGE_EXAMPLE_WEEKLY_HOURS)[number];

/**
 * Facteurs Eurostat pour convertir le taux horaire allemand en équivalent mensuel
 * (données 2026). Les documents Eurostat divergent sur la date de début historique
 * de cette méthode (janvier ou juillet 2025) : on l'utilise ici pour 2026 uniquement.
 */
export const DE_EUROSTAT_WEEKLY_HOURS = 38.8;
export const DE_EUROSTAT_MONTH_FACTOR = 4.345;
export const DE_EUROSTAT_WEEKLY_HOURS_LABEL = DE_EUROSTAT_WEEKLY_HOURS.toLocaleString("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
export const DE_EUROSTAT_MONTH_FACTOR_LABEL = DE_EUROSTAT_MONTH_FACTOR.toLocaleString("fr-FR", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export const DE_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const DE_EUROSTAT_DATASET = "earn_mw_cur";

export const DE_MIN_WAGE_EXAMPLE_MONTHLY = Object.fromEntries(
  DE_MIN_WAGE_EXAMPLE_WEEKLY_HOURS.map((hours) => [
    hours,
    monthlyFromHourlyWeekly(DE_MIN_WAGE_CURRENT_HOURLY, hours),
  ]),
) as Record<DeMinWageWeeklyHours, number>;

export const DE_EUROSTAT_MONTHLY_COMPARABLE = eurostatMonthlyFromHourly(
  DE_MIN_WAGE_CURRENT_HOURLY,
);

/** SMIC français utilisé pour la comparaison (même source que /smic). */
export const DE_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const DE_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const DE_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const DE_COMPARE_HOURLY_DIFF = absoluteDiff(
  DE_MIN_WAGE_CURRENT_HOURLY,
  DE_COMPARE_FR_HOURLY,
);
export const DE_COMPARE_HOURLY_PCT_VS_FR = percentDiffVsBase(
  DE_MIN_WAGE_CURRENT_HOURLY,
  DE_COMPARE_FR_HOURLY,
);
export const DE_COMPARE_MONTHLY_35_DIFF = absoluteDiff(
  DE_MIN_WAGE_EXAMPLE_MONTHLY[35],
  DE_COMPARE_FR_MONTHLY,
);

export const DE_RISE_2025_TO_2026_PCT = percentDiffVsBase(
  DE_MIN_WAGE_CURRENT_HOURLY,
  DE_MIN_WAGE_PREVIOUS_HOURLY,
);
export const DE_RISE_2026_TO_2027_PCT = percentDiffVsBase(
  DE_MIN_WAGE_NEXT_HOURLY,
  DE_MIN_WAGE_CURRENT_HOURLY,
);

export const DE_MIN_WAGE_LABELS = {
  currentHourly: formatDeHourly(DE_MIN_WAGE_CURRENT_HOURLY),
  currentHourlyShort: formatDeEuro(DE_MIN_WAGE_CURRENT_HOURLY),
  nextHourly: formatDeHourly(DE_MIN_WAGE_NEXT_HOURLY),
  nextHourlyShort: formatDeEuro(DE_MIN_WAGE_NEXT_HOURLY),
  previousHourly: formatDeHourly(DE_MIN_WAGE_PREVIOUS_HOURLY),
  previousHourlyShort: formatDeEuro(DE_MIN_WAGE_PREVIOUS_HOURLY),
  monthly20: formatDeEuro(DE_MIN_WAGE_EXAMPLE_MONTHLY[20]),
  monthly35: formatDeEuro(DE_MIN_WAGE_EXAMPLE_MONTHLY[35]),
  monthly38: formatDeEuro(DE_MIN_WAGE_EXAMPLE_MONTHLY[38]),
  monthly39: formatDeEuro(DE_MIN_WAGE_EXAMPLE_MONTHLY[39]),
  monthly40: formatDeEuro(DE_MIN_WAGE_EXAMPLE_MONTHLY[40]),
  eurostatMonthly: formatDeEuro(DE_EUROSTAT_MONTHLY_COMPARABLE, 0),
  frHourly: formatDeHourly(DE_COMPARE_FR_HOURLY),
  frHourlyShort: formatDeEuro(DE_COMPARE_FR_HOURLY),
  frMonthly35: formatDeEuro(DE_COMPARE_FR_MONTHLY),
  hourlyDiff: formatDeEuro(DE_COMPARE_HOURLY_DIFF),
  hourlyPctVsFr: formatDePercent(DE_COMPARE_HOURLY_PCT_VS_FR),
  monthly35Diff: formatDeEuro(DE_COMPARE_MONTHLY_35_DIFF),
  rise2026: formatDePercent(DE_RISE_2025_TO_2026_PCT),
  rise2027: formatDePercent(DE_RISE_2026_TO_2027_PCT),
  minijobCap: formatDeEuro(DE_MINIJOB_MONTHLY_CAP, 0),
  minijobAnnual: formatDeEuro(DE_MINIJOB_ANNUAL_CAP, 0),
  minijobHoursAtMin: DE_MINIJOB_THEORETICAL_HOURS_AT_MIN.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  eurostatWeeklyHours: DE_EUROSTAT_WEEKLY_HOURS_LABEL,
  eurostatMonthFactor: DE_EUROSTAT_MONTH_FACTOR_LABEL,
};

export const DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum allemand en 2026";

export const DE_MIN_WAGE_FRESHNESS_LINE = `Vérification documentaire le ${DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Montant en vigueur depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}.`;

/** Chronologie courte (montants bruts / heure). */
export const DE_MIN_WAGE_HISTORY: ReadonlyArray<{
  fromLabel: string;
  hourly: number;
  status: "historical" | "current" | "future";
}> = [
  { fromLabel: "1er octobre 2022", hourly: 12.0, status: "historical" },
  { fromLabel: "1er janvier 2024", hourly: 12.41, status: "historical" },
  {
    fromLabel: DE_MIN_WAGE_PREVIOUS_FROM_LABEL,
    hourly: DE_MIN_WAGE_PREVIOUS_HOURLY,
    status: "historical",
  },
  {
    fromLabel: DE_MIN_WAGE_CURRENT_FROM_LABEL,
    hourly: DE_MIN_WAGE_CURRENT_HOURLY,
    status: "current",
  },
  {
    fromLabel: DE_MIN_WAGE_NEXT_FROM_LABEL,
    hourly: DE_MIN_WAGE_NEXT_HOURLY,
    status: "future",
  },
];

export const DE_MIN_WAGE_SOURCES = {
  bmasFr: {
    org: "BMAS",
    label: "Le salaire minimum (version française)",
    href: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Informationen-zum-Mindestlohn/informationen-zum-mindestlohn-franzoesisch.html",
  },
  bmasGlossar: {
    org: "BMAS",
    label: "Gesetzlicher Mindestlohn (historique et définition)",
    href: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Glossar/G/Gesetzlicher-Mindestlohn.html",
  },
  milov5: {
    org: "BMAS",
    label: "Fünfte Mindestlohnanpassungsverordnung (MiLoV5)",
    href: "https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/fuenfte-mindestlohnanpassungsverordnung-milov5.html",
  },
  branchenMindestlohn: {
    org: "BMAS",
    label: "Salaires minimums de branche (Branchenmindestlöhne)",
    href: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Branchenmindestlohn/Branchenmindestlohn-art.html",
  },
  milog: {
    org: "gesetze-im-internet.de",
    label: "Mindestlohngesetz (MiLoG)",
    href: "https://www.gesetze-im-internet.de/milog/",
  },
  milog22: {
    org: "gesetze-im-internet.de",
    label: "MiLoG, article 22 (champ d'application personnel)",
    href: "https://www.gesetze-im-internet.de/milog/__22.html",
  },
  kommission: {
    org: "Mindestlohnkommission",
    label: "Évolution du salaire minimum légal",
    href: "https://www.mindestlohn-kommission.de/de/Gesetzlicher-Mindestlohn/Entwicklung-des-Mindestlohn/entwicklung-des-mindestlohn_node",
  },
  minijob: {
    org: "Minijob-Zentrale",
    label: "Minijob avec plafond de rémunération",
    href: "https://www.minijob-zentrale.de/DE/die-minijobs/minijob-mit-verdienstgrenze",
  },
  minijobFaqCap: {
    org: "Minijob-Zentrale",
    label: "FAQ : peut-on gagner plus de 603 € en minijob ?",
    href: "https://www.minijob-zentrale.de/DE/meta/faq-bereich/lohn/18_mehr_als_556euro_verdienen/faq_18_mehr_als_603_euro_verdienen",
  },
  eurostatMeta: {
    org: "Eurostat",
    label: "Métadonnées salaires minimums (earn_minw)",
    href: "https://ec.europa.eu/eurostat/cache/metadata/EN/earn_minw_esms.htm",
  },
  eurostatExplained: {
    org: "Eurostat",
    label: "Minimum wage statistics (Statistics Explained)",
    href: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Minimum_wage_statistics",
  },
  eurostatData: {
    org: "Eurostat",
    label: "Monthly minimum wages (earn_mw_cur / tps00155)",
    href: "https://ec.europa.eu/eurostat/databrowser/product/view/tps00155",
  },
  servicePublicSmic: {
    org: "Service-Public",
    label: "SMIC (F2300)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
  },
  zollMindest: {
    org: "Zoll",
    label: "Mindestarbeitsbedingungen (contrôles douaniers)",
    href: "https://www.zoll.de/DE/Fachthemen/Arbeit/Mindestarbeitsbedingungen/mindestarbeitsbedingungen_node.html",
  },
} as const;
