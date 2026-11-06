import type { Guide } from "../types";
import {
  SYNTEC_AGREEMENT as A,
  SYNTEC_BASE_HOURS_NOTE,
  SYNTEC_BREADCRUMB,
  SYNTEC_EXAMPLES as EX,
  SYNTEC_FRESHNESS_LINE,
  SYNTEC_H1,
  SYNTEC_META_DESCRIPTION,
  SYNTEC_PATH,
  SYNTEC_PUBLISHED_AT,
  SYNTEC_SEO_TITLE,
  SYNTEC_SLUG,
  SYNTEC_SMIC_CONTEXT as SMIC,
  SYNTEC_SOURCES as S,
  SYNTEC_SUBTITLE,
  SYNTEC_UPDATED_AT,
  annualReferenceCents,
  annualRetainedCents,
  etamBelowSmicPositions,
  etamTableRows,
  forfaitAnnualMinimumCents,
  forfaitMonthlyEquivalentCents,
  formatSyntecEuro,
  icTableRows,
  monthlyFloor95Cents,
  partTimeMinimumCents,
} from "@/site/grille-salaire-syntec";

const SMIC_HREF = "/smic";
const FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const CALCULER_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const HOME_HREF = "/";
const HS_HREF = "/calculateurs/salaire-heures-supplementaires";

const BELOW_SMIC = etamBelowSmicPositions().join(" et ");
const EX_LINE = formatSyntecEuro(EX.etamFullTime.monthlyGrossCents);
const EX_ANNUAL_MIN = formatSyntecEuro(EX.annualControl.monthlyMinimumCents);
const EX_ANNUAL_REF = formatSyntecEuro(
  annualReferenceCents(EX.annualControl.monthlyMinimumCents, EX.annualControl.months),
);
const EX_ANNUAL_MONTH = formatSyntecEuro(EX.annualControl.monthlyRetainedCents);
const EX_ANNUAL_TOTAL = formatSyntecEuro(
  annualRetainedCents(EX.annualControl.monthlyRetainedCents, EX.annualControl.months),
);
const EX_ANNUAL_GAP = formatSyntecEuro(
  annualReferenceCents(EX.annualControl.monthlyMinimumCents, EX.annualControl.months) -
    annualRetainedCents(EX.annualControl.monthlyRetainedCents, EX.annualControl.months),
);
const EX_FLOOR_95 = formatSyntecEuro(
  monthlyFloor95Cents(EX.annualControl.monthlyMinimumCents),
  2,
);
const EX2_FULL = formatSyntecEuro(EX.etamPartTime.monthlyGrossCents);
const EX2_PART = formatSyntecEuro(
  partTimeMinimumCents(EX.etamPartTime.monthlyGrossCents, EX.etamPartTime.ratio),
);
const EX3_BASE = formatSyntecEuro(EX.cadreForfaitJours.monthlyGrossCents);
const EX3_MONTH = formatSyntecEuro(
  forfaitMonthlyEquivalentCents(
    EX.cadreForfaitJours.monthlyGrossCents,
    EX.cadreForfaitJours.rate,
  ),
);
const EX3_YEAR = formatSyntecEuro(
  forfaitAnnualMinimumCents(
    EX.cadreForfaitJours.monthlyGrossCents,
    EX.cadreForfaitJours.rate,
  ),
);
const EX3_23_BASE = formatSyntecEuro(EX.cadreForfaitJoursPosition23.monthlyGrossCents);
const EX3_23_YEAR = formatSyntecEuro(
  forfaitAnnualMinimumCents(
    EX.cadreForfaitJoursPosition23.monthlyGrossCents,
    EX.cadreForfaitJoursPosition23.rate,
  ),
);

/**
 * Guide grille Syntec (IDCC 1486).
 * URL : /grille-salaire-syntec
 * Montants : accord du 26 juin 2024 (vérifiés sur Légifrance).
 * SMIC : importé depuis la source SMIC du projet, sans duplication de montant.
 */
export const grilleSalaireSyntecGuide: Guide = {
  slug: SYNTEC_SLUG,
  publicPath: SYNTEC_PATH,
  breadcrumbLabel: SYNTEC_BREADCRUMB,
  title: SYNTEC_H1,
  seoTitle: SYNTEC_SEO_TITLE,
  description: SYNTEC_META_DESCRIPTION,
  subtitle: SYNTEC_SUBTITLE,
  publishedAt: SYNTEC_PUBLISHED_AT,
  updatedAt: SYNTEC_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur la grille Syntec",
  faqIntro:
    "Réponses courtes sur le coefficient, ETAM et cadres, SMIC, primes et forfaits.",
  introduction: [
    "La grille Syntec fixe des minima de rémunération selon votre catégorie, votre position et votre coefficient. Retrouvez votre ligne dans les tableaux ETAM et ingénieurs/cadres, puis vérifiez les règles qui correspondent à votre temps de travail et aux éléments de votre rémunération.",
    "Ces tableaux donnent un minimum brut. Ils ne disent pas votre net, et ils ne remplacent ni le SMIC ni les garanties liées à un forfait ou à un temps partiel.",
    SYNTEC_FRESHNESS_LINE,
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Les montants de la grille sont bruts.",
      "ETAM et ingénieurs/cadres ont des classifications distinctes.",
      "Le minimum conventionnel ne remplace pas le respect du SMIC.",
      "Le temps de travail et les éléments de rémunération changent la vérification.",
    ],
  },
  sections: [
    {
      id: "grilles-minima-etam-cadres",
      title: "Grilles de salaire Syntec : les minima ETAM et cadres",
      blocks: [
        {
          type: "paragraph",
          text: `La grille affichée ici est celle de l'${A.title}. Signature : ${A.signedOnLabel}. Extension : ${A.extensionOrder}, publié au Journal officiel le ${A.extensionPublishedOnLabel}. Date d'entrée en application : ${A.effectiveFromLabel}.`,
        },
        {
          type: "paragraph",
          text: "Une grille utilisée actuellement peut provenir d'un accord signé plusieurs années auparavant. Sa date de signature ne suffit pas à déterminer si elle est toujours applicable. Il faut distinguer la signature, l'extension, la publication au Journal officiel, la date d'entrée en application et la dernière vérification éditoriale de cette page.",
        },
        {
          type: "paragraph",
          text: `Tant qu'aucun accord de salaires plus récent n'est applicable, les montants ci-dessous restent la référence de branche. ${SYNTEC_FRESHNESS_LINE}`,
        },
        {
          type: "list",
          items: [
            {
              text: "Accès rapide :",
              href: "#tableau-etam",
              label: "tableau des minima ETAM",
            },
            {
              text: "Accès rapide :",
              href: "#tableau-cadres",
              label: "tableau des minima ingénieurs et cadres",
            },
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Au moment de la vérification, aucun accord de salaires de branche postérieur au 26 juin 2024 n'a été identifié comme étendu et applicable. Un engagement à proposer une hausse lors d'une négociation n'est pas une nouvelle grille.",
          ],
        },
      ],
      subsections: [
        {
          id: "tableau-etam",
          title: "Grille Syntec ETAM : minimum brut par coefficient",
          blocks: [
            {
              type: "paragraph",
              text: `${SYNTEC_BASE_HOURS_NOTE} Les lignes marquées d'un astérisque ont un minimum conventionnel inférieur au SMIC temps plein actuel.`,
            },
            {
              type: "table",
              caption: `Grille Syntec ETAM : minimum brut mensuel par coefficient (accord du ${A.signedOnLabel}, applicable depuis le ${A.effectiveFromLabel})`,
              headers: ["Position", "Coefficient", "Minimum conventionnel brut"],
              rows: etamTableRows(),
              stackOnMobile: true,
              rowHeader: true,
              numeric: true,
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                `* Positions ${BELOW_SMIC} : le montant inscrit dans la convention reste celui du tableau. Pour un salarié à temps plein, le plancher légal à respecter est néanmoins le SMIC (${SMIC.monthlyGrossLabel} depuis le ${SMIC.effectiveFromLabel}). Le SMIC ne « remplace » pas la classification : il s'ajoute comme contrôle distinct.`,
              ],
            },
          ],
        },
        {
          id: "tableau-cadres",
          title: "Grille Syntec ingénieurs et cadres : minimum brut par coefficient",
          blocks: [
            {
              type: "paragraph",
              text: "Même base de lecture : minima bruts mensuels pour un temps plein sur la durée légale ou conventionnelle du travail.",
            },
            {
              type: "table",
              caption: `Grille Syntec ingénieurs et cadres : minimum brut mensuel par coefficient (accord du ${A.signedOnLabel}, applicable depuis le ${A.effectiveFromLabel})`,
              headers: ["Position", "Coefficient", "Minimum conventionnel brut"],
              rows: icTableRows(),
              stackOnMobile: true,
              rowHeader: true,
              numeric: true,
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Position 2.1 : la classification prévoit deux coefficients, 105 (moins de 26 ans) et 115 (26 ans au moins). Cette distinction d'âge ne résume pas tous les critères de classement de la position.",
                "Les chargés d'enquête relèvent d'une annexe spécifique : leurs minima ne sont pas ceux de ce tableau.",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour le détail du SMIC :",
              label: "SMIC : montants brut et net",
              href: SMIC_HREF,
            },
          ],
        },
      ],
    },
    {
      id: "convention-syntec-qui-concerne",
      title: "La convention Syntec : qui est concerné ?",
      blocks: [
        {
          type: "paragraph",
          text: `On parle souvent de convention Syntec ou Syntec-Cinov. L'intitulé officiel est : ${A.officialTitle}. Identifiant : IDCC ${A.idcc}.`,
        },
        {
          type: "paragraph",
          text: "Elle concerne surtout les entreprises dont l'activité principale relève des bureaux d'études techniques, des cabinets d'ingénieurs-conseils ou des sociétés de conseils. Elle n'est pas réservée aux informaticiens ni aux seuls cadres.",
        },
        {
          type: "list",
          items: [
            "Le bulletin de paie est le premier repère : intitulé de la convention, classification et coefficient.",
            "Le métier exercé seul ne détermine pas la convention applicable.",
            "Le code APE est un indice, pas une preuve suffisante dans toutes les situations.",
            "En cas de doute, confrontez le champ d'application à l'activité réelle de l'employeur, pas seulement à une confirmation orale.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer ces mentions sur un bulletin :",
          label: "Comment lire une fiche de paie",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "trouver-comprendre-coefficient",
      title: "Comment trouver et comprendre votre coefficient Syntec ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour lire la grille, distinguez ces cinq informations : la catégorie (ETAM ou ingénieur/cadre), la position, le coefficient, le salaire minimum de la grille, et le salaire réellement versé.",
        },
        {
          type: "paragraph",
          text: "Le coefficient est un nombre de classification. Ce n'est ni une somme en euros, ni un pourcentage de salaire.",
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Le coefficient 115 ne veut pas dire « 115 % du salaire minimum ». Le numéro de coefficient et le taux de garantie d'un dispositif de temps de travail (par exemple 115 %, 120 % ou 122 %) sont deux notions différentes.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Lecture simple : un ETAM en position 2.2, coefficient 310, a un minimum conventionnel de ${EX_LINE} brut mensuel selon la grille applicable depuis le ${A.effectiveFromLabel}. Son salaire réel peut être plus élevé.`,
          ],
        },
        {
          type: "list",
          items: [
            "Il n'existe pas de progression annuelle automatique commune à toute la grille.",
            "Les fonctions réellement exercées et les critères conventionnels déterminent la classification.",
            "Certaines positions tiennent aussi compte de l'âge ou de l'expérience professionnelle (exemple : position 2.1 des ingénieurs et cadres).",
            "L'ancienneté dans l'entreprise ne se confond pas avec l'expérience dans la profession, et ne crée pas à elle seule un droit automatique à un autre coefficient.",
            "Un même intitulé de métier peut correspondre à plusieurs coefficients selon les responsabilités.",
          ],
        },
      ],
    },
    {
      id: "quel-salaire-comparer",
      title: "Quel salaire faut-il comparer au minimum Syntec ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour vérifier votre rémunération, procédez en quatre étapes. Chaque contrôle a sa propre base et sa propre période : ne les fusionnez pas en une seule formule.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Minimum de classification",
              description:
                "Lire la ligne de grille qui correspond à votre catégorie, position et coefficient.",
            },
            {
              title: "Contrôle conventionnel de rémunération",
              description:
                "Vérifier la rémunération annuelle retenue et les planchers mensuels de l'article 7.1.",
            },
            {
              title: "Contrôle du SMIC",
              description:
                "Vérifier séparément le plancher légal, selon ses propres règles.",
            },
            {
              title: "Garanties du temps de travail",
              description:
                "Ajouter, le cas échéant, les seuils de la modalité missions ou du forfait jours.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Les éléments retenus pour la comparaison sont les composantes de votre rémunération que les textes autorisent à prendre en compte. On parle parfois d'assiette : ce n'est que le périmètre de cette comparaison.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Article 7.1 : le douzième de la rémunération annuelle retenue ne doit pas être inférieur au minimum hiérarchique.",
            "Chaque mois, la rémunération ne peut pas descendre sous 95 % de ce minimum, ou sous 92 % s'il existe un treizième mois.",
            "Un mois conforme au seuil de 95 % ou 92 % n'autorise pas un salaire sous le SMIC. Les mêmes primes ne sont pas automatiquement retenues pour tous les contrôles.",
          ],
        },
        {
          type: "table",
          caption: "Éléments de rémunération et comparaison au minimum Syntec (article 7.1)",
          headers: ["Élément", "Traitement", "Précision"],
          rows: [
            [
              "Salaire de base",
              "Retenu",
              "Point de départ de la vérification",
            ],
            [
              "Avantages en nature (contrat)",
              "Inclus",
              "S'ils sont évalués d'un commun accord et mentionnés au contrat",
            ],
            [
              "Treizième mois",
              "Retenu sur l'année",
              "Fait passer le plancher mensuel à 92 % du minimum",
            ],
            [
              "Assiduité, participation, intéressement",
              "Exclus",
              "Listés à l'article 7.1",
            ],
            [
              "Primes ou gratifications exceptionnelles",
              "Exclues",
              "Le caractère exceptionnel se vérifie au cas par cas",
            ],
            [
              "Frais / indemnités de déplacement",
              "Exclus",
              "Ce ne sont pas du salaire au sens du minimum",
            ],
            [
              "Heures supplémentaires ou complémentaires",
              "Exclues de cette comparaison",
              "Elles restent dues selon leurs propres règles",
            ],
            [
              "Indemnité compensatrice de congés payés",
              "Exclue",
              "Précisée à l'article 7.1",
            ],
            [
              "Prime de vacances",
              "À examiner",
              "Voir ci-dessous : inclusion et obligation sont distinctes",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: "En cas de départ en cours d'année alors que la rémunération mensuelle était inférieure au minimum hiérarchique, l'entreprise doit compléter pour atteindre au moins ce minimum sur la période de présence.",
        },
      ],
      subsections: [
        {
          id: "prime-vacances-treizieme-mois",
          title: "Prime de vacances et treizième mois",
          blocks: [
            {
              type: "paragraph",
              text: "L'article 7.1 n'exclut pas nommément la prime de vacances de la comparaison annuelle. L'absence d'une exclusion ne crée pas, à elle seule, une règle d'inclusion certaine pour toutes les situations.",
            },
            {
              type: "list",
              items: [
                "Comparaison au minimum : selon la nature réelle du versement (élément de rémunération ou gratification exceptionnelle), la prise en compte peut varier.",
                "Obligation de verser une prime de vacances : l'article 7.3 prévoit une enveloppe collective, avec des modalités de répartition qui peuvent varier.",
                "Substitution : un treizième mois ne peut pas se substituer au paiement de la prime de vacances. Cela n'empêche pas le treizième mois d'entrer dans le contrôle annuel de l'article 7.1.",
              ],
            },
            {
              type: "callout",
              variant: "vigilance",
              paragraphs: [
                "Compter un élément dans un contrôle annuel et s'acquitter d'une obligation conventionnelle distincte sont deux questions différentes.",
              ],
            },
          ],
        },
        {
          id: "grille-et-smic",
          title: "Que se passe-t-il si la grille Syntec est inférieure au SMIC ?",
          blocks: [
            {
              type: "paragraph",
              text: `La grille de branche et le SMIC évoluent à des dates différentes. Une hausse du SMIC ne réécrit pas automatiquement tous les coefficients. Depuis le ${SMIC.effectiveFromLabel}, le SMIC mensuel brut à temps plein s'élève à ${SMIC.monthlyGrossLabel}.`,
            },
            {
              type: "paragraph",
              text: `Les positions ETAM ${BELOW_SMIC} ont un minimum conventionnel inférieur à ce SMIC. Pour un salarié à temps plein concerné, le plancher légal s'impose, sans effacer la classification.`,
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Les seuils de 95 % et 92 % portent sur le minimum conventionnel. Ils n'autorisent pas un mois sous le SMIC.",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Montants et règles du SMIC :",
              label: "Consulter la page SMIC",
              href: SMIC_HREF,
            },
          ],
        },
        {
          id: "branche-et-entreprise",
          title: "Branche, entreprise et contrat",
          blocks: [
            {
              type: "paragraph",
              text: "Pour les minima hiérarchiques de branche, l'accord de salaires impose un salaire effectif au moins égal au minimum de classification. Un accord d'entreprise sur le même objet ne peut y déroger que s'il offre des garanties au moins équivalentes.",
            },
            {
              type: "paragraph",
              text: "Un contrat, un accord d'entreprise ou un engagement unilatéral peut prévoir une rémunération supérieure. Cela ne signifie pas que toute règle collective se résume à « on prend toujours la plus favorable entre loi, branche et entreprise » : le droit fixe des articulations précises selon l'objet de la règle.",
            },
          ],
        },
      ],
    },
    {
      id: "temps-partiel-heures-forfaits",
      title: "Temps partiel, heures supplémentaires et forfait jours : ce qui change",
      blocks: [
        {
          type: "paragraph",
          text: "Le même coefficient ne se lit pas de la même façon selon le temps de travail. Distinguez le temps partiel, les horaires au-delà de 35 heures, la modalité « réalisation de missions » et le forfait annuel en jours.",
        },
        {
          type: "table",
          caption: "Repères rapides selon le dispositif de temps de travail (dispositifs de branche)",
          headers: ["Situation", "Repère principal", "À vérifier en plus"],
          rows: [
            [
              "Temps plein 35 h",
              "Minimum brut mensuel de la ligne de grille",
              "Article 7.1 et SMIC",
            ],
            [
              "Temps partiel",
              "Minimum conventionnel brut mensuel proratisé",
              "SMIC proratisé",
            ],
            [
              "Modalité réalisation de missions",
              "Garantie annuelle liée au minimum conventionnel annualisé (115 %), avec vérification des autres conditions",
              "PASS, autonomie, fondement collectif applicable",
            ],
            [
              "Forfait annuel en jours",
              "Garantie annuelle de 120 % du minimum conventionnel annualisé, ou 122 % en position 2.3",
              "Éligibilité, autonomie, fondement collectif applicable",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: "Ces repères décrivent les dispositifs de branche. Un seuil de rémunération ne suffit pas, à lui seul, à rendre un forfait valable. Vérifiez aussi le fondement collectif applicable dans l'entreprise.",
        },
      ],
      subsections: [
        {
          id: "temps-partiel",
          title: "Temps partiel",
          blocks: [
            {
              type: "paragraph",
              text: `Exemple : ETAM position 3.1, minimum temps plein ${EX2_FULL} brut mensuel. À ${EX.etamPartTime.weeklyHours} h/semaine pour une référence de ${EX.etamPartTime.referenceWeeklyHours} h, le minimum conventionnel brut mensuel proratisé vaut ${EX2_FULL} × ${EX.etamPartTime.weeklyHours}/${EX.etamPartTime.referenceWeeklyHours} = ${EX2_PART}. Ce calcul ne se transpose pas au forfait jours. Vérifiez aussi le SMIC proratisé.`,
            },
          ],
        },
        {
          id: "heures-supplementaires",
          title: "Heures supplémentaires et horaires au-delà de 35 heures",
          blocks: [
            {
              type: "paragraph",
              text: "Un salaire affiché pour 39 heures ne se compare pas directement à un repère de grille construit sur 35 heures. Il faut séparer le salaire de base, le décompte des heures et leurs majorations.",
            },
            {
              type: "paragraph",
              text: "Les heures supplémentaires sont exclues de la comparaison au minimum hiérarchique de l'article 7.1. Elles restent dues selon les règles légales et conventionnelles applicables.",
            },
            {
              type: "internal-link",
              variant: "simulator",
              intro: "Pour estimer l'impact d'heures supplémentaires :",
              label: "Simulateur d'heures supplémentaires",
              href: HS_HREF,
            },
          ],
        },
        {
          id: "modalite-realisation-missions",
          title: "Modalité de réalisation de missions",
          blocks: [
            {
              type: "paragraph",
              text: "L'article 3 de l'accord du 22 juin 1999 relatif à la durée du travail prévoit une modalité dite de réalisation de missions. Elle concerne surtout des ingénieurs et cadres dont l'horaire ne peut pas être strictement prédéfini, et s'analyse comme un forfait en heures sur une base hebdomadaire.",
            },
            {
              type: "paragraph",
              text: "Les appointements englobent les variations horaires éventuellement accomplies dans une limite dont la valeur est au maximum de 10 % pour un horaire hebdomadaire de 35 heures. La rémunération mensuelle n'est pas affectée par ces variations. Travailler 38 h 30 ou 39 heures ne suffit pas, à lui seul, à démontrer que cette modalité s'applique.",
            },
            {
              type: "paragraph",
              text: "Conditions de branche à vérifier : une rémunération au moins égale au plafond de la Sécurité sociale (PASS), une rémunération annuelle au moins égale à 115 % du minimum conventionnel de la catégorie, le respect du plafond de jours prévu par le texte, et le fondement collectif applicable. Un accord d'entreprise peut préciser les conditions dans lesquelles d'autres catégories de personnel peuvent relever de ces modalités.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Texte de référence :",
              label: S.legifranceRealisationMissions.label,
              href: S.legifranceRealisationMissions.href,
            },
          ],
        },
        {
          id: "forfait-annuel-jours",
          title: "Forfait annuel en jours",
          blocks: [
            {
              type: "paragraph",
              text: "Tous les cadres ne sont pas au forfait jours. Ce dispositif n'est pas la même chose qu'un forfait en heures ni que la modalité de réalisation de missions.",
            },
            {
              type: "paragraph",
              text: "Selon l'article 4.1 de l'accord durée du travail (version en vigueur consultée), peuvent notamment y accéder les salariés relevant au minimum de la position 2.3 de la grille des cadres, ou bénéficiant d'une rémunération annuelle supérieure à deux fois le plafond annuel de la Sécurité sociale (PASS), ou mandataires sociaux, avec la plus large autonomie dans l'organisation de leur temps. Une convention individuelle écrite est requise.",
            },
            {
              type: "paragraph",
              text: "Selon l'article 4.4, la rémunération annuelle doit atteindre au moins 120 % du minimum conventionnel de la catégorie, sur la base d'un forfait de 218 jours travaillés ou du forfait défini en entreprise. Pour la position 2.3, ce seuil est porté à 122 %. Ces taux concernent ce dispositif de branche ; un accord d'entreprise peut prévoir d'autres règles dans le cadre légal.",
            },
            {
              type: "callout",
              variant: "retain",
              paragraphs: [
                `Illustration pour un cadre en position 3.1, coefficient 170, minimum grille ${EX3_BASE} : ${EX3_BASE} × 12 × 1,20 = ${EX3_YEAR} brut annuels (équivalent mensuel lissé ${EX3_MONTH}).`,
                `Pour un salarié classé en position 2.3, il faut repartir du minimum correspondant à cette position, puis appliquer la garantie prévue pour cette classification dans le dispositif de branche. Avec un minimum de ${EX3_23_BASE} : ${EX3_23_BASE} × 12 × 1,22 = ${EX3_23_YEAR} brut annuels.`,
                "Ces calculs illustrent le dispositif de branche dans les hypothèses indiquées. Ils ne valident pas tous les forfaits jours d'entreprise.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "exemples-lecture",
      title: "Exemples : comment lire la grille et vérifier les bons montants ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les exemples suivants sont fictifs. Ils illustrent une méthode pour les situations et hypothèses décrites, pas un diagnostic d'infraction. Les contrats particuliers, notamment l'apprentissage, suivent des règles spécifiques.",
        },
        {
          type: "paragraph",
          text: "Les calculs de temps partiel et de forfait jours sont détaillés dans leurs sections respectives.",
        },
        {
          type: "list",
          items: [
            {
              text: "Voir aussi :",
              href: "#temps-partiel",
              label: "exemple de prorata à temps partiel",
            },
            {
              text: "Voir aussi :",
              href: "#forfait-annuel-jours",
              label: "illustrations forfait jours",
            },
          ],
        },
      ],
      subsections: [
        {
          id: "exemple-controle-annuel",
          title: "Contrôle annuel : un mois au-dessus de 95 % peut laisser un écart",
          blocks: [
            {
              type: "paragraph",
              text: `Hypothèses : année complète, classification ETAM position 3.1 constante, temps plein. La rémunération retenue se limite ici aux douze versements mensuels.`,
            },
            {
              type: "table",
              caption: "Exemple de contrôle annuel (hypothèses indiquées)",
              headers: ["Élément", "Montant"],
              rows: [
                ["Minimum mensuel de classification", EX_ANNUAL_MIN],
                ["Référence annuelle (× 12)", EX_ANNUAL_REF],
                ["Rémunération mensuelle retenue", EX_ANNUAL_MONTH],
                ["Total sur douze mois", EX_ANNUAL_TOTAL],
                ["Écart annuel", EX_ANNUAL_GAP],
                ["Seuil mensuel de 95 %", EX_FLOOR_95],
              ],
              stackOnMobile: true,
              rowHeader: true,
              numeric: true,
            },
            {
              type: "callout",
              variant: "retain",
              paragraphs: [
                `Une rémunération mensuelle peut dépasser le seuil conventionnel de 95 % (${EX_FLOOR_95}) tout en restant insuffisante au regard du contrôle annuel.`,
                "D'autres éléments admissibles peuvent modifier le calcul. Seuls les éléments de rémunération admis par les règles conventionnelles peuvent être retenus pour compléter cette vérification. Les primes et gratifications à caractère exceptionnel sont exclues de cette comparaison.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ecart-apparent-demarches",
      title: "Votre salaire semble inférieur au minimum : que vérifier ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Vérifier la convention",
              description:
                "Intitulé et IDCC sur le bulletin, puis activité réelle de l'employeur.",
            },
            {
              title: "Identifier la classification",
              description: "Catégorie, position et coefficient réellement mentionnés.",
            },
            {
              title: "Retrouver la grille de la période",
              description: `Utilisez la grille applicable à la période concernée (ici : depuis le ${A.effectiveFromLabel}).`,
            },
            {
              title: "Identifier le temps de travail",
              description:
                "Temps plein, temps partiel, heures supplémentaires, modalité missions ou forfait jours.",
            },
            {
              title: "Rassembler les éléments de rémunération",
              description:
                "Appliquez l'article 7.1 : annuel, seuils 95 % / 92 %, inclusions et exclusions.",
            },
            {
              title: "Demander une explication documentée",
              description: "Interrogez le service paie avec vos pièces et le détail du calcul.",
            },
            {
              title: "Solliciter un interlocuteur adapté",
              description:
                "Représentant du personnel, syndicat, inspection du travail pour une information ou un contrôle, conseil de prud'hommes en cas de litige individuel.",
            },
          ],
        },
        {
          type: "checklist",
          title: "Pièces utiles",
          items: [
            "Contrat de travail et avenants",
            "Bulletins de paie de la période",
            "Classification et coefficient mentionnés",
            "Référence de l'accord ou de la grille utilisée",
            "Détail du calcul présenté par l'employeur",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "L'inspection du travail peut informer et contrôler. Un litige sur des sommes dues se discute, le cas échéant, devant le conseil de prud'hommes.",
            "Selon l'article L. 3245-1 du Code du travail, l'action en paiement du salaire se prescrit par trois ans à compter du jour où le salarié a connu ou aurait dû connaître les faits lui permettant d'agir. À compter de ce jour, la demande peut porter sur les sommes dues au titre des trois dernières années. Lorsque le contrat est rompu, la demande peut porter sur les sommes dues au titre des trois années précédant la rupture.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quelle différence entre ETAM et cadre chez Syntec ?",
      answer:
        "ETAM désigne les employés, techniciens et agents de maîtrise. Ingénieurs et cadres relèvent d'une autre grille. Chaque catégorie a ses positions, coefficients et minima. Le statut dépend des fonctions exercées, pas seulement du titre du poste.",
    },
    {
      question: "Où trouver mon coefficient sur ma fiche de paie ?",
      answer:
        "Le bulletin doit mentionner la classification professionnelle et le coefficient hiérarchique, ainsi que l'intitulé de la convention collective. Si une mention manque, demandez la précision à votre employeur et conservez la réponse écrite.",
    },
    {
      question: "Le coefficient 115 correspond-il à 115 % du salaire minimum ?",
      answer:
        "Non. Le coefficient est un numéro de classification. Un taux comme 115 %, 120 % ou 122 % appartient aux garanties de certains dispositifs de temps de travail. Ce sont deux notions différentes.",
    },
    {
      question: "Le coefficient augmente-t-il automatiquement avec l'ancienneté ?",
      answer:
        "Non, il n'existe pas de progression annuelle automatique commune à toute la grille. Les fonctions et les critères conventionnels déterminent la classification. Certaines positions tiennent compte de l'âge ou de l'expérience professionnelle, ce qui n'équivaut pas à une promotion automatique liée à la seule ancienneté dans l'entreprise.",
    },
    {
      question: "Un même métier peut-il avoir plusieurs coefficients ?",
      answer:
        "Oui. Deux postes au même intitulé peuvent être classés différemment selon les responsabilités, l'autonomie et le contenu réel des missions.",
    },
    {
      question: "La grille Syntec indique-t-elle un salaire brut ou net ?",
      answer:
        "Les minima de la grille sont bruts. Ils ne permettent pas de connaître votre net personnel.",
    },
    {
      question: "Le minimum augmente-t-il automatiquement avec le SMIC ?",
      answer:
        "Non. Quand un minimum conventionnel passe sous le SMIC, le plancher légal s'impose pour le salarié concerné, sans réécrire automatiquement toute la grille.",
    },
    {
      question: "Mon salaire doit-il augmenter lorsque la grille Syntec augmente ?",
      answer:
        "Pas automatiquement. Si votre rémunération ne respecte plus le nouveau minimum ou la garantie applicable, un rattrapage s'impose. Si elle reste supérieure et conforme, la seule hausse de grille n'oblige pas à maintenir le même écart en pourcentage. Une augmentation peut toutefois découler du contrat ou d'un autre engagement applicable.",
    },
    {
      question: "Le treizième mois compte-t-il dans la comparaison ?",
      answer:
        "Oui pour le contrôle annuel de l'article 7.1 : il entre dans la rémunération annuelle dont le douzième est comparé au minimum. Sa présence abaisse aussi le plancher mensuel conventionnel à 92 %. Cela n'autorise pas un mois sous le SMIC. Un treizième mois ne peut pas se substituer à la prime de vacances.",
    },
    {
      question: "La prime de vacances peut-elle entrer dans le minimum ?",
      answer:
        "L'article 7.1 ne l'exclut pas nommément, mais l'absence d'exclusion ne crée pas une inclusion certaine pour toutes les situations. Selon la nature réelle du versement, la prise en compte dans le contrôle annuel peut varier. L'obligation de verser une prime de vacances (article 7.3) reste une question distincte.",
    },
    {
      question: "Le forfait jours utilise-t-il la même grille ?",
      answer:
        "Oui pour lire le minimum de classification, puis non pour le contrôle final : le forfait jours de branche ajoute une garantie annuelle de 120 % du minimum conventionnel annualisé (122 % en position 2.3), sous conditions d'éligibilité et d'autonomie.",
    },
    {
      question: "Quel texte consulter si plusieurs grilles circulent ?",
      answer: `Priorisez le texte applicable à la période : aujourd'hui l'accord du ${A.signedOnLabel}, applicable depuis le ${A.effectiveFromLabel}. Méfiez-vous des tableaux non datés ou non sourcés.`,
    },
  ],
  conclusion: {
    keyPoints: [
      "Identifiez catégorie, position et coefficient, puis lisez la bonne ligne de grille.",
      "Séparez minimum conventionnel, contrôle annuel de l'article 7.1, SMIC et garanties du temps de travail.",
      "Gardez vos bulletins et demandez un calcul écrit en cas d'écart apparent.",
    ],
    closingText:
      "Avec ces étapes, vous pouvez situer votre minimum Syntec et préparer une discussion précise avec votre employeur.",
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC : montants brut et net",
          description: "Plancher légal brut et net actuellement applicables.",
          href: SMIC_HREF,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer convention, classification et coefficient.",
          href: FICHE_PAIE_HREF,
        },
        {
          title: "Comment calculer son salaire net",
          description: "Méthode pour estimer un net à partir du brut.",
          href: CALCULER_NET_HREF,
        },
        {
          title: "Calculateur brut / net",
          description: "Estimation indicative en ligne.",
          href: HOME_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Sources et méthode de vérification",
    blocks: [
      {
        type: "paragraph",
        text: `${SYNTEC_FRESHNESS_LINE} Les montants ETAM et ingénieurs/cadres repris dans les tableaux sont ceux de l'annexe à l'accord du ${A.signedOnLabel} (NOR ${A.nor}), étendu par ${A.extensionOrder} (JO du ${A.extensionPublishedOnLabel}).`,
      },
      {
        type: "paragraph",
        text: "Le SMIC utilisé pour le repère des positions ETAM 1.1 et 1.2 est le barème légal actuellement applicable (Urssaf / Service-Public). Les exemples sont des hypothèses fictives. Cette page ne couvre pas toute la convention et ne remplace pas un conseil personnalisé.",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance - accord salaires :",
        label: S.legifranceAccordSalaires.label,
        href: S.legifranceAccordSalaires.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Fédération Syntec - annexe III :",
        label: S.syntecAnnexe3.label,
        href: S.syntecAnnexe3.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Article 7.1 (rémunération) :",
        label: S.syntecRemuneration.label,
        href: S.syntecRemuneration.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Classification ingénieurs et cadres :",
        label: S.syntecClassificationIc.label,
        href: S.syntecClassificationIc.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Réalisation de missions :",
        label: S.legifranceRealisationMissions.label,
        href: S.legifranceRealisationMissions.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Forfait jours - éligibilité :",
        label: S.legifranceForfaitJoursEligibilite.label,
        href: S.legifranceForfaitJoursEligibilite.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Forfait jours - rémunération :",
        label: S.legifranceForfaitJours.label,
        href: S.legifranceForfaitJours.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: S.cdtnMinimum.label,
        href: S.cdtnMinimum.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Urssaf - SMIC :",
        label: S.urssafSmic.label,
        href: S.urssafSmic.href,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Prescription des salaires :",
        label: S.prescriptionSalaire.label,
        href: S.prescriptionSalaire.href,
      },
    ],
  },
  bibliographyPlacement: "after-conclusion",
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez un net indicatif à partir d'un brut.",
      href: HOME_HREF,
    },
    relatedGuides: [
      { title: "SMIC : montants brut et net", href: SMIC_HREF },
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE_HREF },
      {
        title: "Comment calculer son salaire net",
        href: CALCULER_NET_HREF,
      },
    ],
  },
};
