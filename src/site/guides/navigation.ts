/**
 * Navigation des guides — source unique pour le menu principal.
 * Ajouter une entrée ici pour qu'un nouveau guide apparaisse automatiquement dans le menu.
 */
export interface GuideNavItem {
  /** Identifiant URL — correspond au slug du guide */
  slug: string;
  /** Intitulé affiché dans le menu */
  shortTitle: string;
  /** Titre complet du guide (accessibilité, attribut title) */
  title: string;
}

export const guidesNavigation: GuideNavItem[] = [
  {
    slug: "quels-sont-les-taux-de-tva-en-france",
    shortTitle: "Les taux de TVA",
    title: "Quels sont les taux de TVA en France ?",
  },
  {
    slug: "franchise-en-base-de-tva",
    shortTitle: "Franchise en base de TVA",
    title: "Franchise en base de TVA : guide complet 2026",
  },
  {
    slug: "comment-faire-une-facture-conforme",
    shortTitle: "Rédiger une facture conforme",
    title: "Comment faire une facture conforme ?",
  },
  {
    slug: "tva-et-auto-entrepreneur",
    shortTitle: "TVA et auto-entrepreneur",
    title: "TVA et auto-entrepreneur",
  },
  {
    slug: "tva-deductible-et-tva-collectee",
    shortTitle: "TVA déductible et collectée",
    title: "TVA déductible et TVA collectée",
  },
];
