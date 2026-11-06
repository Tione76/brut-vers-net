"use client";

import Link from "next/link";
import { SITE_AUTHOR } from "@/site/author";
import { formatLongDateFr } from "@/site/dates";

type GuideAuthorMetaProps = {
  /** Date calendaire guide.updatedAt (même source que Schema.org dateModified). */
  updatedAt: string;
  /** Omise sur les pages éditoriales sans temps de lecture (ex. série net → brut). */
  readingTime?: number;
};

/**
 * Ligne discrète sous le fil d'Ariane des guides :
 * Par Antoine · X min de lecture · Dernière mise à jour le …
 * (le temps de lecture est optionnel)
 */
export function GuideAuthorMeta({ updatedAt, readingTime }: GuideAuthorMetaProps) {
  return (
    <p className="guide-meta">
      {SITE_AUTHOR.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="guide-meta__photo"
          src={SITE_AUTHOR.portrait.src}
          alt=""
          width={56}
          height={56}
          decoding="async"
          aria-hidden="true"
        />
      ) : null}
      Par{" "}
      <Link href={SITE_AUTHOR.path} className="guide-meta__author">
        {SITE_AUTHOR.name}
      </Link>
      {readingTime != null ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{readingTime} min de lecture</span>
        </>
      ) : null}
      <span aria-hidden="true"> · </span>
      <span>Dernière mise à jour le {formatLongDateFr(updatedAt)}</span>
    </p>
  );
}

GuideAuthorMeta.displayName = "GuideAuthorMeta";
