"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import "./margin-calculator.css";

const VAT_PRESETS = [
  { value: "2.1", label: "2,1 %" },
  { value: "5.5", label: "5,5 %" },
  { value: "10", label: "10 %" },
  { value: "20", label: "20 %" },
] as const;

const ZERO_EUR = "0,00 €";
const ZERO_PERCENT = "0,00 %";
const ZERO_COEF = "—";
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

function formatPercent(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} %`;
}

function formatMultiplier(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

/** Arrondi arithmétique au centime d'euro */
function roundCent(value: number): number {
  return Math.round(value * 100) / 100;
}

function resolveVatRate(vatRate: string, customVatRaw: string): number {
  if (vatRate === "custom") {
    const custom = parseAmount(customVatRaw);
    return custom ?? 0;
  }
  const rate = Number.parseFloat(vatRate);
  return Number.isFinite(rate) ? rate : 0;
}

function ResultRow({
  label,
  value,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  muted: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`margin-result-row${highlight ? " margin-result-row--highlight" : ""}`}>
      <span className="margin-result-row__label">{label}</span>
      <span
        className="margin-result-row__value"
        style={{
          color: muted ? MUTED_VALUE_COLOR : undefined,
          transition: VALUE_TRANSITION,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ResultsPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="margin-results-panel result-primary">
      <p className="margin-results-panel__title">{title}</p>
      <div className="margin-results-panel__rows">{children}</div>
    </div>
  );
}

function buildResults(purchasePriceRaw: string, marginPercentRaw: string, vatRate: string, customVatRaw: string) {
  const purchaseParsed = parseAmount(purchasePriceRaw);
  const marginParsed = parseAmount(marginPercentRaw);
  const rate = resolveVatRate(vatRate, customVatRaw);
  const emptyPurchase = purchasePriceRaw.trim() === "";
  const emptyMargin = marginPercentRaw.trim() === "";
  const muted = emptyPurchase || emptyMargin || purchaseParsed === null || marginParsed === null;

  let purchase = 0;
  let sellingPriceHt = 0;
  let marginAmount = 0;
  let marginRate = 0;
  let markupRate = 0;
  let multiplier = 0;
  let vatAmount = 0;
  let sellingPriceTtc = 0;

  if (!muted && purchaseParsed !== null && marginParsed !== null) {
    purchase = purchaseParsed;
    sellingPriceHt = roundCent(purchase * (1 + marginParsed / 100));
    marginAmount = roundCent(sellingPriceHt - purchase);
    marginRate = purchase > 0 ? roundCent((marginAmount / purchase) * 100) : 0;
    markupRate = sellingPriceHt > 0 ? roundCent((marginAmount / sellingPriceHt) * 100) : 0;
    multiplier = purchase > 0 ? roundCent(sellingPriceHt / purchase) : 0;
    vatAmount = roundCent(sellingPriceHt * (rate / 100));
    sellingPriceTtc = roundCent(sellingPriceHt + vatAmount);
  }

  return (
    <div className="margin-results-grid">
      <ResultsPanel title="Résultats">
        <ResultRow
          label="Marge brute"
          value={muted ? ZERO_EUR : currencyFormatter.format(marginAmount)}
          muted={muted}
        />
        <ResultRow
          label="Prix de vente HT"
          value={muted ? ZERO_EUR : currencyFormatter.format(sellingPriceHt)}
          muted={muted}
        />
        <ResultRow
          label="TVA"
          value={muted ? ZERO_EUR : currencyFormatter.format(vatAmount)}
          muted={muted}
        />
        <ResultRow
          label="Prix de vente TTC"
          value={muted ? ZERO_EUR : currencyFormatter.format(sellingPriceTtc)}
          muted={muted}
          highlight
        />
      </ResultsPanel>

      <ResultsPanel title="Indicateurs">
        <ResultRow
          label="Taux de marge"
          value={muted ? ZERO_PERCENT : formatPercent(marginRate)}
          muted={muted}
        />
        <ResultRow
          label="Taux de marque"
          value={muted ? ZERO_PERCENT : formatPercent(markupRate)}
          muted={muted}
        />
        <ResultRow
          label="Coefficient multiplicateur HT"
          value={muted ? ZERO_COEF : formatMultiplier(multiplier)}
          muted={muted}
        />
      </ResultsPanel>
    </div>
  );
}

export default function MarginCalculator() {
  const { setResult } = useCalculatorSlot();
  const [purchasePrice, setPurchasePrice] = useState("");
  const [marginPercent, setMarginPercent] = useState("");
  const [vatRate, setVatRate] = useState("20");
  const [customVatRate, setCustomVatRate] = useState("");

  useLayoutEffect(() => {
    setResult(buildResults(purchasePrice, marginPercent, vatRate, customVatRate));
  }, [purchasePrice, marginPercent, vatRate, customVatRate, setResult]);

  return (
    <div className="calc-fields margin-calc-fields">
      <div className="margin-calc-inputs-row">
        <div>
          <label htmlFor="purchasePrice" className="calc-field-label">
            Prix d&apos;achat HT
          </label>
          <input
            id="purchasePrice"
            name="purchasePrice"
            type="text"
            inputMode="decimal"
            placeholder="Ex. : 100"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="calc-input"
          />
        </div>

        <div>
          <label htmlFor="marginPercent" className="calc-field-label">
            Taux de marge (%)
          </label>
          <input
            id="marginPercent"
            name="marginPercent"
            type="text"
            inputMode="decimal"
            placeholder="Ex. : 40"
            value={marginPercent}
            onChange={(e) => setMarginPercent(e.target.value)}
            className="calc-input"
            aria-describedby="marginPercentHint"
          />
          <p className="margin-field-hint" id="marginPercentHint">
            Appliqué sur le prix d&apos;achat HT — distinct du taux de marque.
          </p>
        </div>
      </div>

      <fieldset className="margin-vat-fieldset calc-fieldset">
        <legend className="calc-field-label">Taux de TVA</legend>
        <div className="margin-vat-options" role="radiogroup" aria-label="Taux de TVA">
          {VAT_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              role="radio"
              aria-checked={vatRate === preset.value}
              className={`margin-vat-btn${vatRate === preset.value ? " margin-vat-btn--active" : ""}`}
              onClick={() => setVatRate(preset.value)}
            >
              {preset.label}
            </button>
          ))}
          <div className={`margin-vat-custom${vatRate === "custom" ? " margin-vat-custom--active" : ""}`}>
            <button
              type="button"
              role="radio"
              aria-checked={vatRate === "custom"}
              className={`margin-vat-btn${vatRate === "custom" ? " margin-vat-btn--active" : ""}`}
              onClick={() => setVatRate("custom")}
            >
              Personnalisé
            </button>
            {vatRate === "custom" && (
              <label className="margin-vat-custom__field">
                <span className="sr-only">Taux personnalisé en pourcentage</span>
                <input
                  type="text"
                  inputMode="decimal"
                  className="margin-vat-custom__input"
                  placeholder="17"
                  value={customVatRate}
                  onChange={(e) => setCustomVatRate(e.target.value)}
                  aria-label="Taux personnalisé (%)"
                />
              </label>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
}
