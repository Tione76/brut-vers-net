import Link from "next/link";
import type { Guide } from "./types";
import { GuideCoverImage } from "./GuideCoverImage";
import { getGuideHubTeaser } from "./guides-hub-data";

interface GuideListCardProps {
  guide: Guide;
}

/** Carte guide : hub /guides et future page liste */
export function GuideListCard({ guide }: GuideListCardProps) {
  const cover = guide.coverImage;
  if (!cover) return null;

  const teaser = getGuideHubTeaser(guide.slug) ?? guide.description;

  return (
    <Link href={`/guides/${guide.slug}`} className="guide-list-card">
      <span className="guide-list-card__cover">
        <GuideCoverImage
          cover={cover}
          className="guide-list-card__cover-img"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
        />
      </span>
      <span className="guide-list-card__body">
        <h3 className="guide-list-card__title">{guide.title}</h3>
        {teaser && <span className="guide-list-card__desc">{teaser}</span>}
        <span className="guide-list-card__cta">Lire le guide →</span>
      </span>
    </Link>
  );
}
