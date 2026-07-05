/** Facture annotée en franchise — mention art. 293 B */
export function FranchiseInvoiceAnnotatedIllustration() {
  return (
    <div
      className="franchise-invoice"
      role="img"
      aria-label="Exemple de facture en franchise en base de TVA avec mention TVA non applicable article 293 B du CGI"
    >
      <p className="franchise-invoice__title">Facture en franchise — éléments obligatoires</p>

      <div className="franchise-invoice__doc">
        <div className="franchise-invoice__header">
          <div>
            <p className="franchise-invoice__seller">Studio Créa — SIRET 123 456 789 00012</p>
            <p className="franchise-invoice__addr">12 rue des Artisans, 75011 Paris</p>
          </div>
          <div className="franchise-invoice__meta">
            <p>
              <span className="franchise-invoice__tag">Facture n°</span> 2026-0042
            </p>
            <p>
              <span className="franchise-invoice__tag">Date</span> 05/07/2026
            </p>
          </div>
        </div>

        <div className="franchise-invoice__client">
          <span className="franchise-invoice__tag">Client</span>
          <span>SARL Horizon — 8 avenue de la République, 69002 Lyon</span>
        </div>

        <table className="franchise-invoice__table">
          <thead>
            <tr>
              <th scope="col">Désignation</th>
              <th scope="col">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Création identité visuelle — logo et charte</td>
              <td>800,00 €</td>
            </tr>
          </tbody>
        </table>

        <div className="franchise-invoice__total">
          <span>Total à payer</span>
          <strong>800,00 €</strong>
        </div>

        <p className="franchise-invoice__mention">
          TVA non applicable, art. 293 B du CGI
        </p>
      </div>

      <ul className="franchise-invoice__annotations">
        <li>
          <span className="franchise-invoice__callout">① Numéro et date</span>
          Identification unique et datation de la facture
        </li>
        <li>
          <span className="franchise-invoice__callout">② Client</span>
          Identité complète du client professionnel (B2B)
        </li>
        <li>
          <span className="franchise-invoice__callout">③ Montant net</span>
          Prix unique — pas de ligne TVA ni de taux
        </li>
        <li>
          <span className="franchise-invoice__callout">④ Mention obligatoire</span>
          « TVA non applicable, art. 293 B du CGI » sur chaque facture
        </li>
      </ul>
    </div>
  );
}
