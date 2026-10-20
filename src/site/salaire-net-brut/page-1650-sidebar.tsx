import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import {
  getAllSidebarTools,
  getRecentGuideLinksForPath,
  type GuideSidebarLink,
  type SidebarTool,
} from "@/site/guides/sidebar";
import {
  PAGE_1650_SIDEBAR_GUIDE_ENTRIES,
  PAGE_1650_SIDEBAR_TOOL_IDS,
  buildRedesignEndCtaHref,
} from "./page-1650";

const TOOL_DESCRIPTION_OVERRIDES: Partial<Record<(typeof PAGE_1650_SIDEBAR_TOOL_IDS)[number], string>> =
  {
    "brut-vers-net": "Convertissez un autre salaire net en brut selon votre statut.",
    "salaire-heures-supplementaires": "Estimez vos heures sup en brut et en net.",
  };

function getCuratedTools(netMonthly: number): SidebarTool[] {
  const byId = new Map(getAllSidebarTools().map((tool) => [tool.id, tool]));
  const calculatorHref = buildRedesignEndCtaHref(netMonthly);

  return PAGE_1650_SIDEBAR_TOOL_IDS.flatMap((id) => {
    const tool = byId.get(id);
    if (!tool) return [];
    const description = TOOL_DESCRIPTION_OVERRIDES[id] ?? tool.description;
    return [
      {
        ...tool,
        description,
        href: id === "brut-vers-net" ? calculatorHref : tool.href,
      },
    ];
  });
}

function getCuratedGuides(): GuideSidebarLink[] {
  return PAGE_1650_SIDEBAR_GUIDE_ENTRIES.flatMap(({ slug, title }) => {
    const guide = getGuideBySlug(slug);
    if (!guide) return [];
    return [
      {
        slug: guide.slug,
        title,
        href: getGuidePublicPath(guide),
        description: guide.subtitle || guide.description,
      },
    ];
  });
}

export function Page1650Sidebar({
  netMonthly,
  currentPath,
}: {
  netMonthly: number;
  currentPath?: string;
}) {
  const curatedGuides = getCuratedGuides();
  const path = currentPath ?? `/salaire-net/${netMonthly}-euros`;
  const recentGuides = getRecentGuideLinksForPath(
    [...curatedGuides.map((guide) => guide.href), path],
    path,
    10,
  );

  return (
    <aside className="article-sidebar net-gross-1650-sidebar" aria-label="Maillage interne">
      <div className="article-sidebar__slot article-sidebar__slot--ad" hidden aria-hidden="true" />
      <div className="article-sidebar__recommendations">
        <GuideSidebar
          tools={getCuratedTools(netMonthly)}
          guides={curatedGuides}
          recentGuides={recentGuides}
          guidesSectionTitle="À lire aussi"
          guidesBlockVariant="also-read"
          showTools
          toolsFirst
        />
      </div>
    </aside>
  );
}
