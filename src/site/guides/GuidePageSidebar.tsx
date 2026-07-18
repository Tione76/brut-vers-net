import Link from "next/link";
import { GuideSidebar } from "./GuideRenderer";
import {
  getSidebarGuides,
  getSidebarTools,
  hasSidebarContent,
  type GuideSidebarLink,
  type SidebarPageType,
} from "./sidebar";
import { getGuideBySlug } from "./registry";

export interface SiteSidebarProps {
  pageType: SidebarPageType;
  currentPath: string;
  currentGuideSlug?: string;
}

/** Sidebar unique : filtre automatiquement la page courante */
export function SiteSidebar({ pageType, currentPath, currentGuideSlug }: SiteSidebarProps) {
  const context = { pageType, currentPath, currentGuideSlug };
  const tools = getSidebarTools(context);
  const guides =
    pageType === "guides-hub"
      ? []
      : getSidebarGuides(context);
  const showTools = tools.length > 0;

  if (!hasSidebarContent(context)) return null;
  const guidesSectionTitle =
    pageType === "home" || pageType === "tools-hub" ? "Nos guides" : "À lire aussi";
  const guidesBlockVariant = pageType === "home" || pageType === "tools-hub" ? "guides" : "also-read";

  return (
    <aside className="article-sidebar" aria-label="Maillage interne">
      <GuideSidebar
        tools={tools}
        guides={guides}
        guidesSectionTitle={guidesSectionTitle}
        guidesBlockVariant={guidesBlockVariant}
        showTools={showTools}
      />
    </aside>
  );
}

/** Sidebar page hub /guides : outils uniquement */
export function GuidesHubSidebar() {
  return <SiteSidebar pageType="guides-hub" currentPath="/guides" />;
}

const TOOLS_HUB_FEATURED_GUIDES: {
  slug: string;
  title: string;
}[] = [
  { slug: "comment-lire-une-fiche-de-paie", title: "Comment lire une fiche de paie" },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Comprendre les cotisations salariales",
  },
  {
    slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
    title: "Comprendre le prélèvement à la source",
  },
  { slug: "comment-calculer-son-salaire-net", title: "Comment calculer son salaire net" },
];

function getToolsHubFeaturedGuides(): GuideSidebarLink[] {
  return TOOLS_HUB_FEATURED_GUIDES.flatMap(({ slug, title }) => {
    const guide = getGuideBySlug(slug);
    if (!guide) return [];
    return [
      {
        slug: guide.slug,
        href: `/guides/${guide.slug}`,
        title,
        description: guide.subtitle || guide.description,
      },
    ];
  });
}

/**
 * Sidebar page hub /nos-outils : mêmes cartes cover que FAQ / guides,
 * uniquement des guides (aucun calculateur).
 */
export function ToolsHubSidebar() {
  const guides = getToolsHubFeaturedGuides();
  if (guides.length === 0) return null;

  return (
    <aside className="article-sidebar" aria-label="Guides à découvrir">
      <GuideSidebar
        guides={guides}
        guidesSectionTitle="Guides à découvrir"
        guidesBlockVariant="guides"
        showTools={false}
      />
      <p className="tools-hub-sidebar-footer">
        <Link href="/guides" className="tools-hub-sidebar-footer__link">
          Voir tous les guides
        </Link>
      </p>
    </aside>
  );
}

/** Sidebar standard : pages guides */
export function GuidePageSidebar({ slug }: { slug: string }) {
  return (
    <SiteSidebar
      pageType="guide"
      currentPath={`/guides/${slug}`}
      currentGuideSlug={slug}
    />
  );
}

/** Sidebar page FAQ */
export function FaqPageSidebar() {
  return <SiteSidebar pageType="faq" currentPath="/faq" />;
}

/** Sidebar pages calculateurs secondaires */
export function ToolPageSidebar({ currentPath }: { currentPath: string }) {
  return <SiteSidebar pageType="calculator" currentPath={currentPath} />;
}

/** Sidebar page d'accueil : autres outils + guides */
export function HomePageSidebar() {
  return <SiteSidebar pageType="home" currentPath="/" />;
}
