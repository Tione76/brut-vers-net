/** Mockup pédagogique : zones d'une fiche de paie (illustratif, non contractuel) */
export function FicheDePaieZonesIllustration() {
  return (
    <svg
      viewBox="0 0 720 520"
      role="img"
      aria-labelledby="fiche-paie-illustration-title fiche-paie-illustration-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="fiche-paie-illustration-title">{"Schéma simplifié d'une fiche de paie"}</title>
      <desc id="fiche-paie-illustration-desc">
        Bulletin de salaire fictif avec les zones employeur, salarié, salaire brut, cotisations, net
        avant impôt, prélèvement à la source et net versé mises en évidence.
      </desc>

      <defs>
        <linearGradient id="fiche-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f9fb" />
        </linearGradient>
        <filter id="fiche-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Document */}
      <rect x="40" y="24" width="640" height="472" rx="12" fill="url(#fiche-bg)" stroke="#e4e8ed" filter="url(#fiche-shadow)" />

      {/* En-tête document */}
      <rect x="40" y="24" width="640" height="44" rx="12" fill="#fff4ed" />
      <rect x="40" y="56" width="640" height="12" fill="#fff4ed" />
      <text x="64" y="54" fill="#f28539" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">
        BULLETIN DE SALAIRE · Exemple simplifié
      </text>

      {/* Zone employeur / salarié */}
      <rect x="56" y="84" width="608" height="72" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" />
      <rect x="56" y="84" width="6" height="72" rx="3" fill="#f28539" />
      <text x="74" y="106" fill="#f28539" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        EMPLOYEUR · SALARIÉ
      </text>
      <rect x="74" y="116" width="220" height="8" rx="2" fill="#f2d5bc" />
      <rect x="74" y="132" width="180" height="8" rx="2" fill="#e4e8ed" />
      <rect x="380" y="116" width="160" height="8" rx="2" fill="#f2d5bc" />
      <rect x="380" y="132" width="120" height="8" rx="2" fill="#e4e8ed" />

      {/* Zone salaire brut */}
      <rect x="56" y="168" width="608" height="56" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" />
      <rect x="56" y="168" width="6" height="56" rx="3" fill="#f28539" />
      <text x="74" y="190" fill="#f28539" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        SALAIRE BRUT
      </text>
      <rect x="74" y="200" width="140" height="8" rx="2" fill="#e4e8ed" />
      <text x="580" y="206" fill="#161616" fontSize="13" fontWeight="700" textAnchor="end" fontFamily="system-ui, sans-serif">
        2 500,00 €
      </text>

      {/* Zone cotisations */}
      <rect x="56" y="236" width="608" height="108" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" />
      <rect x="56" y="236" width="6" height="108" rx="3" fill="#f28539" />
      <text x="74" y="258" fill="#f28539" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        COTISATIONS
      </text>
      <rect x="74" y="270" width="100" height="7" rx="2" fill="#e4e8ed" />
      <text x="580" y="278" fill="#6b7280" fontSize="11" textAnchor="end" fontFamily="system-ui, sans-serif">
        - 142,50 €
      </text>
      <rect x="74" y="288" width="120" height="7" rx="2" fill="#e4e8ed" />
      <text x="580" y="296" fill="#6b7280" fontSize="11" textAnchor="end" fontFamily="system-ui, sans-serif">
        - 198,75 €
      </text>
      <rect x="74" y="306" width="80" height="7" rx="2" fill="#e4e8ed" />
      <text x="580" y="314" fill="#6b7280" fontSize="11" textAnchor="end" fontFamily="system-ui, sans-serif">
        - 180,19 €
      </text>
      <rect x="74" y="324" width="90" height="7" rx="2" fill="#e4e8ed" />
      <text x="580" y="332" fill="#6b7280" fontSize="11" textAnchor="end" fontFamily="system-ui, sans-serif">
        - …
      </text>

      {/* Net avant impôt */}
      <rect x="56" y="356" width="608" height="44" rx="8" fill="#f7f9fb" stroke="#dde3ea" strokeWidth="1" />
      <rect x="56" y="356" width="6" height="44" rx="3" fill="#da7830" />
      <text x="74" y="382" fill="#161616" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        NET AVANT IMPÔT
      </text>
      <text x="580" y="382" fill="#161616" fontSize="13" fontWeight="700" textAnchor="end" fontFamily="system-ui, sans-serif">
        1 978,56 €
      </text>

      {/* Prélèvement à la source */}
      <rect x="56" y="412" width="608" height="44" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" />
      <rect x="56" y="412" width="6" height="44" rx="3" fill="#f28539" />
      <text x="74" y="432" fill="#f28539" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        PRÉLÈVEMENT À LA SOURCE
      </text>
      <rect x="74" y="440" width="80" height="7" rx="2" fill="#e4e8ed" />
      <text x="580" y="446" fill="#6b7280" fontSize="11" textAnchor="end" fontFamily="system-ui, sans-serif">
        Net imposable · Taux · Montant
      </text>

      {/* Net versé */}
      <rect x="56" y="468" width="608" height="44" rx="8" fill="#f28539" />
      <text x="74" y="496" fill="#fff6f0" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">
        NET VERSÉ
      </text>
      <text x="580" y="496" fill="#ffffff" fontSize="15" fontWeight="800" textAnchor="end" fontFamily="system-ui, sans-serif">
        1 584,00 €
      </text>
    </svg>
  );
}
