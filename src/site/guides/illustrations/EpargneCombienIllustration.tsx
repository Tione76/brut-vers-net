import {
  COMBIEN_GROCERIES_EUR,
  COMBIEN_KEEP_EUR,
  COMBIEN_ON_ACCOUNT_EUR,
  COMBIEN_TO_SAVE_EUR,
  euro,
} from "@/site/epargner-petit-salaire";

/** Petit reçu : 45 − 25 − 10 = 10 à mettre de côté dans cet exemple. */
export function EpargneCombienIllustration() {
  return (
    <div className="eps-combien">
      <ul className="eps-combien__list" aria-label="Décompte pour choisir la somme à mettre de côté ce mois-ci">
        <li className="eps-combien__row">
          <span>Sur le compte</span>
          <span className="eps-combien__amount">{euro(COMBIEN_ON_ACCOUNT_EUR)}</span>
        </li>
        <li
          className="eps-combien__row"
          aria-label={`Courses encore à payer : moins ${euro(COMBIEN_GROCERIES_EUR)}`}
        >
          <span aria-hidden="true">Courses encore à payer</span>
          <span className="eps-combien__amount" aria-hidden="true">
            −{euro(COMBIEN_GROCERIES_EUR)}
          </span>
        </li>
        <li
          className="eps-combien__row"
          aria-label={`À garder sur le compte : moins ${euro(COMBIEN_KEEP_EUR)}`}
        >
          <span aria-hidden="true">À garder sur le compte</span>
          <span className="eps-combien__amount" aria-hidden="true">
            −{euro(COMBIEN_KEEP_EUR)}
          </span>
        </li>
        <li
          className="eps-combien__row eps-combien__row--result"
          aria-label={`À mettre de côté dans cet exemple : ${euro(COMBIEN_TO_SAVE_EUR)}`}
        >
          <span aria-hidden="true">À mettre de côté dans cet exemple</span>
          <span className="eps-combien__amount" aria-hidden="true">
            {euro(COMBIEN_TO_SAVE_EUR)}
          </span>
        </li>
      </ul>
      <p className="eps-combien__equation" aria-hidden="true">
        {euro(COMBIEN_ON_ACCOUNT_EUR)} − {euro(COMBIEN_GROCERIES_EUR)} − {euro(COMBIEN_KEEP_EUR)} ={" "}
        {euro(COMBIEN_TO_SAVE_EUR)}
      </p>
      <p className="eps-combien__template">
        Sur mon compte : ___ € · À payer avant ma prochaine paie : ___ € · À garder sur mon compte :
        ___ €.
      </p>
      <p className="eps-combien__note">
        Si la différence est positive, elle peut servir à un virement. Exemple fictif : aucun autre
        paiement n&apos;est attendu dans ce calcul.
      </p>
    </div>
  );
}
