import Image from "next/image";
import type { GuideCoverImage as GuideCoverImageType } from "./covers";

interface GuideCoverImageProps {
  cover: GuideCoverImageType;
  /** true uniquement pour LCP / above-the-fold */
  priority?: boolean;
  /** Carte avec titre et description : image décorative (alt vide) */
  decorative?: boolean;
  className?: string;
  sizes?: string;
}

/** Image de couverture : sidebar, listes de guides (hors contenu article) */
export function GuideCoverImage({
  cover,
  priority = false,
  decorative = false,
  className,
  sizes = "(max-width: 1023px) 100vw, 280px",
}: GuideCoverImageProps) {
  return (
    <Image
      src={cover.src}
      alt={decorative ? "" : cover.alt}
      width={cover.width}
      height={cover.height}
      sizes={sizes}
      className={className}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      priority={priority}
    />
  );
}
