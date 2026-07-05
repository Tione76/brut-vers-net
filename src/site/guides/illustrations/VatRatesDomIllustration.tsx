import { ILLU as c } from "./tokens";

const ROWS = [
  {
    id: "normal",
    label: "Taux normal",
    metro: "20 %",
    dom: "8,5 %",
    dot: c.brand,
    badgeBg: c.brandLight,
    badgeBorder: c.brandMuted,
  },
  {
    id: "intermediate",
    label: "Taux intermédiaire",
    metro: "10 %",
    dom: "2,1 %",
    dot: "#245a8a",
    badgeBg: "#e8f1f8",
    badgeBorder: "#b8cfe0",
  },
  {
    id: "reduced",
    label: "Taux réduit",
    metro: "5,5 %",
    dom: "1,75 %",
    dot: c.success,
    badgeBg: c.successLight,
    badgeBorder: "#b8d9c4",
  },
  {
    id: "special",
    label: "Taux particulier",
    metro: "2,1 %",
    dom: "1,05 %",
    dot: "#6b7280",
    badgeBg: "#f4f4f5",
    badgeBorder: "#d4d4d8",
  },
] as const;

/** Comparatif TVA métropole vs DOM — tableau responsive */
export function VatRatesDomIllustration() {
  return (
    <div
      className="vat-dom-compare"
      role="img"
      aria-label="Comparatif des taux de TVA entre la France métropolitaine et les DOM (Guadeloupe, Martinique, La Réunion)"
    >
      <p className="vat-dom-compare__title">
        Métropole vs Guadeloupe, Martinique, La Réunion
      </p>

      <div className="vat-dom-compare__table" aria-hidden="false">
        <div className="vat-dom-compare__header">
          <span className="vat-dom-compare__header-spacer" />
          <span className="vat-dom-compare__header-col">France métropolitaine</span>
          <span className="vat-dom-compare__header-arrow" aria-hidden="true" />
          <span className="vat-dom-compare__header-col vat-dom-compare__header-col--dom">
            Guadeloupe / Martinique / La Réunion
          </span>
        </div>

        <div className="vat-dom-compare__body">
          {ROWS.map((row) => (
            <div key={row.id} className="vat-dom-compare__row">
              <div
                className="vat-dom-compare__badge"
                style={{
                  background: row.badgeBg,
                  borderColor: row.badgeBorder,
                }}
              >
                <span
                  className="vat-dom-compare__badge-dot"
                  style={{ background: row.dot }}
                  aria-hidden="true"
                />
                <span className="vat-dom-compare__badge-label">{row.label}</span>
              </div>

              <div className="vat-dom-compare__cell vat-dom-compare__cell--metro">
                <span className="vat-dom-compare__cell-label">Métropole</span>
                <span className="vat-dom-compare__rate">{row.metro}</span>
              </div>

              <div className="vat-dom-compare__arrow" aria-hidden="true">
                <span className="vat-dom-compare__arrow-icon">↓</span>
              </div>

              <div className="vat-dom-compare__cell vat-dom-compare__cell--dom">
                <span className="vat-dom-compare__cell-label">DOM</span>
                <span className="vat-dom-compare__rate vat-dom-compare__rate--dom">{row.dom}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="vat-dom-compare__legend">
        Les DOM (Guadeloupe, Martinique et La Réunion) appliquent leurs propres taux de TVA
        prévus aux articles 297 et 298 du CGI.
      </p>

      <aside className="vat-dom-compare__note">
        Guyane et Mayotte relèvent d&apos;un régime fiscal spécifique et n&apos;appliquent pas la
        TVA métropolitaine.
      </aside>
    </div>
  );
}
