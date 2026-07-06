import type { ReactNode } from "react";

const STEPS = [
  {
    id: "achats",
    title: "Achats",
    description: "L'entreprise achète des biens ou des services.",
    tone: "blue" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: "tva-payee",
    title: "TVA payée",
    description: "La TVA est payée aux fournisseurs.",
    tone: "blue-light" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "tva-deductible",
    title: "TVA déductible",
    description: "Cette TVA pourra être récupérée si les conditions sont remplies.",
    tone: "green" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    id: "declaration",
    title: "Déclaration de TVA",
    description: "L'entreprise déclare sa TVA à l'administration fiscale.",
    tone: "orange" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: "tva-collectee",
    title: "TVA collectée",
    description: "L'entreprise facture la TVA à ses clients.",
    tone: "blue-dark" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 17.5v-11" />
      </svg>
    ),
  },
  {
    id: "tva-nette",
    title: "TVA nette à reverser (ou crédit de TVA)",
    description: "TVA collectée − TVA déductible = TVA à payer ou crédit de TVA.",
    tone: "green-dark" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" />
        <path d="M9 12v.01" />
        <path d="M9 15v.01" />
        <path d="M9 18v.01" />
      </svg>
    ),
  },
] as const;

function FlowArrow() {
  return (
    <div className="vat-journey__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </div>
  );
}

function JourneyStep({
  title,
  description,
  tone,
  icon,
}: {
  title: string;
  description: string;
  tone: (typeof STEPS)[number]["tone"];
  icon: ReactNode;
}) {
  return (
    <article className={`vat-journey__step vat-journey__step--${tone}`}>
      <div className="vat-journey__icon">{icon}</div>
      <div className="vat-journey__content">
        <h4 className="vat-journey__step-title">{title}</h4>
        <p className="vat-journey__step-desc">{description}</p>
      </div>
    </article>
  );
}

/** Parcours pédagogique de la TVA dans une entreprise */
export function VatEnterpriseJourneyIllustration() {
  return (
    <div
      className="vat-journey"
      role="img"
      aria-label="Parcours de la TVA dans une entreprise, des achats au calcul de la TVA nette"
    >
      <h3 className="vat-journey__title">Le parcours de la TVA dans une entreprise</h3>

      <p className="vat-journey__formula">
        <strong>TVA due</strong> = <strong>TVA collectée</strong> − <strong>TVA déductible</strong>
      </p>

      <div className="vat-journey__flow">
        {STEPS.map((step, index) => (
          <div key={step.id} className="vat-journey__item">
            <JourneyStep
              title={step.title}
              description={step.description}
              tone={step.tone}
              icon={step.icon}
            />
            {index < STEPS.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
