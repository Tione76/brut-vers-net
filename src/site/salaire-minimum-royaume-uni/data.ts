/**
 * Source de vérité éditoriale : /salaire-minimum-royaume-uni
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - barèmes légaux d'avril (GOV.UK + SI) ;
 * - annonces d'automne LPC / gouvernement pour l'avril suivant ;
 * - fiscalité au 6 avril (Income Tax, NI, Écosse) ;
 * - taux volontaires Living Wage Foundation (automne, mise en œuvre 6 mois) ;
 * - accommodation offset ;
 * - conversion BCE datée ;
 * - fiche Royaume-Uni de /smic-europe (pas de conversion Eurostat inventée).
 * Pas de bascule automatique sur une annonce future.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  annualFromHourlyWeekly,
  fourWeeksFromHourlyWeekly,
  formatUkEuro,
  formatUkPercent,
  formatUkPound,
  gbpToEur,
  monthlyFromHourlyWeekly,
  percentDiffVsBase,
  ukLegalHourlyRate,
} from "./engine";

export const UK_MIN_WAGE_SLUG = "salaire-minimum-royaume-uni";
export const UK_MIN_WAGE_PATH = "/salaire-minimum-royaume-uni";

export const UK_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : mise en ligne le 30 octobre 2026.
 * - UPDATED_AT : même jour civil pour cette première version.
 */
export const UK_MIN_WAGE_PUBLISHED_AT = "2026-10-30T00:00:00+01:00";
export const UK_MIN_WAGE_UPDATED_AT = "2026-10-30T00:00:00+01:00";
export const UK_MIN_WAGE_UPDATED_AT_LABEL = "30 octobre 2026";

export const UK_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-30";
export const UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "30 octobre 2026";

export const UK_MIN_WAGE_H1 =
  "Salaire minimum au Royaume-Uni en 2026 : montants et règles";

export const UK_MIN_WAGE_SEO_TITLE =
  "Salaire minimum au Royaume-Uni : montants et règles (mis à jour)";

export const UK_MIN_WAGE_META_DESCRIPTION =
  "Salaire minimum au Royaume-Uni : taux horaires selon l'âge, exemples mensuels, apprentissage, Londres et différence entre minimum légal et Living Wage.";

export const UK_MIN_WAGE_BREADCRUMB = "Salaire minimum Royaume-Uni";

export const UK_MIN_WAGE_SUBTITLE =
  "National Living Wage, taux par âge, exemples mensuels et différence avec le real Living Wage.";

export const UK_NMW_EFFECTS_FROM = "2026-04-01";
export const UK_NMW_EFFECTS_FROM_LABEL = "1er avril 2026";
export const UK_NMW_SI = "The National Minimum Wage (Amendment) Regulations 2026";
export const UK_NMW_SI_NUMBER = "S.I. 2026/357";

/** Taux horaires bruts actuellement applicables (avril 2026). */
export const UK_NLW_HOURLY = 12.71;
export const UK_YOUTH_HOURLY = 10.85;
export const UK_UNDER18_HOURLY = 8;
export const UK_APPRENTICE_HOURLY = 8;
export const UK_ADULT_AGE = 21;

export const UK_PREVIOUS_FROM_LABEL = "1er avril 2025";
export const UK_PREVIOUS_UNTIL_LABEL = "31 mars 2026";
export const UK_PREVIOUS_NLW = 12.21;
export const UK_PREVIOUS_YOUTH = 10;
export const UK_PREVIOUS_UNDER18 = 7.55;
export const UK_PREVIOUS_APPRENTICE = 7.55;

/**
 * Annonce gouvernementale du 28 octobre 2026, acceptation des
 * recommandations LPC, effets visés en avril 2027. Pas le taux applicable.
 */
export const UK_2027_ANNOUNCED_ON_LABEL = "28 octobre 2026";
export const UK_2027_EFFECTS_FROM_LABEL = "1er avril 2027";
export const UK_2027_NLW = 13.21;
export const UK_2027_YOUTH = 11.27;
export const UK_2027_UNDER18 = 8.31;
export const UK_2027_APPRENTICE = 8.31;
export const UK_2027_OFFSET_DAILY = 11.53;

export const UK_OFFSET_DAILY = 11.1;
export const UK_OFFSET_WEEKLY = 77.7;

export const UK_EXAMPLE_WEEKLY_HOURS = 37.5;
export const UK_EXAMPLE_HOURS_20 = 20;
export const UK_EXAMPLE_HOURS_35 = 35;
export const UK_EXAMPLE_HOURS_40 = 40;

export const UK_MONTHLY_375 = monthlyFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_WEEKLY_HOURS,
);
export const UK_ANNUAL_375 = annualFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_WEEKLY_HOURS,
);
export const UK_FOUR_WEEKS_375 = fourWeeksFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_WEEKLY_HOURS,
);
export const UK_MONTHLY_20 = monthlyFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_20,
);
export const UK_ANNUAL_20 = annualFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_20,
);
export const UK_MONTHLY_35 = monthlyFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_35,
);
export const UK_ANNUAL_35 = annualFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_35,
);
export const UK_MONTHLY_40 = monthlyFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_40,
);
export const UK_ANNUAL_40 = annualFromHourlyWeekly(
  UK_NLW_HOURLY,
  UK_EXAMPLE_HOURS_40,
);

export const UK_CURRENT_RATES = {
  adult: UK_NLW_HOURLY,
  youth: UK_YOUTH_HOURLY,
  under18: UK_UNDER18_HOURLY,
  apprentice: UK_APPRENTICE_HOURLY,
};

export const UK_APPRENTICE_21_FIRST_YEAR = ukLegalHourlyRate(
  21,
  UK_CURRENT_RATES,
  { inApprenticeship: true, completedFirstYear: false },
);
export const UK_APPRENTICE_21_AFTER_YEAR = ukLegalHourlyRate(
  21,
  UK_CURRENT_RATES,
  { inApprenticeship: true, completedFirstYear: true },
);

/** Exemple GOV.UK : 40 h à 13 £, 15 £ de location d'uniforme non remboursés. */
export const UK_UNIFORM_HOURLY = 13;
export const UK_UNIFORM_HOURS = 40;
export const UK_UNIFORM_COST = 15;
export const UK_UNIFORM_GROSS = UK_UNIFORM_HOURLY * UK_UNIFORM_HOURS;
export const UK_UNIFORM_COUNTING = UK_UNIFORM_GROSS - UK_UNIFORM_COST;
export const UK_UNIFORM_EQUIVALENT = UK_UNIFORM_COUNTING / UK_UNIFORM_HOURS;

/**
 * Real Living Wage volontaire, Living Wage Foundation,
 * annonce du 15 octobre 2026, mise en œuvre chez les employeurs
 * accrédités au plus tard le 1er mai 2027.
 */
export const UK_RLW_ANNOUNCED_ON_LABEL = "15 octobre 2026";
export const UK_RLW_IMPLEMENT_BY_LABEL = "1er mai 2027";
export const UK_RLW_UK = 14.1;
export const UK_RLW_LONDON = 15.45;

/**
 * BCE, 1 € = 0,83578 £, publié le 29 octobre 2026
 * (taux de référence du 29, affiché pour le 30 octobre).
 */
export const UK_ECB_EUR_PER_GBP = 0.83578;
export const UK_ECB_RATE_DATE = "2026-10-29";
export const UK_ECB_RATE_LABEL = "29 octobre 2026";
export const UK_NLW_IN_EUR = gbpToEur(UK_NLW_HOURLY, UK_ECB_EUR_PER_GBP);
/** Conversion à partir du mensuel non arrondi, puis arrondi à l'affichage. */
export const UK_MONTHLY_35_IN_EUR = gbpToEur(
  (UK_NLW_HOURLY * UK_EXAMPLE_HOURS_35 * 52) / 12,
  UK_ECB_EUR_PER_GBP,
);

export const UK_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const UK_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const UK_COMPARE_FR_ANNUAL = SMIC_CURRENT.annualGross;
export const UK_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const UK_HOURLY_PCT_VS_FR = percentDiffVsBase(
  UK_NLW_HOURLY / UK_ECB_EUR_PER_GBP,
  UK_COMPARE_FR_HOURLY,
);

export const UK_MIN_WAGE_LABELS = {
  nlw: formatUkPound(UK_NLW_HOURLY),
  youth: formatUkPound(UK_YOUTH_HOURLY),
  under18: formatUkPound(UK_UNDER18_HOURLY, 2),
  apprentice: formatUkPound(UK_APPRENTICE_HOURLY, 2),
  previousNlw: formatUkPound(UK_PREVIOUS_NLW),
  previousYouth: formatUkPound(UK_PREVIOUS_YOUTH, 2),
  previousUnder18: formatUkPound(UK_PREVIOUS_UNDER18),
  previousApprentice: formatUkPound(UK_PREVIOUS_APPRENTICE),
  announced2027Nlw: formatUkPound(UK_2027_NLW),
  announced2027Youth: formatUkPound(UK_2027_YOUTH),
  announced2027Under18: formatUkPound(UK_2027_UNDER18),
  announced2027Apprentice: formatUkPound(UK_2027_APPRENTICE),
  offsetDaily: formatUkPound(UK_OFFSET_DAILY),
  offsetWeekly: formatUkPound(UK_OFFSET_WEEKLY),
  monthly375: formatUkPound(UK_MONTHLY_375),
  annual375: formatUkPound(UK_ANNUAL_375),
  fourWeeks375: formatUkPound(UK_FOUR_WEEKS_375),
  monthly20: formatUkPound(UK_MONTHLY_20),
  annual20: formatUkPound(UK_ANNUAL_20),
  monthly35: formatUkPound(UK_MONTHLY_35),
  annual35: formatUkPound(UK_ANNUAL_35),
  monthly40: formatUkPound(UK_MONTHLY_40),
  annual40: formatUkPound(UK_ANNUAL_40),
  rlwUk: formatUkPound(UK_RLW_UK),
  rlwLondon: formatUkPound(UK_RLW_LONDON),
  nlwEur: formatUkEuro(UK_NLW_IN_EUR),
  monthly35Eur: formatUkEuro(UK_MONTHLY_35_IN_EUR),
  frHourly: formatUkEuro(UK_COMPARE_FR_HOURLY),
  frMonthly35: formatUkEuro(UK_COMPARE_FR_MONTHLY),
  frAnnual: formatUkEuro(UK_COMPARE_FR_ANNUAL, 2),
  hourlyPctVsFr: formatUkPercent(Math.abs(UK_HOURLY_PCT_VS_FR)),
  hours375: "37,5",
  hours20: "20",
  hours35: "35",
  hours40: "40",
  adultAge: String(UK_ADULT_AGE),
  uniformHourly: formatUkPound(UK_UNIFORM_HOURLY, 2),
  uniformGross: formatUkPound(UK_UNIFORM_GROSS, 2),
  uniformCost: formatUkPound(UK_UNIFORM_COST, 2),
  uniformEquivalent: formatUkPound(UK_UNIFORM_EQUIVALENT, 3),
};

export const UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum au Royaume-Uni en 2026";

export const UK_MIN_WAGE_SOURCES = {
  govRates: {
    org: "GOV.UK",
    label: "National Minimum Wage and National Living Wage rates",
    href: "https://www.gov.uk/national-minimum-wage-rates",
  },
  lpc2026: {
    org: "Low Pay Commission",
    label: "Minimum wage rates for 2026",
    href: "https://www.gov.uk/government/publications/minimum-wage-rates-for-2026",
  },
  si2026: {
    org: "legislation.gov.uk",
    label: "The National Minimum Wage (Amendment) Regulations 2026 (S.I. 2026/357)",
    href: "https://www.legislation.gov.uk/uksi/2026/357/made",
  },
  nmw2015: {
    org: "legislation.gov.uk",
    label: "The National Minimum Wage Regulations 2015",
    href: "https://www.legislation.gov.uk/uksi/2015/621/contents",
  },
  nmwAct: {
    org: "legislation.gov.uk",
    label: "National Minimum Wage Act 1998",
    href: "https://www.legislation.gov.uk/ukpga/1998/39/contents",
  },
  lpc2027: {
    org: "Low Pay Commission",
    label: "Minimum wage rates for 2027",
    href: "https://www.gov.uk/government/publications/minimum-wage-rates-for-2027",
  },
  commons: {
    org: "House of Commons Library",
    label: "National Minimum Wage statistics (CBP-7735)",
    href: "https://commonslibrary.parliament.uk/research-briefings/cbp-7735/",
  },
  whoGets: {
    org: "GOV.UK",
    label: "Who gets the minimum wage",
    href: "https://www.gov.uk/national-minimum-wage/who-gets-the-minimum-wage",
  },
  internships: {
    org: "GOV.UK",
    label: "Work experience and internships",
    href: "https://www.gov.uk/guidance/national-minimum-wage-work-experience-and-internships",
  },
  calculating: {
    org: "GOV.UK",
    label: "Calculating the minimum wage",
    href: "https://www.gov.uk/guidance/calculating-the-minimum-wage/calculating-the-minimum-wage",
  },
  hours: {
    org: "GOV.UK",
    label: "Working hours for which the minimum wage must be paid",
    href: "https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid",
  },
  acasIncrease: {
    org: "Acas",
    label: "When increases are paid",
    href: "https://www.acas.org.uk/national-minimum-wage-entitlement/when-your-rate-increases",
  },
  accommodation: {
    org: "GOV.UK",
    label: "Accommodation offset rates",
    href: "https://www.gov.uk/national-minimum-wage-accommodation",
  },
  accommodationEffect: {
    org: "GOV.UK",
    label: "Effect of accommodation on the minimum wage",
    href: "https://www.gov.uk/national-minimum-wage-accommodation/effect-on-the-minimum-wage",
  },
  rlw: {
    org: "Living Wage Foundation",
    label: "What is the real Living Wage?",
    href: "https://www.livingwage.org.uk/what-real-living-wage",
  },
  rlwAnnounce: {
    org: "Living Wage Foundation",
    label: "Annonce du real Living Wage, 15 octobre 2026",
    href: "https://www.livingwage.org.uk/news/real-living-wage-increases-%C2%A31410-uk-and-%C2%A31545-london",
  },
  estimateTax: {
    org: "GOV.UK",
    label: "Estimate your Income Tax for the current year",
    href: "https://www.gov.uk/estimate-income-tax",
  },
  incomeTax: {
    org: "GOV.UK",
    label: "Income Tax rates and Personal Allowances",
    href: "https://www.gov.uk/income-tax-rates",
  },
  ni: {
    org: "GOV.UK",
    label: "National Insurance : how much you pay",
    href: "https://www.gov.uk/national-insurance/how-much-you-pay",
  },
  hoursMax: {
    org: "GOV.UK",
    label: "Maximum weekly working hours",
    href: "https://www.gov.uk/maximum-weekly-working-hours",
  },
  holiday: {
    org: "GOV.UK",
    label: "Holiday entitlement",
    href: "https://www.gov.uk/holiday-entitlement-rights",
  },
  holidayReforms: {
    org: "GOV.UK",
    label: "Holiday pay and entitlement reforms from 1 January 2024",
    href: "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024",
  },
  acasCheckPay: {
    org: "Acas",
    label: "Check if you are getting the minimum wage",
    href: "https://www.acas.org.uk/national-minimum-wage-entitlement/check-if-you-are-getting-minimum-wage",
  },
  disputes: {
    org: "GOV.UK",
    label: "Worker disputes over minimum wage",
    href: "https://www.gov.uk/national-minimum-wage/worker-disputes-over-minimum-wage",
  },
  payRights: {
    org: "GOV.UK",
    label: "Complain about pay and work rights",
    href: "https://www.gov.uk/pay-and-work-rights",
  },
  calculator: {
    org: "GOV.UK",
    label: "National Minimum Wage calculator",
    href: "https://www.gov.uk/minimum-wage-calculator",
  },
  nidirect: {
    org: "nidirect",
    label: "National Minimum Wage and Living Wage (Irlande du Nord)",
    href: "https://www.nidirect.gov.uk/articles/national-minimum-wage-and-living-wage",
  },
  nidirectHolidays: {
    org: "nidirect",
    label: "Taking your holidays (Irlande du Nord)",
    href: "https://www.nidirect.gov.uk/articles/taking-your-holidays",
  },
  lra: {
    org: "Labour Relations Agency",
    label: "Labour Relations Agency (Irlande du Nord)",
    href: "https://www.lra.org.uk/",
  },
  acas: {
    org: "Acas",
    label: "Acas, National Minimum Wage",
    href: "https://www.acas.org.uk/national-minimum-wage-entitlement",
  },
  ecb: {
    org: "BCE",
    label: "Taux de change de référence euro / livre sterling",
    href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
  },
  smicFr: {
    org: "Service-Public.fr",
    label: "SMIC (fiche F2300)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  workUk: {
    org: "GOV.UK",
    label: "Check if you need a UK visa",
    href: "https://www.gov.uk/check-uk-visa",
  },
};
