/**
 * Configuration du site : modifiez ce fichier pour chaque nouveau site.
 */
import { guidesNavigation } from "./guides/navigation";

export const siteConfig = {
  name: "Calculateur TVA",
  domain: "ht-vers-ttc.fr",
  url: "https://ht-vers-ttc.fr",
  author: "Éditeur du site",
  language: "fr",
  locale: "fr-FR",

  colors: {
    primary: "#1a4b7c",
    primaryHover: "#153d66",
    primaryLight: "#f7f9fb",
    accent: "#e1000f",
    background: "#ffffff",
    surface: "#f7f9fb",
    border: "#e4e8ed",
    text: "#161616",
    textMuted: "#6b7280",
    textInverse: "#ffffff",
    focus: "#1a4b7c",
    success: "#18753c",
    error: "#ce0500",
  },

  logo: {
    src: "/logo.png",
    alt: "Logo HT-VERS-TTC.fr",
    width: 800,
    height: 800,
  },
  favicon: "/icon.png",
  ogImage: "/images/og/Calcul-HT-vers-TTC.webp",

  footerBrandName: "HT-VERS-TTC.FR",
  footerDescription:
    "Calculateurs de TVA gratuits et guides pratiques pour tout comprendre sur la TVA, les prix HT, les prix TTC et la facturation.",

  home: {
    h1: "CALCULATEUR TVA : HT → TTC ET TTC → HT",
    intro: [
      "Saisissez votre montant hors taxes, choisissez le taux de TVA applicable et obtenez instantanément le prix TTC ainsi que le montant de la taxe.",
      "Le calcul inverse (TTC vers HT) est également disponible.",
    ] as [string, string?],
  },

  explanations: [] as { title: string; content: string }[],

  blogPosts: [] as {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    href: string;
  }[],

  tools: [] as {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[],

  recommendedSites: {
    title: "Autres outils",
    description: "",
    links: [] as { title: string; description: string; href: string; external?: boolean }[],
  },

  contact: {
    email: "contact@ht-vers-ttc.fr",
    companyName: "[Raison sociale]",
    address: "[Adresse complète]",
    intro:
      "Une question, une erreur à signaler ou une suggestion ? Contactez-nous via le formulaire ou directement par e-mail.",
    trustNote:
      "Vos informations sont utilisées uniquement pour répondre à votre demande. Aucune utilisation commerciale.",
    infoItems: ["Réponse sous 48 h", "Gratuit", "Aucune donnée revendue"],
    subjects: [
      "Signaler une erreur",
      "Suggestion d'amélioration",
      "Autre demande",
    ],
    faqLinks: [
      { label: "Consulter la FAQ complète", href: "/faq" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      { label: "Gestion des cookies", href: "/gestion-des-cookies" },
    ],
  },

  legal: {
    privacy: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
    cookies: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
    mentions: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
  },

  /** Menu Guides : voir src/site/guides/navigation.ts */
  guidesNavigation,

  navigation: {
    header: [
      { label: "Calcul HT → TTC", href: "/" },
      { label: "FAQ", href: "/faq" },
    ],
    footer: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/politique-de-confidentialite" },
      { label: "Cookies", href: "/gestion-des-cookies" },
      { label: "Plan du site", href: "/plan-du-site" },
      { label: "Contact", href: "/contact" },
    ],
  },

  analytics: {
    googleAnalyticsId:
      process.env.NODE_ENV === "production"
        ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-5886CNKJNM")
        : undefined,
    microsoftClarityId:
      process.env.NODE_ENV === "production"
        ? (process.env.NEXT_PUBLIC_CLARITY_ID ?? "xjfu8c3z5p")
        : undefined,
    googleSearchConsoleId: process.env.NEXT_PUBLIC_GSC_ID,
    googleAdsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },

  ads: {
    slots: {
      "under-h1": { enabled: false, adSlot: process.env.NEXT_PUBLIC_AD_SLOT_UNDER_H1 ?? "", format: "horizontal" as const },
      "after-result": { enabled: true, adSlot: process.env.NEXT_PUBLIC_AD_SLOT_AFTER_RESULT ?? "", format: "auto" as const },
      "before-footer": { enabled: true, adSlot: process.env.NEXT_PUBLIC_AD_SLOT_BEFORE_FOOTER ?? "", format: "horizontal" as const },
    },
  },
};
