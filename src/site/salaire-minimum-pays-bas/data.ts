/**
 * Source de vérité éditoriale : /salaire-minimum-pays-bas
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - barèmes ordinaires janvier et juillet (Rijksoverheid + Staatscourant) ;
 * - barème BBL distinct (18-20 ans) jusqu'au 31 décembre 2026 ;
 * - réforme jeunes / BBL (Staatsblad 2026, 279) au 1er janvier 2027 ;
 * - indexation adulte 2027 (lettre + publication Staatscourant) ;
 * - pécule d'au moins 8 % ;
 * - retenues logement (25 %) et plafond 2026 assurance santé ;
 * - projet d'abolition des retenues logement (objectif 1er juillet 2028) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - fiche Pays-Bas de /smic-europe (méthode Eurostat inchangée).
 * Pas de bascule automatique sur une annonce future.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  annualFromHourlyWeekly,
  formatNlEuro,
  formatNlPercent,
  holidayAllowanceFromAnnual,
  monthlyFromHourlyWeekly,
  nlLegalHourlyRate,
  percentDiffVsBase,
  type NlBblRates,
  type NlOrdinaryRates,
} from "./engine";

export const NL_MIN_WAGE_SLUG = "salaire-minimum-pays-bas";
export const NL_MIN_WAGE_PATH = "/salaire-minimum-pays-bas";

export const NL_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : préparée pour une mise en ligne le 30 octobre 2026.
 *   La page n'est pas encore publiée tant qu'il n'y a pas commit / déploiement.
 * - UPDATED_AT : même jour civil pour cette première version.
 */
export const NL_MIN_WAGE_PUBLISHED_AT = "2026-10-30T00:00:00+01:00";
export const NL_MIN_WAGE_UPDATED_AT = "2026-10-30T00:00:00+01:00";
export const NL_MIN_WAGE_UPDATED_AT_LABEL = "30 octobre 2026";

export const NL_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-30";
export const NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "30 octobre 2026";

export const NL_MIN_WAGE_H1 =
  "Salaire minimum aux Pays-Bas en 2026 : montants et règles";

export const NL_MIN_WAGE_SEO_TITLE =
  "Salaire minimum aux Pays-Bas : montants et règles (mis à jour)";

export const NL_MIN_WAGE_META_DESCRIPTION =
  "Salaire minimum aux Pays-Bas : taux horaire brut, barèmes par âge et apprentissage, exemples mensuels, pécule de vacances et règles pour les salariés.";

export const NL_MIN_WAGE_BREADCRUMB = "Salaire minimum Pays-Bas";

export const NL_MIN_WAGE_SUBTITLE =
  "Minimumuurloon, barèmes par âge, exemples mensuels et pécule de vacances.";

export const NL_ADULT_AGE = 21;
export const NL_HOURLY_FROM = "2024-01-01";
export const NL_HOURLY_FROM_LABEL = "1er janvier 2024";

/** Taux actuellement applicables (1er juillet 2026). Staatscourant 2026, 16505. */
export const NL_NMW_EFFECTS_FROM = "2026-07-01";
export const NL_NMW_EFFECTS_FROM_LABEL = "1er juillet 2026";
export const NL_NMW_STCRT = "Staatscourant 2026, n° 16505";
export const NL_ADULT_HOURLY = 14.99;
export const NL_AGE20_HOURLY = 11.99;
export const NL_AGE19_HOURLY = 8.99;
export const NL_AGE18_HOURLY = 7.5;
export const NL_AGE17_HOURLY = 5.92;
export const NL_AGE16_HOURLY = 5.17;
export const NL_AGE15_HOURLY = 4.5;

export const NL_CURRENT_ORDINARY: NlOrdinaryRates = {
  adult: NL_ADULT_HOURLY,
  age20: NL_AGE20_HOURLY,
  age19: NL_AGE19_HOURLY,
  age18: NL_AGE18_HOURLY,
  age17: NL_AGE17_HOURLY,
  age16: NL_AGE16_HOURLY,
  age15: NL_AGE15_HOURLY,
};

export const NL_BBL_AGE20_HOURLY = 9.22;
export const NL_BBL_AGE19_HOURLY = 7.87;
export const NL_BBL_AGE18_HOURLY = 6.82;

export const NL_CURRENT_BBL: NlBblRates = {
  age20: NL_BBL_AGE20_HOURLY,
  age19: NL_BBL_AGE19_HOURLY,
  age18: NL_BBL_AGE18_HOURLY,
};

export const NL_PREVIOUS_FROM_LABEL = "1er janvier 2026";
export const NL_PREVIOUS_UNTIL_LABEL = "30 juin 2026";
export const NL_PREVIOUS_ADULT = 14.71;
export const NL_PREVIOUS_AGE20 = 11.77;
export const NL_PREVIOUS_AGE19 = 8.83;
export const NL_PREVIOUS_AGE18 = 7.36;
export const NL_PREVIOUS_AGE17 = 5.81;
export const NL_PREVIOUS_AGE16 = 5.07;
export const NL_PREVIOUS_AGE15 = 4.41;

export const NL_PREVIOUS_BBL_AGE20 = 9.05;
export const NL_PREVIOUS_BBL_AGE19 = 7.72;
export const NL_PREVIOUS_BBL_AGE18 = 6.69;

/** Referentiemaandloon, art. 8 WML : indexation et prestations, pas le salaire dû. */
export const NL_REFERENCE_MONTHLY = 2337;

export const NL_EXAMPLE_HOURS_20 = 20;
export const NL_EXAMPLE_HOURS_35 = 35;
export const NL_EXAMPLE_HOURS_36 = 36;
export const NL_EXAMPLE_HOURS_38 = 38;
export const NL_EXAMPLE_HOURS_40 = 40;

export const NL_MONTHLY_20 = monthlyFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_20,
);
export const NL_ANNUAL_20 = annualFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_20,
);
export const NL_MONTHLY_35 = monthlyFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_35,
);
export const NL_ANNUAL_35 = annualFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_35,
);
export const NL_MONTHLY_36 = monthlyFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_36,
);
export const NL_ANNUAL_36 = annualFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_36,
);
export const NL_MONTHLY_38 = monthlyFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_38,
);
export const NL_ANNUAL_38 = annualFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_38,
);
export const NL_MONTHLY_40 = monthlyFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_40,
);
export const NL_ANNUAL_40 = annualFromHourlyWeekly(
  NL_ADULT_HOURLY,
  NL_EXAMPLE_HOURS_40,
);

export const NL_HOLIDAY_RATE = 0.08;
export const NL_HOLIDAY_36 = holidayAllowanceFromAnnual(
  NL_ANNUAL_36,
  NL_HOLIDAY_RATE,
);
export const NL_ANNUAL_36_WITH_HOLIDAY = NL_ANNUAL_36 + NL_HOLIDAY_36;
export const NL_HOLIDAY_HOURS_36 = NL_EXAMPLE_HOURS_36 * 4;

export const NL_BBL_20 = nlLegalHourlyRate(20, NL_CURRENT_ORDINARY, {
  inBbl: true,
  bbl: NL_CURRENT_BBL,
});
export const NL_ORDINARY_20 = nlLegalHourlyRate(20, NL_CURRENT_ORDINARY);

/**
 * Indexation adulte au 1er janvier 2027.
 * Lettre ministérielle du 29 octobre 2026 et règlement joint, transmis
 * pour publication au Staatscourant. Vérifié le 30 octobre 2026 : cette
 * publication n'a pas été identifiée.
 */
export const NL_2027_ANNOUNCED_ON_LABEL = "29 octobre 2026";
export const NL_2027_EFFECTS_FROM_LABEL = "1er janvier 2027";
export const NL_2027_STATUS =
  "annonce ministérielle, publication au Staatscourant non identifiée";
export const NL_2027_ADULT = 15.29;
export const NL_2027_AGE20 = 13.38;
export const NL_2027_AGE19 = 11.47;
export const NL_2027_AGE18 = 9.56;
export const NL_2027_AGE17 = 7.65;
export const NL_2027_AGE16 = 6.12;
export const NL_2027_AGE15 = 4.59;
export const NL_2027_REFERENCE_MONTHLY = 2385;

/** Staatsblad 2026, 279 : pourcentages jeunes et disparition du BBL distinct. */
export const NL_2027_DECREE = "Staatsblad 2026, 279";
export const NL_2027_DECREE_DATE_LABEL = "9 septembre 2026";

export const NL_HOUSING_DEDUCTION_MAX_SHARE = 0.25;
export const NL_HEALTH_DEDUCTION_ANNUAL_2026 = 2098.8;
export const NL_HEALTH_DEDUCTION_MONTHLY_2026 = 174.9;
export const NL_HOUSING_REFORM_TARGET_LABEL = "1er juillet 2028";
export const NL_HOUSING_REFORM_ANNOUNCED_ON_LABEL = "10 septembre 2026";

export const NL_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const NL_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const NL_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const NL_HOURLY_PCT_VS_FR = percentDiffVsBase(
  NL_ADULT_HOURLY,
  NL_COMPARE_FR_HOURLY,
);

/** Même série que /smic-europe : earn_mw_cur, 2026-S2. */
export const NL_EUROSTAT_MONTHLY = 2338;
export const NL_EUROSTAT_PERIOD = "2026-S2";
export const NL_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const NL_EUROSTAT_DATASET = "earn_mw_cur";

export const NL_MIN_WAGE_LABELS = {
  adult: formatNlEuro(NL_ADULT_HOURLY),
  age20: formatNlEuro(NL_AGE20_HOURLY),
  age19: formatNlEuro(NL_AGE19_HOURLY),
  age18: formatNlEuro(NL_AGE18_HOURLY),
  age17: formatNlEuro(NL_AGE17_HOURLY),
  age16: formatNlEuro(NL_AGE16_HOURLY),
  age15: formatNlEuro(NL_AGE15_HOURLY),
  bbl20: formatNlEuro(NL_BBL_AGE20_HOURLY),
  bbl19: formatNlEuro(NL_BBL_AGE19_HOURLY),
  bbl18: formatNlEuro(NL_BBL_AGE18_HOURLY),
  previousAdult: formatNlEuro(NL_PREVIOUS_ADULT),
  previousAge20: formatNlEuro(NL_PREVIOUS_AGE20),
  previousAge19: formatNlEuro(NL_PREVIOUS_AGE19),
  previousAge18: formatNlEuro(NL_PREVIOUS_AGE18),
  previousAge17: formatNlEuro(NL_PREVIOUS_AGE17),
  previousAge16: formatNlEuro(NL_PREVIOUS_AGE16),
  previousAge15: formatNlEuro(NL_PREVIOUS_AGE15),
  announced2027Adult: formatNlEuro(NL_2027_ADULT),
  announced2027Age20: formatNlEuro(NL_2027_AGE20),
  announced2027Age19: formatNlEuro(NL_2027_AGE19),
  announced2027Age18: formatNlEuro(NL_2027_AGE18),
  announced2027Age17: formatNlEuro(NL_2027_AGE17),
  announced2027Age16: formatNlEuro(NL_2027_AGE16),
  announced2027Age15: formatNlEuro(NL_2027_AGE15),
  referenceMonthly: formatNlEuro(NL_REFERENCE_MONTHLY, 2),
  monthly20: formatNlEuro(NL_MONTHLY_20),
  annual20: formatNlEuro(NL_ANNUAL_20),
  monthly35: formatNlEuro(NL_MONTHLY_35),
  annual35: formatNlEuro(NL_ANNUAL_35),
  monthly36: formatNlEuro(NL_MONTHLY_36),
  annual36: formatNlEuro(NL_ANNUAL_36),
  monthly38: formatNlEuro(NL_MONTHLY_38),
  annual38: formatNlEuro(NL_ANNUAL_38),
  monthly40: formatNlEuro(NL_MONTHLY_40),
  annual40: formatNlEuro(NL_ANNUAL_40),
  holiday36: formatNlEuro(NL_HOLIDAY_36),
  annual36WithHoliday: formatNlEuro(NL_ANNUAL_36_WITH_HOLIDAY),
  holidayRate: formatNlPercent(NL_HOLIDAY_RATE * 100, 0),
  holidayHours36: String(NL_HOLIDAY_HOURS_36),
  healthDeductionAnnual: formatNlEuro(NL_HEALTH_DEDUCTION_ANNUAL_2026),
  healthDeductionMonthly: formatNlEuro(NL_HEALTH_DEDUCTION_MONTHLY_2026),
  housingShare: formatNlPercent(NL_HOUSING_DEDUCTION_MAX_SHARE * 100, 0),
  frHourly: formatNlEuro(NL_COMPARE_FR_HOURLY),
  frMonthly35: formatNlEuro(NL_COMPARE_FR_MONTHLY),
  hourlyPctVsFr: formatNlPercent(Math.abs(NL_HOURLY_PCT_VS_FR)),
  eurostatMonthly: formatNlEuro(NL_EUROSTAT_MONTHLY, 0),
  hours20: "20",
  hours35: "35",
  hours36: "36",
  hours38: "38",
  hours40: "40",
  adultAge: String(NL_ADULT_AGE),
};

export const NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum aux Pays-Bas en 2026";

export const NL_MIN_WAGE_SOURCES = {
  govAmounts: {
    org: "Government.nl",
    label: "Minimum wage amounts",
    href: "https://www.government.nl/themes/work/minimum-wage/minimum-wage-amounts",
  },
  rijkAmounts2026: {
    org: "Rijksoverheid",
    label: "Bedragen minimumloon 2026",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026",
  },
  rijkBbl2026: {
    org: "Rijksoverheid",
    label: "Bedragen minimumloon bbl-opleiding 2026",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon-bbl-opleiding/bedragen-minimumloon-bbl-2026",
  },
  stcrt16505: {
    org: "officielebekendmakingen.nl",
    label: "Staatscourant 2026, 16505",
    href: "https://zoek.officielebekendmakingen.nl/stcrt-2026-16505.html",
  },
  wml: {
    org: "wetten.overheid.nl",
    label: "Wet minimumloon en minimumvakantiebijslag",
    href: "https://wetten.overheid.nl/BWBR0002638/",
  },
  hourlyFrom2024: {
    org: "Rijksoverheid",
    label: "Minimumuurloon vanaf 2024",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/minimumuurloon-2024",
  },
  whenMinWage: {
    org: "Rijksoverheid",
    label: "Wanneer krijg ik minimumloon ?",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/vraag-en-antwoord/minimumloon/wanneer-minimumloon",
  },
  components: {
    org: "Government.nl",
    label: "What counts towards my minimum wage?",
    href: "https://www.government.nl/themes/work/minimum-wage/components-of-the-minimum-wage",
  },
  holidayPay: {
    org: "Business.gov.nl",
    label: "Paying holiday allowance to your staff",
    href: "https://business.gov.nl/staff/terms-of-employment/paying-holiday-allowance-to-your-staff/",
  },
  holidayHours: {
    org: "Government.nl",
    label: "Taking holiday hours",
    href: "https://www.government.nl/themes/work/working-hours/taking-holiday-hours",
  },
  internshipsNla: {
    org: "Nederlandse Arbeidsinspectie",
    label: "Traineeship allowance",
    href: "https://www.nllabourauthority.nl/topics/minimum-wage-and-minimum-holiday-allowance-act/traineeship-allowance",
  },
  internshipsBiz: {
    org: "Business.gov.nl",
    label: "Work placement and interns",
    href: "https://business.gov.nl/regulations/work-placement-interns/",
  },
  housing: {
    org: "Rijksoverheid",
    label: "Huur en zorgverzekering inhouden op het minimumloon",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/vraag-en-antwoord/minimumloon/kosten-voor-huur-en-zorgverzekering-inhouden-op-minimumloon-werknemer",
  },
  housingReform: {
    org: "Rijksoverheid",
    label: "Annonce du 10 septembre 2026 sur les retenues de loyer",
    href: "https://www.rijksoverheid.nl/actueel/nieuws/2026/09/10/werkgever-mag-geen-huur-meer-inhouden-op-minimumloon-arbeidsmigrant",
  },
  stb279: {
    org: "officielebekendmakingen.nl",
    label: "Staatsblad 2026, 279",
    href: "https://zoek.officielebekendmakingen.nl/stb-2026-279.html",
  },
  kamer2027: {
    org: "Tweede Kamer",
    label: "Indexatie van het wettelijk minimumloon per 1 januari 2027",
    href: "https://www.tweedekamer.nl/kamerstukken/brieven_regering/detail?did=2026D54071&id=2026Z23451",
  },
  loonheffing: {
    org: "Belastingdienst",
    label: "Loonheffingskorting toepassen of stoppen",
    href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/loonheffingskorting-toepassen-of-stoppen",
  },
  healthInsurance: {
    org: "Government.nl",
    label: "Standard health insurance",
    href: "https://www.government.nl/themes/family-health-and-care/health-insurance/standard-health-insurance",
  },
  underpaid: {
    org: "Government.nl",
    label: "What if I receive less than the hourly minimum wage?",
    href: "https://www.government.nl/themes/work/minimum-wage/less-than-the-minimum-wage",
  },
  reportNla: {
    org: "Nederlandse Arbeidsinspectie",
    label: "Reporting unsafe, unhealthy or unfair working conditions",
    href: "https://www.nllabourauthority.nl/topics/i-want-to-report-something/reporting-unsafe-unhealthy-or-unfair-working-conditions",
  },
  workInNl: {
    org: "Work in NL",
    label: "Work in NL",
    href: "https://www.workinnl.nl/",
  },
  smicFr: {
    org: "Service-Public.fr",
    label: "SMIC (fiche F2300)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  eurostatData: {
    org: "Eurostat",
    label: "Monthly minimum wages (earn_mw_cur), 2026-S2",
    href: "https://ec.europa.eu/eurostat/databrowser/view/earn_mw_cur/default/table?lang=fr",
  },
  eurostatMeta: {
    org: "Eurostat",
    label: "Métadonnées salaires minimums (earn_minw)",
    href: "https://ec.europa.eu/eurostat/cache/metadata/en/earn_minw_esms.htm",
  },
};
