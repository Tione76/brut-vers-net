import {
  euro,
  MARGIN_ANNUAL_VERSEMENTS_EUR,
  MARGIN_AVOIDABLE_EUR,
  MARGIN_KEEP_ON_ACCOUNT_EUR,
  MARGIN_MONTHLY_EUR,
  MARGIN_PHONE_EUR,
  MARGIN_SUBSCRIPTION_EUR,
  MARGIN_TO_LIVRET_EUR,
} from "@/site/epargner-petit-salaire";

/** Exemple fictif : 12 + 8 + 15 = 35, puis 20 vers un livret et 15 gardés sur le compte. */
export function EpargneMargeIllustration() {
  return (
    <div className="eps-marge" role="group" aria-label="Exemple de marge mensuelle répartie entre livret et compte">
      <ul className="eps-marge__list" aria-label="Économies trouvées chaque mois">
        <li className="eps-marge__row">
          <span>Abonnement résilié</span>
          <span className="eps-marge__amount">{euro(MARGIN_SUBSCRIPTION_EUR)} / mois</span>
        </li>
        <li className="eps-marge__row">
          <span>Forfait mobile réduit</span>
          <span className="eps-marge__amount">{euro(MARGIN_PHONE_EUR)} / mois</span>
        </li>
        <li className="eps-marge__row">
          <span>Dépense évitable en moins</span>
          <span className="eps-marge__amount">{euro(MARGIN_AVOIDABLE_EUR)} / mois</span>
        </li>
      </ul>
      <p className="eps-marge__total">
        <span>
          {euro(MARGIN_SUBSCRIPTION_EUR)} + {euro(MARGIN_PHONE_EUR)} + {euro(MARGIN_AVOIDABLE_EUR)}
        </span>
        <span className="eps-marge__amount">= {euro(MARGIN_MONTHLY_EUR)} / mois</span>
      </p>

      <div className="eps-marge__split">
        <p className="eps-marge__split-title">Que faire de ces {euro(MARGIN_MONTHLY_EUR)} ?</p>
        <ul className="eps-marge__list">
          <li className="eps-marge__row">
            <span>Virés vers un livret</span>
            <span className="eps-marge__amount">{euro(MARGIN_TO_LIVRET_EUR)} / mois</span>
          </li>
          <li className="eps-marge__row">
            <span>Gardés sur le compte pour les petits écarts</span>
            <span className="eps-marge__amount">{euro(MARGIN_KEEP_ON_ACCOUNT_EUR)} / mois</span>
          </li>
        </ul>
      </div>

      <p className="eps-marge__annual">
        {euro(MARGIN_TO_LIVRET_EUR)} × 12 mois = {euro(MARGIN_ANNUAL_VERSEMENTS_EUR)} de côté sur un an,
        hors intérêts.
      </p>
      <p className="eps-marge__note">
        Exemple fictif. Ce total suppose que les économies durent douze mois et que les versements
        sont réellement faits.
      </p>
    </div>
  );
}
