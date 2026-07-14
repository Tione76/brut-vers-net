import type { FaqItem } from "@/framework/types";
import type { GuideCoverImage } from "./covers";

/** Types d'encadrés éditoriaux du modèle officiel */
export type GuideCalloutVariant =
  | "retain"
  | "tip"
  | "example"
  | "warning"
  | "advice"
  | "error"
  | "hint"
  | "vigilance"
  | "legal"
  | "verify";

export interface GuideContextualCta {
  type: "contextual-cta";
  text: string;
  label: string;
  href: string;
}

export interface GuideChecklist {
  type: "checklist";
  title?: string;
  items: string[];
}

export interface GuideMistakesList {
  type: "mistakes";
  title?: string;
  items: string[];
}

export interface GuideSteps {
  type: "steps";
  items: { title: string; description: string }[];
}

/** Emplacement naturel pour le maillage interne */
export type GuideLinkVariant = "calculator" | "guide" | "simulator";

export interface GuideCallout {
  type: "callout";
  variant: GuideCalloutVariant;
  /** Paragraphes courts : un item = un paragraphe */
  paragraphs: string[];
}

export interface GuideParagraph {
  type: "paragraph";
  text: string;
}

export interface GuideList {
  type: "list";
  ordered?: boolean;
  items: string[];
}

export interface GuideTable {
  type: "table";
  caption?: string;
  headers: string[];
  rows: string[][];
}

/** Identifiant d'illustration vectorielle (réservé aux futurs guides) */
export type GuideIllustrationId = string;

export interface GuideIllustration {
  type: "illustration";
  id: GuideIllustrationId;
  caption?: string;
}

/** Emplacement réservé pour une illustration : modèle éditorial uniquement */
export interface GuideImagePlaceholder {
  type: "image-placeholder";
  description: string;
  caption?: string;
}

export interface GuideInternalLink {
  type: "internal-link";
  variant: GuideLinkVariant;
  label: string;
  href: string;
  /** Phrase d'introduction optionnelle avant le lien */
  intro?: string;
}

export interface GuideProfessionFaq {
  type: "profession-faq";
  items: { label: string; answer: string }[];
}

export interface GuideQuickSummaryItem {
  rate: string;
  description: string;
  /** Titre du niveau (schéma pipeline) */
  title?: string;
  kind?: "level" | "connector";
}

export interface GuideQuickSummary {
  title: string;
  items: GuideQuickSummaryItem[];
  /** pipeline : 3 niveaux horizontaux · reading-order : parcours vertical du haut vers le bas */
  variant?: "pipeline" | "reading-order";
}

export type GuideBlock =
  | GuideParagraph
  | GuideList
  | GuideCallout
  | GuideTable
  | GuideChecklist
  | GuideMistakesList
  | GuideSteps
  | GuideIllustration
  | GuideImagePlaceholder
  | GuideInternalLink
  | GuideProfessionFaq
  | GuideContextualCta;

export interface GuideSubsection {
  /** Identifiant URL pour le sommaire et les ancres (kebab-case) */
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export interface GuideSection {
  /** Identifiant URL pour le sommaire et les ancres (kebab-case) */
  id: string;
  title: string;
  blocks?: GuideBlock[];
  subsections?: GuideSubsection[];
}

export interface GuideConclusion {
  title?: string;
  /** Points clés « À retenir » */
  keyPoints: string[];
  /** Phrase de clôture courte invitant à l'action */
  closingText: string;
  /** CTA optionnel en fin de conclusion */
  closingCta?: {
    label: string;
    href: string;
  };
}

/** Liens affichés dans la sidebar : maillage interne */
export interface GuideSidebarLinks {
  calculator: {
    title: string;
    description: string;
    href: string;
  };
  relatedGuides?: {
    label?: string;
    title: string;
    href: string;
  }[];
  relatedSimulator?: {
    title: string;
    description: string;
    href: string;
  };
  /** Bloc « À découvrir » : maillage vers contenus complémentaires */
  discover?: {
    title: string;
    href: string;
  }[];
}

/**
 * Modèle officiel d'un guide de référence.
 * Chaque guide futur doit respecter cette structure sans en modifier l'ossature.
 */
export interface Guide {
  slug: string;
  title: string;
  /** Title balise <title> : optionnel, sinon title + suffixe site */
  seoTitle?: string;
  description: string;
  /** Sous-titre affiché dans le header compact : reformulation de la promesse éditoriale */
  subtitle: string;
  /** Date ISO (YYYY-MM-DD) : affichée et injectée dans Article JSON-LD (dateModified) */
  updatedAt: string;
  /** Date ISO de première publication : Article JSON-LD (datePublished) */
  publishedAt: string;
  /** Image Open Graph / couverture : renseignée via attachGuideCover() */
  coverImage?: GuideCoverImage;
  /** 2 à 3 phrases : réponse immédiate à la question principale, sans H2 */
  introduction: string[];
  /** Bloc visuel synthétique affiché juste après l'introduction (optionnel) */
  quickSummary?: GuideQuickSummary;
  sections: GuideSection[];
  faq: FaqItem[];
  /** Titre H2 de la section FAQ : adapté au sujet du guide */
  faqTitle?: string;
  conclusion: GuideConclusion;
  sidebar: GuideSidebarLinks;
  /** true uniquement pour le modèle de référence /modele : exclu du sitemap */
  isTemplate?: boolean;
}

export interface GuideTocEntry {
  id: string;
  title: string;
  level: 2 | 3;
}

export type GuideCalloutLabel =
  | "À retenir"
  | "Bon à savoir"
  | "Exemple"
  | "Attention"
  | "Conseil pratique"
  | "Erreur fréquente"
  | "Astuce"
  | "Point de vigilance"
  | "Référence fiscale"
  | "À vérifier";

export const GUIDE_CALLOUT_LABELS: Record<GuideCalloutVariant, GuideCalloutLabel> = {
  retain: "À retenir",
  tip: "Bon à savoir",
  example: "Exemple",
  warning: "Attention",
  advice: "Conseil pratique",
  error: "Erreur fréquente",
  hint: "Astuce",
  vigilance: "Point de vigilance",
  legal: "Référence fiscale",
  verify: "À vérifier",
};
