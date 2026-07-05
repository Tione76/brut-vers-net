"use client";

import { useSite } from "@/framework/SiteProvider";
import { FooterCurveUp } from "./components/Curves";
import { SiteFooter } from "./components/SiteFooter";

/** Footer officiel du site — unique source de vérité (via SiteFooter) */
export function PageFooter() {
  const site = useSite();

  return (
    <>
      <FooterCurveUp />
      <SiteFooter
        brandName={site.footerBrandName}
        siteName={site.name}
        footerDescription={site.footerDescription}
        tools={site.tools}
        footerLinks={site.navigation.footer}
        logoLetter={site.logoLetter}
      />
    </>
  );
}
