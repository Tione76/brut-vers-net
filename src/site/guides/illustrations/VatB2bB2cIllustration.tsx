import { ILLU as c } from "./tokens";

/** Comparatif B2B vs B2C — traitement TVA */
export function VatB2bB2cIllustration() {
  return (
    <svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparatif du traitement de la TVA en B2B et B2C">
      <rect width="720" height="340" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        B2B vs B2C — qui paie la TVA ?
      </text>
      <text x="360" y="46" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Le statut du client et le territoire modifient le régime applicable
      </text>

      {/* B2C column */}
      <rect x="48" y="64" width="300" height="240" rx="10" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <rect x="48" y="64" width="300" height="6" rx="10" fill={c.brand} />
      <text x="198" y="92" textAnchor="middle" fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>B2C — Particulier</text>
      <text x="198" y="110" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>Client consommateur final</text>

      <rect x="68" y="124" width="260" height="56" rx="6" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="80" y="144" fill={c.textMuted} fontSize="9" fontWeight="600" fontFamily={c.font}>FRANCE</text>
      <text x="80" y="162" fill={c.text} fontSize="10" fontFamily={c.font}>Prestation de conseil</text>
      <rect x="240" y="148" width="76" height="22" rx="11" fill={c.brand} />
      <text x="278" y="163" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily={c.font}>TVA 20 %</text>

      <rect x="68" y="192" width="260" height="56" rx="6" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="80" y="212" fill={c.textMuted} fontSize="9" fontWeight="600" fontFamily={c.font}>UE — B2C</text>
      <text x="80" y="230" fill={c.text} fontSize="10" fontFamily={c.font}>Vente en ligne de biens</text>
      <rect x="228" y="216" width="88" height="22" rx="11" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="272" y="231" textAnchor="middle" fill={c.brand} fontSize="9" fontWeight="700" fontFamily={c.font}>TVA du pays</text>

      <rect x="68" y="264" width="260" height="28" rx="4" fill={c.brandLight} />
      <text x="198" y="283" textAnchor="middle" fill={c.brand} fontSize="10" fontWeight="600" fontFamily={c.font}>Le vendeur facture et collecte la TVA</text>

      {/* B2B column */}
      <rect x="372" y="64" width="300" height="240" rx="10" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <rect x="372" y="64" width="300" height="6" rx="10" fill="#245a8a" />
      <text x="522" y="92" textAnchor="middle" fill="#245a8a" fontSize="13" fontWeight="700" fontFamily={c.font}>B2B — Professionnel</text>
      <text x="522" y="110" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>Client assujetti avec n° TVA intracommunautaire</text>

      <rect x="392" y="124" width="260" height="56" rx="6" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="404" y="144" fill={c.textMuted} fontSize="9" fontWeight="600" fontFamily={c.font}>FRANCE</text>
      <text x="404" y="162" fill={c.text} fontSize="10" fontFamily={c.font}>Prestation de conseil</text>
      <rect x="564" y="148" width="76" height="22" rx="11" fill={c.brand} />
      <text x="602" y="163" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily={c.font}>TVA 20 %</text>

      <rect x="392" y="192" width="260" height="56" rx="6" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="404" y="212" fill={c.textMuted} fontSize="9" fontWeight="600" fontFamily={c.font}>UE — B2B</text>
      <text x="404" y="230" fill={c.text} fontSize="10" fontFamily={c.font}>Livraison intracommunautaire</text>
      <rect x="564" y="216" width="76" height="22" rx="11" fill="#245a8a" />
      <text x="602" y="231" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily={c.font}>TVA 0 %</text>

      <rect x="392" y="264" width="260" height="28" rx="4" fill={c.brandLight} />
      <text x="522" y="283" textAnchor="middle" fill={c.brand} fontSize="10" fontWeight="600" fontFamily={c.font}>Autoliquidation par l&apos;acheteur (art. 283-2)</text>

      {/* Center divider label */}
      <line x1="360" y1="80" x2="360" y2="288" stroke={c.border} strokeWidth="1" strokeDasharray="4 4" />

      <rect x="120" y="314" width="480" height="22" rx="4" fill={c.surface} stroke={c.border} />
      <text x="360" y="329" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>
        B2C = TVA incluse au prix · B2B UE = exonération avec autoliquidation · Export = exonération totale
      </text>
    </svg>
  );
}
