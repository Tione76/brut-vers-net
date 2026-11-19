"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdSlot } from "@/framework/AdSlot";
import { useSite } from "@/framework/SiteProvider";
import { isAdPathExcluded, useTopBannerSlot } from "@/site/ads";
import { SiteNav } from "./SiteNav";

const PARTNER_HREF = "/devenir-partenaire";

function PartnerRail({ side }: { side: "left" | "right" }) {
  return (
    <aside
      className={`site-shell__rail site-shell__rail--${side}`}
      aria-label="Espace partenaire"
    >
      <Link href={PARTNER_HREF} className="site-shell__rail-link">
        <span className="site-shell__rail-title">Espace partenaire</span>
        <span className="site-shell__rail-cta">
          Nous contacter <span aria-hidden="true">→</span>
        </span>
      </Link>
    </aside>
  );
}

function TopAdBand() {
  const pathname = usePathname() || "/";
  const { ready, slotId, containerRef } = useTopBannerSlot();

  if (isAdPathExcluded(pathname)) {
    return (
      <div className="site-shell__top site-shell__top--partner-only">
        <p className="site-shell__ad-links">
          <Link href={PARTNER_HREF}>Devenez partenaire</Link>
          <span aria-hidden="true"> · </span>
          <Link href={PARTNER_HREF}>
            Contactez-nous <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    );
  }

  const mobileBleed = ready && slotId === "mobileTopBanner";

  return (
    <div
      ref={containerRef}
      className={`site-shell__top site-shell__top--ad${mobileBleed ? " site-shell__top--ad-mobile-bleed" : ""}`}
      data-top-banner={slotId ?? undefined}
    >
      {ready && slotId ? (
        <AdSlot slotId={slotId} className="ads-slot--top-banner" />
      ) : null}
      <p className="site-shell__ad-fallback">
        <Link href={PARTNER_HREF}>Devenez partenaire</Link>
        <span aria-hidden="true"> · </span>
        <Link href={PARTNER_HREF}>
          Contactez-nous <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}

/**
 * Chrome commun : menu pleine largeur, fond ardoise, invitations de partenariat
 * et panneau blanc. Bandeau AdSense (728×90 ou mobile pleine largeur ×60) sous le menu.
 */
export function SiteShell({
  children,
  suppressAds = false,
}: {
  children: ReactNode;
  /** Pages d'erreur / écrans sans contenu éditorial. */
  suppressAds?: boolean;
}) {
  const site = useSite();
  const pathname = usePathname();
  const isPartnerPage = pathname === PARTNER_HREF;
  const hideAdBand = isPartnerPage || suppressAds;

  return (
    <>
      <SiteNav
        siteName={site.name}
        nav={site.navigation.header}
        logo={site.logo}
        guidesNavigation={site.guidesNavigation}
        toolsNavigation={site.toolsNavigation}
      />
      <div
        className={`site-shell${isPartnerPage ? " site-shell--partner" : ""}${suppressAds ? " site-shell--no-ads" : ""}`}
        data-ad-skin="default"
      >
        {!hideAdBand ? <TopAdBand /> : null}
        <div className="site-shell__frame">
          {!isPartnerPage ? <PartnerRail side="left" /> : null}
          <div className="site-panel">{children}</div>
          {!isPartnerPage ? <PartnerRail side="right" /> : null}
        </div>
      </div>
    </>
  );
}
