"use client";

import { useEffect, useState } from "react";
import { ADS_DESKTOP_MIN_WIDTH_PX } from "./ads.config";

/**
 * Détecte le viewport desktop AdSense (≥ 1100px).
 * `ready` passe à true après le premier match côté client pour éviter
 * de monter/pousser un slot pendant le SSR ou sur mobile.
 */
export function useDesktopAds(minWidthPx = ADS_DESKTOP_MIN_WIDTH_PX): {
  ready: boolean;
  isDesktop: boolean;
} {
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const sync = () => setIsDesktop(media.matches);
    sync();
    setReady(true);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [minWidthPx]);

  return { ready, isDesktop };
}
