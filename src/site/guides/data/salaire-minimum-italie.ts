import type { Guide } from "../types";
import {
  IT_COMMERCE_CNEL,
  IT_COMMERCE_FROM_LABEL,
  IT_COMMERCE_MONTHS,
  IT_COMMERCE_NAME,
  IT_COMMERCE_SIGNATORIES,
  IT_COMPARE_FR_FROM_LABEL,
  IT_DOMESTIC_FROM_LABEL,
  IT_DOMESTIC_NAME,
  IT_DOMESTIC_SIGNATORIES,
  IT_METAL_CNEL,
  IT_METAL_FROM_LABEL,
  IT_METAL_MONTHS,
  IT_METAL_NAME,
  IT_METAL_SIGNATORIES,
  IT_MIN_WAGE_BREADCRUMB,
  IT_MIN_WAGE_H1,
  IT_MIN_WAGE_LABELS as L,
  IT_MIN_WAGE_META_DESCRIPTION,
  IT_MIN_WAGE_PATH,
  IT_MIN_WAGE_PUBLISHED_AT,
  IT_MIN_WAGE_SEO_TITLE,
  IT_MIN_WAGE_SLUG,
  IT_MIN_WAGE_SOURCES as S,
  IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  IT_MIN_WAGE_SUBTITLE,
  IT_MIN_WAGE_UPDATED_AT,
} from "@/site/salaire-minimum-italie";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_IT_HREF = "/smic-europe#salaire-minimum-italie";
const SMIC_HREF = "/smic";
const CH_HREF = "/salaire-minimum-suisse";

const TABLE_LEGEND =
  "Exemples de minima conventionnels : ces montants ne constituent pas un salaire minimum national et ne couvrent pas tous les CCNL.";

/**
 * Guide pays : salaire minimum italien (CCNL, minima par secteur).
 * URL canonique : /salaire-minimum-italie
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumItalieGuide: Guide = {
  slug: IT_MIN_WAGE_SLUG,
  publicPath: IT_MIN_WAGE_PATH,
  breadcrumbLabel: IT_MIN_WAGE_BREADCRUMB,
  title: IT_MIN_WAGE_H1,
  seoTitle: IT_MIN_WAGE_SEO_TITLE,
  description: IT_MIN_WAGE_META_DESCRIPTION,
  subtitle: IT_MIN_WAGE_SUBTITLE,
  publishedAt: IT_MIN_WAGE_PUBLISHED_AT,
  updatedAt: IT_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum en Italie",
  faqIntro:
    "Réponses courtes sur l'absence de SMIC national, les CCNL, les mensualités et les points à vérifier.",
  introduction: [
    `En Italie, il n'existe pas de SMIC national unique comparable au SMIC français. Les minima de rémunération reposent principalement sur les conventions collectives nationales de travail, appelées CCNL, dans le cadre des protections légales et constitutionnelles.`,
    `On parle parfois de SMIC italien : l'expression est courante, ce n'est pas le nom d'un taux légal unique. Pour connaître le minimum applicable, il faut identifier la convention, le niveau du poste et la période concernée. Voici comment les retrouver et lire des exemples de barèmes sans les confondre avec un montant valable pour tous les salariés.`,
  ],
  sections: [
    {
      id: "existe-t-il-un-smic",
      title: "Existe-t-il un SMIC en Italie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non : il n'existe pas de taux national unique, horaire ou mensuel, qui s'appliquerait à tous les salariés comme le SMIC français. Eurostat n'enregistre pas non plus de salaire minimum national comparable pour l'Italie.",
        },
        {
          type: "paragraph",
          text: "Cela ne signifie pas l'absence de protection. L'article 36 de la Constitution reconnaît le droit à une rémunération proportionnée à la quantité et à la qualité du travail, et suffisante pour assurer au travailleur et à sa famille une existence libre et digne. Ce droit n'équivaut pas à un montant légal uniforme.",
        },
        {
          type: "paragraph",
          text: "En pratique, les planchers se lisent surtout dans les CCNL. L'article 39 organise la liberté syndicale. Il ne rend pas automatiquement chaque convention obligatoire pour tous les salariés du secteur : un dépôt au CNEL n'étend pas à lui seul le texte à toute la branche.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "L'absence de SMIC national n'autorise pas n'importe quel salaire. Un minimum conventionnel, le cadre du salario giusto et, le cas échéant, un recours restent possibles.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer l'Italie parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "comment-salaire-minimum-fixe",
      title: "Comment le salaire minimum est-il fixé en Italie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le CCNL, Contratto collettivo nazionale di lavoro, est la convention collective nationale de travail. Il fixe, pour un champ d'activité, des minima, une classification des postes et souvent le nombre de mensualités.",
        },
        {
          type: "paragraph",
          text: "Le métier ou la ville ne suffisent pas à désigner la convention. Il faut regarder le secteur, l'activité réelle de l'entreprise, le champ conventionnel et la classification du poste. Deux commerces, deux ateliers ou deux hôtels peuvent relever de textes différents.",
        },
        {
          type: "list",
          items: [
            "Le CCNL applicable, identifié par son intitulé, ses signataires et, souvent, un code CNEL.",
            "Le livello, ou niveau de classification : il dépend des fonctions, de la qualification et des responsabilités, pas d'un diplôme automatiquement reconnu.",
            "Les fonctions réellement exercées, plus que le seul intitulé du contrat.",
            "Le temps plein ou partiel, et les règles de prorata du texte.",
            "L'ancienneté, les éléments fixes et les avenants du barème pour la période.",
          ],
        },
        {
          type: "paragraph",
          text: "Un employeur ne peut pas choisir n'importe quel contrat moins favorable sans limite. Depuis 2026, le traitement économique global de référence des conventions conclues par les organisations comparativement les plus représentatives sert de repère. Le détail figure plus bas, dans la section sur le salario giusto.",
        },
      ],
    },
    {
      id: "minima-par-secteur",
      title: "Quels sont les minima par secteur ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les chiffres ci-dessous sont des exemples, pas un classement national. Un salaire de base (paga base) n'est pas le total mensuel. Un minimum de grille (minimo tabellare) n'est pas un total commerce. Ces bases ne se comparent pas telles quelles.",
        },
        {
          type: "paragraph",
          text: "Le livello, ou niveau, classe le poste selon les fonctions, la qualification et les responsabilités. Un même métier n'a pas automatiquement le même niveau. Les exemples IV et VII, ou D1 et C3, illustrent deux classifications contrastées, pas le niveau de tous les vendeurs ou de tous les ouvriers.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            TABLE_LEGEND,
            "Ces exemples concernent le secteur privé et le travail domestique, pas une grille des rémunérations de la fonction publique italienne.",
          ],
        },
        {
          type: "paragraph",
          text: `${IT_COMMERCE_NAME}, code CNEL ${IT_COMMERCE_CNEL}. Signataires : ${IT_COMMERCE_SIGNATORIES}. Ce CCNL prévoit ${IT_COMMERCE_MONTHS} mensualités. Les totaux ci-dessous s'appliquent depuis le ${IT_COMMERCE_FROM_LABEL}. Une tranche suivante est prévue au 1er février 2027.`,
        },
        {
          type: "table",
          caption: `Commerce, distribution et services (Confcommercio, ${IT_COMMERCE_CNEL}), depuis le ${IT_COMMERCE_FROM_LABEL}`,
          headers: ["Niveau", "Total brut mensuel"],
          rows: [
            ["IV", L.commerceIvTotal],
            ["VII", L.commerceViiTotal],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: `Le salaire de base (paga base) n'est pas le salaire mensuel complet. Au niveau IV, le total ${L.commerceIvTotal} se compose de ${L.commerceIvBase} de salaire de base, ${L.commerceIvContingenza} d'indemnité de contingence (contingenza) et ${L.commerceTerzoElemento} de troisième élément (terzo elemento). Au niveau VII, les ${L.commerceViiTotal} comprennent ${L.commerceViiBase} de salaire de base, ${L.commerceViiExtraBase} d'élément additionnel, ${L.commerceViiContingenza} d'indemnité de contingence et ${L.commerceTerzoElemento} de troisième élément.`,
        },
        {
          type: "paragraph",
          text: `Les totaux retenus comprennent un terzo elemento de ${L.commerceTerzoElemento}. Un montant territorial différent peut s'appliquer. Source : barème FILCAMS-CGIL applicable au ${IT_COMMERCE_FROM_LABEL}.`,
        },
        {
          type: "paragraph",
          text: `${IT_METAL_NAME}, code CNEL ${IT_METAL_CNEL}. Signataires : ${IT_METAL_SIGNATORIES}. Ne pas confondre avec les conventions PME Confapi ou d'autres textes metalmeccanici. Les minima de grille (minimi tabellari) ci-dessous s'appliquent depuis le ${IT_METAL_FROM_LABEL}. Ce CCNL prévoit ${IT_METAL_MONTHS} mensualités, sans quatorzième.`,
        },
        {
          type: "table",
          caption: `Métallurgie industrielle (Federmeccanica-Assistal, ${IT_METAL_CNEL}), depuis le ${IT_METAL_FROM_LABEL}`,
          headers: ["Niveau", "Minimum de grille brut mensuel"],
          rows: [
            ["D1 (ex 2e)", L.metalD1],
            ["C3 (ex 5e)", L.metalC3],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: `Source : barème FIM-CISL applicable au ${IT_METAL_FROM_LABEL}. Un minimum de grille n'est pas le traitement économique global.`,
        },
        {
          type: "paragraph",
          text: `${IT_DOMESTIC_NAME}. Signataires : ${IT_DOMESTIC_SIGNATORIES}. Barème ministériel à compter du ${IT_DOMESTIC_FROM_LABEL}. Ce régime conventionnel est particulier : nourriture et logement, durée convenue et treizième mois suivent le CCNL, pas un équivalent industriel à temps plein.`,
        },
        {
          type: "table",
          caption: `Travail domestique, depuis le ${IT_DOMESTIC_FROM_LABEL}`,
          headers: ["Situation", "Niveau", "Brut", "Unité"],
          rows: [
            ["Vivant au domicile de l'employeur (convivente)", "A", L.domesticALiveIn, "Mensuel"],
            ["Vivant au domicile de l'employeur (convivente)", "CS", L.domesticCsLiveIn, "Mensuel"],
            ["Ne vivant pas au domicile (non convivente)", "A", L.domesticAHourly, "Horaire"],
            ["Ne vivant pas au domicile (non convivente)", "CS", L.domesticCsHourly, "Horaire"],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: `La durée ordinaire convenue reste soumise aux limites du CCNL. Les plafonds ordinaires de 54 h pour les salariés vivant au domicile et de 40 h pour les autres ne signifient pas que chaque salarié effectue cette durée. Une treizième mensualité est prévue selon les règles conventionnelles. Source : table du ministère italien du Travail, à compter du ${IT_DOMESTIC_FROM_LABEL}.`,
        },
      ],
      subsections: [
        {
          id: "quand-minima-revalorises",
          title: "Quand les minima sont-ils revalorisés ?",
          blocks: [
            {
              type: "paragraph",
              text: "Il n'existe pas de date unique de hausse d'un SMIC national italien. Chaque CCNL fixe ses échéances et, souvent, des hausses par tranches.",
            },
            {
              type: "list",
              items: [
                `Commerce Confcommercio : tranche en vigueur depuis le ${IT_COMMERCE_FROM_LABEL}, suivante prévue au 1er février 2027.`,
                `Métallurgie industrielle Federmeccanica-Assistal : minima de grille en vigueur depuis le ${IT_METAL_FROM_LABEL}, avec d'autres tranches prévues par le renouvellement.`,
                `Travail domestique : barème actualisé au ${IT_DOMESTIC_FROM_LABEL} selon la variation ISTAT.`,
              ],
            },
          ],
        },
      ],
    },
    {
      id: "trouver-ccnl",
      title: "Comment trouver le CCNL et le niveau applicables ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le bon texte ne se déduit pas du seul métier, ni de la ville. Voici cinq étapes utiles.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Lire le contrat et les documents d'embauche",
              description:
                "Le contrat, la lettre d'embauche et parfois le règlement intérieur mentionnent la convention et le livello.",
            },
            {
              title: "Repérer le nom de la convention et le niveau",
              description:
                "Notez l'intitulé exact, les signataires s'ils figurent, et le livello. Un même métier peut correspondre à plusieurs classifications.",
            },
            {
              title: "Retrouver le texte dans l'archive CNEL",
              description:
                "L'archive officielle permet de chercher le CCNL par secteur, intitulé ou code. Un dépôt n'atteste pas, à lui seul, que ce texte est le bon pour votre situation.",
            },
            {
              title: "Identifier l'accord et le barème de la période",
              description:
                "Vérifiez la date d'effet, les avenants et la tranche applicable. Une page actualisée peut encore afficher un ancien tableau.",
            },
            {
              title: "Demander confirmation si le champ ou le niveau est incertain",
              description:
                "Le service paie, un syndicat ou un professionnel compétent peuvent confirmer le champ conventionnel et la classification.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Le code CNEL, par exemple H011 ou C011, identifie un texte déposé. Tous les bulletins ne l'affichent pas. Sur une page italienne, cherchez l'intitulé du contratto, il livello, la decorrenza du barème et les tabelle retributive.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Archive officielle :",
          label: "consulter les contrats collectifs sur le site du CNEL",
          href: S.cnelArchive.href,
        },
      ],
    },
    {
      id: "treizieme-quatorzieme-mois",
      title: "Salaire mensuel, annuel, treizième et quatorzième mois",
      blocks: [
        {
          type: "paragraph",
          text: "La mensilità est un versement. La tredicesima est la treizième mensualité. La quattordicesima est la quatorzième. La RAL, retribuzione annua lorda, est la rémunération annuelle brute.",
        },
        {
          type: "paragraph",
          text: `Tous les salariés ne reçoivent pas automatiquement 14 mensualités. Le CCNL commerce présenté plus haut en prévoit ${IT_COMMERCE_MONTHS}. Le CCNL Federmeccanica-Assistal en prévoit ${IT_METAL_MONTHS}, sans quatorzième.`,
        },
        {
          type: "paragraph",
          text: `Pour illustrer le calcul, une mensualité de ${L.pedagogicalMonthly} donne ${L.pedagogicalAnnual13} sur 13 versements et ${L.pedagogicalAnnual14} sur 14 versements. Ce montant a été choisi pour l'exemple : ce n'est pas un minimum.`,
        },
        {
          type: "paragraph",
          text: `À barème constant, 13 mensualités de ${L.metalD1} représentent ${L.metalD1Annual13} brut. Ce calcul de référence ne reconstitue pas le cumul de l'année civile 2026, pendant laquelle le barème a changé. L'hypothèse est une année complète ouvrant droit à l'intégralité des mensualités supplémentaires, avec le même montant pour les versements considérés.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "La RAL n'est pas le coût employeur. Les primes variables et le TFR, trattamento di fine rapporto, se lisent à part. N'ajoutez pas le TFR au salaire mensuel ou à la RAL sans le dire.",
          ],
        },
      ],
    },
    {
      id: "salaire-horaire",
      title: "Existe-t-il un salaire minimum horaire en Italie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non : il n'existe pas de taux horaire unique valable pour tous les salariés. Certains barèmes sont mensuels, comme les minima tabellari industriels. D'autres prévoient des taux horaires, comme le travail domestique non logé.",
        },
        {
          type: "paragraph",
          text: "Pour convertir un minimum mensuel en horaire, il faut utiliser les règles et le diviseur du CCNL concerné.",
        },
        {
          type: "paragraph",
          text: "Le D.Lgs. n° 66/2003 fixe une durée normale de 40 heures par semaine, sauf disposition différente. Les conventions précisent souvent l'horaire et les majorations. Quarante heures ne sont pas la durée réelle de tous les postes.",
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Quel salaire minimum net en Italie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les barèmes cités sont bruts. Il n'existe pas de net minimum national unique. Le montant versé dépend des cotisations et de l'impôt applicables, ainsi que de la situation personnelle.",
        },
        {
          type: "paragraph",
          text: "L'INPS gère une grande partie des cotisations sociales. L'IRPEF est l'impôt sur le revenu des personnes physiques. Le système italien n'est pas celui de la France.",
        },
        {
          type: "paragraph",
          text: "Pour une simulation adaptée, réunir le CCNL, le niveau, le temps de travail, le nombre de mensualités, la commune de résidence, la situation familiale et, si possible, un bulletin récent. Le calculateur brut-net français de ce site ne calcule pas une paie italienne.",
        },
      ],
    },
    {
      id: "temps-partiel-apprentis",
      title: "Temps partiel, apprentis, jeunes et stages",
      blocks: [
        {
          type: "paragraph",
          text: `Temps partiel : le minimum mensuel se proratise en principe selon le temps de travail prévu par le CCNL. Exemple : la moitié du minimo tabellare D1 de ${L.metalD1} donne ${L.metalD1Half} brut par mois. Toutes les indemnités et tous les droits ne se proratisent pas de la même façon.`,
        },
        {
          type: "paragraph",
          text: "Apprentissage : la rémunération et la classification dépendent du dispositif, notamment du D.Lgs. n° 81/2015, et du CCNL. Il n'existe pas de barème national unique par âge. Un apprenti n'est pas un jeune salarié en contrat ordinaire.",
        },
        {
          type: "paragraph",
          text: "Stages : un stage n'est pas un contrat de travail. Les indemnités éventuelles dépendent souvent de règles régionales et du type de stage. Il n'existe pas de montant unique national de stage.",
        },
        {
          type: "paragraph",
          text: "L'âge seul n'autorise pas à payer un jeune salarié en dessous du minimum conventionnel applicable. La saisonnalité ne crée pas non plus un taux national différent.",
        },
      ],
    },
    {
      id: "salario-giusto",
      title: "Que change la réforme du « salario giusto » ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le décret-loi du 30 avril 2026 n° 62, converti par la loi du 25 juin 2026 n° 112, a introduit un chapitre sur le salario giusto, le salaire juste. Le texte applicable est la version convertie.",
        },
        {
          type: "paragraph",
          text: "La négociation collective reste le canal principal. Le traitement économique global, ou TEC, de référence est celui des CCNL conclus par les organisations comparativement les plus représentatives. Les autres conventions du même champ ne peuvent pas descendre en dessous. En l'absence de couverture, le texte renvoie au CCNL le plus proche, en tenant compte de l'activité et des caractéristiques de l'employeur, pas seulement du secteur.",
        },
        {
          type: "paragraph",
          text: "Le TEC n'est pas le seul salaire mensuel de base. Il agrège les éléments fixes et continus prévus par la convention : minima, mensualités supplémentaires, indemnités fixes et, le cas échéant, les prestations sociales conventionnelles (welfare contractuel) dues à tous. Selon l'article 7, alinéa 4-bis, les éléments discrétionnaires et variables attribués individuellement sont exclus. Un minimum de grille n'épuise donc pas le TEC.",
        },
        {
          type: "paragraph",
          text: "La loi du 26 septembre 2025 n° 144, entrée en vigueur le 18 octobre 2025, avait d'abord délégué le gouvernement. Elle n'a pas créé de taux national chiffré.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Les débats autour de 9 € par heure se rapportent notamment à la proposition de loi C.2179, qui prévoit un seuil de 9 € brut par heure. C'est un projet, pas un taux national obligatoire.",
          ],
        },
      ],
    },
    {
      id: "france-italie",
      title: "France et Italie : comment comparer une offre ?",
      blocks: [
        {
          type: "paragraph",
          text: "On ne compare pas deux SMIC nationaux. La France a un minimum légal unique, sous réserve des règles et exceptions. L'Italie a des minima conventionnels et un cadre légal, sans taux unique.",
        },
        {
          type: "table",
          caption: "Repères pour comparer une offre française et une offre italienne",
          headers: ["Point", "France", "Italie"],
          rows: [
            [
              "Plancher",
              `SMIC légal national, ${L.frHourly} brut / h et ${L.frMonthly} brut / mois depuis le ${IT_COMPARE_FR_FROM_LABEL}`,
              "Minima de CCNL, plus le cadre légal et constitutionnel",
            ],
            [
              "Durée",
              "Vérifier la base (souvent 35 h)",
              "Vérifier le CCNL et l'horaire réel, sans importer les 35 h",
            ],
            [
              "Versements",
              "Comparer le brut annuel, les primes et l'éventuelle 13e prévus par le contrat",
              "Comparer le brut annuel, 13 ou 14 mensualités selon le CCNL",
            ],
            [
              "Brut et net",
              "Cotisations et impôt français",
              "INPS, IRPEF et règles italiennes, distinctes",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: "Les salariés français ne sont pas toujours payés sur 12 mensualités : un contrat peut prévoir une 13e ou des primes. Comparez donc les montants annuels, pas seulement un mensuel isolé. Rome ou Milan n'ont pas de SMIC propre. Pour un Français qui travaille en Italie, les règles du poste se lisent indépendamment de la nationalité.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le SMIC français, distinct de tout minimum italien,",
          label: "consulter les montants officiels du SMIC",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "La Suisse, autre pays sans minimum national unique,",
          label: "a un guide distinct sur les minima cantonaux et les CCT",
          href: CH_HREF,
        },
      ],
    },
    {
      id: "verifier-offre",
      title: "Comment vérifier une offre ou une fiche de paie ?",
      blocks: [
        {
          type: "checklist",
          title: "Points à contrôler",
          items: [
            "CCNL exact : intitulé, signataires, code CNEL s'il figure.",
            "Niveau (livello) et fonctions réellement exercées.",
            "Période et date d'effet du barème.",
            "Temps de travail prévu et temps réellement effectué.",
            "Montant brut et nature des composantes (base, total fixe, indemnités).",
            "Nombre de mensualités, treizième et éventuelle quatorzième.",
            "Ancienneté et compléments prévus par le texte.",
            "Heures supplémentaires et majorations.",
            "Écart entre le brut annoncé et le montant versé.",
          ],
        },
        {
          type: "paragraph",
          text: "Mini-glossaire utile : bulletin (busta paga), brut (lordo), net (netto), niveau (livello), minimum de grille (minimo tabellare), treizième (tredicesima), quatorzième (quattordicesima), rémunération annuelle brute (RAL).",
        },
      ],
    },
    {
      id: "trop-bas",
      title: "Que faire si le salaire paraît trop bas ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Demander le détail du calcul",
              description:
                "Interrogez le service paie ou l'employeur sur le CCNL, le livello et les composantes du brut.",
            },
            {
              title: "Réunir les documents",
              description:
                "Contrat, bulletins (buste paga), horaires et éléments de classification.",
            },
            {
              title: "Faire vérifier le CCNL et le niveau",
              description:
                "Un syndicat ou un professionnel compétent peut contrôler le champ conventionnel et le barème de la période.",
            },
            {
              title: "Saisir l'inspection si besoin",
              description:
                "L'Ispettorato Nazionale del Lavoro (INL) propose une demande d'intervention. Un formulaire n'interrompt pas tous les délais et ne garantit ni inspection ni rappel.",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Services officiels italiens :",
          label: "consulter les démarches de l'inspection du travail (INL)",
          href: S.inlWorkers.href,
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum en Italie ?",
      answer:
        "Il n'existe pas de salaire minimum légal national unique. Le plancher se lit surtout dans le CCNL applicable, selon le secteur, le niveau et la période. Les exemples de cette page ne valent pas pour tous les salariés.",
    },
    {
      question: "Existe-t-il un SMIC italien ?",
      answer:
        "L'expression est courante en français, mais il n'existe pas de dispositif national unique portant ce nom. Les protections viennent des conventions, de la Constitution et du cadre légal, notamment le salario giusto.",
    },
    {
      question: "Quel est le salaire minimum par mois ?",
      answer: `Il n'y a pas de mensuel national. Exemples depuis le ${IT_COMMERCE_FROM_LABEL} : total fixe de niveau IV en commerce Confcommercio, ${L.commerceIvTotal} brut, dont ${L.commerceTerzoElemento} de terzo elemento. Un montant territorial différent peut s'appliquer. Depuis le ${IT_METAL_FROM_LABEL} : minimum de grille D1 Federmeccanica-Assistal, ${L.metalD1} brut. Ces bases ne sont pas équivalentes.`,
    },
    {
      question: "Existe-t-il un minimum horaire national ?",
      answer:
        "Non. Certains CCNL publient un mensuel, d'autres un horaire. Le travail domestique de la personne qui ne vit pas au domicile a des taux horaires propres. Pour convertir un mensuel en horaire, il faut le diviseur du CCNL.",
    },
    {
      question: "Les 9 € par heure sont-ils obligatoires ?",
      answer:
        "Non. Ce montant correspond notamment à la proposition de loi C.2179, qui prévoit un seuil de 9 € brut par heure. C'est un projet, pas un taux national en vigueur.",
    },
    {
      question: "Comment trouver le CCNL applicable ?",
      answer:
        "Lisez le contrat, repérez l'intitulé et le livello, puis cherchez le texte dans l'archive du CNEL. Vérifiez la date d'effet du barème. Un code CNEL aide à identifier le texte, il ne prouve pas à lui seul qu'il s'applique à votre cas.",
    },
    {
      question: "Pourquoi les montants varient-ils selon le secteur ?",
      answer:
        "Chaque CCNL a son champ, sa classification et son barème. L'activité de l'entreprise compte autant que le métier. Un total commerce n'est pas un minimum de grille industriel.",
    },
    {
      question: "Reçoit-on 13 ou 14 salaires en Italie ?",
      answer: `Cela dépend du CCNL. Le commerce Confcommercio présenté ici prévoit ${IT_COMMERCE_MONTHS} mensualités. La métallurgie industrielle Federmeccanica-Assistal en prévoit ${IT_METAL_MONTHS}. Tous les salariés ne reçoivent pas 14 versements.`,
    },
    {
      question: "Peut-on calculer un salaire minimum net ?",
      answer:
        "Pas un net national unique. Les barèmes sont bruts. Le montant versé dépend des cotisations et de l'impôt applicables. Le calculateur français de ce site ne s'applique pas à une paie italienne.",
    },
    {
      question: "Les apprentis et les stagiaires ont-ils les mêmes règles ?",
      answer:
        "Non. L'apprentissage suit le CCNL et le D.Lgs. n° 81/2015. Un stage n'est pas un contrat de travail ; les indemnités peuvent dépendre de règles régionales. L'âge seul ne justifie pas un salaire inférieur au minimum applicable.",
    },
    {
      question: "Existe-t-il un SMIC différent à Milan ou à Rome ?",
      answer:
        "Non. Il n'existe pas de SMIC municipal. Le minimum se lit dans le CCNL, éventuellement précisé par un accord d'entreprise ou territorial. Un salaire observé dans une ville n'est pas un plancher national.",
    },
    {
      question: "À qui s'adresser pour vérifier une rémunération ?",
      answer:
        "D'abord le service paie ou l'employeur, puis un syndicat ou un professionnel compétent. L'INL propose une demande d'intervention. Aucune de ces démarches ne garantit un rappel automatique.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Les minima se lisent surtout dans le CCNL, le niveau et la période applicables.",
      "Le métier ou la ville ne suffisent pas : secteur, champ conventionnel et classification comptent.",
      "Un minimum de grille n'est pas un total commerce, ni le traitement économique global.",
      "Comparez les offres sur une base annuelle et une durée cohérentes, 13 ou 14 mensualités selon le texte.",
    ],
    closingText:
      "Pour connaître le minimum applicable, identifiez votre CCNL, votre niveau, la période et les éléments de rémunération. Comparez ensuite les offres sur une base annuelle et une durée cohérentes.",
    closingCta: {
      label: "Comparer les salaires minimums en Europe",
      href: SMIC_EUROPE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC en Europe",
          description: "Fiche Italie et tableau européen, sans inventer un SMIC national.",
          href: SMIC_EUROPE_HREF,
        },
        {
          title: "Salaire minimum en Suisse",
          description: "Autre pays sans minimum national unique, avec des règles différentes.",
          href: CH_HREF,
        },
        {
          title: "SMIC en France",
          description: "Montants horaires et mensuels officiels du SMIC.",
          href: SMIC_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Méthodologie et sources",
    blocks: [
      {
        type: "paragraph",
        text: `Sources consultées le ${IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants sectoriels reprennent un texte signataire ou une table ministérielle, avec l'intitulé, la date d'effet et la nature du montant. En cas de divergence, le texte applicable et son avenant priment. Le SMIC français reprend Service-Public F2300.`,
      },
      {
        type: "list",
        items: [
          { text: `${S.eurostat.label}.`, href: S.eurostat.href, label: S.eurostat.org },
          {
            text: `${S.constitution36.label}.`,
            href: S.constitution36.href,
            label: S.constitution36.org,
          },
          { text: `${S.ministryCcnl.label}.`, href: S.ministryCcnl.href, label: S.ministryCcnl.org },
          { text: `${S.cnelArchive.label}.`, href: S.cnelArchive.href, label: S.cnelArchive.org },
          { text: `${S.law144.label}.`, href: S.law144.href, label: S.law144.org },
          { text: `${S.dl62.label}.`, href: S.dl62.href, label: S.dl62.org },
          { text: `${S.law112.label}.`, href: S.law112.href, label: S.law112.org },
          {
            text: `${S.coordinated112.label}.`,
            href: S.coordinated112.href,
            label: S.coordinated112.org,
          },
          { text: `${S.camera2179.label}.`, href: S.camera2179.href, label: S.camera2179.org },
          {
            text: `${S.camera2179Dossier.label}.`,
            href: S.camera2179Dossier.href,
            label: S.camera2179Dossier.org,
          },
          {
            text: `${S.commerceConfcommercio.label}.`,
            href: S.commerceConfcommercio.href,
            label: S.commerceConfcommercio.org,
          },
          {
            text: `${S.commerceFilcams.label}.`,
            href: S.commerceFilcams.href,
            label: S.commerceFilcams.org,
          },
          {
            text: `${S.commerceTerzo.label}.`,
            href: S.commerceTerzo.href,
            label: S.commerceTerzo.org,
          },
          { text: `${S.metalFim.label}.`, href: S.metalFim.href, label: S.metalFim.org },
          {
            text: `${S.domesticTable.label}.`,
            href: S.domesticTable.href,
            label: S.domesticTable.org,
          },
          {
            text: `${S.domesticCcnl.label}.`,
            href: S.domesticCcnl.href,
            label: S.domesticCcnl.org,
          },
          { text: `${S.hours66.label}.`, href: S.hours66.href, label: S.hours66.org },
          {
            text: `${S.apprenticeship81.label}.`,
            href: S.apprenticeship81.href,
            label: S.apprenticeship81.org,
          },
          { text: `${S.inlWorkers.label}.`, href: S.inlWorkers.href, label: S.inlWorkers.org },
          { text: `${S.smicFr.label}.`, href: S.smicFr.href, label: S.smicFr.org },
        ],
      },
      {
        type: "callout",
        variant: "vigilance",
        paragraphs: [
          "Cette page n'estime pas un salaire net italien personnalisé et n'inventorie pas tous les CCNL. Les exemples ne couvrent pas les autres branches ni la fonction publique.",
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français, pour une comparaison brute distincte.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Suisse", href: CH_HREF },
      { title: "Fiche Italie (Europe)", href: SMIC_EUROPE_IT_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Italie (Europe)",
      description: "Absence de minimum national et contexte européen.",
      href: SMIC_EUROPE_IT_HREF,
    },
  },
};
