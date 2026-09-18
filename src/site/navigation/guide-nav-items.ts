import type { GuideNavItem } from "@/site/guides/navigation";
import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import { seoConfig } from "@/site/seo.config";
import type { NavDropdownItem } from "./NavDropdownMenu";

/** Lien unique vers le hub Guides (desktop + mobile). */
export const GUIDES_HUB_NAV_ITEM: NavDropdownItem = {
  href: seoConfig.guidesHub.path,
  shortTitle: "Tous nos guides",
  title: "Tous nos guides",
  variant: "hub",
};

/** Résout les guides du menu vers des items dropdown (href public canonique). */
export function mapGuidesToNavItems(items: GuideNavItem[]): NavDropdownItem[] {
  return items.map((item) => {
    const guide = getGuideBySlug(item.slug);
    const href = guide ? getGuidePublicPath(guide) : `/guides/${item.slug}`;
    return {
      href,
      shortTitle: item.shortTitle,
      title: item.title,
    };
  });
}

/** Items du sous-menu « Nos guides » : guides existants + lien hub en bas. */
export function buildGuidesMenuItems(items: GuideNavItem[]): NavDropdownItem[] {
  return [...mapGuidesToNavItems(items), GUIDES_HUB_NAV_ITEM];
}
