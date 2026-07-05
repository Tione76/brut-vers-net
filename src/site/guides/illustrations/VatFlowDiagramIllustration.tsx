import { ILLU as c } from "./tokens";

/** Flux TVA collectée et déductible */
export function VatFlowDiagramIllustration() {
  return (
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma TVA collectée et TVA déductible">
      <rect width="720" height="360" fill={c.surfaceAlt} />

      <rect x="48" y="80" width="200" height="100" rx="8" fill={c.brand} />
      <text x="148" y="116" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="600" fontFamily={c.font}>VENTES</text>
      <text x="148" y="144" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily={c.font}>TVA collectée</text>
      <text x="148" y="164" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily={c.font}>Facturée au client</text>

      <rect x="472" y="80" width="200" height="100" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="572" y="116" textAnchor="middle" fill={c.textMuted} fontSize="10" fontWeight="600" fontFamily={c.font}>ACHATS</text>
      <text x="572" y="144" textAnchor="middle" fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>TVA déductible</text>
      <text x="572" y="164" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Sur les charges</text>

      <path d="M 248 130 L 320 130" stroke={c.brandMuted} strokeWidth="2" markerEnd="url(#arr)" />
      <path d="M 400 130 L 472 130" stroke={c.brandMuted} strokeWidth="2" />

      <rect x="260" y="220" width="200" height="80" rx="8" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1.5" />
      <text x="360" y="252" textAnchor="middle" fill={c.brand} fontSize="11" fontWeight="700" fontFamily={c.font}>Entreprise</text>
      <text x="360" y="276" textAnchor="middle" fill={c.text} fontSize="10" fontFamily={c.font}>Reverse la différence</text>

      <path d="M 148 180 L 148 220 L 300 220 L 300 260" stroke={c.brandMuted} strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 572 180 L 572 220 L 420 220 L 420 260" stroke={c.brandMuted} strokeWidth="2" strokeDasharray="4 3" />

      <rect x="200" y="310" width="320" height="36" rx="6" fill={c.brand} />
      <text x="360" y="334" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily={c.font}>
        État = TVA collectée − TVA déductible
      </text>

      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brandMuted} />
        </marker>
      </defs>
    </svg>
  );
}
