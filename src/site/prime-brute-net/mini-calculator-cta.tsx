"use client";

import { useState } from "react";
import { getProfileLabel } from "@/site/salary-calculator/config";
import { monthlyToAnnual } from "@/site/salary-calculator/conversions";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  GROSS_PRIME_CALCULATOR_ANCHOR_ID,
  GROSS_PRIME_PROFILES,
  GROSS_PRIME_SALARY_MONTHS,
} from "./config";
import { estimateNetPrimeFromGross, formatPrimeNet } from "./data";

function formatPrimeForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function profileTone(profile: EmploymentProfile): "non-cadre" | "cadre" | "public" {
  if (profile === "executive") return "cadre";
  if (profile === "publicService") return "public";
  return "non-cadre";
}

interface MiniGrossPrimeCalculatorCtaProps {
  defaultGrossPrime: number;
}

/**
 * Mini-calculateur autonome (série prime brute → net).
 * Calcul instantané dans la page, mêmes coefficients que les cartes.
 */
export function MiniGrossPrimeCalculatorCta({
  defaultGrossPrime,
}: MiniGrossPrimeCalculatorCtaProps) {
  const [profile, setProfile] = useState<EmploymentProfile>("nonExecutive");
  const [value, setValue] = useState(formatPrimeForInput(defaultGrossPrime));

  const parsed = parseSalaryAmount(value);
  const isValid = parsed !== null && parsed > 0;
  const netPrime = isValid && parsed !== null ? estimateNetPrimeFromGross(parsed, profile) : null;
  const netAnnualIfMonthly =
    netPrime !== null ? monthlyToAnnual(netPrime, GROSS_PRIME_SALARY_MONTHS) : null;
  const tone = profileTone(profile);
  const inputId = `gross-prime-mini-${defaultGrossPrime}`;
  const resultId = `gross-prime-mini-result-${defaultGrossPrime}`;

  return (
    <section
      id={GROSS_PRIME_CALCULATOR_ANCHOR_ID}
      className="net-gross-1500__cta gross-prime-mini"
      aria-labelledby="gross-prime-cta-title"
    >
      <h2 id="gross-prime-cta-title" className="net-gross-1500__h2">
        Estimer une autre prime
      </h2>

      <div className="gross-prime-mini__body">
        <div className="gross-prime-mini__controls">
          <div className="gross-prime-mini__field">
            <label className="gross-prime-mini__label" htmlFor={inputId}>
              Prime brute
            </label>
            <div className="gross-prime-mini__input-wrap">
              <input
                id={inputId}
                className="gross-prime-mini__input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-invalid={value.length > 0 && !isValid}
                aria-describedby={netPrime !== null ? resultId : undefined}
              />
              <span className="gross-prime-mini__suffix" aria-hidden="true">
                €
              </span>
            </div>
          </div>

          <fieldset className="gross-prime-mini__profiles">
            <legend className="gross-prime-mini__label">Profil</legend>
            <div className="gross-prime-mini__profile-list" role="radiogroup" aria-label="Profil">
              {GROSS_PRIME_PROFILES.map((id) => {
                const selected = profile === id;
                const optionTone = profileTone(id);
                return (
                  <label
                    key={id}
                    className={`gross-prime-mini__profile gross-prime-mini__profile--${optionTone}${
                      selected ? " gross-prime-mini__profile--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`gross-prime-profile-${defaultGrossPrime}`}
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
        </div>

        {netPrime !== null && netAnnualIfMonthly !== null ? (
          <div
            id={resultId}
            className={`gross-prime-mini__result gross-prime-mini__result--${tone}`}
            aria-live="polite"
          >
            <p className="gross-prime-mini__result-label">Prime nette estimée</p>
            <p className="gross-prime-mini__result-value">{formatPrimeNet(netPrime)}</p>
            <p className="gross-prime-mini__result-annual">
              {formatPrimeNet(netAnnualIfMonthly)} nets par an
            </p>
            <p className="gross-prime-mini__result-annual-note">
              si cette prime est versée chaque mois
            </p>
          </div>
        ) : value.length > 0 ? (
          <p className="gross-prime-mini__error" role="alert">
            Indiquez une prime brute valide.
          </p>
        ) : null}
      </div>
    </section>
  );
}
