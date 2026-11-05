export type PartnerMockup = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
};

export type PartnerGalleryExample = PartnerMockup & {
  tabLabel: string;
  panelTitle: string;
  panelDescription: string;
  points: readonly { title: string; text: string; icon: "desktop" | "mobile" | "layers" | "compact" }[];
  orientation: "landscape" | "portrait";
};

/** Maquettes WebP de démonstration (aucune publicité active). */
export const PARTNER_MOCKUPS: readonly PartnerMockup[] = [
  {
    id: "habillage-desktop",
    src: "/images/partenaires/habillage-publicitaire-banque-demo-ordinateur.webp",
    width: 1200,
    height: 636,
    caption: "Habillage publicitaire — ordinateur.",
    alt: "Maquette d'habillage publicitaire desktop avec bandeau et espaces latéraux (marque fictive Banque Démo)",
  },
  {
    id: "banniere-mobile",
    src: "/images/partenaires/maquette-mobile-banque-demo.webp",
    width: 641,
    height: 1200,
    caption: "Bannière supérieure — mobile.",
    alt: "Maquette de bannière publicitaire supérieure sur mobile (marque fictive Banque Démo)",
  },
  {
    id: "banniere-encart-desktop",
    src: "/images/partenaires/banque-demo-banniere-et-carre.webp",
    width: 1200,
    height: 637,
    caption: "Bannière et encart latéral — ordinateur.",
    alt: "Maquette de bannière et d'encart latéral sur ordinateur (marque fictive Banque Démo)",
  },
  {
    id: "article-mobile",
    src: "/images/partenaires/article-mobile-pub-demo.webp",
    width: 557,
    height: 1200,
    caption: "Encart dans un article — mobile.",
    alt: "Maquette d'encart publicitaire intégré dans un article sur mobile (marque fictive Banque Démo)",
  },
] as const;

/** Exemples de la présentation à onglets (1 image réelle par onglet). */
export const PARTNER_GALLERY_EXAMPLES: readonly PartnerGalleryExample[] = [
  {
    ...PARTNER_MOCKUPS[0],
    tabLabel: "Habillage PC",
    panelTitle: "L'habillage publicitaire",
    panelDescription:
      "Votre campagne accompagne la lecture avec un bandeau supérieur et deux espaces latéraux.",
    points: [
      {
        title: "Sur ordinateur",
        text: "Un habillage visible autour de l'article.",
        icon: "desktop",
      },
      {
        title: "Une présence autour du contenu",
        text: "Des espaces aux couleurs de votre marque.",
        icon: "layers",
      },
    ],
    orientation: "landscape",
  },
  {
    ...PARTNER_MOCKUPS[1],
    tabLabel: "Bannière mobile",
    panelTitle: "La bannière mobile",
    panelDescription:
      "Votre campagne apparaît sous le menu, avant le début du contenu, dans un format adapté aux petits écrans.",
    points: [
      {
        title: "Sur mobile",
        text: "Un emplacement visible en haut de page.",
        icon: "mobile",
      },
      {
        title: "Une création adaptée",
        text: "Un message clair dans un espace compact.",
        icon: "compact",
      },
    ],
    orientation: "portrait",
  },
  {
    ...PARTNER_MOCKUPS[2],
    tabLabel: "Encarts PC",
    panelTitle: "Bannières et encarts",
    panelDescription:
      "Associez une bannière dans la colonne principale et un encart latéral pour présenter votre campagne.",
    points: [
      {
        title: "Sur ordinateur",
        text: "Plusieurs emplacements complémentaires.",
        icon: "desktop",
      },
      {
        title: "Au fil de la page",
        text: "Des créations intégrées à la mise en page.",
        icon: "layers",
      },
    ],
    orientation: "landscape",
  },
  {
    ...PARTNER_MOCKUPS[3],
    tabLabel: "Dans l'article",
    panelTitle: "L'encart dans l'article",
    panelDescription:
      "Un format carré prend place entre deux sections, en conservant une lecture claire du contenu.",
    points: [
      {
        title: "Sur mobile",
        text: "Un visuel adapté à la largeur disponible.",
        icon: "mobile",
      },
      {
        title: "Dans le parcours de lecture",
        text: "Une insertion entre deux blocs éditoriaux.",
        icon: "layers",
      },
    ],
    orientation: "portrait",
  },
] as const;

/** Images du visuel d'ambiance hero (écrans CSS). */
export const PARTNER_HERO_VISUALS = {
  desktop: PARTNER_MOCKUPS[0],
  mobile: PARTNER_MOCKUPS[1],
} as const;
