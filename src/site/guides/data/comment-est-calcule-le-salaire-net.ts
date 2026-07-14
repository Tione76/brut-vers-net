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

/** Guide de référence : calcul du salaire net à partir du brut */
export const commentEstCalculeLeSalaireNetGuide: Guide = {
  slug: "comment-est-calcule-le-salaire-net",
  title: "Comment est calculé le salaire net ?",
  seoTitle: "Comment est calculé le salaire net ? Du brut au net",
  description:
    "Découvrez comment passer du salaire brut au net : cotisations, net avant impôt, net imposable, prélèvement à la source et exemple concret.",
  subtitle:
    "Du brut au net versé : cotisations, net avant impôt, net imposable et prélèvement à la source expliqués simplement.",
  publishedAt: "2026-07-14",
  updatedAt: "2026-07-14",
  introduction: [
    "Vous venez de recevoir une offre à 2 500 € brut par mois et vous vous demandez combien il restera sur votre compte ? C'est la question la plus fréquente en entretien ou en négociation.",
    "Le salaire brut est la rémunération convenue avec l'employeur. En langage courant, « salaire net » peut désigner le montant après cotisations ou après impôt : d'où la confusion entre net avant impôt et net versé.",
    "Entre le brut et le net versé, deux opérations principales expliquent l'écart : les cotisations sociales salariales, puis le prélèvement à la source calculé sur le net imposable.",
    "À la fin de ce guide, vous saurez repérer les principaux montants d'une fiche de paie et comprendre le passage du salaire brut au salaire net.",
  ],
  quickSummary: {
    title: "Du salaire brut au salaire versé : les 3 niveaux à comprendre",
    items: [
      {
        kind: "level",
        rate: "1",
        title: "Salaire brut",
        description: "Montant convenu avec l'employeur",
      },
      {
        kind: "connector",
        rate: "↓",
        description: "Cotisations sociales salariales",
      },
      {
        kind: "level",
        rate: "2",
        title: "Salaire net avant impôt",
        description: "Montant restant après les cotisations",
      },
      {
        kind: "connector",
        rate: "↓",
        description: "Prélèvement à la source calculé sur le net imposable",
      },
      {
        kind: "level",
        rate: "3",
        title: "Salaire net versé",
        description: "Montant crédité sur le compte bancaire",
      },
    ],
  },
  sections: [
    {
      id: "salaire-brut",
      title: "Qu'est-ce que le salaire brut ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire brut correspond à la rémunération convenue avec votre employeur, avant toute retenue. C'est le montant affiché sur une offre, un contrat ou en haut de la fiche de paie.",
        },
        {
          type: "paragraph",
          text: "Si une annonce indique « 2 800 € brut mensuels », l'employeur s'engage sur cette base avant cotisations et impôt. Ce n'est pas encore le montant crédité sur votre compte.",
        },
        {
          type: "paragraph",
          text: "Où le retrouver ? Sur une offre ou une promesse d'embauche, c'est le montant annoncé. Sur le contrat, il figure dans la clause rémunération. Sur la fiche de paie, il apparaît en général en haut, souvent libellé « Salaire de base » ou « Rémunération brute ».",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le salaire brut est votre point de départ, pas votre budget mensuel. Pour estimer ce que vous percevrez, descendez vers le salaire net avant impôt, puis le net versé.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Vous avez un montant en tête ? Passez du brut au net en quelques secondes.",
          label: "Calculer mon salaire net",
          href: "/",
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Qu'est-ce que le salaire net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le langage courant, « salaire net » reste ambigu : après cotisations ou après impôt. Pour suivre le calcul, distinguez chaque niveau.",
        },
        {
          type: "paragraph",
          text: "Le salaire net avant impôt est obtenu après les cotisations sociales salariales, mais avant le prélèvement à la source. C'est souvent le montant visé quand on parle de calcul salaire net.",
        },
        {
          type: "paragraph",
          text: "Le net imposable sert de base fiscale au prélèvement à la source. Il est proche du salaire net avant impôt, mais pas toujours identique : certaines réintégrations peuvent le faire varier légèrement.",
        },
        {
          type: "paragraph",
          text: "Le salaire net après impôt, ou net versé, est le montant crédité sur votre compte après prélèvement à la source. C'est celui qui sert à votre budget du mois.",
        },
        {
          type: "table",
          caption: "Quatre niveaux de salaire à ne pas confondre",
          headers: ["Notion", "Définition", "Où la trouver ?"],
          rows: [
            [
              "Salaire brut",
              "Rémunération avant cotisations",
              "Contrat, offre d'emploi, haut de la fiche de paie",
            ],
            [
              "Salaire net avant impôt",
              "Après cotisations salariales, avant prélèvement à la source",
              "Fiche de paie ; résultat d'un calcul brut vers net",
            ],
            [
              "Net imposable",
              "Base fiscale utilisée pour le prélèvement à la source",
              "Bulletin de salaire ; estimation interne du simulateur",
            ],
            [
              "Salaire net après impôt (net versé)",
              "Après prélèvement à la source",
              "Net payé, crédité sur votre compte bancaire",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le montant net social est une ligne réglementaire spécifique du bulletin. Il ne doit pas être confondu avec le salaire net avant impôt utilisé dans ce guide.",
          ],
        },
      ],
    },
    {
      id: "passage-brut-net",
      title: "Comment passe-t-on du brut au net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Passer du salaire brut au salaire net, c'est suivre une chaîne de calcul. Chaque étape correspond à une retenue ou à une base fiscale.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Partir du salaire brut",
              description:
                "Montant convenu : base mensuelle, horaire ou annuelle. Les cotisations salariales se calculent à partir de cette base.",
            },
            {
              title: "Retirer les cotisations sociales salariales",
              description:
                "Maladie, retraite, CSG, CRDS et autres retenues liées à votre statut sont prélevées sur le brut. Leur total varie selon le profil et le contrat.",
            },
            {
              title: "Obtenir le salaire net avant impôt",
              description:
                "Il correspond au salaire brut diminué des cotisations salariales.",
            },
            {
              title: "Déterminer le net imposable et appliquer le prélèvement à la source",
              description:
                "Le prélèvement est calculé sur le net imposable. Cette base fiscale peut être légèrement supérieure au salaire net avant impôt en raison de certaines réintégrations.",
            },
            {
              title: "Obtenir le net versé",
              description:
                "Il s'agit du montant restant après le prélèvement à la source.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "En résumé : salaire brut → cotisations sociales → salaire net avant impôt → net imposable → prélèvement à la source → net versé. Le schéma d'introduction présente les trois montants ; cette liste détaille les opérations qui les relient.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Pour une première estimation, concentrez-vous sur le salaire net avant impôt : il reflète l'effet principal des cotisations. Ajoutez ensuite votre taux de prélèvement à la source pour vous rapprocher du net versé.",
          ],
        },
      ],
    },
    {
      id: "retenues-brut-net",
      title: "Les principales retenues et contributions qui expliquent l'écart entre brut et net",
      blocks: [
        {
          type: "paragraph",
          text: "L'écart entre salaire brut et salaire net avant impôt vient des retenues prélevées sur la rémunération. Elles financent la protection sociale et figurent ligne par ligne sur votre fiche de paie.",
        },
        {
          type: "paragraph",
          text: "Voici les principales familles de retenues qui expliquent pourquoi le net est inférieur au brut.",
        },
        {
          type: "table",
          caption: "Principales retenues liées au passage du brut au net",
          headers: ["Retenue ou contribution", "À quoi sert-elle ?", "Quel est son effet sur le calcul ?"],
          rows: [
            [
              "Assurance maladie, maternité, invalidité, décès",
              "Accès aux soins et aux indemnités en cas d'arrêt",
              "Réduit le brut pour financer l'Assurance maladie",
            ],
            [
              "Retraite de base",
              "Constituer vos droits à la retraite du régime général",
              "Prélèvement sur le brut, variable selon la rémunération",
            ],
            [
              "Retraite complémentaire (Agirc-Arrco pour le privé)",
              "Compléter la retraite de base",
              "Retenue souvent plus élevée pour les cadres, selon tranches et statut",
            ],
            [
              "CSG et CRDS",
              "Financement de la Sécurité sociale et dette sociale",
              "Contribution sur les revenus d'activité, impact direct sur le net",
            ],
            [
              "Complémentaire santé ou prévoyance (part salariale)",
              "Couverture santé ou prévoyance de l'entreprise",
              "Peut réduire le net si une part salariale est prévue au contrat",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Ces retenues ouvrent des droits sociaux (retraite, soins). Le net avant impôt est plus bas que le brut, mais une partie de cet écart finance votre protection.",
          ],
        },
      ],
    },
    {
      id: "net-different-meme-brut",
      title: "Pourquoi deux salariés ayant le même brut peuvent toucher un net différent ?",
      blocks: [
        {
          type: "paragraph",
          text: "Deux collègues à 3 000 € brut par mois peuvent afficher des salaires nets avant impôt différents. Le brut est une base commune, pas une promesse de net identique.",
        },
        {
          type: "list",
          items: [
            "Statut cadre ou non-cadre : cotisations spécifiques, notamment en retraite complémentaire.",
            "Fonction publique : régimes et paramètres propres au secteur public.",
            "Primes et variables : 13e mois, commissions ou heures supplémentaires modifient le brut mensuel.",
            "Temps de travail : un temps partiel réduit le brut mensuel et donc le net mensuel.",
            "Mutuelle et prévoyance : la part salariale varie selon le contrat d'entreprise.",
          ],
        },
        {
          type: "paragraph",
          text: "À salaire brut identique, un cadre et un non-cadre peuvent obtenir un net légèrement différent selon les cotisations spécifiques, le niveau de rémunération, les garanties collectives et les paramètres du contrat. Le statut seul ne suffit pas à tout expliquer.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple indicatif : deux salariés à ${formatEditorialEuro(ex3000Gross)} brut mensuel. Avec les coefficients simplifiés du calculateur, le non-cadre obtient environ ${ex3000NetNonExecutive} net avant impôt, le cadre environ ${ex3000NetExecutive}. Ces montants illustrent le fonctionnement du simulateur et ne constituent pas une règle générale applicable à toutes les fiches de paie.`,
          ],
        },
        {
          type: "paragraph",
          text: "En pratique, les écarts réels dépendent aussi du contrat, des cotisations applicables, de la convention collective et du niveau de rémunération.",
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source accentue encore les écarts : deux personnes au même salaire net avant impôt peuvent avoir des taux différents selon leur foyer fiscal.",
        },
      ],
    },
    {
      id: "prelevement-source",
      title: "Le prélèvement à la source",
      blocks: [
        {
          type: "paragraph",
          text: "L'impôt sur le revenu est prélevé à la source sur les salaires. Votre employeur retient un montant d'impôt à partir d'un taux transmis par l'administration fiscale.",
        },
        {
          type: "paragraph",
          text: "Après les cotisations, on obtient le salaire net avant impôt. Le prélèvement à la source est ensuite calculé sur le net imposable, une base fiscale proche mais pas toujours identique.",
        },
        {
          type: "paragraph",
          text: "Ce taux dépend de votre foyer fiscal : revenus du conjoint, parts, autres sources. Deux salariés au même brut peuvent donc avoir des prélèvements différents. Il ne se déduit pas fidèlement du seul salaire brut.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le simulateur propose un taux neutre estimatif à partir d'un net imposable approximatif. Si vous connaissez le taux transmis par l'administration fiscale, remplacez l'estimation par ce taux pour obtenir un résultat plus proche de votre situation.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Sur la fiche de paie, distinguez le salaire net avant impôt (après cotisations) et le net versé (après prélèvement à la source). Seul ce dernier correspond à ce que vous recevez réellement.",
          ],
        },
      ],
    },
    {
      id: "exemple-concret",
      title: "Exemple concret : de 2 500 € brut au net versé",
      blocks: [
        {
          type: "paragraph",
          text: "Cas simple : salarié non-cadre, temps plein (100 %), rémunération sur 12 mois, brut mensuel de 2 500 €. Montants indicatifs, calculés avec les coefficients du simulateur brut-vers-net.fr.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Profil : salarié non-cadre · Temps de travail : 100 % · Mois : 12`,
            `Salaire brut mensuel : ${exBrut}`,
            `Retenues salariales indicatives (coefficient 0,78 du profil non-cadre) : environ ${exCotisations}`,
            `Salaire net avant impôt : ${exNet}`,
            `Net imposable estimé : base fiscale approximative utilisée par le simulateur pour le prélèvement à la source`,
            `Prélèvement à la source : selon votre taux personnel. Le simulateur propose un taux neutre que vous pouvez remplacer.`,
            `Salaire net versé : net avant impôt moins le prélèvement à la source, selon le taux saisi.`,
          ],
        },
        {
          type: "paragraph",
          text: "Ce déroulé reprend la logique du calculateur : brut, cotisations, salaire net avant impôt, net imposable, prélèvement à la source, net versé.",
        },
        {
          type: "contextual-cta",
          text: "Reproduisez ce scénario avec votre propre taux de prélèvement à la source.",
          label: "Calculer mon salaire net",
          href: "/",
        },
      ],
    },
    {
      id: "erreurs-frequentes",
      title: "Les erreurs les plus fréquentes",
      blocks: [
        {
          type: "paragraph",
          text: "Lors d'une comparaison d'offres ou d'une négociation, quelques confusions reviennent souvent. Les éviter facilite le passage du brut au net.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Comparer un salaire brut annoncé avec un net perçu sans conversion préalable.",
            "Oublier le 13e ou 14e mois lors du calcul d'un salaire annuel brut vers net.",
            "Confondre salaire net avant impôt et net versé lors d'une comparaison.",
            "Ignorer les primes ou heures supplémentaires qui modifient le brut certains mois.",
            "Appliquer un taux de prélèvement moyen alors que le vôtre est personnalisé.",
            "Penser que le salaire net avant impôt est identique pour tous à brut égal.",
            "À salaire horaire identique, oublier qu'un temps partiel réduit le salaire brut mensuel et donc le salaire net mensuel.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Dans toute comparaison, exprimez les montants dans la même unité (horaire, mensuel ou annuel), sur la même base de temps de travail et au même niveau (brut avec brut, net avant impôt avec net avant impôt).",
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le calcul du salaire net",
  faq: [
    {
      question: "Comment calculer rapidement son salaire net ?",
      answer:
        "Saisissez votre salaire brut (horaire, mensuel ou annuel) dans le calculateur Brut vers Net, choisissez votre profil et ajustez le temps de travail si besoin. Le salaire net avant impôt s'affiche immédiatement. Renseignez votre taux de prélèvement à la source pour approcher le net versé.",
    },
    {
      question: "Quelle différence entre net avant impôt et net après impôt ?",
      answer:
        "Le salaire net avant impôt est obtenu après les cotisations salariales. Le net après impôt (net versé) est ce qui reste après le prélèvement à la source, calculé sur le net imposable. C'est le montant crédité sur votre compte.",
    },
    {
      question: "Le prélèvement à la source est-il inclus dans le calcul ?",
      answer:
        "Oui. Le simulateur estime le net versé à partir d'un net imposable approximatif et d'un taux neutre. Remplacez ce taux par celui transmis par l'administration fiscale pour un résultat plus proche de votre bulletin.",
    },
    {
      question: "Pourquoi deux salariés au même brut peuvent-ils toucher un net différent ?",
      answer:
        "Les cotisations varient selon le statut, le contrat, les garanties collectives et le temps de travail. Le prélèvement à la source diffère aussi selon le foyer fiscal. Deux fiches de paie au même brut peuvent donc afficher des nets distincts.",
    },
    {
      question: "Comment calculer un salaire annuel brut vers net ?",
      answer:
        "Indiquez le brut annuel et le nombre de mois (12 à 16 si prime lissée). Le simulateur calcule les équivalents mensuels et horaires. Pensez à inclure les mois de prime dans la base annuelle si votre employeur les répartit sur l'année.",
    },
    {
      question: "Comment calculer un salaire horaire brut vers net ?",
      answer:
        "Entrez le brut horaire : la conversion repose sur 151,67 heures par mois à temps plein. En temps partiel, baissez le pourcentage de temps de travail pour proratiser le mensuel.",
    },
    {
      question: "Le calcul fonctionne-t-il pour les cadres et la fonction publique ?",
      answer:
        "Oui : salarié non-cadre, salarié cadre et fonction publique, chacun avec un coefficient indicatif. Pour la fonction publique, il s'agit d'une estimation générale hors primes et indemnités spécifiques.",
    },
    {
      question: "Le résultat du calculateur est-il fiable ?",
      answer:
        "Il fournit une estimation indicative, pas un bulletin ligne par ligne. Primes, heures supplémentaires et cas atypiques ne sont pas intégrés. Pour un montant contractuel, consultez votre employeur ou votre fiche de paie.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le salaire brut est la rémunération convenue avant toute retenue.",
      "Les cotisations sociales salariales réduisent le brut pour obtenir le salaire net avant impôt.",
      "Le net imposable sert de base au prélèvement à la source, proche mais pas toujours identique au net avant impôt.",
      "Le prélèvement à la source produit le net versé, crédité sur votre compte.",
      "Le calculateur Brut vers Net reproduit cette logique avec des coefficients indicatifs.",
    ],
    closingText:
      "Vous connaissez maintenant les principales étapes du calcul du salaire net. Saisissez votre salaire brut dans le calculateur pour obtenir une estimation personnalisée en quelques secondes.",
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
