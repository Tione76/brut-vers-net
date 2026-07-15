import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getAllSidebarTools, type GuideSidebarLink } from "@/site/guides/sidebar";
import { SALARY_INCREASE_PATH } from "./config";

/** Guides prioritaires pour la sidebar (ordre et titres courts) */
const CURATED_GUIDE_ENTRIES: { slug: string; title: string }[] = [
  { slug: "comment-calculer-son-salaire-net", title: "Calcul du salaire net" },
  { slug: "comment-est-calcule-le-salaire-net", title: "Différence brut / net" },
  {
    slug: "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    title: "Cotisations salariales",
  },
  {
    slug: "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
    title: "Prélèvement à la source",
  },
  { slug: "comment-lire-une-fiche-de-paie", title: "Comprendre une fiche de paie" },
];

function getCuratedGuides(): GuideSidebarLink[] {
  return CURATED_GUIDE_ENTRIES.map(({ slug, title }) => ({
    slug,
    title,
    href: `/guides/${slug}`,
  }));
}

/** Sidebar curatée : outils + guides variés, sans répétition avec le contenu principal */
export function SalaryIncreasePageSidebar() {
  const tools = getAllSidebarTools().filter((tool) => tool.href !== SALARY_INCREASE_PATH);

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
