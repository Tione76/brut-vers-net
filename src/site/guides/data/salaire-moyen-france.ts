import type { Guide } from "../types";
import {
  PRIVATE_HISTORY_FACTS,
  PRIVATE_REGIONS_2024,
  SALAIRE_MOYEN_AMOUNTS_BLOCK_TITLE,
  SALAIRE_MOYEN_EDITORIAL_YEAR,
  SALAIRE_MOYEN_FIELD_NOTE,
  SALAIRE_MOYEN_FRESHNESS_LINE,
  SALAIRE_MOYEN_H1,
  SALAIRE_MOYEN_LABELS as L,
  SALAIRE_MOYEN_META_DESCRIPTION,
  SALAIRE_MOYEN_PUBLISHED_AT,
  SALAIRE_MOYEN_SEO_TITLE,
  SALAIRE_MOYEN_SOURCES,
  SALAIRE_MOYEN_STAT_YEAR,
  SALAIRE_MOYEN_UPDATED_AT,
  euroMonth,
} from "@/site/salaire-moyen/data";

const SMIC_HREF = "/smic";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const LIRE_FICHE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const BRUT_VERS_NET_HUB = "/salaire-brut-mensuel-en-net";
const NET_VERS_BRUT_HUB = "/salaire-net-mensuel-en-brut";
const BON_SALAIRE_HREF = "/quel-est-un-bon-salaire-en-france";
const AUGMENTATION_HREF = "/calculateurs/augmentation-salaire";
const HOME_HREF = "/";

const REGION_ROWS = PRIVATE_REGIONS_2024.map((region) => [
  region.label,
  euroMonth(region.net),
  String(SALAIRE_MOYEN_STAT_YEAR),
]);

/**
 * Page pilier salaire moyen France (/salaire-moyen-france).
 * Chiffres : source unique `@/site/salaire-moyen/data`.
 * Title SEO evergreen ; H1 daté ; année statistique Insee distincte.
 */
export const salaireMoyenFranceGuide: Guide = {
  slug: "salaire-moyen-france",
  publicPath: "/salaire-moyen-france",
  breadcrumbLabel: "Salaire moyen",
  title: SALAIRE_MOYEN_H1,
  seoTitle: SALAIRE_MOYEN_SEO_TITLE,
  description: SALAIRE_MOYEN_META_DESCRIPTION,
  subtitle:
    "Chiffres officiels Insee (privé et fonction publique), différence moyenne / médiane, et mode d'emploi pour comparer sans se tromper.",
  publishedAt: SALAIRE_MOYEN_PUBLISHED_AT,
  updatedAt: SALAIRE_MOYEN_UPDATED_AT,
  introduction: [
    `Dernière réponse Insee disponible : en ${SALAIRE_MOYEN_STAT_YEAR}, un salarié du privé gagne en moyenne ${L.meanNet} net par mois en EQTP (${L.meanGross} brut). La moitié gagne moins de ${L.medianNet} net (médiane).`,
    "Ces cartes ci-dessous résument les montants. Le reste de l'article détaille le champ, les catégories, les régions et la façon de comparer sans mélanger des indicateurs.",
  ],
  quickSummary: {
    title: SALAIRE_MOYEN_AMOUNTS_BLOCK_TITLE,
    items: [
      {
        rate: L.meanNet,
        description: `Net moyen privé (${SALAIRE_MOYEN_STAT_YEAR}, EQTP)`,
      },
      {
        rate: L.medianNet,
        description: `Net médian privé (${SALAIRE_MOYEN_STAT_YEAR}, EQTP)`,
      },
      {
        rate: L.meanGross,
        description: `Brut moyen privé (${SALAIRE_MOYEN_STAT_YEAR}, EQTP)`,
      },
      {
        rate: String(SALAIRE_MOYEN_STAT_YEAR),
        description: "Année statistique Insee (pas l'année du H1)",
      },
    ],
    synthesis: [SALAIRE_MOYEN_FRESHNESS_LINE],
  },
  introSummary: {
    title: "L'essentiel à retenir",
    items: [
      "Les montants officiels les plus cités portent sur le privé en EQTP, pas sur « tous les Français ».",
      `La médiane nette est inférieure d'environ ${L.medianGap} à la moyenne : les hauts salaires tirent la moyenne vers le haut.`,
      "Cadres, âge, secteur et région font fortement varier les niveaux.",
      "Privé et fonction publique reposent sur des champs différents : comparer avec prudence.",
      "Le net Insee est avant prélèvement à la source de l'impôt sur le revenu.",
    ],
  },
  sections: [
    {
      id: "derniers-chiffres",
      title: "Salaire moyen en France : les derniers chiffres officiels",
      blocks: [
        {
          type: "paragraph",
          text: `Le tableau ci-dessous regroupe les indicateurs centraux du privé ${SALAIRE_MOYEN_STAT_YEAR} (Insee Première n° 2079, paru le ${SALAIRE_MOYEN_SOURCES.inseePrive2024.publishedOnLabel}). Il sert de référence ; les cartes du haut de page en reprennent les trois montants principaux.`,
        },
        {
          type: "table",
          caption: `Secteur privé ${SALAIRE_MOYEN_STAT_YEAR}, EQTP (Insee Première n° 2079)`,
          headers: ["Indicateur", "Montant", "Lecture"],
          rows: [
            ["Net moyen", L.meanNet, "Moyenne arithmétique"],
            ["Brut moyen", L.meanGross, "Avant cotisations salariales"],
            ["Net médian", L.medianNet, "Un salarié sur deux gagne moins"],
            ["1er décile (D1)", L.d1, "10 % gagnent moins"],
            ["9e décile (D9)", L.d9, "10 % gagnent plus"],
          ],
        },
        {
          type: "paragraph",
          text: `Depuis ${SALAIRE_MOYEN_STAT_YEAR}, le champ publié intègre les apprentis, les stagiaires et Mayotte. Hors apprentis/stagiaires et hors Mayotte, le net moyen serait de ${L.meanNetExclApprentices}. Ce détail explique une partie des écarts avec d'anciennes séries.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            SALAIRE_MOYEN_FIELD_NOTE,
            "Le net Insee est un net de cotisations sociales, avant prélèvement à la source.",
          ],
        },
      ],
    },
    {
      id: "moyen-ou-median",
      title: "Salaire moyen ou salaire médian : quelle différence ?",
      blocks: [
        {
          type: "paragraph",
          text: "La moyenne décrit le niveau global de la masse salariale. La médiane décrit mieux le « milieu » de la distribution : la moitié des salariés est en dessous, l'autre moitié au-dessus.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple pédagogique fictif (ce n'est pas une statistique française) : cinq salaires de 1 500 €, 1 800 €, 2 000 €, 2 200 € et 8 000 €. La médiane est exactement 2 000 €. La moyenne est exactement 3 100 €, tirée vers le haut par un seul salaire très élevé.",
          ],
        },
        {
          type: "paragraph",
          text: `En ${SALAIRE_MOYEN_STAT_YEAR}, le rapport interdécile D9/D1 vaut ${L.interdecile} : le seuil des 10 % les mieux payés est au moins ${L.interdecile} fois celui des 10 % les moins payés. Un salarié sur cent dépasse ${L.p99} net par mois.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "Pour savoir si votre rémunération est plutôt modeste ou élevée par rapport aux autres salariés du privé, consultez notre page",
          label: "quel est un bon salaire en France",
          href: BON_SALAIRE_HREF,
        },
      ],
    },
    {
      id: "brut-et-net",
      title: "Salaire moyen brut et net",
      blocks: [
        {
          type: "paragraph",
          text: `L'écart entre brut moyen et net moyen du privé ${SALAIRE_MOYEN_STAT_YEAR} correspond surtout aux cotisations et contributions salariales. Ce n'est pas un coefficient unique applicable à chaque bulletin : statut, primes et dispositifs changent la structure des retenues.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Ne convertissez pas un salaire net moyen en brut (ou l'inverse) avec un taux générique.",
            "Le net Insee n'est pas le « net à payer » après prélèvement à la source.",
          ],
        },
      ],
    },
    {
      id: "cadres-et-categories",
      title: "Cadres, professions intermédiaires, employés et ouvriers",
      blocks: [
        {
          type: "paragraph",
          text: "L'Insee publie des moyennes par catégorie socioprofessionnelle (PCS), pas par métier nommé. Une moyenne « cadres » ne doit jamais être présentée comme le salaire d'un ingénieur, d'un développeur ou d'un commercial en particulier.",
        },
        {
          type: "table",
          caption: `Salaires moyens EQTP par PCS, privé ${SALAIRE_MOYEN_STAT_YEAR} (Insee Première n° 2079)`,
          headers: ["Catégorie", "Net", "Brut"],
          rows: [
            ["Cadres (y compris chefs d'entreprise salariés)", L.cadresNet, L.cadresGross],
            ["Professions intermédiaires", L.piNet, L.piGross],
            ["Employés", L.employesNet, L.employesGross],
            ["Ouvriers", L.ouvriersNet, L.ouvriersGross],
            ["Ensemble", L.meanNet, L.meanGross],
          ],
        },
        {
          type: "paragraph",
          text: `L'écart cadres / employés illustre surtout des différences de structure d'emplois (responsabilité, part variable, secteurs), pas un « bonus métier » automatique. Les ouvriers se situent un peu au-dessus des employés en moyenne EQTP, ce qui tient notamment à la composition des postes et aux primes, sans conclure à une hiérarchie individuelle.`,
        },
        {
          type: "paragraph",
          text: `Les femmes gagnent en moyenne ${L.womenNet} net en EQTP, contre ${L.menNet} pour les hommes (écart d'environ ${L.genderGap} à volume de travail comparable). Cet écart reflète surtout la répartition des emplois et des secteurs, pas uniquement un écart à poste strictement identique.`,
        },
      ],
    },
    {
      id: "selon-age",
      title: "Salaire moyen selon l'âge",
      blocks: [
        {
          type: "paragraph",
          text: `Dans le privé ${SALAIRE_MOYEN_STAT_YEAR}, le net moyen EQTP progresse nettement entre le début de carrière et la quarantaine, puis ralentit. L'âge capte aussi l'expérience et la position dans l'échelle des postes, sans isoler un effet « purement lié à l'âge ».`,
        },
        {
          type: "table",
          caption: `Net moyen EQTP par âge (privé ${SALAIRE_MOYEN_STAT_YEAR}, Insee Première n° 2079)`,
          headers: ["Tranche d'âge", "Net moyen"],
          rows: [
            ["Moins de 25 ans", L.ageUnder25],
            ["25 à 39 ans", L.age25to39],
            ["40 à 49 ans", L.age40to49],
            ["50 à 54 ans", L.age50to54],
            ["55 ans et plus", L.age55plus],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            `Pour les moins de 25 ans, l'intégration des apprentis et stagiaires pèse fortement : hors apprentis/stagiaires (et hors Mayotte), le net moyen de cette tranche passe à ${L.ageUnder25Excl}.`,
          ],
        },
      ],
    },
    {
      id: "selon-secteur",
      title: "Salaire moyen selon le secteur d'activité",
      blocks: [
        {
          type: "paragraph",
          text: "Les moyennes sectorielles masquent d'importantes différences internes. Un secteur « élevé » concentre souvent davantage de cadres ou d'activités à forte rémunération ; un secteur « bas » concentre davantage d'emplois peu qualifiés ou à temps partiel fréquent (même en EQTP, la structure des postes reste différente).",
        },
        {
          type: "table",
          caption: `Exemples de secteurs (net moyen EQTP, privé ${SALAIRE_MOYEN_STAT_YEAR}, Insee Première n° 2079)`,
          headers: ["Secteur", "Net moyen"],
          rows: [
            ["Industrie", L.industrieNet],
            ["Tertiaire (ensemble)", L.tertiaireNet],
            ["Construction", L.constructionNet],
            ["Services financiers", L.financeNet],
            ["Information-communication", L.infoComNet],
            ["Hébergement-restauration", L.hebergementNet],
          ],
        },
        {
          type: "paragraph",
          text: `L'écart entre services financiers (${L.financeNet}) et hébergement-restauration (${L.hebergementNet}) montre l'amplitude possible à l'intérieur du tertiaire. Ces chiffres ne permettent pas de conclure qu'un métier donné « paie mieux » dans un secteur sans tenir compte du type de poste.`,
        },
      ],
    },
    {
      id: "selon-region",
      title: "Salaire moyen selon la région",
      blocks: [
        {
          type: "paragraph",
          text: `Les moyennes régionales du privé ${SALAIRE_MOYEN_STAT_YEAR} sont mesurées au lieu de travail, en EQTP. L'Île-de-France reste nettement au-dessus du reste du pays, où les écarts entre régions métropolitaines sont plus serrés. Un salaire régional plus élevé ne signifie pas un pouvoir d'achat plus élevé : le coût du logement et des services n'est pas corrigé ici.`,
        },
        {
          type: "table",
          caption: `Net moyen EQTP par région (privé ${SALAIRE_MOYEN_STAT_YEAR}, lieu de travail ; Insee 2012733)`,
          headers: ["Région", "Net moyen", "Année"],
          rows: REGION_ROWS,
        },
        {
          type: "paragraph",
          text: "Hors Île-de-France, la plupart des régions se situent sous la moyenne nationale, tirée vers le haut par la concentration francilienne de cadres et d'activités très rémunératrices. Occitanie et Guyane affichent le même net moyen dans ce tableau : deux territoires différents, une moyenne comparable, sans conclusion sur le niveau de vie.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Source : ${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.title}, paru le ${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.publishedOnLabel}.`,
            "Champ : salariés du privé au lieu de travail, EQTP (même champ que Insee Première n° 2079).",
          ],
        },
      ],
    },
    {
      id: "prive-et-public",
      title: "Secteur privé et fonction publique",
      blocks: [
        {
          type: "paragraph",
          text: "Comparer privé et public exige de la prudence : sources (base Tous salariés vs Siasp), champs et structures d'emplois diffèrent. Une moyenne proche ne signifie pas que les deux populations sont rémunérées de la même façon.",
        },
        {
          type: "table",
          caption: `Fonction publique ${SALAIRE_MOYEN_STAT_YEAR} (net moyen EQTP, Insee / Siasp)`,
          headers: ["Versant", "Net moyen", "Évolution réelle 2024/2023"],
          rows: [
            ["Ensemble fonction publique", L.publicEnsemble, L.publicEnsembleChange],
            ["Fonction publique de l'État (FPE)", L.fpeNet, L.fpeChange],
            ["Fonction publique hospitalière (FPH)", L.fphNet, L.fphChange],
            ["Fonction publique territoriale (FPT)", L.fptNet, L.fptChange],
          ],
        },
        {
          type: "paragraph",
          text: `Le net moyen de l'ensemble de la fonction publique (${L.publicEnsemble}) est proche de celui du privé (${L.meanNet}) en ${SALAIRE_MOYEN_STAT_YEAR}, mais les versants divergent nettement : la FPE dépasse 3 000 € net moyens, la FPT reste plus basse. Selon le Rapport annuel sur l'état de la fonction publique (DGAFP), le niveau plus élevé de la FPE s'explique notamment par sa structure d'emplois, avec une proportion plus importante d'agents de catégorie A, ce qui relève le salaire moyen de ce versant.`,
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Les publications FPE, FPT et FPH excluent notamment certains publics (militaires, apprentis, etc.) selon leur champ propre.",
          ],
        },
      ],
    },
    {
      id: "evolution-pouvoir-achat",
      title: "Évolution des salaires et pouvoir d'achat",
      blocks: [
        {
          type: "paragraph",
          text: `En ${SALAIRE_MOYEN_STAT_YEAR}, le salaire net moyen du privé progresse de ${L.netCurrentChange} en euros courants et de ${L.netConstantChange} en euros constants (après inflation de ${L.inflation}). Le brut moyen augmente de ${L.grossCurrentChange} en euros courants.`,
        },
        {
          type: "paragraph",
          text: "Après deux années de recul du pouvoir d'achat des salaires (2022 et 2023), 2024 marque un redressement. L'Insee souligne toutefois que ce regain permet à peine de retrouver le niveau de 2019 en euros constants.",
        },
        {
          type: "illustration",
          id: "salaire-moyen-evolution-eqtp",
          caption: `Indice du salaire net moyen EQTP en euros constants (base 100 = ${PRIVATE_HISTORY_FACTS.indexBaseYear}). Source : Insee, L'essentiel sur… les salaires. Points officiels retenus ; pas d'interpolation inventée.`,
        },
        {
          type: "paragraph",
          text: `Entre ${PRIVATE_HISTORY_FACTS.indexBaseYear} et 2024, le pouvoir d'achat du salaire net moyen du privé a progressé de ${L.historyGain} (soit environ ${L.historyAnnual} par an en moyenne). L'indice passe de 100 à ${L.historyIndex2024}, après un pic en 2020 puis un repli lié à l'inflation de 2022-2023. L'indice 2024 (${L.historyIndex2024}) reste légèrement sous celui de 2019 (${L.historyIndex2019}).`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Salaire nominal : montant en euros courants.",
            "Salaire réel (euros constants) : pouvoir d'achat après prise en compte de l'inflation.",
            "Une hausse nominale peut coexister avec une baisse du pouvoir d'achat si les prix augmentent plus vite.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-different",
      title: "Pourquoi votre salaire peut être différent de la moyenne",
      blocks: [
        {
          type: "list",
          items: [
            "Temps partiel ou volume de travail inférieur à un EQTP sur l'année.",
            "Métier, expérience et ancienneté (non isolés dans une moyenne nationale).",
            "Région et structure locale des emplois (sans correction du coût de la vie).",
            "Secteur d'activité et taille d'entreprise.",
            "Primes, 13e mois, intéressement, épargne salariale.",
            "Statut (cadre / non-cadre, public / privé) et conventions collectives.",
            "Comparaison à une moyenne alors que la médiane décrit mieux le « milieu » de la distribution.",
          ],
        },
      ],
    },
    {
      id: "comparer-son-salaire",
      title: "Comment comparer correctement son salaire",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Choisir le bon indicateur",
              description:
                "Préférez la médiane pour un ordre de grandeur « typique », la moyenne pour un niveau global.",
            },
            {
              title: "Aligner brut ou net",
              description:
                "Comparez net avec net (avant PAS) ou brut avec brut. Évitez les mélanges.",
            },
            {
              title: "Raisonner en EQTP",
              description:
                "Un temps partiel ne se compare pas directement à une moyenne EQTP sans retraitement.",
            },
            {
              title: "Tenir compte du champ",
              description:
                "Privé ≠ fonction publique. France entière ≠ votre région. PCS ≠ métier précis.",
            },
            {
              title: "Croiser avec votre situation",
              description:
                "Âge, secteur, région et primes expliquent souvent l'essentiel de l'écart.",
            },
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple de mauvaise comparaison : Alice travaille à 80 % et compare son net mensuel versé (après prélèvement à la source) à la moyenne nationale EQTP avant impôt. Elle conclut à tort qu'elle est « très en dessous ». En réalité, elle mélange volume de travail, net après impôt et moyenne nationale. Une comparaison correcte aligne d'abord le net avant PAS, puis raisonne en EQTP et, si possible, dans sa catégorie et sa région.",
          ],
        },
      ],
    },
    {
      id: "sources-methodologie",
      title: "Sources et méthodologie",
      blocks: [
        {
          type: "paragraph",
          text: "Tous les montants chiffrés de cette page proviennent de publications Insee. Aucune estimation maison ne remplace une moyenne ou une médiane officielle. Les chiffres affichés dans les cartes, tableaux, paragraphes et FAQ sont dérivés de la même source de vérité centralisée.",
        },
        {
          type: "list",
          items: [
            `${SALAIRE_MOYEN_SOURCES.inseePrive2024.org} : ${SALAIRE_MOYEN_SOURCES.inseePrive2024.title} (paru le ${SALAIRE_MOYEN_SOURCES.inseePrive2024.publishedOnLabel}, année statistique ${SALAIRE_MOYEN_SOURCES.inseePrive2024.statisticalYear}) : ${SALAIRE_MOYEN_SOURCES.inseePrive2024.href}`,
            `${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.org} : ${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.title} (paru le ${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.publishedOnLabel}) : ${SALAIRE_MOYEN_SOURCES.inseePcsRegions2024.href}`,
            `${SALAIRE_MOYEN_SOURCES.inseeEssentielSalaires.org} : ${SALAIRE_MOYEN_SOURCES.inseeEssentielSalaires.title} (série euros constants) : ${SALAIRE_MOYEN_SOURCES.inseeEssentielSalaires.href}`,
            `${SALAIRE_MOYEN_SOURCES.inseeFpe2024.org} : ${SALAIRE_MOYEN_SOURCES.inseeFpe2024.title} (paru le ${SALAIRE_MOYEN_SOURCES.inseeFpe2024.publishedOnLabel}) : ${SALAIRE_MOYEN_SOURCES.inseeFpe2024.href}`,
            `${SALAIRE_MOYEN_SOURCES.inseeFpt2024.org} : ${SALAIRE_MOYEN_SOURCES.inseeFpt2024.title} (paru le ${SALAIRE_MOYEN_SOURCES.inseeFpt2024.publishedOnLabel}) : ${SALAIRE_MOYEN_SOURCES.inseeFpt2024.href}`,
            `${SALAIRE_MOYEN_SOURCES.inseeFph2024.org} : ${SALAIRE_MOYEN_SOURCES.inseeFph2024.title} (paru le ${SALAIRE_MOYEN_SOURCES.inseeFph2024.publishedOnLabel}) : ${SALAIRE_MOYEN_SOURCES.inseeFph2024.href}`,
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "EQTP : salaire converti à un temps plein sur l'année, au prorata du volume de travail.",
            "Net Insee : après cotisations sociales, avant prélèvement à la source.",
            "Cette page n'utilise pas de salaires « par métier » inventés à partir des PCS.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Pour aller plus loin : SMIC, guides brut/net et cotisations, prélèvement à la source, lecture de fiche de paie, hubs de conversion et calculateur d'augmentation. Les liens principaux sont ci-dessous et dans la colonne latérale.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Plancher légal :",
          label: "montants actuels du SMIC",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Comprendre le passage brut → net :",
          label: "différence entre salaire brut et salaire net",
          href: BRUT_NET_HREF,
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Estimer votre situation :",
          label: "calculateur brut vers net",
          href: HOME_HREF,
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Simuler une hausse :",
          label: "calculateur d'augmentation de salaire",
          href: AUGMENTATION_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le salaire moyen en France",
  faqIntro: "Réponses courtes, complémentaires au corps de l'article.",
  faq: [
    {
      question: `Le salaire moyen publié est-il un montant ${SALAIRE_MOYEN_EDITORIAL_YEAR} ?`,
      answer: `Non. L'article est daté ${SALAIRE_MOYEN_EDITORIAL_YEAR}, mais les statistiques centrales portent sur ${SALAIRE_MOYEN_STAT_YEAR}, publiées par l'Insee le ${SALAIRE_MOYEN_SOURCES.inseePrive2024.publishedOnLabel}.`,
    },
    {
      question: "Pourquoi la moyenne et la médiane divergent-elles autant ?",
      answer: `Parce que la distribution est asymétrique : les très hauts salaires tirent la moyenne vers le haut. En ${SALAIRE_MOYEN_STAT_YEAR}, la médiane nette du privé est inférieure d'environ ${L.medianGap} à la moyenne.`,
    },
    {
      question: "Combien gagnent les cadres en moyenne ?",
      answer: `Dans le privé ${SALAIRE_MOYEN_STAT_YEAR}, les cadres (y compris chefs d'entreprise salariés) perçoivent en moyenne ${L.cadresNet} net et ${L.cadresGross} brut en EQTP. Ce chiffre décrit une catégorie socioprofessionnelle, pas un métier précis.`,
    },
    {
      question: "Puis-je comparer mon temps partiel à la moyenne nationale ?",
      answer:
        "Pas directement. Les moyennes Insee sont en EQTP. Un temps partiel doit d'abord être ramené à un équivalent temps plein (ou comparé à des statistiques hors EQTP) pour éviter une conclusion trompeuse.",
    },
    {
      question: "Le net Insee est-il avant ou après impôt ?",
      answer:
        "Avant prélèvement à la source. C'est un net de cotisations et contributions sociales, pas le montant crédité après impôt sur le revenu.",
    },
    {
      question: "Comment situer le salaire moyen par rapport au SMIC ?",
      answer:
        "Le SMIC est un plancher légal, distinct d'une moyenne ou d'une médiane. Pour les montants actuellement applicables, voir la page SMIC de Brut-vers-Net.",
    },
    {
      question: "Existe-t-il un salaire moyen officiel « par métier » ?",
      answer:
        "Pas dans les sources mobilisées ici de façon nationale, homogène et comparable. L'Insee publie surtout des PCS et des secteurs. Présenter une moyenne « cadres » comme le salaire d'un métier nommé serait incorrect.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      `Net moyen privé ${SALAIRE_MOYEN_STAT_YEAR} : ${L.meanNet} en EQTP.`,
      `Médiane nette : ${L.medianNet} (environ ${L.medianGap} sous la moyenne).`,
      "Respectez toujours le champ (privé / public, EQTP) et l'année statistique.",
    ],
    closingText:
      "Pour estimer votre situation personnelle, croisez ces repères Insee avec votre bulletin et un calcul brut/net.",
    closingCta: {
      label: "Calculer mon salaire brut en net",
      href: HOME_HREF,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: HOME_HREF,
    },
    relatedGuides: [
      { title: "Quel est un bon salaire ?", href: BON_SALAIRE_HREF },
      { title: "SMIC brut et net", href: SMIC_HREF },
      { title: "Différence brut / net", href: BRUT_NET_HREF },
      { title: "Calculer son salaire net", href: CALCULER_NET_HREF },
      { title: "Cotisations salariales", href: COTISATIONS_HREF },
      { title: "Prélèvement à la source", href: PAS_HREF },
      { title: "Lire une fiche de paie", href: LIRE_FICHE_HREF },
      { title: "Brut mensuel en net", href: BRUT_VERS_NET_HUB },
      { title: "Net mensuel en brut", href: NET_VERS_BRUT_HUB },
    ],
  },
};
