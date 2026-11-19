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
 * Active la diffusion publicitaire (slots manuels + reprise pauseAdRequests
 * après un choix CMP Sirdata). Le tag AdSense ne sert plus la CMP Google.
 * Remettre à `false` pour couper toute diffusion réelle.
 */
export const ADS_DIFFUSION_ENABLED = true;

/**
 * Breakpoint desktop du site (aligné sur la nav principale : mobile ≤ 1099px).
 * Latéral et In-Article ordinateur : montage à partir de cette largeur.
 */
export const ADS_DESKTOP_MIN_WIDTH_PX = 1100;

/**
 * In-Article sur mobile (même unité 6161561464, mêmes exclusions / gabarits).
 * Indépendant du bandeau haut : passer à `false` pour ne garder que l'ordinateur
 * (et le bandeau) sans retirer le placement éditorial du code.
 */
export const ADS_MOBILE_IN_ARTICLE_ENABLED = true;

export type ManualAdSlotId =
  | "desktopTopBanner"
  | "mobileTopBanner"
  | "desktopSidebar"
  | "desktopInArticle";

export type ManualAdSlotFixedSize = {
  width: number;
  height: number;
};

export type ManualAdSlotConfig = {
  id: ManualAdSlotId;
  /** Nom lisible (AdSense / docs internes). */
  label: string;
  /**
   * ID d'unité AdSense. Chaîne vide = unité pas encore créée :
   * repère local uniquement, aucun `push` réseau.
   */
  adSlot: string;
  enabled: boolean;
  /**
   * true : ordinateur uniquement (sauf In-Article mobile si
   * ADS_MOBILE_IN_ARTICLE_ENABLED).
   * false : sélectionnée autrement (bandeaux haut selon largeur dispo).
   */
  desktopOnly: boolean;
  /**
   * Unités Display fixes : pas de `data-ad-format` / FWR, style
   * `display:inline-block` + width/height explicites (snippet AdSense).
   */
  fixedSize?: ManualAdSlotFixedSize;
  /**
   * Bandeau mobile pleine largeur, hauteur fixe (doc AdSense
   * « largeur variable et hauteur fixe » : width 100% + height contrôlée,
   * sans data-ad-format ni data-full-width-responsive).
   * @see https://support.google.com/adsense/answer/9183363?hl=fr
   */
  fullBleedHeightPx?: number;
  /** Absent pour les unités fixes Display. */
  format?: "auto" | "fluid";
  fullWidthResponsive?: boolean;
  layout?: "in-article";
  /** Style inline minimal demandé par AdSense (In-Article). */
  style?: { display: string; textAlign?: string };
};

/**
 * Ancien slot fixe 320×50, remplacé par le Display responsive
 * `4949154780` (largeur variable, hauteur 60 px sur le `<ins>`).
 */
export const MOBILE_TOP_BANNER_RETIRED_FIXED_SLOT = "9463025573";

/**
 * Emplacements manuels.
 * - Bandeau haut : 728×90 ordinateur, ou mobile pleine largeur ×60 px.
 * - Latéral Display responsive : ordinateur uniquement.
 * - In-Article : ordinateur ; mobile via ADS_MOBILE_IN_ARTICLE_ENABLED.
 * Modifier `adSlot` / `enabled` ici pour piloter la diffusion.
 */
export const MANUAL_AD_SLOTS: Record<ManualAdSlotId, ManualAdSlotConfig> = {
  desktopTopBanner: {
    id: "desktopTopBanner",
    label: "Ordinateur - Bandeau haut 728x90",
    adSlot: "5914149453",
    enabled: true,
    desktopOnly: false,
    fixedSize: { width: 728, height: 90 },
  },
  mobileTopBanner: {
    id: "mobileTopBanner",
    label: "Mobile - Bandeau haut pleine largeur 60px",
    adSlot: "4949154780",
    enabled: true,
    desktopOnly: false,
    fullBleedHeightPx: 60,
  },
  desktopSidebar: {
    id: "desktopSidebar",
    label: "Ordinateur - Colonne droite - Display responsive",
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
 * Choisit le bandeau haut selon la largeur du conteneur.
 * Priorité 728×90 ; sinon bandeau mobile pleine largeur (même sous 320 px).
 */
export function resolveTopBannerSlotId(
  availableWidthPx: number,
): "desktopTopBanner" | "mobileTopBanner" | null {
  const desktop = MANUAL_AD_SLOTS.desktopTopBanner;
  const mobile = MANUAL_AD_SLOTS.mobileTopBanner;
  if (
    desktop.enabled &&
    desktop.fixedSize &&
    availableWidthPx >= desktop.fixedSize.width
  ) {
    return "desktopTopBanner";
  }
  if (mobile.enabled && (mobile.fullBleedHeightPx || mobile.fixedSize)) {
    return "mobileTopBanner";
  }
  return null;
}

/** True tant que l'unité AdSense mobile pleine largeur n'est pas renseignée. */
export function isManualAdSlotPending(slotId: ManualAdSlotId): boolean {
  const slot = MANUAL_AD_SLOTS[slotId];
  return Boolean(slot?.enabled) && !slot.adSlot;
}

/** Viewport autorisé pour un slot manuel (après `ready` client). */
export function isManualAdViewportAllowed(
  slotId: ManualAdSlotId,
  isDesktop: boolean,
): boolean {
  const slot = MANUAL_AD_SLOTS[slotId];
  if (!slot?.desktopOnly) return true;
  if (isDesktop) return true;
  if (slotId === "desktopInArticle") return ADS_MOBILE_IN_ARTICLE_ENABLED;
  return false;
}

/**
 * Exclusions exactes (chemin === entrée).
 * Accueil, pages légales, contact, partenariat : aucune annonce manuelle.
 */
export const AD_EXACT_EXCLUSIONS: readonly string[] = [
  "/",
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
  "https://www.brut-vers-net.fr/",
  "https://www.brut-vers-net.fr/mentions-legales",
  "https://www.brut-vers-net.fr/politique-de-confidentialite",
  "https://www.brut-vers-net.fr/gestion-des-cookies",
  "https://www.brut-vers-net.fr/contact",
  "https://www.brut-vers-net.fr/devenir-partenaire",
  "https://brut-vers-net.fr/",
  "https://brut-vers-net.fr/mentions-legales",
  "https://brut-vers-net.fr/politique-de-confidentialite",
  "https://brut-vers-net.fr/gestion-des-cookies",
  "https://brut-vers-net.fr/contact",
  "https://brut-vers-net.fr/devenir-partenaire",
];
