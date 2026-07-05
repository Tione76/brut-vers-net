import { ILLU as c } from "./tokens";

/** Facture annotée — HT, TVA par taux, ventilation */
export function VatInvoiceAnnotatedIllustration() {
  return (
    <svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Facture annotée montrant HT, TVA par taux et ventilation">
      <defs>
        <marker id="via-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brand} />
        </marker>
      </defs>
      <rect width="720" height="520" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        Lecture d&apos;une facture multi-taux
      </text>
      <text x="360" y="46" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Chaque ligne porte son taux — la ventilation regroupe par catégorie
      </text>

      {/* Invoice card */}
      <rect x="120" y="60" width="480" height="300" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))" />
      <rect x="120" y="60" width="480" height="5" rx="8" fill={c.brand} />

      <text x="140" y="88" fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>FACTURE N° 2026-042</text>

      {/* Table header */}
      <rect x="140" y="100" width="440" height="26" fill={c.brand} rx="4" />
      {["Désignation", "Montant HT", "Taux", "TVA"].map((h, i) => (
        <text key={h} x={[152, 340, 420, 500][i]} y="118" fill="#fff" fontSize="9" fontWeight="600" fontFamily={c.font}>{h}</text>
      ))}

      {/* Line 1 — 20% */}
      <rect x="140" y="130" width="440" height="34" fill={c.surface} stroke={c.borderLight} />
      <text x="152" y="152" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>Conseil stratégique</text>
      <text x="380" y="152" textAnchor="end" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>1 000,00 €</text>
      <rect x="400" y="138" width="44" height="18" rx="9" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="422" y="151" textAnchor="middle" fill={c.brand} fontSize="9" fontWeight="700" fontFamily={c.font}>20 %</text>
      <text x="540" y="152" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>200,00 €</text>

      {/* Line 2 — 5.5% */}
      <rect x="140" y="164" width="440" height="34" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="152" y="186" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>Livres professionnels</text>
      <text x="380" y="186" textAnchor="end" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>200,00 €</text>
      <rect x="400" y="172" width="44" height="18" rx="9" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="422" y="185" textAnchor="middle" fill={c.brand} fontSize="9" fontWeight="700" fontFamily={c.font}>5,5 %</text>
      <text x="540" y="186" textAnchor="end" fill={c.text} fontSize="10" fontFamily={c.font}>11,00 €</text>

      {/* Totals block */}
      <rect x="300" y="210" width="280" height="88" rx="6" fill={c.surfaceAlt} stroke={c.border} />
      {[
        ["Total HT", "1 200,00 €", false],
        ["Total TVA", "211,00 €", false],
        ["Total TTC", "1 411,00 €", true],
      ].map(([label, val, bold], i) => (
        <g key={label as string}>
          <text x="320" y={234 + i * 24} fill={bold ? c.brand : c.textMuted} fontSize={bold ? 12 : 10} fontWeight={bold ? 700 : 400} fontFamily={c.font}>{label}</text>
          <text x="560" y={234 + i * 24} textAnchor="end" fill={bold ? c.brand : c.text} fontSize={bold ? 13 : 10} fontWeight={bold ? 700 : 500} fontFamily={c.font}>{val}</text>
        </g>
      ))}

      {/* Ventilation block inside invoice */}
      <rect x="140" y="310" width="440" height="38" rx="4" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1" />
      <text x="152" y="328" fill={c.brand} fontSize="9" fontWeight="700" letterSpacing="0.06em" fontFamily={c.font}>VENTILATION PAR TAUX</text>
      <text x="152" y="342" fill={c.text} fontSize="9" fontFamily={c.font}>Base 20 % : 1 000 € → TVA 200 €</text>
      <text x="380" y="342" fill={c.text} fontSize="9" fontFamily={c.font}>Base 5,5 % : 200 € → TVA 11 €</text>

      {/* Annotation: HT arrow */}
      <path d="M 48 152 L 110 152" stroke={c.brand} strokeWidth="1.5" markerEnd="url(#via-arr)" />
      <rect x="8" y="136" width="36" height="22" rx="4" fill={c.brand} />
      <text x="26" y="151" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily={c.font}>HT</text>

      {/* Annotation: TVA 20% */}
      <path d="M 48 200 L 110 148" stroke={c.brand} strokeWidth="1.5" markerEnd="url(#via-arr)" />
      <rect x="4" y="188" width="56" height="22" rx="4" fill={c.brand} />
      <text x="32" y="203" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily={c.font}>TVA 20 %</text>

      {/* Annotation: TVA 5,5% */}
      <path d="M 48 248 L 110 182" stroke={c.brand} strokeWidth="1.5" markerEnd="url(#via-arr)" />
      <rect x="4" y="236" width="60" height="22" rx="4" fill={c.brand} />
      <text x="34" y="251" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily={c.font}>TVA 5,5 %</text>

      {/* Annotation: Ventilation */}
      <path d="M 672 328 L 582 328" stroke={c.brand} strokeWidth="1.5" markerEnd="url(#via-arr)" />
      <rect x="628" y="312" width="84" height="22" rx="4" fill={c.brand} />
      <text x="670" y="327" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily={c.font}>Ventilation</text>

      {/* Annotation: TTC */}
      <path d="M 672 270 L 582 258" stroke={c.brand} strokeWidth="1.5" markerEnd="url(#via-arr)" />
      <rect x="648" y="254" width="40" height="22" rx="4" fill={c.brand} />
      <text x="668" y="269" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily={c.font}>TTC</text>

      {/* Legend footer */}
      <rect x="80" y="390" width="560" height="108" rx="10" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="360" y="416" textAnchor="middle" fill={c.brand} fontSize="11" fontWeight="700" fontFamily={c.font}>Obligation légale de ventilation</text>
      <text x="100" y="442" fill={c.text} fontSize="10" fontFamily={c.font}>• Le montant HT est indiqué par ligne avant application du taux</text>
      <text x="100" y="462" fill={c.text} fontSize="10" fontFamily={c.font}>• La TVA est calculée ligne par ligne selon la nature du bien ou service</text>
      <text x="100" y="482" fill={c.text} fontSize="10" fontFamily={c.font}>• La ventilation regroupe les bases et montants de TVA par taux sur la facture</text>
    </svg>
  );
}
