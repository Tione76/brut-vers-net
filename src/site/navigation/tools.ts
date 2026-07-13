/**
 * Menu « Nos outils » : dérivé automatiquement du registre des calculateurs.
 * Vide en attendant les outils Brut vers Net (navigation par liens directs).
 */
export type ToolNavItem = {
  href: string;
  shortTitle: string;
  title: string;
};

export const toolsNavigation: ToolNavItem[] = [];
