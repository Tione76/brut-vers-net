import type { Guide } from "../types";
import {
  buildCountrySubsection,
  buildMainTable,
  buildPpsExampleTable,
  COUNTRIES_UNVERIFIED,
  COUNTRIES_WITHOUT_NATIONAL,
  EU_COUNTRIES,
  EU_WITHOUT_NATIONAL_COUNT,
  EU_WITH_NATIONAL_COUNT,
  EUROSTAT_DATASET,
  EUROSTAT_EXTRACTED_AT_LABEL,
  EUROSTAT_PERIOD,
  EUROSTAT_PERIOD_LABEL,
  EUROSTAT_SOURCE,
  formatEuroInt,
  OTHER_EUROPE_COUNTRIES,
  SMIC_EUROPE_BREADCRUMB,
  SMIC_EUROPE_EDITORIAL_YEAR,
  SMIC_EUROPE_H1,
  SMIC_EUROPE_META_DESCRIPTION,
  SMIC_EUROPE_PATH,
  SMIC_EUROPE_PUBLISHED_AT,
  SMIC_EUROPE_SEO_TITLE,
  SMIC_EUROPE_SLUG,
  SMIC_EUROPE_SUBTITLE,
  SMIC_EUROPE_UPDATED_AT,
  SMIC_EUROPE_UPDATED_AT_LABEL,
} from "@/site/smic-europe";
import { SMIC_LABELS } from "@/site/smic/data";

const SMIC_HREF = "/smic";
const SMIC_HOURS_HREF = "/smic-selon-nombre-heures";
const GUIDES_HUB = "/guides";

const euCountries = EU_COUNTRIES;
const otherWithSections = OTHER_EUROPE_COUNTRIES.filter((c) => c.status !== "unverified-2026");
const noNationalNames = COUNTRIES_WITHOUT_NATIONAL.map((c) => c.nameFr).join(", ");
const euNoNational = EU_COUNTRIES.filter((c) => c.status === "no-national")
  .map((c) => c.nameFr)
  .join(", ");

export const smicEuropeGuide: Guide = {
  slug: SMIC_EUROPE_SLUG,
  publicPath: SMIC_EUROPE_PATH,
  breadcrumbLabel: SMIC_EUROPE_BREADCRUMB,
  title: SMIC_EUROPE_H1,
  seoTitle: SMIC_EUROPE_SEO_TITLE,
  description: SMIC_EUROPE_META_DESCRIPTION,
  subtitle: SMIC_EUROPE_SUBTITLE,
  publishedAt: SMIC_EUROPE_PUBLISHED_AT,
  updatedAt: SMIC_EUROPE_UPDATED_AT,
  includeFaqSchema: false,
  faqSectionId: "questions-frequentes",
  introduction: [
    `Il n'existe pas un SMIC européen unique en ${SMIC_EUROPE_EDITORIAL_YEAR}. Le mot « SMIC » désigne le salaire minimum français ; à l'échelle européenne, on parle en général de salaire minimum national, et plusieurs pays n'en ont tout simplement pas.`,
    `Cette page rassemble les montants pays par pays, principalement à partir des statistiques Eurostat sur les salaires minimums mensuels bruts comparables au ${EUROSTAT_PERIOD_LABEL}. Elle couvre les 27 États de l'Union européenne et, lorsque les données sont suffisamment fiables, d'autres pays européens.`,
    "Les systèmes diffèrent : taux horaire ou mensuel, 12 ou 14 mensualités, conventions collectives, minima cantonaux. Les chiffres du tableau principal sont des équivalents comparables, pas toujours le montant exact d'une fiche de paie nationale.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "« SMIC » est le nom français du salaire minimum ; ce n'est pas le nom juridique de tous les pays européens.",
      `Sur les 27 pays de l'Union européenne, ${EU_WITH_NATIONAL_COUNT} ont un salaire minimum national en ${SMIC_EUROPE_EDITORIAL_YEAR} ; ${EU_WITHOUT_NATIONAL_COUNT} n'en ont pas : ${euNoNational}.`,
      "L'absence de minimum national ne signifie pas l'absence de planchers salariaux : des conventions collectives ou des minima régionaux peuvent s'appliquer.",
      `Les comparaisons Eurostat sont exprimées en brut, au ${EUROSTAT_PERIOD_LABEL}.`,
      "Un équivalent mensuel Eurostat peut différer du taux horaire, du mensuel à 14 versements ou du montant en devise nationale.",
      `Article mis à jour le ${SMIC_EUROPE_UPDATED_AT_LABEL}. Les données du tableau indiquent leur propre date de référence.`,
    ],
  },
  sections: [
    {
      id: "tableau-salaires-minimums",
      title: `Tableau des salaires minimums en Europe en ${SMIC_EUROPE_EDITORIAL_YEAR}`,
      blocks: [
        {
          type: "paragraph",
          text: `Le tableau ci-dessous liste les pays par ordre alphabétique. Il ne classe pas les montants du plus élevé au plus faible. La colonne euros reprend l'équivalent mensuel brut Eurostat au ${EUROSTAT_PERIOD_LABEL} lorsqu'il existe.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "« Pas de salaire minimum national » n'est pas la même chose qu'une donnée manquante. Eurostat code certains pays en valeur manquante parce qu'un minimum national comparable ne peut pas exister. Hors earn_mw_cur, un pays peut être documenté par une source nationale officielle, indiqué comme n'ayant pas de minimum national, ou laissé en donnée 2026 non vérifiée.",
          ],
        },
        {
          type: "illustration",
          id: "smic-europe-table-letter-nav",
        },
        buildMainTable(),
      ],
    },
    {
      id: "navigation-pays",
      title: "Aller directement à un pays",
      blocks: [
        {
          type: "paragraph",
          text: "Tous les pays disposant d'une section fiable sont regroupés ci-dessous, par ordre alphabétique.",
        },
        {
          type: "illustration",
          id: "smic-europe-country-nav",
        },
      ],
    },
    {
      id: "comment-lire-comparer",
      title: "Comment lire et comparer les salaires minimums européens ?",
      blocks: [
        {
          type: "paragraph",
          text: "Eurostat publie des salaires minimums nationaux sous forme de montants mensuels bruts comparables, deux fois par an : situation au 1er janvier et au 1er juillet. Cette page utilise le semestre 2026-S2, soit le 1er juillet 2026. Un changement intervenu après cette date n'apparaît dans Eurostat qu'à la livraison suivante.",
        },
        {
          type: "list",
          items: [
            "Si le minimum légal est horaire, Eurostat le convertit en équivalent mensuel (durée hebdomadaire × 52 ÷ 12).",
            "Si le minimum est versé sur 14 mois (Espagne, Portugal, Grèce), Eurostat ramène le total annuel à 12 mensualités.",
            "Hors zone euro, Eurostat convertit la devise nationale en euros avec le taux de change qu'il retient, pas le cours du jour de lecture.",
            "Tous les montants Eurostat de ce tableau sont bruts. Cette page ne calcule pas de net étranger.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "L'équivalent Eurostat n'est pas forcément le montant imprimé sur le bulletin national. Pour la France, le barème légal au 1er juin 2026 reste le SMIC horaire et mensuel du site ; Eurostat arrondit le mensuel à l'euro.",
          ],
        },
      ],
    },
    {
      id: "union-europeenne-et-europe",
      title: "Union européenne et Europe : deux périmètres",
      blocks: [
        {
          type: "paragraph",
          text: `Sur les 27 pays de l'Union européenne, ${EU_WITH_NATIONAL_COUNT} disposent d'un salaire minimum national en ${SMIC_EUROPE_EDITORIAL_YEAR}. ${EU_WITHOUT_NATIONAL_COUNT} n'en ont pas : ${euNoNational}.`,
        },
        {
          type: "paragraph",
          text: "L'Union européenne n'impose pas un salaire minimum identique dans tous les États membres. La directive (UE) 2022/2041 relative à des salaires minimaux adéquats encadre les procédures nationales, sans fixer un montant unique. Le 11 novembre 2025, la Cour de justice (grande chambre, affaire C-19/23, Danemark/Parlement et Conseil) a examiné cette directive : elle ne donne pas à l'Union le pouvoir d'imposer un même salaire minimum à tous les pays.",
        },
        {
          type: "paragraph",
          text: "L'Europe au sens de cette page n'est pas limitée à l'UE. Lorsque Eurostat ou une source nationale officielle le permet, d'autres pays européens sont inclus (Royaume-Uni, Suisse, Norvège, pays candidats, etc.). La Turquie et l'Ukraine figurent dans le dataset Eurostat utilisé ici ; cela ne tranche pas un débat géographique, cela suit le périmètre statistique de la source.",
        },
      ],
    },
    {
      id: "salaires-ue",
      title: "Salaires minimums dans les pays de l'Union européenne",
      blocks: [
        {
          type: "paragraph",
          text: `Les sections suivantes reprennent les 27 États membres, par ordre alphabétique. Pour chaque pays, la première phrase donne la situation au regard d'un salaire minimum national. Les montants Eurostat sont ceux du ${EUROSTAT_PERIOD_LABEL}, sauf mention contraire d'un barème national plus précis.`,
        },
      ],
      subsections: euCountries.map(buildCountrySubsection),
    },
    {
      id: "salaires-hors-ue",
      title: "Salaires minimums dans les autres pays européens",
      blocks: [
        {
          type: "paragraph",
          text: "Hors Union européenne, Eurostat couvre une partie des pays candidats et voisins. D'autres pays sont documentés à partir de sources nationales officielles, indiqués comme n'ayant pas de minimum national, ou laissés en donnée 2026 non vérifiée. Le Royaume-Uni, Andorre et Monaco ont un minimum national hors earn_mw_cur 2026-S2.",
        },
      ],
      subsections: otherWithSections.map(buildCountrySubsection),
    },
    {
      id: "pays-sans-minimum-national",
      title: "Quels pays européens n'ont pas de salaire minimum national ?",
      blocks: [
        {
          type: "paragraph",
          text: `Dans cette page, les pays affichés comme n'ayant pas de salaire minimum national sont : ${noNationalNames}.`,
        },
        {
          type: "paragraph",
          text: `Dans l'Union européenne, ce sont ${euNoNational}. Eurostat l'indique explicitement : la donnée n'est pas « introuvable », elle ne peut pas exister sous forme de minimum national comparable.`,
        },
        {
          type: "list",
          items: [
            "Danemark, Finlande, Suède : planchers surtout conventionnels, négociés par branche.",
            "Italie : pas de SMIC national ; minima de conventions collectives sectorielles.",
            "Autriche : couverture conventionnelle très large, sans minimum légal unique.",
            "Suisse : pas de minimum fédéral ; minima dans certains cantons et via les CCT.",
            "Norvège et Islande : pas de minimum national comparable dans Eurostat ; rôle central de la négociation collective.",
            "Bosnie-Herzégovine : pas de salaire minimum national unique ; minima légaux fixés au niveau des entités (Fédération et Republika Srpska), contrairement aux planchers surtout conventionnels du Danemark ou de l'Italie.",
            "Liechtenstein et Saint-Marin : planchers surtout conventionnels, sans salaire minimum national légal unique.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "L'absence de salaire minimum NATIONAL n'équivaut pas à l'absence de protection. Un salarié peut être couvert par un minimum de branche, un contrat-type ou, en Suisse, un minimum cantonal.",
          ],
        },
      ],
    },
    {
      id: "comparer-smic-europeens",
      title: "Peut-on comparer directement les SMIC européens ?",
      blocks: [
        {
          type: "paragraph",
          text: "On peut comparer des équivalents bruts harmonisés, pas le niveau de vie ni le montant viré. Deux pays à 2 000 € brut ne se valent pas si les cotisations, l'impôt, le temps de travail, le 13e ou 14e mois et les prix divergent.",
        },
        {
          type: "list",
          items: [
            "Brut et net : cette page ne convertit pas les minimums étrangers en net. Le coefficient français ne s'applique pas ailleurs.",
            "Horaire et mensuel : un taux horaire élevé peut donner un mensuel plus bas si la durée hebdomadaire de référence est plus courte.",
            "12 ou 14 mensualités : le SMI espagnol à 1 221 € sur 14 versements n'est pas le 1 425 € Eurostat.",
            "Devises : un euro plus fort ou plus faible change l'équivalent affiché sans que le minimum local ait bougé.",
            "Conventions collectives : dans les pays sans minimum national, un « SMIC » Google ne désigne souvent qu'un plancher de branche.",
          ],
        },
      ],
    },
    {
      id: "pouvoir-achat-pps",
      title: "Salaire minimum et pouvoir d'achat en Europe",
      blocks: [
        {
          type: "paragraph",
          text: "Eurostat publie aussi des équivalents en standard de pouvoir d'achat (SPA, parfois appelé PPS). Une unité SPA est conçue pour acheter approximativement le même panier de biens et services dans chaque pays. Ce n'est pas un salaire versé, ni un « salaire réel » calculé par ce site.",
        },
        {
          type: "paragraph",
          text: `Dans l'extrait ${EUROSTAT_PERIOD}, le SPA permet de rapprocher des équivalents bruts exprimés dans des niveaux de prix différents. L'Allemagne, la Belgique, la Bulgarie, l'Estonie, la France et le Luxembourg illustrent ci-dessous l'écart possible entre euros courants et SPA. La Moldavie, l'Ukraine et la Turquie n'ont pas de SPA 2026-S2 dans le même fichier.`,
        },
        buildPpsExampleTable(),
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Ne mélangez pas une colonne en euros et une colonne en SPA. Un pays peut sembler « plus bas » en euros courants et plus proche des autres une fois les prix locaux pris en compte, ou l'inverse.",
          ],
        },
      ],
    },
    {
      id: "donnees-non-verifiees",
      title: "Pays européens sans donnée 2026 suffisamment fiable ici",
      blocks: [
        {
          type: "paragraph",
          text: "Les pays suivants restent sans donnée 2026 suffisamment fiable ici : " +
            COUNTRIES_UNVERIFIED.map((c) => c.nameFr).join(", ") +
            ".",
        },
        {
          type: "paragraph",
          text: "Ils apparaissent dans le tableau principal avec la mention « Donnée 2026 non vérifiée ». Ce n'est pas une affirmation qu'ils n'ont pas de minimum national.",
        },
        {
          type: "list",
          items: [
            "Géorgie : un décret de 1999 fixe encore 20 GEL sur le papier, mais ce plancher n'est pas un salaire minimum fonctionnel en 2026. Le Parlement a rejeté en 2026 des projets visant à instaurer un vrai minimum. Cette page ne retient donc ni 20 GEL comme minimum 2026, ni l'absence de minimum national.",
            "Kosovo : une décision de la réunion gouvernementale n° 273/2025 est publiée à la Gazette officielle (31 octobre 2025), mais le texte officiel accessible n'a pas permis d'extraire les montants. Les chiffres cités par la presse ne sont pas repris ici.",
            "Vatican : le personnel de l'État de la Cité du Vatican relève d'échelles internes. Aucune norme publique assez claire n'a été trouvée pour un salaire minimum national 2026.",
          ],
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: `Comparaisons principales : Eurostat, dataset ${EUROSTAT_DATASET}, période ${EUROSTAT_PERIOD} (${EUROSTAT_PERIOD_LABEL}), mise à jour des données le ${EUROSTAT_EXTRACTED_AT_LABEL}. Unité : euros courants, montants mensuels bruts comparables, et série parallèle en SPA.`,
        },
        {
          type: "list",
          items: [
            "France : barème SMIC du site (arrêté / Service-Public) pour le montant légal ; Eurostat 1 867 € pour la colonne comparable.",
            "Allemagne : 13,90 € / h au 1er janvier 2026 (gouvernement fédéral) ; 2 343 € Eurostat en équivalent mensuel.",
            "Irlande : 14,15 € / h au 1er janvier 2026 (S.I. No. 472/2025) ; 2 391 € Eurostat en équivalent mensuel.",
            "Luxembourg : SSM non qualifié 2 703,74 € au 1er janvier 2026 (IGSS) ; 2 771 € Eurostat au 1er juillet 2026.",
            "Espagne : 1 221 € × 14 (BOE) ; 1 425 € Eurostat en équivalent 12 mois.",
            "Portugal : 920 € × 14 sur le continent (Decreto-Lei n.º 139/2025) ; 966 € aux Açores ; 980 € à Madère ; 1 073 € Eurostat.",
            "Pays-Bas : 14,99 € / h au 1er juillet 2026 (Rijksoverheid) ; 2 338 € Eurostat.",
            "Belgique : RMMMG 2 233,61 € au 1er juillet 2026 (CNT, CCT n° 43/18 puis indexation) ; 2 234 € Eurostat.",
            "Slovénie : 1 481,88 € brut / mois (GOV.SI / Uradni list RS 6/2026) ; 1 482 € Eurostat (arrondi).",
            "Grèce : 920 € × 14 depuis le 1er avril 2026 ; 1 073 € Eurostat.",
            "Chypre : 979 € puis 1 088 € après 6 mois (MLSI) ; 1 088 € Eurostat.",
            "Malte : 229,44 € / semaine (LN 289/2025) ; 994 € Eurostat.",
            "Royaume-Uni : GOV.UK, National Living Wage au 1er avril 2026 ; hors earn_mw_cur 2026-S2.",
            "Suisse : pas de minimum fédéral (Eurostat) ; minima cantonaux rappelés sans inventer un SMIC national.",
            "Andorre : Govern d'Andorra, revalorisation extraordinaire du 1er juillet 2026 (9,05 € / h ; 1 568,67 € / mois).",
            "Monaco : Journal de Monaco, circulaire n° 2026-7 du 26 mai 2026 (12,31 € / h ; 2 080,39 € / mois à 39 h), plus indemnité exceptionnelle de 5 %.",
            "Arménie : ARLIS, loi HO-501-N (75 000 AMD / mois depuis le 1er janvier 2023, toujours en vigueur en 2026).",
            "Azerbaïdjan : décret présidentiel du 23 décembre 2024 (400 AZN / mois depuis le 1er janvier 2025).",
            "Biélorussie : ministère du Travail, 858 BYN / mois depuis le 1er janvier 2026.",
            "Bosnie-Herzégovine : pas de minimum d'État ; FBiH 1 027 KM net (Sl. novine FBiH 100/25) ; RS plancher de base 1 000 KM net / 1 476,23 KM brut (Sl. glasnik RS 115/25).",
            "Liechtenstein : pas de Mindestlohn national (LLV / BuA n° 078/2024) ; minima dans les aveGAV.",
            "Saint-Marin : pas de minimum national légal unique ; loi n° 59/2016 et contrats collectifs de secteur.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: `${EUROSTAT_SOURCE.org} :`,
          label: EUROSTAT_SOURCE.label,
          href: EUROSTAT_SOURCE.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Jeu de données :",
          label: "earn_mw_cur (Data Browser)",
          href: EUROSTAT_SOURCE.datasetHref,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Andorre :",
          label: "Govern d'Andorra, increment extraordinari del salari mínim (1er juillet 2026)",
          href: "https://www.govern.ad/ca/w/el-govern-aprova-un-increment-extraordinari-del-salari-minim-del-2-8-fins-als-1-568-67-euros-mensuals",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Monaco :",
          label: "Journal de Monaco, circulaire n° 2026-7 du 26 mai 2026",
          href: "https://journaldemonaco.gouv.mc/Journaux/2026/Journal-8802/Circulaire-n-2026-7-du-26-mai-2026-relative-au-S.M.I.C.-Salaire-Minimum-Interprofessionnel-de-Croissance-applicable-a-compter-du-1er-juin-2026",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Arménie :",
          label: "ARLIS, loi HO-501-N (modification de la loi HO-66-N)",
          href: "https://www.arlis.am/hy/acts/172110",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Azerbaïdjan :",
          label: "Décret présidentiel du 23 décembre 2024 (400 manats)",
          href: "https://president.az/az/articles/view/67602",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Biélorussie :",
          label: "Ministère du Travail, salaire minimum 858 BYN au 1er janvier 2026",
          href: "https://mintrud.gov.by/ru/minimalnaya-zarabotnaya-plata-ru",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Bosnie-Herzégovine (FBiH) :",
          label: "Odluka o iznosu najniže plaće za 2026. (Sl. novine FBiH 100/25)",
          href: "http://ppp.dws.ba/udocs/Odluka20o20iznosu20najniC5BEe20plaC487e20za2020206.20godinu.pdf",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Bosnie-Herzégovine (Republika Srpska) :",
          label: "Odluka o najnižoj plati u RS za 2026. (Sl. glasnik RS 115/25)",
          href: "https://www.opstina-novigrad.com/storage/Odluka-o-najnizoj-plati-u-Republici-Srpskoj-za-2026.-godinu.pdf",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Liechtenstein :",
          label: "LLV, dispositions aveGAV (pas de minimum national légal)",
          href: "https://www.llv.li/de/landesverwaltung/amt-fuer-volkswirtschaft/zentraler-unternehmensservice-eap-/grenzueberschreitende-dienstleistungen-aus-dem-ausland/entsendung-von-arbeitnehmern/einzuhaltende-bestimmungen-ueber-arbeits-und-beschaeftigungsbedingungen",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Liechtenstein (rapport au Landtag) :",
          label: "BuA n° 078/2024, interpellation Lohngerechtigkeit",
          href: "https://www.llv.li/serviceportal2/amtsstellen/stabstelle-regierungskanzlei/bua_078_2024_interpellationsbeantwortung-lohngerechtigkeit.pdf",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Saint-Marin :",
          label: "Legge 9 maggio 2016 n. 59 (contrattazione collettiva)",
          href: "https://www.consigliograndeegenerale.sm/on-line/home/archivio-leggi-decreti-e-regolamenti/documento17084192.html",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Slovénie :",
          label: "GOV.SI, minimalna plača 1 481,88 € (2026)",
          href: "https://www.gov.si/teme/minimalna-placa/",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Belgique :",
          label: "CNT, montants des CCT au 1er juillet 2026",
          href: "https://cnt-nar.be/fr/documents/montants-des-cct",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Chypre :",
          label: "Département des relations de travail (MLSI), salaire minimum 2026",
          href: "https://www.mlsi.gov.cy/mlsi/dlr/dlr.nsf/All/1BC7DC1FA85737B9C22586870039FD04?OpenDocument=",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Grèce :",
          label: "ministère du Travail, κατώτατος μισθός 920 € au 1er avril 2026",
          href: "https://ypergasias.gov.gr/ergasiakes-scheseis/syllogikes-ergasiakes-sxeseis/katotatos-misthos/",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Estonie :",
          label: "Riigi Teataja, règlement du 23 mars 2026 n° 36 (946 € au 1er avril 2026)",
          href: "https://www.riigiteataja.ee/akt/124032026005",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Roumanie :",
          label: "ministère du Travail, 4 325 lei au 1er juillet 2026",
          href: "https://mmuncii.gov.ro/salariul-de-baza-minim-brut-pe-tara-garantat-in-plata-se-majoreaza/",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Hongrie :",
          label: "426/2025. (XII. 23.) Korm. rendelet (NJT)",
          href: "https://njt.hu/jogszabaly/2025-426-20-22",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Malte :",
          label: "Legal Notice 289/2025, National Minimum Wage National Standard Order",
          href: "https://legislation.mt/eli/ln/2025/289/eng",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Portugal (Açores) :",
          label: "Governo dos Açores, RMMG régionale 966 € au 1er janvier 2026",
          href: "https://portal.azores.gov.pt/web/drqpe/sal%C3%A1rio-m%C3%ADnimo-atualizado",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Portugal (Madère) :",
          label: "Decreto Legislativo Regional n.º 1/2026/M (980 €)",
          href: "https://diariodarepublica.pt/dr/detalhe/decreto-legislativo-regional/1-2026-1033291312",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Directive (UE) 2022/2041 :",
          label: "EUR-Lex, salaires minimaux adéquats",
          href: "https://eur-lex.europa.eu/eli/dir/2022/2041/oj?locale=fr",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "CJUE, 11 novembre 2025 :",
          label: "affaire C-19/23, Danemark/Parlement et Conseil",
          href: "https://curia.europa.eu/juris/liste.jsf?num=C-19/23&language=fr",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Icônes de drapeaux provenant du site :",
          label: "https://www.drapeauxdespays.fr/",
          href: "https://www.drapeauxdespays.fr/",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Cette page est informative. Elle ne remplace pas un bulletin de paie, une convention collective ni un conseil juridique dans le pays concerné.",
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes, alignées sur le tableau et les sections pays. Les montants Eurostat sont ceux du 1er juillet 2026, sauf mention d'un barème national différent.",
  faq: [
    {
      question: "Existe-t-il un SMIC européen ?",
      answer:
        "Non. Il n'existe pas un salaire minimum unique pour toute l'Europe. La directive (UE) 2022/2041 n'impose pas non plus un même montant dans tous les États membres. Chaque pays a ses règles. Le mot SMIC désigne le minimum français. Vingt-deux pays de l'UE ont un minimum national ; cinq n'en ont pas.",
    },
    {
      question: "Quel est le salaire minimum en Allemagne en 2026 ?",
      answer:
        "Le Mindestlohn légal est de 13,90 € brut par heure depuis le 1er janvier 2026. Eurostat en publie un équivalent mensuel brut comparable de 2 343 € au 1er juillet 2026.",
    },
    {
      question: "Quel est le salaire minimum en Belgique en 2026 ?",
      answer: `Le plancher interprofessionnel est le RMMMG (CCT n° 43). Au 1er juillet 2026, il s'élève à 2 233,61 € brut par mois pour les 18 ans et plus. Eurostat publie ${formatEuroInt(2234)}, soit le même montant arrondi. La hausse d'avril (2 189,81 €) vient de la CCT n° 43/18, pas d'une simple indexation.`,
    },
    {
      question: "Quel est le salaire minimum en Espagne en 2026 ?",
      answer:
        "Le SMI est de 1 221 € brut par mois sur 14 mensualités (Real Decreto 126/2026, effets au 1er janvier 2026). Eurostat publie 1 425 € brut par mois en équivalent sur 12 mois au 1er juillet 2026.",
    },
    {
      question: "Quel est le salaire minimum au Portugal en 2026 ?",
      answer:
        "La RMMG du continent est de 920 € brut par mois depuis le 1er janvier 2026, habituellement sur 14 mensualités. Les Açores appliquent 966 € et Madère 980 €. Eurostat publie 1 073 € brut par mois en équivalent sur 12 mois au 1er juillet 2026.",
    },
    {
      question: "Existe-t-il un salaire minimum en Italie ?",
      answer:
        "Il n'existe pas de salaire minimum national unique en Italie. Les minima relèvent surtout des conventions collectives de secteur. Eurostat ne publie pas de montant national comparable.",
    },
    {
      question: "Existe-t-il un salaire minimum en Suisse ?",
      answer:
        "Il n'existe pas de salaire minimum fédéral. Certains cantons ont un minimum cantonal, et des conventions collectives peuvent fixer des planchers de branche. Il n'y a pas de SMIC suisse national.",
    },
    {
      question: "Quels pays européens n'ont pas de salaire minimum national ?",
      answer: `Dans cette page : ${noNationalNames}. Dans l'UE : ${euNoNational}. La Bosnie-Herzégovine n'a pas de minimum d'État unique, mais des minima légaux d'entités.`,
    },
    {
      question: "Les salaires minimums européens sont-ils exprimés en brut ou en net ?",
      answer:
        "Les équivalents Eurostat de cette page sont en brut. Le SMIC français net indiqué dans la section France est un montant indicatif Service-Public, pas un net européen généralisé.",
    },
    {
      question: "Pourquoi le salaire minimum Eurostat peut-il différer du montant national ?",
      answer:
        "Parce qu'Eurostat convertit un taux horaire ou hebdomadaire en mensuel, ramène 14 mensualités à 12, convertit les devises et arrondit souvent à l'euro. Le barème légal du pays reste la référence du bulletin.",
    },
    {
      question: "Peut-on comparer directement les salaires minimums entre pays ?",
      answer:
        "On peut comparer des équivalents bruts harmonisés. On ne peut pas en déduire le niveau de vie, le net viré ou le pouvoir d'achat sans autre indicateur, par exemple le SPA d'Eurostat.",
    },
    {
      question: "Qu'est-ce que le standard de pouvoir d'achat (PPS/SPA) ?",
      answer:
        "C'est une unité artificielle d'Eurostat qui corrige en partie les différences de prix entre pays. Ce n'est pas un salaire versé sur le compte.",
    },
    {
      question: `Quel est le SMIC en France en ${SMIC_EUROPE_EDITORIAL_YEAR} ?`,
      answer: `Le SMIC actuellement applicable est de ${SMIC_LABELS.hourlyGross} brut par heure, soit ${SMIC_LABELS.monthlyGross} brut par mois à 35 h, depuis le 1er juin 2026. Eurostat publie 1 867 € brut par mois au 1er juillet 2026.`,
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Il n'y a pas un SMIC européen : il y a des salaires minimums nationaux, et parfois aucun.",
      `Dans l'UE, ${EU_WITH_NATIONAL_COUNT} pays ont un minimum national et ${EU_WITHOUT_NATIONAL_COUNT} n'en ont pas.`,
      "Les montants Eurostat sont des équivalents mensuels bruts comparables au 1er juillet 2026, pas toujours le chiffre du bulletin.",
      "Pour la France, le barème légal reste celui du SMIC national, détaillé sur la page dédiée.",
    ],
    closingText:
      "Pour le barème français, les heures travaillées ou un autre brut, utilisez les pages ci-dessous.",
    closingCta: {
      label: "Voir le SMIC en France",
      href: SMIC_HREF,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez un salaire net à partir d'un brut français.",
      href: "/",
    },
    relatedGuides: [
      { title: "SMIC : montants officiels", href: SMIC_HREF },
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS_HREF },
      { title: "SMIC hôtelier (HCR)", href: "/smic-hotelier" },
      { title: "Évolution du SMIC", href: "/evolution-smic" },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    discover: [{ title: "Salaire moyen en France", href: "/salaire-moyen-france" }],
  },
};
