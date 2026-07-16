import type { ReactNode } from "react";

interface DismissalFormStepProps {
  step: number;
  title: string;
  hint?: string;
  essential?: boolean;
  children: ReactNode;
}

export function DismissalFormStep({
  step,
  title,
  hint,
  essential,
  children,
}: DismissalFormStepProps) {
  return (
    <li
      className={`increase-calc__step${essential ? " increase-calc__step--essential" : ""}`}
      aria-labelledby={`dismissal-step-${step}-title`}
    >
      <div className="increase-calc__step-marker" aria-hidden="true">
        <span className="increase-calc__step-badge">{step}</span>
      </div>
      <div className="increase-calc__step-body">
        <h3 id={`dismissal-step-${step}-title`} className="increase-calc__step-title">
          {title}
        </h3>
        {hint ? <p className="increase-calc__step-hint">{hint}</p> : null}
        {children}
      </div>
    </li>
  );
}
