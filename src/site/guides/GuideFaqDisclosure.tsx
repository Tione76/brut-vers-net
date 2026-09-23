"use client";

import { useState } from "react";

export function GuideFaqDisclosure({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="faq-item"
      onToggle={(event) => setOpen((event.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="faq-item__summary" aria-expanded={open}>
        <span>{question}</span>
        <span className="faq-chevron" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="faq-item__body">
        <p>{answer}</p>
      </div>
    </details>
  );
}
