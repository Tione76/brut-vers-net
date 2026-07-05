/**
 * Configuration du site — modifiez ce fichier pour chaque nouveau site.
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

  logo: { src: "/logo.png", alt: "Calculateur TVA", width: 800, height: 800 },
  logoLetter: "€",
  favicon: "/icon.png",
  ogImage: "/images/og/Calcul-HT-vers-TTC.webp",

  footerDescription:
    "Calculateur en ligne gratuit pour convertir un prix hors taxes en TTC et obtenir le montant de TVA.",

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
      "Une question concernant ce calculateur ? Vous pouvez nous contacter grâce au formulaire ci-dessous.",
    trustNote:
      "Vos informations sont utilisées uniquement pour répondre à votre demande. Aucune utilisation commerciale.",
    infoItems: ["Réponse sous 48 h", "Gratuit", "Aucune donnée revendue"],
    subjects: [
      "Question sur le calculateur",
      "Signaler une erreur",
      "Suggestion d'amélioration",
      "Autre demande",
    ],
    faqLinks: [
      { label: "Consulter la FAQ complète", href: "/faq" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      { label: "Politique de cookies", href: "/politique-de-cookies" },
    ],
  },

  legal: {
    privacy: {
      lastUpdated: "2026-01-01",
      sections: [
        { title: "Responsable du traitement", content: "Le responsable du traitement est l'éditeur du site." },
        { title: "Données collectées", content: "Aucune donnée n'est collectée via le formulaire de simulation." },
        { title: "Vos droits", content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement." },
      ],
    },
    cookies: {
      lastUpdated: "2026-01-01",
      sections: [
        { title: "Qu'est-ce qu'un cookie ?", content: "Un cookie est un petit fichier texte déposé sur votre terminal." },
        { title: "Gérer vos préférences", content: 'Cliquez sur « Gérer les cookies » en bas de page ou visitez la page de gestion des cookies.' },
      ],
    },
    mentions: {
      lastUpdated: "2026-01-01",
      sections: [
        { title: "Éditeur du site", content: "[Raison sociale], [adresse]. Contact : contact@ht-vers-ttc.fr." },
        { title: "Hébergeur", content: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis." },
        { title: "Limitation de responsabilité", content: "Les simulateurs fournissent des estimations indicatives." },
      ],
    },
  },

  /** Menu Guides — voir src/site/guides/navigation.ts */
  guidesNavigation,

  navigation: {
    header: [
      { label: "Calcul HT → TTC", href: "/" },
      { label: "FAQ", href: "/faq" },
    ],
    footer: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/politique-de-confidentialite" },
      { label: "Cookies", href: "/politique-de-cookies" },
      { label: "Plan du site", href: "/plan-du-site" },
      { label: "Contact", href: "/contact" },
    ],
  },

  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
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
