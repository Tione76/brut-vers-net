/**
 * Configuration AdSense centralisée.
 *
 * Pour changer un slot, activer/désactiver un emplacement, exclure une page
 * ou déplacer l'In-Article : modifier ce fichier uniquement.
 */

/** Identifiant éditeur Google AdSense (public). */
export const ADSENSE_PUBLISHER_ID = "ca-pub-6823212353384678";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;

/**
 * Coupe la diffusion publicitaire (slots manuels + reprise pauseAdRequests).
 * Le tag AdSense peut quand même charger pour la CMP Google (voir GoogleCmpLoader),
 * avec pauseAdRequests=1 tant que ce flag reste false.
 * Passer à `true` pour activer les requêtes de diffusion réelles.
 */
export const ADS_DIFFUSION_ENABLED = false;

/**
 * Breakpoint desktop du site (aligné sur la nav principale : mobile ≤ 1099px).
 * Les trois blocs manuels ne sont montés qu'à partir de cette largeur.
 */
export const ADS_DESKTOP_MIN_WIDTH_PX = 1100;

export type ManualAdSlotId =
  | "desktopTopBanner"
  | "desktopSidebar"
  | "desktopInArticle";

export type ManualAdSlotConfig = {
  id: ManualAdSlotId;
  /** Nom lisible (AdSense / docs internes). */
  label: string;
  adSlot: string;
  enabled: boolean;
  /** Toujours true pour ce lancement : pas de montage mobile. */
  desktopOnly: true;
  format: "auto" | "fluid";
  fullWidthResponsive?: boolean;
  layout?: "in-article";
  /** Style inline minimal demandé par AdSense (In-Article). */
  style?: { display: string; textAlign?: string };
};

/**
 * Trois emplacements manuels ordinateur.
 * Modifier `adSlot` / `enabled` ici pour piloter la diffusion.
 */
export const MANUAL_AD_SLOTS: Record<ManualAdSlotId, ManualAdSlotConfig> = {
  desktopTopBanner: {
    id: "desktopTopBanner",
    label: "Ordinateur - Bandeau haut",
    adSlot: "5914149453",
    enabled: true,
    desktopOnly: true,
    format: "auto",
    fullWidthResponsive: true,
  },
  desktopSidebar: {
    id: "desktopSidebar",
    label: "Ordinateur - Colonne droite - 300x250",
    adSlot: "8155627429",
    enabled: true,
    desktopOnly: true,
    format: "auto",
    fullWidthResponsive: true,
  },
  desktopInArticle: {
    id: "desktopInArticle",
    label: "Ordinateur - Dans le texte",
    adSlot: "6161561464",
    enabled: true,
    desktopOnly: true,
    format: "fluid",
    layout: "in-article",
    style: { display: "block", textAlign: "center" },
  },
};

/**
 * Exclusions exactes (chemin === entrée).
 * Pages légales, contact, partenariat : aucune annonce manuelle.
 */
export const AD_EXACT_EXCLUSIONS: readonly string[] = [
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/gestion-des-cookies",
  "/contact",
  "/devenir-partenaire",
];

/**
 * Exclusions par préfixe (pathname === prefix || pathname.startsWith(prefix + "/")).
 * Réserver aux sections entièrement exclues. Vide pour ce lancement.
 */
export const AD_PREFIX_EXCLUSIONS: readonly string[] = [];

/**
 * Exceptions In-Article par chemin exact.
 * - `disable` : pas d'In-Article sur cette page
 * - `after-lead` : après « réponse courte » / preface
 * - `after-quick-summary` : après les cartes de montants (ex. /smic)
 * - `default` : règle automatique du gabarit guide
 */
export type InArticlePlacement =
  | "default"
  | "disable"
  | "after-lead"
  | "after-quick-summary";

export const IN_ARTICLE_EXCEPTIONS: Readonly<Record<string, InArticlePlacement>> =
  {
    "/smic": "after-quick-summary",
  };

/**
 * Liste prête à saisir dans AdSense → Annonces → Par site → Pages exclues
 * (annonce ancrée + toute unité automatique).
 * www + apex : le panneau peut demander les deux formes.
 */
export const ADSENSE_DASHBOARD_EXCLUSIONS: readonly string[] = [
  "https://www.brut-vers-net.fr/mentions-legales",
  "https://www.brut-vers-net.fr/politique-de-confidentialite",
  "https://www.brut-vers-net.fr/gestion-des-cookies",
  "https://www.brut-vers-net.fr/contact",
  "https://www.brut-vers-net.fr/devenir-partenaire",
  "https://brut-vers-net.fr/mentions-legales",
  "https://brut-vers-net.fr/politique-de-confidentialite",
  "https://brut-vers-net.fr/gestion-des-cookies",
  "https://brut-vers-net.fr/contact",
  "https://brut-vers-net.fr/devenir-partenaire",
];
