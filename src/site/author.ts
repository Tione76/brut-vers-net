import { siteConfig } from "@/site/site.config";

/**
 * Auteur éditorial du site.
 * Source unique pour l'affichage, la page auteur et le nœud Schema.org Person.
 */
export const SITE_AUTHOR = {
  name: siteConfig.author,
  slug: "antoine",
  path: "/auteur/antoine",
  metaTitle: "Antoine, auteur de Brut vers Net",
  metaDescription:
    "Antoine est le créateur de Brut vers Net. Il publie des contenus pédagogiques sur le salaire, les cotisations et les calculateurs de rémunération.",
  pageSubtitle: "Je publie des contenus pédagogiques sur la rémunération.",
  role: "Créateur de Brut vers Net",
  cardIntro: "Je cherche à rendre la rémunération plus accessible.",
  sections: [
    {
      id: "a-propos",
      title: "À propos",
      icon: "user" as const,
      paragraphs: [
        "Je suis le créateur de Brut vers Net. Je m'intéresse à la rémunération, à la finance personnelle et aux mécanismes qui influencent le pouvoir d'achat.",
        "En cherchant des informations sur les salaires ou le SMIC, je trouvais souvent des pages anciennes ou difficiles à dater. Il me fallait alors plusieurs recherches pour vérifier les chiffres. J'ai donc voulu réunir des explications claires, des calculs détaillés et des sources officielles, en indiquant les dates d'application des montants.",
      ],
    },
    {
      id: "ce-que-je-publie",
      title: "Ce que je publie",
      icon: "book" as const,
      paragraphs: [
        "J'y publie des guides et des calculateurs sur le salaire, les cotisations sociales et les principaux dispositifs liés à la rémunération.",
      ],
    },
    {
      id: "mon-objectif",
      title: "Mon objectif",
      icon: "target" as const,
      paragraphs: [
        "Je veux aider chacun à mieux comprendre sa rémunération, avec des outils simples à utiliser.",
      ],
    },
  ],
  methodologyTitle: "Méthodologie",
  methodology:
    "Je rédige les contenus à partir des textes officiels disponibles. Je les relis et je les mets à jour lors des évolutions réglementaires, afin de proposer des informations aussi fiables que possible.",
  sourcesIntro:
    "Lorsque c'est pertinent, je m'appuie sur des sources officielles. Sources que je consulte régulièrement :",
  sources: [
    "URSSAF",
    "Service-Public.fr",
    "Code du travail",
    "textes réglementaires applicables",
  ],
  ctaText:
    "Vous souhaitez mieux comprendre votre salaire ou utiliser un de nos outils de simulation ?",
  ctaLabel: "Découvrir les calculateurs",
} as const;

export type SiteAuthor = typeof SITE_AUTHOR;
export type AuthorSectionIcon = (typeof SITE_AUTHOR.sections)[number]["icon"];
