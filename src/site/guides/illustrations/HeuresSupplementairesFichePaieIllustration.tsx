/** Illustration pédagogique : heures supplémentaires sur un bulletin simplifié */
export function HeuresSupplementairesFichePaieIllustration() {
  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-labelledby="hs-paie-illustration-title hs-paie-illustration-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hs-paie-illustration-title">
        Heures supplémentaires sur une fiche de paie simplifiée
      </title>
      <desc id="hs-paie-illustration-desc">
        Bulletin fictif mettant en évidence le salaire de base, les heures majorées à 25 % et à 50 %,
        puis le total brut du mois.
      </desc>

      <defs>
        <linearGradient id="hs-fiche-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f9fb" />
        </linearGradient>
        <filter id="hs-fiche-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      <rect
        x="48"
        y="28"
        width="624"
        height="364"
        rx="12"
        fill="url(#hs-fiche-bg)"
        stroke="#e4e8ed"
        filter="url(#hs-fiche-shadow)"
      />

      <rect x="48" y="28" width="624" height="44" rx="12" fill="#fff4ed" />
      <rect x="48" y="60" width="624" height="12" fill="#fff4ed" />
      <text
        x="72"
        y="58"
        fill="#f28539"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        FICHE DE PAIE · Heures supplémentaires (exemple)
      </text>

      <rect
        x="72"
        y="96"
        width="576"
        height="52"
        rx="8"
        fill="#ffffff"
        stroke="#e4e8ed"
        strokeWidth="1.5"
      />
      <text
        x="88"
        y="118"
        fill="#6b7280"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Salaire de base
      </text>
      <text
        x="88"
        y="136"
        fill="#161616"
        fontSize="13"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Temps plein · 35 h
      </text>
      <text
        x="624"
        y="128"
        fill="#161616"
        fontSize="14"
        fontWeight="700"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
      >
        2 500,00 €
      </text>

      <rect
        x="72"
        y="164"
        width="576"
        height="64"
        rx="8"
        fill="#fff4ed"
        stroke="#f2d5bc"
        strokeWidth="1.5"
      />
      <rect x="72" y="164" width="6" height="64" rx="3" fill="#f28539" />
      <text
        x="92"
        y="188"
        fill="#f28539"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        HEURES SUPPLÉMENTAIRES À 25 %
      </text>
      <text
        x="92"
        y="208"
        fill="#161616"
        fontSize="13"
        fontFamily="system-ui, sans-serif"
      >
        8 h majorées
      </text>
      <text
        x="624"
        y="200"
        fill="#161616"
        fontSize="14"
        fontWeight="700"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
      >
        + 164,83 €
      </text>

      <rect
        x="72"
        y="244"
        width="576"
        height="64"
        rx="8"
        fill="#fff4ed"
        stroke="#f2d5bc"
        strokeWidth="1.5"
      />
      <rect x="72" y="244" width="6" height="64" rx="3" fill="#f28539" />
      <text
        x="92"
        y="268"
        fill="#f28539"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        HEURES SUPPLÉMENTAIRES À 50 %
      </text>
      <text
        x="92"
        y="288"
        fill="#161616"
        fontSize="13"
        fontFamily="system-ui, sans-serif"
      >
        2 h majorées
      </text>
      <text
        x="624"
        y="280"
        fill="#161616"
        fontSize="14"
        fontWeight="700"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
      >
        + 49,45 €
      </text>

      <rect x="72" y="324" width="576" height="44" rx="8" fill="#161616" />
      <text
        x="92"
        y="351"
        fill="#ffffff"
        fontSize="13"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Nouveau salaire brut estimé
      </text>
      <text
        x="624"
        y="351"
        fill="#8fe0a8"
        fontSize="15"
        fontWeight="700"
        textAnchor="end"
        fontFamily="system-ui, sans-serif"
      >
        2 714,28 €
      </text>
    </svg>
  );
}
