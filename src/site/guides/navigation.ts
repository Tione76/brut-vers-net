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

export const guidesNavigation: GuideNavItem[] = [
  {
    slug: "comment-est-calcule-le-salaire-net",
    shortTitle: "Brut et net expliqués",
    title: "Calcul du salaire net : comprendre la différence entre le salaire brut et le salaire net",
  },
  {
    slug: "comment-calculer-son-salaire-net",
    shortTitle: "Calculer son salaire net",
    title: "Comment calculer son salaire net ?",
  },
  {
    slug: "comment-lire-une-fiche-de-paie",
    shortTitle: "Comment lire une fiche de paie",
    title: "Comment lire une fiche de paie ?",
  },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    shortTitle: "Comprendre les cotisations salariales",
    title: "Cotisations salariales : pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
  },
  {
    slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
    shortTitle: "Prélèvement à la source",
    title: "Prélèvement à la source : qu'est-ce que c'est et comment ça fonctionne ?",
  },
];
