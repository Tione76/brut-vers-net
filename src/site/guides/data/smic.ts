import type { Guide } from "../types";
import {
  SMIC_AMOUNTS_BLOCK_TITLE,
  SMIC_CALENDAR_YEAR_2026,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_FRESHNESS_LINE,
  SMIC_H1,
  SMIC_LABELS,
  SMIC_META_DESCRIPTION,
  SMIC_PREVIOUS,
  SMIC_SEO_TITLE,
  SMIC_SOURCES,
  SMIC_VERIFIED_ON_LABEL,
} from "@/site/smic/data";

const BRUT_NET_EXPLIQUE_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_SALAIRE_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const AUGMENTATION_HREF = "/calculateurs/augmentation-salaire";
const BRUT_VERS_NET_HUB = "/salaire-brut-mensuel-en-net";

/**
 * Page pilier SMIC (/smic).
 * Montants et année éditoriale : source unique `@/site/smic/data`.
 * Title SEO evergreen (sans année) ; H1 et contenu portent l'année courante.
 */
export const smicGuide: Guide = {
  slug: "smic",
  publicPath: "/smic",
  breadcrumbLabel: "SMIC",
  title: SMIC_H1,
  seoTitle: SMIC_SEO_TITLE,
  description: SMIC_META_DESCRIPTION,
  subtitle:
    "Montants actuellement applicables, estimation nette et règles de revalorisation, à partir des sources officielles.",
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-07",
  introduction: [
    "Le SMIC est le salaire minimum légal en France : un employeur ne peut pas rémunérer un salarié majeur en dessous de son montant horaire brut. Le brut est la référence réglementaire ; le net n'est qu'une estimation, car il dépend des cotisations et de la situation de paie.",
    `Cette page présente les montants du SMIC actuellement applicables en ${SMIC_EDITORIAL_YEAR} et est mise à jour à chaque revalorisation.`,
  ],
  quickSummary: {
    title: SMIC_AMOUNTS_BLOCK_TITLE,
    items: [
      { rate: SMIC_LABELS.hourlyGross, description: "SMIC horaire brut" },
      { rate: `≈ ${SMIC_LABELS.hourlyNet}`, description: "SMIC horaire net estimé" },
      { rate: SMIC_LABELS.monthlyGross, description: "SMIC mensuel brut (35 h)" },
      { rate: `≈ ${SMIC_LABELS.monthlyNet}`, description: "SMIC mensuel net estimé (35 h)" },
    ],
    synthesis: [
      SMIC_FRESHNESS_LINE,
      "Le SMIC net est une estimation (Service-Public) : contrairement au SMIC brut, ce n'est pas un montant légal unique.",
    ],
  },
  introSummary: {
    title: "L'essentiel",
    items: [
      `Brut légal actuel : ${SMIC_LABELS.hourlyGross} / h, soit ${SMIC_LABELS.monthlyGross} / mois à 35 h.`,
      "Le net publié par Service-Public est indicatif et peut différer de votre bulletin.",
      `Dernière revalorisation : ${SMIC_EFFECTIVE_FROM_LABEL} (+ ${SMIC_LABELS.increasePercent}).`,
      "Une nouvelle hausse en cours d'année n'est possible que si les conditions légales d'inflation sont réunies.",
    ],
  },
  sections: [
    {
      id: "montant-smic-2026",
      title: `Quel est le montant du SMIC en ${SMIC_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: `En ${SMIC_EDITORIAL_YEAR}, le SMIC actuellement applicable est celui entré en vigueur le ${SMIC_EFFECTIVE_FROM_LABEL}. Le tableau ci-dessous synthétise brut légal et net indicatif.`,
        },
        {
          type: "table",
          caption: `Synthèse SMIC ${SMIC_EDITORIAL_YEAR} (cas général, métropole)`,
          headers: [`SMIC ${SMIC_EDITORIAL_YEAR}`, "Brut", "Net estimé"],
          rows: [
            ["Horaire", SMIC_LABELS.hourlyGross, `≈ ${SMIC_LABELS.hourlyNet}`],
            ["Mensuel (35 h)", SMIC_LABELS.monthlyGross, `≈ ${SMIC_LABELS.monthlyNet}`],
            [
              "Annuel (12 mois au taux actuel)",
              SMIC_LABELS.annualGross,
              `≈ ${SMIC_LABELS.annualNet}`,
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Si une revalorisation intervient plus tard, les montants de cette page seront mis à jour.",
          ],
        },
      ],
    },
    {
      id: "smic-horaire-brut-net",
      title: `Quel est le SMIC horaire brut et net en ${SMIC_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC horaire brut est le plancher légal : c'est la référence pour vérifier qu'un salaire horaire n'est pas inférieur au minimum.",
        },
        {
          type: "paragraph",
          text: "Le SMIC horaire net publié par Service-Public est indicatif. L'écart avec le brut correspond surtout aux cotisations salariales ; ce net n'est pas figé dans la loi comme le brut.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre pourquoi le brut et le net diffèrent,",
          label: "voir le guide sur la différence entre salaire brut et salaire net",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
      ],
    },
    {
      id: "smic-mensuel-brut-net",
      title: `Quel est le SMIC mensuel brut et net en ${SMIC_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: `À temps plein sur 35 heures, le mensuel brut officiel découle du SMIC horaire. La base usuelle est d'environ ${SMIC_LABELS.monthlyHours} heures par mois (35 × 52 / 12). Conservez toujours le montant publié, qui peut intégrer un arrondi réglementaire.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Lecture : ${SMIC_LABELS.hourlyGross} × ${SMIC_LABELS.monthlyHours} h ≈ ${SMIC_LABELS.monthlyGross} brut mensuel (référence officielle pour 35 h).`,
          ],
        },
      ],
    },
    {
      id: "smic-annuel",
      title: "Combien représente le SMIC sur une année ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le montant annuel du tableau (${SMIC_LABELS.annualGross} brut, net indicatif ≈ ${SMIC_LABELS.annualNet}) correspond à 12 mois au taux actuellement en vigueur, sans 13e mois, primes ni heures supplémentaires.`,
        },
        {
          type: "paragraph",
          text: `Pour un salarié rémunéré au SMIC toute l'année civile ${SMIC_EDITORIAL_YEAR}, le cumul brut théorique est de ${SMIC_LABELS.calendarYearGrossCumulative}, compte tenu des ${SMIC_CALENDAR_YEAR_2026.monthsAtPreviousRate} premiers mois à l'ancien taux (${SMIC_LABELS.previousMonthlyGross}) et des ${SMIC_CALENDAR_YEAR_2026.monthsAtCurrentRate} mois au nouveau taux (${SMIC_LABELS.monthlyGross}), hors primes, absences et autres éléments de rémunération.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ce cumul n'est pas un montant officiel unique : c'est un exemple théorique pour un temps plein au SMIC sur toute l'année, sans variation de situation.",
          ],
        },
      ],
    },
    {
      id: "brut-vers-net",
      title: "Comment passer du SMIC brut au SMIC net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC brut est la base légale. Pour aboutir au montant crédité, plusieurs étapes se succèdent sur la fiche de paie.",
        },
        {
          type: "steps",
          items: [
            {
              title: "SMIC / salaire brut",
              description: "Rémunération avant cotisations salariales.",
            },
            {
              title: "Cotisations salariales",
              description: "Retenues sociales prélevées sur le brut.",
            },
            {
              title: "Net avant impôt",
              description: "Montant après cotisations, avant prélèvement à la source.",
            },
            {
              title: "Prélèvement à la source (si applicable)",
              description: "Impôt retenu selon votre taux personnel.",
            },
            {
              title: "Montant versé",
              description: "Somme effectivement créditée sur votre compte.",
            },
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Ne confondez pas net avant impôt, net imposable, montant net social et montant versé : ce sont des lignes différentes du bulletin.",
            "Le montant net social est notamment utilisé pour déterminer les droits à certaines prestations, comme la prime d'activité et le RSA. Il ne doit pas être confondu avec le net à payer.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour détailler les cotisations,",
          label: "lire le guide sur les cotisations salariales",
          href: COTISATIONS_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le calcul pas à pas,",
          label: "voir comment calculer son salaire net",
          href: CALCULER_SALAIRE_NET_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour l'impôt retenu sur le bulletin,",
          label: "comprendre le prélèvement à la source",
          href: PAS_HREF,
        },
        {
          type: "contextual-cta",
          text: "Vous connaissez un salaire brut et voulez estimer le net avant impôt ?",
          label: "Calculer mon salaire brut en net",
          href: "/",
        },
      ],
    },
    {
      id: "pourquoi-net-varie",
      title: "Pourquoi le SMIC net peut-il varier légèrement ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC brut légal est unique (hors cas particuliers). Le net de votre bulletin peut différer de l'estimation publiée selon les cotisations, une mutuelle, le prélèvement à la source ou des variables de paie.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Pour comparer un salaire au minimum légal, partez du brut (et des éléments pris en compte), pas du seul virement reçu.",
          ],
        },
      ],
    },
    {
      id: "calcul-revalorisation",
      title: "Comment le SMIC est-il calculé et revalorisé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC est revalorisé chaque année au 1er janvier. Service-Public rappelle qu'il est indexé sur l'inflation mesurée pour les 20 % des ménages aux revenus les plus faibles, et qu'il prend aussi en compte la moitié du gain de pouvoir d'achat du salaire horaire moyen des ouvriers et employés.",
        },
        {
          type: "paragraph",
          text: "En cours d'année, si l'indice des prix à la consommation augmente d'au moins 2 % par rapport à l'indice constaté lors de la dernière fixation du SMIC, une hausse automatique intervient dans les mêmes proportions. Un « coup de pouce » gouvernemental reste possible, mais n'est pas automatique.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Principes : Code du travail (L. 3231-2 et suivants). Montants en vigueur : arrêté ou décret au Journal officiel.",
          ],
        },
      ],
    },
    {
      id: "derniere-augmentation",
      title: "Quand le SMIC a-t-il été augmenté pour la dernière fois ?",
      blocks: [
        {
          type: "paragraph",
          text: `La dernière revalorisation applicable date du ${SMIC_EFFECTIVE_FROM_LABEL} (+ ${SMIC_LABELS.increasePercent}). Elle est formalisée par l'arrêté du 22 mai 2026 relatif au relèvement du salaire minimum de croissance, publié au Journal officiel du 24 mai 2026.`,
        },
        {
          type: "table",
          caption: "Évolution récente du SMIC brut (cas général)",
          headers: ["Date", "SMIC horaire brut", "SMIC mensuel brut (35 h)", "Évolution"],
          rows: [
            [
              SMIC_PREVIOUS.effectiveFromLabel,
              SMIC_LABELS.previousHourlyGross,
              SMIC_LABELS.previousMonthlyGross,
              "-",
            ],
            [
              SMIC_EFFECTIVE_FROM_LABEL,
              SMIC_LABELS.hourlyGross,
              SMIC_LABELS.monthlyGross,
              `+ ${SMIC_LABELS.increasePercent}`,
            ],
          ],
        },
      ],
    },
    {
      id: "nouvelle-hausse-2026",
      title: `Le SMIC peut-il encore augmenter en ${SMIC_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: "Oui, en théorie : le mécanisme automatique peut se déclencher à nouveau si l'inflation concernée progresse d'au moins 2 % depuis la dernière fixation. Un coup de pouce gouvernemental reste aussi possible.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Aucune date ni aucun montant futur ne doivent être anticipés comme acquis. Vérifiez toujours Service-Public ou le Journal officiel.",
          ],
        },
      ],
    },
    {
      id: "smic-pour-tous",
      title: "Le SMIC est-il le même pour tous les salariés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le montant présenté ici concerne le cas général (salarié majeur). Des règles particulières existent pour les mineurs, l'apprentissage, le contrat de professionnalisation, Mayotte ou certains VRP. Pour ces situations, reportez-vous à Service-Public.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Page officielle de référence :",
          label: SMIC_SOURCES.servicePublic.label,
          href: SMIC_SOURCES.servicePublic.href,
        },
      ],
    },
    {
      id: "minimum-conventionnel",
      title: "SMIC ou minimum conventionnel : quel salaire doit être appliqué ?",
      blocks: [
        {
          type: "list",
          items: [
            "Si le minimum conventionnel est inférieur au SMIC, l'employeur doit verser au moins le SMIC.",
            "Si le minimum conventionnel est supérieur au SMIC, c'est ce minimum plus favorable qui s'applique.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "En pratique, le salarié bénéficie du plancher le plus favorable entre SMIC et minimum conventionnel applicable.",
          ],
        },
      ],
    },
    {
      id: "verifier-salaire-smic",
      title: "Comment vérifier son salaire par rapport au SMIC ?",
      blocks: [
        {
          type: "checklist",
          title: "Contrôle rapide sur votre bulletin",
          items: [
            "Repérez le salaire horaire brut (ou le salaire de base et le nombre d'heures).",
            "Vérifiez le temps de travail du mois (temps plein, partiel, absences).",
            "Comparez le brut mensuel au SMIC proratisé si besoin.",
            "Identifiez les éléments pris en compte pour le SMIC et ceux exclus (heures supplémentaires majorées, certaines primes).",
            "Contrôlez le minimum conventionnel de votre grille.",
            "En cas d'écart, interrogez votre service paie avec le bulletin ou le contrat.",
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Service-Public précise quels éléments entrent ou non dans la comparaison au SMIC.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour lire les lignes du bulletin,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE_PAIE_HREF,
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour situer une augmentation par rapport à votre brut,",
          label: "utiliser le calculateur d'augmentation de salaire",
          href: AUGMENTATION_HREF,
        },
      ],
    },
    {
      id: "sources-officielles",
      title: "Sources officielles",
      blocks: [
        {
          type: "paragraph",
          text: `Sources officielles vérifiées le ${SMIC_VERIFIED_ON_LABEL} :`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_SOURCES.arreteMai2026.org} :`,
          label: SMIC_SOURCES.arreteMai2026.label,
          href: SMIC_SOURCES.arreteMai2026.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_SOURCES.servicePublic.org} :`,
          label: SMIC_SOURCES.servicePublic.label,
          href: SMIC_SOURCES.servicePublic.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_SOURCES.codeTravailPrincipes.org} :`,
          label: SMIC_SOURCES.codeTravailPrincipes.label,
          href: SMIC_SOURCES.codeTravailPrincipes.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_SOURCES.inseeEvolution.org} :`,
          label: SMIC_SOURCES.inseeEvolution.label,
          href: SMIC_SOURCES.inseeEvolution.href,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le SMIC",
  faqIntro: "Réponses courtes sur les montants, le net estimé et les revalorisations.",
  faq: [
    {
      question: `Quel est le montant du SMIC en ${SMIC_EDITORIAL_YEAR} ?`,
      answer: `Depuis le ${SMIC_EFFECTIVE_FROM_LABEL}, le SMIC horaire brut est de ${SMIC_LABELS.hourlyGross} et le mensuel brut à 35 h de ${SMIC_LABELS.monthlyGross}. Les nets indicatifs sont d'environ ${SMIC_LABELS.hourlyNet} / h et ${SMIC_LABELS.monthlyNet} / mois.`,
    },
    {
      question: `Quel est le SMIC horaire brut en ${SMIC_EDITORIAL_YEAR} ?`,
      answer: `Le SMIC horaire brut actuellement applicable est de ${SMIC_LABELS.hourlyGross}. C'est le montant légal de référence pour un salarié majeur dans le cas général.`,
    },
    {
      question: `Quel est le SMIC horaire net en ${SMIC_EDITORIAL_YEAR} ?`,
      answer: `Service-Public indique un SMIC horaire net indicatif d'environ ${SMIC_LABELS.hourlyNet}. Ce n'est pas un montant légal unique : votre net réel dépend des cotisations et de votre situation.`,
    },
    {
      question: `Quel est le SMIC mensuel net en ${SMIC_EDITORIAL_YEAR} ?`,
      answer: `Pour 35 heures, le net mensuel indicatif est d'environ ${SMIC_LABELS.monthlyNet}. Le montant versé peut encore varier avec le prélèvement à la source.`,
    },
    {
      question: "Combien gagne-t-on au SMIC pour 35 heures ?",
      answer: `À temps plein sur 35 heures, le brut mensuel est de ${SMIC_LABELS.monthlyGross}. Le net indicatif correspondant est d'environ ${SMIC_LABELS.monthlyNet}.`,
    },
    {
      question: "Le SMIC net est-il le même pour tout le monde ?",
      answer:
        "Non. Le SMIC brut légal est la référence commune (hors cas particuliers). Le net dépend des cotisations, de certaines retenues et, pour le montant crédité, du prélèvement à la source.",
    },
    {
      question: "Quand le SMIC augmente-t-il ?",
      answer:
        "Chaque année au 1er janvier, et éventuellement en cours d'année si l'inflation concernée progresse d'au moins 2 % depuis la dernière fixation. Un coup de pouce gouvernemental reste possible.",
    },
    {
      question: "Le SMIC peut-il augmenter plusieurs fois dans l'année ?",
      answer:
        "Oui, si les conditions légales d'une revalorisation automatique sont à nouveau réunies, ou en cas de décision gouvernementale. Aucune hausse future n'est acquise sans texte officiel.",
    },
    {
      question: "Une convention collective peut-elle prévoir un salaire supérieur au SMIC ?",
      answer:
        "Oui. Si le minimum conventionnel est plus élevé que le SMIC, c'est ce minimum qui s'applique. S'il est plus bas, l'employeur doit au moins atteindre le SMIC.",
    },
    {
      question: "Le prélèvement à la source est-il compris dans le SMIC net ?",
      answer:
        "Les montants nets indicatifs correspondent surtout au net après cotisations salariales. Le prélèvement à la source peut encore réduire le montant versé sur votre compte.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le SMIC brut est le plancher légal ; le net publié est indicatif.",
      `Montants actuellement applicables depuis le ${SMIC_EFFECTIVE_FROM_LABEL}.`,
      "Vérifiez aussi le minimum conventionnel applicable à votre emploi.",
    ],
    closingText:
      "Pour estimer le net à partir d'un autre brut, utilisez le calculateur ci-dessous.",
    closingCta: {
      label: "Calculer mon salaire brut en net",
      href: "/",
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: "/",
    },
    relatedGuides: [
      { title: "Différence brut / net", href: BRUT_NET_EXPLIQUE_HREF },
      { title: "Cotisations salariales", href: COTISATIONS_HREF },
      { title: "Lire une fiche de paie", href: LIRE_FICHE_PAIE_HREF },
    ],
    discover: [{ title: "Hub salaire brut mensuel en net", href: BRUT_VERS_NET_HUB }],
  },
};
