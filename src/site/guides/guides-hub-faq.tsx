import { GUIDES_HUB_FAQ } from "./guides-hub-data";

/** FAQ courte du hub /guides (même pattern d'accordéons que /nos-outils) */
export function GuidesHubFaq() {
  return (
    <section
      className="guides-hub-section guides-hub-section--faq"
      aria-labelledby="guides-hub-faq-title"
    >
      <h2 id="guides-hub-faq-title">Questions fréquentes sur nos guides</h2>
      <div className="faq-list faq-list--flush">
        {GUIDES_HUB_FAQ.map((item) => (
          <details key={item.question} className="faq-item">
            <summary className="faq-item__summary">
              <span>{item.question}</span>
              <span className="faq-chevron" aria-hidden="true">
                ▾
              </span>
            </summary>
            <div className="faq-item__body">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
