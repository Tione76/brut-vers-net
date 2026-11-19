"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/framework/SiteProvider";
import {
  ADSENSE_PUBLISHER_ID,
  ADS_DIFFUSION_ENABLED,
  MANUAL_AD_SLOTS,
  getInArticlePlacement,
  isAdPathExcluded,
  isManualAdViewportAllowed,
  useDesktopAds,
  type ManualAdSlotId,
} from "@/site/ads";

type AdSlotProps = {
  slotId: ManualAdSlotId;
  className?: string;
};

const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Bloc AdSense manuel commun.
 * - Gabarits partagés décident du placement (une instance par emplacement).
 * - Bandeau haut : tous viewports ; latéral : ordinateur ; In-Article : ordinateur
 *   (+ mobile si ADS_MOBILE_IN_ARTICLE_ENABLED).
 * - Remontage propre à chaque navigation (clé pathname) pour un seul push par unité.
 */
export function AdSlot({ slotId, className = "" }: AdSlotProps) {
  const pathname = usePathname() || "/";
  const { preferences, status } = useConsent();
  const { ready, isDesktop } = useDesktopAds();
  const pushed = useRef(false);
  const reactId = useId();
  const slot = MANUAL_AD_SLOTS[slotId];

  const excluded = isAdPathExcluded(pathname);
  const inArticleBlocked =
    slotId === "desktopInArticle" && getInArticlePlacement(pathname) === "disable";
  const viewportOk = isManualAdViewportAllowed(slotId, isDesktop);

  const surfaceOk =
    Boolean(slot?.enabled) &&
    Boolean(ADSENSE_PUBLISHER_ID) &&
    Boolean(slot.adSlot) &&
    ready &&
    viewportOk &&
    !excluded &&
    !inArticleBlocked;

  const canRender =
    surfaceOk &&
    ADS_DIFFUSION_ENABLED &&
    status !== "pending" &&
    preferences.advertising;

  /** Repère de mise en page local : pas de push AdSense. */
  const showPreview = IS_DEV && surfaceOk && !canRender;

  useEffect(() => {
    pushed.current = false;
  }, [pathname, slotId]);

  useEffect(() => {
    if (!canRender || pushed.current) return;
    try {
      const queue = (window.adsbygoogle = window.adsbygoogle || []);
      queue.push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [canRender, pathname, slotId]);

  if (!canRender && !showPreview) return null;

  const style =
    slot.layout === "in-article"
      ? { display: "block" as const, textAlign: "center" as const }
      : { display: "block" as const };

  const previewModifier =
    slotId === "desktopTopBanner"
      ? "ads-slot__preview--top"
      : slotId === "desktopSidebar"
        ? "ads-slot__preview--sidebar"
        : "ads-slot__preview--in-article";

  return (
    <aside
      className={`ads-slot ads-slot--${slotId}${className ? ` ${className}` : ""}`}
      aria-label="Publicité"
      data-ad-slot-id={slotId}
      data-ad-path={pathname}
      data-ad-preview={showPreview ? "true" : undefined}
    >
      {canRender ? (
        <ins
          key={`${pathname}-${slotId}-${reactId}`}
          className="adsbygoogle"
          style={style}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot.adSlot}
          data-ad-format={slot.format}
          {...(slot.fullWidthResponsive
            ? { "data-full-width-responsive": "true" }
            : {})}
          {...(slot.layout ? { "data-ad-layout": slot.layout } : {})}
        />
      ) : (
        <div className={`ads-slot__preview ${previewModifier}`} aria-hidden="true">
          <span>{slot.label}</span>
          <span>
            {slotId === "desktopSidebar" ? "300 × 250" : "repère local"}
          </span>
        </div>
      )}
    </aside>
  );
}
