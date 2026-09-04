import type { Guide } from "../types";

const BRUT_NET_EXPLIQUE_HREF = "/guides/comment-est-calcule-le-salaire-net";
const CALCULER_SALAIRE_NET_HREF = "/guides/comment-calculer-son-salaire-net";
const LIRE_FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const AUGMENTATION_HREF = "/calculateurs/augmentation-salaire";
const NET_VERS_BRUT_HUB = "/salaire-net-mensuel-en-brut";
const BRUT_VERS_NET_HUB = "/salaire-brut-mensuel-en-net";

const META_DESCRIPTION =
  "Votre salaire net a baissé ou augmenté en septembre 2026 ? Taux de prélèvement à la source, fiche de paie : découvrez les causes et quoi vérifier.";

/** Guide : variation du salaire net / montant versé en septembre 2026 (PAS + diagnostic fiche de paie). */
export const pourquoiSalaireNetChangeSeptembre2026Guide: Guide = {
  slug: "pourquoi-salaire-net-change-septembre-2026",
  publicPath: "/pourquoi-salaire-net-change-septembre-2026",
  title: "Pourquoi mon salaire net a changé en septembre 2026 ?",
  seoTitle: "Pourquoi mon salaire net a baissé ou augmenté en septembre 2026 ?",
  description: META_DESCRIPTION,
  subtitle:
    "Baisse ou hausse du montant versé : comment lire votre fiche de paie et vérifier le taux de prélèvement à la source.",
  publishedAt: "2026-09-04",
  updatedAt: "2026-09-04",
  introduction: [
    "En septembre 2026, le montant net effectivement versé peut changer même lorsque le salaire brut reste identique. L'une des premières causes à vérifier est l'actualisation du taux de prélèvement à la source après la déclaration de revenus 2025. Si le taux augmente, le montant versé peut diminuer ; s'il baisse, le montant versé peut augmenter. D'autres éléments de la fiche de paie peuvent néanmoins expliquer l'écart.",
    "Dans ce guide, « salaire net » désigne surtout le montant crédité sur votre compte, sauf lorsqu'une autre notion (net avant impôt, net imposable, montant net social) est nommée explicitement.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Brut identique mais montant versé différent en septembre 2026 : vérifiez en priorité le taux de prélèvement à la source.",
      "Taux plus élevé : montant reçu potentiellement plus faible. Taux plus faible : montant potentiellement plus élevé.",
      "Si le taux est inchangé, comparez heures, primes, absences, cotisations et retenues entre août et septembre.",
    ],
  },
  quickSummary: {
    title: "Du salaire brut au montant versé",
    variant: "reading-order",
    items: [
      { kind: "level", rate: "1", title: "Salaire brut", description: "Rémunération du mois" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "2", title: "Cotisations", description: "Retenues sociales" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "3", title: "Net avant impôt", description: "Après cotisations" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "4", title: "Prélèvement à la source", description: "Impôt retenu" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "5", title: "Montant versé", description: "Crédit sur le compte" },
    ],
    synthesis: [
      "Le prélèvement à la source intervient après le calcul du net avant impôt.",
      "C'est pourquoi un brut inchangé peut cohabiter avec un montant versé différent.",
    ],
  },
  sections: [
    {
      id: "tableau-taux-consequence",
      title: "En un coup d'œil : taux et montant versé",
      blocks: [
        {
          type: "table",
          caption: "Lecture rapide : effet possible d'un changement de taux (brut inchangé)",
          headers: ["Si votre taux de prélèvement…", "Conséquence possible"],
          rows: [
            ["Augmente", "Votre montant versé peut baisser"],
            ["Diminue", "Votre montant versé peut augmenter"],
            ["Ne change pas", "Cherchez une autre différence sur la fiche de paie"],
            ["Votre brut change", "La variation ne vient pas nécessairement du prélèvement à la source"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Tendance, pas règle absolue : primes, absences, mutuelle ou régularisations peuvent aussi expliquer l'écart.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-salaire-net-peut-changer-septembre-2026",
      title: "Pourquoi mon salaire net peut-il changer en septembre 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "En septembre 2026, le montant crédité peut évoluer sans changement de contrat. La piste la plus fréquente est l'actualisation annuelle du taux de prélèvement à la source.",
        },
        {
          type: "paragraph",
          text: "Au printemps 2026, vous déclarez vos revenus de 2025. L'administration fiscale recalcule ensuite un taux adapté. Selon Service-Public, ce taux s'applique à partir du 1er septembre 2026.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Déclaration de revenus",
              description:
                "Au printemps 2026, déclaration des revenus 2025 auprès de l'administration fiscale.",
            },
            {
              title: "Calcul du nouveau taux",
              description:
                "Les services fiscaux actualisent le taux à partir de cette déclaration.",
            },
            {
              title: "Transmission à l'employeur",
              description:
                "Le taux est communiqué à l'employeur (ou à la caisse de retraite) pour application sur la paie.",
            },
            {
              title: "Effet sur le montant versé",
              description:
                "Taux en hausse : prélèvement plus élevé, montant versé potentiellement plus bas. Taux en baisse : l'inverse.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Le brut et le net avant impôt peuvent rester identiques : seule la retenue d'impôt change, et le montant réellement versé suit.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le fonctionnement général du dispositif, voir aussi",
          label: "Prélèvement à la source : qu'est-ce que c'est et comment ça fonctionne ?",
          href: PAS_HREF,
        },
      ],
    },
    {
      id: "pourquoi-taux-change-septembre",
      title: "Pourquoi le taux de prélèvement à la source change-t-il en septembre ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le taux n'est pas figé toute l'année. Service-Public indique qu'il est modifié chaque année en septembre, après la déclaration de revenus du printemps.",
        },
        {
          type: "paragraph",
          text: "En 2026, le taux de janvier à août reposait encore sur l'ancienne base. À partir du 1er septembre 2026, le taux calculé sur les revenus 2025 prend le relais.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Printemps 2026",
              description: "Déclaration des revenus 2025.",
            },
            {
              title: "Été 2026",
              description: "Calcul et actualisation du taux par l'administration fiscale.",
            },
            {
              title: "Nouveau taux",
              description: "Le taux actualisé est prêt à être appliqué.",
            },
            {
              title: "Transmission",
              description: "Le collecteur (employeur, caisse…) reçoit le taux à appliquer.",
            },
            {
              title: "Application",
              description:
                "À compter du 1er septembre 2026, ce taux s'applique au prélèvement. Vérifiez-le aussi dans votre espace fiscal si le bulletin vous surprend.",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "La date officielle d'application est le 1er septembre 2026. Si le taux du bulletin diffère de celui affiché sur impots.gouv.fr, comparez les deux et interrogez votre service paie ou l'administration fiscale.",
          ],
        },
        {
          type: "paragraph",
          text: "Le taux peut monter ou baisser selon les revenus 2025 et la situation du foyer. Couples mariés ou pacsés : un taux individualisé s'applique en principe automatiquement sur les revenus personnels de chacun.",
        },
      ],
    },
    {
      id: "pourquoi-salaire-net-baisse-septembre-2026",
      title: "Pourquoi mon salaire net a baissé en septembre 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si le montant versé en septembre est plus bas qu'en août avec un brut stable, commencez par vérifier une hausse du taux de prélèvement à la source : plus d'impôt retenu sur le net imposable, donc un crédit plus faible.",
        },
        {
          type: "list",
          items: [
            "Comparez le taux de prélèvement entre août et septembre.",
            "Comparez le montant prélevé, pas seulement le pourcentage.",
            "Vérifiez que le net à payer avant impôt est identique.",
            "Si le taux n'a pas changé, cherchez ailleurs (heures, prime, absence, cotisation…).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Toute baisse du montant versé ne vient pas de l'impôt. Une absence, une prime en moins ou une retenue exceptionnelle peuvent produire le même effet avec un taux inchangé.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-salaire-net-augmente-septembre-2026",
      title: "Pourquoi mon salaire net a augmenté en septembre 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Si le montant versé en septembre est plus élevé qu'en août avec un brut stable, la piste symétrique est une baisse du taux : moins d'impôt retenu, crédit plus élevé sans hausse de rémunération brute.",
        },
        {
          type: "paragraph",
          text: "Cela peut refléter une imposition plus faible sur la base des revenus 2025, un changement de foyer déjà pris en compte, ou une option (taux individualisé) au sein du couple. Distinguez aussi une vraie hausse du net avant impôt (primes, heures) d'une hausse liée uniquement à moins d'impôt prélevé.",
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour mesurer l'effet d'une hausse de rémunération sur votre net,",
          label: "utilisez le calculateur d'augmentation de salaire",
          href: AUGMENTATION_HREF,
        },
      ],
    },
    {
      id: "exemple-chiffre-avant-apres",
      title: "Exemple chiffré : baisse et hausse du montant versé",
      blocks: [
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple simplifié à titre pédagogique. Les montants sont hypothétiques. Le net imposable n'est pas toujours égal au net à payer avant impôt.",
          ],
        },
        {
          type: "paragraph",
          text: "Net imposable de 2 500 €, inchangé. Scénario A : taux 4 % → 6 %, prélèvement 100 € → 150 €, montant versé en baisse de 50 €. Scénario B : taux 6 % → 4 %, prélèvement 150 € → 100 €, montant versé en hausse de 50 €.",
        },
        {
          type: "table",
          caption: "Comparaison pédagogique août / septembre (brut inchangé, taux en hausse)",
          headers: ["Élément", "Août 2026", "Septembre 2026"],
          rows: [
            ["Salaire brut", "3 200 €", "3 200 €"],
            ["Net avant impôt", "2 480 €", "2 480 €"],
            ["Net imposable", "2 500 €", "2 500 €"],
            ["Taux de prélèvement", "4 %", "6 %"],
            ["Montant prélevé", "100 €", "150 €"],
            ["Montant versé", "2 380 €", "2 330 €"],
          ],
        },
        {
          type: "contextual-cta",
          text: "Votre salaire brut est resté identique ? Estimez votre salaire net pour vérifier l'ordre de grandeur.",
          label: "Calculer mon salaire brut en net",
          href: "/",
        },
      ],
    },
    {
      id: "comment-savoir-pourquoi-salaire-change",
      title: "Comment savoir pourquoi mon salaire a changé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Prenez les bulletins d'août et de septembre 2026. Cette checklist est exhaustive ; le diagnostic qui suit sert de raccourci.",
        },
        {
          type: "checklist",
          title: "Checklist de comparaison août / septembre",
          items: [
            "Salaire brut : identique ou différent ?",
            "Heures travaillées / heures supplémentaires : y a-t-il un écart ?",
            "Absences ou congés ayant un effet sur la rémunération ?",
            "Primes, commissions ou part variable ?",
            "Cotisations, mutuelle, prévoyance : total ou lignes modifiées ?",
            "Net à payer avant impôt : stable ou non ?",
            "Net imposable : même base fiscale ?",
            "Taux de prélèvement à la source : a-t-il changé ?",
            "Montant du prélèvement : plus élevé ou plus bas ?",
            "Montant effectivement versé : confirme-t-il l'écart ?",
            "Retenues, avantages ou régularisations en bas de bulletin ?",
          ],
        },
      ],
    },
    {
      id: "arbre-diagnostic",
      title: "Petit diagnostic : où chercher en premier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Votre salaire a changé ? Faites ce test en 30 secondes. Il oriente la lecture des deux bulletins ; ce n'est pas une analyse de paie personnalisée.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Mon salaire brut a-t-il changé ?",
              description:
                "Oui → rémunération, heures, primes, absences. Non → étape suivante.",
            },
            {
              title: "2. Mon net avant impôt a-t-il changé ?",
              description:
                "Oui → cotisations et éléments de paie. Non → étape suivante.",
            },
            {
              title: "3. Mon taux de prélèvement a-t-il changé ?",
              description:
                "Oui → le PAS explique probablement l'écart du montant versé. Non → autres retenues ou régularisations.",
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Notez côte à côte : net avant impôt, montant du prélèvement, montant versé. Si seuls les deux derniers bougent, vous tenez presque toujours la réponse.",
          ],
        },
      ],
    },
    {
      id: "ou-trouver-taux-fiche-paie",
      title: "Où trouver le taux de prélèvement sur ma fiche de paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "La disposition varie selon les logiciels. En pratique, le taux figure dans la zone fiscale, après les cotisations : net imposable, taux (souvent en %), montant prélevé, puis montant versé. Libellés possibles : « prélèvement à la source », « PAS », « IR », « taux personnalisé ».",
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Si le taux n'apparaît pas clairement, divisez le montant d'impôt retenu par le net imposable. Vérifiez aussi le taux dans votre espace personnel sur impots.gouv.fr.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour repérer chaque zone du bulletin étape par étape, consultez",
          label: "Comment lire une fiche de paie ?",
          href: LIRE_FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "brut-identique-net-different",
      title: "Mon brut n'a pas changé mais mon net est différent : est-ce normal ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, c'est fréquent. Le brut mesure la rémunération avant cotisations ; le montant versé dépend ensuite des cotisations puis de l'impôt prélevé à la source. Un brut identique peut donc coexister avec un montant versé différent dès que le taux (ou une autre retenue) change.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Brut, net avant impôt, impôt prélevé et montant versé sont quatre niveaux distincts. Comparer uniquement le virement sans ouvrir le bulletin mène souvent à une mauvaise conclusion.",
          ],
        },
      ],
    },
    {
      id: "autres-raisons-variation-salaire-net",
      title: "Quelles autres raisons peuvent faire varier mon salaire net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prélèvement à la source n'explique pas tout. Autres causes courantes : heures et heures supplémentaires, primes, commissions, part variable ; absences ou congés non rémunérés ; cotisations, mutuelle, prévoyance ; avantages, retenues, régularisations ; et, côté fiscalité, le changement de taux.",
        },
        {
          type: "table",
          caption: "Baisse ou hausse : où chercher ?",
          headers: ["Ce qui a changé", "Effet possible", "Où regarder"],
          rows: [
            ["Taux PAS en hausse", "Montant versé potentiellement plus faible", "Zone fiscale du bulletin"],
            ["Taux PAS en baisse", "Montant versé potentiellement plus élevé", "Zone fiscale du bulletin"],
            ["Prime différente", "Brut et nets en hausse ou en baisse", "Lignes de rémunération"],
            ["Nombre d'heures différent", "Variation du brut puis du net", "Heures / variables"],
            ["Absence", "Rémunération du mois réduite", "Absences / retenues"],
            ["Cotisation différente", "Net avant impôt modifié", "Bloc cotisations"],
            ["Avantage / retenue", "Montant versé modifié", "Bas de bulletin"],
            ["Régularisation", "Écart ponctuel, parfois important", "Lignes exceptionnelles"],
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre l'écart brut / net lié aux cotisations,",
          label: "Cotisations salariales : pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
          href: COTISATIONS_HREF,
        },
      ],
    },
    {
      id: "net-a-payer-net-imposable-net-social",
      title: "Net à payer, net imposable et net social : quelles différences ?",
      blocks: [
        {
          type: "paragraph",
          text: "Plusieurs « nets » cohabitent sur le bulletin. Un seul correspond en principe au virement.",
        },
        {
          type: "table",
          caption: "Repères pour lire les différents nets",
          headers: ["Indicateur", "À quoi sert-il ?", "Est-ce le montant reçu sur mon compte ?"],
          rows: [
            [
              "Net à payer avant impôt",
              "Montant après cotisations, avant prélèvement à la source",
              "Non (sauf cas sans PAS)",
            ],
            [
              "Net imposable",
              "Base fiscale sur laquelle s'applique le taux de prélèvement",
              "Non",
            ],
            [
              "Montant net social",
              "Indicateur social affiché sur le bulletin (droits, aides, comparaisons)",
              "Non",
            ],
            [
              "Montant effectivement versé",
              "Somme créditée après impôt et autres retenues finales",
              "Oui, en principe",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le net imposable sert au calcul de l'impôt ; le montant versé est ce qui arrive sur votre compte.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour revoir le parcours complet du brut au net,",
          label: "Calcul du salaire net : comprendre la différence entre le salaire brut et le salaire net",
          href: BRUT_NET_EXPLIQUE_HREF,
        },
      ],
    },
    {
      id: "que-faire-si-taux-change",
      title: "Que faire si mon taux de prélèvement a changé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Comparez le taux du bulletin à celui de votre espace fiscal sur impots.gouv.fr. S'ils concordent et que votre situation n'a pas changé, aucune action n'est nécessaire : le collecteur applique le taux transmis.",
        },
        {
          type: "paragraph",
          text: "En cas de changement de revenus ou de situation familiale en cours d'année, vous pouvez demander une actualisation ou une modulation via l'espace Finances publiques, selon les règles en vigueur. Service-Public indique qu'un nouveau taux accepté s'applique au plus tard le 3e mois suivant la demande.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne diminuez pas artificiellement votre taux. Une modulation à la baisse n'est possible que sous conditions, notamment lorsque l'écart entre le prélèvement estimé et celui qui serait dû sans modulation dépasse 5 %.",
            "Les revenus et la situation renseignés pour demander une modulation sont déclarés sous votre responsabilité. Une modulation à la baisse excessive ou fondée sur une estimation erronée peut entraîner des pénalités. Un taux trop bas peut aussi conduire à un complément d'impôt plus tard.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Service officiel pour consulter et gérer votre taux :",
          label: "impots.gouv.fr (espace Finances publiques)",
          href: "https://www.impots.gouv.fr",
        },
      ],
    },
    {
      id: "employeur-decide-taux",
      title: "Est-ce mon employeur qui décide de mon taux ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non. L'administration fiscale détermine le taux et le transmet à l'employeur (ou à la caisse), qui l'applique sur la paie sans le fixer lui-même.",
        },
        {
          type: "paragraph",
          text: "Sans taux personnalisé, un taux par défaut (neutre) peut s'appliquer. Vous pouvez aussi refuser la transmission de votre taux personnalisé : l'employeur applique alors le taux neutre, souvent plus élevé.",
        },
      ],
    },
    {
      id: "employeur-connait-situation-fiscale",
      title: "Mon employeur connaît-il ma situation fiscale ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il reçoit un taux à appliquer, pas l'ensemble de votre dossier fiscal. Connaître un pourcentage n'équivaut pas à connaître tous vos revenus ou le détail de votre imposition.",
        },
        {
          type: "paragraph",
          text: "En optant pour le taux neutre, l'employeur n'applique pas votre taux personnalisé. Vérifiez les conséquences sur le montant prélevé dans votre espace fiscal avant de choisir cette option.",
        },
      ],
    },
    {
      id: "eviter-surprise-prochain-salaire",
      title: "Comment éviter une surprise sur mon prochain salaire ?",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Consultez votre taux dans votre espace fiscal.",
            "Comparez le taux du bulletin à celui affiché en ligne.",
            "Surveillez le net avant impôt, pas seulement le virement.",
            "Anticipez primes, heures et absences.",
            "Comparez deux bulletins dès qu'un écart apparaît.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Besoin de partir du net pour retrouver un brut approximatif ?",
          label: "Série salaire net mensuel en brut",
          href: NET_VERS_BRUT_HUB,
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Ou consultez les montants déjà calculés du",
          label: "salaire brut mensuel en net",
          href: BRUT_VERS_NET_HUB,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour une méthode de calcul pas à pas,",
          label: "Comment calculer son salaire net ?",
          href: CALCULER_SALAIRE_NET_HREF,
        },
      ],
    },
    {
      id: "sources-officielles",
      title: "Sources officielles",
      blocks: [
        {
          type: "paragraph",
          text: "Sources officielles vérifiées le 4 septembre 2026. Les informations de ce guide s'appuient sur les pages suivantes :",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Calendrier et application du taux au 1er septembre 2026 :",
          label: "Service-Public – Quand doit-on payer ses impôts ? (F33890)",
          href: "https://www.service-public.fr/particuliers/vosdroits/F33890",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fonctionnement du prélèvement à la source, taux et rôles :",
          label: "Service-Public – Impôt sur le revenu : prélèvement à la source (F34009)",
          href: "https://www.service-public.fr/particuliers/vosdroits/F34009",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Modification, modulation et taux neutre :",
          label: "Service-Public – Comment changer votre taux de prélèvement à la source ? (F35894)",
          href: "https://www.service-public.fr/particuliers/vosdroits/F35894",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Conditions de la modulation à la baisse (écart de plus de 5 %) :",
          label: "BOFiP – BOI-IR-PAS-20-30-20-10",
          href: "https://bofip.impots.gouv.fr/bofip/11263-PGP.html/identifiant=BOI-IR-PAS-20-30-20-10-20250507",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Mise en œuvre de la modulation et responsabilité déclarative :",
          label: "BOFiP – BOI-IR-PAS-20-30-20-20",
          href: "https://bofip.impots.gouv.fr/bofip/11355-PGP.html/identifiant=BOI-IR-PAS-20-30-20-20-20250507",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Espace personnel pour consulter et gérer votre taux :",
          label: "impots.gouv.fr",
          href: "https://www.impots.gouv.fr",
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes aux questions les plus posées lorsqu'un salaire de septembre ne correspond pas à celui d'août.",
  faq: [
    {
      question: "Pourquoi mon salaire net a-t-il changé en septembre 2026 ?",
      answer:
        "Souvent parce que le taux de prélèvement a été actualisé après la déclaration des revenus 2025, avec application à partir du 1er septembre 2026. D'autres lignes du bulletin peuvent aussi expliquer l'écart.",
    },
    {
      question: "Pourquoi mon salaire net a-t-il baissé en septembre 2026 ?",
      answer:
        "Avec un brut stable, un taux plus élevé peut augmenter l'impôt retenu et diminuer le montant versé. Vérifiez aussi primes, heures, absences et cotisations.",
    },
    {
      question: "Pourquoi mon salaire net a-t-il augmenté en septembre 2026 ?",
      answer:
        "Un taux plus bas peut réduire l'impôt retenu et augmenter le montant versé. Une hausse du net avant impôt (primes, heures) est une autre explication possible.",
    },
    {
      question: "Pourquoi mon taux de prélèvement à la source a-t-il changé ?",
      answer:
        "Il est recalculé chaque année après la déclaration de printemps. En 2026, le taux fondé sur les revenus 2025 s'applique à partir du 1er septembre. Une modulation en cours d'année peut aussi le modifier.",
    },
    {
      question: "Mon employeur peut-il modifier mon taux de prélèvement ?",
      answer:
        "Non. L'administration fiscale fixe le taux et le transmet à l'employeur, qui l'applique sans le déterminer lui-même.",
    },
    {
      question: "Pourquoi mon salaire brut est-il identique mais mon net différent ?",
      answer:
        "Parce que le montant versé dépend aussi des cotisations et du prélèvement à la source. Un brut inchangé peut cohabiter avec un montant versé différent.",
    },
    {
      question: "Où trouver mon taux de prélèvement sur ma fiche de paie ?",
      answer:
        "Dans la zone fiscale, près du net imposable et du montant prélevé. Vous pouvez aussi le retrouver sur impots.gouv.fr.",
    },
    {
      question: "Puis-je modifier mon taux de prélèvement à la source ?",
      answer:
        "Oui, via l'espace Finances publiques sur impots.gouv.fr, sous conditions. La modulation à la baisse exige notamment un écart de prélèvement estimé supérieur à 5 %. Le nouveau taux s'applique au plus tard le 3e mois suivant la demande.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Une variation du montant versé ne signifie pas forcément une variation du brut.",
      "En septembre, le taux de prélèvement à la source est l'une des premières choses à vérifier.",
      "Taux en hausse : montant versé potentiellement plus faible.",
      "Taux en baisse : montant versé potentiellement plus élevé.",
      "Comparez les bulletins d'août et de septembre ligne par ligne.",
      "Si le taux est identique, examinez les autres éléments de rémunération et de retenue.",
    ],
    closingText:
      "Vous disposez maintenant d'une méthode simple pour comprendre une baisse ou une hausse du montant versé en septembre 2026. Pour estimer l'ordre de grandeur de votre salaire net à partir du brut, utilisez le calculateur ci-dessous.",
    closingCta: {
      label: "Estimer mon salaire net",
      href: "/",
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur Brut vers Net",
      description: "Estimez votre salaire net à partir de votre salaire brut.",
      href: "/",
    },
    relatedGuides: [
      {
        title: "Prélèvement à la source : fonctionnement",
        href: PAS_HREF,
      },
      {
        title: "Comment lire une fiche de paie ?",
        href: LIRE_FICHE_PAIE_HREF,
      },
      {
        title: "Brut et net expliqués",
        href: BRUT_NET_EXPLIQUE_HREF,
      },
    ],
    discover: [
      {
        title: "Calculateur d'augmentation de salaire",
        href: AUGMENTATION_HREF,
      },
      {
        title: "Salaire net mensuel en brut",
        href: NET_VERS_BRUT_HUB,
      },
    ],
  },
};
