import { ILLU as c } from "./tokens";

/** Facture auto-entrepreneur avec et sans TVA */
export function AeInvoiceComparisonIllustration() {
  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparatif facture auto-entrepreneur franchise et assujetti">
      <rect width="720" height="320" fill={c.surfaceAlt} />

      <rect x="40" y="40" width="300" height="220" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="190" y="68" textAnchor="middle" fill={c.brand} fontSize="11" fontWeight="700" fontFamily={c.font}>Franchise en base</text>
      <line x1="60" y1="80" x2="320" y2="80" stroke={c.borderLight} />
      <text x="60" y="104" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Prestation web</text>
      <text x="280" y="104" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>1 500 €</text>
      <text x="60" y="140" fill={c.textMuted} fontSize="9" fontStyle="italic" fontFamily={c.font}>TVA non applicable, art. 293 B</text>
      <rect x="60" y="180" width="260" height="36" rx="4" fill={c.brandLight} />
      <text x="190" y="204" textAnchor="middle" fill={c.brand} fontSize="12" fontWeight="700" fontFamily={c.font}>Total : 1 500 €</text>

      <rect x="380" y="40" width="300" height="220" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="530" y="68" textAnchor="middle" fill={c.brand} fontSize="11" fontWeight="700" fontFamily={c.font}>Assujetti à la TVA</text>
      <line x1="400" y1="80" x2="660" y2="80" stroke={c.borderLight} />
      <text x="400" y="104" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Prestation web</text>
      <text x="620" y="104" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>1 500 € HT</text>
      <text x="400" y="128" fill={c.textMuted} fontSize="10" fontFamily={c.font}>TVA 20 %</text>
      <text x="620" y="128" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>300 €</text>
      <rect x="400" y="180" width="260" height="36" rx="4" fill={c.brand} />
      <text x="530" y="204" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily={c.font}>Total TTC : 1 800 €</text>
    </svg>
  );
}
