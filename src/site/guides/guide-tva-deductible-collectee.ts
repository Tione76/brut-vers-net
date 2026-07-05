import type { Guide } from "./types";

export const guideTvaDeductibleCollectee: Guide = {
  slug: "tva-deductible-et-tva-collectee",
  title: "TVA déductible et TVA collectée : comprendre la différence",
  description:
    "Guide complet sur la TVA collectée et la TVA déductible : définitions, formule de calcul, déclaration CA3, prorata, crédit de TVA et exemples concrets.",
  subtitle:
    "Collectée sur vos ventes, déductible sur vos achats : maîtrisez la mécanique de la TVA, calculez ce que vous devez et évitez les erreurs courantes.",
  updatedAt: "2026-07-04",
  publishedAt: "2026-07-04",
  keywords: [
    "TVA déductible",
    "TVA collectée",
    "TVA due",
    "déclaration TVA CA3",
    "calcul TVA",
    "crédit de TVA",
    "prorata de déduction",
    "TVA achats",
    "TVA ventes",
    "assujetti TVA",
  ],

  introduction: [
    "La TVA collectée est la taxe que vous facturez à vos clients ; la TVA déductible est celle que vous récupérez sur vos achats professionnels.",
    "Ce guide explique la mécanique complète — de la facturation à la déclaration CA3 — avec formules, exemples chiffrés et références aux articles 271, 272 et 287 du CGI.",
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
            "La TVA collectée correspond à la taxe que vous additionnez sur vos factures de vente. La TVA déductible est celle que vous payez à vos fournisseurs et que vous pouvez imputer sur votre déclaration, sous conditions (art. 271 et 272 du CGI).",
            "La TVA due que vous reversez à l'État se calcule ainsi : TVA due = TVA collectée − TVA déductible. Si le résultat est négatif, vous disposez d'un crédit de TVA reportable ou remboursable.",
            "Vous déclarez ces montants périodiquement sur la déclaration de TVA CA3 (art. 287 du CGI), mensuellement ou trimestriellement selon votre régime.",
          ],
        },
      ],
    },

    {
      id: "definitions-tva-collectee-deductible",
      title: "Qu'est-ce que la TVA collectée et la TVA déductible ?",
      blocks: [
        {
          type: "paragraph",
          text: "La TVA (taxe sur la valeur ajoutée) est un impôt indirect : l'entreprise la collecte pour le compte de l'État, mais ne la supporte pas en définitive sur ses propres consommations professionnelles déductibles.",
        },
        {
          type: "table",
          caption: "Deux flux distincts, une seule déclaration",
          headers: ["Concept", "Définition", "Où le trouver"],
          rows: [
            [
              "TVA collectée",
              "TVA facturée à vos clients sur vos ventes de biens ou services",
              "Lignes de TVA sur vos factures émises, case 08 de la CA3",
            ],
            [
              "TVA déductible",
              "TVA payée à vos fournisseurs, récupérable si les conditions sont remplies",
              "Lignes de TVA sur vos factures reçues, cases 19 à 22 de la CA3",
            ],
            [
              "TVA due",
              "Solde à reverser à l'administration fiscale",
              "TVA collectée − TVA déductible (case 25 ou 32 de la CA3)",
            ],
          ],
        },
        {
          type: "illustration",
          id: "vat-flow-diagram",
          caption:
            "Flux de la TVA : collectée sur les ventes en amont, déductible sur les achats en aval, solde net reversé via la CA3.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Retenez la logique : vous facturez la TVA à vos clients (collectée), vous la récupérez sur vos dépenses professionnelles (déductible), vous ne payez que la différence.",
          ],
        },
      ],
      subsections: [
        {
          id: "qui-est-concerne",
          title: "Qui est assujetti à cette mécanique ?",
          blocks: [
            {
              type: "paragraph",
              text: "Toute entreprise assujettie à la TVA en régime réel (normal ou simplifié) applique ce mécanisme. Les micro-entrepreneurs en franchise de base (art. 293 B du CGI) ne collectent ni ne déduisent de TVA.",
            },
            {
              type: "list",
              items: [
                "Régime réel normal : déclaration mensuelle CA3.",
                "Régime réel simplifié : acomptes semestriels + déclaration annuelle CA12.",
                "Franchise en base : pas de TVA collectée ni déductible sur les opérations courantes.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "tva-collectee-sur-les-ventes",
      title: "Comment fonctionne la TVA collectée sur vos ventes ?",
      blocks: [
        {
          type: "paragraph",
          text: "À chaque vente taxable, vous appliquez le taux de TVA applicable au montant HT et vous l'indiquez sur votre facture. Ce montant constitue votre TVA collectée pour la période.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Déterminez le montant HT",
              description: "Prix de vente hors taxe de chaque prestation ou produit.",
            },
            {
              title: "Appliquez le taux de TVA",
              description: "Multipliez le HT par le taux (20 %, 10 %, 5,5 % ou 2,1 % selon l'opération).",
            },
            {
              title: "Facturez le TTC au client",
              description: "Le client vous paie HT + TVA. Vous encaissez la TVA pour le compte de l'État.",
            },
            {
              title: "Ventilez par taux",
              description: "Sur la CA3, reportez la TVA collectée par taux dans les cases correspondantes.",
            },
          ],
        },
        {
          type: "table",
          caption: "Exemple de TVA collectée sur une facture de vente",
          headers: ["Ligne", "HT", "Taux", "TVA collectée", "TTC"],
          rows: [
            ["Prestation conseil", "2 000,00 €", "20 %", "400,00 €", "2 400,00 €"],
            ["Frais de déplacement", "150,00 €", "20 %", "30,00 €", "180,00 €"],
            ["Total période", "2 150,00 €", "—", "430,00 €", "2 580,00 €"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Un graphiste facture un logo à 800 € HT (TVA 20 %) : TVA collectée = 160 €, TTC = 960 €. Ces 160 € seront déclarés en case 08 de la CA3.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour vérifier le montant de TVA à facturer, utilisez le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
      ],
      subsections: [
        {
          id: "operations-sans-tva-collectee",
          title: "Quelles ventes n'engendrent pas de TVA collectée ?",
          blocks: [
            {
              type: "list",
              items: [
                "Opérations exonérées (certaines activités médicales, formations, exportations hors UE).",
                "Franchise en base de TVA (art. 293 B du CGI) : pas de TVA sur la facture.",
                "Autoliquidation : le client reverse la TVA (livraisons intracommunautaires B2B, certains travaux immobiliers).",
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Une vente exonérée ou en autoliquidation ne génère pas de TVA collectée, mais doit être correctement identifiée sur la facture et en déclaration.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "tva-deductible-sur-les-achats",
      title: "Comment fonctionne la TVA déductible sur vos achats ?",
      blocks: [
        {
          type: "paragraph",
          text: "La TVA déductible est la part de TVA payée à vos fournisseurs que vous pouvez imputer sur votre déclaration. Elle réduit le montant de TVA que vous reversez à l'État.",
        },
        {
          type: "paragraph",
          text: "Les articles 271 et 272 du CGI encadrent le droit à déduction. La TVA est déductible dès lors qu'elle figure sur une facture conforme et que la dépense est engagée pour les besoins de l'activité taxable.",
        },
        {
          type: "list",
          items: [
            "Art. 271 du CGI : la TVA afférente aux biens et services utilisés pour les besoins de l'entreprise est déductible de la TVA collectée.",
            "Art. 272 du CGI : la déduction s'applique aux acquisitions intracommunautaires et aux importations dans les conditions prévues.",
            "Facture conforme obligatoire : mentions légales, dont le montant de TVA ventilé.",
            "Lien direct avec l'activité taxable : la dépense doit servir à des opérations soumises à la TVA.",
          ],
        },
        {
          type: "table",
          caption: "Achats courants et traitement de la TVA déductible",
          headers: ["Type d'achat", "TVA déductible ?", "Condition"],
          rows: [
            ["Fournitures de bureau", "Oui", "Usage professionnel exclusif"],
            ["Loyer de locaux professionnels", "Oui", "Facture au nom de l'entreprise"],
            ["Carburant véhicule tourisme", "Partielle (80 %)", "Art. 206, annexe II — véhicule de tourisme"],
            ["Repas d'affaires", "Non", "Exclusion — art. 271, I du CGI"],
            ["Cadeaux clients > 73 € TTC", "Non", "Exclusion pour les cadeaux de valeur"],
            ["Immobilisation (matériel informatique)", "Oui", "Immobilisation au bilan, déduction immédiate"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Conservez systématiquement les factures d'achat : elles constituent le justificatif indispensable en cas de contrôle ou de demande de remboursement de crédit de TVA.",
          ],
        },
      ],
      subsections: [
        {
          id: "conditions-deduction-art-271",
          title: "Quelles conditions pour déduire la TVA (art. 271) ?",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Être assujetti à la TVA et redevable de celle-ci.",
                "Disposer d'une facture conforme mentionnant la TVA.",
                "Avoir payé ou être redevable de la TVA au fournisseur.",
                "Utiliser le bien ou service pour des opérations ouvrant droit à déduction.",
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Attention : une facture d'achat émise au nom d'une personne physique (et non de l'entreprise) ne permet généralement pas la déduction.",
              ],
            },
          ],
        },
        {
          id: "deduction-importations-intracom",
          title: "Et pour les importations et achats intracommunautaires (art. 272) ?",
          blocks: [
            {
              type: "paragraph",
              text: "L'article 272 du CGI étend le droit à déduction à la TVA afférente aux importations et aux acquisitions intracommunautaires, dès lors que les formalités déclaratives sont respectées.",
            },
            {
              type: "list",
              items: [
                "Importation : TVA payée en douane ou autoliquidée, déductible si l'importation sert l'activité taxable.",
                "Acquisition intracommunautaire : autoliquidation en case 17 de la CA3, déduction simultanée en case 19 si conditions remplies.",
                "Numéro de TVA intracommunautaire valide du fournisseur requis.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "calculer-tva-due",
      title: "Comment calculer la TVA due ?",
      blocks: [
        {
          type: "paragraph",
          text: "La formule fondamentale est simple : vous soustrayez la TVA déductible de la TVA collectée sur la période de déclaration.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "TVA due = TVA collectée − TVA déductible. Si TVA déductible > TVA collectée, le solde est un crédit de TVA.",
          ],
        },
        {
          type: "steps",
          items: [
            {
              title: "Totalisez la TVA collectée",
              description: "Somme de la TVA facturée sur toutes vos ventes de la période, ventilée par taux.",
            },
            {
              title: "Totalisez la TVA déductible",
              description: "Somme de la TVA récupérable sur vos achats et immobilisations de la période.",
            },
            {
              title: "Calculez le solde",
              description: "Collectée − déductible = TVA due (positif) ou crédit de TVA (négatif).",
            },
            {
              title: "Appliquez le prorata si nécessaire",
              description: "Activité mixte taxable / exonérée ? Ajustez la déduction (voir section dédiée).",
            },
          ],
        },
        {
          type: "table",
          caption: "Exemple numérique — trimestre d'activité",
          headers: ["Poste", "Montant"],
          rows: [
            ["TVA collectée (ventes)", "4 800,00 €"],
            ["TVA déductible (achats)", "1 950,00 €"],
            ["TVA due à payer", "2 850,00 €"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Consultant : TVA collectée 3 000 €, TVA déductible 900 € (loyer, logiciels, fournitures) → TVA due = 2 100 € à reverser sur la CA3 du trimestre.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Avant de ventiler vos factures, contrôlez vos montants HT et TTC avec le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
      ],
      subsections: [
        {
          id: "credit-de-tva",
          title: "Que faire en cas de crédit de TVA ?",
          blocks: [
            {
              type: "paragraph",
              text: "Lorsque la TVA déductible dépasse la TVA collectée, vous obtenez un crédit de TVA. Vous pouvez le reporter sur les déclarations suivantes ou en demander le remboursement si certaines conditions sont remplies.",
            },
            {
              type: "list",
              items: [
                "Report automatique : le crédit non utilisé est reporté sur la période suivante (case 27 de la CA3).",
                "Demande de remboursement : possible dès 760 € de crédit (150 € en décembre pour les déclarants mensuels).",
                "Cas fréquent : démarrage d'activité avec investissements importants avant les premières ventes.",
              ],
            },
            {
              type: "illustration",
              id: "vat-net-balance",
              caption:
                "Solde net : TVA collectée moins TVA déductible. Positif = TVA due ; négatif = crédit reportable ou remboursable.",
            },
          ],
        },
      ],
    },

    {
      id: "declarer-tva-ca3",
      title: "Comment déclarer la TVA avec la CA3 ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'article 287 du CGI impose aux assujettis au régime réel normal de déposer une déclaration périodique de TVA — le formulaire CA3 — auprès de l'administration fiscale.",
        },
        {
          type: "list",
          items: [
            "Fréquence mensuelle pour la majorité des entreprises au régime réel normal.",
            "Fréquence trimestrielle possible sous conditions de chiffre d'affaires (art. 287, I bis du CGI).",
            "Échéance : entre le 15 et le 24 du mois suivant la période, selon le lieu d'imposition.",
            "Télédéclaration obligatoire via impots.gouv.fr ou un EDI partenaire.",
          ],
        },
        {
          type: "table",
          caption: "Correspondance simplifiée CA3 — collectée, déductible, solde",
          headers: ["Case CA3", "Contenu", "Exemple"],
          rows: [
            ["08", "TVA collectée au taux normal 20 %", "4 800 €"],
            ["09", "TVA collectée taux réduit 10 %", "0 €"],
            ["19 à 22", "TVA déductible (biens, services, immobilisations)", "1 950 €"],
            ["25", "TVA due avant déductions diverses", "2 850 €"],
            ["32", "TVA nette due", "2 850 €"],
            ["27", "Crédit de TVA (si solde négatif)", "0 €"],
          ],
        },
        {
          type: "illustration",
          id: "vat-declaration-cycle",
          caption:
            "Cycle mensuel : facturation → enregistrement comptable → déclaration CA3 → paiement ou report de crédit.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon réflexe : rapprochez chaque mois le total de votre comptabilité (collectée / déductible) des cases de la CA3 avant télédéclaration. Un écart signale une facture oubliée ou un taux mal ventilé.",
          ],
        },
      ],
      subsections: [
        {
          id: "regime-simplifie-ca12",
          title: "Quelle différence avec le régime simplifié (CA12) ?",
          blocks: [
            {
              type: "paragraph",
              text: "Au régime réel simplifié, vous versez des acomptes semestriels et une déclaration annuelle CA12. Le principe collectée − déductible reste identique, mais la périodicité change.",
            },
            {
              type: "list",
              items: [
                "Acomptes en juillet et décembre : estimation basée sur la TVA de l'année précédente.",
                "CA12 en mai : régularisation annuelle avec ventilation détaillée.",
                "Même droit à déduction (art. 271-272) et même logique de solde.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "prorata-de-deduction",
      title: "Qu'est-ce que le prorata de déduction ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le prorata s'applique lorsque votre entreprise réalise à la fois des opérations taxables et des opérations exonérées (activité mixte). Vous ne pouvez alors déduire qu'une fraction de la TVA sur vos achats communs.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Prorata de déduction = (CA taxable + acquisitions intracom taxables) / (CA total + acquisitions intracom) × 100. La TVA déductible est multipliée par ce coefficient.",
          ],
        },
        {
          type: "table",
          caption: "Exemple de calcul du prorata",
          headers: ["Élément", "Montant"],
          rows: [
            ["CA opérations taxables", "180 000 €"],
            ["CA opérations exonérées", "20 000 €"],
            ["Prorata", "180 000 / 200 000 = 90 %"],
            ["TVA sur achat commun", "1 000 €"],
            ["TVA déductible après prorata", "900 €"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Un cabinet mixte conseil (taxable) et médiation (exonérée) : prorata 85 %. Sur un loyer de 2 000 € HT (TVA 400 €), la déduction est limitée à 340 €.",
          ],
        },
      ],
      subsections: [
        {
          id: "prorata-special",
          title: "Existe-t-il un prorata spécial ?",
          blocks: [
            {
              type: "paragraph",
              text: "Oui. Pour certains biens (immobilisations, véhicules), un prorata spécial peut s'appliquer en complément du prorata général, notamment en cas d'utilisation partiellement non professionnelle.",
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Le prorata se calcule une fois par an (exercice civil ou décalé) et s'applique à l'année suivante. Une régularisation annuelle corrige les écarts.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "exemples-par-type-activite",
      title: "Quels exemples concrets par type d'activité ?",
      blocks: [
        {
          type: "paragraph",
          text: "La mécanique collectée / déductible est universelle, mais les montants varient selon la structure de charges de chaque activité.",
        },
      ],
      subsections: [
        {
          id: "exemple-consultant-freelance",
          title: "Consultant ou freelance (prestation de services)",
          blocks: [
            {
              type: "table",
              caption: "Mois type — consultant IT, TVA 20 %",
              headers: ["Flux", "HT", "TVA", "TTC"],
              rows: [
                ["Facturation client (collectée)", "5 000 €", "+ 1 000 €", "6 000 €"],
                ["Loyer bureau (déductible)", "800 €", "− 160 €", "960 €"],
                ["Logiciels SaaS (déductible)", "200 €", "− 40 €", "240 €"],
                ["TVA due du mois", "—", "800 €", "—"],
              ],
            },
          ],
        },
        {
          id: "exemple-commercant",
          title: "Commerçant (achat-revente)",
          blocks: [
            {
              type: "paragraph",
              text: "Le commerçant collecte la TVA sur ses ventes au public et déduit celle payée sur ses achats de marchandises. La marge commerciale n'entre pas directement dans le calcul de TVA.",
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Boutique : TVA collectée sur ventes 12 000 €, TVA déductible sur achats stock 7 500 € → TVA due = 4 500 €. La TVA sur marchandises invendues reste théoriquement déductible à l'achat.",
              ],
            },
          ],
        },
        {
          id: "exemple-artisan-btp",
          title: "Artisan BTP (TVA à 10 %)",
          blocks: [
            {
              type: "table",
              caption: "Chantier rénovation — TVA collectée à 10 %",
              headers: ["Poste", "TVA collectée", "TVA déductible"],
              rows: [
                ["Facture client travaux", "540 € (sur 5 400 € HT)", "—"],
                ["Achat matériaux", "—", "320 €"],
                ["Location engin", "—", "90 €"],
                ["Solde TVA due", "130 €", "—"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Ventilez distinctement la TVA à 10 % (travaux) et à 20 % (fournitures séparées) sur vos factures et votre CA3.",
              ],
            },
          ],
        },
        {
          id: "exemple-debut-activite",
          title: "Démarrage d'activité (crédit de TVA)",
          blocks: [
            {
              type: "paragraph",
              text: "Au lancement, les investissements précèdent souvent les ventes : la TVA déductible sur matériel et aménagement dépasse la TVA collectée.",
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Agence créée en janvier : achat mobilier et matériel (TVA déductible 4 200 €), premières factures en mars (TVA collectée 800 €) → crédit de 3 400 € reporté sur les mois suivants.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "erreurs-frequentes-tva",
      title: "Quelles erreurs éviter sur la TVA collectée et déductible ?",
      blocks: [
        {
          type: "paragraph",
          text: "Ces erreurs entraînent des redressements, des refus de déduction ou des pénalités de retard sur la déclaration CA3.",
        },
        {
          type: "list",
          items: [
            "Confondre montant HT et TTC lors du calcul de la TVA collectée ou déductible.",
            "Déduire la TVA sur des dépenses exclues (repas, cadeaux, carburant véhicule tourisme sans application du coefficient).",
            "Oublier de ventiler la TVA par taux sur la CA3 (20 %, 10 %, 5,5 %).",
            "Déduire la TVA sans facture conforme ou sur une facture au nom personnel.",
            "Ne pas appliquer le prorata en activité mixte taxable / exonérée.",
            "Retard de déclaration ou de paiement (majorations de 10 % + intérêts de retard).",
            "Ne pas régulariser un crédit de TVA persistant sans demander le remboursement.",
            "Collecter de la TVA en franchise de base (art. 293 B) — irrégularité grave.",
          ],
        },
        {
          type: "checklist",
          title: "Checklist avant déclaration CA3",
          items: [
            "Toutes les factures émises sont enregistrées avec la TVA collectée ventilée par taux.",
            "Toutes les factures reçues sont contrôlées (mentions, TVA, nom de l'entreprise).",
            "Les achats non déductibles sont exclus du total déductible.",
            "Le prorata est appliqué si activité mixte.",
            "Le solde collectée − déductible correspond à votre comptabilité.",
            "Les échéances de télédéclaration et de paiement sont respectées.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Deux minutes de vérification avant chaque CA3 évitent des régularisations coûteuses. Rapprochez toujours comptabilité et cases de déclaration.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour sécuriser vos calculs de facturation en amont, testez vos montants avec le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
      ],
    },
  ],

  faqTitle: "Questions fréquentes sur la TVA déductible et collectée",

  faq: [
    {
      question: "Quelle est la différence entre TVA collectée et TVA déductible ?",
      answer:
        "La TVA collectée est celle que vous facturez à vos clients sur vos ventes. La TVA déductible est celle que vous payez à vos fournisseurs et que vous récupérez sur votre déclaration, sous conditions (art. 271 et 272 du CGI).",
    },
    {
      question: "Comment calculer la TVA due à payer ?",
      answer:
        "TVA due = TVA collectée − TVA déductible. Si le résultat est négatif, vous êtes en crédit de TVA, reportable ou remboursable selon les seuils.",
    },
    {
      question: "Sur quelle déclaration reporter la TVA collectée et déductible ?",
      answer:
        "Sur la déclaration CA3 (régime réel normal), mensuelle ou trimestrielle, conformément à l'article 287 du CGI. Au régime simplifié, la CA12 annuelle avec acomptes semestriels.",
    },
    {
      question: "Quelles conditions pour déduire la TVA sur un achat ?",
      answer:
        "L'article 271 du CGI exige : être assujetti à la TVA, disposer d'une facture conforme, que la dépense serve l'activité taxable et que la TVA ait été effectivement payée ou due au fournisseur.",
    },
    {
      question: "Peut-on déduire la TVA sur tous les achats professionnels ?",
      answer:
        "Non. Certaines dépenses sont exclues : repas, hébergement, carburant de véhicule de tourisme (sauf coefficient de 80 %), cadeaux au-delà de 73 € TTC, etc. (art. 271 du CGI).",
    },
    {
      question: "Qu'est-ce qu'un crédit de TVA ?",
      answer:
        "C'est un solde positif obtenu lorsque la TVA déductible dépasse la TVA collectée sur une période. Il est reporté sur la déclaration suivante (case 27) ou remboursable si le montant dépasse 760 € (150 € en décembre pour les mensuels).",
    },
    {
      question: "Qu'est-ce que le prorata de déduction ?",
      answer:
        "Coefficient appliqué quand l'entreprise réalise des opérations taxables et exonérées. Il limite la TVA déductible sur les achats communs au prorata du chiffre d'affaires taxable.",
    },
    {
      question: "Un auto-entrepreneur en franchise déduit-il la TVA ?",
      answer:
        "Non. En franchise de base (art. 293 B du CGI), il ne collecte pas de TVA sur ses ventes et ne déduit pas celle de ses achats. La mécanique collectée / déductible ne s'applique qu'aux assujettis au régime réel.",
    },
    {
      question: "La TVA collectée appartient-elle à l'entreprise ?",
      answer:
        "Non. La TVA collectée est encaissée pour le compte de l'État. L'entreprise la reverse après déduction de la TVA payée sur ses achats professionnels éligibles.",
    },
    {
      question: "Que se passe-t-il si on oublie de déclarer de la TVA collectée ?",
      answer:
        "L'administration fiscale peut procéder à un redressement avec majorations (10 % en cas de manquement délibéré) et intérêts de retard. Il est essentiel de rapprocher factures émises et case 08 de la CA3.",
    },
    {
      question: "Peut-on récupérer la TVA sur une facture d'achat sans numéro de TVA ?",
      answer:
        "Pour les achats auprès d'un assujetti français, la facture doit comporter le numéro de TVA intracommunautaire du vendeur. Sans facture conforme, le droit à déduction est refusé.",
    },
    {
      question: "Comment ventiler la TVA collectée à plusieurs taux sur la CA3 ?",
      answer:
        "Chaque taux a sa case : 20 % (case 08), 10 % (case 09), 5,5 % (case 9B), 2,1 % (case 10). Totalisez la TVA de vos factures par taux avant de remplir la déclaration.",
    },
  ],

  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "La TVA collectée provient de vos ventes ; la TVA déductible, de vos achats professionnels éligibles (art. 271-272 du CGI).",
      "TVA due = TVA collectée − TVA déductible. Un solde négatif forme un crédit de TVA.",
      "Déclarez vos montants sur la CA3 (art. 287 du CGI), en respectant la ventilation par taux.",
      "Appliquez le prorata en activité mixte et conservez toutes vos factures justificatives.",
    ],
    closingText:
      "Avant de remplir votre prochaine déclaration, vérifiez vos montants HT et TTC sur chaque facture.",
    closingCta: {
      label: "Calculer HT → TTC maintenant",
      href: "/",
    },
  },

  sidebar: {
    calculator: {
      title: "Calculateur HT ↔ TTC",
      description: "Vérifiez vos montants HT, TVA et TTC avant déclaration.",
      href: "/",
    },
    discover: [
      { title: "Calculateur HT vers TTC", href: "/" },
      { title: "Tous les simulateurs", href: "/simulateurs" },
    ],
  },
};
