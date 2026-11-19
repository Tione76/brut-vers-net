export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  focus: string;
  success: string;
  error: string;
}

/** @deprecated Emplacements manuels : voir `ManualAdSlotId` dans `@/site/ads`. */
export type AdPosition =
  | "desktopTopBanner"
  | "desktopSidebar"
  | "desktopInArticle";

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

export type ConsentStatus = "pending" | "granted" | "denied" | "custom";
