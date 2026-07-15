import type { Guide } from "../types";
import {
  exBrut,
  exNet,
  exCotisations,
  ex3000Gross,
  ex3000NetNonExecutive,
  ex3000NetExecutive,
} from "./guide-salary-examples";
import { formatEditorialEuro } from "../../home-editorial-data";

const CALCUL_SALAIRE_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";

/** Guide pratique : calculer son salaire net à partir du brut */
export const commentCalculerSonSalaireNetGuide: Guide = {
  slug: "comment-calculer-son-salaire-net",
  title: "Comment calculer son salaire net ?",
  seoTitle: "Comment calculer son salaire net ? Guide pas à pas",
  description:
    "Apprenez à calculer votre salaire net à partir du brut : cotisations, net avant impôt, prélèvement à la source et net versé. Méthode pas à pas avec exemple.",
  subtitle:
    "Du salaire brut au net versé : calculez vous-même votre salaire net, étape par étape, puis vérifiez avec le simulateur.",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  introduction: [
    "Vous connaissez votre salaire brut mais vous voulez savoir ce que vous toucherez réellement ? C'est la question la plus fréquente en entretien ou en négociation.",
    "Le calcul suit une chaîne simple : salaire brut, cotisations salariales, salaire net avant impôt, prélèvement à la source, salaire net versé. Le net imposable sert de base fiscale à cette dernière étape.",
    "Ce guide vous montre comment calculer votre salaire net pas à pas, avec un exemple concret et les informations à rassembler.",
    "Le simulateur Brut vers Net reproduit la même logique en quelques secondes si vous préférez une estimation immédiate.",
  ],
  quickSummary: {
    title: "La logique du calcul",
    variant: "formula",
    items: [
      { kind: "level", rate: "", title: "Salaire brut" },
      { kind: "connector", rate: "→", description: "" },
      { kind: "level", rate: "", title: "Cotisations salariales" },
      { kind: "connector", rate: "→", description: "" },
      { kind: "level", rate: "", title: "Salaire net avant impôt" },
      { kind: "connector", rate: "→", description: "" },
      { kind: "level", rate: "", title: "Prélèvement à la source" },
      { kind: "connector", rate: "→", description: "" },
      { kind: "level", rate: "", title: "Salaire net versé" },
    ],
  },
  sections: [
    {
      id: "quest-ce-que-le-salaire-net",
      title: "Qu'est-ce que le salaire net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant de calculer, clarifions les montants en jeu. Le salaire brut est la rémunération convenue avec l'employeur, avant toute retenue. C'est le montant annoncé sur une offre ou un contrat.",
        },
        {
          type: "paragraph",
          text: "Le salaire net avant impôt correspond au brut après cotisations salariales. C'est souvent le résultat visé quand on cherche à calculer son salaire net.",
        },
        {
          type: "paragraph",
          text: "Le net imposable sert de base au prélèvement à la source. Le salaire net versé est ce qui reste après impôt et ce qui est crédité sur votre compte.",
        },
        {
          type: "illustration",
          id: "calcul-salaire-net-schema",
          caption:
            "Schéma simplifié du calcul brut vers net : montants indicatifs pour un profil non-cadre à 2 500 € brut.",
        },
        {
          type: "table",
          caption: "Les quatre notions à distinguer pour calculer son salaire net",
          headers: ["Notion", "Définition", "Rôle dans le calcul"],
          rows: [
            [
              "Salaire brut",
              "Rémunération avant retenues",
              "Base de départ",
            ],
            [
              "Salaire net avant impôt",
              "Après cotisations salariales",
              "Résultat principal du calcul brut vers net",
            ],
            [
              "Net imposable",
              "Base fiscale du prélèvement",
              "Sert à calculer l'impôt retenu",
            ],
            [
              "Salaire net versé",
              "Après prélèvement à la source",
              "Montant effectivement perçu",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les quatre montants importants du calcul",
            "Salaire brut",
            "Salaire net avant impôt",
            "Net imposable",
            "Salaire net versé",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "En langage courant, « salaire net » peut désigner le salaire net avant impôt ou le salaire net versé. Pour un calcul fiable, distinguez toujours ces deux montants.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail des principes de calcul, consultez aussi le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: CALCUL_SALAIRE_NET_HREF,
        },
      ],
    },
    {
      id: "informations-a-connaitre",
      title: "Quelles informations faut-il connaître ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un calcul manuel ou une simulation demandent quelques données de base. Plus elles sont précises, plus l'estimation se rapproche de la réalité.",
        },
        {
          type: "paragraph",
          text: "Sans fiche de paie, vous pouvez déjà estimer votre salaire net avant impôt à partir du brut et de votre profil. Avec un bulletin, vous vérifiez chaque étape ligne par ligne.",
        },
        {
          type: "checklist",
          title: "Informations utiles pour le calcul",
          items: [
            "Salaire brut : mensuel, horaire ou annuel",
            "Statut : cadre, non-cadre ou fonction publique",
            "Temps de travail : temps plein ou pourcentage de temps partiel",
            "Nombre de mois : 12, 13 ou plus si prime lissée",
            "Primes éventuelles : 13e mois, commissions, variables",
            "Taux de prélèvement à la source : pour approcher le salaire net versé",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le salaire brut et le statut suffisent pour une première estimation du salaire net avant impôt. Le taux de prélèvement à la source permet ensuite de se rapprocher du salaire net versé.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Une fois le calcul fait, apprenez à le vérifier sur votre bulletin avec le guide",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "calcul-etape-par-etape",
      title: "Comment calculer son salaire net étape par étape ?",
      blocks: [
        {
          type: "paragraph",
          text: "Voici la méthode pratique pour calculer votre salaire net, du brut au montant versé. Chaque étape correspond à une opération que vous retrouverez sur une fiche de paie.",
        },
        {
          type: "illustration",
          id: "calcul-salaire-net-etapes",
          caption: "Les cinq étapes du calcul du salaire net, de gauche à droite.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Partir du salaire brut",
              description:
                "Reprenez le montant convenu : salaire de base, primes du mois et heures supplémentaires incluses. C'est la base sur laquelle les cotisations salariales sont calculées.",
            },
            {
              title: "Retirer les cotisations salariales",
              description:
                "Maladie, retraite, CSG, CRDS, mutuelle ou prévoyance : chaque retenue salariale réduit le brut. Leur total dépend de votre statut, de votre contrat et de votre rémunération.",
            },
            {
              title: "Obtenir le salaire net avant impôt",
              description:
                "Soustrayez le total des cotisations salariales du salaire brut. Le résultat est votre salaire net avant impôt, souvent le montant recherché lors d'un calcul brut vers net.",
            },
            {
              title: "Calculer le prélèvement à la source",
              description:
                "Le prélèvement est appliqué sur le net imposable, une base proche du salaire net avant impôt. Multipliez cette base par votre taux personnel transmis par l'administration fiscale.",
            },
            {
              title: "Obtenir le salaire net versé",
              description:
                "Retirez le montant du prélèvement à la source du salaire net avant impôt. Ce solde correspond au salaire net versé, crédité sur votre compte bancaire.",
            },
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Formule résumée : salaire brut − cotisations salariales = salaire net avant impôt. Puis net imposable × taux de PAS = prélèvement. Enfin salaire net avant impôt − prélèvement = salaire net versé.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : commencez par estimer le salaire net avant impôt. C'est l'étape la plus stable et la plus utile pour comparer des offres d'emploi.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre en détail chaque retenue appliquée au brut, lisez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: CALCUL_SALAIRE_NET_HREF,
        },
      ],
    },
    {
      id: "exemple-complet",
      title: "Exemple complet de calcul",
      blocks: [
        {
          type: "paragraph",
          text: "Prenons un cas concret : salarié non-cadre à temps plein, rémunération sur 12 mois, brut mensuel de 2 500 €. Profil indicatif : salarié non-cadre · Temps plein · 12 mois. Montants indicatifs, calculés avec les coefficients du simulateur brut-vers-net.fr.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Salaire brut mensuel",
              description: exBrut,
            },
            {
              title: "Cotisations salariales (estimation)",
              description: `environ ${exCotisations}`,
            },
            {
              title: "Salaire net avant impôt",
              description: exNet,
            },
            {
              title: "Net imposable",
              description: "Base fiscale approximative du simulateur",
            },
            {
              title: "Prélèvement à la source",
              description: "Selon votre taux personnel",
            },
            {
              title: "Salaire net versé",
              description: "Salaire net avant impôt moins le prélèvement",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Ce déroulé illustre le calcul brut vers net dans l'ordre. Votre bulletin réel peut différer selon votre contrat, vos primes et votre taux de prélèvement.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ces montants restent indicatifs. Ils ne remplacent pas une fiche de paie ni un calcul fiscal officiel.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Reproduisez cet exemple avec votre propre salaire brut et votre taux de prélèvement.",
          label: "Calculer mon salaire net",
          href: "/",
        },
      ],
    },
    {
      id: "net-different-meme-brut",
      title: "Pourquoi deux personnes avec le même brut peuvent avoir un net différent ?",
      blocks: [
        {
          type: "paragraph",
          text: "À salaire brut identique, le salaire net avant impôt et le salaire net versé peuvent varier. Le salaire brut est une base commune, pas une promesse de montant identique.",
        },
        {
          type: "list",
          items: [
            "Statut cadre ou non-cadre : cotisations de retraite complémentaire différentes.",
            "Mutuelle et prévoyance : la part salariale varie selon le contrat d'entreprise.",
            "Convention collective : garanties et cotisations spécifiques au secteur.",
            "Primes et variables : 13e mois, commissions ou heures supplémentaires modifient le salaire brut mensuel.",
            "Temps partiel : le salaire brut mensuel est proratisé, donc le salaire net aussi.",
            "Prélèvement à la source : le taux dépend du foyer fiscal, pas du seul salaire.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple indicatif : deux salariés à ${formatEditorialEuro(ex3000Gross)} brut mensuel. Avec les coefficients du simulateur, le non-cadre obtient environ ${ex3000NetNonExecutive} de salaire net avant impôt, le cadre environ ${ex3000NetExecutive}. Ces montants illustrent le fonctionnement du calculateur et ne constituent pas une règle générale.`,
          ],
        },
        {
          type: "paragraph",
          text: "C'est pourquoi un calcul personnalisé, avec le bon statut et le bon temps de travail, donne une estimation plus fiable qu'une moyenne générale.",
        },
      ],
    },
    {
      id: "erreurs-frequentes",
      title: "Les erreurs les plus fréquentes",
      blocks: [
        {
          type: "paragraph",
          text: "Lors d'un calcul manuel ou d'une comparaison d'offres, quelques erreurs reviennent souvent. Les repérer évite des mauvaises surprises.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Comparer un salaire brut annoncé avec un salaire net versé perçu sans conversion préalable.",
            "Oublier les cotisations salariales dans le calcul du salaire net.",
            "Ne pas intégrer les primes ou le 13e mois dans le salaire brut de base.",
            "Confondre salaire net avant impôt et salaire net versé lors d'une comparaison.",
            "Croire que le taux de prélèvement à la source est identique pour tout le monde.",
            "Appliquer un coefficient moyen sans tenir compte du statut cadre ou non-cadre.",
            "Comparer un salaire brut mensuel avec un salaire net annuel sans harmoniser les périodes.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Dans toute comparaison, exprimez les montants dans la même unité (horaire, mensuel ou annuel) et au même niveau : salaire brut avec salaire brut, salaire net avant impôt avec salaire net avant impôt.",
          ],
        },
      ],
    },
    {
      id: "verifier-son-calcul",
      title: "Comment vérifier rapidement son calcul ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un calcul manuel reste approximatif : les cotisations exactes dépendent de votre contrat, de votre convention et de votre niveau de rémunération. Le taux de prélèvement à la source ajoute une variable personnelle.",
        },
        {
          type: "paragraph",
          text: "Le simulateur Brut vers Net reproduit la logique du calcul en appliquant des coefficients indicatifs selon votre profil. Vous saisissez votre salaire brut, choisissez cadre ou non-cadre, ajustez le temps de travail et, si vous le connaissez, votre taux de prélèvement.",
        },
        {
          type: "paragraph",
          text: "Le résultat s'affiche en salaire net avant impôt et en salaire net versé estimé. Comparez-le avec votre fiche de paie pour vérifier que l'ordre de grandeur est cohérent.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : le simulateur ne remplace pas un bulletin ligne par ligne, mais il accélère le calcul et évite les erreurs de conversion entre brut horaire, mensuel et annuel.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour contrôler chaque montant sur votre bulletin, consultez le guide",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le calcul du salaire net",
  faq: [
    {
      question: "Comment calculer rapidement son salaire net ?",
      answer:
        "Saisissez votre salaire brut dans le calculateur Brut vers Net, choisissez votre statut et ajustez le temps de travail. Le net avant impôt s'affiche immédiatement. Ajoutez votre taux de prélèvement à la source pour approcher le net versé.",
    },
    {
      question: "Peut-on calculer son salaire net sans fiche de paie ?",
      answer:
        "Oui. Avec le brut, le statut et le temps de travail, le simulateur estime le net avant impôt. Le taux de prélèvement à la source permet ensuite de se rapprocher du net versé, même sans bulletin.",
    },
    {
      question: "Quelle différence entre net avant impôt et net versé ?",
      answer:
        "Le net avant impôt est obtenu après les cotisations salariales. Le net versé est ce qui reste après le prélèvement à la source, calculé sur le net imposable. Seul le net versé correspond au montant crédité sur votre compte.",
    },
    {
      question: "Pourquoi le simulateur donne un résultat approximatif ?",
      answer:
        "Les cotisations réelles dépendent du contrat, de la convention collective et des garanties collectives. Le simulateur utilise des coefficients indicatifs. Primes, heures supplémentaires et cas atypiques ne sont pas intégrés ligne par ligne.",
    },
    {
      question: "Les primes sont-elles prises en compte dans le calcul ?",
      answer:
        "Le simulateur part d'un brut que vous saisissez : incluez vos primes dans ce montant si elles sont versées chaque mois. Pour un 13e mois lissé sur l'année, indiquez le brut annuel et le nombre de mois correspondant.",
    },
    {
      question: "Les heures supplémentaires changent-elles le calcul ?",
      answer:
        "Oui. Les heures supplémentaires augmentent le brut du mois et donc les cotisations et le net. Pour une estimation mensuelle moyenne, intégrez-les dans le brut saisi ou comparez mois par mois.",
    },
    {
      question: "Comment calculer un salaire annuel net ?",
      answer:
        "Indiquez le brut annuel et le nombre de mois (12 à 16 si prime lissée). Le simulateur calcule les équivalents mensuels et horaires. Multipliez le net mensuel estimé par le nombre de mois pour une approximation annuelle.",
    },
    {
      question: "Comment calculer un salaire horaire net ?",
      answer:
        "Entrez le brut horaire : la conversion repose sur 151,67 heures par mois à temps plein. En temps partiel, baissez le pourcentage de temps de travail pour proratiser le mensuel et l'horaire net.",
    },
    {
      question: "Le calcul fonctionne-t-il pour les cadres ?",
      answer:
        "Oui. Sélectionnez le profil cadre dans le simulateur : les coefficients de cotisations diffèrent, notamment en retraite complémentaire. Le résultat reste indicatif et dépend aussi de votre contrat.",
    },
    {
      question: "Comment obtenir un calcul précis ?",
      answer:
        "Pour un montant contractuel, consultez votre employeur. Pour vérifier un bulletin, comparez ligne par ligne avec le guide sur la fiche de paie. Le simulateur sert d'estimation rapide, pas de bulletin officiel.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le calcul part du salaire brut et retire les cotisations salariales.",
      "Le salaire net avant impôt est le résultat principal d'un calcul brut vers net.",
      "Le prélèvement à la source, calculé sur le net imposable, donne le salaire net versé.",
      "Le statut, le temps de travail et le taux de PAS influencent le résultat.",
      "Le simulateur reproduit cette logique avec des coefficients indicatifs.",
    ],
    closingText:
      "Vous connaissez les étapes pour calculer votre salaire net. Saisissez votre salaire brut dans le calculateur pour une estimation personnalisée en quelques secondes.",
    closingCta: {
      label: "Calculer mon salaire net",
      href: "/",
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur Brut vers Net",
      description: "Estimez votre salaire net à partir de votre salaire brut.",
      href: "/",
    },
  },
};
