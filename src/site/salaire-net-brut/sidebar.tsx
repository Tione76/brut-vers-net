import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { netToGrossPath } from "./config";
import { isNetToGross1650Prototype } from "./page-1650";
import { Page1650Sidebar } from "./page-1650-sidebar";

export function NetToGrossPageSidebar({ netMonthly }: { netMonthly: number }) {
  if (isNetToGross1650Prototype(netMonthly)) {
    return <Page1650Sidebar />;
  }

  return <SiteSidebar pageType="home" currentPath={netToGrossPath(netMonthly)} />;
}
