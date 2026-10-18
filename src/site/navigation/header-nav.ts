import type { NavLink } from "@/framework/types";
import type { GuideNavItem } from "@/site/guides/navigation";
import type { ToolNavItem } from "./tools";
import {
  flattenMainNavLinks,
  getMainNavItems,
  type MainNavItem,
} from "./main-nav-data";

export type HeaderNavDropdown = {
  kind: "dropdown";
  id: string;
  label: string;
  items: { href: string; shortTitle: string; title: string }[];
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
 * Alignée sur la maquette : Calculateurs, SMIC, Salaires & emploi, Aides & droits, Tous les guides.
 */
export function buildHeaderNavEntries(_input?: {
  toolsNavigation?: ToolNavItem[];
  guidesNavigation?: GuideNavItem[];
  flatLinks?: NavLink[];
}): HeaderNavEntry[] {
  void _input;
  return getMainNavItems().map((item) => toHeaderEntry(item));
}

function toHeaderEntry(item: MainNavItem): HeaderNavEntry {
  if (item.kind === "link") {
    return {
      kind: "link",
      id: item.id,
      label: item.label,
      href: item.href,
    };
  }

  const links =
    item.panel.kind === "simple"
      ? item.panel.links
      : item.panel.kind === "spotlight"
        ? [
            ...item.panel.links,
            {
              href: item.panel.cta.href,
              label: item.panel.cta.buttonLabel,
              title: item.panel.cta.title,
            },
          ]
        : [
            ...item.panel.columns.flatMap((column) => column.links),
            ...(item.panel.cta
              ? [
                  {
                    href: item.panel.cta.href,
                    label: item.panel.cta.buttonLabel,
                    title: item.panel.cta.title,
                  },
                ]
              : []),
          ];

  return {
    kind: "dropdown",
    id: item.id,
    label: item.label,
    items: links.map((link) => ({
      href: link.href,
      shortTitle: link.label,
      title: link.title ?? link.label,
    })),
  };
}

export function getAllHeaderHrefs(): string[] {
  return flattenMainNavLinks().map((link) => link.href);
}
