import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getAllSidebarTools, type GuideSidebarLink, type SidebarTool } from "@/site/guides/sidebar";
import { DISMISSAL_PATH } from "./config";

const CURATED_TOOL_IDS = [
  "brut-vers-net",
  "augmentation-salaire",
  "salaire-heures-supplementaires",
] as const;

const CURATED_GUIDE_ENTRIES: { slug: string; title: string }[] = [
  { slug: "comment-lire-une-fiche-de-paie", title: "Comprendre une fiche de paie" },
  { slug: "comment-est-calcule-le-salaire-net", title: "Différence entre salaire brut et net" },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
];

function getCuratedGuides(): GuideSidebarLink[] {
  return CURATED_GUIDE_ENTRIES.map(({ slug, title }) => ({
    slug,
    title,
    href: `/guides/${slug}`,
  }));
}

const TOOL_DESCRIPTION_OVERRIDES: Partial<Record<(typeof CURATED_TOOL_IDS)[number], string>> = {
  "brut-vers-net": "Estimez votre salaire net à partir de votre salaire brut.",
  "augmentation-salaire": "Mesurez l'impact d'une augmentation en net.",
  "salaire-heures-supplementaires": "Estimez vos heures sup en brut et en net.",
};

function getCuratedTools(): SidebarTool[] {
  const byId = new Map(
    getAllSidebarTools()
      .filter((tool) => tool.href !== DISMISSAL_PATH)
      .map((tool) => [tool.id, tool]),
  );

  return CURATED_TOOL_IDS.map((id) => {
    const tool = byId.get(id);
    if (!tool) return null;
    const description = TOOL_DESCRIPTION_OVERRIDES[id] ?? tool.description;
    return { ...tool, description };
  }).filter((tool): tool is SidebarTool => tool !== null);
}

export function DismissalCompensationPageSidebar() {
  return (
    <aside className="article-sidebar dismissal-sidebar" aria-label="Maillage interne">
      <GuideSidebar
        tools={getCuratedTools()}
        guides={getCuratedGuides()}
        guidesSectionTitle="À lire aussi"
        guidesBlockVariant="also-read"
        showTools
      />
    </aside>
  );
}
