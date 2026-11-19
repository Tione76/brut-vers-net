"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  resolveTopBannerSlotId,
  type ManualAdSlotId,
} from "./ads.config";

export type TopBannerSlotId = Extract<
  ManualAdSlotId,
  "desktopTopBanner" | "mobileTopBanner"
>;

function contentWidthPx(el: HTMLElement): number {
  const style = window.getComputedStyle(el);
  const paddingX =
    (Number.parseFloat(style.paddingLeft) || 0) +
    (Number.parseFloat(style.paddingRight) || 0);
  return Math.max(0, el.clientWidth - paddingX);
}

/**
 * Mesure la largeur utile du bandeau haut et choisit 728×90, 320×50, ou rien.
 */
export function useTopBannerSlot(): {
  ready: boolean;
  slotId: TopBannerSlotId | null;
  containerRef: RefObject<HTMLDivElement | null>;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [slotId, setSlotId] = useState<TopBannerSlotId | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sync = () => {
      setSlotId(resolveTopBannerSlotId(contentWidthPx(el)));
      setReady(true);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ready, slotId, containerRef };
}
