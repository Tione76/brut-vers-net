import type { Guide } from "../types";
import {
  formatHcrEuro,
  formatHcrHours,
  formatHcrRate,
  HCR_BASE_MONTHLY_HOURS,
  HCR_MONTHLY_OT_HOURS,
  HCR_OT_RATE_36_TO_39,
  HCR_OT_RATE_40_TO_43,
  HCR_OT_RATE_FROM_44,
  MAYOTTE_SMIC_HOURLY,
  MINIMUM_GARANTI,
} from "@/site/smic-hotelier/engine";
import {
  HCR_AVENANT_33_EXTENSION_LABEL,
  HCR_AVENANT_33_SIGNED_LABEL,
  HCR_AVENANT_36_EXTENSION_NOTICE_LABEL,
  HCR_AVENANT_36_SIGNED_LABEL,
  HCR_GRID_EFFECTIVE_FROM_LABEL,
  HCR_GRID_ROWS,
  SMIC_HOTELIER_AMOUNTS_BLOCK_TITLE,
  SMIC_HOTELIER_BREADCRUMB,
  SMIC_HOTELIER_FRESHNESS_LINE,
  SMIC_HOTELIER_H1,
  SMIC_HOTELIER_LABELS as L,
  SMIC_HOTELIER_META_DESCRIPTION,
  SMIC_HOTELIER_PATH,
  SMIC_HOTELIER_PUBLISHED_AT,
  SMIC_HOTELIER_SEO_TITLE,
  SMIC_HOTELIER_SLUG,
  SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_HOTELIER_SOURCES,
  SMIC_HOTELIER_SOURCES_VERIFIED_AT_LABEL,
  SMIC_HOTELIER_UPDATED_AT,
} from "@/site/smic-hotelier/data";

const SMIC_HREF = "/smic";
const SMIC_HOURS_HREF = "/smic-selon-nombre-heures";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const CALCULATEUR_HREF = "/";
const HS_CALC_HREF = "/calculateurs/salaire-heures-supplementaires";

function hourlyGridRows(): string[][] {
  return HCR_GRID_ROWS.map((row) => [
    row.levelLabel,
    String(row.echelon),
    formatHcrRate(row.conventionalHourly),
    formatHcrRate(row.applicableHourly),
    row.caughtBySmic
      ? `SMIC depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}`
      : "Minimum HCR",
  ]);
}

function monthlyGridRows(): string[][] {
  return HCR_GRID_ROWS.map((row) => [
    row.levelLabel,
    String(row.echelon),
    formatHcrRate(row.applicableHourly),
    formatHcrEuro(row.monthlyGross35h),
    formatHcrEuro(row.monthlyGross39h),
  ]);
}

/**
 * Page pilier SMIC hôtelier (/smic-hotelier).
 * Barèmes : `@/site/smic-hotelier/engine` + `@/site/smic/data`.
 */
export const smicHotelierGuide: Guide = {
  slug: SMIC_HOTELIER_SLUG,
  publicPath: SMIC_HOTELIER_PATH,
  breadcrumbLabel: SMIC_HOTELIER_BREADCRUMB,
  title: SMIC_HOTELIER_H1,
  seoTitle: SMIC_HOTELIER_SEO_TITLE,
  description: SMIC_HOTELIER_META_DESCRIPTION,
  subtitle:
    "Grille HCR réellement applicable, comparaison avec le SMIC, calcul à 35 h et à 39 h, repas et lecture du bulletin.",
  publishedAt: SMIC_HOTELIER_PUBLISHED_AT,
  updatedAt: SMIC_HOTELIER_UPDATED_AT,
  includeFaqSchema: false,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le SMIC hôtelier",
  faqIntro:
    "Réponses courtes pour contrôler un contrat ou un bulletin. Les montants détaillés et les formules se trouvent dans les sections ci-dessus.",
  introduction: [
    "Le « SMIC hôtelier » n'est pas un SMIC distinct du SMIC légal. Dans les hôtels, cafés et restaurants relevant de la convention HCR (IDCC 1979), l'employeur doit comparer le SMIC au minimum conventionnel correspondant au niveau et à l'échelon du salarié, puis appliquer le montant le plus favorable.",
    `Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, le SMIC est fixé à ${L.smicHourly} brut de l'heure, soit ${L.smicMonthly35h} brut par mois à 35 h. À 39 h en HCR, avec quatre heures supplémentaires hebdomadaires majorées de 10 %, le minimum atteint ${L.smicMonthly39h} brut par mois lorsque le SMIC constitue le taux de base.`,
  ],
  quickSummary: {
    title: SMIC_HOTELIER_AMOUNTS_BLOCK_TITLE,
    items: [
      {
        rate: L.smicHourly,
        description: `SMIC horaire brut depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}`,
      },
      {
        rate: "SMIC ou grille",
        description: "On paie le plus élevé des deux minima, jamais une case HCR inférieure au SMIC",
      },
      {
        rate: L.smicMonthly35h,
        description: "Brut mensuel minimum à 35 h lorsque le SMIC rattrape la grille",
      },
      {
        rate: L.smicMonthly39h,
        description: "Brut mensuel à 39 h au SMIC, avec 4 heures majorées à +10 % (hors repas)",
      },
    ],
    synthesis: [
      SMIC_HOTELIER_FRESHNESS_LINE,
      `Grille complète : voir « Quelle est la grille des salaires HCR applicable en 2026 ? ». Détail du passage à 39 h : voir « Quel salaire en HCR à 39 heures par semaine en 2026 ? ».`,
    ],
  },
  introSummary: {
    title: "Comment lire les chiffres de cette page",
    items: [
      "Taux de la grille : montant écrit dans l'avenant, même s'il est inférieur au SMIC.",
      "Taux à respecter : maximum entre ce montant et le SMIC horaire.",
      "Brut de base : rémunération des heures hors majoration, hors repas et hors primes.",
      "Heures supplémentaires HCR : de la 36e à la 39e heure, majoration de 10 %.",
    ],
  },
  sections: [
    {
      id: "smic-hotelier-definition",
      title: "Le SMIC hôtelier est-il différent du SMIC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non : il n'existe pas un second SMIC réservé à l'hôtellerie-restauration. Le SMIC légal s'applique à tous les salariés majeurs concernés. La convention collective des hôtels, cafés et restaurants (HCR, IDCC 1979) ajoute ensuite un minimum conventionnel par niveau et par échelon.",
        },
        {
          type: "paragraph",
          text: "Le niveau et l'échelon sont la classification du poste dans la grille HCR. Ce n'est pas le métier à lui seul, ni un coefficient comme dans d'autres branches. Le minimum conventionnel est le taux horaire brut que l'avenant salarial attache à cette case.",
        },
        {
          type: "paragraph",
          text: "On compare toujours les deux planchers. Si la case de la grille est inférieure au SMIC, l'employeur doit payer au moins le SMIC. Si elle est supérieure, c'est ce minimum HCR qui s'impose. On ne présente jamais un taux de grille inférieur au SMIC comme un salaire légalement suffisant.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, quatre cases de l'avenant n° 33 sont passées sous le SMIC de ${L.smicHourly} : niveau I échelons 1, 2 et 3, et niveau II échelon 1. Pour ces classifications, le taux horaire à respecter est le SMIC.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le montant légal, horaire et mensuel, hors convention HCR,",
          label: "voir les montants officiels du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "champ-application-hcr",
      title: "À qui s'applique la convention des hôtels, cafés et restaurants ?",
      blocks: [
        {
          type: "paragraph",
          text: "La convention HCR s'applique à l'entreprise selon son activité, pas selon le seul intitulé du poste. Un serveur ou un cuisinier n'est pas automatiquement couvert par l'IDCC 1979. Inversement, un salarié d'accueil, d'étage ou de cuisine peut l'être si l'établissement relève bien de cette convention.",
        },
        {
          type: "paragraph",
          text: "Le moyen le plus simple de vérifier est le bulletin de paie ou le contrat : la convention collective et le code IDCC y figurent en principe. L'IDCC 1979 correspond à la convention collective nationale des hôtels, cafés restaurants du 30 avril 1997.",
        },
        {
          type: "list",
          items: [
            "Hôtels avec ou sans restaurant, restaurants traditionnels, cafés et débits de boissons : souvent HCR, sous réserve du champ réel de l'entreprise.",
            "Restauration rapide : autre convention (IDCC 1501). Un métier de restauration ne suffit pas à conclure.",
            `Mayotte et certains territoires : le SMIC horaire peut différer. Le tableau de cette page utilise le SMIC métropolitain de ${L.smicHourly}. À Mayotte, le SMIC horaire brut est de ${formatHcrEuro(MAYOTTE_SMIC_HOURLY)} depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}.`,
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Cette page ne dit pas quel niveau ni quel échelon correspond à « serveur », « cuisinier », « réceptionniste » ou « femme de chambre ». La classification réelle se lit sur le contrat ou le bulletin.",
          ],
        },
      ],
    },
    {
      id: "grille-salaires-hcr",
      title: "Quelle est la grille des salaires HCR applicable en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: `En 2026, la grille conventionnelle étendue toujours applicable est celle de l'avenant n° 33 du ${HCR_AVENANT_33_SIGNED_LABEL}, étendu par arrêté du ${HCR_AVENANT_33_EXTENSION_LABEL}. Elle est entrée en vigueur le ${HCR_GRID_EFFECTIVE_FROM_LABEL}. Elle n'est pas « une grille 2026 » : elle reste le texte salarial opposable tant qu'un avenant plus récent n'est pas étendu.`,
        },
        {
          type: "paragraph",
          text: `Un avenant n° 36 a été signé le ${HCR_AVENANT_36_SIGNED_LABEL}. Il a été publié au BOCC et un avis d'extension est paru au Journal officiel le ${HCR_AVENANT_36_EXTENSION_NOTICE_LABEL}. Au ${SMIC_HOTELIER_SOURCES_VERIFIED_AT_LABEL}, l'arrêté d'extension n'était pas publié. Le texte prévoit lui-même de prendre effet le premier jour du mois suivant cette publication. Cette page n'utilise donc pas ses montants comme obligation générale.`,
        },
        {
          type: "table",
          caption: `Minima horaires HCR de l'avenant n° 33 et taux à respecter depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL} (métropole, SMIC à ${L.smicHourly})`,
          headers: [
            "Niveau",
            "Échelon",
            "Taux de la grille",
            "Taux horaire à respecter",
            "Lecture",
          ],
          rows: hourlyGridRows(),
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Les quatre premières lignes (I-1 à I-3 et II-1) restent écrites dans l'avenant à ${L.i1Conventional}, ${L.i2Conventional}, ${L.i3Conventional} et ${L.ii1Conventional}. Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, le taux réellement payable pour ces cases est le SMIC de ${L.smicHourly}.`,
          ],
        },
        {
          type: "paragraph",
          text: "Le tableau suivant traduit ces taux horaires en brut mensuel de base à 35 h, puis en brut à 39 h avec les quatre heures majorées à +10 %. Hors repas, primes, dimanche, jours fériés et autres variables.",
        },
        {
          type: "table",
          caption:
            "Brut mensuel de base à 35 h et brut à 39 h (4 h à +10 %), hors repas et primes",
          headers: [
            "Niveau",
            "Échelon",
            "Taux applicable",
            "Brut 35 h",
            "Brut 39 h",
          ],
          rows: monthlyGridRows(),
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            `À 35 h, si le SMIC s'impose, le brut retenu est le montant officiel de ${L.smicMonthly35h}, pas le produit ${L.smicHourly} × ${formatHcrHours(HCR_BASE_MONTHLY_HOURS)}. Pour les autres taux, chaque montant est arrondi au centime. Les heures supplémentaires utilisent le volume exact 4 × 52 ÷ 12, soit ${formatHcrHours(HCR_MONTHLY_OT_HOURS)}.`,
          ],
        },
      ],
    },
    {
      id: "salaire-hcr-35-heures",
      title: "Quel salaire en HCR à 35 heures par semaine en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: `À 35 h par semaine, un salarié HCR dont le minimum applicable est le SMIC perçoit au minimum ${L.smicMonthly35h} brut par mois depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, hors repas, primes et autres éléments de rémunération. Lorsque le minimum HCR correspondant au niveau et à l'échelon est supérieur à ${L.smicHourly}, c'est ce taux conventionnel supérieur qui s'applique.`,
        },
        {
          type: "paragraph",
          text: `La mensualisation usuelle est : heures hebdomadaires × 52 ÷ 12. Pour 35 h, cela donne 35 × 52 ÷ 12 = ${formatHcrHours(HCR_BASE_MONTHLY_HOURS)} sur le bulletin, souvent écrit 151,67 h.`,
        },
        {
          type: "paragraph",
          text: "Le brut est la rémunération avant cotisations salariales. Le net est ce qui reste après ces cotisations, avant ou après le prélèvement à la source selon la ligne lue.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Cas où le SMIC prime : niveau I échelon 1. La grille écrit ${L.i1Conventional} de l'heure. Le taux à respecter est ${L.smicHourly}. Brut mensuel de base à 35 h : ${L.smicMonthly35h} (montant officiel du SMIC).`,
            `Cas où la grille HCR prime : niveau II échelon 2. La grille écrit ${L.ii2Conventional}, au-dessus du SMIC. Brut mensuel de base à 35 h : ${L.ii2Hourly} × ${formatHcrHours(HCR_BASE_MONTHLY_HOURS)} = ${L.ii2Monthly35h}.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le SMIC selon d'autres durées de contrat, hors règles HCR,",
          label: "voir le SMIC brut et net selon le nombre d'heures",
          href: SMIC_HOURS_HREF,
        },
      ],
    },
    {
      id: "salaire-hcr-39-heures",
      title: "Quel salaire en HCR à 39 heures par semaine en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: `À 39 h par semaine en HCR, un salarié rémunéré sur la base du SMIC perçoit au minimum ${L.smicMonthly39h} brut par mois, hors repas et primes. Le calcul comprend le salaire de base à 35 h et ${L.overtimeHoursExact} supplémentaires mensualisées correspondant aux quatre heures hebdomadaires de la 36e à la 39e, majorées de 10 %.`,
        },
        {
          type: "paragraph",
          text: "Dans la branche HCR, la durée hebdomadaire conventionnelle est souvent de 39 heures. Cela ne déplace pas le seuil légal : la durée légale reste de 35 heures. Les heures accomplies au-delà de 35 h sont des heures supplémentaires. Tous les salariés HCR ne travaillent pas obligatoirement 39 h.",
        },
        {
          type: "paragraph",
          text: `Une heure supplémentaire est une heure de travail effectif au-delà de 35 h, accomplie à la demande de l'employeur ou avec son accord. En HCR, les heures de la 36e à la 39e sont majorées de ${HCR_OT_RATE_36_TO_39 * 100} % (avenant n° 2 du 5 février 2007, article 4), et non de 25 % comme dans le cas général du Code du travail.`,
        },
        {
          type: "paragraph",
          text: `Sur un mois, 39 h correspondent à 39 × 52 ÷ 12 = ${L.hoursAt39}. On sépare ${formatHcrHours(HCR_BASE_MONTHLY_HOURS)} de base et ${formatHcrHours(HCR_MONTHLY_OT_HOURS)} d'heures supplémentaires (4 × 52 ÷ 12). Les bulletins affichent souvent 169 h au total, avec 17,33 h d'heures supplémentaires. Cette page calcule les majorations sur le volume exact 4 × 52 ÷ 12, puis arrondit chaque montant au centime.`,
        },
        {
          type: "table",
          caption:
            "Exemple pédagogique à 39 h, niveau II échelon 2, hors repas, primes et absences",
          headers: ["Élément", "Calcul", "Montant brut"],
          rows: [
            [
              "Classification retenue",
              "Niveau II, échelon 2 (hypothèse, à vérifier sur le bulletin)",
              L.ii2Hourly,
            ],
            [
              "Heures de base",
              `${formatHcrHours(HCR_BASE_MONTHLY_HOURS)} × ${L.ii2Hourly}`,
              L.ii2Monthly35h,
            ],
            [
              "Heures supplémentaires",
              `${formatHcrHours(HCR_MONTHLY_OT_HOURS)} × ${L.ii2Hourly} × 1,10`,
              L.ii2Overtime39h,
            ],
            ["Total brut mensuel", "Base + heures majorées", L.ii2Monthly39h],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Même méthode au plancher SMIC (niveau I échelon 1) : base ${L.smicMonthly35h} + heures majorées ${L.smicOvertime39h} = ${L.smicMonthly39h} brut à 39 h.`,
            `Autre illustration, niveau III échelon 1 (la grille prime) : ${L.iii1Hourly} de l'heure, base ${L.iii1Monthly35h} + heures majorées ${L.iii1Overtime39h} = ${L.iii1Monthly39h} brut à 39 h.`,
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Ces totaux n'incluent ni les repas, ni une prime, ni une majoration de dimanche. Ce n'est pas le montant viré sur le compte.",
          ],
        },
      ],
    },
    {
      id: "heures-supplementaires-hcr",
      title: "Heures supplémentaires HCR : que se passe-t-il au-delà de 39 heures ?",
      blocks: [
        {
          type: "paragraph",
          text: "39 h n'est pas la durée légale générale. C'est la durée conventionnelle fréquente en HCR. Le seuil des heures supplémentaires reste 35 h.",
        },
        {
          type: "list",
          items: [
            `36e à 39e heure : majoration de ${HCR_OT_RATE_36_TO_39 * 100} %.`,
            `40e à 43e heure : majoration de ${HCR_OT_RATE_40_TO_43 * 100} %.`,
            `À partir de la 44e heure : majoration de ${HCR_OT_RATE_FROM_44 * 100} %.`,
          ],
        },
        {
          type: "paragraph",
          text: "Ces taux hebdomadaires sont ceux de l'avenant n° 2 du 5 février 2007, étendu. Un accord d'entreprise peut prévoir d'autres taux, sans descendre sous le plancher légal de 10 %. Si le temps de travail est aménagé sur l'année, le décompte et les paliers changent : cette page ne traite pas ce cas.",
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour simuler un volume d'heures au-delà de 39 h avec un autre taux,",
          label: "utiliser le calculateur d'heures supplémentaires",
          href: HS_CALC_HREF,
        },
      ],
    },
    {
      id: "smic-hotelier-net",
      title: "SMIC hôtelier net : combien reste-t-il après cotisations ?",
      blocks: [
        {
          type: "paragraph",
          text: "La grille HCR fixe des minima bruts, pas un salaire net garanti. Le net dépend notamment des cotisations, de la mutuelle, du traitement social des heures supplémentaires, des repas et du prélèvement à la source.",
        },
        {
          type: "paragraph",
          text: "Deux lignes du bulletin doivent être distinguées : le net avant impôt (après cotisations salariales) et le net payé (après prélèvement à la source).",
        },
        {
          type: "paragraph",
          text: "Un coefficient net/brut lu sur une autre page du site, surtout s'il a été calibré sur des heures supplémentaires à +25 %, ne doit pas être appliqué mécaniquement aux quatre heures HCR à +10 %.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            `Pour un ordre de grandeur avant impôt, saisissez le brut de base (par exemple ${L.ii2Monthly39h} à 39 h, niveau II échelon 2, hors repas) dans le calculateur. Le résultat reste indicatif. Les heures supplémentaires peuvent bénéficier d'un régime social ou fiscal particulier, non reproduit ici.`,
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour estimer un net à partir du brut de votre bulletin,",
          label: "ouvrir le calculateur brut vers net",
          href: CALCULATEUR_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre l'écart entre brut et net,",
          label: "lire la différence entre salaire brut et salaire net",
          href: BRUT_NET_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail du prélèvement fiscal sur le bulletin,",
          label: "comprendre le prélèvement à la source",
          href: PAS_HREF,
        },
      ],
    },
    {
      id: "repas-hcr",
      title: "Repas en HCR : avantage en nature et indemnité compensatrice",
      blocks: [
        {
          type: "paragraph",
          text: `Le minimum garanti (MG) est une valeur légale distincte du SMIC. Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, il s'élève à ${L.minimumGaranti}. Dans les HCR, il sert surtout à évaluer l'avantage en nature nourriture ou l'indemnité compensatrice, à raison d'un MG par repas.`,
        },
        {
          type: "paragraph",
          text: "Selon l'UMIH, l'avantage nourriture ou l'indemnité est dû lorsque deux conditions sont réunies en même temps : l'établissement est ouvert à la clientèle aux heures des repas, et le salarié est présent à ces heures. Ce n'est pas automatique pour tout contrat HCR, ni pour un jour d'absence.",
        },
        {
          type: "list",
          items: [
            "Repas fourni : avantage en nature. La valeur (souvent 1 MG par repas) est ajoutée au brut pour les cotisations, puis retranchée du net, parce que le salarié a mangé. Le virement n'augmente pas du montant du repas.",
            "Repas non fourni alors que les conditions sont réunies : indemnité compensatrice, évaluée sur la même base. Elle s'ajoute au brut et n'est pas reprise en retenue : elle augmente le montant versé, après cotisations.",
            "Refus personnel du repas, établissement fermé aux heures de repas, ou salarié absent : en principe, pas d'indemnité automatique. Vérifiez l'usage de l'établissement et le bulletin.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple pédagogique, hors toute situation réelle : 20 jours travaillés, un repas fourni par jour, MG de ${L.minimumGaranti}. L'avantage s'élève à 20 × ${L.minimumGaranti} = ${formatHcrEuro(20 * MINIMUM_GARANTI)}. Cette somme entre dans le brut, puis ressort en retenue. Elle ne se rajoute pas au virement. Les cotisations calculées sur un brut un peu plus élevé peuvent même réduire légèrement le net payé.`,
            `Si, dans les mêmes conditions, le repas n'était pas fourni, l'indemnité de ${formatHcrEuro(20 * MINIMUM_GARANTI)} resterait dans le net après cotisations. Ce n'est pas le même effet qu'un avantage en nature.`,
          ],
        },
      ],
    },
    {
      id: "verifier-salaire-hcr-fiche-de-paie",
      title: "Comment vérifier son salaire HCR sur sa fiche de paie ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Repérer la convention",
              description:
                "Cherchez l'IDCC ou le nom de la convention. Pour cette page, la référence est 1979 (HCR). Un métier de restauration ne suffit pas.",
            },
            {
              title: "Lire niveau et échelon",
              description:
                "Ils figurent en principe sur le contrat et le bulletin. Sans eux, on ne peut pas choisir la bonne ligne de la grille.",
            },
            {
              title: "Vérifier le taux de base",
              description: `Comparez le taux horaire (ou le salaire de base divisé par les heures de base) au taux à respecter : SMIC de ${L.smicHourly} ou minimum HCR s'il est plus élevé.`,
            },
            {
              title: "Identifier 151,67 h ou 169 h",
              description:
                "151,67 h correspondent à 35 h mensualisées. 169 h correspondent à 39 h. Les heures au-delà de 35 h doivent apparaître à part, avec leur majoration.",
            },
            {
              title: "Contrôler les heures majorées",
              description:
                "De 36 à 39 h, la majoration HCR est de 10 %, sauf accord plus favorable. Au-delà, les paliers 20 % puis 50 % s'appliquent au décompte hebdomadaire.",
            },
            {
              title: "Séparer les repas",
              description:
                "Un avantage en nature apparaît souvent en plus puis en moins. Une indemnité compensatrice reste dans le net. Ni l'un ni l'autre ne remplace le minimum salarial.",
            },
            {
              title: "Lire brut, net avant impôt, net payé",
              description:
                "Le brut n'est pas le virement. Le net avant impôt précède le prélèvement à la source. Le net payé est le montant réellement versé.",
            },
          ],
        },
        {
          type: "table",
          caption:
            "Exemple pédagogique fictif : bulletin imaginaire, niveau II échelon 2, 39 h, sans repas ni prime",
          headers: ["Ligne", "Valeur"],
          rows: [
            ["Convention / IDCC", "HCR / 1979"],
            ["Classification", "Niveau II, échelon 2"],
            ["Taux horaire de base", L.ii2Hourly],
            ["Heures de base", formatHcrHours(HCR_BASE_MONTHLY_HOURS)],
            ["Salaire de base brut", L.ii2Monthly35h],
            ["Heures suppl. 36-39 h (maj. 10 %)", L.ii2Overtime39h],
            ["Brut hors repas", L.ii2Monthly39h],
            ["Net avant impôt / net payé", "Non calculé ici (voir le calculateur)"],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Cet exemple est fictif et pédagogique. Il ne reproduit le bulletin d'aucune entreprise. Un écart de quelques centimes peut venir d'un arrondi logiciel différent ; un écart de taux, lui, doit être expliqué.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer brut, cotisations, net avant impôt et net versé,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE_HREF,
        },
      ],
    },
    {
      id: "sources-limites",
      title: "Sources et limites",
      blocks: [
        {
          type: "paragraph",
          text: `Vérification des textes le ${SMIC_HOTELIER_SOURCES_VERIFIED_AT_LABEL}. Les montants du SMIC et du minimum garanti s'appliquent depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}. La grille conventionnelle utilisée est celle de l'avenant n° 33, applicable depuis le ${HCR_GRID_EFFECTIVE_FROM_LABEL}.`,
        },
        {
          type: "list",
          items: [
            {
              text: `${SMIC_HOTELIER_SOURCES.arreteSmicJuin2026.label}.`,
              href: SMIC_HOTELIER_SOURCES.arreteSmicJuin2026.href,
              label: SMIC_HOTELIER_SOURCES.arreteSmicJuin2026.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.servicePublicSmic.label}.`,
              href: SMIC_HOTELIER_SOURCES.servicePublicSmic.href,
              label: SMIC_HOTELIER_SOURCES.servicePublicSmic.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.codeTravailSmic.label} ; ${SMIC_HOTELIER_SOURCES.codeTravailMinimumGaranti.label}.`,
              href: SMIC_HOTELIER_SOURCES.codeTravailSmic.href,
              label: "Légifrance",
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.avenant33Article2.label}.`,
              href: SMIC_HOTELIER_SOURCES.avenant33Article2.href,
              label: SMIC_HOTELIER_SOURCES.avenant33Article2.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.ccnHcr.label}.`,
              href: SMIC_HOTELIER_SOURCES.ccnHcr.href,
              label: SMIC_HOTELIER_SOURCES.ccnHcr.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.umihAvenant33.label}.`,
              href: SMIC_HOTELIER_SOURCES.umihAvenant33.href,
              label: SMIC_HOTELIER_SOURCES.umihAvenant33.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.codeTravailDuree.label} ; ${SMIC_HOTELIER_SOURCES.codeTravailMajoration.label}.`,
              href: SMIC_HOTELIER_SOURCES.codeTravailDuree.href,
              label: "Légifrance",
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.umihRepas.label}.`,
              href: SMIC_HOTELIER_SOURCES.umihRepas.href,
              label: SMIC_HOTELIER_SOURCES.umihRepas.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.urssafAvantages.label}.`,
              href: SMIC_HOTELIER_SOURCES.urssafAvantages.href,
              label: SMIC_HOTELIER_SOURCES.urssafAvantages.org,
            },
            {
              text: `${SMIC_HOTELIER_SOURCES.tripalioAvenant36.label}.`,
              href: SMIC_HOTELIER_SOURCES.tripalioAvenant36.href,
              label: SMIC_HOTELIER_SOURCES.tripalioAvenant36.org,
            },
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Hors périmètre : restauration rapide (IDCC 1501), aménagement du temps de travail sur l'année, forfait jours, apprentis (avenant salarial distinct), extras et saisonniers au-delà du minimum horaire, dimanche et jours fériés, Mayotte pour le tableau métropolitain. Un accord d'entreprise plus favorable s'applique en priorité sur la grille de branche.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Un salarié HCR peut-il être payé au SMIC ?",
      answer: `Oui, lorsque sa case de grille est inférieure ou égale au SMIC. Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, c'est le cas des niveaux I-1, I-2, I-3 et II-1 : le taux à respecter est ${L.smicHourly}.`,
    },
    {
      question: "Pourquoi la grille affiche-t-elle parfois un taux inférieur au SMIC ?",
      answer: `Parce que l'avenant n° 33 n'a pas été réécrit après la hausse du SMIC du ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}. Le montant écrit reste dans le texte conventionnel, mais il n'est plus suffisant : le SMIC s'impose.`,
    },
    {
      question: "Le SMIC hôtelier est-il plus élevé à 39 h ?",
      answer: `Le taux horaire de base ne change pas. À 39 h, le brut mensuel augmente parce que l'on paie 35 h de base plus 4 heures supplémentaires majorées à +10 %. Au SMIC, cela donne ${L.smicMonthly39h} brut hors repas, contre ${L.smicMonthly35h} à 35 h.`,
    },
    {
      question: "Que représentent les 169 heures ?",
      answer: `169 h = 39 × 52 ÷ 12. C'est la mensualisation d'un contrat à 39 h, soit ${formatHcrHours(HCR_BASE_MONTHLY_HOURS)} de base et ${formatHcrHours(HCR_MONTHLY_OT_HOURS)} d'heures supplémentaires. Ce n'est pas 39 × 4,33 arrondi à la va-vite sans majoration.`,
    },
    {
      question: "Les quatre heures après 35 h sont-elles majorées ?",
      answer:
        "Oui, en HCR : +10 % de la 36e à la 39e heure, sauf accord plus favorable. Ce n'est pas le +25 % du cas général du Code du travail.",
    },
    {
      question: "Un serveur ou un cuisinier a-t-il automatiquement un niveau précis ?",
      answer:
        "Non. L'emploi ne fixe pas à lui seul le niveau et l'échelon. Il faut lire la classification du contrat ou du bulletin, et vérifier que l'entreprise relève bien de l'IDCC 1979.",
    },
    {
      question: "Le repas fourni par l'employeur augmente-t-il le virement bancaire ?",
      answer: `En principe non. L'avantage en nature (1 minimum garanti par repas, soit ${L.minimumGaranti} depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}) entre dans le brut puis est repris en retenue. L'indemnité compensatrice, elle, reste dans le net après cotisations.`,
    },
    {
      question: "Que faire si le taux de ma fiche de paie paraît inférieur au minimum applicable ?",
      answer:
        "Vérifiez l'IDCC, le niveau, l'échelon et le nombre d'heures. Comparez ensuite au taux à respecter (SMIC ou grille HCR). En cas d'écart, interrogez le service paie par écrit, bulletin à l'appui. L'inspection du travail ou un conseil (syndicat, avocat) peut aider si le désaccord persiste.",
    },
  ],
  conclusion: {
    keyPoints: [
      "« SMIC hôtelier » n'est pas un barème légal séparé : on compare SMIC et grille HCR, case par case.",
      `Depuis le ${SMIC_HOTELIER_SMIC_EFFECTIVE_FROM_LABEL}, les niveaux I-1 à I-3 et II-1 sont rattrapés par le SMIC de ${L.smicHourly}.`,
      "À 39 h, les quatre heures au-delà de 35 h sont des heures supplémentaires majorées à +10 % en HCR.",
      "Le net et les repas se lisent sur le bulletin : ils ne sont pas fixés par la grille.",
    ],
    closingText:
      "Pour estimer un net à partir du brut de votre bulletin, utilisez le calculateur. Pour le SMIC légal hors HCR, voyez la page dédiée.",
    closingCta: {
      label: "Calculer mon salaire brut en net",
      href: CALCULATEUR_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Montants du SMIC",
          description: "Horaire et mensuel officiels, actuellement applicables.",
          href: SMIC_HREF,
        },
        {
          title: "SMIC selon le nombre d'heures",
          description: "De 10 h à 44 h, avec heures supplémentaires à +25 % puis +50 % hors accord.",
          href: SMIC_HOURS_HREF,
        },
        {
          title: "Lire une fiche de paie",
          description: "Brut, cotisations, net avant impôt et net versé.",
          href: LIRE_FICHE_HREF,
        },
      ],
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez un net à partir du brut de votre bulletin HCR. Résultat indicatif.",
      href: CALCULATEUR_HREF,
    },
    relatedGuides: [
      { title: "SMIC : montants officiels", href: SMIC_HREF },
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS_HREF },
      { title: "Différence brut / net", href: BRUT_NET_HREF },
      { title: "Calculer son salaire net", href: CALCULER_NET_HREF },
      { title: "Lire une fiche de paie", href: LIRE_FICHE_HREF },
      { title: "Prélèvement à la source", href: PAS_HREF },
    ],
    discover: [
      {
        title: "Salaire avec heures supplémentaires",
        href: HS_CALC_HREF,
      },
    ],
  },
};
