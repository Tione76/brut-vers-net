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
  pageSubtitle:
    "Créateur de Brut vers Net, des contenus pédagogiques sur la rémunération.",
  role: "Créateur de Brut vers Net",
  cardIntro:
    "Des contenus pédagogiques pour rendre la rémunération plus accessible.",
  sections: [
    {
      id: "a-propos",
      title: "À propos",
      icon: "user" as const,
      paragraphs: [
        "Antoine est le créateur de Brut vers Net.",
        "Passionné par la rémunération, la finance personnelle et les mécanismes qui influencent le pouvoir d'achat, il s'intéresse à la manière de rendre accessibles des sujets souvent perçus comme complexes.",
      ],
    },
    {
      id: "ce-que-je-publie",
      title: "Ce que je publie",
      icon: "book" as const,
      paragraphs: [
        "À travers Brut vers Net, il publie des contenus pédagogiques consacrés au salaire, aux cotisations sociales, aux calculateurs et aux principaux dispositifs liés à la rémunération.",
      ],
    },
    {
      id: "mon-objectif",
      title: "Mon objectif",
      icon: "target" as const,
      paragraphs: [
        "L'objectif du site est de proposer des explications claires, des outils simples à utiliser et des informations régulièrement mises à jour afin d'aider chacun à mieux comprendre sa rémunération.",
      ],
    },
  ],
  methodologyTitle: "Méthodologie",
  methodology:
    "Les contenus publiés sur Brut vers Net sont rédigés à partir des textes officiels disponibles, puis relus et mis à jour lors des évolutions réglementaires afin de garantir des informations aussi fiables et compréhensibles que possible.",
  sourcesIntro:
    "Les articles s'appuient, lorsque cela est pertinent, sur des sources officielles. Sources régulièrement consultées :",
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
