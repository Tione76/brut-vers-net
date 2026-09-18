import {
  buildSmicHoursTable,
  isHighlightWeeklyHours,
  type SmicHoursResult,
} from "./engine";
import {
  formatEuro,
  formatHoursValue,
  formatWeeklyHoursLabel,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_HOURS_OVERTIME_HYPOTHESIS,
  SMIC_HOURS_TABLE_FOOTNOTES,
} from "./data";

function TableRow({ row }: { row: SmicHoursResult }) {
  const highlighted = isHighlightWeeklyHours(row.weeklyHours);
  return (
    <tr
      className={highlighted ? "smic-heures-table__row--highlight" : undefined}
      data-highlight={highlighted ? "true" : undefined}
    >
      <th scope="row">
        <span className="smic-heures-table__hours">
          <span
            className={
              highlighted
                ? "smic-heures-table__mark"
                : "smic-heures-table__mark smic-heures-table__mark--empty"
            }
            aria-hidden="true"
          >
            ●
          </span>
          <span className="smic-heures-table__hours-label">
            {formatWeeklyHoursLabel(row.weeklyHours)}
          </span>
        </span>
      </th>
      <td>{formatHoursValue(row.monthlyHours)}</td>
      <td>{formatEuro(row.monthlyGross)}</td>
      <td>{formatEuro(row.monthlyNetEstimated)}</td>
      <td>{formatEuro(row.annualGrossProjection)}</td>
      <td>{formatEuro(row.annualNetProjection)}</td>
    </tr>
  );
}

/** Tableau HTML accessible, rendu côté serveur (indexable sans JS). */
export function SmicHoursTable() {
  const rows = buildSmicHoursTable();

  return (
    <div className="smic-heures-table-breakout">
      <p className="smic-heures-table-scroll-hint" aria-hidden="true">
        Faites défiler le tableau horizontalement
      </p>
      <div
        className="smic-heures-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Tableau du SMIC selon le nombre d'heures. Faites défiler horizontalement si nécessaire."
      >
        <table className="smic-heures-table">
          <caption>
            SMIC brut et net estimé selon le nombre d&apos;heures hebdomadaires
            (montants applicables depuis le {SMIC_EFFECTIVE_FROM_LABEL})
          </caption>
          <thead>
            <tr>
              <th scope="col">Heures / semaine</th>
              <th scope="col">Heures mensualisées</th>
              <th scope="col">Brut mensuel</th>
              <th scope="col">Net mensuel estimé</th>
              <th scope="col">Projection brute 12 mois</th>
              <th scope="col">Projection nette 12 mois</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.weeklyHours} row={row} />
            ))}
          </tbody>
        </table>
      </div>
      <ul className="smic-heures-table__footnotes">
        {SMIC_HOURS_TABLE_FOOTNOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <p className="smic-heures-table__note">
        Les projections annuelles correspondent à douze mois payés au taux
        actuellement applicable, pas au cumul réel d&apos;une année civile ayant
        connu une revalorisation. {SMIC_HOURS_OVERTIME_HYPOTHESIS} Le net reste
        indicatif et hors prélèvement à la source.
      </p>
    </div>
  );
}
