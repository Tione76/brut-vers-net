/**
 * Navigation des guides : source unique pour le menu principal.
 * Vide en attendant les guides Brut vers Net.
 */
export interface GuideNavItem {
  /** Identifiant URL : correspond au slug du guide */
  slug: string;
  /** Intitulé affiché dans le menu */
  shortTitle: string;
  /** Titre complet du guide (accessibilité, attribut title) */
  title: string;
}

export const guidesNavigation: GuideNavItem[] = [];
