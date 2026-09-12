import {
  BON_SALAIRE_STAT_YEAR,
  DISTRIBUTION_SCALE_POINTS,
  euroMonth,
} from "@/site/bon-salaire/data";

type LabelPlacement = "above" | "below";

/**
 * Placement des légendes pour éviter les chevauchements
 * (D1 / médiane / moyenne sont proches sur l'échelle).
 * Les marqueurs restent à la position statistique exacte.
 */
const LABEL_LAYOUT: Record<
  string,
  { band: LabelPlacement; nudge: "left" | "center" | "right" }
> = {
  d1: { band: "below", nudge: "left" },
  median: { band: "above", nudge: "center" },
  mean: { band: "below", nudge: "right" },
  d9: { band: "above", nudge: "center" },
  // P99 en bord droit : libellé vers la gauche pour éviter le débordement
  p99: { band: "below", nudge: "left" },
};

/** Frise pédagogique : seuils officiels sur une échelle horizontale. */
export function BonSalaireDistributionIllustration() {
  const points = DISTRIBUTION_SCALE_POINTS;
  const minVal = points[0]!.value;
  const maxVal = points[points.length - 1]!.value;
  const positionPercent = (value: number) =>
    ((value - minVal) / (maxVal - minVal)) * 100;

  return (
    <div
      className="bon-salaire-scale"
      role="img"
      aria-labelledby="bon-salaire-scale-title bon-salaire-scale-desc"
    >
      <p id="bon-salaire-scale-title" className="bon-salaire-scale__title">
        {`Seuils officiels (net mensuel EQTP, privé ${BON_SALAIRE_STAT_YEAR})`}
      </p>
      <p id="bon-salaire-scale-desc" className="bon-salaire-scale__sr">
        {`Points affichés : D1 ${euroMonth(points[0]!.value)}, médiane ${euroMonth(points[1]!.value)}, moyenne ${euroMonth(points[2]!.value)}, D9 ${euroMonth(points[3]!.value)}, P99 ${euroMonth(points[4]!.value)}.`}
      </p>

      <div className="bon-salaire-scale__canvas" aria-hidden="true">
        <div className="bon-salaire-scale__track">
          <div className="bon-salaire-scale__axis" />
          {points.map((point) => {
            const layout = LABEL_LAYOUT[point.id] ?? {
              band: "below" as const,
              nudge: "center" as const,
            };
            const isMean = point.id === "mean";
            const left = positionPercent(point.value);

            return (
              <div
                key={point.id}
                className={[
                  "bon-salaire-scale__marker",
                  isMean ? "bon-salaire-scale__marker--mean" : "",
                  `bon-salaire-scale__marker--${layout.band}`,
                  `bon-salaire-scale__marker--nudge-${layout.nudge}`,
                  `bon-salaire-scale__marker--id-${point.id}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ left: `${left}%` }}
              >
                <span className="bon-salaire-scale__stem" />
                <span className="bon-salaire-scale__dot" />
                <span className="bon-salaire-scale__label-block">
                  <span className="bon-salaire-scale__name">{point.label}</span>
                  <span className="bon-salaire-scale__amount">
                    {euroMonth(point.value).replace("\u00a0", " ")}
                  </span>
                  <span className="bon-salaire-scale__hint">{point.hint}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
