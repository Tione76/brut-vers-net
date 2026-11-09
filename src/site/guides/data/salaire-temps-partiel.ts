import type { Guide } from "../types";
import {
  PART_TIME_BREADCRUMB,
  PART_TIME_EXAMPLE_FULL_TIME_GROSS,
  PART_TIME_EXAMPLE_HOURLY_RATE,
  PART_TIME_FULL_TIME_WEEKLY_HOURS,
  PART_TIME_H1,
  PART_TIME_META_DESCRIPTION,
  PART_TIME_PATH,
  PART_TIME_PUBLISHED_AT,
  PART_TIME_SEO_TITLE,
  PART_TIME_SLUG,
  PART_TIME_SMIC_CONTEXT as SMIC,
  PART_TIME_SOURCES as S,
  PART_TIME_SUBTITLE,
  PART_TIME_UPDATED_AT,
  complementaryHoursGross,
  formatPartTimeEuro,
  formatPartTimeEuroReadable,
  formatPartTimeHours,
  fullTimeEquivalentGross,
  monthlyGrossFromHourlyRate,
  partTimeBaseGross,
  partTimeDurationRows,
  partTimeEightyRows,
  partTimeSmicRows,
  transportRefundBelowHalf,
} from "@/site/salaire-temps-partiel";

const HOME = "/";
const SMIC_HREF = "/smic";
const SMIC_HOURS = "/smic-selon-nombre-heures";
const CALCULER_NET = "/guides/comment-calculer-son-salaire-net";
const FICHE_PAIE = "/guides/comment-lire-une-fiche-de-paie";
const PAS =
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const PRIME_ACTIVITE = "/prime-activite";
const CONGES = "/conges-payes";
const SOLDE_CONGES = "/solde-conges-payes";
const SYNTEC = "/grille-salaire-syntec";

const FULL = PART_TIME_EXAMPLE_FULL_TIME_GROSS;
const RATE = PART_TIME_EXAMPLE_HOURLY_RATE;
const DURATIONS = partTimeDurationRows();
const EIGHTY = partTimeEightyRows();
const SMIC_ROWS = partTimeSmicRows();

const EX_24 = partTimeBaseGross(FULL, 24);
const EX_80 = partTimeBaseGross(FULL, 28);
const EX_HALF = partTimeBaseGross(FULL, 17.5);
const EX_HOURLY_24 = monthlyGrossFromHourlyRate(RATE, 24);
const EX_FTE = fullTimeEquivalentGross(1600, 0.8);
const EX_COMP = complementaryHoursGross(2, RATE, 0.1);
const DROP_80 = Math.round((FULL - EX_80) * 100) / 100;
const TRANSPORT_FULL = 40;
const TRANSPORT_10H = transportRefundBelowHalf(TRANSPORT_FULL, 10);

function euro(value: number): string {
  return `${formatPartTimeEuroReadable(value)}\u00a0€`;
}

function euroTable(value: number): string {
  return `${formatPartTimeEuro(value, 2)}\u00a0€`;
}

function hoursLabel(value: number): string {
  return `${formatPartTimeHours(value)}\u00a0h`;
}

function durationTableRows(): string[][] {
  return DURATIONS.map((row) => [
    row.label,
    row.weeklyHours === 17.5 ? "17 h 30" : hoursLabel(row.weeklyHours),
    hoursLabel(row.monthlyHours),
    euroTable(row.baseGross),
  ]);
}

function eightyTableRows(): string[][] {
  return EIGHTY.map((row) => [
    euroTable(row.fullTimeGross),
    euroTable(row.atEightyGross),
    euroTable(row.monthlyDrop),
  ]);
}

function smicTableRows(): string[][] {
  return SMIC_ROWS.map((row) => [
    row.label,
    hoursLabel(row.monthlyHours),
    euroTable(row.monthlyGross),
  ]);
}

/**
 * Guide salaire à temps partiel (secteur privé).
 * URL : /salaire-temps-partiel
 */
export const salaireTempsPartielGuide: Guide = {
  slug: PART_TIME_SLUG,
  publicPath: PART_TIME_PATH,
  breadcrumbLabel: PART_TIME_BREADCRUMB,
  title: PART_TIME_H1,
  seoTitle: PART_TIME_SEO_TITLE,
  description: PART_TIME_META_DESCRIPTION,
  subtitle: PART_TIME_SUBTITLE,
  publishedAt: PART_TIME_PUBLISHED_AT,
  updatedAt: PART_TIME_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire à temps partiel",
  faqIntro:
    "Réponses courtes sur le 80 %, le mi-temps, les 24 heures et le calcul du net.",
  introduction: [
    "Vous envisagez de passer à 80 %, de travailler à mi-temps ou de signer un contrat de 24 heures par semaine ? Dans le secteur privé, le salaire brut de base est généralement calculé au prorata de la durée de travail. Sur une base de 35 heures, un 80 % correspond à 28 heures par semaine, un mi-temps à 17 h 30 et un contrat de 24 heures à environ 68,57 % d'un temps complet.",
    "Mais la somme réellement versée sur votre compte ne baisse pas forcément dans les mêmes proportions : certaines cotisations, les primes, les remboursements de frais et le prélèvement à la source peuvent modifier le résultat. Voici les calculs et les points à vérifier avant de comparer deux salaires.",
    "Les exemples concernent un salarié du secteur privé, sur une référence de 35 heures par semaine, sauf indication contraire.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "À 80 %, le salaire brut de base représente généralement 80 % de celui d'un temps complet équivalent.",
      "Sur une référence de 35 heures, 80 % = 28 heures ; mi-temps = 17 h 30 ; 24 heures ≈ 68,57 %.",
      "Un salaire net ne se déduit pas exactement en appliquant la même proportion à l'ancien net.",
      "Les heures effectuées au-delà du contrat sont, dans le régime courant du temps partiel, des heures complémentaires.",
      "La durée des congés payés n'est pas divisée par deux à mi-temps.",
    ],
  },
  sections: [
    {
      id: "salaire-selon-duree",
      title: "Quel salaire selon votre durée de travail ?",
      blocks: [
        {
          type: "paragraph",
          text: `Voici des repères de salaire brut de base pour plusieurs durées courantes. Hypothèses : temps complet de référence à ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures par semaine ; même emploi, même qualification et même taux horaire ; salaire mensuel brut de base à temps plein de ${euro(FULL)} ; hors primes, heures complémentaires, absences et autres éléments variables.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ces tableaux partent d'une durée légale de 35 heures. Une durée conventionnelle inférieure, une organisation à 39 heures ou un forfait jours appellent un calcul adapté. Les montants ne s'appliquent pas tels quels à un agent public.",
          ],
        },
        {
          type: "table",
          caption: `Salaire brut de base par mois (exemple à ${euro(FULL)} temps plein, référence ${PART_TIME_FULL_TIME_WEEKLY_HOURS} h)`,
          headers: [
            "Durée ou quotité",
            "Heures par semaine",
            "Moyenne mensuelle",
            "Salaire brut de base",
          ],
          rows: durationTableRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Les heures mensuelles affichées sont arrondies pour la lisibilité. Les montants de salaire sont calculés à partir des rapports exacts (heures hebdomadaires × 52 ÷ 12), puis arrondis au centime. Un écart d'un centime lié à un arrondi de paie n'est pas, à lui seul, la preuve d'une erreur de l'employeur.",
        },
        {
          type: "paragraph",
          text: `Ce tableau n'est pas un barème de salaire : ${euro(FULL)} est un exemple pédagogique de salaire à temps complet. Utilisez le rapport exact des durées (par exemple 24 ÷ 35), plutôt qu'un pourcentage déjà arrondi. La mensualisation usuelle repose sur 52 semaines ÷ 12 mois, et non sur « quatre semaines par mois ».`,
        },
      ],
    },
    {
      id: "comment-calculer",
      title: "Comment calculer un salaire à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le secteur privé, la rémunération d'un salarié à temps partiel est en principe proportionnelle à sa durée de travail, à qualification et emploi équivalents. Ce calcul porte sur le salaire brut de base comparable. Les primes, avantages et remboursements doivent ensuite être examinés séparément.",
        },
      ],
      subsections: [
        {
          id: "calcul-depuis-brut-temps-plein",
          title: "À partir d'un salaire brut à temps complet",
          blocks: [
            {
              type: "paragraph",
              text: "Formule : salaire brut de base à temps partiel = salaire brut de base à temps complet × durée à temps partiel ÷ durée à temps complet.",
            },
            {
              type: "paragraph",
              text: `Exemple : ${euro(FULL)} × 24 ÷ 35 = ${euro(EX_24)} brut par mois.`,
            },
          ],
        },
        {
          id: "calcul-depuis-taux-horaire",
          title: "À partir d'un taux horaire brut",
          blocks: [
            {
              type: "paragraph",
              text: "Pour une durée hebdomadaire fixe mensualisée : taux horaire brut × heures hebdomadaires × 52 ÷ 12.",
            },
            {
              type: "paragraph",
              text: `Exemple fictif indépendant du SMIC : ${euro(RATE)} × 24 × 52 ÷ 12 = ${euro(EX_HOURLY_24)} brut par mois, hors éléments supplémentaires.`,
            },
          ],
        },
        {
          id: "equivalent-temps-plein",
          title: "Retrouver l'équivalent temps plein d'un salaire",
          blocks: [
            {
              type: "paragraph",
              text: "La quotité est la part du temps complet prévue à votre contrat : 80 % correspond, par exemple, à 28 heures sur une référence de 35 heures. Dans le calcul, 80 % s'écrit 0,80.",
            },
            {
              type: "paragraph",
              text: "Formule : salaire brut de base à temps partiel ÷ quotité de travail.",
            },
            {
              type: "paragraph",
              text: `Exemple : ${euro(1600)} ÷ 0,80 = ${euro(EX_FTE)} brut de base en équivalent temps plein.`,
            },
            {
              type: "paragraph",
              text: "Cette comparaison ne suffit pas, à elle seule, pour comparer les primes, les avantages, la charge de travail ou les conditions de deux postes.",
            },
          ],
        },
      ],
    },
    {
      id: "salaire-a-80-pourcent",
      title: "Quel salaire à 80 % ?",
      blocks: [
        {
          type: "paragraph",
          text: `Sur une référence de ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures, 80 % correspondent à 28 heures par semaine. Un 80 % ne signifie pas automatiquement « un jour de repos fixe par semaine » : la répartition dépend du contrat. Quatre jours travaillés ne signifient pas non plus automatiquement 80 % : une semaine de 35 heures répartie sur quatre jours reste à temps complet.`,
        },
        {
          type: "table",
          caption: "Salaire brut de base par mois à 80 % (référence 35 h, taux horaire inchangé)",
          headers: [
            "Salaire brut de base à temps plein",
            "À 80 %",
            "Baisse brute mensuelle",
          ],
          rows: eightyTableRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: `Avec ${euro(FULL)} brut de base à temps plein, le brut de base à 80 % s'élève à ${euro(EX_80)}, soit une baisse de ${euro(DROP_80)}. Cette baisse de 20 % concerne le salaire brut de base à taux horaire inchangé. Ce n'est pas une garantie de baisse de 20 % du net versé ni du revenu disponible du foyer.`,
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Les règles de rémunération à 80 % dans la fonction publique peuvent être différentes. Les exemples de ce guide ne s'appliquent donc pas directement aux agents publics.",
          ],
        },
      ],
    },
    {
      id: "salaire-mi-temps",
      title: "Quel salaire à mi-temps ?",
      blocks: [
        {
          type: "paragraph",
          text: `Un mi-temps correspond à 50 % du temps complet de référence. Sur une référence de ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures : 17 h 30 par semaine, soit environ ${hoursLabel(DURATIONS[0]!.monthlyHours)} en moyenne mensuelle. Avec ${euro(FULL)} brut de base à temps complet : ${euro(EX_HALF)} brut à mi-temps.`,
        },
        {
          type: "paragraph",
          text: "Un mi-temps n'est pas automatiquement un contrat de 20 heures. Un mi-temps ordinaire n'est pas non plus un temps partiel thérapeutique, qui relève d'un régime distinct.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Un contrat inférieur à 24 heures peut être possible dans les situations prévues par la loi ou un accord applicable. La durée minimale de 24 heures ne rend pas tous les mi-temps illégaux.",
          ],
        },
      ],
    },
    {
      id: "salaire-24-heures",
      title: "Quel salaire pour 24 heures par semaine ?",
      blocks: [
        {
          type: "paragraph",
          text: `24 ÷ 35 ≈ 68,57 % d'un temps complet. En mensualisation : 24 × 52 ÷ 12 = 104 heures. Avec ${euro(FULL)} brut de base à temps plein : ${euro(EX_24)} brut par mois. Avec un taux horaire de ${euro(RATE)} : ${euro(EX_HOURLY_24)} brut par mois.`,
        },
      ],
      subsections: [
        {
          id: "pourquoi-24-heures",
          title: "Pourquoi parle-t-on souvent de 24 heures ?",
          blocks: [
            {
              type: "paragraph",
              text: "À défaut d'accord de branche étendu fixant une autre durée minimale, la durée minimale de droit commun du temps partiel est de 24 heures par semaine (ou l'équivalent mensuel). Ce n'est pas un minimum absolu applicable à tous les contrats.",
            },
            {
              type: "paragraph",
              text: "Une durée inférieure peut notamment résulter d'un accord de branche étendu dans le cadre légal, d'une demande écrite et motivée pour contraintes personnelles ou cumul d'activités, ou, pour un salarié de moins de 26 ans qui poursuit ses études, d'une durée compatible avec ses études fixée de droit à sa demande. Certains contrats très courts ou de remplacement sont aussi exclus de cette durée minimale.",
            },
            {
              type: "paragraph",
              text: "Une demande écrite ne suffit pas dans tous les cas : les conditions dépendent du motif et du texte applicable. Vérifiez votre convention collective et, au besoin, les articles L. 3123-7, L. 3123-19 et L. 3123-27.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Fiche officielle Service-Public :",
              label: S.servicePublicTempsPartiel.label,
              href: S.servicePublicTempsPartiel.href,
            },
          ],
        },
      ],
    },
    {
      id: "smic-temps-partiel",
      title: "Quel salaire minimum à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC est d'abord un minimum horaire brut. Les repères ci-dessous concernent un salarié majeur relevant du taux de droit commun, hors règles particulières de l'apprentissage, de la professionnalisation et des mineurs. Un minimum conventionnel plus favorable peut aussi s'appliquer selon ses propres règles.`,
        },
        {
          type: "table",
          caption: `${SMIC.caption} Montants bruts par mois.`,
          headers: ["Durée", "Heures mensualisées", "SMIC brut par mois"],
          rows: smicTableRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: `Ces montants utilisent le taux du SMIC applicable en métropole et dans les territoires soumis au même taux (${SMIC.hourlyGrossLabel} depuis le ${SMIC.effectiveFromLabel}). Un montant spécifique s'applique à Mayotte. Calcul : heures hebdomadaires × 52 ÷ 12 × taux horaire brut, arrondi au centime.`,
        },
        {
          type: "paragraph",
          text: "Ces trois lignes sont des repères utiles. Pour le tableau de 10 à 44 heures, consultez le guide dédié. Les tableaux présentent des montants bruts. Le salaire net dépend notamment des cotisations, de la mutuelle et de votre situation fiscale.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail par durée hebdomadaire :",
          label: "SMIC selon le nombre d'heures",
          href: SMIC_HOURS,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les montants et la revalorisation :",
          label: "SMIC brut et net actuellement applicables",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Exemple de minima conventionnels :",
          label: "Grille de salaire Syntec",
          href: SYNTEC,
        },
      ],
    },
    {
      id: "estimer-salaire-net",
      title: "Comment estimer le salaire net à temps partiel ?",
      blocks: [
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Multiplier l'ancien net par 80 % ou 50 % donne éventuellement un ordre de grandeur, mais pas un résultat fiable dans toutes les situations.",
          ],
        },
        {
          type: "table",
          caption: "Principaux montants du bulletin et leur rôle",
          headers: ["Montant du bulletin", "À quoi sert-il ?"],
          rows: [
            [
              "Salaire brut",
              "Rémunération avant déduction des cotisations salariales.",
            ],
            [
              "Net à payer avant impôt",
              "Montant à payer avant la retenue de prélèvement à la source ; le bulletin peut aussi comporter des remboursements et autres ajustements.",
            ],
            [
              "Net imposable",
              "Montant fiscal servant notamment de base au prélèvement à la source ; il peut différer du net à payer.",
            ],
            [
              "Montant net social",
              "Montant de référence utilisé notamment pour le RSA et la prime d'activité, selon leurs règles déclaratives.",
            ],
            [
              "Net payé après impôt",
              "Somme versée après retenue du prélèvement à la source et autres éléments du bulletin.",
            ],
          ],
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Ces notions ne baissent pas toutes dans les mêmes proportions quand la durée change. Retirer un pourcentage fixe au salaire brut donne seulement une approximation : certaines retenues et certains éléments de rémunération ne suivent pas la même proportion.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Hypothèse : votre part salariale de mutuelle reste à 50 € par mois après un passage à 80 %. Elle ne descend pas automatiquement à 40 €. C'est l'une des raisons pour lesquelles le nouveau net peut différer de 80 % de l'ancien net. Ce n'est pas le fonctionnement obligatoire de toutes les mutuelles.",
          ],
        },
        {
          type: "checklist",
          title: "Méthode recommandée",
          items: [
            "Déterminer le nouveau brut de base",
            "Vérifier primes et retenues maintenues ou modifiées",
            "Estimer le net avec les paramètres appropriés",
            "Demander une simulation au service paie",
          ],
        },
        {
          type: "paragraph",
          text: "Notre calculateur brut/net estime un net indicatif à partir d'un brut, d'un profil (cadre ou non-cadre) et d'un pourcentage de temps de travail. Il n'intègre pas le détail de votre mutuelle ni chaque ligne de cotisation de votre bulletin.",
        },
        {
          type: "list",
          items: [
            {
              text: "Pour une estimation rapide, utilisez le",
              href: HOME,
              label: "calculateur brut / net",
            },
            {
              text: "Pour une estimation Urssaf complémentaire, consultez",
              href: S.monEntrepriseBrutNet.href,
              label: S.monEntrepriseBrutNet.label,
            },
            {
              text: "Pour repérer ces montants sur votre bulletin, lisez",
              href: FICHE_PAIE,
              label: "comment lire une fiche de paie",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source dépend du montant imposable concerné et du taux applicable. Une baisse du salaire peut diminuer le montant retenu même si le taux reste inchangé. Cette baisse de montant n'est pas la même chose qu'une actualisation du taux.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre le taux retenu :",
          label: "Prélèvement à la source : fonctionnement",
          href: PAS,
        },
      ],
    },
    {
      id: "perte-reelle",
      title: "Combien perd-on réellement en passant à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: `Reprenons l'exemple à ${euro(FULL)} brut de base à ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures, passé à 80 %. Le nouveau brut de base est ${euro(EX_80)}, soit ${euro(DROP_80)} de moins. On ne peut pas en déduire automatiquement une baisse identique du net ni du budget disponible.`,
        },
        {
          type: "checklist",
          title: "Points à comparer avant de conclure",
          items: [
            "Nouveau net estimé avant impôt",
            "Nouveau prélèvement à la source",
            "Primes maintenues, réduites ou perdues",
            "Frais de déplacement et de repas",
            "Frais de garde éventuels",
            "Prestations éventuelles selon la situation du foyer",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Une éventuelle baisse des frais de déplacement ou une aide sociale peut modifier votre budget, mais ne garantit pas le maintien de votre revenu.",
          ],
        },
      ],
    },
    {
      id: "primes-avantages",
      title: "Primes et avantages : qu'est-ce qui change à temps partiel ?",
      blocks: [
        {
          type: "table",
          caption: "Éléments de rémunération à vérifier au passage à temps partiel",
          headers: ["Élément", "Ce qu'il faut vérifier"],
          rows: [
            [
              "Salaire de base",
              "Proportionnalité à la durée, dans le cadre présenté (emploi et qualification équivalents).",
            ],
            [
              "13e mois et primes",
              "Texte qui les prévoit et conditions de calcul (prorata, présence, objectifs).",
            ],
            [
              "Prime sur objectifs",
              "Objectifs adaptés et règles de calcul applicables au temps partiel.",
            ],
            [
              "Titres-restaurant",
              "Conditions d'attribution et présence d'un repas dans l'horaire, pas un simple prorata universel.",
            ],
            [
              "Abonnement de transport public",
              "À mi-temps ou plus de la durée de référence : mêmes conditions qu'un temps plein ; en dessous : proportionnalité selon la règle applicable.",
            ],
            [
              "Mutuelle",
              "Montant et régime applicables ; la cotisation n'est pas automatiquement divisée.",
            ],
            [
              "RTT",
              "Pas de droit automatique déduit du seul pourcentage de temps partiel ; dépend de l'accord et de l'organisation.",
            ],
          ],
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: `Exemple : avec un abonnement éligible de 80 € par mois et une prise en charge de 50 %, le remboursement est de ${euro(TRANSPORT_FULL)}. Sur une référence de 35 heures, un salarié à 28 heures, à 24 heures ou à mi-temps conserve cette prise en charge dans les mêmes conditions qu'un temps plein, si l'abonnement et le trajet sont éligibles et que les justificatifs sont fournis.`,
        },
        {
          type: "paragraph",
          text: `Sous la moitié du temps complet, le dénominateur n'est pas 35 heures mais la moitié de cette durée. À 10 heures par semaine sur une référence de 35 heures : ${euro(TRANSPORT_FULL)} × 10 ÷ 17,5 ≈ ${euro(TRANSPORT_10H)}. Ne multipliez pas le remboursement directement par 10/35.`,
        },
        {
          type: "paragraph",
          text: "Ne confondez pas l'abonnement aux transports publics avec les frais de carburant ou le forfait mobilités durables.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Règles de prise en charge :",
          label: S.servicePublicTransport.label,
          href: S.servicePublicTransport.href,
        },
      ],
    },
    {
      id: "heures-complementaires",
      title: "Comment sont payées les heures complémentaires ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le régime courant présenté ici, les heures effectuées au-delà de la durée prévue au contrat à temps partiel sont des heures complémentaires. Elles donnent lieu à une majoration de salaire et restent soumises à des limites.",
        },
        {
          type: "list",
          items: [
            "À défaut d'accord applicable permettant une limite supérieure : plafond du dixième de la durée contractuelle.",
            "Un accord collectif répondant aux conditions légales peut porter cette limite jusqu'au tiers.",
            "À défaut de stipulation applicable sur les taux : majoration de 10 % dans le dixième, puis 25 % au-delà dans la limite autorisée. Un accord de branche étendu peut prévoir d'autres taux, sans descendre sous 10 %.",
          ],
        },
        {
          type: "paragraph",
          text: "Un simple accord individuel ne suffit pas à ouvrir toutes ces adaptations. Les heures complémentaires ne peuvent pas porter la durée accomplie au niveau de la durée légale ou de la durée conventionnelle inférieure pertinente.",
        },
        {
          type: "paragraph",
          text: `Repère pour un contrat de 24 heures par semaine : le dixième représente 2,4 heures (2 h 24). Si une limite au tiers est valablement applicable, le plafond monte à 8 heures. Exemple : deux heures complémentaires à ${euro(RATE)} de l'heure, avec majoration de 10 % : 2 × ${euro(RATE)} × 1,10 = ${euro(EX_COMP)} brut. Les ${euro(EX_COMP)} correspondent uniquement aux deux heures effectuées pendant cette semaine. Le supplément du mois dépendra du nombre d'heures complémentaires réellement réalisées.`,
        },
        {
          type: "paragraph",
          text: "Un complément d'heures par avenant peut relever d'un dispositif distinct prévu par la branche. Ne le confondez pas avec les heures complémentaires ordinaires.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Plafond supplétif du dixième :",
          label: "Article L. 3123-28",
          href: S.codeL3123_28.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Limite pouvant aller jusqu'au tiers :",
          label: "Article L. 3123-20",
          href: S.codeL3123_20.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Majorations et interdiction d'atteindre le temps plein :",
          label: "Articles L. 3123-29 et L. 3123-9",
          href: S.codeL3123_29.href,
        },
      ],
    },
    {
      id: "conges-anciennete-retraite",
      title: "Congés, ancienneté et retraite : quels effets ?",
      subsections: [
        {
          id: "conges-payes-temps-partiel",
          title: "Congés payés",
          blocks: [
            {
              type: "paragraph",
              text: "La durée des congés n'est pas réduite au prorata du temps de travail. Un salarié à temps partiel a droit à la même durée de congés qu'un salarié à temps plein : en principe 2,5 jours ouvrables par mois de travail effectif, soit 30 jours ouvrables (cinq semaines) pour une année complète.",
            },
            {
              type: "paragraph",
              text: "Distinguez le nombre de jours acquis, le décompte des jours pris et l'indemnisation. Le décompte peut inclure des jours ouvrables non travaillés selon l'organisation du temps partiel.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour les règles générales :",
              label: "Guide congés payés",
              href: CONGES,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour lire vos compteurs :",
              label: "Solde de congés payés",
              href: SOLDE_CONGES,
            },
          ],
        },
        {
          id: "anciennete-temps-partiel",
          title: "Ancienneté",
          blocks: [
            {
              type: "paragraph",
              text: "Pour les droits liés à l'ancienneté, la durée est décomptée comme si le salarié avait été occupé à temps complet : les périodes non travaillées du temps partiel sont prises en compte en totalité.",
            },
            {
              type: "paragraph",
              text: "Pour certains calculs d'indemnités, un parcours mêlant temps plein et temps partiel conduit, en règle générale, à tenir compte des périodes travaillées selon chaque modalité. Des règles particulières peuvent toutefois s'appliquer.",
            },
            {
              type: "paragraph",
              text: "C'est notamment le cas d'un salarié engagé à temps plein puis licencié pendant un congé parental d'éducation à temps partiel : son indemnité de licenciement est calculée sur la base de la rémunération à temps plein, selon les règles applicables. Cette exception ne s'étend pas automatiquement à toutes les indemnités de retraite ou de rupture.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Textes de référence :",
              label: "Article L. 3123-5 et fiche indemnité de licenciement",
              href: S.servicePublicLicenciement.href,
            },
          ],
        },
        {
          id: "retraite-temps-partiel",
          title: "Retraite",
          blocks: [
            {
              type: "paragraph",
              text: "La validation des trimestres dépend notamment des revenus soumis à cotisations, pas seulement du nombre d'heures. Un temps partiel ne signifie donc pas automatiquement deux trimestres par an.",
            },
            {
              type: "paragraph",
              text: "Distinguez la validation des trimestres et le montant futur de la pension. Une baisse de rémunération peut affecter les droits à retraite. Les seuils annuels évoluent : consultez les montants actualisés sur les sites officiels.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Fiche officielle :",
              label: S.servicePublicRetraite.label,
              href: S.servicePublicRetraite.href,
            },
          ],
        },
      ],
    },
    {
      id: "aides-temps-partiel",
      title: "Peut-on recevoir une aide en travaillant à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: "Prime d'activité : possible selon les revenus et la situation du foyer. Aucun droit n'est ouvert du seul fait que le contrat est à temps partiel.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les conditions et le simulateur CAF :",
          label: "Guide prime d'activité",
          href: PRIME_ACTIVITE,
        },
        {
          type: "paragraph",
          text: "Congé parental : distinguez le salaire payé par l'employeur et une éventuelle prestation (par exemple PreParE). La Caf ne compense pas automatiquement la perte de salaire.",
        },
        {
          type: "paragraph",
          text: "Chômage : un passage volontaire à temps partiel n'ouvre pas, à lui seul, droit à un complément. Un éventuel cumul ARE / activité dépend d'un droit existant et de règles spécifiques.",
        },
      ],
    },
    {
      id: "limites-prorata",
      title: "Les situations où le simple prorata ne suffit pas",
      blocks: [
        {
          type: "paragraph",
          text: "Fonction publique : les règles de temps partiel et de rémunération sont propres. N'appliquez pas automatiquement 80 % de rémunération pour 80 % de travail selon les tableaux du privé.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Repères officiels :",
          label: S.servicePublicFonctionPublique.label,
          href: S.servicePublicFonctionPublique.href,
        },
        {
          type: "paragraph",
          text: "Temps partiel thérapeutique : régime distinct, qui peut associer rémunération du travail effectué et indemnités journalières sous conditions. Ce n'est pas nécessairement un travail à 50 %, et le maintien intégral de revenu n'est pas garanti.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Informations Assurance Maladie :",
          label: S.ameliTpt.label,
          href: S.ameliTpt.href,
        },
        {
          type: "paragraph",
          text: "Horaire de 39 heures ou temps de travail aménagé : examinez la composition du salaire, les heures supplémentaires, les RTT et l'accord applicable. Ne multipliez pas automatiquement le salaire total par 28/39.",
        },
        {
          type: "paragraph",
          text: "Forfait annuel en jours réduit : le nombre de jours et les règles de rémunération demandent une analyse adaptée. N'appliquez pas mécaniquement les tableaux horaires de cet article.",
        },
      ],
    },
    {
      id: "checklist-avant-signature",
      title: "Que vérifier avant de signer un passage à temps partiel ?",
      blocks: [
        {
          type: "checklist",
          title: "Checklist pratique",
          items: [
            "Durée de travail et référence temps complet",
            "Répartition des horaires",
            "Nouveau salaire brut de base",
            "Sort des primes et avantages",
            "Limites et majorations des heures complémentaires",
            "Date d'effet",
            "Durée éventuelle de l'aménagement et conditions de retour",
            "Estimation de paie fournie par l'employeur",
            "Incidence sur le budget du foyer",
          ],
        },
        {
          type: "paragraph",
          text: "Un passage à temps partiel nécessite normalement une formalisation écrite adaptée (contrat ou avenant). L'employeur n'est pas tenu d'accepter toute demande : les dispositifs particuliers (parental, thérapeutique, etc.) ont leurs propres conditions.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Pour comparer correctement, demandez le nouveau brut de base, une estimation du net et le détail des primes maintenues. Le pourcentage de temps de travail ne suffit pas à connaître la somme qui arrivera sur votre compte.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "À 80 %, suis-je payé 80 % de mon salaire ?",
      answer: `Pour le salaire brut de base, à taux horaire inchangé et emploi équivalent, oui en principe : 80 % d'une référence de ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures correspondent à 28 heures. Le net versé et les primes peuvent évoluer autrement.`,
    },
    {
      question: "Un contrat de 24 heures correspond-il à un mi-temps ?",
      answer: `Non. Sur une référence de ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures, un mi-temps est 17 h 30 (50 %). 24 heures représentent environ 68,57 % d'un temps complet.`,
    },
    {
      question: "Combien d'heures représente un 80 % ?",
      answer: `Sur une référence de ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures par semaine : 28 heures. Si votre temps complet conventionnel est différent, calculez 80 % de cette durée de référence.`,
    },
    {
      question:
        "Puis-je calculer mon nouveau net en multipliant mon net actuel par 0,8 ?",
      answer:
        "Vous pouvez obtenir un ordre de grandeur, mais pas un montant garanti. La mutuelle, certaines primes, les cotisations et le prélèvement à la source peuvent évoluer différemment. Pour une estimation plus fiable, partez du nouveau salaire brut et vérifiez les éléments de votre bulletin.",
    },
    {
      question:
        "Le salaire à temps partiel change-t-il selon le nombre de jours du mois ?",
      answer:
        "Pour une durée hebdomadaire stable mensualisée, le salaire de base est en principe indépendant du nombre de jours du mois civil. Absences, variables et dispositifs particuliers peuvent toutefois faire varier le bulletin.",
    },
    {
      question: "Peut-on travailler moins de 24 heures par semaine ?",
      answer:
        "Oui, lorsque la convention le prévoit dans le cadre légal, ou dans certains cas prévus par la loi (demande écrite motivée, études pour les moins de 26 ans, certains contrats courts ou de remplacement). Une demande écrite ne suffit pas dans toutes les situations.",
    },
    {
      question: "Un salarié à mi-temps a-t-il moins de congés payés ?",
      answer:
        "Non pour la durée des congés : les droits d'acquisition sont les mêmes qu'à temps plein. Le décompte des jours pris et l'indemnisation dépendent ensuite des règles applicables et du calendrier.",
    },
    {
      question:
        "Travailler quatre jours par semaine signifie-t-il être à temps partiel ?",
      answer: `Pas forcément. Si vous accomplissez toujours ${PART_TIME_FULL_TIME_WEEKLY_HOURS} heures sur quatre jours, vous restez à temps complet. Le temps partiel se définit par une durée inférieure au temps complet applicable, pas seulement par le nombre de jours.`,
    },
  ],
  conclusion: {
    title: "Pour conclure",
    keyPoints: [],
    closingText:
      "Pour estimer votre salaire à temps partiel, partez du salaire brut de base et de la durée de référence de votre entreprise. Vérifiez ensuite les primes, les retenues et les remboursements : ils ne suivent pas tous le même prorata. Avant de signer, une simulation du service paie vous permettra de mieux anticiper le montant réellement versé.",
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC selon le nombre d'heures",
          description: "Barème de 10 h à 44 h à partir du SMIC horaire.",
          href: SMIC_HOURS,
        },
        {
          title: "Comment calculer son salaire net",
          description: "Méthode pour estimer un net à partir du brut.",
          href: CALCULER_NET,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer brut, cotisations, net et prélèvement à la source.",
          href: FICHE_PAIE,
        },
        {
          title: "Calculateur brut / net",
          description: "Estimation indicative en ligne.",
          href: HOME,
        },
      ],
    },
  },
  bibliographyPlacement: "after-conclusion",
  bibliography: {
    id: "methodologie-sources",
    title: "Sources et méthode de vérification",
    blocks: [
      {
        type: "paragraph",
        text: `SMIC : ${SMIC.caption} Contrôle des sources le ${SMIC.checkedOnLabel} (Service-Public F2300, arrêté du 22 mai 2026, Ministère du Travail).`,
      },
      {
        type: "paragraph",
        text: "Temps partiel, durée minimale, rémunération et ancienneté : Service-Public F32428 et Code du travail (L. 3123-5, L. 3123-6, L. 3123-7, L. 3123-19, L. 3123-27). Heures complémentaires : L. 3123-9, L. 3123-20, L. 3123-21, L. 3123-28, L. 3123-29.",
      },
      {
        type: "paragraph",
        text: "Congés : F33927. Indemnité de licenciement et exception parentale : F987. Transports publics : F37900. Retraite : F1761. Fonction publique : F486. Temps partiel thérapeutique : Ameli. Estimations brut/net : Urssaf (mon-entreprise).",
      },
      {
        type: "paragraph",
        text: "Méthode : rapports exacts de durée, puis arrondi monétaire au centime. Heures mensuelles = heures hebdomadaires × 52 ÷ 12. Les exemples à 2 500 € et 15 €/h sont pédagogiques. Les tableaux présentent des montants bruts ; le net dépend des cotisations, de la mutuelle et de la situation fiscale.",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "SMIC - Service-Public :",
        label: S.servicePublicSmic.label,
        href: S.servicePublicSmic.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Arrêté de revalorisation :",
        label: S.arreteSmicMai2026.label,
        href: S.arreteSmicMai2026.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Temps partiel :",
        label: S.servicePublicTempsPartiel.label,
        href: S.servicePublicTempsPartiel.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Rémunération et ancienneté :",
        label: S.codeL3123_5.label,
        href: S.codeL3123_5.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Durée minimale :",
        label: S.codeL3123_7.label,
        href: S.codeL3123_7.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Heures complémentaires :",
        label: S.codeL3123_28.label,
        href: S.codeL3123_28.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Indemnité de licenciement :",
        label: S.servicePublicLicenciement.label,
        href: S.servicePublicLicenciement.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Transports publics :",
        label: S.servicePublicTransport.label,
        href: S.servicePublicTransport.href,
      },
      {
        type: "internal-link",
        variant: "simulator",
        intro: "Urssaf :",
        label: S.monEntrepriseBrutNet.label,
        href: S.monEntrepriseBrutNet.href,
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez un net indicatif à partir d'un brut.",
      href: HOME,
    },
    relatedGuides: [
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS },
      { title: "Comment calculer son salaire net", href: CALCULER_NET },
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE },
    ],
  },
};
