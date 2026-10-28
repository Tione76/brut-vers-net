import type { Guide } from "../types";
import {
  CH_COMPARE_FR_FROM_LABEL,
  CH_MIN_WAGE_BREADCRUMB,
  CH_MIN_WAGE_EDITORIAL_YEAR,
  CH_MIN_WAGE_H1,
  CH_MIN_WAGE_LABELS as L,
  CH_MIN_WAGE_META_DESCRIPTION,
  CH_MIN_WAGE_PATH,
  CH_MIN_WAGE_PUBLISHED_AT,
  CH_MIN_WAGE_SEO_TITLE,
  CH_MIN_WAGE_SLUG,
  CH_MIN_WAGE_SOURCES as S,
  CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  CH_MIN_WAGE_SUBTITLE,
  CH_MIN_WAGE_TERRITORIES as T,
  CH_MIN_WAGE_UPDATED_AT,
  CH_TESSIN_CURRENT_PERIOD_LABEL,
  CH_TESSIN_FUTURE_FROM_LABEL,
} from "@/site/salaire-minimum-suisse";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_CH_HREF = "/smic-europe#salaire-minimum-suisse";
const SMIC_HREF = "/smic";
const DE_HREF = "/salaire-minimum-allemagne";

function cantonalRows(): string[][] {
  return [
    [
      T.geneve.name,
      L.geneveHourlyShort,
      "Depuis le " + (T.geneve.fromLabel ?? ""),
      "Taux général. Agriculture et floriculture : " + L.geneveAgri + ".",
    ],
    [
      T.baleVille.name,
      L.baleVilleHourlyShort,
      "Depuis le " + (T.baleVille.fromLabel ?? ""),
      "Lieu de travail dans le canton. Hors branches sous CCT étendue.",
    ],
    [
      T.jura.name,
      L.juraHourlyShort,
      "Depuis le " + (T.jura.fromLabel ?? ""),
      "Hors CCT étendue ou signée avec minimum chiffré, et hors certains CTT.",
    ],
    [
      T.neuchatel.name,
      L.neuchatelHourlyShort,
      "Depuis le " + (T.neuchatel.fromLabel ?? ""),
      "Agriculture, viticulture et horticulture : " + L.neuchatelAgri + ".",
    ],
    [
      T.tessin.name,
      L.tessinRange,
      CH_TESSIN_CURRENT_PERIOD_LABEL,
      "Fourchette par secteur NOGA (nomenclature des activités), pas un taux unique.",
    ],
  ];
}

function communalRows(): string[][] {
  return [
    [
      T.lucerneVille.name,
      L.lucerneHourlyShort,
      "En vigueur depuis le " + (T.lucerneVille.fromLabel ?? ""),
      "Ville, pas le canton de Lucerne.",
    ],
    [
      T.zurichVille.name,
      L.zurichHourlyShort,
      "Adopté, pas encore en vigueur",
      "Validé le 12 mai 2026. Date non fixée ; préavis d'au moins six mois.",
    ],
    [
      T.winterthour.name,
      L.winterthourHourlyShort,
      "Adopté, pas encore en vigueur",
      "Validé le 12 mai 2026. Ordonnance encore en préparation.",
    ],
  ];
}

/**
 * Guide pays : salaires minimums suisses (cantons, communes, CCT, CTT).
 * URL canonique : /salaire-minimum-suisse
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumSuisseGuide: Guide = {
  slug: CH_MIN_WAGE_SLUG,
  publicPath: CH_MIN_WAGE_PATH,
  breadcrumbLabel: CH_MIN_WAGE_BREADCRUMB,
  title: CH_MIN_WAGE_H1,
  seoTitle: CH_MIN_WAGE_SEO_TITLE,
  description: CH_MIN_WAGE_META_DESCRIPTION,
  subtitle: CH_MIN_WAGE_SUBTITLE,
  publishedAt: CH_MIN_WAGE_PUBLISHED_AT,
  updatedAt: CH_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum en Suisse",
  faqIntro:
    "Réponses courtes sur l'absence de minimum national, les cantons, Genève, Vaud, Zurich, les frontaliers et les conversions.",
  introduction: [
    `Il n'existe pas de salaire minimum national unique en Suisse. Le minimum applicable dépend notamment du lieu de travail, du secteur et des règles qui couvrent le contrat.`,
    `Certains cantons et certaines communes ont un minimum légal. Ailleurs, un plancher peut venir d'une convention collective de travail (CCT) ou d'un contrat-type de travail (CTT). Les montants de cette page sont bruts et exprimés en francs suisses (CHF).`,
    `On parle parfois de « SMIC suisse », mais il n'existe pas de dispositif national unique portant ce nom. Le taux genevois n'en est pas l'équivalent.`,
  ],
  sections: [
    {
      id: "existe-t-il-un-smic",
      title: "Existe-t-il un SMIC en Suisse ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non : il n'y a pas de salaire minimum fédéral unique. Le 18 mai 2014, le peuple et les cantons ont rejeté l'initiative populaire « Pour la protection de salaires équitables (initiative sur les salaires minimums) ». Depuis, le cadre reste cantonal, communal et conventionnel.",
        },
        {
          type: "paragraph",
          text: "En pratique, plusieurs règles peuvent se superposer. Voici les niveaux à distinguer :",
        },
        {
          type: "list",
          items: [
            "Un minimum légal cantonal, lorsqu'il existe.",
            "Un minimum légal communal, lorsqu'il existe et qu'il est effectivement entré en vigueur.",
            "Un minimum prévu par une convention collective de travail (CCT), parfois étendu.",
            "Un contrat-type de travail (CTT) : les CTT ordinaires n'imposent pas toujours un salaire, contrairement aux CTT avec salaires minimaux obligatoires.",
            "Un salaire usuel ou statistique, qui n'est pas automatiquement un minimum légal.",
            "Le salaire prévu par le contrat individuel.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Un canton sans minimum général n'autorise pas n'importe quel salaire dans toutes les situations. Une CCT, un CTT ou le contrôle des salaires usuels peut quand même s'appliquer.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer la Suisse parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "montants-cantonaux",
      title: `Quels cantons ont un salaire minimum en ${CH_MIN_WAGE_EDITORIAL_YEAR} ?`,
      blocks: [
        {
          type: "paragraph",
          text: "Cinq cantons publient un minimum légal général en 2026 : Genève, Bâle-Ville, Jura, Neuchâtel et Tessin. Les taux ci-dessous sont bruts, en CHF, et ne s'appliquent pas automatiquement à toute personne dans toutes les situations.",
        },
        {
          type: "table",
          caption: "Minimums cantonaux en vigueur en 2026 (brut / heure, CHF). Sources : pages officielles de chaque canton.",
          headers: ["Canton", "Taux", "Période d'application", "Portée essentielle"],
          rows: cantonalRows(),
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "paragraph",
          text: `Le Tessin ne publie pas un taux unique : le décret fixe un horaire brut par secteur économique (nomenclature des activités, code NOGA), dans une fourchette de ${L.tessinRange}. Un décret exécutif du Conseil d'État du 7 octobre 2026, publié au Bulletin officiel le 9 octobre 2026 (recueil 843.620), fixe la fourchette ${L.tessinFutureRange} à compter du ${CH_TESSIN_FUTURE_FROM_LABEL}.`,
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Ce tableau ne liste pas les 26 cantons. L'absence d'une ligne ne signifie pas « aucun minimum local ou sectoriel ». Vérifiez le lieu de travail exact et le secteur.",
          ],
        },
      ],
    },
    {
      id: "minimums-communaux",
      title: "Minimums communaux et montants pas encore applicables",
      blocks: [
        {
          type: "paragraph",
          text: "Un vote ou un arrêt du Tribunal fédéral ne rend pas un montant immédiatement exigible. Seule une entrée en vigueur confirmée par l'autorité compétente permet de présenter un taux comme applicable.",
        },
        {
          type: "table",
          caption: "Minimums communaux vérifiés au 28 octobre 2026 (brut / heure, CHF).",
          headers: ["Ville", "Taux", "Statut", "Particularité"],
          rows: communalRows(),
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: `À Lucerne, le minimum de ${L.lucerneHourlyShort} brut par heure vaut depuis le ${T.lucerneVille.fromLabel} sur le territoire de la ville. Le 27 septembre 2026, les électeurs de la ville ont refusé l'abrogation du règlement : le taux reste en vigueur. Ce maintien n'est pas une garantie définitive : le Grand Conseil cantonal a déclaré recevable en 2025 une motion demandant d'interdire les minimums communaux ; l'effet sur le dispositif de la ville n'est pas encore connu. Le taux ne s'applique pas au reste du canton de Lucerne.`,
        },
        {
          type: "paragraph",
          text: `À Zurich (${L.zurichHourlyShort}) et à Winterthour (${L.winterthourHourlyShort}), les règlements communaux ont été validés par le Tribunal fédéral le 12 mai 2026. Les deux villes reprennent les travaux d'exécution. Aucune date d'entrée en vigueur n'était publiée au ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Ces montants ne sont donc pas encore exigibles. La ville de Zurich indique qu'elle informera avec un préavis d'au moins six mois avant l'entrée en vigueur.`,
        },
        {
          type: "list",
          items: [
            {
              text: "Page officielle de la ville de Lucerne.",
              href: S.lucerneVille.href,
              label: S.lucerneVille.org,
            },
            {
              text: "Motion 419 du Grand Conseil lucernois (minimums communaux).",
              href: S.lucerneMotion.href,
              label: S.lucerneMotion.org,
            },
            {
              text: "Page officielle de la ville de Zurich.",
              href: S.zurichVille.href,
              label: S.zurichVille.org,
            },
            {
              text: "Page officielle de Winterthour.",
              href: S.winterthour.href,
              label: S.winterthour.org,
            },
          ],
        },
      ],
    },
    {
      id: "geneve",
      title: "Salaire minimum à Genève",
      blocks: [
        {
          type: "paragraph",
          text: `Depuis le ${T.geneve.fromLabel}, le salaire minimum genevois est de ${L.geneveHourly}. Il s'agit d'un salaire horaire brut, indexé chaque année sur l'indice genevois des prix à la consommation. L'arrêté cantonal fixe aussi un taux distinct de ${L.geneveAgri} dans l'agriculture.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Taux futur déjà annoncé : ${L.geneveFuture} brut par heure à partir du ${T.geneve.futureFromLabel}. Ce montant n'est pas encore applicable.`,
          ],
        },
        {
          type: "paragraph",
          text: `Le canton publie des équivalents mensuels : ${L.geneveMonthly40Official} pour 40 h par semaine et ${L.geneveMonthly41Official} pour 41 h. Ce sont des conversions sur 12 mois, pas un minimum mensuel unique pour toute la Suisse.`,
        },
        {
          type: "paragraph",
          text: `Le salaire déterminant est celui de l'assurance-vieillesse et survivants (AVS). Le calcul et le versement se font sur une base mensuelle. Le canton permet toutefois de répartir le minimum sur 13 versements, ou de différer jusqu'en fin d'année une part d'au plus 8,33 %. Dans le cas d'une répartition sur 13 versements, le salaire horaire de base doit atteindre au moins ${L.geneve13thBase} en 2026. Ce n'est pas un droit automatique à un 13e salaire pour tous les salariés.`,
        },
        {
          type: "paragraph",
          text: "Pour le personnel payé à l'heure, les indemnités de vacances et de jours fériés s'ajoutent au salaire minimum. Les suppléments prévus par la loi sur le travail (nuit, dimanche, heures supplémentaires) ne peuvent pas être absorbés dans le taux minimum.",
        },
        {
          type: "paragraph",
          text: "Les personnes habituellement occupées dans le canton y sont soumises, sous réserve des exceptions prévues par la loi. Depuis le 8 avril 2026, un job d'été peut être rémunéré à 75 % du salaire minimum ordinaire, soit 18,44 CHF brut par heure en 2026. Cela suppose un étudiant immatriculé dans un établissement reconnu, une activité occasionnelle pendant les vacances scolaires ou universitaires, et une durée d'au plus 60 jours par année civile.",
        },
        {
          type: "list",
          items: [
            {
              text: "Montant, 13e salaire et calculette officielle.",
              href: S.geneveMontant.href,
              label: S.geneveMontant.org,
            },
            {
              text: "Règles de versement mensuel et part différée.",
              href: S.geneveVersement.href,
              label: S.geneveVersement.org,
            },
            {
              text: "Arrêté 2026 (24,59 CHF, 18,07 CHF en agriculture).",
              href: S.geneveArrete.href,
              label: S.geneveArrete.org,
            },
            {
              text: "Salaire spécifique des jobs d'été (75 % du minimum, conditions officielles).",
              href: S.geneveJobsEte.href,
              label: S.geneveJobsEte.org,
            },
          ],
        },
      ],
    },
    {
      id: "vaud-zurich-bale",
      title: "Vaud, Lausanne, Zurich et Bâle : que vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vaud, Lausanne, Zurich ou Bâle reviennent souvent dans les recherches. Un nom de canton ou de ville ne correspond pas toujours à un taux déjà applicable.",
        },
        {
          type: "paragraph",
          text: "Canton de Vaud et Lausanne. Le 14 juin 2026, les Vaudois ont accepté d'inscrire le principe d'un salaire minimum cantonal dans la Constitution. Ils ont refusé l'initiative législative et le contre-projet des autorités, qui prévoyaient chacun un montant. Aucune loi d'application n'est donc entrée en vigueur. Il n'existe pas, à la date de vérification, de salaire minimum cantonal vaudois exigible, ni de minimum communal lausannois identifié. CCT et CTT restent les premiers repères.",
        },
        {
          type: "paragraph",
          text: `Ville de Zurich. Le canton de Zurich n'a pas de minimum cantonal général. La ville a adopté ${L.zurichHourlyShort} brut par heure ; le Tribunal fédéral a validé le règlement, mais l'entrée en vigueur n'est pas encore fixée. La ville indiquera cette date avec un préavis d'au moins six mois. Jusqu'à cette date, le montant n'est pas exigible.`,
        },
        {
          type: "paragraph",
          text: `Bâle-Ville et Bâle-Campagne. Le minimum de ${L.baleVilleHourlyShort} concerne le canton de Bâle-Ville, pour un lieu de travail dans ce canton. Il ne s'applique pas automatiquement à Bâle-Campagne. Identifier la commune exacte du lieu de travail est indispensable.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail vaudois officiel,",
          label: "lire le communiqué du Conseil d'État vaudois du 14 juin 2026",
          href: S.vaud.href,
        },
      ],
    },
    {
      id: "equivalent-mensuel",
      title: "Combien par mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de « salaire minimum mensuel en Suisse ». Une conversion dépend du taux applicable, de la durée de travail, du mode de rémunération, d'un éventuel 13e salaire et des règles sur les indemnités. 42 h n'est pas une durée légale universelle suisse. 35 h n'est pas non plus la référence principale en Suisse.",
        },
        {
          type: "paragraph",
          text: "Le tableau ci-dessous reprend des montants publiés par une autorité locale. Ce sont des équivalents mensuels sur 12 mois, pas forcément la somme versée chaque mois si le salaire est réparti sur 13 versements. Les montants officiels sont repris tels quels, y compris leur arrondi. Une conversion pédagogique du site utilise la formule taux horaire × heures hebdomadaires × 52 ÷ 12, arrondie au centime.",
        },
        {
          type: "table",
          caption: "Équivalents mensuels publiés par l'autorité compétente (brut, CHF), sur 12 mois. Pas une moyenne nationale.",
          headers: ["Territoire", "Durée", "Mensuel publié", "Ce que représente le chiffre"],
          rows: [
            ["Genève", "40 h / semaine", L.geneveMonthly40Official, "Équivalent sur 12 mois, publié par le canton."],
            ["Genève", "41 h / semaine", L.geneveMonthly41Official, "Équivalent sur 12 mois, publié par le canton."],
            ["Neuchâtel", "40 h / semaine", L.neuchatelMonthly40Official, "Équivalent sur 12 mois, part du 13e comprise ; arrondi au franc."],
            ["Neuchâtel", "42 h / semaine", L.neuchatelMonthly42Official, "Équivalent sur 12 mois, part du 13e comprise ; arrondi au franc."],
            ["Bâle-Ville", "40 h / semaine", L.baleVilleMonthly40Official, "Mensuel de base publié, hors suppléments de vacances du personnel à l'heure."],
            ["Bâle-Ville", "42 h / semaine", L.baleVilleMonthly42Official, "Mensuel de base publié, hors suppléments de vacances du personnel à l'heure."],
          ],
          stackOnMobile: true,
          rowHeader: true,
        },
        {
          type: "paragraph",
          text: `Pour le Jura, le canton publie le taux horaire, pas un mensuel officiel. Conversion pédagogique du site : ${L.juraMonthly40} à 40 h et ${L.juraMonthly42} à 42 h (formule taux × heures × 52 ÷ 12). Ce n'est pas un minimum mensuel jurassien légalement fixé.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Pour comparer deux salaires mensuels, vérifiez qu'ils correspondent au même nombre d'heures et à la même répartition sur 12 ou 13 versements. Les indemnités de vacances et de jours fériés doivent aussi être traitées de la même façon.",
          ],
        },
      ],
    },
    {
      id: "treizieme-vacances",
      title: "13e salaire, vacances et jours fériés",
      blocks: [
        {
          type: "paragraph",
          text: "Un 13e salaire n'est pas automatiquement une somme à ajouter à tous les taux de cette page. Selon le canton, il peut déjà entrer dans le calcul du minimum, ou au contraire ne pas compenser un mois insuffisant. Les indemnités de vacances et de jours fériés du personnel payé à l'heure doivent souvent être versées en plus du taux de base.",
        },
        {
          type: "paragraph",
          text: `À Genève, le minimum peut être réparti sur 13 versements selon les règles cantonales. Le canton indique alors un taux horaire de base minimal de ${L.geneve13thBase} en 2026. Le calcul et le versement restent encadrés : une rémunération mensuelle insuffisante ne peut pas être compensée librement par une prime annuelle. Seule une part d'au plus 8,33 %, ou le 13e salaire s'il fait partie des conditions salariales, peut être différée jusqu'en fin d'année.`,
        },
        {
          type: "paragraph",
          text: `À Bâle-Ville, le taux 2026 est ${L.baleVilleHourlyShort}. Le canton exige le respect du minimum chaque mois. Le versement d'un 13e salaire en novembre ou en décembre ne permet pas de compenser un salaire inférieur au minimum pendant les autres mois. Le taux de ${L.baleVilleFuture} n'entre en vigueur que le ${T.baleVille.futureFromLabel} ; il n'est pas encore applicable.`,
        },
        {
          type: "paragraph",
          text: `Pour le personnel à l'heure à Bâle-Ville, le canton ajoute un supplément de vacances (8,33 % pour quatre semaines, 10,64 % pour cinq semaines) et 0,39 % pour le 1er août. Une personne mensualisée, payée pendant ses vacances, ne se traite pas comme une personne payée à l'heure. Ces règles genevoises ou bâloises ne se généralisent pas à toute la Suisse.`,
        },
      ],
    },
    {
      id: "cct-ctt",
      title: "CCT et CTT : quel minimum s'applique ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une convention collective de travail (CCT) est un accord entre employeurs ou associations d'employeurs et syndicats. Elle lie les membres des parties et les personnes qui s'y soumettent. Lorsqu'une CCT est étendue, elle s'applique aux employeurs et salariés compris dans son champ d'application territorial, professionnel et personnel, même s'ils ne sont pas membres des organisations signataires.",
        },
        {
          type: "paragraph",
          text: "Un contrat-type de travail (CTT) est édicté par une autorité, pas négocié comme une CCT. Un CTT ordinaire règle surtout les conditions de travail : on peut souvent y déroger, y compris au détriment du salarié. Selon le CTT concerné, cette dérogation peut devoir être écrite. Un CTT avec salaires minimaux obligatoires, prévu notamment en cas de sous-enchère abusive répétée, fixe au contraire un plancher auquel on ne peut pas déroger en défaveur du travailleur.",
        },
        {
          type: "paragraph",
          text: "Il ne faut pas « prendre toujours le plus élevé » entre le canton et la CCT. Au Jura, la loi cantonale ne s'applique pas aux branches sous CCT étendue avec salaire minimum chiffré, ni aux entreprises signataires d'une telle CCT. À Bâle-Ville, le minimum cantonal ne vaut pas dans les branches couvertes par une CCT étendue. À Genève, le régime cantonal n'obéit pas au même schéma. Chaque situation se vérifie sur le texte applicable.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Réforme fédérale : une évolution à suivre. Le 19 juin 2026, le Parlement a modifié la loi fédérale permettant d'étendre le champ d'application de la convention collective de travail. Le texte adopté ouvre la possibilité de faire prévaloir certains minimums de CCT étendues sur des minimums cantonaux.",
            "Un référendum populaire contre cette modification a abouti (Chancellerie fédérale, 22 octobre 2026). La réforme n'est donc pas entrée en vigueur. Une votation populaire est nécessaire ; sa date n'était pas encore fixée au 28 octobre 2026.",
            "L'adoption du texte ne remplace pas les barèmes actuellement applicables de ce guide. Les règles de priorité entre canton et CCT restent celles du droit en vigueur aujourd'hui. Si la réforme entre un jour en vigueur, une règle transitoire est prévue pour les cantons où le minimum cantonal primait déjà : la nouvelle primauté ne s'appliquerait qu'une fois le minimum de CCT plus favorable que le montant cantonal alors en vigueur.",
          ],
        },
        {
          type: "paragraph",
          text: "Le SECO met à disposition deux outils distincts. La recherche des salaires minimaux obligatoires indique si une CCT étendue ou un CTT à minimum obligatoire couvre l'activité. Le calculateur national de salaires estime une fourchette statistique de salaire usuel dans les branches sans minimum obligatoire. Cette estimation n'est pas, à elle seule, la preuve qu'un salaire est légal ou illégal. Les commissions paritaires et tripartites restent compétentes.",
        },
        {
          type: "list",
          items: [
            {
              text: "Repérer une CCT étendue ou un CTT à minimum obligatoire.",
              href: S.secoMinima.href,
              label: S.secoMinima.org,
            },
            {
              text: "Estimer un salaire usuel (indication statistique, non contraignante).",
              href: S.secoSalaireUsuel.href,
              label: S.secoSalaireUsuel.org,
            },
            {
              text: "Page d'orientation SECO (détachement et outils).",
              href: S.secoDetachement.href,
              label: S.secoDetachement.org,
            },
            {
              text: "Texte adopté le 19 juin 2026 (FF 2026 1770).",
              href: S.fedlexLecct2026.href,
              label: S.fedlexLecct2026.org,
            },
            {
              text: "Aboutissement du référendum (FF 2026 2877).",
              href: S.fedlexReferendum.href,
              label: S.fedlexReferendum.org,
            },
          ],
        },
      ],
    },
    {
      id: "frontaliers",
      title: "Frontaliers français",
      blocks: [
        {
          type: "paragraph",
          text: "Le lieu de travail et les règles qui couvrent l'emploi sont déterminants. Habiter en France n'exclut pas d'un minimum cantonal, communal, de CCT ou de CTT applicable en Suisse. Un permis G n'est pas un barème salarial.",
        },
        {
          type: "paragraph",
          text: "Salaire minimum, fiscalité et assurance maladie sont des sujets distincts. Un frontalier peut être soumis à un minimum suisse tout en relevant d'un régime fiscal ou d'assurance différent. Il n'existe pas une seule règle fiscale pour tous les frontaliers.",
        },
        {
          type: "paragraph",
          text: "Salarié local, travailleur détaché et télétravailleur transfrontalier ne relèvent pas des mêmes textes. En cas de détachement, le SECO distingue les branches avec salaires minimaux obligatoires et celles où l'on se réfère aux salaires usuels.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Pour un cas personnel (impôt, assurance maladie, télétravail), adressez-vous aux autorités compétentes. Cette page n'est pas un guide fiscal.",
          ],
        },
      ],
    },
    {
      id: "brut-net",
      title: "Brut, net et reste disponible",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de salaire minimum net national unique. Les minimums de ce guide sont exprimés en brut. Le net du bulletin dépend des cotisations (assurance-vieillesse et survivants / invalidité / pertes de gain, chômage, prévoyance professionnelle (LPP) selon l'âge et le contrat, accident, éventuellement maladie perte de gain), d'une éventuelle retenue fiscale à la source, et de la situation du frontalier.",
        },
        {
          type: "paragraph",
          text: "Le net du bulletin n'est pas ce qu'il reste après les dépenses obligatoires. L'assurance maladie suisse, en particulier, ne fonctionne pas comme les cotisations françaises : une prime d'assurance n'est pas nécessairement déduite du salaire.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Le calculateur brut-net français de ce site ne s'applique pas à un salaire suisse. Aucun taux forfaitaire de conversion n'est présenté ici comme fiable pour tous.",
          ],
        },
      ],
    },
    {
      id: "en-euros",
      title: "Salaire minimum suisse en euros",
      blocks: [
        {
          type: "paragraph",
          text: `Les montants légaux suisses restent en CHF. Une conversion en euros n'en crée pas un minimum légal. Le ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, le taux de référence de la Banque centrale européenne était de ${L.ecbChfPerEur} CHF pour 1 euro (soit environ ${L.geneveHourlyEur} pour le seul taux genevois de ${L.geneveHourlyShort}).`,
        },
        {
          type: "paragraph",
          text: "Ce taux BCE est une référence, pas le cours réellement proposé par une banque ou un changeur. Il n'est pas un taux en temps réel : il est daté. Le sens de la cotation est « francs suisses pour un euro ». La série quotidienne ci-dessous permet de retrouver la valeur du 28 octobre 2026, et pas seulement le dernier taux du jour.",
        },
        {
          type: "list",
          items: [
            {
              text: "Graphique officiel CHF/euro, avec l'historique des taux de référence.",
              href: S.ecb.href,
              label: S.ecb.org,
            },
            {
              text: "Série quotidienne CHF pour 1 euro (EXR.D.CHF.EUR.SP00.A).",
              href: S.ecbSeries.href,
              label: S.ecbSeries.org,
            },
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
          text: `On peut comparer un exemple cantonal au SMIC français, pas un taux national suisse. Depuis le ${CH_COMPARE_FR_FROM_LABEL}, le SMIC horaire brut français est de ${L.frHourlyShort}. Le taux genevois de ${L.geneveHourlyShort} correspond, au taux BCE du ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, à environ ${L.geneveHourlyEur}, soit ${L.geneveVsFrPct} de plus que ce SMIC horaire.`,
        },
        {
          type: "paragraph",
          text: "Cette comparaison porte sur des taux horaires bruts. Elle ne compare pas 42 h en Suisse et 35 h en France. Elle ne mesure pas le coût de la vie, ni un gain de pouvoir d'achat. Un autre canton, ou une CCT, donnerait un écart différent.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour les montants officiels du SMIC français,",
          label: "voir le guide du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "verifier-salaire",
      title: "Comment vérifier son salaire",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Identifier le lieu de travail exact",
              description: "Canton et, si besoin, commune. Le siège de l'entreprise ne suffit pas toujours.",
            },
            {
              title: "Identifier le secteur et le contrat",
              description: "Fonction, CCT, CTT ou contrat individuel. La recherche SECO des minimums obligatoires aide à repérer une CCT étendue ou un CTT à plancher.",
            },
            {
              title: "Vérifier le taux et sa date",
              description: "Page officielle du canton ou de la ville, ou texte de la CCT / du CTT. Distinguer un montant futur d'un montant en vigueur.",
            },
            {
              title: "Vérifier les heures et les éléments inclus",
              description: "13e salaire, indemnités de vacances, jours fériés, suppléments. La méthode n'est pas la même partout.",
            },
            {
              title: "Demander confirmation si nécessaire",
              description: "Autorité cantonale, commission paritaire ou, en ville de Lucerne, les contacts indiqués par la commune.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "En cas de doute, conservez le contrat, les décomptes d'heures et les bulletins, puis demandez des explications écrites. Les délais et les procédures dépendent du canton, de la commune et du contrat : adressez-vous à l'autorité ou à la commission compétente.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Ce guide ne calcule pas un net suisse personnalisé, ne recense pas toutes les CCT et ne tranche pas la conformité juridique d'un contrat. Les cas de détachement et de télétravail transfrontalier demandent une vérification spécifique.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Existe-t-il un SMIC en Suisse ?",
      answer:
        "Il n'existe pas de salaire minimum national unique. Le 18 mai 2014, l'initiative fédérale en ce sens a été rejetée. Des minimums cantonaux, communaux, de CCT ou de CTT peuvent toutefois s'appliquer. On parle parfois de « SMIC suisse », mais ce n'est pas le nom d'un dispositif national suisse.",
    },
    {
      question: "Quel est le salaire minimum à Genève ?",
      answer: `Depuis le ${T.geneve.fromLabel}, ${L.geneveHourly}. Un taux de ${L.geneveAgri} s'applique en agriculture. Une hausse à ${L.geneveFuture} est annoncée au ${T.geneve.futureFromLabel}, pas encore applicable.`,
    },
    {
      question: "Quel salaire minimum à Lausanne et dans le canton de Vaud ?",
      answer:
        "Aucun taux cantonal n'est exigible au 28 octobre 2026. Le principe constitutionnel a été accepté le 14 juin 2026, mais l'initiative législative et le contre-projet ont été refusés. Vérifiez CCT et CTT. Aucun minimum communal lausannois n'a été identifié.",
    },
    {
      question: "Y a-t-il un salaire minimum à Zurich ?",
      answer: `La ville a adopté ${L.zurichHourlyShort} brut par heure. Le Tribunal fédéral a validé le règlement le 12 mai 2026, mais la date d'entrée en vigueur n'est pas encore fixée. La ville indiquera cette date avec un préavis d'au moins six mois. Le montant n'est donc pas encore exigible. Le canton de Zurich n'a pas de minimum cantonal général.`,
    },
    {
      question: "Quel montant mensuel pour 40 ou 42 heures ?",
      answer: `Il n'y a pas de minimum mensuel national. À Genève, le canton publie ${L.geneveMonthly40Official} pour 40 h, en équivalent sur 12 mois. À Bâle-Ville, ${L.baleVilleMonthly42Official} pour 42 h (mensuel de base). À Neuchâtel, ${L.neuchatelMonthly42Official} pour 42 h, part de 13e comprise et arrondi au franc. Pour comparer, alignez les heures et la répartition 12 ou 13 versements.`,
    },
    {
      question: "Quel salaire minimum pour un frontalier français ?",
      answer:
        "Le lieu de travail en Suisse et les règles du contrat (canton, commune, CCT, CTT) sont déterminants. Habiter en France n'exclut pas d'un minimum applicable. Un permis G n'est pas un barème. Fiscalité et assurance maladie sont des sujets distincts.",
    },
    {
      question: "Quel salaire minimum suisse en euros ?",
      answer: `Les montants légaux restent en CHF. Au taux BCE du ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL} (${L.ecbChfPerEur} CHF pour 1 €), le seul taux genevois de ${L.geneveHourlyShort} correspond à environ ${L.geneveHourlyEur}. Cette conversion n'est pas un minimum légal en euros.`,
    },
    {
      question: "Existe-t-il un minimum net ?",
      answer:
        "Il n'existe pas de salaire minimum net national unique. Les minimums présentés dans ce guide sont exprimés en brut ; le net dépend de la situation, des cotisations, de la prévoyance, d'une éventuelle retenue fiscale et de l'assurance maladie. Le calculateur brut-net français de ce site ne s'applique pas à un salaire suisse.",
    },
    {
      question: "Que vérifier dans un canton sans minimum légal général ?",
      answer:
        "Le secteur, une CCT éventuellement étendue, un CTT, et les salaires usuels surveillés par les commissions tripartites. L'absence de minimum cantonal n'équivaut pas à l'absence de plancher.",
    },
    {
      question: "Les CCT étendues primeront-elles sur les minimums cantonaux ?",
      answer:
        "Une modification fédérale adoptée le 19 juin 2026 le prévoit, mais un référendum populaire a abouti. La réforme n'est pas entrée en vigueur. Les barèmes et les règles de priorité de ce guide restent ceux du droit actuel. La date de votation n'était pas encore fixée au 28 octobre 2026.",
    },
    {
      question: "Le 13e salaire est-il compris ?",
      answer: `Cela dépend du canton. À Genève, un versement en 13 mensualités impose un horaire de base d'au moins ${L.geneve13thBase} en 2026 ; une rémunération mensuelle insuffisante ne peut pas être compensée librement par une prime annuelle. À Bâle-Ville, le minimum doit être respecté chaque mois : un 13e en novembre ou décembre ne rattrape pas les autres mois. À Neuchâtel, les mensuels du mémento intègrent la part du 13e.`,
    },
    {
      question: "Quels changements sont déjà annoncés pour 2027 ?",
      answer: `Genève : ${L.geneveFuture} au ${T.geneve.futureFromLabel}. Bâle-Ville : ${L.baleVilleFuture} à la même date. Tessin : fourchette ${L.tessinFutureRange} dès le ${CH_TESSIN_FUTURE_FROM_LABEL}, selon le décret exécutif du 7 octobre 2026. Ces montants ne sont pas encore applicables. Zurich et Winterthour n'avaient pas de date d'entrée en vigueur au ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`,
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Pas de salaire minimum national unique en Suisse.",
      `En 2026, des minimums cantonaux existent à Genève (${L.geneveHourlyShort}), Bâle-Ville (${L.baleVilleHourlyShort}), Jura (${L.juraHourlyShort}), Neuchâtel (${L.neuchatelHourlyShort}) et Tessin (${L.tessinRange}).`,
      `La ville de Lucerne a un minimum communal en vigueur (${L.lucerneHourlyShort}). Zurich et Winterthour ont des montants adoptés, pas encore exigibles.`,
      "Vaud a un principe constitutionnel, pas un taux applicable. CCT et CTT peuvent s'appliquer même sans minimum cantonal.",
    ],
    closingText:
      "Pour comparer la Suisse aux autres pays européens ou consulter le SMIC français, utilisez les guides liés ci-dessous.",
    closingCta: {
      label: "Comparer les salaires minimums en Europe",
      href: SMIC_EUROPE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC en Europe",
          description: "Fiche Suisse et tableau européen, sans inventer un SMIC national.",
          href: SMIC_EUROPE_HREF,
        },
        {
          title: "Salaire minimum en Allemagne",
          description: "Mindestlohn national horaire, distinct du cadre suisse.",
          href: DE_HREF,
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
        text: `Sources consultées le ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les taux cantonaux et communaux reprennent les pages officielles compétentes et, en cas de besoin, le texte applicable. En cas de divergence, nous vérifions le texte, sa date et les informations de l'autorité compétente. Les conversions pédagogiques utilisent la formule taux × heures × 52 ÷ 12. Les conversions en euros utilisent le taux BCE du jour de vérification (${L.ecbChfPerEur} CHF pour 1 €). Le SMIC français reprend Service-Public F2300.`,
      },
      {
        type: "list",
        items: [
          { text: `${S.secoDetachement.label}.`, href: S.secoDetachement.href, label: S.secoDetachement.org },
          { text: `${S.secoMinima.label}.`, href: S.secoMinima.href, label: S.secoMinima.org },
          { text: `${S.secoSalaireUsuel.label}.`, href: S.secoSalaireUsuel.href, label: S.secoSalaireUsuel.org },
          { text: `${S.secoFaq.label}.`, href: S.secoFaq.href, label: S.secoFaq.org },
          { text: `${S.secoCct.label}.`, href: S.secoCct.href, label: S.secoCct.org },
          { text: `${S.secoCtt.label}.`, href: S.secoCtt.href, label: S.secoCtt.org },
          { text: `${S.parlament24096.label}.`, href: S.parlament24096.href, label: S.parlament24096.org },
          { text: `${S.fedlexLecct2026.label}.`, href: S.fedlexLecct2026.href, label: S.fedlexLecct2026.org },
          { text: `${S.fedlexReferendum.label}.`, href: S.fedlexReferendum.href, label: S.fedlexReferendum.org },
          { text: `${S.geneveMontant.label}.`, href: S.geneveMontant.href, label: S.geneveMontant.org },
          { text: `${S.geneveVersement.label}.`, href: S.geneveVersement.href, label: S.geneveVersement.org },
          { text: `${S.geneveArrete.label}.`, href: S.geneveArrete.href, label: S.geneveArrete.org },
          { text: `${S.geneveJobsEte.label}.`, href: S.geneveJobsEte.href, label: S.geneveJobsEte.org },
          { text: `${S.neuchatelMemento.label}.`, href: S.neuchatelMemento.href, label: S.neuchatel.org },
          { text: `${S.jura.label}.`, href: S.jura.href, label: S.jura.org },
          { text: `${S.baleVille.label}.`, href: S.baleVille.href, label: S.baleVille.org },
          { text: `${S.baleVilleCommunique.label}.`, href: S.baleVilleCommunique.href, label: S.baleVille.org },
          { text: `${S.tessin.label}.`, href: S.tessin.href, label: S.tessin.org },
          { text: `${S.tessinDecreto2026.label}.`, href: S.tessinDecreto2026.href, label: S.tessin.org },
          { text: `${S.tessinDecreto2027.label}.`, href: S.tessinDecreto2027.href, label: S.tessin.org },
          { text: `${S.tessinBu2027.label}.`, href: S.tessinBu2027.href, label: S.tessin.org },
          { text: `${S.tessinFaq2027.label}.`, href: S.tessinFaq2027.href, label: S.tessin.org },
          { text: `${S.lucerneVille.label}.`, href: S.lucerneVille.href, label: S.lucerneVille.org },
          { text: `${S.lucerneVote.label}.`, href: S.lucerneVote.href, label: S.lucerneVille.org },
          { text: `${S.lucerneMotion.label}.`, href: S.lucerneMotion.href, label: S.lucerneMotion.org },
          { text: `${S.zurichVille.label}.`, href: S.zurichVille.href, label: S.zurichVille.org },
          { text: `${S.winterthour.label}.`, href: S.winterthour.href, label: S.winterthour.org },
          { text: `${S.tribunalFederal.label}.`, href: S.tribunalFederal.href, label: S.tribunalFederal.org },
          { text: `${S.vaud.label}.`, href: S.vaud.href, label: S.vaud.org },
          { text: `${S.initiative2014.label}.`, href: S.initiative2014.href, label: S.initiative2014.org },
          { text: `${S.ecb.label}.`, href: S.ecb.href, label: S.ecb.org },
          { text: `${S.ecbSeries.label}.`, href: S.ecbSeries.href, label: S.ecb.org },
          { text: `${S.servicePublicSmic.label}.`, href: S.servicePublicSmic.href, label: S.servicePublicSmic.org },
        ],
      },
      {
        type: "callout",
        variant: "vigilance",
        paragraphs: [
          "Limites : pas de salaire net personnalisé, pas d'inventaire des 26 cantons, pas de contrôle exhaustif des CCT. Les exceptions genevoises figurent dans la loi et sur ge.ch. Un salaire usuel estimé par le calculateur national du SECO n'est pas une preuve de conformité.",
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français, pour une comparaison horaire brute.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Allemagne", href: DE_HREF },
      { title: "SMIC selon le nombre d'heures", href: "/smic-selon-nombre-heures" },
    ],
    relatedSimulator: {
      title: "Fiche Suisse (Europe)",
      description: "Absence de minimum fédéral et contexte européen.",
      href: SMIC_EUROPE_CH_HREF,
    },
  },
};
