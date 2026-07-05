import { ILLU as c } from "./tokens";

/** Statuts TVA de l'auto-entrepreneur */
export function AeVatStatusIllustration() {
  return (
    <svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Statuts TVA de l'auto-entrepreneur">
      <rect width="720" height="340" fill={c.surfaceAlt} />

      <rect x="200" y="24" width="320" height="52" rx="26" fill={c.brand} />
      <text x="360" y="56" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily={c.font}>Auto-entrepreneur (micro-entreprise)</text>

      <path d="M 200 76 L 200 110 L 120 110 L 120 140" stroke={c.brandMuted} strokeWidth="2" fill="none" />
      <path d="M 520 76 L 520 110 L 600 110 L 600 140" stroke={c.brandMuted} strokeWidth="2" fill="none" />

      <rect x="40" y="140" width="280" height="160" rx="8" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1.5" />
      <text x="180" y="172" textAnchor="middle" fill={c.brand} fontSize="12" fontWeight="700" fontFamily={c.font}>Franchise en base (par défaut)</text>
      <text x="60" y="200" fill={c.text} fontSize="11" fontFamily={c.font}>• TVA non applicable</text>
      <text x="60" y="222" fill={c.text} fontSize="11" fontFamily={c.font}>• Mention art. 293 B sur factures</text>
      <text x="60" y="244" fill={c.text} fontSize="11" fontFamily={c.font}>• Pas de déclaration de TVA</text>
      <text x="60" y="266" fill={c.text} fontSize="11" fontFamily={c.font}>• CA sous les seuils légaux</text>

      <rect x="400" y="140" width="280" height="160" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="540" y="172" textAnchor="middle" fill={c.brand} fontSize="12" fontWeight="700" fontFamily={c.font}>Assujetti volontaire ou forcé</text>
      <text x="420" y="200" fill={c.text} fontSize="11" fontFamily={c.font}>• TVA facturée aux clients</text>
      <text x="420" y="222" fill={c.text} fontSize="11" fontFamily={c.font}>• TVA déductible sur achats</text>
      <text x="420" y="244" fill={c.text} fontSize="11" fontFamily={c.font}>• Déclarations CA3 ou CA12</text>
      <text x="420" y="266" fill={c.text} fontSize="11" fontFamily={c.font}>• Option ou dépassement de seuils</text>

      <text x="360" y="326" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Art. 293 B et 293 C du CGI — régime micro-social distinct du régime TVA
      </text>
    </svg>
  );
}
