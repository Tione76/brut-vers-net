import type { Guide, GuideBlock, GuideSubsection } from "../types";
import {
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_LABELS,
  SMIC_SOURCES,
  SMIC_CALENDAR_YEAR_2026,
} from "@/site/smic/data";
import {
  calculateSmicForWeeklyHours,
  formatEuro,
  formatHoursValue,
  OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
  SMIC_HOURS_BREADCRUMB,
  SMIC_HOURS_FRESHNESS_LINE,
  SMIC_HOURS_H1,
  SMIC_HOURS_META_DESCRIPTION,
  SMIC_HOURS_NET_METHOD_SUMMARY,
  SMIC_HOURS_OVERTIME_HYPOTHESIS,
  SMIC_HOURS_CODE_TRAVAIL_HS,
  SMIC_HOURS_PATH,
  SMIC_HOURS_PUBLISHED_AT,
  SMIC_HOURS_SEO_TITLE,
  SMIC_HOURS_SLUG,
  SMIC_HOURS_SUBTITLE,
  SMIC_HOURS_UPDATED_AT,
  weeklyToMonthlyHours,
  type SmicHoursResult,
} from "@/site/smic-heures";

const BRUT_VERS_NET = "/";
const SMIC_PATH = "/smic";
const ALTERNANCE = "/salaire-alternance";
const HS_CALC = "/calculateurs/salaire-heures-supplementaires";
const LIRE_FICHE = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS =
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const GUIDES_HUB = "/guides";
const CODE_TRAVAIL_SIM =
  "https://code.travail.gouv.fr/outils/convention-collective";

function must(hours: number): SmicHoursResult {
  const result = calculateSmicForWeeklyHours(hours);
  if (!result) {
    throw new Error(`Durée SMIC heures invalide: ${hours}`);
  }
  return result;
}

/** Réponse courte : un montant + info propre à la durée. */
function durationSubsection(
  id: string,
  title: string,
  hours: number,
  uniqueBlocks: GuideBlock[],
): GuideSubsection {
  const r = must(hours);
  return {
    id,
    title,
    blocks: [
      {
        type: "paragraph",
        text: `Au SMIC actuellement applicable : ${formatEuro(r.monthlyGross)} brut / mois pour ${formatHoursValue(r.monthlyHours)} h mensualisées, soit environ ${formatEuro(r.monthlyNetEstimated)} net estimé.`,
      },
      ...uniqueBlocks,
    ],
  };
}

const r20 = must(20);
const r24 = must(24);
const r30 = must(30);
const r35 = must(35);
const r39 = must(39);
const halfTimeGross = formatEuro(must(17.5).monthlyGross);

/**
 * Guide pilier : SMIC selon le nombre d'heures (/smic-selon-nombre-heures).
 * Montants : source unique `@/site/smic/data` via le moteur `@/site/smic-heures`.
 */
export const smicSelonNombreHeuresGuide: Guide = {
  slug: SMIC_HOURS_SLUG,
  publicPath: SMIC_HOURS_PATH,
  breadcrumbLabel: SMIC_HOURS_BREADCRUMB,
  title: SMIC_HOURS_H1,
  seoTitle: SMIC_HOURS_SEO_TITLE,
  description: SMIC_HOURS_META_DESCRIPTION,
  subtitle: SMIC_HOURS_SUBTITLE,
  publishedAt: SMIC_HOURS_PUBLISHED_AT,
  updatedAt: SMIC_HOURS_UPDATED_AT,
  includeFaqSchema: false,
  faqSectionId: "questions-frequentes",
  introduction: [
    `Le SMIC est d'abord un montant horaire brut (${SMIC_LABELS.hourlyGross} depuis le ${SMIC_EFFECTIVE_FROM_LABEL}). Le salaire mensuel dépend donc du nombre d'heures prévues au contrat, pas d'un forfait unique.`,
    "Cette page calcule le brut et une estimation nette pour chaque durée de 10 h à 39 h par semaine. Le net reste indicatif : il varie selon les cotisations, la mutuelle, les absences ou le prélèvement à la source.",
    "Jusqu'à 35 h, le calcul suit la mensualisation habituelle. Au-delà, les heures supplémentaires changent la méthode : ce n'est plus une simple proratisation.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      `SMIC horaire brut actuel : ${SMIC_LABELS.hourlyGross}. ${SMIC_HOURS_FRESHNESS_LINE}`,
      `À 35 h : ${SMIC_LABELS.monthlyGross} brut mensuel officiel et environ ${SMIC_LABELS.monthlyNet} net mensuel indicatif publié par Service-Public.`,
      "Mensualisation : heures hebdomadaires × 52 ÷ 12 (un mois n'égale pas quatre semaines).",
      "Le net affiché est une estimation, jamais un montant légal garanti.",
      SMIC_HOURS_OVERTIME_HYPOTHESIS,
    ],
  },
  sections: [
    {
      id: "tableau-smic",
      title: "Tableau du SMIC selon le nombre d'heures",
      blocks: [
        {
          type: "paragraph",
          text: "Le tableau ci-dessus présente, pour chaque durée contractuelle de 10 h à 39 h, les heures mensualisées, le brut mensuel, le net estimé et une projection sur douze mois au taux actuellement applicable. Les principales durées mises en avant dans le calculateur sont repérées par une pastille orange et une légère surbrillance.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            SMIC_HOURS_OVERTIME_HYPOTHESIS,
            "Les lignes 36 h à 39 h ne doivent pas être lues comme un simple temps plein proratisé. Les projections sur douze mois sont internes à taux constant, pas les montants annuels publiés par Service-Public.",
          ],
        },
      ],
    },
    {
      id: "methode-calcul",
      title: "Comment calculer le SMIC mensuel selon les heures travaillées ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour une durée contractuelle inférieure ou égale à 35 h, la méthode usuelle de mensualisation est :",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Convertir les heures hebdomadaires en heures mensuelles : H × 52 ÷ 12.",
            `Multiplier par le SMIC horaire brut (${SMIC_LABELS.hourlyGross}).`,
            "Arrondir le résultat monétaire final au centime.",
            "Estimer le net à partir du ratio indicatif Service-Public à 35 h (hors prélèvement à la source).",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple à 30 h : ${formatHoursValue(weeklyToMonthlyHours(30))} h mensualisées × ${SMIC_LABELS.hourlyGross} = ${formatEuro(r30.monthlyGross)} brut / mois, soit environ ${formatEuro(r30.monthlyNetEstimated)} net estimé.`,
          ],
        },
        {
          type: "mistakes",
          title: "Erreur fréquente",
          items: [
            "Multiplier le salaire d'une semaine par quatre. Un mois civil correspond en moyenne à 52 ÷ 12 ≈ 4,333 semaines, pas à 4 semaines exactes.",
            "Traiter 39 h comme 39 × SMIC horaire sans majoration des heures au-delà de 35 h.",
            "Présenter le net estimé comme le montant exact qui sera viré.",
          ],
        },
        {
          type: "paragraph",
          text: "À 35 h, cette page retient le brut mensuel officiel et le net mensuel indicatif publié par Service-Public, afin d'éviter un écart d'arrondi intermédiaire. Pour 36 h à 39 h, le calcul sépare la base 35 h et les heures supplémentaires majorées.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [SMIC_HOURS_NET_METHOD_SUMMARY],
        },
        {
          type: "paragraph",
          text: SMIC_HOURS_OVERTIME_HYPOTHESIS,
        },
      ],
    },
    {
      id: "temps-partiel",
      title: "Quel salaire au SMIC pour un temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: "En temps partiel, le contrat fixe une durée inférieure à la durée légale ou conventionnelle applicable. Au SMIC, le salaire de base se calcule au prorata de cette durée contractuelle, via la mensualisation H × 52 ÷ 12.",
        },
        {
          type: "paragraph",
          text: "Le tableau principal décrit la durée habituelle prévue au contrat. Il ne simule pas les heures complémentaires ponctuelles qu'un salarié à temps partiel peut effectuer en plus.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Si vous effectuez régulièrement des heures au-delà de votre contrat à temps partiel, demandez à votre service paie comment elles sont qualifiées (heures complémentaires) et majorées. Service-Public précise les plafonds (en principe 1/10e de la durée contractuelle, pouvant aller jusqu'à 1/3 par accord) et les majorations associées.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Référence officielle :",
          label: SMIC_SOURCES.tempsPartiel.label,
          href: SMIC_SOURCES.tempsPartiel.href,
        },
      ],
      subsections: [
        durationSubsection("smic-20-heures", "SMIC pour 20 heures par semaine", 20, [
          {
            type: "paragraph",
            text: `Un contrat de 20 h est parfois appelé, à tort, un « mi-temps ». Il représente en réalité environ 57 % d'un temps plein de 35 h. Un mi-temps strict correspondrait à 17,5 h par semaine, soit environ ${halfTimeGross} brut par mois au taux actuellement applicable. Un contrat à 20 h se situe aussi sous la durée minimale habituelle de 24 h : une dérogation est en principe nécessaire (demande écrite, étudiant de moins de 26 ans, cumul d'activités, disposition conventionnelle, etc.).`,
          },
        ]),
        durationSubsection("smic-24-heures", "SMIC pour 24 heures par semaine", 24, [
          {
            type: "paragraph",
            text: `24 h par semaine (ou 104 h par mois) est la durée minimale habituelle du temps partiel en l'absence de disposition conventionnelle plus basse. Des dérogations existent. Le SMIC horaire reste identique ; seul le volume change.`,
          },
        ]),
        durationSubsection("smic-25-heures", "SMIC pour 25 heures par semaine", 25, [
          {
            type: "paragraph",
            text: "Durée juste au-dessus du seuil de 24 h : elle évite en général le régime des dérogations à la durée minimale, tout en restant clairement un temps partiel par rapport à 35 h.",
          },
        ]),
        durationSubsection("smic-28-heures", "SMIC pour 28 heures par semaine", 28, [
          {
            type: "paragraph",
            text: "À 28 h, le volume reste nettement inférieur à la durée légale : il peut correspondre, par exemple, à quatre journées de 7 h, selon la répartition prévue au contrat, sans confondre avec des heures complémentaires ponctuelles.",
          },
        ]),
        durationSubsection("smic-30-heures", "SMIC pour 30 heures par semaine", 30, [
          {
            type: "paragraph",
            text: "30 h représentent environ 86 % d'un temps plein de 35 h en volume hebdomadaire. Cette durée reste inférieure au seuil des heures supplémentaires.",
          },
        ]),
        durationSubsection("smic-32-heures", "SMIC pour 32 heures par semaine", 32, [
          {
            type: "paragraph",
            text: "À 32 h, on reste en temps partiel au regard de la durée légale de 35 h (sauf durée collective inférieure). L'écart de trois heures avec la durée légale ne constitue pas des heures supplémentaires : ce sont simplement des heures non prévues au contrat.",
          },
        ]),
      ],
      closingBlocks: [
        {
          type: "paragraph",
          text: "Les projections sur douze mois et le détail des colonnes figurent dans le tableau principal ci-dessus.",
        },
      ],
    },
    {
      id: "smic-35-heures",
      title: "Combien gagne-t-on au SMIC à 35 heures ?",
      blocks: [
        {
          type: "paragraph",
          text: `35 heures par semaine constituent la durée légale de travail. Au SMIC actuellement applicable, le salaire mensuel brut officiel est ${SMIC_LABELS.monthlyGross}, pour environ ${SMIC_LABELS.monthlyNet} net mensuel indicatif publié par Service-Public. Les heures mensualisées de référence sont ${SMIC_LABELS.monthlyHours} h. Les projections du tableau (${formatEuro(r35.annualGrossProjection)} brut et ${formatEuro(r35.annualNetProjection)} net estimé sur douze mois) multiplient ces montants mensuels par douze au taux actuel : ce ne sont pas les montants annuels officiels de Service-Public.`,
        },
        {
          type: "list",
          items: [
            "Brut mensuel : montant légal de référence pour un temps plein au SMIC.",
            "Net mensuel : montant indicatif Service-Public, pas un plancher légal unique.",
            "Montant versé : peut encore différer après prélèvement à la source et autres retenues.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le brut mensuel officiel, la revalorisation et la différence brut/net,",
          label: "voir la page principale du SMIC",
          href: SMIC_PATH,
        },
      ],
    },
    {
      id: "smic-39-heures",
      title: "Combien gagne-t-on au SMIC à 39 heures ?",
      blocks: [
        {
          type: "paragraph",
          text: "39 heures ne se calculent pas en multipliant simplement le SMIC horaire par 39. Les 35 premières heures forment la base temps plein ; les 4 heures suivantes sont, en principe, des heures supplémentaires.",
        },
        {
          type: "list",
          items: [
            `Base 35 h : ${formatEuro(r35.monthlyGross)} brut mensuel officiel.`,
            `Heures supplémentaires mensualisées : ${formatHoursValue(r39.overtimeMonthlyHours)} h (4 h × 52 ÷ 12).`,
            `Majoration retenue ici : +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % (hypothèse légale à défaut d'accord).`,
            `Gain brut estimé des HS : ${formatEuro(r39.overtimeGross)}.`,
            `Total brut estimé : ${formatEuro(r39.monthlyGross)} / mois.`,
            `Net estimé (base SMIC indicatif + estimation spécifique des HS) : environ ${formatEuro(r39.monthlyNetEstimated)}.`,
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            SMIC_HOURS_OVERTIME_HYPOTHESIS,
            "Le bulletin réel dépend aussi de l'organisation du temps de travail, des absences et du régime social ou fiscal des heures supplémentaires.",
          ],
        },
        {
          type: "paragraph",
          text: SMIC_HOURS_NET_METHOD_SUMMARY,
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour une simulation personnalisée (taux, volume, profil),",
          label: "utiliser le calculateur de salaire avec heures supplémentaires",
          href: HS_CALC,
        },
      ],
    },
    {
      id: "moins-de-24h",
      title: "Peut-on travailler moins de 24 heures par semaine ?",
      blocks: [
        {
          type: "paragraph",
          text: "La durée minimale habituelle du temps partiel est de 24 heures par semaine (ou 104 heures par mois). Des dérogations sont prévues : demande écrite motivée du salarié (contraintes personnelles, cumul d'activités), étudiants de moins de 26 ans, CDD très courts, remplacement, salarié d'un particulier employeur, certaines dispositions conventionnelles ou contrats d'insertion.",
        },
        {
          type: "paragraph",
          text: "Travailler moins de 24 h ne modifie pas le SMIC horaire : le taux minimum légal reste le même. Seul le volume d'heures (donc le salaire mensuel) diminue.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Cette page ne fournit pas de conseil juridique personnalisé. Pour une situation particulière, reportez-vous aux textes officiels, à votre convention collective ou à un professionnel.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Référence officielle :",
          label: SMIC_SOURCES.tempsPartiel.label,
          href: SMIC_SOURCES.tempsPartiel.href,
        },
      ],
    },
    {
      id: "differences-heures",
      title:
        "Temps partiel, heures complémentaires et heures supplémentaires : quelles différences ?",
      blocks: [
        {
          type: "table",
          caption: "Comparer durée contractuelle, heures complémentaires et heures supplémentaires",
          headers: [
            "Notion",
            "Seuil concerné",
            "Majoration éventuelle",
            "Couvert par ce tableau ?",
          ],
          rows: [
            [
              "Temps contractuel normal",
              "Durée prévue au contrat",
              "SMIC horaire (ou minimum plus favorable)",
              "Oui",
            ],
            [
              "Heures complémentaires",
              "Au-delà du temps partiel contractuel, sans atteindre le temps plein",
              "Oui (souvent 10 %, puis 25 % au-delà du 1/10e, selon les textes)",
              "Non (cas ponctuel)",
            ],
            [
              "Heures supplémentaires",
              "Au-delà de 35 h (ou durée collective)",
              "Oui (légale ou conventionnelle)",
              "Oui pour 36–39 h (hypothèse affichée)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Un salarié dont le contrat prévoit 20 h et qui fait exceptionnellement 22 h n'est pas dans la même situation qu'un salarié dont le contrat prévoit 22 h. Le tableau principal décrit la seconde hypothèse.",
        },
      ],
    },
    {
      id: "pourquoi-net-varie",
      title: "Pourquoi le SMIC net varie-t-il d'une fiche de paie à l'autre ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC brut horaire est légal. Le net dépend de la situation de paie. Entre deux salariés au même volume d'heures, le montant viré peut différer.",
        },
        {
          type: "list",
          items: [
            "Mutuelle et prévoyance",
            "Avantages en nature",
            "Absences, entrées/sorties en cours de mois",
            "Titres-restaurant et autres éléments",
            "Prélèvement à la source",
            "Convention collective plus favorable",
            "Heures complémentaires ou supplémentaires",
            "Retenues propres à la situation",
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Distinguez sur le bulletin : brut, net avant impôt, net imposable, montant net social, net à payer, et montant réellement viré. Le net de cette page correspond à une estimation avant prélèvement à la source.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer ces lignes,",
          label: "lire le guide de la fiche de paie",
          href: LIRE_FICHE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre l'écart brut/net,",
          label: "voir le guide des cotisations salariales",
          href: COTISATIONS,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le taux retenu sur le salaire versé,",
          label: "comprendre le prélèvement à la source",
          href: PAS,
        },
      ],
    },
    {
      id: "mensuel-hebdo-annuel",
      title: "SMIC mensuel, hebdomadaire et annuel",
      blocks: [
        {
          type: "list",
          items: [
            "Hebdomadaire théorique : heures de la semaine × SMIC horaire (utile pour comprendre, rarement le mode de paie).",
            "Mensualisation : H × 52 ÷ 12 × SMIC horaire (méthode retenue ici jusqu'à 35 h).",
            "Projection sur 12 mois au taux actuel : salaire mensuel × 12 avec le SMIC aujourd'hui applicable.",
            `Cumul d'une année civile ayant connu une hausse : calculer chaque période de taux séparément (en ${SMIC_EDITORIAL_YEAR}, exemple pédagogique temps plein : ${SMIC_CALENDAR_YEAR_2026.monthsAtPreviousRate} mois à l'ancien taux + ${SMIC_CALENDAR_YEAR_2026.monthsAtCurrentRate} mois au taux actuel).`,
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne confondez pas « douze mois au taux actuel » et « cumul réel de l'année civile ». Les projections du tableau sont du premier type.",
          ],
        },
      ],
    },
    {
      id: "minimum-conventionnel",
      title: "Le minimum conventionnel peut-il être supérieur au SMIC ?",
      blocks: [
        {
          type: "list",
          items: [
            "Si le minimum conventionnel est inférieur au SMIC, le SMIC s'impose.",
            "S'il est supérieur, le minimum conventionnel plus favorable s'applique.",
            "Identifiez votre convention collective sur le bulletin ou le contrat.",
            "Les calculs de cette page concernent le cas général au SMIC légal.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Simulateur officiel pour retrouver une convention :",
          label: "Code du travail numérique",
          href: CODE_TRAVAIL_SIM,
        },
      ],
    },
    {
      id: "verifier-fiche-paie",
      title: "Comment vérifier son salaire sur sa fiche de paie ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Vérifier le taux horaire brut",
              description: `Il ne doit pas être inférieur au SMIC horaire (${SMIC_LABELS.hourlyGross}), sauf cas particuliers (minoration jeunes, alternance, etc.).`,
            },
            {
              title: "Vérifier le nombre d'heures contractuelles",
              description:
                "Comparez la durée du contrat à celle mensualisée sur le bulletin.",
            },
            {
              title: "Identifier les heures complémentaires ou supplémentaires",
              description:
                "Elles apparaissent souvent sur des lignes distinctes, avec ou sans majoration.",
            },
            {
              title: "Vérifier les majorations",
              description:
                "Le taux peut être légal ou conventionnel ; un accord peut s'écarter de l'hypothèse de cette page.",
            },
            {
              title: "Comparer le salaire de base",
              description:
                "Le salaire brut de base doit correspondre à la durée contractuelle × taux horaire (ou au forfait mensuel équivalent).",
            },
            {
              title: "Contrôler la convention collective",
              description:
                "Un minimum conventionnel plus élevé peut expliquer un écart favorable au SMIC.",
            },
            {
              title: "Distinguer net avant impôt et montant versé",
              description:
                "Le prélèvement à la source et d'autres retenues peuvent encore modifier le virement.",
            },
          ],
        },
      ],
    },
    {
      id: "cas-non-couverts",
      title: "Cas non couverts par le tableau principal",
      blocks: [
        {
          type: "paragraph",
          text: `Le tableau vise le cas général d'un salarié majeur relevant du barème national de ${SMIC_LABELS.hourlyGross} brut par heure, sur une durée hebdomadaire stable de 10 h à 39 h. Ce barème s'applique en métropole, en Guadeloupe, en Guyane, en Martinique, à La Réunion, à Saint-Barthélemy, à Saint-Martin et à Saint-Pierre-et-Miquelon. Mayotte dispose d'un barème distinct et reste exclue du tableau.`,
        },
        {
          type: "list",
          items: [
            "Apprentis et contrats de professionnalisation (rémunérations spécifiques)",
            "Salariés mineurs (minoration possible)",
            "Mayotte (barème de SMIC distinct)",
            "Certains VRP",
            "Minimums conventionnels supérieurs au SMIC",
            "Forfaits jours",
            "Temps de travail annualisé ou modulation",
            "Absences, entrées ou sorties en cours de mois",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les minima d'apprentissage et de professionnalisation,",
          label: "voir le guide du salaire en alternance",
          href: ALTERNANCE,
        },
      ],
    },
    {
      id: "exemples-concrets",
      title: "Exemples concrets",
      blocks: [
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Contrat à 24 h avec heures complémentaires ponctuelles : le tableau donne ${formatEuro(r24.monthlyGross)} brut pour 24 h contractuelles. Deux heures complémentaires un mois donné ne remplacent pas un contrat à 26 h ; elles suivent le régime des heures complémentaires (plafonds et majorations distincts des heures supplémentaires).`,
            "Changement de durée en cours de mois : si le contrat passe de 20 h à 28 h à une date donnée, le bulletin doit proratiser chaque période. Le calculateur de cette page suppose une durée stable sur le mois entier.",
            `Contrat à 39 h avec taux conventionnel différent : ${SMIC_HOURS_OVERTIME_HYPOTHESIS} L'hypothèse retenue ici donne environ ${formatEuro(r39.monthlyGross)} brut. Si votre accord prévoit un autre taux (avec un minimum légal de 10 %), le brut des majorations change ; utilisez le calculateur d'heures supplémentaires pour simuler ce taux.`,
            "Entrée, sortie ou absence en cours de mois : le salaire du mois n'égale pas le montant mensualisé plein. Absences, jours non travaillés ou entrée/sortie réduisent le brut avant même toute estimation de net.",
          ],
        },
        {
          type: "paragraph",
          text: "Ces situations ne constituent pas un conseil juridique personnalisé. Le bulletin réel et la convention collective restent la référence.",
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: SMIC_HOURS_FRESHNESS_LINE,
        },
        {
          type: "list",
          items: [
            "Jusqu'à 35 h : heures mensualisées = H × 52 ÷ 12 ; brut = heures × SMIC horaire ; à 35 h, brut mensuel officiel et net mensuel indicatif Service-Public.",
            SMIC_HOURS_NET_METHOD_SUMMARY,
            SMIC_HOURS_OVERTIME_HYPOTHESIS,
            "Arrondi monétaire : au centime, sur le résultat final.",
            "Projections annuelles : × 12 au taux actuel (pas le cumul civil en cas de revalorisation, ni les montants annuels officiels Service-Public).",
            "Aucun professionnel de la paie n'a validé personnellement chaque situation individuelle décrite ici : le contenu est informatif.",
          ],
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
          intro: `${SMIC_SOURCES.ministereTravailRevaloJuin2026.org} :`,
          label: SMIC_SOURCES.ministereTravailRevaloJuin2026.label,
          href: SMIC_SOURCES.ministereTravailRevaloJuin2026.href,
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
          intro: `${SMIC_SOURCES.tempsPartiel.org} :`,
          label: SMIC_SOURCES.tempsPartiel.label,
          href: SMIC_SOURCES.tempsPartiel.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_HOURS_CODE_TRAVAIL_HS.org} :`,
          label: SMIC_HOURS_CODE_TRAVAIL_HS.label,
          href: SMIC_HOURS_CODE_TRAVAIL_HS.href,
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
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Limites : estimation du net (coefficient 0,78 et réduction 11,31 % sont des hypothèses techniques d'estimation du site), majoration HS retenue à défaut d'accord, exclusion des cas particuliers listés plus haut, pas de conseil juridique personnalisé.",
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes, cohérentes avec le tableau et le calculateur de cette page. Les montants viennent des mêmes fonctions de calcul.",
  faq: [
    {
      question: "Quel est le SMIC net pour 20 heures par semaine ?",
      answer: `Environ ${formatEuro(r20.monthlyNetEstimated)} net estimé par mois pour ${formatEuro(r20.monthlyGross)} brut.`,
    },
    {
      question: "Quel salaire au SMIC pour 24 heures ?",
      answer: `${formatEuro(r24.monthlyGross)} brut / mois, soit environ ${formatEuro(r24.monthlyNetEstimated)} net estimé (${formatHoursValue(r24.monthlyHours)} h mensualisées).`,
    },
    {
      question: "Quel salaire net pour 25 heures au SMIC ?",
      answer: `Environ ${formatEuro(must(25).monthlyNetEstimated)} net estimé pour ${formatEuro(must(25).monthlyGross)} brut mensuel.`,
    },
    {
      question: "Quel est le SMIC mensuel pour 28 heures ?",
      answer: `${formatEuro(must(28).monthlyGross)} brut / mois, environ ${formatEuro(must(28).monthlyNetEstimated)} net estimé.`,
    },
    {
      question: "Combien gagne-t-on pour 30 heures par semaine ?",
      answer: `${formatEuro(r30.monthlyGross)} brut / mois au SMIC, soit environ ${formatEuro(r30.monthlyNetEstimated)} net estimé.`,
    },
    {
      question: "Quel est le salaire au SMIC pour 32 heures ?",
      answer: `${formatEuro(must(32).monthlyGross)} brut / mois, environ ${formatEuro(must(32).monthlyNetEstimated)} net estimé.`,
    },
    {
      question: "Quel est le SMIC net à 35 heures ?",
      answer: `Environ ${SMIC_LABELS.monthlyNet} net mensuel indicatif pour ${SMIC_LABELS.monthlyGross} brut mensuel officiel (références Service-Public).`,
    },
    {
      question: "Quel est le salaire au SMIC pour 39 heures ?",
      answer: `Environ ${formatEuro(r39.monthlyGross)} brut / mois avec l'hypothèse de majoration retenue sur cette page (+${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % à défaut d'accord), soit environ ${formatEuro(r39.monthlyNetEstimated)} net estimé. Un accord collectif peut prévoir un autre taux, avec un minimum légal de 10 %.`,
    },
    {
      question: "Comment convertir des heures hebdomadaires en heures mensuelles ?",
      answer:
        "Multipliez les heures hebdomadaires par 52, puis divisez par 12. Exemple : 30 × 52 ÷ 12 = 130 heures mensualisées.",
    },
    {
      question: "Pourquoi ne faut-il pas multiplier le salaire hebdomadaire par quatre ?",
      answer:
        "Parce qu'un mois correspond en moyenne à un peu plus de quatre semaines (52 ÷ 12). La mensualisation H × 52 ÷ 12 corrige cette approximation.",
    },
    {
      question: "Peut-on avoir un contrat de moins de 24 heures ?",
      answer:
        "Oui, dans les cas prévus par la loi ou la convention (demande écrite, étudiants de moins de 26 ans, etc.). Le SMIC horaire reste le même ; seul le volume d'heures change.",
    },
    {
      question: "Les heures entre 35 et 39 heures sont-elles majorées ?",
      answer: SMIC_HOURS_OVERTIME_HYPOTHESIS,
    },
    {
      question: "Le net affiché est-il garanti ?",
      answer:
        "Non. C'est une estimation indicative avant prélèvement à la source. Votre bulletin peut différer.",
    },
    {
      question: "Le prélèvement à la source est-il déjà déduit ?",
      answer:
        "Non. Les nets de cette page sont estimés avant prélèvement à la source.",
    },
    {
      question: "Le salaire minimum conventionnel peut-il être supérieur au SMIC ?",
      answer:
        "Oui. Dans ce cas, c'est le minimum plus favorable qui s'applique. Cette page calcule le cas général au SMIC légal.",
    },
    {
      question: "Le tableau s'applique-t-il aux apprentis ?",
      answer:
        "Non. Les apprentis et contrats de professionnalisation suivent des grilles spécifiques. Consultez le guide du salaire en alternance.",
    },
    {
      question: "Le tableau s'applique-t-il à Mayotte ?",
      answer:
        `Non. Mayotte dispose d'un barème de SMIC distinct. Cette page couvre le barème national de ${SMIC_LABELS.hourlyGross} (métropole et territoires listés dans la section « Cas non couverts »).`,
    },
    {
      question:
        "Comment calculer un salaire lorsque le SMIC augmente en cours d'année ?",
      answer:
        "Calculez séparément chaque période au taux alors applicable, puis additionnez. Ne multipliez pas le dernier salaire mensuel par 12 si vous visez le cumul civil réel.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le SMIC se lit d'abord à l'heure : le salaire mensuel dépend de la durée contractuelle.",
      "Jusqu'à 35 h, utilisez la mensualisation H × 52 ÷ 12 ; au-delà, séparez les heures supplémentaires.",
      "Le net affiché est une estimation, jamais un montant légal garanti.",
      SMIC_HOURS_OVERTIME_HYPOTHESIS,
    ],
    closingText:
      "Pour un autre brut, une simulation d'heures supplémentaires ou le montant officiel du SMIC, utilisez les outils ci-dessous.",
    closingCta: {
      label: "Calculer mon salaire brut en net",
      href: BRUT_VERS_NET,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: BRUT_VERS_NET,
    },
    relatedGuides: [
      { title: "SMIC : montants officiels", href: SMIC_PATH },
      { title: "Salaire en alternance", href: ALTERNANCE },
      { title: "Lire une fiche de paie", href: LIRE_FICHE },
      { title: "Cotisations salariales", href: COTISATIONS },
      { title: "Prélèvement à la source", href: PAS },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    discover: [
      {
        title: "Salaire avec heures supplémentaires",
        href: HS_CALC,
      },
    ],
  },
};
