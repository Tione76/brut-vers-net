import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import {
  getAllSidebarTools,
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
    "augmentation-salaire": "Mesurez l'impact d'une augmentation en net.",
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
      },
    ];
  });
}

export function Page1650Sidebar({ netMonthly }: { netMonthly: number }) {
  return (
    <aside className="article-sidebar net-gross-1650-sidebar" aria-label="Maillage interne">
      <GuideSidebar
        tools={getCuratedTools(netMonthly)}
        guides={getCuratedGuides()}
        guidesSectionTitle="À lire aussi"
        guidesBlockVariant="also-read"
        showTools
      />
    </aside>
  );
}
