import type { GuideNavItem } from "@/site/guides/navigation";
import { getGuideBySlug, getGuidePublicPath } from "@/site/guides";
import { NavDropdownMenu } from "./NavDropdownMenu";

interface GuidesNavMenuProps {
  items: GuideNavItem[];
}

export function GuidesNavMenu({ items }: GuidesNavMenuProps) {
  return (
    <NavDropdownMenu
      label="Guides"
      menuAriaLabel="Guides"
      items={items.map((item) => {
        const guide = getGuideBySlug(item.slug);
        const href = guide ? getGuidePublicPath(guide) : `/guides/${item.slug}`;
        return {
          href,
          shortTitle: item.shortTitle,
          title: item.title,
        };
      })}
    />
  );
}
