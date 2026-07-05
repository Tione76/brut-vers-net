import { ILLU as c } from "./tokens";

/** Facture rectificative (avoir) réaliste */
export function CreditNoteIllustration() {
  return (
    <svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exemple de facture rectificative ou avoir">
      <rect width="720" height="440" fill={c.surfaceAlt} />
      <rect x="40" y="28" width="640" height="384" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <rect x="40" y="28" width="640" height="5" rx="8" fill={c.error} />

      <text x="60" y="68" fill={c.error} fontSize="20" fontWeight="700" fontFamily={c.font}>FACTURE RECTIFICATIVE</text>
      <text x="60" y="90" fill={c.textMuted} fontSize="11" fontFamily={c.font}>N° AV-2026-0005 · Date : 04/07/2026</text>

      <rect x="60" y="104" width="600" height="40" rx="4" fill={c.errorLight} stroke="#fecaca" />
      <text x="76" y="128" fill={c.error} fontSize="11" fontWeight="600" fontFamily={c.font}>
        Annule la facture N° FAC-2026-0030 du 15/06/2026
      </text>

      <rect x="60" y="164" width="600" height="28" fill={c.brand} rx="4" />
      <text x="72" y="182" fill="#fff" fontSize="10" fontWeight="600" fontFamily={c.font}>Désignation</text>
      <text x="580" y="182" fill="#fff" fontSize="10" fontWeight="600" fontFamily={c.font}>Montant TTC</text>

      <rect x="60" y="196" width="600" height="32" fill={c.surface} stroke={c.borderLight} />
      <text x="72" y="216" fill={c.textSecondary} fontSize="10" fontFamily={c.font}>Annulation — erreur de montant sur FAC-2026-0030</text>
      <text x="640" y="216" textAnchor="end" fill={c.error} fontSize="11" fontWeight="700" fontFamily={c.font}>- 1 200,00 €</text>

      <rect x="380" y="252" width="280" height="100" rx="6" fill={c.errorLight} stroke="#fecaca" />
      {[
        ["Total HT", "- 1 000,00 €"],
        ["TVA 20 %", "- 200,00 €"],
        ["Total TTC", "- 1 200,00 €"],
      ].map(([label, val], i) => (
        <g key={label}>
          <text x="400" y={278 + i * 26} fill={i === 2 ? c.error : c.textMuted} fontSize={i === 2 ? 12 : 10} fontWeight={i === 2 ? 700 : 400} fontFamily={c.font}>{label}</text>
          <text x="640" y={278 + i * 26} textAnchor="end" fill={c.error} fontSize={i === 2 ? 13 : 10} fontWeight={i === 2 ? 700 : 500} fontFamily={c.font}>{val}</text>
        </g>
      ))}

      <rect x="60" y="372" width="600" height="28" rx="4" fill={c.successLight} stroke="#bbf7d0" />
      <text x="76" y="390" fill={c.success} fontSize="10" fontWeight="600" fontFamily={c.font}>
        → Puis émettre FAC-2026-0031 pour 1 000,00 € TTC (montant corrigé)
      </text>
    </svg>
  );
}
