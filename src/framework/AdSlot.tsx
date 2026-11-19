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
  isManualAdSlotPending,
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
 * - Bandeaux haut : SiteShell monte 728×90 ou mobile pleine largeur ×50.
 * - Latéral : ordinateur ; In-Article : ordinateur (+ mobile si activé).
 * - Diffusion après un choix CMP valide : AdSense décide du mode (personnalisé /
 *   limité / vide). Remontage propre après révocation ou navigation.
 */
export function AdSlot({ slotId, className = "" }: AdSlotProps) {
  const pathname = usePathname() || "/";
  const { status, consentReady } = useConsent();
  const { ready, isDesktop } = useDesktopAds();
  const pushed = useRef(false);
  const reactId = useId();
  const slot = MANUAL_AD_SLOTS[slotId];
  const slotPending = isManualAdSlotPending(slotId);

  const excluded = isAdPathExcluded(pathname);
  const inArticleBlocked =
    slotId === "desktopInArticle" && getInArticlePlacement(pathname) === "disable";
  const viewportOk = isManualAdViewportAllowed(slotId, isDesktop);

  const surfaceOk =
    Boolean(slot?.enabled) &&
    Boolean(ADSENSE_PUBLISHER_ID) &&
    ready &&
    viewportOk &&
    !excluded &&
    !inArticleBlocked &&
    (Boolean(slot.adSlot) || slotPending);

  /** Choix CMP enregistré (Autoriser ou Refuser) : laisser AdSense filtrer. */
  const choiceRecorded = consentReady && status !== "pending";

  const canRender =
    surfaceOk &&
    ADS_DIFFUSION_ENABLED &&
    choiceRecorded &&
    Boolean(slot.adSlot) &&
    !slotPending;

  /**
   * Repère local uniquement quand la diffusion est active (DEV / slot en attente).
   * Si ADS_DIFFUSION_ENABLED est false : aucun rendu, aucun espace réservé.
   */
  const showPreview =
    ADS_DIFFUSION_ENABLED &&
    surfaceOk &&
    !canRender &&
    (IS_DEV || slotPending);

  useEffect(() => {
    pushed.current = false;
  }, [pathname, slotId]);

  useEffect(() => {
    if (!canRender) {
      pushed.current = false;
      return;
    }
    if (pushed.current) return;
    try {
      const queue = (window.adsbygoogle = window.adsbygoogle || []);
      queue.push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [canRender, pathname, slotId, status]);

  if (!ADS_DIFFUSION_ENABLED || (!canRender && !showPreview)) return null;

  const style = slot.fixedSize
    ? {
        display: "inline-block" as const,
        width: `${slot.fixedSize.width}px`,
        height: `${slot.fixedSize.height}px`,
      }
    : slot.fullBleedHeightPx
      ? {
          display: "block" as const,
          width: "100%",
          height: `${slot.fullBleedHeightPx}px`,
        }
      : slot.layout === "in-article"
        ? { display: "block" as const, textAlign: "center" as const }
        : { display: "block" as const };

  const previewModifier =
    slotId === "desktopTopBanner" || slotId === "mobileTopBanner"
      ? "ads-slot__preview--top"
      : slotId === "desktopSidebar"
        ? "ads-slot__preview--sidebar"
        : "ads-slot__preview--in-article";

  const previewSizeLabel = slot.fixedSize
    ? `${slot.fixedSize.width} × ${slot.fixedSize.height}`
    : slot.fullBleedHeightPx
      ? `100% × ${slot.fullBleedHeightPx}`
      : slotId === "desktopSidebar"
        ? "responsive"
        : "repère local";

  return (
    <aside
      className={`ads-slot ads-slot--${slotId}${className ? ` ${className}` : ""}`}
      aria-label="Publicité"
      data-ad-slot-id={slotId}
      data-ad-path={pathname}
      data-ad-preview={showPreview ? "true" : undefined}
      data-ad-pending={slotPending ? "true" : undefined}
    >
      {canRender ? (
        <ins
          key={`${pathname}-${slotId}-${status}-${reactId}`}
          className="adsbygoogle"
          style={style}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot.adSlot}
          {...(slot.format ? { "data-ad-format": slot.format } : {})}
          {...(slot.fullWidthResponsive
            ? { "data-full-width-responsive": "true" }
            : {})}
          {...(slot.layout ? { "data-ad-layout": slot.layout } : {})}
        />
      ) : (
        <div className={`ads-slot__preview ${previewModifier}`} aria-hidden="true">
          <span>{slot.label}</span>
          <span>{previewSizeLabel}</span>
        </div>
      )}
    </aside>
  );
}
