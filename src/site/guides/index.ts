export type {
  Guide,
  GuideBlock,
  GuideCallout,
  GuideCalloutVariant,
  GuideConclusion,
  GuideImagePlaceholder,
  GuideInternalLink,
  GuideLinkVariant,
  GuideProfessionFaq,
  GuideQuickSummary,
  GuideSection,
  GuideSidebarLinks,
  GuideSubsection,
  GuideTocEntry,
} from "./types";

export { GUIDE_CALLOUT_LABELS } from "./types";
export {
  guides,
  GUIDE_MODEL_SLUG,
  getAllGuideSlugs,
  getGuideBySlug,
  getPublishedGuideSlugs,
} from "./registry";
export { buildArticleSchema } from "./schema";
export { buildGuideToc, buildGuideTocH2, computeReadingTime } from "./utils";
export {
  attachGuideCover,
  coverToOgInput,
  coverToSchemaImage,
  getCalculatorCover,
  getGuideCover,
  getGuideCoverByHref,
  CALCULATOR_COVERS,
  FAQ_COVER,
  GUIDE_COVERS,
  GUIDES_HUB_COVER,
  HOME_COVER,
  resolveGuideCover,
  TOOLS_HUB_COVER,
  toAbsoluteAssetUrl,
} from "./covers";
export type { GuideCoverImage, CoverCredit, CoverCreditSource } from "./covers";
export { formatCoverCredit } from "./covers";
export { GuideArticle, GuideInlineToc, GuideSidebar } from "./GuideRenderer";
export {
  SiteSidebar,
  GuidePageSidebar,
  GuidesHubSidebar,
  ToolsHubSidebar,
  HomePageSidebar,
  FaqPageSidebar,
  ToolPageSidebar,
} from "./GuidePageSidebar";
export {
  getAllSidebarTools,
  getSidebarGuides,
  getSidebarTools,
  getGuidesSidebarLinks,
  getRelatedGuidesForSlug,
  hasSidebarContent,
  SIDEBAR_CALCULATOR,
  SIDEBAR_LIMITS,
  SIDEBAR_TOOLS,
} from "./sidebar";
export type { GuideSidebarLink, SidebarContext, SidebarPageType, SidebarTool } from "./sidebar";
export { GuideCoverImage as GuideCoverImageComponent } from "./GuideCoverImage";
export { CoverFigure } from "./CoverFigure";
export { GuideListCard } from "./GuideListCard";
export { GuidesHubEditorial, GuidesHubWhySection } from "./guides-hub-editorial";
export { GuidesHubFaq } from "./guides-hub-faq";
export {
  getGuideHubTeaser,
  GUIDES_HUB_FAQ,
  GUIDES_HUB_LIST_INTRO,
  GUIDES_HUB_LIST_TITLE,
  GUIDES_HUB_PAGE_SUBTITLE,
} from "./guides-hub-data";
export { GuidesHubPicker } from "./guides-hub-picker";
export { GuidePageLayout } from "./GuidePageLayout";
