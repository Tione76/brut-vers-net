import { HOME_COVER, MARGIN_CALCULATOR_COVER } from "./covers";
import type { GuideCoverImage } from "./covers";
import { guides } from "./registry";
import { seoConfig } from "../seo.config";

export const SIDEBAR_LIMITS = {
  maxTools: 4,
  maxGuides: 5,
} as const;

export type SidebarPageType = "home" | "guide" | "calculator" | "faq";

export interface SidebarContext {
  pageType: SidebarPageType;
  currentPath: string;
  currentGuideSlug?: string;
}

export interface SidebarTool {
  id: string;
  title: string;
  description: string;
  href: string;
  cover: GuideCoverImage;
  icon?: string;
  badge?: string;
}

export interface GuideSidebarLink {
  title: string;
  href: string;
  slug: string;
}

/** Registre des calculateurs — ajouter une entrée pour chaque nouvel outil */
const TOOL_REGISTRY: Array<{
  id: string;
  cover: GuideCoverImage;
  resolve: () => Pick<SidebarTool, "title" | "description" | "href">;
}> = [
  {
    id: "ht-ttc",
    cover: HOME_COVER,
    resolve: () => ({
      title: "Calculateur HT → TTC",
      description: "Calculez instantanément un prix HT, TTC et le montant de TVA.",
      href: "/",
    }),
  },
  {
    id: "margin-ht-ttc",
    cover: MARGIN_CALCULATOR_COVER,
    resolve: () => ({
      title: seoConfig.calculators.marginHtTtc.h1,
      description: seoConfig.calculators.marginHtTtc.description,
      href: seoConfig.calculators.marginHtTtc.path,
    }),
  },
];

const DEFAULT_TOOL_ICON = "€";
const DEFAULT_TOOL_BADGE = "✓ Outil gratuit";

/** Tous les outils enregistrés — source unique */
export function getAllSidebarTools(): SidebarTool[] {
  return TOOL_REGISTRY.map((entry) => {
    const meta = entry.resolve();
    return {
      id: entry.id,
      ...meta,
      cover: entry.cover,
      icon: DEFAULT_TOOL_ICON,
      badge: DEFAULT_TOOL_BADGE,
    };
  });
}

/** @deprecated Utiliser getAllSidebarTools() */
export const SIDEBAR_TOOLS = getAllSidebarTools();

/** @deprecated Utiliser getAllSidebarTools() */
export const SIDEBAR_CALCULATOR = {
  title: "Calculateur HT ↔ TTC",
  description: "Calculez instantanément un prix HT, TTC et le montant de TVA.",
  href: "/",
} as const;

export function normalizeSidebarPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "");
}

export function sidebarPathsMatch(a: string, b: string): boolean {
  return normalizeSidebarPath(a) === normalizeSidebarPath(b);
}

/** Outils à afficher — exclut l'outil de la page courante (y compris sur l'accueil /) */
export function getSidebarTools(context: SidebarContext): SidebarTool[] {
  return getAllSidebarTools()
    .filter((tool) => !sidebarPathsMatch(tool.href, context.currentPath))
    .slice(0, SIDEBAR_LIMITS.maxTools);
}

/** Guides à afficher — exclut le guide courant */
export function getSidebarGuides(context: SidebarContext): GuideSidebarLink[] {
  return guides
    .filter((guide) => {
      if (context.currentGuideSlug && guide.slug === context.currentGuideSlug) return false;
      const guidePath = `/guides/${guide.slug}`;
      return !sidebarPathsMatch(guidePath, context.currentPath);
    })
    .slice(0, SIDEBAR_LIMITS.maxGuides)
    .map((guide) => ({
      title: guide.title,
      href: `/guides/${guide.slug}`,
      slug: guide.slug,
    }));
}

/** @deprecated Utiliser getSidebarGuides({ pageType, currentPath }) */
export function getGuidesSidebarLinks(): GuideSidebarLink[] {
  return getSidebarGuides({ pageType: "faq", currentPath: "" });
}

/** @deprecated Utiliser getSidebarGuides({ pageType: "guide", currentPath, currentGuideSlug }) */
export function getRelatedGuidesForSlug(currentSlug: string): GuideSidebarLink[] {
  return getSidebarGuides({
    pageType: "guide",
    currentPath: `/guides/${currentSlug}`,
    currentGuideSlug: currentSlug,
  });
}
