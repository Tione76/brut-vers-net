import type { Guide } from "../types";
import {
  THIRTEENTH_ANNUAL_FIXED_GROSS,
  THIRTEENTH_BREADCRUMB,
  THIRTEENTH_H1,
  THIRTEENTH_META_DESCRIPTION,
  THIRTEENTH_MONTHLY_BASE_GROSS,
  THIRTEENTH_PART_TIME_BASE_GROSS,
  THIRTEENTH_PATH,
  THIRTEENTH_PRORATA_DENOM_A,
  THIRTEENTH_PRORATA_DENOM_B,
  THIRTEENTH_PRORATA_FULL_A,
  THIRTEENTH_PRORATA_FULL_B,
  THIRTEENTH_PRORATA_MONTHS_A,
  THIRTEENTH_PRORATA_MONTHS_B,
  THIRTEENTH_PUBLISHED_AT,
  THIRTEENTH_SEO_TITLE,
  THIRTEENTH_SLUG,
  THIRTEENTH_SOURCES as S,
  THIRTEENTH_SOURCES_CHECKED_ON_LABEL,
  THIRTEENTH_SUBTITLE,
  THIRTEENTH_UPDATED_AT,
  equalInstallmentGross,
  formatThirteenthEuroReadable,
  offerComparisonRows,
  prorataThirteenthGross,
  thirteenthBaseExampleRows,
} from "@/site/13eme-mois";

const HOME = "/";
const SMIC_HREF = "/smic";
const CALCULER_NET = "/guides/comment-calculer-son-salaire-net";
const FICHE_PAIE = "/guides/comment-lire-une-fiche-de-paie";
const TEMPS_PARTIEL = "/salaire-temps-partiel";
const SOLDE = "/solde-de-tout-compte";
const PRIME_NOEL = "/prime-de-noel";

const MONTHLY = THIRTEENTH_MONTHLY_BASE_GROSS;
const ANNUAL_FIXED = THIRTEENTH_ANNUAL_FIXED_GROSS;
const INSTALLMENT = equalInstallmentGross(ANNUAL_FIXED, 13);
const PRORATA_A = prorataThirteenthGross(
  THIRTEENTH_PRORATA_FULL_A,
  THIRTEENTH_PRORATA_MONTHS_A,
  THIRTEENTH_PRORATA_DENOM_A,
);
const PRORATA_B = prorataThirteenthGross(
  THIRTEENTH_PRORATA_FULL_B,
  THIRTEENTH_PRORATA_MONTHS_B,
  THIRTEENTH_PRORATA_DENOM_B,
);
const PART_TIME_BASE = THIRTEENTH_PART_TIME_BASE_GROSS;
const ANNUAL_WITHOUT_PRIME = MONTHLY * 12;
const ANNUAL_WITH_PRIME = MONTHLY * 13;
const HALF_FRACTION = Math.round((MONTHLY / 2) * 100) / 100;

function euro(value: number): string {
  return `${formatThirteenthEuroReadable(value)}\u00a0€`;
}

function offerTableRows(): string[][] {
  return offerComparisonRows().map((row) => [row.label, euro(row.annualGross)]);
}

function baseExampleRows(): string[][] {
  return thirteenthBaseExampleRows().map((row) => [
    euro(row.baseGross),
    euro(row.thirteenthGross),
    euro(row.annualWithPrime),
  ]);
}

function prorataTableRows(): string[][] {
  return [
    [
      `${euro(THIRTEENTH_PRORATA_FULL_A)} brut`,
      `${THIRTEENTH_PRORATA_MONTHS_A} mois sur ${THIRTEENTH_PRORATA_DENOM_A}`,
      `${euro(PRORATA_A)} brut`,
    ],
    [
      `${euro(THIRTEENTH_PRORATA_FULL_B)} brut`,
      `${THIRTEENTH_PRORATA_MONTHS_B} mois sur ${THIRTEENTH_PRORATA_DENOM_B}`,
      `${euro(PRORATA_B)} brut`,
    ],
  ];
}

/**
 * Guide durable sur le 13ᵉ mois (secteur privé).
 * URL : /13eme-mois
 */
export const thirteenthMonthGuide: Guide = {
  slug: THIRTEENTH_SLUG,
  publicPath: THIRTEENTH_PATH,
  breadcrumbLabel: THIRTEENTH_BREADCRUMB,
  title: THIRTEENTH_H1,
  seoTitle: THIRTEENTH_SEO_TITLE,
  description: THIRTEENTH_META_DESCRIPTION,
  subtitle: THIRTEENTH_SUBTITLE,
  publishedAt: THIRTEENTH_PUBLISHED_AT,
  updatedAt: THIRTEENTH_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le 13ᵉ mois",
  introduction: [
    "Recevoir un mois de salaire supplémentaire est une bonne nouvelle. Encore faut-il savoir ce que votre employeur appelle « 13ᵉ mois ». Selon votre contrat, il peut s'agir d'une prime qui s'ajoute aux douze salaires habituels ou d'une partie du salaire annuel, payée à un autre moment. Ce guide concerne les salariés du secteur privé en France.",
  ],
  quickSummary: {
    title: "Le 13ᵉ mois en trois repères",
    variant: "reperes",
    items: [
      {
        rate: "1",
        title: "Est-il obligatoire ?",
        description: "Pas dans toutes les entreprises",
        details: [
          "Il peut être prévu par votre contrat, un accord collectif ou un usage d'entreprise.",
        ],
      },
      {
        rate: "2",
        title: "Quel montant ?",
        description: "Un mois de salaire, si la règle le prévoit",
        details: [
          `Exemple : ${euro(MONTHLY)} brut pour une année complète si la prime correspond à un mois de salaire de base.`,
        ],
      },
      {
        rate: "3",
        title: "Et si vous partez ?",
        description: "Le prorata n'est pas automatique",
        details: [
          "Les règles diffèrent entre un salaire annuel payé en treize fois et une prime assortie de conditions.",
        ],
      },
    ],
  },
  sections: [
    {
      id: "droit-au-13eme-mois",
      title: "Comment savoir si vous avez droit au 13ᵉ mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "La loi n'impose pas un 13ᵉ mois à tous les salariés. En revanche, votre employeur doit le verser lorsqu'il y est tenu et que vous remplissez les conditions prévues.",
        },
        {
          type: "paragraph",
          text: "Commencez par lire votre contrat et ses avenants. Recherchez les expressions « treizième mois », « prime annuelle », « prime de fin d'année » ou « salaire versé sur treize mois ».",
        },
        {
          type: "paragraph",
          text: "Si vous ne trouvez rien, vérifiez les autres documents de l'entreprise :",
        },
        {
          type: "list",
          items: [
            "La convention collective ou un accord collectif peut prévoir une prime et préciser qui en bénéficie.",
            "Une décision de l'employeur, par exemple une note annonçant l'attribution d'un 13ᵉ mois, peut également l'engager.",
            "Un usage d'entreprise peut rendre le versement obligatoire, même sans clause dans votre contrat.",
          ],
        },
        {
          type: "paragraph",
          text: "Un usage correspond à un avantage accordé régulièrement, à tous les salariés ou à une catégorie d'entre eux, selon un montant ou une méthode de calcul suffisamment précis. Le simple fait d'avoir reçu une prime occasionnelle ne suffit donc pas à établir un droit pour les années suivantes.",
        },
      ],
      subsections: [
        {
          id: "suppression-usage",
          title:
            "L'employeur peut-il supprimer un 13ᵉ mois devenu un usage ?",
          blocks: [
            {
              type: "internal-link",
              variant: "guide",
              intro:
                "Il ne peut pas simplement arrêter de le verser sans respecter les règles. Pour",
              label: "mettre fin à un usage",
              href: S.servicePublicUsage.href,
              outro:
                ", il doit notamment informer individuellement les salariés concernés, informer le CSE lorsqu'il existe et respecter un délai de prévenance suffisant. Cette procédure concerne l'usage : elle ne suffit pas à supprimer un droit inscrit dans votre contrat.",
            },
          ],
        },
      ],
      closingBlocks: [
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "L'intitulé de votre convention collective figure normalement sur votre bulletin de paie lorsqu'une convention s'applique. Le",
          label: "Code du travail numérique",
          href: S.codeTravailNumerique.href,
          outro: " peut vous aider à retrouver ses dispositions.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Vous ne trouvez toujours pas ? Demandez au service paie quel document prévoit le 13ᵉ mois et quelles conditions vous devez remplir, notamment en matière d'ancienneté.",
          ],
        },
      ],
    },
    {
      id: "salaire-sur-13-mois",
      title:
        "Un salaire sur 13 mois signifie-t-il un mois de salaire en plus ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pas nécessairement : tout dépend du montant annoncé au départ. Un salaire annuel réparti en treize versements n'augmente pas du seul fait de ce calendrier.",
        },
      ],
      subsections: [
        {
          id: "offre-30000-en-treize-fois",
          title: `Votre offre annonce ${euro(ANNUAL_FIXED)} brut par an, versés en treize fois`,
          blocks: [
            {
              type: "paragraph",
              text: `Vous percevez au total ${euro(ANNUAL_FIXED)} brut sur l'année. Si les treize parts sont égales, chacune représente environ ${euro(INSTALLMENT)} brut.`,
            },
            {
              type: "paragraph",
              text: `Le versement supplémentaire est déjà compris dans les ${euro(ANNUAL_FIXED)}. Il ne vient pas s'y ajouter.`,
            },
          ],
        },
        {
          id: "contrat-mensuel-plus-prime",
          title: `Votre contrat prévoit ${euro(MONTHLY)} brut par mois, plus un 13ᵉ mois`,
          blocks: [
            {
              type: "paragraph",
              text: `Les douze salaires représentent ${euro(ANNUAL_WITHOUT_PRIME)} brut. Si vous avez droit à une prime supplémentaire de ${euro(MONTHLY)} brut, votre rémunération annuelle atteint ${euro(ANNUAL_WITH_PRIME)} brut.`,
            },
            {
              type: "table",
              headers: ["Ce qui est annoncé", "Total annuel brut"],
              rows: offerTableRows(),
              numeric: true,
              stackOnMobile: true,
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Pour comparer deux offres, regardez d'abord le total annuel brut garanti. Vérifiez ensuite si les primes sont incluses dans ce total et si leur versement dépend de conditions particulières.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "comment-calculer",
      title: "Comment calculer votre 13ᵉ mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si votre prime correspond à un mois de salaire de base, le calcul est simple : vous reprenez le salaire brut désigné dans votre contrat ou dans l'accord qui prévoit la prime.",
        },
        {
          type: "paragraph",
          text: "Mais ce salaire n'est pas forcément celui du dernier bulletin. L'entreprise peut, par exemple, retenir le salaire de décembre, une moyenne sur l'année ou certains éléments de rémunération.",
        },
        {
          type: "paragraph",
          text: "Avant de calculer, vérifiez trois points :",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Quel salaire sert de base ? Le salaire de base seul ou une rémunération comprenant d'autres éléments ?",
            "Quelle période est prise en compte ? Par exemple, l'année civile du 1er janvier au 31 décembre.",
            "Le montant doit-il être réduit ? Une arrivée en cours d'année, un départ ou certaines absences peuvent avoir un effet selon les règles prévues.",
          ],
        },
        {
          type: "paragraph",
          text: "Les exemples suivants supposent une année complète et une prime égale à un mois de salaire de base, sans autre ajustement.",
        },
        {
          type: "table",
          headers: [
            "Salaire mensuel de base brut",
            "13ᵉ mois brut",
            "Total annuel brut, prime comprise",
          ],
          rows: baseExampleRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Vous avez reçu une augmentation pendant l'année ? Ne choisissez pas automatiquement votre nouveau salaire comme base. Vérifiez si la prime repose sur un mois précis ou sur une moyenne.",
        },
        {
          type: "paragraph",
          text: "De même, les commissions, les heures supplémentaires et les primes d'ancienneté ne sont pas systématiquement incluses. Leur prise en compte dépend du calcul prévu pour votre 13ᵉ mois.",
        },
      ],
    },
    {
      id: "prorata",
      title:
        "Vous êtes arrivé en cours d'année : comment calculer le prorata ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prorata consiste à ne verser qu'une partie de la prime, proportionnelle à la durée retenue pour son calcul. Il faut toutefois que les conditions du 13ᵉ mois vous donnent droit à cette part.",
        },
        {
          type: "paragraph",
          text: `Prenons un exemple : vous êtes arrivé le 1er juillet, votre prime complète est de ${euro(THIRTEENTH_PRORATA_FULL_A)} brut et l'entreprise prévoit un calcul par mois de présence sur l'année civile. Vous remplissez les autres conditions.`,
        },
        {
          type: "paragraph",
          text: "Six mois sont alors retenus sur douze :",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `${euro(THIRTEENTH_PRORATA_FULL_A)} × ${THIRTEENTH_PRORATA_MONTHS_A} ÷ ${THIRTEENTH_PRORATA_DENOM_A} =`,
            `${euro(PRORATA_A)} brut`,
          ],
        },
        {
          type: "table",
          headers: [
            "Prime pour une année complète",
            "Durée retenue",
            "Prime calculée",
          ],
          rows: prorataTableRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Ces calculs utilisent des mois parce que l'exemple le prévoit. Votre entreprise peut retenir des jours ou une autre période. Une condition d'ancienneté peut également empêcher le versement, même si vous avez travaillé une partie de l'année.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "La bonne question à poser est donc : « Ai-je droit à une partie de la prime cette année et, si oui, comment est-elle calculée ? »",
          ],
        },
      ],
    },
    {
      id: "brut-en-net",
      title: "13ᵉ mois brut en net : combien arrive sur votre compte ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le montant versé sera inférieur au brut annoncé. Comme le salaire habituel, le 13ᵉ mois supporte des cotisations salariales. Le prélèvement à la source peut ensuite réduire la somme reçue.",
        },
        {
          type: "paragraph",
          text: `Par exemple, un 13ᵉ mois de ${euro(MONTHLY)} brut ne signifie pas un virement supplémentaire de ${euro(MONTHLY)}.`,
        },
        {
          type: "paragraph",
          text: "Sur le bulletin, distinguez :",
        },
        {
          type: "list",
          items: [
            "Le brut, avant déduction des cotisations salariales.",
            "Le net avant impôt, après ces cotisations.",
            "Le net imposable, utilisé pour calculer le prélèvement à la source et qui peut différer du net avant impôt.",
            "Le net payé, qui correspond à la somme versée après les retenues du bulletin.",
          ],
        },
      ],
      subsections: [
        {
          id: "obtenir-estimation",
          title: "Comment obtenir une estimation ?",
          blocks: [
            {
              type: "internal-link",
              variant: "calculator",
              intro: "Utilisez notre",
              label: "calculateur de salaire brut en net",
              href: HOME,
              outro:
                " pour estimer votre rémunération avec et sans le 13ᵉ mois.",
            },
            {
              type: "paragraph",
              text: `Prenons un salaire de ${euro(MONTHLY)} brut par mois, auquel s'ajoute un 13ᵉ mois de ${euro(MONTHLY)} brut :`,
            },
            {
              type: "list",
              ordered: true,
              items: [
                `Faites une première estimation avec ${euro(ANNUAL_WITHOUT_PRIME)} brut par an, sans la prime.`,
                `Recommencez avec ${euro(ANNUAL_WITH_PRIME)} brut par an, prime comprise.`,
                "Gardez les mêmes paramètres et comparez les deux montants de salaire net annuel.",
              ],
            },
            {
              type: "paragraph",
              text: "La différence donne une estimation du supplément net annuel apporté par le 13ᵉ mois, pas le montant exact qui apparaîtra sur le bulletin du mois de versement. Le montant réellement versé dépend des cotisations, des autres retenues et de votre prélèvement à la source. Pour connaître précisément votre prochain virement, demandez une estimation au service paie.",
            },
          ],
        },
      ],
    },
    {
      id: "date-paiement",
      title: "À quelle date le 13ᵉ mois est-il payé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de date de versement commune à toutes les entreprises. Le calendrier est celui prévu par votre contrat, l'accord collectif ou les autres règles qui rendent la prime obligatoire.",
        },
        {
          type: "paragraph",
          text: "Le paiement peut notamment intervenir :",
        },
        {
          type: "list",
          items: [
            "en une fois, souvent en fin d'année ;",
            "en deux parties, par exemple en milieu et en fin d'année ;",
            "sous forme de versements répartis sur l'année.",
          ],
        },
        {
          type: "paragraph",
          text: `Si votre prime de ${euro(MONTHLY)} brut est payée en deux parts égales, chaque part représente ${euro(HALF_FRACTION)} brut. Recevoir ${euro(HALF_FRACTION)} en décembre n'indique donc pas forcément une erreur : une première moitié peut déjà avoir été versée.`,
        },
        {
          type: "paragraph",
          text: "Vérifiez également la période que rémunère la prime. Une somme payée en décembre n'est pas nécessairement calculée sur les douze mois de l'année civile.",
        },
      ],
    },
    {
      id: "depart",
      title: "Avez-vous droit au 13ᵉ mois si vous quittez l'entreprise ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vous pouvez avoir droit à une partie du 13ᵉ mois même si vous quittez l'entreprise avant son versement. Cela dépend de ce que prévoit votre contrat et des conditions attachées à la prime.",
        },
      ],
      subsections: [
        {
          id: "depart-salaire-annuel",
          title: "Il s'agit d'une partie de votre salaire annuel",
          blocks: [
            {
              type: "paragraph",
              text: "Votre contrat fixe une rémunération annuelle, simplement payée en treize fois. Le versement supplémentaire correspond alors à une partie de ce salaire.",
            },
            {
              type: "paragraph",
              text: "Dans un arrêt du 28 octobre 2009, la Cour de cassation a censuré le refus d'un prorata à un salarié dont la rémunération annuelle était fixée à treize fois le salaire mensuel. Son absence au 31 décembre ne suffisait pas à écarter sa demande.",
            },
            {
              type: "paragraph",
              text: "Il faut donc vérifier la rémunération acquise pendant la période travaillée et les sommes déjà payées.",
            },
          ],
        },
        {
          id: "depart-prime-conditions",
          title: "Il s'agit d'une prime avec ses propres conditions",
          blocks: [
            {
              type: "paragraph",
              text: "Le droit à une partie de la prime au départ n'est pas automatique. Certaines règles prévoient un prorata ; d'autres imposent une présence à une date déterminée.",
            },
            {
              type: "paragraph",
              text: "La Cour de cassation a notamment rappelé, le 5 mars 1993, que le paiement au prorata d'une prime de treizième mois après un départ avant son versement devait reposer sur une convention ou un usage dont le salarié pouvait apporter la preuve.",
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Ne vous arrêtez pas au mot « prime » sur le bulletin. Relisez la clause complète : son contenu permet de comprendre les droits attachés à la somme.",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro:
                "Avant votre départ, demandez au service paie si un montant reste dû, sur quelle période il est calculé et quand il sera versé. Vous pourrez ensuite le comparer aux autres sommes de votre",
              label: "solde de tout compte",
              href: SOLDE,
              outro: ".",
            },
          ],
        },
      ],
    },
    {
      id: "temps-partiel-cdd-maladie",
      title: "Temps partiel, CDD, arrêt maladie : qu'est-ce qui change ?",
      subsections: [
        {
          id: "temps-partiel",
          title: "Vous travaillez à temps partiel",
          blocks: [
            {
              type: "paragraph",
              text: "Le temps partiel ne vous exclut pas, à lui seul, du 13ᵉ mois. Votre durée de travail peut en revanche influer sur son montant, en tenant compte des règles applicables. L'article L. 3123-5 encadre notamment la rémunération proportionnelle des salariés à temps partiel.",
            },
            {
              type: "paragraph",
              text: `Exemple : votre salaire à temps plein serait de ${euro(MONTHLY)} brut, mais vous travaillez à 80 % et percevez ${euro(PART_TIME_BASE)} brut. Si votre 13ᵉ mois correspond à un mois de ce salaire à temps partiel, la prime est de ${euro(PART_TIME_BASE)} brut.`,
            },
            {
              type: "paragraph",
              text: `Il ne faut pas multiplier une nouvelle fois ces ${euro(PART_TIME_BASE)} par 80 % : votre durée de travail est déjà prise en compte.`,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Notre guide du",
              label: "salaire à temps partiel",
              href: TEMPS_PARTIEL,
              outro:
                " détaille le calcul de la rémunération selon les horaires.",
            },
          ],
        },
        {
          id: "cdd",
          title: "Vous êtes en CDD",
          blocks: [
            {
              type: "paragraph",
              text: "Être en CDD ne suffit pas à vous priver du 13ᵉ mois. Les règles légales, conventionnelles et les usages applicables aux CDI s'appliquent aussi aux CDD, sauf pour les dispositions concernant la rupture du contrat. Le Code du travail prévoit également une protection en matière de rémunération à fonctions et qualification équivalentes.",
            },
            {
              type: "paragraph",
              text: "Vous devez néanmoins remplir les conditions prévues pour la prime, par exemple une ancienneté minimale. Un contrat court ne donne donc pas systématiquement droit à une fraction du 13ᵉ mois.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro:
                "Le 13ᵉ mois et l'indemnité de fin de CDD, aussi appelée indemnité de précarité, sont deux sommes différentes. Leur calcul peut toutefois être lié : lorsqu'un 13ᵉ mois est dû au titre du contrat, il entre en principe dans la rémunération brute servant à calculer l'",
              label: "indemnité de fin de contrat",
              href: S.codeL1243_8.href,
              outro: ", si vous avez droit à cette indemnité.",
            },
          ],
        },
        {
          id: "arret-maladie",
          title: "Vous avez été en arrêt maladie",
          blocks: [
            {
              type: "paragraph",
              text: "Un arrêt maladie ne fait pas automatiquement perdre le 13ᵉ mois.",
            },
            {
              type: "paragraph",
              text: "Pour comprendre une éventuelle réduction, vérifiez comment la prime est calculée : à partir de votre salaire habituel, des rémunérations effectivement versées ou d'une durée de présence définie.",
            },
            {
              type: "paragraph",
              text: "Si votre prime a diminué, demandez quelles absences ont été déduites et sur quelle règle repose cette déduction. Toutes les absences ne peuvent pas être traitées de la même façon, et certaines bénéficient de protections particulières.",
            },
          ],
        },
        {
          id: "indemnite-conges-payes",
          title: "Le 13ᵉ mois augmente-t-il l'indemnité de congés payés ?",
          blocks: [
            {
              type: "internal-link",
              variant: "guide",
              intro:
                "Pas systématiquement. Lorsqu'il rémunère toute l'année, périodes de travail et de congés comprises, le 13ᵉ mois n'est généralement pas ajouté à la rémunération servant au calcul au dixième de l'",
              label: "indemnité de congés payés",
              href: S.servicePublicCongesPayes.href,
              outro:
                ". Cela évite de rémunérer une seconde fois les mêmes périodes de congé. Son traitement peut être différent si son montant dépend uniquement des périodes travaillées.",
            },
          ],
        },
      ],
    },
    {
      id: "imposable",
      title: "Faut-il payer des impôts sur le 13ᵉ mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui : le 13ᵉ mois est une rémunération imposable. Il s'ajoute aux autres salaires pour le calcul de votre revenu imposable et supporte les cotisations ordinaires applicables.",
        },
        {
          type: "paragraph",
          text: "Sur le bulletin, son versement peut augmenter le montant du prélèvement à la source, puisque la rémunération imposable du mois est plus élevée. Cela ne signifie pas nécessairement que votre taux a changé.",
        },
        {
          type: "paragraph",
          text: "Le fait de toucher la prime en fin d'année ne lui donne pas une exonération particulière. Il ne faut pas la confondre avec d'autres dispositifs bénéficiant, sous conditions, d'un traitement spécifique.",
        },
      ],
    },
    {
      id: "smic",
      title:
        "Mon employeur peut-il me payer moins que le SMIC en compensant avec le 13ᵉ mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une prime versée en décembre ne permet pas de compenser un salaire insuffisant pendant les autres mois de l'année.",
        },
        {
          type: "paragraph",
          text: "Supposons que les éléments de votre rémunération pris en compte pour le SMIC restent sous le minimum applicable en septembre et en octobre. Votre employeur ne peut pas justifier ces écarts en expliquant que le 13ᵉ mois de décembre fera remonter votre moyenne annuelle.",
        },
        {
          type: "paragraph",
          text: "Pour un 13ᵉ mois ayant le caractère d'un complément de salaire, la prime peut toutefois être prise en compte le mois où elle est payée. Si elle est versée par acomptes mensuels, ces acomptes sont examinés chaque mois. Il ne s'agit pas de répartir après coup une prime annuelle sur les mois précédents.",
        },
        {
          type: "paragraph",
          text: "Attention : le salaire de base n'est pas toujours la seule somme retenue pour cette vérification. Les différentes primes ne suivent pas non plus toutes les mêmes règles.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "Votre convention collective peut également prévoir un minimum supérieur au SMIC, avec ses propres modalités de comparaison. Retrouvez les montants et les explications dans notre",
          label: "guide du SMIC",
          href: SMIC_HREF,
          outro: ".",
        },
      ],
    },
    {
      id: "montant-incorrect",
      title: "Le montant vous semble incorrect : que vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant de conclure à une erreur, réunissez votre contrat, les dispositions qui prévoient le 13ᵉ mois et les bulletins concernés.",
        },
        {
          type: "paragraph",
          text: "Vérifiez ensuite :",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Le salaire utilisé pour le calcul. Correspond-il à celui prévu ?",
            "La période retenue. Avez-vous travaillé toute cette période ?",
            "Les réductions éventuelles. Un prorata ou des absences ont-ils été appliqués ?",
            "Les versements déjà reçus. Une partie de la prime a-t-elle été payée plus tôt ?",
          ],
        },
        {
          type: "paragraph",
          text: "Vous pouvez demander ces explications avec ce message :",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Bonjour, pourriez-vous m'indiquer comment mon 13ᵉ mois a été calculé : salaire retenu, période prise en compte, éventuelles réductions et sommes déjà versées ? Pourriez-vous également me préciser le document qui prévoit ces règles ? Merci.",
          ],
        },
        {
          type: "paragraph",
          text: "Les représentants du personnel ou les services de renseignement en droit du travail peuvent vous orienter. Si le désaccord persiste, le conseil de prud'hommes peut trancher le litige.",
        },
        {
          type: "paragraph",
          text: "N'attendez pas pour demander conseil : l'action en paiement du salaire est soumise à une prescription de trois ans, dont le point de départ et la période couverte doivent être examinés selon la situation.",
        },
      ],
    },
  ],
  faq: [
    {
      question: "Le 13ᵉ mois correspond-il toujours au salaire de décembre ?",
      answer:
        "Non. Le calcul peut utiliser le salaire de décembre, celui d'un autre mois ou une moyenne. Vérifiez aussi si les primes, commissions et heures supplémentaires sont incluses dans le montant retenu.",
    },
    {
      question: "Un salaire annoncé sur 13 mois est-il plus avantageux ?",
      answer:
        "Pas nécessairement. Comparez d'abord les rémunérations annuelles garanties. Un salaire de 30 000 € brut par an reste de 30 000 €, qu'il soit réparti en douze ou treize versements.",
    },
    {
      question: "Vais-je recevoir une prime entière si je commence en juillet ?",
      answer:
        "Pas forcément. Une arrivée en juillet peut donner droit à une partie de la prime si les règles le prévoient. Une condition d'ancienneté ou de présence peut aussi s'appliquer. Avec un calcul sur six mois sur douze, une prime complète de 2 500 € donne 1 250 € brut.",
    },
    {
      question: "Est-ce que je perds mon 13ᵉ mois si je démissionne ?",
      answer:
        "Pas systématiquement. Il faut distinguer une partie du salaire annuel payée plus tard d'une prime assortie de conditions. Le contrat et les règles de versement permettent de déterminer si une somme reste due au départ.",
    },
    {
      question: "Comment calculer le 13ᵉ mois à 80 % ?",
      answer:
        "Si la prime correspond à un mois de votre salaire à 80 %, utilisez directement ce salaire. Par exemple, une base de 2 000 € brut donne une prime de 2 000 € brut pour une année complète, lorsque les autres conditions sont remplies.",
    },
    {
      question: "Le 13ᵉ mois est-il forcément payé en décembre ?",
      answer:
        "Non. Il peut être payé en plusieurs fractions ou à une autre date. Le calendrier dépend de ce qui est prévu dans l'entreprise.",
    },
    {
      question: "Le 13ᵉ mois et la prime de Noël sont-ils la même chose ?",
      answer:
        "La prime de Noël versée par la CAF, la MSA ou France Travail est une aide sociale. Le 13ᵉ mois est une rémunération versée par l'employeur. Une entreprise peut aussi appeler sa propre prime « prime de Noël » : il faut alors vérifier les conditions de cette prime salariale.",
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
          title: "Salaire à temps partiel",
          description: "Calculer la base avant d'estimer une prime.",
          href: TEMPS_PARTIEL,
        },
        {
          title: "Solde de tout compte",
          description: "Contrôler les sommes dues à la fin du contrat.",
          href: SOLDE,
        },
        {
          title: "Comment calculer son salaire net",
          description: "Comprendre le passage du brut au net.",
          href: CALCULER_NET,
        },
        {
          title: "SMIC",
          description: "Montants et règles du salaire minimum légal.",
          href: SMIC_HREF,
        },
        {
          title: "Prime de Noël",
          description: "Aide sociale distincte du 13ᵉ mois employeur.",
          href: PRIME_NOEL,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer les lignes utiles sur votre bulletin.",
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
        text: `Sources consultées le ${THIRTEENTH_SOURCES_CHECKED_ON_LABEL}.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.servicePublicPrimes.org} :`,
            href: S.servicePublicPrimes.href,
            label: S.servicePublicPrimes.label,
          },
          {
            text: `${S.servicePublicUsage.org} :`,
            href: S.servicePublicUsage.href,
            label: S.servicePublicUsage.label,
          },
          {
            text: `${S.cass1993.org} :`,
            href: S.cass1993.href,
            label: S.cass1993.label,
          },
          {
            text: `${S.cass2009.org} :`,
            href: S.cass2009.href,
            label: S.cass2009.label,
          },
          {
            text: `${S.codeL3123_5.org} :`,
            href: S.codeL3123_5.href,
            label: S.codeL3123_5.label,
          },
          {
            text: `${S.codeL1242Cdd.org} :`,
            href: S.codeL1242Cdd.href,
            label: S.codeL1242Cdd.label,
          },
          {
            text: `${S.codeL1243_8.org} :`,
            href: S.codeL1243_8.href,
            label: S.codeL1243_8.label,
          },
          {
            text: `${S.assembleeNationaleCddPrimes.org} :`,
            href: S.assembleeNationaleCddPrimes.href,
            label: S.assembleeNationaleCddPrimes.label,
          },
          {
            text: `${S.codeL3245_1.org} :`,
            href: S.codeL3245_1.href,
            label: S.codeL3245_1.label,
          },
          {
            text: `${S.monEntrepriseSmic.org} :`,
            href: S.monEntrepriseSmic.href,
            label: S.monEntrepriseSmic.label,
          },
          {
            text: `${S.servicePublicCongesPayes.org} :`,
            href: S.servicePublicCongesPayes.href,
            label: S.servicePublicCongesPayes.label,
          },
          {
            text: `${S.bofipPrimes.org} :`,
            href: S.bofipPrimes.href,
            label: S.bofipPrimes.label,
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
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE },
      { title: "Solde de tout compte", href: SOLDE },
      { title: "Salaire à temps partiel", href: TEMPS_PARTIEL },
      { title: "Comment calculer son salaire net", href: CALCULER_NET },
    ],
  },
};
