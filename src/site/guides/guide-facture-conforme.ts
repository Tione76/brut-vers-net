import type { Guide } from "./types";

export const guideFactureConforme: Guide = {
  slug: "comment-faire-une-facture-conforme",
  title: "Comment faire une facture conforme ?",
  description:
    "Guide de référence pour établir une facture conforme en France : mentions obligatoires, TVA, numérotation, exemples et erreurs à éviter.",
  subtitle:
    "Toutes les règles, les mentions obligatoires, les exemples et les erreurs à éviter pour créer une facture conforme en France.",
  updatedAt: "2026-07-04",
  publishedAt: "2026-07-04",

  introduction: [
    "Une facture conforme regroupe toutes les mentions légales exigées par le Code de commerce et le Code général des impôts.",
    "Ce guide détaille chaque obligation, avec des exemples concrets, une checklist avant envoi et les réponses aux questions les plus fréquentes.",
  ],

  sections: [
    {
      id: "quest-ce-quune-facture-conforme",
      title: "Qu'est-ce qu'une facture conforme ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une facture conforme contient l'intégralité des mentions imposées par la loi. Elle constitue une pièce comptable et un justificatif en cas de contrôle fiscal.",
        },
        {
          type: "paragraph",
          text: "Elle se distingue du devis (proposition commerciale avant la vente) et du bon de commande. La facture intervient une fois la prestation réalisée ou la marchandise livrée.",
        },
        {
          type: "list",
          items: [
            "Obligatoire pour toute vente entre professionnels (B2B), art. L441-9 du Code de commerce.",
            "Exigée en B2C si le client la demande ou si le montant dépasse 25 € TTC, art. 289, I-3 du CGI.",
            "Conservation obligatoire pendant 10 ans, art. L123-22 du Code de commerce.",
          ],
        },
        {
          type: "illustration",
          id: "invoice-structure",
          caption:
            "Les 4 zones d'une facture : en-tête, lignes de facturation, totaux et conditions de paiement.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Une facture incomplète peut entraîner le rejet de la déduction de TVA par votre client et des difficultés en cas de litige.",
          ],
        },
      ],
    },

    {
      id: "mentions-obligatoires-facture",
      title: "Quelles mentions obligatoires doit contenir une facture ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les articles L441-9 et L441-10 du Code de commerce et l'article 242 nonies A de l'annexe II au CGI définissent les mentions indispensables.",
        },
        {
          type: "table",
          caption: "Références : Code de commerce (L441-9, L441-10) et CGI (art. 242 nonies A)",
          headers: ["Mention", "Contenu attendu", "Exemple"],
          rows: [
            ["Date d'émission", "Jour de création de la facture", "04/07/2026"],
            ["Numéro unique", "Chronologique et continu, sans rupture", "FAC-2026-0042"],
            ["Vendeur", "Nom, adresse, SIREN ou SIRET", "SARL Dupont, SIRET 123 456 789 00012"],
            ["Forme juridique et capital", "Pour les personnes morales", "SARL au capital de 10 000 €"],
            ["RCS", "Ville d'immatriculation", "RCS Paris B 123 456 789"],
            ["Acheteur", "Nom ou raison sociale, adresse", "SAS Martin, 10 rue de la Paix, 75002 Paris"],
            ["N° TVA intracommunautaire", "Si assujetti à la TVA", "FR 12 345678901"],
            ["Désignation", "Description précise des biens ou services", "Prestation de conseil, mission Q2"],
            ["Quantité × prix unitaire HT", "Détail par ligne", "5 × 800,00 € HT"],
            ["Taux et montant de TVA", "Par taux, ou mention d'exonération", "TVA 20 % : 800,00 €"],
            ["Totaux HT et TTC", "Montants globaux", "4 000 € HT, 4 800 € TTC"],
            ["Date de paiement ou délai", "Échéance précise", "Paiement à 30 jours"],
            ["Pénalités de retard", "Taux applicable", "3 × taux d'intérêt légal"],
            ["Indemnité forfaitaire", "40 € pour les factures B2B", "Indemnité forfaitaire : 40 €"],
            ["Escompte", "Conditions ou mention « Néant »", "Escompte : Néant"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Astuce : créez un modèle avec toutes les mentions pré-remplies. Il ne restera qu'à compléter les lignes et les montants à chaque facture.",
          ],
        },
      ],
      subsections: [
        {
          id: "mentions-facture-assujetti-tva",
          title: "Quelles mentions si vous êtes assujetti à la TVA ?",
          blocks: [
            {
              type: "paragraph",
              text: "Outre les mentions communes, le numéro de TVA intracommunautaire du vendeur est obligatoire.",
            },
            {
              type: "list",
              items: [
                "N° TVA intracommunautaire du vendeur.",
                "N° TVA de l'acheteur pour les livraisons intracommunautaires.",
                "Mention « Autoliquidation de la TVA » lorsque le client reverse la taxe.",
                "Ventilation par taux si plusieurs taux sur une même facture.",
              ],
            },
          ],
        },
        {
          id: "mentions-facture-auto-entrepreneur",
          title: "Quelles mentions pour une facture d'auto-entrepreneur ?",
          blocks: [
            {
              type: "paragraph",
              text: "En franchise en base de TVA (art. 293 B du CGI), vous ne facturez pas de TVA. La mention d'exonération est obligatoire.",
            },
            {
              type: "list",
              items: [
                "« TVA non applicable, art. 293 B du CGI », obligatoire.",
                "Numéro SIRET.",
                "Dispense d'immatriculation au RCS si applicable (art. L123-1-1 du Code de commerce).",
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Piège fréquent : afficher un montant de TVA ou un taux alors que vous êtes en franchise. C'est une irrégularité.",
              ],
            },
            {
              type: "paragraph",
              text: "Guide dédié : Comment faire une facture en auto-entrepreneur ?",
            },
          ],
        },
      ],
    },

    {
      id: "calculer-tva-facture",
      title: "Comment calculer la TVA sur une facture ?",
      blocks: [
        {
          type: "paragraph",
          text: "Chaque ligne indique le montant HT, le taux de TVA et le montant de taxe. Le total TTC = total HT + total TVA.",
        },
        {
          type: "steps",
          items: [
            { title: "Calculez le HT par ligne", description: "Quantité × prix unitaire HT." },
            { title: "Appliquez le taux de TVA", description: "Multipliez le HT par le taux applicable (ex. 0,20 pour 20 %)." },
            { title: "Additionnez les totaux", description: "Total HT + total TVA = total TTC." },
            { title: "Ventilez si nécessaire", description: "Plusieurs taux sur une facture ? Regroupez par taux en bas de page." },
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Vérifiez vos montants avec le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
        {
          type: "illustration",
          id: "vat-calculation",
          caption: "1 000 € HT + 200 € de TVA (20 %) = 1 200 € TTC.",
        },
        {
          type: "table",
          caption: "Taux de TVA en vigueur en France métropolitaine",
          headers: ["Taux", "Cas d'application", "Exemple"],
          rows: [
            ["20 %", "Taux normal, majorité des biens et services", "100 € HT → 120 € TTC"],
            ["10 %", "Restauration, rénovation, transport de voyageurs", "100 € HT → 110 € TTC"],
            ["5,5 %", "Alimentaire, livres, énergie, accessibilité PMR", "100 € HT → 105,50 € TTC"],
            ["2,1 %", "Médicaments remboursables, presse", "100 € HT → 102,10 € TTC"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Prestation de 1 000 € HT à 20 % : TVA = 200 €, TTC = 1 200 €.",
          ],
        },
        {
          type: "paragraph",
          text: "Quel taux pour votre activité ? Consultez notre guide : Quels sont les taux de TVA en France ?",
        },
      ],
    },

    {
      id: "rediger-facture-etape-par-etape",
      title: "Comment rédiger une facture conforme étape par étape ?",
      blocks: [
        {
          type: "paragraph",
          text: "De l'en-tête aux conditions de paiement, voici l'ordre recommandé pour ne rien oublier.",
        },
        {
          type: "steps",
          items: [
            { title: "En-tête", description: "Identité vendeur (SIRET, TVA), logo, coordonnées client." },
            { title: "Références", description: "Titre « Facture », numéro unique, date d'émission." },
            { title: "Lignes", description: "Désignation, quantité, prix unitaire HT, montant HT par ligne." },
            { title: "Totaux", description: "Total HT, TVA ventilée par taux, total TTC." },
            { title: "Pied de page", description: "Échéance, RIB, pénalités, indemnité forfaitaire, escompte." },
          ],
        },
        {
          type: "illustration",
          id: "example-invoice-service",
          caption:
            "Exemple réaliste : prestation de conseil, 3 jours à 650 € HT, TVA 20 %, total TTC 2 340 €.",
        },
      ],
      subsections: [
        {
          id: "exemple-facture-freelance",
          title: "Quel exemple pour un freelance ou consultant ?",
          blocks: [
            {
              type: "paragraph",
              text: "Un consultant facture des journées de mission. Chaque journée = une ligne ou un regroupement par période.",
            },
            {
              type: "table",
              caption: "Exemple : freelance en prestation de service",
              headers: ["Élément", "Valeur"],
              rows: [
                ["Désignation", "Mission conseil stratégique, 3 jours"],
                ["Prix unitaire HT", "650,00 € / jour"],
                ["Total HT", "1 950,00 €"],
                ["TVA 20 %", "390,00 €"],
                ["Total TTC", "2 340,00 €"],
                ["Échéance", "30 jours date de facture"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Conseil : précisez la période couverte (mois, trimestre) dans la désignation. Cela facilite la comptabilité de votre client.",
              ],
            },
          ],
        },
        {
          id: "exemple-facture-auto-entrepreneur",
          title: "Quel exemple pour un auto-entrepreneur ?",
          blocks: [
            {
              type: "paragraph",
              text: "Pas de TVA à facturer. Le total correspond directement au montant HT.",
            },
            {
              type: "table",
              caption: "Exemple : auto-entrepreneur en franchise de TVA",
              headers: ["Élément", "Valeur"],
              rows: [
                ["Désignation", "Création site web vitrine"],
                ["Montant", "1 500,00 €"],
                ["TVA", "TVA non applicable, art. 293 B du CGI"],
                ["Total à payer", "1 500,00 €"],
                ["SIRET", "123 456 789 00045"],
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Ne jamais ajouter une ligne TVA ni un total TTC distinct du montant facturé.",
              ],
            },
          ],
        },
        {
          id: "exemple-facture-artisan",
          title: "Quel exemple pour un artisan ?",
          blocks: [
            {
              type: "paragraph",
              text: "Les travaux de rénovation sont souvent au taux de TVA à 10 %. Mentionnez la nature des travaux et l'adresse du chantier.",
            },
            {
              type: "table",
              caption: "Exemple : artisan plombier, TVA 10 %",
              headers: ["Désignation", "Qté", "P.U. HT", "Montant HT"],
              rows: [
                ["Remplacement chaudière, 15 rue des Lilas", "1", "2 800,00 €", "2 800,00 €"],
                ["Main-d'œuvre installation", "8 h", "55,00 €", "440,00 €"],
                ["Total HT", "", "", "3 240,00 €"],
                ["TVA 10 %", "", "", "324,00 €"],
                ["Total TTC", "", "", "3 564,00 €"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "Pour les travaux de rénovation à 10 %, l'adresse du chantier et la nature des travaux doivent figurer sur la facture.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "numeroter-facture",
      title: "Comment numéroter une facture ?",
      blocks: [
        {
          type: "paragraph",
          text: "Chaque facture porte un numéro unique, attribué chronologiquement et sans rupture dans la séquence.",
        },
        {
          type: "list",
          items: [
            "Format courant : FAC-2026-0001, FAC-2026-0002…",
            "Les avoirs : séquence dédiée (AV-2026-0001) ou suffixe (-AV).",
            "La date d'émission est celle de création, pas forcément celle de la prestation.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Piège : supprimer une facture ou sauter un numéro. C'est une anomalie visible lors d'un contrôle fiscal.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Une facture émise ne se modifie jamais. Seule une facture rectificative permet de corriger une erreur.",
          ],
        },
      ],
    },

    {
      id: "verifier-avant-envoi",
      title: "Que vérifier avant d'envoyer une facture ?",
      blocks: [
        {
          type: "paragraph",
          text: "Cette checklist reprend les points de contrôle essentiels. Parcourez-la systématiquement avant chaque envoi.",
        },
        {
          type: "checklist",
          title: "Checklist avant envoi",
          items: [
            "Numéro unique et chronologique attribué.",
            "Date d'émission renseignée.",
            "Identités complètes du vendeur et de l'acheteur (SIRET, adresses).",
            "N° TVA intracommunautaire si assujetti, ou mention d'exonération si franchise.",
            "Désignation précise de chaque prestation ou produit.",
            "Montants HT, taux de TVA et montants de TVA corrects par ligne.",
            "Total HT + total TVA = total TTC (vérifiez le calcul).",
            "Conditions de paiement, pénalités de retard et indemnité forfaitaire mentionnées.",
            "Escompte mentionné (même si « Néant »).",
            "RIB ou moyen de paiement indiqué.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour contrôler vos totaux HT / TVA / TTC, utilisez le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
      ],
    },

    {
      id: "erreurs-frequentes-facture",
      title: "Quelles erreurs éviter sur une facture ?",
      blocks: [
        {
          type: "paragraph",
          text: "Ces erreurs sont fréquentes. Leurs conséquences vont du simple rejet de TVA au redressement fiscal.",
        },
        {
          type: "list",
          items: [
            "N° TVA intracommunautaire manquant (vendeur ou acheteur).",
            "Confusion entre montant HT et TTC.",
            "Taux de TVA inadapté au produit ou service.",
            "Numéro en double ou trou dans la séquence.",
            "Oubli de la mention d'exonération (auto-entrepreneur).",
            "Absence de pénalités de retard ou d'indemnité forfaitaire (B2B).",
            "Modification d'une facture déjà transmise au client.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Relisez votre facture avec la checklist ci-dessus. Deux minutes de vérification évitent des semaines de corrections.",
          ],
        },
      ],
    },

    {
      id: "corriger-facture-deja-emise",
      title: "Comment corriger une facture déjà envoyée ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une facture émise est définitive. La seule procédure correcte : un avoir, puis éventuellement une nouvelle facture.",
        },
        {
          type: "illustration",
          id: "credit-note",
          caption:
            "L'avoir annule la facture d'origine (montants négatifs), puis une nouvelle facture reprend le montant corrigé.",
        },
      ],
      subsections: [
        {
          id: "emettre-facture-rectificative",
          title: "Comment émettre un avoir (facture rectificative) ?",
          blocks: [
            {
              type: "paragraph",
              text: "Reprenez toutes les mentions obligatoires. Référencez le numéro de la facture corrigée. Inscrivez les montants en négatif.",
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Erreur sur FAC-2026-0030 (1 200 € TTC au lieu de 1 000 €) : avoir AV-2026-0005 à -1 200 € TTC, puis FAC-2026-0031 à 1 000 € TTC.",
              ],
            },
          ],
        },
        {
          id: "corriger-faible-montant",
          title: "Faut-il un avoir pour une petite erreur ?",
          blocks: [
            {
              type: "paragraph",
              text: "Oui, quel que soit le montant. Une note informelle n'a aucune valeur comptable.",
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: [
                "La meilleure correction reste la prévention : utilisez la checklist avant envoi pour éviter les avoirs.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "outils-facture-conforme",
      title: "Quel logiciel utiliser pour créer une facture conforme ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le choix de l'outil importe moins que le respect des obligations légales. Voici les trois approches les plus courantes.",
        },
        {
          type: "list",
          items: [
            "Logiciel de facturation en ligne, mentions automatiques, calcul TVA, numérotation sécurisée.",
            "Tableur (Excel, Sheets), économique, mais modèle et suivi manuels.",
            "Expert-comptable, recommandé pour valider vos premiers documents.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Recommandation : un logiciel de facturation dédié réduit drastiquement les oublis de mentions et les erreurs de calcul.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Avant de reporter vos montants, testez-les avec le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
        {
          type: "paragraph",
          text: "Prochainement : générateur de facture en ligne.",
        },
      ],
    },
  ],

  faqTitle: "Questions fréquentes sur la facturation",

  faq: [
    {
      question: "Quelles sont les mentions obligatoires sur une facture en France ?",
      answer:
        "Date, numéro unique, identités vendeur et acheteur (SIRET), désignation, quantités, prix HT, TVA, totaux, conditions de paiement, pénalités de retard, indemnité forfaitaire (40 € en B2B) et escompte. Base légale : art. L441-9 et L441-10 du Code de commerce, art. 242 nonies A du CGI.",
    },
    {
      question: "Une facture doit-elle obligatoirement mentionner la TVA ?",
      answer:
        "Oui, sauf en franchise de base (art. 293 B du CGI). Dans ce cas, la mention « TVA non applicable, art. 293 B du CGI » est obligatoire et aucun montant de TVA ne doit figurer.",
    },
    {
      question: "Comment numéroter une facture de manière conforme ?",
      answer:
        "Attribuez un numéro unique, chronologique et continu (ex. FAC-2026-0042). Les avoirs suivent une séquence propre ou reprennent le numéro d'origine avec un suffixe.",
    },
    {
      question: "Peut-on modifier une facture déjà envoyée ?",
      answer:
        "Non. Émettez un avoir (facture rectificative) pour annuler tout ou partie de la facture initiale, puis une nouvelle facture corrigée si nécessaire.",
    },
    {
      question: "Quelle est la différence entre un devis et une facture ?",
      answer:
        "Le devis est une proposition commerciale avant la vente. La facture intervient après la prestation : c'est une demande de paiement et une pièce comptable aux mentions obligatoires bien plus nombreuses.",
    },
    {
      question: "Un auto-entrepreneur doit-il faire des factures ?",
      answer:
        "Oui, pour toute vente B2B et pour les ventes B2C sur demande du client ou au-delà de 25 € TTC. La mention « TVA non applicable, art. 293 B du CGI » est obligatoire.",
    },
    {
      question: "Combien de temps conserver une facture ?",
      answer:
        "10 ans, au format papier ou électronique, par l'émetteur et le destinataire (art. L123-22 du Code de commerce).",
    },
    {
      question: "Comment calculer le TTC à partir du HT ?",
      answer:
        "TTC = HT × (1 + taux de TVA). Exemple : 500 € HT à 20 % = 600 € TTC. Utilisez notre calculateur pour vérifier avant facturation.",
    },
    {
      question: "Qu'est-ce que l'indemnité forfaitaire de 40 € sur une facture ?",
      answer:
        "Pour les factures B2B, l'article L441-10 du Code de commerce impose de mentionner une indemnité forfaitaire de 40 € pour frais de recouvrement en cas de retard de paiement.",
    },
  ],

  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Une facture conforme contient toutes les mentions légales, vérifiez la checklist avant chaque envoi.",
      "La numérotation doit être unique, chronologique et sans rupture.",
      "Une facture envoyée ne se modifie jamais : seul un avoir corrige une erreur.",
      "Vérifiez systématiquement que HT + TVA = TTC.",
    ],
    closingText:
      "Avant d'envoyer votre prochaine facture, contrôlez vos montants en quelques secondes.",
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
    relatedGuides: undefined,
    relatedSimulator: undefined,
    discover: [
      { title: "Calculateur HT vers TTC", href: "/" },
      { title: "Tous les simulateurs", href: "/simulateurs" },
    ],
  },
};
