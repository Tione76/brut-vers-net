import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { netToGrossPath } from "./config";
import { Page1650Sidebar } from "./page-1650-sidebar";
import { isNetToGrossRedesign } from "./redesign-wave";

export function NetToGrossPageSidebar({ netMonthly }: { netMonthly: number }) {
  if (isNetToGrossRedesign(netMonthly)) {
    return <Page1650Sidebar netMonthly={netMonthly} />;
  }

  return <SiteSidebar pageType="home" currentPath={netToGrossPath(netMonthly)} />;
}
