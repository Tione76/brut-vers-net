"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import { buildCalculatorPrefillHref } from "./config";

function formatGrossForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

interface MiniCalculatorCtaProps {
  defaultGrossMonthly: number;
}

export function MiniCalculatorCta({ defaultGrossMonthly }: MiniCalculatorCtaProps) {
  const router = useRouter();
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
    router.push(buildCalculatorPrefillHref(parsed));
  };

  return (
    <section className="net-gross__cta" aria-labelledby="net-gross-cta-title">
      <h2 id="net-gross-cta-title" className="net-gross__h2">
        Vous souhaitez calculer un autre salaire&nbsp;?
      </h2>
      <p>
        Indiquez un brut mensuel : vous ouvrez le calculateur principal déjà prérempli, sans
        ressaisir le montant.
      </p>
      <form className="net-gross__mini-form" onSubmit={handleSubmit}>
        <label className="net-gross__mini-label" htmlFor="net-gross-mini-brut">
          Salaire brut mensuel
        </label>
        <div className="net-gross__mini-row">
          <input
            id="net-gross-mini-brut"
            className="net-gross__mini-input"
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
            aria-describedby={error ? "net-gross-mini-error" : undefined}
          />
          <button type="submit" className="net-gross__cta-button">
            Calculer mon salaire net
          </button>
        </div>
        {error ? (
          <p id="net-gross-mini-error" className="net-gross__mini-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
