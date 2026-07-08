import Link from "next/link";
import { getGuideCoverByHref } from "./covers";
import { GuideCoverImage } from "./GuideCoverImage";
import type { GuideSidebarLink, SidebarTool } from "./sidebar";
import type { GuideBlock, GuideTocEntry } from "./types";
import { GUIDE_CALLOUT_LABELS } from "./types";
import { GuideIllustration } from "./illustrations";

function blockKey(prefix: string, block: GuideBlock, index: number): string {
  return `${prefix}-${block.type}-${index}`;
}

function isPlaceholderHref(href: string): boolean {
  return href.includes("[") || href.includes("]");
}

function GuideBlockRenderer({ block, isTemplate }: { block: GuideBlock; isTemplate?: boolean }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <aside className="guide-checklist">
          {block.title && <p className="guide-checklist__title">{block.title}</p>}
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <span className="guide-checklist__mark" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      );

    case "steps":
      return (
        <ol className="guide-steps">
          {block.items.map((step, i) => (
            <li key={step.title} className="guide-steps__item">
              <span className="guide-steps__num" aria-hidden="true">{i + 1}</span>
              <div>
                <p className="guide-steps__title">{step.title}</p>
                <p className="guide-steps__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "callout":
      return (
        <aside className={`prose-callout prose-callout--${block.variant}`}>
          <strong>{GUIDE_CALLOUT_LABELS[block.variant]}</strong>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </aside>
      );

    case "table":
      return (
        <figure className="guide-table-wrap">
          <div className="guide-table-scroll">
            <table className="guide-table">
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "illustration":
      return <GuideIllustration id={block.id} caption={block.caption} />;

    case "image-placeholder":
      return (
        <figure>
          <div className="prose-figure__placeholder" aria-hidden="true">
            Illustration à ajouter : {block.description}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "internal-link":
      if (isTemplate || isPlaceholderHref(block.href)) {
        return (
          <p className="guide-internal-link guide-internal-link--placeholder">
            {block.intro && <>{block.intro} </>}
            <span className="guide-internal-link__label">{block.label}</span>
          </p>
        );
      }
      return (
        <p className="guide-internal-link">
          {block.intro && <>{block.intro} </>}
          <Link href={block.href}>{block.label}</Link>
        </p>
      );

    case "profession-faq":
      return (
        <div className="guide-profession-faq faq-list faq-list--flush">
          {block.items.map((item) => (
            <details key={item.label} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.label}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="faq-item__body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      );

    case "practical-case":
      return (
        <aside className="guide-practical-case">
          <p className="guide-practical-case__label">Cas pratique</p>
          <p className="guide-practical-case__title">{block.title}</p>
          <dl className="guide-practical-case__grid">
            <div className="guide-practical-case__item">
              <dt>Montant HT</dt>
              <dd>{block.ht}</dd>
            </div>
            <div className="guide-practical-case__item">
              <dt>Taux applicable</dt>
              <dd>{block.rate}</dd>
            </div>
            <div className="guide-practical-case__item">
              <dt>TVA</dt>
              <dd>{block.vat}</dd>
            </div>
            <div className="guide-practical-case__item guide-practical-case__item--highlight">
              <dt>Montant TTC</dt>
              <dd>{block.ttc}</dd>
            </div>
          </dl>
          {block.note && <p className="guide-practical-case__note">{block.note}</p>}
        </aside>
      );

    case "contextual-cta":
      if (isTemplate || isPlaceholderHref(block.href)) {
        return (
          <aside className="guide-contextual-cta guide-contextual-cta--placeholder">
            <p className="guide-contextual-cta__text">{block.text}</p>
            <span className="guide-contextual-cta__link">{block.label} →</span>
          </aside>
        );
      }
      return (
        <aside className="guide-contextual-cta">
          <p className="guide-contextual-cta__text">{block.text}</p>
          <Link href={block.href} className="guide-contextual-cta__link">
            {block.label} →
          </Link>
        </aside>
      );
  }
}

/** Sommaire inline : H2 uniquement */
export function GuideInlineToc({ entries }: { entries: GuideTocEntry[] }) {
  return (
    <nav className="guide-toc" aria-label="Sommaire">
      <p className="guide-toc__title">Sommaire</p>
      <ol className="guide-toc__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="guide-toc__link">
              {entry.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function GuideSidebarGuideCards({ guides }: { guides: GuideSidebarLink[] }) {
  return (
    <div className="guide-sidebar-cards">
      {guides.map((guide) => {
        const cover = getGuideCoverByHref(guide.href);
        return (
          <Link
            key={guide.href}
            href={guide.href}
            className="guide-sidebar-card guide-sidebar-card--cover"
          >
            {cover && (
              <span className="guide-sidebar-card__cover">
                <GuideCoverImage cover={cover} className="guide-sidebar-card__cover-img" />
              </span>
            )}
            <span className="guide-sidebar-card__body">
              <span className="guide-sidebar-card__title">{guide.title}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function GuideSidebarGuidesSection({
  title,
  guides,
  blockClassName,
}: {
  title: string;
  guides: GuideSidebarLink[];
  blockClassName: string;
}) {
  if (guides.length === 0) return null;

  return (
    <div className={`guide-sidebar-block ${blockClassName}`}>
      <p className="guide-sidebar-block__title">{title}</p>
      <GuideSidebarGuideCards guides={guides} />
    </div>
  );
}

function GuideSidebarToolCard({ tool }: { tool: SidebarTool }) {
  return (
    <Link href={tool.href} className="guide-sidebar-card guide-sidebar-card--calculator">
      <span className="guide-sidebar-card__cover">
        <GuideCoverImage cover={tool.cover} decorative className="guide-sidebar-card__cover-img" />
      </span>
      <span className="guide-sidebar-card__body">
        <span className="guide-sidebar-card__calc-icon" aria-hidden="true">
          {tool.icon ?? "€"}
        </span>
        <span className="guide-sidebar-card__title">{tool.title}</span>
        <span className="guide-sidebar-card__subtitle">{tool.description}</span>
        <span className="guide-sidebar-card__badge">{tool.badge ?? "✓ Outil gratuit"}</span>
      </span>
    </Link>
  );
}

interface GuideSidebarProps {
  tools?: SidebarTool[];
  guides?: GuideSidebarLink[];
  guidesSectionTitle?: string;
  guidesBlockVariant?: "guides" | "also-read";
  showTools?: boolean;
}

export function GuideSidebar({
  tools = [],
  guides = [],
  guidesSectionTitle = "À lire aussi",
  guidesBlockVariant = "also-read",
  showTools = true,
}: GuideSidebarProps) {
  const guidesBlockClass =
    guidesBlockVariant === "guides"
      ? "guide-sidebar-block--guides"
      : "guide-sidebar-block--also-read";

  return (
    <>
      {showTools && tools.length > 0 && (
        <div className="guide-sidebar-block guide-sidebar-block--calculator guide-sidebar-block--tools">
          <p className="guide-sidebar-block__title">Nos outils gratuits</p>
          <div className="guide-sidebar-tools-list">
            {tools.map((tool) => (
              <GuideSidebarToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      <GuideSidebarGuidesSection
        title={guidesSectionTitle}
        guides={guides}
        blockClassName={guidesBlockClass}
      />
    </>
  );
}

interface GuideArticleProps {
  introduction: string[];
  quickSummary?: import("./types").GuideQuickSummary;
  toc: GuideTocEntry[];
  sections: import("./types").Guide["sections"];
  faq: import("./types").Guide["faq"];
  faqTitle?: string;
  conclusion: import("./types").Guide["conclusion"];
  isTemplate?: boolean;
}

function GuideQuickSummaryBlock({ summary }: { summary: import("./types").GuideQuickSummary }) {
  return (
    <aside className="guide-quick-summary" aria-label={summary.title}>
      <p className="guide-quick-summary__title">{summary.title}</p>
      <div className="guide-quick-summary__grid">
        {summary.items.map((item) => (
          <div key={item.rate} className="guide-quick-summary__card">
            <p className="guide-quick-summary__rate">{item.rate}</p>
            <p className="guide-quick-summary__desc">{item.description}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function GuideArticle({
  introduction,
  quickSummary,
  toc,
  sections,
  faq,
  faqTitle,
  conclusion,
  isTemplate,
}: GuideArticleProps) {
  return (
    <>
      <div className="guide-intro">
        {introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {quickSummary && <GuideQuickSummaryBlock summary={quickSummary} />}

      <GuideInlineToc entries={toc} />

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="guide-section">
          <h2>{section.title}</h2>
          {section.blocks?.map((block, index) => (
            <GuideBlockRenderer
              key={blockKey(section.id, block, index)}
              block={block}
              isTemplate={isTemplate}
            />
          ))}
          {section.subsections?.map((subsection) => (
            <div key={subsection.id} id={subsection.id} className="guide-subsection">
              <h3>{subsection.title}</h3>
              {subsection.blocks.map((block, index) => (
                <GuideBlockRenderer
                  key={blockKey(subsection.id, block, index)}
                  block={block}
                  isTemplate={isTemplate}
                />
              ))}
            </div>
          ))}
        </section>
      ))}

      <section id="faq" className="guide-section">
        <h2>{faqTitle ?? "Questions fréquentes"}</h2>
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="faq-item__body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="conclusion" className="guide-conclusion">
        <h2>{conclusion.title ?? "Conclusion"}</h2>
        <div className="guide-conclusion__points">
          <p className="guide-conclusion__points-title">À retenir</p>
          <ul className="guide-conclusion__list">
            {conclusion.keyPoints.map((point) => (
              <li key={point}>
                <span className="guide-conclusion__check" aria-hidden="true">✔</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="guide-conclusion__closing">{conclusion.closingText}</p>
        {conclusion.closingCta &&
          (isTemplate || isPlaceholderHref(conclusion.closingCta.href) ? (
            <span className="guide-conclusion__cta">{conclusion.closingCta.label}</span>
          ) : (
            <Link href={conclusion.closingCta.href} className="guide-conclusion__cta">
              {conclusion.closingCta.label}
            </Link>
          ))}
      </section>
    </>
  );
}
