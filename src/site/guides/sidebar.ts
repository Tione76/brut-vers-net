import type { GuideCoverImage } from "./covers";
import { guides, getGuideBySlug } from "./registry";
import { getGuidePublicPath } from "./paths";
import { getAllCalculators } from "../navigation/calculators-registry";
import type { Guide } from "./types";

export const SIDEBAR_LIMITS = {
  /** Pages guides */
  guideMaxRelatedGuides: 3,
  guideMaxTools: 2,
  guideMaxRecent: 10,
  /** Guides courts : plafonner les récents pour éviter une colonne trop longue */
  guideShortMaxRecent: 4,
  guideMediumMaxRecent: 7,
  /** Pages calculateurs */
  calculatorMaxTools: 2,
  calculatorMaxRelatedGuides: 3,
  calculatorMaxRecent: 10,
  /** Accueil */
  homeMaxTools: 2,
  homeMaxGuides: 3,
  homeMaxRecent: 10,
  /** Page auteur : volume réduit */
  authorMaxGuides: 2,
  /** Compat API historique */
  maxTools: 2,
  maxGuides: 3,
} as const;

/**
 * Outils contextuels de secours par slug (si calculator / discover ne suffisent pas).
 * Ne pas forcer un second outil hors sujet : listes courtes autorisées.
 */
const GUIDE_TOPIC_TOOLS: Record<string, readonly string[]> = {
  smic: ["brut-vers-net", "salaire-heures-supplementaires"],
  "smic-selon-nombre-heures": ["brut-vers-net", "salaire-heures-supplementaires"],
  "smic-europe": ["brut-vers-net", "salaire-heures-supplementaires"],
  "smic-hotelier": ["salaire-heures-supplementaires", "brut-vers-net"],
  "salaire-minimum-allemagne": ["brut-vers-net"],
  "salaire-minimum-suisse": ["brut-vers-net"],
  "salaire-minimum-luxembourg": ["brut-vers-net"],
  "salaire-minimum-belgique": ["brut-vers-net"],
  "evolution-smic": ["brut-vers-net", "salaire-heures-supplementaires"],
  "prime-de-noel": ["brut-vers-net"],
  "prime-activite": ["brut-vers-net"],
  "comment-calculer-son-salaire-net": ["brut-vers-net", "augmentation-salaire"],
  "comment-est-calcule-le-salaire-net": ["brut-vers-net", "augmentation-salaire"],
  "comment-lire-une-fiche-de-paie": ["brut-vers-net"],
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net": ["brut-vers-net"],
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne": ["brut-vers-net"],
  "salaire-moyen-france": ["brut-vers-net", "augmentation-salaire"],
  "quel-est-un-bon-salaire-en-france": ["brut-vers-net", "augmentation-salaire"],
  "salaire-interim-calcul-brut-net": ["brut-vers-net", "salaire-heures-supplementaires"],
  "salaire-alternance": ["brut-vers-net"],
  "solde-de-tout-compte": ["indemnite-licenciement", "brut-vers-net"],
  "conges-payes": ["brut-vers-net"],
  "solde-conges-payes": ["brut-vers-net"],
};

/** Guides de secours thématiques si relatedGuides est trop court. */
const GUIDE_TOPIC_RELATED: Record<string, readonly string[]> = {
  smic: ["smic-selon-nombre-heures", "smic-europe", "smic-hotelier"],
  "smic-selon-nombre-heures": ["smic", "smic-hotelier", "smic-europe"],
  "smic-europe": ["smic", "salaire-minimum-allemagne", "salaire-minimum-luxembourg"],
  "smic-hotelier": ["smic", "smic-selon-nombre-heures", "evolution-smic"],
  "salaire-minimum-allemagne": ["smic-europe", "smic", "smic-selon-nombre-heures"],
  "salaire-minimum-suisse": ["smic-europe", "smic", "salaire-minimum-allemagne"],
  "salaire-minimum-luxembourg": ["smic-europe", "smic", "salaire-minimum-allemagne"],
  "salaire-minimum-belgique": ["smic-europe", "smic", "salaire-minimum-luxembourg"],
  "prime-de-noel": ["prime-activite", "smic", "salaire-moyen-france"],
  "prime-activite": ["prime-de-noel", "smic", "salaire-moyen-france"],
  "solde-de-tout-compte": [
    "comment-lire-une-fiche-de-paie",
    "salaire-interim-calcul-brut-net",
    "comment-est-calcule-le-salaire-net",
  ],
  "conges-payes": [
    "solde-conges-payes",
    "solde-de-tout-compte",
    "comment-lire-une-fiche-de-paie",
  ],
  "solde-conges-payes": [
    "conges-payes",
    "solde-de-tout-compte",
    "comment-lire-une-fiche-de-paie",
  ],
};

export type SidebarPageType =
  | "home"
  | "guide"
  | "calculator"
  | "faq"
  | "guides-hub"
  | "tools-hub"
  | "author"
  | "institutional";

export interface SidebarContext {
  pageType: SidebarPageType;
  currentPath: string;
  currentGuideSlug?: string;
}

export interface SidebarTool {
  id: string;
  title: string;
  description: string;
  href: string;
  cover: GuideCoverImage;
  icon?: string;
  badge?: string;
}

export interface GuideSidebarLink {
  title: string;
  href: string;
  slug: string;
  /** Résumé optionnel (affiché sous le titre dans les cartes cover). */
  description?: string;
}

/** Bundle prêt à rendre : sections distinctes + ordre. */
export interface SidebarBundle {
  tools: SidebarTool[];
  guides: GuideSidebarLink[];
  recentGuides: GuideSidebarLink[];
  /** true = outils avant guides liés (calculateurs). false = guides liés avant outils. */
  toolsFirst: boolean;
}

const DEFAULT_TOOL_BADGE = "✓ Outil gratuit";

/** Calculateurs liés par path. */
const CALCULATOR_RELATED_TOOLS: Record<string, readonly string[]> = {
  "/": ["salaire-heures-supplementaires", "augmentation-salaire"],
  "/calculateurs/salaire-heures-supplementaires": ["brut-vers-net", "augmentation-salaire"],
  "/calculateurs/augmentation-salaire": ["brut-vers-net", "salaire-heures-supplementaires"],
  "/calculateurs/indemnite-licenciement": ["brut-vers-net", "augmentation-salaire"],
  "/salaire-arret-maladie": ["calcul-ijss-arret-maladie", "maintien-salaire-arret-maladie"],
  "/calcul-ijss-arret-maladie": ["salaire-arret-maladie", "maintien-salaire-arret-maladie"],
  "/maintien-salaire-arret-maladie": ["salaire-arret-maladie", "calcul-ijss-arret-maladie"],
};

/** Guides liés par path de calculateur. */
const CALCULATOR_RELATED_GUIDES: Record<
  string,
  readonly { slug: string; title?: string }[]
> = {
  "/": [
    { slug: "comment-est-calcule-le-salaire-net", title: "Différence brut / net" },
    { slug: "comment-lire-une-fiche-de-paie", title: "Lire une fiche de paie" },
    {
      slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
      title: "Cotisations salariales",
    },
  ],
  "/calculateurs/salaire-heures-supplementaires": [
    { slug: "smic-selon-nombre-heures", title: "SMIC selon le nombre d'heures" },
    { slug: "smic-hotelier", title: "SMIC hôtelier (HCR)" },
    { slug: "smic", title: "SMIC : montants brut et net" },
  ],
  "/calculateurs/augmentation-salaire": [
    { slug: "quel-est-un-bon-salaire-en-france", title: "Quel est un bon salaire ?" },
    { slug: "salaire-moyen-france", title: "Salaire moyen en France" },
    { slug: "comment-calculer-son-salaire-net", title: "Calculer son salaire net" },
  ],
  "/calculateurs/indemnite-licenciement": [
    { slug: "comment-lire-une-fiche-de-paie", title: "Lire une fiche de paie" },
    { slug: "comment-calculer-son-salaire-net", title: "Calculer son salaire net" },
    { slug: "salaire-moyen-france", title: "Salaire moyen en France" },
  ],
  "/salaire-arret-maladie": [
    { slug: "calcul-ijss-arret-maladie" },
    { slug: "maintien-salaire-arret-maladie" },
    { slug: "comment-lire-une-fiche-de-paie" },
  ],
  "/calcul-ijss-arret-maladie": [
    { slug: "salaire-arret-maladie" },
    { slug: "maintien-salaire-arret-maladie" },
    { slug: "comment-lire-une-fiche-de-paie" },
  ],
  "/maintien-salaire-arret-maladie": [
    { slug: "salaire-arret-maladie" },
    { slug: "calcul-ijss-arret-maladie" },
    { slug: "comment-lire-une-fiche-de-paie" },
  ],
};

const AUTHOR_FEATURED_GUIDES: readonly { slug: string; title: string }[] = [
  { slug: "smic", title: "SMIC : montants brut et net" },
  { slug: "comment-calculer-son-salaire-net", title: "Calculer son salaire net" },
];

const FAQ_FEATURED_GUIDES: readonly { slug: string; title: string }[] = [
  { slug: "smic", title: "SMIC : montants brut et net" },
  { slug: "prime-de-noel", title: "Prime de Noël" },
  { slug: "comment-calculer-son-salaire-net", title: "Calculer son salaire net" },
];

/** Tous les outils enregistrés : source unique (registre calculateurs) */
export function getAllSidebarTools(): SidebarTool[] {
  return getAllCalculators().map((calc) => ({
    id: calc.id,
    title: calc.shortTitle,
    description: calc.description,
    href: calc.path,
    cover: calc.cover,
    icon: calc.icon,
    badge: DEFAULT_TOOL_BADGE,
  }));
}

/** @deprecated Utiliser getAllSidebarTools() */
export const SIDEBAR_TOOLS = getAllSidebarTools();

export const SIDEBAR_CALCULATOR = {
  title: "Calculateur salaire brut vers net",
  description: "Estimez votre salaire net à partir de votre salaire brut.",
  href: "/",
} as const;

export function normalizeSidebarPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "");
}

export function sidebarPathsMatch(a: string, b: string): boolean {
  return normalizeSidebarPath(a) === normalizeSidebarPath(b);
}

function toolsById(): Map<string, SidebarTool> {
  return new Map(getAllSidebarTools().map((tool) => [tool.id, tool]));
}

function findToolByHref(href: string): SidebarTool | undefined {
  return getAllSidebarTools().find((tool) => sidebarPathsMatch(tool.href, href));
}

function findGuideByHref(href: string): Guide | undefined {
  const normalized = normalizeSidebarPath(href);
  return guides.find((guide) => normalizeSidebarPath(getGuidePublicPath(guide)) === normalized);
}

function toGuideLink(guide: Guide, titleOverride?: string): GuideSidebarLink {
  const description = guide.subtitle?.trim() || guide.description?.trim() || undefined;
  return {
    slug: guide.slug,
    title: titleOverride ?? guide.breadcrumbLabel ?? guide.title,
    href: getGuidePublicPath(guide),
    ...(description ? { description } : {}),
  };
}

function guideLinkFromSlug(slug: string, titleOverride?: string): GuideSidebarLink | null {
  const guide = getGuideBySlug(slug);
  if (!guide) return null;
  return toGuideLink(guide, titleOverride);
}

function dedupeTools(tools: SidebarTool[], currentPath: string): SidebarTool[] {
  const seen = new Set<string>();
  const result: SidebarTool[] = [];
  for (const tool of tools) {
    if (sidebarPathsMatch(tool.href, currentPath)) continue;
    const key = normalizeSidebarPath(tool.href);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(tool);
  }
  return result;
}

function dedupeGuides(items: GuideSidebarLink[], currentPath: string): GuideSidebarLink[] {
  const seen = new Set<string>();
  const result: GuideSidebarLink[] = [];
  for (const item of items) {
    if (sidebarPathsMatch(item.href, currentPath)) continue;
    if (item.href.startsWith("http")) continue;
    if (normalizeSidebarPath(item.href) === "/guides") continue;
    const guide = findGuideByHref(item.href) ?? getGuideBySlug(item.slug);
    if (!guide) continue;
    const href = getGuidePublicPath(guide);
    const key = normalizeSidebarPath(href);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(toGuideLink(guide, item.title));
  }
  return result;
}

/** Guides publiés triés par date de publication (pas dateModified). */
export function getRecentGuideLinksForPath(
  excludeHrefs: string[],
  currentPath: string,
  limit: number,
): GuideSidebarLink[] {
  return getRecentGuideLinks(excludeHrefs, currentPath, limit);
}

function getRecentGuideLinks(
  excludeHrefs: string[],
  currentPath: string,
  limit: number,
): GuideSidebarLink[] {
  const excluded = new Set(
    [...excludeHrefs, currentPath].map((path) => normalizeSidebarPath(path)),
  );

  return [...guides]
    .filter((guide) => !guide.isTemplate)
    .sort((a, b) => {
      const byDate = b.publishedAt.localeCompare(a.publishedAt);
      if (byDate !== 0) return byDate;
      return a.slug.localeCompare(b.slug);
    })
    .map((guide) => toGuideLink(guide))
    .filter((link) => !excluded.has(normalizeSidebarPath(link.href)))
    .slice(0, limit);
}

/** Plafond des récents selon la densité éditoriale du guide. */
function recentLimitForGuide(guide: Guide | undefined): number {
  if (!guide) return SIDEBAR_LIMITS.guideMaxRecent;
  const sectionCount = guide.sections.length;
  const faqCount = guide.faq?.length ?? 0;
  const density = sectionCount + Math.ceil(faqCount / 4);
  if (density <= 5) return SIDEBAR_LIMITS.guideShortMaxRecent;
  if (density <= 9) return SIDEBAR_LIMITS.guideMediumMaxRecent;
  return SIDEBAR_LIMITS.guideMaxRecent;
}

function resolveGuidePageBundle(context: SidebarContext): SidebarBundle {
  const guide = context.currentGuideSlug
    ? getGuideBySlug(context.currentGuideSlug)
    : undefined;
  const slug = guide?.slug ?? context.currentGuideSlug ?? "";

  const relatedFromData = (guide?.sidebar.relatedGuides ?? []).map((item) => ({
    slug:
      findGuideByHref(item.href)?.slug ??
      item.href.replace(/^\/guides\//, "").replace(/^\//, ""),
    title: item.title,
    href: item.href,
  }));

  const topicRelated = (GUIDE_TOPIC_RELATED[slug] ?? []).map((relatedSlug) =>
    guideLinkFromSlug(relatedSlug),
  );

  const relatedGuides = dedupeGuides(
    [
      ...relatedFromData,
      ...topicRelated.filter((item): item is GuideSidebarLink => item !== null),
    ],
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.guideMaxRelatedGuides);

  const byId = toolsById();
  const toolCandidates: SidebarTool[] = [];
  if (guide?.sidebar.relatedSimulator?.href) {
    const tool = findToolByHref(guide.sidebar.relatedSimulator.href);
    if (tool) toolCandidates.push(tool);
  }
  for (const item of guide?.sidebar.discover ?? []) {
    const tool = findToolByHref(item.href);
    if (tool) toolCandidates.push(tool);
  }
  if (guide?.sidebar.calculator?.href) {
    const tool = findToolByHref(guide.sidebar.calculator.href);
    if (tool) toolCandidates.push(tool);
  }
  for (const toolId of GUIDE_TOPIC_TOOLS[slug] ?? []) {
    const tool = byId.get(toolId);
    if (tool) toolCandidates.push(tool);
  }

  const tools = dedupeTools(toolCandidates, context.currentPath).slice(
    0,
    SIDEBAR_LIMITS.guideMaxTools,
  );

  const recentGuides = getRecentGuideLinks(
    relatedGuides.map((item) => item.href),
    context.currentPath,
    recentLimitForGuide(guide),
  );

  return {
    tools,
    guides: relatedGuides,
    recentGuides,
    toolsFirst: false,
  };
}

function resolveCalculatorPageBundle(context: SidebarContext): SidebarBundle {
  const path = normalizeSidebarPath(context.currentPath);
  const byId = toolsById();

  const toolIds = CALCULATOR_RELATED_TOOLS[path] ?? [
    "salaire-heures-supplementaires",
    "augmentation-salaire",
  ];
  const tools = dedupeTools(
    toolIds.map((id) => byId.get(id)).filter((tool): tool is SidebarTool => Boolean(tool)),
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.calculatorMaxTools);

  const guideEntries = CALCULATOR_RELATED_GUIDES[path] ?? [
    { slug: "comment-est-calcule-le-salaire-net" },
    { slug: "comment-lire-une-fiche-de-paie" },
    { slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net" },
  ];
  const relatedGuides = dedupeGuides(
    guideEntries
      .map((entry) => guideLinkFromSlug(entry.slug, entry.title))
      .filter((item): item is GuideSidebarLink => item !== null),
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.calculatorMaxRelatedGuides);

  const recentGuides = getRecentGuideLinks(
    relatedGuides.map((item) => item.href),
    context.currentPath,
    SIDEBAR_LIMITS.calculatorMaxRecent,
  );

  return {
    tools,
    guides: relatedGuides,
    recentGuides,
    toolsFirst: true,
  };
}

function resolveHomeBundle(context: SidebarContext): SidebarBundle {
  const byId = toolsById();
  const tools = dedupeTools(
    ["salaire-heures-supplementaires", "augmentation-salaire"]
      .map((id) => byId.get(id))
      .filter((tool): tool is SidebarTool => Boolean(tool)),
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.homeMaxTools);

  const relatedGuides = dedupeGuides(
    [
      guideLinkFromSlug("comment-est-calcule-le-salaire-net", "Différence brut / net"),
      guideLinkFromSlug("comment-lire-une-fiche-de-paie", "Lire une fiche de paie"),
      guideLinkFromSlug(
        "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
        "Cotisations salariales",
      ),
    ].filter((item): item is GuideSidebarLink => item !== null),
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.homeMaxGuides);

  const recentGuides = getRecentGuideLinks(
    relatedGuides.map((item) => item.href),
    context.currentPath,
    SIDEBAR_LIMITS.homeMaxRecent,
  );

  return { tools, guides: relatedGuides, recentGuides, toolsFirst: true };
}

function resolveAuthorBundle(context: SidebarContext): SidebarBundle {
  const guidesList = dedupeGuides(
    AUTHOR_FEATURED_GUIDES.map((entry) => guideLinkFromSlug(entry.slug, entry.title)).filter(
      (item): item is GuideSidebarLink => item !== null,
    ),
    context.currentPath,
  ).slice(0, SIDEBAR_LIMITS.authorMaxGuides);

  return { tools: [], guides: guidesList, recentGuides: [], toolsFirst: false };
}

function resolveFaqBundle(context: SidebarContext): SidebarBundle {
  const byId = toolsById();
  const tools = dedupeTools(
    [byId.get("brut-vers-net")].filter((tool): tool is SidebarTool => Boolean(tool)),
    context.currentPath,
  ).slice(0, 1);

  const guidesList = dedupeGuides(
    FAQ_FEATURED_GUIDES.map((entry) => guideLinkFromSlug(entry.slug, entry.title)).filter(
      (item): item is GuideSidebarLink => item !== null,
    ),
    context.currentPath,
  ).slice(0, 3);

  return { tools, guides: guidesList, recentGuides: [], toolsFirst: false };
}

/** Point d'entrée unique : sélection contextuelle + récents + ordre. */
export function resolveSidebarBundle(context: SidebarContext): SidebarBundle {
  switch (context.pageType) {
    case "institutional":
      return { tools: [], guides: [], recentGuides: [], toolsFirst: false };
    case "author":
      return resolveAuthorBundle(context);
    case "guide":
      return resolveGuidePageBundle(context);
    case "calculator":
      return resolveCalculatorPageBundle(context);
    case "home":
      return resolveHomeBundle(context);
    case "faq":
      return resolveFaqBundle(context);
    case "guides-hub":
      return {
        tools: dedupeTools(getAllSidebarTools(), context.currentPath).slice(0, 2),
        guides: [],
        recentGuides: getRecentGuideLinks([], context.currentPath, 10),
        toolsFirst: true,
      };
    case "tools-hub":
      return { tools: [], guides: [], recentGuides: [], toolsFirst: false };
    default:
      return { tools: [], guides: [], recentGuides: [], toolsFirst: false };
  }
}

/** Outils à afficher (API historique). */
export function getSidebarTools(context: SidebarContext): SidebarTool[] {
  return resolveSidebarBundle(context).tools;
}

/** Guides liés à afficher (API historique, hors récents). */
export function getSidebarGuides(context: SidebarContext): GuideSidebarLink[] {
  if (context.pageType === "guides-hub") return [];
  return resolveSidebarBundle(context).guides;
}

/** @deprecated Utiliser getSidebarGuides({ pageType, currentPath }) */
export function getGuidesSidebarLinks(): GuideSidebarLink[] {
  return getSidebarGuides({ pageType: "faq", currentPath: "" });
}

/** @deprecated Utiliser getSidebarGuides({ pageType: "guide", currentPath, currentGuideSlug }) */
export function getRelatedGuidesForSlug(currentSlug: string): GuideSidebarLink[] {
  const guide = guides.find((item) => item.slug === currentSlug);
  return getSidebarGuides({
    pageType: "guide",
    currentPath: guide ? getGuidePublicPath(guide) : `/guides/${currentSlug}`,
    currentGuideSlug: currentSlug,
  });
}

/** Vérifie si la sidebar affiche au moins un bloc */
export function hasSidebarContent(context: SidebarContext): boolean {
  const bundle = resolveSidebarBundle(context);
  return bundle.tools.length > 0 || bundle.guides.length > 0 || bundle.recentGuides.length > 0;
}
