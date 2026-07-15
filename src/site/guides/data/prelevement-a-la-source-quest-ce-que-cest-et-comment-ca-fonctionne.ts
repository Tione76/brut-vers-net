import type { Guide } from "../types";
import { exBrut, exNet, exCotisations } from "./guide-salary-examples";

const BRUT_NET_EXPLIQUE_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_SALAIRE_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";

/** Guide de référence : prélèvement à la source sur le salaire */
export const prelevementALaSourceGuide: Guide = {
  slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
  title: "Prélèvement à la source : qu'est-ce que c'est et comment ça fonctionne ?",
  seoTitle: "Prélèvement à la source : qu'est-ce que c'est et comment ça marche ?",
  description:
    "Prélèvement à la source : définition, fonctionnement et taux sur le salaire. Où le repérer sur la fiche de paie et quel impact sur le salaire net versé.",
  subtitle:
    "Qu'est-ce que le prélèvement à la source, pourquoi apparaît-il sur votre fiche de paie et comment influence-t-il le salaire net versé ?",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  introduction: [
    "Vous consultez votre fiche de paie et vous remarquez une ligne « Prélèvement à la source ». À quoi correspond-elle ? Pourquoi ce montant est-il retenu sur votre salaire ? Et comment fonctionne-t-il au quotidien ?",
    "Le prélèvement à la source est le mécanisme par lequel l'impôt sur le revenu est retenu directement sur votre rémunération, avant le virement sur votre compte. Il intervient après les cotisations salariales, sur une base fiscale appelée net imposable.",
    "Si vous souhaitez estimer l'impact des cotisations salariales et du prélèvement à la source sur votre rémunération, vous pouvez utiliser notre calculateur Brut vers Net.",
    "Ce guide explique ce qu'est le prélèvement à la source, comment il fonctionne sur le salaire, qui fixe le taux appliqué et pourquoi il ne faut pas le confondre avec les cotisations sociales.",
    "À la fin de cette lecture, vous saurez lire la zone fiscale de votre bulletin, comprendre pourquoi votre salaire net versé est inférieur au net avant impôt, et distinguer clairement cotisations et impôt.",
  ],
  introSummary: {
    title: "Le prélèvement à la source en 30 secondes",
    items: [
      "Il correspond à l'impôt sur le revenu prélevé sur le salaire.",
      "Son taux est déterminé par l'administration fiscale.",
      "Il est appliqué par l'employeur sur le net imposable.",
      "Il réduit le salaire net versé, mais pas le salaire brut ni le net avant impôt.",
    ],
  },
  quickSummary: {
    title: "Du salaire brut au salaire net versé : où intervient le prélèvement à la source",
    variant: "reading-order",
    items: [
      { kind: "level", rate: "1", title: "Salaire brut", description: "Rémunération au contrat" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "2", title: "Cotisations salariales", description: "Retenues sociales sur le brut" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "3", title: "Salaire net avant impôt", description: "Après cotisations" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "4", title: "Prélèvement à la source", description: "Impôt retenu sur le net imposable" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "5", title: "Salaire net versé", description: "Montant crédité sur le compte" },
    ],
    synthesis: [
      "Les cotisations salariales interviennent en premier et produisent le salaire net avant impôt.",
      "Le prélèvement à la source s'applique ensuite sur le net imposable et réduit le montant jusqu'au salaire net versé, seul montant réellement perçu.",
    ],
  },
  sections: [
    {
      id: "quest-ce-que-le-prelevement-a-la-source",
      title: "Qu'est-ce que le prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prélèvement à la source est le système qui permet de payer l'impôt sur le revenu directement au moment où le salaire est versé.",
        },
        {
          type: "paragraph",
          text: "Sur une fiche de paie, il correspond à la part d'impôt retenue par l'employeur avant le virement de votre salaire. Le montant prélevé à la source figure dans la zone fiscale du bulletin, avec le net imposable et le taux appliqué.",
        },
        {
          type: "paragraph",
          text: "Concrètement, l'impôt n'est plus réglé en une seule fois l'année suivante sur l'ensemble des revenus : une fraction est prélevée chaque mois sur le salaire. Cela permet de lisser le paiement de l'impôt au rythme des revenus perçus.",
        },
        {
          type: "paragraph",
          text: "Pourquoi ce dispositif existe-t-il ? Pour rapprocher le paiement de l'impôt du moment où le revenu est touché et simplifier le quotidien des contribuables. L'employeur agit comme intermédiaire : il retient l'impôt et le reverse à l'administration fiscale.",
        },
        {
          type: "paragraph",
          text: "En France, le prélèvement à la source sur les salaires est appliqué depuis 2019. Le principe général reste le même : l'impôt est calculé sur votre situation fiscale et prélevé au fil de l'eau sur votre rémunération.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le prélèvement à la source n'est pas une cotisation sociale. Il relève de l'impôt sur le revenu et intervient après les cotisations salariales, sur le net imposable.",
          ],
        },
      ],
    },
    {
      id: "prelevement-sur-fiche-de-paie",
      title: "Pourquoi le prélèvement à la source apparaît-il sur votre fiche de paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Sur une fiche de paie, le prélèvement à la source figure dans la partie fiscale du bulletin, après le bloc des cotisations. C'est là que vous voyez comment l'impôt est retenu sur votre salaire du mois.",
        },
        {
          type: "paragraph",
          text: "Cette zone regroupe en général le net imposable (base de calcul), le taux de prélèvement à la source appliqué et le montant prélevé à la source. Juste en dessous ou à proximité apparaît le salaire net versé, montant final crédité sur votre compte.",
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source apparaît sur la fiche de paie parce que l'employeur a l'obligation de retenir l'impôt au moment du paiement du salaire. Vous n'avez pas à effectuer ce versement vous-même : il est intégré au cycle mensuel de la paie.",
        },
        {
          type: "illustration",
          id: "prelevement-source-fiche-paie",
          caption:
            "Schéma simplifié : emplacement du prélèvement à la source sur une fiche de paie, entre le net avant impôt et le net versé.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : le libellé exact peut varier selon le logiciel de paie (« Prélèvement à la source », « PAS », « Impôt sur le revenu »). Repérez la zone qui mentionne le net imposable et le taux appliqué.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer cette zone dans l'ensemble du bulletin, consultez le guide",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "comment-fonctionne-le-prelevement",
      title: "Comment fonctionne le prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Comment fonctionne le prélèvement à la source sur le salaire ? Le mécanisme repose sur une succession d'étapes : calcul du taux, transmission à l'employeur, retenue sur la paie.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Déclaration annuelle de revenus",
              description:
                "Votre situation fiscale et celle de votre foyer fiscal servent de base au calcul du taux applicable.",
            },
            {
              title: "2. Calcul du taux par l'administration fiscale",
              description:
                "L'administration fiscale, via la DGFiP, détermine un taux personnalisé ou, selon les cas, un taux non personnalisé.",
            },
            {
              title: "3. Transmission du taux à l'employeur",
              description:
                "Le taux est communiqué au service paie via le dispositif prévu par l'administration fiscale.",
            },
            {
              title: "4. Application sur le net imposable",
              description:
                "Chaque mois, l'employeur applique ce taux sur le net imposable figurant sur le bulletin de salaire.",
            },
            {
              title: "5. Retenue sur le salaire",
              description:
                "Le montant prélevé à la source est déduit avant le virement : le salaire net versé en résulte.",
            },
            {
              title: "6. Reversement à l'administration fiscale",
              description:
                "L'employeur reverse l'impôt retenu à l'administration fiscale, sans en fixer le montant lui-même.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source salaire intervient donc après les cotisations salariales. Il ne porte pas sur le salaire brut, mais sur le net imposable, une base fiscale proche du salaire net avant impôt.",
        },
        {
          type: "table",
          caption: "Les étapes du prélèvement à la source sur la paie",
          headers: ["Étape", "Acteur", "Ce qui se passe"],
          rows: [
            [
              "Calcul du taux",
              "Administration fiscale",
              "Taux personnalisé à partir de la déclaration de revenus",
            ],
            [
              "Transmission",
              "impots.gouv.fr → employeur",
              "Le taux est communiqué au service paie",
            ],
            [
              "Retenue mensuelle",
              "Employeur",
              "Impôt prélevé sur le net imposable du mois",
            ],
            [
              "Versement",
              "Employeur → Trésor public",
              "L'impôt retenu est reversé à l'administration fiscale",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le prélèvement à la source ne modifie pas votre salaire brut ni votre salaire net avant impôt. Il agit uniquement sur le montant final versé sur votre compte.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour replacer le prélèvement dans le passage complet du brut au net, lisez le guide",
          label: "Calcul du salaire net : brut et net expliqués",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
      ],
    },
    {
      id: "qui-fixe-le-taux",
      title: "Qui fixe le taux de prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le taux de prélèvement à la source n'est pas fixé par l'employeur ni choisi librement sur le bulletin. L'administration fiscale, via la DGFiP, calcule et transmet le taux applicable au service paie.",
        },
        {
          type: "paragraph",
          text: "Ce taux s'appuie sur votre déclaration annuelle de revenus : revenus du foyer fiscal, situation familiale, autres sources de revenus le cas échéant. Il peut prendre la forme d'un taux individualisé ou d'un taux commun, selon les options retenues.",
        },
        {
          type: "list",
          items: [
            "Déclaration annuelle de revenus : base de calcul du taux personnalisé.",
            "Administration fiscale : calcul et transmission du taux à l'employeur.",
            "Employeur : application du taux reçu sur le net imposable de chaque bulletin.",
            "Actualisation : le taux peut évoluer après un changement de situation ou une nouvelle déclaration.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : en cas de mariage, naissance ou changement de revenus dans le foyer fiscal, vérifiez si votre taux doit être actualisé dans votre espace personnel sur impots.gouv.fr.",
          ],
        },
      ],
    },
    {
      id: "peut-on-modifier-son-taux",
      title: "Peut-on modifier son taux de prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, sous certaines conditions. L'employeur n'applique que le taux transmis par l'administration fiscale : il ne peut pas le modifier de son propre chef.",
        },
        {
          type: "paragraph",
          text: "En tant que salarié, vous pouvez consulter votre taux dans votre espace personnel sur impots.gouv.fr. Si votre situation a changé (revenus du conjoint, naissance, baisse ou hausse de revenus), vous pouvez demander une actualisation.",
        },
        {
          type: "paragraph",
          text: "La demande est traitée par l'administration fiscale, qui transmet ensuite le nouveau taux à votre employeur. Le service paie l'applique dès réception : un délai peut s'écouler avant que le taux mis à jour n'apparaisse sur votre fiche de paie.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Modifier son taux ne signifie pas le négocier avec l'employeur. Toute demande passe par l'espace fiscal personnel, puis par la transmission officielle du taux à l'entreprise.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "Pour les informations officielles sur le prélèvement à la source et la gestion de votre taux, vous pouvez consulter votre espace personnel sur",
          label: "impots.gouv.fr",
          href: "https://www.impots.gouv.fr",
        },
      ],
    },
    {
      id: "taux-semble-incorrect",
      title: "Que faire si le taux affiché semble incorrect ?",
      blocks: [
        {
          type: "paragraph",
          text: "Commencez par comparer le taux figurant sur votre fiche de paie avec celui visible dans votre espace personnel sur impots.gouv.fr. C'est la référence à vérifier en premier.",
        },
        {
          type: "paragraph",
          text: "Si un changement de revenus ou de situation familiale est récent, assurez-vous qu'il a bien été pris en compte dans votre espace fiscal. Tant que l'administration n'a pas transmis un taux actualisé, l'employeur continue d'appliquer le dernier taux reçu.",
        },
        {
          type: "paragraph",
          text: "L'employeur ne peut pas corriger librement un taux qui lui semble erroné : il applique le taux communiqué par l'administration fiscale. En cas d'écart persistant, orientez-vous vers l'administration fiscale plutôt que vers le service paie.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Attention : inutile de transmettre à l'employeur des informations fiscales personnelles qui ne relèvent pas de la paie. La correction d'un taux incorrect se traite avec l'administration fiscale.",
          ],
        },
      ],
    },
    {
      id: "taux-differents-entre-salaries",
      title: "Pourquoi deux salariés n'ont-ils pas le même taux ?",
      blocks: [
        {
          type: "paragraph",
          text: "Deux collègues au même salaire brut peuvent afficher un taux de prélèvement à la source différent. Le salaire affiché sur le bulletin n'est pas le seul facteur : c'est la situation fiscale personnelle qui explique l'écart.",
        },
        {
          type: "list",
          items: [
            "Revenus du foyer fiscal : le conjoint ou d'autres sources de revenus influencent le taux.",
            "Situation familiale : nombre de parts, personnes à charge, changements récents.",
            "Type de taux : taux individualisé, taux non personnalisé ou taux commun du foyer, selon les options retenues.",
            "Actualisation : une déclaration annuelle de revenus ou un changement de situation modifie le taux transmis à l'employeur.",
          ],
        },
        {
          type: "paragraph",
          text: "Ainsi, même avec des cotisations salariales identiques, deux salariés peuvent percevoir un salaire net versé différent si leurs taux de prélèvement à la source ne sont pas les mêmes.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple indicatif : deux salariés non-cadres au même salaire net avant impôt peuvent avoir des prélèvements différents si l'un est seul imposable et l'autre partage un foyer avec des revenus complémentaires.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : le taux affiché sur la fiche de paie est un taux d'impôt, pas un taux de cotisation. Il reflète votre situation fiscale, pas celle de votre entreprise.",
          ],
        },
      ],
    },
    {
      id: "difference-cotisations-prelevement",
      title: "Quelle différence entre les cotisations salariales et le prélèvement à la source ?",
      blocks: [
        {
          type: "paragraph",
          text: "Sur une fiche de paie, cotisations salariales et prélèvement à la source sont deux retenues distinctes. Les confondre est l'une des erreurs les plus fréquentes lors de la lecture d'un bulletin.",
        },
        {
          type: "paragraph",
          text: "Les cotisations salariales financent la protection sociale et sont prélevées sur le salaire brut. Le prélèvement à la source, lui, correspond à l'impôt sur le revenu et intervient plus tard, sur le net imposable.",
        },
        {
          type: "table",
          caption: "Cotisations salariales et prélèvement à la source : deux logiques différentes",
          headers: ["Élément", "Cotisations salariales", "Prélèvement à la source"],
          rows: [
            [
              "Objectif",
              "Financer la protection sociale",
              "Prélever l'impôt sur le revenu",
            ],
            [
              "Destination",
              "Sécurité sociale, retraite, mutuelle, etc.",
              "Trésor public (impôt sur le revenu)",
            ],
            [
              "Organisme concerné",
              "Urssaf, caisses de retraite, mutuelles",
              "Administration fiscale",
            ],
            [
              "Moment du prélèvement",
              "Sur le salaire brut",
              "Sur le net imposable, après cotisations",
            ],
            [
              "Effet sur le salaire net avant impôt",
              "Oui, réduit le brut jusqu'au net avant impôt",
              "Non, intervient après le net avant impôt",
            ],
            [
              "Effet sur le salaire net versé",
              "Indirect (via le net avant impôt)",
              "Oui, réduit directement le montant versé",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le prélèvement à la source n'explique pas l'écart principal entre le salaire brut et le salaire net avant impôt. Cet écart provient d'abord des cotisations salariales.",
            "Le prélèvement à la source explique ensuite l'écart entre net avant impôt et salaire net versé.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail du rôle des cotisations salariales, consultez le guide",
          label: "Cotisations salariales : pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
          href: COTISATIONS_HREF,
        },
      ],
    },
    {
      id: "prelevement-modifie-salaire",
      title: "Le prélèvement à la source modifie-t-il votre salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prélèvement à la source n'a pas le même effet selon le niveau de salaire considéré. Bien distinguer ce qu'il modifie et ce qu'il ne modifie pas clarifie la lecture du bulletin.",
        },
        {
          type: "paragraph",
          text: "Le prélèvement à la source ne modifie pas le salaire brut convenu au contrat. Il ne modifie pas non plus le salaire net avant impôt, obtenu après les cotisations salariales.",
        },
        {
          type: "paragraph",
          text: "En revanche, il modifie le salaire net versé : c'est le montant réellement crédité sur votre compte après retenue de l'impôt. C'est pourquoi votre salaire net versé est inférieur au net avant impôt lorsque le prélèvement à la source s'applique.",
        },
        {
          type: "table",
          caption: "Impact du prélèvement à la source selon le montant considéré",
          headers: ["Montant", "Modifié par le PAS ?", "Explication"],
          rows: [
            [
              "Salaire brut",
              "Non",
              "Rémunération au contrat, avant toute retenue",
            ],
            [
              "Salaire net avant impôt",
              "Non",
              "Résultat des cotisations salariales sur le brut",
            ],
            [
              "Net imposable",
              "Base de calcul",
              "Le PAS est calculé sur cette base fiscale",
            ],
            [
              "Salaire net versé",
              "Oui",
              "Net avant impôt diminué du prélèvement à la source",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Attention : comparer une offre d'emploi en salaire net avant impôt avec ce que vous percevez réellement peut induire en erreur. Seul le salaire net versé correspond à votre budget mensuel.",
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
          text: "Autour du prélèvement à la source, quelques idées reçues reviennent souvent. Les identifier aide à lire sereinement la partie fiscale de votre fiche de paie.",
        },
        {
          type: "mistakes",
          title: "Erreurs à éviter",
          items: [
            "Croire que le prélèvement à la source est une cotisation sociale.",
            "Penser que le taux est fixé par l'employeur.",
            "Croire que deux salariés au même brut doivent avoir le même taux de prélèvement.",
            "Penser que le prélèvement à la source explique toute la différence entre brut et net.",
            "Confondre salaire net avant impôt et salaire net versé.",
            "Oublier de mettre à jour son taux après un changement de situation familiale.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : pour analyser une fiche de paie, traitez d'abord les cotisations (effet sur le brut), puis le prélèvement à la source (effet sur le net versé). Deux retenues, deux logiques.",
          ],
        },
      ],
    },
    {
      id: "exemple-concret",
      title: "Exemple concret : prélèvement à la source sur un salaire de 2 500 € brut",
      blocks: [
        {
          type: "paragraph",
          text: "Voici une illustration simple pour visualiser le parcours complet : salarié non-cadre à temps plein, brut mensuel de 2 500 €. Les montants de cotisations et de net avant impôt sont indicatifs ; le prélèvement à la source dépend de votre taux personnel.",
        },
        {
          type: "illustration",
          id: "prelevement-source-parcours",
          caption:
            "Schéma simplifié : les cotisations salariales précèdent le prélèvement à la source, qui produit le salaire net versé.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Salaire brut",
              description: `Rémunération mensuelle de ${exBrut}, montant convenu au contrat avant toute retenue.`,
            },
            {
              title: "2. Cotisations salariales",
              description: `Retenues sociales d'environ ${exCotisations}, prélevées sur le brut pour financer la protection sociale.`,
            },
            {
              title: "3. Salaire net avant impôt",
              description: `Environ ${exNet} après cotisations. Le prélèvement à la source n'intervient pas encore à ce stade.`,
            },
            {
              title: "4. Prélèvement à la source",
              description:
                "Impôt retenu sur le net imposable, selon le taux transmis par l'administration fiscale. Le montant varie selon votre situation.",
            },
            {
              title: "5. Salaire net versé",
              description:
                "Salaire net avant impôt diminué du prélèvement à la source. C'est le montant crédité sur votre compte bancaire.",
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
            "Prélèvement à la source : selon votre taux personnel, appliqué sur le net imposable",
            "Salaire net versé : net avant impôt moins le prélèvement à la source",
          ],
        },
        {
          type: "paragraph",
          text: "Cet exemple montre que le prélèvement à la source intervient en dernier dans la chaîne de calcul. Il n'explique pas l'écart entre brut et net avant impôt, mais bien la différence entre net avant impôt et salaire net versé.",
        },
        {
          type: "paragraph",
          text: "Le montant retenu dépend du taux propre à chaque foyer fiscal. Deux salariés ayant le même salaire brut ou le même salaire net avant impôt peuvent donc recevoir un salaire net versé différent.",
        },
        {
          type: "contextual-cta",
          text: "Vous souhaitez estimer l'effet du prélèvement à la source sur votre propre salaire ?",
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
  faqTitle: "Questions fréquentes sur le prélèvement à la source",
  faqIntro:
    "Vous savez désormais ce qu'est le prélèvement à la source, comment il fonctionne sur le salaire et en quoi il diffère des cotisations salariales. Voici les questions les plus fréquemment posées.",
  faq: [
    {
      question: "Qu'est-ce que le prélèvement à la source ?",
      answer:
        "C'est le prélèvement de l'impôt sur le revenu directement sur les revenus au moment de leur versement. Sur une fiche de paie, l'employeur retient l'impôt sur le net imposable avant de verser le salaire net.",
    },
    {
      question: "Qui fixe le taux de prélèvement à la source ?",
      answer:
        "L'administration fiscale calcule le taux à partir de votre déclaration de revenus et le transmet à votre employeur. L'employeur l'applique sur le bulletin, sans le déterminer lui-même.",
    },
    {
      question: "Pourquoi mon taux de prélèvement change-t-il ?",
      answer:
        "Le taux évolue avec votre situation fiscale : revenus du foyer, changements familiaux, déclaration annuelle. Une actualisation sur impots.gouv.fr peut modifier le taux transmis à l'employeur.",
    },
    {
      question: "Peut-on modifier son taux de prélèvement à la source ?",
      answer:
        "Oui, via votre espace personnel sur impots.gouv.fr, si votre situation a changé. L'administration fiscale traite la demande et transmet le nouveau taux à l'employeur, qui l'applique ensuite sur le bulletin.",
    },
    {
      question: "Que faire si le taux affiché semble incorrect ?",
      answer:
        "Comparez-le à celui de votre espace fiscal personnel et vérifiez que vos changements de situation ont été pris en compte. L'employeur applique le taux reçu : en cas d'écart persistant, contactez l'administration fiscale.",
    },
    {
      question: "Le prélèvement à la source est-il une cotisation ?",
      answer:
        "Non. Les cotisations salariales financent la protection sociale et sont prélevées sur le brut. Le prélèvement à la source relève de l'impôt sur le revenu et intervient sur le net imposable.",
    },
    {
      question: "Où apparaît le prélèvement à la source sur la fiche de paie ?",
      answer:
        "Dans la partie fiscale du bulletin, après les cotisations. Vous y trouvez le net imposable, le taux appliqué et le montant retenu, avant le salaire net versé.",
    },
    {
      question: "Pourquoi mon collègue a-t-il un taux de prélèvement différent ?",
      answer:
        "Le taux dépend de la situation fiscale personnelle, pas uniquement du salaire affiché. Revenus du conjoint, parts fiscales et options retenues expliquent les différences entre salariés.",
    },
    {
      question: "Pourquoi mon salaire net versé est-il inférieur au net avant impôt ?",
      answer:
        "Parce que le prélèvement à la source est retenu entre les deux. Le net avant impôt est calculé après les cotisations ; le net versé est ce qui reste après l'impôt.",
    },
    {
      question: "Le prélèvement à la source modifie-t-il le salaire brut ?",
      answer:
        "Non. Il n'affecte ni le salaire brut ni le salaire net avant impôt. Il réduit uniquement le montant final versé sur votre compte bancaire. C'est pourquoi deux salariés ayant exactement le même salaire brut peuvent percevoir un salaire net versé différent si leur situation fiscale n'est pas identique.",
    },
  ],
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le prélèvement à la source est l'impôt sur le revenu prélevé directement sur le salaire.",
      "Il intervient après les cotisations salariales, sur le net imposable.",
      "L'administration fiscale fixe le taux ; l'employeur l'applique sur la fiche de paie.",
      "Il ne modifie pas le salaire brut ni le net avant impôt, seulement le salaire net versé.",
      "Il ne faut pas le confondre avec les cotisations salariales, qui financent la protection sociale.",
    ],
    closingText:
      "Vous comprenez maintenant ce qu'est le prélèvement à la source, pourquoi il apparaît sur votre fiche de paie et en quoi il diffère des cotisations salariales. Pour lire un bulletin dans l'ordre : salaire brut, cotisations salariales, salaire net avant impôt, net imposable, prélèvement à la source, salaire net versé. Le calculateur Brut vers Net fournit une estimation indicative ; renseigner votre taux personnel permet de vous rapprocher du montant réellement versé.",
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
