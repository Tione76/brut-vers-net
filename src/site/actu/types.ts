import type { GuideCoverImage } from "@/site/guides/covers";

export type ActuStatus = "published" | "draft";

export type ActuSource = {
  /** Titre compréhensible pour le lecteur. */
  title: string;
  /** Éditeur ou organisme. */
  publisher: string;
  /** URL exacte consultée. */
  href: string;
  /** Date du document lorsque connue (affichage libre). */
  dateLabel?: string;
  /** Rôle éditorial (annonce, barème, contexte). */
  role?: string;
};

export type ActuArticle = {
  slug: string;
  status: ActuStatus;
  title: string;
  /** Titre SEO si distinct du H1. */
  seoTitle?: string;
  description: string;
  /** Sous-titre sous le H1. */
  subtitle: string;
  /** Fil d'Ariane et cartes. */
  shortTitle: string;
  /** Chapô / excerpt pour hub, RSS et cartes. */
  excerpt: string;
  /** Date ISO 8601 complète de première publication (Europe/Paris). */
  publishedAt: string;
  /** Date ISO 8601 complète de dernière modification éditoriale réelle. */
  modifiedAt: string;
  authorName: string;
  category: string;
  cover: GuideCoverImage;
  sources: ActuSource[];
  /** Temps de lecture estimé (minutes). */
  readingTimeMinutes: number;
};

export function getActuPublicPath(article: Pick<ActuArticle, "slug">): string {
  return `/actu/${article.slug}`;
}
