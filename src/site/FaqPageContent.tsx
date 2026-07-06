import { faqPageCategories, FAQ_PAGE_INTRO, FAQ_PAGE_UPDATED } from "./faq-page-data";
import { renderFaqAnswer } from "./faq-page-utils";

export function FaqPageContent() {
  return (
    <div className="faq-page">
      <div className="faq-page__header">
        <p className="faq-page__intro">{FAQ_PAGE_INTRO}</p>
        <p className="faq-page__updated">Dernière mise à jour : {FAQ_PAGE_UPDATED}</p>
      </div>

      {faqPageCategories.map((category, index) => (
        <section
          key={category.title}
          className="faq-page__category"
          aria-labelledby={`faq-cat-${index}`}
        >
          <h2 id={`faq-cat-${index}`} className="faq-page__category-title">
            {category.title}
          </h2>
          <div className="faq-list faq-list--flush">
            {category.items.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__summary">
                  <h3 className="faq-item__question">{item.question}</h3>
                  <span className="faq-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <div className="faq-item__body">{renderFaqAnswer(item.answer)}</div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
