import type { Guide, GuideSubsection, GuideTable } from "../types";
import {
  CURRENT_LEGAL_RATE,
  ENRICHED_YEARS,
  SMIC_HISTORY,
  SMIC_HISTORY_BREADCRUMB,
  SMIC_HISTORY_EDITORIAL_YEAR,
  SMIC_HISTORY_H1,
  SMIC_HISTORY_META_DESCRIPTION,
  SMIC_HISTORY_PATH,
  SMIC_HISTORY_PUBLISHED_AT,
  SMIC_HISTORY_SEO_TITLE,
  SMIC_HISTORY_SLUG,
  SMIC_HISTORY_SOURCES,
  SMIC_HISTORY_UPDATED_AT,
  SMIC_HISTORY_VERIFIED_ON_LABEL,
  SMIC_PURCHASING_POWER,
  SMIG_1950,
  buildYearAnswer,
  formatPercent,
  largestLegalHourlyIncrease,
  changeCell,
  dateCell,
  emptyCell,
  formatEuro,
  formatFrenchDate,
  hourlyCell,
  monthlyCell,
} from "@/site/smic-history";
import { SMIC_LABELS } from "@/site/smic/data";

const SMIC_HREF = "/smic";
const SMIC_HOURS_HREF = "/smic-selon-nombre-heures";
const SALAIRE_MOYEN_HREF = "/salaire-moyen-france";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";

const currentDate = CURRENT_LEGAL_RATE.effectiveDate
  ? formatFrenchDate(CURRENT_LEGAL_RATE.effectiveDate)
  : "";
const currentHourly = formatEuro(CURRENT_LEGAL_RATE.hourlyGross ?? 0);
const currentMonthly = formatEuro(CURRENT_LEGAL_RATE.monthlyGross ?? 0);
const latestPower = SMIC_PURCHASING_POWER[SMIC_PURCHASING_POWER.length - 1]!;

function observation(entry: (typeof SMIC_HISTORY)[number]): string {
  if (entry.year === 1950) return "Zones géographiques, anciens francs.";
  if (entry.seriesKind === "insee-annual-average") {
    return "Moyenne annuelle Insee convertie en euros, pas un taux du JO.";
  }
  if (entry.seriesKind === "continuation") return "Aucun nouveau taux paru en 2025.";
  if (entry.effectiveDate && entry.effectiveDate >= "2000-01-01" && entry.effectiveDate <= "2005-07-01") {
    return "35 h et garanties mensuelles.";
  }
  if (entry.currency === "FRF" && entry.euroConverted != null) {
    return `soit ${formatEuro(entry.euroConverted)} après conversion monétaire.`;
  }
  return emptyCell();
}

function historyTable(): GuideTable {
  return {
    type: "table",
    caption:
      "Taux légaux Insee / ministère du Travail à compter de 1980. Avant 1980 : jalon 1950 et moyennes annuelles Insee SMIC39, converties en euros. Une année peut avoir plusieurs lignes.",
    headers: [
      "Année",
      "Entrée en vigueur",
      "Type",
      "Horaire brut",
      "Mensuel brut",
      "Durée",
      "Évolution",
      "Observation",
    ],
    rows: SMIC_HISTORY.map((entry) => [
      String(entry.year),
      dateCell(entry),
      entry.type,
      hourlyCell(entry),
      monthlyCell(entry),
      entry.monthlyHoursLabel ?? emptyCell(),
      changeCell(entry),
      observation(entry),
    ]),
    rowHeader: true,
    stickyFirstColumn: true,
    rowIds: SMIC_HISTORY.map((entry) => (entry.isYearAnchor ? entry.yearAnchor : undefined)),
  };
}

function yearSubsection(year: number): GuideSubsection {
  const answer = buildYearAnswer(year);
  return {
    id: `reponse-${year}`,
    title: answer.heading,
    blocks: [{ type: "paragraph", text: answer.text }],
  };
}

function yearsIn(from: number, to: number): number[] {
  return ENRICHED_YEARS.filter((year) => year >= from && year <= to);
}

export const evolutionSmicGuide: Guide = {
  slug: SMIC_HISTORY_SLUG,
  publicPath: SMIC_HISTORY_PATH,
  breadcrumbLabel: SMIC_HISTORY_BREADCRUMB,
  title: SMIC_HISTORY_H1,
  seoTitle: SMIC_HISTORY_SEO_TITLE,
  description: SMIC_HISTORY_META_DESCRIPTION,
  subtitle:
    "Historique officiel du SMIG puis du SMIC : taux horaires et mensuels, dates d'effet, francs et euros, inflation.",
  publishedAt: SMIC_HISTORY_PUBLISHED_AT,
  updatedAt: SMIC_HISTORY_UPDATED_AT,
  includeFaqSchema: false,
  faqSectionId: "questions-frequentes",
  introduction: [
    `Le premier salaire minimum national français, appelé SMIG, est créé en 1950. Il est remplacé en 1970 par le SMIC, qui ne se contente plus de suivre les prix : il doit également faire participer les salariés les moins rémunérés au développement économique.`,
    `Depuis, le montant change selon un mécanisme légal de revalorisation, parfois plusieurs fois dans la même année. Le dernier taux officiel vérifié est de ${currentHourly} brut de l'heure, soit ${currentMonthly} brut par mois pour 35 heures, à compter du ${currentDate}.`,
    "Cette page rassemble l'historique année par année. Elle ne calcule pas un salaire net ancien et ne remplace pas le montant actuellement applicable.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "1950 : création du SMIG, avec des zones géographiques et des montants en anciens francs.",
      "1970 : création du SMIC par la loi du 2 janvier 1970.",
      "2002 : mise en circulation de l'euro fiduciaire. Convertir des francs n'équivaut pas à mesurer le pouvoir d'achat.",
      "2005 : fin de la convergence liée aux 35 heures.",
      `Montant actuellement applicable : ${currentHourly} brut / h et ${currentMonthly} brut / mois à 35 h, depuis le ${currentDate}.`,
    ],
  },
  sections: [
    {
      id: "evolution-graphique",
      title: "L'évolution du SMIC en un coup d'œil",
      blocks: [
        {
          type: "paragraph",
          text: `Le graphique ci-dessous reprend les dates d'entrée en vigueur du SMIC horaire brut publiées par l'Insee à partir de 1980. Chaque point correspond à un taux publié, resté applicable jusqu'à la revalorisation suivante : survolez, cliquez ou choisissez une année pour lire la valeur exacte. Avant 2002, les francs sont convertis au taux officiel de 1 € = 6,55957 F : c'est une conversion monétaire, pas une série en euros constants. La période 1950-1979 figure dans la frise et dans le tableau, car y mélanger anciens francs, nouveaux francs et euros sur une même courbe serait trompeur.`,
        },
        {
          type: "illustration",
          id: "smic-history-hourly-chart",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Chaque point du graphique correspond à une ligne du",
          label: "tableau du SMIC par année",
          href: "#tableau-smic",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le montant aujourd'hui applicable, et non pour l'historique,",
          label: "consulter le montant actuel du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "tableau-smic",
      title: "Tableau de l'évolution du SMIC par année",
      blocks: [
        {
          type: "paragraph",
          text: "Le tableau permet de retrouver une année précise sans parcourir tout l'article. Lorsqu'une année a plusieurs taux, chaque date d'effet a sa ligne. L'ancre smic-2006, par exemple, ouvre directement l'année 2006. Les pourcentages d'évolution comparent deux taux horaires officiels successifs, dans la monnaie où ils ont été publiés ; ils ne sont pas un indicateur Insee autonome.",
        },
        {
          type: "illustration",
          id: "smic-history-year-jump",
        },
        {
          type: "illustration",
          id: "smic-history-decade-nav",
          caption: "Aller directement à une décennie dans le tableau.",
        },
        historyTable(),
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Un montant mensuel historique n'est comparable au SMIC actuel que si la durée de référence est la même. Avant les 35 heures, l'Insee publie surtout un mensuel pour 40 h puis 39 h, pas pour 151,67 h.",
          ],
        },
      ],
    },
    {
      id: "decade-1950",
      title: "1950-1969 : le SMIG",
      blocks: [
        {
          type: "paragraph",
          text: "En 1950, le SMIC n'existe pas. La loi du 11 février 1950 rétablit la libre négociation des salaires dans les conventions collectives et crée un plancher national, le SMIG. Ce plancher n'est pas le salaire négocié de chaque branche : il empêche seulement de descendre en dessous d'un minimum.",
        },
        {
          type: "paragraph",
          text: `Concrètement, un ouvrier parisien et un ouvrier d'une zone moins urbanisée n'avaient pas le même minimum. Le ${SMIG_1950.decreeLabel} fixe un SMIG compris entre ${SMIG_1950.lowestZoneOldFrancsPerHour} francs de l'heure dans la zone la moins favorable et ${SMIG_1950.parisOldFrancsPerHour} francs en région parisienne, en anciens francs. Présenter un seul chiffre national pour 1950 serait inexact.`,
        },
        {
          type: "paragraph",
          text: "À partir de 1952, le SMIG est indexé sur les prix. Les abattements géographiques se resserrent ensuite. En 1960, le passage au nouveau franc change l'unité monétaire, pas le mécanisme. En 1968, le SMIG est fortement relevé : le ministère du Travail évoque une hausse d'environ 35 %, échelonnée, dans le cadre du rapprochement des régimes.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "En 1960, le SMIC n'existait pas encore sous ce nom. Le salaire minimum applicable était le SMIG. La série longue Insee SMIC39 donne seulement une moyenne annuelle convertie en euros, pas le taux du Journal officiel.",
          ],
        },
      ],
      subsections: yearsIn(1950, 1969).map(yearSubsection),
    },
    {
      id: "decade-1970",
      title: "1970-1979 : naissance du SMIC",
      blocks: [
        {
          type: "paragraph",
          text: "La loi n° 70-7 du 2 janvier 1970 remplace le SMIG par le SMIC. Le changement n'est pas seulement de nom : le minimum doit désormais faire participer les bas salaires à la croissance, et plus seulement compenser la hausse des prix.",
        },
        {
          type: "paragraph",
          text: "Les années 1970 sont marquées par une inflation élevée. Le taux horaire progresse donc fortement en francs courants. L'Insee ne publie, pour cette décennie, que des moyennes annuelles converties en euros dans la série SMIC39. La série des taux à date d'effet utilisée dans le tableau commence en 1980.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Le texte fondateur est consultable sur Légifrance :",
          label: SMIC_HISTORY_SOURCES.loi1970.label,
          href: SMIC_HISTORY_SOURCES.loi1970.href,
        },
      ],
      subsections: yearsIn(1970, 1979).map(yearSubsection),
    },
    {
      id: "decade-1980",
      title: "1980-1989",
      blocks: [
        {
          type: "paragraph",
          text: "À partir de 1980, l'Insee publie chaque taux légal avec sa date d'entrée en vigueur. Plusieurs revalorisations peuvent intervenir la même année, surtout au début de la décennie, dans un contexte encore inflationniste.",
        },
        {
          type: "paragraph",
          text: "Le 1er février 1982, la durée légale du travail passe de 40 à 39 heures. Un SMIC mensuel de 1981 (base 40 h) et un SMIC mensuel de 1983 (base 39 h, 169 h / mois) ne se comparent donc pas directement, même si le taux horaire est clairement renseigné.",
        },
        {
          type: "paragraph",
          text: "Les montants de cette décennie sont exprimés en francs. Une conversion en euros est possible au taux officiel, mais elle ne dit rien du niveau de vie de l'époque.",
        },
      ],
      subsections: yearsIn(1980, 1989).map(yearSubsection),
    },
    {
      id: "decade-1990",
      title: "1990-1999",
      blocks: [
        {
          type: "paragraph",
          text: "Dans les années 1990, le SMIC horaire brut continue d'être revalorisé, le plus souvent au 1er juillet. L'Insee suit aussi, à partir de mars 1990, un indice du SMIC et un indice des prix sur la même base 100 : c'est cette série qui permet de parler de pouvoir d'achat sans inventer une méthode.",
        },
        {
          type: "paragraph",
          text: "Les derniers taux en francs figurent dans le tableau jusqu'en 2001. Au 1er juillet 1999, le SMIC horaire brut s'élève à 40,72 F, soit 6 881,68 F brut par mois pour 169 heures.",
        },
      ],
      subsections: yearsIn(1990, 1999).map(yearSubsection),
    },
    {
      id: "decade-2000",
      title: "2000-2009",
      blocks: [
        {
          type: "paragraph",
          text: "Le passage aux 35 heures ne se lit pas comme une multiplication du taux horaire par 151,67. Pour éviter une baisse du revenu mensuel, des garanties mensuelles de rémunération coexistent avec le SMIC horaire. La convergence de ces garanties s'achève en juillet 2005.",
        },
        {
          type: "paragraph",
          text: "L'euro fiduciaire est mis en circulation le 1er janvier 2002. Le taux applicable ce jour-là est encore celui du 1er juillet 2001 (6,67 €). Le premier relèvement en euros de la décennie intervient le 1er juillet 2002, à 6,83 € brut de l'heure.",
        },
        {
          type: "paragraph",
          text: "À compter du 1er juillet 2006, le SMIC horaire brut s'élevait à 8,27 €. Pour 35 heures hebdomadaires, le montant mensuel brut correspondant était de 1 254,28 €. En 2008, deux taux se succèdent (8,63 € au 1er mai, 8,71 € au 1er juillet). La dernière revalorisation annuelle de juillet a lieu en 2009, à 8,82 €.",
        },
      ],
      subsections: yearsIn(2000, 2009).map(yearSubsection),
    },
    {
      id: "decade-2010",
      title: "2010-2019",
      blocks: [
        {
          type: "paragraph",
          text: "À partir de 2010, la revalorisation annuelle intervient au 1er janvier, et non plus au 1er juillet. Le mécanisme légal combine une indexation sur l'inflation constatée pour les ménages modestes et la moitié du gain de pouvoir d'achat du salaire horaire de base des ouvriers et employés.",
        },
        {
          type: "paragraph",
          text: "Cette hausse automatique n'est pas un « coup de pouce ». Le gouvernement peut décider d'un relèvement supplémentaire, mais une annonce politique ne devient un montant applicable qu'avec un texte et une date d'entrée en vigueur. Certaines années, comme 2011 et 2012, ont malgré tout plusieurs taux.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Le taux horaire actuel sert aussi à calculer un mensuel selon la durée du contrat :",
          label: "voir le SMIC selon le nombre d'heures travaillées",
          href: SMIC_HOURS_HREF,
        },
      ],
      subsections: yearsIn(2010, 2019).map(yearSubsection),
    },
    {
      id: "decade-2020",
      title: "2020 à aujourd'hui",
      blocks: [
        {
          type: "paragraph",
          text: `Depuis 2021, la forte inflation a déclenché plusieurs revalorisations automatiques en cours d'année. En 2022, par exemple, le SMIC horaire brut n'a pas un montant unique : 10,57 € au 1er janvier, 10,85 € au 1er mai, puis 11,07 € au 1er août.`,
        },
        {
          type: "paragraph",
          text: `En 2025, aucun nouveau taux n'est paru : 11,88 € brut de l'heure, en vigueur depuis le 1er novembre 2024, est resté applicable toute l'année. Le dernier montant officiel est celui du ${currentDate} : ${currentHourly} brut de l'heure, soit ${currentMonthly} brut par mois à 35 heures.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comparer ce plancher au salaire moyen du privé,",
          label: "voir le guide sur le salaire moyen en France",
          href: SALAIRE_MOYEN_HREF,
        },
      ],
      subsections: yearsIn(2020, SMIC_HISTORY_EDITORIAL_YEAR).map(yearSubsection),
    },
    {
      id: "smic-inflation",
      title: "Le SMIC a-t-il réellement augmenté ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une hausse du montant en euros est une augmentation nominale. L'inflation mesure la hausse des prix. Le pouvoir d'achat du SMIC n'augmente que si le SMIC progresse plus vite que les prix, selon la méthode officielle de l'Insee, et non par une soustraction improvisée.",
        },
        {
          type: "paragraph",
          text: "Si le SMIC augmente de 3 % alors que les prix augmentent de 2 %, son pouvoir d'achat progresse d'environ 1 %. Une hausse du montant en euros ne signifie donc pas automatiquement une amélioration équivalente du niveau de vie.",
        },
        {
          type: "illustration",
          id: "smic-history-inflation-chart",
        },
        {
          type: "paragraph",
          text: `Au quatrième trimestre 2025, l'indice du SMIC horaire brut atteint 260,54 et celui des prix 182,79. Depuis mars 1990, le SMIC a donc été multiplié par 2,6 et les prix par 1,8. Sur l'année ${latestPower.year}, l'Insee indique une évolution du pouvoir d'achat du SMIC horaire brut de ${latestPower.realHourlyGrossPct.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} % pour une inflation de ${latestPower.inflationPct.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} %.`,
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Depuis 1990, le SMIC horaire brut a augmenté plus vite que les prix. Cela n'empêche pas certaines années, comme 2018 ou 2021, d'afficher un léger recul du pouvoir d'achat du SMIC brut. Les chiffres annuels officiels figurent dans le tableau ci-dessous.",
          ],
        },
        {
          type: "table",
          caption:
            "Pouvoir d'achat du SMIC horaire : moyennes annuelles Insee / Dares. Les pourcentages sont ceux de la publication, pas un calcul interne.",
          headers: [
            "Année",
            "SMIC horaire brut moyen",
            "Pouvoir d'achat du brut",
            "Inflation",
          ],
          rows: [...SMIC_PURCHASING_POWER]
            .slice(-12)
            .reverse()
            .map((row) => [
              String(row.year),
              formatEuro(row.hourlyAverageEur),
              `${row.realHourlyGrossPct.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`,
              `${row.inflationPct.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`,
            ]),
          rowHeader: true,
        },
      ],
    },
    {
      id: "revalorisation",
      title: "Comment le SMIC est-il revalorisé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le Code du travail prévoit trois voies. Premièrement, une fixation annuelle : chaque année, avec effet au 1er janvier depuis 2010 (au 1er juillet auparavant). Cette hausse suit notamment l'indice des prix hors tabac des ménages du premier quintile de niveau de vie, et la moitié du gain de pouvoir d'achat du salaire horaire de base des ouvriers et employés.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte applicable :",
          label: SMIC_HISTORY_SOURCES.codeTravailAnnuel.label,
          href: SMIC_HISTORY_SOURCES.codeTravailAnnuel.href,
        },
        {
          type: "paragraph",
          text: "Deuxièmement, un relèvement automatique en cours d'année lorsque l'indice national des prix à la consommation atteint une hausse d'au moins 2 % par rapport à l'indice constaté lors de la fixation immédiatement antérieure du SMIC, et non parce que l'inflation annuelle aurait simplement dépassé 2 %. Le SMIC est alors relevé dans la même proportion dès le premier jour du mois qui suit la publication de l'indice déclencheur. C'est ce mécanisme qui a produit, par exemple, les trois taux de 2022, et le relèvement du 1er juin 2026 à 12,31 €.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Seuil de 2 % :",
          label: SMIC_HISTORY_SOURCES.codeTravailAutomatique.label,
          href: SMIC_HISTORY_SOURCES.codeTravailAutomatique.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Application au 1er juin 2026 :",
          label: SMIC_HISTORY_SOURCES.ministereJuin2026.label,
          href: SMIC_HISTORY_SOURCES.ministereJuin2026.href,
        },
        {
          type: "paragraph",
          text: "Troisièmement, les pouvoirs publics peuvent décider d'un relèvement supplémentaire ou anticipé, par décret ou arrêté. Une annonce n'est pas un montant applicable : seuls le texte publié et sa date d'entrée en vigueur fixent le taux. Le relèvement du 1er novembre 2024 à 11,88 € n'était pas le mécanisme automatique des 2 % : la notice du décret n° 2024-951 du 23 octobre 2024 le présente comme une anticipation de la revalorisation annuelle.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Relèvement supplémentaire possible :",
          label: SMIC_HISTORY_SOURCES.codeTravailSupplementaire.label,
          href: SMIC_HISTORY_SOURCES.codeTravailSupplementaire.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Décret du 23 octobre 2024 :",
          label: SMIC_HISTORY_SOURCES.decretNovembre2024.label,
          href: SMIC_HISTORY_SOURCES.decretNovembre2024.href,
        },
      ],
    },
    {
      id: "frise",
      title: "Frise chronologique du salaire minimum",
      blocks: [
        {
          type: "paragraph",
          text: "Les jalons ci-dessous résument les ruptures utiles pour lire le tableau : création du SMIG, naissance du SMIC, durée du travail, euro, et période récente d'inflation.",
        },
        {
          type: "illustration",
          id: "smic-history-timeline",
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: `Les taux à date d'effet (1980-${SMIC_HISTORY_EDITORIAL_YEAR}) sont repris du fichier Insee marc-salair-smic.xlsx, publié avec la page « Salaire minimum interprofessionnel de croissance ». Plusieurs lignes peuvent apparaître pour une même année dès que le Journal officiel fixe un nouveau taux.`,
        },
        {
          type: "paragraph",
          text: "Les montants mensuels dépendent de la durée de travail de référence publiée à l'époque. Cette page n'applique pas silencieusement 151,67 heures aux années antérieures aux 35 heures.",
        },
        {
          type: "paragraph",
          text: "Les montants antérieurs à l'euro sont lus en francs, puis éventuellement convertis au taux officiel. Conversion monétaire et pouvoir d'achat sont deux notions différentes. Les moyennes annuelles 1951-1979 viennent de la série Insee SMIC39, déjà exprimée en euros : elles ne sont pas des taux du Journal officiel.",
        },
        {
          type: "paragraph",
          text: "Les archives officielles présentent principalement les montants bruts. Le net historique dépendait des cotisations applicables à l'époque et ne peut pas être obtenu en appliquant le taux actuel. Aucun net ancien n'est donc estimé ici.",
        },
        {
          type: "paragraph",
          text: `Dernière vérification des séries : ${SMIC_HISTORY_VERIFIED_ON_LABEL}. Le graphique du SMIC horaire utilise les taux légaux Insee. Le graphique SMIC / prix utilise les indices trimestriels Insee, base 100 en mars 1990.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_HISTORY_SOURCES.inseeAnnual.org} :`,
          label: SMIC_HISTORY_SOURCES.inseeAnnual.label,
          href: SMIC_HISTORY_SOURCES.inseeAnnual.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_HISTORY_SOURCES.inseeLongSeries.org} :`,
          label: SMIC_HISTORY_SOURCES.inseeLongSeries.label,
          href: SMIC_HISTORY_SOURCES.inseeLongSeries.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_HISTORY_SOURCES.loi1970.org} :`,
          label: SMIC_HISTORY_SOURCES.loi1970.label,
          href: SMIC_HISTORY_SOURCES.loi1970.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${SMIC_HISTORY_SOURCES.servicePublic.org} :`,
          label: SMIC_HISTORY_SOURCES.servicePublic.label,
          href: SMIC_HISTORY_SOURCES.servicePublic.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre pourquoi le brut et le net d'aujourd'hui diffèrent,",
          label: "voir le guide sur les cotisations salariales",
          href: COTISATIONS_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur l'évolution du SMIC",
  faqIntro: "Réponses courtes, fondées sur les séries officielles rassemblées dans le tableau.",
  faq: [
    {
      question: "Quand le SMIC a-t-il été créé ?",
      answer:
        "Le SMIC a été créé par la loi du 2 janvier 1970. Le premier salaire minimum national, le SMIG, datait de 1950. Le SMIC n'a pas été créé en 1950.",
    },
    {
      question: "Quelle est la différence entre le SMIG et le SMIC ?",
      answer:
        "Le SMIG garantissait surtout un minimum face aux prix. Le SMIC, depuis 1970, doit aussi faire participer les salariés les moins rémunérés au développement économique.",
    },
    {
      question: "Quel était le SMIC en 2006 ?",
      answer: buildYearAnswer(2006).text,
    },
    {
      question: "Quel était le SMIC en 2009 ?",
      answer: buildYearAnswer(2009).text,
    },
    {
      question: "Pourquoi le montant du SMIC peut-il changer plusieurs fois dans une année ?",
      answer:
        "Parce que trois mécanismes peuvent se succéder : la fixation annuelle, un relèvement automatique si l'indice de référence a augmenté d'au moins 2 % depuis la fixation immédiatement antérieure, ou un relèvement supplémentaire anticipé par décret. Tous les taux d'une même année ne relèvent donc pas du seul seuil de 2 %.",
    },
    {
      question: "Le SMIC augmente-t-il automatiquement chaque année ?",
      answer:
        "Oui, une revalorisation annuelle est prévue. Depuis 2010, elle a lieu au 1er janvier. Une hausse supplémentaire en cours d'année n'est pas garantie.",
    },
    {
      question: "Qui décide de l'augmentation du SMIC ?",
      answer:
        "Le mécanisme légal s'applique d'abord. Le gouvernement peut ajouter un coup de pouce. Le montant applicable est celui du texte publié au Journal officiel, à sa date d'entrée en vigueur.",
    },
    {
      question: "Pourquoi le SMIC était-il exprimé en francs ?",
      answer:
        "L'euro n'est devenu la monnaie fiduciaire qu'en 2002. Avant cette date, les taux officiels sont en francs, anciens francs avant 1960, puis nouveaux francs.",
    },
    {
      question: `Peut-on comparer directement le SMIC mensuel de 1980 et celui de ${SMIC_HISTORY_EDITORIAL_YEAR} ?`,
      answer: `Non. En 1980, le mensuel publié correspond à 40 heures. En ${SMIC_HISTORY_EDITORIAL_YEAR}, il correspond à 35 heures. La monnaie et les prix ont aussi changé. On compare d'abord les taux horaires, puis éventuellement le pouvoir d'achat via les indices officiels.`,
    },
    {
      question: "Comment connaître le SMIC net d'une ancienne année ?",
      answer:
        "Les archives officielles présentent principalement les montants bruts. Le net historique dépendait des cotisations applicables à l'époque et ne peut pas être obtenu en appliquant le taux actuel.",
    },
    {
      question: "Quelle a été la plus forte augmentation du salaire minimum ?",
      answer: (() => {
        const peak = largestLegalHourlyIncrease();
        const peakText = peak?.effectiveDate
          ? `Parmi les taux légaux à date d'effet depuis 1980, la plus forte hausse d'un taux horaire au suivant est celle du ${formatFrenchDate(peak.effectiveDate)} : le SMIC passe de 15,20 F à 16,72 F, soit ${formatPercent(peak.changePercent ?? 0)}. Ce pourcentage compare les deux montants horaires successifs du tableau, dans la monnaie où ils ont été publiés.`
          : "Parmi les taux légaux à date d'effet depuis 1980, plusieurs hausses dépassent 5 % au début des années 1980.";
        return `${peakText} Pour la période antérieure, le ministère du Travail documente une très forte revalorisation du SMIG en 1968, d'environ 35 %, sans que cette page n'en fasse un taux horaire inventé.`;
      })(),
    },
    {
      question: "Le SMIC a-t-il augmenté plus vite que l'inflation ?",
      answer:
        "Depuis 1990, l'indice officiel du SMIC horaire brut a augmenté plus vite que l'indice des prix. Certaines années, le pouvoir d'achat du SMIC brut recule malgré tout. Il faut lire la série Insee, pas une soustraction simpliste.",
    },
    {
      question: "Pourquoi le tableau contient-il parfois plusieurs lignes pour la même année ?",
      answer:
        "Parce que le taux légal peut changer en cours d'année. « Quel était le SMIC en 2022 ? » dépend donc de la date exacte : 10,57 € au 1er janvier, 10,85 € au 1er mai, puis 11,07 € au 1er août.",
    },
    {
      question: "Le montant du SMIC était-il identique partout en France en 1950 ?",
      answer: `Non. Le SMIG de 1950 variait selon les zones, de ${SMIG_1950.lowestZoneOldFrancsPerHour} à ${SMIG_1950.parisOldFrancsPerHour} francs brut de l'heure. Mayotte a encore aujourd'hui un SMIC distinct, hors champ du tableau métropolitain.`,
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le SMIG naît en 1950 ; le SMIC naît en 1970.",
      "Chaque année se lit à sa date d'effet, sa monnaie et sa durée de travail.",
      `Le dernier taux officiel est ${SMIC_LABELS.hourlyGross} brut / h depuis le ${currentDate}.`,
    ],
    closingText:
      "Pour passer de cet historique au montant actuellement applicable, consultez la page du SMIC en vigueur.",
    closingCta: {
      label: "Consulter le montant actuel du SMIC",
      href: SMIC_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC selon le nombre d'heures",
          description:
            "Calculez le SMIC brut et net pour chaque durée de 10 h à 39 h par semaine, y compris le temps partiel et les heures supplémentaires.",
          href: SMIC_HOURS_HREF,
        },
        {
          title: "Différence entre brut et net",
          description:
            "Comprenez pourquoi le salaire brut n'est pas le montant versé : cotisations, nets et prélèvement à la source.",
          href: BRUT_NET_HREF,
        },
      ],
    },
  },
  sidebar: {
    calculator: {
      title: "Montant actuel du SMIC",
      description: "Barème horaire et mensuel actuellement applicable.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC brut et net", href: SMIC_HREF },
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS_HREF },
      { title: "Salaire moyen en France", href: SALAIRE_MOYEN_HREF },
      { title: "Cotisations salariales", href: COTISATIONS_HREF },
      { title: "Différence brut / net", href: BRUT_NET_HREF },
    ],
  },
};
