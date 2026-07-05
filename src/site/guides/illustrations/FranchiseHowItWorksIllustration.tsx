import { ILLU as c } from "./tokens";

/** Fonctionnement de la franchise en base de TVA */
export function FranchiseHowItWorksIllustration() {
  return (
    <div
      className="franchise-flow"
      role="img"
      aria-label="Schéma du fonctionnement de la franchise en base de TVA"
    >
      <p className="franchise-flow__title">Comment fonctionne la franchise en base ?</p>

      <div className="franchise-flow__grid">
        <div className="franchise-flow__box franchise-flow__box--client">
          <span className="franchise-flow__label">Client</span>
          <span className="franchise-flow__value">Paie le prix affiché</span>
          <span className="franchise-flow__sub">Pas de TVA sur la facture</span>
        </div>

        <div className="franchise-flow__arrow" aria-hidden="true">→</div>

        <div className="franchise-flow__box franchise-flow__box--entreprise">
          <span className="franchise-flow__label">Entreprise en franchise</span>
          <span className="franchise-flow__value">Encaisse le montant net</span>
          <span className="franchise-flow__sub">Ne collecte ni ne reverse de TVA</span>
        </div>

        <div className="franchise-flow__arrow" aria-hidden="true">→</div>

        <div className="franchise-flow__box franchise-flow__box--etat">
          <span className="franchise-flow__label">État</span>
          <span className="franchise-flow__value">Aucune TVA perçue</span>
          <span className="franchise-flow__sub">Exonération art. 293 B du CGI</span>
        </div>
      </div>

      <div className="franchise-flow__footer">
        <span style={{ color: c.brand }}>Fournisseur</span>
        <span className="franchise-flow__footer-arrow" aria-hidden="true">↑</span>
        <span>TVA sur achats = charge non récupérable</span>
      </div>
    </div>
  );
}
