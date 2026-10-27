/** Styles : `.scp-reading` dans `src/site/solde-conges-payes/solde-conges-payes.css`. */
export function SoldeCongesCompteurIllustration() {
  return (
    <section className="scp-reading" aria-labelledby="scp-reading-title">
      <h3 id="scp-reading-title" className="scp-reading__title">
        Comment lire un compteur de congés ?
      </h3>
      <p className="scp-reading__intro">
        Si votre fiche de paie indique les jours acquis et les jours déjà déduits, vous pouvez lire
        le solde ainsi :
      </p>

      <p className="scp-reading__formula">
        <span className="scp-reading__term">Jours acquis</span>{" "}
        <span className="scp-reading__term">
          <span className="scp-reading__op" aria-hidden="true">+</span>
          <span className="sr-only">plus </span>
          reports ou crédits non déjà inclus
        </span>{" "}
        <span className="scp-reading__term">
          <span className="scp-reading__op" aria-hidden="true">−</span>
          <span className="sr-only">moins </span>
          jours déjà déduits
        </span>{" "}
        <span className="scp-reading__term scp-reading__term--result">
          <span className="scp-reading__op" aria-hidden="true">=</span>
          <span className="sr-only">égale </span>
          solde restant
        </span>
      </p>

      <p className="scp-reading__example">
        <strong>Exemple :</strong> 20{"\u00a0"}jours acquis +{"\u00a0"}2{"\u00a0"}jours reportés
        non inclus −{"\u00a0"}8{"\u00a0"}jours déduits{" "}
        <span className="scp-reading__example-result">
          = <strong>14 jours restants</strong>.
        </span>
      </p>

      <p className="scp-reading__warning">
        <strong>Attention :</strong> si votre bulletin indique déjà un solde restant, ne déduisez
        pas une seconde fois les jours pris.
      </p>
      <p className="scp-reading__note">
        Utilisez les chiffres d&apos;un même compteur et dans la même unité : jours ouvrables ou
        jours ouvrés.
      </p>
    </section>
  );
}
