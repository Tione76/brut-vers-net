/**
 * Source de vérité des montants SMIC affichés sur /smic.
 * À mettre à jour lors de chaque revalorisation / changement d'année éditoriale.
 *
 * Brut : montants légaux (arrêté / Service-Public).
 * Net : montants indicatifs Service-Public (pas un montant légal unique).
 *
 * En 2027 : mettre à jour SMIC_EDITORIAL_YEAR, montants, dates, historique récent.
 * L'URL `/smic` et le Title SEO evergreen restent stables.
 */

/** Année affichée dans le H1 et les libellés éditoriaux (pas dans le Title Google). */
export const SMIC_EDITORIAL_YEAR = 2026;

export const SMIC_VERIFIED_ON = "2026-09-07";

/** Date d'entrée en vigueur des montants affichés (pas la date de rédaction). */
export const SMIC_EFFECTIVE_FROM = "2026-06-01";

export const SMIC_EFFECTIVE_FROM_LABEL = "1er juin 2026";

export const SMIC_VERIFIED_ON_LABEL = "7 septembre 2026";

/** Base mensuelle usuelle pour 35 h/semaine (35 × 52 / 12 ≈ 151,67). */
export const SMIC_MONTHLY_HOURS = 151.67;

export const SMIC_CURRENT = {
  hourlyGross: 12.31,
  hourlyNetIndicative: 9.74,
  monthlyGross: 1867.02,
  monthlyNetIndicative: 1477.93,
  annualGross: 22404.2,
  annualNetIndicative: 17735.19,
} as const;

/** Montants en vigueur du 1er janvier au 31 mai 2026 (avant revalorisation automatique). */
export const SMIC_PREVIOUS = {
  hourlyGross: 12.02,
  monthlyGross: 1823.03,
  effectiveFrom: "2026-01-01",
  effectiveFromLabel: "1er janvier 2026",
} as const;

/** Alias historique : même objet que SMIC_PREVIOUS. */
export const SMIC_PREVIOUS_2026_JAN = SMIC_PREVIOUS;

/** Hausse officielle au 1er juin 2026. */
export const SMIC_LAST_INCREASE_PERCENT = 2.41;

/**
 * Cumul brut théorique sur l'année civile 2026 (temps plein au SMIC) :
 * 5 mois (janv.-mai) à l'ancien taux + 7 mois (juin-déc.) au taux actuel.
 * Ce n'est pas un montant officiel publié : c'est un exemple pédagogique.
 */
export const SMIC_CALENDAR_YEAR_2026 = {
  monthsAtPreviousRate: 5,
  monthsAtCurrentRate: 7,
  /** 5 × 1 823,03 + 7 × 1 867,02 */
  grossCumulative: 22184.29,
} as const;

/**
 * Title Google evergreen : aucune année, aucune marque.
 * (Pas de tiret cadratin : charte éditoriale du site.)
 */
export const SMIC_SEO_TITLE =
  "SMIC : montant brut et net, horaire et mensuel | Mis à jour";

export const SMIC_META_DESCRIPTION =
  "Quel est le SMIC brut et net ? Consultez les montants horaires et mensuels actuellement applicables, avec les règles de revalorisation.";

export const SMIC_H1 = `SMIC ${SMIC_EDITORIAL_YEAR} : quel est le montant brut et net ?`;

export const SMIC_AMOUNTS_BLOCK_TITLE = `SMIC ${SMIC_EDITORIAL_YEAR} : les montants à retenir`;

/** Phrase de fraîcheur unique (début de page / synthèse des cartes). */
export const SMIC_FRESHNESS_LINE = `Montants applicables depuis le ${SMIC_EFFECTIVE_FROM_LABEL}. Page mise à jour le ${SMIC_VERIFIED_ON_LABEL}.`;

/** @deprecated Utiliser SMIC_FRESHNESS_LINE */
export const SMIC_VALIDITY_LINE = SMIC_FRESHNESS_LINE;

export const SMIC_SOURCES = {
  arreteMai2026: {
    label: "Arrêté du 22 mai 2026 relatif au relèvement du salaire minimum de croissance",
    org: "Légifrance (Journal officiel du 24 mai 2026)",
    /** Sommaire JO vérifié : le texte y est publié ; l'accès direct JORFTEXT est parfois filtré. */
    href: "https://www.legifrance.gouv.fr/jorf/jo/2026/05/24/0121",
  },
  servicePublic: {
    label: "Smic (salaire minimum interprofessionnel de croissance)",
    org: "Service-Public.fr",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  codeTravailPrincipes: {
    label: "Code du travail : articles L. 3231-2 à L. 3231-3 (principes du Smic)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189459/",
  },
  codeTravailMinoration: {
    label: "Code du travail : articles R. 3231-1 à D. 3231-3 (minoration jeunes salariés)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018535718/",
  },
  inseeEvolution: {
    label: "Évolution du Smic : données annuelles",
    org: "INSEE",
    href: "https://www.insee.fr/fr/statistiques/serie/000008588",
  },
} as const;

function formatSmicEuro(value: number, digits: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    // Espaces insécables : évite de couper "1 867,02 €" au milieu
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

/** Libellés FR prêts à afficher (source unique pour éviter les divergences). */
export const SMIC_LABELS = {
  hourlyGross: `${formatSmicEuro(SMIC_CURRENT.hourlyGross, 2)}\u00a0€`,
  hourlyNet: `${formatSmicEuro(SMIC_CURRENT.hourlyNetIndicative, 2)}\u00a0€`,
  monthlyGross: `${formatSmicEuro(SMIC_CURRENT.monthlyGross, 2)}\u00a0€`,
  monthlyNet: `${formatSmicEuro(SMIC_CURRENT.monthlyNetIndicative, 2)}\u00a0€`,
  annualGross: `${formatSmicEuro(SMIC_CURRENT.annualGross, 2)}\u00a0€`,
  annualNet: `${formatSmicEuro(SMIC_CURRENT.annualNetIndicative, 2)}\u00a0€`,
  previousHourlyGross: `${formatSmicEuro(SMIC_PREVIOUS.hourlyGross, 2)}\u00a0€`,
  previousMonthlyGross: `${formatSmicEuro(SMIC_PREVIOUS.monthlyGross, 2)}\u00a0€`,
  increasePercent: `${formatSmicEuro(SMIC_LAST_INCREASE_PERCENT, 2)}\u00a0%`,
  monthlyHours: formatSmicEuro(SMIC_MONTHLY_HOURS, 2),
  calendarYearGrossCumulative: `${formatSmicEuro(SMIC_CALENDAR_YEAR_2026.grossCumulative, 2)}\u00a0€`,
} as const;
