import type { Guide } from "../types";
import { exBrut, exNet, exCotisations } from "./guide-salary-examples";

const CALCUL_SALAIRE_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";

/** Guide pratique : lire une fiche de paie */
export const commentLireUneFicheDePaieGuide: Guide = {
  slug: "comment-lire-une-fiche-de-paie",
  title: "Comment lire une fiche de paie ?",
  seoTitle: "Comment lire une fiche de paie ? | Guide pratique",
  description:
    "Découvrez comment comprendre une fiche de paie avec des explications simples. Décryptez le salaire brut, le salaire net et les cotisations sociales.",
  subtitle:
    "Repérez les montants essentiels de votre bulletin de salaire en quelques minutes, sans jargon inutile.",
  publishedAt: "2026-07-14",
  updatedAt: "2026-07-14",
  introduction: [
    "Vous venez de recevoir votre premier bulletin de salaire et vous ne savez pas où regarder ? Vous n'êtes pas seul : une fiche de paie compte des dizaines de lignes, et toutes ne sont pas essentielles lors d'une première lecture.",
    "Ce document résume chaque mois ce que vous gagnez, ce qui est retenu et ce qui vous est versé. L'objectif n'est pas de tout mémoriser, mais de repérer les montants qui comptent vraiment.",
    "En suivant un ordre simple, du haut vers le bas, vous identifiez le salaire brut, les cotisations, le net avant impôt, le prélèvement à la source et le net versé.",
    "À la fin de ce guide, vous saurez lire les lignes importantes de votre fiche de paie et comprendre où se situe chaque montant clé.",
  ],
  quickSummary: {
    title: "Ordre de lecture d'une fiche de paie : du haut vers le bas",
    variant: "reading-order",
    items: [
      {
        kind: "level",
        rate: "1",
        title: "Employeur et salarié",
        description: "En-tête du bulletin",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "2",
        title: "Salaire brut",
        description: "Rémunération du mois",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "3",
        title: "Cotisations",
        description: "Retenues salariales",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "4",
        title: "Net avant impôt",
        description: "Après cotisations",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "5",
        title: "Prélèvement à la source",
        description: "Impôt sur le revenu",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "6",
        title: "Net versé",
        description: "Montant sur votre compte",
      },
    ],
  },
  sections: [
    {
      id: "quest-ce-quune-fiche-de-paie",
      title: "Qu'est-ce qu'une fiche de paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "La fiche de paie, aussi appelée bulletin de salaire, est le document que votre employeur vous remet chaque mois. Il détaille votre rémunération, les retenues prélevées et le montant effectivement versé.",
        },
        {
          type: "paragraph",
          text: "Elle sert de justificatif de revenus pour un prêt, un logement ou une démarche administrative. Conservez vos bulletins : ils peuvent vous être demandés plusieurs mois ou années plus tard.",
        },
        {
          type: "paragraph",
          text: "Vous la recevez en fin de mois ou au début du mois suivant, par voie papier ou dématérialisée. Une première lecture peut sembler dense ; l'essentiel tient en une poignée de montants.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Une fiche de paie n'est pas un document à lire ligne par ligne dès la première ouverture. Commencez par le salaire brut, les cotisations, puis le net versé.",
          ],
        },
      ],
    },
    {
      id: "zones-fiche-de-paie",
      title: "Les principales zones d'une fiche de paie",
      blocks: [
        {
          type: "paragraph",
          text: "Toutes les fiches de paie ne se présentent pas exactement de la même façon, mais la logique reste proche. On distingue en général six grandes zones.",
        },
        {
          type: "illustration",
          id: "fiche-de-paie-zones",
          caption:
            "Exemple simplifié et fictif : les zones à repérer en priorité sur un bulletin de salaire.",
        },
        {
          type: "table",
          caption: "Les six zones à repérer sur un bulletin de salaire",
          headers: ["Zone", "Contenu habituel", "Pourquoi la regarder ?"],
          rows: [
            [
              "Employeur",
              "Raison sociale, adresse, SIRET",
              "Vérifier l'identité de l'entreprise",
            ],
            [
              "Salarié",
              "Nom, emploi, statut, convention",
              "Contrôler vos informations personnelles",
            ],
            [
              "Éléments de salaire",
              "Salaire de base, primes, heures",
              "Trouver le salaire brut et ses composantes",
            ],
            [
              "Cotisations",
              "Retenues salariales par rubrique",
              "Comprendre l'écart entre brut et net avant impôt",
            ],
            [
              "Impôt",
              "Net imposable, taux et montant du PAS",
              "Voir ce qui est retenu pour l'impôt sur le revenu",
            ],
            [
              "Net",
              "Net avant impôt, net payé",
              "Connaître le montant versé sur votre compte",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les 5 lignes que regardent la plupart des salariés",
            "Salaire brut",
            "Cotisations",
            "Net avant impôt",
            "Prélèvement à la source",
            "Net versé",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Lors d'une première lecture, concentrez-vous sur la zone salaire, les cotisations, l'impôt et le net. Les mentions en pied de page peuvent attendre.",
          ],
        },
      ],
    },
    {
      id: "salaire-brut-fiche",
      title: "Où trouver le salaire brut ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire brut figure dans la partie centrale du bulletin, en haut du tableau des éléments de rémunération. Il regroupe le salaire de base et, le cas échéant, les primes ou heures du mois.",
        },
        {
          type: "paragraph",
          text: "Cherchez des libellés comme « Salaire de base », « Rémunération brute » ou « Total brut ». Ce montant correspond à ce qui a été gagné avant toute retenue salariale.",
        },
        {
          type: "paragraph",
          text: "Le brut du mois peut varier si vous avez touché une prime, des heures supplémentaires ou si vous êtes en temps partiel. Comparez toujours le bon mois lorsque vous analysez deux bulletins.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le salaire brut est votre point de départ sur la fiche de paie. Toutes les cotisations salariales se calculent à partir de cette base.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre le lien entre brut et net, consultez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: CALCUL_SALAIRE_NET_HREF,
        },
        {
          type: "contextual-cta",
          text: "Vous connaissez votre brut et souhaitez estimer le net correspondant ?",
          label: "Calculer mon salaire net",
          href: "/",
        },
      ],
    },
    {
      id: "salaire-net-fiche",
      title: "Où trouver le salaire net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Sur une fiche de paie, le « net » n'apparaît pas sous un seul libellé. Trois montants distincts se succèdent avant le virement sur votre compte.",
        },
        {
          type: "paragraph",
          text: "Le net avant impôt vient après les cotisations. Le net imposable, base du prélèvement à la source, figure dans la partie fiscale. Le net versé est le montant final crédité.",
        },
        {
          type: "table",
          caption: "Trois montants « net » à distinguer sur le bulletin",
          headers: ["Libellé courant", "Signification", "Où le repérer ?"],
          rows: [
            [
              "Net avant impôt",
              "Après cotisations salariales, avant impôt",
              "Bas du tableau des cotisations ou ligne dédiée",
            ],
            [
              "Net imposable",
              "Base fiscale du prélèvement à la source",
              "Zone impôt, souvent près du taux de PAS",
            ],
            [
              "Net payé / net versé",
              "Montant effectivement versé",
              "Dernière ligne de rémunération ou encadré « Net à payer »",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le montant net social est une ligne réglementaire spécifique. Ne le confondez pas avec le net avant impôt ni avec le net versé.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail du calcul entre ces montants, consultez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: CALCUL_SALAIRE_NET_HREF,
        },
      ],
    },
    {
      id: "lire-cotisations",
      title: "Comment lire les cotisations ?",
      blocks: [
        {
          type: "paragraph",
          text: "La zone cotisations occupe souvent la plus grande partie du bulletin. Inutile de décortiquer chaque ligne dès la première lecture : regroupez-les par grandes familles.",
        },
        {
          type: "paragraph",
          text: "Seules les retenues salariales réduisent directement votre net. Les lignes patronales peuvent être ignorées si vous cherchez simplement « combien je touche ».",
        },
        {
          type: "table",
          caption: "Les grandes familles de cotisations à repérer",
          headers: ["Famille", "À quoi sert-elle ?", "Impact sur votre salaire"],
          rows: [
            [
              "Maladie, maternité, invalidité",
              "Protection santé et arrêts de travail",
              "Retenue salariale sur le brut",
            ],
            [
              "Retraite de base et complémentaire",
              "Constitution des droits retraite",
              "Retenue variable selon statut et rémunération",
            ],
            [
              "CSG et CRDS",
              "Financement de la protection sociale",
              "Retenue sur les revenus d'activité",
            ],
            [
              "Complémentaire santé (mutuelle)",
              "Couverture santé de l'entreprise",
              "Retenue si une part salariale est prévue",
            ],
            [
              "Prévoyance",
              "Garanties en cas d'arrêt ou d'invalidité",
              "Retenue selon le contrat collectif",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les cotisations salariales expliquent l'écart entre le salaire brut et le net avant impôt. Si le total n'est pas regroupé sur une seule ligne, additionnez les retenues salariales.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour voir comment ces retenues s'appliquent au brut, lisez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: CALCUL_SALAIRE_NET_HREF,
        },
      ],
    },
    {
      id: "prelevement-source-fiche",
      title: "Où apparaît le prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prélèvement à la source figure dans la partie fiscale du bulletin, après les cotisations. Vous y trouvez le net imposable, le taux appliqué et le montant retenu.",
        },
        {
          type: "paragraph",
          text: "Il est calculé sur le net imposable, une base proche du net avant impôt. Le taux est transmis par l'administration fiscale et varie selon votre situation.",
        },
        {
          type: "paragraph",
          text: "Ce montant vient en diminution du net avant impôt pour produire le net versé. Si vous ne voyez pas de ligne d'impôt, vérifiez que vous consultez bien la fiche complète : certaines versions dématérialisées scindent les blocs sur plusieurs pages.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne confondez pas le net imposable et le net versé. Seul le net versé correspond au montant reçu sur votre compte bancaire.",
          ],
        },
      ],
    },
    {
      id: "informations-a-verifier",
      title: "Les informations importantes à vérifier",
      blocks: [
        {
          type: "paragraph",
          text: "Lors d'une première lecture, ou après un changement de poste, quelques points méritent un contrôle rapide. Cette checklist couvre l'essentiel sans parcourir chaque mention du bulletin.",
        },
        {
          type: "checklist",
          title: "Checklist de lecture",
          items: [
            "Identité et coordonnées : nom, adresse, poste occupé",
            "Convention collective et statut (cadre, non-cadre, etc.)",
            "Salaire brut du mois et salaire de base",
            "Nombre d'heures travaillées ou temps partiel appliqué",
            "Primes, commissions ou heures supplémentaires du mois",
            "Taux et montant du prélèvement à la source",
            "Net versé : montant crédité sur votre compte",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : gardez vos trois derniers bulletins. Ils suffisent en général pour repérer une anomalie ou préparer une négociation.",
          ],
        },
      ],
    },
    {
      id: "erreurs-frequentes",
      title: "Les erreurs les plus fréquentes",
      blocks: [
        {
          type: "paragraph",
          text: "Quelques confusions reviennent souvent lors de la première lecture d'un bulletin. Les connaître vous fait gagner du temps.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Confondre net imposable et net payé sur le bulletin.",
            "Croire que toutes les lignes du tableau des cotisations réduisent votre net versé.",
            "Comparer deux fiches de paie sans tenir compte des primes ou des heures supplémentaires.",
            "Oublier de vérifier le prélèvement à la source lors d'un changement de situation familiale.",
            "Ne regarder que le montant final sans contrôler le salaire brut et les retenues.",
            "Paniquer devant le volume de lignes alors que cinq montants suffisent pour comprendre l'essentiel.",
          ],
        },
      ],
    },
    {
      id: "exemple-concret",
      title: "Exemple concret d'une fiche de paie simplifiée",
      blocks: [
        {
          type: "paragraph",
          text: "Voici un exemple simplifié, inspiré d'un salarié non-cadre à temps plein avec un brut mensuel de 2 500 €. Il ne reproduit pas un bulletin réel, mais montre l'ordre de lecture recommandé.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Profil indicatif : salarié non-cadre · Temps plein · 12 mois",
            `Salaire brut mensuel : ${exBrut}`,
            `Cotisations salariales (estimation) : environ ${exCotisations}`,
            `Salaire net avant impôt : ${exNet}`,
            "Net imposable : base fiscale indiquée dans la zone impôt",
            "Prélèvement à la source : selon le taux personnel appliqué ce mois-ci",
            "Net versé : montant final crédité sur le compte",
          ],
        },
        {
          type: "paragraph",
          text: "Montants indicatifs, calculés avec les coefficients du simulateur brut-vers-net.fr. Votre bulletin réel peut différer selon votre contrat, vos primes et votre taux de prélèvement.",
        },
        {
          type: "contextual-cta",
          text: "Comparez votre brut avec une estimation du net avant impôt et du net versé.",
          label: "Calculer mon salaire net",
          href: "/",
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur la fiche de paie",
  faq: [
    {
      question: "Comment lire une fiche de paie pour la première fois ?",
      answer:
        "Commencez par le salaire brut, parcourez les cotisations salariales, repérez le net avant impôt, puis le net imposable et le prélèvement à la source. Terminez par le net versé. Ignorez les lignes patronales lors d'une première lecture.",
    },
    {
      question: "Où trouver mon salaire brut sur le bulletin ?",
      answer:
        "En haut du tableau des éléments de rémunération : « Salaire de base », « Rémunération brute » ou « Total brut ». Ce montant inclut le salaire de base et les primes du mois le cas échéant.",
    },
    {
      question: "Quelle différence entre net imposable et net payé ?",
      answer:
        "Le net imposable sert de base au prélèvement à la source. Le net payé, ou net versé, est ce qui reste après cette retenue et ce qui est crédité sur votre compte.",
    },
    {
      question: "Pourquoi y a-t-il autant de cotisations sur ma fiche ?",
      answer:
        "Chaque rubrique finance une part de la protection sociale : santé, retraite, chômage, CSG. Elles expliquent l'écart entre le brut et le net avant impôt. Seules les retenues salariales réduisent directement votre net.",
    },
    {
      question: "Le prélèvement à la source apparaît-il toujours ?",
      answer:
        "Pour les salariés du secteur privé et public soumis à l'impôt sur le revenu, oui, sous forme d'un taux et d'un montant retenus. Le taux peut être à zéro dans certaines situations, mais la ligne est en général présente.",
    },
    {
      question: "Pourquoi mon salaire net est-il différent de celui annoncé à l'embauche ?",
      answer:
        "L'offre d'embauche indique en général un salaire brut, parfois un net avant impôt estimé. Sur le bulletin, entrent aussi le prélèvement à la source, la mutuelle, la prévoyance et d'éventuelles primes ou absences. Comparez toujours brut avec brut, puis net versé avec votre budget réel.",
    },
    {
      question: "Pourquoi mon salaire change-t-il d'un mois à l'autre ?",
      answer:
        "Primes, heures supplémentaires, absences, temps partiel ou régularisation du prélèvement à la source modifient le bulletin. Comparez toujours le brut du mois, pas seulement le net versé.",
    },
    {
      question: "Comment vérifier qu'il n'y a pas d'erreur sur ma fiche ?",
      answer:
        "Contrôlez l'identité, le statut, le salaire de base, les heures, les primes et le net versé. Comparez avec le mois précédent en cas de doute. Pour une anomalie persistante, contactez votre service paie.",
    },
    {
      question: "Le calculateur Brut vers Net est-il utile avec une fiche de paie ?",
      answer:
        "Oui. Il estime le net avant impôt à partir du brut et aide à vérifier si l'ordre de grandeur de votre bulletin est cohérent. Il ne remplace pas la fiche de paie, mais complète sa lecture.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "La fiche de paie résume brut, cotisations, nets et prélèvement à la source.",
      "Le salaire brut se trouve dans la zone rémunération, en haut du détail.",
      "Le net avant impôt, le net imposable et le net versé sont trois montants distincts.",
      "Les cotisations salariales expliquent l'écart entre brut et net avant impôt.",
      "Cinq montants suffisent pour une première lecture efficace.",
    ],
    closingText:
      "Vous savez maintenant où chercher sur votre bulletin. Saisissez votre salaire brut dans le calculateur pour estimer le net correspondant et comparer avec votre fiche de paie.",
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
