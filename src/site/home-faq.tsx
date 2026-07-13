import { homeFaq } from "./home-faq-data";

/** FAQ page d'accueil */
export function HomeFaqContent() {
  return (
    <div className="faq-list">
      {homeFaq.map((item) => (
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
  );
}
