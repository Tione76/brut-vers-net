import { guides } from "./registry";

/** Calculateur — lien unique pour toutes les sidebars */
export const SIDEBAR_CALCULATOR = {
  title: "Calculateur HT ↔ TTC",
  description: "Calculez instantanément un prix HT, TTC et le montant de TVA.",
  href: "/",
} as const;

export interface GuideSidebarLink {
  title: string;
  href: string;
}

/** Tous les guides publiés — page d'accueil, listes */
export function getGuidesSidebarLinks(): GuideSidebarLink[] {
  return guides.map((guide) => ({
    title: guide.title,
    href: `/guides/${guide.slug}`,
  }));
}

/** Guides associés — tous sauf le guide courant */
export function getRelatedGuidesForSlug(currentSlug: string): GuideSidebarLink[] {
  return guides
    .filter((guide) => guide.slug !== currentSlug)
    .map((guide) => ({
      title: guide.title,
      href: `/guides/${guide.slug}`,
    }));
}
