"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdSlot } from "@/framework/AdSlot";
import { useSite } from "@/framework/SiteProvider";
import {
  ADS_DIFFUSION_ENABLED,
  isAdPathExcluded,
  useTopBannerSlot,
} from "@/site/ads";
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

/**
 * Bandeau d'origine (avant AdSense) : écart sous le menu + invitation partenaire.
 * Hauteurs : 4.75rem par défaut, 8.25rem ≥900px, padding 12/16/14 sur ≤639px.
 */
function PartnerInviteBand() {
  return (
    <div className="site-shell__top">
      <p className="site-shell__ad-kicker">Votre publicité ici</p>
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

function TopAdBand() {
  const pathname = usePathname() || "/";
  const { ready, slotId, containerRef } = useTopBannerSlot();

  if (isAdPathExcluded(pathname)) {
    // Accueil : pas de bandeau ni d'espace réservé. Autres exclusions : lien partenaire.
    if (pathname === "/") return null;

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
 * et panneau blanc. Bandeau AdSense si ADS_DIFFUSION_ENABLED, sinon bandeau
 * partenaire d'origine (écart sous le menu indépendant des pubs).
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
  const pathname = usePathname() || "/";
  const isPartnerPage = pathname === PARTNER_HREF;
  const adsLive = ADS_DIFFUSION_ENABLED && !suppressAds;
  const homeAdsPaused = adsLive && pathname === "/";
  const hideChromeBand = isPartnerPage || suppressAds;

  let topBand: ReactNode = null;
  if (!hideChromeBand) {
    if (!ADS_DIFFUSION_ENABLED) {
      topBand = <PartnerInviteBand />;
    } else if (!homeAdsPaused) {
      topBand = <TopAdBand />;
    }
  }

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
        className={`site-shell${isPartnerPage ? " site-shell--partner" : ""}${suppressAds ? " site-shell--no-ads" : ""}${homeAdsPaused ? " site-shell--home-ads-paused" : ""}`}
        data-ad-skin="default"
        data-ads-diffusion={ADS_DIFFUSION_ENABLED ? "on" : "off"}
      >
        {topBand}
        <div className="site-shell__frame">
          {!isPartnerPage ? <PartnerRail side="left" /> : null}
          <div className="site-panel">{children}</div>
          {!isPartnerPage ? <PartnerRail side="right" /> : null}
        </div>
      </div>
    </>
  );
}
