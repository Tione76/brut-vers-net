import Link from "next/link";
import { formatLongDateFr } from "@/site/dates";
import { ACTU_HUB_PATH, ACTU_NAV_LABEL } from "./constants";
import { getLatestPublishedActuArticle, getActuPublicPath } from "./registry";

/**
 * Petit bloc « dernière actualité » sous le contenu éditorial d'accueil.
 * N'apparaît que s'il existe au moins un article publié.
 */
export function HomeLatestActu() {
  const article = getLatestPublishedActuArticle();
  if (!article) return null;

  const href = getActuPublicPath(article);

  return (
    <aside className="actu-home-teaser" aria-label="Dernière actualité">
      <p className="actu-home-teaser__label">{ACTU_NAV_LABEL}</p>
      <h2 className="actu-home-teaser__title">
        <Link href={href}>{article.title}</Link>
      </h2>
      <p className="actu-home-teaser__meta">
        <time dateTime={article.publishedAt}>
          {formatLongDateFr(article.publishedAt)}
        </time>
      </p>
      <p className="actu-home-teaser__excerpt">{article.excerpt}</p>
      <p className="actu-home-teaser__links">
        <Link href={href}>Lire l&apos;actualité</Link>
        <Link href={ACTU_HUB_PATH}>Toutes les actualités</Link>
      </p>
    </aside>
  );
}
