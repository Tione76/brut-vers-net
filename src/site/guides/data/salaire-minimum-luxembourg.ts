import type { Guide } from "../types";
import {
  LU_COMPARE_FR_FROM_LABEL,
  LU_MIN_WAGE_BREADCRUMB,
  LU_MIN_WAGE_H1,
  LU_MIN_WAGE_LABELS as L,
  LU_MIN_WAGE_META_DESCRIPTION,
  LU_MIN_WAGE_PATH,
  LU_MIN_WAGE_PUBLISHED_AT,
  LU_MIN_WAGE_SEO_TITLE,
  LU_MIN_WAGE_SLUG,
  LU_MIN_WAGE_SOURCES as S,
  LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  LU_MIN_WAGE_SUBTITLE,
  LU_MIN_WAGE_UPDATED_AT,
  LU_SSM_BILL_2027_COMMISSION_LABEL,
  LU_SSM_BILL_2027_DEPOSITED_LABEL,
  LU_SSM_BILL_2027_NUMBER,
  LU_SSM_BILL_2027_PROPOSED_FROM_LABEL,
  LU_SSM_BILL_2027_STATUS,
  LU_SSM_CURRENT_FROM_LABEL,
  LU_SSM_FULL_TIME_WEEKLY,
  LU_SSM_PART_TIME_EXAMPLE_HOURS,
  LU_SSM_PREVIOUS_FROM_LABEL,
} from "@/site/salaire-minimum-luxembourg";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_LU_HREF = "/smic-europe#salaire-minimum-luxembourg";
const SMIC_HREF = "/smic";
const DE_HREF = "/salaire-minimum-allemagne";
const CH_HREF = "/salaire-minimum-suisse";

/**
 * Guide pays : salaire social minimum luxembourgeois.
 * URL canonique : /salaire-minimum-luxembourg
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumLuxembourgGuide: Guide = {
  slug: LU_MIN_WAGE_SLUG,
  publicPath: LU_MIN_WAGE_PATH,
  breadcrumbLabel: LU_MIN_WAGE_BREADCRUMB,
  title: LU_MIN_WAGE_H1,
  seoTitle: LU_MIN_WAGE_SEO_TITLE,
  description: LU_MIN_WAGE_META_DESCRIPTION,
  subtitle: LU_MIN_WAGE_SUBTITLE,
  publishedAt: LU_MIN_WAGE_PUBLISHED_AT,
  updatedAt: LU_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum au Luxembourg",
  faqIntro:
    "Réponses courtes sur le salaire social minimum, la qualification, le net, les frontaliers et les étudiants.",
  introduction: [
    `Depuis le ${LU_SSM_CURRENT_FROM_LABEL}, le salaire social minimum (SSM) au Luxembourg s'élève à ${L.adultUnskilledMonthly} brut par mois, soit ${L.adultUnskilledHourly} brut par heure, pour un adulte non qualifié à temps plein. Un minimum plus élevé s'applique aux salariés qualifiés, sous conditions.`,
    "En France, on parle souvent de « SMIC luxembourgeois ». Le terme officiel au Luxembourg est salaire social minimum.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum au Luxembourg ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le salaire minimum légal au Luxembourg est un minimum national, appelé salaire social minimum. Depuis le ${LU_SSM_CURRENT_FROM_LABEL}, un salarié de 18 ans ou plus, non qualifié, à temps plein, a droit à ${L.adultUnskilledMonthlyLong}, soit ${L.adultUnskilledHourlyLong}. Ces montants sont bruts.`,
        },
        {
          type: "paragraph",
          text: `Ce barème a remplacé celui du ${LU_SSM_PREVIOUS_FROM_LABEL} (${L.previousUnskilledMonthly} brut par mois pour le même profil). La hausse de juin correspond à une tranche d'indexation, pas à une nouvelle loi de revalorisation structurelle.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer le Luxembourg parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "baremes",
      title: "Quels montants selon l'âge et la qualification ?",
      blocks: [
        {
          type: "paragraph",
          text: `L'Inspection du travail et des mines (ITM) et le Centre commun de la sécurité sociale (CCSS) publient le même barème, en vigueur depuis le ${LU_SSM_CURRENT_FROM_LABEL} (indice ${L.indexCurrent}). Les montants ci-dessous sont officiels, bruts, et valent pour un temps plein.`,
        },
        {
          type: "table",
          caption: `Salaire social minimum brut depuis le ${LU_SSM_CURRENT_FROM_LABEL} (ITM / CCSS).`,
          headers: ["Catégorie", "Coefficient", "Mensuel brut", "Horaire brut"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "18 ans et plus, non qualifié",
              "100 %",
              L.adultUnskilledMonthly,
              L.adultUnskilledHourly,
            ],
            [
              "18 ans et plus, qualifié",
              L.coeffSkilled,
              L.adultSkilledMonthly,
              L.adultSkilledHourly,
            ],
            [
              "De 17 à moins de 18 ans",
              L.coeff17,
              L.age17Monthly,
              L.age17Hourly,
            ],
            [
              "De 15 à moins de 17 ans",
              L.coeff15,
              L.age15Monthly,
              L.age15Hourly,
            ],
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Les chiffres du tableau sont ceux publiés par l'ITM. On ne reconstitue pas un mensuel officiel en multipliant le taux horaire déjà arrondi.`,
          ],
        },
      ],
    },
    {
      id: "qualification",
      title: "Qui a droit au salaire minimum qualifié ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le minimum qualifié (${L.adultSkilledMonthlyLong}) n'est pas automatique dès qu'on a un diplôme. Il s'applique si la qualification correspond au métier effectivement exercé, selon l'article L. 222-4 du Code du travail.`,
        },
        {
          type: "paragraph",
          text: "Les voies principales, pour la profession concernée, sont les suivantes :",
        },
        {
          type: "list",
          items: [
            "un certificat officiel au moins équivalent au certificat d'aptitude technique et professionnelle (CATP) ou au diplôme d'aptitude professionnelle (DAP) ;",
            "un certificat de capacité manuelle (CCM) ou un certificat de capacité professionnelle (CCP), plus deux années de pratique dans le métier ;",
            "un certificat d'initiation technique et professionnelle (CITP), plus cinq années de pratique dans le métier ;",
            "dix années de pratique sans certificat, lorsqu'un certificat officiel existe pour le métier ;",
            "au moins six années de pratique dans un métier nécessitant une capacité technique progressivement croissante, lorsque la formation n'est pas sanctionnée par un certificat officiel.",
          ],
        },
        {
          type: "paragraph",
          text: "Un diplôme français ou étranger n'ouvre pas à lui seul le taux de 120 %. Une équivalence peut être reconnue par le ministre de l'Éducation, après avis du ministre du Travail. Le salarié doit informer l'employeur de sa qualification. Si l'information arrive plus tard, le minimum qualifié ne s'applique qu'à partir de cette information, et seulement si les fonctions exercées correspondent réellement à un emploi qualifié.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les cas particuliers (équivalence, métier exercé, information de l'employeur),",
          label: "voir la fiche ITM sur le minimum qualifié",
          href: S.itmQualified.href,
        },
      ],
    },
    {
      id: "horaire-mensuel",
      title: "Comment comprendre le montant horaire, mensuel et à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le Luxembourg publie un montant mensuel officiel pour un temps plein, et un taux horaire obtenu en le divisant par ${L.legalHours} heures. La durée normale de travail est en principe de 8 heures par jour et ${LU_SSM_FULL_TIME_WEEKLY} heures par semaine.`,
        },
        {
          type: "paragraph",
          text: `Cette base de ${L.legalHours} heures est un forfait de conversion, pas le nombre d'heures réellement travaillées chaque mois. Pour retrouver le barème officiel luxembourgeois, utilisez les montants publiés et cette base forfaitaire, plutôt qu'une conversion théorique sur 52 semaines.`,
        },
        {
          type: "paragraph",
          text: "À temps partiel, le minimum se proratise selon la durée contractuelle par rapport au temps plein. Les taux horaires officiels restent les mêmes.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple pédagogique, pas un second barème officiel : un adulte non qualifié à ${LU_SSM_PART_TIME_EXAMPLE_HOURS} h par semaine, soit la moitié d'un temps plein de ${LU_SSM_FULL_TIME_WEEKLY} h, a un minimum d'environ ${L.partTime20Monthly} brut par mois (${L.adultUnskilledMonthly} × ${LU_SSM_PART_TIME_EXAMPLE_HOURS} / ${LU_SSM_FULL_TIME_WEEKLY}).`,
          ],
        },
      ],
    },
    {
      id: "jeunes-etudiants",
      title: "Quelles règles pour les jeunes, les étudiants, les apprentis et les stagiaires ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas une seule règle « étudiant ». L'âge, le type de contrat et la période (année scolaire ou vacances) changent le plancher.",
        },
        {
          type: "list",
          items: [
            `Salarié de 17 à moins de 18 ans : ${L.coeff17} du SSM adulte non qualifié, soit ${L.age17Monthly} brut par mois (${L.age17Hourly} brut / heure).`,
            `Salarié de 15 à moins de 17 ans : ${L.coeff15}, soit ${L.age15Monthly} brut par mois (${L.age15Hourly} brut / heure).`,
            `Contrat d'engagement pendant les vacances (ce n'est pas un contrat de travail) : 15 ans au moins et 27 ans non encore dépassés, deux mois ou 346 heures par an au plus, au moins 80 % du SSM selon l'âge. Pour un majeur, ${L.vacationAdultMonthly} brut par mois, soit ${L.vacationAdultHourly} brut / heure.`,
            "CDD étudiant pendant l'année scolaire : le SSM complet selon l'âge s'applique. La durée moyenne est limitée à 15 h par semaine (60 h par mois), avec une possibilité de 40 h pendant les vacances.",
            "Stage et apprentissage : barèmes distincts, qui ne se confondent ni avec le SSM adulte ni avec le job de vacances.",
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Si la durée maximale d'un engagement de vacances est dépassée, le SSM ordinaire (selon l'âge) s'applique pour le surplus. Pour un stage ou un contrat d'apprentissage, vérifiez la fiche Guichet ou ITM correspondant au contrat, plutôt qu'un pourcentage unique.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiches officielles :",
          label: "élèves, étudiants et jobs de vacances (ITM)",
          href: S.itmStudents.href,
        },
      ],
    },
    {
      id: "brut-net",
      title: "Combien reste-t-il en net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de salaire minimum net unique au Luxembourg. Le net dépend des cotisations sociales, de la classe d'impôt, de la situation familiale, d'éventuels crédits d'impôt et d'autres éléments du bulletin.",
        },
        {
          type: "paragraph",
          text: "Un montant net fiable nécessite de connaître les paramètres sociaux et fiscaux applicables à votre situation. Le convertisseur français du site ne doit pas être utilisé pour un salaire luxembourgeois.",
        },
      ],
    },
    {
      id: "frontaliers",
      title: "Quelles règles pour les frontaliers français ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire social minimum s'applique aux salariés occupés au Luxembourg sous contrat de travail, quelle que soit leur nationalité ou leur commune de résidence. Un frontalier français y a donc droit dans les mêmes conditions qu'un résident, s'il est salarié au Luxembourg.",
        },
        {
          type: "paragraph",
          text: "Le droit au SSM, l'affiliation à la sécurité sociale et l'impôt sur les salaires sont trois questions distinctes. Habiter en France ne diminue pas le plancher légal luxembourgeois. En revanche, le net, les cotisations et le foyer fiscal dépendent de la situation personnelle, y compris des conventions applicables.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Ce guide ne traite pas le détail fiscal des frontaliers (jours travaillés hors Luxembourg, télétravail, classe d'impôt). Pour ces points, l'Administration des contributions directes et, le cas échéant, un conseil compétent restent la référence.",
          ],
        },
      ],
    },
    {
      id: "indexation",
      title: "Comment fonctionnent l'indexation et les prochaines hausses ?",
      blocks: [
        {
          type: "paragraph",
          text: "Deux mécanismes distincts font évoluer le salaire social minimum.",
        },
        {
          type: "list",
          items: [
            "L'indexation automatique : une tranche est déclenchée lorsque la moyenne semestrielle de l'indice des prix à la consommation dépasse de 2,5 % la référence précédente. Les salaires concernés, y compris le SSM, sont alors adaptés de 2,5 %. Ce n'est pas une hausse annuelle à date fixe.",
            "La revalorisation structurelle : tous les deux ans, le gouvernement peut proposer d'ajuster le niveau du SSM, indépendamment de l'indexation.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Présentation officielle du mécanisme :",
          label: "niveau des salaires et indexation (luxembourg.public.lu)",
          href: S.indexationLu.href,
        },
        {
          type: "paragraph",
          text: `La hausse du ${LU_SSM_CURRENT_FROM_LABEL} (indice ${L.indexPrevious} vers ${L.indexCurrent}) est une indexation de 2,5 %.`,
        },
        {
          type: "paragraph",
          text: `Un projet de loi n° ${LU_SSM_BILL_2027_NUMBER} a été déposé le ${LU_SSM_BILL_2027_DEPOSITED_LABEL} et renvoyé à la Commission du Travail le ${LU_SSM_BILL_2027_COMMISSION_LABEL}. Vérifié le ${LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL} : statut « ${LU_SSM_BILL_2027_STATUS} ». Son exposé des motifs propose une revalorisation structurelle de ${L.billPct} au ${LU_SSM_BILL_2027_PROPOSED_FROM_LABEL}. Ce texte n'est pas adopté, pas publié, et ces montants ne sont pas applicables.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Une prévision d'inflation ou une estimation du STATEC n'est pas un calendrier légal. Le barème du 1er juin 2026 reste applicable à la date de vérification de ce guide. Il pourra évoluer à la suite d'une nouvelle tranche d'indexation ou d'une revalorisation légale.",
          ],
        },
      ],
    },
    {
      id: "conventions-primes",
      title: "Conventions collectives, primes et situations particulières",
      blocks: [
        {
          type: "paragraph",
          text: "Une convention collective applicable peut prévoir un minimum plus favorable que le SSM. Dans ce cas, c'est ce minimum conventionnel qui s'impose. Le SSM reste le plancher légal.",
        },
        {
          type: "paragraph",
          text: "Pour vérifier le respect du SSM, il faut identifier les éléments de rémunération qui peuvent être pris en compte. Certains avantages en nature peuvent entrer dans ce calcul dans les conditions précisées par l'ITM, notamment lorsqu'ils sont prévus au contrat. Le cumul de la rémunération en numéraire et de la valeur de ces avantages ne peut pas être inférieur au SSM. Il ne faut pas en déduire qu'une prime annuelle ou un treizième mois permet automatiquement de régulariser un mois insuffisamment rémunéré : leur traitement doit être vérifié au cas par cas.",
        },
        {
          type: "paragraph",
          text: "Les heures supplémentaires relèvent de règles distinctes de rémunération ou de compensation en repos et ne se confondent pas avec le salaire correspondant à la durée normale de travail.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche officielle :",
          label: "avantages en nature et salaire social minimum (ITM)",
          href: S.itmBenefits.href,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "En cas de doute sur les éléments à inclure, l'ITM est l'autorité de contrôle.",
          ],
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec le SMIC français",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français applicable depuis le ${LU_COMPARE_FR_FROM_LABEL} est de ${L.frHourlyShort} brut par heure, soit ${L.frMonthly35} brut par mois pour 35 heures. Le SSM luxembourgeois adulte non qualifié est de ${L.adultUnskilledHourly} brut par heure depuis le ${LU_SSM_CURRENT_FROM_LABEL}.`,
        },
        {
          type: "paragraph",
          text: `En horaire brut, le plancher luxembourgeois est supérieur d'environ ${L.hourlyPctVsFr} au SMIC français. Cette comparaison porte sur des taux horaires officiels, pas sur le net ni sur le pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `On ne compare pas ${L.adultUnskilledMonthly} au Luxembourg et ${L.frMonthly35} en France comme deux temps plein identiques : le mensuel luxembourgeois a pour référence ${LU_SSM_FULL_TIME_WEEKLY} heures hebdomadaires, le mensuel français 35 heures.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le barème français,",
          label: "voir le SMIC en France",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Consulter le guide du salaire minimum en Allemagne",
          href: DE_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Consulter le guide des salaires minimums en Suisse",
          href: CH_HREF,
        },
      ],
    },
    {
      id: "verifier",
      title: "Comment vérifier son salaire et à qui s'adresser ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vérifiez le barème correspondant à votre âge, à votre qualification et à votre temps de travail, puis les éléments de rémunération retenus pour contrôler ce minimum. Si votre salaire de base est inférieur au barème, demandez le détail du calcul avant de conclure à une anomalie. Demandez d'abord une explication à l'employeur, puis contactez l'ITM si nécessaire.",
        },
        {
          type: "list",
          items: [
            {
              text: "Barème officiel des salaires.",
              href: S.itmSalaires.href,
              label: S.itmSalaires.org,
            },
            {
              text: "Paramètres sociaux, dont le SSM.",
              href: S.ccssParams.href,
              label: S.ccssParams.org,
            },
            {
              text: "Qualification et paiement des salaires.",
              href: S.guichetSsm.href,
              label: S.guichetSsm.org,
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Cette page ne fournit pas de conseil juridique personnalisé. En cas de litige, un syndicat, un avocat ou l'ITM peuvent être nécessaires.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel au Luxembourg ?",
      answer: `Depuis le ${LU_SSM_CURRENT_FROM_LABEL}, le salaire social minimum pour un adulte non qualifié à temps plein est de ${L.adultUnskilledMonthly} brut par mois, soit ${L.adultUnskilledHourly} brut par heure.`,
    },
    {
      question: "Quelle différence entre qualifié et non qualifié ?",
      answer: `Le minimum non qualifié est de ${L.adultUnskilledMonthly} brut par mois. Le minimum qualifié est de ${L.adultSkilledMonthly} brut par mois (${L.coeffSkilled}), si la qualification correspond au métier réellement exercé.`,
    },
    {
      question: "Un diplôme français donne-t-il automatiquement droit au minimum qualifié ?",
      answer:
        "Non. Le diplôme doit correspondre au métier exercé. Un diplôme étranger peut nécessiter une équivalence. L'employeur doit être informé, et les fonctions doivent être celles d'un emploi qualifié.",
    },
    {
      question: "Quel montant pour un salarié frontalier ?",
      answer: `Un frontalier salarié au Luxembourg a droit au même salaire social minimum qu'un résident. Pour un adulte non qualifié à temps plein, c'est ${L.adultUnskilledMonthly} brut par mois depuis le ${LU_SSM_CURRENT_FROM_LABEL}. La résidence en France ne réduit pas ce plancher.`,
    },
    {
      question: "Quel est le salaire minimum net au Luxembourg ?",
      answer:
        "Il n'existe pas de net unique. Un montant net fiable nécessite de connaître les paramètres sociaux et fiscaux applicables à votre situation. Le convertisseur français du site ne doit pas être utilisé pour un salaire luxembourgeois.",
    },
    {
      question: "Comment est calculé le minimum à temps partiel ?",
      answer: `On proratise le mensuel officiel selon la durée contractuelle par rapport au temps plein. Exemple pédagogique : ${LU_SSM_PART_TIME_EXAMPLE_HOURS} h sur ${LU_SSM_FULL_TIME_WEEKLY} h, soit environ ${L.partTime20Monthly} brut par mois pour un adulte non qualifié. Le taux horaire officiel reste ${L.adultUnskilledHourly} brut / heure.`,
    },
    {
      question: "Quelle différence entre minimum horaire et mensuel ?",
      answer: `Le mensuel temps plein est le montant publié. Le taux horaire officiel est ce mensuel divisé par ${L.legalHours} heures. Les deux chiffres de l'ITM font foi ; on ne recalcule pas l'un à partir de l'autre déjà arrondi.`,
    },
    {
      question: "Quel minimum pour un étudiant ?",
      answer: `Cela dépend du contrat. Un engagement pendant les vacances (qui n'est pas un contrat de travail) est payé au moins 80 % du SSM selon l'âge (majeur : ${L.vacationAdultMonthly} brut par mois). Un CDD étudiant pendant l'année scolaire suit le SSM complet selon l'âge. Stage et apprentissage ont leurs propres règles.`,
    },
    {
      question: "Quand intervient la prochaine augmentation ?",
      answer: `Aucune hausse future n'est encore applicable. Une tranche d'indexation peut être déclenchée lorsque la moyenne semestrielle de l'indice des prix dépasse de 2,5 % la référence précédente, sans date annuelle fixe. Le projet de loi n° ${LU_SSM_BILL_2027_NUMBER} propose ${L.billPct} au ${LU_SSM_BILL_2027_PROPOSED_FROM_LABEL}, mais il n'est pas adopté.`,
    },
    {
      question: "Que faire si mon salaire semble inférieur au minimum ?",
      answer:
        "Vérifiez le barème correspondant à votre âge, à votre qualification et à votre temps de travail, puis les éléments de rémunération retenus pour contrôler ce minimum. Demandez le détail du calcul à l'employeur, puis contactez l'Inspection du travail et des mines (ITM) si nécessaire.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      `En vigueur depuis le ${LU_SSM_CURRENT_FROM_LABEL} : ${L.adultUnskilledMonthly} brut par mois pour un adulte non qualifié à temps plein.`,
      `Minimum qualifié : ${L.adultSkilledMonthly} brut par mois, sous conditions liées au métier exercé.`,
      "Le net n'est pas unique. Un frontalier salarié au Luxembourg a droit au même plancher légal.",
      `Le projet de revalorisation ${LU_SSM_BILL_2027_PROPOSED_FROM_LABEL} n'est pas encore applicable.`,
    ],
    closingText:
      "Pour comparer le Luxembourg aux autres pays européens ou approfondir le SMIC français, utilisez les guides liés ci-dessous.",
    closingCta: {
      label: "Comparer les salaires minimums en Europe",
      href: SMIC_EUROPE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC en Europe",
          description: "Tableau européen, méthode Eurostat et fiches pays.",
          href: SMIC_EUROPE_HREF,
        },
        {
          title: "SMIC en France",
          description: "Montants horaires et mensuels officiels du SMIC.",
          href: SMIC_HREF,
        },
        {
          title: "Salaire minimum en Allemagne",
          description: "Mindestlohn horaire, estimations mensuelles et règles.",
          href: DE_HREF,
        },
        {
          title: "Salaires minimums en Suisse",
          description: "Pas de taux national : cantons, CCT et frontaliers.",
          href: CH_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Sources officielles",
    blocks: [
      {
        type: "paragraph",
        text: `Sources consultées le ${LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants actuellement applicables reprennent l'ITM et la CCSS (barème du ${LU_SSM_CURRENT_FROM_LABEL}). Les règles de qualification, d'avantages en nature, d'indexation, de conversion horaire et de contrats étudiants reprennent Guichet.lu, l'ITM, luxembourg.public.lu et le Code du travail. Le statut du projet n° ${LU_SSM_BILL_2027_NUMBER} reprend le dossier de la Chambre des députés. Le SMIC français reprend Service-Public F2300.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.itmSalaires.label}.`,
            href: S.itmSalaires.href,
            label: S.itmSalaires.org,
          },
          {
            text: `${S.ccssParams.label}.`,
            href: S.ccssParams.href,
            label: S.ccssParams.org,
          },
          {
            text: `${S.guichetSsm.label}.`,
            href: S.guichetSsm.href,
            label: S.guichetSsm.org,
          },
          {
            text: `${S.itmHourly.label}.`,
            href: S.itmHourly.href,
            label: S.itmHourly.org,
          },
          {
            text: `${S.itmStudents.label}.`,
            href: S.itmStudents.href,
            label: S.itmStudents.org,
          },
          {
            text: `${S.guichetVacation.label}.`,
            href: S.guichetVacation.href,
            label: S.guichetVacation.org,
          },
          {
            text: `${S.guichetStudentCdd.label}.`,
            href: S.guichetStudentCdd.href,
            label: S.guichetStudentCdd.org,
          },
          {
            text: `${S.guichetStage.label}.`,
            href: S.guichetStage.href,
            label: S.guichetStage.org,
          },
          {
            text: `${S.chd8837.label}.`,
            href: S.chd8837.href,
            label: S.chd8837.org,
          },
          {
            text: `${S.chd8837Motifs.label}.`,
            href: S.chd8837Motifs.href,
            label: S.chd8837Motifs.org,
          },
          {
            text: `${S.indexationLu.label}.`,
            href: S.indexationLu.href,
            label: S.indexationLu.org,
          },
          {
            text: `${S.itmQualified.label}.`,
            href: S.itmQualified.href,
            label: S.itmQualified.org,
          },
          {
            text: `${S.itmBenefits.label}.`,
            href: S.itmBenefits.href,
            label: S.itmBenefits.org,
          },
          {
            text: `${S.itmSalaryElements.label}.`,
            href: S.itmSalaryElements.href,
            label: S.itmSalaryElements.org,
          },
          {
            text: `${S.codeTravail.label}.`,
            href: S.codeTravail.href,
            label: S.codeTravail.org,
          },
          {
            text: `${S.servicePublicSmic.label}.`,
            href: S.servicePublicSmic.href,
            label: S.servicePublicSmic.org,
          },
        ],
      },
      {
        type: "callout",
        variant: "vigilance",
        paragraphs: [
          "Ce que ce guide ne permet pas de calculer : un net luxembourgeois personnalisé, ni les règles fiscales d'un frontalier au cas par cas. Les stages, l'apprentissage et les conventions collectives demandent aussi une vérification spécifique.",
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français pour comparer les taux horaires.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Allemagne", href: DE_HREF },
      { title: "Salaires minimums en Suisse", href: CH_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Luxembourg (Europe)",
      description: "Fiche Luxembourg et contexte européen.",
      href: SMIC_EUROPE_LU_HREF,
    },
  },
};
