import type { GuideCoverImage } from "./covers";
import { guides } from "./registry";
import { getAllCalculators } from "../navigation/calculators-registry";

export const SIDEBAR_LIMITS = {
  maxTools: 50,
  maxGuides: 50,
} as const;

export type SidebarPageType = "home" | "guide" | "calculator" | "faq" | "guides-hub" | "tools-hub";

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

const DEFAULT_TOOL_BADGE = "✓ Outil gratuit";

/** Tous les outils enregistrés : source unique (registre calculateurs) */
export function getAllSidebarTools(): SidebarTool[] {
  return getAllCalculators().map((calc) => ({
    id: calc.id,
    title: calc.shortTitle,
    description: calc.description,
    href: calc.path,
    cover: calc.cover,
    icon: calc.icon,
    badge: DEFAULT_TOOL_BADGE,
  }));
}

/** @deprecated Utiliser getAllSidebarTools() */
export const SIDEBAR_TOOLS = getAllSidebarTools();

export const SIDEBAR_CALCULATOR = {
  title: "Calculateur Brut vers Net",
  description: "Estimez prochainement votre salaire net à partir de votre salaire brut.",
  href: "/",
} as const;

export function normalizeSidebarPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "");
}

export function sidebarPathsMatch(a: string, b: string): boolean {
  return normalizeSidebarPath(a) === normalizeSidebarPath(b);
}

/** Outils à afficher : exclut l'outil de la page courante ; vide sur le hub /nos-outils */
export function getSidebarTools(context: SidebarContext): SidebarTool[] {
  if (context.pageType === "tools-hub") return [];
  return getAllSidebarTools()
    .filter((tool) => !sidebarPathsMatch(tool.href, context.currentPath))
    .slice(0, SIDEBAR_LIMITS.maxTools);
}

/** Guides à afficher : exclut le guide courant */
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

/** Vérifie si la sidebar affiche au moins un bloc outil ou guide */
export function hasSidebarContent(context: SidebarContext): boolean {
  const tools = getSidebarTools(context);
  const guides =
    context.pageType === "guides-hub" ? [] : getSidebarGuides(context);
  return tools.length > 0 || guides.length > 0;
}
