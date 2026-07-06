/**
 * SEO du site — titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Calculateur TVA",
  defaultDescription:
    "Calculateur gratuit pour convertir un prix HT en TTC (ou l'inverse). Taux de TVA 20 %, 10 %, 5,5 % et 2,1 %. Résultat immédiat, sans inscription.",
  keywords: [
    "HT vers TTC",
    "calcul HT vers TTC",
    "calculateur HT vers TTC",
    "prix HT",
    "prix TTC",
    "calcul TVA",
    "taux TVA",
    "convertir HT en TTC",
    "convertir TTC en HT",
    "montant TVA",
    "calculateur TVA",
    "hors taxes",
    "toutes taxes comprises",
  ],
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calculateur HT vers TTC — Prix TTC et montant de TVA",
    description:
      "Calculez instantanément un prix TTC à partir d'un montant hors taxes. Taux de TVA en France métropolitaine (20 %, 10 %, 5,5 % ou 2,1 %). Calcul inverse TTC vers HT, arrondi au centime. Gratuit et sans inscription.",
    ogImage: "/images/og/Calcul-HT-vers-TTC.webp",
  },

  calculators: {
    marginHtTtc: {
      path: "/calculateurs/calculateur-marge-ht-ttc",
      title: "Calculateur de marge HT / TTC — Calcul prix de vente",
      description:
        "Calculez votre prix de vente HT et TTC à partir d'un coût d'achat. Marge commerciale, taux de marge, taux de marque, coefficient multiplicateur et TVA. Outil gratuit pour fixer vos tarifs de revente.",
      h1: "Calculateur de marge HT / TTC",
    },
  },

  legal: {
    contact: { title: "Contact", description: "Contactez l'équipe éditoriale." },
    privacy: { title: "Politique de confidentialité", description: "Informations sur vos données personnelles." },
    cookies: { title: "Politique de cookies", description: "Détail des cookies et gestion de vos préférences." },
    mentions: { title: "Mentions légales", description: "Informations légales sur l'éditeur et l'hébergeur." },
    faq: {
      title: "FAQ TVA",
      description:
        "Réponses aux questions fréquentes sur le calcul HT vers TTC, les taux de TVA, les factures et la franchise en base.",
    },
    sitemap: { title: "Plan du site", description: "Liste de toutes les pages du site." },
    simulators: { title: "Tous les simulateurs", description: "Découvrez l'ensemble de nos outils en ligne." },
    cookiePrefs: { title: "Gestion des cookies", description: "Gérez vos préférences de cookies." },
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
