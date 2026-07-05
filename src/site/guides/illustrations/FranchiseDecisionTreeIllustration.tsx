/** Arbre de décision — franchise ou assujettissement */
export function FranchiseDecisionTreeIllustration() {
  return (
    <div
      className="franchise-decision"
      role="img"
      aria-label="Arbre de décision pour savoir si vous êtes en franchise en base de TVA"
    >
      <p className="franchise-decision__title">Êtes-vous en franchise en base de TVA ?</p>

      <div className="franchise-decision__tree">
        <div className="franchise-decision__node franchise-decision__node--root">
          Votre entreprise est-elle assujettie à la TVA en France ?
        </div>

        <div className="franchise-decision__branch">
          <div className="franchise-decision__path">
            <span className="franchise-decision__answer franchise-decision__answer--no">Non / exonéré autre motif</span>
            <div className="franchise-decision__result franchise-decision__result--neutral">
              Hors franchise art. 293 B — autre régime (exonération, hors champ)
            </div>
          </div>

          <div className="franchise-decision__path">
            <span className="franchise-decision__answer franchise-decision__answer--yes">Oui</span>
            <div className="franchise-decision__node">
              CA N-1 et année en cours sous les seuils art. 293 B ?
            </div>
            <div className="franchise-decision__split">
              <div className="franchise-decision__result franchise-decision__result--yes">
                <strong>Oui</strong> → Franchise en base (sauf option art. 293 C)
              </div>
              <div className="franchise-decision__result franchise-decision__result--no">
                <strong>Non</strong> → Assujettissement obligatoire à la TVA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
