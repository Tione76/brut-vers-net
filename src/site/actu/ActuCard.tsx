import Image from "next/image";
import Link from "next/link";
import { formatLongDateFr } from "@/site/dates";
import { getActuPublicPath } from "./types";
import type { ActuArticle } from "./types";

type ActuCardProps = {
  article: ActuArticle;
};

export function ActuCard({ article }: ActuCardProps) {
  const href = getActuPublicPath(article);

  return (
    <article className="actu-card">
      <Link href={href} className="actu-card__media">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          width={article.cover.width}
          height={article.cover.height}
          sizes="(max-width: 768px) 100vw, 360px"
          className="actu-card__img"
        />
      </Link>
      <div className="actu-card__body">
        <p className="actu-card__meta">
          <time dateTime={article.publishedAt}>
            {formatLongDateFr(article.publishedAt)}
          </time>
        </p>
        <h2 className="actu-card__title">
          <Link href={href}>{article.title}</Link>
        </h2>
        <p className="actu-card__excerpt">{article.excerpt}</p>
        <Link href={href} className="actu-card__cta">
          Lire l&apos;actualité
        </Link>
      </div>
    </article>
  );
}
