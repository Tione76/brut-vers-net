export {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  GROSS_TO_NET_PATH_1000,
  GROSS_TO_NET_PATH_PREFIX,
  GROSS_TO_NET_PATH_SUFFIX,
  GROSS_TO_NET_UPDATED_AT,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
  isGrossToNetAmount,
  isPublishedGrossToNetAmount,
  parseGrossToNetMontantParam,
  type GrossToNetAmount,
} from "./config";
export {
  buildAllProfileNetEstimates,
  buildGrossToNetComparisonRows,
  estimateNetMonthlyFromGross,
  formatEuroAmount,
  formatGrossShort,
} from "./data";
export {
  GROSS_TO_NET_AUTHORITY_NOTE,
  GROSS_TO_NET_TAX_CALCULATOR_LABEL,
  GROSS_TO_NET_TAX_H2,
  GROSS_TO_NET_TAX_SECTION_ID,
  buildGrossToNetAnnualCopy,
  buildGrossToNetAnnualH2,
  buildGrossToNetEditorial,
  buildGrossToNetFaqItems,
  buildGrossToNetSeoMeta,
  buildGrossToNetTaxParagraphs,
  getNearbyGrossToNetAmounts,
  getNearbyGrossToNetLinks,
  grossToNetAnnualSectionId,
  grossToNetBreadcrumbLabel,
} from "./content";
export {
  CROSS_LINK_MAX_DISTANCE_EUR,
  findClosestCatalogAmount,
  getInverseGrossToNetLink,
  getInverseNetToGrossLink,
  type InverseGrossToNetLink,
  type InverseNetToGrossLink,
} from "./cross-link";
export {
  buildGrossToNetIndexRows,
  findPublishedGrossNearest,
  grossToNetIndexRowId,
  isGrossToNetMilestoneAmount,
  parseGrossSearchInput,
  type GrossToNetIndexRow,
} from "./index-table";
export {
  buildGrossToNetHubEditorial,
  buildGrossToNetHubFaq,
  buildGrossToNetHubMethodology,
  buildGrossToNetHubPayload,
  buildGrossToNetHubRanges,
  buildGrossToNetHubSeo,
  grossToNetHubFicheDomId,
} from "./hub";
export { GrossToNetHubPageContent } from "./hub-page";
export { GrossToNetHubAmountSearch } from "./hub-search";
export {
  buildGrossToNetIndexEditorial,
  buildGrossToNetIndexFaq,
  buildGrossToNetIndexPayload,
  buildGrossToNetIndexSeo,
  buildGrossToNetIndexToc,
} from "./series-index";
export { GrossToNetIndexPageContent } from "./series-index-page";
export { GrossToNetIndexTableSearch } from "./series-index-search";
export { buildCalculatorGrossPrefillHref } from "./prefill";
export { GrossToNetSeriesPageContent } from "./page-1000";
export { GrossToNet1000PageContent, GrossToNet1000PageSidebar } from "./page-1000-pilot-content";
export {
  GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
  PAGE_1000_DATE_MODIFIED,
  PAGE_1000_DATE_PUBLISHED,
  PAGE_1000_DESCRIPTION,
  PAGE_1000_GROSS,
  PAGE_1000_H1,
  PAGE_1000_SEO,
  PAGE_1000_TITLE,
  buildGrossToNetRedesignSeoMeta,
  buildPage1000FaqItems,
  formatPilotEuro,
  isGrossToNet1000Pilot,
  resolveGrossToNetSeoMeta,
} from "./page-1000-pilot";
export { GrossToNetPageSidebar } from "./sidebar";
export { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
export {
  buildGrossToNetOgAlt,
  buildGrossToNetOgImageInput,
  buildGrossToNetSeriesOgAlt,
  grossToNetOgImagePath,
  GROSS_TO_NET_OG_CONTENT_TYPE,
  GROSS_TO_NET_OG_SIZE,
  GROSS_TO_NET_OG_STATIC_PATH,
} from "./og-image";
