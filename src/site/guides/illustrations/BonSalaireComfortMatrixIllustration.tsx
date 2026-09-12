/**
 * Matrice pédagogique 2×2 : même salaire ≠ même confort.
 * Aucune donnée statistique : visualisation uniquement.
 */
export function BonSalaireComfortMatrixIllustration() {
  return (
    <div
      className="bon-salaire-comfort-matrix"
      role="img"
      aria-labelledby="bon-salaire-comfort-title bon-salaire-comfort-desc"
    >
      <p id="bon-salaire-comfort-title" className="bon-salaire-comfort-matrix__title">
        Pourquoi le même salaire ne produit pas toujours le même confort
      </p>
      <p id="bon-salaire-comfort-desc" className="bon-salaire-comfort-matrix__sr">
        Matrice pédagogique à deux axes. Horizontal : salaire net comparable, de faible à
        élevé. Vertical : coût de la vie et charges, de faibles à élevées. Quatre situations
        illustratives, sans chiffres statistiques.
      </p>

      <div className="bon-salaire-comfort-matrix__frame" aria-hidden="true">
        <span className="bon-salaire-comfort-matrix__axis-y-label">
          Coût de la vie et charges
        </span>
        <div className="bon-salaire-comfort-matrix__grid-wrap">
          <span className="bon-salaire-comfort-matrix__axis-y-high">Élevés</span>
          <div className="bon-salaire-comfort-matrix__grid">
            <div className="bon-salaire-comfort-matrix__cell bon-salaire-comfort-matrix__cell--stress">
              <p className="bon-salaire-comfort-matrix__cell-title">
                Salaire modeste + charges fortes
              </p>
              <p className="bon-salaire-comfort-matrix__cell-text">
                Le net laisse peu de marge : le logement et les dépenses contraintes pèsent
                lourdement.
              </p>
            </div>
            <div className="bon-salaire-comfort-matrix__cell bon-salaire-comfort-matrix__cell--mixed">
              <p className="bon-salaire-comfort-matrix__cell-title">
                Salaire élevé + charges fortes
              </p>
              <p className="bon-salaire-comfort-matrix__cell-text">
                La position statistique est haute, mais le reste à vivre peut rester tendu.
              </p>
            </div>
            <div className="bon-salaire-comfort-matrix__cell bon-salaire-comfort-matrix__cell--calm">
              <p className="bon-salaire-comfort-matrix__cell-title">
                Salaire modeste + charges faibles
              </p>
              <p className="bon-salaire-comfort-matrix__cell-text">
                Un net plus bas peut suffire si le logement et les charges restent contenus.
              </p>
            </div>
            <div className="bon-salaire-comfort-matrix__cell bon-salaire-comfort-matrix__cell--ease">
              <p className="bon-salaire-comfort-matrix__cell-title">
                Salaire élevé + charges faibles
              </p>
              <p className="bon-salaire-comfort-matrix__cell-text">
                Meilleure capacité d&apos;épargne et de marge face aux imprévus.
              </p>
            </div>
          </div>
          <span className="bon-salaire-comfort-matrix__axis-y-low">Faibles</span>
          <div className="bon-salaire-comfort-matrix__axis-x">
            <span>Salaire net comparable</span>
            <span className="bon-salaire-comfort-matrix__axis-x-range">
              Faible → Élevé
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
