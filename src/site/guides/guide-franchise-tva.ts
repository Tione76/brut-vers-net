import type { Guide } from "./types";
import {
  FRANCHISE_THRESHOLD_ROWS,
  FRANCHISE_THRESHOLDS_META,
  formatThreshold,
} from "./guide-franchise-thresholds";
import {
  CTA_CALCULATOR,
  ELIGIBILITY_TABLE_ROWS,
  ERRORS_ROWS,
  GUIDE_FAQ,
  PRACTICAL_CASE_ROWS,
} from "./guide-franchise-tva-data";

const THRESHOLD_TABLE_ROWS = FRANCHISE_THRESHOLD_ROWS.map((row) => [
  row.activity,
  formatThreshold(row.base),
  formatThreshold(row.major),
  "Base (N-1) dépassée → TVA au 1er janv. suivant ; majoré (année N) dépassé → TVA dès le jour du dépassement",
]);

const LINK_TAUX = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Une fois assujetti, le taux applicable dépend de la nature de chaque opération — consultez notre",
  label: "guide des taux de TVA en France",
  href: "/guides/quels-sont-les-taux-de-tva-en-france",
};

const LINK_FACTURE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Pour toutes les mentions obligatoires au-delà de la franchise, voir",
  label: "Comment faire une facture conforme",
  href: "/guides/comment-faire-une-facture-conforme",
};

const LINK_AE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Micro-entrepreneur : le lien entre statut micro et régime TVA est détaillé dans",
  label: "TVA et auto-entrepreneur",
  href: "/guides/tva-et-auto-entrepreneur",
};

const LINK_DEDUCTIBLE = {
  type: "internal-link" as const,
  variant: "guide" as const,
  intro: "Après assujettissement, maîtrisez la différence entre",
  label: "TVA déductible et TVA collectée",
  href: "/guides/tva-deductible-et-tva-collectee",
};

export const guideFranchiseTva: Guide = {
  slug: "franchise-en-base-de-tva",
  title: "Franchise en base de TVA : guide complet 2026 (article 293 B du CGI)",
  description:
    "Guide de référence 2026 sur la franchise en base de TVA : art. 293 B du CGI, seuils 85 000 € et 37 500 €, mention sur facture, dépassement, option volontaire et cas pratiques.",
  subtitle:
    "Définition, seuils officiels, obligations de facturation, sortie de franchise, avantages et inconvénients, cas pratiques par métier et 35 réponses aux questions les plus fréquentes.",
  updatedAt: "2026-07-06",
  publishedAt: "2026-07-04",
  keywords: [
    "franchise en base TVA",
    "franchise en base de TVA",
    "TVA non applicable article 293 B",
    "article 293 B CGI",
    "seuil franchise TVA",
    "seuil TVA micro entreprise",
    "micro entrepreneur TVA",
    "dépasser seuil TVA",
    "facture sans TVA",
    "mention TVA non applicable",
    "auto entrepreneur TVA",
    "franchise TVA profession libérale",
    "franchise TVA artisan",
    "option TVA art 293 C",
    "récupération TVA franchise",
  ],

  introduction: [
    "La franchise en base de TVA est un régime fiscal qui permet aux très petites entreprises de ne pas facturer la TVA à leurs clients, tant que leur chiffre d'affaires reste sous des plafonds fixés par la loi (art. 293 B du CGI).",
    "Elle existe pour alléger les formalités des entreprises en démarrage ou à faible volume d'activité : pas de collecte de TVA, pas de déclaration CA3/CA12, mais aussi pas de récupération de TVA sur les achats.",
    "Ce guide explique qui est concerné, les seuils applicables en 2026, comment facturer, que faire en cas de dépassement, et répond à toutes les questions pratiques des entrepreneurs.",
  ],

  quickSummary: {
    title: "La franchise en base en 30 secondes",
    items: [
      { rate: "✓", description: "Pas de TVA facturée aux clients — prix nets affichés" },
      { rate: "✓", description: "Pas de TVA récupérable sur les achats professionnels" },
      { rate: "✓", description: "Mention obligatoire sur chaque facture (art. 293 B du CGI)" },
      { rate: "✓", description: "Seuils de CA à respecter — 37 500 € ou 85 000 € selon l'activité" },
    ],
  },

  sections: [
    {
      id: "quest-ce-que-la-franchise-en-base-de-tva",
      title: "Qu'est-ce que la franchise en base de TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Contrairement à une idée reçue, la franchise en base n'est pas un « statut » à choisir librement : c'est une exonération de TVA prévue à l'article 293 B du Code général des impôts (CGI), qui s'applique automatiquement lorsque les conditions sont remplies.",
        },
        {
          type: "paragraph",
          text: "Il faut distinguer trois notions souvent confondues : l'assujetti (entreprise relevant de la TVA en principe), l'exonéré (opération ou entreprise dispensée de taxe pour un motif légal), et la franchise (exonération liée au respect des seuils de chiffre d'affaires).",
        },
        {
          type: "list",
          items: [
            "Assujetti : l'entreprise relève du champ de la TVA — elle peut être en franchise ou au régime réel.",
            "Franchise en base (art. 293 B) : pas de TVA facturée ni reversée, sous les seuils.",
            "Exonération de plein droit : autre motif légal (santé, certaines formations…) — régime distinct de la franchise.",
          ],
        },
        {
          type: "illustration",
          id: "franchise-how-it-works",
          caption:
            "En franchise, le client paie un prix net ; l'entreprise ne collecte pas de TVA et ne récupère pas celle de ses fournisseurs.",
        },
        {
          type: "illustration",
          id: "franchise-comparison",
          caption: "Comparatif franchise en base vs entreprise assujettie au régime réel de TVA.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Référence fiscale : la franchise est définie aux articles 293-0 B à 293 F du CGI. L'article 293 B fixe les plafonds ; l'article 293 C prévoit l'option volontaire pour l'assujettissement.",
          ],
        },
        LINK_AE,
      ],
    },

    {
      id: "qui-peut-beneficier-de-la-franchise",
      title: "Qui peut bénéficier de la franchise ?",
      blocks: [
        {
          type: "paragraph",
          text: "En pratique, presque toute structure exerçant une activité économique taxable peut relever de la franchise — à condition que son chiffre d'affaires reste sous les seuils. Le statut juridique (micro-entrepreneur, EURL, SASU…) ne détermine pas à lui seul le régime de TVA.",
        },
        {
          type: "table",
          caption: "Éligibilité à la franchise en base de TVA par forme d'activité",
          headers: ["Activité / statut", "Éligible ?", "Conditions", "Exemple"],
          rows: ELIGIBILITY_TABLE_ROWS,
        },
        {
          type: "illustration",
          id: "franchise-decision-tree",
          caption: "Arbre de décision : êtes-vous en franchise en base de TVA ?",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Point de vigilance : certaines opérations sont exclues de la franchise dès le premier euro (opérations intracommunautaires spécifiques, certaines cessions d'immobilisations). Vérifiez la nature exacte de votre activité.",
          ],
        },
      ],
    },

    {
      id: "quels-sont-les-seuils-franchise-tva",
      title: "Quels sont les seuils ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les seuils de franchise dépendent de la nature de votre activité. Ils s'apprécient sur le chiffre d'affaires hors taxes, selon les règles de l'article 293 D du CGI.",
        },
        {
          type: "table",
          caption: `Seuils de franchise en base de TVA (${FRANCHISE_THRESHOLDS_META.year}) — ${FRANCHISE_THRESHOLDS_META.legalRef}`,
          headers: ["Type d'activité", "Seuil de base", "Seuil majoré", "Conséquences du dépassement"],
          rows: THRESHOLD_TABLE_ROWS,
        },
        {
          type: "illustration",
          id: "franchise-thresholds",
          caption:
            "Les deux catégories principales : prestations de services (37 500 € / 41 250 €) et ventes-hébergement (85 000 € / 93 500 €).",
        },
        {
          type: "paragraph",
          text: "En cas d'activité mixte (ventes et prestations de services), chaque catégorie de recettes est comparée à son propre seuil. Le seuil ventes (85 000 € / 93 500 €) ne permet pas de faire entrer les prestations de services : celles-ci restent soumises au seuil services (37 500 € / 41 250 €). Un dépassement sur l'une des catégories peut entraîner l'assujettissement de l'ensemble de l'entreprise (art. 293 B du CGI).",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : un artisan réalise 60 000 € HT de ventes de meubles et 35 000 € HT de prestations de pose. Les deux catégories restent sous leurs seuils respectifs — franchise en principe. Si les prestations atteignent 42 000 € HT, le seuil majoré services est dépassé : assujettissement en principe, pour l'ensemble de l'activité.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            `Attention : les seuils peuvent évoluer chaque année par la loi de finances. Montants applicables en ${FRANCHISE_THRESHOLDS_META.year} — ${FRANCHISE_THRESHOLDS_META.sourceNote}`,
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Astuce : le projet de seuil unique à 25 000 € (loi de finances 2025) a été abandonné par la loi n° 2025-1044 du 3 novembre 2025. Les seuils historiques restent en vigueur en 2026.",
          ],
        },
        CTA_CALCULATOR,
        LINK_TAUX,
      ],
    },

    {
      id: "que-se-passe-t-il-lorsqu-on-depasse-les-seuils",
      title: "Que se passe-t-il lorsqu'on dépasse les seuils ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il faut distinguer le dépassement du seuil de base et celui du seuil majoré — les conséquences ne sont pas les mêmes.",
        },
        {
          type: "list",
          items: [
            "Seuil de base dépassé (CA de l'année N-1) : assujettissement à la TVA au 1er janvier de l'année suivante.",
            "Seuil majoré dépassé (CA de l'année en cours N) : assujettissement dès le 1er jour du dépassement.",
            "Année de création : le CA est proratisé sur une année complète pour l'appréciation des seuils.",
          ],
        },
        {
          type: "illustration",
          id: "franchise-exit-flow",
          caption:
            "Chronologie : de la franchise au régime réel de TVA, avec déclarations et droit à déduction.",
        },
        {
          type: "table",
          caption: "Exemple — consultante en prestations de services (seuils : 37 500 € / 41 250 €)",
          headers: ["Période", "CA HT", "Situation", "Régime TVA"],
          rows: [
            ["2024", "32 000 €", "Sous le seuil de base", "Franchise"],
            ["2025", "39 000 €", "Dépasse le seuil de base, reste sous le majoré", "Franchise jusqu'au 31/12/2025"],
            ["2026", "—", "CA 2025 > 37 500 €", "Assujettie au 1er janvier 2026"],
          ],
        },
        {
          type: "table",
          caption: "Exemple — dépassement du seuil majoré en cours d'année",
          headers: ["Événement", "Conséquence"],
          rows: [
            ["CA cumulé atteint 41 251 € en septembre (services)", "Assujettissement dès le 1er jour du dépassement"],
            ["Factures suivantes", "HT + TVA au taux applicable, déclarations CA3 ou CA12"],
            ["Achats professionnels", "TVA déductible à partir de l'assujettissement"],
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : configurez une alerte à 80 % du seuil majoré. Anticipez le passage à la TVA (tarifs, logiciel de facturation, expert-comptable) avant la fin de l'année.",
          ],
        },
        CTA_CALCULATOR,
        LINK_DEDUCTIBLE,
      ],
    },

    {
      id: "les-avantages-de-la-franchise",
      title: "Les avantages de la franchise en base de TVA",
      blocks: [
        {
          type: "paragraph",
          text: "Pour une entreprise en démarrage ou à faible volume, la franchise offre une simplicité réelle — à condition d'accepter ses limites.",
        },
        {
          type: "checklist",
          title: "Avantages principaux",
          items: [
            "Moins de formalités : pas de déclaration de TVA (CA3, CA12).",
            "Prix plus lisibles pour les particuliers : montant unique, sans taxe ajoutée.",
            "Gestion simplifiée : pas de calcul ni de reversement de TVA.",
            "Pas de numéro de TVA intracommunautaire obligatoire sur une facture française classique.",
            "Comptabilité allégée pour les micro-entrepreneurs (livre des recettes).",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : pour un client particulier, un prix de 100 € en franchise coûte exactement 100 €. Un concurrent assujetti à 20 % facture 100 € HT + 20 € de TVA = 120 € TTC.",
          ],
        },
      ],
    },

    {
      id: "les-inconvenients-de-la-franchise",
      title: "Les inconvénients de la franchise en base de TVA",
      blocks: [
        {
          type: "paragraph",
          text: "La franchise n'est pas toujours l'option la plus avantageuse. Dès que l'activité se développe ou que les clients sont majoritairement des entreprises, ses limites apparaissent.",
        },
        {
          type: "checklist",
          title: "Inconvénients à anticiper",
          items: [
            "TVA non récupérable tant que vous êtes en franchise : la taxe sur vos achats reste une charge intégrale.",
            "Croissance : dépassement des seuils = bascule obligatoire vers la TVA.",
            "Clients professionnels : ils ne peuvent pas déduire de TVA sur vos factures.",
            "Investissements lourds : matériel, véhicule, local — la TVA payée n'est pas récupérable.",
            "Image B2B : certains grands comptes préfèrent des fournisseurs assujettis.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : achat d'un ordinateur à 1 200 € TTC (1 000 € HT + 200 € TVA). En franchise, charge = 1 200 €. En régime réel, charge nette = 1 000 € si la TVA est déductible.",
          ],
        },
      ],
    },

    {
      id: "comment-etablir-une-facture-franchise",
      title: "Comment établir une facture en franchise ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une facture en franchise doit être conforme aux règles générales de facturation, avec une mention spécifique obligatoire et l'absence totale de TVA.",
        },
        {
          type: "illustration",
          id: "franchise-invoice-annotated",
          caption:
            "Facture annotée : numéro, date, client, montant net et mention « TVA non applicable, art. 293 B du CGI ».",
        },
        {
          type: "table",
          caption: "Mentions obligatoires sur une facture en franchise",
          headers: ["Élément", "Exigence", "Franchise"],
          rows: [
            ["Mention TVA", "TVA non applicable, art. 293 B du CGI", "Obligatoire"],
            ["Montant", "Prix net — pas de ligne TVA", "Obligatoire"],
            ["SIRET / identité vendeur", "Nom, adresse, SIRET", "Obligatoire"],
            ["Client B2B", "Nom, adresse du client", "Obligatoire"],
            ["N° TVA intracommunautaire", "Non requis pour une facture française classique ; règles spécifiques possibles en intracommunautaire", "Non"],
          ],
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : afficher un taux de TVA (20 %, 10 %…) ou un montant de TVA alors que vous êtes en franchise. C'est une irrégularité sanctionnable.",
          ],
        },
        LINK_FACTURE,
        CTA_CALCULATOR,
      ],
    },

    {
      id: "recuperation-tva-franchise",
      title: "Quels achats permettent de récupérer la TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Tant que vous êtes en franchise en base de TVA, vous ne pouvez pas déduire la TVA sur vos achats professionnels. La taxe payée à vos fournisseurs constitue une charge intégrée au coût d'achat — matériel, logiciels, loyer, prestations, frais de déplacement. Après sortie de franchise ou en cas d'option pour la TVA (art. 293 C), le droit à déduction peut s'ouvrir selon les règles applicables.",
        },
        {
          type: "paragraph",
          text: "Exemples en franchise :",
        },
        {
          type: "list",
          items: [
            "Ordinateur à 1 200 € TTC → charge de 1 200 € (pas 1 000 €).",
            "Abonnement logiciel 59 € TTC/mois → charge de 59 €.",
            "Fournitures de bureau 240 € TTC → charge de 240 €.",
            "Sous-traitance 3 000 € TTC → charge de 3 000 €.",
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "À vérifier : si vos achats comportent beaucoup de TVA (équipement, stock), l'option volontaire pour la TVA (art. 293 C) peut devenir intéressante — sous réserve d'une analyse chiffrée.",
          ],
        },
        LINK_DEDUCTIBLE,
      ],
    },

    {
      id: "option-volontaire-facturer-tva",
      title: "Peut-on choisir volontairement de facturer la TVA ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui. L'article 293 C du CGI permet de renoncer à la franchise et de demander l'assujettissement volontaire à la TVA, même sous les seuils de chiffre d'affaires.",
        },
        {
          type: "list",
          items: [
            "Option possible dès la création ou en cours d'activité.",
            "Durée minimale : 2 ans, renouvelable tacitement.",
            "Effet : facturation HT + TVA et droit à déduction sur les achats professionnels.",
            "Demande auprès du service des impôts des entreprises (SIE).",
          ],
        },
        {
          type: "table",
          caption: "Comparatif franchise (art. 293 B) vs option volontaire (art. 293 C)",
          headers: ["Critère", "Franchise art. 293 B", "Option art. 293 C"],
          rows: [
            ["TVA facturée", "Non", "Oui"],
            ["TVA déductible", "Non", "Oui"],
            ["Déclarations TVA", "Aucune", "CA3 ou CA12"],
            ["Coût net pour client B2B", "Montant facturé (non récupérable)", "HT seul (TVA récupérable)"],
            ["Charges administratives", "Minimales", "Déclarations périodiques"],
            ["Durée", "Tant que seuils respectés", "Minimum 2 ans"],
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : l'option est souvent pertinente si vos clients sont des entreprises assujetties et que vos achats génèrent beaucoup de TVA déductible (matériel, stock, sous-traitance).",
          ],
        },
        LINK_TAUX,
      ],
    },

    {
      id: "cas-pratiques-franchise",
      title: "Cas pratiques par métier",
      blocks: [
        {
          type: "paragraph",
          text: "Voici dix situations concrètes pour visualiser l'application de la franchise selon le métier, le chiffre d'affaires et le type de facturation.",
        },
        {
          type: "table",
          caption: "Cas pratiques — franchise en base de TVA par activité",
          headers: ["Métier", "Situation", "CA annuel HT", "Franchise ?", "TVA ?", "Facture type"],
          rows: PRACTICAL_CASE_ROWS,
        },
        CTA_CALCULATOR,
        LINK_AE,
      ],
    },

    {
      id: "erreurs-frequentes-franchise",
      title: "Erreurs fréquentes en franchise en base de TVA",
      blocks: [
        {
          type: "paragraph",
          text: "Ces erreurs sont parmi les plus courantes chez les entrepreneurs en franchise. Chacune peut entraîner un redressement, un litige client ou une perte de marge.",
        },
        {
          type: "table",
          caption: "Erreurs fréquentes — causes, conséquences et prévention",
          headers: ["Erreur", "Pourquoi c'est un problème", "Conséquence", "Comment l'éviter"],
          rows: ERRORS_ROWS,
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : croire que tous les auto-entrepreneurs sont automatiquement sans TVA. Un micro-entrepreneur assujetti (dépassement ou option) doit facturer la TVA.",
          ],
        },
        LINK_FACTURE,
      ],
    },

    {
      id: "checklist-franchise-tva",
      title: "Checklist franchise en base de TVA",
      blocks: [
        {
          type: "paragraph",
          text: "Trois moments clés nécessitent une vérification systématique : avant chaque facture, avant un dépassement de seuil, et avant tout changement de régime.",
        },
        {
          type: "illustration",
          id: "franchise-checklist",
          caption: "Les six points de vigilance essentiels en franchise en base de TVA.",
        },
        {
          type: "checklist",
          title: "Avant chaque facture",
          items: [
            "Confirmer que vous êtes toujours en franchise (seuils non dépassés).",
            "Mention « TVA non applicable, art. 293 B du CGI » présente.",
            "Aucune ligne TVA, aucun taux affiché.",
            "Montant unique = total à payer.",
          ],
        },
        {
          type: "checklist",
          title: "Avant un dépassement de seuil",
          items: [
            "Suivre le CA cumulé vs seuil de base (N-1) et majoré (année en cours).",
            "Proratiser le CA si année de création.",
            "Séparer les recettes ventes et services si activité mixte.",
            "Préparer la bascule : tarifs HT, logiciel, expert-comptable.",
          ],
        },
        {
          type: "checklist",
          title: "Avant un changement de régime (option ou sortie)",
          items: [
            "Simuler l'impact sur vos prix et votre trésorerie.",
            "Comparer franchise vs option art. 293 C sur 12 mois.",
            "Vérifier la durée minimale de l'option (2 ans).",
            "Demander un numéro de TVA intracommunautaire si assujettissement.",
          ],
        },
        CTA_CALCULATOR,
      ],
    },
  ],

  faqTitle: "Questions fréquentes sur la franchise en base de TVA",

  faq: GUIDE_FAQ,

  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "La franchise en base de TVA (art. 293 B) dispense de facturer et de reverser la TVA sous les seuils de chiffre d'affaires.",
      "Seuils 2026 : 37 500 € / 41 250 € (services) et 85 000 € / 93 500 € (ventes, restauration, hébergement).",
      "Chaque facture doit porter la mention « TVA non applicable, art. 293 B du CGI » — sans montant de TVA.",
      "Dépassement du seuil majoré → assujettissement immédiat ; dépassement du seuil de base (N-1) → TVA au 1er janvier suivant.",
      "L'option volontaire (art. 293 C) permet de facturer la TVA et de la déduire, même sous les seuils.",
    ],
    closingText:
      "Anticipez votre passage à la TVA en simulant vos montants HT et TTC, et consultez un expert-comptable pour toute décision structurante.",
    closingCta: {
      label: "Calculer HT → TTC maintenant",
      href: "/",
    },
  },

  sidebar: {
    calculator: {
      title: "Calculateur HT ↔ TTC",
      description: "Simulez vos montants HT, TVA et TTC avant et après assujettissement.",
      href: "/",
    },
    relatedGuides: [
      {
        label: "Taux de TVA",
        title: "Quels sont les taux de TVA en France ?",
        href: "/guides/quels-sont-les-taux-de-tva-en-france",
      },
      {
        label: "Facturation",
        title: "Comment faire une facture conforme",
        href: "/guides/comment-faire-une-facture-conforme",
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
