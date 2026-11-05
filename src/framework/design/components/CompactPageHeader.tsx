interface CompactPageHeaderProps {
  meta?: string;
  title: string;
  subtitle?: string;
}

/** En-tête compact des pages contenu, contact, légal (dans le panneau blanc). */
export function CompactPageHeader({
  meta,
  title,
  subtitle,
}: CompactPageHeaderProps) {
  return (
    <section className="article-header">
      <div className="article-header__inner">
        {meta && <p className="article-header__meta">{meta}</p>}
        <h1 className="article-header__title">{title}</h1>
        {subtitle && <p className="article-header__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
