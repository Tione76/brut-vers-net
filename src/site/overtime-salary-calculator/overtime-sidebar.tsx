import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getAllSidebarTools, type GuideSidebarLink } from "@/site/guides/sidebar";
import { OVERTIME_PATH } from "./config";

const CURATED_GUIDE_ENTRIES: { slug: string; title: string }[] = [
  { slug: "comment-calculer-son-salaire-net", title: "Calcul du salaire net" },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
  { slug: "comment-lire-une-fiche-de-paie", title: "Comprendre une fiche de paie" },
  {
    slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
    title: "Prélèvement à la source",
  },
  { slug: "comment-est-calcule-le-salaire-net", title: "Différence brut / net" },
];

function getCuratedGuides(): GuideSidebarLink[] {
  return CURATED_GUIDE_ENTRIES.map(({ slug, title }) => ({
    slug,
    title,
    href: `/guides/${slug}`,
  }));
}

export function OvertimeSalaryPageSidebar() {
  const tools = getAllSidebarTools().filter((tool) => tool.href !== OVERTIME_PATH);

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
