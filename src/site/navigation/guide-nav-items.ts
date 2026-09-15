import type { GuideNavItem } from "@/site/guides/navigation";
import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import type { NavDropdownItem } from "./NavDropdownMenu";

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
