import type { Guide } from "../types";
import {
  calculateSickLeaveSalary,
  formatEuro,
  formatEuroApprox,
  SICK_LEAVE_BREADCRUMB,
  SICK_LEAVE_BRUT_TOTAL_NOTE,
  SICK_LEAVE_FRESHNESS_LINE,
  SICK_LEAVE_H1,
  SICK_LEAVE_HOW_TO_SECTION_ID,
  SICK_LEAVE_LIMITS_SECTION_ID,
  SICK_LEAVE_META_DESCRIPTION,
  SICK_LEAVE_NET_DISCLAIMER,
  SICK_LEAVE_PATH,
  SICK_LEAVE_PUBLISHED_AT,
  SICK_LEAVE_SCOPE_DISCLAIMER,
  SICK_LEAVE_SEO_TITLE,
  SICK_LEAVE_SLUG,
  SICK_LEAVE_SOURCES,
  SICK_LEAVE_SUBTITLE,
  SICK_LEAVE_UPDATED_AT,
} from "@/site/sick-leave";
import type { SickLeaveCalculationInput } from "@/site/sick-leave";

const BRUT_VERS_NET = "/";
const SMIC_PATH = "/smic";
const HS_CALC = "/calculateurs/salaire-heures-supplementaires";
const LIRE_FICHE = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS =
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const INTERIM = "/salaire-interim-calcul-brut-net";
const GUIDES_HUB = "/guides";

const SIMULATOR_ANCHOR = `${SICK_LEAVE_PATH}#simulateur-salaire-arret-maladie`;

function mustSickLeave(input: SickLeaveCalculationInput) {
  const result = calculateSickLeaveSalary(input);
  if (!result) {
    throw new Error(
      `Calcul arrêt maladie invalide (${input.stopStartIso} → ${input.stopEndIso}, ${input.monthlyGrossUsual} €)`,
    );
  }
  return result;
}

const baseLegal = {
  ijssCarenceMode: "standard3Days" as const,
  employerComplementMode: "legalMinimum" as const,
  employerEligibilityConfirmed: true,
  subrogation: "unknown" as const,
};

/** Référence : 2 000 €, 14 jours, 3 ans. */
const ex2000 = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 3,
  subrogation: "yes",
});

const ex3j = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-09",
  seniorityYears: 3,
});

const ex7j = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-13",
  seniorityYears: 3,
});

const ex31j = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 2500,
  stopStartIso: "2026-09-01",
  stopEndIso: "2026-10-01",
  seniorityYears: 3,
});

const ex4000 = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 4000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 3,
  subrogation: "no",
});

const exSansAnciennete = mustSickLeave({
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  ijssCarenceMode: "standard3Days",
  employerComplementMode: "none",
  seniorityYears: 0,
  employerEligibilityConfirmed: false,
  subrogation: "no",
});

const ex91j = mustSickLeave({
  ...baseLegal,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-01",
  stopEndIso: "2026-11-30",
  seniorityYears: 12,
  subrogation: "yes",
});

const CURRENT_BAREME = ex2000.bareme;

function rowSituation(
  label: string,
  result: ReturnType<typeof mustSickLeave>,
): string[] {
  return [
    label,
    `${result.totalCalendarDays} j`,
    formatEuro(result.ijssGrossTotal),
    formatEuro(result.employerComplementGrossTotal),
    formatEuro(result.estimatedIncomeForStop),
    formatEuro(result.estimatedLoss),
  ];
}

/**
 * Guide pilier : salaire en arrêt maladie (/salaire-arret-maladie).
 * Montants : moteur `@/site/sick-leave` (barèmes IJSS datés, minimum légal L/D 1226).
 */
export const salaireArretMaladieGuide: Guide = {
  slug: SICK_LEAVE_SLUG,
  publicPath: SICK_LEAVE_PATH,
  breadcrumbLabel: SICK_LEAVE_BREADCRUMB,
  title: SICK_LEAVE_H1,
  seoTitle: SICK_LEAVE_SEO_TITLE,
  description: SICK_LEAVE_META_DESCRIPTION,
  subtitle: SICK_LEAVE_SUBTITLE,
  publishedAt: SICK_LEAVE_PUBLISHED_AT,
  updatedAt: SICK_LEAVE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  introduction: [
    "En arrêt maladie, vous pouvez percevoir des IJSS à partir du 4e jour et, sous conditions, un complément légal de l'employeur à partir du 8e jour. Renseignez votre salaire, vos dates d'arrêt et votre ancienneté pour obtenir une estimation détaillée.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "L'IJSS journalière brute égale 50 % du salaire journalier de base (trois salaires plafonnés ÷ 91,25).",
      "Deux délais distincts : 3 jours de carence avant les IJSS, 7 jours avant le complément légal.",
      "Le minimum légal suppose au moins un an d'ancienneté et les conditions de l'article L1226-1.",
      "Ce minimum porte la rémunération à 90 % du brut, puis aux deux tiers, IJSS comprises.",
      `Plafond IJSS (arrêts à compter du 1er juillet 2026) : ${formatEuro(CURRENT_BAREME.monthlyCeiling)} par mois, IJ maximale ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour.`,
      "Le total du simulateur est brut ; le montant réellement versé dépend aussi du PAS, de la convention et de la prévoyance.",
    ],
  },
  sections: [
    {
      id: SICK_LEAVE_HOW_TO_SECTION_ID,
      title: "Comment utiliser le simulateur de salaire en arrêt maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le simulateur estime le revenu global pendant l'arrêt : IJSS et, selon votre saisie, complément employeur. Six étapes suffisent.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Saisissez votre salaire brut mensuel habituel, ou les trois derniers salaires s'ils diffèrent.",
              description: "",
            },
            {
              title: "Renseignez les dates de début et de fin de l'arrêt (la fin est incluse).",
              description: "",
            },
            {
              title: "Choisissez la carence des IJSS : 3 jours dans le cas général, ou aucune carence si votre situation le justifie.",
              description: "",
            },
            {
              title: "Indiquez le complément employeur : minimum légal (ancienneté et confirmation des conditions), aucun complément, ou un montant brut déjà connu.",
              description: "",
            },
            {
              title: "Si besoin, ouvrez les options avancées pour les jours déjà indemnisés, une retenue d'absence connue et la subrogation.",
              description: "",
            },
            {
              title: "Lisez les IJSS brutes, le complément employeur, le total brut estimé et la perte brute par rapport au revenu théorique de la même durée.",
              description: "",
            },
          ],
        },
      ],
    },
    {
      id: SICK_LEAVE_LIMITS_SECTION_ID,
      title: "Quelles sont les limites du simulateur de salaire en arrêt maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le simulateur fournit une estimation pour le cas général d'un salarié mensualisé du privé, en maladie non professionnelle, avec le minimum légal du complément employeur. Il ne certifie pas l'ouverture des droits aux IJSS et ne remplace pas le calcul de la CPAM ni le bulletin.",
        },
        {
          type: "paragraph",
          text: "Il n'applique pas une convention collective plus favorable, un accord d'entreprise, une prévoyance, un maintien de salaire particulier, un prélèvement à la source personnalisé, un accident du travail, un accident de trajet ou une maladie professionnelle, la maternité, la paternité et les autres congés spécifiques, la fonction publique, les indépendants, les régimes particuliers, ni les situations saisonnières ou discontinues. La subrogation change seulement le circuit de versement, pas le total estimé.",
        },
        {
          type: "paragraph",
          text: "Le bulletin de paie, l'attestation de salaire, la convention collective, le relevé Ameli et la décision de la CPAM restent les références pour connaître les montants réellement dus et versés.",
        },
      ],
    },
    {
      id: "reponse-courte",
      title: "Exemple rapide : arrêt de 14 jours avec 2 000 € brut",
      blocks: [
        {
          type: "paragraph",
          text: `Avec ${formatEuro(2000)} brut par mois, 3 ans d'ancienneté et un arrêt de ${ex2000.totalCalendarDays} jours calendaires, l'IJSS journalière brute atteint ${formatEuro(ex2000.dailyIjssGross)}.`,
        },
        {
          type: "list",
          ordered: false,
          items: [
            `IJSS brutes sur la période : ${formatEuro(ex2000.ijssGrossTotal)} (${ex2000.ijssIndemnifiedDays} jours indemnisés)`,
            `Complément employeur brut : ${formatEuro(ex2000.employerComplementGrossTotal)}`,
            `Total brut estimé : ${formatEuro(ex2000.estimatedIncomeForStop)}`,
            `Revenu brut théorique pour la même durée : ${formatEuro(ex2000.habitualIncomeForPeriod)}`,
            `Perte brute indicative : ${formatEuro(ex2000.estimatedLoss)}`,
            `IJSS nettes indicatives avant prélèvement à la source : ${formatEuroApprox(ex2000.ijssNetIndicativeTotal)}`,
          ],
        },
      ],
    },
    {
      id: "comment-est-paye-un-arret-maladie",
      title: "Comment est payé un arrêt maladie dans le privé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un arrêt maladie suspend le contrat de travail. L'employeur retient les heures non travaillées : c'est la retenue d'absence. À la place du salaire, deux ressources peuvent intervenir.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Les IJSS, versées par l'Assurance Maladie après un délai de carence de 3 jours dans le cas général.",
            "Le complément de l'employeur, à partir du 8e jour lorsque les conditions du minimum légal sont réunies.",
            "Une prévoyance ou une convention collective plus favorable, qui peut réduire les délais et relever les taux.",
          ],
        },
        {
          type: "paragraph",
          text: "Formule pédagogique : revenu pendant l'arrêt ≈ salaire restant + IJSS + complément employeur. La présentation sur le bulletin dépend notamment de la subrogation.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les IJSS et le complément se comptent en jours calendaires, week-ends et jours fériés compris. La retenue d'absence suit la méthode de votre employeur : les deux logiques ne coïncident pas toujours.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour convertir un brut mensuel en net estimé hors arrêt,",
          label: "utiliser le calculateur salaire brut vers net",
          href: BRUT_VERS_NET,
        },
      ],
    },
    {
      id: "qui-paie-quoi-pendant-un-arret-maladie",
      title: "Qui paie quoi pendant un arrêt maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le tableau résume le cas général d'un arrêt maladie non professionnel, pour un salarié du privé affilié au régime général et remplissant les conditions du minimum légal.",
        },
        {
          type: "table",
          caption: "Répartition des versements selon la période d'arrêt",
          headers: ["Période de l'arrêt", "Qui verse", "Ce qui est perçu"],
          rows: [
            [
              "Jours 1 à 3",
              "Personne dans le cas général",
              "Délai de carence : ni IJSS, ni complément légal",
            ],
            [
              "Jours 4 à 7",
              "CPAM",
              "IJSS seules, à 50 % du salaire journalier de base plafonné",
            ],
            [
              "À partir du 8e jour",
              "CPAM et employeur",
              "IJSS complétées par le maintien légal si les conditions sont réunies",
            ],
            [
              "Après épuisement des droits au maintien",
              "CPAM",
              "IJSS seules, sauf prévoyance ou convention plus favorable",
            ],
            [
              "Moins d'un an d'ancienneté",
              "CPAM",
              "IJSS seules : le minimum légal ne s'applique pas",
            ],
            [
              "Cas de subrogation",
              "Employeur",
              "L'employeur perçoit les IJSS et verse l'ensemble sur le bulletin",
            ],
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Une convention collective, un accord d'entreprise ou une prévoyance peut prévoir des règles plus favorables. Vérifiez le texte applicable à votre entreprise.",
          ],
        },
      ],
    },
    {
      id: "calcul-des-ijss-maladie",
      title: "Comment sont calculées les IJSS ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'Assurance Maladie part des trois derniers salaires bruts précédant l'arrêt. Chacun est retenu dans la limite d'un plafond mensuel. La somme est divisée par 91,25 (article R323-4 du Code de la sécurité sociale). L'IJSS journalière brute égale la moitié de ce salaire journalier de base.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Additionner les trois derniers salaires bruts, chacun plafonné.",
            "Diviser ce total par 91,25 pour obtenir le salaire journalier de base.",
            "Appliquer 50 % à ce salaire journalier de base.",
            "Vérifier que le résultat ne dépasse pas l'IJ maximale du barème.",
            "Multiplier l'IJSS journalière par le nombre de jours indemnisés.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Salaire de ${formatEuro(2000)} brut par mois : total de référence ${formatEuro(ex2000.cappedTotal)}.`,
            `Salaire journalier de base : ${formatEuro(ex2000.cappedTotal)} ÷ 91,25 = ${formatEuro(ex2000.dailyBaseSalary)}.`,
            `IJSS journalière brute : ${formatEuro(ex2000.dailyBaseSalary)} × 50 % = ${formatEuro(ex2000.dailyIjssGross)}.`,
            `Sur ${ex2000.totalCalendarDays} jours avec ${ex2000.ijssCarenceDays} jours de carence : ${ex2000.ijssIndemnifiedDays} jours indemnisés, soit ${formatEuro(ex2000.ijssGrossTotal)} d'IJSS brutes.`,
          ],
        },
        {
          type: "paragraph",
          text: `Pour les arrêts débutant à compter du 1er juillet 2026, le plafond mensuel retenu est de ${formatEuro(CURRENT_BAREME.monthlyCeiling)} et l'IJ maximale de ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour. Au-delà du plafond, un salaire plus élevé n'augmente plus les IJSS.`,
        },
        {
          type: "paragraph",
          text: `Les IJSS ne supportent pas les cotisations classiques du salaire, mais la CSG (6,2 %) et la CRDS (0,5 %). Sur l'exemple de référence, ${formatEuro(ex2000.ijssGrossTotal)} d'IJSS brutes correspondent à environ ${formatEuroApprox(ex2000.ijssNetIndicativeTotal)} d'IJSS nettes indicatives avant prélèvement à la source.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour approfondir la formule, le plafond et le détail des jours indemnisés,",
          label: "consulter le calcul détaillé des IJSS",
          href: "/calcul-ijss-arret-maladie",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte réglementaire :",
          label: SICK_LEAVE_SOURCES.cssR3234.label,
          href: SICK_LEAVE_SOURCES.cssR3234.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Référence opérationnelle :",
          label: SICK_LEAVE_SOURCES.ameli.label,
          href: SICK_LEAVE_SOURCES.ameli.href,
        },
      ],
    },
    {
      id: "complement-employeur-et-anciennete",
      title: "Le complément de l'employeur et le barème d'ancienneté",
      blocks: [
        {
          type: "paragraph",
          text: "Le Code du travail impose un minimum légal de maintien de salaire (articles L1226-1 et D1226-1 à D1226-8). Il faut notamment une année d'ancienneté au premier jour d'absence, justifier l'arrêt dans les 48 heures sous réserve des exceptions légales, être pris en charge par la Sécurité sociale, et recevoir des soins en France, dans l'Union européenne ou dans un État partie à l'EEE.",
        },
        {
          type: "paragraph",
          text: "Sont notamment exclus du minimum légal les travailleurs à domicile, saisonniers, intermittents et temporaires. Le texte en vigueur prévoit aussi une exclusion en cas de fraude avérée. Une convention collective peut rester plus favorable.",
        },
        {
          type: "paragraph",
          text: "Ce minimum garantit 90 % de la rémunération brute sur une première période, puis deux tiers (66,66 %) sur une seconde période de même durée. Les IJSS sont déduites : l'employeur ne verse que la différence.",
        },
        {
          type: "table",
          caption: "Durées du maintien légal selon l'ancienneté au 1er jour d'absence",
          headers: [
            "Ancienneté",
            "Période à 90 %",
            "Période à 66,66 %",
            "Durée totale indemnisée",
          ],
          rows: [
            ["Moins de 1 an", "Aucune", "Aucune", "Pas de minimum légal"],
            ["De 1 à 5 ans", "30 jours", "30 jours", "60 jours"],
            ["De 6 à 10 ans", "40 jours", "40 jours", "80 jours"],
            ["De 11 à 15 ans", "50 jours", "50 jours", "100 jours"],
            ["De 16 à 20 ans", "60 jours", "60 jours", "120 jours"],
            ["De 21 à 25 ans", "70 jours", "70 jours", "140 jours"],
            ["De 26 à 30 ans", "80 jours", "80 jours", "160 jours"],
            ["31 ans et plus", "90 jours", "90 jours", "180 jours"],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Ces durées s'apprécient sur les douze mois précédents. Les jours déjà indemnisés réduisent les droits restants : le simulateur permet de les saisir.",
          ],
        },
        {
          type: "paragraph",
          text: `Sur l'exemple de référence à ${formatEuro(2000)} brut et 3 ans d'ancienneté, l'employeur intervient ${ex2000.employerComplementDays} jours et verse ${formatEuro(ex2000.employerComplementGrossTotal)} au titre du maintien légal.`,
        },
        {
          type: "mistakes",
          title: "Erreurs fréquentes",
          items: [
            "Croire que 90 % s'ajoutent aux IJSS. Le taux s'applique au total : l'employeur complète seulement le solde.",
            "Raisonner sur le net. Le minimum légal porte sur la rémunération brute, sauf convention plus favorable.",
            "Oublier les arrêts précédents. Les droits se comptent sur douze mois glissants.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail du délai, des tranches et du minimum légal,",
          label: "Comprendre le calcul du complément légal employeur",
          href: "/maintien-salaire-arret-maladie",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte officiel :",
          label: SICK_LEAVE_SOURCES.travailD1226.label,
          href: SICK_LEAVE_SOURCES.travailD1226.href,
        },
      ],
    },
    {
      id: "delais-de-carence-arret-maladie",
      title: "Les deux délais de carence à ne pas confondre",
      blocks: [
        {
          type: "paragraph",
          text: "Deux délais distincts portent sur des versements différents : 3 jours pour les IJSS, 7 jours pour le complément légal de l'employeur.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Jours 1 à 3 : ni IJSS, ni complément légal dans le cas général.",
            "Jours 4 à 7 : IJSS seules, sans complément légal.",
            "À partir du jour 8 : IJSS et complément légal possibles si les conditions sont réunies.",
          ],
        },
        {
          type: "paragraph",
          text: "Une prolongation, une reprise courte ou certaines situations liées à une ALD peuvent neutraliser la carence IJSS. Une convention peut réduire ou supprimer le délai employeur.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail des règles de maintien :",
          label: SICK_LEAVE_SOURCES.codeTravail.label,
          href: SICK_LEAVE_SOURCES.codeTravail.href,
        },
      ],
    },
    {
      id: "calculer-sa-perte-de-revenu",
      title: "Calculer sa perte de revenu",
      blocks: [
        {
          type: "paragraph",
          text: "Le simulateur compare un revenu brut théorique sur la durée de l'arrêt au total brut estimé (IJSS brutes + complément employeur brut).",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Revenu brut théorique = brut mensuel × 12 ÷ 365 × jours calendaires de l'arrêt.",
            "Total brut estimé = IJSS brutes + complément employeur brut.",
            "Perte brute indicative = revenu brut théorique (ou retenue d'absence saisie) − total brut estimé.",
          ],
        },
        {
          type: "paragraph",
          text: SICK_LEAVE_BRUT_TOTAL_NOTE,
        },
        {
          type: "paragraph",
          text: "Si vous connaissez la retenue d'absence brute de votre bulletin, saisissez-la dans les options avancées : la perte compare alors vos versements à cette retenue réelle.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre l'écart entre brut et net,",
          label: "comprendre les cotisations salariales",
          href: COTISATIONS,
        },
      ],
    },
    {
      id: "exemples-salaire-arret-maladie",
      title: "Exemples chiffrés de salaire en arrêt maladie",
      blocks: [
        {
          type: "paragraph",
          text: "Tableau comparatif produit par le même moteur que le simulateur. Montants bruts sauf mention contraire, avant prélèvement à la source. Arrêts débutant en septembre 2026.",
        },
        {
          type: "table",
          caption:
            "Comparaison d'arrêts maladie (montants bruts, cas général du minimum légal sauf mention)",
          headers: [
            "Situation",
            "Durée",
            "IJSS brutes",
            "Complément employeur brut",
            "Total brut estimé",
            "Perte brute indicative",
          ],
          rows: [
            rowSituation("2 000 €, 3 ans, arrêt de 3 jours", ex3j),
            rowSituation("2 000 €, 3 ans, arrêt de 7 jours", ex7j),
            rowSituation("2 000 €, 3 ans, arrêt de 14 jours", ex2000),
            rowSituation("2 500 €, 3 ans, arrêt de 31 jours", ex31j),
            rowSituation("4 000 € (plafond IJSS), 3 ans, 14 jours", ex4000),
            rowSituation("2 000 €, moins d'un an, 14 jours", exSansAnciennete),
            rowSituation("2 000 €, 12 ans, arrêt de 91 jours", ex91j),
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Effet du plafond : à ${formatEuro(4000)} brut, chaque salaire de référence est ramené à ${formatEuro(CURRENT_BAREME.monthlyCeiling)}. L'IJSS journalière brute plafonne à ${formatEuro(ex4000.dailyIjssGross)}. Sur ${ex4000.totalCalendarDays} jours, le total brut estimé atteint ${formatEuro(ex4000.estimatedIncomeForStop)} pour une perte brute indicative de ${formatEuro(ex4000.estimatedLoss)}.`,
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Effet des tranches sur ${ex91j.totalCalendarDays} jours à ${formatEuro(2000)} brut et 12 ans d'ancienneté : ${ex91j.employerComplementDays} jours de complément pour ${formatEuro(ex91j.employerComplementGrossTotal)}, plus ${formatEuro(ex91j.ijssGrossTotal)} d'IJSS brutes. Le passage de 90 % aux deux tiers intervient en cours d'arrêt.`,
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour tester vos propres dates et votre ancienneté,",
          label: "ouvrir le simulateur de salaire en arrêt maladie",
          href: SIMULATOR_ANCHOR,
        },
      ],
    },
    {
      id: "subrogation-arret-maladie",
      title: "La subrogation : qui vous verse l'argent ?",
      blocks: [
        {
          type: "paragraph",
          text: "La subrogation ne change pas le montant de vos droits. Elle change le circuit de versement et le calendrier de votre trésorerie.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Avec subrogation : l'employeur perçoit les IJSS de la CPAM et vous verse l'ensemble sur le bulletin.",
            "Sans subrogation : la CPAM vous verse les IJSS séparément ; l'employeur ne verse que son complément éventuel.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Sans subrogation, les deux versements arrivent à des dates différentes. Un total de droits correct peut s'accompagner d'un trou de trésorerie.",
          ],
        },
      ],
    },
    {
      id: "verifier-son-bulletin-de-paie",
      title: "Vérifier son bulletin de paie après un arrêt maladie",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Retenue d'absence",
              description:
                "Repérez la ligne qui retire les jours d'arrêt et contrôlez le nombre de jours retenus.",
            },
            {
              title: "Maintien employeur",
              description:
                "Identifiez la ligne de maintien, le taux appliqué et le nombre de jours complétés.",
            },
            {
              title: "IJSS subrogées",
              description:
                "En cas de subrogation, contrôlez l'IJSS journalière et le nombre de jours indemnisés.",
            },
            {
              title: "Prévoyance",
              description:
                "Vérifiez l'intervention éventuelle d'un organisme de prévoyance.",
            },
            {
              title: "Cotisations et net",
              description:
                "Distinguez CSG/CRDS sur les IJSS, cotisations du salaire, net imposable, PAS et net versé.",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour décoder chaque ligne du bulletin,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le traitement fiscal,",
          label: "lire le guide du prélèvement à la source",
          href: PAS,
        },
      ],
    },
    {
      id: "situations-non-couvertes",
      title: "Situations non couvertes par l'estimation standard",
      blocks: [
        {
          type: "paragraph",
          text: "Cette page traite le cas général de la maladie non professionnelle pour un salarié mensualisé du privé relevant du régime général et du minimum légal. Elle ne simule pas automatiquement :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Accident du travail, accident de trajet et maladie professionnelle",
            "Congé maternité, paternité, adoption ou congé pathologique",
            "ALD et arrêts de longue durée aux règles spécifiques",
            "Temps partiel thérapeutique et reprise progressive",
            "Régimes locaux particuliers, notamment l'Alsace-Moselle",
            "Fonction publique, professions libérales et travailleurs indépendants",
            "Conventions collectives ou accords plus favorables",
            "Contrats de prévoyance",
            "Salariés à employeurs multiples, saisonniers ou intermittents",
            "Prélèvement à la source personnalisé",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les missions temporaires et leurs indemnités,",
          label: "voir le calcul du salaire en intérim",
          href: INTERIM,
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: SICK_LEAVE_FRESHNESS_LINE,
        },
        {
          type: "paragraph",
          text: "Formules retenues par le simulateur :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Salaire journalier de base = somme des trois derniers salaires bruts plafonnés ÷ 91,25",
            "IJSS journalière brute = salaire journalier de base × 50 %, dans la limite du plafond",
            "IJSS totales = IJSS journalière × nombre de jours indemnisés",
            "Complément légal = montant de maintien théorique − IJSS imputables",
            "Perte brute indicative = revenu brut théorique ou retenue d'absence saisie − IJSS brutes − complément employeur brut",
            "IJSS nettes indicatives = IJSS brutes × (1 − 6,2 % de CSG − 0,5 % de CRDS), avant PAS",
            "Carences : 3 jours pour les IJSS, 7 jours pour le complément légal",
          ],
        },
        {
          type: "paragraph",
          text: `Arbitrage sur le plafond mensuel : l'Assurance Maladie publie ${formatEuro(CURRENT_BAREME.monthlyCeiling)} pour les arrêts débutant à compter du 1er juillet 2026 ; Service-Public affiche parfois 2 613,82 €. Le simulateur retient la valeur Ameli, cohérente avec l'IJ maximale de ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)}.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            SICK_LEAVE_SCOPE_DISCLAIMER,
            SICK_LEAVE_NET_DISCLAIMER,
            "Cette page ne constitue pas un conseil juridique, fiscal ou social personnalisé.",
          ],
        },
        {
          type: "paragraph",
          text: "Détail technique de l'arrondi (ouvert sur demande) :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            `Pour ${formatEuro(2000)} brut par mois, 6 000 ÷ 91,25 = 65,7534... € puis × 50 % = 32,8767... €. Service-Public publie ${formatEuro(32.87)}. Le simulateur applique une troncature au centime.`,
            `Arrondi : troncature au centime après application de 50 %, puis plafonnement à l'IJ maximale publiée. Un écart d'un centime avec le relevé officiel peut exister (exemple au plafond : ${formatEuro(ex4000.dailyIjssGross)}).`,
          ],
        },
        {
          type: "paragraph",
          text: "Sources officielles :",
        },
        {
          type: "list",
          ordered: false,
          items: Object.values(SICK_LEAVE_SOURCES).map((source) => ({
            text: `${source.org} :`,
            href: source.href,
            label: source.label,
          })),
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes sur les IJSS, les jours de carence, le complément de l'employeur et la perte de revenu.",
  faq: [
    {
      question: "Combien touche-t-on en arrêt maladie dans le privé ?",
      answer: `Vous percevez des IJSS à partir du 4e jour et, si les conditions sont remplies, un complément légal à partir du 8e jour. Sur l'exemple de référence à ${formatEuro(2000)} brut et ${ex2000.totalCalendarDays} jours, le total brut estimé atteint ${formatEuro(ex2000.estimatedIncomeForStop)}.`,
    },
    {
      question: "Comment calculer ses indemnités journalières (IJSS) ?",
      answer: `Additionnez vos trois derniers salaires bruts plafonnés, divisez par 91,25 puis appliquez 50 %. Pour ${formatEuro(2000)} brut par mois, l'IJSS journalière brute vaut ${formatEuro(ex2000.dailyIjssGross)}.`,
    },
    {
      question: "Quel est le montant maximum des IJSS maladie ?",
      answer: `Pour les arrêts débutant à compter du 1er juillet 2026, le plafond mensuel retenu est de ${formatEuro(CURRENT_BAREME.monthlyCeiling)} et l'IJ maximale de ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour.`,
    },
    {
      question: "Qu'est-ce que le délai de carence de 3 jours ?",
      answer:
        "C'est la période initiale pendant laquelle la Sécurité sociale ne verse aucune IJSS. Les IJSS démarrent au 4e jour dans le cas général.",
    },
    {
      question: "Pourquoi un second délai de 7 jours s'applique-t-il ?",
      answer:
        "Parce que le minimum légal de maintien de salaire ne s'applique qu'à partir du 8e jour d'absence. Une convention collective peut réduire ou supprimer ce délai.",
    },
    {
      question: "L'employeur doit-il maintenir le salaire pendant un arrêt maladie ?",
      answer:
        "Oui au titre du minimum légal, si le salarié a au moins un an d'ancienneté et remplit les conditions de l'article L1226-1. La convention collective peut être plus favorable.",
    },
    {
      question: "Quelle ancienneté faut-il pour avoir le maintien de salaire ?",
      answer:
        "Au moins un an d'ancienneté dans l'entreprise au premier jour d'absence pour le minimum légal. En dessous, seules les IJSS sont dues, sauf disposition conventionnelle plus favorable.",
    },
    {
      question: "Combien de temps dure le maintien de salaire légal ?",
      answer:
        "De 60 jours au total entre 1 et 5 ans d'ancienneté à 180 jours à partir de 31 ans, répartis à parts égales entre 90 % et deux tiers. Ces durées s'apprécient sur les douze mois précédents.",
    },
    {
      question: "Le maintien de 90 % porte-t-il sur le brut ou sur le net ?",
      answer:
        "Le minimum légal porte sur la rémunération brute que le salarié aurait perçue en travaillant. Certaines conventions prévoient un maintien du net, plus favorable.",
    },
    {
      question: "Le complément employeur s'ajoute-t-il aux IJSS ?",
      answer:
        "Non, il les complète. L'employeur verse la différence entre le montant garanti et les IJSS déjà prises en compte.",
    },
    {
      question: "Qu'est-ce que la subrogation ?",
      answer:
        "C'est le cas où l'employeur perçoit directement les IJSS de la CPAM et vous verse l'ensemble sur votre bulletin. Le montant total des droits reste identique.",
    },
    {
      question: "Les IJSS sont-elles imposables ?",
      answer:
        "Les IJSS maladie sont en principe imposables. Celles versées au titre d'un arrêt en rapport avec une affection de longue durée exonérante sont exonérées d'impôt sur le revenu, selon les règles fiscales applicables. Les estimations de cette page sont présentées avant prélèvement à la source.",
    },
    {
      question: "Les IJSS supportent-elles des cotisations ?",
      answer:
        "Elles ne supportent pas les cotisations sociales classiques du salaire, mais la CSG à 6,2 % et la CRDS à 0,5 %. Le simulateur affiche des IJSS nettes indicatives avant prélèvement à la source.",
    },
    {
      question: "Perd-on de l'argent pendant un arrêt maladie ?",
      answer: `Dans le cas général, oui : carences et plafonnement des IJSS créent un écart. Sur l'exemple de référence, la perte brute indicative atteint ${formatEuro(ex2000.estimatedLoss)}. Une convention ou une prévoyance peut réduire cet écart.`,
    },
    {
      question: "Que touche-t-on pour un arrêt de moins de 8 jours ?",
      answer: `Les IJSS des jours situés après la carence, sans complément légal. Pour un arrêt de ${ex3j.totalCalendarDays} jours, aucun versement n'intervient dans le cas général.`,
    },
    {
      question: "Le simulateur donne-t-il le montant exact qui sera versé ?",
      answer:
        "Non. Il estime le cas général du minimum légal en montants bruts, avec des IJSS nettes indicatives à part. Le bulletin réel dépend de la retenue d'absence, de la convention, de la prévoyance et de votre situation fiscale.",
    },
  ],
  conclusion: {
    title: "Vérifiez votre estimation d'arrêt maladie",
    keyPoints: [],
    closingText:
      "Renseignez vos dates, votre salaire brut et votre ancienneté pour décomposer les IJSS brutes, le complément employeur brut et la perte brute indicative, puis comparez chaque ligne avec votre bulletin et votre convention.",
    closingCta: {
      label: "Estimer mon salaire en arrêt maladie",
      href: SIMULATOR_ANCHOR,
    },
    closingSecondaryLinks: [
      {
        label: "Estimer d'abord vos IJSS journalières",
        href: "/calcul-ijss-arret-maladie",
      },
      {
        label: "Vérifier le complément légal de l'employeur",
        href: "/maintien-salaire-arret-maladie",
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: BRUT_VERS_NET,
    },
    relatedGuides: [
      { title: "Calcul des IJSS", href: "/calcul-ijss-arret-maladie" },
      {
        title: "Maintien de salaire par l'employeur",
        href: "/maintien-salaire-arret-maladie",
      },
      { title: "Lire une fiche de paie", href: LIRE_FICHE },
      { title: "Cotisations salariales", href: COTISATIONS },
      { title: "Prélèvement à la source", href: PAS },
      { title: "SMIC : montants officiels", href: SMIC_PATH },
      { title: "Salaire en intérim", href: INTERIM },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    relatedSimulator: {
      title: "Heures supplémentaires",
      description: "Estimez le brut et le net des majorations.",
      href: HS_CALC,
    },
  },
};
