"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getProfileLabel } from "@/site/salary-calculator/config";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { MONTHLY_INCREASE_PROFILES } from "./config";
import { buildIncreaseCalculatorPrefillHref } from "./prefill";

function formatIncreaseForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

interface MiniIncreaseCalculatorCtaProps {
  defaultGrossMonthlyIncrease: number;
}

export function MiniIncreaseCalculatorCta({
  defaultGrossMonthlyIncrease,
}: MiniIncreaseCalculatorCtaProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<EmploymentProfile>("nonExecutive");
  const [value, setValue] = useState(formatIncreaseForInput(defaultGrossMonthlyIncrease));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSalaryAmount(value);
    if (parsed === null || parsed <= 0) {
      setError("Indiquez une augmentation brute mensuelle valide.");
      return;
    }
    setError(null);
    router.push(buildIncreaseCalculatorPrefillHref(parsed, profile));
  };

  return (
    <section className="net-gross-1500__cta" aria-labelledby="aug-mensuelle-cta-title">
      <h2 id="aug-mensuelle-cta-title" className="net-gross-1500__h2">
        Vous souhaitez estimer une autre augmentation ?
      </h2>

      <form className="net-gross-1500__mini-form" onSubmit={handleSubmit}>
        <fieldset className="net-gross-1500__profiles">
          <legend className="net-gross-1500__sr-only">Profil</legend>
          <div className="net-gross-1500__profile-list" role="radiogroup" aria-label="Profil">
            {MONTHLY_INCREASE_PROFILES.map((id) => {
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
                    name={`aug-mensuelle-profile-${defaultGrossMonthlyIncrease}`}
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
          htmlFor={`aug-mensuelle-mini-increase-${defaultGrossMonthlyIncrease}`}
        >
          Augmentation brute mensuelle
        </label>
        <div className="net-gross-1500__mini-row">
          <input
            id={`aug-mensuelle-mini-increase-${defaultGrossMonthlyIncrease}`}
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
              error ? `aug-mensuelle-mini-error-${defaultGrossMonthlyIncrease}` : undefined
            }
          />
          <button type="submit" className="net-gross-1500__cta-button">
            Calculer mon augmentation
          </button>
        </div>
        {error ? (
          <p
            id={`aug-mensuelle-mini-error-${defaultGrossMonthlyIncrease}`}
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
