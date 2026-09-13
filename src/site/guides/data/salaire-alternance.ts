import type { Guide } from "../types";
import {
  ALTERNANCE_AMOUNTS_BLOCK_TITLE,
  ALTERNANCE_EDITORIAL_YEAR,
  ALTERNANCE_FRESHNESS_LINE,
  ALTERNANCE_H1,
  ALTERNANCE_LABELS,
  ALTERNANCE_META_DESCRIPTION,
  ALTERNANCE_PUBLISHED_AT,
  ALTERNANCE_SEO_TITLE,
  ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL,
  ALTERNANCE_SOURCES,
  ALTERNANCE_SOURCES_VERIFIED_AT_LABEL,
  ALTERNANCE_UPDATED_AT,
  APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS,
  getApprenticeshipAgeBandCards,
  getApprenticeshipTableRows,
  PROFESSIONNALISATION_AMOUNTS,
} from "@/site/salaire-alternance/data";

const SMIC_HREF = "/smic";
const BRUT_NET_EXPLIQUE_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_SALAIRE_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const SALAIRE_MOYEN_HREF = "/salaire-moyen-france";

const L = ALTERNANCE_LABELS;

const PRO = PROFESSIONNALISATION_AMOUNTS;

/**
 * Page pilier salaire en alternance (/salaire-alternance).
 * Barèmes et libellés : source unique `@/site/salaire-alternance/data`.
 * Règle éditoriale : distinguer systématiquement apprentissage et
 * professionnalisation, et ne jamais publier de net calculé.
 */
export const salaireAlternanceGuide: Guide = {
  slug: "salaire-alternance",
  publicPath: "/salaire-alternance",
  breadcrumbLabel: "Salaire alternance",
  title: ALTERNANCE_H1,
  seoTitle: ALTERNANCE_SEO_TITLE,
  description: ALTERNANCE_META_DESCRIPTION,
  subtitle:
    "Minima légaux par âge, par année de contrat et par type d'alternance, à partir des barèmes officiels.",
  publishedAt: ALTERNANCE_PUBLISHED_AT,
  updatedAt: ALTERNANCE_UPDATED_AT,
  introduction: [
    "Le mot alternance recouvre principalement deux contrats dont les règles de rémunération sont différentes : l'apprentissage et le contrat de professionnalisation. Dans les deux cas, le minimum légal est exprimé en pourcentage du SMIC, selon l'âge et, en apprentissage, selon l'année d'exécution du contrat.",
    `Les montants présentés ici sont des minima bruts mensuels pour un temps plein, calculés sur le SMIC en vigueur depuis le ${ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL} (${L.smicMonthly} brut par mois). Un employeur peut toujours verser davantage, et une convention collective ou un accord de branche plus favorable s'impose à lui.`,
    "Les deux contrats ont aussi un régime social et fiscal distinct : ils sont traités séparément dans cette page.",
  ],
  quickSummary: {
    title: ALTERNANCE_AMOUNTS_BLOCK_TITLE,
    variant: "age-bands",
    items: getApprenticeshipAgeBandCards().map((card) => ({
      rate: card.title,
      title: card.title,
      details: card.details,
      description: card.description,
    })),
    synthesis: [
      ALTERNANCE_FRESHNESS_LINE,
      "Montants du contrat d'apprentissage. Le contrat de professionnalisation applique une autre grille.",
    ],
  },
  introSummary: {
    title: "L'essentiel",
    items: [
      `Apprentissage : de ${L.y1_16} brut par mois (16 à 17 ans, 1re année) à ${L.y1_26} brut (26 ans et plus, au moins le SMIC).`,
      `Professionnalisation : de ${L.proUnder21Base} brut (moins de 21 ans) à ${L.pro26} brut (26 ans et plus).`,
      "Le pourcentage augmente avec l'âge et, en apprentissage, à chaque nouvelle année de contrat.",
      `Cotisations : pour un contrat d'apprentissage commencé depuis le 1er mars 2025, exonération jusqu'à ${L.exemptionThreshold} brut par mois.`,
      `Impôt : le salaire d'apprenti est exonéré dans la limite du SMIC annuel (${L.incomeTaxLimit2025} pour les revenus 2025). Pas d'exonération équivalente en professionnalisation.`,
    ],
  },
  sections: [
    {
      id: "salaire-alternant-2026",
      title: `Quel est le salaire d'un alternant en ${ALTERNANCE_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: `Dans les deux cas, le minimum est exprimé en pourcentage du SMIC, soit ${L.smicMonthly} brut par mois pour 35 heures depuis le ${ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL} (${L.smicHourly} de l'heure).`,
        },
        {
          type: "list",
          items: [
            "Le contrat d'apprentissage : le minimum dépend de l'âge et de l'année d'exécution du contrat (1re, 2e ou 3e année).",
            "Le contrat de professionnalisation : le minimum dépend de l'âge et du niveau de qualification déjà obtenu, sans progression automatique par année.",
          ],
        },
        {
          type: "paragraph",
          text: "Ces minima s'entendent en brut, pour un temps plein. En cas de temps partiel, la rémunération est proratisée en fonction de la durée de travail prévue au contrat.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le temps passé en centre de formation fait partie du temps de travail : il est rémunéré au même titre que le temps passé en entreprise.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour la référence utilisée dans tous les calculs de cette page,",
          label: "consulter les montants du SMIC actuellement applicables",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "grille-apprentissage-2026",
      title: `Grille de salaire de l'apprenti en ${ALTERNANCE_EDITORIAL_YEAR}`,
      blocks: [
        {
          type: "paragraph",
          text: "Le tableau ci-dessous reprend les pourcentages réglementaires du SMIC et les montants bruts mensuels correspondants publiés par Service-Public, pour un apprenti à temps plein.",
        },
        {
          type: "table",
          caption: `Rémunération minimale brute mensuelle d'un apprenti (SMIC ${L.smicMonthly})`,
          headers: ["Âge", "1re année", "2e année", "3e année"],
          rows: getApprenticeshipTableRows(),
        },
        {
          type: "paragraph",
          text: "* Pour les apprentis de 21 ans et plus, le minimum est le pourcentage du SMIC indiqué ou le même pourcentage du salaire minimum conventionnel de l'emploi occupé, si ce dernier est plus favorable.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Cette grille concerne le seul contrat d'apprentissage. Les pourcentages sont fixés par le Code du travail ; les montants en euros suivent chaque revalorisation du SMIC. Le contrat de professionnalisation relève d'un autre barème, présenté plus bas.",
          ],
        },
      ],
    },
    {
      id: "salaire-apprenti-selon-age",
      title: "Le salaire de l'apprenti selon l'âge",
      blocks: [
        {
          type: "paragraph",
          text: "L'âge détermine la tranche applicable. À année de contrat identique, un apprenti plus âgé perçoit un pourcentage du SMIC plus élevé.",
        },
      ],
      subsections: [
        {
          id: "apprenti-16-17-ans",
          title: "Apprenti de 16 à 17 ans",
          blocks: [
            {
              type: "paragraph",
              text: `C'est la tranche la moins rémunérée : 27 % du SMIC en 1re année, soit ${L.y1_16} brut par mois, puis 39 % en 2e année (${L.y2_16}) et 55 % en 3e année (${L.y3_16}).`,
            },
            {
              type: "paragraph",
              text: "La progression est importante en pourcentage, mais la tranche est rarement parcourue en entier : la plupart des apprentis changent de tranche en cours de contrat en atteignant 18 ans.",
            },
          ],
        },
        {
          id: "apprenti-18-20-ans",
          title: "Apprenti de 18 à 20 ans",
          blocks: [
            {
              type: "paragraph",
              text: `Le minimum passe à 43 % du SMIC en 1re année (${L.y1_18}), 51 % en 2e année (${L.y2_18}) et 67 % en 3e année (${L.y3_18}).`,
            },
            {
              type: "paragraph",
              text: "C'est la tranche la plus fréquente pour les apprentis préparant un diplôme après le baccalauréat en deux ou trois ans.",
            },
          ],
        },
        {
          id: "apprenti-21-25-ans",
          title: "Apprenti de 21 à 25 ans",
          blocks: [
            {
              type: "paragraph",
              text: `Le minimum est de 53 % du SMIC en 1re année (${L.y1_21}), 61 % en 2e année (${L.y2_21}) et 78 % en 3e année (${L.y3_21}).`,
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "À partir de 21 ans, la comparaison ne se fait plus seulement avec le SMIC : le pourcentage s'applique aussi au salaire minimum conventionnel de l'emploi occupé, et c'est le montant le plus favorable qui doit être versé.",
              ],
            },
          ],
        },
        {
          id: "apprenti-26-ans-et-plus",
          title: "Apprenti de 26 ans et plus",
          blocks: [
            {
              type: "paragraph",
              text: `À partir de 26 ans, l'apprenti perçoit au minimum 100 % du SMIC, soit ${L.y1_26} brut par mois, quelle que soit l'année du contrat. Il n'y a donc pas de progression liée à l'ancienneté dans le contrat.`,
            },
            {
              type: "paragraph",
              text: "Si le salaire minimum conventionnel de l'emploi occupé est supérieur au SMIC, c'est ce minimum conventionnel qui s'applique.",
            },
          ],
        },
      ],
    },
    {
      id: "salaire-apprenti-selon-annee",
      title: "Le salaire de l'apprenti selon l'année de contrat",
      blocks: [
        {
          type: "paragraph",
          text: "L'année d'exécution du contrat est la seconde variable de la grille. Elle se compte à partir de la date de début du contrat, et non par année scolaire ou civile.",
        },
        {
          type: "list",
          items: [
            `1re année : de 27 % à 53 % du SMIC selon l'âge, soit de ${L.y1_16} à ${L.y1_21} brut par mois, et ${L.y1_26} à partir de 26 ans.`,
            `2e année : de 39 % à 61 % du SMIC, soit de ${L.y2_16} à ${L.y2_21} brut par mois.`,
            `3e année : de 55 % à 78 % du SMIC, soit de ${L.y3_16} à ${L.y3_21} brut par mois.`,
          ],
        },
        {
          type: "paragraph",
          text: "Le passage à l'année suivante prend effet à la date anniversaire du contrat. La revalorisation est automatique : elle ne dépend ni de la réussite aux examens ni d'une demande de l'apprenti.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Un apprenti de 19 ans entré en contrat au 1er septembre perçoit ${L.y1_18} brut par mois pendant la première année. Au 1er septembre suivant, il passe en 2e année, soit ${L.y2_18} brut par mois s'il n'a pas encore 21 ans.`,
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Deux revalorisations peuvent se cumuler dans une même année : le passage à l'année suivante de contrat et le franchissement d'une tranche d'âge.",
          ],
        },
      ],
    },
    {
      id: "majoration-15-points-apprentissage",
      title: "Dans quels cas le salaire d'un apprenti est-il majoré de 15 points ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le pourcentage réglementaire peut être majoré de ${APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS} points (et non de ${APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS} %) lorsque toutes les conditions suivantes sont réunies.`,
        },
        {
          type: "list",
          items: [
            "Le contrat est conclu pour une durée inférieure ou égale à un an.",
            "Il prépare un diplôme ou un titre de même niveau que celui précédemment obtenu.",
            "La qualification recherchée est en rapport direct avec celle qui résulte du diplôme ou titre précédemment obtenu.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple Service-Public : un apprenti de 19 ans dont le pourcentage était de 51 % du SMIC en fin de contrat précédent perçoit 51 % + ${APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS} points, soit 66 % du SMIC, s'il remplit ces conditions.`,
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Cette majoration de points s'applique au pourcentage du Code du travail. Elle ne s'applique pas au salaire minimum prévu par une convention collective. Elle ne se confond pas non plus avec le maintien de rémunération en cas de succession de contrats.",
          ],
        },
      ],
    },
    {
      id: "brut-ou-net-apprenti",
      title: "Le salaire d'un apprenti est-il brut ou net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les montants de la grille sont des montants bruts. C'est le brut qui sert de référence légale et qui figure au contrat. Le net n'est jamais égal au brut par principe : il dépend du montant brut, de la date de début du contrat, des cotisations applicables et des autres lignes du bulletin.",
        },
        {
          type: "paragraph",
          text: `Pour un contrat d'apprentissage commencé depuis le 1er mars 2025, la rémunération est exonérée de cotisations salariales, ainsi que de CSG et de CRDS, dans la limite de 50 % du SMIC, soit ${L.exemptionThreshold} brut par mois. La fraction qui dépasse ce seuil reste soumise aux cotisations, à la CSG et à la CRDS.`,
        },
        {
          type: "paragraph",
          text: `Pour un contrat commencé au plus tard le 28 février 2025, l'ancien régime continue de s'appliquer : exonération de cotisations salariales dans la limite de 79 % du SMIC (soit ${L.exemptionThresholdBefore2025} selon Service-Public) et exonération totale de CSG et de CRDS.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Deux apprentis avec le même brut peuvent donc avoir un net différent selon la date de début du contrat, la mutuelle, une absence ou d'autres retenues du bulletin.",
            "Le contrat de professionnalisation ne bénéficie pas de ces exonérations salariales : l'alternant en professionnalisation cotise comme un salarié de droit commun.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Un calculateur brut vers net généraliste applique le régime de droit commun. Il ne modélise pas les exonérations propres à l'apprentissage : le net obtenu pour un apprenti y sera sous-estimé.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre le passage du brut au net dans le cas général,",
          label: "lire le guide sur le calcul du salaire net",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour la méthode de calcul pas à pas,",
          label: "voir comment calculer son salaire net",
          href: CALCULER_SALAIRE_NET_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer les lignes concernées sur le bulletin,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "changement-age-apprenti",
      title: "Que se passe-t-il quand l'apprenti change de tranche d'âge ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le changement de tranche d'âge ne prend pas effet le jour de l'anniversaire. La rémunération est revalorisée à compter du premier jour du mois suivant l'anniversaire.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Un apprenti en 1re année qui fête ses 18 ans le 12 avril reste rémunéré au taux de la tranche 16 à 17 ans jusqu'au 30 avril. Le taux de la tranche 18 à 20 ans s'applique à compter du 1er mai.",
          ],
        },
        {
          type: "paragraph",
          text: "Cette revalorisation est automatique et s'ajoute, le cas échéant, au changement d'année de contrat. Elle doit apparaître sur le bulletin de paie du mois concerné.",
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : croire que le nouveau taux s'applique dès le jour de l'anniversaire, ou au contraire attendre la date anniversaire du contrat. Ni l'un ni l'autre : c'est le premier jour du mois suivant l'anniversaire.",
          ],
        },
      ],
    },
    {
      id: "salaire-contrat-professionnalisation",
      title: "Le salaire en contrat de professionnalisation",
      blocks: [
        {
          type: "paragraph",
          text: "En contrat de professionnalisation, le minimum dépend de l'âge et du niveau de qualification déjà détenu au moment de la signature. Il n'existe pas de progression automatique par année de contrat.",
        },
        {
          type: "table",
          caption: `Rémunération minimale brute mensuelle en contrat de professionnalisation (SMIC ${L.smicMonthly})`,
          headers: [
            "Âge",
            "Qualification inférieure au bac professionnel",
            "Bac professionnel ou titre équivalent",
          ],
          rows: [
            [
              "Moins de 21 ans",
              `${PRO["under-21"]["below-bac-pro"].rateLabel} · ${L.proUnder21Base}`,
              `${PRO["under-21"]["bac-pro-or-equivalent"].rateLabel} · ${L.proUnder21Bac}`,
            ],
            [
              "21 à 25 ans",
              `${PRO["21-25"]["below-bac-pro"].rateLabel} · ${L.pro2125Base}`,
              `${PRO["21-25"]["bac-pro-or-equivalent"].rateLabel} · ${L.pro2125Bac}`,
            ],
            [
              "26 ans et plus",
              `${PRO["26+"]["below-bac-pro"].rateLabel} · ${L.pro26}`,
              `${PRO["26+"]["bac-pro-or-equivalent"].rateLabel} · ${L.pro26}`,
            ],
          ],
        },
        {
          type: "list",
          items: [
            `Moins de 21 ans : 55 % du SMIC (${L.proUnder21Base}), ou 65 % (${L.proUnder21Bac}) avec un bac professionnel ou un titre équivalent.`,
            `21 à 25 ans : 70 % du SMIC (${L.pro2125Base}), ou 80 % (${L.pro2125Bac}) avec un bac professionnel ou un titre équivalent.`,
            `26 ans et plus : au moins le SMIC (${L.pro26}), ou 85 % du salaire minimum conventionnel de branche si ce montant est plus favorable.`,
          ],
        },
        {
          type: "paragraph",
          text: "Pour les 21 à 25 ans, le minimum légal se compare également au salaire minimum conventionnel applicable : c'est le montant le plus favorable qui doit être versé.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Le passage de la tranche des moins de 21 ans à celle des 21 à 25 ans prend effet le premier jour du mois suivant l'anniversaire des 21 ans.",
            "En revanche, le passage de 25 à 26 ans en cours de contrat de professionnalisation n'augmente pas la rémunération minimale : Service-Public précise explicitement que ce franchissement d'âge ne majore pas le salaire.",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Le contrat de professionnalisation ne bénéficie ni de l'exonération de cotisations salariales propre à l'apprentissage, ni de l'exonération d'impôt sur le revenu réservée aux apprentis.",
          ],
        },
      ],
    },
    {
      id: "apprentissage-vs-professionnalisation",
      title: "Apprentissage ou professionnalisation : quelles différences de rémunération ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les deux contrats préparent à une qualification en alternance, mais les règles de paie diffèrent sur plusieurs points.",
        },
        {
          type: "table",
          caption: "Comparaison des règles de rémunération",
          headers: ["Critère", "Contrat d'apprentissage", "Contrat de professionnalisation"],
          rows: [
            [
              "Base du minimum",
              "Pourcentage du SMIC selon l'âge et l'année de contrat",
              "Pourcentage du SMIC selon l'âge et la qualification détenue",
            ],
            [
              "Progression par année",
              "Oui, à chaque date anniversaire du contrat",
              "Non, pas de progression automatique",
            ],
            [
              "Changement de tranche d'âge",
              "À 18, 21 et 26 ans : le 1er jour du mois suivant l'anniversaire",
              "À 21 ans : le 1er jour du mois suivant l'anniversaire ; le passage à 26 ans en cours de contrat n'augmente pas la rémunération",
            ],
            [
              "Minimum de référence à 26 ans et plus",
              `Au moins 100 % du SMIC (${L.y1_26})`,
              `Au moins le SMIC (${L.pro26}) ou 85 % du salaire minimum conventionnel`,
            ],
            [
              "Cotisations salariales",
              `Exonérées jusqu'à ${L.exemptionThreshold} brut par mois pour les contrats conclus depuis le 1er mars 2025`,
              "Régime de droit commun, sans exonération salariale spécifique",
            ],
            [
              "Impôt sur le revenu",
              `Exonération dans la limite du SMIC annuel (${L.incomeTaxLimit2025} pour les revenus 2025)`,
              "Salaire imposable dans les conditions de droit commun",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À âge égal, le minimum brut est souvent plus élevé en contrat de professionnalisation, mais le net perçu par un apprenti bénéficie d'exonérations qui n'existent pas en professionnalisation. La comparaison doit donc porter sur le brut et sur le régime applicable.",
          ],
        },
      ],
    },
    {
      id: "convention-collective",
      title: "La convention collective peut-elle prévoir mieux que la grille légale ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui. La grille légale fixe un plancher. Une convention collective, un accord de branche ou le contrat de travail peuvent prévoir une rémunération supérieure, et cette disposition plus favorable s'impose à l'employeur.",
        },
        {
          type: "list",
          items: [
            "En apprentissage, à partir de 21 ans, le pourcentage réglementaire s'applique au SMIC ou au salaire minimum conventionnel de l'emploi occupé, selon le plus favorable.",
            "En professionnalisation, la comparaison au minimum conventionnel concerne les 21 à 25 ans, ainsi que les 26 ans et plus via la règle des 85 % du salaire minimum conventionnel.",
            "Certaines branches prévoient des grilles ou majorations propres : il faut toujours vérifier le texte applicable à l'entreprise, sans généraliser.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Le nom de la convention collective applicable figure sur le bulletin de paie. Vérifiez sa grille avant de conclure qu'un salaire d'alternant est conforme au seul minimum légal.",
          ],
        },
      ],
    },
    {
      id: "nouveau-contrat-apprentissage",
      title: "Quelle rémunération en cas de nouveau contrat d'apprentissage ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si l'apprenti a obtenu le diplôme ou le titre préparé précédemment et signe un nouveau contrat d'apprentissage, la rémunération peut être maintenue à un niveau au moins égal à celui de la dernière année du contrat précédent. Ce mécanisme est distinct de la majoration de 15 points.",
        },
        {
          type: "list",
          items: [
            "Même employeur : la rémunération est au moins égale à celle perçue lors de la dernière année du contrat précédent (rémunération contractuelle, conventionnelle ou réglementaire, selon ce qui s'appliquait). Le barème lié à l'âge s'applique s'il est plus favorable.",
            "Autre employeur : la rémunération est au moins égale à celle à laquelle l'apprenti pouvait prétendre lors de la dernière année du contrat précédent. Le maintien de la rémunération conventionnelle suppose la même convention collective ; sinon, c'est la rémunération réglementaire qui sert de plancher. Le barème lié à l'âge s'applique s'il est plus favorable.",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Ces règles de succession concernent le cas où le diplôme ou le titre précédent a été obtenu. Elles ne se confondent pas avec la majoration de 15 points, qui repose sur d'autres conditions (durée du contrat, même niveau de diplôme, lien direct de qualification).",
          ],
        },
      ],
    },
    {
      id: "licence-professionnelle-annee-remuneration",
      title: "Licence professionnelle : quelle année de rémunération retenir ?",
      blocks: [
        {
          type: "paragraph",
          text: "Lorsque le contrat d'apprentissage prépare une licence professionnelle en un an, la rémunération correspond à celle de la 2e année d'apprentissage, et non à celle de la 1re année.",
        },
        {
          type: "paragraph",
          text: `Concrètement, un apprenti de 21 à 25 ans en licence professionnelle sur un an perçoit au minimum le taux de 2e année, soit ${L.y2_21} brut par mois, et non ${L.y1_21}.`,
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Cette règle vise la licence professionnelle préparée en un an. Elle ne s'étend pas automatiquement aux autres formations de niveau bac + 3 ni aux autres durées de contrat : vérifiez le cas précis auprès de Service-Public ou du centre de formation.",
          ],
        },
      ],
    },
    {
      id: "heures-transport-avantages",
      title: "Temps de travail, transport et avantages",
      blocks: [
        {
          type: "list",
          items: [
            "La durée de travail de référence est celle de l'entreprise, généralement 35 heures par semaine. Le temps passé en formation est inclus et rémunéré.",
            "Des règles protectrices limitent la durée quotidienne et hebdomadaire de travail des alternants mineurs, ainsi que le travail de nuit.",
            "L'employeur prend en charge au moins 50 % du coût de l'abonnement aux transports publics, comme pour les autres salariés.",
            "Les titres-restaurant, la mutuelle d'entreprise, l'intéressement et les activités du comité social et économique s'appliquent selon les règles de l'entreprise.",
            "Les congés payés sont acquis dans les mêmes conditions que pour les autres salariés.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ces éléments peuvent modifier sensiblement le montant versé sans changer le salaire brut de base inscrit au contrat.",
          ],
        },
      ],
    },
    {
      id: "impots-apprenti",
      title: "Un apprenti ou un salarié en professionnalisation paie-t-il des impôts ?",
      blocks: [
        {
          type: "paragraph",
          text: `Contrat d'apprentissage : le salaire est exonéré d'impôt sur le revenu dans la limite du montant annuel du SMIC. Pour les revenus 2025 déclarés en 2026, cette limite est de ${L.incomeTaxLimit2025}. Seule la fraction annuelle qui dépasse ce plafond est imposable.`,
        },
        {
          type: "paragraph",
          text: "Contrat de professionnalisation : cette exonération ne s'applique pas. La rémunération est imposable dans les conditions de droit commun, dès le premier euro.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "L'exonération porte sur un montant annuel, pas sur un plafond mensuel de rémunération. Elle ne doit pas être confondue avec le seuil d'exonération de cotisations salariales.",
            "Le rattachement au foyer fiscal des parents modifie la façon de déclarer ces revenus : la limite d'exonération s'applique alors aux sommes déclarées par le foyer.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre l'impôt retenu directement sur le bulletin,",
          label: "lire le guide sur le prélèvement à la source",
          href: PAS_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.servicePublicImpotApprenti.org} :`,
          label: ALTERNANCE_SOURCES.servicePublicImpotApprenti.label,
          href: ALTERNANCE_SOURCES.servicePublicImpotApprenti.href,
        },
      ],
    },
    {
      id: "verifier-salaire-alternant",
      title: "Comment vérifier le salaire d'un alternant ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Identifier le contrat",
              description:
                "Apprentissage ou professionnalisation : les deux grilles sont différentes et ne se substituent pas l'une à l'autre.",
            },
            {
              title: "Déterminer la tranche d'âge",
              description:
                "En apprentissage, retenir l'âge atteint au mois considéré : le changement prend effet le premier jour du mois suivant l'anniversaire. En professionnalisation, le passage à 21 ans suit la même logique, mais le passage à 26 ans en cours de contrat n'augmente pas la rémunération.",
            },
            {
              title: "Déterminer l'année de contrat",
              description:
                "En apprentissage, compter les années depuis la date de début du contrat, et vérifier les règles propres aux contrats successifs et à la licence professionnelle.",
            },
            {
              title: "Comparer au minimum conventionnel",
              description:
                "À partir de 21 ans, contrôler la grille de la convention collective et retenir le montant le plus favorable.",
            },
            {
              title: "Contrôler le brut du bulletin",
              description:
                "Vérifier que le salaire de base brut est au moins égal au minimum, proratisé en cas de temps partiel.",
            },
          ],
        },
        {
          type: "checklist",
          title: "Points à contrôler sur le bulletin de paie",
          items: [
            "Le salaire de base brut et la durée de travail mensuelle retenue.",
            "La date de début du contrat et l'année d'exécution appliquée.",
            "La revalorisation effective après un anniversaire ou une date anniversaire de contrat.",
            "La convention collective mentionnée et sa grille de minima.",
            "Les lignes d'exonération de cotisations salariales, pour un contrat d'apprentissage.",
            "La prise en charge de l'abonnement de transport, le cas échéant.",
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "En cas d'écart, adressez-vous d'abord au service paie avec le contrat et le bulletin concerné. Le centre de formation et l'opérateur de compétences peuvent également être sollicités.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Vous voulez situer un salaire brut par rapport aux ordres de grandeur du marché ?",
          label: "Consulter les montants du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "sources-officielles-methodologie",
      title: "Sources officielles et méthodologie",
      blocks: [
        {
          type: "paragraph",
          text: `Les pourcentages proviennent des textes réglementaires relayés par Service-Public. Les montants en euros sont recalculés sur le SMIC en vigueur depuis le ${ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL} (${L.smicMonthly} brut par mois). Aucun montant net n'est publié sur cette page, car il dépend de la date de conclusion du contrat et de la situation de paie.`,
        },
        {
          type: "paragraph",
          text: `Sources vérifiées le ${ALTERNANCE_SOURCES_VERIFIED_AT_LABEL} :`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.servicePublicApprentissage.org} :`,
          label: ALTERNANCE_SOURCES.servicePublicApprentissage.label,
          href: ALTERNANCE_SOURCES.servicePublicApprentissage.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.servicePublicProfessionnalisation.org} :`,
          label: ALTERNANCE_SOURCES.servicePublicProfessionnalisation.label,
          href: ALTERNANCE_SOURCES.servicePublicProfessionnalisation.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.ministereApprentissage.org} :`,
          label: ALTERNANCE_SOURCES.ministereApprentissage.label,
          href: ALTERNANCE_SOURCES.ministereApprentissage.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.ministereFaqAlternance.org} :`,
          label: ALTERNANCE_SOURCES.ministereFaqAlternance.label,
          href: ALTERNANCE_SOURCES.ministereFaqAlternance.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.urssafApprentissage.org} :`,
          label: ALTERNANCE_SOURCES.urssafApprentissage.label,
          href: ALTERNANCE_SOURCES.urssafApprentissage.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${ALTERNANCE_SOURCES.smicPage.org} :`,
          label: ALTERNANCE_SOURCES.smicPage.label,
          href: ALTERNANCE_SOURCES.smicPage.href,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le salaire en alternance",
  faqIntro:
    "Réponses courtes sur les minima applicables, les changements d'âge et le régime social et fiscal des alternants.",
  faq: [
    {
      question: `Combien gagne un apprenti en ${ALTERNANCE_EDITORIAL_YEAR} ?`,
      answer: `Le minimum va de ${L.y1_16} brut par mois (16 à 17 ans, 1re année) à ${L.y3_21} brut (21 à 25 ans, 3e année). À partir de 26 ans, l'apprenti perçoit au moins le SMIC, soit ${L.y1_26} brut par mois.`,
    },
    {
      question: "Quel est le salaire d'un apprenti de 18 ans en 1re année ?",
      answer: `Le minimum légal est de 43 % du SMIC, soit ${L.y1_18} brut par mois pour un temps plein. Ce montant passe à 51 % du SMIC (${L.y2_18}) en 2e année.`,
    },
    {
      question: "Quel est le salaire d'un apprenti de 21 ans ?",
      answer: `De 53 % du SMIC en 1re année (${L.y1_21}) à 78 % en 3e année (${L.y3_21}). À partir de 21 ans, le pourcentage s'applique au SMIC ou au salaire minimum conventionnel de l'emploi occupé, si celui-ci est plus favorable.`,
    },
    {
      question: "Un apprenti de 26 ans touche-t-il le SMIC ?",
      answer: `Oui. À partir de 26 ans, la rémunération minimale de l'apprenti est d'au moins 100 % du SMIC, soit ${L.y1_26} brut par mois, quelle que soit l'année du contrat. Un minimum conventionnel supérieur reste applicable s'il existe.`,
    },
    {
      question: "Le salaire indiqué dans la grille est-il brut ou net ?",
      answer: `Il s'agit de montants bruts mensuels pour un temps plein. Le net dépend des retenues du bulletin. Pour un contrat d'apprentissage conclu depuis le 1er mars 2025, la rémunération est exonérée de cotisations salariales jusqu'à ${L.exemptionThreshold} brut par mois.`,
    },
    {
      question: "Quand le salaire de l'apprenti augmente-t-il avec l'âge ?",
      answer:
        "La revalorisation liée à l'âge prend effet le premier jour du mois suivant l'anniversaire, et non le jour même de l'anniversaire.",
    },
    {
      question: "Le salaire augmente-t-il à chaque année de contrat ?",
      answer:
        "En apprentissage, oui : le pourcentage applicable augmente à chaque date anniversaire du contrat, sauf pour les apprentis de 26 ans et plus, déjà au minimum de 100 % du SMIC. En contrat de professionnalisation, il n'y a pas de progression automatique par année.",
    },
    {
      question: "Quelle est la rémunération en contrat de professionnalisation ?",
      answer: `Moins de 21 ans : 55 % du SMIC (${L.proUnder21Base}), ou 65 % (${L.proUnder21Bac}) avec un bac professionnel ou un titre équivalent. De 21 à 25 ans : 70 % (${L.pro2125Base}) ou 80 % (${L.pro2125Bac}). À 26 ans et plus : au moins le SMIC (${L.pro26}), ou 85 % du salaire minimum conventionnel si ce montant est plus favorable.`,
    },
    {
      question: "Quelle est la différence de paie entre apprentissage et professionnalisation ?",
      answer:
        "Les grilles de minima sont différentes, et le régime social et fiscal aussi. L'apprentissage bénéficie d'une exonération de cotisations salariales et d'une exonération d'impôt sur le revenu, ce qui n'est pas le cas du contrat de professionnalisation.",
    },
    {
      question: "Un apprenti paie-t-il des impôts ?",
      answer: `Le salaire d'apprenti est exonéré d'impôt sur le revenu dans la limite du SMIC annuel, soit ${L.incomeTaxLimit2025} pour les revenus 2025 déclarés en 2026. Seule la part annuelle supérieure à cette limite est imposable.`,
    },
    {
      question: "Que devient la rémunération lors d'un nouveau contrat d'apprentissage ?",
      answer:
        "Si le diplôme ou le titre précédent a été obtenu, la rémunération reste au moins égale à celle de la dernière année du contrat précédent. Avec un autre employeur, le maintien conventionnel suppose la même convention collective ; sinon, le plancher réglementaire s'applique. Le barème lié à l'âge s'applique s'il est plus favorable. Ce mécanisme est distinct de la majoration de 15 points.",
    },
    {
      question: "Dans quels cas le salaire d'un apprenti peut-il être majoré de 15 points ?",
      answer:
        "Lorsque le contrat dure un an au plus, prépare un diplôme ou titre de même niveau que celui déjà obtenu, et vise une qualification en rapport direct avec la précédente. Il s'agit de +15 points du pourcentage réglementaire, pas de +15 %.",
    },
    {
      question: "Quelle rémunération pour une licence professionnelle en un an ?",
      answer: `La rémunération correspond à celle de la 2e année d'apprentissage. Pour un apprenti de 21 à 25 ans, le minimum est donc de ${L.y2_21} brut par mois. Cette règle vise la licence professionnelle préparée en un an et ne s'étend pas d'office aux autres formations.`,
    },
    {
      question: "Une convention collective peut-elle prévoir un salaire d'alternant plus élevé ?",
      answer:
        "Oui. La grille légale est un plancher. Si la convention collective ou un accord de branche prévoit une rémunération supérieure, c'est cette disposition plus favorable qui s'applique.",
    },
    {
      question: "Le temps passé en formation est-il rémunéré ?",
      answer:
        "Oui. Le temps passé en centre de formation fait partie du temps de travail effectif et est rémunéré dans les mêmes conditions que le temps passé en entreprise.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le minimum dépend du contrat, de l'âge et, en apprentissage, de l'année d'exécution.",
      "En apprentissage, le changement de tranche d'âge prend effet le premier jour du mois suivant l'anniversaire ; en professionnalisation, le passage à 26 ans en cours de contrat n'augmente pas la rémunération.",
      "Les exonérations sociales et fiscales de l'apprentissage ne s'appliquent pas au contrat de professionnalisation.",
      "Un minimum conventionnel plus favorable prime toujours sur la grille légale.",
    ],
    closingText:
      "Les montants de cette page suivent le SMIC en vigueur : consultez la page dédiée pour la référence à jour.",
    closingCta: {
      label: "Voir les montants du SMIC",
      href: SMIC_HREF,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description:
        "Estimez un salaire net à partir du brut. Cas général : les exonérations propres à l'apprentissage ne sont pas modélisées.",
      href: "/",
    },
    relatedGuides: [
      { title: "Montants du SMIC", href: SMIC_HREF },
      { title: "Différence brut / net", href: BRUT_NET_EXPLIQUE_HREF },
      { title: "Lire une fiche de paie", href: LIRE_FICHE_PAIE_HREF },
      { title: "Salaire moyen en France", href: SALAIRE_MOYEN_HREF },
    ],
  },
};
