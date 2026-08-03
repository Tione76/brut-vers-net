import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { grossToNetPath } from "./config";

export function GrossToNetPageSidebar({ grossMonthly }: { grossMonthly: number }) {
  return <SiteSidebar pageType="home" currentPath={grossToNetPath(grossMonthly)} />;
}
