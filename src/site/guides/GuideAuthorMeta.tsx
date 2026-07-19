import Link from "next/link";
import { SITE_AUTHOR } from "@/site/author";
import { formatLongDateFr } from "@/site/dates";

type GuideAuthorMetaProps = {
  /** Date calendaire guide.updatedAt (même source que Schema.org dateModified). */
  updatedAt: string;
  readingTime: number;
};

/**
 * Ligne discrète sous le fil d'Ariane des guides :
 * Par Antoine · X min de lecture · Dernière mise à jour le …
 */
export function GuideAuthorMeta({ updatedAt, readingTime }: GuideAuthorMetaProps) {
  return (
    <p className="guide-meta">
      Par{" "}
      <Link href={SITE_AUTHOR.path} className="guide-meta__author">
        {SITE_AUTHOR.name}
      </Link>
      <span aria-hidden="true"> · </span>
      <span>
        {readingTime} min de lecture
      </span>
      <span aria-hidden="true"> · </span>
      <span>Dernière mise à jour le {formatLongDateFr(updatedAt)}</span>
    </p>
  );
}
