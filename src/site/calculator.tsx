"use client";

import { useLayoutEffect, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";

const VAT_RATES = [
  { value: "20", label: "20 % — taux normal" },
  { value: "10", label: "10 % — taux intermédiaire" },
  { value: "5.5", label: "5,5 % — taux réduit" },
  { value: "2.1", label: "2,1 % — taux super-réduit" },
] as const;

const ZERO_EUR = "0,00 €";
const VALUE_TRANSITION = "color 175ms ease, opacity 175ms ease";
const MUTED_VALUE_COLOR = "#9eb4c8";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function parseAmount(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

function formatRate(rate: string): string {
  return rate.replace(".", ",");
}

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

function buildResults(
  amount: string,
  direction: "ht-to-ttc" | "ttc-to-ht",
  vatRate: string,
) {
  const rateLabel = formatRate(vatRate);
  const parsed = parseAmount(amount);
  const isEmpty = amount.trim() === "";

  if (isEmpty) {
    return (
      <>
        <ResultCard
          label="Prix TTC"
          value={ZERO_EUR}
          details={
            direction === "ht-to-ttc"
              ? "Entrez un montant HT pour commencer."
              : "Entrez un montant TTC pour commencer."
          }
          muted
        />
        <ResultCard
          label="Montant de TVA"
          value={ZERO_EUR}
          details="Choisissez un taux de TVA."
          muted
        />
      </>
    );
  }

  if (parsed === null) {
    return (
      <>
        <ResultCard
          label={direction === "ht-to-ttc" ? "Prix TTC" : "Prix HT"}
          value={ZERO_EUR}
          details="Saisissez un montant valide (nombre positif)."
          muted
        />
        <ResultCard label="Montant de TVA" value={ZERO_EUR} details={`Taux sélectionné : ${rateLabel} %.`} muted />
      </>
    );
  }

  const rate = Number.parseFloat(vatRate);
  let ht: number;
  let ttc: number;
  let tva: number;

  if (direction === "ht-to-ttc") {
    ht = parsed;
    tva = ht * (rate / 100);
    ttc = ht + tva;

    const muted = ttc === 0;

    return (
      <>
        <ResultCard
          label="Prix TTC"
          value={currencyFormatter.format(ttc)}
          details={`Montant HT : ${currencyFormatter.format(ht)} · Taux de TVA : ${rateLabel} %`}
          muted={muted}
        />
        <ResultCard
          label="Montant de TVA"
          value={currencyFormatter.format(tva)}
          details={`Soit ${rateLabel} % du montant hors taxes.`}
          muted={muted}
        />
      </>
    );
  }

  ttc = parsed;
  ht = ttc / (1 + rate / 100);
  tva = ttc - ht;

  const muted = ht === 0;

  return (
    <>
      <ResultCard
        label="Prix HT"
        value={currencyFormatter.format(ht)}
        details={`Montant TTC saisi : ${currencyFormatter.format(ttc)} · Taux de TVA : ${rateLabel} %`}
        muted={muted}
      />
      <ResultCard
        label="Montant de TVA"
        value={currencyFormatter.format(tva)}
        details={`Différence entre le TTC et le HT au taux de ${rateLabel} %.`}
        muted={muted}
      />
    </>
  );
}

export default function Calculator() {
  const { setResult } = useCalculatorSlot();
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"ht-to-ttc" | "ttc-to-ht">("ht-to-ttc");
  const [vatRate, setVatRate] = useState("20");

  useLayoutEffect(() => {
    setResult(buildResults(amount, direction, vatRate));
  }, [amount, direction, vatRate, setResult]);

  return (
    <div className="calc-fields">
      <div>
        <label htmlFor="direction" className="calc-field-label">
          Sens du calcul
        </label>
        <select
          id="direction"
          name="direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value as "ht-to-ttc" | "ttc-to-ht")}
          className="calc-input"
        >
          <option value="ht-to-ttc">HT vers TTC</option>
          <option value="ttc-to-ht">TTC vers HT</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="calc-field-label">
          {direction === "ht-to-ttc" ? "Montant HT" : "Montant TTC"}
        </label>
        <input
          id="amount"
          name="amount"
          type="text"
          inputMode="decimal"
          placeholder={direction === "ht-to-ttc" ? "Ex. : 100" : "Ex. : 120"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="calc-input"
        />
      </div>

      <div>
        <label htmlFor="vatRate" className="calc-field-label">
          Taux de TVA
        </label>
        <select
          id="vatRate"
          name="vatRate"
          value={vatRate}
          onChange={(e) => setVatRate(e.target.value)}
          className="calc-input"
        >
          {VAT_RATES.map((rate) => (
            <option key={rate.value} value={rate.value}>
              {rate.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
