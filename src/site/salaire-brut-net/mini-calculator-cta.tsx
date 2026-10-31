"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getProfileLabel } from "@/site/salary-calculator/config";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { GROSS_TO_NET_PROFILES } from "./config";
import { buildCalculatorGrossPrefillHref } from "./prefill";

function formatGrossForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

interface MiniGrossToNetCalculatorCtaProps {
  defaultGrossMonthly: number;
  heading?: string;
  intro?: string;
  buttonLabel?: string;
  amountLabel?: string;
  profileGroupLabel?: string;
  appearance?: "default" | "onBrand";
}

export function MiniGrossToNetCalculatorCta({
  defaultGrossMonthly,
  heading = "Calculer un autre salaire brut",
  intro,
  buttonLabel = "Calculer en net",
  amountLabel = "Salaire brut mensuel",
  profileGroupLabel = "Profil",
  appearance = "default",
}: MiniGrossToNetCalculatorCtaProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<EmploymentProfile>("nonExecutive");
  const [value, setValue] = useState(formatGrossForInput(defaultGrossMonthly));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSalaryAmount(value);
    if (parsed === null || parsed <= 0) {
      setError("Indiquez un salaire brut mensuel valide.");
      return;
    }
    setError(null);
    router.push(buildCalculatorGrossPrefillHref(parsed, profile));
  };

  const grossInputId = `gross-to-net-mini-gross-${defaultGrossMonthly}`;
  const errorId = `gross-to-net-mini-error-${defaultGrossMonthly}`;
  const titleId = `gross-to-net-${defaultGrossMonthly}-cta-title`;
  const grossInput = (
    <input
      id={grossInputId}
      className="net-gross-1500__mini-input"
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        if (error) {
          setError(null);
        }
      }}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    />
  );

  return (
    <section
      className={`net-gross-1500__cta${appearance === "onBrand" ? " net-gross-1650__simulator" : ""}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="net-gross-1500__h2">
        {heading}
      </h2>
      {intro ? <p className="net-gross-1500__cta-intro">{intro}</p> : null}

      <form className="net-gross-1500__mini-form" onSubmit={handleSubmit}>
        <fieldset className="net-gross-1500__profiles">
          <legend className="net-gross-1500__sr-only">{profileGroupLabel}</legend>
          <div
            className="net-gross-1500__profile-list"
            role="radiogroup"
            aria-label={profileGroupLabel}
          >
            {GROSS_TO_NET_PROFILES.map((id) => {
              const selected = profile === id;
              const tone =
                id === "nonExecutive"
                  ? "non-cadre"
                  : id === "executive"
                    ? "cadre"
                    : "public";
              return (
                <label
                  key={id}
                  className={`net-gross-1500__profile net-gross-1500__profile--${tone}${
                    selected ? " net-gross-1500__profile--selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`gross-to-net-profile-${defaultGrossMonthly}`}
                    value={id}
                    checked={selected}
                    onChange={() => setProfile(id)}
                  />
                  <span>{getProfileLabel(id)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="net-gross-1500__mini-label" htmlFor={grossInputId}>
          {amountLabel}
        </label>
        <div className="net-gross-1500__mini-row">
          {appearance === "onBrand" ? (
            <div className="net-gross-1650__amount-field">
              {grossInput}
              <span className="net-gross-1650__amount-suffix" aria-hidden="true">
                €
              </span>
            </div>
          ) : (
            grossInput
          )}
          <button type="submit" className="net-gross-1500__cta-button">
            {buttonLabel}
          </button>
        </div>
        {error ? (
          <p id={errorId} className="net-gross-1500__mini-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
