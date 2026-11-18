import {
  euro,
  PROVISION_CAR_ANNUAL_EUR,
  PROVISION_CAR_MONTHLY_EUR,
  PROVISION_GIFTS_ANNUAL_EUR,
  PROVISION_GIFTS_MONTHLY_EUR,
  PROVISION_INSURANCE_ANNUAL_EUR,
  PROVISION_INSURANCE_MONTHLY_EUR,
  PROVISION_TOTAL_ANNUAL_EUR,
  PROVISION_TOTAL_MONTHLY_EUR,
} from "@/site/epargner-petit-salaire";

const MONTHS_UNTIL_INSURANCE = 4;

const ROWS = [
  {
    label: "Assurance annuelle",
    annual: PROVISION_INSURANCE_ANNUAL_EUR,
    monthly: PROVISION_INSURANCE_MONTHLY_EUR,
  },
  {
    label: "Entretien de la voiture",
    annual: PROVISION_CAR_ANNUAL_EUR,
    monthly: PROVISION_CAR_MONTHLY_EUR,
  },
  {
    label: "Cadeaux",
    annual: PROVISION_GIFTS_ANNUAL_EUR,
    monthly: PROVISION_GIFTS_MONTHLY_EUR,
  },
] as const;

/** Dépenses connues mais irrégulières : coût sur l'année, puis somme à prévoir chaque mois. */
export function EpargneProvisionsIllustration() {
  return (
    <div className="eps-provisions">
      <table className="eps-table">
        <thead>
          <tr>
            <th scope="col">Dépense</th>
            <th scope="col">Coût sur l&apos;année</th>
            <th scope="col">À prévoir par mois</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td className="eps-num" data-label="Coût sur l'année">
                {euro(row.annual)}
              </td>
              <td className="eps-num eps-provisions__monthly" data-label="À prévoir par mois">
                {euro(row.monthly)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td className="eps-num" data-label="Coût sur l'année">
              {euro(PROVISION_TOTAL_ANNUAL_EUR)}
            </td>
            <td className="eps-num" data-label="À prévoir par mois">
              {euro(PROVISION_TOTAL_MONTHLY_EUR)}
            </td>
          </tr>
        </tfoot>
      </table>
      <p className="eps-provisions__note">
        Exemple fictif. Si l&apos;assurance tombe dans {MONTHS_UNTIL_INSURANCE} mois et que vous partez
        de zéro, il faut mettre de côté{" "}
        {euro(PROVISION_INSURANCE_ANNUAL_EUR / MONTHS_UNTIL_INSURANCE)} par mois pour cette seule
        facture, au lieu de {euro(PROVISION_INSURANCE_MONTHLY_EUR)}.
      </p>
    </div>
  );
}
