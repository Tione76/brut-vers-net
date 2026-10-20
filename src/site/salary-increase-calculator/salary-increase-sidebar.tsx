import { ToolPageSidebar } from "@/site/guides/GuidePageSidebar";
import { SALARY_INCREASE_PATH } from "./config";

/** Sidebar curatée via le moteur central de recommandations. */
export function SalaryIncreasePageSidebar() {
  return <ToolPageSidebar currentPath={SALARY_INCREASE_PATH} />;
}
