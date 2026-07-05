import { ILLU as c } from "./tokens";

/** Calcul de la TVA nette due */
export function VatNetBalanceIllustration() {
  return (
    <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calcul de la TVA nette due">
      <rect width="720" height="300" fill={c.surfaceAlt} />

      <rect x="80" y="60" width="160" height="80" rx="8" fill={c.brand} />
      <text x="160" y="92" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily={c.font}>Collectée</text>
      <text x="160" y="118" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily={c.font}>4 800 €</text>

      <text x="280" y="108" fill={c.brand} fontSize="28" fontWeight="300" fontFamily={c.font}>−</text>

      <rect x="320" y="60" width="160" height="80" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="400" y="92" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Déductible</text>
      <text x="400" y="118" textAnchor="middle" fill={c.text} fontSize="22" fontWeight="700" fontFamily={c.font}>1 200 €</text>

      <text x="520" y="108" fill={c.brand} fontSize="28" fontWeight="300" fontFamily={c.font}>=</text>

      <rect x="560" y="60" width="160" height="80" rx="8" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1.5" />
      <text x="640" y="92" textAnchor="middle" fill={c.brand} fontSize="10" fontFamily={c.font}>TVA due</text>
      <text x="640" y="118" textAnchor="middle" fill={c.brand} fontSize="22" fontWeight="700" fontFamily={c.font}>3 600 €</text>

      <rect x="120" y="180" width="480" height="80" rx="8" fill={c.surface} stroke={c.border} />
      <text x="360" y="208" textAnchor="middle" fill={c.textMuted} fontSize="11" fontFamily={c.font}>Exemple — artisan assujetti</text>
      <text x="360" y="232" textAnchor="middle" fill={c.text} fontSize="12" fontFamily={c.font}>
        CA HT 24 000 € × 20 % = 4 800 € collectée — Achats pro 6 000 € HT × 20 % = 1 200 € déductible
      </text>
    </svg>
  );
}
