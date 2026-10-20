import type { ReactNode } from "react";
import Link from "next/link";
import { GuideSidebar } from "./GuideRenderer";
import {
  hasSidebarContent,
  resolveSidebarBundle,
  type GuideSidebarLink,
  type SidebarPageType,
} from "./sidebar";
import { getGuideBySlug } from "./registry";
import { getGuidePublicPath } from "./paths";

export interface SiteSidebarProps {
  pageType: SidebarPageType;
  currentPath: string;
  currentGuideSlug?: string;
}

function SidebarShell({ children }: { children: ReactNode }) {
  return (
    <aside className="article-sidebar" aria-label="Maillage interne">
      {/* Emplacement futur publicité (non rendu). Aucun sticky. */}
      <div className="article-sidebar__slot article-sidebar__slot--ad" hidden aria-hidden="true" />
      <div className="article-sidebar__recommendations">{children}</div>
    </aside>
  );
}

/** Sidebar unique : filtre automatiquement la page courante */
export function SiteSidebar({ pageType, currentPath, currentGuideSlug }: SiteSidebarProps) {
  const context = { pageType, currentPath, currentGuideSlug };
  if (!hasSidebarContent(context)) return null;

  const bundle = resolveSidebarBundle(context);
  const guidesSectionTitle =
    pageType === "home" || pageType === "tools-hub" ? "Nos guides" : "À lire aussi";
  const guidesBlockVariant = pageType === "home" || pageType === "tools-hub" ? "guides" : "also-read";

  return (
    <SidebarShell>
      <GuideSidebar
        tools={bundle.tools}
        guides={bundle.guides}
        recentGuides={bundle.recentGuides}
        guidesSectionTitle={guidesSectionTitle}
        guidesBlockVariant={guidesBlockVariant}
        showTools={bundle.tools.length > 0}
        toolsFirst={bundle.toolsFirst}
      />
    </SidebarShell>
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
        href: getGuidePublicPath(guide),
        title,
        description: guide.subtitle || guide.description,
      },
    ];
  }).slice(0, 3);
}

/**
 * Sidebar page hub /nos-outils : mêmes cartes cover que FAQ / guides,
 * uniquement des guides (aucun calculateur).
 */
export function ToolsHubSidebar() {
  const guides = getToolsHubFeaturedGuides();
  if (guides.length === 0) return null;

  return (
    <SidebarShell>
      <GuideSidebar
        guides={guides}
        guidesSectionTitle="Guides à découvrir"
        guidesBlockVariant="guides"
        showTools={false}
        toolsFirst={false}
      />
      <p className="tools-hub-sidebar-footer">
        <Link href="/guides" className="tools-hub-sidebar-footer__link">
          Voir tous les guides
        </Link>
      </p>
    </SidebarShell>
  );
}

/** Sidebar standard : pages guides */
export function GuidePageSidebar({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  return (
    <SiteSidebar
      pageType="guide"
      currentPath={guide ? getGuidePublicPath(guide) : `/guides/${slug}`}
      currentGuideSlug={slug}
    />
  );
}

/** Sidebar page FAQ */
export function FaqPageSidebar() {
  return <SiteSidebar pageType="faq" currentPath="/faq" />;
}

/** Sidebar page auteur : 1–2 guides utiles (pas de bloc récents) */
export function AuthorPageSidebar() {
  return <SiteSidebar pageType="author" currentPath="/auteur/antoine" />;
}

/** Pages institutionnelles : pas de recommandations */
export function InstitutionalPageSidebar() {
  return null;
}

/** Sidebar pages calculateurs secondaires */
export function ToolPageSidebar({ currentPath }: { currentPath: string }) {
  return <SiteSidebar pageType="calculator" currentPath={currentPath} />;
}

/** Sidebar page d'accueil : autres outils + guides */
export function HomePageSidebar() {
  return <SiteSidebar pageType="home" currentPath="/" />;
}
