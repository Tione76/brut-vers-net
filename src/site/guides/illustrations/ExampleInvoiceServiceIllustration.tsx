import { ILLU as c } from "./tokens";

/** Facture réaliste — prestation de service / freelance */
export function ExampleInvoiceServiceIllustration() {
  return (
    <svg viewBox="0 0 720 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exemple de facture conforme pour une prestation de service">
      <rect width="720" height="580" fill={c.surfaceAlt} />
      <rect x="40" y="28" width="640" height="524" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))" />
      <rect x="40" y="28" width="640" height="5" rx="8" fill={c.brand} />

      {/* Logo placeholder */}
      <rect x="60" y="52" width="44" height="44" rx="6" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="82" y="80" textAnchor="middle" fill={c.brand} fontSize="18" fontWeight="700" fontFamily={c.font}>CS</text>

      <text x="116" y="68" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>Conseil Stratégique SARL</text>
      <text x="116" y="86" fill={c.textMuted} fontSize="10" fontFamily={c.font}>12 av. de la République, 75011 Paris</text>
      <text x="116" y="100" fill={c.textMuted} fontSize="10" fontFamily={c.font}>SIRET 123 456 789 00012 · TVA FR 12 345678901</text>

      <text x="660" y="68" textAnchor="end" fill={c.brand} fontSize="22" fontWeight="700" fontFamily={c.font}>FACTURE</text>
      <text x="660" y="90" textAnchor="end" fill={c.textMuted} fontSize="11" fontFamily={c.font}>N° FAC-2026-0015</text>
      <text x="660" y="106" textAnchor="end" fill={c.textMuted} fontSize="11" fontFamily={c.font}>Date : 04/07/2026</text>

      {/* Client box */}
      <rect x="60" y="124" width="280" height="64" rx="4" fill={c.surfaceAlt} stroke={c.borderLight} />
      <text x="72" y="142" fill={c.textMuted} fontSize="9" fontWeight="600" letterSpacing="0.08em" fontFamily={c.font}>FACTURÉ À</text>
      <text x="72" y="160" fill={c.text} fontSize="12" fontWeight="600" fontFamily={c.font}>SAS Martin &amp; Associés</text>
      <text x="72" y="176" fill={c.textMuted} fontSize="10" fontFamily={c.font}>10 rue de la Paix, 75002 Paris</text>

      {/* Table */}
      <rect x="60" y="208" width="600" height="30" fill={c.brand} rx="4" />
      {["Désignation", "Qté", "P.U. HT", "Montant HT"].map((h, i) => (
        <text key={h} x={[72, 400, 460, 560][i]} y="228" fill="#fff" fontSize="10" fontWeight="600" fontFamily={c.font}>{h}</text>
      ))}

      <rect x="60" y="242" width="600" height="36" fill={c.surface} stroke={c.borderLight} />
      <text x="72" y="264" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>Mission conseil stratégique — T3 2026</text>
      <text x="408" y="264" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>3</text>
      <text x="456" y="264" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>650,00 €</text>
      <text x="548" y="264" fill={c.text} fontSize="10" fontWeight="600" fontFamily={c.font}>1 950,00 €</text>

      {/* Totals */}
      <rect x="380" y="300" width="280" height="120" rx="6" fill={c.surfaceAlt} stroke={c.border} />
      {[
        ["Total HT", "1 950,00 €", false],
        ["TVA 20 %", "390,00 €", false],
        ["Total TTC", "2 340,00 €", true],
      ].map(([label, val, bold], i) => (
        <g key={label as string}>
          <text x="400" y={328 + i * 28} fill={bold ? c.brand : c.textMuted} fontSize={bold ? 13 : 11} fontWeight={bold ? 700 : 400} fontFamily={c.font}>{label}</text>
          <text x="640" y={328 + i * 28} textAnchor="end" fill={bold ? c.brand : c.text} fontSize={bold ? 14 : 11} fontWeight={bold ? 700 : 500} fontFamily={c.font}>{val}</text>
          {i === 1 && <line x1="400" y1="358" x2="640" y2="358" stroke={c.border} />}
        </g>
      ))}

      {/* Footer */}
      <line x1="60" y1="448" x2="660" y2="448" stroke={c.borderLight} />
      <text x="60" y="472" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Paiement à 30 jours date de facture</text>
      <text x="60" y="490" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Pénalités de retard : 3 × taux d&apos;intérêt légal · Indemnité forfaitaire : 40 €</text>
      <text x="60" y="508" fill={c.textMuted} fontSize="10" fontFamily={c.font}>Escompte pour paiement anticipé : Néant</text>
      <text x="60" y="532" fill={c.textMuted} fontSize="10" fontFamily={c.font}>IBAN FR76 1234 5678 9012 3456 7890 123 · BIC ABCDFRPP</text>
    </svg>
  );
}
