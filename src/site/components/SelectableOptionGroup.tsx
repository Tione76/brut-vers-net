import type { ReactNode } from "react";

interface SelectableOptionGroupProps {
  legend: string;
  ariaLabel: string;
  children: ReactNode;
  compact?: boolean;
}

export function SelectableOptionGroup({
  legend,
  ariaLabel,
  children,
  compact = false,
}: SelectableOptionGroupProps) {
  return (
    <fieldset className="calc-fieldset salary-calc__param">
      <legend className="calc-field-label salary-calc__section-label">{legend}</legend>
      <div
        className={`selectable-group${compact ? " selectable-group--compact" : ""}`}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </fieldset>
  );
}

interface SelectableOptionProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  compact?: boolean;
}

export function SelectableOption({
  name,
  value,
  label,
  checked,
  onChange,
  compact = false,
}: SelectableOptionProps) {
  return (
    <label
      className={`selectable-option${compact ? " selectable-option--compact" : ""}${checked ? " selectable-option--selected" : ""}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="selectable-option__input"
      />
      {checked ? (
        <span className="selectable-option__indicator" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5L4.25 7.25L8 3.25"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
      <span className="selectable-option__label">{label}</span>
    </label>
  );
}
