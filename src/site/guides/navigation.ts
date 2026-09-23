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
    slug: "salaire-interim-calcul-brut-net",
    shortTitle: "Salaire en intérim",
    title: "Salaire en intérim : calcul du brut et du net avec IFM et congés payés",
  },
  {
    slug: "salaire-arret-maladie",
    shortTitle: "Salaire en arrêt maladie (privé)",
    title: "Salaire en arrêt maladie dans le privé : combien allez-vous toucher ?",
  },
  {
    slug: "calcul-ijss-arret-maladie",
    shortTitle: "Calcul des IJSS (privé)",
    title: "Calculez vos IJSS en arrêt maladie (secteur privé) — barème 2026",
  },
  {
    slug: "maintien-salaire-arret-maladie",
    shortTitle: "Maintien de salaire en arrêt maladie (privé)",
    title: "Maintien de salaire en arrêt maladie dans le privé : calcul et conditions",
  },
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
    slug: "salaire-moyen-france",
    shortTitle: "Salaire moyen en France",
    title: "Salaire moyen en France : net, brut et médian",
  },
  {
    slug: "quel-est-un-bon-salaire-en-france",
    shortTitle: "Bon salaire en France",
    title: "Quel est un bon salaire en France ?",
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
  {
    slug: "pourquoi-salaire-net-change-septembre-2026",
    shortTitle: "Pourquoi mon net a changé en septembre 2026 ?",
    title: "Pourquoi mon salaire net a changé en septembre 2026 ?",
  },
];
