import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { netToGrossPath } from "./config";

export function NetToGrossPageSidebar({ netMonthly }: { netMonthly: number }) {
  return (
    <SiteSidebar pageType="home" currentPath={netToGrossPath(netMonthly)} />
  );
}
