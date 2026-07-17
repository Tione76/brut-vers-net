import type { Guide } from "../types";
import { exBrut, exNet, exCotisations } from "./guide-salary-examples";

const BRUT_NET_EXPLIQUE_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_SALAIRE_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";

/** Guide de référence : cotisations salariales et écart brut / net */
export const cotisationsSalarialesGuide: Guide = {
  slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
  title: "Cotisations salariales : pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
  seoTitle:
    "Cotisations salariales : pourquoi le salaire brut est plus élevé que le net ?",
  description:
    "Comprenez le rôle des cotisations salariales et pourquoi le salaire brut est plus élevé que le salaire net. Explications claires et exemples concrets.",
  subtitle:
    "Pourquoi votre salaire brut est supérieur à votre salaire net : maladie, retraite, CSG et le rôle des cotisations salariales expliqué simplement.",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  introduction: [
    "Vous consultez votre fiche de paie et vous constatez que votre salaire net est nettement inférieur à votre salaire brut. Une grande partie de cette différence provient des cotisations salariales. Mais à quoi servent-elles réellement, et pourquoi le salaire brut est-il plus élevé que le salaire net ?",
    "Les cotisations salariales sont des retenues prélevées sur votre rémunération brute. Elles financent la protection sociale : santé, retraite, famille et d'autres dispositifs collectifs.",
    "Ce guide explique pourquoi elles existent, où va l'argent prélevé et pourquoi leur montant varie d'un salarié à l'autre. Sans entrer dans le détail juridique, vous comprendrez le rôle de chaque grande famille de cotisations.",
    "Nous privilégions ici le fonctionnement et la finalité de chaque cotisation, pour une lecture claire et durable de votre bulletin.",
    "À la fin de cette lecture, vous saurez lire les lignes de cotisations sur votre bulletin et comprendre pourquoi votre salaire brut reste supérieur à votre salaire net avant impôt.",
  ],
  quickSummary: {
    title: "Du salaire brut au salaire net : le rôle des cotisations salariales",
    variant: "reading-order",
    items: [
      { kind: "level", rate: "1", title: "Salaire brut", description: "Rémunération au contrat" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "2", title: "Cotisations salariales", description: "Retenues sur le brut" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "3", title: "Protection sociale", description: "Dispositifs financés" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "4", title: "Retraite", description: "Droits constitués" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "5", title: "Assurance maladie", description: "Accès aux soins" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "6", title: "Salaire net avant impôt", description: "Après cotisations" },
    ],
    synthesis: [
      "Les cotisations salariales expliquent pourquoi le salaire brut est supérieur au salaire net avant impôt.",
      "La différence entre le salaire brut et le salaire net provient principalement de ces retenues, avant le prélèvement à la source. Elles alimentent des droits et des garanties collectives.",
    ],
  },
  sections: [
    {
      id: "que-sont-les-cotisations-salariales",
      title: "Que sont les cotisations salariales ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les cotisations salariales sont des prélèvements effectués sur votre salaire brut chaque mois. Elles figurent sur votre fiche de paie, ligne par ligne, dans le bloc des retenues salariales. C'est aussi ce qui explique, dès le premier regard, pourquoi le salaire brut affiché au contrat dépasse le montant perçu après retenues.",
        },
        {
          type: "paragraph",
          text: "Concrètement, lorsque votre employeur vous verse une rémunération, une part est retenue avant même que vous ne perceviez le montant sur votre compte. Cette part salariale se distingue des cotisations patronales : seules les retenues salariales réduisent directement ce que vous touchez après cotisations.",
        },
        {
          type: "paragraph",
          text: "Elles existent pour financer la protection sociale : accès aux soins, constitution des droits retraite, indemnisation en cas d'arrêt de travail, et autres garanties prévues par la loi ou par votre contrat.",
        },
        {
          type: "paragraph",
          text: "Le principe repose sur une logique collective : les actifs cotisent pour financer des droits ouverts aux assurés. Ce mécanisme explique pourquoi les cotisations sur salaire sont prélevées automatiquement, mois après mois, dès le premier bulletin.",
        },
        {
          type: "paragraph",
          text: "Pour le salarié, elles sont obligatoires dans le cadre du contrat de travail. L'employeur prélève les montants dus et les reverse aux organismes compétents. Vous ne choisissez pas de les payer ou non : elles font partie du fonctionnement normal de la rémunération.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les cotisations salariales ne sont pas un « malus » arbitraire sur votre bulletin. Elles traduisent un principe simple : une part de la rémunération brute finance des droits sociaux ouverts au salarié.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-prelevees-sur-salaire",
      title: "Pourquoi les cotisations sont-elles prélevées sur le salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire brut est la base de calcul. Les cotisations salariales s'appliquent sur cette rémunération avant que le montant ne devienne votre salaire net avant impôt.",
        },
        {
          type: "paragraph",
          text: "Pourquoi paie-t-on des cotisations sur le salaire plutôt qu'après coup ? Parce que le prélèvement à la source sur la paie garantit le financement régulier de la protection sociale. Chaque mois de travail génère des cotisations qui alimentent les dispositifs auxquels vous pouvez prétendre.",
        },
        {
          type: "paragraph",
          text: "Ce mécanisme est le même pour la quasi-totalité des salariés du secteur privé et public : d'abord le brut, puis les retenues, puis le net. Les cotisations salariales expliquent pourquoi le salaire brut est supérieur au salaire net avant impôt : c'est la raison principale de l'écart visible sur votre bulletin.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Partir du salaire brut",
              description:
                "C'est la rémunération convenue au contrat, incluant le salaire de base et les éléments variables du mois.",
            },
            {
              title: "2. Appliquer les cotisations salariales",
              description:
                "L'employeur calcule les retenues salariales applicables et les déduit du brut pour obtenir le salaire net avant impôt.",
            },
            {
              title: "3. Obtenir le salaire net avant impôt",
              description:
                "Ce montant intermédiaire montre l'effet des cotisations. L'impôt sur le revenu interviendra ensuite, sur une autre base.",
            },
          ],
        },
        {
          type: "table",
          caption: "De la rémunération brute au salaire net avant impôt",
          headers: ["Étape", "Ce qui se passe", "Montant concerné"],
          rows: [
            [
              "Salaire brut",
              "Rémunération convenue au contrat",
              "Base affichée sur l'offre ou la fiche de paie",
            ],
            [
              "Cotisations salariales",
              "Retenues prélevées sur le brut",
              "Lignes du bloc cotisations (part salariale)",
            ],
            [
              "Salaire net avant impôt",
              "Brut diminué des cotisations salariales",
              "Premier « net » significatif sur le bulletin",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : le prélèvement à la source n'est pas une cotisation salariale. Il intervient après les cotisations, sur le net imposable, et relève de l'impôt sur le revenu.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le passage complet du brut au net, incluant l'impôt, consultez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
      ],
    },
    {
      id: "a-quoi-servent-les-cotisations",
      title: "À quoi servent les cotisations salariales ?",
      blocks: [
        {
          type: "paragraph",
          text: "Chaque rubrique de cotisation finance un volet de la protection sociale. Sur le bulletin, les libellés peuvent sembler nombreux ; en pratique, on retrouve quelques grandes familles.",
        },
        {
          type: "paragraph",
          text: "Comprendre à quoi servent les cotisations salariales aide à lire une fiche de paie sans se perdre dans le détail. La différence entre le salaire brut et le salaire net provient principalement de ces retenues, avant même l'impôt sur le revenu. Plutôt que de mémoriser chaque ligne, regroupez-les par finalité : santé, retraite, financement général de la Sécurité sociale, garanties complémentaires.",
        },
        {
          type: "table",
          caption: "Les principales cotisations salariales et leur finalité",
          headers: ["Cotisation", "À quoi sert-elle ?", "Pourquoi est-elle importante ?"],
          rows: [
            [
              "Assurance maladie",
              "Accès aux soins et indemnités d'arrêt",
              "Couvre une partie des frais de santé et des arrêts maladie",
            ],
            [
              "Retraite de base et complémentaire",
              "Constitution des droits à la retraite",
              "Alimente vos droits futurs à pension",
            ],
            [
              "CSG",
              "Financement de la protection sociale",
              "Contribution large sur les revenus d'activité",
            ],
            [
              "CRDS",
              "Remboursement de la dette sociale",
              "Complète le financement de la Sécurité sociale",
            ],
            [
              "Complémentaire santé (mutuelle)",
              "Couverture santé complémentaire",
              "Dépend du contrat d'entreprise ; part salariale variable",
            ],
            [
              "Prévoyance",
              "Garanties en cas d'arrêt ou d'invalidité",
              "Selon les accords collectifs et les contrats de l'entreprise",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "L'assurance maladie couvre une partie des frais de santé et participe au financement des indemnités journalières en cas d'arrêt. Sans ce volet, chaque consultation ou hospitalisation pèserait intégralement sur le budget personnel du salarié.",
        },
        {
          type: "paragraph",
          text: "Les cotisations retraite, de base et complémentaire, alimentent vos droits futurs à pension. Chaque mois travaillé contribue à constituer ces droits, même si l'effet n'est pas visible immédiatement sur le bulletin du mois.",
        },
        {
          type: "paragraph",
          text: "La CSG et la CRDS participent au financement global de la protection sociale. Leur présence sur le bulletin explique en partie la diversité des lignes de cotisations : certaines ciblent un risque précis, d'autres alimentent un financement plus large.",
        },
        {
          type: "paragraph",
          text: "Enfin, la complémentaire santé et la prévoyance dépendent souvent de votre entreprise et de sa convention collective. Deux salariés au même brut peuvent donc voir des lignes différentes si leurs contrats collectifs ne prévoient pas les mêmes garanties.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les cotisations salariales ne sont pas interchangeables avec les cotisations patronales. Seules les retenues salariales réduisent directement votre salaire net avant impôt.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : si une ligne vous semble obscure, cherchez d'abord la famille à laquelle elle appartient (santé, retraite, CSG, mutuelle, prévoyance). Le libellé exact varie parfois d'un logiciel de paie à l'autre.",
          ],
        },
      ],
    },
    {
      id: "ou-va-l-argent",
      title: "Où va l'argent des cotisations ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'argent prélevé sur votre salaire brut est reversé à des organismes de protection sociale : Sécurité sociale, caisses de retraite, mutuelles ou institutions de prévoyance selon les rubriques.",
        },
        {
          type: "paragraph",
          text: "L'employeur joue le rôle d'intermédiaire : il calcule les cotisations dues, les retient sur la paie et les verse aux organismes compétents. Vous ne payez pas ces montants séparément : le prélèvement est intégré au cycle mensuel de la paie.",
        },
        {
          type: "paragraph",
          text: "Où vont les cotisations salariales, concrètement ? Une part alimente l'assurance maladie et les branches famille ou invalidité. Une autre part est destinée aux régimes de retraite. Les contributions CSG et CRDS participent au financement plus large de la protection sociale.",
        },
        {
          type: "paragraph",
          text: "En contrepartie, le salarié ouvre ou consolide des droits : remboursement de soins, indemnités en cas d'arrêt, points ou trimestres retraite, garanties prévoyance. L'argent ne « disparaît » pas au sens strict : il finance des dispositifs collectifs.",
        },
        {
          type: "list",
          items: [
            "Sécurité sociale : santé, maternité, famille, selon les rubriques prélevées.",
            "Caisses de retraite : droits de base et complémentaires selon votre statut.",
            "Mutuelle ou complémentaire santé : couverture définie par le contrat d'entreprise.",
            "Institutions de prévoyance : garanties en cas d'arrêt prolongé ou d'invalidité.",
          ],
        },
        {
          type: "illustration",
          id: "cotisations-salariales-destinations",
          caption:
            "Schéma simplifié : les cotisations salariales financent la protection sociale avant le salaire net avant impôt.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : sur votre fiche de paie, repérez le total des retenues salariales pour mesurer l'effet des cotisations sur votre brut. Le guide sur la lecture du bulletin détaille où les trouver.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour localiser chaque rubrique sur votre bulletin, lisez le guide",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "cotisations-differentes-selon-situation",
      title: "Pourquoi deux salariés ne paient-ils pas exactement les mêmes cotisations ?",
      blocks: [
        {
          type: "paragraph",
          text: "Deux collègues au même salaire brut peuvent afficher des cotisations salariales différentes. Le principe est commun, mais les montants varient selon la situation de chaque salarié.",
        },
        {
          type: "paragraph",
          text: "Pourquoi y a-t-il des cotisations sur le salaire en quantités différentes d'un bulletin à l'autre ? Parce que le calcul tient compte de votre profil, de votre rémunération du mois et des garanties prévues par votre contrat de travail ou votre convention collective.",
        },
        {
          type: "list",
          items: [
            "Statut cadre ou non-cadre : cotisations de retraite complémentaire distinctes.",
            "Convention collective : garanties et cotisations spécifiques au secteur.",
            "Mutuelle et prévoyance : part salariale variable selon le contrat d'entreprise.",
            "Temps partiel : rémunération brut proratisée, donc cotisations ajustées.",
            "Niveau de rémunération : certaines cotisations progressent avec le salaire.",
            "Primes ou variables du mois : le brut fluctue, les cotisations aussi.",
          ],
        },
        {
          type: "paragraph",
          text: "C'est pourquoi comparer deux bulletins ligne par ligne sans tenir compte du statut, de la convention ou du temps de travail peut prêter à confusion.",
        },
        {
          type: "table",
          caption: "Facteurs qui modifient le montant des cotisations salariales",
          headers: ["Facteur", "Effet sur les cotisations", "Exemple courant"],
          rows: [
            [
              "Statut cadre / non-cadre",
              "Retraite complémentaire et prévoyance distinctes",
              "Deux profils au même brut, lignes retraite différentes",
            ],
            [
              "Convention collective",
              "Garanties et cotisations spécifiques au secteur",
              "Mutuelle obligatoire dans certains accords",
            ],
            [
              "Temps partiel",
              "Brut proratisé, cotisations ajustées",
              "Même poste à mi-temps, brut et retenues réduits",
            ],
            [
              "Niveau de rémunération",
              "Certaines cotisations progressent avec le salaire",
              "Prime ou augmentation modifie le total des retenues",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple indicatif : à salaire brut identique, un cadre et un non-cadre peuvent afficher des retenues salariales légèrement différentes, notamment en retraite complémentaire. Les montants exacts dépendent du contrat et du profil.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : une variation de cotisations d'un mois à l'autre peut aussi venir d'une prime, d'heures supplémentaires ou d'un changement de garantie complémentaire. Comparez toujours le brut du mois avant d'analyser les retenues.",
          ],
        },
      ],
    },
    {
      id: "cotisations-perdues",
      title: "Les cotisations sont-elles perdues ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non. Les cotisations salariales ne sont pas une simple perte sèche sur votre fiche de paie. Elles financent des droits et des garanties auxquels vous pouvez avoir recours.",
        },
        {
          type: "paragraph",
          text: "L'écart entre salaire brut et salaire net peut surprendre au premier bulletin. Pourtant, les cotisations salariales ne sont pas « perdues » au sens où elles n'ouvriraient aucun droit. Elles alimentent des dispositifs que vous utilisez ou utiliserez : soins, arrêts de travail, retraite, garanties collectives.",
        },
        {
          type: "paragraph",
          text: "Consultation médicale remboursée, indemnités en cas d'arrêt maladie, droits retraite constitués mois après mois, couverture prévoyance selon le contrat : voilà ce que ces retenues permettent de financer collectivement.",
        },
        {
          type: "paragraph",
          text: "Autrement dit, une partie de votre rémunération brute est convertie en protection sociale plutôt qu'en liquidités immédiates. C'est ce qui explique pourquoi votre salaire brut reste supérieur à votre salaire net avant impôt, sans que cette différence soit un simple prélèvement sans contrepartie.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Les cotisations salariales réduisent le salaire net avant impôt, mais ouvrent des droits sociaux. Comprendre leur finalité aide à accepter l'écart entre brut et net.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Attention : les cotisations salariales ne se confondent pas avec l'impôt sur le revenu. Le prélèvement à la source relève d'une autre logique, distincte de la protection sociale.",
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
          text: "Autour des cotisations salariales, quelques idées reçues reviennent souvent. Les identifier clarifie la lecture d'une fiche de paie et évite de confondre cotisations, impôt et charges employeur.",
        },
        {
          type: "paragraph",
          text: "La plupart de ces erreurs viennent d'un même réflexe : vouloir résumer toute la fiche de paie en une seule ligne. En réalité, le bulletin distingue les cotisations salariales, les cotisations patronales et le prélèvement à la source, chacun avec un rôle différent.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Croire que toutes les cotisations salariales sont des impôts.",
            "Penser que toutes les entreprises appliquent exactement les mêmes retenues.",
            "Confondre le prélèvement à la source avec une cotisation salariale.",
            "Croire que toutes les cotisations sont identiques pour tous les salariés.",
            "Oublier que certaines lignes du bulletin concernent l'employeur, pas votre net.",
            "Penser que les cotisations salariales et patronales ont le même effet sur votre salaire.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : lorsque vous analysez votre fiche de paie, isolez d'abord le total des cotisations salariales avant de regarder l'impôt. Vous verrez plus clairement pourquoi le brut diffère du net avant impôt.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer ces lignes sur votre bulletin, consultez le guide",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "exemple-concret",
      title: "Exemple concret : cotisations sur un salaire de 2 500 € brut",
      blocks: [
        {
          type: "paragraph",
          text: "Voici une illustration simple, pour un salarié non-cadre à temps plein avec un brut mensuel de 2 500 €. Les montants sont indicatifs et servent uniquement à montrer le mécanisme : comprendre pourquoi votre salaire brut est supérieur à votre salaire net passe d'abord par l'effet des cotisations salariales.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Repérer le salaire brut",
              description: `Sur ce profil, la rémunération brute mensuelle s'élève à ${exBrut}. C'est le montant de référence avant toute retenue salariale.`,
            },
            {
              title: "2. Identifier les cotisations salariales",
              description: `Les retenues salariales représentent environ ${exCotisations} sur ce profil. Elles couvrent les grandes familles vues plus haut : maladie, retraite, CSG, CRDS et autres rubriques applicables.`,
            },
            {
              title: "3. Obtenir le salaire net avant impôt",
              description: `Après cotisations, le salaire net avant impôt est d'environ ${exNet}. C'est le premier « net » significatif sur une fiche de paie, avant le prélèvement à la source.`,
            },
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Profil indicatif : salarié non-cadre · Temps plein",
            `Salaire brut mensuel : ${exBrut}`,
            `Cotisations salariales (estimation) : environ ${exCotisations}`,
            `Salaire net avant impôt : ${exNet}`,
            "Le prélèvement à la source s'applique ensuite sur le net imposable, distinct des cotisations.",
          ],
        },
        {
          type: "paragraph",
          text: "Sur ce profil, les cotisations salariales expliquent la majeure partie de l'écart entre le brut affiché et le salaire net avant impôt. Votre bulletin réel peut différer selon votre contrat et votre statut.",
        },
        {
          type: "paragraph",
          text: "Cet exemple ne remplace pas votre fiche de paie : il montre seulement comment les cotisations sur salaire réduisent le brut pour produire le net avant impôt. Pour le détail du passage complet jusqu'au net versé, le guide sur la différence brut et net complète cette lecture.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail du passage complet jusqu'au net versé, consultez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
        {
          type: "contextual-cta",
          text: "Vous souhaitez estimer l'effet des cotisations sur votre propre salaire brut ?",
          label: "Calculer mon salaire net",
          href: "/",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour reproduire ce type d'estimation pas à pas, consultez le guide",
          label: "Comment calculer son salaire net ?",
          href: CALCULER_SALAIRE_NET_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur les cotisations salariales",
  faqIntro:
    "Vous connaissez désormais le rôle des cotisations salariales et comprenez pourquoi elles expliquent une grande partie de l'écart entre le salaire brut et le salaire net. Voici les questions les plus fréquemment posées par les salariés.",
  faq: [
    {
      question: "À quoi servent les cotisations salariales ?",
      answer:
        "Elles financent la protection sociale : santé, retraite, famille et autres garanties. Prélevées sur le salaire brut, elles expliquent une grande partie de l'écart entre brut et salaire net avant impôt.",
    },
    {
      question: "Pourquoi les cotisations salariales sont-elles obligatoires ?",
      answer:
        "Elles participent au financement collectif de la Sécurité sociale et des régimes de retraite. Dans le cadre d'un contrat de travail, le salarié cotise selon les règles applicables à son statut et à son employeur.",
    },
    {
      question: "Les cotisations salariales sont-elles des impôts ?",
      answer:
        "Non. Elles financent la protection sociale et ouvrent des droits. L'impôt sur le revenu, prélevé à la source, relève d'une autre logique et intervient après les cotisations.",
    },
    {
      question: "Pourquoi le montant des cotisations varie-t-il d'un salarié à l'autre ?",
      answer:
        "Statut, convention collective, mutuelle, prévoyance, temps partiel et niveau de rémunération modifient les retenues. Deux salariés au même brut peuvent donc afficher des cotisations différentes.",
    },
    {
      question: "Pourquoi mes cotisations salariales changent-elles d'un mois à l'autre ?",
      answer:
        "Les cotisations salariales suivent la rémunération du mois. Une prime, des heures supplémentaires ou un élément variable augmente le brut et donc les retenues. À l'inverse, une absence peut les réduire. Certaines cotisations sont aussi calculées dans la limite de plafonds : le total affiché sur le bulletin peut varier même si votre salaire de base reste identique.",
    },
    {
      question: "Qui fixe les cotisations salariales ?",
      answer:
        "Les règles sont définies par la loi, les accords de branche et les contrats d'entreprise pour certaines garanties. L'employeur applique les dispositions en vigueur et reverse les montants aux organismes compétents.",
    },
    {
      question: "Le prélèvement à la source est-il une cotisation salariale ?",
      answer:
        "Non. Le prélèvement à la source est l'impôt sur le revenu retenu sur le net imposable. Il intervient après les cotisations salariales et ne finance pas la protection sociale.",
    },
    {
      question: "Les cotisations salariales financent-elles la retraite ?",
      answer:
        "Oui, en partie. Les cotisations retraite de base et complémentaire alimentent vos droits futurs à pension. Elles figurent parmi les principales retenues sur le salaire brut.",
    },
    {
      question: "Peut-on réduire ses cotisations salariales ?",
      answer:
        "Les cotisations obligatoires ne se négocient pas individuellement. Certaines garanties complémentaires dépendent du contrat d'entreprise. En cas de doute sur une ligne, contactez votre service paie.",
    },
    {
      question: "Où voir les cotisations salariales sur ma fiche de paie ?",
      answer:
        "Dans le bloc cotisations, les lignes « part salariale » indiquent les montants prélevés sur votre brut. Le salaire net avant impôt apparaît après ce bloc.",
    },
    {
      question: "Pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
      answer:
        "Principalement à cause des cotisations salariales, puis du prélèvement à la source. Les cotisations expliquent l'essentiel de l'écart entre brut et salaire net avant impôt.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Les cotisations salariales financent la protection sociale et expliquent l'écart entre brut et net.",
      "Elles sont prélevées sur le salaire brut avant le salaire net avant impôt.",
      "Maladie, retraite, CSG, CRDS, mutuelle et prévoyance forment les grandes familles à repérer.",
      "Leur montant varie selon le statut, la convention et le contrat d'entreprise.",
      "Elles ne sont pas perdues : elles ouvrent des droits sociaux au salarié.",
    ],
    closingText:
      "Vous comprenez maintenant pourquoi les cotisations salariales existent, pourquoi elles expliquent une grande partie de la différence entre salaire brut et salaire net, et ce qu'elles financent. Comprendre les cotisations salariales permet également de mieux lire sa fiche de paie, comparer plusieurs offres d'emploi et comprendre pourquoi deux salariés ayant le même salaire brut peuvent percevoir un salaire net différent. Pour estimer l'effet de ces retenues sur votre propre rémunération, utilisez le calculateur Brut vers Net.",
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
