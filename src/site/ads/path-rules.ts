import {
  AD_EXACT_EXCLUSIONS,
  AD_PREFIX_EXCLUSIONS,
  IN_ARTICLE_EXCEPTIONS,
  type InArticlePlacement,
} from "./ads.config";

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.split("?")[0]?.split("#")[0] || "/";
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    return trimmed.slice(0, -1);
  }
  return trimmed || "/";
}

/** True si la route est exclue de toute diffusion manuelle (et du chargement script ciblé). */
export function isAdPathExcluded(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (AD_EXACT_EXCLUSIONS.includes(path)) return true;
  return AD_PREFIX_EXCLUSIONS.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function getInArticlePlacement(pathname: string): InArticlePlacement {
  const path = normalizePath(pathname);
  return IN_ARTICLE_EXCEPTIONS[path] ?? "default";
}
