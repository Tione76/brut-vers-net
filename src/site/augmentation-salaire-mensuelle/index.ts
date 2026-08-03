export {
  MONTHLY_INCREASE_AMOUNTS,
  PUBLISHED_MONTHLY_INCREASE_AMOUNTS,
  MONTHLY_INCREASE_CALCULATOR_PATH,
  MONTHLY_INCREASE_PATH_50,
  MONTHLY_INCREASE_PATH_PREFIX,
  MONTHLY_INCREASE_PATH_SUFFIX,
  MONTHLY_INCREASE_UPDATED_AT,
  isMonthlyIncreaseAmount,
  monthlyIncreasePath,
  parseMonthlyIncreaseMontantParam,
  type MonthlyIncreaseAmount,
} from "./config";
export {
  buildAllProfileIncreaseEstimates,
  buildIncreaseComparisonRows,
  estimateNetMonthlyGainFromGrossIncrease,
  formatIncreaseShort,
} from "./data";
export {
  buildMonthlyIncreaseEditorial,
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  getNearbyMonthlyIncreaseAmounts,
  getNearbyMonthlyIncreaseLinks,
  monthlyIncreaseBreadcrumbLabel,
} from "./content";
export { buildIncreaseCalculatorPrefillHref } from "./prefill";
export { MonthlyIncreaseSeriesPageContent } from "./page-50";
export { MonthlyIncreasePageSidebar } from "./sidebar";
