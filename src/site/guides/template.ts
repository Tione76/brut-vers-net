/**
 * MODÈLE OFFICIEL : Guide de référence
 *
 * Ce fichier est la source de vérité éditoriale pour tous les guides
 * de ce site et de tous les futurs sites basés sur ce template.
 *
 * Règles impératives :
 * - Ne pas supprimer de section H2 du modèle (les sous-sections H3 sont adaptables)
 * - Ne pas fusionner les encadrés « À retenir », « Bon à savoir » et « Exemple »
 * - Paragraphes courts (3 à 4 lignes maximum)
 * - Ton intemporel, pédagogique, jamais journalistique
 * - FAQ : minimum 5 questions, formulées comme des requêtes Google réelles
 *
 * Pour créer un guide : dupliquer cette structure dans guides/registry.ts
 * en remplaçant chaque placeholder par le contenu définitif.
 */
import type { Guide } from "./types";

export const OFFICIAL_GUIDE_MODEL: Guide = {
  slug: "modele",
  isTemplate: true,

  // ── SEO & métadonnées ──────────────────────────────────────────────
  title: "[H1 : Question principale + mot-clé primaire]",
  description:
    "[Meta description : 150-160 caractères. Résume la réponse et incite au clic sans sur-promettre.]",
  subtitle:
    "[Sous-titre header, promesse éditoriale en une phrase, complète le H1 sans le répéter.]",
  updatedAt: "2026-01-01",
  publishedAt: "2026-01-01",

  // ── Introduction (sans H2) ─────────────────────────────────────────
  introduction: [
    "[Phrase 1 : Réponse directe et immédiate à la question principale du guide. L'utilisateur doit obtenir l'essentiel dès cette première phrase.]",
    "[Phrase 2 : Contextualisation : pour qui, dans quelle situation, pourquoi ce guide existe.]",
    "[Phrase 3 optionnelle : Annonce du plan ou promesse de couverture exhaustive du sujet.]",
  ],

  // ── Corps du guide ───────────────────────────────────────────────────
  sections: [
    {
      id: "comprendre-le-sujet",
      title: "[H2 §1 : Comprendre le sujet : définition et enjeux]",
      blocks: [
        {
          type: "paragraph",
          text: "[Définition claire du concept traité. Vocabulaire accessible, sans jargon inutile.]",
        },
        {
          type: "paragraph",
          text: "[Pourquoi ce sujet est important pour l'utilisateur. Enjeux concrets.]",
        },
        {
          type: "list",
          items: [
            "[Point clé n°1, notion fondamentale]",
            "[Point clé n°2, notion fondamentale]",
            "[Point clé n°3, notion fondamentale]",
          ],
        },
        {
          type: "image-placeholder",
          description: "schéma explicatif",
          caption: "[Légende, ce que l'illustration doit montrer]",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "[Synthèse en 1-2 phrases, l'essentiel à mémoriser de cette section.]",
          ],
        },
      ],
    },

    {
      id: "cadre-reglementaire",
      title: "[H2 §2 : Le cadre applicable : règles, taux ou catégories]",
      blocks: [
        {
          type: "paragraph",
          text: "[Présentation du cadre réglementaire ou des règles de classement. Ton factuel et intemporel.]",
        },
        {
          type: "table",
          caption: "[Légende du tableau comparatif]",
          headers: ["[Colonne 1]", "[Colonne 2]", "[Colonne 3]", "[Colonne 4]"],
          rows: [
            ["[Ligne 1, catégorie A]", "[Valeur]", "[Valeur]", "[Valeur]"],
            ["[Ligne 2, catégorie B]", "[Valeur]", "[Valeur]", "[Valeur]"],
            ["[Ligne 3, catégorie C]", "[Valeur]", "[Valeur]", "[Valeur]"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "[Information utile mais non essentielle, précision, exception, nuance.]",
          ],
        },
      ],
      subsections: [
        {
          id: "sous-categorie-a",
          title: "[H3 : Première sous-catégorie ou cas]",
          blocks: [
            {
              type: "paragraph",
              text: "[Explication détaillée de la sous-catégorie. Paragraphes courts.]",
            },
          ],
        },
        {
          id: "sous-categorie-b",
          title: "[H3 : Deuxième sous-catégorie ou cas]",
          blocks: [
            {
              type: "paragraph",
              text: "[Explication détaillée. Lier au tableau ci-dessus si pertinent.]",
            },
          ],
        },
      ],
    },

    {
      id: "methode-de-calcul",
      title: "[H2 §3 : Comment calculer : la méthode pas à pas]",
      blocks: [
        {
          type: "paragraph",
          text: "[Introduction à la méthode. Annoncer la formule ou la logique générale.]",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "[Étape 1, identifier le montant ou la donnée de départ]",
            "[Étape 2, déterminer le taux ou le paramètre applicable]",
            "[Étape 3, appliquer la formule]",
            "[Étape 4, vérifier le résultat]",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour effectuer ce calcul instantanément, utilisez notre",
          label: "calculateur HT vers TTC",
          href: "/",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "[Exemple chiffré concret, ex. : 100 € HT × 20 % = 20 € de TVA, soit 120 € TTC.]",
            "[Variante ou second exemple si pertinent.]",
          ],
        },
        {
          type: "image-placeholder",
          description: "capture du calculateur",
          caption: "[Légende, saisie et résultat attendus]",
        },
      ],
    },

    {
      id: "exemples-pratiques",
      title: "[H2 §4 : Exemples pratiques et cas concrets]",
      blocks: [
        {
          type: "paragraph",
          text: "[Introduction, pourquoi les exemples aident à comprendre et à appliquer.]",
        },
      ],
      subsections: [
        {
          id: "exemple-cas-1",
          title: "[H3 : Cas pratique n°1 : situation courante]",
          blocks: [
            {
              type: "paragraph",
              text: "[Contexte du cas, qui, quoi, combien.]",
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: ["[Calcul détaillé pas à pas avec les chiffres du cas.]"],
            },
          ],
        },
        {
          id: "exemple-cas-2",
          title: "[H3 : Cas pratique n°2 : autre situation]",
          blocks: [
            {
              type: "paragraph",
              text: "[Contexte différent pour couvrir une autre facette du sujet.]",
            },
            {
              type: "table",
              caption: "[Comparatif de deux ou trois scénarios]",
              headers: ["[Scénario]", "[Montant HT]", "[TVA]", "[Montant TTC]"],
              rows: [
                ["[Scénario A]", "[Valeur]", "[Valeur]", "[Valeur]"],
                ["[Scénario B]", "[Valeur]", "[Valeur]", "[Valeur]"],
              ],
            },
          ],
        },
      ],
    },

    {
      id: "erreurs-frequentes",
      title: "[H2 §5 : Erreurs fréquentes et points de vigilance]",
      blocks: [
        {
          type: "paragraph",
          text: "[Introduction, pourquoi ces erreurs sont courantes et leurs conséquences.]",
        },
        {
          type: "list",
          items: [
            "[Erreur n°1, explication de l'erreur et comment l'éviter]",
            "[Erreur n°2, explication de l'erreur et comment l'éviter]",
            "[Erreur n°3, explication de l'erreur et comment l'éviter]",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "[Règle de vigilance principale, la plus importante à retenir de cette section.]",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour approfondir un aspect connexe, consultez notre guide",
          label: "[Titre du guide associé]",
          href: "/guides/[slug-guide-associe]",
        },
      ],
    },

    {
      id: "cas-particuliers",
      title: "[H2 §6 : Cas particuliers et situations spécifiques]",
      blocks: [
        {
          type: "paragraph",
          text: "[Introduction, situations qui sortent du cas standard et nécessitent une attention particulière.]",
        },
        {
          type: "image-placeholder",
          description: "exemple de facture",
          caption: "[Légende, éléments à repérer sur le document]",
        },
      ],
      subsections: [
        {
          id: "cas-particulier-1",
          title: "[H3 : Première situation spécifique]",
          blocks: [
            {
              type: "paragraph",
              text: "[Explication de la situation, des règles spécifiques et de la conduite à tenir.]",
            },
            {
              type: "callout",
              variant: "tip",
              paragraphs: ["[Précision ou exception utile pour ce cas.]"],
            },
          ],
        },
        {
          id: "cas-particulier-2",
          title: "[H3 : Deuxième situation spécifique]",
          blocks: [
            {
              type: "paragraph",
              text: "[Autre cas particulier avec les mêmes exigences de clarté.]",
            },
          ],
        },
      ],
    },

    {
      id: "outils-complementaires",
      title: "[H2 §7 : Outils complémentaires]",
      blocks: [
        {
          type: "paragraph",
          text: "[Présentation des outils disponibles pour aller plus loin, calculateur, simulateur futur, autre guide.]",
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Le",
          label: "calculateur principal",
          href: "/",
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Notre futur",
          label: "[Nom du simulateur, ex. simulateur de marge]",
          href: "/simulateurs/[slug-futur]",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Le guide",
          label: "[Titre d'un autre guide de la bibliothèque]",
          href: "/guides/[slug-autre-guide]",
        },
      ],
    },
  ],

  // ── FAQ (minimum 5 questions : optimisée SEO) ──────────────────────
  faq: [
    {
      question: "[Question 1, formulation naturelle, telle qu'un utilisateur la taperait dans Google]",
      answer:
        "[Réponse complète en 2-4 phrases. Directe, factuelle, auto-suffisante. Inclure un exemple chiffré si pertinent.]",
    },
    {
      question: "[Question 2, variante ou angle différent sur le sujet principal]",
      answer: "[Réponse complète.]",
    },
    {
      question: "[Question 3, question de type « comment » ou « pourquoi »]",
      answer: "[Réponse complète.]",
    },
    {
      question: "[Question 4, question sur un cas particulier ou une exception]",
      answer: "[Réponse complète.]",
    },
    {
      question: "[Question 5, question comparative ou de choix]",
      answer: "[Réponse complète.]",
    },
    {
      question: "[Question 6 optionnelle, approfondissement ou lien avec un sujet connexe]",
      answer: "[Réponse complète.]",
    },
  ],

  // ── Conclusion ───────────────────────────────────────────────────────
  conclusion: {
    title: "Conclusion",
    keyPoints: [
      "[Point clé n°1, l'essentiel à retenir du guide]",
      "[Point clé n°2]",
      "[Point clé n°3]",
      "[Point clé n°4 optionnel]",
    ],
    closingText: "[Phrase courte invitant à utiliser le calculateur ou consulter un guide associé.]",
    closingCta: {
      label: "calculateur HT vers TTC",
      href: "/",
    },
  },

  // ── Sidebar : maillage interne ───────────────────────────────────────
  sidebar: {
    calculator: {
      title: "Calculateur HT → TTC",
      description: "Convertissez un prix hors taxes en TTC instantanément.",
      href: "/",
    },
    relatedGuides: [
      {
        label: "Guide associé",
        title: "[Titre du guide connexe n°1]",
        href: "/guides/[slug-1]",
      },
      {
        label: "Guide associé",
        title: "[Titre du guide connexe n°2]",
        href: "/guides/[slug-2]",
      },
    ],
    relatedSimulator: {
      title: "[Nom du futur simulateur]",
      description: "[Description courte du simulateur complémentaire.]",
      href: "/simulateurs/[slug-futur]",
    },
  },
};
