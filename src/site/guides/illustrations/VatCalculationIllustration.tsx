import { ILLU as c } from "./tokens";

/** Schéma HT → TVA → TTC avec flèches et formule */
export function VatCalculationIllustration() {
  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calcul HT plus TVA égale TTC">
      <rect width="720" height="320" fill={c.surfaceAlt} />

      {/* HT */}
      <rect x="48" y="72" width="168" height="112" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="132" y="108" textAnchor="middle" fill={c.textMuted} fontSize="10" fontWeight="600" letterSpacing="0.06em" fontFamily={c.font}>MONTANT HT</text>
      <text x="132" y="148" textAnchor="middle" fill={c.text} fontSize="28" fontWeight="700" fontFamily={c.font}>1 000 €</text>

      {/* Arrow 1 */}
      <text x="248" y="132" fill={c.brand} fontSize="24" fontWeight="300" fontFamily={c.font}>+</text>
      <path d="M 268 128 L 288 128" stroke={c.brandMuted} strokeWidth="2" markerEnd="url(#arrow)" />

      {/* TVA */}
      <rect x="296" y="72" width="168" height="112" rx="8" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1.5" />
      <text x="380" y="108" textAnchor="middle" fill={c.brand} fontSize="10" fontWeight="600" letterSpacing="0.06em" fontFamily={c.font}>TVA 20 %</text>
      <text x="380" y="148" textAnchor="middle" fill={c.brand} fontSize="28" fontWeight="700" fontFamily={c.font}>200 €</text>

      {/* Arrow 2 */}
      <text x="496" y="132" fill={c.brand} fontSize="24" fontWeight="300" fontFamily={c.font}>=</text>

      {/* TTC */}
      <rect x="528" y="72" width="168" height="112" rx="8" fill={c.brand} />
      <text x="612" y="108" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontWeight="600" letterSpacing="0.06em" fontFamily={c.font}>TOTAL TTC</text>
      <text x="612" y="148" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="700" fontFamily={c.font}>1 200 €</text>

      {/* Formula box */}
      <rect x="120" y="220" width="480" height="56" rx="8" fill={c.surface} stroke={c.border} />
      <text x="360" y="244" textAnchor="middle" fill={c.textMuted} fontSize="11" fontFamily={c.font}>Formule</text>
      <text x="360" y="264" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="600" fontFamily={c.font}>
        TTC = HT × (1 + 20 %) = 1 000 × 1,20 = <tspan fill={c.brand}>1 200 €</tspan>
      </text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brandMuted} />
        </marker>
      </defs>
    </svg>
  );
}
