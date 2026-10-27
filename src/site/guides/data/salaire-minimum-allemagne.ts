import type { Guide } from "../types";
import {
  DE_COMPARE_FR_FROM_LABEL,
  DE_EUROSTAT_DATASET,
  DE_MIN_WAGE_BREADCRUMB,
  DE_MIN_WAGE_CURRENT_FROM_LABEL,
  DE_MIN_WAGE_EXAMPLE_WEEKLY_HOURS,
  DE_MIN_WAGE_H1,
  DE_MIN_WAGE_HISTORY,
  DE_MIN_WAGE_LABELS as L,
  DE_MIN_WAGE_META_DESCRIPTION,
  DE_MIN_WAGE_NEXT_FROM_LABEL,
  DE_MIN_WAGE_PATH,
  DE_MIN_WAGE_PREVIOUS_FROM_LABEL,
  DE_MIN_WAGE_PUBLISHED_AT,
  DE_MIN_WAGE_SEO_TITLE,
  DE_MIN_WAGE_SLUG,
  DE_MIN_WAGE_SOURCES as S,
  DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  DE_MIN_WAGE_SUBTITLE,
  DE_MIN_WAGE_UPDATED_AT,
  DE_MINIJOB_CAP_FROM_LABEL,
  DE_EUROSTAT_PERIOD_LABEL,
  formatDeHourly,
} from "@/site/salaire-minimum-allemagne";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_HREF = "/smic";
const SMIC_EUROPE_DE_HREF = "/smic-europe#salaire-minimum-allemagne";

function monthlyExampleRows(): string[][] {
  return DE_MIN_WAGE_EXAMPLE_WEEKLY_HOURS.map((hours) => {
    const monthly =
      hours === 20
        ? L.monthly20
        : hours === 35
          ? L.monthly35
          : hours === 38
            ? L.monthly38
            : hours === 39
              ? L.monthly39
              : L.monthly40;
    return [`${hours} h`, monthly];
  });
}

function historyRows(): string[][] {
  return DE_MIN_WAGE_HISTORY.map((entry) => [
    entry.fromLabel,
    formatDeHourly(entry.hourly),
    entry.status === "current"
      ? "En vigueur"
      : entry.status === "future"
        ? "À venir"
        : "Historique",
  ]);
}

/**
 * Guide pays : salaire minimum légal allemand (Mindestlohn).
 * URL canonique : /salaire-minimum-allemagne
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumAllemagneGuide: Guide = {
  slug: DE_MIN_WAGE_SLUG,
  publicPath: DE_MIN_WAGE_PATH,
  breadcrumbLabel: DE_MIN_WAGE_BREADCRUMB,
  title: DE_MIN_WAGE_H1,
  seoTitle: DE_MIN_WAGE_SEO_TITLE,
  description: DE_MIN_WAGE_META_DESCRIPTION,
  subtitle: DE_MIN_WAGE_SUBTITLE,
  publishedAt: DE_MIN_WAGE_PUBLISHED_AT,
  updatedAt: DE_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum en Allemagne",
  faqIntro:
    "Réponses courtes sur le Mindestlohn, les estimations mensuelles, la comparaison avec le SMIC français et les cas particuliers.",
  introduction: [
    `Depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}, le salaire minimum légal en Allemagne (gesetzlicher Mindestlohn) est de ${L.currentHourlyShort} brut par heure. Le montant mensuel dépend du nombre d'heures travaillées. Une hausse à ${L.nextHourlyShort} brut par heure est prévue au ${DE_MIN_WAGE_NEXT_FROM_LABEL}.`,
    "Ce salaire minimum est souvent appelé « SMIC allemand » en France. Son nom officiel en Allemagne est gesetzlicher Mindestlohn.",
  ],
  // Encadré « L'essentiel » : composant dédié DeMinWageKeyFigures (page.tsx), pas de quickSummary partagé.
  sections: [
    {
      id: "montant-horaire",
      title: "Quel est le salaire minimum en Allemagne ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le salaire minimum légal général allemand (gesetzlicher Mindestlohn) est un taux horaire brut. Depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}, il s'élève à ${L.currentHourlyShort} brut par heure, selon le ministère fédéral du Travail (BMAS) et la cinquième ordonnance d'ajustement (MiLoV5). Au ${DE_MIN_WAGE_NEXT_FROM_LABEL}, ce taux passera à ${L.nextHourlyShort} : ce montant futur n'est pas encore applicable.`,
        },
        {
          type: "paragraph",
          text: "Ce minimum crée un plancher national pour les salariés concernés. Il n'implique pas que toutes les professions ou tous les contrats reçoivent exactement le même montant : des exceptions existent, et certaines branches peuvent prévoir un minimum supérieur.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer l'Allemagne parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "equivalent-mensuel",
      title: "Combien représente-t-il par mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le minimum légal allemand n'est pas fixé comme un salaire mensuel unique. Pour une estimation indicative, on convertit le taux horaire selon la durée hebdomadaire.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Formule utilisée sur cette page : taux horaire brut × heures hebdomadaires × 52 ÷ 12. Résultats arrondis à deux décimales. Ce sont des moyennes mensuelles théoriques sur 52 semaines.",
          ],
        },
        {
          type: "table",
          caption: `Estimations mensuelles brutes à partir de ${L.currentHourlyShort} / heure (exemples pédagogiques)`,
          headers: ["Durée hebdomadaire", "Estimation mensuelle brute"],
          rows: monthlyExampleRows(),
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "paragraph",
          text: "Ces montants ne constituent pas un salaire minimum mensuel légal allemand. Le paiement réel dépend notamment des heures rémunérées, du contrat et des règles applicables aux absences. Aucune durée de ce tableau n'est une durée légale universelle en Allemagne.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple à 40 h : ${L.currentHourlyShort} × 40 × 52 ÷ 12 = ${L.monthly40} brut par mois (moyenne théorique).`,
            `Exemple à 35 h : ${L.monthly35} brut par mois. Ce n'est pas le SMIC mensuel français, même si la France retient aussi 35 h pour publier son SMIC mensuel.`,
          ],
        },
      ],
    },
    {
      id: "eurostat-conversion",
      title: "Pourquoi Eurostat publie-t-il un autre montant mensuel ?",
      blocks: [
        {
          type: "paragraph",
          text: `Eurostat publie des salaires minimums nationaux en équivalent mensuel brut pour faciliter les comparaisons internationales (dataset ${DE_EUROSTAT_DATASET}). Pour l'Allemagne, où le minimum est horaire, le taux est converti selon une méthode documentée dans les métadonnées Eurostat.`,
        },
        {
          type: "paragraph",
          text: `Pour les données 2026, Eurostat convertit le taux horaire allemand en montant mensuel à partir de ${L.eurostatWeeklyHours} heures par semaine et d'un coefficient de ${L.eurostatMonthFactor}. Les ${L.eurostatWeeklyHours} heures correspondent à une durée hebdomadaire moyenne de référence pour des salariés à temps plein, issue d'une enquête sur les salaires (secteurs d'activité couverts par la nomenclature européenne NACE, sections B à S). Ce n'est pas une durée légale imposée à tous les contrats.`,
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            `Avec ${L.currentHourlyShort} / heure, cette méthode donne environ ${L.eurostatMonthly} brut par mois. C'est le niveau comparable publié pour l'Allemagne au ${DE_EUROSTAT_PERIOD_LABEL} sur la page européenne du site.`,
            "Nos exemples à 20 h, 35 h, 38 h, 39 h ou 40 h restent des illustrations pédagogiques avec des durées explicites. Ils ne remplacent ni le chiffre Eurostat ni un bulletin de paie.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Le chiffre Eurostat allemand et le contexte européen sont aussi présentés dans",
          label: "la fiche Allemagne du guide SMIC en Europe",
          href: SMIC_EUROPE_DE_HREF,
        },
      ],
    },
    {
      id: "brut-et-net",
      title: "Salaire minimum allemand : combien en net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas un montant net unique du Mindestlohn applicable à tous. Le net dépend notamment de la situation fiscale, des cotisations sociales, de l'assurance maladie, du type de contrat (y compris minijob) et, pour certains frontaliers, des règles de résidence et d'affiliation.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Le calculateur brut-net de Brut vers Net est conçu pour le droit français. Il ne doit pas servir à estimer le net d'un salaire allemand.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour une estimation personnalisée, le plus fiable reste un simulateur fiscal ou social allemand adapté à votre situation, ou une simulation de l'employeur. Les montants de cette page restent bruts, sauf mention contraire.",
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec le SMIC en France",
      blocks: [
        {
          type: "paragraph",
          text: `Comparaison des taux horaires bruts en vigueur à la date de vérification de cette page : Allemagne ${L.currentHourlyShort} depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL} ; France ${L.frHourlyShort} depuis le ${DE_COMPARE_FR_FROM_LABEL} (Service-Public F2300).`,
        },
        {
          type: "table",
          caption: "Comparaison des taux horaires bruts (Allemagne / France)",
          headers: ["Pays", "Taux horaire brut", "Date d'application"],
          rows: [
            ["Allemagne (Mindestlohn)", L.currentHourlyShort, DE_MIN_WAGE_CURRENT_FROM_LABEL],
            ["France (SMIC)", L.frHourlyShort, DE_COMPARE_FR_FROM_LABEL],
            [
              "Écart (Allemagne − France)",
              L.hourlyDiff,
              `soit environ ${L.hourlyPctVsFr} par rapport au SMIC français`,
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "paragraph",
          text: `À 35 heures par semaine, le salaire minimum allemand représente environ ${L.monthly35} brut par mois selon notre calcul. En France, le SMIC mensuel officiel pour 35 heures est de ${L.frMonthly35} brut, soit un écart d'environ ${L.monthly35Diff} brut. Le montant allemand présenté ici est une estimation mensuelle, car son minimum légal est fixé à l'heure.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Un taux horaire brut plus élevé n'implique pas automatiquement un meilleur net ni un meilleur niveau de vie. Cotisations, fiscalité, prestations et coût de la vie peuvent différer d'un pays à l'autre.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le barème français détaillé,",
          label: "voir le SMIC en France",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "champ-application",
      title: "À qui s'applique le salaire minimum allemand ?",
      blocks: [
        {
          type: "paragraph",
          text: "Selon le BMAS, le salaire minimum légal s'applique aux personnes qui travaillent en Allemagne, quels que soient le nombre d'heures et la nationalité. Il concerne en principe aussi les minijobs, les travailleurs saisonniers et les personnes étrangères employées en Allemagne, que l'employeur soit allemand ou étranger.",
        },
        {
          type: "paragraph",
          text: "Un Français salarié qui travaille en Allemagne bénéficie en principe du salaire minimum allemand, sous réserve des exceptions prévues par la loi. Pour un travailleur frontalier, le plancher horaire brut allemand reste lié au travail effectué en Allemagne, tandis que la fiscalité, les cotisations et l'affiliation dépendent de sa situation personnelle et peuvent notamment varier en cas de télétravail.",
        },
        {
          type: "list",
          items: [
            "Temps partiel : le minimum s'apprécie à l'heure ; le mensuel baisse avec le volume d'heures.",
            "Nationalité étrangère : le droit au minimum ne dépend pas, en principe, de la nationalité.",
            "Travailleurs saisonniers : couverts en principe, avec des précisions possibles sur les prestations en nature.",
            "Indépendants : le MiLoG vise les salariés ; un vrai statut d'indépendant n'est pas assimilable automatiquement à celui d'un salarié.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Référence : informations BMAS en français sur le salaire minimum ; champ personnel détaillé à l'article 22 du Mindestlohngesetz (MiLoG).",
          ],
        },
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions et situations particulières",
      blocks: [
        {
          type: "paragraph",
          text: "Le MiLoG prévoit des exclusions ou des régimes distincts. Les formulations ci-dessous suivent l'article 22 du texte officiel et la présentation BMAS. Elles ne remplacent pas une analyse du contrat.",
        },
        {
          type: "list",
          items: [
            "Jeunes de moins de 18 ans sans formation professionnelle achevée : en principe non couverts par le minimum général (MiLoG § 22 alinéa 2). Un jeune de moins de 18 ans qui a achevé sa formation n'est pas exclu pour ce seul motif.",
            "Personnes en formation professionnelle (apprentissage) : leur rémunération n'est pas réglée par le MiLoG général ; d'autres règles s'appliquent (MiLoG § 22 alinéa 3).",
            "Chômage de longue durée : pour une personne qui était au chômage de longue durée immédiatement avant son embauche, le salaire minimum général ne s'applique pas pendant les six premiers mois de cet emploi, selon les conditions prévues par la loi (MiLoG § 22 alinéa 4 ; BMAS).",
            "Stages obligatoires liés à la scolarité, à la formation ou aux études : en principe hors du minimum général.",
            "Certains stages volontaires d'orientation ou accompagnant une formation / des études, dans les limites de durée et de conditions de l'article 22 (notamment jusqu'à trois mois selon les cas prévus).",
            "Activités bénévoles : hors du champ du MiLoG pour la rémunération.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Tous les stagiaires ou tous les jeunes ne sont pas exclus. L'exclusion dépend des conditions légales. En cas de doute, se référer au contrat, au MiLoG et aux informations BMAS.",
          ],
        },
      ],
    },
    {
      id: "minimums-sectoriels",
      title: "Minimums sectoriels",
      blocks: [
        {
          type: "paragraph",
          text: "Le Mindestlohn légal général est un plancher national. Dans certaines branches, un minimum conventionnel ou un minimum sectoriel rendu obligatoire peut être plus élevé. Lorsqu'un minimum de branche applicable au salarié est supérieur au minimum légal général, ce minimum plus élevé doit être respecté.",
        },
        {
          type: "paragraph",
          text: "Ces différences sectorielles ne créent pas un salaire minimum légal différent dans chaque Land. Le minimum général reste national. Cette page ne liste pas de montants de branche : ils évoluent et doivent être vérifiés dans la source officielle ou conventionnelle applicable au contrat.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour vérifier si votre secteur prévoit un minimum supérieur, consultez",
          label: "la liste des salaires minimums de branche du BMAS (en allemand)",
          href: S.branchenMindestlohn.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Côté français, un exemple de minimum de branche confronté au SMIC est traité dans",
          label: "le guide du SMIC hôtelier (HCR)",
          href: "/smic-hotelier",
        },
      ],
    },
    {
      id: "minijob",
      title: "Minijob et salaire minimum",
      blocks: [
        {
          type: "paragraph",
          text: `Un minijob avec plafond de rémunération (Minijob mit Verdienstgrenze) est une activité salariée mineure. Ce plafond n'est pas le salaire minimum : c'est une limite du régime minijob. Le Mindestlohn horaire s'applique en principe aussi aux minijobs.`,
        },
        {
          type: "paragraph",
          text: `En 2026, le plafond régulier du minijob est de ${L.minijobCap} par mois en moyenne, soit ${L.minijobAnnual} sur douze mois (depuis le ${DE_MINIJOB_CAP_FROM_LABEL}, Minijob-Zentrale). Les revenus peuvent varier d'un mois à l'autre. Un dépassement ponctuel ne fait pas automatiquement perdre le statut : des règles particulières existent, notamment pour certains dépassements imprévisibles.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            `Repère théorique : à exactement ${L.currentHourlyShort} / heure, environ ${L.minijobHoursAtMin} heures par mois correspondent au plafond de ${L.minijobCap}. Ce n'est pas un volume d'heures garanti dans toutes les situations : d'autres éléments de rémunération peuvent entrer dans le calcul du plafond.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Détail des dépassements (en allemand) :",
          label: "FAQ Minijob-Zentrale sur le plafond de 603 €",
          href: S.minijobFaqCap.href,
        },
      ],
    },
    {
      id: "evolution",
      title: "Évolution du salaire minimum allemand",
      blocks: [
        {
          type: "paragraph",
          text: "Le Mindestlohn légal existe depuis le 1er janvier 2015. Son niveau est régulièrement ajusté, le plus souvent via une proposition de la Mindestlohnkommission reprise par règlement. La chronologie ci-dessous se limite aux étapes récentes utiles pour lire le montant actuel et le prochain montant déjà fixé.",
        },
        {
          type: "table",
          caption: "Évolution récente du Mindestlohn (brut / heure)",
          headers: ["À partir du", "Montant", "Statut"],
          rows: historyRows(),
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "paragraph",
          text: `Hausse ${DE_MIN_WAGE_PREVIOUS_FROM_LABEL} → ${DE_MIN_WAGE_CURRENT_FROM_LABEL} : de ${L.previousHourlyShort} à ${L.currentHourlyShort}, soit environ ${L.rise2026}. Hausse prévue ${DE_MIN_WAGE_CURRENT_FROM_LABEL} → ${DE_MIN_WAGE_NEXT_FROM_LABEL} : de ${L.currentHourlyShort} à ${L.nextHourlyShort}, soit environ ${L.rise2027}. En 2026, le salaire minimum légal général est de ${L.currentHourlyShort} brut par heure. Le taux de ${L.nextHourlyShort} s'appliquera à partir du ${DE_MIN_WAGE_NEXT_FROM_LABEL}.`,
        },
      ],
    },
    {
      id: "non-respect",
      title: "Que faire si le salaire minimum n'est pas respecté ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si vous pensez être payé en dessous du Mindestlohn, des premiers réflexes utiles sont : conserver le contrat, les relevés d'heures et les bulletins ; demander des explications écrites à l'employeur ; vérifier si une exception légale ou un minimum de branche s'applique réellement à votre situation.",
        },
        {
          type: "paragraph",
          text: "En Allemagne, le contrôle de l'application du salaire minimum relève notamment de l'administration douanière via la Finanzkontrolle Schwarzarbeit (FKS). Le site des douanes (Zoll) présente les conditions minimales de travail et le rôle des contrôles. Le BMAS publie aussi des informations pratiques, y compris en français.",
        },
        {
          type: "list",
          items: [
            {
              text: "Informations BMAS en français sur le salaire minimum.",
              href: S.bmasFr.href,
              label: S.bmasFr.org,
            },
            {
              text: "Page Zoll sur les conditions minimales de travail (en allemand).",
              href: S.zollMindest.href,
              label: S.zollMindest.org,
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Cette page ne fournit pas de conseil juridique personnalisé, ni de délais de procédure. En cas de litige, un conseil compétent (syndicat, avocat, organisme compétent) peut être nécessaire.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum en Allemagne en 2026 ?",
      answer: `Depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}, le salaire minimum légal général est de ${L.currentHourly}. C'est un montant horaire brut. Le mensuel dépend des heures travaillées.`,
    },
    {
      question: "Quel est l'équivalent du SMIC en Allemagne ?",
      answer: `L'équivalent usuel du « SMIC allemand » est le gesetzlicher Mindestlohn (${L.currentHourlyShort} brut par heure depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}). « SMIC » n'est pas le nom officiel allemand.`,
    },
    {
      question: "Quel salaire minimum pour 35 h ou 40 h par semaine ?",
      answer: `Ce sont des estimations pédagogiques, pas un minimum mensuel légal : à 35 h, environ ${L.monthly35} brut par mois ; à 40 h, environ ${L.monthly40} brut par mois (formule taux × heures × 52 ÷ 12).`,
    },
    {
      question: "Quel est le salaire minimum allemand net ?",
      answer:
        "Il n'existe pas de net unique. Le net dépend de la fiscalité, des cotisations, du contrat et parfois du statut de frontalier. Cette page ne publie pas de net universel et n'utilise pas le convertisseur brut-net français.",
    },
    {
      question: "Un Français travaillant en Allemagne y a-t-il droit ?",
      answer:
        "En principe oui, s'il travaille en Allemagne comme salarié concerné par le MiLoG, quelle que soit sa nationalité. Des exceptions existent (jeunes sans formation achevée, certains stages, apprentis, chômage de longue durée immédiatement avant l'embauche, etc.). La fiscalité et les cotisations d'un frontalier dépendent de sa situation personnelle.",
    },
    {
      question: "Le salaire minimum est-il le même partout en Allemagne ?",
      answer:
        "Le Mindestlohn légal général est national. Lorsqu'un minimum de branche applicable est supérieur, ce minimum plus élevé doit être respecté, sans créer un minimum légal différent par Land.",
    },
    {
      question: "Quel salaire minimum est prévu en 2027 ?",
      answer: `Une hausse à ${L.nextHourly} est prévue au ${DE_MIN_WAGE_NEXT_FROM_LABEL} (MiLoV5). Ce montant n'est pas encore applicable.`,
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      `En vigueur : ${L.currentHourly} depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}.`,
      `Mensuel : variable selon les heures ; les exemples (dont ${L.monthly35} à 35 h) sont des moyennes calculées.`,
      `À venir : ${L.nextHourlyShort} au ${DE_MIN_WAGE_NEXT_FROM_LABEL}, pas encore applicable.`,
      `Écart horaire avec le SMIC français (${L.frHourlyShort}) : environ ${L.hourlyDiff}, soit ${L.hourlyPctVsFr}.`,
    ],
    closingText:
      "Pour comparer l'Allemagne aux autres pays européens ou approfondir le SMIC français, utilisez les guides liés ci-dessous.",
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
          title: "SMIC selon le nombre d'heures",
          description: "Estimations françaises selon la durée hebdomadaire.",
          href: "/smic-selon-nombre-heures",
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
        text: `Sources consultées le ${DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants allemands en vigueur et futurs reprennent le BMAS (y compris la page en français) et la MiLoV5. Les estimations mensuelles de cette page utilisent la formule taux × heures × 52 ÷ 12. Pour les données 2026, le chiffre Eurostat allemand utilise la conversion (horaire × ${L.eurostatWeeklyHours}) × ${L.eurostatMonthFactor}. Le SMIC français reprend Service-Public F2300.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.bmasFr.label}.`,
            href: S.bmasFr.href,
            label: S.bmasFr.org,
          },
          {
            text: `${S.bmasGlossar.label} (en allemand).`,
            href: S.bmasGlossar.href,
            label: S.bmasGlossar.org,
          },
          {
            text: `${S.milov5.label} (en allemand).`,
            href: S.milov5.href,
            label: S.milov5.org,
          },
          {
            text: `${S.branchenMindestlohn.label} (en allemand).`,
            href: S.branchenMindestlohn.href,
            label: S.branchenMindestlohn.org,
          },
          {
            text: `${S.milog.label} ; ${S.milog22.label} (en allemand).`,
            href: S.milog22.href,
            label: S.milog.org,
          },
          {
            text: `${S.kommission.label} (en allemand).`,
            href: S.kommission.href,
            label: S.kommission.org,
          },
          {
            text: `${S.minijob.label} ; ${S.minijobFaqCap.label} (en allemand).`,
            href: S.minijobFaqCap.href,
            label: S.minijob.org,
          },
          {
            text: `${S.eurostatMeta.label} (conversion mensuelle allemande, en anglais).`,
            href: S.eurostatMeta.href,
            label: S.eurostatMeta.org,
          },
          {
            text: `${S.eurostatExplained.label} (en anglais).`,
            href: S.eurostatExplained.href,
            label: S.eurostatExplained.org,
          },
          {
            text: `${S.eurostatData.label}.`,
            href: S.eurostatData.href,
            label: S.eurostatData.org,
          },
          {
            text: `${S.servicePublicSmic.label}.`,
            href: S.servicePublicSmic.href,
            label: S.servicePublicSmic.org,
          },
          {
            text: `${S.zollMindest.label} (en allemand).`,
            href: S.zollMindest.href,
            label: S.zollMindest.org,
          },
        ],
      },
      {
        type: "callout",
        variant: "vigilance",
        paragraphs: [
          "Ce que ce guide ne permet pas de calculer : un net allemand personnalisé, ni les règles fiscales et sociales d'un frontalier au cas par cas. Les minimums de chaque branche et le détachement international demandent aussi une vérification spécifique.",
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
      { title: "SMIC selon le nombre d'heures", href: "/smic-selon-nombre-heures" },
      { title: "SMIC hôtelier (HCR)", href: "/smic-hotelier" },
    ],
    relatedSimulator: {
      title: "Fiche Allemagne (Europe)",
      description: "Repère Eurostat et contexte européen pour l'Allemagne.",
      href: SMIC_EUROPE_DE_HREF,
    },
  },
};
