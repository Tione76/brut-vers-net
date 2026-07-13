import type { ReactNode } from "react";

/** Coche verte vectorielle pour listes d'avantages éditoriales. */
export function EditorialCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" className="editorial-list__check-bg" />
      <path
        d="M6 10.5 8.5 13 14 7.5"
        className="editorial-list__check-mark"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditorialBenefitItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <EditorialCheckIcon className="editorial-list__check-icon" />
      <span>{children}</span>
    </li>
  );
}
