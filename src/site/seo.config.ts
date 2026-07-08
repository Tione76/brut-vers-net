/**
 * SEO du site : titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Calculateur TVA",
  defaultDescription:
    "Calculateur gratuit pour convertir un prix HT en TTC (ou l'inverse). Taux de TVA 20 %, 10 %, 5,5 % et 2,1 %. Résultat immédiat, sans inscription.",
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calculer HT vers TTC gratuitement - TVA 20 %, 10 %, 5,5 % et 2,1 %",
    h1: "CALCULATEUR TVA : HT → TTC ET TTC → HT",
    description:
      "Calculateur HT en TTC gratuit pour convertir vos prix, calculer la TVA et accéder à des guides fiables sur les taux de TVA, les factures et les entreprises.",
    ogImage: "/images/og/Calcul-HT-vers-TTC.webp",
  },

  calculators: {
    marginHtTtc: {
      path: "/calculateurs/calculateur-marge-ht-ttc",
      title: "Calcul marge HT / TTC gratuit - Prix de vente et TVA",
      description:
        "Calculateur de marge HT / TTC gratuit pour calculer votre prix de vente, votre taux de marge, la TVA et optimiser la rentabilité de votre activité.",
      h1: "Calculateur de marge HT / TTC",
    },
  },

  guidesHub: {
    path: "/guides",
    title: "Guides TVA en France : calcul HT TTC, facturation et régimes",
    h1: "Les guides indispensables pour comprendre la TVA",
    description:
      "Guides pratiques sur la TVA pour entreprises et auto-entrepreneurs : taux applicables, franchise en base, facture conforme, TVA déductible et collectée. Ressources fiables et gratuites.",
    subtitle:
      "Retrouvez tous nos guides pratiques sur la TVA, le HT, le TTC, la facturation et les entreprises. Des explications simples, des exemples concrets et des outils gratuits pour appliquer immédiatement les bonnes règles.",
  },

  toolsHub: {
    path: "/nos-outils",
    title: "Calculateurs TVA gratuits : HT, TTC, marge et prix de vente",
    h1: "Nos outils gratuits pour calculer la TVA",
    description:
      "Utilisez nos calculateurs TVA gratuits pour convertir HT en TTC, calculer un montant de TVA, estimer une marge et fixer votre prix de vente.",
    subtitle:
      "Retrouvez nos calculateurs gratuits pour convertir un prix HT en TTC, calculer la TVA et estimer une marge commerciale avec le prix de vente adapté.",
  },

  legal: {
    contact: {
      title: "Contact",
      description:
        "Contactez HT-VERS-TTC.fr pour signaler une erreur, proposer une amélioration ou poser une question.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Découvrez comment HT-VERS-TTC.FR traite vos données personnelles : contact, cookies, Google Analytics et vos droits RGPD.",
      metaDescription:
        "Découvrez comment HT-VERS-TTC.fr collecte, utilise et protège vos données personnelles conformément au RGPD.",
    },
    cookies: {
      title: "Gestion des cookies",
      description:
        "Découvrez les cookies utilisés sur HT-VERS-TTC.FR, gérez vos préférences et comprenez le fonctionnement du bandeau de consentement.",
      metaDescription:
        "Gérez vos préférences en matière de cookies et découvrez leur utilisation sur HT-VERS-TTC.fr.",
    },
    mentions: {
      title: "Mentions légales",
      description: "Informations légales sur l'éditeur et l'hébergeur.",
      metaDescription:
        "Consultez les mentions légales de HT-VERS-TTC.fr : éditeur, hébergement, propriété intellectuelle et informations légales du site.",
    },
    faq: {
      title: "FAQ TVA",
      description:
        "Réponses aux questions fréquentes sur le calcul HT vers TTC, les taux de TVA, les factures et la franchise en base.",
    },
    sitemap: {
      title: "Plan du site",
      description: "Liste de toutes les pages du site.",
      metaDescription:
        "Retrouvez l'ensemble des pages, guides et calculateurs disponibles sur HT-VERS-TTC.fr.",
    },
    /** @deprecated Utiliser toolsHub : conservé pour compatibilité */
    simulators: { title: "Tous les simulateurs", description: "Découvrez l'ensemble de nos outils en ligne." },
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
