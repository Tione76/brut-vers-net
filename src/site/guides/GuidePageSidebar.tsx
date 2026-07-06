import { GuideSidebar } from "./GuideRenderer";
import {
  getSidebarGuides,
  getSidebarTools,
  type SidebarPageType,
} from "./sidebar";

export interface SiteSidebarProps {
  pageType: SidebarPageType;
  currentPath: string;
  currentGuideSlug?: string;
}

/** Sidebar unique — filtre automatiquement la page courante */
export function SiteSidebar({ pageType, currentPath, currentGuideSlug }: SiteSidebarProps) {
  const context = { pageType, currentPath, currentGuideSlug };
  const tools = getSidebarTools(context);
  const guides = getSidebarGuides(context);
  const showTools = tools.length > 0;
  const guidesSectionTitle = pageType === "home" ? "Nos guides" : "À lire aussi";
  const guidesBlockVariant = pageType === "home" ? "guides" : "also-read";

  return (
    <GuideSidebar
      tools={tools}
      guides={guides}
      guidesSectionTitle={guidesSectionTitle}
      guidesBlockVariant={guidesBlockVariant}
      showTools={showTools}
    />
  );
}

/** Sidebar standard — pages guides */
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

/** Sidebar page d'accueil — autres outils + guides (sans le calculateur HT → TTC) */
export function HomePageSidebar() {
  return <SiteSidebar pageType="home" currentPath="/" />;
}
