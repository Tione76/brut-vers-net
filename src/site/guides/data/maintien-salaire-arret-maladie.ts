import type { Guide } from "../types";
import {
  EMPLOYER_MAINTIEN_BREADCRUMB,
  EMPLOYER_MAINTIEN_CALCULATOR_ID,
  EMPLOYER_MAINTIEN_DURATION_ROWS,
  EMPLOYER_MAINTIEN_FRESHNESS_LINE,
  EMPLOYER_MAINTIEN_H1,
  EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID,
  EMPLOYER_MAINTIEN_LIMITS_SECTION_ID,
  EMPLOYER_MAINTIEN_META_DESCRIPTION,
  EMPLOYER_MAINTIEN_METHOD_NOTE,
  EMPLOYER_MAINTIEN_METHODOLOGY_NOTE,
  EMPLOYER_MAINTIEN_EXCLUSION_NOTE,
  EMPLOYER_MAINTIEN_FORMULA,
  EMPLOYER_MAINTIEN_FORMULA_POINTS,
  EMPLOYER_MAINTIEN_ROUNDING_NOTE,
  EMPLOYER_MAINTIEN_VARIABLE_PAY_NOTE,
  EMPLOYER_MAINTIEN_VERIFY_NOTE,
  EMPLOYER_MAINTIEN_PATH,
  EMPLOYER_MAINTIEN_PUBLISHED_AT,
  EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER,
  EMPLOYER_MAINTIEN_SEO_TITLE,
  EMPLOYER_MAINTIEN_SLUG,
  EMPLOYER_MAINTIEN_SOURCES,
  EMPLOYER_MAINTIEN_SUBTITLE,
  EMPLOYER_MAINTIEN_TOOL_NAV_TITLE,
  EMPLOYER_MAINTIEN_TOOL_TEASER,
  EMPLOYER_MAINTIEN_UPDATED_AT,
  formatEuro,
  formatEuroPrecise,
  IJSS_CALCULATOR_PATH,
  SALARY_DURING_SICK_LEAVE_PATH,
} from "@/site/employer-maintien/data";
import {
  ex7j,
  ex14j,
  ex45j,
  exDroitsPartiels,
  exSansAnciennete,
  exDroitsEpuises,
  exLongStop,
} from "@/site/employer-maintien/examples";
import { formatLongDateFr } from "@/site/dates";

const BRUT_VERS_NET = "/";
const LIRE_FICHE = "/guides/comment-lire-une-fiche-de-paie";
const GUIDES_HUB = "/guides";
const SIMULATOR_ANCHOR = `${EMPLOYER_MAINTIEN_PATH}#${EMPLOYER_MAINTIEN_CALCULATOR_ID}`;

export const maintienSalaireArretMaladieGuide: Guide = {
  slug: EMPLOYER_MAINTIEN_SLUG,
  publicPath: EMPLOYER_MAINTIEN_PATH,
  breadcrumbLabel: EMPLOYER_MAINTIEN_BREADCRUMB,
  title: EMPLOYER_MAINTIEN_H1,
  seoTitle: EMPLOYER_MAINTIEN_SEO_TITLE,
  description: EMPLOYER_MAINTIEN_META_DESCRIPTION,
  subtitle: EMPLOYER_MAINTIEN_SUBTITLE,
  publishedAt: EMPLOYER_MAINTIEN_PUBLISHED_AT,
  updatedAt: EMPLOYER_MAINTIEN_UPDATED_AT,
  includeFaqSchema: true,
  includeWebApplicationSchema: true,
  webApplication: {
    name: EMPLOYER_MAINTIEN_TOOL_NAV_TITLE,
    description: EMPLOYER_MAINTIEN_TOOL_TEASER,
  },
  faqSectionId: "questions-frequentes",
  introduction: [
    "Dans le secteur privé, le maintien de salaire n'est pas le versement des IJSS par la CPAM. C'est le complément que l'employeur peut devoir ajouter, sous conditions, pour porter le revenu au minimum légal : 90 % de la rémunération brute de référence, puis les deux tiers.",
    "Ce minimum suppose notamment un an d'ancienneté au premier jour d'absence et commence, en maladie non professionnelle, au-delà de sept jours. Une convention collective peut être plus favorable. Le calculateur estime uniquement ce plancher légal, pas le revenu total de l'arrêt.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Le complément employeur complète les IJSS pour atteindre 90 %, puis les deux tiers du brut de référence. Il ne s'ajoute pas à 90 % du salaire.",
      "Le délai légal de sept jours du complément employeur, en maladie non professionnelle, ne se confond pas avec le délai de carence de trois jours des IJSS.",
      "Il faut au moins un an d'ancienneté au premier jour d'absence, plus les autres conditions de l'article L1226-1.",
      "Les durées (30 + 30 jours à partir d'un an, jusqu'à 90 + 90 jours) se réduisent des jours déjà indemnisés sur 12 mois.",
      "Le Code du travail fixe un minimum. La convention, l'accord d'entreprise ou la prévoyance peut aller au-delà.",
    ],
  },
  sections: [
    {
      id: EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID,
      title: "Comment utiliser le calculateur ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le simulateur estime le minimum légal du complément employeur, pas le total IJSS plus maintien. Huit étapes suffisent.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Le simulateur part automatiquement du cas général : salarié mensualisé du privé, maladie ou accident non professionnel.",
              description: "",
            },
            {
              title: "Saisissez votre salaire brut mensuel habituel.",
              description: "",
            },
            {
              title: "Indiquez les dates de début et de fin de l'arrêt (la fin est incluse).",
              description: "",
            },
            {
              title: "Renseignez votre date d'entrée dans l'entreprise : l'ancienneté est calculée au premier jour d'absence.",
              description: "",
            },
            {
              title: "Saisissez l'IJSS journalière brute, ou",
              description: "",
              href: IJSS_CALCULATOR_PATH,
              label: "calculer le montant de vos IJSS",
            },
            {
              title: "Indiquez si un complément a déjà été versé au cours des douze mois précédents, puis les jours utilisés à 90 % et aux deux tiers si vous les connaissez.",
              description: "",
            },
            {
              title: "Cochez la case seulement après avoir lu les conditions principales : cela ne certifie pas l'ouverture des droits.",
              description: "",
            },
            {
              title: "Lisez le complément brut estimé, les jours couverts, le délai employeur et les jours sans minimum légal.",
              description: "",
            },
          ],
        },
      ],
    },
    {
      id: EMPLOYER_MAINTIEN_LIMITS_SECTION_ID,
      title: "Quelles sont les limites du calculateur ?",
      blocks: [
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER,
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_EXCLUSION_NOTE,
        },
        {
          type: "paragraph",
          text: "Le résultat est une estimation. Il ne certifie pas l'ouverture des droits et ne remplace ni le bulletin, ni la convention collective, ni le calcul de paie de l'employeur.",
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_METHOD_NOTE,
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_VARIABLE_PAY_NOTE,
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_ROUNDING_NOTE,
        },
      ],
    },
    {
      id: "quest-ce-que-le-maintien-de-salaire",
      title: "Qu'est-ce que le maintien de salaire en arrêt maladie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le maintien de salaire désigne, dans le langage courant, le complément légal de l'employeur : l'indemnité ajoutée, sous conditions, aux IJSS pour atteindre le minimum prévu par le Code du travail. Dans le privé, ce minimum vise 90 % de la rémunération brute de référence, puis les deux tiers.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À retenir : les IJSS ne sont pas le maintien de salaire. Le complément employeur correspond à la somme ajoutée, sous conditions, pour atteindre le niveau légal ou conventionnel applicable.",
          ],
        },
        {
          type: "paragraph",
          text: "Sans ce complément, le salarié perçoit surtout les IJSS de la CPAM, après le délai de carence de trois jours des IJSS dans le cas général. Le maintien légal n'est dû que si les conditions de l'article L1226-1 sont remplies.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte officiel :",
          label: EMPLOYER_MAINTIEN_SOURCES.l1226.label,
          href: EMPLOYER_MAINTIEN_SOURCES.l1226.href,
        },
      ],
    },
    {
      id: "ijss-complement-convention-prevoyance",
      title: "IJSS, complément employeur, convention collective et prévoyance : quelles différences ?",
      blocks: [
        {
          type: "paragraph",
          text: "Quatre sources peuvent intervenir. Elles ne se confondent pas et ne s'additionnent pas mécaniquement à 90 % du salaire.",
        },
        {
          type: "table",
          stackOnMobile: true,
          caption: "Qui verse quoi pendant un arrêt maladie dans le privé",
          headers: ["Source", "Qui verse", "Rôle"],
          rows: [
            [
              "IJSS",
              "CPAM, ou l'employeur en cas de subrogation",
              "Indemnité de Sécurité sociale, après le délai de carence de trois jours des IJSS dans le cas général",
            ],
            [
              "Complément légal employeur",
              "Employeur",
              "Différence pour atteindre 90 %, puis les deux tiers du brut de référence",
            ],
            [
              "Convention ou accord",
              "Employeur",
              "Peut améliorer le délai, le taux, la durée ou l'ancienneté requise",
            ],
            [
              "Prévoyance",
              "Organisme de prévoyance",
              "Prestation éventuelle ; la part financée par l'employeur est déduite du minimum légal",
            ],
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour la formule, le plafond et les jours indemnisés par la CPAM,",
          label: "calculer le montant de vos IJSS",
          href: IJSS_CALCULATOR_PATH,
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour voir IJSS et complément ensemble,",
          label: "estimer votre revenu total pendant l'arrêt maladie",
          href: SALARY_DURING_SICK_LEAVE_PATH,
        },
      ],
    },
    {
      id: "quelles-conditions",
      title: "Quelles conditions faut-il remplir ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le minimum légal n'est pas automatique. L'article L1226-1 pose des conditions cumulatives. L'ancienneté s'apprécie au premier jour de l'absence.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Au moins un an d'ancienneté dans l'entreprise au premier jour d'absence",
            "Incapacité de travail constatée par certificat médical",
            "Justification de l'arrêt dans les 48 heures, sous réserve des exceptions légales",
            "Prise en charge par la Sécurité sociale",
            "Soins en France, dans l'Union européenne ou dans l'Espace économique européen",
          ],
        },
        {
          type: "paragraph",
          text: "Sont exclus du minimum légal les travailleurs à domicile, les salariés saisonniers, les salariés intermittents et les salariés temporaires. Le texte en vigueur exclut aussi le salarié lorsque l'employeur a été informé d'une fraude avérée visant l'obtention des indemnités journalières.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Le calculateur fournit une estimation. Cocher les conditions ne certifie pas l'ouverture des droits.",
            EMPLOYER_MAINTIEN_VERIFY_NOTE,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Source :",
          label: EMPLOYER_MAINTIEN_SOURCES.l1226.label,
          href: EMPLOYER_MAINTIEN_SOURCES.l1226.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Ancienneté au premier jour d'absence :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_8.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_8.href,
        },
      ],
    },
    {
      id: "quand-commence-le-complement",
      title: "Quand le complément employeur commence-t-il ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le cas général d'une maladie ou d'un accident non professionnel, le complément légal de l'employeur commence au huitième jour d'absence. Ce délai légal de sept jours du complément employeur n'est pas le délai de carence de trois jours des IJSS.",
        },
        {
          type: "table",
          stackOnMobile: true,
          caption: "Deux délais distincts à ne pas confondre",
          headers: ["Délai", "Qui concerne", "Cas général"],
          rows: [
            [
              "3 jours",
              "IJSS versées par la CPAM",
              "Pas d'IJSS les trois premiers jours, sauf exception",
            ],
            [
              "7 jours",
              "Complément légal de l'employeur",
              "Pas de minimum légal avant le huitième jour",
            ],
          ],
        },
        {
          type: "paragraph",
          text: `Sur l'exemple d'un arrêt du 7 au 13 septembre 2026 (${ex7j.totalCalendarDays} jours), le complément légal est de ${formatEuro(ex7j.employerComplementGrossTotal)}. Sur l'arrêt du 7 au 20 septembre (${ex14j.totalCalendarDays} jours), il commence le ${ex14j.firstComplementDateIso ? formatLongDateFr(ex14j.firstComplementDateIso) : "aucun jour"} et couvre ${ex14j.employerComplementDays} jours.`,
        },
        {
          type: "paragraph",
          text: "Pour un accident du travail ou une maladie professionnelle, le délai légal de sept jours ne s'applique pas : le complément peut commencer dès le premier jour d'absence. Cette exception ne s'applique pas à l'accident de trajet. Le simulateur ne traite toutefois aucun de ces trois cas.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Une convention collective ou un accord peut prévoir un maintien dès le premier jour, plus favorable que le délai légal de sept jours du complément employeur.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Point de départ du délai :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_3.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_3.href,
        },
      ],
    },
    {
      id: "comment-calculer-le-maintien-legal",
      title: "Comment calculer le maintien légal ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le minimum légal vise 90 % de la rémunération brute de référence pendant une première période, puis les deux tiers pendant une seconde période, après prise en compte des IJSS et des prestations déductibles. L'employeur ne verse que le solde, jamais un montant négatif.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Estimer une rémunération journalière moyenne. Le simulateur utilise, à titre de convention, le salaire brut mensuel habituel × 12 ÷ 365. Ce n'est pas une méthode légale obligatoire.",
            "Appliquer 90 % pendant la première tranche indemnisable, puis deux tiers pendant la seconde.",
            "Retrancher l'IJSS journalière brute.",
            "Retrancher la seule part de prévoyance financée par l'employeur, s'il y en a une.",
            "Retenir zéro si le résultat est négatif.",
            "Ne compter les jours qu'après le délai de sept jours, dans la limite des droits restants.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Avec ${formatEuro(2000)} brut par mois, la rémunération journalière de référence conservée par le moteur est ${formatEuroPrecise(ex14j.theoreticalDailyGrossExact)}.`,
            `Objectif à 90 % : ${formatEuroPrecise(ex14j.firstPeriodTargetDailyExact)} brut par jour. IJSS retenue : ${formatEuro(ex14j.dailyIjssGross)} brut par jour. Complément journalier : ${formatEuroPrecise(ex14j.firstPeriodDailyComplementExact)}.`,
            `Sur ${ex14j.employerComplementDays} jours couverts : ${formatEuroPrecise(ex14j.firstPeriodDailyComplementExact * ex14j.employerComplementDays)} avant arrondi, soit ${formatEuro(ex14j.employerComplementGrossTotal)} brut estimé.`,
            EMPLOYER_MAINTIEN_ROUNDING_NOTE,
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [EMPLOYER_MAINTIEN_FORMULA, ...EMPLOYER_MAINTIEN_FORMULA_POINTS],
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_METHOD_NOTE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Déductions des IJSS et de la prévoyance :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_5.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_5.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "IJSS réduites ou suspendues :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_6.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_6.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Rémunération de référence :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_7.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_7.href,
        },
      ],
    },
    {
      id: "duree-selon-anciennete",
      title: "Combien de temps dure le maintien selon l'ancienneté ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dès un an d'ancienneté révolue au premier jour d'absence, le barème légal ouvre 30 jours à 90 %, puis 30 jours aux deux tiers. Chaque période entière de cinq ans au-delà de cette année ajoute 10 jours à chaque tranche, sans dépasser 90 jours par tranche.",
        },
        {
          type: "table",
          stackOnMobile: true,
          caption: "Durées du maintien légal selon l'ancienneté au premier jour d'absence",
          headers: [
            "Ancienneté",
            "Période à 90 %",
            "Période aux deux tiers",
            "Durée totale indemnisable",
          ],
          rows: EMPLOYER_MAINTIEN_DURATION_ROWS,
        },
        {
          type: "paragraph",
          text: "Les bornes s'entendent en années révolues : 5 ans et 11 mois restent dans la tranche 1 à 5 ans (30 + 30). Le passage à 6 ans ouvre 40 + 40 jours, 11 ans ouvre 50 + 50, et ainsi de suite jusqu'au plafond de 90 + 90 jours à partir de 31 ans. L'ancienneté se lit au premier jour de l'absence.",
        },
      ],
    },
    {
      id: "plusieurs-arrets-douze-mois",
      title: "Que se passe-t-il en cas de plusieurs arrêts en douze mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Plusieurs arrêts au cours des douze mois précédents n'ouvrent pas automatiquement un droit complet. Les indemnités complémentaires déjà reçues pendant ces douze mois réduisent les durées encore disponibles. Les droits ne sont pas remis à zéro le 1er janvier.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Un salarié à 3 ans d'ancienneté a déjà utilisé 30 jours à 90 %. Sur l'arrêt de référence de ${exDroitsPartiels.totalCalendarDays} jours, plus aucun jour n'est disponible à 90 %. ${exDroitsPartiels.secondDaysCovered} jours passent aux deux tiers, pour un complément brut estimé de ${formatEuro(exDroitsPartiels.employerComplementGrossTotal)}.`,
          ],
        },
        {
          type: "paragraph",
          text: "Saisissez ces jours dans le calculateur. Sans cette information, l'estimation peut surestimer le minimum encore dû. Si les jours déjà utilisés datent de plus de douze mois, ils ne sont plus déduits : le calcul redevient celui d'un arrêt sans droits antérieurs.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Décompte sur douze mois :",
          label: EMPLOYER_MAINTIEN_SOURCES.d1226_4.label,
          href: EMPLOYER_MAINTIEN_SOURCES.d1226_4.href,
        },
      ],
    },
    {
      id: "convention-collective-plus-favorable",
      title: "Convention collective ou accord d'entreprise : pourquoi le résultat réel peut-il être meilleur ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une convention collective peut prévoir un maintien plus favorable que le minimum légal, notamment sur l'ancienneté, le délai, le taux ou la durée. De nombreux salariés du privé relèvent d'une convention collective susceptible de prévoir des garanties plus favorables. Ce simulateur calcule uniquement le minimum légal.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Une ancienneté plus courte, voire aucune condition d'ancienneté",
            "Un délai employeur plus court, voire un maintien dès le premier jour",
            "Un maintien à 100 % du brut, ou parfois du net",
            "Une durée plus longue que le barème D1226-2",
            "Des règles particulières de prévoyance",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Sur l'arrêt de ${ex14j.totalCalendarDays} jours à ${formatEuro(2000)} brut, le minimum légal laisse ${ex14j.uncoveredCarenceDays} jours sans complément et verse ${formatEuro(ex14j.employerComplementGrossTotal)} brut estimé. Une convention qui maintiendrait le salaire dès le premier jour, ou à 100 %, serait plus favorable. Aucune convention précise n'est simulée ici.`,
          ],
        },
        {
          type: "paragraph",
          text: "Vérifiez l'intitulé et l'IDCC sur le bulletin, la convention collective, l'accord d'entreprise, les garanties de prévoyance, puis les lignes de maintien et d'IJSS du bulletin.",
        },
      ],
    },
    {
      id: "subrogation",
      title: "Subrogation : qui verse quoi ?",
      blocks: [
        {
          type: "paragraph",
          text: "La subrogation change le circuit de versement, pas le montant des droits. Avec subrogation, la CPAM verse les IJSS à l'employeur, qui vous paie l'ensemble sur le bulletin. Sans subrogation, la CPAM vous verse les IJSS et l'employeur ne paie que son complément.",
        },
        {
          type: "paragraph",
          text: "Si les IJSS arrivent directement sur votre compte, l'employeur n'a pas à les verser une seconde fois. Le complément légal reste la différence pour atteindre 90 % ou les deux tiers. La présence d'IJSS subrogées sur le bulletin ne signifie pas que l'employeur les finance : il les reçoit de la caisse avant de les reverser avec la paie.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le circuit IJSS :",
          label: EMPLOYER_MAINTIEN_SOURCES.ameli.label,
          href: EMPLOYER_MAINTIEN_SOURCES.ameli.href,
        },
      ],
    },
    {
      id: "exemples-de-calcul",
      title: "Exemples de calcul",
      blocks: [
        {
          type: "paragraph",
          text: `Tous les exemples ci-dessous utilisent le même moteur que le calculateur, pour un salarié mensualisé du privé en maladie ou accident non professionnel, avec ${formatEuro(2000)} brut mensuel et une IJSS journalière brute de ${formatEuro(ex14j.dailyIjssGross)}. Les dates de fin sont incluses.`,
        },
        {
          type: "table",
          stackOnMobile: true,
          caption: "Exemples produits par le moteur de maintien légal",
          headers: [
            "Situation",
            "Durée",
            "Jours à 90 %",
            "Jours aux 2/3",
            "Complément brut estimé",
            "Jours sans complément légal",
          ],
          rows: [
            [
              "Arrêt de 7 jours, 3 ans d'ancienneté",
              `${ex7j.totalCalendarDays} j`,
              `${ex7j.firstDaysCovered}`,
              `${ex7j.secondDaysCovered}`,
              formatEuro(ex7j.employerComplementGrossTotal),
              `${ex7j.uncoveredDays}`,
            ],
            [
              "Arrêt de 14 jours, 1 à 5 ans d'ancienneté",
              `${ex14j.totalCalendarDays} j`,
              `${ex14j.firstDaysCovered}`,
              `${ex14j.secondDaysCovered}`,
              formatEuro(ex14j.employerComplementGrossTotal),
              `${ex14j.uncoveredDays}`,
            ],
            [
              "Arrêt de 45 jours, passage 90 % puis deux tiers",
              `${ex45j.totalCalendarDays} j`,
              `${ex45j.firstDaysCovered}`,
              `${ex45j.secondDaysCovered}`,
              formatEuro(ex45j.employerComplementGrossTotal),
              `${ex45j.uncoveredDays}`,
            ],
            [
              "14 jours après 30 jours déjà utilisés à 90 %",
              `${exDroitsPartiels.totalCalendarDays} j`,
              `${exDroitsPartiels.firstDaysCovered}`,
              `${exDroitsPartiels.secondDaysCovered}`,
              formatEuro(exDroitsPartiels.employerComplementGrossTotal),
              `${exDroitsPartiels.uncoveredDays}`,
            ],
            [
              "Moins d'un an d'ancienneté",
              `${exSansAnciennete.totalCalendarDays} j`,
              `${exSansAnciennete.firstDaysCovered}`,
              `${exSansAnciennete.secondDaysCovered}`,
              formatEuro(exSansAnciennete.employerComplementGrossTotal),
              `${exSansAnciennete.uncoveredDays}`,
            ],
            [
              "14 jours après épuisement des deux tranches",
              `${exDroitsEpuises.totalCalendarDays} j`,
              `${exDroitsEpuises.firstDaysCovered}`,
              `${exDroitsEpuises.secondDaysCovered}`,
              formatEuro(exDroitsEpuises.employerComplementGrossTotal),
              `${exDroitsEpuises.uncoveredDays}`,
            ],
            [
              "Arrêt plus long que les droits restants (1 an d'ancienneté)",
              `${exLongStop.totalCalendarDays} j`,
              `${exLongStop.firstDaysCovered}`,
              `${exLongStop.secondDaysCovered}`,
              formatEuro(exLongStop.employerComplementGrossTotal),
              `${exLongStop.uncoveredDays}`,
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Rémunération brute de référence conservée : ${formatEuroPrecise(ex14j.theoreticalDailyGrossExact)} par jour.`,
            `Objectif à 90 % : ${formatEuroPrecise(ex14j.firstPeriodTargetDailyExact)} par jour. IJSS : ${formatEuro(ex14j.dailyIjssGross)} par jour. Complément journalier : ${formatEuroPrecise(ex14j.firstPeriodDailyComplementExact)}.`,
            `Sur 14 jours : ${ex14j.employerComplementDays} jours couverts, ${formatEuro(ex14j.employerComplementGrossTotal)} brut estimé après arrondi au centime.`,
            `Si les 30 jours déjà utilisés à 90 % datent de plus de douze mois, ils ne sont plus déduits : le résultat redevient celui de l'arrêt de 14 jours (${formatEuro(ex14j.employerComplementGrossTotal)}).`,
          ],
        },
      ],
    },
    {
      id: "verifier-bulletin-de-paie",
      title: "Comment vérifier son bulletin de paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Comparez le simulateur au bulletin ligne par ligne, en restant en brut. Un écart ne signifie pas forcément une erreur : la méthode de retenue d'absence, l'horaire, le mois et la convention peuvent modifier le résultat. Ne comparez pas uniquement le net à payer : la retenue pour absence et le maintien peuvent être calculés selon une méthode de paie différente de la convention simplifiée du simulateur.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "La retenue pour absence",
            "Les IJSS subrogées ou versées directement",
            "Le complément employeur ou maintien conventionnel",
            "Une éventuelle ligne de prévoyance",
            "L'intitulé et l'IDCC de la convention collective",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer ces lignes :",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE,
        },
      ],
    },
    {
      id: "prive-et-public",
      title: "Maintien de salaire dans le privé et dans le public : quelles différences ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les indications ci-dessous constituent uniquement un repère général. Les règles diffèrent selon le statut de l'agent et la fonction publique concernée. Aucun montant pour le secteur public n'est calculé sur cette page.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Un fonctionnaire en congé de maladie perçoit actuellement 90 % de son traitement indiciaire brut pendant trois mois, puis 50 % pendant neuf mois, sous réserve des règles applicables et d'un jour de carence.",
            "Les agents contractuels publics suivent encore d'autres durées selon leur ancienneté et leur fonction publique d'appartenance.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fonctionnaire :",
          label: EMPLOYER_MAINTIEN_SOURCES.f490.label,
          href: EMPLOYER_MAINTIEN_SOURCES.f490.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Contractuel public :",
          label: EMPLOYER_MAINTIEN_SOURCES.f491.label,
          href: EMPLOYER_MAINTIEN_SOURCES.f491.href,
        },
      ],
    },
    {
      id: "situations-non-couvertes",
      title: "Situations non couvertes par le calcul standard",
      blocks: [
        {
          type: "paragraph",
          text: "Ces situations restent hors du calcul standard. Elles ne sont pas proposées comme options du simulateur. N'utilisez pas cet outil pour obtenir un montant dans ces cas.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Fonction publique",
            "Accidents du travail, maladies professionnelles et accidents de trajet",
            "Salariés saisonniers, temporaires, intermittents et travailleurs à domicile, exclus du minimum légal de l'article L1226-1",
            "Règles plus favorables d'une convention collective ou d'un accord d'entreprise, non appliquées automatiquement",
            "Régimes locaux",
            "Maintiens conventionnels calculés sur le net",
            "Prévoyance complexe au-delà d'une prestation journalière employeur",
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
          text: EMPLOYER_MAINTIEN_FRESHNESS_LINE,
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_METHODOLOGY_NOTE,
        },
        {
          type: "paragraph",
          text: EMPLOYER_MAINTIEN_METHOD_NOTE,
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.l1226.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.l1226.href,
              label: EMPLOYER_MAINTIEN_SOURCES.l1226.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_3.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_3.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_3.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_4.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_4.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_4.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_5.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_5.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_5.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_6.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_6.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_6.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_7.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_7.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_7.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.d1226_8.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.d1226_8.href,
              label: EMPLOYER_MAINTIEN_SOURCES.d1226_8.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.f3053.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.f3053.href,
              label: EMPLOYER_MAINTIEN_SOURCES.f3053.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.ameli.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.ameli.href,
              label: EMPLOYER_MAINTIEN_SOURCES.ameli.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.f490.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.f490.href,
              label: EMPLOYER_MAINTIEN_SOURCES.f490.label,
            },
            {
              text: `${EMPLOYER_MAINTIEN_SOURCES.f491.org} : `,
              href: EMPLOYER_MAINTIEN_SOURCES.f491.href,
              label: EMPLOYER_MAINTIEN_SOURCES.f491.label,
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le maintien de salaire",
  faqIntro:
    "Réponses courtes sur le complément employeur légal dans le privé. Une convention collective peut améliorer le résultat.",
  faq: [
    {
      question: "L'employeur doit-il toujours maintenir le salaire pendant un arrêt maladie ?",
      answer:
        "Non. Le minimum légal n'est dû que si les conditions de l'article L1226-1 sont remplies, notamment un an d'ancienneté. Une convention peut toutefois prévoir un maintien plus large.",
    },
    {
      question: "Faut-il un an d'ancienneté pour être indemnisé par l'employeur ?",
      answer:
        "Oui pour le minimum légal, apprécié au premier jour d'absence. En dessous d'un an, seules les IJSS sont dues, sauf convention, accord ou usage plus favorable.",
    },
    {
      question: "Le maintien commence-t-il après trois ou sept jours ?",
      answer:
        "Trois jours concernent les IJSS de la CPAM. Sept jours concernent le complément légal employeur en maladie non professionnelle, qui commence donc au huitième jour.",
    },
    {
      question: "L'employeur verse-t-il réellement 90 % du salaire ?",
      answer:
        "Non. Les 90 % correspondent au niveau total visé après prise en compte des IJSS et, le cas échéant, des prestations de prévoyance déductibles. L'employeur ne verse que le solde, jamais un montant négatif.",
    },
    {
      question: "Le complément employeur brut correspond-il au montant net versé ?",
      answer:
        "Non. Le complément calculé est un montant brut. Le montant net figurant sur le bulletin est inférieur après application des cotisations et prélèvements concernés.",
    },
    {
      question: "Le maintien de salaire est-il calculé sur le brut ou sur le net ?",
      answer:
        "Le minimum légal porte sur la rémunération brute que le salarié aurait perçue en travaillant. Certaines conventions prévoient un maintien du net, plus favorable, que ce calculateur ne simule pas.",
    },
    {
      question: "Combien de temps l'employeur doit-il compléter les IJSS ?",
      answer:
        "De 30 + 30 jours entre 1 et 5 ans d'ancienneté jusqu'à 90 + 90 jours à partir de 31 ans, après le délai de sept jours, et sous déduction des jours déjà utilisés sur douze mois.",
    },
    {
      question: "Plusieurs arrêts au cours de douze mois ouvrent-ils de nouveaux droits ?",
      answer:
        "Non automatiquement. Les indemnités complémentaires déjà reçues pendant les douze mois précédents réduisent les durées encore disponibles. Les droits ne sont pas remis à zéro le 1er janvier.",
    },
    {
      question: "Une convention collective peut-elle supprimer le délai de sept jours du complément employeur ?",
      answer:
        "Oui. Une convention, un accord, le contrat ou un usage peut prévoir un maintien dès le premier jour, plus favorable que le délai légal de sept jours du complément employeur. Vous pouvez tout de même utiliser ce simulateur comme point de comparaison du minimum légal : il n'applique pas automatiquement votre convention.",
    },
    {
      question: "Quelle est la différence entre maintien de salaire et subrogation ?",
      answer:
        "Le maintien est le complément versé par l'employeur. La subrogation est seulement le circuit : la CPAM paie les IJSS à l'employeur, qui vous reverse l'ensemble. Les droits totaux restent les mêmes.",
    },
    {
      question: "Que se passe-t-il si les IJSS sont versées directement au salarié ?",
      answer:
        "L'employeur n'a pas à les verser une seconde fois. Il ne doit, sous conditions, que le complément pour atteindre le niveau légal ou conventionnel applicable.",
    },
    {
      question: "Le calcul est-il le même dans la fonction publique ?",
      answer:
        "Non. Ce moteur est réservé au privé et ne calcule aucun montant pour la fonction publique. Un fonctionnaire perçoit actuellement 90 % de son traitement indiciaire brut pendant trois mois, puis 50 % pendant neuf mois, sous réserve des règles applicables et d'un jour de carence.",
    },
    {
      question: "Que faire si le montant du bulletin ne correspond pas au simulateur ?",
      answer:
        "Vérifiez l'IDCC, la convention, les jours déjà utilisés, la retenue d'absence, la subrogation et la prévoyance. Le Code du travail retient la rémunération que le salarié aurait perçue selon l'horaire pratiqué pendant l'absence (article D1226-7). Le simulateur utilise une convention d'estimation (salaire brut mensuel × 12 ÷ 365), qui peut différer de la méthode de paie.",
    },
  ],
  conclusion: {
    title: "Estimez le complément légal de votre employeur",
    keyPoints: [],
    closingText:
      "Renseignez votre salaire brut, vos dates, votre ancienneté et vos IJSS pour estimer le minimum légal du complément employeur, puis comparez le résultat à votre bulletin et à votre convention.",
    closingCta: {
      label: "Calculer mon maintien de salaire",
      href: SIMULATOR_ANCHOR,
    },
    closingSecondaryLinks: [
      {
        label: "Calculer le montant de vos IJSS",
        href: IJSS_CALCULATOR_PATH,
      },
      {
        label: "Estimer le revenu total perçu pendant l'arrêt",
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
      { title: "Calcul des IJSS", href: IJSS_CALCULATOR_PATH },
      {
        title: "Salaire en arrêt maladie (revenu total)",
        href: SALARY_DURING_SICK_LEAVE_PATH,
      },
      { title: "Lire une fiche de paie", href: LIRE_FICHE },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    relatedSimulator: {
      title: "Salaire en arrêt maladie",
      description: "Estimez le revenu total pendant l'arrêt.",
      href: SALARY_DURING_SICK_LEAVE_PATH,
    },
  },
};
