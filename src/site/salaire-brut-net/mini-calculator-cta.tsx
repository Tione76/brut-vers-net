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
}

export function MiniGrossToNetCalculatorCta({
  defaultGrossMonthly,
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

  return (
    <section className="net-gross-1500__cta" aria-labelledby="gross-to-net-cta-title">
      <h2 id="gross-to-net-cta-title" className="net-gross-1500__h2">
        Calculer un autre salaire brut
      </h2>

      <form className="net-gross-1500__mini-form" onSubmit={handleSubmit}>
        <fieldset className="net-gross-1500__profiles">
          <legend className="net-gross-1500__sr-only">Profil</legend>
          <div className="net-gross-1500__profile-list" role="radiogroup" aria-label="Profil">
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

        <label
          className="net-gross-1500__mini-label"
          htmlFor={`gross-to-net-mini-gross-${defaultGrossMonthly}`}
        >
          Salaire brut mensuel
        </label>
        <div className="net-gross-1500__mini-row">
          <input
            id={`gross-to-net-mini-gross-${defaultGrossMonthly}`}
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
            aria-describedby={
              error ? `gross-to-net-mini-error-${defaultGrossMonthly}` : undefined
            }
          />
          <button type="submit" className="net-gross-1500__cta-button">
            Calculer en net
          </button>
        </div>
        {error ? (
          <p
            id={`gross-to-net-mini-error-${defaultGrossMonthly}`}
            className="net-gross-1500__mini-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
