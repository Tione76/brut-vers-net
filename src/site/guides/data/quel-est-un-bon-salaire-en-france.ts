import {
  BON_SALAIRE_LABELS as L,
  BON_SALAIRE_AMOUNTS_BLOCK_TITLE,
  BON_SALAIRE_EQTP_PART_TIME_NOTE,
  BON_SALAIRE_FIELD_NOTE,
  BON_SALAIRE_FRESHNESS_LINE,
  BON_SALAIRE_H1,
  BON_SALAIRE_META_DESCRIPTION,
  BON_SALAIRE_PRIVATE_SCOPE,
  BON_SALAIRE_PUBLISHED_AT,
  BON_SALAIRE_SEO_TITLE,
  BON_SALAIRE_SHORT_ANSWER,
  BON_SALAIRE_SOURCES,
  BON_SALAIRE_STAT_YEAR,
  BON_SALAIRE_UPDATED_AT,
  BENCHMARK_SITUATIONS,
} from "@/site/bon-salaire/data";
import type { Guide } from "../types";

const SALAIRE_MOYEN_HREF = "/salaire-moyen-france";
const SMIC_HREF = "/smic";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const LIRE_FICHE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const BRUT_VERS_NET_HUB = "/salaire-brut-mensuel-en-net";
const NET_VERS_BRUT_HUB = "/salaire-net-mensuel-en-brut";
const HOME_HREF = "/";

const S = BON_SALAIRE_SOURCES;
const Y = BON_SALAIRE_STAT_YEAR;
const B = BENCHMARK_SITUATIONS;

/**
 * Page pilier : intention « Est-ce que mon salaire est bon / où me situer ? »
 * Complémentaire de /salaire-moyen-france (« Combien gagnent les Français ? »).
 * Chiffres : source unique `@/site/bon-salaire/data`.
 */
export const quelEstUnBonSalaireEnFranceGuide: Guide = {
  slug: "quel-est-un-bon-salaire-en-france",
  publicPath: "/quel-est-un-bon-salaire-en-france",
  breadcrumbLabel: "Bon salaire",
  title: BON_SALAIRE_H1,
  seoTitle: BON_SALAIRE_SEO_TITLE,
  description: BON_SALAIRE_META_DESCRIPTION,
  subtitle:
    "Interprétez votre rémunération avec les repères Insee : médiane, déciles et contexte de vie, sans confondre statistique et confort.",
  publishedAt: BON_SALAIRE_PUBLISHED_AT,
  updatedAt: BON_SALAIRE_UPDATED_AT,
  introduction: [
    "Cette page répond à une question d'interprétation : mon salaire est-il bon, et où me situer ? Les chiffres Insee servent de repères ; le confort de vie se juge ensuite avec le logement, le ménage et les charges.",
  ],
  quickSummary: {
    title: BON_SALAIRE_AMOUNTS_BLOCK_TITLE,
    items: [
      {
        rate: L.median,
        description: `Médiane nette privée (${Y}, EQTP)`,
      },
      {
        rate: L.meanNet,
        description: `Moyenne nette privée (${Y}, EQTP)`,
      },
      {
        rate: L.d9,
        description: `9e décile : 10 % gagnent plus`,
      },
      {
        rate: String(Y),
        description: "Année statistique Insee (pas l'année du H1)",
      },
    ],
    synthesis: [BON_SALAIRE_FRESHNESS_LINE],
  },
  introSummary: {
    title: "L'essentiel",
    items: [
      "Il n'existe pas de définition officielle d'un « bon salaire ».",
      "La médiane est en général le premier repère pour se situer.",
      "Les déciles permettent d'affiner la position sans inventer de percentile.",
      "Le champ couvre les salariés du privé en EQTP, pas « tous les Français ».",
      "Le confort de vie dépend aussi du logement, du ménage et des charges.",
      `Année des statistiques : ${Y} (publication Insee du ${S.inseePrive2024.publishedOnLabel}).`,
    ],
  },
  sections: [
    {
      id: "reponse-courte",
      title: "Réponse courte",
      blocks: [
        {
          type: "paragraph",
          text: BON_SALAIRE_SHORT_ANSWER,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            BON_SALAIRE_FIELD_NOTE,
            BON_SALAIRE_EQTP_PART_TIME_NOTE,
            "Le net Insee est un net de cotisations sociales, avant prélèvement à la source.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-mediane",
      title:
        "Pourquoi la médiane est souvent le meilleur repère pour savoir si votre salaire est bon",
      blocks: [
        {
          type: "paragraph",
          text: "Pour savoir si votre salaire est « bon » au sens statistique, la médiane répond plus directement que la moyenne : elle indique de quel côté du milieu vous vous situez dans le champ étudié.",
        },
        {
          type: "paragraph",
          text: "La moyenne reste utile pour décrire le niveau global de la masse salariale, mais elle est tirée vers le haut par les très hauts salaires. Les déciles complètent ensuite la lecture, sans transformer une moyenne en rang individuel.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "En pratique : commencez par la médiane, puis placez-vous entre deux déciles officiels. N'inventez jamais un percentile précis entre deux seuils.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "Pour comprendre en détail la différence entre salaire moyen, médian et brut, consultez notre analyse complète du",
          label: "salaire moyen en France",
          href: SALAIRE_MOYEN_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le plancher légal, distinct de la médiane :",
          label: "montants actuels du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "ou-se-situe-votre-salaire",
      title: "Où se situe votre salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les seuils ci-dessous proviennent de la distribution officielle des salaires nets mensuels en EQTP dans le privé en ${Y} (Insee Première n° 2079). Lecture : « 10 % gagnent moins que D1 » signifie que 10 % des salariés du champ perçoivent un salaire inférieur à ce seuil.`,
        },
        {
          type: "illustration",
          id: "bon-salaire-distribution-scale",
          caption: `Échelle pédagogique des seuils officiels (privé, EQTP, net mensuel, ${Y}). Source : Insee Première n° 2079.`,
        },
        {
          type: "table",
          caption: `Distribution des salaires nets mensuels EQTP, secteur privé, ${Y} (Insee Première n° 2079)`,
          headers: ["Seuil", "Montant net / mois", "Signification"],
          rows: [
            ["1er décile (D1)", L.d1, "10 % des salariés du champ gagnent moins"],
            ["4e décile (D4)", L.d4, "40 % gagnent moins"],
            ["Médiane (D5)", L.median, "50 % gagnent moins, 50 % gagnent plus"],
            ["6e décile (D6)", L.d6, "60 % gagnent moins"],
            ["7e décile (D7)", L.d7, "70 % gagnent moins"],
            ["8e décile (D8)", L.d8, "80 % gagnent moins"],
            ["9e décile (D9)", L.d9, "10 % des salariés du champ gagnent plus"],
            ["95e centile (P95)", L.p95, "5 % gagnent plus"],
            ["99e centile (P99)", L.p99, "1 % gagne plus"],
            ["Moyenne", L.meanNet, "Moyenne arithmétique (pas un percentile)"],
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Ces pourcentages portent sur les salariés du privé en EQTP, pas sur l'ensemble de la population française.",
            `Rapport interdécile D9/D1 : ${L.interdecile}. Unité : net mensuel EQTP, avant prélèvement à la source.`,
          ],
        },
      ],
    },
    {
      id: "montants-2000-a-5000",
      title: "2 000 €, 2 500 €, 3 000 €, 4 000 € ou 5 000 € net : est-ce un bon salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: `Chaque montant est comparé aux seuls seuils officiels disponibles pour ${Y}. Entre deux déciles, on se limite à cette formulation : aucun pourcentage précis n'est inventé.`,
        },
        {
          type: "table",
          caption: `Repères pour des nets mensuels courants (seuils privés EQTP ${Y})`,
          headers: ["Net mensuel", "Lecture par rapport aux seuils Insee"],
          rows: [
            [B[2000].label, B[2000].tableMeaning],
            [B[2500].label, B[2500].tableMeaning],
            [B[3000].label, B[3000].tableMeaning],
            [B[4000].label, B[4000].tableMeaning],
            [B[5000].label, B[5000].tableMeaning],
          ],
        },
        {
          type: "paragraph",
          text: `À ${L.amount2000} net : ${B[2000].vsOfficialThresholds}`,
        },
        {
          type: "list",
          items: [B[2000].canAffirm, B[2000].cannotConclude, B[2000].contextNote],
        },
        {
          type: "paragraph",
          text: `À ${L.amount2500} net : ${B[2500].vsOfficialThresholds}`,
        },
        {
          type: "list",
          items: [B[2500].canAffirm, B[2500].cannotConclude, B[2500].contextNote],
        },
        {
          type: "paragraph",
          text: `À ${L.amount3000} net : ${B[3000].vsOfficialThresholds}`,
        },
        {
          type: "list",
          items: [B[3000].canAffirm, B[3000].cannotConclude, B[3000].contextNote],
        },
        {
          type: "paragraph",
          text: `À ${L.amount4000} net : ${B[4000].vsOfficialThresholds}`,
        },
        {
          type: "list",
          items: [B[4000].canAffirm, B[4000].cannotConclude, B[4000].contextNote],
        },
        {
          type: "paragraph",
          text: `À ${L.amount5000} net : ${B[5000].vsOfficialThresholds}`,
        },
        {
          type: "list",
          items: [B[5000].canAffirm, B[5000].cannotConclude, B[5000].contextNote],
        },
      ],
    },
    {
      id: "trois-mille-net",
      title: "3 000 € net par mois : est-ce réellement un bon salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: `Oui, statistiquement, ${L.amount3000} net se situent au-dessus de la médiane et au-dessus de la moyenne du privé en EQTP pour ${Y}. Ce montant se place entre le 7e et le 8e décile.`,
        },
        {
          type: "paragraph",
          text: "Oui, cela place la rémunération dans le haut du milieu de la distribution du champ étudié. Non, cela ne garantit pas le même confort pour tout le monde : la statistique de position n'est pas une mesure de niveau de vie.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple pédagogique A (fictif, non statistique) : personne seule, loyer modéré, peu de dettes. Avec le même net, la marge pour épargner ou absorber un imprévu peut être réelle.",
            "Exemple pédagogique B (fictif, non statistique) : couple avec enfants, logement coûteux, crédits et trajets. Le même net peut devenir beaucoup plus contraint.",
            "Ces deux cas illustrent uniquement l'écart entre salaire individuel et confort de vie. Ce ne sont pas des données Insee.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour convertir votre bulletin et comparer au net Insee :",
          label: "calculateur brut vers net",
          href: HOME_HREF,
        },
      ],
    },
    {
      id: "plus-que-la-moitie",
      title: "À partir de quel salaire gagne-t-on plus que la majorité des salariés ?",
      blocks: [
        {
          type: "paragraph",
          text: `Dès que votre salaire net comparable dépasse la médiane du champ, vous gagnez plus que la moitié des salariés du privé en EQTP. C'est la définition même de la médiane.`,
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne pas écrire « majorité des Français » : la donnée porte sur les salariés du privé en EQTP, pas sur l'ensemble de la population.",
          ],
        },
      ],
    },
    {
      id: "hauts-salaires",
      title: "À partir de quel salaire fait-on partie des hauts salaires ?",
      blocks: [
        {
          type: "paragraph",
          text: `Dans la publication Insee utilisée ici, le seuil le plus clair pour le haut de la distribution est le 9e décile. Au-delà, 10 % des salariés du champ gagnent davantage.`,
        },
        {
          type: "list",
          items: [
            `Au-dessus de ${L.d9} : parmi les 10 % les mieux payés du champ privé EQTP.`,
            `Au-dessus de ${L.p95} : parmi les 5 % les mieux payés du champ.`,
            `Au-dessus de ${L.p99} : parmi le 1 % les mieux payés du champ.`,
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "« Haut salaire » (rémunération du travail) n'est pas synonyme de « riche » (patrimoine, niveau de vie du ménage, revenus du capital).",
          ],
        },
      ],
    },
    {
      id: "situation-personnelle",
      title: "Pourquoi un bon salaire dépend aussi de votre situation",
      blocks: [
        {
          type: "paragraph",
          text: "Deux personnes avec le même net mensuel peuvent vivre des réalités opposées. Le salaire mesure une rémunération individuelle ; le confort dépend du reste de la situation.",
        },
        {
          type: "list",
          items: [
            "Lieu de résidence et coût du logement (loyer ou crédit)",
            "Personne seule, couple, présence d'enfants",
            "Transports, dettes, dépenses contraintes",
            "Patrimoine déjà constitué (ou absence de patrimoine)",
            "Temps de travail, primes, avantages en nature, télétravail",
            "Stabilité du contrat et prévisibilité des revenus",
          ],
        },
        {
          type: "illustration",
          id: "bon-salaire-comfort-matrix",
          caption:
            "Matrice pédagogique (non statistique) : un même salaire net ne produit pas le même confort selon le coût de la vie et les charges.",
        },
      ],
    },
    {
      id: "paris-et-regions",
      title: "Comment contextualiser son salaire selon la région ?",
      blocks: [
        {
          type: "paragraph",
          text: "La région de travail influence les salaires moyens observés, notamment via la structure des emplois et le poids de l'Île-de-France. Ces écarts aident à contextualiser, mais ne mesurent pas automatiquement un écart de pouvoir d'achat.",
        },
        {
          type: "paragraph",
          text: `En ${Y}, le salaire net mensuel moyen en EQTP du privé atteint ${L.idf} en Île-de-France, contre ${L.ara} en Auvergne-Rhône-Alpes et ${L.naq} en Nouvelle-Aquitaine (France entière : ${L.meanNet}).`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ce sont des moyennes, souvent tirées vers le haut par la structure locale des emplois : elles ne correspondent pas à des salaires médians. La médiane du privé en EQTP reste le premier repère général.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail des moyennes régionales et nationales :",
          label: "salaire moyen en France",
          href: SALAIRE_MOYEN_HREF,
        },
      ],
    },
    {
      id: "selon-age",
      title: "Comment contextualiser son salaire selon l'âge ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'âge et l'expérience font évoluer les rémunérations moyennes. Comparer son net à sa tranche d'âge peut éviter un jugement trop tôt ou trop tard dans une carrière, sans remplacer la médiane du privé en EQTP comme premier repère.",
        },
        {
          type: "paragraph",
          text: `En ${Y}, en net EQTP privé (Insee Première n° 2079, champ avec apprentis et stagiaires) : ${L.ageUnder25} pour les moins de 25 ans, ${L.age25to39} de 25 à 39 ans, ${L.age40to49} de 40 à 49 ans, ${L.age55plus} à partir de 55 ans.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ces moyennes par âge complètent la lecture ; elles ne remplacent pas la médiane du privé en EQTP.",
          ],
        },
      ],
    },
    {
      id: "cadres-employes",
      title: "Comment contextualiser son salaire selon la catégorie socioprofessionnelle ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les catégories socioprofessionnelles (PCS) correspondent à des groupes statistiques, pas à des métiers précis. Elles aident à contextualiser un salaire au sein d'un groupe comparable, sans transformer une moyenne de cadre en salaire « typique » d'un métier nommé.",
        },
        {
          type: "table",
          caption: `Salaire net moyen mensuel EQTP par PCS, privé ${Y} (Insee Première n° 2079)`,
          headers: ["Catégorie", "Net moyen / mois"],
          rows: [
            ["Cadres (y compris chefs d'entreprise salariés)", L.cadres],
            ["Professions intermédiaires", L.pi],
            ["Employés", L.employes],
            ["Ouvriers", L.ouvriers],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ces moyennes PCS contextualisent un salaire dans un groupe comparable ; la médiane du privé en EQTP reste le premier repère général.",
          ],
        },
      ],
    },
    {
      id: "brut-ou-net",
      title: "Salaire brut ou salaire net : lequel comparer ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le brut est le salaire avant cotisations salariales. Le net Insee utilisé ici est un net de cotisations sociales, avant prélèvement à la source. Pour comparer aux statistiques de cette page, utilisez un net comparable (mensuel, EQTP si possible).",
        },
        {
          type: "list",
          items: [
            {
              text: "Convertir un brut en net :",
              href: HOME_HREF,
              label: "calculateur brut vers net",
            },
            {
              text: "Estimer le brut correspondant à un net :",
              href: NET_VERS_BRUT_HUB,
              label: "hub net mensuel en brut",
            },
            {
              text: "Comprendre la mécanique :",
              href: BRUT_NET_HREF,
              label: "différence entre salaire brut et salaire net",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour lire votre bulletin sans vous tromper :",
          label: "comment lire une fiche de paie",
          href: LIRE_FICHE_HREF,
        },
      ],
    },
    {
      id: "salaire-et-niveau-de-vie",
      title: "Salaire et niveau de vie : pourquoi ce n'est pas la même chose",
      blocks: [
        {
          type: "list",
          items: [
            "Salaire : rémunération liée au travail d'une personne.",
            "Revenu disponible : ensemble des revenus du ménage après impôts directs et prestations.",
            "Niveau de vie : revenu disponible du ménage rapporté au nombre d'unités de consommation.",
            "Patrimoine : stock de richesse détenu (pas un flux mensuel).",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple pédagogique : un couple avec un seul salaire de 3 000 € net et un couple avec deux salaires de 2 000 € n'ont ni le même revenu de ménage, ni forcément le même niveau de vie. Ce schéma n'est pas une statistique Insee.",
          ],
        },
      ],
    },
    {
      id: "bien-vivre",
      title: "Peut-on définir le salaire nécessaire pour « bien vivre » ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non, pas de façon universelle. « Bien vivre » mélange des besoins objectifs et des attentes subjectives. Aucun seuil unique ne peut résumer la France entière.",
        },
        {
          type: "paragraph",
          text: "On peut croiser médiane, déciles, coût local du logement, composition du ménage et capacité d'épargne. En revanche, il ne faut pas confondre seuil de pauvreté, salaire médian, budget de référence et « salaire confortable ».",
        },
      ],
    },
    {
      id: "methode-en-etapes",
      title: "Comment savoir si votre salaire est bon ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Repérez votre net comparable",
              description:
                "Utilisez un net mensuel comparable aux statistiques Insee, idéalement avant prélèvement à la source. Hors temps plein, raisonnez en EQTP.",
            },
            {
              title: "Comparez-vous à la médiane",
              description:
                "Placez d'abord votre net par rapport à la médiane du privé en EQTP. Vous saurez de quel côté du milieu vous êtes.",
            },
            {
              title: "Situez-vous entre les déciles",
              description:
                "Affinez uniquement avec les seuils officiels (D7, D8, D9, P95…). Dites « entre le 7e et le 8e décile », jamais un percentile inventé.",
            },
            {
              title: "Contextualisez âge ou PCS seulement si utile",
              description:
                "Ces moyennes nuancent un jugement. Elles ne remplacent pas la médiane du privé en EQTP comme premier repère.",
            },
            {
              title: "Intégrez logement, ménage et charges",
              description:
                "C'est ici que le même salaire devient confortable ou insuffisant. La position statistique ne mesure pas votre reste à vivre.",
            },
            {
              title: "Regardez votre capacité réelle à épargner",
              description:
                "Un net « bon » sans aucune marge de précaution n'a pas le même sens qu'un net un peu plus bas avec une vraie capacité d'épargne.",
            },
          ],
        },
      ],
    },
    {
      id: "a-retenir",
      title: "Ce qu'il faut retenir",
      blocks: [
        {
          type: "paragraph",
          text: "Un bon salaire en France n'est pas un montant unique. Les données Insee permettent de se situer dans la distribution du privé en EQTP ; le confort de vie se juge ensuite avec le logement, le ménage et les charges.",
        },
        {
          type: "list",
          items: [
            "Commencez par la médiane, puis les déciles.",
            "N'inventez aucun percentile entre deux seuils officiels.",
            "Ne confondez pas salariés du privé EQTP et population générale.",
            "Ne confondez pas haut salaire et richesse patrimoniale.",
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
          text: "Tous les montants chiffrés de cette page proviennent de publications Insee. Aucun percentile n'est interpolé. Distribution, PCS et moyennes par âge : Insee Première n° 2079. Moyennes régionales : tableau Insee des comparaisons régionales (même champ et même année). Textes, tableaux, FAQ et illustrations partagent la même source de vérité centralisée.",
        },
        {
          type: "list",
          items: [
            {
              text: `Source principale : ${S.inseePrive2024.org}, ${S.inseePrive2024.title}. Année statistique ${S.inseePrive2024.statisticalYear}. Publication : ${S.inseePrive2024.publishedOnLabel}.`,
              href: S.inseePrive2024.href,
              label: "Voir la publication Insee Première n° 2079",
            },
            {
              text: `Complément régional / PCS : ${S.inseePcsRegions2024.org}, ${S.inseePcsRegions2024.title}. Publication : ${S.inseePcsRegions2024.publishedOnLabel}.`,
              href: S.inseePcsRegions2024.href,
              label: "Voir les données régionales Insee",
            },
            {
              text: `Synthèse grand public : ${S.inseeEssentielSalaires.org}, ${S.inseeEssentielSalaires.title}.`,
              href: S.inseeEssentielSalaires.href,
              label: "Voir la synthèse Insee sur les salaires",
            },
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Source principale : Insee Première n° 2079. Année statistique : ${S.inseePrive2024.statisticalYear}. Publication : ${S.inseePrive2024.publishedOnLabel}.`,
            `Champ : ${BON_SALAIRE_PRIVATE_SCOPE}`,
            "Les chiffres de cette page sont mis à jour lors de chaque nouvelle publication annuelle de l'Insee.",
            "Privé et fonction publique ne sont pas fusionnés ici. Le net Insee est avant prélèvement à la source.",
            `Vérification éditoriale des URL et montants : ${S.inseePrive2024.verifiedOn}.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Plancher légal distinct des moyennes :",
          label: "montants actuels du SMIC",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Lire son bulletin :",
          label: "comment lire une fiche de paie",
          href: LIRE_FICHE_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Comprendre le prélèvement à la source :",
          label: "fonctionnement du PAS",
          href: PAS_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Méthode de calcul du net :",
          label: "comment calculer son salaire net",
          href: CALCULER_NET_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le bon salaire en France",
  faqIntro: "Réponses courtes qui complètent l'article, sans le répéter.",
  faq: [
    {
      question: "Quel est un bon salaire net en France ?",
      answer:
        "Il n'existe pas de définition officielle. Commencez par la médiane du privé en EQTP, puis les déciles. Le confort dépend ensuite du logement, du ménage et des charges.",
    },
    {
      question: "2 000 € net est-ce un bon salaire ?",
      answer: `Statistiquement, 2 000\u00a0€ net EQTP se situent autour du 4e décile (${L.d4}), sous la médiane (${L.median}). Le confort réel dépend surtout du loyer et de la composition du foyer.`,
    },
    {
      question: "2 500 € net est-ce un bon salaire ?",
      answer: `Statistiquement, 2 500\u00a0€ net EQTP dépassent la médiane (${L.median}) et se situent entre le 6e et le 7e décile. Le confort dépend ensuite de vos charges.`,
    },
    {
      question: "3 000 € net est-ce un bon salaire ?",
      answer: `Statistiquement, 3 000\u00a0€ net EQTP se situent au-dessus de la médiane (${L.median}) et de la moyenne (${L.meanNet}) du privé en ${Y}. Le confort réel dépend ensuite de vos charges et de votre situation.`,
    },
    {
      question: "4 000 € net est-ce un bon salaire ?",
      answer: `Statistiquement, 4 000\u00a0€ net EQTP se situent entre le 8e et le 9e décile, donc encore hors du top 10\u00a0%. Le coût du logement reste décisif pour le confort.`,
    },
    {
      question: "5 000 € net est-ce un bon salaire ?",
      answer: `Statistiquement, 5 000\u00a0€ net EQTP dépassent le 9e décile (${L.d9}) : parmi les 10\u00a0% les mieux payés du champ, tout en restant sous P95 (${L.p95}). Cela ne signifie pas automatiquement une richesse patrimoniale.`,
    },
    {
      question: "À partir de quel salaire gagne-t-on plus que la majorité ?",
      answer:
        "Dès que le net comparable dépasse la médiane du champ privé EQTP. Ce n'est pas « la majorité des Français », mais la moitié des salariés de ce champ statistique.",
    },
    {
      question: "Quelle différence entre salaire moyen et médian ?",
      answer:
        "La moyenne décrit le niveau global de la masse salariale ; la médiane coupe la distribution en deux. Pour se situer, la médiane est en général plus parlante. Le détail est sur notre page salaire moyen.",
    },
    {
      question: "À partir de quel salaire fait-on partie des 10 % les mieux payés ?",
      answer: `Au-dessus du 9e décile du privé en EQTP (${L.d9} net mensuel pour ${Y}, Insee Première n° 2079).`,
    },
    {
      question: "Quel salaire faut-il pour bien vivre seul ?",
      answer:
        "Aucun seuil unique. Logement, ville, charges et épargne de précaution pèsent autant que le seul net.",
    },
    {
      question: "Un bon salaire est-il le même à Paris et ailleurs ?",
      answer: `Les salaires moyens sont plus élevés en Île-de-France (${L.idf} net EQTP privé ${Y}) qu'en moyenne du privé en EQTP, mais le coût du logement aussi. Un écart de salaire ne se convertit pas automatiquement en écart de niveau de vie.`,
    },
    {
      question: "Faut-il comparer son salaire brut ou net ?",
      answer:
        "Pour cette page : net Insee (avant PAS) en EQTP. Gardez la même unité que la source. Nos calculateurs passent du brut au net et l'inverse.",
    },
  ],
  conclusion: {
    title: "Pour aller plus loin",
    keyPoints: [
      "La médiane et les déciles servent d'abord à se situer.",
      "Le même net ne produit pas le même confort selon la situation.",
      "Les données portent sur le privé en EQTP, pas sur toute la population.",
    ],
    closingText:
      "Pour approfondir les statistiques nationales, lisez l'analyse du salaire moyen. Pour convertir votre bulletin, utilisez les calculateurs brut/net.",
    closingCta: {
      label: "Voir le salaire moyen en France",
      href: SALAIRE_MOYEN_HREF,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: HOME_HREF,
    },
    relatedGuides: [
      { title: "Salaire moyen en France", href: SALAIRE_MOYEN_HREF },
      { title: "SMIC brut et net", href: SMIC_HREF },
      { title: "Différence brut / net", href: BRUT_NET_HREF },
      { title: "Calculer son salaire net", href: CALCULER_NET_HREF },
      { title: "Prélèvement à la source", href: PAS_HREF },
      { title: "Lire une fiche de paie", href: LIRE_FICHE_HREF },
      { title: "Brut mensuel en net", href: BRUT_VERS_NET_HUB },
      { title: "Net mensuel en brut", href: NET_VERS_BRUT_HUB },
    ],
  },
};
