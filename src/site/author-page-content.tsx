import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_AUTHOR } from "@/site/author";
import {
  AuthorMessageIcon,
  AuthorSectionIcon,
  AuthorSourceIcon,
  AuthorUserIcon,
} from "@/site/author-page-icons";
import "./author-page.css";

type SectionIconName = (typeof SITE_AUTHOR.sections)[number]["icon"] | "shield" | "message";

function AuthorBlockHeading({
  title,
  icon,
}: {
  title: string;
  icon: SectionIconName;
}) {
  return (
    <header className="author-block__head">
      <span className="author-block__icon" aria-hidden="true">
        <AuthorSectionIcon name={icon} />
      </span>
      <h2 className="author-block__title">{title}</h2>
    </header>
  );
}

function AuthorAvatar() {
  const portrait = SITE_AUTHOR.portrait;

  if (portrait) {
    return (
      <div className="author-card__avatar author-card__avatar--photo">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          className="author-card__photo"
          sizes="(max-width: 420px) 88px, (max-width: 639px) 84px, 106px"
          priority
        />
      </div>
    );
  }

  return (
    <div className="author-card__avatar" aria-hidden="true">
      <AuthorUserIcon className="author-card__avatar-icon" />
    </div>
  );
}

function AuthorSources() {
  return (
    <div className="author-sources">
      <p className="author-sources__intro">{SITE_AUTHOR.sourcesIntro}</p>
      <ul className="author-sources__grid">
        {SITE_AUTHOR.sources.map((source) => {
          const href = "href" in source ? source.href : undefined;
          const inner = (
            <>
              <span className="author-sources__icon" aria-hidden="true">
                <AuthorSourceIcon />
              </span>
              <span className="author-sources__label">{source.label}</span>
            </>
          );

          return (
            <li
              key={source.label}
              className={
                href
                  ? "author-sources__item author-sources__item--link"
                  : "author-sources__item"
              }
            >
              {href ? (
                <a
                  href={href}
                  className="author-sources__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div className="author-sources__link author-sources__link--static">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Contenu éditorial de la page auteur (composition premium). */
export function AuthorPageContent({ breadcrumb }: { breadcrumb?: ReactNode }) {
  const about = SITE_AUTHOR.sections[0];
  const publish = SITE_AUTHOR.sections[1];
  const objective = SITE_AUTHOR.sections[2];

  if (!about || !publish || !objective) {
    throw new Error("SITE_AUTHOR.sections incomplet");
  }

  return (
    <div className="author-page">
      <div className="author-card">
        <AuthorAvatar />
        <div className="author-card__body">
          <p className="author-card__name">{SITE_AUTHOR.name}</p>
          <p className="author-card__role">{SITE_AUTHOR.role}</p>
          <p className="author-card__intro">{SITE_AUTHOR.cardIntro}</p>
        </div>
      </div>

      {breadcrumb ? <div className="author-page__breadcrumb">{breadcrumb}</div> : null}

      <div className="author-page__stream">
        <section id={about.id} className="author-block">
          <AuthorBlockHeading title={about.title} icon={about.icon} />
          <div className="author-block__body">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 48)}
                className={index === 0 ? "author-block__lead" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className="author-pair">
          <section id={publish.id} className="author-block author-block--card">
            <AuthorBlockHeading title={publish.title} icon={publish.icon} />
            <div className="author-block__body">
              {publish.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section id={objective.id} className="author-block author-block--card">
            <AuthorBlockHeading title={objective.title} icon={objective.icon} />
            <div className="author-block__body">
              {objective.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        <section id="methodologie" className="author-block author-block--method">
          <AuthorBlockHeading title={SITE_AUTHOR.methodologyTitle} icon="shield" />
          <div className="author-block__body">
            {SITE_AUTHOR.methodologyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <AuthorSources />
          </div>
        </section>

        <section id="signaler-une-erreur" className="author-block author-block--report">
          <AuthorBlockHeading title={SITE_AUTHOR.reportTitle} icon="message" />
          <div className="author-block__body">
            {SITE_AUTHOR.reportParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <aside className="author-cta" aria-label="Contacter l'auteur">
          <div className="author-cta__copy">
            <span className="author-cta__icon" aria-hidden="true">
              <AuthorMessageIcon />
            </span>
            <div className="author-cta__text-wrap">
              <p className="author-cta__title">{SITE_AUTHOR.ctaTitle}</p>
              <p className="author-cta__text">{SITE_AUTHOR.ctaText}</p>
            </div>
          </div>
          <div className="author-cta__action">
            <Link
              href={SITE_AUTHOR.ctaHref}
              className="ds-btn ds-btn--primary author-cta__button"
            >
              {SITE_AUTHOR.ctaLabel}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
