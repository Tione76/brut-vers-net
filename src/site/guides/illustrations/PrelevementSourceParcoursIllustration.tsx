/** Schéma pédagogique : parcours du salaire jusqu'au net versé via le prélèvement à la source */
export function PrelevementSourceParcoursIllustration() {
  return (
    <svg
      viewBox="0 0 720 200"
      role="img"
      aria-labelledby="pas-parcours-title pas-parcours-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pas-parcours-title">{"Parcours du salaire brut au net versé"}</title>
      <desc id="pas-parcours-desc">
        Représentation simplifiée en cinq étapes : salaire brut, cotisations salariales, salaire net
        avant impôt, prélèvement à la source et salaire net versé.
      </desc>

      <defs>
        <filter id="pas-parcours-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Brut */}
      <rect x="12" y="60" width="96" height="80" rx="10" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" filter="url(#pas-parcours-shadow)" />
      <text x="60" y="88" fill="#f28539" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALAIRE
      </text>
      <text x="60" y="100" fill="#f28539" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        BRUT
      </text>
      <rect x="28" y="112" width="64" height="8" rx="2" fill="#f2d5bc" />

      <text x="120" y="104" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* Cotisations */}
      <rect x="132" y="60" width="96" height="80" rx="10" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1.5" filter="url(#pas-parcours-shadow)" />
      <text x="180" y="92" fill="#18753c" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        COTISATIONS
      </text>
      <text x="180" y="104" fill="#18753c" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALARIALES
      </text>
      <rect x="148" y="116" width="64" height="6" rx="2" fill="#b8d9c4" />

      <text x="240" y="104" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* Net avant impôt */}
      <rect x="252" y="60" width="108" height="80" rx="10" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" filter="url(#pas-parcours-shadow)" />
      <text x="306" y="88" fill="#f28539" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        NET AVANT
      </text>
      <text x="306" y="100" fill="#f28539" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        IMPÔT
      </text>
      <rect x="268" y="112" width="76" height="8" rx="2" fill="#f2d5bc" />

      <text x="372" y="104" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* PAS */}
      <rect x="384" y="60" width="108" height="80" rx="10" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1.5" filter="url(#pas-parcours-shadow)" />
      <text x="438" y="88" fill="#18753c" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        PRÉLÈVEMENT
      </text>
      <text x="438" y="100" fill="#18753c" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        À LA SOURCE
      </text>
      <rect x="404" y="116" width="68" height="6" rx="2" fill="#b8d9c4" />

      <text x="504" y="104" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* Net versé */}
      <rect x="516" y="60" width="108" height="80" rx="10" fill="#f28539" filter="url(#pas-parcours-shadow)" />
      <text x="570" y="88" fill="#fff6f0" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALAIRE NET
      </text>
      <text x="570" y="100" fill="#fff6f0" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        VERSÉ
      </text>
      <rect x="536" y="116" width="68" height="8" rx="2" fill="rgba(255,255,255,0.35)" />

      <text x="660" y="104" fill="#18753c" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        ✓
      </text>

      <text x="360" y="178" fill="#6b7280" fontSize="11" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Les cotisations interviennent avant le prélèvement à la source, qui produit le salaire net versé
      </text>
    </svg>
  );
}
