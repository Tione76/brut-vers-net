import { SiteSidebar } from "@/site/guides/GuidePageSidebar";
import { grossPrimePath } from "./config";

export function GrossPrimePageSidebar({ grossPrime }: { grossPrime: number }) {
  return <SiteSidebar pageType="home" currentPath={grossPrimePath(grossPrime)} />;
}
