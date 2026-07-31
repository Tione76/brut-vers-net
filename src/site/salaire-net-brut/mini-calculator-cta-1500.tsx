"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getProfileLabel } from "@/site/salary-calculator/config";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { NET_TO_GROSS_PROFILES } from "./config";
import { buildCalculatorNetPrefillHref } from "./prefill";

function formatNetForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

interface MiniCalculatorCta1500Props {
  defaultNetMonthly: number;
}

export function MiniCalculatorCta1500({ defaultNetMonthly }: MiniCalculatorCta1500Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<EmploymentProfile>("nonExecutive");
  const [value, setValue] = useState(formatNetForInput(defaultNetMonthly));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSalaryAmount(value);
    if (parsed === null || parsed <= 0) {
      setError("Indiquez un salaire net mensuel valide.");
      return;
    }
    setError(null);
    router.push(buildCalculatorNetPrefillHref(parsed, profile));
  };

  return (
    <section className="net-gross-1500__cta" aria-labelledby="net-gross-1500-cta-title">
      <h2 id="net-gross-1500-cta-title" className="net-gross-1500__h2">
        Calculer un autre salaire net
      </h2>

      <form className="net-gross-1500__mini-form" onSubmit={handleSubmit}>
        <fieldset className="net-gross-1500__profiles">
          <legend className="net-gross-1500__sr-only">Profil</legend>
          <div className="net-gross-1500__profile-list" role="radiogroup" aria-label="Profil">
            {NET_TO_GROSS_PROFILES.map((id) => {
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
                    name={`net-gross-profile-${defaultNetMonthly}`}
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

        <label className="net-gross-1500__mini-label" htmlFor={`net-gross-mini-net-${defaultNetMonthly}`}>
          Salaire net mensuel
        </label>
        <div className="net-gross-1500__mini-row">
          <input
            id={`net-gross-mini-net-${defaultNetMonthly}`}
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
            aria-describedby={error ? `net-gross-mini-error-${defaultNetMonthly}` : undefined}
          />
          <button type="submit" className="net-gross-1500__cta-button">
            Calculer en brut
          </button>
        </div>
        {error ? (
          <p
            id={`net-gross-mini-error-${defaultNetMonthly}`}
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
