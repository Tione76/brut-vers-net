"use client";

import { useSite } from "@/framework/SiteProvider";
import { SiteFooter } from "./components/SiteFooter";

/** Footer officiel du site : unique source de vérité (via SiteFooter) */
export function PageFooter() {
  const site = useSite();

  return (
    <SiteFooter
      brandName={site.footerBrandName}
      footerDescription={site.footerDescription}
      footerLinks={site.navigation.footer}
    />
  );
}
