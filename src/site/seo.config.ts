/**
 * SEO du site : titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Brut vers Net",
  defaultDescription:
    "Estimez prochainement votre salaire net à partir de votre salaire brut grâce au calculateur Brut vers Net.",
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calcul du salaire Brut vers Net → gratuit et personnalisé",
    h1: "Calculateur Brut vers Net",
    description:
      "Calculateur de salaire Brut vers Net gratuit. Simulez votre salaire avec précision et profitez de nos guides, outils et conseils d'experts sur la rémunération.",
  },

  calculators: {
    "augmentation-salaire": {
      path: "/calculateurs/augmentation-salaire",
      title: "Calcul d'augmentation de salaire → gratuit et personnalisé",
      h1: "Calculateur d'augmentation de salaire",
      subtitle:
        "Estimez ce que votre augmentation brute représente réellement en net chaque mois et sur une année.",
      description:
        "Calculez l'impact d'une augmentation en euros ou en pourcentage sur votre salaire brut, votre salaire net mensuel et votre gain annuel.",
      indexable: true,
      navTitle: "Simulateur d'augmentation de salaire",
    },
    "salaire-heures-supplementaires": {
      path: "/calculateurs/salaire-heures-supplementaires",
      title: "Calcul du salaire avec heures supplémentaires → brut et net",
      h1: "Calculez votre salaire avec heures supplémentaires",
      subtitle:
        "Estimez ce que vos heures supplémentaires représentent en brut et en net, ainsi que votre nouveau salaire mensuel.",
      description:
        "Calculateur de salaire avec heures supplémentaires brut et net gratuit. Estimez votre rémunération avec précision grâce à notre outil et nos guides d'experts.",
      indexable: true,
      navTitle: "Simulateur de salaire avec heures supplémentaires",
    },
    "indemnite-licenciement": {
      path: "/calculateurs/indemnite-licenciement",
      title: "Calcul indemnité de licenciement → simulateur gratuit",
      h1: "Calculez votre indemnité de licenciement",
      subtitle:
        "Estimez le montant minimal de votre indemnité légale à partir de votre salaire brut de référence et de votre ancienneté.",
      description:
        "Calculateur d'indemnité de licenciement gratuit. Obtenez une estimation rapide de votre indemnité et consultez nos analyses et informations pratiques.",
      indexable: true,
      navTitle: "Simulateur d'indemnité de licenciement",
    },
  } as Record<
    string,
    {
      path: string;
      title: string;
      description: string;
      h1: string;
      subtitle?: string;
      indexable?: boolean;
      navTitle?: string;
    }
  >,

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
    title: "Calculateurs de salaire et impôts : tous nos outils",
    h1: "Outils",
    description:
      "Découvrez tous nos calculateurs et simulateurs de salaire : brut vers net, prélèvement à la source, augmentation, heures supplémentaires et indemnité.",
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
      title: "Questions fréquentes sur le salaire et la rémunération",
      description:
        "Toutes les réponses à vos questions sur le salaire, la rémunération, les cotisations, la fiche de paie, le prélèvement à la source et bien plus.",
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
