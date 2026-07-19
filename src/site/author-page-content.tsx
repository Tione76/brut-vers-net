import Link from "next/link";
import { SITE_AUTHOR } from "@/site/author";
import { AuthorSectionIcon, AuthorUserIcon } from "@/site/author-page-icons";
import { seoConfig } from "@/site/seo.config";
import "./author-page.css";

/** Contenu éditorial de la page auteur (présentation aérée). */
export function AuthorPageContent() {
  return (
    <div className="author-page">
      <div className="author-card">
        <div className="author-card__avatar" aria-hidden="true">
          <AuthorUserIcon className="author-card__avatar-icon" />
        </div>
        <div className="author-card__body">
          <p className="author-card__name">{SITE_AUTHOR.name}</p>
          <p className="author-card__role">{SITE_AUTHOR.role}</p>
          <p className="author-card__intro">{SITE_AUTHOR.cardIntro}</p>
        </div>
      </div>

      <div className="author-page__content">
        {SITE_AUTHOR.sections.map((section) => (
          <section key={section.id} id={section.id} className="author-section">
            <h2 className="author-section__title">
              <span className="author-section__icon" aria-hidden="true">
                <AuthorSectionIcon name={section.icon} />
              </span>
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section id="methodologie" className="author-section">
          <h2 className="author-section__title">
            <span className="author-section__icon" aria-hidden="true">
              <AuthorSectionIcon name="shield" />
            </span>
            {SITE_AUTHOR.methodologyTitle}
          </h2>
          <p>{SITE_AUTHOR.methodology}</p>
          <p className="author-sources__intro">{SITE_AUTHOR.sourcesIntro}</p>
          <ul className="author-sources">
            {SITE_AUTHOR.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>

        <aside className="author-cta" aria-label="Aller plus loin">
          <p className="author-cta__text">{SITE_AUTHOR.ctaText}</p>
          <Link
            href={seoConfig.toolsHub.path}
            className="ds-btn ds-btn--primary author-cta__button"
          >
            {SITE_AUTHOR.ctaLabel}
          </Link>
        </aside>
      </div>
    </div>
  );
}
