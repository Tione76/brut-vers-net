import { GuideSidebar } from "./GuideRenderer";
import {
  getGuidesSidebarLinks,
  getRelatedGuidesForSlug,
  SIDEBAR_CALCULATOR,
} from "./sidebar";

/** Sidebar standard — pages guides (outils + à lire aussi) */
export function GuidePageSidebar({ slug }: { slug: string }) {
  return (
    <GuideSidebar
      calculator={SIDEBAR_CALCULATOR}
      relatedGuides={getRelatedGuidesForSlug(slug)}
      showTools
    />
  );
}

/** Sidebar page FAQ — identique aux guides (outils + à lire aussi) */
export function FaqPageSidebar() {
  return (
    <GuideSidebar
      calculator={SIDEBAR_CALCULATOR}
      allGuides={getGuidesSidebarLinks()}
      showTools
    />
  );
}

/** Sidebar page d'accueil — guides uniquement, sans bloc calculateur */
export function HomePageSidebar() {
  return (
    <GuideSidebar
      allGuides={getGuidesSidebarLinks()}
      guidesSectionTitle="À lire aussi"
      showTools={false}
    />
  );
}
