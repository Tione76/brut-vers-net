import { ILLU as c } from "./tokens";

/** Comparatif franchise vs assujetti */
export function FranchiseComparisonIllustration() {
  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparatif franchise en base et assujetti à la TVA">
      <rect width="720" height="320" fill={c.surfaceAlt} />

      <rect x="40" y="40" width="300" height="240" rx="8" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1.5" />
      <text x="190" y="72" textAnchor="middle" fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>Franchise en base</text>
      {["Pas de TVA facturée", "Pas de déduction de TVA", "Mention art. 293 B obligatoire", "Comptabilité allégée", "CA sous les seuils"].map((t, i) => (
        <text key={t} x="60" y={100 + i * 32} fill={c.text} fontSize="11" fontFamily={c.font}>✓ {t}</text>
      ))}

      <rect x="380" y="40" width="300" height="240" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
      <text x="530" y="72" textAnchor="middle" fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>Assujetti à la TVA</text>
      {["TVA collectée sur les ventes", "TVA déductible sur les achats", "N° TVA intracommunautaire", "Déclarations périodiques", "Déduction des charges"].map((t, i) => (
        <text key={t} x="400" y={100 + i * 32} fill={c.text} fontSize="11" fontFamily={c.font}>✓ {t}</text>
      ))}

      <text x="360" y="304" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Art. 293 B et 293 C du CGI
      </text>
    </svg>
  );
}
