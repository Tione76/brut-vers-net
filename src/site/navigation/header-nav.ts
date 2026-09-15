import type { NavLink } from "@/framework/types";
import type { GuideNavItem } from "@/site/guides/navigation";
import type { ToolNavItem } from "./tools";
import type { NavDropdownItem } from "./NavDropdownMenu";
import { mapGuidesToNavItems } from "./guide-nav-items";
import { smicNavigation } from "./smic";

export type HeaderNavDropdown = {
  kind: "dropdown";
  id: string;
  label: string;
  items: NavDropdownItem[];
};

export type HeaderNavLink = {
  kind: "link";
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type HeaderNavEntry = HeaderNavDropdown | HeaderNavLink;

/**
 * Source unique d'entrées pour la navigation header (desktop et mobile).
 * Ordre et libellés alignés sur SiteNav historique.
 */
export function buildHeaderNavEntries(input: {
  toolsNavigation?: ToolNavItem[];
  guidesNavigation?: GuideNavItem[];
  flatLinks: NavLink[];
}): HeaderNavEntry[] {
  const entries: HeaderNavEntry[] = [];

  if (input.toolsNavigation && input.toolsNavigation.length > 0) {
    entries.push({
      kind: "dropdown",
      id: "tools",
      label: "Nos outils",
      items: input.toolsNavigation,
    });
  }

  entries.push({
    kind: "dropdown",
    id: "smic",
    label: "SMIC",
    items: smicNavigation,
  });

  if (input.guidesNavigation && input.guidesNavigation.length > 0) {
    entries.push({
      kind: "dropdown",
      id: "guides",
      label: "Nos guides",
      items: mapGuidesToNavItems(input.guidesNavigation),
    });
  }

  for (const link of input.flatLinks) {
    entries.push({
      kind: "link",
      id: `link-${link.href}`,
      label: link.label,
      href: link.href,
      external: link.external,
    });
  }

  return entries;
}
