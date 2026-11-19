export {
  ADSENSE_DASHBOARD_EXCLUSIONS,
  ADSENSE_PUBLISHER_ID,
  ADSENSE_SCRIPT_SRC,
  ADS_DESKTOP_MIN_WIDTH_PX,
  ADS_DIFFUSION_ENABLED,
  IN_ARTICLE_EXCEPTIONS,
  MANUAL_AD_SLOTS,
  type InArticlePlacement,
  type ManualAdSlotConfig,
  type ManualAdSlotId,
} from "./ads.config";
export { getInArticlePlacement, isAdPathExcluded } from "./path-rules";
export { useDesktopAds } from "./useDesktopAds";
