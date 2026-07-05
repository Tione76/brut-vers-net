import type { Guide } from "./types";

export const guideTvaAutoEntrepreneur: Guide = {
  slug: "tva-et-auto-entrepreneur",
  title: "TVA et auto-entrepreneur : tout comprendre",
  description:
    "Guide complet sur la TVA pour l'auto-entrepreneur : franchise en base (art. 293 B), seuils de CA, assujettissement, facturation, option volontaire (art. 293 C) et erreurs à éviter.",
  subtitle:
    "Franchise en base, seuils de chiffre d'affaires, facturation, option pour la TVA et passage au régime réel : toutes les règles applicables à l'auto-entrepreneur.",
  updatedAt: "2026-07-04",
  publishedAt: "2026-07-04",
  keywords: [
    "TVA auto-entrepreneur",
    "franchise en base TVA",
    "art 293 B CGI",
    "art 293 C CGI",
    "seuils TVA micro-entreprise",
    "facture auto-entrepreneur",
    "assujetti TVA",
    "option TVA",
    "micro-entreprise TVA",
  ],

  introduction: [
    "Par défaut, l'auto-entrepreneur bénéficie de la franchise en base de TVA : il ne facture pas la taxe et ne la reverse pas à l'État.",
    "Ce guide détaille les seuils de chiffre d'affaires, les règles de facturation, le passage à l'assujettissement et l'option volontaire pour la TVA, avec des exemples chiffrés et les références au Code général des impôts.",
  ],

  sections: [
    {
      id: "en-resume",
      title: "En résumé",
      blocks: [
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "L'auto-entrepreneur est en franchise en base de TVA tant que son chiffre d'affaires reste sous les seuils de l'article 293 B du CGI. Il facture sans TVA, avec la mention obligatoire « TVA non applicable, art. 293 B du CGI ». Au-delà des plafonds, il devient assujetti et doit collecter la TVA. Il peut aussi opter volontairement pour la TVA en vertu de l'article 293 C.",
          ],
        },
        {
          type: "list",
          items: [
            "Régime par défaut : franchise en base (art. 293 B du CGI) — pas de TVA sur les factures.",
            "Seuils TVA distincts des plafonds du régime micro-fiscal.",
            "Dépassement du seuil de base : assujettissement au 1er janvier de l'année suivante.",
            "Dépassement du seuil majoré : assujettissement au 1er du mois suivant.",
            "Option volontaire possible à tout moment (art. 293 C du CGI), valable au minimum deux ans.",
            "Mention art. 293 B obligatoire sur chaque facture en franchise.",
          ],
        },
      ],
    },

    {
      id: "franchise-en-base-tva",
      title: "Qu'est-ce que la franchise en base de TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "La franchise en base de TVA, prévue à l'article 293 B du Code général des impôts (CGI), exonère l'entreprise de la collecte et du reversement de la taxe. Pour l'auto-entrepreneur, c'est le régime applicable par défaut à la création de l'activité.",
        },
        {
          type: "paragraph",
          text: "Ce régime ne dispense pas de facturer : l'auto-entrepreneur émet des factures conformes, mais sans ligne de TVA. Le montant facturé correspond au prix réellement dû par le client.",
        },
        {
          type: "illustration",
          id: "ae-vat-status",
          caption:
            "Deux statuts TVA possibles : franchise en base (par défaut) ou assujettissement volontaire ou forcé.",
        },
        {
          type: "table",
          caption: "Franchise en base vs assujettissement à la TVA",
          headers: ["Critère", "Franchise en base (art. 293 B)", "Assujetti à la TVA"],
          rows: [
            ["TVA facturée aux clients", "Non", "Oui"],
            ["TVA déductible sur achats", "Non", "Oui"],
            ["Déclarations de TVA", "Aucune", "CA3 ou CA12"],
            ["N° de TVA intracommunautaire", "Non attribué", "Obligatoire (FR + clé)"],
            ["Mention sur facture", "« TVA non applicable, art. 293 B du CGI »", "Montants HT, taux et TVA"],
            ["Condition", "CA sous les seuils légaux", "Option ou dépassement des seuils"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "La franchise en base de TVA est indépendante du régime micro-fiscal (micro-BIC ou micro-BNC). Un auto-entrepreneur peut rester au régime micro pour l'impôt sur le revenu tout en étant assujetti à la TVA si ses seuils sont dépassés.",
          ],
        },
      ],
      subsections: [
        {
          id: "qui-beneficie-franchise",
          title: "Qui bénéficie automatiquement de la franchise ?",
          blocks: [
            {
              type: "paragraph",
              text: "Toute personne physique ou morale dont le chiffre d'affaires annuel hors taxes n'excède pas les seuils fixés par l'article 293 B du CGI. L'auto-entrepreneur, en tant que micro-entrepreneur, y entre par défaut dès l'immatriculation.",
            },
            {
              type: "list",
              items: [
                "Pas de démarche à effectuer : la franchise s'applique automatiquement.",
                "Pas de numéro de TVA intracommunautaire attribué.",
                "Pas de déclaration périodique de TVA à déposer.",
                "Obligation de surveillance du chiffre d'affaires pour anticiper le dépassement des seuils.",
              ],
            },
          ],
        },
        {
          id: "limites-franchise",
          title: "Quelles sont les limites de la franchise ?",
          blocks: [
            {
              type: "paragraph",
              text: "En franchise, la TVA payée sur vos achats professionnels (matériel, fournitures, abonnements) n'est pas déductible. Le coût TTC des dépenses reste entièrement à votre charge.",
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Pour un client professionnel assujetti à la TVA, travailler avec un fournisseur en franchise l'empêche de récupérer la taxe. C'est souvent un motif d'opter volontairement pour la TVA (art. 293 C).",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "seuils-franchise-tva",
      title: "Quels sont les seuils de franchise en base de TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les seuils de franchise en base de TVA sont fixés par la loi de finances et réévalués chaque année. Ils dépendent de la nature de l'activité exercée. Le chiffre d'affaires à retenir est le montant des recettes encaissées, hors taxes.",
        },
        {
          type: "illustration",
          id: "ae-franchise-limits",
          caption:
            "Les seuils TVA (art. 293 B) sont distincts des plafonds du régime micro-fiscal pour l'impôt sur le revenu.",
        },
        {
          type: "table",
          caption: "Seuils de franchise en base de TVA — art. 293 B du CGI (montants indicatifs)",
          headers: ["Type d'activité", "Seuil de base", "Seuil majoré", "Exemples"],
          rows: [
            [
              "Prestations de services",
              "37 500 €",
              "41 250 €",
              "Consulting, développement web, coaching, professions libérales",
            ],
            [
              "Ventes de marchandises, restauration, hébergement",
              "85 800 €",
              "94 300 €",
              "Commerce, artisanat, vente en ligne, restauration, location meublée",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Ces montants sont révisés annuellement par la loi de finances. Consultez impots.gouv.fr ou votre centre des finances publiques pour vérifier les seuils en vigueur l'année de votre exercice.",
          ],
        },
      ],
      subsections: [
        {
          id: "activites-mixtes-seuils",
          title: "Comment calculer les seuils en cas d'activités mixtes ?",
          blocks: [
            {
              type: "paragraph",
              text: "Si vous exercez à la fois une activité de vente et une activité de services, les deux catégories de recettes sont additionnées. C'est le seuil le plus bas (prestations de services) qui s'applique à l'ensemble du chiffre d'affaires.",
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Un auto-entrepreneur vend des créations artisanales (15 000 €) et donne des cours (20 000 €). CA total = 35 000 €. Il reste en franchise car le total est inférieur au seuil services de 37 500 €.",
              ],
            },
          ],
        },
        {
          id: "seuils-micro-fiscal",
          title: "Quelle différence avec les plafonds micro-fiscaux ?",
          blocks: [
            {
              type: "paragraph",
              text: "Le régime micro-fiscal (micro-BIC, micro-BNC) fixe des plafonds de chiffre d'affaires pour l'imposition simplifiée et les cotisations sociales. Ces plafonds sont plus élevés que les seuils de franchise TVA et relèvent d'un cadre juridique distinct.",
            },
            {
              type: "table",
              caption: "Deux régimes, deux plafonds distincts",
              headers: ["Régime", "Objet", "Base légale", "Exemple de plafond (services)"],
              rows: [
                [
                  "Franchise TVA",
                  "Exonération de TVA",
                  "Art. 293 B du CGI",
                  "37 500 € / 41 250 €",
                ],
                [
                  "Micro-fiscal",
                  "Imposition simplifiée et cotisations",
                  "Art. 50-0 et 102 ter du CGI",
                  "Environ 77 700 € (montant annuel révisé)",
                ],
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Piège fréquent : croire que le plafond micro-fiscal conditionne la franchise TVA. Un auto-entrepreneur peut dépasser les seuils TVA tout en restant au régime micro-fiscal, et inversement.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "quand-assujetti-tva",
      title: "Quand devient-on assujetti à la TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le passage à l'assujettissement à la TVA est automatique lorsque les seuils de l'article 293 B du CGI sont dépassés. La date d'effet dépend du seuil franchi.",
        },
        {
          type: "steps",
          items: [
            {
              title: "CA sous le seuil de base",
              description: "Vous restez en franchise. Aucune démarche.",
            },
            {
              title: "Dépassement du seuil de base",
              description:
                "Vous conservez la franchise pour l'année en cours. L'assujettissement prend effet au 1er janvier de l'année suivante.",
            },
            {
              title: "Dépassement du seuil majoré",
              description:
                "L'assujettissement est immédiat : au 1er jour du mois suivant celui du dépassement.",
            },
            {
              title: "Déclaration à l'administration",
              description:
                "Vous devez demander un numéro de TVA intracommunautaire et commencer les déclarations (CA3 ou CA12).",
            },
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Consultant en services : CA de 40 000 € en 2026. Le seuil de base (37 500 €) est dépassé, mais pas le seuil majoré (41 250 €). Il reste en franchise en 2026 et devient assujetti au 1er janvier 2027.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Même consultant : CA de 42 000 € en juin 2026. Le seuil majoré est dépassé. Il devient assujetti au 1er juillet 2026 et doit facturer la TVA sur les prestations à partir de cette date.",
          ],
        },
      ],
      subsections: [
        {
          id: "obligations-assujetti",
          title: "Quelles obligations une fois assujetti ?",
          blocks: [
            {
              type: "list",
              items: [
                "Facturer la TVA aux clients au taux applicable (20 %, 10 %, 5,5 % ou 2,1 %).",
                "Déduire la TVA sur les achats professionnels éligibles.",
                "Déposer des déclarations périodiques de TVA (CA3 mensuelle ou trimestrielle, ou CA12 annuelle).",
                "Reverser la TVA nette (collectée moins déductible) à l'administration fiscale.",
                "Afficher le numéro de TVA intracommunautaire sur les factures.",
              ],
            },
            {
              type: "callout",
              variant: "retain",
              paragraphs: [
                "L'assujettissement à la TVA s'impose à toutes vos activités, y compris celles qui étaient antérieurement en franchise. Vous ne pouvez pas rester en franchise sur une activité et assujetti sur une autre.",
              ],
            },
          ],
        },
        {
          id: "retour-franchise",
          title: "Peut-on revenir en franchise après un dépassement ?",
          blocks: [
            {
              type: "paragraph",
              text: "Oui, si votre chiffre d'affaires annuel redescend sous le seuil de base et que vous n'avez pas exercé d'option pour la TVA. Le retour en franchise prend effet au 1er janvier de l'année suivant celle du chiffre d'affaires inférieur au seuil.",
            },
            {
              type: "paragraph",
              text: "Si vous avez opté volontairement pour la TVA (art. 293 C), vous restez assujetti pendant la durée minimale de l'option, même si votre CA baisse.",
            },
          ],
        },
      ],
    },

    {
      id: "facturation-auto-entrepreneur",
      title: "Comment facturer en franchise ou en TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les règles de facturation diffèrent selon que vous êtes en franchise en base ou assujetti à la TVA. La mention d'exonération est obligatoire en franchise ; elle disparaît dès que vous collectez la taxe.",
        },
        {
          type: "illustration",
          id: "ae-invoice-comparison",
          caption:
            "À gauche : facture en franchise (1 500 €, mention art. 293 B). À droite : facture assujettie (1 500 € HT + 300 € de TVA = 1 800 € TTC).",
        },
        {
          type: "table",
          caption: "Mentions obligatoires selon le régime TVA",
          headers: ["Élément", "En franchise (art. 293 B)", "Assujetti à la TVA"],
          rows: [
            ["Mention TVA", "« TVA non applicable, art. 293 B du CGI »", "Taux et montant de TVA par ligne"],
            ["Montant facturé", "Prix net (pas de distinction HT/TTC)", "Montants HT, TVA et TTC"],
            ["N° TVA intracommunautaire", "Non requis", "Obligatoire (vendeur)"],
            ["Total", "Montant unique", "Total HT + TVA = TTC"],
            ["SIRET", "Obligatoire", "Obligatoire"],
          ],
        },
      ],
      subsections: [
        {
          id: "facture-franchise-exemple",
          title: "Quel exemple de facture en franchise ?",
          blocks: [
            {
              type: "table",
              caption: "Exemple — auto-entrepreneur en franchise, prestation de conseil",
              headers: ["Élément", "Valeur"],
              rows: [
                ["Émetteur", "Jean Dupont — SIRET 123 456 789 00012"],
                ["Client", "SARL Martin — 10 rue de la Paix, 75002 Paris"],
                ["Désignation", "Accompagnement stratégique — mission juin 2026"],
                ["Montant", "2 000,00 €"],
                ["TVA", "TVA non applicable, art. 293 B du CGI"],
                ["Total à payer", "2 000,00 €"],
                ["Échéance", "Paiement à 30 jours"],
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Ne jamais ajouter une ligne « TVA 20 % : 0 € » ni un total TTC distinct. Le montant facturé est le montant dû.",
              ],
            },
          ],
        },
        {
          id: "facture-assujetti-exemple",
          title: "Quel exemple de facture une fois assujetti ?",
          blocks: [
            {
              type: "table",
              caption: "Exemple — même prestation, auto-entrepreneur assujetti à la TVA",
              headers: ["Élément", "Valeur"],
              rows: [
                ["Émetteur", "Jean Dupont — SIRET 123 456 789 00012 — TVA FR 12 345678901"],
                ["Désignation", "Accompagnement stratégique — mission juin 2026"],
                ["Montant HT", "2 000,00 €"],
                ["TVA 20 %", "400,00 €"],
                ["Total TTC", "2 400,00 €"],
              ],
            },
            {
              type: "internal-link",
              variant: "calculator",
              intro: "Vérifiez vos montants HT et TTC avec le",
              label: "calculateur HT vers TTC",
              href: "/",
            },
          ],
        },
        {
          id: "mention-293-b-obligatoire",
          title: "La mention art. 293 B est-elle vraiment obligatoire ?",
          blocks: [
            {
              type: "paragraph",
              text: "Oui. L'article 293 B du CGI impose aux entreprises en franchise d'apposer sur leurs factures, notes et mémoires la mention « TVA non applicable, art. 293 B du CGI ». L'absence de cette mention constitue une irrégularité passible de sanctions.",
            },
            {
              type: "list",
              items: [
                "La mention doit figurer sur chaque facture, devis et document de facturation.",
                "La formulation est fixe : « TVA non applicable, art. 293 B du CGI ».",
                "Aucune variante (« exonéré de TVA », « franchise TVA ») ne remplace la mention légale.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "option-volontaire-tva",
      title: "Peut-on opter volontairement pour la TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'article 293 C du CGI permet à tout assujetti en franchise de base d'opter pour l'assujettissement à la TVA, même si son chiffre d'affaires est inférieur aux seuils. L'option est un choix stratégique, réversible sous conditions.",
        },
        {
          type: "list",
          items: [
            "L'option s'exerce par lettre adressée au service des impôts dont dépend l'entreprise.",
            "Elle prend effet au 1er janvier de l'année suivant la demande, ou à une date ultérieure précisée.",
            "Elle est valable pour une durée minimale de deux ans.",
            "À l'issue de cette période, le retrait de l'option est possible si le CA est inférieur aux seuils.",
          ],
        },
        {
          type: "table",
          caption: "Quand opter pour la TVA est-il pertinent ?",
          headers: ["Situation", "Intérêt de l'option", "Point de vigilance"],
          rows: [
            [
              "Clients professionnels majoritaires",
              "Ils récupèrent la TVA facturée — vous devenez plus compétitif",
              "Vous devez collecter et reverser la TVA",
            ],
            [
              "Achats professionnels importants",
              "Vous déduisez la TVA sur matériel, logiciels, loyer",
              "La déduction ne compense la collecte que si les achats sont significatifs",
            ],
            [
              "Anticipation de croissance",
              "Vous évitez un changement brutal de tarification",
              "Engagement minimum de deux ans",
            ],
            [
              "Activité B2C uniquement",
              "Peu d'intérêt : le client final ne récupère pas la TVA",
              "Vos prix augmentent de 20 % pour le consommateur",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Avant d'opter, simulez l'impact : comparez la TVA collectée sur vos ventes et la TVA déductible sur vos achats. Si le solde est défavorable, la franchise reste plus avantageuse.",
          ],
        },
      ],
      subsections: [
        {
          id: "duree-option-293-c",
          title: "Quelle est la durée minimale de l'option ?",
          blocks: [
            {
              type: "paragraph",
              text: "L'option pour le paiement de la TVA est ferme pendant deux années complètes à compter de son entrée en vigueur. Pendant cette période, vous ne pouvez pas revenir en franchise, même si votre chiffre d'affaires est faible.",
            },
            {
              type: "callout",
              variant: "retain",
              paragraphs: [
                "L'option s'impose à l'ensemble de vos activités. Vous ne pouvez pas opter pour la TVA sur une seule activité en restant en franchise sur une autre.",
              ],
            },
          ],
        },
        {
          id: "retrait-option-tva",
          title: "Comment renoncer à l'option pour la TVA ?",
          blocks: [
            {
              type: "paragraph",
              text: "À l'expiration des deux ans, vous pouvez renoncer à l'option par lettre au service des impôts, pour prendre effet au 1er janvier de l'année suivante. La renonciation n'est possible que si votre CA est inférieur au seuil de franchise.",
            },
            {
              type: "paragraph",
              text: "Si votre CA dépasse les seuils, l'assujettissement devient obligatoire indépendamment de votre volonté de renoncer à l'option.",
            },
          ],
        },
      ],
    },

    {
      id: "micro-entreprise-vs-tva",
      title: "Micro-entreprise et TVA : quelles différences ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le statut d'auto-entrepreneur (micro-entreprise) et le régime de TVA sont deux cadres juridiques indépendants. L'un concerne l'imposition sur le revenu et les cotisations sociales ; l'autre concerne la taxe sur la valeur ajoutée.",
        },
        {
          type: "table",
          caption: "Comparatif des deux régimes",
          headers: ["Aspect", "Régime micro-entreprise", "Régime TVA (franchise ou réel)"],
          rows: [
            ["Objet", "Simplification fiscale et sociale", "Collecte et reversement de la TVA"],
            ["Base légale", "Art. 50-0, 102 ter du CGI", "Art. 293 B et 293 C du CGI"],
            ["Plafond / seuil", "Plafond micro-fiscal (CA annuel)", "Seuils de franchise TVA"],
            ["Déclaration", "Déclaration de CA (mensuelle ou trimestrielle)", "CA3 ou CA12 si assujetti"],
            ["Comptabilité", "Allégée (livre des recettes)", "Obligations renforcées si assujetti"],
            ["Indépendance", "Peut être micro ET assujetti TVA", "Peut être hors micro ET en franchise"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Un développeur web auto-entrepreneur réalise 60 000 € de CA. Il reste au régime micro-fiscal (plafond services ≈ 77 700 €) mais dépasse le seuil TVA de base (37 500 €). Il devient assujetti à la TVA tout en conservant le régime micro pour l'impôt.",
          ],
        },
      ],
      subsections: [
        {
          id: "sortie-micro-assujetti-tva",
          title: "Que se passe-t-il si on sort du régime micro tout en restant en franchise TVA ?",
          blocks: [
            {
              type: "paragraph",
              text: "Le passage au régime réel (déclaration contrôlée ou réel simplifié) pour l'impôt sur le revenu n'entraîne pas automatiquement l'assujettissement à la TVA. Tant que le CA reste sous les seuils de l'article 293 B, la franchise en base de TVA est maintenue.",
            },
            {
              type: "list",
              items: [
                "Sortie du micro-fiscal : comptabilité complète, déclaration de bénéfices réels.",
                "Franchise TVA maintenue : pas de TVA sur les factures, mention art. 293 B.",
                "Les deux régimes évoluent indépendamment selon leurs propres seuils.",
              ],
            },
          ],
        },
        {
          id: "cotisations-sociales-tva",
          title: "La TVA impacte-t-elle les cotisations sociales ?",
          blocks: [
            {
              type: "paragraph",
              text: "Non. Les cotisations sociales de l'auto-entrepreneur sont calculées sur le chiffre d'affaires hors taxes, que vous soyez en franchise ou assujetti à la TVA. La TVA collectée est un impôt indirect reversé à l'État : elle n'entre pas dans l'assiette des cotisations.",
            },
            {
              type: "callout",
              variant: "retain",
              paragraphs: [
                "En franchise, votre CA déclaré aux URSSAF correspond au montant facturé. Une fois assujetti, déclarez le montant HT encaissé, pas le TTC.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "erreurs-tva-auto-entrepreneur",
      title: "Quelles erreurs éviter sur la TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Ces erreurs sont fréquentes chez les auto-entrepreneurs. Elles peuvent entraîner des redressements, des pénalités ou des difficultés avec les clients professionnels.",
        },
        {
          type: "list",
          items: [
            "Oublier la mention « TVA non applicable, art. 293 B du CGI » sur les factures.",
            "Facturer de la TVA alors que vous êtes en franchise.",
            "Ne pas surveiller le chiffre d'affaires et dépasser les seuils sans s'assujettir.",
            "Continuer en franchise après dépassement du seuil majoré.",
            "Déclarer le CA TTC aux URSSAF au lieu du montant HT (une fois assujetti).",
            "Ne pas demander de numéro de TVA intracommunautaire après assujettissement.",
            "Croire que le plafond micro-fiscal protège de l'assujettissement TVA.",
            "Opter pour la TVA sans évaluer le solde collecte / déduction.",
            "Modifier des factures déjà émises au lieu d'émettre un avoir.",
            "Appliquer un taux de TVA incorrect sur les prestations (20 % par défaut n'est pas toujours le bon taux).",
          ],
        },
        {
          type: "checklist",
          title: "Checklist TVA avant chaque facture",
          items: [
            "Statut TVA vérifié : franchise ou assujetti ?",
            "Mention art. 293 B présente si en franchise.",
            "Montants HT, TVA et TTC corrects si assujetti.",
            "N° de TVA intracommunautaire affiché si assujetti.",
            "CA cumulé de l'année comparé aux seuils de franchise.",
            "Taux de TVA adapté à la nature de la prestation ou du produit.",
            "CA déclaré aux URSSAF en HT si assujetti, en montant facturé si en franchise.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "En cas de doute sur votre statut TVA ou sur une facture à émettre, consultez votre centre des finances publiques ou un expert-comptable avant d'envoyer le document au client.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour vérifier vos calculs HT / TVA / TTC avant facturation, utilisez le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
      ],
    },
  ],

  faqTitle: "Questions fréquentes sur la TVA et l'auto-entrepreneur",

  faq: [
    {
      question: "Un auto-entrepreneur paie-t-il la TVA ?",
      answer:
        "En franchise en base (art. 293 B du CGI), non : il ne collecte ni ne reverse la TVA. Une fois assujetti (dépassement des seuils ou option volontaire, art. 293 C), il collecte la TVA sur ses ventes et la reverse à l'administration fiscale, déduction faite de la TVA sur ses achats.",
    },
    {
      question: "Quelle mention doit figurer sur une facture d'auto-entrepreneur ?",
      answer:
        "En franchise : « TVA non applicable, art. 293 B du CGI ». Cette mention est obligatoire sur chaque facture. Une fois assujetti, elle disparaît au profit des montants HT, du taux de TVA et du montant de taxe.",
    },
    {
      question: "Quels sont les seuils de franchise TVA pour un auto-entrepreneur ?",
      answer:
        "Pour les prestations de services : 37 500 € (seuil de base) et 41 250 € (seuil majoré). Pour les ventes, la restauration et l'hébergement : 85 800 € et 94 300 €. Ces montants sont révisés annuellement par la loi de finances (art. 293 B du CGI).",
    },
    {
      question: "Que se passe-t-il si je dépasse le seuil de TVA ?",
      answer:
        "Si vous dépassez le seuil de base mais restez sous le seuil majoré, vous restez en franchise l'année en cours et devenez assujetti au 1er janvier suivant. Si vous dépassez le seuil majoré, l'assujettissement est immédiat au 1er du mois suivant.",
    },
    {
      question: "Peut-on être auto-entrepreneur et assujetti à la TVA ?",
      answer:
        "Oui. Le statut de micro-entrepreneur et le régime de TVA sont indépendants. Vous pouvez être auto-entrepreneur au régime micro-fiscal tout en étant assujetti à la TVA si vos seuils sont dépassés ou si vous avez opté volontairement (art. 293 C).",
    },
    {
      question: "Comment opter pour la TVA en tant qu'auto-entrepreneur ?",
      answer:
        "Adressez une lettre à votre service des impôts en invoquant l'article 293 C du CGI. L'option prend effet au 1er janvier de l'année suivante (ou à une date ultérieure). Elle est valable au minimum deux ans.",
    },
    {
      question: "La TVA est-elle déductible pour un auto-entrepreneur ?",
      answer:
        "Uniquement si vous êtes assujetti à la TVA. En franchise en base (art. 293 B), la TVA payée sur vos achats professionnels n'est pas déductible. Une fois assujetti, vous déduisez la TVA sur vos achats éligibles de la TVA collectée auprès de vos clients.",
    },
    {
      question: "Faut-il un numéro de TVA intracommunautaire en franchise ?",
      answer:
        "Non. En franchise en base de TVA, aucun numéro de TVA intracommunautaire n'est attribué. Il devient obligatoire dès que vous êtes assujetti, et doit figurer sur vos factures.",
    },
    {
      question: "Quelle est la différence entre le plafond micro-fiscal et le seuil TVA ?",
      answer:
        "Le plafond micro-fiscal (environ 77 700 € pour les services) conditionne le régime d'imposition simplifié et les cotisations sociales. Le seuil TVA (37 500 € pour les services) conditionne la franchise en base de TVA. Ce sont deux régimes distincts avec des seuils différents.",
    },
    {
      question: "Un auto-entrepreneur doit-il déclarer la TVA ?",
      answer:
        "En franchise, non : aucune déclaration de TVA n'est exigée. Une fois assujetti, vous devez déposer des déclarations périodiques (CA3 mensuelle ou trimestrielle, ou CA12 annuelle selon votre régime).",
    },
    {
      question: "Peut-on facturer de la TVA en étant en franchise ?",
      answer:
        "Non. Facturer de la TVA alors que vous bénéficiez de la franchise en base constitue une irrégularité. Vous ne pouvez pas reverser cette TVA à l'administration et risquez un redressement fiscal.",
    },
    {
      question: "Comment calculer le TTC d'une prestation une fois assujetti ?",
      answer:
        "TTC = HT × (1 + taux de TVA). Exemple : 1 000 € HT à 20 % = 1 200 € TTC. Utilisez le calculateur HT vers TTC pour vérifier vos montants avant facturation.",
    },
    {
      question: "Le passage à la TVA modifie-t-il mes cotisations sociales ?",
      answer:
        "Non directement. Les cotisations sont calculées sur le CA hors taxes. En franchise, déclarez le montant facturé. Une fois assujetti, déclarez le montant HT encaissé aux URSSAF.",
    },
  ],

  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Par défaut, l'auto-entrepreneur est en franchise en base de TVA : pas de TVA sur les factures, mention art. 293 B obligatoire.",
      "Les seuils TVA (art. 293 B) sont distincts et inférieurs aux plafonds micro-fiscaux.",
      "Le dépassement des seuils entraîne un assujettissement automatique, immédiat ou différé selon le seuil franchi.",
      "L'option volontaire (art. 293 C) est possible mais engage pour au minimum deux ans.",
      "Surveillez votre chiffre d'affaires et adaptez vos factures à votre statut TVA.",
    ],
    closingText:
      "Avant de facturer ou d'opter pour la TVA, vérifiez vos montants HT et TTC en quelques secondes.",
    closingCta: {
      label: "Calculer HT → TTC maintenant",
      href: "/",
    },
  },

  sidebar: {
    calculator: {
      title: "Calculateur HT ↔ TTC",
      description: "Vérifiez vos montants HT, TVA et TTC avant facturation.",
      href: "/",
    },
    discover: [
      { title: "Calculateur HT vers TTC", href: "/" },
      { title: "Tous les simulateurs", href: "/simulateurs" },
    ],
  },
};
