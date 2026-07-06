import type { Guide } from "./types";
import { CTA_CALCULATOR, GUIDE_FAQ, PROFESSION_FAQ_ITEMS, pc } from "./guide-taux-tva-data";

const LINK_FACTURE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Pour structurer correctement vos lignes et la ventilation par taux, consultez notre guide",
  label: "Comment faire une facture conforme",
  href: "/guides/comment-faire-une-facture-conforme",
};

const LINK_FRANCHISE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Si vous êtes en franchise en base, les règles de facturation diffèrent — voir",
  label: "Franchise en base de TVA",
  href: "/guides/franchise-en-base-de-tva",
};

const LINK_AE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Micro-entrepreneur ou auto-entrepreneur : le régime TVA dépend de votre assujettissement —",
  label: "TVA et auto-entrepreneur",
  href: "/guides/tva-et-auto-entrepreneur",
};

const LINK_DEDUCTIBLE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Une fois le bon taux appliqué, comprenez la différence entre",
  label: "TVA déductible et TVA collectée",
  href: "/guides/tva-deductible-et-tva-collectee",
};

export const guideTauxTva: Guide = {
  slug: "quels-sont-les-taux-de-tva-en-france",
  title: "Quels sont les taux de TVA en France ?",
  description:
    "Guide de référence sur les taux de TVA en France : 20 %, 10 %, 5,5 %, 2,1 %, taux par métier, DOM, calculs HT/TTC et choix du taux applicable.",
  subtitle:
    "Tous les taux en vigueur, leurs bases légales, les cas d'application par activité, les exemples de calcul et les réponses aux questions les plus fréquentes.",
  updatedAt: "2026-07-06",
  publishedAt: "2026-07-04",
  keywords: [
    "taux TVA",
    "TVA France",
    "TVA 20 %",
    "TVA 10 %",
    "TVA 5,5 %",
    "TVA 2,1 %",
    "taux TVA photographe",
    "taux TVA artisan",
    "taux TVA restauration",
    "taux réduit TVA",
    "TVA DOM",
    "calcul TVA HT TTC",
  ],

  introduction: [
    "En France métropolitaine, la TVA s'applique à quatre taux : 20 % (normal), 10 % (intermédiaire), 5,5 % (réduit) et 2,1 % (particulier).",
    "Ce guide détaille chaque taux, indique le taux généralement applicable par métier, et fournit des dizaines d'exemples concrets — avec montants HT, TVA et TTC — pour facturer au bon taux.",
    "Chaque opération a son propre taux : le métier ne suffit jamais à le déterminer seul.",
  ],

  quickSummary: {
    title: "Les taux de TVA en 30 secondes",
    items: [
      { rate: "20 %", description: "Taux normal — majorité des biens et services" },
      { rate: "10 %", description: "Restauration, certains travaux, transport, hébergement" },
      { rate: "5,5 %", description: "Alimentation, livres, énergie domestique, certains équipements" },
      { rate: "2,1 %", description: "Médicaments remboursés, presse, cas très spécifiques" },
    ],
  },

  sections: [
    {
      id: "taux-tva-en-vigueur-france",
      title: "Quels sont les taux de TVA en vigueur en France ?",
      blocks: [
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Référence fiscale : la France métropolitaine compte quatre taux — 20 %, 10 %, 5,5 % et 2,1 % — définis aux articles 278 à 281 du CGI. Le taux applicable dépend de la nature de chaque opération, jamais du métier seul.",
          ],
        },
        {
          type: "paragraph",
          text: "Contrairement à une idée reçue, la TVA ne se choisit pas « selon son activité » : c'est un impôt indirect sur la consommation, dont le taux est fixé par le Code général des impôts (CGI) en fonction du bien ou du service vendu.",
        },
        {
          type: "table",
          caption: "Synthèse des taux — France métropolitaine (art. 278 à 281 du CGI)",
          headers: ["Taux", "Appellation", "Base légale", "Exemple (100 € HT)"],
          rows: [
            ["20 %", "Taux normal", "Art. 278 du CGI", "120,00 € TTC"],
            ["10 %", "Taux intermédiaire", "Art. 279 du CGI", "110,00 € TTC"],
            ["5,5 %", "Taux réduit", "Art. 278-0 bis du CGI", "105,50 € TTC"],
            ["2,1 %", "Taux particulier", "Art. 281 du CGI", "102,10 € TTC"],
          ],
        },
        {
          type: "illustration",
          id: "vat-rates-pyramid",
          caption:
            "Du taux normal (20 %) aux exceptions les plus rares (2,1 %) : plus le taux est bas, plus la catégorie est encadrée.",
        },
        {
          type: "list",
          items: [
            "Le taux normal s'applique par défaut dès qu'aucun taux réduit n'est prévu.",
            "Un même professionnel peut facturer plusieurs taux selon ses opérations.",
            "Le mauvais taux expose à un redressement et au rejet de la TVA par le client.",
          ],
        },
        {
          type: "illustration",
          id: "vat-rate-timeline",
          caption:
            "Chronologie pratique : identifier la nature de l'opération, rapprocher la catégorie CGI, appliquer le taux, puis ventiler la facture.",
        },
        LINK_FRANCHISE,
      ],
    },

    {
      id: "taux-normal-tva-20",
      title: "Qu'est-ce que le taux normal de TVA à 20 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans la majorité des cas, le taux normal de 20 % s'applique en France métropolitaine (art. 278 du CGI). Il concerne toute opération taxable non visée par un taux réduit ou une exonération.",
        },
        {
          type: "list",
          items: [
            "Prestations de services : conseil, développement web, photographie, design.",
            "Vente de biens courants : mobilier, électroménager, vêtements neufs.",
            "Travaux neufs de construction (hors logements sociaux éligibles au 5,5 %).",
            "Boissons alcoolisées, même servies en restauration.",
          ],
        },
        pc(
          "Consultant — mission de conseil stratégique (3 jours)",
          2550,
          20,
          "Prestation intellectuelle B2B — art. 278 du CGI.",
        ),
        pc(
          "Photographe — séance corporate et retouches",
          1200,
          20,
          "Prestation de service, pas de vente de support physique.",
        ),
        pc(
          "Développeur web — refonte de site vitrine",
          2200,
          20,
          "Création sur mesure = prestation de service.",
        ),
        pc(
          "Graphiste — identité visuelle complète",
          650,
          20,
          "Design et livraison de fichiers sources.",
        ),
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : en cas de doute, le taux normal s'impose — sauf si l'opération entre explicitement dans une liste de taux réduits au CGI.",
          ],
        },
        LINK_FACTURE,
        CTA_CALCULATOR,
      ],
    },

    {
      id: "taux-intermediaire-tva-10",
      title: "Quand applique-t-on le taux intermédiaire de 10 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "En pratique, le taux de 10 % est prévu à l'article 279 du CGI pour des secteurs identifiés par le législateur — sous conditions précises, opération par opération.",
        },
        {
          type: "table",
          caption: "Principales catégories au taux de 10 % (art. 279 du CGI)",
          headers: ["Secteur", "Exemples", "Calcul (100 € HT)"],
          rows: [
            ["Restauration", "Repas sur place, plats à emporter (sous conditions)", "110,00 € TTC"],
            ["Travaux de rénovation", "Logement achevé depuis plus de 2 ans", "110,00 € TTC"],
            ["Transport de voyageurs", "Transport ferroviaire, fluvial, routier éligible", "110,00 € TTC"],
            ["Hébergement", "Hôtellerie, para-hôtellerie (sous conditions)", "110,00 € TTC"],
          ],
        },
        pc(
          "Restaurant — repas consommés sur place",
          85,
          10,
          "Prestation de restauration — art. 279 du CGI. Les alcools de la même addition restent à 20 %.",
        ),
        pc(
          "Artisan plombier — rénovation salle de bain",
          3240,
          10,
          "Logement achevé depuis plus de 2 ans — art. 279, 1° du CGI.",
        ),
        pc(
          "Peintre — rénovation appartement ancien",
          2600,
          10,
          "Travaux d'entretien et d'amélioration sur logement > 2 ans.",
        ),
        pc(
          "Vente à emporter — plat préparé par un traiteur",
          28,
          10,
          "Sous conditions de qualification en prestation de restauration.",
        ),
        pc(
          "Plateforme type Uber Eats — commission sur commande",
          4.5,
          20,
          "La commission de mise en relation est une prestation de service à 20 %, distincte du repas livré (souvent 10 % côté restaurateur).",
        ),
        {
          type: "illustration",
          id: "vat-mixed-invoice",
          caption:
            "Exemple de facture mixte en restauration : repas à 10 % et boissons alcoolisées à 20 % sur une même addition.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Point de vigilance : les travaux à 10 % exigent un logement achevé depuis plus de deux ans. Les travaux neufs ou sur logement de moins de deux ans relèvent en principe du taux normal.",
          ],
        },
        CTA_CALCULATOR,
      ],
      subsections: [
        {
          id: "tva-10-travaux-renovation",
          title: "Quels travaux de rénovation sont au taux de 10 % ?",
          blocks: [
            {
              type: "paragraph",
              text: "Il faut distinguer rénovation et construction neuve : les travaux d'amélioration, de transformation et d'entretien d'un logement achevé depuis plus de deux ans bénéficient du taux de 10 % (art. 279, 1° du CGI).",
            },
            {
              type: "list",
              items: [
                "Ravalement, isolation, remplacement de fenêtres.",
                "Plomberie, électricité, carrelage dans un logement existant.",
                "Travaux d'accessibilité pour personnes âgées ou handicapées (sous conditions).",
              ],
            },
            pc(
              "Électricien — installation neuve sur construction < 2 ans",
              4200,
              20,
              "Travaux neufs : taux normal — art. 278 du CGI.",
            ),
            pc(
              "Plombier — dépannage sur logement de plus de 2 ans",
              1800,
              10,
              "Rénovation éligible — adresse du chantier obligatoire sur la facture. Attestation client requise selon les cas (art. 279 du CGI).",
            ),
            {
              type: "callout",
              variant: "legal",
              paragraphs: [
                "Référence fiscale : l'application du taux de 10 % (ou du 5,5 % pour certains travaux d'amélioration énergétique) est subordonnée au respect des conditions prévues par la réglementation, notamment la remise par le client de l'attestation appropriée lorsque celle-ci est exigée.",
              ],
            },
          ],
        },
        {
          id: "tva-10-restauration",
          title: "La restauration est-elle toujours à 10 % ?",
          blocks: [
            {
              type: "paragraph",
              text: "Non. Le critère déterminant n'est pas uniquement « sur place ou à emporter », mais la nature du produit et les conditions de consommation : consommation immédiate ou consommation différée (art. 279 et 278-0 bis du CGI). Un restaurateur peut ainsi appliquer 10 %, 5,5 % ou 20 % sur une même période.",
            },
            {
              type: "table",
              caption: "Restauration — consommation immédiate ou différée (synthèse)",
              headers: ["Situation", "Type de consommation", "Taux en principe"],
              rows: [
                [
                  "Repas servi sur place",
                  "Immédiate",
                  "10 % (prestation de restauration)",
                ],
                [
                  "Plat préparé à emporter par un restaurant ou traiteur",
                  "Immédiate (sous conditions)",
                  "10 %",
                ],
                [
                  "Produit alimentaire vendu en l'état (épicerie, rayon frais)",
                  "Différée",
                  "5,5 %",
                ],
                [
                  "Produit emballé, destiné à une consommation ultérieure",
                  "Différée",
                  "5,5 %",
                ],
                [
                  "Boisson alcoolisée",
                  "Quel que soit le mode de vente",
                  "20 %",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "La frontière entre alimentaire à 5,5 % et restauration à 10 % repose sur le degré de transformation et le mode de consommation prévu, pas sur le libellé « restaurant » ou « commerce alimentaire ».",
            },
            {
              type: "callout",
              variant: "hint",
              paragraphs: [
                "Astuce : un plat chaud préparé pour être consommé dans la journée relève en principe de la restauration (10 %). Un produit alimentaire acheté pour être consommé plus tard à domicile relève en principe du taux alimentaire (5,5 %).",
              ],
            },
            pc(
              "Restaurant — repas consommés sur place",
              85,
              10,
              "Prestation de restauration — consommation immédiate (art. 279 du CGI).",
            ),
            pc(
              "Restaurant — livraison de repas à domicile",
              45,
              10,
              "Sous conditions de qualification en prestation de restauration — à distinguer de la simple vente alimentaire.",
            ),
            pc(
              "Restaurant — bouteille de vin servie à table",
              32,
              20,
              "Boisson alcoolisée — taux normal (art. 278 du CGI), même en restauration.",
            ),
          ],
        },
        {
          id: "tva-boissons-non-alcoolisees",
          title: "Quel taux pour les boissons non alcoolisées ?",
          blocks: [
            {
              type: "paragraph",
              text: "Les boissons sans alcool ne suivent pas un taux unique : le mode de vente et la consommation prévue font la différence.",
            },
            {
              type: "table",
              caption: "Boissons non alcoolisées — repères pratiques",
              headers: ["Situation", "Taux en principe"],
              rows: [
                [
                  "Boisson servie sur place avec un repas (restaurant, café)",
                  "10 % — même taux que la prestation de restauration",
                ],
                [
                  "Boisson prête à être consommée, vendue à emporter par un restaurateur",
                  "10 % sous conditions (consommation immédiate)",
                ],
                [
                  "Boisson vendue en grande surface pour consommation à domicile",
                  "5,5 % — produit alimentaire à consommation différée",
                ],
                [
                  "Eau, jus ou soda en bouteille (vente au détail)",
                  "5,5 % en principe (hors cas spécifiques)",
                ],
              ],
            },
            {
              type: "callout",
              variant: "verify",
              paragraphs: [
                "À retenir : l'alcool reste toujours à 20 % (art. 278 du CGI). Pour les boissons non alcoolisées, qualifiez chaque ligne selon le lieu de vente et la consommation prévue — immédiate ou différée.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "taux-reduit-tva-5-5",
      title: "Quels produits et services sont au taux réduit de 5,5 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "Lorsqu'un professionnel vend des produits de première nécessité ou des biens culturels, le taux de 5,5 % entre souvent en jeu — il est défini à l'article 278-0 bis du CGI.",
        },
        {
          type: "table",
          caption: "Principales catégories au taux de 5,5 % (art. 278-0 bis du CGI)",
          headers: ["Catégorie", "Exemples", "Calcul (100 € HT)"],
          rows: [
            ["Alimentation", "Produits alimentaires (hors restauration et alcools)", "105,50 € TTC"],
            ["Livres et presse", "Livres papier, ebooks, abonnements presse", "105,50 € TTC"],
            ["Énergie", "Électricité, gaz (usage domestique)", "105,50 € TTC"],
            ["Accessibilité PMR", "Équipements pour personnes handicapées", "105,50 € TTC"],
          ],
        },
        pc(
          "Librairie — vente d'ouvrages papier",
          450,
          5.5,
          "Livres éligibles — art. 278-0 bis du CGI.",
        ),
        pc(
          "Épicerie — panier alimentaire courant",
          120,
          5.5,
          "Produits alimentaires hors restauration et alcools.",
        ),
        pc(
          "Boulangerie — vente de pain et viennoiseries",
          15,
          5.5,
          "Produits de boulangerie de consommation courante.",
        ),
        pc(
          "Éditeur — vente d'e-book",
          12,
          5.5,
          "Publication électronique assimilée au livre papier, sous conditions.",
        ),
        pc(
          "Photographe — vente d'album photo relié",
          350,
          20,
          "Tirage et album = vente de bien, en principe à 20 % — à distinguer de la prestation de séance.",
        ),
      ],
      subsections: [
        {
          id: "tva-5-5-alimentation",
          title: "Quels produits alimentaires sont à 5,5 % ?",
          blocks: [
            {
              type: "paragraph",
              text: "La plupart des produits alimentaires de consommation courante sont à 5,5 %. Exclus : boissons alcoolisées, certains produits de luxe alimentaire et la restauration (10 %).",
            },
            {
              type: "list",
              items: [
                "Fruits, légumes, viandes, poissons, produits laitiers.",
                "Pain, pâtes, riz, conserves alimentaires.",
                "Eau potable en bouteille (hors cas spécifiques au taux normal).",
              ],
            },
          ],
        },
        {
          id: "tva-5-5-energie",
          title: "L'énergie est-elle toujours à 5,5 % ?",
          blocks: [
            {
              type: "paragraph",
              text: "L'électricité et le gaz naturel à usage domestique bénéficient du taux de 5,5 %. L'énergie à usage professionnel ou industriel relève en principe du taux normal.",
            },
            {
              type: "callout",
              variant: "verify",
              paragraphs: [
                "À vérifier : le taux dépend de l'usage (domestique ou professionnel), pas uniquement du type d'énergie.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "taux-particulier-tva-2-1",
      title: "À quoi correspond le taux particulier de 2,1 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "Moins connu mais stratégique pour la santé et la presse : le taux de 2,1 % est le plus bas en métropole (art. 281 du CGI) et concerne un nombre restreint de produits à forte utilité sociale.",
        },
        {
          type: "list",
          items: [
            "Médicaments remboursables par l'Assurance maladie.",
            "Certains produits de presse (quotidiens, périodiques sous conditions).",
            "Redevance audiovisuelle (contribution à l'audiovisuel public).",
            "Certains spectacles vivants (sous conditions spécifiques).",
          ],
        },
        pc("Pharmacie — médicament remboursable", 50, 2.1),
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : les médicaments non remboursables relèvent en principe du taux normal de 20 %, sauf exception légale.",
          ],
        },
      ],
    },

    {
      id: "taux-tva-outre-mer-dom",
      title: "Quels sont les taux de TVA en Outre-mer (DOM) ?",
      blocks: [
        {
          type: "paragraph",
          text: "Attention : en Guadeloupe, Martinique et La Réunion, des taux spécifiques s'appliquent (art. 297 et 298 du CGI). La Guyane et Mayotte relèvent de régimes fiscaux distincts — ne pas appliquer les taux métropolitains.",
        },
        {
          type: "table",
          caption: "Taux DOM — Guadeloupe, Martinique, La Réunion (art. 297 et 298 du CGI)",
          headers: ["Taux DOM", "Équivalent métropolitain", "Exemple (100 € HT)"],
          rows: [
            ["8,5 %", "Taux normal (20 %)", "108,50 € TTC"],
            ["2,1 %", "Taux intermédiaire (10 %)", "102,10 € TTC"],
            ["1,75 %", "Taux réduit (5,5 %)", "101,75 € TTC"],
            ["1,05 %", "Taux particulier (2,1 %)", "101,05 € TTC"],
          ],
        },
        {
          type: "illustration",
          id: "vat-rates-dom",
          caption:
            "Les quatre niveaux de taux existent en métropole et en DOM — seuls les pourcentages changent.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Référence fiscale : un professionnel en DOM applique les taux des art. 297 et 298 du CGI, pas ceux de la métropole.",
          ],
        },
      ],
    },

    {
      id: "taux-tva-par-metier-activite",
      title: "Quel taux de TVA selon votre métier ou activité ?",
      blocks: [
        {
          type: "paragraph",
          text: "Lorsqu'un professionnel cherche « quel taux pour mon métier », la réponse dépend toujours de la nature exacte de chaque opération — pas du libellé de l'activité. Cette section répond aux recherches les plus fréquentes, avec des nuances par type de prestation.",
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : croire qu'un métier impose un taux unique. Deux photographes, deux artisans ou deux commerçants peuvent facturer des taux différents sur la même période.",
          ],
        },
        {
          type: "profession-faq",
          items: [...PROFESSION_FAQ_ITEMS],
        },
        {
          type: "table",
          caption: "Récapitulatif — activité, taux en principe et point de vigilance",
          headers: ["Activité", "Taux en principe", "Point de vigilance"],
          rows: [
            ["Prestation intellectuelle (consultant, dev, graphiste)", "20 %", "Art. 278 du CGI — vérifier si un produit livré change la qualification"],
            ["Avocat", "20 %", "Honoraires — art. 278 ; autoliquidation UE possible (art. 259 B)"],
            ["Coiffeur / esthétique", "20 %", "Prestation de service — art. 278 du CGI"],
            ["Agence web", "20 %", "Création, maintenance, conseil digital — art. 278"],
            ["Artisan en rénovation", "10 %", "Logement achevé depuis +2 ans, attestation si requise"],
            ["Restauration", "10 %", "Consommation immédiate — alcools à 20 %, ventilation obligatoire"],
            ["Commerce alimentaire", "5,5 %", "Consommation différée — distinguer de la restauration"],
            ["VTC / taxi", "10 %", "Transport de voyageurs — art. 279 ; prestations annexes à 20 %"],
            ["Librairie / ebook", "5,5 %", "Ouvrages éligibles — art. 278-0 bis du CGI"],
            ["Export hors UE", "0 % (exonération)", "Art. 262, I du CGI — justificatifs de sortie"],
            ["Prestation B2B en UE", "0 % (autoliquidation)", "Art. 259 B du CGI — n° TVA intracommunautaire"],
          ],
        },
        CTA_CALCULATOR,
        LINK_AE,
      ],
    },

    {
      id: "choisir-bon-taux-tva",
      title: "Comment choisir le bon taux de TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il faut distinguer la règle générale de ses exceptions : le taux dépend de la nature de chaque opération, et chaque ligne de facture doit porter le taux correspondant au produit ou à la prestation vendue.",
        },
        {
          type: "illustration",
          id: "vat-rate-timeline",
          caption: "Les quatre étapes pour choisir le bon taux avant de facturer.",
        },
        {
          type: "steps",
          items: [
            { title: "Identifiez la nature de l'opération", description: "Bien ou service ? Travaux neufs ou rénovation ? Alimentaire ou restauration ?" },
            { title: "Consultez la catégorie légale", description: "Rapprochez l'opération des art. 278 à 281 du CGI (ou 297-298 en DOM)." },
            { title: "Appliquez le taux ou le taux normal", description: "Catégorie réduite identifiée ? Appliquez ce taux. Sinon, 20 % (ou 8,5 % en DOM)." },
            { title: "Ventilez sur la facture", description: "Plusieurs taux ? Regroupez HT et TVA par taux en bas de page." },
          ],
        },
        {
          type: "illustration",
          id: "vat-rate-selection",
          caption: "Arbre de décision : la nature de l'opération détermine le taux — pas le métier.",
        },
        {
          type: "illustration",
          id: "vat-territory-flow",
          caption: "France, Union européenne, hors UE : le lieu et le type de client (B2B ou B2C) modifient le taux applicable.",
        },
        {
          type: "illustration",
          id: "vat-b2b-b2c",
          caption: "Comparaison B2B et B2C : en France comme à l'international, le statut du client change le traitement TVA.",
        },
        {
          type: "illustration",
          id: "vat-invoice-annotated",
          caption: "Facture annotée : HT, TVA par taux, TTC et ventilation obligatoire en bas de page.",
        },
        {
          type: "checklist",
          title: "Checklist — comment choisir le bon taux de TVA ?",
          items: [
            "Nature exacte du bien ou service identifiée (pas seulement le secteur d'activité).",
            "Taux vérifié dans le CGI (art. 278 à 281) ou le BOFiP pour les cas complexes.",
            "Travaux : logement achevé depuis plus de 2 ans ? Travaux neufs ou rénovation ?",
            "Alimentation : produit brut ou prestation de restauration ?",
            "Énergie : usage domestique ou professionnel ?",
            "Taux indiqué sur chaque ligne, avec ventilation par taux en bas de facture.",
            "En cas de doute persistant : avis de l'expert-comptable ou rescrit fiscal.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Opérations internationales : les ventes à l'export, les prestations intracommunautaires et les opérations avec des clients étrangers obéissent à des règles de territorialité spécifiques (art. 259 B, 262 et 283-2 du CGI). Les exemples ci-dessous ne constituent qu'un aperçu — un guide dédié à la TVA internationale et aux exportations complétera prochainement ces situations.",
          ],
        },
        pc(
          "Prestation B2B France — conseil en management",
          1500,
          20,
          "Client professionnel assujetti en France — TVA française collectée.",
        ),
        pc(
          "Prestation B2B UE — développement pour client allemand",
          1500,
          0,
          "Autoliquidation par le client — art. 259 B du CGI. Mention « autoliquidation » obligatoire.",
        ),
        pc(
          "Export hors UE — vente de matériel vers les États-Unis",
          2000,
          0,
          "Exonération export — art. 262, I du CGI. Justificatifs de sortie requis.",
        ),
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : le taux normal est la règle. Les taux réduits sont des exceptions encadrées — ne les appliquez qu'après vérification.",
          ],
        },
        LINK_FACTURE,
        LINK_DEDUCTIBLE,
      ],
    },

    {
      id: "erreurs-frequentes-taux-tva",
      title: "Quelles erreurs fréquentes commettre sur les taux de TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une erreur fréquente consiste à appliquer le taux « habituel » de son secteur sans vérifier l'opération — ces erreurs entraînent des redressements, le rejet de TVA déductible par les clients et des pénalités.",
        },
        {
          type: "checklist",
          title: "Les erreurs les plus fréquentes",
          items: [
            "Croire que toute la restauration est à 10 % — sans distinguer consommation immédiate et différée, ni ventiler les alcools à 20 %.",
            "Oublier les conditions des travaux à taux réduit — logement de plus de deux ans, nature des travaux, attestation client lorsque requise (art. 279 du CGI).",
            "Penser qu'un auto-entrepreneur ne facture jamais de TVA — en franchise en base (art. 293 B du CGI), oui ; assujetti ou au-delà des seuils, les taux ordinaires s'appliquent.",
            "Confondre les taux entre eux (5,5 %, 10 %, 20 %) ou appliquer le taux le plus bas sans qualification juridique.",
          ],
        },
        {
          type: "list",
          items: [
            "Choisir un taux selon le métier plutôt que selon la nature de l'opération.",
            "Appliquer 10 % à des travaux neufs ou sur un logement de moins de deux ans.",
            "Confondre vente alimentaire (5,5 %) et restauration (10 %).",
            "Oublier de ventiler les alcools à 20 % dans une addition de restaurant.",
            "Appliquer le taux métropolitain en DOM (ou inversement).",
            "Facturer de la TVA en franchise en base sans y être assujetti.",
          ],
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : appliquer systématiquement le taux le plus bas « pour être compétitif » sans vérification légale. C'est une irrégularité sanctionnée par l'administration fiscale.",
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Astuce : avant chaque facture, identifiez la nature de l'opération, vérifiez le taux au CGI, puis contrôlez HT + TVA = TTC.",
          ],
        },
        CTA_CALCULATOR,
        LINK_FRANCHISE,
      ],
    },

    {
      id: "calculer-tva-selon-taux",
      title: "Comment calculer la TVA selon le taux applicable ?",
      blocks: [
        {
          type: "paragraph",
          text: "Deux formules couvrent la quasi-totalité des situations professionnelles — à appliquer ligne par ligne lorsque plusieurs taux coexistent sur une même facture.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "HT vers TTC : TTC = HT × (1 + taux). Exemple : 800 € HT à 20 % → 960 € TTC.",
            "TTC vers HT : HT = TTC ÷ (1 + taux). Exemple : 960 € TTC à 20 % → 800 € HT.",
            "TVA seule : TVA = HT × taux. Exemple : 800 € × 0,20 = 160 €.",
          ],
        },
        {
          type: "table",
          caption: "Exemples HT → TTC par taux (France métropolitaine)",
          headers: ["Montant HT", "Taux", "TVA", "Montant TTC"],
          rows: [
            ["1 000,00 €", "20 %", "200,00 €", "1 200,00 €"],
            ["1 000,00 €", "10 %", "100,00 €", "1 100,00 €"],
            ["1 000,00 €", "5,5 %", "55,00 €", "1 055,00 €"],
            ["350,00 €", "5,5 %", "19,25 €", "369,25 €"],
            ["2 500,00 €", "20 %", "500,00 €", "3 000,00 €"],
          ],
        },
        {
          type: "illustration",
          id: "vat-calculation",
          caption: "Schéma de calcul : du montant HT au montant TTC selon le taux appliqué.",
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Vérifiez vos montants instantanément avec le",
          label: "calculateur HT vers TTC",
          href: "/",
        },
        {
          type: "practical-case",
          title: "Facture mixte B2B — conseil + livres",
          ht: "2 300,00 €",
          rate: "20 % + 5,5 %",
          vat: "416,50 €",
          ttc: "2 716,50 €",
          note: "2 000 € HT conseil à 20 % (TVA 400 €) + 300 € HT livres à 5,5 % (TVA 16,50 €).",
        },
        {
          type: "practical-case",
          title: "Facture mixte artisan — déplacement + main-d'œuvre + matériaux",
          ht: "1 580,00 €",
          rate: "10 %",
          vat: "158,00 €",
          ttc: "1 738,00 €",
          note: "80 € HT déplacement + 1 200 € HT pose + 300 € HT robinetterie fournie, tous à 10 % (rénovation).",
        },
        {
          type: "practical-case",
          title: "Facture mixte restaurant — repas, alcool et livraison",
          ht: "105,00 €",
          rate: "10 % + 20 %",
          vat: "14,00 €",
          ttc: "119,00 €",
          note: "70 € HT repas (10 %, TVA 7 €) + 25 € HT vin (20 %, TVA 5 €) + 10 € HT frais de livraison (20 %, TVA 2 €). Trois taux sur une même addition.",
        },
        {
          type: "practical-case",
          title: "Facture à deux taux — restaurant",
          ht: "117,00 €",
          rate: "10 % + 20 %",
          vat: "14,90 €",
          ttc: "131,90 €",
          note: "85 € HT repas (10 %, TVA 8,50 €) + 32 € HT vin (20 %, TVA 6,40 €).",
        },
        {
          type: "illustration",
          id: "vat-mixed-invoice",
          caption: "Ventilation obligatoire lorsqu'une facture comporte plusieurs taux de TVA.",
        },
        CTA_CALCULATOR,
        LINK_DEDUCTIBLE,
      ],
    },
  ],

  faqTitle: "Questions fréquentes sur les taux de TVA",

  faq: GUIDE_FAQ,

  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "Le taux normal est de 20 % — c'est la règle par défaut en France métropolitaine.",
      "Les taux réduits (10 %, 5,5 %, 2,1 %) sont des exceptions strictement encadrées par le CGI.",
      "Le taux dépend de la nature de l'opération, jamais du métier ou du statut du vendeur.",
      "Les DOM appliquent des taux spécifiques (art. 297 et 298 du CGI).",
      "En cas de doute, vérifiez avant de facturer — le taux normal s'impose en l'absence de catégorie réduite.",
    ],
    closingText:
      "Avant de facturer ou de valider un devis, calculez vos montants HT, TVA et TTC au bon taux en quelques secondes.",
    closingCta: {
      label: "Calculer HT → TTC maintenant",
      href: "/",
    },
  },

  sidebar: {
    calculator: {
      title: "Calculateur HT ↔ TTC",
      description: "Calculez la TVA et le TTC selon le taux applicable à votre opération.",
      href: "/",
    },
    relatedGuides: [
      {
        label: "Facturation",
        title: "Comment faire une facture conforme",
        href: "/guides/comment-faire-une-facture-conforme",
      },
      {
        label: "Régime",
        title: "Franchise en base de TVA",
        href: "/guides/franchise-en-base-de-tva",
      },
      {
        label: "Auto-entrepreneur",
        title: "TVA et auto-entrepreneur",
        href: "/guides/tva-et-auto-entrepreneur",
      },
      {
        label: "Comptabilité",
        title: "TVA déductible et TVA collectée",
        href: "/guides/tva-deductible-et-tva-collectee",
      },
    ],
    discover: [
      { title: "Calculateur HT vers TTC", href: "/" },
      { title: "Tous les simulateurs", href: "/simulateurs" },
    ],
  },
};
