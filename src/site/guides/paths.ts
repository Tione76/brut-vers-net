import type { Guide } from "./types";

/** Chemin public canonique d'un guide (`publicPath` ou `/guides/{slug}`). */
export function getGuidePublicPath(guide: Pick<Guide, "slug" | "publicPath">): string {
  return guide.publicPath ?? `/guides/${guide.slug}`;
}
