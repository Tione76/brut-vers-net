import Link from "next/link";
import type { Guide } from "./types";
import { GuideCoverImage } from "./GuideCoverImage";

interface GuideListCardProps {
  guide: Guide;
}

/** Carte guide — future page liste / maillage interne */
export function GuideListCard({ guide }: GuideListCardProps) {
  const cover = guide.coverImage;
  if (!cover) return null;

  return (
    <Link href={`/guides/${guide.slug}`} className="guide-list-card">
      <span className="guide-list-card__cover">
        <GuideCoverImage
          cover={cover}
          className="guide-list-card__cover-img"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
        />
      </span>
      <span className="guide-list-card__title">{guide.title}</span>
    </Link>
  );
}
