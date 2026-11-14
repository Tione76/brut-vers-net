/**
 * Données et calculs du guide /prime-precarite.
 * Exemples chiffrés conditionnels, sans moteur de paie CDD.
 */

export const PRECARITE_SLUG = "prime-precarite";
export const PRECARITE_PATH = "/prime-precarite";
export const PRECARITE_BREADCRUMB = "Prime de précarité";

export const PRECARITE_H1 =
  "Prime de précarité : calcul, montant net et conditions en fin de CDD";

export const PRECARITE_SEO_TITLE =
  "Prime de précarité : calcul, net et conditions (mis à jour)";

export const PRECARITE_META_DESCRIPTION =
  "Calculez votre prime de précarité en fin de CDD : taux de 10 % ou 6 %, montant brut et net, congés payés, exceptions et date de versement.";

export const PRECARITE_SUBTITLE =
  "En fin de CDD, la prime de précarité représente en principe 10 % de la rémunération brute totale du contrat. Son versement dépend toutefois du type de contrat et des conditions de départ. Retrouvez le calcul, les exceptions, la différence entre brut et net et les règles concernant les congés payés.";

/** Première publication publique du guide. */
export const PRECARITE_PUBLISHED_AT = "2026-11-14";
export const PRECARITE_UPDATED_AT = "2026-11-14";

/** Date de contrôle des sources pour ce guide. */
export const PRECARITE_SOURCES_CHECKED_ON = "2026-11-14";
export const PRECARITE_SOURCES_CHECKED_ON_LABEL = "14 novembre 2026";

export const PRECARITE_RATE_STANDARD = 0.1;
export const PRECARITE_RATE_REDUCED = 0.06;

/** Exemple principal : six mois à 2 000 €. */
export const PRECARITE_EXAMPLE_MONTHLY = 2000;
export const PRECARITE_EXAMPLE_MONTHS = 6;

export function formatPrecariteEuroReadable(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

export function totalContractGross(monthlyGross: number, months: number): number {
  return Math.round(monthlyGross * months * 100) / 100;
}

export function precariteGross(baseGross: number, rate = PRECARITE_RATE_STANDARD): number {
  return Math.round(baseGross * rate * 100) / 100;
}

export function leaveBaseWithPrecarite(salariesGross: number, precarite: number): number {
  return Math.round((salariesGross + precarite) * 100) / 100;
}

export function leaveIndemnityTenth(baseGross: number): number {
  return Math.round(baseGross * 0.1 * 100) / 100;
}

export const PRECARITE_SOURCES = {
  codeL1243_8: {
    label: "Code du travail, article L. 1243-8",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901219/",
    note: "principe, taux de 10 % et versement avec le dernier salaire",
  },
  codeL1243_9: {
    label: "Code du travail, article L. 1243-9",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037387744/",
    note: "taux de 6 % et contreparties de formation",
  },
  codeL1243_10: {
    label: "Code du travail, article L. 1243-10",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901221/",
    note: "principales exclusions légales",
  },
  codeL1243_4: {
    label: "Code du travail, article L. 1243-4",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l1243-4",
    note: "dommages et intérêts en cas de rupture irrégulière par l'employeur",
  },
  codeL1242_11: {
    label: "Code du travail, article L. 1242-11",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l1242-11",
    note: "exclusion de l'indemnité de fin de CDD pendant la période d'essai",
  },
  codeCddRupture: {
    label: "Code du travail, chapitre sur la rupture et le renouvellement du CDD",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177867/",
    note: "rupture anticipée et échéance du contrat, notamment L. 1243-1 à L. 1243-4",
  },
  codeL1242_16: {
    label: "Code du travail, article L. 1242-16",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901210/",
    note: "indemnité compensatrice de congés payés en CDD",
  },
  servicePublicF803: {
    label: "Service Public : prime de précarité en fin de CDD",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F803",
    note: "situations de versement et exceptions",
  },
  servicePublicF40: {
    label: "Service Public : fin d'un CDD",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F40",
    note: "situations de versement et exceptions",
  },
  ministereRemunerationCdd: {
    label: "Ministère du Travail : rémunération du salarié en CDD",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/la-remuneration-du-salarie-en-contrat-a-duree-determinee",
    note: "rémunération, formation, régime social et fiscal, congés payés",
  },
  servicePublicF24661: {
    label: "Service Public : indemnité compensatrice de congés payés",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F24661",
    note: "éléments pris en compte et règles de calcul",
  },
  urssafRuptureCdd: {
    label: "Urssaf : indemnité de rupture du CDD",
    org: "Urssaf",
    href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/gerer-fin-relation-travail/rupture-cdd.html",
    note: "cotisations et contributions sociales",
  },
  codeL3245_1: {
    label: "Code du travail, article L. 3245-1",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3245-1",
    note: "prescription des actions en paiement de sommes dues",
  },
  servicePublicSoldeF86: {
    label: "Service Public : reçu pour solde de tout compte",
    org: "Service-Public",
    href: "https://entreprendre.service-public.gouv.fr/vosdroits/F86",
    note: "effets du reçu et délai de dénonciation",
  },
  servicePublicF1606: {
    label: "Service Public : CDD de la fonction publique",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1606",
    note: "règles applicables aux contractuels publics",
  },
  servicePublicPrudhommes: {
    label: "Service Public : saisir le conseil de prud'hommes",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2360",
    note: "recours",
  },
  cdtnSimulateur: {
    label: "Simulateur officiel d'indemnité de précarité",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/outils/indemnite-precarite",
    note: "estimation en tenant compte des informations demandées",
  },
  cdtnRuptureCommunAccord: {
    label: "Code du travail numérique : rupture d'un CDD d'un commun accord",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/modeles-de-courriers/rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
    note: "modèle de courrier officiel",
  },
} as const;
