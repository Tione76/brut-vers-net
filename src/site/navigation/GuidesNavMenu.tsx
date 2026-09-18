import type { GuideNavItem } from "@/site/guides/navigation";
import { buildGuidesMenuItems } from "./guide-nav-items";
import { NavDropdownMenu } from "./NavDropdownMenu";

interface GuidesNavMenuProps {
  items: GuideNavItem[];
}

export function GuidesNavMenu({ items }: GuidesNavMenuProps) {
  return (
    <NavDropdownMenu
      label="Nos guides"
      menuAriaLabel="Nos guides"
      items={buildGuidesMenuItems(items)}
    />
  );
}
