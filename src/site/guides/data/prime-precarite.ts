import type { Guide } from "../types";
import {
  PRECARITE_BREADCRUMB,
  PRECARITE_H1,
  PRECARITE_META_DESCRIPTION,
  PRECARITE_PATH,
  PRECARITE_PUBLISHED_AT,
  PRECARITE_SEO_TITLE,
  PRECARITE_SLUG,
  PRECARITE_SOURCES as S,
  PRECARITE_SOURCES_CHECKED_ON_LABEL,
  PRECARITE_SUBTITLE,
  PRECARITE_UPDATED_AT,
  formatPrecariteEuroReadable,
  leaveBaseWithPrecarite,
  leaveIndemnityTenth,
  precariteGross,
  totalContractGross,
} from "@/site/prime-precarite";

const HOME = "/";
const SOLDE = "/solde-de-tout-compte";
const THIRTEENTH = "/13eme-mois";
const INTERIM = "/salaire-interim-calcul-brut-net";
const FICHE_PAIE = "/guides/comment-lire-une-fiche-de-paie";
const CONGES = "/solde-conges-payes";

const BASE_12000 = totalContractGross(2000, 6);
const PRIME_1200 = precariteGross(BASE_12000, 0.1);
const PRIME_720 = precariteGross(BASE_12000, 0.06);
const LEAVE_BASE = leaveBaseWithPrecarite(BASE_12000, PRIME_1200);
const LEAVE_1320 = leaveIndemnityTenth(LEAVE_BASE);
const TOTAL_2520 = PRIME_1200 + LEAVE_1320;

function euro(value: number): string {
  return `${formatPrecariteEuroReadable(value)}\u00a0€`;
}

/**
 * Guide durable sur la prime de précarité (indemnité de fin de CDD).
 * URL : /prime-precarite
 */
export const primePrecariteGuide: Guide = {
  slug: PRECARITE_SLUG,
  publicPath: PRECARITE_PATH,
  breadcrumbLabel: PRECARITE_BREADCRUMB,
  title: PRECARITE_H1,
  seoTitle: PRECARITE_SEO_TITLE,
  description: PRECARITE_META_DESCRIPTION,
  subtitle: PRECARITE_SUBTITLE,
  publishedAt: PRECARITE_PUBLISHED_AT,
  updatedAt: PRECARITE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur la prime de précarité",
  introduction: [],
  quickSummary: {
    title: "La prime de précarité en trois repères",
    variant: "reperes",
    items: [
      {
        rate: "1",
        title: "Combien pouvez-vous toucher ?",
        details: [
          "En principe, 10 % de la rémunération brute totale du CDD. Un taux de 6 % peut s'appliquer sous conditions ; un accord peut aussi prévoir davantage.",
        ],
      },
      {
        rate: "2",
        title: "Sur quel salaire faire le calcul ?",
        details: [
          "Sur la rémunération brute de l'ensemble du contrat, et pas seulement sur le dernier salaire.",
        ],
      },
      {
        rate: "3",
        title: "Quand est-elle versée ?",
        details: [
          "Lorsqu'elle est due, la prime est versée avec le dernier salaire, à la fin du CDD. Elle apparaît sur le bulletin correspondant.",
        ],
      },
    ],
  },
  sections: [
    {
      id: "definition",
      title: "À quoi correspond la prime de précarité ?",
      blocks: [
        {
          type: "paragraph",
          text: `La prime de précarité est une somme que l'employeur verse à la fin de certains CDD pour compenser le caractère temporaire de l'emploi. Son nom dans le Code du travail est « indemnité de fin de contrat ». Les règles présentées ici concernent les salariés du secteur privé en France. Les contractuels de la fonction publique relèvent d'un [autre dispositif](${S.servicePublicF1606.href}).`,
        },
        {
          type: "paragraph",
          text: "Le salaire rémunère votre travail. La prime s'y ajoute lorsque les conditions sont remplies. Elle ne remplace ni le dernier salaire ni le paiement des congés acquis et non pris.",
        },
        {
          type: "paragraph",
          text: `Le principe et le taux de 10 % sont fixés par l'[article L. 1243-8 du Code du travail](${S.codeL1243_8.href}).`,
        },
      ],
    },
    {
      id: "droit-prime",
      title: "Avez-vous droit à la prime à la fin de votre CDD ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vous y avez en principe droit si votre CDD arrive à son terme sans se poursuivre immédiatement en CDI chez le même employeur. Certaines situations sont toutefois exclues : le tableau ci-dessous présente les principales.",
        },
        {
          type: "paragraph",
          text: "Un CDD de remplacement peut ouvrir droit à la prime. En revanche, les contrats saisonniers et les CDD d'usage en sont en principe exclus, sauf dispositions plus favorables.",
        },
        {
          type: "table",
          headers: ["Votre situation", "Règle générale"],
          rowHeader: true,
          stackOnMobile: true,
          rows: [
            [
              "CDD arrivé au terme prévu, sans poursuite en CDI",
              "Prime due, sauf autre exception applicable",
            ],
            [
              "CDD de remplacement arrivé à son terme",
              "Prime due dans les mêmes conditions générales",
            ],
            [
              "CDD immédiatement poursuivi par un CDI chez le même employeur",
              "Pas de prime pour le CDD ainsi poursuivi",
            ],
            [
              "Refus d'un CDI pour le même emploi ou un emploi similaire, avec une rémunération au moins équivalente",
              "La prime peut être écartée si les conditions légales sont réunies",
            ],
            [
              "CDD saisonnier ou CDD d'usage",
              "Pas de prime légale en principe ; vérifier les dispositions plus favorables",
            ],
            [
              "Contrat d'apprentissage ou de professionnalisation",
              "Pas de prime légale de fin de CDD en principe ; vérifier les dispositions applicables",
            ],
            [
              "Contrat conclu avec un jeune pour une période comprise dans ses vacances scolaires ou universitaires",
              "Exception légale au versement de la prime",
            ],
            [
              "Rupture anticipée à l'initiative du salarié",
              "Pas de prime en principe, y compris pour rejoindre un CDI",
            ],
            [
              "Rupture anticipée pour faute grave du salarié ou force majeure",
              "Pas de prime légale",
            ],
            [
              "Rupture pendant la période d'essai",
              "Pas de prime légale de fin de contrat",
            ],
          ],
        },
        {
          type: "paragraph",
          text: `En cas de rupture pendant la [période d'essai](${S.codeL1242_11.href}), l'indemnité légale de fin de CDD n'est pas due, conformément à l'article L. 1242-11.`,
        },
        {
          type: "paragraph",
          text: `Ce tableau présente les situations les plus fréquentes. Certains contrats liés aux politiques de l'emploi ou à un complément de formation relèvent aussi d'exceptions. La [fiche officielle sur la prime de précarité](${S.servicePublicF803.href}) permet de vérifier le type de contrat concerné.`,
        },
      ],
      subsections: [
        {
          id: "refus-cdi",
          title: "Refuser un CDI fait-il toujours perdre la prime ?",
          blocks: [
            {
              type: "paragraph",
              text: `Non. Refuser un CDI ne fait pas perdre la prime dans tous les cas. Pour que ce refus vous prive de l'indemnité de fin de CDD, l'offre doit notamment concerner le [même emploi ou un emploi similaire](${S.codeL1243_10.href}), avec une rémunération au moins équivalente. Refuser un poste moins bien payé ou un emploi différent ne vous fait donc pas automatiquement perdre la prime.`,
            },
            {
              type: "paragraph",
              text: "Conservez la proposition écrite et comparez ses conditions à votre CDD. Les conséquences éventuelles d'un refus sur l'allocation chômage constituent une question distincte : ne confondez pas les deux mécanismes.",
            },
          ],
        },
      ],
    },
    {
      id: "calcul",
      title: "Comment calculer votre prime de précarité ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour calculer la prime, additionnez les rémunérations brutes à retenir sur le CDD, puis appliquez le taux prévu. Le calcul porte sur le contrat concerné dans son ensemble, pas seulement sur le dernier mois.",
        },
        {
          type: "formula",
          label: "Formule de calcul",
          expression: "Prime brute = rémunération brute retenue × taux applicable",
        },
      ],
      subsections: [
        {
          id: "exemple-six-mois",
          title: "Exemple : six mois à 2 000 € brut",
          blocks: [
            {
              type: "paragraph",
              text: "Vous avez travaillé six mois complets à 2 000 € brut par mois. Votre CDD ouvre droit à la prime au taux de 10 %, sans autre rémunération à ajouter à la base.",
            },
            {
              type: "example-card",
              lines: [
                `Total des salaires : 2 000 € × 6 = ${euro(BASE_12000)} brut.`,
                "Calcul de la prime : 12 000 € × 10 %.",
                `Résultat : ${euro(PRIME_1200)} brut.`,
              ],
            },
            {
              type: "paragraph",
              text: "Les éventuels congés payés restant à indemniser se calculent séparément. Les exemples du tableau supposent eux aussi des mois complets, un salaire constant et aucun autre élément de rémunération.",
            },
            {
              type: "table",
              headers: [
                "Salaire mensuel brut constant",
                "Durée retenue",
                "Total brut des salaires",
                "Prime brute à 10 %",
              ],
              numeric: true,
              stackOnMobile: true,
              rows: [
                ["1 900 €", "3 mois complets", "5 700 €", "570 €"],
                ["2 000 €", "6 mois complets", "12 000 €", "1 200 €"],
                ["2 500 €", "6 mois complets", "15 000 €", "1 500 €"],
                ["2 500 €", "12 mois complets", "30 000 €", "3 000 €"],
              ],
            },
            {
              type: "paragraph",
              text: "Si votre salaire a changé, si vous avez travaillé un mois incomplet ou reçu une prime, utilisez les montants réels concernés plutôt qu'un salaire mensuel multiplié approximativement par la durée.",
            },
          ],
        },
        {
          id: "base-retenue",
          title: "Quelles sommes faut-il retenir ?",
          blocks: [
            {
              type: "paragraph",
              text: "Pour calculer la prime, retenez les rémunérations brutes liées au CDD, notamment :",
            },
            {
              type: "list",
              items: [
                "le salaire de base ;",
                "les heures supplémentaires et leurs majorations ;",
                "les primes ayant le caractère de salaire et se rapportant au contrat, dont un éventuel 13e mois.",
              ],
            },
            {
              type: "paragraph",
              text: "N'ajoutez pas les remboursements de frais professionnels ni l'indemnité compensatrice de congés payés versée à la fin du contrat.",
            },
            {
              type: "paragraph",
              text: `Un 13e mois dû au titre du CDD peut entrer dans cette base. Vérifiez d'abord si vous y avez droit et pour quel montant : notre [guide du 13e mois](${THIRTEENTH}) explique les règles à examiner.`,
            },
            {
              type: "paragraph",
              text: "Si le contrat comporte des absences, une suspension ou des régularisations de paie, demandez le détail de la base retenue. Multiplier le salaire mensuel habituel par le nombre de mois ne suffit pas toujours à retrouver le bon montant.",
            },
          ],
        },
        {
          id: "temps-partiel",
          title: "Et si vous travaillez à temps partiel ?",
          blocks: [
            {
              type: "paragraph",
              text: "Le pourcentage s'applique à votre rémunération brute réelle. Il ne faut pas réduire une deuxième fois la prime au motif que vous êtes à temps partiel.",
            },
            {
              type: "paragraph",
              text: "Exemple : vous percevez 1 500 € brut par mois pendant six mois. La base est de 9 000 € et la prime à 10 % atteint **900 € brut**, si elle est due. Il n'y a pas de coefficient de temps partiel supplémentaire à appliquer à ces 900 €.",
            },
          ],
        },
      ],
    },
    {
      id: "taux-6-pourcent",
      title: "Pourquoi votre employeur applique-t-il 6 % au lieu de 10 % ?",
      blocks: [
        {
          type: "paragraph",
          text: `**Le taux de 6 % n'est pas un choix libre de l'employeur.** L'[article L. 1243-9](${S.codeL1243_9.href}) prévoit que le passage à 6 % doit être prévu par une convention ou un accord collectif de branche étendu, ou par un accord d'entreprise ou d'établissement, avec les contreparties prévues par la loi, notamment un accès privilégié à la formation.`,
        },
        {
          type: "paragraph",
          text: `[Le ministère du Travail](${S.ministereRemunerationCdd.href}) précise qu'une proposition individuelle d'accès à la formation doit avoir été effectivement faite au salarié. La présence d'un taux de 6 % dans votre contrat ne suffit donc pas, à elle seule, à expliquer la réduction.`,
        },
        {
          type: "paragraph",
          text: "Sur une base de 12 000 € brut :",
        },
        {
          type: "list",
          items: [
            `à 10 %, la prime représente **${euro(PRIME_1200)} brut** ;`,
            `à 6 %, elle représente **${euro(PRIME_720)} brut** ;`,
            `l'écart est de **${euro(PRIME_1200 - PRIME_720)} brut**.`,
          ],
        },
        {
          type: "paragraph",
          text: "Si votre bulletin retient 6 %, demandez quel accord s'applique et quelles contreparties ont été proposées. Un accord peut également prévoir un taux supérieur à 10 %.",
        },
      ],
    },
    {
      id: "brut-net",
      title: "Prime de précarité : quelle différence entre brut et net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le calcul à 10 % donne un montant brut. Ce n'est pas la somme qui sera directement versée sur votre compte : la prime est soumise aux cotisations et contributions sociales, ainsi qu'à l'impôt sur le revenu.",
        },
        {
          type: "paragraph",
          text: "Par exemple, une prime de 1 200 € brut ne correspond pas à 1 200 € net. Le net avant impôt dépend des retenues de votre bulletin ; le prélèvement à la source détermine ensuite le montant versé après impôt.",
        },
        {
          type: "paragraph",
          text: `Notre [calculateur de salaire brut en net](${HOME}) peut vous aider à comprendre l'écart entre brut et net. Il ne calcule pas un bulletin de fin de CDD et ne permet pas de déterminer à lui seul le net exact de cette prime.`,
        },
        {
          type: "paragraph",
          text: "Pour connaître le montant attendu, demandez au service paie une estimation distinguant le dernier salaire, la prime de précarité, les congés payés et le prélèvement à la source.",
        },
      ],
    },
    {
      id: "conges-payes",
      title: "Prime de précarité et congés payés : comment calculer les deux\u00a0?",
      blocks: [
        {
          type: "paragraph",
          text: "La prime de précarité et l'indemnité compensatrice de congés payés sont deux sommes distinctes. Vous pouvez percevoir les deux si les conditions de chacune sont remplies. Les congés payés indemnisent les droits acquis que vous n'avez pas pris et qui restent à régler à la fin du contrat.",
        },
        {
          type: "paragraph",
          text: `L'ordre du calcul est important : on calcule d'abord la prime de précarité. Cette prime est ensuite prise en compte dans la base de l'indemnité de congés payés. Le ministère du Travail le précise dans sa [fiche sur la rémunération en CDD](${S.ministereRemunerationCdd.href}).`,
        },
      ],
      subsections: [
        {
          id: "exemple-conges",
          title: "Exemple : 12 000 € de salaires et aucun congé pris",
          blocks: [
            {
              type: "paragraph",
              text: "Reprenons un CDD ayant donné lieu à 12 000 € de salaires bruts. La prime est due à 10 % et aucun congé n'a été pris ou déjà indemnisé. Voici le calcul avec la méthode du dixième ; une règle plus favorable peut conduire à un montant supérieur.",
            },
            {
              type: "steps",
              variant: "badge",
              items: [
                {
                  title: `Prime de précarité : ${euro(PRIME_1200)} brut`,
                  description: "12 000 € de salaires × 10 %.",
                },
                {
                  title: `Base de calcul des congés payés : ${euro(LEAVE_BASE)} brut`,
                  description: "12 000 € de salaires + 1 200 € de prime de précarité.",
                },
                {
                  title: `Indemnité de congés payés au dixième : ${euro(LEAVE_1320)} brut`,
                  description: "13 200 € × 10 %.",
                },
              ],
            },
            {
              type: "paragraph",
              text: `Dans cet exemple, les deux indemnités totalisent ${euro(TOTAL_2520)} brut : ${euro(PRIME_1200)} de prime de précarité et ${euro(LEAVE_1320)} de congés payés. Il s'agit d'un total brut, pas du montant net du virement.`,
            },
            {
              type: "paragraph",
              text: "Ce résultat ne s'applique pas automatiquement à chaque CDD. Si vous avez déjà pris des congés, le montant restant à indemniser sera différent. Les 12 000 € de salaires servent ici au calcul : les salaires déjà versés ne sont pas payés une seconde fois à la fin du contrat.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro:
                "Pour retrouver les autres sommes susceptibles d'apparaître sur votre dernier bulletin, consultez notre",
              label: "guide du solde de tout compte",
              href: SOLDE,
              outro: ".",
            },
          ],
        },
      ],
    },
    {
      id: "versement",
      title: "Quand la prime est-elle versée ?",
      blocks: [
        {
          type: "paragraph",
          text: "**Lorsqu'elle est due, elle est versée à l'issue du CDD avec le dernier salaire** et doit apparaître sur le bulletin correspondant. Il n'est pas nécessaire d'attendre d'avoir retrouvé un emploi pour y avoir droit.",
        },
      ],
      subsections: [
        {
          id: "renouvellement",
          title: "Votre CDD est renouvelé",
          blocks: [
            {
              type: "paragraph",
              text: "Un renouvellement prolonge le même contrat. Si la prime est due, elle est versée à la fin définitive du CDD et se calcule sur la rémunération du contrat initial et de son renouvellement.",
            },
            {
              type: "paragraph",
              text: "Deux CDD distincts ne se traitent pas comme un simple renouvellement : la prime s'apprécie à la fin de chacun, selon ses conditions et les éventuelles exclusions. Un nouveau CDD ne suffit pas, à lui seul, à supprimer la prime du précédent.",
            },
          ],
        },
        {
          id: "refus-renouvellement",
          title: "Vous refusez de renouveler votre CDD",
          blocks: [
            {
              type: "paragraph",
              text: "Refuser un nouveau CDD ou une proposition de renouvellement n'est pas la même chose que refuser un CDI répondant aux conditions légales. Ce refus ne supprime pas, à lui seul, la prime due pour le contrat qui arrive normalement à son terme.",
            },
            {
              type: "paragraph",
              text: "En revanche, quitter votre CDD avant la date prévue à votre initiative relève d'une autre situation.",
            },
          ],
        },
      ],
    },
    {
      id: "rupture-anticipee",
      title: "Que se passe-t-il si le CDD s'arrête avant la date prévue ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si votre CDD se termine plus tôt, votre droit à la prime dépend du motif de la rupture.",
        },
        {
          type: "list",
          items: [
            "**Vous partez à votre initiative**, notamment pour rejoindre un CDI : la prime de précarité n'est en principe pas due.",
            `**Vous mettez fin au contrat d'un commun accord avec l'employeur** : ce mode de [rupture d'un commun accord](${S.cdtnRuptureCommunAccord.href}) n'écarte pas, à lui seul, le droit à la prime ; vérifiez les autres conditions du contrat.`,
            "**Le contrat est rompu pour votre faute grave ou pour force majeure** : ce sont des cas légaux d'exclusion.",
            "**En cas de rupture pour inaptitude constatée par le médecin du travail** : l'inaptitude n'exclut pas, à elle seule, la prime de précarité. Une indemnité de rupture distincte peut également être due ; elle ne doit pas être confondue avec la prime.",
            `**Si l'employeur rompt le CDD en dehors des cas autorisés** : vous pouvez avoir droit à des [dommages et intérêts](${S.codeL1243_4.href}) au moins égaux aux rémunérations que vous auriez perçues jusqu'au terme du contrat, en plus de l'indemnité de fin de contrat applicable. Ces dommages et intérêts ne se calculent pas comme une simple prime de 10 %.`,
          ],
        },
        {
          type: "paragraph",
          text: "Une rupture d'un commun accord d'un CDD ne doit pas être appelée « rupture conventionnelle » au sens de la procédure applicable au CDI. Si le motif de rupture est contesté, faites examiner votre contrat et le document mettant fin au CDD avant de conclure sur les sommes dues.",
        },
      ],
    },
    {
      id: "interim",
      title: "Et en intérim : est-ce la même prime ?",
      blocks: [
        {
          type: "paragraph",
          text: "En intérim, on parle d'**indemnité de fin de mission**, ou IFM. La logique est proche, mais le contrat, l'employeur et les exceptions ne sont pas identiques à ceux d'un CDD classique.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "N'appliquez donc pas le tableau de cette page à une mission d'intérim sans vérifier ses règles. Notre",
          label: "guide du salaire en intérim",
          href: INTERIM,
          outro: " détaille l'IFM et les congés payés propres à cette situation.",
        },
      ],
    },
    {
      id: "verifier",
      title: "Votre prime manque ou vous semble trop faible : que vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Commencez par réunir votre contrat, ses avenants, vos bulletins et l'éventuelle proposition de CDI. Vérifiez ensuite :",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Le droit au versement** : type de CDD, motif et date de fin, éventuelle poursuite en CDI.",
            "**La base brute** : ensemble du contrat concerné, éléments variables et sommes déjà régularisées.",
            "**Le taux** : 10 %, 6 % justifié par le cadre collectif et ses contreparties, ou taux plus favorable.",
            "**Les sommes à distinguer sur le bulletin** : prime de précarité, congés payés et dernier salaire ne doivent pas être confondus.",
          ],
        },
        {
          type: "paragraph",
          text: "Vous pouvez demander une explication écrite au service paie, par exemple :",
        },
        {
          type: "callout",
          variant: "tip",
          heading: "Exemple de message au service paie",
          paragraphs: [
            "« Mon CDD s'est terminé le [date]. Pouvez-vous me préciser si une indemnité de fin de contrat est due et, si oui, le taux et la rémunération brute retenus pour son calcul ? Si elle n'est pas versée, merci de m'indiquer le motif applicable à ma situation. »",
          ],
        },
        {
          type: "paragraph",
          text: `Le [simulateur officiel du Code du travail numérique](${S.cdtnSimulateur.href}) permet aussi de vérifier une estimation en tenant compte des informations demandées, notamment la convention collective.`,
        },
        {
          type: "paragraph",
          text: "Si le désaccord persiste, un représentant du personnel, une organisation syndicale ou un professionnel du droit peut vous aider. Le conseil de prud'hommes tranche les litiges individuels relevant du contrat de travail privé.",
        },
        {
          type: "paragraph",
          text: `Pour réclamer une prime de précarité impayée, l'action en paiement relève en principe du [délai de trois ans](${S.codeL3245_1.href}) applicable aux créances salariales. L'indemnité de fin de CDD est qualifiée de complément de salaire par le Code du travail. Le point de départ du délai et la nature exacte de votre demande doivent toutefois être vérifiés.`,
        },
        {
          type: "paragraph",
          text: `Attention si vous avez signé un [reçu pour solde de tout compte](${S.servicePublicSoldeF86.href}) : vous disposez de six mois après la signature pour le dénoncer concernant les sommes qui y sont mentionnées. Ce délai ne doit pas être confondu avec celui d'une demande portant sur une somme absente du reçu. Si le montant est contesté, demandez conseil rapidement.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: "La prime de précarité est-elle obligatoire après un CDD de trois mois ?",
      answer:
        "En principe oui, si votre CDD ouvre droit à la prime et qu'aucune exception ne s'applique. Il n'existe pas de durée minimale générale de trois mois pour y avoir droit. Par exemple, trois mois complets à 2 000 € brut donnent une base de 6 000 € et une prime de 600 € brut au taux de 10 %.",
    },
    {
      question: "Comment calculer la prime si mon salaire a changé ?",
      answer:
        "Additionnez les rémunérations brutes concernées sur tout le contrat plutôt que de multiplier votre dernier salaire par sa durée. Avec trois mois à 2 000 € puis trois mois à 2 200 €, la base salariale est de 12 600 €. Au taux de 10 %, la prime atteint 1 260 € brut, hors autres éléments à intégrer.",
    },
    {
      question: "Une prime de précarité de 1 000 € est-elle brute ou nette ?",
      answer:
        "Le montant obtenu en appliquant le taux à votre rémunération brute est un montant brut. Une prime ainsi calculée à 1 000 € n'est donc pas une prime de 1 000 € net : les cotisations et contributions sociales sont déduites, puis le prélèvement à la source s'applique selon votre situation. Le bulletin indique les montants effectivement retenus et versés.",
    },
    {
      question: "Ai-je droit à la prime si j'accepte un CDI après mon CDD ?",
      answer:
        "Lorsque la relation de travail se poursuit immédiatement en CDI chez le même employeur, la prime de fin de CDD n'est en principe pas due pour ce CDD. Une embauche ultérieure chez un autre employeur ne doit pas être confondue avec cette poursuite ; un départ anticipé de votre CDD à votre initiative relève aussi d'une autre règle.",
    },
    {
      question: "Puis-je toucher la prime même si je refuse un renouvellement ?",
      answer:
        "Oui, ce refus ne supprime pas à lui seul le droit à la prime pour le CDD arrivé à son terme. Il faut toujours vérifier les autres conditions. La règle excluant la prime après le refus de certaines offres de CDI ne doit pas être appliquée automatiquement à un simple renouvellement de CDD.",
    },
    {
      question: "Les congés payés sont-ils compris dans les 10 % de précarité ?",
      answer:
        "Non. L'indemnité compensatrice de congés payés ne s'ajoute pas à la base de calcul de la prime de précarité. En revanche, la prime de précarité entre dans la base de calcul de l'indemnité compensatrice de congés payés. Les deux indemnités sont donc distinctes ; le montant des congés restant à indemniser dépend notamment des congés déjà pris.",
    },
    {
      question: "Un étudiant a-t-il toujours droit à la prime de précarité ?",
      answer:
        "Non. Le Code du travail prévoit une exclusion pour le contrat conclu avec un jeune sur une période comprise dans ses vacances scolaires ou universitaires. Le seul fait d'être étudiant ne permet toutefois pas de classer automatiquement tous ses CDD dans cette exception.",
    },
    {
      question: "La prime est-elle due après un CDD saisonnier ?",
      answer:
        "En principe, non au titre de l'indemnité légale de fin de CDD. Des dispositions conventionnelles plus favorables peuvent prévoir un versement. Vérifiez la nature réelle de votre contrat et la convention applicable.",
    },
    {
      question: "La prime de précarité est-elle imposable ?",
      answer:
        "Oui. L'indemnité de fin de CDD est imposable et soumise aux prélèvements sociaux applicables à ce complément de salaire. Son caractère d'indemnité ne lui donne pas l'exonération attachée à certaines autres sommes de rupture.",
    },
  ],
  conclusion: {
    title: "Pour aller plus loin",
    keyPoints: [],
    closingText: "",
    furtherReading: {
      title: "Guides liés",
      items: [
        {
          title: "Solde de tout compte",
          description: "Vérifier l'ensemble des sommes de fin de contrat.",
          href: SOLDE,
        },
        {
          title: "13ᵉ mois",
          description: "Comprendre une prime annuelle pouvant entrer dans la base.",
          href: THIRTEENTH,
        },
        {
          title: "Salaire en intérim",
          description: "Distinguer l'IFM de la prime de fin de CDD.",
          href: INTERIM,
        },
        {
          title: "Solde de congés payés",
          description: "Lire les compteurs et l'indemnité compensatrice.",
          href: CONGES,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer les lignes du dernier bulletin.",
          href: FICHE_PAIE,
        },
      ],
    },
  },
  bibliographyPlacement: "after-conclusion",
  bibliography: {
    id: "methodologie-sources",
    title: "Sources",
    blocks: [
      {
        type: "paragraph",
        text: "Ce guide présente les règles générales applicables aux CDD du secteur privé en France. Votre convention collective et les circonstances de la fin du contrat peuvent modifier les sommes dues.",
      },
      {
        type: "paragraph",
        text: `Sources consultées le ${PRECARITE_SOURCES_CHECKED_ON_LABEL}.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.codeL1243_4.label} :`,
            href: S.codeL1243_4.href,
            label: S.codeL1243_4.note,
          },
          {
            text: `${S.codeL1242_11.label} :`,
            href: S.codeL1242_11.href,
            label: S.codeL1242_11.note,
          },
          {
            text: `${S.codeL1243_8.label} :`,
            href: S.codeL1243_8.href,
            label: S.codeL1243_8.note,
          },
          {
            text: `${S.codeL1243_9.label} :`,
            href: S.codeL1243_9.href,
            label: S.codeL1243_9.note,
          },
          {
            text: `${S.codeL1243_10.label} :`,
            href: S.codeL1243_10.href,
            label: S.codeL1243_10.note,
          },
          {
            text: `${S.codeCddRupture.label} :`,
            href: S.codeCddRupture.href,
            label: S.codeCddRupture.note,
          },
          {
            text: `${S.cdtnRuptureCommunAccord.label} :`,
            href: S.cdtnRuptureCommunAccord.href,
            label: S.cdtnRuptureCommunAccord.note,
          },
          {
            text: `${S.codeL1242_16.label} :`,
            href: S.codeL1242_16.href,
            label: S.codeL1242_16.note,
          },
          {
            text: `${S.servicePublicF803.label} :`,
            href: S.servicePublicF803.href,
            label: S.servicePublicF803.note,
          },
          {
            text: `${S.servicePublicF40.label} :`,
            href: S.servicePublicF40.href,
            label: S.servicePublicF40.note,
          },
          {
            text: `${S.ministereRemunerationCdd.label} :`,
            href: S.ministereRemunerationCdd.href,
            label: S.ministereRemunerationCdd.note,
          },
          {
            text: `${S.servicePublicF24661.label} :`,
            href: S.servicePublicF24661.href,
            label: S.servicePublicF24661.note,
          },
          {
            text: `${S.urssafRuptureCdd.label} :`,
            href: S.urssafRuptureCdd.href,
            label: S.urssafRuptureCdd.note,
          },
          {
            text: `${S.codeL3245_1.label} :`,
            href: S.codeL3245_1.href,
            label: S.codeL3245_1.note,
          },
          {
            text: `${S.servicePublicPrudhommes.label} :`,
            href: S.servicePublicPrudhommes.href,
            label: S.servicePublicPrudhommes.note,
          },
          {
            text: `${S.servicePublicSoldeF86.label} :`,
            href: S.servicePublicSoldeF86.href,
            label: S.servicePublicSoldeF86.note,
          },
          {
            text: `${S.cdtnSimulateur.label} :`,
            href: S.cdtnSimulateur.href,
            label: S.cdtnSimulateur.note,
          },
        ],
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Salaire brut / net",
      description: "Estimer le net à partir d'un brut mensuel.",
      href: HOME,
    },
    relatedGuides: [
      { title: "Solde de tout compte", href: SOLDE },
      { title: "13ᵉ mois", href: THIRTEENTH },
      { title: "Salaire en intérim", href: INTERIM },
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE },
    ],
  },
};
