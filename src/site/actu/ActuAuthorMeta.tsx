"use client";

import Link from "next/link";
import { SITE_AUTHOR } from "@/site/author";
import { formatLongDateFr } from "@/site/dates";

type ActuAuthorMetaProps = {
  publishedAt: string;
  modifiedAt: string;
  readingTimeMinutes?: number;
};

function formatPublishedDateTimeFr(iso: string): string {
  const dateLabel = formatLongDateFr(iso);
  const timeLabel = new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });
  return `${dateLabel} à ${timeLabel}`;
}

/**
 * Métadonnées d'actualité : auteur, publication, éventuelle mise à jour.
 * Affiche la date et l'heure de publication (distinctes de la date de l'événement).
 */
export function ActuAuthorMeta({
  publishedAt,
  modifiedAt,
  readingTimeMinutes,
}: ActuAuthorMetaProps) {
  const publishedLabel = formatPublishedDateTimeFr(publishedAt);
  const showModified = modifiedAt !== publishedAt;
  const modifiedLabel = showModified ? formatPublishedDateTimeFr(modifiedAt) : null;

  return (
    <p className="guide-meta actu-meta">
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
      <span className="actu-meta__line">
        <span>
          Par{" "}
          <Link href={SITE_AUTHOR.path} className="guide-meta__author">
            {SITE_AUTHOR.name}
          </Link>
        </span>
        {readingTimeMinutes != null ? (
          <>
            <span className="actu-meta__sep" aria-hidden="true">
              ·
            </span>
            <span>{readingTimeMinutes}&nbsp;min de lecture</span>
          </>
        ) : null}
        <span className="actu-meta__sep" aria-hidden="true">
          ·
        </span>
        <span>Publié le {publishedLabel}</span>
        {showModified && modifiedLabel ? (
          <>
            <span className="actu-meta__sep" aria-hidden="true">
              ·
            </span>
            <span>Mis à jour le {modifiedLabel}</span>
          </>
        ) : null}
      </span>
    </p>
  );
}

ActuAuthorMeta.displayName = "ActuAuthorMeta";
