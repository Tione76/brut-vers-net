import { GuideSidebar } from "./GuideRenderer";
import {
  getSidebarGuides,
  getSidebarTools,
  hasSidebarContent,
  type SidebarPageType,
} from "./sidebar";

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

/** Sidebar page hub /nos-outils : guides uniquement */
export function ToolsHubSidebar() {
  return <SiteSidebar pageType="tools-hub" currentPath="/nos-outils" />;
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
