import {
  FRANCHISE_THRESHOLD_ROWS,
  FRANCHISE_THRESHOLDS_META,
  formatThreshold,
} from "../guide-franchise-thresholds";

/** Seuils de franchise en base de TVA — tableau responsive */
export function FranchiseThresholdsIllustration() {
  const mainRows = FRANCHISE_THRESHOLD_ROWS.filter(
    (r) => r.id === "ventes" || r.id === "services",
  );

  return (
    <div
      className="franchise-thresholds"
      role="img"
      aria-label="Seuils de franchise en base de TVA pour les prestations de services et les ventes"
    >
      <p className="franchise-thresholds__title">
        Seuils de franchise en base de TVA ({FRANCHISE_THRESHOLDS_META.year})
      </p>
      <p className="franchise-thresholds__ref">{FRANCHISE_THRESHOLDS_META.legalRef}</p>

      <div className="franchise-thresholds__grid">
        {mainRows.map((row) => (
          <div key={row.id} className="franchise-thresholds__card">
            <p className="franchise-thresholds__card-title">{row.activity}</p>
            <div className="franchise-thresholds__rates">
              <div className="franchise-thresholds__rate">
                <span className="franchise-thresholds__rate-label">Seuil de base</span>
                <span className="franchise-thresholds__rate-value">{formatThreshold(row.base)}</span>
              </div>
              <div className="franchise-thresholds__rate franchise-thresholds__rate--major">
                <span className="franchise-thresholds__rate-label">Seuil majoré</span>
                <span className="franchise-thresholds__rate-value">{formatThreshold(row.major)}</span>
              </div>
            </div>
            <p className="franchise-thresholds__examples">{row.examples}</p>
          </div>
        ))}
      </div>

      <p className="franchise-thresholds__note">{FRANCHISE_THRESHOLDS_META.sourceNote}</p>
    </div>
  );
}
