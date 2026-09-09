import {
  PRIVATE_HISTORY_FACTS,
  PRIVATE_NET_MEAN_INDEX_CONSTANT,
} from "@/site/salaire-moyen/data";

/** Courbe pédagogique : pouvoir d'achat du salaire net moyen (indice Insee). */
export function SalaireMoyenEvolutionIllustration() {
  const points = PRIVATE_NET_MEAN_INDEX_CONSTANT;
  const width = 720;
  const height = 260;
  const padL = 48;
  const padR = 24;
  const padT = 28;
  const padB = 44;
  const minYear = points[0]!.year;
  const maxYear = points[points.length - 1]!.year;
  const minIndex = 98;
  const maxIndex = 120;
  const x = (year: number) =>
    padL + ((year - minYear) / (maxYear - minYear)) * (width - padL - padR);
  const y = (index: number) =>
    padT + ((maxIndex - index) / (maxIndex - minIndex)) * (height - padT - padB);
  const path = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${x(point.year).toFixed(1)} ${y(point.index).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="salaire-evol-title salaire-evol-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="salaire-evol-title">
        {"Évolution du salaire net moyen en euros constants"}
      </title>
      <desc id="salaire-evol-desc">
        {`Indice base 100 en ${PRIVATE_HISTORY_FACTS.indexBaseYear}. Le pouvoir d'achat du salaire net moyen du privé atteint ${PRIVATE_HISTORY_FACTS.index2024} en 2024, après un pic en 2020.`}
      </desc>

      <rect x="0" y="0" width={width} height={height} fill="#fafafa" rx="12" />

      {[100, 105, 110, 115, 120].map((tick) => (
        <g key={tick}>
          <line
            x1={padL}
            x2={width - padR}
            y1={y(tick)}
            y2={y(tick)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text
            x={padL - 8}
            y={y(tick) + 4}
            textAnchor="end"
            fill="#6b7280"
            fontSize="11"
            fontFamily="system-ui, sans-serif"
          >
            {tick}
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke="#f28539" strokeWidth="3" strokeLinejoin="round" />

      {points.map((point) => (
        <g key={point.year}>
          <circle cx={x(point.year)} cy={y(point.index)} r="4" fill="#f28539" />
          <text
            x={x(point.year)}
            y={height - 16}
            textAnchor="middle"
            fill="#6b7280"
            fontSize="11"
            fontFamily="system-ui, sans-serif"
          >
            {point.year}
          </text>
        </g>
      ))}

      <text
        x={padL}
        y={18}
        fill="#374151"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        {"Indice du salaire net moyen EQTP (euros constants, base 100 = 1996)"}
      </text>
    </svg>
  );
}
