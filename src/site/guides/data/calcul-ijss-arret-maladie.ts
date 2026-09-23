import type { Guide } from "../types";
import {
  calculateSickLeaveSalary,
  type SickLeaveCalculationInput,
} from "@/site/sick-leave";
import {
  CSG_RATE_ON_IJSS,
  CRDS_RATE_ON_IJSS,
  formatEuro,
  IJSS_BREADCRUMB,
  IJSS_CURRENT_BAREME,
  IJSS_FRESHNESS_LINE,
  IJSS_H1,
  IJSS_HOW_TO_SECTION_ID,
  IJSS_LIMITS_SECTION_ID,
  IJSS_META_DESCRIPTION,
  IJSS_PATH,
  IJSS_PUBLISHED_AT,
  IJSS_SCOPE_DISCLAIMER,
  IJSS_SEO_TITLE,
  IJSS_SLUG,
  IJSS_SOURCES,
  IJSS_SUBTITLE,
  IJSS_TOOL_NAV_TITLE,
  IJSS_TOOL_TEASER,
  IJSS_UPDATED_AT,
  SALARY_DURING_SICK_LEAVE_PATH,
} from "@/site/ijss";

const BRUT_VERS_NET = "/";
const SMIC_PATH = "/smic";
const LIRE_FICHE = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS =
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const GUIDES_HUB = "/guides";

const CALCULATOR_ANCHOR = `${IJSS_PATH}#calculateur-ijss`;

const CURRENT_BAREME = IJSS_CURRENT_BAREME;

function mustIjss(input: SickLeaveCalculationInput) {
  const result = calculateSickLeaveSalary(input);
  if (!result) {
    throw new Error(
      `Calcul IJSS invalide (${input.stopStartIso} → ${input.stopEndIso}, ${input.monthlyGrossUsual} €)`,
    );
  }
  return result;
}

/** Base commune : IJSS seules, sans complément employeur. */
const baseIjssOnly = {
  ijssCarenceMode: "standard3Days" as const,
  employerComplementMode: "none" as const,
  seniorityYears: 0,
  employerEligibilityConfirmed: false,
  subrogation: "unknown" as const,
};

/** Référence : 2 000 €, 14 jours, carence standard. */
const ex2000_14 = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
});

const ex3j = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-09",
});

const ex7j = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-13",
});

const ex30j = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-01",
  stopEndIso: "2026-09-30",
});

const exWaived14 = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  ijssCarenceMode: "waived",
});

const exDiffSalaries = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2000,
  referenceSalaries: [1900, 2100, 2300],
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
});

const ex2500_14 = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 2500,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
});

const ex4000 = mustIjss({
  ...baseIjssOnly,
  monthlyGrossUsual: 4000,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
});

function pctFr(rate: number): string {
  return `${String(rate * 100).replace(".", ",")}`;
}

function rowDuration(result: ReturnType<typeof mustIjss>): string[] {
  return [
    `${result.totalCalendarDays} jours`,
    `${result.ijssCarenceDays} j`,
    `${result.ijssIndemnifiedDays} j`,
    formatEuro(result.dailyIjssGross),
    formatEuro(result.ijssGrossTotal),
    formatEuro(result.ijssNetIndicativeTotal),
  ];
}

function rowScenario(
  label: string,
  result: ReturnType<typeof mustIjss>,
): string[] {
  const [, ...withoutDuration] = rowDuration(result);
  return [label, ...withoutDuration];
}

/**
 * Guide pilier : calcul des IJSS en arrêt maladie (/calcul-ijss-arret-maladie).
 * Montants : moteur `@/site/sick-leave` avec employerComplementMode: "none".
 */
export const calculIjssArretMaladieGuide: Guide = {
  slug: IJSS_SLUG,
  publicPath: IJSS_PATH,
  breadcrumbLabel: IJSS_BREADCRUMB,
  title: IJSS_H1,
  seoTitle: IJSS_SEO_TITLE,
  description: IJSS_META_DESCRIPTION,
  subtitle: IJSS_SUBTITLE,
  publishedAt: IJSS_PUBLISHED_AT,
  updatedAt: IJSS_UPDATED_AT,
  includeFaqSchema: true,
  includeWebApplicationSchema: true,
  webApplication: {
    name: IJSS_TOOL_NAV_TITLE,
    description: IJSS_TOOL_TEASER,
  },
  faqSectionId: "questions-frequentes",
  introduction: [
    "Les indemnités journalières de Sécurité sociale (IJSS) maladie égalent 50 % du salaire journalier de base. Pour un salarié mensualisé, chaque mois de référence est d'abord plafonné, puis les trois montants retenus sont additionnés et divisés par 91,25. Après un délai de carence de 3 jours dans le cas général, l'indemnité est versée pour chaque jour calendaire indemnisable.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Chaque salaire mensuel est plafonné séparément, puis la somme est divisée par 91,25.",
      "IJSS journalière brute = 50 % de ce salaire journalier de base, dans la limite du plafond.",
      "Trois jours de carence dans le cas général, puis jours calendaires.",
      `Plafond mensuel à compter du 1er juillet 2026 : ${formatEuro(CURRENT_BAREME.monthlyCeiling)}, IJ maximale publiée ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)}.`,
      `CSG ${pctFr(CSG_RATE_ON_IJSS)} % et CRDS ${pctFr(CRDS_RATE_ON_IJSS)} % avant prélèvement à la source.`,
    ],
  },
  sections: [
    {
      id: IJSS_HOW_TO_SECTION_ID,
      title: "Comment utiliser le calculateur d'IJSS ?",
      blocks: [
        {
          type: "paragraph",
          text: "Cinq étapes suffisent pour obtenir une estimation à partir du simulateur.",
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
              title: "Sélectionnez la carence applicable : 3 jours dans le cas général, ou aucune carence si votre situation le justifie.",
              description: "",
            },
            {
              title: "Lisez l'IJ journalière brute estimée, le nombre de jours indemnisés et le total.",
              description: "",
            },
            {
              title: "Comparez cette estimation avec l'attestation de salaire et le relevé de paiement Ameli.",
              description: "",
            },
          ],
        },
      ],
    },
    {
      id: IJSS_LIMITS_SECTION_ID,
      title: "Quelles sont les limites du calculateur d'IJSS ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le calculateur fournit une estimation pour le cas général d'un salarié mensualisé du privé. Il ne certifie pas l'ouverture des droits et ne remplace pas le calcul de la CPAM.",
        },
        {
          type: "paragraph",
          text: "Il n'intègre pas le complément employeur, la convention collective, la prévoyance, un prélèvement à la source personnalisé, un salaire rétabli, les saisonniers, les accidents du travail, les accidents de trajet, les maladies professionnelles, la maternité, la fonction publique, les indépendants, ni les autres situations particulières décrites plus bas.",
        },
        {
          type: "paragraph",
          text: "Le relevé de paiement Ameli, l'attestation de salaire transmise par l'employeur et la décision de la CPAM restent les références pour connaître le montant réellement versé.",
        },
      ],
    },
    {
      id: "comment-calculer-les-ijss",
      title: "Comment calculer les IJSS en arrêt maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IJSS journalière brute égale la moitié du salaire journalier de base retenu par la Caisse primaire d'assurance maladie (CPAM).",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Plafonner séparément chacun des trois derniers salaires bruts mensuels.",
            "Additionner les trois montants retenus après plafonnement.",
            "Diviser cette somme par 91,25 pour obtenir le salaire journalier de base.",
            "Appliquer 50 % à ce salaire journalier de base, sans dépasser l'IJ maximale publiée.",
            "Multiplier l'IJSS journalière par le nombre de jours indemnisés après carence.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Salaire de ${formatEuro(2000)} brut par mois : total de référence ${formatEuro(ex2000_14.cappedTotal)}.`,
            `Salaire journalier de base : ${formatEuro(ex2000_14.cappedTotal)} ÷ 91,25 = ${formatEuro(ex2000_14.dailyBaseSalary)}.`,
            `IJSS journalière brute : ${formatEuro(ex2000_14.dailyBaseSalary)} × 50 % = ${formatEuro(ex2000_14.dailyIjssGross)}.`,
            `Sur ${ex2000_14.totalCalendarDays} jours avec ${ex2000_14.ijssCarenceDays} jours de carence : ${ex2000_14.ijssIndemnifiedDays} jours indemnisés, soit ${formatEuro(ex2000_14.ijssGrossTotal)} d'IJSS brutes.`,
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les IJSS ne couvrent qu'une partie du revenu. Un complément employeur ou une prévoyance peut s'y ajouter sous conditions.",
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Les IJSS ne sont pas tout le revenu :",
          label: "calculer le complément versé par votre employeur",
          href: "/maintien-salaire-arret-maladie",
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour réunir IJSS et complément employeur,",
          label: "estimer votre revenu total pendant l'arrêt maladie",
          href: SALARY_DURING_SICK_LEAVE_PATH,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte réglementaire :",
          label: IJSS_SOURCES.cssR3234.label,
          href: IJSS_SOURCES.cssR3234.href,
        },
      ],
    },
    {
      id: "salaire-pris-en-compte-cpam",
      title: "Quel salaire la CPAM prend-elle en compte ?",
      blocks: [
        {
          type: "paragraph",
          text: "La CPAM part en principe des salaires bruts des trois mois civils précédant l'arrêt, soumis à cotisations, tels qu'ils figurent sur l'attestation de salaire.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Chaque mois est plafonné séparément avant d'être additionné.",
            "Si vos trois salaires diffèrent, le calculateur accepte une saisie mois par mois.",
            "Certaines primes entrent dans l'assiette, d'autres non : le bulletin et l'attestation font foi.",
            "Le calculateur ne régularise pas automatiquement un salaire rétabli ou une période incomplète.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Avec des salaires de ${formatEuro(1900)}, ${formatEuro(2100)} et ${formatEuro(2300)}, le total plafonné atteint ${formatEuro(exDiffSalaries.cappedTotal)}. IJSS journalière brute : ${formatEuro(exDiffSalaries.dailyIjssGross)}.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Référence opérationnelle :",
          label: IJSS_SOURCES.ameli.label,
          href: IJSS_SOURCES.ameli.href,
        },
      ],
      subsections: [
        {
          id: "salaire-retabli-mois-incomplet",
          title: "Salaire rétabli et mois incomplet",
          blocks: [
            {
              type: "paragraph",
              text: "Si l'un des trois derniers salaires correspond à un mois incomplet, l'attestation de salaire peut mentionner un salaire rétabli IJSS, c'est-à-dire un montant reconstitué comme si le mois avait été complet.",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "L'employeur transmet ces informations à la CPAM via l'attestation de salaire.",
                "Le calculateur ne reconstitue pas automatiquement un salaire rétabli.",
                "Pour une estimation fiable, reprenez les montants de l'attestation ou du relevé CPAM plutôt qu'un bulletin partiel.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "plafond-ijss-maladie",
      title: "Quel est le plafond des IJSS maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: `Pour les arrêts débutant à compter du 1er juillet 2026, chaque salaire de référence est plafonné à ${formatEuro(CURRENT_BAREME.monthlyCeiling)} (1,4 SMIC) et l'IJ maximale publiée atteint ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour.`,
        },
        {
          type: "paragraph",
          text: `Au-delà de ce plafond, un salaire plus élevé n'augmente plus les IJSS. À ${formatEuro(4000)} brut, chaque mois est ramené à ${formatEuro(CURRENT_BAREME.monthlyCeiling)} : l'estimation calculée de l'IJ journalière brute est de ${formatEuro(ex4000.dailyIjssGross)}. Le plafond officiel publié reste de ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            `Service-Public affiche parfois ${formatEuro(2613.82)} alors qu'Ameli publie ${formatEuro(2613.83)} pour le même barème. Le calculateur retient la valeur Ameli. Le plafond officiel publié de l'IJ est de ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour.`,
            "Pour un arrêt débutant en juin 2026, les sources officielles consultées présentent une incohérence. Afin de ne pas afficher une estimation incertaine, le calculateur ne la prend pas en charge. Vérifiez le montant auprès de votre CPAM.",
          ],
        },
      ],
    },
    {
      id: "compter-les-jours-indemnises",
      title: "Comment compter les jours indemnisés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les IJSS se comptent en jours calendaires : la date de début et la date de fin sont incluses, week-ends et jours fériés compris.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Durée totale = nombre de jours entre le début et la fin, inclus.",
            "Jours indemnisés = durée totale − jours de carence retenus.",
            "Un week-end ou un jour férié situé après la carence reste indemnisé.",
          ],
        },
        {
          type: "table",
          stackOnMobile: true,
          caption:
            "Effet de la durée sur les IJSS (2 000 € brut, carence standard, barème juillet 2026)",
          headers: [
            "Durée",
            "Carence",
            "Jours indemnisés",
            "IJ journalière estimée",
            "Total brut",
            "Après CSG/CRDS",
          ],
          rows: [
            rowDuration(ex3j),
            rowDuration(ex7j),
            rowDuration(ex2000_14),
            rowDuration(ex30j),
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Pour un arrêt de ${ex3j.totalCalendarDays} jours avec carence standard, aucun jour n'est indemnisé : le total IJSS reste ${formatEuro(ex3j.ijssGrossTotal)}.`,
          ],
        },
      ],
    },
    {
      id: "carence-trois-jours",
      title: "Les trois jours de carence s'appliquent-ils toujours ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le cas général d'un nouvel arrêt maladie, la Sécurité sociale n'indemnise pas les trois premiers jours.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Prolongation d'un arrêt déjà ouvert : pas de nouvelle carence en principe.",
            "Reprise du travail inférieure ou égale à 48 heures entre deux arrêts : la carence peut ne pas se renouveler.",
            "Certaines situations liées à une affection de longue durée (ALD) peuvent écarter la carence, selon les conditions applicables.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Sans carence sur ${exWaived14.totalCalendarDays} jours à ${formatEuro(2000)} brut : ${exWaived14.ijssIndemnifiedDays} jours indemnisés, soit ${formatEuro(exWaived14.ijssGrossTotal)} d'IJSS brutes (contre ${formatEuro(ex2000_14.ijssGrossTotal)} avec carence standard).`,
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Le calculateur propose une option « sans carence » pour les cas déjà connus. Il ne décide pas à votre place si la carence est neutralisée : seul le dossier examiné par la CPAM tranche.",
          ],
        },
      ],
    },
    {
      id: "ijss-brutes-ou-nettes",
      title: "IJSS brutes ou nettes : combien est réellement versé ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les IJSS affichées en brut supportent la CSG (${pctFr(CSG_RATE_ON_IJSS)} %) et la CRDS (${pctFr(CRDS_RATE_ON_IJSS)} %), indépendamment du statut cadre ou non-cadre.`,
        },
        {
          type: "list",
          ordered: false,
          items: [
            `Sur l'exemple de référence : ${formatEuro(ex2000_14.ijssGrossTotal)} bruts correspondent à ${formatEuro(ex2000_14.ijssNetIndicativeTotal)} après CSG et CRDS, avant prélèvement à la source.`,
            "Le prélèvement à la source peut ensuite s'appliquer selon votre taux et votre situation fiscale.",
            "Les IJSS versées au titre d'un arrêt en rapport avec une ALD exonérante sont en principe exonérées d'impôt sur le revenu, selon les règles fiscales applicables.",
            "La subrogation change le circuit de versement, pas le montant des droits IJSS.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Source Urssaf :",
          label: IJSS_SOURCES.urssafCsg.label,
          href: IJSS_SOURCES.urssafCsg.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le traitement fiscal du salaire,",
          label: "lire le guide du prélèvement à la source",
          href: PAS,
        },
      ],
    },
    {
      id: "conditions-ouverture-droits",
      title: "Quelles conditions faut-il remplir pour toucher des IJSS ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'ouverture des droits dépend de conditions d'activité ou de cotisations contrôlées par la CPAM ; le calculateur n'en certifie aucune.",
        },
        {
          type: "paragraph",
          text: "Selon Ameli et la fiche Service-Public F3053, vérifiée le 1er juin 2026, pour un arrêt de six mois au plus, il faut notamment :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "avoir travaillé au moins 150 heures au cours des trois mois civils ou des 90 jours précédant l'arrêt ;",
            "ou avoir cotisé, sur les six mois civils précédents, sur une rémunération au moins égale à 1 015 fois le SMIC horaire.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour un arrêt supérieur à six mois, il faut notamment être affilié depuis au moins douze mois et avoir travaillé au moins 600 heures sur les douze mois ou 365 jours précédents, ou avoir cotisé sur une rémunération au moins égale à 2 030 fois le SMIC horaire.",
        },
        {
          type: "paragraph",
          text: "Pour les saisonniers et le travail discontinu, l'ouverture des droits est appréciée sur douze mois ou 365 jours (600 heures ou 2 030 fois le SMIC horaire). Le calculateur ne simule pas ces situations.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Depuis le 1er juillet 2025, un arrêt prescrit sur papier doit être établi sur le formulaire Cerfa sécurisé. Les scans, photocopies ou anciens modèles peuvent être rejetés par la CPAM.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Les seuils restent exprimés en multiples du SMIC horaire, car les montants en euros évoluent. La CPAM reste seule compétente pour confirmer l'ouverture des droits.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche officielle :",
          label: IJSS_SOURCES.servicePublic.label,
          href: IJSS_SOURCES.servicePublic.href,
        },
      ],
    },
    {
      id: "versement-et-subrogation",
      title: "Quand et comment les IJSS sont-elles versées ?",
      blocks: [
        {
          type: "paragraph",
          text: "Sans subrogation, la CPAM verse en principe les IJSS tous les 14 jours après instruction du dossier, sur présentation de l'attestation de salaire.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Le délai administratif de traitement n'est pas le délai de carence de 3 jours.",
            "En cas de subrogation, la CPAM verse directement les IJSS à l'employeur. Celui-ci assure le maintien de salaire selon les règles applicables et fait apparaître les opérations correspondantes sur le bulletin de paie.",
            "La subrogation modifie le circuit de versement, pas le calcul initial des droits aux IJSS.",
            "Conservez vos relevés de paiement Ameli et l'attestation de salaire pour contrôler les montants.",
          ],
        },
      ],
    },
    {
      id: "duree-maximale-ijss",
      title: "Combien de temps peut-on percevoir des IJSS ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le cas général d'une maladie non professionnelle, les IJSS peuvent être versées pendant une durée maximale de 360 jours sur une période de trois ans.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Certaines situations, notamment liées à une ALD, peuvent ouvrir des droits plus longs, sous conditions et après examen.",
            "À l'épuisement des droits, un nouvel examen peut être nécessaire avant toute reprise d'indemnisation.",
            "Les dossiers longs ou discontinus ne se résument pas à une règle unique : vérifiez votre situation auprès de votre CPAM.",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Le calculateur estime le montant sur la période saisie. Il ne suit pas automatiquement le stock de jours déjà indemnisés sur trois ans.",
          ],
        },
      ],
    },
    {
      id: "exemples-calcul-ijss",
      title: "Exemples de calcul des IJSS",
      blocks: [
        {
          type: "paragraph",
          text: "Tableau produit par le même moteur que le calculateur. Montants avant prélèvement à la source. Arrêts débutant en septembre 2026 (barème Ameli à compter du 1er juillet 2026).",
        },
        {
          type: "table",
          stackOnMobile: true,
          caption:
            "Scénarios IJSS (sans complément employeur) : carence, jours indemnisés, totaux",
          headers: [
            "Situation",
            "Carence",
            "Jours indemnisés",
            "IJ journalière estimée",
            "Total brut",
            "Après CSG/CRDS",
          ],
          rows: [
            rowScenario("2 000 €, 3 jours", ex3j),
            rowScenario("2 000 €, 7 jours", ex7j),
            rowScenario("2 000 €, 14 jours", ex2000_14),
            rowScenario("2 000 €, 30 jours", ex30j),
            rowScenario("2 000 €, 14 jours, sans carence", exWaived14),
            rowScenario("Salaires 1 900 / 2 100 / 2 300 €, 14 jours", exDiffSalaries),
            rowScenario("2 500 €, 14 jours", ex2500_14),
            rowScenario("4 000 € (plafond), 14 jours", ex4000),
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple standard : ${formatEuro(2000)} brut, ${ex2000_14.totalCalendarDays} jours, carence de ${ex2000_14.ijssCarenceDays} jours. IJ journalière ${formatEuro(ex2000_14.dailyIjssGross)}, total brut ${formatEuro(ex2000_14.ijssGrossTotal)}, soit ${formatEuro(ex2000_14.ijssNetIndicativeTotal)} après CSG et CRDS.`,
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Exemple plafond : à ${formatEuro(4000)} brut, l'estimation calculée de l'IJ journalière est de ${formatEuro(ex4000.dailyIjssGross)} (plafond officiel publié : ${formatEuro(CURRENT_BAREME.maxDailyIjssGross)} par jour). Sur ${ex4000.totalCalendarDays} jours avec carence, le total brut estimé atteint ${formatEuro(ex4000.ijssGrossTotal)} (${formatEuro(ex4000.ijssNetIndicativeTotal)} après CSG et CRDS).`,
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour tester vos propres dates et salaires,",
          label: "ouvrir le calculateur d'IJSS",
          href: CALCULATOR_ANCHOR,
        },
      ],
    },
    {
      id: "verifier-calcul-cpam",
      title: "Comment vérifier le calcul de la CPAM ?",
      blocks: [
        {
          type: "paragraph",
          text: "Comparez votre relevé Ameli à l'attestation de salaire en contrôlant, dans l'ordre, les trois salaires retenus, le plafond, le salaire journalier de base, la carence et le nombre de jours calendaires.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Trois salaires de référence",
              description:
                "Vérifiez les montants bruts des trois mois civils précédant l'arrêt sur l'attestation.",
            },
            {
              title: "Plafond et salaire journalier",
              description: `Contrôlez le plafonnement à ${formatEuro(CURRENT_BAREME.monthlyCeiling)} si l'arrêt débute à compter du 1er juillet 2026, puis la division par 91,25 et l'application de 50 %.`,
            },
            {
              title: "Carence et jours indemnisés",
              description:
                "Comptez les jours calendaires inclusifs, retirez la carence applicable, puis multipliez par l'IJ journalière.",
            },
            {
              title: "CSG, CRDS et PAS",
              description: `Retrouvez les ${pctFr(CSG_RATE_ON_IJSS)} % de CSG et ${pctFr(CRDS_RATE_ON_IJSS)} % de CRDS, puis le prélèvement à la source éventuel.`,
            },
            {
              title: "Subrogation",
              description:
                "Si l'employeur est subrogé, la CPAM lui verse les IJSS. Le maintien de salaire et les opérations correspondantes figurent sur le bulletin.",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour décoder les lignes du bulletin,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE,
        },
      ],
    },
    {
      id: "situations-non-couvertes",
      title: "Situations non couvertes par le calcul standard",
      blocks: [
        {
          type: "paragraph",
          text: "Cette page traite le cas général des IJSS maladie pour un salarié mensualisé du privé relevant du régime général. Elle ne simule pas automatiquement :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Accident du travail, accident de trajet et maladie professionnelle",
            "Congé maternité, paternité, adoption ou congé pathologique",
            "Temps partiel thérapeutique et reprise progressive",
            "Régimes locaux particuliers, notamment l'Alsace-Moselle",
            "Fonction publique, professions libérales et travailleurs indépendants",
            "Complément employeur, convention collective et prévoyance",
            "Salariés à employeurs multiples, saisonniers, intermittents ou activité discontinue",
            "Prélèvement à la source personnalisé",
            "Suivi du stock de jours déjà indemnisés sur trois ans",
          ],
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: IJSS_FRESHNESS_LINE,
        },
        {
          type: "paragraph",
          text: "Périmètre du moteur : IJSS maladie du salarié mensualisé du privé (régime général), sans complément employeur. Seuls les arrêts débutant à compter du 1er juillet 2026 sont simulés, avec le plafond Ameli de 2 613,83 € et l'IJ maximale publiée de 42,97 €.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Chaque salaire mensuel est plafonné séparément, puis la somme des trois montants retenus est divisée par 91,25",
            "IJSS journalière brute = salaire journalier de base × 50 %, puis comparaison à l'IJ maximale publiée",
            "IJSS totales = IJSS journalière × nombre de jours indemnisés après carence",
            `IJSS après CSG/CRDS = IJSS brutes × (1 − ${pctFr(CSG_RATE_ON_IJSS)} % − ${pctFr(CRDS_RATE_ON_IJSS)} %), avant PAS`,
            "Jours calendaires inclusifs entre date de début et date de fin",
          ],
        },
        {
          type: "paragraph",
          text: `Arbitrage sur le plafond mensuel applicable à compter du 1er juillet 2026 : Ameli publie ${formatEuro(CURRENT_BAREME.monthlyCeiling)} ; Service-Public affiche parfois ${formatEuro(2613.82)}. Le calculateur retient la valeur Ameli. Pour juin 2026, les sources officielles consultées présentent une incohérence : aucune estimation n'est affichée.`,
        },
        {
          type: "paragraph",
          text: "Arrondi : aucune règle officielle uniforme de troncature ou d'arrondi au centime n'a été identifiée (R323-4, R323-5, circulaires DSS/CNAM, Ameli, Service-Public). Les exemples officiels consultés ne sont pas parfaitement homogènes. Le moteur conserve une méthode unique : troncature au centime après application des 50 %. Au plafond mensuel retenu, l'estimation atteint 42,96 € ; le plafond officiel publié reste de 42,97 € par jour. Un écart d'un centime peut exister avec le relevé CPAM.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            IJSS_SCOPE_DISCLAIMER,
            "Cette page ne constitue pas un conseil juridique, fiscal ou social personnalisé.",
          ],
        },
        {
          type: "paragraph",
          text: "Sources officielles :",
        },
        {
          type: "list",
          ordered: false,
          items: Object.values(IJSS_SOURCES).map((source) => ({
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
    "Réponses courtes sur la formule, le délai de carence, le versement et les cas particuliers.",
  faq: [
    {
      question: "Comment calculer les IJSS en arrêt maladie ?",
      answer: `Pour un salarié mensualisé, plafonnez séparément chacun des trois derniers salaires, additionnez-les, divisez par 91,25 puis appliquez 50 %. À ${formatEuro(2000)} brut par mois, l'IJSS journalière brute vaut ${formatEuro(ex2000_14.dailyIjssGross)}.`,
    },
    {
      question: "Pourquoi divise-t-on les trois derniers salaires par 91,25 ?",
      answer:
        "L'article R323-4 du Code de la sécurité sociale fixe le salaire journalier de base du salarié mensualisé à la somme des trois salaires de référence plafonnés, divisée par 91,25. Ce diviseur ne s'applique pas au calcul saisonnier.",
    },
    {
      question: "Les week-ends et jours fériés sont-ils indemnisés ?",
      answer:
        "Oui, dès lors qu'ils se situent après le délai de carence CPAM : le décompte des IJSS est calendaire, week-ends et fériés compris.",
    },
    {
      question: "Les IJSS dépendent-elles du statut cadre ou non-cadre ?",
      answer:
        "Non. Le taux de 50 %, le plafond et les prélèvements CSG/CRDS propres aux IJSS maladie ne dépendent pas du statut cadre ou non-cadre.",
    },
    {
      question: "Les IJSS sont-elles imposables ?",
      answer:
        "Les IJSS maladie sont en principe imposables. Celles versées au titre d'un arrêt en rapport avec une ALD exonérante peuvent être exonérées d'impôt sur le revenu, selon les règles fiscales applicables. Les estimations de cette page sont présentées avant prélèvement à la source.",
    },
    {
      question: "Qu'est-ce que la subrogation des IJSS ?",
      answer:
        "En cas de subrogation, la CPAM verse directement les IJSS à l'employeur. Celui-ci assure le maintien de salaire selon les règles applicables et fait apparaître les opérations correspondantes sur le bulletin de paie. La subrogation modifie le circuit de versement, pas le calcul initial des droits aux IJSS.",
    },
    {
      question: "Que se passe-t-il si les trois derniers salaires sont différents ?",
      answer: `Chaque mois est plafonné séparément, puis les trois montants retenus sont additionnés. Avec ${formatEuro(1900)}, ${formatEuro(2100)} et ${formatEuro(2300)}, l'IJSS journalière brute atteint ${formatEuro(exDiffSalaries.dailyIjssGross)}.`,
    },
    {
      question: "Comment sont calculées les IJSS d'un salarié saisonnier ?",
      answer:
        "Les saisonniers et travailleurs discontinus suivent des règles particulières. La période de référence peut porter sur les rémunérations des douze mois précédant l'arrêt, avec un diviseur de 365, et l'ouverture des droits est appréciée sur douze mois ou 365 jours. Ce calculateur vise uniquement le salarié mensualisé du cas général : il ne doit pas être utilisé pour calculer automatiquement les IJSS d'un saisonnier.",
    },
    {
      question: "Qu'est-ce que le salaire rétabli IJSS ?",
      answer:
        "Lorsqu'un des trois derniers salaires correspond à un mois incomplet, l'attestation de salaire peut mentionner un salaire rétabli. L'employeur transmet ces informations à la CPAM. Le calculateur ne reconstitue pas ce montant : reprenez les chiffres de l'attestation ou du relevé CPAM.",
    },
    {
      question: "Comment vérifier le montant versé par la CPAM ?",
      answer:
        "Comparez les trois salaires retenus, leur plafonnement séparé, la division par 91,25, le délai de carence et le nombre de jours calendaires avec votre attestation de salaire et votre relevé Ameli. Un écart d'un centime peut exister selon la méthode d'arrondi utilisée par la CPAM.",
    },
  ],
  conclusion: {
    title: "Estimez vos IJSS en quelques secondes",
    keyPoints: [],
    closingText:
      "Renseignez votre salaire brut et vos dates d'arrêt pour obtenir l'IJ journalière, les jours indemnisés et le total après CSG et CRDS, puis comparez le résultat à votre relevé Ameli.",
    closingCta: {
      label: "Calculer mes IJSS",
      href: CALCULATOR_ANCHOR,
    },
    closingSecondaryLinks: [
      {
        label: "Vérifier le complément employeur",
        href: "/maintien-salaire-arret-maladie",
      },
      {
        label: "Estimer votre revenu total",
        href: SALARY_DURING_SICK_LEAVE_PATH,
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
      {
        title: "Salaire en arrêt maladie (IJSS et complément)",
        href: SALARY_DURING_SICK_LEAVE_PATH,
      },
      {
        title: "Maintien de salaire par l'employeur",
        href: "/maintien-salaire-arret-maladie",
      },
      { title: "Lire une fiche de paie", href: LIRE_FICHE },
      { title: "Cotisations salariales", href: COTISATIONS },
      { title: "Prélèvement à la source", href: PAS },
      { title: "SMIC : montants officiels", href: SMIC_PATH },
      {
        title: IJSS_SOURCES.ameli.label,
        href: IJSS_SOURCES.ameli.href,
      },
      {
        title: IJSS_SOURCES.servicePublic.label,
        href: IJSS_SOURCES.servicePublic.href,
      },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
  },
};
