import { siteConfig } from "@/site/site.config";

/**
 * Auteur éditorial du site.
 * Source unique pour l'affichage, la page auteur et le nœud Schema.org Person.
 *
 * Photo de profil : `public/images/authors/Antoine.webp` (casse exacte requise).
 * Si `portrait` est `null`, la carte conserve l'icône générique.
 */
export const SITE_AUTHOR = {
  name: siteConfig.author,
  slug: "antoine",
  path: "/auteur/antoine",
  metaTitle: "Antoine, créateur de Brut vers Net | À propos",
  metaDescription:
    "Découvrez Antoine, créateur de Brut vers Net, sa démarche éditoriale, ses sources officielles et sa méthode de vérification des informations.",
  schemaDescription:
    "Créateur de Brut vers Net, site d'information et de simulation consacré aux salaires, à l'emploi et aux aides financières.",
  pageSubtitle: "Je publie des contenus pédagogiques sur la rémunération.",
  role: "Créateur de Brut vers Net",
  cardIntro: "Je cherche à rendre la rémunération plus accessible.",
  /** Portrait circulaire de la carte auteur (affichage ~106 px, source native plus large pour le retina). */
  portrait: {
    src: "/images/authors/Antoine.webp",
    alt: "Portrait d'Antoine, créateur de Brut vers Net",
    width: 320,
    height: 320,
  },
  sections: [
    {
      id: "a-propos",
      title: "À propos",
      icon: "user" as const,
      paragraphs: [
        "Je suis Antoine, auto-entrepreneur et créateur de Brut vers Net.",
        "Je m'intéresse particulièrement aux questions de rémunération, de pouvoir d'achat et aux mécanismes qui influencent nos revenus au quotidien.",
        "En recherchant des informations sur les salaires, le SMIC ou certaines aides, j'ai souvent constaté qu'il était difficile de trouver des explications à la fois simples, détaillées et réellement à jour. Les montants évoluent, les règles changent et les informations disponibles ne précisent pas toujours leur date d'application.",
        "C'est pour cette raison que j'ai créé Brut vers Net : réunir au même endroit des guides accessibles, des calculs compréhensibles et des sources vérifiables, afin que chacun puisse trouver plus facilement les réponses à ses questions.",
      ],
    },
    {
      id: "ce-que-je-publie",
      title: "Ce que je publie",
      icon: "book" as const,
      paragraphs: [
        "Sur Brut vers Net, je publie des guides pratiques, des articles explicatifs et des calculateurs gratuits consacrés aux salaires, au SMIC, aux cotisations sociales, aux aides financières, à l'emploi et au pouvoir d'achat.",
        "L'objectif est de rendre les informations parfois complexes plus faciles à comprendre, grâce à des exemples concrets, des tableaux et des outils de simulation.",
      ],
    },
    {
      id: "mon-objectif",
      title: "Mon objectif",
      icon: "target" as const,
      paragraphs: [
        "Mon objectif est simple : permettre à chacun de mieux comprendre ses revenus, ses droits et les calculs qui les concernent.",
        "Je souhaite proposer des contenus clairs et accessibles, sans jargon inutile, tout en conservant la précision nécessaire sur des sujets financiers et réglementaires.",
      ],
    },
  ],
  methodologyTitle: "Méthodologie",
  methodologyParagraphs: [
    "Pour préparer mes contenus, je consulte en priorité les textes réglementaires et les publications des organismes officiels.",
    "Je veille à vérifier les montants, les conditions d'application et les dates d'entrée en vigueur des mesures présentées.",
    "Les guides et calculateurs font l'objet de mises à jour très régulières, notamment lorsque de nouveaux barèmes sont publiés ou que des dispositions réglementaires évoluent. Je m'efforce de répercuter ces changements dès que les informations officielles nécessaires sont disponibles.",
    "Lorsqu'une information concernant une période future n'est pas encore officiellement confirmée, je veille à le préciser afin de distinguer les données applicables des annonces et des prévisions.",
    "Malgré ces vérifications, une erreur ou une information devenue obsolète peut toujours subsister. C'est pourquoi les signalements des lecteurs sont les bienvenus.",
  ],
  sourcesIntro:
    "Lorsque c'est pertinent, je m'appuie sur des sources officielles. Sources que je consulte régulièrement :",
  sources: [
    { label: "URSSAF", href: "https://www.urssaf.fr" },
    { label: "Service-Public.fr", href: "https://www.service-public.fr" },
    {
      label: "Code du travail",
      href: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
    },
    { label: "textes réglementaires applicables" },
  ],
  reportTitle: "Signaler une erreur ou demander une correction",
  reportParagraphs: [
    "Vous avez repéré une erreur dans un article, un montant qui ne semble plus à jour ou un problème dans un calculateur ?",
    "Vous pouvez me le signaler directement depuis la page de contact, en précisant si possible l'adresse de la page concernée et l'information à vérifier.",
    "Je prends les signalements au sérieux et m'efforce de procéder à un premier examen sous cinq jours ouvrés. Lorsqu'une erreur est confirmée, je la corrige dans les meilleurs délais, après vérification des sources.",
    "Vos remarques et suggestions contribuent à améliorer la fiabilité de Brut vers Net.",
  ],
  reportLinkLabel: "Signaler une erreur",
  reportLinkHref: "/contact",
  ctaTitle: "Une question, une remarque ou une erreur à signaler ?",
  ctaText:
    "Vous souhaitez poser une question, proposer une amélioration ou demander la vérification d'une information publiée sur Brut vers Net ? Vous pouvez me contacter directement. Je prendrai connaissance de votre message avec attention.",
  ctaLabel: "Me contacter",
  ctaHref: "/contact",
} as const;

export type SiteAuthor = typeof SITE_AUTHOR;
export type AuthorSectionIcon = (typeof SITE_AUTHOR.sections)[number]["icon"];
