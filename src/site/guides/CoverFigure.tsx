import Image from "next/image";
import { formatCoverCredit, type GuideCoverImage } from "./covers";

interface CoverFigureProps {
  cover: GuideCoverImage;
  /** true pour LCP / above-the-fold */
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Illustration d'article : photo + crédit en bande overlay (bas de l'image).
 * Données issues exclusivement du registre covers.ts.
 *
 * Le fond semi-transparent et le texte sont séparés : l'opacité ne s'applique
 * qu'au fond (rgba), jamais via `opacity` sur un parent du texte.
 */
export function CoverFigure({
  cover,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 720px",
}: CoverFigureProps) {
  const creditLabel = formatCoverCredit(cover.credit);

  return (
    <figure className={["cover-figure", className].filter(Boolean).join(" ")}>
      <div className="cover-figure__frame">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={sizes}
          className="cover-figure__img"
          loading={priority ? undefined : "lazy"}
          decoding="async"
          priority={priority}
        />
        <figcaption className="cover-figure__credit">
          <span className="cover-figure__credit-band" aria-hidden="true" />
          <span className="cover-figure__credit-text">{creditLabel}</span>
        </figcaption>
      </div>
    </figure>
  );
}
