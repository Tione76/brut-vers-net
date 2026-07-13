import { FAQ_PAGE_INTRO } from "./faq-page-data";

export function FaqPageContent() {
  return (
    <div className="faq-page">
      <div className="faq-page__header">
        <p className="faq-page__intro">{FAQ_PAGE_INTRO}</p>
      </div>
    </div>
  );
}
