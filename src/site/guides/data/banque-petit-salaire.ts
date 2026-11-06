import type { Guide } from "../types";
import {
  BANK_FAQ_ITEMS,
  BANK_GUIDE_BREADCRUMB,
  BANK_GUIDE_DISCLOSURE,
  BANK_GUIDE_H1,
  BANK_GUIDE_INTRO,
  BANK_GUIDE_META_DESCRIPTION,
  BANK_GUIDE_PATH,
  BANK_GUIDE_PUBLISHED_AT,
  BANK_GUIDE_SEO_TITLE,
  BANK_GUIDE_SLUG,
  BANK_GUIDE_SUBTITLE,
  BANK_GUIDE_UPDATED_AT,
} from "@/site/banque-petit-salaire";

/**
 * Métadonnées du guide comparatif bancaire.
 * URL canonique : /banque-petit-salaire
 *
 * BROUILLON : présent dans `draftGuides` uniquement.
 * Le contenu détaillé est rendu par les composants `@/site/banque-petit-salaire`.
 * Voir `src/drafts/banque-petit-salaire/README.md`.
 */
export const banquePetitSalaireGuide: Guide = {
  slug: BANK_GUIDE_SLUG,
  publicPath: BANK_GUIDE_PATH,
  breadcrumbLabel: BANK_GUIDE_BREADCRUMB,
  title: BANK_GUIDE_H1,
  seoTitle: BANK_GUIDE_SEO_TITLE,
  description: BANK_GUIDE_META_DESCRIPTION,
  subtitle: BANK_GUIDE_SUBTITLE,
  publishedAt: BANK_GUIDE_PUBLISHED_AT,
  updatedAt: BANK_GUIDE_UPDATED_AT,
  includeFaqSchema: true,
  introduction: [...BANK_GUIDE_INTRO, BANK_GUIDE_DISCLOSURE],
  sections: [
    {
      id: "comparatif-bancaire",
      title: "Comparatif de quatre offres pour petits salaires",
      blocks: [
        {
          type: "paragraph",
          text: "Le détail des offres, des frais, des besoins, de l'ouverture de compte et des questions fréquentes est présenté dans le module à onglets de la page.",
        },
      ],
    },
  ],
  faq: BANK_FAQ_ITEMS.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  conclusion: {
    title: "Pour aller plus loin",
    keyPoints: [
      "Comparez d'abord le coût réel selon votre usage de la carte.",
      "Une prime de bienvenue est ponctuelle : vérifiez ses conditions avant de la compter.",
      "Gardez votre ancien compte jusqu'à ce que la transition soit stable.",
    ],
    closingText:
      "Revenez aux quatre cartes pour ouvrir une offre officielle, ou parcourez les analyses pour comprendre les conditions avant de changer de banque.",
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: "/",
    },
    relatedGuides: [
      { title: "SMIC : montants brut et net", href: "/smic" },
      { title: "Prime d'activité", href: "/prime-activite" },
      { title: "Quel est un bon salaire en France ?", href: "/quel-est-un-bon-salaire-en-france" },
    ],
  },
};
