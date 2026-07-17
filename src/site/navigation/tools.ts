import { getAllCalculators } from "./calculators-registry";

/**
 * Menu « Nos outils » : dérivé automatiquement du registre des calculateurs.
 * Libellés menu éventuellement distincts du shortTitle (hub, sidebar, plan du site).
 */
export type ToolNavItem = {
  href: string;
  shortTitle: string;
  title: string;
};

const MENU_SHORT_TITLES: Record<string, string> = {
  "brut-vers-net": "Calculateur de salaire brut vers net",
  "salaire-heures-supplementaires": "Calculateur de salaire avec heures sup",
};

export const toolsNavigation: ToolNavItem[] = getAllCalculators().map((calc) => ({
  href: calc.path,
  shortTitle: MENU_SHORT_TITLES[calc.id] ?? calc.shortTitle,
  title: calc.title,
}));
