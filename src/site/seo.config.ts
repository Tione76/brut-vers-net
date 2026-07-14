/**
 * SEO du site : titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Brut vers Net",
  defaultDescription:
    "Estimez prochainement votre salaire net à partir de votre salaire brut grâce au calculateur Brut vers Net.",
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calculateur Brut vers Net",
    h1: "Calculateur Brut vers Net",
    description:
      "Estimez prochainement votre salaire net à partir de votre salaire brut grâce au calculateur Brut vers Net.",
  },

  calculators: {} as Record<string, { path: string; title: string; description: string; h1: string }>,

  guidesHub: {
    path: "/guides",
    title: "Guides Brut vers Net",
    h1: "Guides",
    description:
      "Guides pratiques pour comprendre le salaire brut, le salaire net, les cotisations salariales et le calcul brut vers net.",
    subtitle: "Comprendre la paie simplement, avec des explications claires et des exemples concrets.",
  },

  toolsHub: {
    path: "/nos-outils",
    title: "Outils Brut vers Net",
    h1: "Outils",
    description: "Outils Brut vers Net à venir.",
    subtitle: "Contenu en cours de rédaction.",
  },

  legal: {
    contact: {
      title: "Contact",
      description:
        "Contactez brut-vers-net.fr pour signaler une erreur, proposer une amélioration ou poser une question.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Découvrez comment BRUT-VERS-NET.FR traite vos données personnelles : contact, cookies, Google Analytics et vos droits RGPD.",
      metaDescription:
        "Découvrez comment brut-vers-net.fr collecte, utilise et protège vos données personnelles conformément au RGPD.",
    },
    cookies: {
      title: "Gestion des cookies",
      description:
        "Découvrez les cookies utilisés sur BRUT-VERS-NET.FR, gérez vos préférences et comprenez le fonctionnement du bandeau de consentement.",
      metaDescription:
        "Gérez vos préférences en matière de cookies et découvrez leur utilisation sur brut-vers-net.fr.",
    },
    mentions: {
      title: "Mentions légales",
      description: "Informations légales sur l'éditeur et l'hébergeur.",
      metaDescription:
        "Consultez les mentions légales de brut-vers-net.fr : éditeur, hébergement, propriété intellectuelle et informations légales du site.",
    },
    faq: {
      title: "FAQ Brut vers Net",
      description: "FAQ Brut vers Net à venir.",
    },
    sitemap: {
      title: "Plan du site",
      description: "Liste de toutes les pages du site.",
      metaDescription:
        "Retrouvez l'ensemble des pages disponibles sur brut-vers-net.fr.",
    },
    notFound: { title: "Page introuvable", description: "La page demandée n'existe pas ou a été déplacée." },
    error: { title: "Erreur serveur", description: "Une erreur est survenue. Veuillez réessayer plus tard." },
  },

  /** Pages complémentaires optionnelles (max ~5). Le framework génère routes + sitemap automatiquement. */
  extraPages: [] as {
    slug: string;
    title: string;
    description: string;
    sections: { title: string; content: string }[];
  }[],
};
