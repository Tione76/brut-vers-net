"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ShareBlock, type ShareBlockProps } from "@/framework/design/components/ShareBlock";

const SLOT_ID = "guide-share-slot";
const DESKTOP_MQ = "(min-width: 900px)";

type GuideMastheadShareProps = Omit<ShareBlockProps, "layout" | "variant"> & {
  variant?: ShareBlockProps["variant"];
};

/**
 * Desktop : monte le partage dans la ligne « Guide pratique » (#guide-share-slot).
 * Mobile : reste dans le flux sous les métadonnées (emplacement d'appel).
 */
export function GuideMastheadShare({
  variant = "onLight",
  ...share
}: GuideMastheadShareProps) {
  const [desktopSlot, setDesktopSlot] = useState<Element | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => {
      setDesktopSlot(mq.matches ? document.getElementById(SLOT_ID) : null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const block: ReactNode = (
    <ShareBlock {...share} variant={variant} layout="masthead" />
  );

  if (desktopSlot) {
    return createPortal(block, desktopSlot);
  }

  return block;
}

export const GUIDE_SHARE_SLOT_ID = SLOT_ID;
