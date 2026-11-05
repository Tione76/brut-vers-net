"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/framework/SiteProvider";
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
 * Chrome commun : menu pleine largeur, fond ardoise, invitations de partenariat
 * et panneau blanc. Prêt pour un habillage publicitaire continu (bandeau + rails)
 * sans script de diffusion pour l'instant.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const site = useSite();
  const pathname = usePathname();
  const isPartnerPage = pathname === PARTNER_HREF;

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
        className={`site-shell${isPartnerPage ? " site-shell--partner" : ""}`}
        data-ad-skin="default"
      >
        {!isPartnerPage ? (
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
        ) : null}
        <div className="site-shell__frame">
          {!isPartnerPage ? <PartnerRail side="left" /> : null}
          <div className="site-panel">{children}</div>
          {!isPartnerPage ? <PartnerRail side="right" /> : null}
        </div>
      </div>
    </>
  );
}
