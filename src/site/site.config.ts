/**
 * Configuration du site : modifiez ce fichier pour chaque nouveau site.
 */
import { guidesNavigation } from "./guides/navigation";

function readOptionalEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}

const googleAnalyticsId =
  process.env.NODE_ENV === "production" ? readOptionalEnv("NEXT_PUBLIC_GA_ID") : undefined;
const microsoftClarityId =
  process.env.NODE_ENV === "production" ? readOptionalEnv("NEXT_PUBLIC_CLARITY_ID") : undefined;
const googleSearchConsoleId = readOptionalEnv("NEXT_PUBLIC_GSC_ID");
const googleAdsenseClientId = readOptionalEnv("NEXT_PUBLIC_ADSENSE_ID");
const adSlotAfterResult = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_AFTER_RESULT");
const adSlotBeforeFooter = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_BEFORE_FOOTER");
const adSlotUnderH1 = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_UNDER_H1");

export const siteConfig = {
  name: "Brut vers Net",
  domain: "brut-vers-net.fr",
  url: "https://brut-vers-net.fr",
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
    alt: "Logo Brut vers Net",
    width: 800,
    height: 800,
  },
  favicon: "/icon.png",
  ogImage: "/logo.png",

  footerBrandName: "BRUT-VERS-NET.FR",
  footerDescription:
    "Calculateur Brut vers Net pour estimer prochainement votre salaire net à partir de votre salaire brut.",

  home: {
    h1: "Calculateur Brut vers Net",
    intro: [
      "Estimez prochainement votre salaire net à partir de votre salaire brut.",
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
    email: "contact@brut-vers-net.fr",
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
      { label: "Calculateur", href: "/" },
      { label: "Outils", href: "/nos-outils" },
      { label: "Guides", href: "/guides" },
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
    googleAnalyticsId,
    microsoftClarityId,
    googleSearchConsoleId,
    googleAdsenseClientId,
  },

  ads: {
    slots: {
      "under-h1": {
        enabled: Boolean(googleAdsenseClientId && adSlotUnderH1),
        adSlot: adSlotUnderH1 ?? "",
        format: "horizontal" as const,
      },
      "after-result": {
        enabled: Boolean(googleAdsenseClientId && adSlotAfterResult),
        adSlot: adSlotAfterResult ?? "",
        format: "auto" as const,
      },
      "before-footer": {
        enabled: Boolean(googleAdsenseClientId && adSlotBeforeFooter),
        adSlot: adSlotBeforeFooter ?? "",
        format: "horizontal" as const,
      },
    },
  },
};
