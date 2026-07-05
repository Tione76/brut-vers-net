import { ILLU as c } from "./tokens";

/** Facture mixte — conseil 20 % + livres 5,5 % */
export function VatMixedInvoiceIllustration() {
  return (
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma d'une facture avec plusieurs taux de TVA : conseil à 20 % et livres à 5,5 %">
      <rect width="720" height="360" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        Facture multi-taux — exemple concret
      </text>
      <text x="360" y="46" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Deux natures d&apos;opérations = deux taux distincts sur la même facture
      </text>

      <rect x="80" y="60" width="560" height="240" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))" />
      <rect x="80" y="60" width="560" height="5" rx="8" fill={c.brand} />

      <text x="100" y="88" fill={c.brand} fontSize="12" fontWeight="700" fontFamily={c.font}>Éditions &amp; Conseil SAS</text>
      <text x="620" y="88" textAnchor="end" fill={c.textMuted} fontSize="10" fontFamily={c.font}>FAC-2026-0089</text>

      {/* Table header */}
      <rect x="100" y="100" width="520" height="24" rx="4" fill={c.brand} />
      {["Désignation", "Base HT", "Taux", "TVA", "TTC ligne"].map((h, i) => (
        <text key={h} x={[112, 300, 380, 440, 540][i]} y="116" fill="#fff" fontSize="9" fontWeight="600" fontFamily={c.font}>{h}</text>
      ))}

      {/* Row 1 — Conseil 20% */}
      <rect x="100" y="128" width="520" height="36" fill={c.surface} stroke={c.borderLight} />
      <text x="112" y="150" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>Mission conseil éditorial</text>
      <rect x="248" y="136" width="52" height="16" rx="3" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="274" y="148" textAnchor="middle" fill={c.brand} fontSize="8" fontWeight="700" fontFamily={c.font}>Service</text>
      <text x="340" y="150" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>800,00 €</text>
      <rect x="360" y="138" width="40" height="16" rx="8" fill={c.brand} />
      <text x="380" y="149" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily={c.font}>20 %</text>
      <text x="470" y="150" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>160,00 €</text>
      <text x="600" y="150" textAnchor="end" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>960,00 €</text>

      {/* Row 2 — Livres 5.5% */}
      <rect x="100" y="164" width="520" height="36" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="112" y="186" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>Lot de 10 ouvrages professionnels</text>
      <rect x="248" y="172" width="52" height="16" rx="3" fill={c.successLight} stroke={c.success} strokeOpacity="0.3" />
      <text x="274" y="184" textAnchor="middle" fill={c.success} fontSize="8" fontWeight="700" fontFamily={c.font}>Livre</text>
      <text x="340" y="186" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>400,00 €</text>
      <rect x="360" y="174" width="40" height="16" rx="8" fill="#3a7ab5" />
      <text x="380" y="185" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily={c.font}>5,5 %</text>
      <text x="470" y="186" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>22,00 €</text>
      <text x="600" y="186" textAnchor="end" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>422,00 €</text>

      {/* Ventilation */}
      <rect x="100" y="210" width="520" height="78" rx="6" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1" />
      <text x="120" y="230" fill={c.brand} fontSize="10" fontWeight="700" fontFamily={c.font}>Ventilation par taux</text>
      <rect x="120" y="242" width="230" height="36" rx="4" fill={c.surface} stroke={c.borderLight} />
      <text x="132" y="258" fill={c.text} fontSize="9" fontWeight="600" fontFamily={c.font}>Base 20 % (conseil)</text>
      <text x="132" y="272" fill={c.textMuted} fontSize="9" fontFamily={c.font}>800 € HT → 160 € TVA</text>
      <rect x="370" y="242" width="230" height="36" rx="4" fill={c.surface} stroke={c.borderLight} />
      <text x="382" y="258" fill={c.text} fontSize="9" fontWeight="600" fontFamily={c.font}>Base 5,5 % (livres)</text>
      <text x="382" y="272" fill={c.textMuted} fontSize="9" fontFamily={c.font}>400 € HT → 22 € TVA</text>

      {/* Totals bar */}
      <rect x="340" y="312" width="300" height="36" rx="6" fill={c.brand} />
      <text x="360" y="334" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily={c.font}>Total TTC</text>
      <text x="620" y="334" textAnchor="end" fill="#fff" fontSize="14" fontWeight="800" fontFamily={c.font}>1 382,00 €</text>
    </svg>
  );
}
