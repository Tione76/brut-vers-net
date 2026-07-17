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

/** Guide de référence : comprendre la différence entre salaire brut et salaire net */
export const commentEstCalculeLeSalaireNetGuide: Guide = {
  slug: "comment-est-calcule-le-salaire-net",
  title: "Calcul du salaire net : comprendre la différence entre le salaire brut et le salaire net",
  seoTitle: "Salaire : différences entre brut et net | GUIDE COMPLET",
  description:
    "Toutes les explications sur les différences entre le salaire brut et le salaire net. Comprenez les cotisations, le prélèvement à la source et le calcul du salaire.",
  subtitle:
    "Pourquoi 2 500 € brut ne deviennent jamais 2 500 € sur votre compte : cotisations, nets et prélèvement à la source expliqués.",
  publishedAt: "2026-07-14",
  updatedAt: "2026-07-15",
  introduction: [
    "Pourquoi un salaire de 2 500 € brut ne devient-il jamais 2 500 € sur votre compte ? C'est la question derrière toute la différence entre salaire brut et salaire net.",
    "Entre le montant affiché au contrat et le virement sur votre compte, plusieurs montants se succèdent : salaire brut, cotisations salariales, salaire net avant impôt, net imposable, prélèvement à la source et salaire net versé.",
    "Les cotisations expliquent l'essentiel de l'écart entre salaire brut et salaire net. Le prélèvement à la source intervient ensuite, sur une base déjà réduite.",
    "Ce guide vous aide à comprendre la différence entre le brut et le net : ce que signifie chaque montant, pourquoi le salaire brut est supérieur au salaire net perçu, et comment s'effectue le passage d'un niveau à l'autre. Pour estimer votre propre salaire net, consultez le guide dédié au calcul pas à pas.",
  ],
  quickSummary: {
    title: "Le passage du salaire brut au salaire net",
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
    synthesis: [
      "En résumé, la principale différence entre le salaire brut et le salaire net provient des cotisations sociales prélevées sur la rémunération.",
      "Le prélèvement à la source intervient ensuite pour obtenir le salaire net versé. Cette succession d'étapes explique pourquoi le montant reçu sur votre compte est inférieur au salaire brut prévu au contrat.",
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
          text: "Si une annonce indique « 2 800 € brut mensuels », l'employeur s'engage sur cette base avant cotisations et impôt. Ce montant figure au contrat : ce n'est pas celui qui est versé sur votre compte.",
        },
        {
          type: "paragraph",
          text: "Où le retrouver ? Sur une offre ou une promesse d'embauche, c'est le montant annoncé. Sur le contrat, il figure dans la clause rémunération. Sur la fiche de paie, il apparaît en général en haut, souvent libellé « Salaire de base » ou « Rémunération brute ».",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le salaire brut est le montant prévu au contrat, pas votre budget mensuel. C'est le point de départ du passage vers le salaire net versé.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Vous souhaitez estimer ce qu'un salaire brut devient en net ?",
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
          text: "Dans le langage courant, « salaire net » reste ambigu : après cotisations ou après impôt. Pour comprendre la différence entre le brut et le net, distinguez chaque niveau.",
        },
        {
          type: "paragraph",
          text: "Le salaire net avant impôt est obtenu après les cotisations sociales salariales, mais avant le prélèvement à la source. C'est le premier « net » significatif : il montre l'effet principal des cotisations sur le brut.",
        },
        {
          type: "paragraph",
          text: "Le net imposable sert de base fiscale au prélèvement à la source. Il est proche du salaire net avant impôt, mais pas toujours identique : certaines réintégrations peuvent le faire varier légèrement.",
        },
        {
          type: "paragraph",
          text: "Le salaire net versé est le montant crédité sur votre compte après prélèvement à la source. C'est le seul qui corresponde à ce que vous percevez réellement chaque mois.",
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
            "Le montant net social est une ligne réglementaire spécifique du bulletin. Il ne doit pas être confondu avec le salaire net avant impôt ni avec le salaire net versé.",
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
          text: "Passer du salaire brut au salaire net, c'est suivre une chaîne de retenues et de bases fiscales. Chaque étape éclaire l'écart entre salaire brut et salaire net et pourquoi le montant perçu diffère de la rémunération au contrat.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Le salaire brut, point de départ",
              description:
                "Le salaire brut correspond au montant convenu au contrat : base mensuelle, horaire ou annuelle. C'est la rémunération avant toute retenue.",
            },
            {
              title: "Les cotisations salariales",
              description:
                "Les cotisations salariales sont prélevées sur le salaire brut afin de financer la protection sociale : maladie, retraite, CSG, CRDS et autres garanties selon le statut et le contrat.",
            },
            {
              title: "Le salaire net avant impôt",
              description:
                "Après ces retenues, il reste le salaire net avant impôt. C'est le salaire brut diminué des cotisations salariales : l'écart principal entre brut et net se joue ici.",
            },
            {
              title: "Le net imposable et le prélèvement à la source",
              description:
                "Le prélèvement à la source s'applique ensuite sur le net imposable, une base fiscale proche du salaire net avant impôt. Son montant dépend de votre situation fiscale personnelle.",
            },
            {
              title: "Le salaire net versé",
              description:
                "Ce qui reste après le prélèvement constitue le salaire net versé, crédité sur votre compte bancaire. C'est le montant réellement perçu.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "En résumé : salaire brut → cotisations sociales → salaire net avant impôt → net imposable → prélèvement à la source → salaire net versé. Le schéma d'introduction présente les trois niveaux ; cette liste détaille ce qui se passe entre eux.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Pour comprendre l'écart principal entre brut et net, concentrez-vous d'abord sur les cotisations salariales. Le prélèvement à la source intervient ensuite et varie selon votre foyer fiscal.",
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
          text: "Ces cotisations ne disparaissent pas : elles ouvrent des droits (retraite, soins, indemnités d'arrêt). Comprendre leur rôle aide à expliquer pourquoi le brut ne se transforme pas entièrement en net.",
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
            "Ces retenues expliquent l'essentiel de la différence entre salaire brut et salaire net avant impôt. Une partie de cet écart finance votre protection sociale.",
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
          text: "Deux collègues à 3 000 € brut par mois peuvent afficher des salaires nets avant impôt différents. Même salaire brut ne signifie pas même salaire net : le profil et le contrat modifient l'écart constaté.",
        },
        {
          type: "list",
          items: [
            "Statut cadre ou non-cadre : cotisations spécifiques, notamment en retraite complémentaire.",
            "Convention collective : garanties et cotisations propres au secteur.",
            "Mutuelle et prévoyance : la part salariale varie selon le contrat d'entreprise.",
            "Primes et variables : 13e mois, commissions modifient le brut mensuel.",
            "Heures supplémentaires : augmentent le brut du mois et donc le net.",
            "Temps partiel : le brut mensuel est proratisé, donc le salaire net aussi.",
            "Prélèvement à la source : le taux dépend du foyer fiscal, pas du seul salaire.",
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
            `Exemple indicatif : deux salariés à ${formatEditorialEuro(ex3000Gross)} brut mensuel. Avec les coefficients simplifiés du calculateur, le non-cadre obtient environ ${ex3000NetNonExecutive} net avant impôt, le cadre environ ${ex3000NetExecutive}. Ces montants illustrent le passage du brut au net et ne constituent pas une règle générale applicable à toutes les fiches de paie.`,
          ],
        },
        {
          type: "paragraph",
          text: "En pratique, les écarts réels dépendent aussi du contrat, des cotisations applicables, de la convention collective et du niveau de rémunération.",
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source accentue encore les différences : deux personnes au même salaire net avant impôt peuvent avoir des taux différents selon leur foyer fiscal.",
        },
      ],
    },
    {
      id: "prelevement-source",
      title: "Le prélèvement à la source",
      blocks: [
        {
          type: "paragraph",
          text: "Le prélèvement à la source n'explique pas l'essentiel de l'écart entre salaire brut et salaire net. Les cotisations salariales représentent la principale différence ; le prélèvement intervient ensuite, sur le salaire net avant impôt.",
        },
        {
          type: "paragraph",
          text: "L'impôt sur le revenu est prélevé à la source sur les salaires. Votre employeur retient un montant d'impôt à partir d'un taux transmis par l'administration fiscale, calculé sur le net imposable.",
        },
        {
          type: "paragraph",
          text: "Ce taux dépend de votre foyer fiscal : revenus du conjoint, parts, autres sources. Deux salariés au même brut peuvent donc avoir des prélèvements différents, même si leurs cotisations sont identiques.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le simulateur propose un taux neutre estimatif pour illustrer le passage du net imposable au salaire net versé. Votre taux personnel, transmis par l'administration fiscale, peut différer.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Sur la fiche de paie, distinguez le salaire net avant impôt (après cotisations) et le salaire net versé (après prélèvement à la source). Seul ce dernier correspond à ce que vous recevez réellement.",
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
          text: "Voici une illustration du passage du salaire brut au salaire net : salarié non-cadre, temps plein (100 %), rémunération sur 12 mois, brut mensuel de 2 500 €. Montants indicatifs, calculés avec les coefficients du simulateur brut-vers-net.fr.",
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
            `Salaire net versé : salaire net avant impôt moins le prélèvement à la source, selon le taux appliqué.`,
          ],
        },
        {
          type: "paragraph",
          text: "Cette illustration montre comment le brut se transforme progressivement en salaire net versé et pourquoi le salaire brut est supérieur au montant perçu : cotisations, salaire net avant impôt, net imposable, prélèvement à la source.",
        },
        {
          type: "contextual-cta",
          text: "Vous souhaitez estimer ce passage avec votre propre salaire brut ?",
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
          text: "Lors d'une comparaison d'offres ou d'une négociation, quelques confusions reviennent souvent sur la différence entre brut et net.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Comparer un salaire brut annoncé avec un salaire net perçu sans harmoniser les montants.",
            "Oublier le 13e ou 14e mois lors d'une comparaison de rémunération annuelle.",
            "Confondre salaire net avant impôt et salaire net versé lors d'une comparaison.",
            "Ignorer les primes ou heures supplémentaires qui modifient le brut certains mois.",
            "Penser que le prélèvement à la source explique à lui seul l'écart entre brut et net.",
            "Croire que le salaire net avant impôt est identique pour tous à brut égal.",
            "À salaire horaire identique, oublier qu'un temps partiel réduit le salaire brut mensuel et donc le salaire net mensuel.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Dans toute comparaison, exprimez les montants dans la même unité (horaire, mensuel ou annuel), sur la même base de temps de travail et au même niveau (brut avec brut, salaire net avant impôt avec salaire net avant impôt).",
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur la différence entre brut et net",
  faq: [
    {
      question: "Pourquoi le salaire brut est-il plus élevé que le salaire net ?",
      answer:
        "Le salaire brut inclut la rémunération avant toute retenue. Les cotisations salariales, puis le prélèvement à la source, réduisent progressivement ce montant jusqu'au salaire net versé crédité sur votre compte.",
    },
    {
      question: "Où passent les cotisations salariales ?",
      answer:
        "Elles financent la protection sociale : maladie, retraite, CSG, CRDS, mutuelle ou prévoyance selon votre contrat. Prélevées sur le brut, elles expliquent l'essentiel de l'écart entre salaire brut et salaire net avant impôt.",
    },
    {
      question: "Pourquoi existe-t-il plusieurs montants « net » sur une fiche de paie ?",
      answer:
        "Chaque « net » correspond à une étape : le salaire net avant impôt (après cotisations), le net imposable (base fiscale) et le salaire net versé (après prélèvement à la source). Ils ne désignent pas la même chose.",
    },
    {
      question: "Le prélèvement à la source explique-t-il toute la différence entre brut et net ?",
      answer:
        "Non. Les cotisations salariales expliquent la majeure partie de l'écart entre brut et salaire net avant impôt. Le prélèvement à la source intervient ensuite, sur le net imposable, et varie selon votre foyer fiscal.",
    },
    {
      question: "Pourquoi deux salariés avec le même brut n'ont-ils pas le même net ?",
      answer:
        "Les cotisations varient selon le statut, la convention collective, la mutuelle, le temps de travail et les primes. Le prélèvement à la source diffère aussi selon le foyer fiscal. Deux fiches de paie au même brut peuvent afficher des nets distincts.",
    },
    {
      question: "Quelle différence entre net avant impôt, net imposable et net versé ?",
      answer:
        "Le salaire net avant impôt est obtenu après les cotisations salariales. Le net imposable sert de base au prélèvement à la source. Le salaire net versé est ce qui reste après impôt et ce qui est crédité sur votre compte.",
    },
    {
      question: "Le montant net social est-il le salaire perçu ?",
      answer:
        "Non. Le montant net social est une ligne réglementaire spécifique du bulletin. Il ne doit pas être confondu avec le salaire net avant impôt ni avec le salaire net versé.",
    },
    {
      question: "Comment estimer son salaire net une fois le passage brut-net compris ?",
      answer:
        "Consultez le guide « Comment calculer son salaire net ? » pour la méthode pas à pas. Vous pouvez aussi saisir votre salaire brut dans le calculateur Brut vers Net pour une estimation indicative en quelques secondes.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "La différence entre le salaire brut et le salaire net tient d'abord aux cotisations sociales prélevées sur la rémunération.",
      "Les cotisations expliquent l'essentiel de l'écart entre salaire brut et salaire net avant impôt.",
      "Le prélèvement à la source, calculé sur le net imposable, produit le salaire net versé crédité sur votre compte.",
      "Statut, convention, mutuelle et foyer fiscal expliquent pourquoi deux salariés au même brut peuvent percevoir un salaire net différent.",
      "Comprendre la différence entre le brut et le net éclaire chaque montant affiché sur une fiche de paie ou une offre d'emploi.",
    ],
    closingText:
      "Vous comprenez maintenant la différence entre le salaire brut et le salaire net, les retenues qui expliquent cet écart, le rôle des cotisations sociales, l'intervention du prélèvement à la source et pourquoi deux salariés au même brut peuvent percevoir un salaire net différent. Si vous souhaitez estimer votre propre salaire net, utilisez notre simulateur.",
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
