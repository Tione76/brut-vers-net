"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";

const VALUE_TRANSITION = "color 175ms ease, opacity 175ms ease";
const MUTED_VALUE_COLOR = "#9eb4c8";
const PLACEHOLDER_VALUE = "—";
const PLACEHOLDER_DETAILS = "À définir";

function ResultCard({
  label,
  value,
  details,
  muted,
}: {
  label: string;
  value: string;
  details: string;
  muted: boolean;
}) {
  return (
    <div className="result-primary">
      <p className="result-primary-label">{label}</p>
      <p
        className="result-primary-value"
        style={{
          color: muted ? MUTED_VALUE_COLOR : undefined,
          transition: VALUE_TRANSITION,
        }}
      >
        {value}
      </p>
      <p className="result-details" style={{ transition: VALUE_TRANSITION }}>
        {details}
      </p>
    </div>
  );
}

function buildPlaceholderResults(): ReactNode {
  return (
    <>
      <ResultCard
        label="Salaire net estimé"
        value={PLACEHOLDER_VALUE}
        details={PLACEHOLDER_DETAILS}
        muted
      />
      <ResultCard
        label="Cotisations estimées"
        value={PLACEHOLDER_VALUE}
        details={PLACEHOLDER_DETAILS}
        muted
      />
    </>
  );
}

export default function Calculator() {
  const { setResult } = useCalculatorSlot();
  const [grossSalary, setGrossSalary] = useState("");
  const [periodicity, setPeriodicity] = useState<"monthly" | "annual">("monthly");
  const [status, setStatus] = useState<"non-cadre" | "cadre">("non-cadre");

  useLayoutEffect(() => {
    setResult(buildPlaceholderResults());
  }, [grossSalary, periodicity, status, setResult]);

  return (
    <div className="calc-fields">
      <div>
        <label htmlFor="grossSalary" className="calc-field-label">
          Salaire brut
        </label>
        <input
          id="grossSalary"
          name="grossSalary"
          type="text"
          inputMode="decimal"
          placeholder="Ex. : 2 500"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          className="calc-input"
        />
      </div>

      <div>
        <label htmlFor="periodicity" className="calc-field-label">
          Périodicité
        </label>
        <select
          id="periodicity"
          name="periodicity"
          value={periodicity}
          onChange={(e) => setPeriodicity(e.target.value as "monthly" | "annual")}
          className="calc-input"
        >
          <option value="monthly">Mensuel</option>
          <option value="annual">Annuel</option>
        </select>
      </div>

      <div>
        <label htmlFor="status" className="calc-field-label">
          Statut
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "non-cadre" | "cadre")}
          className="calc-input"
        >
          <option value="non-cadre">Non-cadre</option>
          <option value="cadre">Cadre</option>
        </select>
      </div>
    </div>
  );
}
