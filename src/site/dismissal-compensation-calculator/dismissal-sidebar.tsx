import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getAllSidebarTools, type GuideSidebarLink } from "@/site/guides/sidebar";
import { DISMISSAL_PATH } from "./config";

const CURATED_GUIDE_ENTRIES: { slug: string; title: string }[] = [
  { slug: "comment-lire-une-fiche-de-paie", title: "Comprendre une fiche de paie" },
  { slug: "comment-est-calcule-le-salaire-net", title: "Différence brut / net" },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
  { slug: "comment-calculer-son-salaire-net", title: "Calcul du salaire net" },
];

function getCuratedGuides(): GuideSidebarLink[] {
  return CURATED_GUIDE_ENTRIES.map(({ slug, title }) => ({
    slug,
    title,
    href: `/guides/${slug}`,
  }));
}

export function DismissalCompensationPageSidebar() {
  const tools = getAllSidebarTools().filter((tool) => tool.href !== DISMISSAL_PATH);

  return (
    <aside className="article-sidebar" aria-label="Maillage interne">
      <GuideSidebar
        tools={tools}
        guides={getCuratedGuides()}
        guidesSectionTitle="À lire aussi"
        guidesBlockVariant="also-read"
        showTools
      />
    </aside>
  );
}
