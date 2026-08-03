import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { monthlyIncreasePath } from "./config";

export function MonthlyIncreasePageSidebar({
  grossMonthlyIncrease,
}: {
  grossMonthlyIncrease: number;
}) {
  return (
    <SiteSidebar
      pageType="home"
      currentPath={monthlyIncreasePath(grossMonthlyIncrease)}
    />
  );
}
